"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { ScheduleMock } from "@/components/mocks/schedule-mock";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";
import {
  BLOCKS,
  BOARD_END,
  BOARD_START,
  PHASE_LABEL,
  TAILS,
  blockGeometry,
  type Block,
} from "@/lib/time-of-day";

/**
 * Notion-style "living product" loop for the homepage hero only.
 *
 * A dispatcher cursor walks the board: drag a lesson, book a new one that
 * pops into place, then cancel another. Feature pages keep the quieter
 * ScheduleMock; this is deliberately theatrical and loops while in view.
 */

const DEMO_HOUR = 11;
const DEMO_TODAY = "Mon · KAPA";

type DemoBlock = Block & {
  entering?: boolean;
  exiting?: boolean;
  lifting?: boolean;
};

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  pressing: boolean;
  label: string;
};

const SEED: DemoBlock[] = BLOCKS.map((b) => ({ ...b }));

const NEW_BLOCK: DemoBlock = {
  id: "demo-new",
  tail: "sim01",
  label: "Dual · Patel",
  start: 12,
  end: 13.5,
  tone: "#1967d2",
  hobbs: 1.4,
  amount: 217,
  entering: true,
};

/** Cursor waypoints as % of the stage (chrome + board). Tuned by eye. */
const CURSOR = {
  rest: { x: 82, y: 88 },
  chen: { x: 52, y: 42 },
  chenDrop: { x: 66, y: 42 },
  book: { x: 91, y: 18 },
  newSlot: { x: 42, y: 76 },
  ground: { x: 72, y: 76 },
} as const;

export function ScheduleHeroDemo() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <ScheduleMock />;
  return <LivingBoard />;
}

