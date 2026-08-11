"use client";

import { useCallback, useRef, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
} from "@/components/mocks/shell";
import { ReportsMock } from "@/components/mocks/reports-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type View = "overview" | "report";

type FilterChip = { id: string; label: string };

type Tile = {
  id: string;
  label: string;
  value: string;
  delta: string;
  window: string;
  pinned?: boolean;
  summary: string;
  details: string[];
};

const SEED_TILES: Tile[] = [
  {
    id: "billed",
    label: "Billed",
    value: "$86,015",
    delta: "+8%",
    window: "Jul 2–Jul 31",
    summary: "Everything invoiced in the board window.",
    details: [
      "Flight invoices · $71,420",
      "Ground & sim · $8,110",
      "Membership dues · $6,485",
      "Opens · Revenue report",
    ],
  },
  {
    id: "collected",
    label: "Collected",
    value: "$59,716",
    delta: "+5%",
    window: "Jul 2–Jul 31",
    summary: "Cash that hit the account.",
    details: [
      "Card · $48,200",
      "ACH / check · $9,016",
      "Outstanding · $26,299",
      "Opens · Collections report",
    ],
  },
  {
    id: "flown",
    label: "Flown",
    value: "255.9 h",
    delta: "+13%",
    window: "Jul 2–Jul 31",
    summary: "Hobbs across the fleet.",
    details: [
      "Dual · 148.2 h",
      "Solo / rental · 79.4 h",
      "Sim · 28.3 h",
      "Opens · Utilization report",
    ],
  },
  {
    id: "week",
    label: "Revenue this week",
    value: "$17,370",
    delta: "+9%",
    window: "Jul 24–Jul 31",
    pinned: true,
    summary: "Pinned tile — its own range, not the board's.",
    details: [
      "Pinned window · Jul 24–31",
      "Top day · Sat $4,120",
      "Top tail · N8830M",
      "Each tile can override the board range",
    ],
  },
];

const EXTRA_TILE: Tile = {
  id: "cfi",
  label: "Instructor hours",
  value: "186.4 h",
  delta: "+6%",
  window: "Jul 2–Jul 31",
  summary: "Pinned from a saved view — dual given by CFI.",
  details: [
    "From · Instruction given report",
    "Filter · Dual only",
    "Top CFI · Chen 42.1 h",
    "Added while customising",
  ],
};

const REPORT_ROWS = [
  { id: "r1", who: "N8830M · Dual", hours: "1.4", billed: "$231.00" },
  { id: "r2", who: "N8830M · Dual", hours: "1.2", billed: "$198.00" },
  { id: "r3", who: "N4417W · Dual", hours: "1.8", billed: "$297.00" },
  { id: "r4", who: "N8830M · Rental", hours: "2.0", billed: "$330.00" },
];

const SHADOW_CARD =
  "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)]";
const SHADOW_MENU = "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)]";

type DetailState = {
  title: string;
  status?: string;
  summary: string;
  details: string[];
  x: number;
  y: number;
} | null;

type MenuState = {
  x: number;
  y: number;
  items: readonly { id: string; label: string; tone: string }[];
  highlight: string | null;
  toast: string | null;
} | null;

type ScheduleModal = {
  step: "form" | "done";
} | null;

const VIEW_MENU = [
  { id: "save", label: "Save view…", tone: "text-foreground" },
  { id: "schedule", label: "Schedule email…", tone: "text-foreground" },
  { id: "pin", label: "Pin to Overview", tone: "text-foreground" },
] as const;

