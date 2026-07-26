import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

/** Schedule / dispatch lane board — the original marketing demo. */
export function ScheduleMock() {
  return (
    <AppMockShell
      path="/schedule"
      activeNav={2}
      float={
        <MockFloat label="Invoice draft" value="$186.00" meta="N172SP · 1.2 Hobbs" />
      }
    >
      <MockHeader eyebrow="Dispatch" title="Today · KAPA" action="+ Book" />
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
          <Block className="left-[8%] top-2 w-[28%] bg-[#1967d2]" label="Dual · Smith" />
          <Block className="left-[42%] top-2 w-[22%] bg-[#2c4589]" label="Solo" />
          <Block className="left-[18%] top-[3.75rem] w-[34%] bg-[#17876f]" label="Rental" />
          <Block className="left-[55%] top-[7.25rem] w-[30%] bg-[#9a6a45]" label="Ground" />
        </div>
      </div>
    </AppMockShell>
  );
}

function Block({ className, label }: { className?: string; label: string }) {
  return (
    <div
      className={`absolute h-10 rounded-md px-2 py-1.5 text-[10px] font-medium text-white/95 shadow-sm ${className}`}
    >
      {label}
    </div>
  );
}