function LivingBoard() {
  const { ref, inView } = useInView<HTMLDivElement>({
    repeat: true,
    rootMargin: "0px 0px -10% 0px",
  });
  const [blocks, setBlocks] = useState<DemoBlock[]>(SEED);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bookFlash, setBookFlash] = useState(false);
  const [cursor, setCursor] = useState<CursorState>({
    ...CURSOR.rest,
    visible: false,
    pressing: false,
    label: "Maya · Desk",
  });
  const timers = useRef<number[]>([]);

  const flown = useMemo(
    () => blocks.filter((b) => !b.exiting && DEMO_HOUR >= b.end),
    [blocks]
  );
  const active = useMemo(
    () => blocks.filter((b) => !b.exiting && DEMO_HOUR >= b.start && DEMO_HOUR < b.end),
    [blocks]
  );
  const upcoming = useMemo(
    () => blocks.filter((b) => !b.exiting && DEMO_HOUR < b.start),
    [blocks]
  );
  const billed = flown.reduce((sum, b) => sum + b.amount, 0);

  useEffect(() => {
    if (!inView) {
      clearTimers(timers.current);
      timers.current = [];
      setBlocks(SEED);
      setSelectedId(null);
      setBookFlash(false);
      setCursor({ ...CURSOR.rest, visible: false, pressing: false, label: "Maya · Desk" });
      return;
    }

    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timers.current.push(id);
      });

    const moveCursor = (to: { x: number; y: number }, ms = 700) => {
      setCursor((c) => ({ ...c, visible: true, x: to.x, y: to.y, pressing: false }));
      return wait(ms);
    };

    const press = async (downMs = 180) => {
      setCursor((c) => ({ ...c, pressing: true }));
      await wait(downMs);
    };

    const release = () => setCursor((c) => ({ ...c, pressing: false }));

    const run = async () => {
      while (!cancelled) {
        setBlocks(SEED.map((b) => ({ ...b })));
        setSelectedId(null);
        setBookFlash(false);
        setCursor({ ...CURSOR.rest, visible: false, pressing: false, label: "Maya · Desk" });
        await wait(600);
        if (cancelled) break;

        // --- Drag Solo · Chen later in the day ---
        setCursor((c) => ({ ...c, visible: true, label: "Maya · Desk" }));
        await wait(200);
        if (cancelled) break;
        await moveCursor(CURSOR.chen, 800);
        if (cancelled) break;
        await press();
        if (cancelled) break;
        setSelectedId("b3");
        setBlocks((prev) =>
          prev.map((b) => (b.id === "b3" ? { ...b, lifting: true } : b))
        );
        await wait(220);
        if (cancelled) break;
        // Drag right ~1 hour while the block follows.
        setCursor((c) => ({ ...c, x: CURSOR.chenDrop.x, y: CURSOR.chenDrop.y }));
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === "b3" ? { ...b, start: 14.5, end: 16, lifting: true } : b
          )
        );
        await wait(900);
        if (cancelled) break;
        release();
        setBlocks((prev) =>
          prev.map((b) => (b.id === "b3" ? { ...b, lifting: false } : b))
        );
        await wait(350);
        if (cancelled) break;
        setSelectedId(null);
        await wait(400);
        if (cancelled) break;

        // --- Book a new dual on the sim: cursor hits + Book, block pops in ---
        await moveCursor(CURSOR.book, 650);
        if (cancelled) break;
        await press(140);
        if (cancelled) break;
        setBookFlash(true);
        release();
        await wait(160);
        if (cancelled) break;
        setBookFlash(false);
        await moveCursor(CURSOR.newSlot, 550);
        if (cancelled) break;
        setBlocks((prev) => {
          if (prev.some((b) => b.id === NEW_BLOCK.id)) return prev;
          return [...prev, { ...NEW_BLOCK, entering: true }];
        });
        setSelectedId(NEW_BLOCK.id);
        await wait(600);
        if (cancelled) break;
        setBlocks((prev) =>
          prev.map((b) => (b.id === NEW_BLOCK.id ? { ...b, entering: false } : b))
        );
        await wait(500);
        if (cancelled) break;
        setSelectedId(null);
        await wait(350);
        if (cancelled) break;

        // --- Cancel Ground · IFR ---
        await moveCursor(CURSOR.ground, 700);
        if (cancelled) break;
        await press();
        if (cancelled) break;
        setSelectedId("b4");
        await wait(280);
        if (cancelled) break;
        setBlocks((prev) =>
          prev.map((b) => (b.id === "b4" ? { ...b, exiting: true } : b))
        );
        release();
        await wait(520);
        if (cancelled) break;
        setBlocks((prev) => prev.filter((b) => b.id !== "b4"));
        setSelectedId(null);
        await wait(500);
        if (cancelled) break;

        // Cursor retreats, then loop.
        await moveCursor(CURSOR.rest, 600);
        if (cancelled) break;
        setCursor((c) => ({ ...c, visible: false }));
        await wait(1100);
      }
    };

    void run();

    return () => {
      cancelled = true;
      clearTimers(timers.current);
      timers.current = [];
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative w-full min-w-0">
      <AppMockShell
        path="/schedule"
        activeNav={2}
        // Pause the idle float so the scripted cursor motion stays readable.
        className="animate-none"
        float={
          <MockFloat
            label="Billed today"
            value={`$${billed.toLocaleString()}.00`}
            meta={`${flown.length} flight${flown.length === 1 ? "" : "s"} · morning block done`}
          />
        }
      >
        <MockHeader
          eyebrow="Dispatch"
          title={DEMO_TODAY}
          meta={
            <>
              <span className="text-foreground">{PHASE_LABEL.morning}</span>
              {" · "}
              {flown.length} flown · {active.length} out · {upcoming.length} to go
            </>
          }
          action={bookFlash ? "Booked" : "+ Book"}
        />

        <div className="grid grid-cols-[72px_1fr] border-b border-border text-[10px] text-muted-foreground">
          <span className="border-r border-border px-2 py-1">Today</span>
          <div className="relative flex justify-between px-1 py-1">
            <span>6:00 AM</span>
            <span className="tabular-nums text-foreground">11:00 AM</span>
            <span>9:00 PM</span>
          </div>
        </div>

        <div className="relative grid flex-1 grid-cols-[72px_1fr] text-[11px]">
          <div className="border-r border-border bg-[#fafbfc]">
            {TAILS.map((tail) => (
              <div
                key={tail.id}
                className="flex h-14 w-full items-center border-b border-border px-2 text-left font-medium text-muted-foreground"
              >
                {tail.label}
              </div>
            ))}
          </div>

          <div className="relative bg-[linear-gradient(to_right,#f0f2f5_1px,transparent_1px)] bg-size-[6.666%_100%]">
            {TAILS.map((tail) => (
              <div key={tail.id} className="relative h-14 border-b border-border">
                {blocks
                  .filter((b) => b.tail === tail.id)
                  .map((block) => {
                    const { left, width } = blockGeometry(block);
                    const status =
                      DEMO_HOUR >= block.end
                        ? "flown"
                        : DEMO_HOUR >= block.start
                          ? "active"
                          : "upcoming";
                    return (
                      <DemoBlockChip
                        key={block.id}
                        label={block.label}
                        tone={block.tone}
                        status={status}
                        left={left}
                        width={width}
                        selected={selectedId === block.id}
                        lifting={block.lifting}
                        entering={block.entering}
                        exiting={block.exiting}
                      />
                    );
                  })}
              </div>
            ))}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 w-px bg-[#e0503a]"
              style={{
                left: `${((DEMO_HOUR - BOARD_START) / (BOARD_END - BOARD_START)) * 100}%`,
              }}
              aria-hidden
            >
              <span className="absolute -top-0.5 -left-[3px] size-[7px] rounded-full bg-[#e0503a] shadow-[0_0_0_3px_rgba(224,80,58,0.18)]" />
            </div>
          </div>
        </div>
      </AppMockShell>

      <DemoCursor {...cursor} />
    </div>
  );
}