export function ReportsLiveDemo({
  animated = true,
}: {
  animated?: boolean;
} = {}) {
  const [view, setView] = useState<View>("overview");
  const viewRef = useRef<View>("overview");
  const [range, setRange] = useState<"30" | "ytd">("30");
  const [filters, setFilters] = useState<FilterChip[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [savedView, setSavedView] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [tiles, setTiles] = useState(() => SEED_TILES.map((t) => ({ ...t })));
  const [selected, setSelected] = useState("week");
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);
  const [schedule, setSchedule] = useState<ScheduleModal>(null);
  const [flash, setFlash] = useState(false);

  const ensureView = async (api: DemoController, want: View) => {
    if (viewRef.current === want) return;
    await api.tap(`[data-demo="nav-${want}"]`, () => {
      setView(want);
      viewRef.current = want;
      setFilterOpen(false);
      setDetail(null);
      setMenu(null);
    });
  };

  const openTileDetail = async (api: DemoController, id: string) => {
    const tile = tiles.find((t) => t.id === id) ?? SEED_TILES.find((t) => t.id === id);
    if (!tile) return;
    await api.go(`[data-demo="tile-${id}"]`, 560);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSelected(id);
    const tip = api.pointFor(`[data-demo="tile-${id}"]`);
    setDetail({
      title: tile.label,
      status: tile.delta,
      summary: tile.summary,
      details: tile.details,
      x: Math.min((tip?.x ?? 40) + 6, 56),
      y: Math.min(Math.max((tip?.y ?? 35) + 4, 20), 48),
    });
    api.release();
    await api.wait(240);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-status"]', 340);
    if (api.cancelled()) return;
    await api.wait(480);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-dismiss"]', 320);
    if (api.cancelled()) return;
    await api.press(140);
    if (api.cancelled()) return;
    setDetail(null);
    api.release();
    await api.wait(160);
  };

  const script = useCallback(async (api: DemoController) => {
    setView("overview");
    viewRef.current = "overview";
    setRange("30");
    setFilters([]);
    setFilterOpen(false);
    setSavedView(null);
    setScheduled(false);
    setCustomising(false);
    setTiles(SEED_TILES.map((t) => ({ ...t })));
    setSelected("week");
    setDetail(null);
    setMenu(null);
    setSchedule(null);
    setFlash(false);

    // 1. Overview tile — click opens the report behind the number
    await openTileDetail(api, "week");
    if (api.cancelled()) return;

    // 2. Jump into a report and filter it
    await ensureView(api, "report");
    if (api.cancelled()) return;
    await api.wait(200);
    if (api.cancelled()) return;

    await api.tap('[data-demo="filters-btn"]', () => setFilterOpen(true));
    if (api.cancelled()) return;
    await api.wait(220);
    if (api.cancelled()) return;

    await api.go('[data-demo="filter-aircraft"]', 400);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setFilters([{ id: "ac", label: "Aircraft is N8830M" }]);
    api.release();
    await api.wait(280);
    if (api.cancelled()) return;

    await api.go('[data-demo="filter-hours"]', 380);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setFilters([
      { id: "ac", label: "Aircraft is N8830M" },
      { id: "hrs", label: "Hours ≥ 1.0" },
    ]);
    api.release();
    await api.wait(200);
    if (api.cancelled()) return;

    await api.tap('[data-demo="filters-apply"]', () => setFilterOpen(false));
    if (api.cancelled()) return;
    await api.wait(280);
    if (api.cancelled()) return;

    // 3. Save the filtered view
    await api.go('[data-demo="views-btn"]', 420);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    const vt = api.pointFor('[data-demo="views-btn"]');
    setMenu({
      x: (vt?.x ?? 70) - 2,
      y: (vt?.y ?? 22) + 2,
      items: VIEW_MENU,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(240);
    if (api.cancelled()) return;

    await api.go('[data-demo="ctx-save"]', 360);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "save" } : m));
    await api.wait(100);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSavedView("Dual · N8830M");
    setMenu((m) =>
      m ? { ...m, toast: "View saved", highlight: "save" } : m
    );
    api.release();
    await api.wait(650);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(160);

    // 4. Schedule that saved view by email
    await api.go('[data-demo="views-btn"]', 400);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    const vt2 = api.pointFor('[data-demo="views-btn"]');
    setMenu({
      x: (vt2?.x ?? 70) - 2,
      y: (vt2?.y ?? 22) + 2,
      items: VIEW_MENU,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(220);
    if (api.cancelled()) return;

    await api.go('[data-demo="ctx-schedule"]', 360);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "schedule" } : m));
    await api.wait(100);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setMenu(null);
    setSchedule({ step: "form" });
    api.release();
    await api.wait(280);
    if (api.cancelled()) return;

    await api.go('[data-demo="sched-cadence"]', 360);
    if (api.cancelled()) return;
    await api.wait(400);
    if (api.cancelled()) return;
    await api.go('[data-demo="sched-confirm"]', 360);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSchedule({ step: "done" });
    setScheduled(true);
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    await api.go('[data-demo="sched-close"]', 320);
    if (api.cancelled()) return;
    await api.press(140);
    if (api.cancelled()) return;
    setSchedule(null);
    api.release();
    await api.wait(180);

    // 5. Back to Overview — customise the dashboard, add a tile
    await ensureView(api, "overview");
    if (api.cancelled()) return;
    await api.wait(180);
    if (api.cancelled()) return;

    await api.tap('[data-demo="action"]', () => {
      setCustomising(true);
      setFlash(true);
    });
    if (api.cancelled()) return;
    await api.wait(400);
    setFlash(false);
    if (api.cancelled()) return;

    await api.tap('[data-demo="add-tile"]', () => {
      setTiles((prev) =>
        prev.some((t) => t.id === "cfi") ? prev : [...prev, EXTRA_TILE]
      );
      setSelected("cfi");
    });
    if (api.cancelled()) return;
    await api.wait(700);
    if (api.cancelled()) return;

    await api.tap('[data-demo="action"]', () => setCustomising(false));
    if (api.cancelled()) return;
    await api.wait(500);
    if (api.cancelled()) return;

    await openTileDetail(api, "cfi");
    if (api.cancelled()) return;

    // Soft restore for next loop (no hard flash — reverse customise)
    setTiles(SEED_TILES.map((t) => ({ ...t })));
    setFilters([]);
    setSavedView(null);
    setScheduled(false);
    setSelected("week");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredRows =
    filters.length === 0
      ? REPORT_ROWS
      : REPORT_ROWS.filter((r) => {
          const acOk =
            !filters.some((f) => f.id === "ac") || r.who.startsWith("N8830M");
          const hrsOk =
            !filters.some((f) => f.id === "hrs") || Number(r.hours) >= 1;
          return acOk && hrsOk;
        });

  const actionLabel = customising
    ? flash
      ? "Customising…"
      : "Done"
    : "Customise";

  return (
    <LivingBoard
      label="Morgan · Owner"
      rest={{ x: 86, y: 90 }}
      fallback={<ReportsMock />}
      script={script}
      animated={animated}
    >
      <AppMockShell
        path={view === "overview" ? "/reports" : "/reports/revenue"}
        activeNav={0}
        className="animate-none"
        float={
          <MockFloat
            label={view === "overview" ? "Your dashboard" : "Saved view"}
            value={
              view === "overview"
                ? customising
                  ? "Editing"
                  : `${tiles.length} tiles`
                : savedView ?? "Unsaved"
            }
            meta={
              scheduled
                ? "Weekly email · Mon 7am MT"
                : view === "overview"
                  ? "Every figure opens its report"
                  : filters.length
                    ? `${filters.length} filters on`
                    : "Filter · save · schedule"
            }
          />
        }
      >
        <MockHeader
          eyebrow="Insights"
          title={view === "overview" ? "Overview" : "Revenue by aircraft"}
          action={view === "overview" ? actionLabel : undefined}
        />

        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2">
          <MockPill data-demo="nav-overview" active={view === "overview"}>
            Overview
          </MockPill>
          <MockPill data-demo="nav-report" active={view === "report"}>
            Revenue
          </MockPill>
          <div className="ml-auto flex items-center gap-1.5">
            <MockPill data-demo="range-30" active={range === "30"}>
              Last 30 days
            </MockPill>
            <MockPill data-demo="range-ytd" active={range === "ytd"}>
              YTD
            </MockPill>
          </div>
        </div>

        {view === "overview" ? (
          <OverviewBody
            tiles={tiles}
            selected={selected}
            customising={customising}
          />
        ) : (
          <ReportBody
            filters={filters}
            filterOpen={filterOpen}
            savedView={savedView}
            scheduled={scheduled}
            rows={filteredRows}
          />
        )}
      </AppMockShell>

      {detail && (
        <DetailCard
          title={detail.title}
          status={detail.status}
          summary={detail.summary}
          details={detail.details}
          x={detail.x}
          y={detail.y}
        />
      )}
      {menu && (
        <CtxMenu
          x={menu.x}
          y={menu.y}
          items={menu.items}
          highlight={menu.highlight}
          toast={menu.toast}
        />
      )}
      {schedule && <ScheduleModal modal={schedule} />}
    </LivingBoard>
  );
}

