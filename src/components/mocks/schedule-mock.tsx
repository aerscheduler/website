"use client";

import { useEffect, useRef, useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/cn";
import {
  BLOCKS,
  BOARD_END,
  BOARD_START,
  DEFAULT_PHASE,
  PHASE_LABEL,
  TAILS,
  blockGeometry,
  deskState,
  formatHour,
  nowOffset,
  phaseForHour,
  statusForBlock,
  type Phase,
} from "@/lib/time-of-day";

/**
 * The dispatch board as it stands at the visitor's local hour.
 *
 * Nothing here is a screenshot: blocks are flown, airborne, or still to go
 * depending on what time it actually is where you are, the hairline sits at
 * now, and the invoice float carries the money billed so far today. Open the
 * page at 07:00 and the ramp is quiet; open it at 19:00 and the day is nearly
 * closed out.
 *
 * A stable default hour is rendered on the server and on the first client paint
 * so hydration matches — the real hour arrives in an effect, and because the
 * board transitions rather than snaps, the correction reads as the board
 * catching up rather than a bug.
 */

/** Deterministic, and the middle of the board so SSR shows a working day. */
const SSR_HOUR = 13;

export function ScheduleMock() {
  const [hour, setHour] = useState(SSR_HOUR);
  const [phase, setPhase] = useState<Phase>(DEFAULT_PHASE);
  const [today, setToday] = useState<string | null>(null);
  const [selectedTail, setSelectedTail] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  // Self-demonstration: the board plays its own story once when it scrolls into
  // view, then rests. `rootMargin: 0` so it does not fire while still below the
  // fold and finish before the visitor arrives.
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -20% 0px" });

  useEffect(() => {
    const apply = () => {
      const now = new Date();
      setHour(now.getHours() + now.getMinutes() / 60);
      setPhase(phaseForHour(now.getHours()));
      setToday(
        now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
      );
    };
    apply();
    const timer = window.setInterval(apply, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const desk = deskState(hour);
  const spotlight = desk.active[0] ?? desk.lastLanded ?? desk.next;

  // The scripted entrance: highlight the flight the desk cares about right now,
  // then let go. Timers are cleared on unmount so a fast scroll-past cannot
  // leave a setState pointed at a dead component.
  useEffect(() => {
    if (!inView || !spotlight) return;
    // Selects the block only. Setting `selectedTail` here would dim every other
    // lane, and arriving at a board with most of the day greyed out reads as a
    // filtered view rather than a full one — dimming belongs to a deliberate
    // click, not to the entrance.
    const timer = window.setTimeout(() => setSelectedBlock(spotlight.id), 260);
    return () => window.clearTimeout(timer);
    // Only re-run on entry, not as the clock ticks past a block boundary —
    // re-selecting under the visitor's cursor would fight them for control.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const billed = useCountUp(desk.billedToday);

  // Dimming keys off `selectedTail`, which only a click sets. The rail
  // highlight keys off this, so the entrance can point at a lane without
  // greying out the rest of the day.
  const activeTail =
    selectedTail ?? BLOCKS.find((b) => b.id === selectedBlock)?.tail ?? null;

  return (
    <div ref={ref}>
      <AppMockShell
        path="/schedule"
        activeNav={2}
        float={
          desk.lastLanded ? (
            <MockFloat
              label="Billed today"
              value={`$${billed.toLocaleString()}.00`}
              meta={`${desk.flown.length} flight${desk.flown.length === 1 ? "" : "s"} · ${desk.lastLanded.label.split(" · ")[1]} just landed`}
            />
          ) : (
            <MockFloat
              label="Next launch"
              value={desk.next ? formatHour(desk.next.start) : "—"}
              meta={desk.next ? `${tailLabel(desk.next.tail)} · ${desk.next.label}` : "Ramp closed"}
            />
          )
        }
      >
        <MockHeader
          eyebrow="Dispatch"
          title={`${today ?? "Today"} · KAPA`}
          meta={
            <>
              <span className="text-foreground">{PHASE_LABEL[phase]}</span>
              {" · "}
              {desk.flown.length} flown · {desk.active.length} out · {desk.upcoming.length} to go
            </>
          }
          action={flash ? "Booked" : "+ Book"}
          onAction={() => {
            setFlash(true);
            window.setTimeout(() => setFlash(false), 1200);
          }}
        />

        {/* Axis above the lanes, where a dispatch board actually puts it — and
            clear of the invoice float, which sits over the bottom-left corner. */}
        <div className="grid grid-cols-[72px_1fr] border-b border-border text-[10px] text-muted-foreground">
          <span className="border-r border-border px-2 py-1">Today</span>
          <div className="relative flex justify-between px-1 py-1">
            <span>{formatHour(BOARD_START)}</span>
            <span className="tabular-nums text-foreground">{formatHour(hour)}</span>
            <span>{formatHour(BOARD_END)}</span>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-[72px_1fr] text-[11px]">
          <div className="border-r border-border bg-[#fafbfc]">
            {TAILS.map((tail) => (
              <button
                key={tail.id}
                type="button"
                onClick={() => setSelectedTail(tail.id)}
                className={cn(
                  "flex h-14 w-full items-center border-b border-border px-2 text-left font-medium transition-colors duration-150",
                  // The rail follows whichever block is selected, so the
                  // entrance still points at a tail without dimming the board.
                  activeTail === tail.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {tail.label}
              </button>
            ))}
          </div>

          <div className="relative bg-[linear-gradient(to_right,#f0f2f5_1px,transparent_1px)] bg-size-[6.666%_100%]">
            {TAILS.map((tail) => (
              <div key={tail.id} className="relative h-14 border-b border-border">
                {BLOCKS.filter((b) => b.tail === tail.id).map((block) => {
                  const status = statusForBlock(block, hour);
                  const { left, width } = blockGeometry(block);
                  return (
                    <Block
                      key={block.id}
                      label={block.label}
                      tone={block.tone}
                      status={status}
                      left={left}
                      width={width}
                      selected={selectedBlock === block.id}
                      dimmed={
                        selectedTail != null &&
                        block.tail !== selectedTail &&
                        selectedBlock !== block.id
                      }
                      onClick={() => {
                        setSelectedBlock(block.id);
                        setSelectedTail(block.tail);
                      }}
                    />
                  );
                })}
              </div>
            ))}
            <NowLine hour={hour} />
          </div>
        </div>
      </AppMockShell>
    </div>
  );
}

function tailLabel(id: string) {
  return TAILS.find((t) => t.id === id)?.label ?? id;
}

/** The hairline at the current time, with the same soft pulse as a live board. */
function NowLine({ hour }: { hour: number }) {
  const offset = nowOffset(hour);
  if (offset == null) return null;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-20 w-px bg-[#e0503a]"
      style={{ left: `${offset}%` }}
      aria-hidden
    >
      <span className="absolute -top-0.5 -left-[3px] size-[7px] rounded-full bg-[#e0503a] shadow-[0_0_0_3px_rgba(224,80,58,0.18)]" />
    </div>
  );
}

function Block({
  label,
  tone,
  status,
  left,
  width,
  selected,
  dimmed,
  onClick,
}: {
  label: string;
  tone: string;
  status: "flown" | "active" | "upcoming";
  left: number;
  width: number;
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        left: `${left}%`,
        width: `${width}%`,
        background: tone,
        // Flown flights stay legible but stop competing with what is airborne.
        opacity: dimmed ? 0.35 : status === "flown" ? 0.5 : 1,
        filter: status === "flown" ? "saturate(0.6)" : undefined,
      }}
      className={cn(
        "absolute top-2 flex h-10 items-center gap-1 overflow-hidden rounded-md px-2 text-left text-[10px] font-medium text-white/95 shadow-sm",
        "transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
        "hover:z-10 hover:brightness-110 hover:shadow-md active:scale-[0.98]",
        selected && "z-10 scale-[1.03] ring-2 ring-white/90",
        status === "active" && "ring-1 ring-white/70",
        status === "upcoming" && "border border-dashed border-white/45"
      )}
    >
      {status === "flown" && <span className="shrink-0 opacity-90">✓</span>}
      {status === "active" && (
        <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-white" />
      )}
      <span className="truncate">{label}</span>
    </button>
  );
}

/**
 * Rolls to `target` whenever it changes, starting from whatever was on screen.
 *
 * Deliberately *not* a count-from-zero on scroll: the first paint has to show a
 * real figure, or SSR and no-JS visitors get `$0.00`, and a reveal-triggered
 * count flashes the final number for a frame before dropping to zero.
 *
 * Starting from the previous value means the roll happens at the one moment it
 * is truthful — when the board learns the visitor's actual local hour and the
 * day's billing corrects from the server's guess to theirs.
 */
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const frame = useRef<number | null>(null);
  // Tween state lives in refs, not deps. Feeding the current value back through
  // a dep restarts the tween on every frame it produces, which stretches a
  // 900ms roll into an indefinite crawl.
  const current = useRef(target);
  const tweening = useRef(target);

  useEffect(() => {
    if (tweening.current === target) return;
    tweening.current = target;

    // A number ticking upward is exactly the movement this setting exists to
    // suppress.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      current.current = target;
      setValue(target);
      return;
    }

    const from = current.current;
    const start = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Same decelerating curve as --ease-out, so the number settles like
      // everything else on the page.
      const eased = 1 - Math.pow(1 - t, 3);
      current.current = Math.round(from + (target - from) * eased);
      setValue(current.current);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, [target]);

  return value;
}
