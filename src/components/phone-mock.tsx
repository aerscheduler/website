"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * iOS Home mock matching the real AerScheduler staff Home:
 * wallet-pass hero, Calendar/Invoices/Squawks pills, 2×2 stats, Upcoming list.
 */
export function PhoneMock({ className = "" }: { className?: string }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={cn("relative mx-auto w-[250px] sm:w-[268px]", className)}>
      <PhoneChrome>
        <IosHomeScreen
          selected={selected}
          onSelect={setSelected}
          interactive
        />
      </PhoneChrome>
      <div className="absolute -right-2 bottom-[16%] z-10 rounded-lg border border-border bg-white px-2.5 py-2 shadow-md sm:-right-5 sm:bottom-[18%]">
        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Native app
        </p>
        <p className="mt-0.5 text-xs font-semibold text-foreground">iOS</p>
      </div>
    </div>
  );
}

export function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[9/18] rounded-[2.6rem] bg-[#0b0c10] p-[10px] shadow-[0_20px_50px_-12px_rgba(16,35,63,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
      <div className="absolute -left-[2px] top-[18%] h-7 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
      <div className="absolute -left-[2px] top-[26%] h-12 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
      <div className="absolute -left-[2px] top-[36%] h-12 w-[3px] rounded-l-sm bg-[#2a2d36]" aria-hidden />
      <div className="absolute -right-[2px] top-[30%] h-16 w-[3px] rounded-r-sm bg-[#2a2d36]" aria-hidden />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#f2f4f7]">
        <div className="absolute left-1/2 top-2.5 z-30 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

export type HomeStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  accent: "primary" | "warning";
  icon: "plane" | "calendar" | "wrench" | "invoice";
};

export const HOME_STATS: HomeStat[] = [
  {
    id: "next",
    label: "Next on schedule",
    value: "Tue 12:00 AM",
    hint: "N44TS",
    accent: "primary",
    icon: "plane",
  },
  {
    id: "upcoming",
    label: "Upcoming",
    value: "1",
    hint: "next 30 days",
    accent: "primary",
    icon: "calendar",
  },
  {
    id: "squawks",
    label: "Open squawks",
    value: "13",
    hint: "Fleet",
    accent: "warning",
    icon: "wrench",
  },
  {
    id: "unpaid",
    label: "Unpaid",
    value: "$7,431.45",
    hint: "4 unpaid invoices",
    accent: "warning",
    icon: "invoice",
  },
];

export const HOME_PILLS = [
  { id: "calendar", label: "Calendar", icon: "calendar" as const },
  { id: "invoices", label: "Invoices", icon: "invoice" as const },
  { id: "squawks", label: "Squawks", icon: "wrench" as const },
] as const;

type IosHomeProps = {
  selected?: string | null;
  onSelect?: (id: string | null) => void;
  pillActive?: string | null;
  interactive?: boolean;
  sheet?: ReactNode;
};

