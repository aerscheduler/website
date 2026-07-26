import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function MaintenanceMock() {
  const squawks = [
    { title: "Left mag drop high", tail: "N5287Q", status: "Open", grounded: true },
    { title: "Nav light inop", tail: "N172SP", status: "In progress", grounded: false },
    { title: "Seat rail sticky", tail: "N5287Q", status: "Resolved", grounded: false },
  ];

  return (
    <AppMockShell
      path="/maintenance"
      activeNav={4}
      float={<MockFloat label="Open squawks" value="2" meta="1 grounding the board" />}
    >
      <MockHeader eyebrow="Airworthiness" title="Maintenance" action="+ Squawk" />
      <div className="flex gap-2 border-b border-border px-4 py-2.5 text-[10px]">
        {["Squawks", "Reminders"].map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-2.5 py-1 font-semibold ${
              i === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="divide-y divide-border">
        {squawks.map((s) => (
          <div key={s.title} className="px-4 py-3">
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
            {s.grounded && (
              <p className="mt-2 text-[10px] font-semibold text-[#c4142f]">
                Grounds aircraft on schedule
              </p>
            )}
          </div>
        ))}
      </div>
    </AppMockShell>
  );
}
