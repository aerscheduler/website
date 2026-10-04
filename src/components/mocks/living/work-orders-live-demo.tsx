"use client";

import { useCallback, useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { LivingBoard, type DemoController } from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

/**
 * A work order on a customer's aircraft, worked the way a shop works one: write up what you
 * found, put labor and a part against it, send it to the owner, the owner approves, raise
 * the invoice. Every control here exists on the real job page (Work and charges, Send to
 * owner, Raise invoice) and every figure adds up: 1.5 h at the $135.00 shop rate is $202.50,
 * a $75.00 part at the 15% markup is $86.25. Names, tails and numbers are invented.
 */

type Line = { id: string; kind: "Labor" | "Part"; text: string; qty: string; total: number };
type Item = {
  id: string;
  source: "requested" | "found";
  title: string;
  tag: "Approved" | "Not sent yet" | "Sent, waiting" | null;
  lines: Line[];
};
type Stage = "In progress" | "Waiting for owner" | "Ready for pickup";

const SEED: Item[] = [
  {
    id: "annual",
    source: "requested",
    title: "Annual inspection",
    tag: null,
    lines: [
      { id: "l1", kind: "Labor", text: "Annual inspection, Wes Abbott", qty: "8.0 h × $135.00", total: 108000 },
      { id: "p1", kind: "Part", text: "Oil filter CH48110-1", qty: "1 × $24.15", total: 2415 },
    ],
  },
];

const FINDING: Item = {
  id: "brake",
  source: "found",
  title: "Left brake pad worn below limits",
  tag: "Not sent yet",
  lines: [],
};
const BRAKE_LABOR: Line = { id: "l2", kind: "Labor", text: "Replace left brake linings", qty: "1.5 h × $135.00", total: 20250 };
const BRAKE_PART: Line = { id: "p2", kind: "Part", text: "Brake lining kit 066-10600", qty: "1 × $86.25", total: 8625 };

const money = (cents: number) =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const total = (items: Item[]) => items.reduce((t, i) => t + i.lines.reduce((s, l) => s + l.total, 0), 0);

export function WorkOrdersLiveDemo({ animated = true }: { animated?: boolean } = {}) {
  const [items, setItems] = useState<Item[]>(() => SEED.map((i) => ({ ...i, lines: [...i.lines] })));
  const [stage, setStage] = useState<Stage>("In progress");
  const [invoiced, setInvoiced] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const script = useCallback(async (api: DemoController) => {
    setItems(SEED.map((i) => ({ ...i, lines: [...i.lines] })));
    setStage("In progress");
    setInvoiced(false);
    setToast(null);
    await api.wait(400);
    if (api.cancelled()) return;

    // 1. Write up what the shop found.
    await api.tap('[data-demo="add-finding"]', () => setItems((prev) => [...prev, { ...FINDING, lines: [] }]));
    if (api.cancelled()) return;
    await api.wait(450);

    // 2. Labor and a part against it, at the shop's rates.
    await api.tap('[data-demo="brake-labor"]', () =>
      setItems((prev) => prev.map((i) => (i.id === "brake" ? { ...i, lines: [...i.lines, BRAKE_LABOR] } : i)))
    );
    if (api.cancelled()) return;
    await api.wait(350);
    await api.tap('[data-demo="brake-part"]', () =>
      setItems((prev) => prev.map((i) => (i.id === "brake" ? { ...i, lines: [...i.lines, BRAKE_PART] } : i)))
    );
    if (api.cancelled()) return;
    await api.wait(500);

    // 3. Send it to the owner.
    await api.tap('[data-demo="send"]', () => {
      setItems((prev) => prev.map((i) => (i.id === "brake" ? { ...i, tag: "Sent, waiting" } : i)));
      setStage("Waiting for owner");
      setToast("Sent to Dana Whitfield");
    });
    if (api.cancelled()) return;
    await api.wait(1300);
    if (api.cancelled()) return;

    // 4. The owner answers from the email. Nobody here clicks: it arrives.
    setItems((prev) => prev.map((i) => (i.id === "brake" ? { ...i, tag: "Approved" } : i)));
    setStage("In progress");
    setToast("Dana Whitfield approved the brake linings");
    await api.wait(1500);
    if (api.cancelled()) return;
    setToast(null);

    // 5. Done: ready for pickup, raise the invoice.
    setStage("Ready for pickup");
    await api.wait(300);
    await api.tap('[data-demo="action"]', () => {
      setInvoiced(true);
      setToast("Invoice sent to Dana Whitfield");
    });
    if (api.cancelled()) return;
    await api.wait(1700);
    setToast(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Wes · A&P"
      rest={{ x: 88, y: 92 }}
      fallback={<WorkOrderBoard items={SEED} stage="In progress" invoiced={false} toast={null} />}
      script={script}
      animated={animated}
    >
      <WorkOrderBoard items={items} stage={stage} invoiced={invoiced} toast={toast} />
    </LivingBoard>
  );
}

function WorkOrderBoard({
  items,
  stage,
  invoiced,
  toast,
}: {
  items: Item[];
  stage: Stage;
  invoiced: boolean;
  toast: string | null;
}) {
  const sum = total(items);
  const unsent = items.some((i) => i.tag === "Not sent yet");
  const groups: { label: string; source: Item["source"] }[] = [
    { label: "Owner asked for", source: "requested" },
    { label: "Found by the shop", source: "found" },
  ];
  return (
    <AppMockShell
      path="/maintenance/work-orders/1042"
      activeNav={4}
      className="animate-none"
      float={
        <MockFloat
          label={invoiced ? "Invoiced" : "Billed before tax"}
          value={money(sum)}
          meta={invoiced ? "Card or ACH, Dana Whitfield" : "Billed to Dana Whitfield"}
        />
      }
    >
      <MockHeader
        eyebrow="WO-1042 · N472DP"
        title="Annual inspection"
        meta={
          <span className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                "size-1.5 rounded-full",
                stage === "Waiting for owner" ? "bg-[#b7791f]" : stage === "Ready for pickup" ? "bg-success" : "bg-primary"
              )}
            />
            {stage} · Hobbs in 2461.2 · Tach in 1987.4
          </span>
        }
        action={invoiced ? "Invoiced" : "Raise invoice"}
      />
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
        <p className="text-[10px] text-muted-foreground">
          {unsent ? "1 finding not sent to the owner yet." : "What the owner asked for, what the shop found, and what each one charges."}
        </p>
        <div className="flex shrink-0 gap-1.5">
          <span
            data-demo="send"
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-opacity",
              unsent ? "border-border text-foreground" : "pointer-events-none border-transparent text-transparent"
            )}
          >
            Send to owner
          </span>
          <span data-demo="add-finding" className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold text-foreground">
            + Finding
          </span>
        </div>
      </div>
      <div className="min-h-[220px]">
        {groups.map((g) => {
          const rows = items.filter((i) => i.source === g.source);
          if (!rows.length) return null;
          return (
            <div key={g.source}>
              <div className="flex items-center justify-between bg-[#f7f8fa] px-4 py-1.5 text-[10px] font-semibold text-muted-foreground">
                <span>{g.label}</span>
                <span className="tabular-nums">{money(total(rows))}</span>
              </div>
              {rows.map((item) => (
                <div key={item.id} className={cn("border-b border-border px-4 py-2", item.source === "found" && "animate-demo-pop")}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn(
                          "size-3 shrink-0 rounded-full border-[1.5px]",
                          item.tag === "Approved" || item.source === "requested" ? "border-primary bg-primary/80" : "border-dashed border-muted-foreground"
                        )}
                      />
                      <p className="truncate text-[11px] font-semibold text-foreground">{item.title}</p>
                      {item.tag && (
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                            item.tag === "Approved"
                              ? "bg-success/10 text-success"
                              : item.tag === "Sent, waiting"
                                ? "bg-[#b7791f]/10 text-[#b7791f]"
                                : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.tag}
                        </span>
                      )}
                    </div>
                    {item.source === "found" && (
                      <div className="flex shrink-0 gap-1">
                        <span data-demo="brake-labor" className="rounded border border-border px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                          + Labor
                        </span>
                        <span data-demo="brake-part" className="rounded border border-border px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                          + Part
                        </span>
                      </div>
                    )}
                  </div>
                  {item.lines.map((l) => (
                    <div key={l.id} className="mt-1 grid grid-cols-[40px_1fr_auto_64px] items-center gap-2 pl-5 text-[10px] animate-demo-pop">
                      <span className="text-muted-foreground">{l.kind}</span>
                      <span className="truncate text-foreground/80">{l.text}</span>
                      <span className="tabular-nums text-muted-foreground">{l.qty}</span>
                      <span className="text-right font-medium tabular-nums text-foreground">{money(l.total)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {toast && (
        <div className="pointer-events-none absolute bottom-5 right-5 z-40 rounded-md border border-border bg-white px-3 py-2 text-[11px] font-semibold text-foreground shadow-lg animate-demo-pop">
          {toast}
        </div>
      )}
    </AppMockShell>
  );
}