function DemoBlockChip({
  label,
  tone,
  status,
  left,
  width,
  selected,
  lifting,
  entering,
  exiting,
}: {
  label: string;
  tone: string;
  status: "flown" | "active" | "upcoming";
  left: number;
  width: number;
  selected?: boolean;
  lifting?: boolean;
  entering?: boolean;
  exiting?: boolean;
}) {
  return (
    <div
      style={{
        left: `${left}%`,
        width: `${width}%`,
        background: tone,
        opacity: exiting ? 0 : status === "flown" ? 0.5 : 1,
        filter: status === "flown" ? "saturate(0.6)" : undefined,
      }}
      className={cn(
        "absolute top-2 flex h-10 items-center gap-1 overflow-hidden rounded-md px-2 text-left text-[10px] font-medium text-white/95 shadow-sm",
        "transition-[left,width,opacity,transform,box-shadow] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
        selected && "z-10 ring-2 ring-white/90",
        lifting && "z-20 scale-[1.06] shadow-lg brightness-110",
        entering && "animate-demo-pop",
        exiting && "scale-75 -rotate-2",
        status === "active" && "ring-1 ring-white/70",
        status === "upcoming" && "border border-dashed border-white/45"
      )}
      aria-hidden
    >
      {status === "flown" && <span className="shrink-0 opacity-90">✓</span>}
      {status === "active" && (
        <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-white" />
      )}
      <span className="truncate">{label}</span>
    </div>
  );
}

function DemoCursor({
  x,
  y,
  visible,
  pressing,
  label,
}: CursorState) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-40 -translate-x-1 -translate-y-1 transition-[left,top,opacity,transform] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]",
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
        className="drop-shadow-[0_3px_8px_rgba(15,23,42,0.4)]"
      >
        <path
          d="M5.5 3.5 19 12.2l-6.2 1.4 1.5 6.4L5.5 3.5Z"
          fill="#0f172a"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute top-6 left-3.5 whitespace-nowrap rounded-full bg-[#1967d2] px-2.5 py-1 text-[11px] font-semibold tracking-tight text-white shadow-lg">
        {label}
      </span>
    </div>
  );
}

function clearTimers(ids: number[]) {
  for (const id of ids) window.clearTimeout(id);
}

function usePrefersReducedMotion() {
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
