"use client";

import { useCallback, useRef, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
  MockRow,
} from "@/components/mocks/shell";
import { MaintenanceMock } from "@/components/mocks/maintenance-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Tab = "Squawks" | "Inspections";

type Squawk = {
  id: string;
  kind: "squawk";
  title: string;
  tail: string;
  status: string;
  grounded: boolean;
  summary: string;
  details: string[];
};

type Inspection = {
  id: string;
  kind: "inspection";
  title: string;
  tail: string;
  letter: string;
  status: string;
  amount: string;
  detail: string;
  percent: number;
  tone: "danger" | "warning" | "ok";
  grounded: boolean;
  summary: string;
  details: string[];
};

type Item = Squawk | Inspection;

const SQUAWK_SEED: Squawk[] = [
  {
    id: "mag",
    kind: "squawk",
    title: "Left mag drop high",
    tail: "N5287Q",
    status: "Open",
    grounded: true,
    summary: "Open squawk — grounds this tail on the schedule until cleared.",
    details: [
      "175 RPM drop on left mag run-up",
      "Logged by Alvarez · yesterday 16:40",
      "Assigned · A&P Ruiz",
      "Hidden from self-booking while open",
    ],
  },
  {
    id: "nav",
    kind: "squawk",
    title: "Nav light inop",
    tail: "N172SP",
    status: "In progress",
    grounded: false,
    summary: "In progress — aircraft still bookable for day VFR.",
    details: [
      "Right wing nav light out",
      "Parts ordered · ETA tomorrow",
      "Does not ground the board",
      "Night flights restricted until fixed",
    ],
  },
  {
    id: "seat",
    kind: "squawk",
    title: "Seat rail sticky",
    tail: "N5287Q",
    status: "Resolved",
    grounded: false,
    summary: "Resolved — kept on the log for the next 100-hour.",
    details: [
      "Pilot seat hard to slide",
      "Cleaned and greased · Ruiz",
      "Closed this morning",
      "No schedule impact",
    ],
  },
];

const INSPECTION_SEED: Inspection[] = [
  {
    id: "annual",
    kind: "inspection",
    title: "Annual inspection",
    tail: "N5287Q",
    letter: "A",
    status: "Overdue",
    amount: "12d late",
    detail: "§91.409(a) · grounds",
    percent: 100,
    tone: "danger",
    grounded: true,
    summary: "AVIATES · A — annual lapsed. Aircraft is not airworthy until signed off.",
    details: [
      "Letter · A · Annual",
      "Interval · every 12 calendar months",
      "Last done · Jul 29, 2025",
      "Grounds the board while overdue",
    ],
  },
  {
    id: "hundred",
    kind: "inspection",
    title: "100-hour inspection",
    tail: "N172SP",
    letter: "1",
    status: "Due soon",
    amount: "12.0h left",
    detail: "Tach · due at 4,824.0",
    percent: 88,
    tone: "warning",
    grounded: false,
    summary: "AVIATES · 1 — hour-based. Countdown moves when flights close out.",
    details: [
      "Letter · 1 · 100-hour",
      "Meter · Tach 4,812.0",
      "Warns 10 hours out",
      "Will ground if overdue",
    ],
  },
  {
    id: "elt",
    kind: "inspection",
    title: "ELT",
    tail: "N172SP",
    letter: "E",
    status: "Not yet due",
    amount: "214d left",
    detail: "§91.207(d)",
    percent: 42,
    tone: "ok",
    grounded: false,
    summary: "AVIATES · E — calendar ELT check still comfortably inside the window.",
    details: [
      "Letter · E · ELT",
      "Interval · every 12 months",
      "Last done · Mar 2026",
      "No grounding until expired",
    ],
  },
  {
    id: "xpdr",
    kind: "inspection",
    title: "Transponder check",
    tail: "N172SP",
    letter: "T",
    status: "Not yet due",
    amount: "418d left",
    detail: "§91.413",
    percent: 28,
    tone: "ok",
    grounded: false,
    summary: "AVIATES · T — 24-month transponder check.",
    details: [
      "Letter · T · Transponder",
      "Interval · every 24 months",
      "Last check · Sep 2024",
      "Avionics shop on call",
    ],
  },
];

const SQUAWK_MENU = [
  { id: "resolve", label: "Mark resolved", tone: "text-foreground" },
  { id: "assign", label: "Assign A&P", tone: "text-foreground" },
  { id: "ground", label: "Ground aircraft", tone: "text-[#c4142f]" },
] as const;

const INSPECTION_MENU = [
  { id: "signoff", label: "Sign off", tone: "text-foreground" },
  { id: "log", label: "Log completion", tone: "text-foreground" },
  { id: "template", label: "Open template", tone: "text-foreground" },
] as const;

