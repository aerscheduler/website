import type { ReactNode } from "react";

/**
 * Realistic iPhone marketing mock.
 * Chrome pattern (status bar, bezel, home indicator, labeled bottom tabs with
 * active brand color) inspired by real device screenshots; content + destinations
 * match AerScheduler (Home / Calendar / center action / Notifications / Search).
 */
export function PhoneMock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-[272px] sm:w-[290px] ${className}`}>
      {/* Outer hardware bezel */}
      <div className="relative rounded-[2.75rem] bg-[#0b0c10] p-[11px] shadow-[0_20px_50px_-12px_rgba(16,35,63,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
        {/* Side button hints */}
        <div className="absolute -left-[2px] top-[110px] h-8 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
        <div className="absolute -left-[2px] top-[152px] h-14 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
        <div className="absolute -left-[2px] top-[214px] h-14 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
        <div className="absolute -right-[2px] top-[170px] h-20 w-[3px] rounded-r-sm bg-[#2a2d36]" aria-hidden />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.15rem] bg-white">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2.5 z-30 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar — matches real iOS screenshots */}
          <div className="relative z-20 flex items-center justify-between px-6 pb-1 pt-3.5">
            <span className="text-[12px] font-semibold tracking-tight text-foreground">
              9:41
            </span>
            <div className="flex items-center gap-[5px] text-foreground">
              <CellularIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* App chrome */}
          <div className="relative z-10 px-4 pt-1">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full"
                aria-hidden
              >
                <span className="flex flex-col gap-[3px]">
                  <span className="h-[1.5px] w-4 rounded bg-primary" />
                  <span className="h-[1.5px] w-4 rounded bg-primary" />
                  <span className="h-[1.5px] w-4 rounded bg-primary" />
                </span>
              </button>
              <p className="text-[15px] font-semibold tracking-tight text-foreground">
                Schedule
              </p>
              <div className="flex size-8 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                AS
              </div>
            </div>
          </div>

          {/* Day strip */}
          <div className="mt-3 flex gap-1.5 overflow-hidden px-4">
            {[
              { d: "Mon", n: "20" },
              { d: "Tue", n: "21" },
              { d: "Wed", n: "22", active: true },
              { d: "Thu", n: "23" },
              { d: "Fri", n: "24" },
            ].map((day) => (
              <div
                key={day.n}
                className={`flex h-[52px] flex-1 flex-col items-center justify-center rounded-2xl text-[10px] ${
                  day.active
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="font-medium">{day.d}</span>
                <span className="text-[13px] font-semibold tabular-nums">{day.n}</span>
              </div>
            ))}
          </div>

          {/* Reservation cards */}
          <div className="mt-3 space-y-2 px-4 pb-3">
            <ReservationCard
              time="08:00 – 10:00"
              title="Dual · Cessna 172"
              meta="N172SP · Smith"
              accent="#1967d2"
            />
            <ReservationCard
              time="10:30 – 12:00"
              title="Solo · Pattern"
              meta="N5287Q"
              accent="#2c4589"
            />
            <ReservationCard
              time="14:00 – 15:00"
              title="Ground · Weather"
              meta="Room B"
              accent="#9a6a45"
            />
          </div>

          {/* Bottom tab bar — icon + label, active in brand blue (Ally-style structure) */}
          <div className="border-t border-[#e8eaed] bg-white px-1 pt-1.5">
            <div className="grid grid-cols-5 pb-1">
              <Tab icon={<HomeIcon />} label="Home" />
              <Tab icon={<CalendarIcon />} label="Schedule" active />
              <Tab icon={<PlusIcon />} label="New" />
              <Tab icon={<BellIcon />} label="Alerts" badge />
              <Tab icon={<SearchIcon />} label="Search" />
            </div>
            {/* iOS home indicator */}
            <div className="flex justify-center pb-2 pt-1">
              <div className="h-[4px] w-[108px] rounded-full bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReservationCard({
  time,
  title,
  meta,
  accent,
}: {
  time: string;
  title: string;
  meta: string;
  accent: string;
}) {
  return (
    <div className="flex overflow-hidden rounded-2xl border border-[#e8eaed] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-[4px] shrink-0" style={{ backgroundColor: accent }} />
      <div className="min-w-0 flex-1 px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-[12px] font-semibold text-foreground">{title}</p>
          <p className="shrink-0 text-[10px] font-medium tabular-nums text-muted-foreground">
            {time.split(" – ")[0]}
          </p>
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{meta}</p>
        <p className="mt-1 text-[9px] font-medium tabular-nums text-muted-foreground/80">
          {time}
        </p>
      </div>
    </div>
  );
}

function Tab({
  icon,
  label,
  active,
  badge,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center gap-0.5 py-1">
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
    </div>
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
