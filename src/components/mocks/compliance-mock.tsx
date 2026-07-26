import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function ComplianceMock() {
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
          items={[
            { name: "N5287Q", meta: "Squawk · mag drop", bad: true },
            { name: "N172SP", meta: "Clear", bad: false },
          ]}
        />
        <Panel
          title="Member currencies"
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
}: {
  title: string;
  items: { name: string; meta: string; bad: boolean }[];
}) {
  return (
    <div className="rounded-xl border border-border bg-[#fafbfc] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-start gap-2">
            <span
              className={`mt-1 size-2 shrink-0 rounded-full ${
                item.bad ? "bg-[#c4142f]" : "bg-success"
              }`}
            />
            <div>
              <p className="text-[11px] font-semibold text-foreground">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">{item.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
