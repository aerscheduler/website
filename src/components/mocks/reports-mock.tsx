"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader, MockPill } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

/**
 * The dashboard as it actually ships.
 *
 * Two details are the whole point of the product and so are the two things this
 * mock must not smooth away: each tile states **its own window** (that is what
 * lets "this week" sit beside ", year to date"), and one tile is **pinned** to a
 * range of its own while the rest follow the board's selector. A mock showing
 * four identical cards over one date range would be a picture of the old
 * Overview we replaced.
 */

const RANGES = ["Last 30 days", "Year to date"] as const;

/** Values per board range; the pinned tile ignores the selector on purpose. */
const TILES = [
  { label: "Billed", values: ["$86,015", "$742,180"], delta: "+8%", window: null },
  { label: "Collected", values: ["$59,716", "$688,402"], delta: "+5%", window: null },
  { label: "Flown", values: ["255.9 h", "2,914 h"], delta: "+13%", window: null },
  {
    label: "Revenue this week",
    values: ["$17,370", "$17,370"],
    delta: "+9%",
    window: "Jul 24–Jul 31",
  },
] as const;

const FLEET = [
  { tail: "N8830M", pct: 100 },
  { tail: "N4417W", pct: 88 },
  { tail: "N2201Q", pct: 53 },
  { tail: "N5589T", pct: 29 },
  { tail: "N6614D", pct: 20 },
];

const WINDOWS = ["Jul 2–Jul 31", "Jan 1–Jul 31"] as const;

export function ReportsMock() {
  const [range, setRange] = useState(0);
  const [selected, setSelected] = useState(3);

  return (
    <AppMockShell
      path="/reports"
      activeNav={0}
      float={<MockFloat label="Revenue by aircraft" value="N8830M" meta="$26,149 billed" />}
    >
      <MockHeader eyebrow="Insights" title="Overview" action="Customise" />

      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2">
        {RANGES.map((label, i) => (
          <MockPill key={label} active={range === i} onClick={() => setRange(i)}>
            {label}
          </MockPill>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-4">
        {TILES.map((tile, i) => (
          <button
            key={tile.label}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              "rounded-xl border bg-[#fafbfc] p-3 text-left transition-all duration-150 active:scale-[0.98]",
              selected === i
                ? "border-primary/40 bg-primary/[0.04] shadow-sm"
                : "border-border hover:border-primary/20 hover:bg-white"
            )}
          >
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {tile.label}
            </p>
            {/* Never dropped: with mixed ranges the number means nothing without it. */}
            <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
              {tile.window ?? WINDOWS[range]}
              {tile.window && <span className="opacity-70"> · pinned</span>}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-brand-surface">
              {tile.values[range]}
            </p>
            <p className="text-[10px] font-semibold text-success">{tile.delta}</p>
          </button>
        ))}
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Billed by aircraft
        </p>
        <div className="mt-2.5 space-y-1.5">
          {FLEET.map((row) => (
            <div key={row.tail} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-[10px] tabular-nums text-muted-foreground">
                {row.tail}
              </span>
              <span
                className="h-2 rounded-sm bg-primary/80 transition-all duration-300"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}
