"use client";

import { PHASES } from "@/lib/time-of-day";
import { usePhase } from "@/lib/use-phase";

/**
 * The hero sky's dark twin, for a statement band laid over a photograph.
 *
 * Why this exists: the home page put a flat navy slab directly under a hero
 * whose whole idea is that it changes colour with the visitor's local time. Both
 * were blue and they still did not belong together, because one was a living
 * sky and the other was a rectangle of brand paint. The seam read as two designs
 * meeting rather than one page continuing.
 *
 * So the band now tints from the SAME six phases as the hero, off the same
 * clock. Open the site at dusk and the sky above and the scrim below both go
 * warm; open it at midday and both are blue. They are recognisably the same
 * weather, which is the thing that was missing.
 *
 * Two differences from `HeroAtmosphere`, both deliberate:
 *
 *  - These palettes are authored DARK, because white text sits on top of them
 *    and a photograph sits underneath. The hero's are authored light, over
 *    nothing.
 *  - No drift animation. A gradient sliding over a still photograph reads as a
 *    rendering fault rather than as weather.
 */
export function SkyScrim() {
  const phase = usePhase();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PHASES.map((p) => (
        <div
          key={p}
          className={`band-sky band-sky--${p} absolute inset-0${p === phase ? " band-sky--active" : ""}`} // em-dash-ok: BEM modifier
        />
      ))}
      {/* The horizon. A hard white-to-dark seam is what made the band look
          bolted on; fading the top edge lets the section arrive rather than
          start, and darkening the bottom hands off cleanly to whatever is
          next. Phase-independent, so it is one layer rather than six. */}
      <div className="band-horizon absolute inset-0" />
    </div>
  );
}
