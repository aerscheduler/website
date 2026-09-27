"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

/**
 * The maintenance section's centrepiece: four instrument-style readouts
 * counting down together when they scroll into view. Three stop with time left,
 * one on each clock an inspection can run on (tach, Hobbs, calendar); the
 * fourth runs out, and its GROUNDED annunciator lights. Tony found fact cards
 * with coloured icons "bland"; this shows the rule instead of listing it.
 *
 * Tails and figures are invented (the same fleet as the hero board). The server
 * render and reduced motion show the final values; otherwise they are reset to
 * the start as the page mounts, below the fold, and count down once in view.
 */

type Readout = { tail: string; item: string; from: number; to: number; unit: string; decimals: number };

const READOUTS: Readout[] = [
  { tail: "N472DP", item: "100-hour inspection", from: 100, to: 12.4, unit: "tach hours left", decimals: 1 },
  { tail: "N903MV", item: "Oil change", from: 50, to: 6.8, unit: "Hobbs hours left", decimals: 1 },
  { tail: "N318TQ", item: "Annual inspection", from: 365, to: 64, unit: "days left", decimals: 0 },
  { tail: "N655RG", item: "100-hour inspection", from: 100, to: 0, unit: "tach hours left", decimals: 1 },
];

const DURATION = 2200;

/** 0 to 1 over DURATION once `run` turns true; 1 from the start without motion. */
function useProgress(run: boolean) {
  const [t, setT] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!run) {
      setT(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setT(1 - (1 - p) ** 3);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run]);

  return t;
}

export function MaintenanceReadouts() {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -25% 0px" });
  const t = useProgress(inView);
  const done = t >= 1;

  return (
    <div ref={ref} className="grid border-y border-black/[0.08] sm:grid-cols-2 lg:grid-cols-4">
      {READOUTS.map((r, i) => {
        const value = r.from + (r.to - r.from) * t;
        const grounded = r.to === 0;
        const lit = grounded && done;
        return (
          <div
            key={r.tail}
            className={cn(
              "relative flex flex-col px-6 py-8 lg:px-8 lg:py-10",
              i > 0 && "border-t border-black/[0.08] sm:border-t-0",
              i % 2 === 1 && "sm:border-l sm:border-black/[0.08]",
              i === 2 && "sm:border-t lg:border-t-0 lg:border-l",
              i === 3 && "sm:border-t lg:border-t-0"
            )}
          >
            <div className="flex items-center justify-between gap-3 text-[13px]">
              <span className="font-mono tracking-wide text-black/70">{r.tail}</span>
              <span
                className={cn(
                  "rounded-[5px] border px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] transition-all duration-500",
                  grounded
                    ? lit
                      ? "border-[#d64545] bg-[#d64545] text-white shadow-[0_0_18px_rgba(214,69,69,0.55)]"
                      : "border-black/10 text-black/25"
                    : "border-transparent text-transparent"
                )}
                aria-hidden={!grounded}
              >
                GROUNDED
              </span>
            </div>
            <p className="mt-1 text-[13px] text-black/45">{r.item}</p>
            <p
              className={cn(
                "mt-8 text-6xl font-medium tabular-nums tracking-[-0.04em] transition-colors duration-500 lg:text-7xl",
                lit ? "text-[#d64545]" : "text-[#0b0b0d]"
              )}
            >
              {value.toFixed(r.decimals)}
            </p>
            <p className="mt-2 text-[14px] text-black/50">{r.unit}</p>
            <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className={cn("h-full rounded-full", grounded ? "bg-[#d64545]" : value / r.from < 0.2 ? "bg-[#e07b28]" : "bg-[#0b0b0d]")}
                style={{ width: `${(value / r.from) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
