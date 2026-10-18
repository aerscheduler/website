import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TaxNotice } from "@/components/aircraft-tax/fact";
import { TaxMatrix } from "@/components/aircraft-tax/matrix";
import { COUNTRY_LIST, PUBLISHED, TAX_BASE, countryHref, getCountry, regionsIn } from "@/lib/aircraft-tax";

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRY_LIST.map((c) => ({ country: c.slug }));
}

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) return {};
  return {
    title: `Aircraft Sales and Use Tax by State: ${c.name}`,
    description: `Aircraft sales and use tax, rental tax, flight instruction, maintenance and yearly registration, state by state, each answer quoted from the state's own source.`,
    alternates: { canonical: countryHref(c) },
    ...(PUBLISHED ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) notFound();
  const regions = regionsIn(c);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "Aircraft tax", href: TAX_BASE },
          { name: c.name, href: countryHref(c) },
        ]}
      />
      <header className="mt-6 max-w-3xl space-y-3">
        <p className="text-sm font-medium text-primary">Aircraft tax</p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">
          Aircraft sales and use tax by state
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          What each state taxes when you buy, base, rent out, teach in and maintain an aircraft, and what it charges every year. Every answer
          quotes the state&apos;s own publication, statute or rule. {regions.length} states so far.
        </p>
      </header>
      <div className="mt-10">
        <TaxMatrix country={c} regions={regions} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        &quot;Depends&quot; means the answer turns on residency, days in the state, weight or how the aircraft is used. Open the state to see
        why.
      </p>
      <TaxNotice className="mt-12 max-w-3xl" />
    </div>
  );
}
