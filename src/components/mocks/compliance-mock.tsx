"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

export function ComplianceMock() {
  const [selected, setSelected] = useState("Jordan Lee");

  return (
    <AppMockShell
      path="/compliance"
      activeNav={4}
      float={<MockFloat label="Blocked today" value="3" meta="1 aircraft · 2 members" />}
    >
      <MockHeader eyebrow="Safety" title="Go / No-Go" />
      <div className="grid flex-1 gap-3 p-4 sm:grid-cols-2">
        <Panel
          title="Grounded aircraft"
          selected={selected}
          onSelect={setSelected}
          items={[
            { name: "N5287Q", meta: "Squawk · mag drop", bad: true },
            { name: "N172SP", meta: "Clear", bad: false },
          ]}
        />
        <Panel
          title="Member currencies"
          selected={selected}
          onSelect={setSelected}
          items={[
            { name: "Jordan Lee", meta: "Medical expired", bad: true },
            { name: "Sam Ortiz", meta: "BFR due in 4d", bad: true },
            { name: "Alex Chen", meta: "All current", bad: false },
          ]}
        />
      </div>
    </AppMockShell>
  );
}

function Panel({
  title,
  items,
  selected,
  onSelect,
}: {
  title: string;
  items: { name: string; meta: string; bad: boolean }[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-[#fafbfc] p-3 transition-shadow duration-150 hover:shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => onSelect(item.name)}
              className={cn(
                "flex w-full items-start gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors duration-150",
                selected === item.name
                  ? "bg-white shadow-sm ring-1 ring-border"
                  : "hover:bg-white/80"
              )}
            >
              <span
                className={`mt-1 size-2 shrink-0 rounded-full ${
                  item.bad ? "bg-[#c4142f]" : "bg-success"
                }`}
              />
              <div>
                <p className="text-[11px] font-semibold text-foreground">{item.name}</p>
                <p className="text-[10px] text-muted-foreground">{item.meta}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
