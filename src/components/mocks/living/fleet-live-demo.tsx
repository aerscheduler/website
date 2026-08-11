"use client";

import { useCallback, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockRow,
} from "@/components/mocks/shell";
import { FleetMock } from "@/components/mocks/fleet-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Resource = {
  tail: string;
  type: string;
  rate: string;
  status: string;
  ok: boolean;
  summary: string;
  details: string[];
};

const SEED: Resource[] = [
  {
    tail: "N172SP",
    type: "Cessna 172S",
    rate: "$165/hr wet",
    status: "Available",
    ok: true,
    summary: "Ready for dual, solo, and rental — no open grounding items.",
    details: [
      "Hobbs 4,812.3 · Tach 4,401.1",
      "Annual current through Nov 2026",
      "Next booking · Dual · Smith 13:30",
      "100-hour due in 42 Hobbs hours",
    ],
  },
  {
    tail: "N5287Q",
    type: "Piper PA-28",
    rate: "$140/hr wet",
    status: "Grounded",
    ok: false,
    summary: "Open squawk grounds this tail until A&P clears the mag.",
    details: [
      "Squawk #4821 · Left mag drop 175 RPM",
      "Status · Open · Assigned to A&P Ruiz",
      "Hidden from self-booking until cleared",
      "Last flown · Rental · Alvarez yesterday",
    ],
  },
  {
    tail: "SIM-01",
    type: "Redbird TD2",
    rate: "Free on plan",
    status: "Bookable",
    ok: true,
    summary: "Simulator bay is open — counts toward instrument time.",
    details: [
      "AATD · instrument & procedure practice",
      "Next session · Ground · IFR 15:30",
      "No Hobbs · billed as ground block",
      "Included on training memberships",
    ],
  },
  {
    tail: "Room B",
    type: "Classroom",
    rate: "Free on plan",
    status: "Bookable",
    ok: true,
    summary: "Classroom for ground school and oral prep.",
    details: [
      "Seats 8 · whiteboard + projector",
      "Next hold · Weather briefing 14:00",
      "No aircraft conflict checks",
      "Free on school and club plans",
    ],
  },
];

const MENU = [
  { id: "schedule", label: "View schedule", tone: "text-foreground" },
  { id: "squawk", label: "Open squawk", tone: "text-foreground" },
  { id: "ground", label: "Ground aircraft", tone: "text-[#c4142f]" },
] as const;

const SHADOW_CARD =
  "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)]";
const SHADOW_MENU = "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)]";

type DetailState = { item: Resource; x: number; y: number } | null;
type MenuState = {
  tail: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function FleetLiveDemo() {
  const [selected, setSelected] = useState("N172SP");
  const [fleet, setFleet] = useState(() => SEED.map((r) => ({ ...r })));
  const [flash, setFlash] = useState(false);
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);

  const openDetail = async (api: DemoController, tail: string) => {
    const item = fleet.find((r) => r.tail === tail) ?? SEED.find((r) => r.tail === tail);
    if (!item) return;
    await api.go(`[data-demo="row-${tail}"]`, 640);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSelected(tail);
    const tip = api.pointFor(`[data-demo="row-${tail}"]`);
    setDetail({
      item: fleet.find((r) => r.tail === tail) ?? item,
      x: Math.min((tip?.x ?? 40) + 10, 58),
      y: Math.min(Math.max((tip?.y ?? 35) - 2, 16), 52),
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

  const openMenu = async (api: DemoController, tail: string) => {
    await api.go(`[data-demo="row-${tail}"]`, 600);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(tail);
    const tip = api.pointFor(`[data-demo="row-${tail}"]`);
    setMenu({
      tail,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(260);
  };

  const script = useCallback(async (api: DemoController) => {
    setFleet(SEED.map((r) => ({ ...r })));
    setDetail(null);
    setMenu(null);

    await openDetail(api, "N5287Q");
    if (api.cancelled()) return;
    await openDetail(api, "N172SP");
    if (api.cancelled()) return;

    await openMenu(api, "N172SP");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-ground"]', 440);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "ground" } : m));
    await api.wait(120);
    if (api.cancelled()) return;
    await api.press(170);
    if (api.cancelled()) return;
    setFleet((prev) =>
      prev.map((r) =>
        r.tail === "N172SP"
          ? { ...r, status: "Grounded", ok: false, summary: "Temporarily grounded from the desk." }
          : r
      )
    );
    setMenu((m) =>
      m ? { ...m, toast: "N172SP grounded", highlight: "ground" } : m
    );
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(180);

    await openMenu(api, "N5287Q");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-squawk"]', 420);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "squawk" } : m));
    await api.wait(110);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Opened squawk #4821", highlight: "squawk" } : m
    );
    api.release();
    await api.wait(650);
    if (api.cancelled()) return;
    setMenu(null);

    await api.tap('[data-demo="action"]', () => setFlash(true));
    if (api.cancelled()) return;
    await api.wait(800);
    setFlash(false);
    await api.tap('[data-demo="row-N172SP"]', () => setSelected("N172SP"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Chris · Dispatch"
      rest={{ x: 86, y: 90 }}
      fallback={<FleetMock />}
      script={script}
    >
      <AppMockShell
        path="/aircraft"
        activeNav={1}
        className="animate-none"
        float={
          <MockFloat
            label="This month"
            value="$40"
            meta="2 aircraft · sims free"
          />
        }
      >
        <MockHeader
          eyebrow="Resources"
          title="Fleet & facilities"
          action={flash ? "Added" : "+ Add"}
        />
        <div className="flex min-h-[220px] flex-col divide-y divide-border">
          {fleet.map((a) => (
            <MockRow
              key={a.tail}
              data-demo={`row-${a.tail}`}
              selected={selected === a.tail}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-150 ${
                  selected === a.tail ? "scale-105" : ""
                } ${a.ok ? "bg-primary/10 text-primary" : "bg-[#c4142f]/10 text-[#c4142f]"}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 13.5 21 9l-2.5 5.5L21 18l-7-1.5V21l-2.5-3.5L4 19.5 6 14.5 3 13.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-foreground">{a.tail}</p>
                <p className="text-[10px] text-muted-foreground">
                  {a.type} · {a.rate}
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                  a.ok
                    ? "bg-success/10 text-success"
                    : "bg-[#c4142f]/10 text-[#c4142f]"
                }`}
              >
                {a.status}
              </span>
            </MockRow>
          ))}
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

function DetailPopover({
  item,
  x,
  y,
}: {
  item: Resource;
  x: number;
  y: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 w-[250px] overflow-hidden rounded-lg border border-border bg-white animate-demo-pop",
        SHADOW_CARD
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-foreground">{item.tail}</p>
            <p className="truncate text-[10px] text-muted-foreground">
              {item.type} · {item.rate}
            </p>
          </div>
          <span
            data-demo="detail-status"
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold",
              item.ok
                ? "bg-success/10 text-success"
                : "bg-[#c4142f]/10 text-[#c4142f]"
            )}
          >
            {item.status}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {item.summary}
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
                item.ok ? "bg-primary/70" : "bg-[#c4142f]/70"
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
