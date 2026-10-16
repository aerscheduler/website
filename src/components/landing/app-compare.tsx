import { Smartphone } from "lucide-react";
import { MobileHome } from "@/components/landing/product-composites";
import { Panel, Tag } from "@/components/landing/product-ui";
import { STATUS } from "@/components/landing/product-tokens";

/**
 * The comparison hero's other visual (2026-10-16), for a product whose phone
 * experience is the difference rather than its price (Flight Circle: a web app
 * added to the home screen, against our native apps). Same two-panel pattern as
 * `PriceQuote`: what the other product publishes, behind, and our app's Home, in
 * front. The other side's lines come from `competitors.ts`, never a guess.
 */
export function AppCompare({
  title,
  lines,
  tag,
}: {
  title: string;
  /** What it publishes about its phone experience, as label and value. */
  lines: [label: string, value: string][];
  tag?: string;
}) {
  return (
    <div className="relative text-left">
      <div className="hidden w-[66%] [mask-image:linear-gradient(to_bottom,black_65%,transparent)] md:block">
        <Panel
          title={title}
          icon={<Smartphone className="size-3.5 text-black/45" />}
          right={tag ? <Tag color={STATUS.grey}>{tag}</Tag> : undefined}
        >
          <div className="text-[13px]">
            {lines.map(([label, value]) => (
              <div key={label} className="border-b border-black/[0.05] px-5 py-3.5">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">{label}</p>
                {/* Kept to the left half: our phone covers the right of this panel. */}
                <p className="mt-1 max-w-[62%] text-[14px] leading-snug text-black/60">{value}</p>
              </div>
            ))}
            <div className="h-24" />
          </div>
        </Panel>
      </div>
      <div className="relative z-10 flex justify-center md:absolute md:right-2 md:top-16 md:block">
        <MobileHome />
      </div>
      {/* Phones do not get the back panel, so the other side is said here. */}
      <div className="mt-6 text-[13px] text-black/50 md:hidden">
        <p className="font-medium text-black/70">{title}</p>
        <dl className="mt-2 space-y-1.5">
          {lines.map(([label, value]) => (
            <div key={label}>
              <dt className="inline font-medium text-black/60">{label}: </dt>
              <dd className="inline">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
