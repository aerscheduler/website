import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function PeopleMock() {
  const people = [
    { name: "Morgan Blake", role: "Owner · Admin", tone: "bg-primary/10 text-primary" },
    { name: "Chris Diaz", role: "Dispatcher", tone: "bg-[#2c4589]/10 text-[#2c4589]" },
    { name: "Alex Chen", role: "Instructor", tone: "bg-[#17876f]/10 text-[#17876f]" },
    { name: "Jordan Lee", role: "Student", tone: "bg-muted text-muted-foreground" },
    { name: "Sam Ortiz", role: "Renter", tone: "bg-muted text-muted-foreground" },
  ];

  return (
    <AppMockShell
      path="/people"
      activeNav={1}
      float={<MockFloat label="Roster" value="48" meta="members · 3 join requests" />}
    >
      <MockHeader eyebrow="Organization" title="People" action="Invite" />
      <div className="flex gap-1.5 overflow-hidden border-b border-border px-4 py-2.5 text-[10px]">
        {["All", "Instructors", "Students", "Renters"].map((t, i) => (
          <span
            key={t}
            className={`shrink-0 rounded-full px-2.5 py-1 font-semibold ${
              i === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="divide-y divide-border">
        {people.map((p) => (
          <div key={p.name} className="flex items-center gap-3 px-4 py-2.5">
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
          </div>
        ))}
      </div>
    </AppMockShell>
  );
}
