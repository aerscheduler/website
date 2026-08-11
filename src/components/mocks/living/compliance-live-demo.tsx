"use client";

import { useCallback, useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { ComplianceMock } from "@/components/mocks/compliance-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Item = {
  name: string;
  meta: string;
  bad: boolean;
  kind: "aircraft" | "member";
  verdict: "No-Go" | "Go" | "Caution";
  reason: string;
  details: string[];
};

const AIRCRAFT: Item[] = [
  {
    name: "N5287Q",
    meta: "Squawk · mag drop",
    bad: true,
    kind: "aircraft",
    verdict: "No-Go",
    reason: "Open squawk grounds this tail on the schedule.",
    details: [
      "Left mag drop 175 RPM on run-up",
      "Squawk #4821 · Open · A&P assigned",
      "Blocks dual, solo, and rental until cleared",
    ],
  },
  {
    name: "N172SP",
    meta: "Clear",
    bad: false,
    kind: "aircraft",
    verdict: "Go",
    reason: "Airworthy — no open grounding items.",
    details: [
      "Annual current through Nov 2026",
      "No open squawks",
      "100-hour due in 42 Hobbs hours",
    ],
  },
];

const MEMBERS: Item[] = [
  {
    name: "Jordan Lee",
    meta: "Medical expired",
    bad: true,
    kind: "member",
    verdict: "No-Go",
    reason: "Class 3 medical lapsed — cannot act as PIC or student solo.",
    details: [
      "Medical expired Jul 2, 2026",
      "Blocks solo and dual as PIC",
      "Still may sit right seat with a current CFI",
    ],
  },
  {
    name: "Sam Ortiz",
    meta: "BFR due in 4d",
    bad: true,
    kind: "member",
    verdict: "Caution",
    reason: "Flight review expires in four days — still legal, flag for desk.",
    details: [
      "BFR expires Fri · book before then",
      "Medical and checkout current",
      "Auto-blocks rentals the morning it lapses",
    ],
  },
  {
    name: "Alex Chen",
    meta: "All current",
    bad: false,
    kind: "member",
    verdict: "Go",
    reason: "Instructor currencies are green across the board.",
    details: [
      "Medical · BFR · CFI certificate current",
      "Night currency satisfied this month",
      "Cleared for dual, checkouts, and endorsements",
    ],
  },
];

const ALL = [...AIRCRAFT, ...MEMBERS];

const MENU = [
  { id: "notify", label: "Notify member", tone: "text-foreground" },
  { id: "record", label: "Open record", tone: "text-foreground" },
  { id: "override", label: "Desk override…", tone: "text-[#c4142f]" },
] as const;

const SHADOW_CARD =
  "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)]";
const SHADOW_MENU = "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)]";

