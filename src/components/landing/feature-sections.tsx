import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BillingCloseout } from "@/components/landing/billing-closeout";
import { MaintenanceReadouts } from "@/components/landing/maintenance-readouts";

/**
 * The home page's five feature sections. They were one identical layout five
 * times in a row (title left, paragraph right, composite, links), and Tony
 * found it repetitive and colourless. Each section now keeps the same parts but
 * gets its own arrangement. (A coloured module label with an icon above every
 * title, and maintenance fact cards with coloured icons, were tried and
 * rejected.)
 *
 * - "split": the Linear pattern, title left, paragraph right, composite below.
 * - "closeout": the split intro, then close-out written as a sum that adds up
 *   in view (see BillingCloseout), then the composite. (A full-bleed navy band
 *   was tried and rejected.)
 * - "side": text in a sticky left column, composite beside it.
 * - "readouts": centered title, instrument readouts counting down (see
 *   MaintenanceReadouts), then the composite.
 * - "tint": an inset, softly tinted panel around the split pattern.
 *
 * Every section still leads with its H2 and ends with its Features links, so
 * the search index and the heading outline are unchanged.
 */

export type Link2 = { label: string; href: string };

export type FeatureSectionData = {
  id: string;
  /** Module colour, for the glow on the "tint" panel. */
  color: string;
  layout: "split" | "closeout" | "side" | "readouts" | "tint";
  title: ReactNode;
  body: string;
  href: string;
  visual: ReactNode;
  features: Link2[][];
};

function Title({ section }: { section: FeatureSectionData }) {
  return (
    <h2
      id={`home-${section.id}`}
      className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#0b0b0d] sm:text-5xl lg:text-[3.5rem]"
    >
      {section.title}
    </h2>
  );
}

function LearnMore({ href }: { href: string }) {
  return (
    <a href={href} className="mt-6 inline-flex items-center gap-1.5 text-[15px] text-black/60 hover:text-[#0b0b0d]">
      Learn more <span aria-hidden>→</span>
    </a>
  );
}

function FeatureList({ columns, stacked }: { columns: Link2[][]; stacked?: boolean }) {
  return (
    <div className={cn("grid gap-y-6 border-t border-black/[0.06] pt-8", stacked ? "mt-10" : "mt-16 md:grid-cols-[1fr_1fr_1fr]")}>
      <p className="text-[15px] text-black/45">Features</p>
      {(stacked ? [columns.flat()] : columns).map((col, i) => (
        <ul
          key={i}
          className={cn(
            stacked ? "grid grid-cols-2 gap-x-6 gap-y-2.5" : "space-y-2.5",
            !stacked && i === 1 && "md:border-l md:border-black/[0.08] md:pl-10"
          )}
        >
          {col.map((f) => (
            <li key={f.label}>
              <a href={f.href} className="group inline-flex items-center gap-2 text-[15px] text-black/60 hover:text-[#0b0b0d]">
                {f.label}
                <span className="text-black/35 transition-transform group-hover:translate-x-0.5">+</span>
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Title left, paragraph and "Learn more" right. */
function SplitIntro({ section }: { section: FeatureSectionData }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-16">
      <Title section={section} />
      <div>
        <p className="text-lg leading-relaxed text-black/60 sm:text-xl">{section.body}</p>
        <LearnMore href={section.href} />
      </div>
    </div>
  );
}

export function FeatureSection({ section }: { section: FeatureSectionData }) {
  const labelled = { "aria-labelledby": `home-${section.id}` };

  if (section.layout === "closeout") {
    return (
      <section {...labelled} className="overflow-x-clip">
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-40">
          <SplitIntro section={section} />
          <div className="mt-14 border-y border-black/[0.08] py-10 lg:mt-16 lg:py-12">
            <BillingCloseout />
          </div>
          <div className="mt-16 lg:mt-20">{section.visual}</div>
          <FeatureList columns={section.features} />
        </div>
      </section>
    );
  }

  if (section.layout === "side") {
    return (
      <section {...labelled} className="overflow-x-clip">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-28 sm:px-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-14 lg:pt-40">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Title section={section} />
            <p className="mt-6 text-lg leading-relaxed text-black/60 sm:text-xl">{section.body}</p>
            <LearnMore href={section.href} />
            <FeatureList columns={section.features} stacked />
          </div>
          {/* The composite reaches into the page margin to keep its size
              beside the text column, and stays solid: in a column this narrow
              the front panel covers the back one, and a fade lets the covered
              rows show through it (`.composite-solid`). */}
          <div className="composite-solid min-w-0 lg:-mr-6 lg:pt-4 xl:-mr-16">{section.visual}</div>
        </div>
      </section>
    );
  }

  if (section.layout === "readouts") {
    return (
      <section {...labelled} className="overflow-x-clip">
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <Title section={section} />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-black/60 sm:text-xl">{section.body}</p>
            <LearnMore href={section.href} />
          </div>
          <div className="mt-14 lg:mt-16">
            <MaintenanceReadouts />
          </div>
          <div className="mt-16 lg:mt-20">{section.visual}</div>
          <FeatureList columns={section.features} />
        </div>
      </section>
    );
  }

  if (section.layout === "tint") {
    return (
      <section {...labelled} className="overflow-x-clip px-2 pt-28 sm:px-4 lg:pt-40">
        <div
          className="mx-auto max-w-[1400px] rounded-[28px] border border-black/[0.05] lg:rounded-[40px]"
          style={{
            background: `radial-gradient(60% 50% at 80% 0%, color-mix(in srgb, ${section.color} 10%, transparent), transparent 70%), #f5f7fa`,
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
            <SplitIntro section={section} />
            <div className="mt-16 lg:mt-20">{section.visual}</div>
            <FeatureList columns={section.features} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...labelled} className="overflow-x-clip">
      <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-40">
        <SplitIntro section={section} />
        <div className="mt-16 lg:mt-20">{section.visual}</div>
        <FeatureList columns={section.features} />
      </div>
    </section>
  );
}
