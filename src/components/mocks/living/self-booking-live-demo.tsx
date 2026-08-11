"use client";

import { useCallback, useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { SelfBookingMock } from "@/components/mocks/self-booking-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

const AIRCRAFT = ["N172SP · Cessna 172S", "N5287Q · Piper PA-28", "SIM-01 · Redbird TD2"];
const INSTRUCTORS = ["Alex Chen", "Morgan Blake", "Chris Diaz"];
const TYPES = ["Dual", "Solo", "Rental", "Ground"];
const TIMES = ["08:00-10:00", "10:00-12:00", "13:00-15:00", "15:00-17:00"];

type MenuKey = "aircraft" | "instructor" | "type" | "time";

type MenuState = {
  key: MenuKey;
  x: number;
  y: number;
  options: string[];
  prefix: string;
  selected: number;
} | null;

export function SelfBookingLiveDemo() {
  const [aircraft, setAircraft] = useState(0);
  const [instructor, setInstructor] = useState(0);
  const [type, setType] = useState(0);
  const [time, setTime] = useState(0);
  const [booked, setBooked] = useState(false);
  const [menu, setMenu] = useState<MenuState>(null);
  const [highlight, setHighlight] = useState<string | null>(null);

  const openPicker = async (
    api: DemoController,
    key: MenuKey,
    options: string[],
    prefix: string,
    selected: number
  ) => {
    await api.go(`[data-demo="field-${key}"]`, 680);
    if (api.cancelled()) return;
    await api.wait(90);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    // Same idea as the schedule context menu: anchor just below-right of the
    // tip so the hand isn't buried under the first row.
    const tip = api.pointFor(`[data-demo="field-${key}"]`);
    setMenu({
      key,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 4.5,
      options,
      prefix,
      selected,
    });
    setHighlight(null);
    api.release();
    await api.wait(300);
  };

  const chooseOption = async (
    api: DemoController,
    optionDemo: string,
    apply: () => void
  ) => {
    await api.go(`[data-demo="${optionDemo}"]`, 480);
    if (api.cancelled()) return;
    setHighlight(optionDemo);
    await api.wait(140);
    if (api.cancelled()) return;
    await api.press(180);
    if (api.cancelled()) return;
    apply();
    setMenu(null);
    setHighlight(null);
    api.release();
    await api.wait(280);
  };

  const script = useCallback(async (api: DemoController) => {
    await openPicker(api, "aircraft", AIRCRAFT, "opt-aircraft", 0);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-aircraft-1", () => setAircraft(1));
    if (api.cancelled()) return;

    await openPicker(api, "instructor", INSTRUCTORS, "opt-instructor", 0);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-instructor-1", () => setInstructor(1));
    if (api.cancelled()) return;

    await openPicker(api, "type", TYPES, "opt-type", 0);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-type-1", () => setType(1));
    if (api.cancelled()) return;

    await openPicker(api, "time", TIMES, "opt-time", 0);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-time-1", () => setTime(1));
    if (api.cancelled()) return;

    await api.tap('[data-demo="place-booking"]', () => setBooked(true));
    if (api.cancelled()) return;
    await api.wait(900);
    setBooked(false);

    await openPicker(api, "time", TIMES, "opt-time", 1);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-time-0", () => setTime(0));
    if (api.cancelled()) return;

    await openPicker(api, "type", TYPES, "opt-type", 1);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-type-0", () => setType(0));
    if (api.cancelled()) return;

    await openPicker(api, "instructor", INSTRUCTORS, "opt-instructor", 1);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-instructor-0", () => setInstructor(0));
    if (api.cancelled()) return;

    await openPicker(api, "aircraft", AIRCRAFT, "opt-aircraft", 1);
    if (api.cancelled()) return;
    await chooseOption(api, "opt-aircraft-0", () => setAircraft(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Jordan · Student"
      rest={{ x: 78, y: 88 }}
      fallback={<SelfBookingMock />}
      script={script}
    >
      <AppMockShell
        path="/me/book"
        activeNav={2}
        className="animate-none"
        float={
          <MockFloat
            label="Next lesson"
            value="Wed 08:00"
            meta="N172SP · Dual · Smith"
          />
        }
      >
        <MockHeader eyebrow="You" title="Book a flight" />
        <div className="space-y-3 p-4">
          <Field demo="field-aircraft" label="Aircraft" value={AIRCRAFT[aircraft]} />
          <Field
            demo="field-instructor"
            label="Instructor"
            value={INSTRUCTORS[instructor]}
          />
          <Field demo="field-type" label="Type" value={TYPES[type]} />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Date" value="Wed, Jul 22" />
            <Field demo="field-time" label="Time" value={TIMES[time]} />
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
            data-demo="place-booking"
            className={cn(
              "w-full rounded-full py-2.5 text-center text-[12px] font-semibold text-white transition-all duration-150",
              booked ? "bg-success" : "bg-primary"
            )}
          >
            {booked ? "Booked" : "Place booking"}
          </button>
        </div>
      </AppMockShell>

      {menu && (
        <PickerPopover
          x={menu.x}
          y={menu.y}
          options={menu.options}
          prefix={menu.prefix}
          selected={menu.selected}
          highlight={highlight}
        />
      )}
    </LivingBoard>
  );
}

function Field({
  label,
  value,
  demo,
}: {
  label: string;
  value: string;
  demo?: string;
}) {
  return (
    <div
      data-demo={demo}
      className="w-full rounded-xl border border-border bg-[#fafbfc] px-3 py-2.5 text-left"
    >
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
        {demo && (
          <span className="ml-1 font-medium normal-case tracking-normal text-primary/70">
            pick one
          </span>
        )}
      </p>
      <p className="mt-0.5 text-[12px] font-semibold text-foreground">{value}</p>
    </div>
  );
}

function PickerPopover({
  x,
  y,
  options,
  prefix,
  selected,
  highlight,
}: {
  x: number;
  y: number;
  options: string[];
  prefix: string;
  selected: number;
  highlight: string | null;
}) {
  return (
    <div
      className="pointer-events-none absolute z-50 min-w-[200px] max-w-[260px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {options.map((opt, i) => {
        const id = `${prefix}-${i}`;
        return (
          <div
            key={opt}
            data-demo={id}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-1.5 transition-colors",
              highlight === id
                ? "bg-primary/[0.1] font-semibold text-foreground"
                : selected === i
                  ? "bg-primary/[0.05] font-medium text-foreground"
                  : "text-foreground/80"
            )}
          >
            <span className="truncate">{opt}</span>
            {selected === i && (
              <span className="shrink-0 text-[10px] font-semibold text-primary">✓</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
