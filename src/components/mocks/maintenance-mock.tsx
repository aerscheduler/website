"use client";

import { useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
  MockRow,
} from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

const SQUAWKS = [
  { title: "Left mag drop high", tail: "N5287Q", status: "Open", grounded: true },
  { title: "Nav light inop", tail: "N172SP", status: "In progress", grounded: false },
  { title: "Seat rail sticky", tail: "N5287Q", status: "Resolved", grounded: false },
];

const INSPECTIONS = [
  {
    title: "Annual inspection",
    letter: "A",
    tail: "N5287Q",
    amount: "12d late",
    detail: "§91.409(a)",
    percent: 100,
    tone: "danger" as const,
    grounded: true,
  },
  {
    title: "100-hour inspection",
    letter: "1",
    tail: "N172SP",
    amount: "12.0h left",
    detail: "Tach · due soon",
    percent: 88,
    tone: "warning" as const,
    grounded: false,
  },
  {
    title: "ELT",
    letter: "E",
    tail: "N172SP",
    amount: "214d left",
    detail: "§91.207(d)",
    percent: 42,
    tone: "ok" as const,
    grounded: false,
  },
];

export function MaintenanceMock() {
  const [tab, setTab] = useState<"Squawks" | "Inspections">("Squawks");
  const [selected, setSelected] = useState("Left mag drop high");
  const [flash, setFlash] = useState(false);

  return (
    <AppMockShell
      path="/maintenance"
      activeNav={4}
      float={
        <MockFloat
          label={tab === "Inspections" ? "Overdue" : "Open squawks"}
          value={tab === "Inspections" ? "1" : "2"}
          meta="1 grounding the board"
        />
      }
    >
      <MockHeader
        eyebrow="Airworthiness"
        title="Maintenance"
        action={
          flash
            ? tab === "Inspections"
              ? "Added"
              : "Logged"
            : tab === "Inspections"
              ? "Add inspections"
              : "+ Squawk"
        }
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />
      <div className="flex gap-2 border-b border-border px-4 py-2.5">
        {(["Squawks", "Inspections"] as const).map((t) => (
          <MockPill
            key={t}
            active={tab === t}
            onClick={() => {
              setTab(t);
              setSelected(
                t === "Squawks" ? SQUAWKS[0].title : INSPECTIONS[0].title
              );
            }}
          >
            {t}
          </MockPill>
        ))}
      </div>
      <div className="divide-y divide-border">
        {tab === "Squawks"
          ? SQUAWKS.map((s) => (
              <MockRow
                key={s.title}
                selected={selected === s.title}
                onClick={() => setSelected(s.title)}
                className="flex-col items-stretch gap-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-semibold text-foreground">
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {s.tail}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      s.status === "Open"
                        ? "bg-[#c4142f]/10 text-[#c4142f]"
                        : s.status === "Resolved"
                          ? "bg-success/10 text-success"
                          : "bg-[#b7791f]/10 text-[#b7791f]"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p
                  className={`mt-2 text-[10px] font-semibold ${
                    s.grounded ? "text-[#c4142f]" : "invisible"
                  }`}
                >
                  Grounds aircraft on schedule
                </p>
              </MockRow>
            ))
          : INSPECTIONS.map((s) => {
              const rail =
                s.tone === "danger"
                  ? "bg-[#c4142f]"
                  : s.tone === "warning"
                    ? "bg-[#b7791f]"
                    : "bg-primary/70";
              const figure =
                s.tone === "danger"
                  ? "text-[#c4142f]"
                  : s.tone === "warning"
                    ? "text-[#b7791f]"
                    : "text-muted-foreground";
              return (
                <MockRow
                  key={s.title}
                  selected={selected === s.title}
                  onClick={() => setSelected(s.title)}
                  className="flex-col items-stretch gap-0 py-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-foreground">
                        {s.letter}
                      </span>
                      <p className="truncate text-[12px] font-semibold text-foreground">
                        {s.title}
                      </p>
                      {s.grounded && (
                        <span className="shrink-0 text-[9px] font-semibold text-[#c4142f]">
                          Grounds
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "shrink-0 text-[12px] font-semibold tabular-nums",
                        figure
                      )}
                    >
                      {s.amount}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", rail)}
                        style={{ width: `${s.percent}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {s.tail} · {s.detail}
                    </span>
                  </div>
                </MockRow>
              );
            })}
      </div>
    </AppMockShell>
  );
}
