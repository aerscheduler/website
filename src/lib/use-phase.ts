"use client";

import { useEffect, useState } from "react";
import { DEFAULT_PHASE, phaseForHour, type Phase } from "@/lib/time-of-day";

/**
 * The visitor's local phase of the day, shared by everything that tints itself.
 *
 * Extracted out of `HeroAtmosphere` when the home page grew a second surface
 * that needed the same clock. Two components each running their own
 * `setInterval` would drift apart within a minute of a boundary, and the one
 * thing worse than a hero that does not change with the day is a hero and a
 * band that disagree about what time it is.
 *
 * Returns `DEFAULT_PHASE` on the server and on the first client paint so the
 * markup matches, then swaps to the real phase in an effect. That swap is what
 * every consumer animates, which is why arriving at 21:00 gives you a page that
 * settles into dusk rather than snapping to it.
 */
export function usePhase(): Phase {
  const [phase, setPhase] = useState<Phase>(DEFAULT_PHASE);

  useEffect(() => {
    const apply = () => setPhase(phaseForHour(new Date().getHours()));
    apply();

    // A visitor who leaves the tab open across a boundary (or a laptop that
    // wakes in a new timezone) should not be stuck in the old sky.
    const timer = window.setInterval(apply, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return phase;
}
