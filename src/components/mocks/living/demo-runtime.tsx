"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

export type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  pressing: boolean;
  label: string;
};

export type DemoController = {
  cancelled: () => boolean;
  wait: (ms: number) => Promise<void>;
  go: (selector: string, ms?: number) => Promise<void>;
  press: (downMs?: number) => Promise<void>;
  release: () => void;
  tap: (selector: string, action?: () => void, ms?: number) => Promise<void>;
  moveCursor: (
    to: { x: number; y: number },
    ms?: number,
    opts?: { keepPressing?: boolean; tracking?: boolean }
  ) => Promise<void>;
  pointFor: (selector: string) => { x: number; y: number } | null;
  setCursor: (
    patch: Partial<CursorState> | ((c: CursorState) => CursorState)
  ) => void;
};

/**
 * Shared Notion-style cursor player for marketing mocks.
 * See `.cursor/skills/living-product-demo/` for rules and edge cases.
 */
export function useDemoPlayer({
  stageRef,
  inView,
  label,
  rest = { x: 86, y: 90 },
  script,
}: {
  stageRef: RefObject<HTMLElement | null>;
  inView: boolean;
  label: string;
  rest?: { x: number; y: number };
  script: (api: DemoController) => Promise<void>;
}) {
  const [cursor, setCursor] = useState<CursorState>({
    ...rest,
    visible: false,
    pressing: false,
    label,
  });
  const cursorRef = useRef(cursor);
  cursorRef.current = cursor;
  const timers = useRef<number[]>([]);
  const raf = useRef<number | null>(null);
  const scriptRef = useRef(script);
  scriptRef.current = script;

  useEffect(() => {
    const clearAll = () => {
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };

    if (!inView) {
      clearAll();
      setCursor({ ...rest, visible: false, pressing: false, label });
      return;
    }

    let cancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timers.current.push(id);
      });

    const pointFor = (selector: string): { x: number; y: number } | null => {
      const stage = stageRef.current;
      if (!stage) return null;
      const el = stage.querySelector(selector);
      if (!el) return null;
      const sr = stage.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      return {
        x: ((er.left + er.width / 2 - sr.left) / sr.width) * 100,
        y: ((er.top + er.height / 2 - sr.top) / sr.height) * 100,
      };
    };

    const moveCursor = (
      to: { x: number; y: number },
      ms = 720,
      opts: { keepPressing?: boolean; tracking?: boolean } = {}
    ) => {
      const from = { x: cursorRef.current.x, y: cursorRef.current.y };
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.hypot(dx, dy);
      const bow = opts.tracking ? 0 : Math.min(16, dist * 0.28);
      const mid = {
        x: (from.x + to.x) / 2 - dy * (bow / Math.max(dist, 1)),
        y: (from.y + to.y) / 2 + dx * (bow / Math.max(dist, 1)),
      };

      setCursor((c) => ({
        ...c,
        visible: true,
        pressing: opts.keepPressing ? c.pressing : false,
      }));

      return new Promise<void>((resolve) => {
        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((now - start) / ms, 1);
          const e = opts.tracking
            ? cssEaseOut(t)
            : t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const omt = 1 - e;
          setCursor((c) => ({
            ...c,
            x: omt * omt * from.x + 2 * omt * e * mid.x + e * e * to.x,
            y: omt * omt * from.y + 2 * omt * e * mid.y + e * e * to.y,
          }));
          if (t < 1) raf.current = requestAnimationFrame(tick);
          else {
            raf.current = null;
            resolve();
          }
        };
        tick(start);
      });
    };

    const go = async (selector: string, ms = 720) => {
      const point = pointFor(selector);
      if (!point) return;
      await moveCursor(point, ms);
    };

    const press = async (downMs = 160) => {
      setCursor((c) => ({ ...c, pressing: true }));
      await wait(downMs);
    };

    const release = () => setCursor((c) => ({ ...c, pressing: false }));

    const tap = async (selector: string, action?: () => void, ms = 700) => {
      await go(selector, ms);
      if (cancelled) return;
      await wait(90);
      if (cancelled) return;
      await press(180);
      if (cancelled) return;
      action?.();
      release();
      await wait(240);
    };

    const api: DemoController = {
      cancelled: () => cancelled,
      wait,
      go,
      press,
      release,
      tap,
      moveCursor,
      pointFor,
      setCursor: (patch) => {
        if (typeof patch === "function") setCursor(patch);
        else setCursor((c) => ({ ...c, ...patch }));
      },
    };

    const run = async () => {
      setCursor({ ...rest, visible: true, pressing: false, label });
      await wait(480);
      if (cancelled) return;
      while (!cancelled) {
        await scriptRef.current(api);
        if (cancelled) break;
        await moveCursor(rest, 640);
        if (cancelled) break;
        await wait(640);
      }
    };

    void run();
    return () => {
      cancelled = true;
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, stageRef]);

  return cursor;
}

/** Stage + in-view gate + cursor overlay. Children render the mock UI. */
export function LivingBoard({
  label,
  rest = { x: 88, y: 92 },
  fallback,
  script,
  children,
  animated = true,
}: {
  label: string;
  rest?: { x: number; y: number };
  fallback: ReactNode;
  script: (api: DemoController) => Promise<void>;
  children: ReactNode;
  /** When false, render the mock at rest with no cursor or script loop. */
  animated?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({
    repeat: true,
    rootMargin: "0px 0px -10% 0px",
  });
  const stageRef = useRef<HTMLDivElement | null>(null);
  const play = animated && !reduced;
  const cursor = useDemoPlayer({
    stageRef,
    inView: play && inView,
    label,
    rest,
    script,
  });

  if (reduced) return <>{fallback}</>;

  if (!animated) {
    return <div className="relative w-full min-w-0">{children}</div>;
  }

  return (
    <div ref={ref} className="relative w-full min-w-0">
      <div ref={stageRef} className="relative w-full min-w-0">
        {children}
        <DemoCursor {...cursor} />
      </div>
    </div>
  );
}

export function DemoCursor({ x, y, visible, pressing, label }: CursorState) {
  return (
    <div
      className={cn(
        // Above popovers/menus (z-50) so the tip stays visible while choosing.
        "pointer-events-none absolute z-[60] origin-top-left transition-[opacity,transform] duration-150",
        visible ? "opacity-100" : "opacity-0",
        pressing && "scale-90"
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        className="-translate-x-[5.5px] -translate-y-[3.5px] drop-shadow-[0_3px_8px_rgba(15,23,42,0.4)]"
      >
        <path
          d="M5.5 3.5 19 12.2l-6.2 1.4 1.5 6.4L5.5 3.5Z"
          fill="#0f172a"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute top-[18px] left-[10px] whitespace-nowrap rounded-full bg-[#1967d2] px-2.5 py-1 text-[11px] font-semibold tracking-tight text-white shadow-lg">
        {label}
      </span>
    </div>
  );
}

export function cssEaseOut(t: number) {
  const cx = 3 * 0.33;
  const bx = 3 * (0.68 - 0.33) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * 1;
  const by = 3 * (1 - 1) - cy;
  const ay = 1 - cy - by;
  let x = t;
  for (let i = 0; i < 5; i++) {
    const xEst = ((ax * x + bx) * x + cx) * x - t;
    const d = (3 * ax * x + 2 * bx) * x + cx;
    if (Math.abs(d) < 1e-6) break;
    x -= xEst / d;
  }
  return ((ay * x + by) * x + cy) * x;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
