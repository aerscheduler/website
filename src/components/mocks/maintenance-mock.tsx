"use client";

import { useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
  MockRow,
} from "@/components/mocks/shell";

const SQUAWKS = [
  { title: "Left mag drop high", tail: "N5287Q", status: "Open", grounded: true },
  { title: "Nav light inop", tail: "N172SP", status: "In progress", grounded: false },
  { title: "Seat rail sticky", tail: "N5287Q", status: "Resolved", grounded: false },
];

const REMINDERS = [
  { title: "100-hour inspection", tail: "N172SP", status: "Due in 12h", grounded: false },
  { title: "ELT battery", tail: "N5287Q", status: "Due in 30d", grounded: false },
  { title: "Transponder check", tail: "N172SP", status: "Due in 60d", grounded: false },
];

export function MaintenanceMock() {
  const [tab, setTab] = useState<"Squawks" | "Reminders">("Squawks");
  const [selected, setSelected] = useState("Left mag drop high");
  const [flash, setFlash] = useState(false);

  const items = tab === "Squawks" ? SQUAWKS : REMINDERS;

  return (
    <AppMockShell
      path="/maintenance"
      activeNav={4}
      float={<MockFloat label="Open squawks" value="2" meta="1 grounding the board" />}
    >
      <MockHeader
        eyebrow="Airworthiness"
        title="Maintenance"
        action={flash ? "Logged" : "+ Squawk"}
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />
      <div className="flex gap-2 border-b border-border px-4 py-2.5">
        {(["Squawks", "Reminders"] as const).map((t) => (
          <MockPill
            key={t}
            active={tab === t}
            onClick={() => {
              setTab(t);
              setSelected(t === "Squawks" ? SQUAWKS[0].title : REMINDERS[0].title);
            }}
          >
            {t}
          </MockPill>
        ))}
      </div>
      <div className="divide-y divide-border">
        {items.map((s) => (
          <MockRow
            key={s.title}
            selected={selected === s.title}
            onClick={() => setSelected(s.title)}
            className="flex-col items-stretch gap-0"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[12px] font-semibold text-foreground">{s.title}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{s.tail}</p>
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
        ))}
      </div>
    </AppMockShell>
  );
}