function OverviewBody({
  tiles,
  selected,
  customising,
}: {
  tiles: Tile[];
  selected: string;
  customising: boolean;
}) {
  return (
    <div className="flex min-h-[260px] flex-col">
      {customising && (
        <div className="border-b border-border bg-primary/[0.04] px-4 py-1.5 text-[10px] text-muted-foreground">
          Drag to move · pull a corner to resize · nothing saves until Done
        </div>
      )}
      <div className="grid flex-1 grid-cols-2 gap-2.5 p-4">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            data-demo={`tile-${tile.id}`}
            className={cn(
              "relative rounded-xl border bg-[#fafbfc] p-3 text-left transition-all duration-150",
              tile.id === "cfi" && "animate-demo-pop",
              selected === tile.id
                ? "border-primary/40 bg-primary/[0.04] shadow-sm"
                : "border-border",
              customising && "ring-1 ring-dashed ring-primary/25"
            )}
          >
            {customising && (
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary/50" />
            )}
            <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {tile.label}
            </p>
            <p className="mt-0.5 truncate text-[9px] text-muted-foreground">
              {tile.window}
              {tile.pinned && <span className="opacity-70"> · pinned</span>}
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-brand-surface">
              {tile.value}
            </p>
            <p className="text-[10px] font-semibold text-success">{tile.delta}</p>
          </div>
        ))}
        {customising && tiles.length < 5 && (
          <button
            type="button"
            data-demo="add-tile"
            className="flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/[0.03] text-[11px] font-semibold text-primary"
          >
            + Add tile
          </button>
        )}
      </div>
    </div>
  );
}

