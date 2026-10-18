import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TaxNotice } from "@/components/aircraft-tax/fact";
import { AircraftTaxCalculator, type CalcState } from "@/components/aircraft-tax/calculator";
import { CALC } from "@/content/aircraft-tax/calc.mjs";
import { ALL_REGIONS, PUBLISHED, TAX_BASE, regionHref } from "@/lib/aircraft-tax";
import type { CalcRule } from "@/lib/aircraft-tax-calc";

export const metadata: Metadata = {
  title: "Aircraft Sales Tax Calculator by State",
  description:
    "Estimate the sales or use tax on buying or basing an aircraft, and the yearly state registration fee, from each state's quoted rules. Shows its working.",
  alternates: { canonical: `${TAX_BASE}/calculator` },
  openGraph: { title: "Aircraft sales tax calculator", url: `${TAX_BASE}/calculator` },
  ...(PUBLISHED ? {} : { robots: { index: false, follow: true } }),
};

/** Built at deploy time, so the year a Montana aircraft's age is counted from is the build's. */
const YEAR = new Date().getUTCFullYear();

export default function CalculatorPage() {
  const states: CalcState[] = ALL_REGIONS.filter((r) => CALC[r.slug])
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((r) => ({ slug: r.slug, name: r.name, href: regionHref(r), rule: CALC[r.slug] as CalcRule }));
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "Aircraft tax", href: TAX_BASE },
          { name: "Calculator", href: `${TAX_BASE}/calculator` },
        ]}
      />
      <header className="mt-6 max-w-2xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">Aircraft sales tax calculator</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          What a state charges when you buy or bring in an aircraft, and every year after. Every rate and fee comes from a source quoted on the
          state&apos;s page, and the result shows its working.
        </p>
      </header>
      <div className="mt-10">
        <AircraftTaxCalculator states={states} year={YEAR} />
      </div>
      <TaxNotice className="mt-14 max-w-3xl" />
    </div>
  );
}
