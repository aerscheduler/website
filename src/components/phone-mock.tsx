"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const DAYS = [
  { d: "Mon", n: "20" },
  { d: "Tue", n: "21" },
  { d: "Wed", n: "22" },
  { d: "Thu", n: "23" },
  { d: "Fri", n: "24" },
];

const RESERVATIONS = [
  { id: "r1", time: "08:00-10:00", title: "Dual · Cessna 172", meta: "N172SP · Smith", accent: "#1967d2" },
  { id: "r2", time: "10:30-12:00", title: "Solo · Pattern", meta: "N5287Q", accent: "#2c4589" },
  { id: "r3", time: "14:00-15:00", title: "Ground · Weather", meta: "Room B", accent: "#9a6a45" },
  { id: "r4", time: "16:00-17:30", title: "Rental · Cross-country", meta: "N172SP · Lee", accent: "#17876f" },
];

const TABS = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "schedule", label: "Schedule", icon: <CalendarIcon /> },
  { id: "new", label: "New", icon: <PlusIcon /> },
  { id: "alerts", label: "Alerts", icon: <BellIcon />, badge: true },
  { id: "search", label: "Search", icon: <SearchIcon /> },
] as const;

/**
 * Realistic iPhone marketing mock (~19.5:9).
 * Chrome pattern (status bar, bezel, home indicator, labeled bottom tabs with
 * active brand color) inspired by real device screenshots; content + destinations
 * match AerScheduler (Home / Calendar / center action / Notifications / Search).
 */
export function PhoneMock({ className = "" }: { className?: string }) {
  const [day, setDay] = useState("22");
  const [selected, setSelected] = useState("r1");
  const [tab, setTab] = useState("schedule");

  return (
    <div className={`relative mx-auto w-[250px] sm:w-[268px] ${className}`}>
      {/* Outer hardware bezel: tall modern phone proportions */}
      <div className="relative aspect-[9/18] rounded-[2.6rem] bg-[#0b0c10] p-[10px] shadow-[0_20px_50px_-12px_rgba(16,35,63,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
        {/* Side button hints */}
        <div className="absolute -left-[2px] top-[18%] h-7 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
        <div className="absolute -left-[2px] top-[26%] h-12 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
        <div className="absolute -left-[2px] top-[36%] h-12 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
        <div className="absolute -right-[2px] top-[30%] h-16 w-[3px] rounded-r-sm bg-[#2a2d36]" aria-hidden />

        {/* Screen */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2.5 z-30 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="relative z-20 flex shrink-0 items-center justify-between px-5 pb-1 pt-3.5">
            <span className="text-[11px] font-semibold tracking-tight text-foreground">
              9:41
            </span>
            <div className="flex items-center gap-[5px] text-foreground">
              <CellularIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* App chrome */}
          <div className="relative z-10 shrink-0 px-4 pt-2">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                aria-label="Menu"
              >
                <span className="flex flex-col gap-[3px]">
                  <span className="h-[1.5px] w-4 rounded bg-primary" />
                  <span className="h-[1.5px] w-4 rounded bg-primary" />
                  <span className="h-[1.5px] w-4 rounded bg-primary" />
                </span>
              </button>
              <p className="text-[15px] font-semibold tracking-tight text-foreground">
                {TABS.find((t) => t.id === tab)?.label ?? "Schedule"}
              </p>
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground transition-transform hover:scale-105">
                AS
              </div>
            </div>
          </div>

          {/* Day strip */}
          <div className="mt-4 flex shrink-0 gap-1.5 overflow-hidden px-4">
            {DAYS.map((d) => (
              <button
                key={d.n}
                type="button"
                onClick={() => setDay(d.n)}
                className={cn(
                  "flex h-[54px] flex-1 flex-col items-center justify-center rounded-2xl text-[10px] transition-all duration-150 active:scale-95",
                  day === d.n
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-[#e8eaef]"
                )}
              >
                <span className="font-medium">{d.d}</span>
                <span className="text-[13px] font-semibold tabular-nums">{d.n}</span>
              </button>
            ))}
          </div>

          {/* Reservation cards */}
          <div className="mt-4 flex min-h-0 flex-1 flex-col justify-start gap-2 overflow-y-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {RESERVATIONS.map((r) => (
              <ReservationCard
                key={r.id}
                time={r.time}
                title={r.title}
                meta={r.meta}
                accent={r.accent}
                selected={selected === r.id}
                onClick={() => setSelected(r.id)}
              />
            ))}
          </div>

          {/* Bottom tab bar */}
          <div className="mt-auto shrink-0 border-t border-[#e8eaed] bg-white px-1 pt-1.5">
            <div className="grid grid-cols-5 pb-1">
              {TABS.map((t) => (
                <Tab
                  key={t.id}
                  icon={t.icon}
                  label={t.label}
                  active={tab === t.id}
                  badge={"badge" in t && t.badge}
                  onClick={() => setTab(t.id)}
                />
              ))}
            </div>
            <div className="flex justify-center pb-2.5 pt-1">
              <div className="h-[4px] w-[108px] rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge: lower-right, clear of chrome and day strip */}
      <div className="absolute -right-2 bottom-[16%] z-10 rounded-lg border border-border bg-white px-2.5 py-2 shadow-md transition-shadow hover:shadow-lg sm:-right-5 sm:bottom-[18%]">
        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Native apps
        </p>
        <p className="mt-0.5 text-xs font-semibold text-foreground">iOS & Android</p>
      </div>
    </div>
  );
}

function ReservationCard({
  time,
  title,
  meta,
  accent,
  selected,
  onClick,
}: {
  time: string;
  title: string;
  meta: string;
  accent: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full shrink-0 items-stretch overflow-hidden rounded-2xl border bg-white text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-150 active:scale-[0.99]",
        selected
          ? "border-primary/30 shadow-sm ring-1 ring-primary/20"
          : "border-[#e8eaed] hover:border-primary/20"
      )}
    >
      <div className="w-[4px] shrink-0 self-stretch" style={{ backgroundColor: accent }} />
      <div className="min-w-0 flex-1 px-3 py-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[12px] font-semibold leading-snug text-foreground">
            {title}
          </p>
          <p className="shrink-0 text-[10px] font-semibold tabular-nums leading-snug text-muted-foreground">
            {time}
          </p>
        </div>
        <p className="mt-1 truncate text-[10px] leading-snug text-muted-foreground">{meta}</p>
      </div>
    </button>
  );
}

function Tab({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center gap-0.5 py-1 transition-transform active:scale-95"
    >
      {active && (
        <span className="absolute -top-1.5 h-[2px] w-6 rounded-full bg-primary" />
      )}
      <span className={`relative ${active ? "text-primary" : "text-[#8b929e]"}`}>
        {icon}
        {badge && (
          <span className="absolute -right-0.5 -top-0.5 size-[7px] rounded-full border-[1.5px] border-white bg-[#c4142f]" />
        )}
      </span>
      <span
        className={`text-[9px] font-semibold ${
          active ? "text-primary" : "text-[#8b929e]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9.5a6 6 0 1 1 12 0c0 3.5 1.2 4.8 1.2 4.8H4.8S6 13 6 9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CellularIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden>
      <path
        d="M7.5 9.8a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
        fill="currentColor"
      />
      <path
        d="M4.2 6.6a4.6 4.6 0 0 1 6.6 0M1.8 4.2a7.8 7.8 0 0 1 11.4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="24" height="11" viewBox="0 0 24 11" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="20" height="10" rx="2" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor" />
      <path d="M22 3.5v4a1.5 1.5 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
