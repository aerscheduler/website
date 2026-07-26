"use client";

import { useEffect, useState } from "react";
import {
  ScheduleMock,
  BillingMock,
  FleetMock,
  PeopleMock,
  MaintenanceMock,
  SelfBookingMock,
  ComplianceMock,
  ReportsMock,
} from "@/components/mocks";
import { cn } from "@/lib/cn";

const SLIDES = [
  { id: "schedule", label: "Dispatch", Mock: ScheduleMock },
  { id: "billing", label: "Billing", Mock: BillingMock },
  { id: "fleet", label: "Fleet", Mock: FleetMock },
  { id: "people", label: "People", Mock: PeopleMock },
  { id: "self-booking", label: "Self-booking", Mock: SelfBookingMock },
  { id: "maintenance", label: "Maintenance", Mock: MaintenanceMock },
  { id: "compliance", label: "Go / No-Go", Mock: ComplianceMock },
  { id: "reports", label: "Reports", Mock: ReportsMock },
] as const;

const INTERVAL_MS = 4200;

/** Auto-cycling feature demos for the homepage hero. */
export function HeroDemoCycle({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, index]);

  return (
    <div
      className={cn("hero-demo-cycle relative w-full max-w-[560px]", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative flex h-[460px] items-center overflow-visible sm:h-[500px]">
        {SLIDES.map((s, i) => {
          const SlideMock = s.Mock;
          const active = i === index;
          return (
            <div
              key={s.id}
              aria-hidden={!active}
              className={cn(
                "absolute inset-x-0 top-1/2 w-full -translate-y-1/2 transition-[opacity,transform] duration-500 ease-out",
                active
                  ? "z-10 opacity-100"
                  : "pointer-events-none z-0 translate-y-[calc(-50%+12px)] opacity-0"
              )}
            >
              <SlideMock />
            </div>
          );
        })}
      </div>

      <div
        className="mt-2 flex items-center justify-end gap-1.5 px-1"
        role="tablist"
        aria-label="Feature demos"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${s.label}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index
                ? "w-5 bg-primary"
                : "w-1.5 bg-border hover:bg-muted-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
