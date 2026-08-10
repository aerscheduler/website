"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader, MockPill } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

/**
 * An enrollment, not a course list.
 *
 * The course list is the boring half of this module; the half worth showing a prospect is
 * the one screen nothing else in their stack has: a student's lessons with their grades,
 * next to the HOURS the certificate actually requires. Those two are separate on purpose
 * (see `CourseRequirement` in the schema) because one night cross-country credits four
 * requirements at once, so "lessons ticked" and "hours logged" never move together.
 *
 * The stage tabs switch which lessons show, so the thing a visitor is most likely to poke
 * is also the thing that demonstrates the structure.
 */

type Lesson = { name: string; grade: string | null; note: string };

const STAGES: { name: string; lessons: Lesson[] }[] = [
  {
    name: "Stage 1: Presolo",
    lessons: [
      { name: "Flight 1: Effects of controls", grade: "Complete", note: "1.2 dual · Okafor" },
      { name: "Flight 2: Slow flight and stalls", grade: "Complete", note: "1.4 dual · Okafor" },
      { name: "Flight 3: Takeoffs and landings", grade: "Repeat", note: "1.1 dual · crosswind" },
      { name: "Flight 4: Presolo check", grade: null, note: "Not yet flown" },
    ],
  },
  {
    name: "Stage 2: Solo",
    lessons: [
      { name: "Flight 8: First solo", grade: null, note: "Needs A.2 endorsement" },
      { name: "Flight 9: Solo pattern work", grade: null, note: "Not yet flown" },
    ],
  },
  {
    name: "Stage 3: Cross-country",
    lessons: [
      { name: "Flight 14: Dual cross-country", grade: null, note: "Not yet flown" },
      { name: "Flight 15: Night cross-country", grade: null, note: "Credits 4 requirements" },
    ],
  },
];

const REQUIREMENTS = [
  { label: "Total flight time", have: "18.6", need: "40", width: "47%" },
  { label: "Dual instruction received", have: "16.2", need: "20", width: "81%" },
  { label: "Solo flight time", have: "0.0", need: "10", width: "2%" },
  { label: "Night flight training", have: "1.8", need: "3", width: "60%" },
];

const GRADE_CLASS: Record<string, string> = {
  Complete: "bg-emerald-500/12 text-emerald-700",
  Repeat: "bg-amber-500/15 text-amber-700",
};

export function TrainingMock() {
  const [stage, setStage] = useState(0);

  return (
    <AppMockShell
      path="/training/enrollments/218"
      activeNav={3}
      float={<MockFloat label="Pace" value="On track" meta="Last lesson 4 days ago" />}
    >
      <MockHeader eyebrow="Private Pilot · Part 61" title="Jordan Lee" action="Record lesson" />

      <div className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-2.5">
        {STAGES.map((s, i) => (
          <MockPill key={s.name} active={stage === i} onClick={() => setStage(i)}>
            {s.name.split(": ")[1]}
          </MockPill>
        ))}
      </div>

      <div className="divide-y divide-border">
        {STAGES[stage].lessons.map((l) => (
          <div key={l.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-foreground">{l.name}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{l.note}</p>
            </div>
            {l.grade ? (
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  GRADE_CLASS[l.grade]
                )}
              >
                {l.grade}
              </span>
            ) : (
              <span className="shrink-0 text-[10px] text-muted-foreground">–</span>
            )}
          </div>
        ))}
      </div>

      {/* Hours, separate from lessons, because the certificate is written in hours. */}
      <div className="mt-auto border-t border-border bg-[#fafbfc] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          §61.109 requirements
        </p>
        <div className="mt-2 space-y-2">
          {REQUIREMENTS.map((r) => (
            <div key={r.label}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-[10px] text-foreground">{r.label}</p>
                <p className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                  {r.have} / {r.need}
                </p>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/70 transition-all duration-300"
                  style={{ width: r.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}
