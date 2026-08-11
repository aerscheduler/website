"use client";

import { useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
} from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

/**
 * Static fallback for Reports. Must show the three product beats the living
 * demo sells: filters on a report, a saved/scheduled view, and a dashboard
 * you customise (pinned tile + its own window).
 */

const TILES = [
  { label: "Billed", value: "$86,015", delta: "+8%", window: "Jul 2–Jul 31" },
  { label: "Collected", value: "$59,716", delta: "+5%", window: "Jul 2–Jul 31" },
  { label: "Flown", value: "255.9 h", delta: "+13%", window: "Jul 2–Jul 31" },
  {
    label: "Revenue this week",
    value: "$17,370",
    delta: "+9%",
    window: "Jul 24–Jul 31",
    pinned: true,
  },
] as const;

const CHIPS = ["Aircraft is N8830M", "Hours ≥ 1.0"] as const;

const ROWS = [
  { who: "N8830M · Dual", hours: "1.4", billed: "$231.00" },
  { who: "N8830M · Dual", hours: "1.2", billed: "$198.00" },
  { who: "N8830M · Rental", hours: "2.0", billed: "$330.00" },
] as const;

export function ReportsMock() {
  const [view, setView] = useState<"overview" | "report">("overview");
  const [selected, setSelected] = useState(3);

  return (
    <AppMockShell
      path={view === "overview" ? "/reports" : "/reports/revenue"}
      activeNav={0}
      float={
        <MockFloat
          label={view === "overview" ? "Your dashboard" : "Saved view"}
          value={view === "overview" ? "4 tiles" : "Dual · N8830M"}
          meta={
            view === "overview"
              ? "Every figure opens its report"
              : "Weekly email · Mon 7am MT"
          }
        />
      }
    >
      <MockHeader
        eyebrow="Insights"
        title={view === "overview" ? "Overview" : "Revenue by aircraft"}
        action={view === "overview" ? "Customise" : undefined}
      />

      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2">
        <MockPill active={view === "overview"} onClick={() => setView("overview")}>
          Overview
        </MockPill>
        <MockPill active={view === "report"} onClick={() => setView("report")}>
          Revenue
        </MockPill>
        <div className="ml-auto">
          <MockPill active>Last 30 days</MockPill>
        </div>
      </div>

      {view === "overview" ? (
        <div className="grid grid-cols-2 gap-2.5 p-4">
          {TILES.map((tile, i) => (
            <button
              key={tile.label}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "rounded-xl border bg-[#fafbfc] p-3 text-left transition-all duration-150",
                selected === i
                  ? "border-primary/40 bg-primary/[0.04] shadow-sm"
                  : "border-border hover:border-primary/20"
              )}
            >
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {tile.label}
              </p>
              <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                {tile.window}
                {"pinned" in tile && tile.pinned && (
                  <span className="opacity-70"> · pinned</span>
                )}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-brand-surface">
                {tile.value}
              </p>
              <p className="text-[10px] font-semibold text-success">{tile.delta}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[220px] flex-col">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2">
            <span className="rounded-full border border-primary/40 bg-primary/[0.08] px-2.5 py-1 text-[10px] font-semibold text-primary">
              Filters · 2
            </span>
            <span className="rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-semibold text-foreground">
              Dual · N8830M · scheduled
            </span>
            {CHIPS.map((c) => (
              <span
                key={c}
                className="rounded-full bg-muted px-2 py-1 text-[9px] font-medium text-foreground"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_52px_72px] gap-2 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <span>Line</span>
            <span className="text-right">Hours</span>
            <span className="text-right">Billed</span>
          </div>
          <div className="divide-y divide-border">
            {ROWS.map((r) => (
              <div
                key={r.who + r.hours}
                className="grid grid-cols-[1fr_52px_72px] gap-2 px-4 py-2 text-[11px]"
              >
                <span className="truncate font-medium text-foreground">{r.who}</span>
                <span className="text-right tabular-nums text-muted-foreground">
                  {r.hours}
                </span>
                <span className="text-right font-semibold tabular-nums text-foreground">
                  {r.billed}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppMockShell>
  );
}
