"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

const KPIS = [
  { label: "Flight hours", value: "312.4", delta: "+8%" },
  { label: "Instruction", value: "148.0", delta: "+12%" },
  { label: "Collected", value: "$48.2k", delta: "+5%" },
  { label: "Open squawks", value: "2", delta: "-1" },
];

const BARS = [40, 55, 48, 70, 62, 80, 74];

export function ReportsMock() {
  const [selectedKpi, setSelectedKpi] = useState(0);
  const [selectedBar, setSelectedBar] = useState(5);

  return (
    <AppMockShell
      path="/reports"
      activeNav={0}
      float={<MockFloat label="This month" value="312.4 hrs" meta="Across 6 aircraft" />}
    >
      <MockHeader eyebrow="Insights" title="Reports" />
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {KPIS.map((k, i) => (
          <button
            key={k.label}
            type="button"
            onClick={() => setSelectedKpi(i)}
            className={cn(
              "rounded-xl border bg-[#fafbfc] p-3 text-left transition-all duration-150 active:scale-[0.98]",
              selectedKpi === i
                ? "border-primary/40 bg-primary/[0.04] shadow-sm"
                : "border-border hover:border-primary/20 hover:bg-white"
            )}
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {k.label}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-brand-surface">
              {k.value}
            </p>
            <p className="text-[10px] font-semibold text-success">{k.delta}</p>
          </button>
        ))}
      </div>
      <div className="border-t border-border px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Hours by week
        </p>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {BARS.map((h, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Week ${i + 1}: ${h}%`}
              onClick={() => setSelectedBar(i)}
              className={cn(
                "flex-1 rounded-t-sm transition-all duration-150 origin-bottom hover:brightness-110 active:scale-y-95",
                selectedBar === i ? "bg-primary" : "bg-primary/80 opacity-70 hover:opacity-100"
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}
