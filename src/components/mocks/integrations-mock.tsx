"use client";

import { useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockRow,
} from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

const ITEMS = [
  {
    name: "Stripe",
    status: "Connected",
    ok: true,
    detail: "Invoices & cards",
    logo: "/integrations/stripe.svg",
  },
  {
    name: "Google Calendar",
    status: "Connected",
    ok: true,
    detail: "Personal sync",
    logo: "/integrations/google-calendar.svg",
  },
  {
    name: "QuickBooks",
    status: "Coming soon",
    ok: false,
    detail: "Ledger export",
    logo: "/integrations/quickbooks.svg",
  },
];

export function IntegrationsMock() {
  const [selected, setSelected] = useState("Stripe");
  const [pinged, setPinged] = useState<string | null>(null);

  return (
    <AppMockShell
      path="/settings"
      activeNav={0}
      float={<MockFloat label="Payments" value="Live" meta="Stripe connected" />}
    >
      <MockHeader eyebrow="Settings" title="Integrations" />
      <div className="divide-y divide-border">
        {ITEMS.map((item) => (
          <MockRow
            key={item.name}
            selected={selected === item.name}
            onClick={() => {
              setSelected(item.name);
              if (!item.ok) {
                setPinged(item.name);
                window.setTimeout(() => setPinged(null), 1400);
              }
            }}
            className="py-4"
          >
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1 transition-transform duration-150",
                selected === item.name && "scale-105"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt=""
                width={28}
                height={28}
                className="size-7 object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-foreground">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">
                {pinged === item.name ? "We'll email you when it ships" : item.detail}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[9px] font-semibold transition-colors duration-150",
                item.ok
                  ? "bg-success/10 text-success"
                  : pinged === item.name
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {pinged === item.name ? "Notified" : item.status}
            </span>
          </MockRow>
        ))}
      </div>
    </AppMockShell>
  );
}
