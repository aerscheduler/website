"use client";

import { useCallback, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockRow,
} from "@/components/mocks/shell";
import { IntegrationsMock } from "@/components/mocks/integrations-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Integration = {
  id: string;
  name: string;
  status: string;
  detail: string;
  logo: string;
  summary: string;
  details: string[];
};

const SEED: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    status: "Connected",
    detail: "Invoices & cards",
    logo: "/integrations/stripe.svg",
    summary: "Charges cards on file and settles flight invoices.",
    details: [
      "Mode · Live",
      "Last charge · 12 min ago",
      "Payouts · daily to checking",
      "Failed cards · 1 this week",
    ],
  },
  {
    id: "gcal",
    name: "Google Calendar",
    status: "Connected",
    detail: "Personal sync",
    logo: "/integrations/google-calendar.svg",
    summary: "Pushes your reservations onto a personal calendar.",
    details: [
      "Calendar · AerScheduler",
      "Direction · one-way out",
      "Last sync · 3 min ago",
      "Conflicts · ignored (desk wins)",
    ],
  },
  {
    id: "qbo",
    name: "QuickBooks",
    status: "Connected",
    detail: "Sales Receipts",
    logo: "/integrations/quickbooks.svg",
    summary: "Posts paid invoices as Sales Receipts in QBO.",
    details: [
      "Company · High Plains Flight",
      "Maps · aircraft → products",
      "Last sync · this morning",
      "Queue · 2 receipts pending",
    ],
  },
];

const MENU = [
  { id: "sync", label: "Sync now", tone: "text-foreground" },
  { id: "settings", label: "Open settings", tone: "text-foreground" },
  { id: "disconnect", label: "Disconnect", tone: "text-[#c4142f]" },
] as const;

type DetailState = { item: Integration; x: number; y: number } | null;
type MenuState = {
  id: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function IntegrationsLiveDemo() {
  const [selected, setSelected] = useState("stripe");
  const [items, setItems] = useState(() => SEED.map((i) => ({ ...i })));
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);

  const openDetail = async (api: DemoController, id: string) => {
    const item = items.find((i) => i.id === id) ?? SEED.find((i) => i.id === id);
    if (!item) return;
    await api.go(`[data-demo="row-${id}"]`, 640);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSelected(id);
    const tip = api.pointFor(`[data-demo="row-${id}"]`);
    setDetail({
      item: items.find((i) => i.id === id) ?? item,
      x: Math.min((tip?.x ?? 40) + 10, 56),
      y: Math.min(Math.max((tip?.y ?? 35) - 2, 16), 50),
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
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(280);
  };

  const script = useCallback(async (api: DemoController) => {
    setItems(SEED.map((i) => ({ ...i })));
    setDetail(null);
    setMenu(null);

    await openDetail(api, "stripe");
    if (api.cancelled()) return;
    await openDetail(api, "qbo");
    if (api.cancelled()) return;

    await openMenu(api, "qbo");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-sync"]', 440);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "sync" } : m));
    await api.wait(120);
    if (api.cancelled()) return;
    await api.press(170);
    if (api.cancelled()) return;
    setItems((prev) =>
      prev.map((i) => (i.id === "qbo" ? { ...i, status: "Syncing…" } : i))
    );
    setMenu((m) =>
      m ? { ...m, toast: "Sync started", highlight: "sync" } : m
    );
    api.release();
    await api.wait(800);
    if (api.cancelled()) return;
    setItems((prev) =>
      prev.map((i) => (i.id === "qbo" ? { ...i, status: "Connected" } : i))
    );
    setMenu((m) =>
      m ? { ...m, toast: "2 receipts posted", highlight: "sync" } : m
    );
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(200);

    await openMenu(api, "gcal");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-settings"]', 420);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "settings" } : m));
    await api.wait(120);
    if (api.cancelled()) return;
    await api.press(170);
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Calendar settings", highlight: "settings" } : m
    );
    api.release();
    await api.wait(650);
    if (api.cancelled()) return;
    setMenu(null);

    await api.tap('[data-demo="row-stripe"]', () => setSelected("stripe"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Morgan · Admin"
      rest={{ x: 86, y: 90 }}
      fallback={<IntegrationsMock />}
      script={script}
    >
      <AppMockShell
        path="/settings"
        activeNav={0}
        className="animate-none"
        float={
          <MockFloat label="Payments" value="Live" meta="Stripe connected" />
        }
      >
        <MockHeader eyebrow="Settings" title="Integrations" />
        <div className="flex min-h-[220px] flex-col divide-y divide-border">
          {items.map((item) => {
            const syncing = item.status === "Syncing…";
            return (
              <MockRow
                key={item.id}
                data-demo={`row-${item.id}`}
                selected={selected === item.id}
                className="py-4"
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1 transition-transform duration-150",
                    selected === item.id && "scale-105"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[9px] font-semibold transition-colors duration-150",
                    syncing
                      ? "bg-primary/10 text-primary"
                      : "bg-success/10 text-success"
                  )}
                >
                  {item.status}
                </span>
              </MockRow>
            );
          })}
        </div>
      </AppMockShell>

      {detail && (
        <DetailCard item={detail.item} x={detail.x} y={detail.y} />
      )}
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

function DetailCard({
  item,
  x,
  y,
}: {
  item: Integration;
  x: number;
  y: number;
}) {
  return (
    <div
      className="pointer-events-none absolute z-50 w-[250px] overflow-hidden rounded-lg border border-border bg-white shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-foreground">{item.name}</p>
          <span
            data-demo="detail-status"
            className="shrink-0 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold text-success"
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
          <li key={line} className="flex gap-2 text-[10px] leading-snug text-foreground/85">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/70" />
            {line}
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-2">
        <div data-demo="detail-dismiss" className="text-center text-[10px] font-semibold text-primary">
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
      className="pointer-events-none absolute z-50 min-w-[160px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)] animate-demo-pop"
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
                (item.id === "disconnect"
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