type DetailState = { item: Item; x: number; y: number } | null;
type MenuState = {
  id: string;
  kind: Item["kind"];
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function MaintenanceLiveDemo() {
  const [tab, setTab] = useState<Tab>("Squawks");
  const tabRef = useRef<Tab>("Squawks");
  const [selected, setSelected] = useState("mag");
  const [squawks, setSquawks] = useState(() => SQUAWK_SEED.map((i) => ({ ...i })));
  const [inspections, setInspections] = useState(() =>
    INSPECTION_SEED.map((i) => ({ ...i }))
  );
  const [flash, setFlash] = useState(false);
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);

  const items: Item[] = tab === "Squawks" ? squawks : inspections;
  const openCount = squawks.filter((i) => i.status !== "Resolved").length;
  const grounding =
    squawks.filter((i) => i.grounded).length +
    inspections.filter((i) => i.grounded).length;
  const overdue = inspections.filter((i) => i.tone === "danger").length;

  const ensureTab = async (api: DemoController, need: Tab, selectId?: string) => {
    if (tabRef.current === need) {
      if (selectId) setSelected(selectId);
      return;
    }
    await api.tap(`[data-demo="tab-${need}"]`, () => {
      setTab(need);
      tabRef.current = need;
      if (selectId) setSelected(selectId);
    });
  };

  const findItem = (id: string): Item | undefined =>
    squawks.find((i) => i.id === id) ??
    inspections.find((i) => i.id === id) ??
    SQUAWK_SEED.find((i) => i.id === id) ??
    INSPECTION_SEED.find((i) => i.id === id);

  const openDetail = async (api: DemoController, id: string) => {
    const item = findItem(id);
    if (!item) return;
    const need: Tab = item.kind === "squawk" ? "Squawks" : "Inspections";
    await ensureTab(api, need, id);
    if (api.cancelled()) return;
    await api.go(`[data-demo="row-${id}"]`, 640);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSelected(id);
    const tip = api.pointFor(`[data-demo="row-${id}"]`);
    setDetail({
      item: findItem(id) ?? item,
      x: Math.min((tip?.x ?? 40) + 10, 56),
      y: Math.min(Math.max((tip?.y ?? 35) - 2, 14), 48),
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-status"]', 400);
    if (api.cancelled()) return;
    await api.wait(560);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-dismiss"]', 360);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setDetail(null);
    api.release();
    await api.wait(220);
  };

  const openMenu = async (api: DemoController, id: string) => {
    const item = findItem(id);
    if (!item) return;
    const need: Tab = item.kind === "squawk" ? "Squawks" : "Inspections";
    await ensureTab(api, need);
    if (api.cancelled()) return;
    await api.go(`[data-demo="row-${id}"]`, 600);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(id);
    const tip = api.pointFor(`[data-demo="row-${id}"]`);
    setMenu({
      id,
      kind: item.kind,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(280);
  };

  const pickMenu = async (
    api: DemoController,
    actionId: string,
    apply: () => void,
    toast: string
  ) => {
    await api.go(`[data-demo="ctx-${actionId}"]`, 440);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: actionId } : m));
    await api.wait(130);
    if (api.cancelled()) return;
    await api.press(170);
    if (api.cancelled()) return;
    apply();
    setMenu((m) => (m ? { ...m, toast, highlight: actionId } : m));
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(220);
  };

  const script = useCallback(async (api: DemoController) => {
    setSquawks(SQUAWK_SEED.map((i) => ({ ...i })));
    setInspections(INSPECTION_SEED.map((i) => ({ ...i })));
    setDetail(null);
    setMenu(null);
    setTab("Squawks");
    tabRef.current = "Squawks";

    await openDetail(api, "mag");
    if (api.cancelled()) return;

    await openMenu(api, "nav");
    if (api.cancelled()) return;
    await pickMenu(
      api,
      "assign",
      () =>
        setSquawks((prev) =>
          prev.map((i) =>
            i.id === "nav" ? { ...i, status: "In progress" } : i
          )
        ),
      "Assigned to A&P Ruiz"
    );
    if (api.cancelled()) return;

    // Inspections = AVIATES airworthiness set (not the old “reminders” label)
    await openDetail(api, "annual");
    if (api.cancelled()) return;
    await openDetail(api, "hundred");
    if (api.cancelled()) return;

    await openMenu(api, "annual");
    if (api.cancelled()) return;
    await pickMenu(
      api,
      "signoff",
      () =>
        setInspections((prev) =>
          prev.map((i) =>
            i.id === "annual"
              ? {
                  ...i,
                  status: "Not yet due",
                  amount: "365d left",
                  detail: "Signed off today",
                  percent: 2,
                  tone: "ok",
                  grounded: false,
                  summary:
                    "Annual signed off — next due in 12 months. Board clear for this item.",
                }
              : i
          )
        ),
      "Annual signed off · returned to service"
    );
    if (api.cancelled()) return;

    await api.tap('[data-demo="action"]', () => setFlash(true));
    if (api.cancelled()) return;
    await api.wait(800);
    setFlash(false);

    await ensureTab(api, "Squawks", "mag");
    if (api.cancelled()) return;
    setSquawks(SQUAWK_SEED.map((i) => ({ ...i })));
    setInspections(INSPECTION_SEED.map((i) => ({ ...i })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionLabel =
    tab === "Inspections"
      ? flash
        ? "Added"
        : "Add inspections"
      : flash
        ? "Logged"
        : "+ Squawk";

  return (
    <LivingBoard
      label="Sam · Mx"
      rest={{ x: 86, y: 90 }}
      fallback={<MaintenanceMock />}
      script={script}
    >
      <AppMockShell
        path="/maintenance"
        activeNav={4}
        className="animate-none"
        float={
          <MockFloat
            label={tab === "Inspections" ? "Overdue" : "Open squawks"}
            value={tab === "Inspections" ? String(overdue) : String(openCount)}
            meta={
              grounding
                ? `${grounding} grounding the board`
                : "Nothing grounding the board"
            }
          />
        }
      >
        <MockHeader
          eyebrow="Airworthiness"
          title="Maintenance"
          action={actionLabel}
        />
        <div className="flex gap-2 border-b border-border px-4 py-2.5">
          {(["Squawks", "Inspections"] as const).map((t) => (
            <MockPill key={t} data-demo={`tab-${t}`} active={tab === t}>
              {t}
            </MockPill>
          ))}
        </div>
        <div className="flex min-h-[220px] flex-col divide-y divide-border">
          {items.map((s) =>
            s.kind === "squawk" ? (
              <SquawkRow key={s.id} item={s} selected={selected === s.id} />
            ) : (
              <InspectionRow key={s.id} item={s} selected={selected === s.id} />
            )
          )}
        </div>
      </AppMockShell>

      {detail && <DetailCard item={detail.item} x={detail.x} y={detail.y} />}
      {menu && (
        <CtxMenu
          kind={menu.kind}
          x={menu.x}
          y={menu.y}
          highlight={menu.highlight}
          toast={menu.toast}
        />
      )}
    </LivingBoard>
  );
}

function SquawkRow({ item, selected }: { item: Squawk; selected: boolean }) {
  return (
    <MockRow
      data-demo={`row-${item.id}`}
      selected={selected}
      className="flex-col items-stretch gap-0"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[12px] font-semibold text-foreground">{item.title}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{item.tail}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold",
            item.status === "Open"
              ? "bg-[#c4142f]/10 text-[#c4142f]"
              : item.status === "Resolved"
                ? "bg-success/10 text-success"
                : "bg-[#b7791f]/10 text-[#b7791f]"
          )}
        >
          {item.status}
        </span>
      </div>
      <p
        className={cn(
          "mt-2 text-[10px] font-semibold",
          item.grounded ? "text-[#c4142f]" : "invisible"
        )}
      >
        Grounds aircraft on schedule
      </p>
    </MockRow>
  );
}

function InspectionRow({
  item,
  selected,
}: {
  item: Inspection;
  selected: boolean;
}) {
  const rail =
    item.tone === "danger"
      ? "bg-[#c4142f]"
      : item.tone === "warning"
        ? "bg-[#b7791f]"
        : "bg-primary/70";
  const figure =
    item.tone === "danger"
      ? "text-[#c4142f]"
      : item.tone === "warning"
        ? "text-[#b7791f]"
        : "text-muted-foreground";

  return (
    <MockRow
      data-demo={`row-${item.id}`}
      selected={selected}
      className="flex-col items-stretch gap-0 py-3"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold text-foreground">
            {item.letter}
          </span>
          <p className="truncate text-[12px] font-semibold text-foreground">
            {item.title}
          </p>
          {item.grounded && (
            <span className="shrink-0 text-[9px] font-semibold text-[#c4142f]">
              Grounds
            </span>
          )}
        </div>
        <span className={cn("shrink-0 text-[12px] font-semibold tabular-nums", figure)}>
          {item.amount}
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-[width] duration-300", rail)}
            style={{ width: `${item.percent}%` }}
          />
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {item.tail} · {item.detail}
        </span>
      </div>
    </MockRow>
  );
}

function DetailCard({ item, x, y }: { item: Item; x: number; y: number }) {
  return (
    <div
      className="pointer-events-none absolute z-50 w-[250px] overflow-hidden rounded-lg border border-border bg-white shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-foreground">{item.title}</p>
          <span
            data-demo="detail-status"
            className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[9px] font-semibold text-foreground"
          >
            {item.kind === "inspection" ? item.amount : item.status}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">
          {item.kind === "inspection"
            ? `${item.tail} · AVIATES · ${item.letter}`
            : item.tail}
        </p>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {item.summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {item.details.map((line) => (
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
  kind,
  x,
  y,
  highlight,
  toast,
}: {
  kind: Item["kind"];
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
}) {
  const items = kind === "squawk" ? SQUAWK_MENU : INSPECTION_MENU;
  return (
    <div
      className="pointer-events-none absolute z-50 min-w-[168px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {items.map((item, i) => (
        <div key={item.id}>
          {kind === "squawk" && i === 2 && <div className="my-1 h-px bg-border" />}
          <div
            data-demo={`ctx-${item.id}`}
            className={cn(
              "px-3 py-1.5 font-medium transition-colors",
              item.tone,
              highlight === item.id &&
                (item.id === "ground"
                  ? "bg-[#c4142f]/10"
                  : "bg-primary/[0.08]")
            )}
          >
            {item.label}
          </div>
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