function ReportBody({
  filters,
  filterOpen,
  savedView,
  scheduled,
  rows,
}: {
  filters: FilterChip[];
  filterOpen: boolean;
  savedView: string | null;
  scheduled: boolean;
  rows: typeof REPORT_ROWS;
}) {
  return (
    <div className="relative flex min-h-[260px] flex-col">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2">
        <button
          type="button"
          data-demo="filters-btn"
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors",
            filterOpen || filters.length
              ? "border-primary/40 bg-primary/[0.08] text-primary"
              : "border-border bg-white text-foreground"
          )}
        >
          Filters{filters.length ? ` · ${filters.length}` : ""}
        </button>
        <button
          type="button"
          data-demo="views-btn"
          className="rounded-full border border-border bg-white px-2.5 py-1 text-[10px] font-semibold text-foreground"
        >
          {savedView ?? "Views"}
          {scheduled ? " · scheduled" : ""}
        </button>
        {filters.map((f) => (
          <span
            key={f.id}
            data-demo={`chip-${f.id}`}
            className="rounded-full bg-muted px-2 py-1 text-[9px] font-medium text-foreground animate-demo-pop"
          >
            {f.label}
            <span className="ml-1 text-muted-foreground">×</span>
          </span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col divide-y divide-border">
        <div className="grid grid-cols-[1fr_52px_72px] gap-2 px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          <span>Line</span>
          <span className="text-right">Hours</span>
          <span className="text-right">Billed</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.id}
            data-demo={`row-${r.id}`}
            className="grid grid-cols-[1fr_52px_72px] gap-2 px-4 py-2 text-[11px]"
          >
            <span className="truncate font-medium text-foreground">{r.who}</span>
            <span className="text-right tabular-nums text-muted-foreground">
              {r.hours}
            </span>
            <span className="text-right font-semibold tabular-nums text-foreground">
              {r.billed}
            </span>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="px-4 py-6 text-center text-[11px] text-muted-foreground">
            No rows match these filters
          </p>
        )}
      </div>

      {filterOpen && (
        <div
          className={cn(
            "absolute left-4 top-[44px] z-50 w-[220px] overflow-hidden rounded-lg border border-border bg-white animate-demo-pop",
            SHADOW_MENU
          )}
          aria-hidden
        >
          <p className="border-b border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Add filter
          </p>
          <div
            data-demo="filter-aircraft"
            className="px-3 py-2 text-[11px] font-medium text-foreground hover:bg-primary/[0.06]"
          >
            Aircraft is any of…
          </div>
          <div
            data-demo="filter-hours"
            className="px-3 py-2 text-[11px] font-medium text-foreground hover:bg-primary/[0.06]"
          >
            Hours is at least…
          </div>
          <div
            data-demo="filter-type"
            className="px-3 py-2 text-[11px] font-medium text-muted-foreground"
          >
            Type is any of…
          </div>
          <div className="border-t border-border px-3 py-2">
            <div
              data-demo="filters-apply"
              className="text-center text-[10px] font-semibold text-primary"
            >
              Apply
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailCard({
  title,
  status,
  summary,
  details,
  x,
  y,
}: {
  title: string;
  status?: string;
  summary: string;
  details: string[];
  x: number;
  y: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 w-[240px] overflow-hidden rounded-lg border border-border bg-white animate-demo-pop",
        SHADOW_CARD
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-foreground">{title}</p>
          {status && (
            <span
              data-demo="detail-status"
              className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold text-success"
            >
              {status}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {details.map((line) => (
          <li key={line} className="flex gap-2 text-[10px] leading-snug text-foreground/85">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/70" />
            {line}
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-2">
        <div
          data-demo="detail-dismiss"
          className="text-center text-[10px] font-semibold text-primary"
        >
          Close
        </div>
      </div>
    </div>
  );
}

function CtxMenu({
  x,
  y,
  items,
  highlight,
  toast,
}: {
  x: number;
  y: number;
  items: readonly { id: string; label: string; tone: string }[];
  highlight: string | null;
  toast: string | null;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 min-w-[168px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] animate-demo-pop",
        SHADOW_MENU
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {items.map((item) => (
        <div
          key={item.id}
          data-demo={`ctx-${item.id}`}
          className={cn(
            "px-3 py-1.5 font-medium transition-colors",
            item.tone,
            highlight === item.id && "bg-primary/[0.08]"
          )}
        >
          {item.label}
        </div>
      ))}
      {toast && (
        <div className="border-t border-border bg-[#fafbfc] px-3 py-1.5 text-[10px] font-semibold text-primary">
          {toast}
        </div>
      )}
    </div>
  );
}

function ScheduleModal({ modal }: { modal: NonNullable<ScheduleModal> }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-[16%] z-50 w-[min(280px,88%)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white animate-demo-pop",
        SHADOW_CARD
      )}
      aria-hidden
    >
      <div className="border-b border-border px-4 py-3">
        <p className="text-[13px] font-semibold text-foreground">
          Schedule email
        </p>
        <p className="mt-1 text-[10px] leading-snug text-muted-foreground">
          Sends the saved view on a cadence. Window follows the cadence — weekly
          covers the seven days before.
        </p>
      </div>
      {modal.step === "form" ? (
        <div className="space-y-2.5 px-4 py-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              View
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-foreground">
              Dual · N8830M
            </p>
          </div>
          <div
            data-demo="sched-cadence"
            className="rounded-lg border border-border bg-[#fafbfc] px-3 py-2"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Cadence
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-foreground">
              Every Monday · 7:00 AM MT
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              School clock · covers the prior week
            </p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Recipients
            </p>
            <p className="mt-0.5 text-[11px] text-foreground">
              Morgan · Owner · you
            </p>
          </div>
          <div
            data-demo="sched-confirm"
            className="rounded-lg bg-primary py-2 text-center text-[11px] font-semibold text-white"
          >
            Schedule
          </div>
        </div>
      ) : (
        <div className="px-4 py-5 text-center">
          <p className="text-[13px] font-semibold text-foreground">
            Scheduled
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Dual · N8830M · every Monday 7am MT
          </p>
          <div
            data-demo="sched-close"
            className="mt-4 text-[11px] font-semibold text-primary"
          >
            Close
          </div>
        </div>
      )}
    </div>
  );
}
