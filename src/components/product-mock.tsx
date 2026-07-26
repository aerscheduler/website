/** CSS product chrome — schedule dispatch board, Stripe-style hero UI mock. */
export function ProductMock() {
  return (
    <div className="animate-float relative w-full max-w-[560px]">
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-lg">
        {/* App chrome */}
        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#e3e5ea]" />
            <span className="size-2.5 rounded-full bg-[#e3e5ea]" />
            <span className="size-2.5 rounded-full bg-[#e3e5ea]" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
            app.aerscheduler.com/schedule
          </div>
        </div>

        <div className="flex min-h-[300px]">
          {/* Mini rail */}
          <aside className="hidden w-[52px] shrink-0 flex-col items-center gap-3 border-r border-border py-3 sm:flex">
            <div className="size-7 rounded-md bg-primary/10" />
            <div className="size-6 rounded-md bg-muted" />
            <div className="size-6 rounded-md bg-primary" />
            <div className="size-6 rounded-md bg-muted" />
            <div className="size-6 rounded-md bg-muted" />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Dispatch
                </p>
                <p className="text-sm font-semibold text-foreground">Today · KAPA</p>
              </div>
              <div className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-white">
                + Book
              </div>
            </div>

            <div className="grid flex-1 grid-cols-[72px_1fr] gap-0 text-[11px]">
              <div className="border-r border-border bg-[#fafbfc] py-2">
                {["N172SP", "N5287Q", "SIM-01"].map((tail) => (
                  <div
                    key={tail}
                    className="flex h-14 items-center px-2 font-medium text-muted-foreground"
                  >
                    {tail}
                  </div>
                ))}
              </div>
              <div className="relative overflow-hidden bg-[linear-gradient(to_right,#f0f2f5_1px,transparent_1px)] bg-size-[12.5%_100%] py-2">
                <Block
                  className="left-[8%] top-2 w-[28%] bg-[#1967d2]"
                  label="Dual · Smith"
                />
                <Block
                  className="left-[42%] top-2 w-[22%] bg-[#2c4589]"
                  label="Solo"
                />
                <Block
                  className="left-[18%] top-[3.75rem] w-[34%] bg-[#17876f]"
                  label="Rental"
                />
                <Block
                  className="left-[55%] top-[7.25rem] w-[30%] bg-[#9a6a45]"
                  label="Ground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating invoice chip */}
      <div className="absolute -bottom-4 -left-3 hidden rounded-lg border border-border bg-white p-3 shadow-md sm:block">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Invoice draft
        </p>
        <p className="mt-1 text-sm font-semibold tabular-nums text-foreground">
          $186.00
        </p>
        <p className="text-[11px] text-muted-foreground">N172SP · 1.2 Hobbs</p>
      </div>
    </div>
  );
}

function Block({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <div
      className={`absolute h-10 rounded-md px-2 py-1.5 text-[10px] font-medium text-white/95 shadow-sm ${className}`}
    >
      {label}
    </div>
  );
}
