import { Check, Clock, Mail, Wrench } from "lucide-react";
import { Composite, Dot, Enter, Panel, Tag } from "@/components/landing/product-ui";
import { STATUS } from "@/components/landing/product-tokens";

/**
 * Work orders, for the comparison pages' Work orders section (2026-10-16), in the
 * same two-panel pattern as the home page composites.
 *
 * Back: the shop's open jobs by stage, using the real stage names
 * (`WORK_ORDER_STATUS_LABELS` in server/src/utils/workOrders.ts), with each tail
 * marked as the school's own or a customer's. Front: what a customer's owner sees,
 * each finding with its answer (approve, decline or put off; `leftOffBill` keeps a
 * declined or put-off item off the bill). Every name and figure is invented and the
 * sums add up: brakes 1.5 h x $135.00 + a $75.00 kit at 15% = $288.75; gasket
 * 0.5 h x $135.00 + a $25.30 part at 15% = $96.60; approved $385.35.
 */

const hex = (color: string, alpha: number) =>
  `${color}${Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;

const JOBS: { tail: string; job: string; whose: "Customer" | "Fleet"; stage: string; color: string }[] = [
  { tail: "N4471K", job: "Annual inspection", whose: "Customer", stage: "Scheduled", color: STATUS.grey },
  { tail: "N826PA", job: "100-hour and brakes", whose: "Customer", stage: "Waiting for owner", color: STATUS.yellow },
  { tail: "N903MV", job: "Oil change, 50-hour", whose: "Fleet", stage: "In progress", color: STATUS.blue },
  { tail: "N52TXB", job: "Magneto overhaul", whose: "Customer", stage: "Waiting for parts", color: STATUS.orange },
  { tail: "N618LS", job: "Comm radio squawk", whose: "Fleet", stage: "Ready for pickup", color: STATUS.green },
];

const FINDINGS: { what: string; amount: string; answer: "Approved" | "Put off"; color: string }[] = [
  { what: "Left brake pads below limits", amount: "$288.75", answer: "Approved", color: STATUS.green },
  { what: "Exhaust gasket leaking", amount: "$96.60", answer: "Approved", color: STATUS.green },
  { what: "Alternator belt glazed", amount: "$185.00", answer: "Put off", color: STATUS.yellow },
];

export function WorkOrdersComposite() {
  return (
    <Composite
      frontSide="right"
      back={
        <Panel title="Open jobs" icon={<Wrench className="size-3.5 text-black/45" />} right={<span className="text-[12px] text-black/40">5</span>}>
          {JOBS.map((j) => (
            // The stage sits beside the tail: the front panel covers the right of this one.
            <div key={j.tail} className="grid grid-cols-[66px_auto_1fr] items-center gap-4 border-t border-black/[0.05] px-5 py-3 text-[13px] first:border-t-0 sm:grid-cols-[72px_150px_1fr_70px]">
              <span className="font-mono text-[12px] text-[#1b1c1f]">{j.tail}</span>
              <span>
                <Tag color={j.color}>{j.stage}</Tag>
              </span>
              <span className="truncate text-black/60">{j.job}</span>
              <span className="hidden text-right text-[12px] text-black/40 sm:block">{j.whose}</span>
            </div>
          ))}
        </Panel>
      }
      front={
        <Panel title="N826PA · Your aircraft" icon={<Mail className="size-3.5 text-black/45" />} right={<Tag color={STATUS.yellow}>3 to review</Tag>}>
          {/* Bottom padding so the panel's fade lands on empty space. */}
          <div className="space-y-3 p-4 pb-12 text-[12px]">
            {FINDINGS.map((f, i) => (
              <Enter key={f.what} delay={250 + i * 250} from="left">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2">
                    <Dot color={f.color} />
                    <span className="truncate font-medium">{f.what}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="tabular-nums text-black/50">{f.amount}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: hex(f.color, 0.12), color: f.color }}
                    >
                      {f.answer}
                    </span>
                  </span>
                </div>
              </Enter>
            ))}
            <Enter delay={1100}>
              <p className="flex items-center gap-2 rounded-md border border-black/[0.07] bg-black/[0.02] px-2.5 py-1.5 text-black/50">
                <Clock className="size-3.5" /> The belt waits for the next visit, off this bill
              </p>
            </Enter>
            <Enter delay={1350}>
              <div className="flex items-center justify-between rounded-md px-2.5 py-2" style={{ background: hex(STATUS.green, 0.1), color: STATUS.green }}>
                <span className="flex items-center gap-2"><Check className="size-3.5" /> Approved</span>
                <span className="tabular-nums font-medium">$385.35</span>
              </div>
            </Enter>
          </div>
        </Panel>
      }
    />
  );
}
