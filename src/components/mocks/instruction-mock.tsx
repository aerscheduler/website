import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function InstructionMock() {
  return (
    <AppMockShell
      path="/settings"
      activeNav={0}
      float={<MockFloat label="Default rate" value="$65/hr" meta="Private Pilot dual" />}
    >
      <MockHeader eyebrow="Instruction" title="Ratings & rates" action="+ Rating" />
      <div className="divide-y divide-border">
        {[
          { name: "Private Pilot", rate: "$65/hr", students: "12 students", instructors: "4 CFIs" },
          { name: "Instrument", rate: "$70/hr", students: "5 students", instructors: "3 CFIs" },
          { name: "Commercial", rate: "$75/hr", students: "2 students", instructors: "2 CFIs" },
        ].map((r) => (
          <div key={r.name} className="px-4 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-semibold text-foreground">{r.name}</p>
              <p className="text-[12px] font-semibold tabular-nums text-primary">{r.rate}</p>
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {r.students} · {r.instructors}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 rounded-full bg-primary/70" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border bg-[#fafbfc] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Alex Chen · availability
        </p>
        <div className="mt-2 flex gap-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div
              key={`${d}-${i}`}
              className={`flex h-8 flex-1 items-center justify-center rounded-md text-[10px] font-semibold ${
                i < 5 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}
