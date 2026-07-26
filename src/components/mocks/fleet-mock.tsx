import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function FleetMock() {
  const fleet = [
    { tail: "N172SP", type: "Cessna 172S", rate: "$165/hr wet", status: "Available", ok: true },
    { tail: "N5287Q", type: "Piper PA-28", rate: "$140/hr wet", status: "Grounded", ok: false },
    { tail: "SIM-01", type: "Redbird TD2", rate: "Free on plan", status: "Bookable", ok: true },
    { tail: "Room B", type: "Classroom", rate: "Free on plan", status: "Bookable", ok: true },
  ];

  return (
    <AppMockShell
      path="/aircraft"
      activeNav={1}
      float={<MockFloat label="This month" value="$40" meta="2 aircraft · sims free" />}
    >
      <MockHeader eyebrow="Resources" title="Fleet & facilities" action="+ Add" />
      <div className="divide-y divide-border">
        {fleet.map((a) => (
          <div key={a.tail} className="flex items-center gap-3 px-4 py-3">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                a.ok ? "bg-primary/10 text-primary" : "bg-[#c4142f]/10 text-[#c4142f]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M3 13.5 21 9l-2.5 5.5L21 18l-7-1.5V21l-2.5-3.5L4 19.5 6 14.5 3 13.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-foreground">{a.tail}</p>
              <p className="text-[10px] text-muted-foreground">
                {a.type} · {a.rate}
              </p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                a.ok
                  ? "bg-success/10 text-success"
                  : "bg-[#c4142f]/10 text-[#c4142f]"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </AppMockShell>
  );
}