export function IosHomeScreen({
  selected = null,
  onSelect,
  pillActive = null,
  interactive = false,
  sheet,
}: IosHomeProps) {
  return (
    <>
      <div className="relative z-20 flex shrink-0 items-center justify-between px-5 pb-1 pt-3.5">
        <span className="text-[11px] font-semibold tracking-tight text-foreground">
          9:45
        </span>
        <div className="flex items-center gap-[5px] text-foreground">
          <CellularIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>

      <div className="relative z-10 flex shrink-0 items-center justify-between px-3.5 pb-1 pt-1">
        <button
          type="button"
          data-demo="menu"
          className="flex size-8 items-center justify-center rounded-full"
          aria-label="Menu"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="h-[1.5px] w-4 rounded bg-foreground" />
            <span className="h-[1.5px] w-4 rounded bg-foreground" />
            <span className="h-[1.5px] w-4 rounded bg-foreground" />
          </span>
        </button>
        <div className="flex items-center gap-0.5">
          <ChromeIconButton demo="search" aria-label="Search">
            <SearchGlyph />
          </ChromeIconButton>
          <ChromeIconButton demo="inbox" aria-label="Inbox" badge>
            <BellGlyph />
          </ChromeIconButton>
          <button
            type="button"
            data-demo="create"
            className="ml-0.5 flex size-8 items-center justify-center rounded-full bg-foreground text-white"
            aria-label="Create"
          >
            <PlusGlyph />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden px-3 pb-2 pt-1">
        <button
          type="button"
          data-demo="hero"
          onClick={interactive ? () => onSelect?.("hero") : undefined}
          className={cn(
            "w-full overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1a4fb8] via-[#1967d2] to-[#2c4589] px-3.5 pb-3 pt-3 text-left text-white shadow-[0_10px_28px_-8px_rgba(25,103,210,0.55)] transition-transform duration-150",
            selected === "hero" && "ring-2 ring-white/40"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/75">
              Maintenance
            </p>
            <p className="text-[9px] font-medium text-white/75">Tue, Aug 11</p>
          </div>
          <p className="mt-2 text-[15px] font-semibold leading-snug tracking-tight">
            N44TS · Annual inspection
          </p>
          <p className="mt-2 text-[10px] text-white/80">12:00 AM, 11:59 PM</p>
          <p className="mt-0.5 text-[10px] text-white/70">N44TS</p>
        </button>

        <div className="mt-2.5 flex gap-1.5">
          {HOME_PILLS.map((p) => (
            <button
              key={p.id}
              type="button"
              data-demo={`pill-${p.id}`}
              onClick={interactive ? () => onSelect?.(p.id) : undefined}
              className={cn(
                "flex flex-1 items-center justify-center gap-1 rounded-full border bg-white px-1.5 py-1.5 text-[9px] font-semibold text-foreground shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors duration-150",
                pillActive === p.id || selected === p.id
                  ? "border-primary/40 bg-primary/[0.06] text-primary"
                  : "border-[#e4e7ec]"
              )}
            >
              <PillIcon kind={p.icon} />
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {HOME_STATS.map((s) => (
            <button
              key={s.id}
              type="button"
              data-demo={`stat-${s.id}`}
              onClick={interactive ? () => onSelect?.(s.id) : undefined}
              className={cn(
                "flex min-h-[78px] flex-col rounded-[14px] bg-white px-2.5 py-2.5 text-left shadow-[0_2px_10px_-4px_rgba(16,24,40,0.12)] transition-shadow duration-150",
                selected === s.id && "ring-1 ring-primary/30"
              )}
            >
              <div className="flex items-start justify-between gap-1">
                <p className="text-[9px] font-medium leading-tight text-muted-foreground">
                  {s.label}
                </p>
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-md",
                    s.accent === "warning"
                      ? "bg-[#b7791f]/15 text-[#b7791f]"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <StatIcon kind={s.icon} />
                </span>
              </div>
              <p className="mt-auto pt-2 text-[13px] font-semibold leading-tight tracking-tight text-foreground tabular-nums">
                {s.value}
              </p>
              <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
                {s.hint}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-baseline justify-between px-0.5">
          <p className="text-[13px] font-bold tracking-tight text-foreground">
            Upcoming
          </p>
          <button
            type="button"
            data-demo="see-all"
            className="text-[10px] font-medium text-muted-foreground"
          >
            See all
          </button>
        </div>

        <button
          type="button"
          data-demo="upcoming-row"
          onClick={interactive ? () => onSelect?.("upcoming-row") : undefined}
          className={cn(
            "mt-1.5 flex w-full items-stretch overflow-hidden rounded-[14px] border border-[#e8eaed] bg-white text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-150",
            selected === "upcoming-row" && "ring-1 ring-primary/30"
          )}
        >
          <div className="w-[3px] shrink-0 self-stretch bg-primary" />
          <div className="min-w-0 flex-1 px-2.5 py-2">
            <p className="truncate text-[11px] font-semibold text-foreground">
              N44TS · Annual inspection
            </p>
            <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
              Tue, Aug 11 · 12:00 AM, 11:59 PM
            </p>
            <p className="mt-0.5 text-[9px] text-muted-foreground">N44TS</p>
          </div>
          <div className="flex items-center pr-2 text-muted-foreground">
            <ChevronGlyph />
          </div>
        </button>
      </div>

      <div className="flex shrink-0 justify-center pb-2.5 pt-1">
        <div className="h-[4px] w-[108px] rounded-full bg-black" />
      </div>

      {sheet}
    </>
  );
}

function ChromeIconButton({
  children,
  demo,
  badge,
  ...rest
}: {
  children: ReactNode;
  demo: string;
  badge?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      data-demo={demo}
      className="relative flex size-8 items-center justify-center rounded-full text-foreground"
      {...rest}
    >
      {children}
      {badge && (
        <span className="absolute right-1.5 top-1.5 size-[7px] rounded-full border-[1.5px] border-[#f2f4f7] bg-[#c4142f]" />
      )}
    </button>
  );
}

function PillIcon({ kind }: { kind: "calendar" | "invoice" | "wrench" }) {
  if (kind === "calendar") return <CalendarGlyph className="size-3" />;
  if (kind === "invoice") return <InvoiceGlyph className="size-3" />;
  return <WrenchGlyph className="size-3" />;
}

function StatIcon({
  kind,
}: {
  kind: "plane" | "calendar" | "wrench" | "invoice";
}) {
  const cls = "size-3.5";
  if (kind === "plane") return <PlaneGlyph className={cls} />;
  if (kind === "calendar") return <CalendarGlyph className={cls} />;
  if (kind === "wrench") return <WrenchGlyph className={cls} />;
  return <InvoiceGlyph className={cls} />;
}

function SearchGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BellGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function PlusGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function InvoiceGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3.5h12v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2V3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 8h6M9 12h6M9 16h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function WrenchGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14.5 6.5a3.5 3.5 0 0 0-4.7 4.7L4 17l3 3 5.8-5.8a3.5 3.5 0 0 0 4.7-4.7l-2.2 2.2-2.8-2.8 2-2.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlaneGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 13.5 21 9l-2.5 5.5L21 18l-7-1.5V21l-2.5-3.5L4 19.5 6 14.5 3 13.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <path d="M7.5 9.8a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z" fill="currentColor" />
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
