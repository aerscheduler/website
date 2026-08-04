"use client";

import { useEffect, useState } from "react";
import { DEFAULT_PHASE, PHASES, phaseForHour, type Phase } from "@/lib/time-of-day";

/**
 * Six skies stacked on top of each other; the one matching the visitor's local
 * hour is faded to opacity 1 and the rest sit at 0. Cross-fading pre-authored
 * layers keeps every gradient hand-tuned — interpolating one gradient through
 * the day would drag the mid-points through muddy colours nobody chose.
 *
 * Renders `DEFAULT_PHASE` on the server and on the first client paint so the
 * markup matches, then swaps to the real phase in an effect. The swap animates,
 * which is why arriving at 21:00 gives you a hero that settles into dusk rather
 * than snapping.
 */
export function HeroAtmosphere() {
  const [phase, setPhase] = useState<Phase>(DEFAULT_PHASE);

  useEffect(() => {
    const apply = () => setPhase(phaseForHour(new Date().getHours()));
    apply();

    // A visitor who leaves the tab open across a boundary (or a laptop that
    // wakes in a new timezone) should not be stuck in the old sky.
    const timer = window.setInterval(apply, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PHASES.map((p) => (
        <div
          key={p}
          className={`sky sky--${p} absolute inset-0${p === phase ? " sky--active" : ""}`}
        />
      ))}
      <div className="absolute inset-0 grid-lines opacity-40" />
    </div>
  );
}
