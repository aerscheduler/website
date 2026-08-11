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
 * Cursor waypoints are measured from real DOM targets (or projected from
 * board geometry when dragging), moves follow a bezier, and the sequence
 * reverses itself so the board never visibly hard-resets.
 */

const DEMO_HOUR = 11;
const DEMO_TODAY = "Mon · KAPA";

const CHEN_HOME = { start: 13.5, end: 15 };
const CHEN_LATER = { start: 14.5, end: 16 };
const OKAFOR_HOME_END = 19.5;
const OKAFOR_STRETCH_END = 20.5;

type DemoBlock = Block & {
  entering?: boolean;
  exiting?: boolean;
  lifting?: boolean;
  resizing?: boolean;
};

type CursorState = {
  x: number;
  y: number;
  visible: boolean;
  pressing: boolean;
  label: string;
};

type MenuState = {
  x: number;
  y: number;
  highlight: "cancel" | null;
} | null;

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

const GROUND_BLOCK: DemoBlock = {
  ...(BLOCKS.find((b) => b.id === "b4") as Block),
  entering: true,
};

const REST = { x: 82, y: 88 };

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
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [blocks, setBlocks] = useState<DemoBlock[]>(SEED);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bookFlash, setBookFlash] = useState(false);
  const [menu, setMenu] = useState<MenuState>(null);
  const [cursor, setCursor] = useState<CursorState>({
    ...REST,
    visible: false,
    pressing: false,
    label: "Maya · Desk",
  });
  const cursorRef = useRef(cursor);
  cursorRef.current = cursor;
  const timers = useRef<number[]>([]);
  const raf = useRef<number | null>(null);

  const flown = useMemo(
    () => blocks.filter((b) => !b.exiting && DEMO_HOUR >= b.end),
    [blocks]
  );
  const active = useMemo(
    () =>
      blocks.filter(
        (b) => !b.exiting && DEMO_HOUR >= b.start && DEMO_HOUR < b.end
      ),
    [blocks]
  );
  const upcoming = useMemo(
    () => blocks.filter((b) => !b.exiting && DEMO_HOUR < b.start),
    [blocks]
  );
  const billed = flown.reduce((sum, b) => sum + b.amount, 0);

  useEffect(() => {
    const clearAll = () => {
      clearTimers(timers.current);
      timers.current = [];
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };

    if (!inView) {
      clearAll();
      setBlocks(SEED);
      setSelectedId(null);
      setBookFlash(false);
      setMenu(null);
      setCursor({ ...REST, visible: false, pressing: false, label: "Maya · Desk" });
      return;
    }

    let cancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timers.current.push(id);
      });

    /** Tip of the cursor as % of the stage, aimed at a live DOM target. */
    const pointFor = (
      selector: string,
      anchor: "center" | "right-edge" = "center"
    ): { x: number; y: number } | null => {
      const stage = stageRef.current;
      if (!stage) return null;
      const el =
        selector === "[data-demo=book]"
          ? [...stage.querySelectorAll("button")].find((b) =>
              /Book/.test(b.textContent ?? "")
            )
          : stage.querySelector(selector);
      if (!el) return null;
      const sr = stage.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const px =
        anchor === "right-edge" ? er.right - 3 : er.left + er.width / 2;
      const py = er.top + er.height / 2;
      return {
        x: ((px - sr.left) / sr.width) * 100,
        y: ((py - sr.top) / sr.height) * 100,
      };
    };

    /**
     * Project a block's center or right edge onto the stage *as if* it already
     * had the given start/end — so the cursor can lead the CSS transition
     * instead of chasing a still-settling DOM rect.
     */
    const pointForBlockAt = (
      id: string,
      start: number,
      end: number,
      anchor: "center" | "right-edge" = "center"
    ): { x: number; y: number } | null => {
      const stage = stageRef.current;
      if (!stage) return null;
      const el = stage.querySelector(`[data-demo="block-${id}"]`);
      if (!el) return null;
      const row = el.parentElement;
      if (!row) return null;
      const sr = stage.getBoundingClientRect();
      const rr = row.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const span = BOARD_END - BOARD_START;
      const leftPx = rr.left + ((start - BOARD_START) / span) * rr.width;
      const rightPx = rr.left + ((end - BOARD_START) / span) * rr.width;
      const px =
        anchor === "right-edge"
          ? rightPx - 3
          : (leftPx + rightPx) / 2;
      const py = er.top + er.height / 2;
      return {
        x: ((px - sr.left) / sr.width) * 100,
        y: ((py - sr.top) / sr.height) * 100,
      };
    };

    /**
     * Quadratic bezier from current tip → target, with a soft lateral bow so
     * the path reads as a hand, not a tween. Drag/resize use a straight track
     * and the same ease-out as the chip's CSS so the tip stays on the block.
     */
    const moveCursor = (
      to: { x: number; y: number },
      ms = 780,
      opts: {
        keepPressing?: boolean;
        /** Straight path + CSS-matched ease — use while dragging a chip. */
        tracking?: boolean;
      } = {}
    ) => {
      const from = { x: cursorRef.current.x, y: cursorRef.current.y };
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const dist = Math.hypot(dx, dy);
      // No bow while tracking — a curved tip lags a straight-moving chip.
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
          // Free moves: ease-in-out. Tracking: cubic-bezier(0.33,1,0.68,1)
          // to match DemoBlockChip's transition timing function.
          const e = opts.tracking
            ? cssEaseOut(t)
            : t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          const omt = 1 - e;
          const x = omt * omt * from.x + 2 * omt * e * mid.x + e * e * to.x;
          const y = omt * omt * from.y + 2 * omt * e * mid.y + e * e * to.y;
          setCursor((c) => ({ ...c, x, y }));
          if (t < 1) {
            raf.current = requestAnimationFrame(tick);
          } else {
            raf.current = null;
            resolve();
          }
        };
        // Kick the first frame immediately so we don't lose a rAF to the chip.
        tick(start);
      });
    };

    const go = async (
      selector: string,
      ms = 780,
      anchor: "center" | "right-edge" = "center"
    ) => {
      const point = pointFor(selector, anchor);
      if (!point) return;
      await moveCursor(point, ms);
    };

    const press = async (downMs = 160) => {
      setCursor((c) => ({ ...c, pressing: true }));
      await wait(downMs);
    };

    const release = () => setCursor((c) => ({ ...c, pressing: false }));

    /** Drag a block; tip and chip share one 700ms ease-out beat. */
    const dragBlock = async (
      id: string,
      next: { start: number; end: number },
      ms = 700
    ) => {
      const dest = pointForBlockAt(id, next.start, next.end, "center");
      if (!dest) return;
      setSelectedId(id);
      setBlocks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, lifting: true } : b))
      );
      await wait(160);
      if (cancelled) return;
      // Start the tip a frame early so it leads the CSS left transition.
      const moving = moveCursor(dest, ms, {
        keepPressing: true,
        tracking: true,
      });
      await wait(16);
      if (cancelled) return;
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, ...next, lifting: true } : b
        )
      );
      await moving;
      if (cancelled) return;
      release();
      setBlocks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, lifting: false } : b))
      );
      setSelectedId(null);
    };

    /** Live start/end from the chip's current box (after transitions settle). */
    const blocksRefSnapshot = (id: string) => {
      const stage = stageRef.current;
      const el = stage?.querySelector(`[data-demo="block-${id}"]`) as
        | HTMLElement
        | null;
      if (!el) {
        const seed = SEED.find((b) => b.id === id);
        return seed ? { start: seed.start, end: seed.end } : null;
      }
      const row = el.parentElement;
      if (!row) return null;
      const rr = row.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const span = BOARD_END - BOARD_START;
      const start = BOARD_START + ((er.left - rr.left) / rr.width) * span;
      const end = BOARD_START + ((er.right - rr.left) / rr.width) * span;
      return { start, end };
    };

    /** Stretch (or shrink) a block's end; tip leads the width transition. */
    const resizeBlockEnd = async (id: string, end: number, ms = 700) => {
      const block = blocksRefSnapshot(id);
      if (!block) return;
      const dest = pointForBlockAt(id, block.start, end, "right-edge");
      if (!dest) return;
      setSelectedId(id);
      setBlocks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, resizing: true } : b))
      );
      await wait(140);
      if (cancelled) return;
      const moving = moveCursor(dest, ms, {
        keepPressing: true,
        tracking: true,
      });
      await wait(16);
      if (cancelled) return;
      setBlocks((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, end, resizing: true } : b
        )
      );
      await moving;
      if (cancelled) return;
      release();
      setBlocks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, resizing: false } : b))
      );
      setSelectedId(null);
    };

    const menuPoint = (): { x: number; y: number } | null => {
      const stage = stageRef.current;
      if (!stage) return null;
      const item = stage.querySelector('[data-demo="ctx-cancel"]');
      if (!item) return null;
      const sr = stage.getBoundingClientRect();
      const er = item.getBoundingClientRect();
      return {
        x: ((er.left + er.width / 2 - sr.left) / sr.width) * 100,
        y: ((er.top + er.height / 2 - sr.top) / sr.height) * 100,
      };
    };

    const cancelViaContextMenu = async (blockId: string) => {
      await go(`[data-demo="block-${blockId}"]`, 700);
      if (cancelled) return;
      await wait(120);
      if (cancelled) return;
      // Right-click beat: brief dip, then menu.
      setCursor((c) => ({ ...c, pressing: true }));
      await wait(110);
      if (cancelled) return;
      release();
      setSelectedId(blockId);
      setMenu({
        x: cursorRef.current.x + 1.2,
        y: cursorRef.current.y + 1.4,
        highlight: null,
      });
      await wait(320);
      if (cancelled) return;

      const cancelTarget =
        menuPoint() ?? {
          x: cursorRef.current.x + 4,
          y: cursorRef.current.y + 6,
        };
      await moveCursor(cancelTarget, 420);
      if (cancelled) return;
      setMenu((m) => (m ? { ...m, highlight: "cancel" } : m));
      await wait(160);
      if (cancelled) return;
      await press(200);
      if (cancelled) return;
      setMenu(null);
      setBlocks((prev) =>
        prev.map((b) => (b.id === blockId ? { ...b, exiting: true } : b))
      );
      release();
      await wait(480);
      if (cancelled) return;
      setBlocks((prev) => prev.filter((b) => b.id !== blockId));
      setSelectedId(null);
    };

    const run = async () => {
      // First paint only — after that the reverse phase restores seed visually.
      setBlocks(SEED.map((b) => ({ ...b })));
      setSelectedId(null);
      setBookFlash(false);
      setMenu(null);
      // Cursor stays on stage for the whole loop — park at REST, never hide.
      setCursor({
        ...REST,
        visible: true,
        pressing: false,
        label: "Maya · Desk",
      });
      await wait(600);
      if (cancelled) return;

      while (!cancelled) {
        // --- Move Solo · Chen later ---
        await go('[data-demo="block-b3"]', 820);
        if (cancelled) break;
        await wait(100);
        if (cancelled) break;
        await press(220);
        if (cancelled) break;
        await dragBlock("b3", CHEN_LATER);
        if (cancelled) break;
        await wait(360);
        if (cancelled) break;

        // --- Stretch Dual · Okafor's end ---
        await go('[data-demo="block-b5"]', 700, "right-edge");
        if (cancelled) break;
        await wait(100);
        if (cancelled) break;
        await press(220);
        if (cancelled) break;
        await resizeBlockEnd("b5", OKAFOR_STRETCH_END);
        if (cancelled) break;
        await wait(340);
        if (cancelled) break;

        // --- Book Dual · Patel ---
        await go("[data-demo=book]", 680);
        if (cancelled) break;
        await wait(120);
        if (cancelled) break;
        await press(240);
        if (cancelled) break;
        setBookFlash(true);
        release();
        await wait(140);
        if (cancelled) break;
        setBookFlash(false);
        setBlocks((prev) => {
          if (prev.some((b) => b.id === NEW_BLOCK.id)) return prev;
          return [...prev, { ...NEW_BLOCK, entering: true }];
        });
        setSelectedId(NEW_BLOCK.id);
        await go('[data-demo="block-demo-new"]', 600);
        if (cancelled) break;
        await wait(420);
        if (cancelled) break;
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === NEW_BLOCK.id ? { ...b, entering: false } : b
          )
        );
        setSelectedId(null);
        await wait(280);
        if (cancelled) break;

        // --- Right-click → Cancel Ground · IFR ---
        await cancelViaContextMenu("b4");
        if (cancelled) break;
        await wait(320);
        if (cancelled) break;

        // ===== Reverse so the board returns to seed without a hard cut =====

        // Move Chen home
        await go('[data-demo="block-b3"]', 720);
        if (cancelled) break;
        await wait(80);
        if (cancelled) break;
        await press(200);
        if (cancelled) break;
        await dragBlock("b3", CHEN_HOME);
        if (cancelled) break;
        await wait(280);
        if (cancelled) break;

        // Shrink Okafor back
        await go('[data-demo="block-b5"]', 640, "right-edge");
        if (cancelled) break;
        await wait(80);
        if (cancelled) break;
        await press(200);
        if (cancelled) break;
        await resizeBlockEnd("b5", OKAFOR_HOME_END);
        if (cancelled) break;
        await wait(280);
        if (cancelled) break;

        // Right-click → Cancel the Patel booking we just made
        await cancelViaContextMenu(NEW_BLOCK.id);
        if (cancelled) break;
        await wait(240);
        if (cancelled) break;

        // Soft-restore Ground · IFR while cursor drifts away — no flash reset.
        setBlocks((prev) => {
          if (prev.some((b) => b.id === "b4")) return prev;
          return [...prev, { ...GROUND_BLOCK, entering: true }];
        });
        await moveCursor(REST, 700);
        if (cancelled) break;
        await wait(360);
        if (cancelled) break;
        setBlocks((prev) =>
          prev.map((b) => (b.id === "b4" ? { ...b, entering: false } : b))
        );
        // Idle at REST — still visible — then the next cycle starts from here.
        await wait(700);
        if (cancelled) break;
      }
    };

    void run();

    return () => {
      cancelled = true;
      clearAll();
    };
    // dragBlock reads live DOM; blocks state is updated inside the effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className="relative w-full min-w-0">
      <div ref={stageRef} className="relative w-full min-w-0">
        <AppMockShell
          path="/schedule"
          activeNav={2}
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
                {flown.length} flown · {active.length} out · {upcoming.length}{" "}
                to go
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
                <div
                  key={tail.id}
                  className="relative h-14 border-b border-border"
                >
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
                          id={block.id}
                          label={block.label}
                          tone={block.tone}
                          status={status}
                          left={left}
                          width={width}
                          selected={selectedId === block.id}
                          lifting={block.lifting}
                          entering={block.entering}
                          exiting={block.exiting}
                          resizing={block.resizing}
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

        {menu && (
          <DemoContextMenu
            x={menu.x}
            y={menu.y}
            highlight={menu.highlight}
          />
        )}
        <DemoCursor {...cursor} />
      </div>
    </div>
  );
}

