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

const PEOPLE = [
  { name: "Morgan Blake", role: "Owner · Admin", tone: "bg-primary/10 text-primary", group: "All" },
  { name: "Chris Diaz", role: "Dispatcher", tone: "bg-[#2c4589]/10 text-[#2c4589]", group: "All" },
  { name: "Alex Chen", role: "Instructor", tone: "bg-[#17876f]/10 text-[#17876f]", group: "Instructors" },
  { name: "Jordan Lee", role: "Student", tone: "bg-muted text-muted-foreground", group: "Students" },
  { name: "Sam Ortiz", role: "Renter", tone: "bg-muted text-muted-foreground", group: "Renters" },
];

const TABS = ["All", "Instructors", "Students", "Renters"] as const;

export function PeopleMock() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [selected, setSelected] = useState("Morgan Blake");
  const [flash, setFlash] = useState(false);

  return (
    <AppMockShell
      path="/people"
      activeNav={1}
      float={<MockFloat label="Roster" value="48" meta="members · 3 join requests" />}
    >
      <MockHeader
        eyebrow="Organization"
        title="People"
        action={flash ? "Sent" : "Invite"}
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />
      <div className="flex gap-1.5 overflow-hidden border-b border-border px-4 py-2.5">
        {TABS.map((t) => (
          <MockPill key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </MockPill>
        ))}
      </div>
      <div className="divide-y divide-border">
        {PEOPLE.map((p) => {
          const match = tab === "All" || p.group === tab;
          return (
            <MockRow
              key={p.name}
              selected={match && selected === p.name}
              onClick={() => {
                if (!match) return;
                setSelected(p.name);
              }}
              className={cn("py-2.5", !match && "pointer-events-none opacity-35")}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                {p.name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-foreground">{p.name}</p>
                <span className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${p.tone}`}>
                  {p.role}
                </span>
              </div>
            </MockRow>
          );
        })}
      </div>
    </AppMockShell>
  );
}
