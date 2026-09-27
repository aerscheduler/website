import type { ReactNode } from "react";
import {
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Download,
  GraduationCap,
  LayoutGrid,
  ListFilter,
  Mail,
  Menu,
  MessageSquare,
  Monitor,
  Paperclip,
  Plane,
  Plus,
  Receipt,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Composite, Dot, Enter, Grow, Panel, Tag } from "@/components/landing/product-ui";
import { INK, STATUS } from "@/components/landing/product-tokens";

/**
 * The home page's product composites, in the Linear pattern (light theme). One
 * per section; see `product-ui.tsx` for the primitives and the motion contract.
 */

const hex = (color: string, alpha: number) =>
  `${color}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;

/* ------------------------------------------------------------------ */
/* Hero: the whole console, dark, with the day on the dispatch board   */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Calendar", icon: CalendarDays },
  { label: "Billing", icon: Receipt },
  { label: "Training", icon: GraduationCap },
  { label: "Maintenance", icon: Wrench },
  { label: "Reports", icon: BarChart3 },
  { label: "People", icon: Users },
];

const H0 = 7;
const H1 = 18;
const at = (h: number) => `${((h - H0) / (H1 - H0)) * 100}%`;
const span = (a: number, b: number) => `${((b - a) / (H1 - H0)) * 100}%`;

type HeroLane = {
  name: string;
  kind: string;
  sim?: boolean;
  grounded?: boolean;
  items: { c: string; title: string; who: string; a: number; b: number; late?: boolean }[];
};

const HERO_LANES: HeroLane[] = [
  { name: "N472DP", kind: "Cessna 172S", items: [
    { c: STATUS.purple, title: "Private pilot, pattern", who: "Jamie Castellano", a: 8, b: 10 },
    { c: STATUS.blue, title: "Solo, practice area", who: "Rosa Delgado", a: 13, b: 14.5 },
  ] },
  { name: "N118TQ", kind: "Cessna 172S", items: [
    { c: STATUS.purple, title: "Instrument approaches", who: "Tova Lindqvist", a: 9, b: 11 },
    { c: STATUS.green, title: "Rental, local", who: "Hollis Bramley", a: 14, b: 17 },
  ] },
  { name: "N903MV", kind: "Piper Archer", items: [
    { c: STATUS.purple, title: "Cross-country dual", who: "Emeka Nwosu", a: 10.5, b: 13.5 },
  ] },
  { name: "N655RG", kind: "Cirrus SR20", grounded: true, items: [] },
  { name: "N725VK", kind: "Diamond DA40", items: [
    { c: STATUS.purple, title: "Checkride prep", who: "Noor Haddad", a: 11, b: 12.5, late: true },
    { c: STATUS.orange, title: "Discovery flight", who: "Guest", a: 16, b: 17 },
  ] },
  { name: "Redbird FMX", kind: "Simulator", sim: true, items: [
    { c: STATUS.yellow, title: "Simulator, IFR", who: "Wes Abbott", a: 8.5, b: 10 },
    { c: STATUS.yellow, title: "Holds and approaches", who: "Ivy Petrosyan", a: 15, b: 16.5 },
  ] },
  { name: "N398HB", kind: "Cessna 152", items: [
    { c: STATUS.blue, title: "Solo, cross-country", who: "Cal Merriweather", a: 9.5, b: 12 },
  ] },
];

/**
 * The mobile app's Home, stacked over the hero's dispatch board so the iOS and
 * Android apps show up in the first screenful.
 *
 * It follows the real app's Home layout (see `components/phone-mock.tsx`,
 * which mirrors the Flutter staff Home): a top bar with menu, search, inbox and
 * a black create button; a wallet-pass hero for the next booking; Calendar /
 * Invoices / Squawks pills; a 2x2 of stat tiles; and an Upcoming list with a
 * blue edge on each row. Deliberately NO device frame, notch or status bar:
 * Tony wanted "a mobile view", not "the iPhone preview".
 */
const MOBILE_STATS = [
  { label: "Next on schedule", value: "Tue 9:30 AM", hint: "N472DP", icon: Plane, warn: false },
  { label: "Upcoming", value: "4", hint: "next 30 days", icon: CalendarDays, warn: false },
  { label: "Open squawks", value: "2", hint: "Fleet", icon: Wrench, warn: true },
  { label: "Unpaid", value: "$186.00", hint: "1 invoice", icon: Receipt, warn: true },
];

const MOBILE_UPCOMING = [
  { title: "N472DP · Solo, practice area", when: "Tue, Sep 29 · 9:30 AM to 11:00 AM" },
  { title: "N903MV · Cross-country dual", when: "Thu, Oct 1 · 8:00 AM to 11:00 AM" },
];

export function MobileHome() {
  return (
    <div className="w-[292px] overflow-hidden rounded-[34px] border border-black/[0.08] bg-[#f2f4f7] p-3 text-[#111318] shadow-[0_50px_90px_-30px_rgba(16,24,40,0.5),0_6px_16px_-6px_rgba(16,24,40,0.15)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-1 pb-2 pt-1">
        <Menu className="size-[18px]" strokeWidth={2} />
        <div className="flex items-center gap-3.5">
          <Search className="size-[17px]" strokeWidth={2} />
          <span className="relative">
            <Bell className="size-[17px]" strokeWidth={2} />
            <span className="absolute -right-0.5 -top-0.5 size-[7px] rounded-full border-[1.5px] border-[#f2f4f7] bg-[#d23b3b]" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#111318] text-white">
            <Plus className="size-4" strokeWidth={2.4} />
          </span>
        </div>
      </div>

      {/* Wallet-pass hero: the next booking */}
      <div
        className="board-in rounded-[20px] bg-gradient-to-br from-[#1a4fb8] via-[#1967d2] to-[#2c4589] px-4 pb-3.5 pt-3.5 text-white shadow-[0_12px_28px_-10px_rgba(25,103,210,0.6)]"
        style={{ animationDelay: "0.35s" }}
      >
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">
          <span>Dual lesson</span>
          <span className="normal-case tracking-normal">Mon, Sep 28</span>
        </div>
        <p className="mt-2 text-[17px] font-semibold leading-snug tracking-tight">N472DP · Private pilot, pattern</p>
        <p className="mt-2 text-[12px] text-white/85">8:00 AM to 10:00 AM</p>
        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-white/80">
          <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-[8px] font-semibold">DH</span>
          with Dana Holloway
        </div>
      </div>

      {/* Pills */}
      <div className="mt-2.5 flex gap-1.5">
        {[
          { label: "Calendar", icon: CalendarDays },
          { label: "Invoices", icon: Receipt },
          { label: "Squawks", icon: Wrench },
        ].map(({ label, icon: Icon }, i) => (
          <span
            key={label}
            className="board-in flex flex-1 items-center justify-center gap-1 rounded-full border border-[#e4e7ec] bg-white py-1.5 text-[11px] font-semibold"
            style={{ animationDelay: `${0.5 + i * 0.05}s` }}
          >
            <Icon className="size-3" strokeWidth={2.2} />
            {label}
          </span>
        ))}
      </div>

      {/* 2x2 stats */}
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {MOBILE_STATS.map(({ label, value, hint, icon: Icon, warn }, i) => (
          <div
            key={label}
            className="board-in flex min-h-[86px] flex-col rounded-[16px] bg-white px-3 py-2.5 shadow-[0_2px_10px_-4px_rgba(16,24,40,0.12)]"
            style={{ animationDelay: `${0.62 + i * 0.06}s` }}
          >
            <div className="flex items-start justify-between gap-1">
              <p className="text-[10px] font-medium leading-tight text-[#6b7180]">{label}</p>
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-md",
                  warn ? "bg-[#b7791f]/15 text-[#b7791f]" : "bg-[#1967d2]/10 text-[#1967d2]"
                )}
              >
                <Icon className="size-3.5" strokeWidth={2} />
              </span>
            </div>
            <p className="mt-auto pt-2 text-[15px] font-semibold leading-tight tracking-tight tabular-nums">{value}</p>
            <p className="mt-0.5 truncate text-[10px] text-[#6b7180]">{hint}</p>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div className="mt-3 flex items-baseline justify-between px-1">
        <p className="text-[14px] font-bold tracking-tight">Upcoming</p>
        <span className="text-[11px] font-medium text-[#6b7180]">See all</span>
      </div>
      <div className="mt-1.5 space-y-1.5">
        {MOBILE_UPCOMING.map((row, i) => (
          <div
            key={row.title}
            className="board-in flex items-stretch overflow-hidden rounded-[14px] border border-[#e8eaed] bg-white"
            style={{ animationDelay: `${0.9 + i * 0.07}s` }}
          >
            <span className="w-[3px] shrink-0 bg-[#1967d2]" />
            <div className="min-w-0 flex-1 px-3 py-2">
              <p className="truncate text-[12px] font-semibold">{row.title}</p>
              <p className="mt-0.5 truncate text-[10px] text-[#6b7180]">{row.when}</p>
            </div>
            <ChevronRight className="mr-2 size-4 self-center text-[#9aa0ab]" />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#111318]/80" />
    </div>
  );
}

export function HeroConsole() {
  let n = 0;
  return (
    <div className={cn("overflow-hidden rounded-[16px] border shadow-[0_40px_100px_-40px_rgba(16,24,40,0.35),0_2px_8px_-2px_rgba(16,24,40,0.06)]", INK.panel, INK.line, INK.text)}>
      <div className="flex">
        <aside className={cn("hidden w-[190px] shrink-0 border-r px-3 py-4 md:block", INK.line)}>
          <div className="flex items-center gap-2 px-2 pb-4">
            <span className="flex size-5 items-center justify-center rounded-md bg-[#1967d2] text-[10px] font-bold text-white">F</span>
            <span className="truncate text-[13px] font-medium">Fieldstone Aviation</span>
            <ChevronDown className="ml-auto size-3 text-black/35" />
          </div>
          <div className="mb-3 flex items-center gap-2 rounded-md border border-black/[0.06] px-2 py-1.5 text-[12px] text-black/35">
            <Search className="size-3" /> Search
            <span className="ml-auto text-[10px]">⌘K</span>
          </div>
          {NAV.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px]",
                label === "Calendar" ? "bg-[#1967d2]/[0.08] text-[#1967d2]" : "text-black/45"
              )}
            >
              <Icon className="size-3.5" strokeWidth={1.8} />
              {label}
            </div>
          ))}
          <p className="mt-5 px-2 text-[11px] text-black/35">Needs attention</p>
          {[["Flown, not invoiced", "3"], ["Open squawks", "5"], ["Grounded", "1"]].map(([l, v]) => (
            <div key={l} className="flex items-center gap-2 px-2 py-1 text-[12px] text-black/45">
              {l}
              <span className="ml-auto tabular-nums text-black/35">{v}</span>
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 px-5 pb-6 pt-4">
          <div className="flex items-center gap-3">
            <p className="text-[15px] font-medium">The Ramp</p>
            <span className="text-[12px] text-black/35">Monday, Sep 28</span>
            <span className="ml-auto flex rounded-md border border-black/[0.07] p-0.5 text-[11px] text-black/45">
              <span className="px-2 py-0.5">Month</span>
              <span className="px-2 py-0.5">Week</span>
              <span className="rounded bg-black/[0.08] px-2 py-0.5 text-[#1b1c1f]">Day</span>
            </span>
            <span className="rounded-md bg-[#1967d2] px-2.5 py-1 text-[11px] font-medium text-white">New reservation</span>
          </div>
          <div className="mt-4 flex text-[10px] text-black/35">
            <div className="w-[120px] shrink-0" />
            <div className="relative h-4 flex-1">
              {Array.from({ length: H1 - H0 }, (_, i) => H0 + i).map((h) => (
                <span key={h} className="absolute -translate-x-1/2 tabular-nums" style={{ left: at(h) }}>
                  {h > 12 ? h - 12 : h}
                  {h >= 12 ? "p" : "a"}
                </span>
              ))}
            </div>
          </div>
          {HERO_LANES.map((lane) => (
            <div key={lane.name} className="flex h-[60px] border-t border-black/[0.05]">
              <div className="flex w-[120px] shrink-0 items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-md bg-black/[0.05] text-black/45">
                  {lane.sim ? <Monitor className="size-3" /> : <Plane className="size-3" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-mono text-[12px] text-[#1b1c1f]">{lane.name}</span>
                  <span className="block truncate text-[10px] text-black/35">{lane.kind}</span>
                </span>
              </div>
              <div className="relative flex-1">
                {Array.from({ length: H1 - H0 }, (_, i) => H0 + i).map((h) => (
                  <span key={h} className="absolute inset-y-0 w-px bg-black/[0.03]" style={{ left: at(h) }} />
                ))}
                {lane.grounded && (
                  <div
                    className="board-in absolute inset-y-[7px] left-0 right-0 flex items-center gap-2 rounded-md border px-3 text-[11px]"
                    style={{
                      animationDelay: `${0.3 + n++ * 0.06}s`,
                      borderColor: hex(STATUS.red, 0.3),
                      color: STATUS.red,
                      background: `repeating-linear-gradient(135deg, ${hex(STATUS.red, 0.08)} 0 6px, ${hex(STATUS.red, 0.03)} 6px 12px)`,
                    }}
                  >
                    <CircleAlert className="size-3" /> Grounded · 100-hour inspection due
                  </div>
                )}
                {lane.items.map((item) => (
                  <div
                    key={item.title}
                    className={cn("board-in absolute inset-y-[7px] flex flex-col justify-center overflow-hidden rounded-md border px-2.5", item.late && "ring-1 ring-[#1967d2]/50")}
                    style={{
                      left: `calc(${at(item.a)} + 2px)`,
                      width: `calc(${span(item.a, item.b)} - 4px)`,
                      borderColor: hex(item.c, 0.35),
                      background: hex(item.c, 0.12),
                      animationDelay: item.late ? "1.7s" : `${0.3 + n++ * 0.06}s`,
                    }}
                  >
                    <p className="truncate text-[11px] font-medium leading-4 text-[#1b1c1f]">{item.title}</p>
                    <p className="truncate text-[10px] leading-4 text-black/50">{item.who}</p>
                  </div>
                ))}
                <span className="absolute inset-y-0 w-px bg-[#d64545]/70" style={{ left: at(14.4) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scheduling: the week's bookings list + the booking dialog in front  */
/* ------------------------------------------------------------------ */

const WEEK = [
  { group: "Today", color: STATUS.blue, rows: [
    ["8:00", "Private pilot, pattern", "N472DP", "Jamie Castellano", STATUS.purple],
    ["9:00", "Instrument approaches", "N118TQ", "Tova Lindqvist", STATUS.purple],
    ["10:30", "Cross-country dual", "N903MV", "Emeka Nwosu", STATUS.purple],
    ["13:00", "Solo, practice area", "N472DP", "Rosa Delgado", STATUS.blue],
  ] },
  { group: "Tomorrow", color: STATUS.grey, rows: [
    ["8:30", "Simulator, IFR", "Redbird FMX", "Wes Abbott", STATUS.yellow],
    ["11:00", "Checkride prep", "N725VK", "Noor Haddad", STATUS.purple],
    ["14:00", "Rental, local", "N118TQ", "Hollis Bramley", STATUS.green],
  ] },
];

export function SchedulingComposite() {
  return (
    <Composite
      back={
        <Panel>
          {WEEK.map((g) => (
            <div key={g.group}>
              <div className="flex items-center gap-2.5 bg-black/[0.02] px-5 py-2.5 text-[13px]">
                <Dot color={g.color} ring />
                <span className="font-medium">{g.group}</span>
                <span className="text-black/35">{g.rows.length}</span>
              </div>
              {g.rows.map(([time, title, tail, who, color], i) => (
                <Enter key={title} delay={i * 70} from="fade">
                  <div className="flex items-center gap-4 px-5 py-3 text-[13px]">
                    <span className="w-11 tabular-nums text-black/35">{time}</span>
                    <Dot color={color} />
                    <span className="min-w-0 flex-1 truncate">{title}</span>
                    <span className="hidden font-mono text-[12px] text-black/45 sm:inline">{tail}</span>
                    <span className="hidden w-32 truncate text-black/35 sm:inline">{who}</span>
                  </div>
                </Enter>
              ))}
            </div>
          ))}
        </Panel>
      }
      front={
        <Panel title="New reservation" icon={<CalendarDays className="size-3.5 text-black/45" />}>
          <div className="space-y-3 p-4 text-[12px]">
            <div className="grid grid-cols-2 gap-2">
              {[["Type", "Dual"], ["Aircraft", "N472DP"], ["When", "Mon 3:00 PM"], ["Student", "Jamie Castellano"]].map(([l, v]) => (
                <div key={l} className="rounded-md border border-black/[0.07] bg-black/[0.02] px-2.5 py-1.5">
                  <p className="text-[10px] text-black/35">{l}</p>
                  <p className="truncate">{v}</p>
                </div>
              ))}
            </div>
            {["Medical current", "Flight review current", "Checked out in N472DP"].map((line, i) => (
              <Enter key={line} delay={300 + i * 160} from="left">
                <span className="flex items-center gap-2 text-black/60">
                  <Check className="size-3.5" style={{ color: STATUS.green }} strokeWidth={2.5} />
                  {line}
                </span>
              </Enter>
            ))}
            <Enter delay={850}>
              <div className="flex justify-end">
                <span className="rounded-md bg-[#1967d2] px-3 py-1.5 font-medium text-white">Book reservation</span>
              </div>
            </Enter>
          </div>
        </Panel>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Billing: invoices grouped by status + the drafted invoice           */
/* ------------------------------------------------------------------ */

const INVOICES = [
  { group: "Overdue", color: STATUS.red, rows: [["#7568970", "Cal Merriweather", "Rental, local", "$382.50"], ["#7568961", "Ivy Petrosyan", "Simulator, IFR", "$150.00"]] },
  { group: "Sent", color: STATUS.yellow, rows: [["#7568982", "Rosa Delgado", "Solo, practice area", "$247.50"], ["#7568981", "Hollis Bramley", "Rental, local", "$495.00"]] },
  { group: "Paid", color: STATUS.green, rows: [["#7568983", "Emeka Nwosu", "Cross-country dual", "$675.50"], ["#7568980", "Noor Haddad", "Checkride prep", "$337.50"], ["#7568979", "Wes Abbott", "Simulator, IFR", "$112.50"]] },
];

export function BillingComposite() {
  return (
    <Composite
      frontSide="left"
      back={
        <Panel>
          {INVOICES.map((g) => (
            <div key={g.group}>
              <div className="flex items-center gap-2.5 bg-black/[0.02] px-5 py-2.5 text-[13px]">
                <Dot color={g.color} ring />
                <span className="font-medium">{g.group}</span>
                <span className="text-black/35">{g.rows.length}</span>
              </div>
              {g.rows.map(([n, who, what, amt]) => (
                <div key={n} className="flex items-center gap-4 px-5 py-3 text-[13px]">
                  <span className="w-20 font-mono text-[12px] text-black/35">{n}</span>
                  <span className="w-36 truncate">{who}</span>
                  <span className="hidden flex-1 truncate text-black/45 sm:block">{what}</span>
                  <span className="ml-auto tabular-nums text-black/60">{amt}</span>
                </div>
              ))}
            </div>
          ))}
        </Panel>
      }
      front={
        <Panel title="Invoice #7568983" icon={<Receipt className="size-3.5 text-black/45" />} right={<Tag color={STATUS.green}>Paid</Tag>}>
          <div className="p-4 text-[12px]">
            <p className="text-black/45">Emeka Nwosu · Cross-country dual · Sep 28</p>
            <div className="mt-3 space-y-2">
              {[["N903MV · 2.9 hr × $165", "$478.50"], ["Instruction · 2.6 hr × $70", "$182.00"], ["Landing fee · KBDN", "$15.00"]].map(([l, v], i) => (
                <Enter key={l} delay={200 + i * 160} from="left">
                  <div className="flex justify-between gap-3">
                    <span className="text-black/60">{l}</span>
                    <span className="tabular-nums">{v}</span>
                  </div>
                </Enter>
              ))}
            </div>
            <Enter delay={750}>
              <div className="mt-3 flex items-baseline justify-between border-t border-black/[0.07] pt-3">
                <span className="text-black/60">Total</span>
                <span className="text-[20px] font-medium tabular-nums">$675.50</span>
              </div>
            </Enter>
            <Enter delay={1050} from="scale">
              <div className="mt-3 flex items-center gap-2 rounded-md px-2.5 py-2" style={{ background: hex(STATUS.green, 0.1), color: STATUS.green }}>
                <Check className="size-3.5" strokeWidth={2.5} /> Charged Visa ending 4242 at close-out
              </div>
            </Enter>
          </div>
        </Panel>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Training: the course as a timeline + a lesson being graded          */
/* ------------------------------------------------------------------ */

const STAGES = [
  { name: "Stage 1: Presolo", from: 0, to: 34, check: 30, done: true },
  { name: "Stage 2: Cross-country and night", from: 30, to: 68, check: 64, done: false },
  { name: "Stage 3: Checkride prep", from: 62, to: 96, check: 92, done: false },
];

export function TrainingComposite() {
  return (
    <Composite
      back={
        <Panel>
          <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-5 py-3 text-[13px]">
            <GraduationCap className="size-3.5 text-black/45" />
            <span className="font-medium">Private Pilot: Airplane SEL</span>
            <span className="text-black/35">Part 61 · Jamie Castellano</span>
          </div>
          <div className="px-5 pb-8 pt-3">
            <div className="relative flex justify-between text-[11px] text-black/35">
              {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => <span key={m}>{m}</span>)}
            </div>
            <div className="mt-6 space-y-8">
              {STAGES.map((s, i) => (
                <div key={s.name}>
                  <p className="mb-2 flex items-center gap-2 text-[12px] text-black/60" style={{ marginLeft: `${s.from}%` }}>
                    <Dot color={s.done ? STATUS.green : STATUS.blue} /> {s.name}
                  </p>
                  <div className="relative h-7">
                    <div className="absolute inset-y-0 overflow-hidden rounded-md border border-black/[0.07] bg-black/[0.03]" style={{ left: `${s.from}%`, width: `${s.to - s.from}%` }}>
                      <Grow delay={200 + i * 200} className="h-full" style={{ width: s.done ? "100%" : i === 1 ? "38%" : "0%", background: hex(s.done ? STATUS.green : STATUS.blue, 0.22) }} />
                    </div>
                    <span className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border" style={{ left: `${s.check}%`, borderColor: s.done ? STATUS.green : "rgba(255,255,255,0.4)", background: s.done ? STATUS.green : "transparent" }} />
                  </div>
                  <p className="mt-1.5 text-[10px] text-black/35" style={{ marginLeft: `${s.check - 6}%` }}>
                    Stage check {s.done ? "passed" : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      }
      front={
        <Panel title="Flight 7: Dual cross-country" icon={<Plane className="size-3.5 text-black/45" />} right={<span className="text-[11px] text-black/35">Grading</span>}>
          <div className="p-4 text-[12px]">
            <div className="grid grid-cols-2 gap-2">
              {[["Flight hours", "2.9"], ["Instruction", "2.6"]].map(([l, v]) => (
                <div key={l} className="rounded-md border border-black/[0.07] bg-black/[0.02] px-2.5 py-1.5">
                  <p className="text-[10px] text-black/35">{l}</p>
                  <p className="tabular-nums">{v}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-black/35">Tasks</p>
            <div className="mt-1.5 space-y-1.5">
              {["Pilotage and dead reckoning", "Navigation systems", "Diversion", "Lost procedures"].map((task, i) => (
                <div key={task} className="flex items-center gap-2">
                  <span className="flex-1 truncate text-black/60">{task}</span>
                  {["S", "U"].map((g) => (
                    <span
                      key={g}
                      className={cn(
                        "flex size-5 items-center justify-center rounded text-[10px] transition-colors duration-300",
                        g === "S" ? "text-black/35 group-data-[on=true]/m:bg-[#2f9e6b]/15 group-data-[on=true]/m:text-[#2f9e6b]" : "bg-black/[0.04] text-black/35"
                      )}
                      style={{ transitionDelay: `${300 + i * 180}ms` }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <Enter delay={1150}>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-black/45">Credits: dual cross-country, 2.9 hr</span>
                <span className="rounded-md bg-[#1967d2] px-2.5 py-1 font-medium text-white">Save and sign</span>
              </div>
            </Enter>
          </div>
        </Panel>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Maintenance: the fleet's inspections + a squawk thread              */
/* ------------------------------------------------------------------ */

const FLEET = [
  { group: "Grounded", color: STATUS.red, rows: [["N655RG", "100-hour inspection", "0.0 hrs", 0, STATUS.red]] },
  { group: "Due soon", color: STATUS.yellow, rows: [["N472DP", "100-hour inspection", "4.6 hrs", 5, STATUS.yellow], ["N903MV", "50-hour oil change", "4.8 hrs", 10, STATUS.yellow], ["N118TQ", "ELT inspection", "12 days", 14, STATUS.yellow]] },
  { group: "Current", color: STATUS.green, rows: [["N725VK", "Annual inspection", "95 days", 26, STATUS.green], ["N398HB", "Transponder check", "14 months", 58, STATUS.green]] },
] as const;

export function MaintenanceComposite() {
  return (
    <Composite
      frontSide="left"
      back={
        <Panel>
          {FLEET.map((g) => (
            <div key={g.group}>
              <div className="flex items-center gap-2.5 bg-black/[0.02] px-5 py-2.5 text-[13px]">
                <Dot color={g.color} ring />
                <span className="font-medium">{g.group}</span>
                <span className="text-black/35">{g.rows.length}</span>
              </div>
              {g.rows.map(([tail, item, left, pct, color], i) => (
                <div key={tail + item} className="grid grid-cols-[76px_1fr_120px_72px] items-center gap-4 px-5 py-3 text-[13px]">
                  <span className="font-mono text-[12px] text-[#1b1c1f]">{tail}</span>
                  <span className="truncate text-black/60">{item}</span>
                  <span className="h-1 overflow-hidden rounded-full bg-black/[0.06]">
                    <Grow delay={200 + i * 120} className="h-full rounded-full" style={{ width: `${Math.max(pct, 2)}%`, background: color }} />
                  </span>
                  <span className="text-right tabular-nums" style={{ color: pct < 12 ? color : "rgba(255,255,255,0.5)" }}>{left}</span>
                </div>
              ))}
            </div>
          ))}
        </Panel>
      }
      front={
        <Panel title="Squawk · N472DP" icon={<MessageSquare className="size-3.5 text-black/45" />} right={<Tag color={STATUS.yellow}>Open</Tag>}>
          <div className="space-y-3.5 p-4 text-[12px]">
            {[
              ["DH", "Dana Holloway", "8:42 AM", "Nav light flickers on taxi. Steady once airborne.", "#9b87f5"],
              ["WA", "Wes Abbott, A&P", "11:15 AM", "Loose connector at the left wingtip. Reseated and tested on the ramp.", "#4cb782"],
            ].map(([ini, who, when, note, tone], i) => (
              <Enter key={who} delay={250 + i * 300} from="left">
                <div className="flex gap-2.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white" style={{ background: tone }}>{ini}</span>
                  <div>
                    <p><span className="font-medium">{who}</span> <span className="text-black/35">{when}</span></p>
                    <p className="text-black/60">{note}</p>
                  </div>
                </div>
              </Enter>
            ))}
            <Enter delay={900}>
              <div className="flex items-center gap-2 rounded-md border border-black/[0.07] bg-black/[0.02] px-2.5 py-1.5 text-black/45">
                <Paperclip className="size-3.5" /> wingtip-connector.jpg
              </div>
            </Enter>
            <Enter delay={1200}>
              <div className="flex items-center gap-2 rounded-md px-2.5 py-2" style={{ background: hex(STATUS.green, 0.1), color: STATUS.green }}>
                <Check className="size-3.5" strokeWidth={2.5} /> Resolve squawk
              </div>
            </Enter>
          </div>
        </Panel>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Reporting: a saved, filtered, grouped view, and its email schedule   */
/* ------------------------------------------------------------------ */
/* Tony wanted the section to show more of the report engine, simply: the
   back panel is one report as a school would set it up (a saved view with
   filters, grouped by aircraft, a labelled line chart and totals), the front
   one emails it every Monday. Everything shown is real in the console: the
   Revenue report's Lesson type filter, Resource grouping, Invoices / Hours /
   Billed columns, CSV and PDF export, daily / weekly / monthly schedules sent
   as CSV. Figures are invented. (Vetoed before: horizontal bars, an axis-less
   dot plot.) */

const REVENUE_MONTHS = [
  { m: "Apr", v: 18200 },
  { m: "May", v: 21400 },
  { m: "Jun", v: 24900 },
  { m: "Jul", v: 27600 },
  { m: "Aug", v: 26100 },
  { m: "Sep", v: 29345 },
];

const CHART = { w: 1000, h: 250, left: 24, right: 70, top: 16, bottom: 36, max: 30000 };
const px = (i: number) =>
  CHART.left + (i / (REVENUE_MONTHS.length - 1)) * (CHART.w - CHART.left - CHART.right);
const py = (v: number) => CHART.top + (1 - v / CHART.max) * (CHART.h - CHART.top - CHART.bottom);
const LINE = REVENUE_MONTHS.map((p, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(p.v).toFixed(1)}`).join(" ");
const AREA = `${LINE} L${px(REVENUE_MONTHS.length - 1)},${py(0)} L${px(0)},${py(0)} Z`;

