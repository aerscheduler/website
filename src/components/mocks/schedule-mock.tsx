"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

const TAILS = ["N172SP", "N5287Q", "SIM-01"] as const;

const BLOCKS = [
  { id: "b1", lane: 0, className: "left-[8%] top-2 w-[28%] bg-[#1967d2]", label: "Dual · Smith" },
  { id: "b2", lane: 0, className: "left-[42%] top-2 w-[22%] bg-[#2c4589]", label: "Solo" },
  { id: "b3", lane: 1, className: "left-[18%] top-[3.75rem] w-[34%] bg-[#17876f]", label: "Rental" },
  { id: "b4", lane: 2, className: "left-[55%] top-[7.25rem] w-[30%] bg-[#9a6a45]", label: "Ground" },
] as const;

/** Schedule / dispatch lane board: the original marketing demo. */
export function ScheduleMock() {
  const [selectedTail, setSelectedTail] = useState<string | null>("N172SP");
  const [selectedBlock, setSelectedBlock] = useState<string | null>("b1");
  const [flash, setFlash] = useState(false);

  return (
    <AppMockShell
      path="/schedule"
      activeNav={2}
      float={
        <MockFloat label="Invoice draft" value="$186.00" meta="N172SP · 1.2 Hobbs" />
      }
    >
      <MockHeader
        eyebrow="Dispatch"
        title="Today · KAPA"
        action={flash ? "Booked" : "+ Book"}
        onAction={() => {
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1200);
        }}
      />
      <div className="grid flex-1 grid-cols-[72px_1fr] gap-0 text-[11px]">
        <div className="border-r border-border bg-[#fafbfc] py-2">
          {TAILS.map((tail) => (
            <button
              key={tail}
              type="button"
              onClick={() => setSelectedTail(tail)}
              className={cn(
                "flex h-14 w-full items-center px-2 text-left font-medium transition-colors duration-150",
                selectedTail === tail
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {tail}
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden bg-[linear-gradient(to_right,#f0f2f5_1px,transparent_1px)] bg-size-[12.5%_100%] py-2">
          {BLOCKS.map((b) => (
            <Block
              key={b.id}
              className={b.className}
              label={b.label}
              selected={selectedBlock === b.id}
              dimmed={
                selectedTail != null &&
                TAILS[b.lane] !== selectedTail &&
                selectedBlock !== b.id
              }
              onClick={() => {
                setSelectedBlock(b.id);
                setSelectedTail(TAILS[b.lane]);
              }}
            />
          ))}
        </div>
      </div>
    </AppMockShell>
  );
}

function Block({
  className,
  label,
  selected,
  dimmed,
  onClick,
}: {
  className?: string;
  label: string;
  selected?: boolean;
  dimmed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute h-10 rounded-md px-2 py-1.5 text-left text-[10px] font-medium text-white/95 shadow-sm transition-all duration-150",
        "hover:z-10 hover:brightness-110 hover:shadow-md active:scale-[0.98]",
        selected && "z-10 scale-[1.03] ring-2 ring-white/90 ring-offset-1 ring-offset-transparent",
        dimmed && "opacity-40",
        className
      )}
    >
      {label}
    </button>
  );
}
