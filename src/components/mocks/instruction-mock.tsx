"use client";

import { useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
} from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

/**
 * Instruction = rates, who may teach whom, and CFI availability.
 * Training & Syllabi owns the curriculum/record. Keep this mock free of
 * stages, grades, and hour bars so the two pages never read as twins.
 */

type InstructionType = {
  id: string;
  name: string;
  rate: string;
  kind: string;
  instructors: string[];
  students: string[];
};

const TYPES: InstructionType[] = [
  {
    id: "private-dual",
    name: "Private · Dual",
    rate: "$65/hr",
    kind: "Flight",
    instructors: ["Alex Chen", "Morgan Blake"],
    students: ["Jordan Lee", "Casey Ng", "Priya Shah"],
  },
  {
    id: "instrument-dual",
    name: "Instrument · Dual",
    rate: "$70/hr",
    kind: "Flight",
    instructors: ["Alex Chen"],
    students: ["Sam Ortiz"],
  },
  {
    id: "ground",
    name: "Ground · Brief",
    rate: "$45/hr",
    kind: "Ground",
    instructors: ["Alex Chen", "Chris Diaz"],
    students: ["Jordan Lee", "Casey Ng"],
  },
];

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function InstructionMock() {
  const [selectedId, setSelectedId] = useState(TYPES[0].id);
  const [cfi, setCfi] = useState("Alex Chen");
  const [days, setDays] = useState([true, true, true, true, true, false, false]);
  const [flash, setFlash] = useState(false);

  const selected = TYPES.find((t) => t.id === selectedId) ?? TYPES[0];

  return (
    <AppMockShell
      path="/settings/instruction"
      activeNav={0}
      float={
        <MockFloat
          label="Default rate"
          value={selected.rate}
          meta={`${selected.name} · bills with the flight`}
        />
      }
    >
      <MockHeader
        eyebrow="Instruction"
        title="Rates & pairing"
        action={flash ? "Added" : "+ Type"}
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />

      <div className="grid flex-1 sm:grid-cols-[1.05fr_1fr]">
        <div className="border-b border-border sm:border-r sm:border-b-0">
          <p className="border-b border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Instruction types
          </p>
          <div className="divide-y divide-border">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                className={cn(
                  "flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition-colors duration-150",
                  selectedId === t.id
                    ? "bg-primary/[0.06]"
                    : "hover:bg-[#f7f8fa]"
                )}
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {t.kind} · {t.instructors.length} CFI
                    {t.instructors.length === 1 ? "" : "s"} · {t.students.length}{" "}
                    student{t.students.length === 1 ? "" : "s"}
                  </p>
                </div>
                <p className="shrink-0 text-[12px] font-semibold tabular-nums text-primary">
                  {t.rate}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex-1 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Who teaches · who learns
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Pairing decides who can be booked together for{" "}
              <span className="font-semibold text-foreground">{selected.name}</span>
              . Syllabus progress lives under Training.
            </p>

            <div className="mt-3">
              <p className="text-[10px] font-medium text-muted-foreground">
                Instructors
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {selected.instructors.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setCfi(name)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-150 active:scale-95",
                      cfi === name
                        ? "bg-primary text-white shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-[#e8eaef]"
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[10px] font-medium text-muted-foreground">
                Assigned students
              </p>
              <ul className="mt-1.5 space-y-1">
                {selected.students.map((name) => (
                  <li
                    key={name}
                    className="flex items-center justify-between rounded-lg bg-[#fafbfc] px-2.5 py-1.5 text-[11px]"
                  >
                    <span className="font-semibold text-foreground">{name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      ↔ {cfi}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border bg-[#fafbfc] px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {cfi} · weekly availability
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Self-booking and the desk only offer times that clear this week.
            </p>
            <div className="mt-2 flex gap-1">
              {DAY_LABELS.map((d, i) => (
                <button
                  key={`${d}-${i}`}
                  type="button"
                  onClick={() =>
                    setDays((prev) =>
                      prev.map((on, idx) => (idx === i ? !on : on))
                    )
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
        </div>
      </div>
    </AppMockShell>
  );
}