/** Grouped by aircraft; Billed sums to the chart's six months. */
const BY_AIRCRAFT = [
  { tail: "N472DP", invoices: 88, hours: 197.4, billed: 46392 },
  { tail: "N903MV", invoices: 74, hours: 162.1, billed: 38102 },
  { tail: "N318TQ", invoices: 69, hours: 151.7, billed: 35660 },
  { tail: "N655RG", invoices: 52, hours: 116.6, billed: 27391 },
];
const BY_AIRCRAFT_TOTAL = BY_AIRCRAFT.reduce(
  (t, r) => ({ invoices: t.invoices + r.invoices, hours: t.hours + r.hours, billed: t.billed + r.billed }),
  { invoices: 0, hours: 0, billed: 0 }
);
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const FILTERS = [
  { field: "Date", op: "is", value: "Apr 1 to Sep 30" },
  { field: "Lesson type", op: "is", value: "Dual" },
  { field: "Location", op: "is", value: "KBDN" },
];

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-md border border-black/[0.08] bg-black/[0.02] px-2 py-1 text-[12px]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function ReportingComposite() {
  const last = REVENUE_MONTHS.length - 1;
  return (
    <Composite
      frontTop="58%"
      backFade="92%"
      className="md:pb-[12%]"
      back={
        <Panel>
          {/* Report + saved view, export and schedule */}
          <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-5 py-3 text-[13px]">
            <BarChart3 className="size-3.5 text-black/45" />
            <span className="font-medium">Revenue</span>
            <span className="text-black/25">/</span>
            <span className="inline-flex items-center gap-1 text-black/70">
              Dual lessons by aircraft
              <ChevronDown className="size-3.5 text-black/40" />
            </span>
            <Tag color={STATUS.blue}>Saved view</Tag>
            <span className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-md border border-black/[0.08] px-2.5 py-1 text-[12px] text-black/60 sm:inline-flex">
                <Download className="size-3.5" />
                CSV · PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#1b1c1f] px-2.5 py-1 text-[12px] text-white">
                <Mail className="size-3.5" />
                Schedule
              </span>
            </span>
          </div>

          {/* Filters and grouping */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-black/[0.07] px-5 py-2.5">
            <ListFilter className="mr-1 size-3.5 text-black/40" />
            {FILTERS.map((f, i) => (
              <Enter key={f.field} delay={150 + i * 140} from="scale">
                <Chip>
                  <span className="text-black/45">{f.field}</span>
                  <span className="text-black/35">{f.op}</span>
                  <span className="font-medium">{f.value}</span>
                </Chip>
              </Enter>
            ))}
            <Enter delay={600} from="scale">
              <Chip className="border-dashed bg-transparent text-black/45">
                <Plus className="size-3" /> Filter
              </Chip>
            </Enter>
            <span className="ml-auto hidden text-[12px] text-black/45 md:inline">
              Group by <span className="font-medium text-[#1b1c1f]">Resource</span>
            </span>
          </div>

          {/* Billed per month */}
          <div className="px-3 pt-3">
            <svg viewBox={`0 0 ${CHART.w} ${CHART.h}`} className="h-auto w-full" role="img" aria-label="Billed per month for dual lessons, April to September, rising from $18,200 to $29,345">
              <defs>
                <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={STATUS.blue} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={STATUS.blue} stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 10000, 20000, 30000].map((v) => (
                <g key={v}>
                  <line x1={CHART.left} x2={CHART.w - CHART.right} y1={py(v)} y2={py(v)} stroke="rgba(0,0,0,0.07)" strokeDasharray={v ? "3 4" : undefined} />
                  <text x={CHART.w - CHART.right + 14} y={py(v) + 4} textAnchor="start" fontSize="13" fill="rgba(0,0,0,0.5)">
                    {v ? `$${v / 1000}k` : "$0"}
                  </text>
                </g>
              ))}
              {REVENUE_MONTHS.map((p, i) => (
                <text key={p.m} x={px(i)} y={CHART.h - 10} textAnchor="middle" fontSize="13" fill="rgba(0,0,0,0.5)">
                  {p.m}
                </text>
              ))}
              <path
                d={AREA}
                fill="url(#rev-fill)"
                className="transition-opacity delay-700 duration-700 group-data-[on=false]/m:opacity-0"
              />
              <path
                d={LINE}
                fill="none"
                stroke={STATUS.blue}
                strokeWidth="2.25"
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                className="transition-[stroke-dashoffset] duration-[1400ms] ease-out [stroke-dashoffset:0] group-data-[on=false]/m:[stroke-dashoffset:1] motion-reduce:transition-none"
              />
              {REVENUE_MONTHS.map((p, i) => (
                <circle
                  key={p.m}
                  cx={px(i)}
                  cy={py(p.v)}
                  r={i === last ? 4.5 : 3}
                  fill="white"
                  stroke={STATUS.blue}
                  strokeWidth="2"
                  className="transition-opacity duration-300 group-data-[on=false]/m:opacity-0"
                  style={{ transitionDelay: `${250 + i * 200}ms` }}
                />
              ))}
            </svg>
          </div>

          {/* Grouped table with totals */}
          <div className="px-5 pb-4 text-[12.5px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/[0.07] py-2 text-[11px] text-black/40">
              <span>Resource</span>
              <span className="text-right">Invoices</span>
              <span className="text-right">Hours</span>
              <span className="text-right">Billed</span>
            </div>
            {BY_AIRCRAFT.map((r, i) => (
              <Enter key={r.tail} delay={500 + i * 120}>
                <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-black/[0.05] py-2 tabular-nums">
                  <span className="font-mono text-black/75">{r.tail}</span>
                  <span className="text-right text-black/55">{r.invoices}</span>
                  <span className="text-right text-black/55">{r.hours.toFixed(1)}</span>
                  <span className="text-right">{usd(r.billed)}</span>
                </div>
              </Enter>
            ))}
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] py-2 font-medium tabular-nums">
              <span>Total</span>
              <span className="text-right">{BY_AIRCRAFT_TOTAL.invoices}</span>
              <span className="text-right">{BY_AIRCRAFT_TOTAL.hours.toFixed(1)}</span>
              <span className="text-right">{usd(BY_AIRCRAFT_TOTAL.billed)}</span>
            </div>
          </div>
        </Panel>
      }
      front={
        <Panel title="Email this view" icon={<Mail className="size-3.5 text-black/45" />} right={<Tag color={STATUS.green}>On</Tag>}>
          <div className="space-y-4 p-5 text-[12.5px]">
            <div>
              <p className="text-[11px] text-black/40">How often</p>
              <div className="mt-1.5 grid grid-cols-3 rounded-lg bg-black/[0.04] p-0.5 text-center text-[12px]">
                {["Daily", "Weekly", "Monthly"].map((c) => (
                  <span
                    key={c}
                    className={cn("rounded-md py-1.5", c === "Weekly" ? "bg-white font-medium shadow-sm" : "text-black/45")}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-black/40">Day</p>
                <p className="mt-1.5 rounded-md border border-black/[0.08] px-2.5 py-1.5">Monday</p>
              </div>
              <div>
                <p className="text-[11px] text-black/40">Time</p>
                <p className="mt-1.5 rounded-md border border-black/[0.08] px-2.5 py-1.5">7:00 AM</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] text-black/40">Send to</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {[
                  ["DH", "Dana Holloway"],
                  ["RD", "Rosa Delgado"],
                ].map(([initials, name], i) => (
                  <Enter key={name} delay={400 + i * 150} from="scale">
                    <Chip>
                      <span className="flex size-4 items-center justify-center rounded-full bg-[#1b1c1f]/10 text-[8px] font-semibold">
                        {initials}
                      </span>
                      {name}
                    </Chip>
                  </Enter>
                ))}
              </div>
            </div>
            <p className="flex items-center gap-1.5 border-t border-black/[0.07] pt-3 text-black/50">
              <Paperclip className="size-3.5" />
              Sent as a CSV, every Monday at 7:00 AM
            </p>
          </div>
        </Panel>
      }
    />
  );
}
