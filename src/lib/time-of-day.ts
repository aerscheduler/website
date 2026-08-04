/**
 * The visitor's local hour, applied to the hero.
 *
 * Two things read from it: the atmosphere behind the headline, and the state of
 * the dispatch board in the product mock. A school owner opening the site at
 * 18:00 should see an evening sky over a day that has mostly been flown — not
 * the same 09:00 screenshot everybody else gets.
 *
 * Phases are cut on flight-school hours rather than astronomical ones: `dawn`
 * is when the first lesson launches, `dusk` is when the last one lands and the
 * desk starts closing out.
 */

export const PHASES = [
  "night",
  "dawn",
  "morning",
  "midday",
  "evening",
  "dusk",
] as const;

export type Phase = (typeof PHASES)[number];

/**
 * Rendered on the server, where we have no idea what timezone the visitor is
 * in. Also the first client render, so hydration matches — the real phase is
 * swapped in on mount. `midday` because it is the most neutral of the six and
 * the least jarring thing to cross-fade away from.
 */
export const DEFAULT_PHASE: Phase = "midday";

export function phaseForHour(hour: number): Phase {
  if (hour < 5) return "night";
  if (hour < 8) return "dawn";
  if (hour < 11) return "morning";
  if (hour < 16) return "midday";
  if (hour < 20) return "evening";
  if (hour < 22) return "dusk";
  return "night";
}

/** The line under the headline. Short, and it must never sound like marketing. */
export const PHASE_LABEL: Record<Phase, string> = {
  night: "Ramp closed · tomorrow is already built",
  dawn: "First launch of the day",
  morning: "Morning block airborne",
  midday: "Midday turn",
  evening: "Evening block airborne",
  dusk: "Last landing · closing out the day",
};

/* -------------------------------------------------------------------------
   The dispatch board, as of right now.

   The board window is fixed (06:00–21:00) so blocks keep stable positions and
   only their *status* moves with the clock. Times are local to the visitor.
   ------------------------------------------------------------------------- */

export const BOARD_START = 6;
export const BOARD_END = 21;

export type Tail = { id: string; label: string };

export const TAILS: Tail[] = [
  { id: "n172sp", label: "N172SP" },
  { id: "n5287q", label: "N5287Q" },
  { id: "sim01", label: "SIM-01" },
];

export type Block = {
  id: string;
  tail: string;
  label: string;
  /** Decimal hours, local. 8.5 = 08:30. */
  start: number;
  end: number;
  /** Brand-family colour; muted automatically once the block is flown. */
  tone: string;
  /** Hobbs + money the flight bills out at, used by the invoice float. */
  hobbs: number;
  amount: number;
};

export const BLOCKS: Block[] = [
  {
    id: "b1",
    tail: "n172sp",
    label: "Dual · Smith",
    start: 8,
    end: 10,
    tone: "#1967d2",
    hobbs: 1.8,
    amount: 279,
  },
  {
    id: "b2",
    tail: "n5287q",
    label: "Rental · Alvarez",
    start: 10.5,
    end: 13,
    tone: "#17876f",
    hobbs: 2.4,
    amount: 372,
  },
  {
    id: "b3",
    tail: "n172sp",
    label: "Solo · Chen",
    start: 13.5,
    end: 15,
    tone: "#2c4589",
    hobbs: 1.2,
    amount: 186,
  },
  {
    id: "b4",
    tail: "sim01",
    label: "Ground · IFR",
    start: 15.5,
    end: 17.5,
    tone: "#9a6a45",
    hobbs: 2,
    amount: 130,
  },
  {
    id: "b5",
    tail: "n5287q",
    label: "Dual · Okafor",
    start: 17.5,
    end: 19.5,
    tone: "#1967d2",
    hobbs: 1.9,
    amount: 294,
  },
];

export type BlockStatus = "flown" | "active" | "upcoming";

export function statusForBlock(block: Block, hour: number): BlockStatus {
  if (hour >= block.end) return "flown";
  if (hour >= block.start) return "active";
  return "upcoming";
}

/** 0–100, where the "now" hairline sits across the board. Null when off-board. */
export function nowOffset(hour: number): number | null {
  if (hour < BOARD_START || hour > BOARD_END) return null;
  return ((hour - BOARD_START) / (BOARD_END - BOARD_START)) * 100;
}

export function blockGeometry(block: Block) {
  const span = BOARD_END - BOARD_START;
  return {
    left: ((block.start - BOARD_START) / span) * 100,
    width: ((block.end - block.start) / span) * 100,
  };
}

export function formatHour(value: number) {
  const h = Math.floor(value);
  const m = Math.round((value - h) * 60);
  const suffix = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${display}:00 ${suffix}` : `${display}:${String(m).padStart(2, "0")} ${suffix}`;
}

/**
 * What the invoice float shows: the flight that most recently landed, because
 * that is the one whose draft invoice just appeared on the desk. Before the
 * first landing there is nothing to bill, so it counts down to the next launch
 * instead.
 */
export function deskState(hour: number) {
  const flown = BLOCKS.filter((b) => statusForBlock(b, hour) === "flown");
  const active = BLOCKS.filter((b) => statusForBlock(b, hour) === "active");
  const upcoming = BLOCKS.filter((b) => statusForBlock(b, hour) === "upcoming");
  const last = flown[flown.length - 1] ?? null;

  return {
    flown,
    active,
    upcoming,
    lastLanded: last,
    next: upcoming[0] ?? null,
    /** Everything billed so far today — the number that counts up in the float. */
    billedToday: flown.reduce((sum, b) => sum + b.amount, 0),
  };
}
