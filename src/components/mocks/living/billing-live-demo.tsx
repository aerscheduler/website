"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
  MockRow,
} from "@/components/mocks/shell";
import { BillingMock } from "@/components/mocks/billing-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Status = "Due" | "Paid" | "Void";

type Invoice = {
  id: string;
  name: string;
  item: string;
  amount: string;
  status: Status;
};

const SEED: Invoice[] = [
  { id: "alex", name: "Alex Chen", item: "N172SP · Dual 1.2", amount: "$186.00", status: "Due" },
  { id: "jordan", name: "Jordan Lee", item: "N5287Q · Rental 1.8", amount: "$252.00", status: "Paid" },
  { id: "sam", name: "Sam Ortiz", item: "Ground · Weather", amount: "$65.00", status: "Due" },
  { id: "casey", name: "Casey Ng", item: "SIM-01 · Instrument", amount: "$90.00", status: "Paid" },
];

const TABS = ["All", "Due", "Paid"] as const;

const MENU_ITEMS = [
  { id: "pay", label: "Mark as paid", tone: "text-foreground" },
  { id: "void", label: "Void invoice", tone: "text-[#c4142f]" },
  { id: "qbo", label: "Sync to QuickBooks", tone: "text-foreground" },
] as const;

const STATUS_TONE: Record<Status, string> = {
  Due: "text-[#b7791f] bg-[#b7791f]/10",
  Paid: "text-success bg-success/10",
  Void: "text-muted-foreground bg-muted",
};

