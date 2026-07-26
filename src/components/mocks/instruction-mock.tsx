"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

const RATINGS = [
  { name: "Private Pilot", rate: "$65/hr", students: "12 students", instructors: "4 CFIs", width: "66%" },
  { name: "Instrument", rate: "$70/hr", students: "5 students", instructors: "3 CFIs", width: "45%" },
  { name: "Commercial", rate: "$75/hr", students: "2 students", instructors: "2 CFIs", width: "28%" },
];

export function InstructionMock() {
  const [selected, setSelected] = useState("Private Pilot");
  const [days, setDays] = useState([true, true, true, true, true, false, false]);
  const [flash, setFlash] = useState(false);

  return (
    <AppMockShell
      path="/settings"
      activeNav={0}
      float={<MockFloat label="Default rate" value="$65/hr" meta="Private Pilot dual" />}
    >
      <MockHeader
        eyebrow="Instruction"
        title="Ratings & rates"
        action={flash ? "Added" : "+ Rating"}
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />
      <div className="divide-y divide-border">
        {RATINGS.map((r) => (
          <button
            key={r.name}
            type="button"
            onClick={() => setSelected(r.name)}
            className={cn(
              "w-full px-4 py-3.5 text-left transition-colors duration-150",
              selected === r.name ? "bg-primary/[0.06]" : "hover:bg-[#f7f8fa]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-semibold text-foreground">{r.name}</p>
              <p className="text-[12px] font-semibold tabular-nums text-primary">{r.rate}</p>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {r.students} · {r.instructors}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/70 transition-all duration-300"
                style={{ width: selected === r.name ? "85%" : r.width }}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="border-t border-border bg-[#fafbfc] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Alex Chen · availability
        </p>
        <div className="mt-2 flex gap-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <button
              key={`${d}-${i}`}
              type="button"
              onClick={() =>
                setDays((prev) => prev.map((on, idx) => (idx === i ? !on : on)))
              }
              className={cn(
                "flex h-8 flex-1 items-center justify-center rounded-md text-[10px] font-semibold transition-all duration-150 active:scale-95",
                days[i]
                  ? "bg-primary/15 text-primary hover:bg-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-[#e8eaef]"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}
