import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { Fact, TaxNotice } from "@/components/aircraft-tax/fact";
import {
  ALL_REGIONS,
  PUBLISHED,
  TAX_BASE,
  TOPICS,
  countryHref,
  countryOf,
  fmtDate,
  getRegion,
  lastChecked,
  question,
  regionHref,
  regionsIn,
} from "@/lib/aircraft-tax";
import { CALC } from "@/content/aircraft-tax/calc.mjs";
import { faqJsonLd } from "@/lib/seo";

export const dynamicParams = false;

/**
 * The one product line, and only what is true: sales tax applies to invoices
 * raised by hand (work orders, shop bills, a rental billed with New invoice).
 * Close-out bills for flights carry no tax yet, so this must not say they do.
 */
const SALES_TAX_DOC = "/docs/billing/charge-sales-tax";

export function generateStaticParams() {
  return ALL_REGIONS.map((r) => ({ country: countryOf(r).slug, region: r.slug }));
}

type Props = { params: Promise<{ country: string; region: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, region } = await params;
  const r = getRegion(country, region);
  if (!r) return {};
  const href = regionHref(r);
  return {
    title: `${r.name} Aircraft Sales and Use Tax, Rentals and Flight Instruction`,
    description: r.summary.length > 160 ? `${r.summary.slice(0, r.summary.lastIndexOf(" ", 155))}.` : r.summary,
    alternates: { canonical: href, types: { "text/markdown": `${href}.md` } },
    openGraph: { title: `${r.name} aircraft tax`, description: r.summary, url: href, type: "article" },
    ...(PUBLISHED ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function RegionPage({ params }: Props) {
  const { country, region } = await params;
  const r = getRegion(country, region);
  if (!r) notFound();
  const c = countryOf(r);
  const others = regionsIn(c).filter((x) => x.slug !== r.slug);

  return (
    <>
      <JsonLd data={faqJsonLd(TOPICS.map((t) => ({ q: question(c, t, r), a: r.facts[t].answer })))} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Aircraft tax", href: TAX_BASE },
            { name: c.name, href: countryHref(c) },
            { name: r.name, href: regionHref(r) },
          ]}
        />
        <header className="mt-6 space-y-4">
          <p className="text-sm font-medium text-primary">Aircraft tax · {c.name}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">{r.name} aircraft sales and use tax</h1>
          <p className="text-lg leading-relaxed text-pretty text-foreground">{r.summary}</p>
          <p className="text-sm text-muted-foreground">
            Every answer below quotes the state&apos;s own source. Last checked {fmtDate(lastChecked(r))}.{" "}
            {CALC[r.slug] && (
              <Link href={`${TAX_BASE}/calculator?state=${r.slug}`} className="font-medium text-primary hover:underline">
                Estimate the tax on your aircraft
              </Link>
            )}
          </p>
        </header>

        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <a
              key={t}
              href={`#${t}`}
              className="rounded-full border border-border px-3 py-1 text-sm text-brand-surface hover:border-primary hover:text-primary"
            >
              {c.labels[t]}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-8">
          {TOPICS.map((t) => (
            <Fact key={t} id={t} question={question(c, t, r)} fact={r.facts[t]} />
          ))}
        </div>

        <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
          AerScheduler can add sales tax, at the rates you set, to the invoices you raise for parts, labor and other charges, taxing only the
          lines your state taxes.{" "}
          <Link href={SALES_TAX_DOC} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
            How it works <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>

        {others.length > 0 && (
          <section className="mt-12 space-y-3">
            <h2 className="text-lg font-semibold text-brand-surface">Other states</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={regionHref(o)} className="text-primary hover:underline">
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <TaxNotice className="mt-10" />
      </article>
    </>
  );
}