type DetailState = { item: Item; x: number; y: number } | null;
type MenuState = {
  name: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function ComplianceLiveDemo() {
  const [selected, setSelected] = useState("Jordan Lee");
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);
  const [notified, setNotified] = useState<string | null>(null);

  const openDetail = async (api: DemoController, name: string) => {
    const item = ALL.find((i) => i.name === name);
    if (!item) return;
    await api.go(`[data-demo="row-${name}"]`, 640);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSelected(name);
    const tip = api.pointFor(`[data-demo="row-${name}"]`);
    setDetail({
      item,
      x: Math.min((tip?.x ?? 40) + 8, 62),
      y: Math.min(Math.max((tip?.y ?? 35) - 4, 18), 55),
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-verdict"]', 400);
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

  const openMenu = async (api: DemoController, name: string) => {
    await api.go(`[data-demo="row-${name}"]`, 600);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(name);
    const tip = api.pointFor(`[data-demo="row-${name}"]`);
    setMenu({
      name,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(260);
  };

  const script = useCallback(async (api: DemoController) => {
    setDetail(null);
    setMenu(null);
    setNotified(null);

    await openDetail(api, "N5287Q");
    if (api.cancelled()) return;
    await openDetail(api, "Jordan Lee");
    if (api.cancelled()) return;

    await openMenu(api, "Jordan Lee");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-notify"]', 420);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "notify" } : m));
    await api.wait(110);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setNotified("Jordan Lee");
    setMenu((m) =>
      m ? { ...m, toast: "Reminder sent", highlight: "notify" } : m
    );
    api.release();
    await api.wait(650);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(180);

    await openMenu(api, "Sam Ortiz");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-record"]', 400);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "record" } : m));
    await api.wait(110);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Opened member record", highlight: "record" } : m
    );
    api.release();
    await api.wait(650);
    if (api.cancelled()) return;
    setMenu(null);

    await api.tap('[data-demo="row-Jordan Lee"]', () => setSelected("Jordan Lee"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Maya · Desk"
      rest={{ x: 84, y: 90 }}
      fallback={<ComplianceMock />}
      script={script}
    >
      <AppMockShell
        path="/compliance"
        activeNav={4}
        className="animate-none"
        float={
          <MockFloat
            label="Blocked today"
            value="3"
            meta={
              notified
                ? `Notified · ${notified.split(" ")[0]}`
                : "1 aircraft · 2 members"
            }
          />
        }
      >
        <MockHeader eyebrow="Safety" title="Compliance" />
        <div className="grid min-h-[220px] flex-1 gap-3 p-4 sm:grid-cols-2">
          <Panel title="Grounded aircraft" selected={selected} items={AIRCRAFT} />
          <Panel title="Member currencies" selected={selected} items={MEMBERS} />
        </div>
      </AppMockShell>

      {detail && <DetailPopover item={detail.item} x={detail.x} y={detail.y} />}
      {menu && (
        <CtxMenu
          x={menu.x}
          y={menu.y}
          highlight={menu.highlight}
          toast={menu.toast}
        />
      )}
    </LivingBoard>
  );
}

function Panel({
  title,
  items,
  selected,
}: {
  title: string;
  items: Item[];
  selected: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-[#fafbfc] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <div
              data-demo={`row-${item.name}`}
              className={cn(
                "flex w-full items-start gap-2 rounded-lg px-1.5 py-1.5 text-left transition-colors duration-150",
                selected === item.name
                  ? "bg-white shadow-sm ring-1 ring-border"
                  : ""
              )}
            >
              <span
                className={`mt-1 size-2 shrink-0 rounded-full ${
                  item.bad ? "bg-[#c4142f]" : "bg-success"
                }`}
              />
              <div>
                <p className="text-[11px] font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{item.meta}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailPopover({
  item,
  x,
  y,
}: {
  item: Item;
  x: number;
  y: number;
}) {
  const tone =
    item.verdict === "Go"
      ? "bg-success/10 text-success"
      : item.verdict === "Caution"
        ? "bg-[#b7791f]/10 text-[#b7791f]"
        : "bg-[#c4142f]/10 text-[#c4142f]";

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
          <p className="text-[12px] font-semibold text-foreground">{item.name}</p>
          <span
            data-demo="detail-verdict"
            className={cn(
              "rounded-full px-2 py-0.5 text-[9px] font-semibold",
              tone
            )}
          >
            {item.verdict}
          </span>
        </div>
        <p className="mt-1 text-[10px] leading-snug text-muted-foreground">
          {item.reason}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {item.details.map((line) => (
          <li
            key={line}
            className="flex gap-2 text-[10px] leading-snug text-foreground/85"
          >
            <span
              className={cn(
                "mt-1 size-1.5 shrink-0 rounded-full",
                item.verdict === "Go" ? "bg-success" : "bg-[#c4142f]/70"
              )}
            />
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
  highlight,
  toast,
}: {
  x: number;
  y: number;
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
      {MENU.map((item, i) => (
        <div key={item.id}>
          {i === 2 && <div className="my-1 h-px bg-border" />}
          <div
            data-demo={`ctx-${item.id}`}
            className={cn(
              "px-3 py-1.5 font-medium transition-colors",
              item.tone,
              highlight === item.id &&
                (item.id === "override"
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
