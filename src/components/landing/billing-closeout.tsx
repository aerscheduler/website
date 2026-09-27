"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

/**
 * The billing section's centrepiece: close-out written as the sum it is. The
 * Hobbs reading rolls from ramp-out to ramp-in, then each line of the invoice
 * adds up in turn into the total, and the card on file is charged. A sibling of
 * MaintenanceReadouts (same count-in-view mechanics), but an equation rather
 * than a panel of gauges, so the two sections don't repeat each other. It
 * replaced a navy band Tony didn't like.
 *
 * The figures match the invoice in BillingComposite below it, and are invented.
 * The server render and reduced motion show the final state; otherwise it
 * resets on mount, below the fold, and plays once in view.
 */

const HOBBS_OUT = 1234.5;
const HOBBS_IN = 1237.4;

const TERMS = [
  { label: "Aircraft, N903MV", math: "2.9 Hobbs hr × $165", value: 478.5 },
  { label: "Instruction", math: "2.6 hr × $70", value: 182 },
  { label: "Landing fee", math: "KBDN", value: 15 },
];
const TOTAL = TERMS.reduce((sum, t) => sum + t.value, 0);

const DURATION = 2600;

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
      setT(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run]);

  return t;
}

/** Eased 0 to 1 across the slice [a, b] of the overall progress. */
function slice(t: number, a: number, b: number) {
  const p = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return 1 - (1 - p) ** 3;
}

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Operator({ children }: { children: string }) {
  return (
    <span className="hidden self-center pt-6 text-4xl font-light text-black/20 lg:block" aria-hidden>
      {children}
    </span>
  );
}

export function BillingCloseout() {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -25% 0px" });
  const t = useProgress(inView);
  const hobbs = HOBBS_OUT + (HOBBS_IN - HOBBS_OUT) * slice(t, 0, 0.25);
  const charged = t >= 1;

  return (
    <div ref={ref}>
      <p className="text-center font-mono text-[13px] tracking-wide text-black/45">
        Ramp-in · Hobbs {HOBBS_OUT.toFixed(1)} →{" "}
        <span className="text-[#0b0b0d] tabular-nums">{hobbs.toFixed(1)}</span>
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between lg:gap-4">
        {TERMS.map((term, i) => {
          const v = term.value * slice(t, 0.2 + i * 0.15, 0.45 + i * 0.15);
          return (
            <div key={term.label} className="contents">
              {i > 0 && <Operator>+</Operator>}
              <div className="min-w-0">
                <p className="text-[13px] text-black/45">{term.label}</p>
                <p className="mt-3 text-5xl font-medium tabular-nums tracking-[-0.04em] text-[#0b0b0d] xl:text-6xl">
                  {money(v)}
                </p>
                <p className="mt-2 font-mono text-[13px] text-black/45">{term.math}</p>
              </div>
            </div>
          );
        })}
        <Operator>=</Operator>
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <p className="text-[13px] text-black/45">Invoice total</p>
          <p className="mt-3 text-5xl font-medium tabular-nums tracking-[-0.04em] text-[#2f9e6b] xl:text-6xl">
            {money(TOTAL * slice(t, 0.65, 0.95))}
          </p>
          <p
            className={cn(
              "mt-2 flex items-center gap-1.5 text-[13px] font-medium text-[#2f9e6b] transition-all duration-500",
              charged ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            )}
          >
            <Check className="size-3.5" strokeWidth={2.5} />
            Charged Visa ending 4242
          </p>
        </div>
      </div>
    </div>
  );
}
