"use client";

import { PHASES } from "@/lib/time-of-day";
import { usePhase } from "@/lib/use-phase";

/**
 * Six skies stacked on top of each other; the one matching the visitor's local
 * hour is faded to opacity 1 and the rest sit at 0. Cross-fading pre-authored
 * layers keeps every gradient hand-tuned: interpolating one gradient through
 * the day would drag the mid-points through muddy colours nobody chose.
 *
 * The clock lives in `usePhase` because the home page's statement band reads the
 * same one. See `SkyScrim`, which is this component's dark twin.
 */
export function HeroAtmosphere() {
  const phase = usePhase();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PHASES.map((p) => (
        <div
          key={p}
          className={`sky sky--${p}${p === phase ? " sky--active" : ""}`} // em-dash-ok: BEM modifier
        />
      ))}
      <div className="absolute inset-0 grid-lines opacity-40" />
    </div>
  );
}
