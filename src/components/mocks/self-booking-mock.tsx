import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function SelfBookingMock() {
  return (
    <AppMockShell
      path="/me/book"
      activeNav={2}
      float={<MockFloat label="Next lesson" value="Wed 08:00" meta="N172SP · Dual · Smith" />}
    >
      <MockHeader eyebrow="You" title="Book a flight" />
      <div className="space-y-3 p-4">
        <Field label="Aircraft" value="N172SP · Cessna 172S" />
        <Field label="Instructor" value="Alex Chen" />
        <Field label="Type" value="Dual" />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Date" value="Wed, Jul 22" />
          <Field label="Time" value="08:00 – 10:00" />
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
            Available
          </p>
          <p className="mt-1 text-[11px] text-foreground">
            Aircraft and instructor are free in this window.
          </p>
        </div>
        <div className="rounded-full bg-primary py-2.5 text-center text-[12px] font-semibold text-white">
          Place booking
        </div>
      </div>
    </AppMockShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-[#fafbfc] px-3 py-2.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-[12px] font-semibold text-foreground">{value}</p>
    </div>
  );
}
