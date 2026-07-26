import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function ReportsMock() {
  const kpis = [
    { label: "Flight hours", value: "312.4", delta: "+8%" },
    { label: "Instruction", value: "148.0", delta: "+12%" },
    { label: "Collected", value: "$48.2k", delta: "+5%" },
    { label: "Open squawks", value: "2", delta: "−1" },
  ];

  return (
    <AppMockShell
      path="/reports"
      activeNav={0}
      float={<MockFloat label="This month" value="312.4 hrs" meta="Across 6 aircraft" />}
    >
      <MockHeader eyebrow="Insights" title="Reports" />
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-[#fafbfc] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {k.label}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-brand-surface">
              {k.value}
            </p>
            <p className="text-[10px] font-semibold text-success">{k.delta}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Hours by week
        </p>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {[40, 55, 48, 70, 62, 80, 74].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-primary/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}
