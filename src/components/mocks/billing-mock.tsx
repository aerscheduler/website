import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function BillingMock() {
  const rows = [
    { name: "Alex Chen", item: "N172SP · Dual 1.2", amount: "$186.00", status: "Due", tone: "text-[#b7791f] bg-[#b7791f]/10" },
    { name: "Jordan Lee", item: "N5287Q · Rental 1.8", amount: "$252.00", status: "Paid", tone: "text-success bg-success/10" },
    { name: "Sam Ortiz", item: "Ground · Weather", amount: "$65.00", status: "Due", tone: "text-[#b7791f] bg-[#b7791f]/10" },
    { name: "Casey Ng", item: "SIM-01 · Instrument", amount: "$90.00", status: "Paid", tone: "text-success bg-success/10" },
  ];

  return (
    <AppMockShell
      path="/billing"
      activeNav={3}
      float={<MockFloat label="Outstanding" value="$251.00" meta="2 invoices due" />}
    >
      <MockHeader eyebrow="Accounts receivable" title="Billing" action="+ Invoice" />
      <div className="flex gap-2 border-b border-border px-4 py-2.5 text-[10px]">
        {["All", "Due", "Paid"].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-2.5 py-1 font-semibold ${
              i === 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3 px-4 py-3">
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
          </div>
        ))}
      </div>
    </AppMockShell>
  );
}
