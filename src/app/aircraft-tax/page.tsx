import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { TaxNotice } from "@/components/aircraft-tax/fact";
import { TaxMatrix } from "@/components/aircraft-tax/matrix";
import { HubSearch, type HubSearchItem } from "@/components/hub-search";
import { ALL_REGIONS, COUNTRY_LIST, PUBLISHED, TAX_BASE, TOPICS, countryHref, countryOf, question, regionHref, regionsIn } from "@/lib/aircraft-tax";
import { faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Aircraft Sales Tax, Use Tax and Rental Tax by State",
  description:
    "What each state taxes when you buy, base, rent out, teach in or maintain an aircraft, and what it charges every year. Every answer quotes the state's own source.",
  alternates: { canonical: TAX_BASE },
  openGraph: { title: "Aircraft tax by state", url: TAX_BASE },
  ...(PUBLISHED ? {} : { robots: { index: false, follow: true } }),
};

const FAQS = [
  {
    q: "Where do these answers come from?",
    a: "From each state's own revenue department publications, statutes and administrative rules. Every answer shows the sentence it rests on, a link to the source and the date it was checked. Where a state does not clearly answer a question, the page says so.",
  },
  {
    q: "Is this tax advice?",
    a: "No. It is a reading of what each state publishes. How a rule applies depends on your residency, where the aircraft is based, how it is used and when. Confirm with the state or a CPA before you buy or set prices.",
  },
  {
    q: "Why does flight instruction get its own answer?",
    a: "Because states treat it very differently. Some exempt instruction, some tax the aircraft rental inside it, and some tax the school's purchase of the aircraft instead. For a flight school it can decide how every lesson is billed.",
  },
];

/**
 * Each state, plus each of its seven answers, so "texas flight instruction"
 * lands on that answer rather than the top of the page.
 */
const SEARCH_ITEMS: HubSearchItem[] = [
  { href: `${TAX_BASE}/calculator`, title: "Aircraft sales tax calculator", detail: "Estimate the tax on buying or basing an aircraft, and the yearly fee.", ids: ["calculator"], text: "estimate calculate" },
  ...ALL_REGIONS.flatMap((r) => {
    const c = countryOf(r);
    return [
      { href: regionHref(r), title: `${r.name} aircraft tax`, detail: r.summary, ids: [r.name, r.code], text: c.name },
      ...TOPICS.map((t) => ({
        href: `${regionHref(r)}#${t}`,
        title: question(c, t, r),
        detail: r.facts[t].answer,
        ids: [] as string[],
        text: `${r.name} ${r.code} ${c.labels[t]}`,
      })),
    ];
  }),
];

export default function AircraftTaxHub() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{ name: "Aircraft tax", href: TAX_BASE }]} />
        <header className="mt-6 max-w-3xl space-y-3">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">Aircraft tax</p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-brand-surface sm:text-5xl">Aircraft tax by state</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Sales and use tax when you buy or bring an aircraft in, tax on rentals and flight instruction, parts and labor, and yearly
            registration taxes. Each answer quotes the state&apos;s own source.
          </p>
        </header>
        <HubSearch
          items={SEARCH_ITEMS}
          label="Search aircraft tax by state"
          placeholder="A state, or a question like flight instruction in Texas"
          className="mt-8 max-w-2xl"
        />
        <p className="mt-6 text-base">
          <Link href={`${TAX_BASE}/calculator`} className="font-medium text-primary hover:underline">
            Estimate the tax on an aircraft with the calculator
          </Link>
        </p>
        {COUNTRY_LIST.map((c) => (
          <section key={c.code} className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              <Link href={countryHref(c)} className="hover:text-primary">
                {c.name}
              </Link>
            </h2>
            <TaxMatrix country={c} regions={regionsIn(c)} />
          </section>
        ))}
        <section id="faq" className="mt-14 max-w-3xl space-y-5">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Questions</h2>
          <dl className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-brand-surface">{f.q}</dt>
                <dd className="mt-1 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <TaxNotice className="mt-12 max-w-3xl" />
      </div>
    </>
  );
}
