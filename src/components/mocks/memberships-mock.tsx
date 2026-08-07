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

/**
 * The membership roster, as a club treasurer sees it on the 1st.
 *
 * The tier filter is the interactive bit on purpose: "tiers are plans" is the thing a club
 * has to believe before the rest of the page means anything, and a row of pills they can
 * press says it faster than a bullet does. The statuses are chosen to show that a paused
 * member stops costing money and an owed part-period is visible rather than silent.
 */
const ROWS = [
  {
    name: "Hollis Bramley",
    tier: "Full",
    meta: "Member since 2024 · dues paid",
    amount: "$95.00",
    cadence: "/mo",
    status: "Active" as const,
    tone: "text-success bg-success/10",
  },
  {
    name: "Cal Merriweather",
    tier: "Full",
    meta: "Joined the 12th · part month owed",
    amount: "$61.29",
    cadence: " part",
    status: "Owed" as const,
    tone: "text-[#b7791f] bg-[#b7791f]/10",
  },
  {
    name: "Noor Haddad",
    tier: "Associate",
    meta: "Occasional flyer · auto-billed",
    amount: "$45.00",
    cadence: "/mo",
    status: "Active" as const,
    tone: "text-success bg-success/10",
  },
  {
    name: "Ivy Petrosyan",
    tier: "Full",
    meta: "Deployed until the spring",
    amount: "—",
    cadence: "",
    status: "Paused" as const,
    tone: "text-muted-foreground bg-muted",
  },
  {
    name: "Rosa Delgado",
    tier: "Social",
    meta: "Clubhouse only · no flying",
    amount: "$60.00",
    cadence: "/yr",
    status: "Active" as const,
    tone: "text-success bg-success/10",
  },
];

const TABS = ["All tiers", "Full", "Associate", "Social"] as const;

export function MembershipsMock() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All tiers");
  const [selected, setSelected] = useState("Cal Merriweather");
  const [flash, setFlash] = useState(false);

  return (
    <AppMockShell
      path="/settings?tab=memberships"
      activeNav={3}
      float={<MockFloat label="Recurring" value="$2,340/mo" meta="26 members on a plan" />}
    >
      <MockHeader
        eyebrow="Membership"
        title="Members & dues"
        action={flash ? "Billed" : "Bill dues"}
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
          const match = tab === "All tiers" || r.tier === tab;
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
                <p className="truncate text-[10px] text-muted-foreground">
                  {r.tier} · {r.meta}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-semibold tabular-nums text-foreground">
                  {r.amount}
                  <span className="text-[10px] font-normal text-muted-foreground">{r.cadence}</span>
                </p>
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
