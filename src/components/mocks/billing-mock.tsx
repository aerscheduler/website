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

const ROWS = [
  { name: "Alex Chen", item: "N172SP · Dual 1.2", amount: "$186.00", status: "Due" as const, tone: "text-[#b7791f] bg-[#b7791f]/10" },
  { name: "Jordan Lee", item: "N5287Q · Rental 1.8", amount: "$252.00", status: "Paid" as const, tone: "text-success bg-success/10" },
  { name: "Sam Ortiz", item: "Ground · Weather", amount: "$65.00", status: "Due" as const, tone: "text-[#b7791f] bg-[#b7791f]/10" },
  { name: "Casey Ng", item: "SIM-01 · Instrument", amount: "$90.00", status: "Paid" as const, tone: "text-success bg-success/10" },
];

const TABS = ["All", "Due", "Paid"] as const;

export function BillingMock() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Due");
  const [selected, setSelected] = useState("Alex Chen");
  const [flash, setFlash] = useState(false);

  return (
    <AppMockShell
      path="/billing"
      activeNav={3}
      float={<MockFloat label="Outstanding" value="$251.00" meta="2 invoices due" />}
    >
      <MockHeader
        eyebrow="Accounts receivable"
        title="Billing"
        action={flash ? "Created" : "+ Invoice"}
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />
      <div className="flex gap-2 border-b border-border px-4 py-2.5">
        {TABS.map((t) => (
          <MockPill key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </MockPill>
        ))}
      </div>
      <div className="divide-y divide-border">
        {ROWS.map((r) => {
          const match = tab === "All" || r.status === tab;
          return (
            <MockRow
              key={r.name}
              selected={match && selected === r.name}
              onClick={() => {
                if (!match) return;
                setSelected(r.name);
              }}
              className={cn(!match && "pointer-events-none opacity-35")}
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                {r.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-foreground">{r.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{r.item}</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-semibold tabular-nums text-foreground">{r.amount}</p>
                <span className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${r.tone}`}>
                  {r.status}
                </span>
              </div>
            </MockRow>
          );
        })}
      </div>
    </AppMockShell>
  );
}