function DemoBlockChip({
  id,
  label,
  tone,
  status,
  left,
  width,
  selected,
  lifting,
  entering,
  exiting,
  resizing,
}: {
  id: string;
  label: string;
  tone: string;
  status: "flown" | "active" | "upcoming";
  left: number;
  width: number;
  selected?: boolean;
  lifting?: boolean;
  entering?: boolean;
  exiting?: boolean;
  resizing?: boolean;
}) {
  return (
    <div
      data-demo={`block-${id}`}
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
        selected && "z-10 brightness-110 shadow-md",
        lifting && "z-20 scale-[1.06] shadow-lg brightness-110",
        resizing && "z-20 shadow-lg brightness-110",
        entering && "animate-demo-pop",
        exiting && "scale-75 -rotate-2",
        status === "active" && "brightness-105"
      )}
      aria-hidden
    >
      {status === "flown" && <span className="shrink-0 opacity-90">✓</span>}
      {status === "active" && (
        <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-white" />
      )}
      <span className="truncate">{label}</span>
      {resizing && (
        <span className="absolute inset-y-1.5 right-1 w-1 rounded-full bg-white/90 shadow-sm" />
      )}
    </div>
  );
}

function DemoContextMenu({
  x,
  y,
  highlight,
}: {
  x: number;
  y: number;
  highlight: "cancel" | null;
}) {
  return (
    <div
      className="pointer-events-none absolute z-50 min-w-[148px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-lg animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="px-3 py-1.5 text-foreground/80">Open</div>
      <div className="px-3 py-1.5 text-foreground/80">Edit times</div>
      <div className="my-1 h-px bg-border" />
      <div
        data-demo="ctx-cancel"
        className={cn(
          "px-3 py-1.5 font-medium text-[#c0392b]",
          highlight === "cancel" && "bg-[#c0392b]/10"
        )}
      >
        Cancel booking
      </div>
    </div>
  );
}

function DemoCursor({ x, y, visible, pressing, label }: CursorState) {
  return (
    <div
      className={cn(
        // Tip is at left/top of this node; origin-top-left keeps press scale
        // from sliding the tip up/left off the click target.
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

function clearTimers(ids: number[]) {
  for (const id of ids) window.clearTimeout(id);
}

/**
 * Matches DemoBlockChip: transition ease-[cubic-bezier(0.33,1,0.68,1)].
 * Solves the unit bezier for x, then samples y — so the tip and chip share
 * the same progress curve while dragging.
 */
function cssEaseOut(t: number) {
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
