"use client";

import { useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { cn } from "@/lib/cn";

const AIRCRAFT = ["N172SP · Cessna 172S", "N5287Q · Piper PA-28", "SIM-01 · Redbird TD2"];
const INSTRUCTORS = ["Alex Chen", "Morgan Blake", "Chris Diaz"];
const TYPES = ["Dual", "Solo", "Rental", "Ground"];
const TIMES = ["08:00-10:00", "10:00-12:00", "13:00-15:00", "15:00-17:00"];

export function SelfBookingMock() {
  const [aircraft, setAircraft] = useState(0);
  const [instructor, setInstructor] = useState(0);
  const [type, setType] = useState(0);
  const [time, setTime] = useState(0);
  const [booked, setBooked] = useState(false);

  return (
    <AppMockShell
      path="/me/book"
      activeNav={2}
      float={<MockFloat label="Next lesson" value="Wed 08:00" meta="N172SP · Dual · Smith" />}
    >
      <MockHeader eyebrow="You" title="Book a flight" />
      <div className="space-y-3 p-4">
        <Field
          label="Aircraft"
          value={AIRCRAFT[aircraft]}
          onClick={() => setAircraft((i) => (i + 1) % AIRCRAFT.length)}
        />
        <Field
          label="Instructor"
          value={INSTRUCTORS[instructor]}
          onClick={() => setInstructor((i) => (i + 1) % INSTRUCTORS.length)}
        />
        <Field
          label="Type"
          value={TYPES[type]}
          onClick={() => setType((i) => (i + 1) % TYPES.length)}
        />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Date" value="Wed, Jul 22" />
          <Field
            label="Time"
            value={TIMES[time]}
            onClick={() => setTime((i) => (i + 1) % TIMES.length)}
          />
        </div>
        <div
          className={cn(
            "rounded-xl border p-3 transition-colors duration-200",
            booked
              ? "border-success/30 bg-success/5"
              : "border-primary/20 bg-primary/5"
          )}
        >
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.12em]",
              booked ? "text-success" : "text-primary"
            )}
          >
            {booked ? "Confirmed" : "Available"}
          </p>
          <p className="mt-1 text-[11px] text-foreground">
            {booked
              ? "You're on the board. See you on the ramp."
              : "Aircraft and instructor are free in this window."}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setBooked(true);
            window.setTimeout(() => setBooked(false), 2000);
          }}
          className={cn(
            "w-full rounded-full py-2.5 text-center text-[12px] font-semibold text-white transition-all duration-150 active:scale-[0.98]",
            booked ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-primary/90"
          )}
        >
          {booked ? "Booked" : "Place booking"}
        </button>
      </div>
    </AppMockShell>
  );
}

function Field({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: () => void;
}) {
  const className = cn(
    "w-full rounded-xl border border-border bg-[#fafbfc] px-3 py-2.5 text-left transition-all duration-150",
    onClick && "hover:border-primary/30 hover:bg-white active:scale-[0.99]"
  );

  const body = (
    <>
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
        {onClick && (
          <span className="ml-1 font-medium normal-case tracking-normal text-primary/70">
            tap to change
          </span>
        )}
      </p>
      <p className="mt-0.5 text-[12px] font-semibold text-foreground">{value}</p>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {body}
      </button>
    );
  }

  return <div className={className}>{body}</div>;
}