type MenuState = {
  invoiceId: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

type PayModal = {
  invoiceId: string;
  step: "confirm" | "charging" | "done";
} | null;

export function BillingLiveDemo({
  animated = true,
}: {
  animated?: boolean;
} = {}) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Due");
  const [selected, setSelected] = useState("alex");
  const [invoices, setInvoices] = useState(() => SEED.map((r) => ({ ...r })));
  const [menu, setMenu] = useState<MenuState>(null);
  const [pay, setPay] = useState<PayModal>(null);

  const outstanding = useMemo(() => {
    const due = invoices.filter((i) => i.status === "Due");
    const cents = due.reduce((sum, i) => {
      const n = Number(i.amount.replace(/[$,]/g, ""));
      return sum + n;
    }, 0);
    return {
      value: `$${cents.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      meta: `${due.length} invoice${due.length === 1 ? "" : "s"} due`,
    };
  }, [invoices]);

  const openMenu = async (api: DemoController, invoiceId: string) => {
    await api.go(`[data-demo="row-${invoiceId}"]`, 640);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(invoiceId);
    const tip = api.pointFor(`[data-demo="row-${invoiceId}"]`);
    setMenu({
      invoiceId,
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
    actionId: (typeof MENU_ITEMS)[number]["id"]
  ) => {
    await api.go(`[data-demo="ctx-${actionId}"]`, 440);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: actionId } : m));
    await api.wait(130);
    if (api.cancelled()) return;
    await api.press(170);
    if (api.cancelled()) return;
  };

  const script = useCallback(async (api: DemoController) => {
    setInvoices(SEED.map((r) => ({ ...r })));
    setTab("Due");
    setPay(null);
    setMenu(null);

    // Right-click Alex → Mark as paid → pay modal
    await openMenu(api, "alex");
    if (api.cancelled()) return;
    await pickMenu(api, "pay");
    if (api.cancelled()) return;
    setMenu(null);
    setPay({ invoiceId: "alex", step: "confirm" });
    api.release();
    await api.wait(320);
    if (api.cancelled()) return;

    await api.go('[data-demo="pay-confirm"]', 480);
    if (api.cancelled()) return;
    await api.press(180);
    if (api.cancelled()) return;
    setPay({ invoiceId: "alex", step: "charging" });
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setPay({ invoiceId: "alex", step: "done" });
    setInvoices((prev) =>
      prev.map((i) => (i.id === "alex" ? { ...i, status: "Paid" } : i))
    );
    await api.wait(650);
    if (api.cancelled()) return;
    await api.go('[data-demo="pay-close"]', 380);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setPay(null);
    api.release();
    await api.wait(280);

    // Right-click Sam → Sync to QuickBooks
    await openMenu(api, "sam");
    if (api.cancelled()) return;
    await pickMenu(api, "qbo");
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Queued for QuickBooks", highlight: "qbo" } : m
    );
    api.release();
    await api.wait(750);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(220);

    // Right-click Sam → Void
    await openMenu(api, "sam");
    if (api.cancelled()) return;
    await pickMenu(api, "void");
    if (api.cancelled()) return;
    setInvoices((prev) =>
      prev.map((i) => (i.id === "sam" ? { ...i, status: "Void" } : i))
    );
    setMenu((m) =>
      m ? { ...m, toast: "Invoice voided", highlight: "void" } : m
    );
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);

    // Peek Paid tab, then restore seed quietly for the next loop
    await api.tap('[data-demo="tab-Paid"]', () => setTab("Paid"));
    if (api.cancelled()) return;
    await api.tap('[data-demo="row-alex"]', () => setSelected("alex"));
    if (api.cancelled()) return;
    await api.wait(500);
    setInvoices(SEED.map((r) => ({ ...r })));
    await api.tap('[data-demo="tab-Due"]', () => setTab("Due"));
    if (api.cancelled()) return;
    await api.tap('[data-demo="row-alex"]', () => setSelected("alex"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Chris · Desk"
      rest={{ x: 86, y: 90 }}
      fallback={<BillingMock />}
      script={script}
      animated={animated}
    >
      <AppMockShell
        path="/billing"
        activeNav={3}
        className="animate-none"
        float={
          <MockFloat
            label="Outstanding"
            value={outstanding.value}
            meta={outstanding.meta}
          />
        }
      >
        <MockHeader eyebrow="Accounts receivable" title="Billing" action="+ Invoice" />
        <div className="flex gap-2 border-b border-border px-4 py-2.5">
          {TABS.map((t) => (
            <MockPill key={t} data-demo={`tab-${t}`} active={tab === t}>
              {t}
            </MockPill>
          ))}
        </div>
        <div className="flex min-h-[220px] flex-col divide-y divide-border">
          {invoices.map((r) => {
            const match =
              tab === "All" ||
              (tab === "Due" && r.status === "Due") ||
              (tab === "Paid" && r.status === "Paid");
            return (
              <MockRow
                key={r.id}
                data-demo={`row-${r.id}`}
                selected={match && selected === r.id}
                className={cn(!match && "opacity-35")}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                  {r.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-foreground">
                    {r.name}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {r.item}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold tabular-nums text-foreground">
                    {r.amount}
                  </p>
                  <span
                    className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${STATUS_TONE[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
              </MockRow>
            );
          })}
        </div>
      </AppMockShell>

      {menu && (
        <BillingContextMenu
          x={menu.x}
          y={menu.y}
          highlight={menu.highlight}
          toast={menu.toast}
        />
      )}

      {pay && (
        <PayModal
          invoice={invoices.find((i) => i.id === pay.invoiceId) ?? SEED[0]}
          step={pay.step}
        />
      )}
    </LivingBoard>
  );
}

function BillingContextMenu({
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
      className="pointer-events-none absolute z-50 min-w-[176px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {MENU_ITEMS.map((item, i) => (
        <div key={item.id}>
          {i === 2 && <div className="my-1 h-px bg-border" />}
          <div
            data-demo={`ctx-${item.id}`}
            className={cn(
              "px-3 py-1.5 font-medium transition-colors",
              item.tone,
              highlight === item.id &&
                (item.id === "void"
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

function PayModal({
  invoice,
  step,
}: {
  invoice: Invoice;
  step: "confirm" | "charging" | "done";
}) {
  return (
    <div
      className="pointer-events-none absolute top-[18%] left-1/2 z-50 w-[min(280px,86%)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      aria-hidden
    >
      <div className="border-b border-border px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Collect payment
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-foreground">
          {invoice.name}
        </p>
        <p className="text-[11px] text-muted-foreground">{invoice.item}</p>
      </div>
      <div className="space-y-3 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">Amount due</span>
          <span className="text-[16px] font-semibold tabular-nums text-foreground">
            {invoice.amount}
          </span>
        </div>
        <div className="rounded-lg border border-border bg-[#fafbfc] px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Card on file
          </p>
          <p className="mt-0.5 text-[12px] font-semibold text-foreground">
            Visa ···· 4242
          </p>
        </div>
        {step === "charging" && (
          <p className="text-center text-[11px] font-medium text-primary">
            Charging card…
          </p>
        )}
        {step === "done" && (
          <p className="text-center text-[11px] font-semibold text-success">
            Paid · receipt emailed
          </p>
        )}
      </div>
      <div className="border-t border-border px-4 py-3">
        {step === "confirm" ? (
          <div
            data-demo="pay-confirm"
            className="rounded-full bg-primary px-3 py-2 text-center text-[12px] font-semibold text-white"
          >
            Charge {invoice.amount}
          </div>
        ) : (
          <div
            data-demo="pay-close"
            className="rounded-full bg-muted px-3 py-2 text-center text-[12px] font-semibold text-foreground"
          >
            {step === "done" ? "Done" : "Please wait…"}
          </div>
        )}
      </div>
    </div>
  );
}
