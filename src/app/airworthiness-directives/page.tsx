import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AdList } from "@/components/ad-library/ad-list";
import { AdSearchBox } from "@/components/ad-library/search-box";
import { LibraryNotice } from "@/components/ad-library/notice";
import { AD_BASE, adDate, fmt, getPages, getRecent, getStats, KINDS, pageHref, type KindSegment } from "@/lib/ad-library";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAA Airworthiness Directive Search: Every AD Since 1995, Free",
  description:
    "Search every FAA Airworthiness Directive published since 1995 by AD number, aircraft model, engine, propeller or equipment. Readable text, supersession links, new ADs within the hour, email alerts and CSV. Free, no account.",
  alternates: { canonical: AD_BASE, types: { "application/rss+xml": `${AD_BASE}/feed.xml` } },
  openGraph: {
    title: "FAA Airworthiness Directive search",
    description: "Every AD since 1995, readable, by aircraft, engine, propeller and equipment. Free.",
    url: AD_BASE,
  },
};

const FAQS = [
  {
    q: "Is this the official record of Airworthiness Directives?",
    a: "No. The Federal Register document is the legal text, and the FAA's Dynamic Regulatory System (DRS) shows each AD's current status. This library republishes the Federal Register's text, laid out for reading, and links every AD to the original.",
  },
  {
    q: "How current is it?",
    a: "It checks the Federal Register every hour. ADs are usually on the Federal Register's public-inspection desk the day before they are published, so most appear here, marked as to be published, a day before their official publication. Emergency ADs are sent to owners before they are published at all, so they can appear here days after the owners received them.",
  },
  {
    q: "Why are ADs from before 1995 missing?",
    a: "The library is built from the Federal Register's online text, which starts in 1994. Older ADs, many still in force on older aircraft, are in the FAA's DRS. We say so on every aircraft page rather than let a short list look complete.",
  },
  {
    q: "How do you decide which ADs are listed for an aircraft?",
    a: "By the model designations in each AD's text: an AD naming the 172S is listed on the Cessna 172S page. That finds ADs worth reading, not ADs that apply. Serial number ranges, installed equipment and part numbers decide applicability, and that is a mechanic's call. An AD written only for a part number names no model and is found by searching for the part.",
  },
  {
    q: "Can I get an email when a new AD is published?",
    a: "Yes. Every aircraft, engine, propeller and equipment page has a follow box: give an email address, click the confirmation link, and each new AD filed on that page is emailed the day the FAA files it. No account, and every email has a link that stops them.",
  },
  {
    q: "Can I use the data?",
    a: "Yes. The text is a US government work. Each page downloads as CSV, there is an RSS feed of new ADs, and a JSON API that needs no key. A link back is appreciated, not required.",
  },
];

const BROWSE: { segment: KindSegment; take: number }[] = [
  { segment: "aircraft", take: 12 },
  { segment: "engines", take: 12 },
  { segment: "propellers", take: 8 },
  { segment: "appliances", take: 8 },
];

export default async function AdLibraryPage() {
  const [stats, recent, ...lists] = await Promise.all([getStats(), getRecent(14), ...BROWSE.map((b) => getPages(KINDS[b.segment].kind))]);
  const upcoming = recent.filter((a) => a.onPublicInspection);
  const latest = recent.filter((a) => !a.onPublicInspection).slice(0, 8);

  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="relative border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
          <Breadcrumbs items={[{ name: "AD library", href: AD_BASE }]} />
          <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">Free AD library</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance text-brand-surface sm:text-5xl">
            Search every FAA Airworthiness Directive since 1995
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {stats ? fmt(stats.count) : "Every"} ADs from the Federal Register, laid out readably and filed under the aircraft, engines,
            propellers and equipment they name. Checked every hour. Free, no account.
          </p>
          <AdSearchBox className="mt-8 max-w-2xl" />
          <p className="mt-3 text-sm text-muted-foreground">
            Try <Link href={`${AD_BASE}/search?q=2011-10-09`} className="text-primary hover:underline">2011-10-09</Link>,{" "}
            <Link href={`${AD_BASE}/search?q=seat+rail`} className="text-primary hover:underline">seat rail</Link>,{" "}
            <Link href={`${AD_BASE}/search?q=magneto`} className="text-primary hover:underline">magneto</Link> or{" "}
            <Link href={`${AD_BASE}/aircraft/cessna-172s`} className="text-primary hover:underline">Cessna 172S</Link>.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 sm:px-6">
          {stats && (
            <p className="text-sm text-muted-foreground tabular-nums">
              {fmt(stats.count)} ADs · {fmt(stats.pages.aircraft ?? 0)} aircraft pages · {fmt(stats.pages.engine ?? 0)} engine pages ·{" "}
              {fmt((stats.pages.propeller ?? 0) + (stats.pages.appliance ?? 0))} propeller and equipment makers · newest published{" "}
              {adDate(stats.newest, "long")}
            </p>
          )}

          {(upcoming.length > 0 || latest.length > 0) && (
            <div className="space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">New ADs</h2>
                <Link href={`${AD_BASE}/new`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  All new ADs <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              {upcoming.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {upcoming.length} filed for publication on {adDate(upcoming[0].publishedOn, "long")}, on public inspection now.
                </p>
              )}
              <AdList ads={[...upcoming, ...latest]} filters={false} />
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Browse</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {BROWSE.map((b, i) => {
                const k = KINDS[b.segment];
                const pages = lists[i].filter((p) => b.segment === "aircraft" || b.segment === "engines" ? !p.isMaker : true).slice(0, b.take);
                return (
                  <div key={b.segment} className="rounded-lg border border-border bg-white p-5">
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold text-brand-surface">{k.lead}</h3>
                      <Link href={`${AD_BASE}/${b.segment}`} className="text-sm text-primary hover:underline">
                        All {fmt(lists[i].length)}
                      </Link>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      {pages.map((p) => (
                        <li key={p.slug} className="min-w-0 truncate">
                          <Link href={pageHref(k.kind, p.slug)} className="text-foreground hover:text-primary hover:underline">
                            {p.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">What it does that DRS does not</h2>
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              <Point title="Lists ADs by what is on the aircraft">
                The airframe model, the engine family, the propeller and the equipment maker, each on its own page, so a 172S owner does
                not have to know which ADs were issued to Textron, Cessna or Lycoming.
              </Point>
              <Point title="Reads like the AD">
                Applicability, the FAA&apos;s summary and the required actions, laid out as published, with what each AD replaced and what
                replaced it one click away.
              </Point>
              <Point title="Shows new ADs a day early">
                ADs appear when the FAA files them for publication, usually the day before the Federal Register prints them, and
                followers are emailed then.
              </Point>
              <Point title="Gives the data away">
                Every page downloads as CSV, new ADs come as an <Link href={`${AD_BASE}/feed.xml`} className="text-primary hover:underline">RSS feed</Link>,
                and there is a free <Link href={`${AD_BASE}/data`} className="text-primary hover:underline">JSON API</Link>.
              </Point>
            </dl>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Monthly roundups</h2>
            <p className="text-muted-foreground">
              Every AD published in a month, with the FAA&apos;s summary of each.{" "}
              <Link href={`${AD_BASE}/monthly`} className="inline-flex items-center gap-1 text-primary hover:underline">
                See the months <ArrowRight className="size-4" aria-hidden />
              </Link>
            </p>
          </div>

          <LibraryNotice />

          <div id="faq" className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Questions</h2>
            <dl className="space-y-5">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <dt className="font-medium text-brand-surface">{f.q}</dt>
                  <dd className="mt-1 text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="flex flex-col gap-4 rounded-xl bg-brand-surface p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <p className="text-lg font-semibold">Track the ADs on your own aircraft</p>
              <p className="mt-1 text-white/75">
                AerScheduler, the scheduling and maintenance software this library comes from, lists the ADs that name each of your
                aircraft, records who decided each one, and tracks the inspections that follow.
              </p>
            </div>
            <a href={signupUrl("maintenance")} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-brand-surface hover:bg-white/90">
              Try it free <ArrowRight className="size-4" aria-hidden />
            </a>
          </aside>

          <p className="text-sm text-muted-foreground">
            <Rss className="mr-1 inline size-3.5" aria-hidden />
            <Link href={`${AD_BASE}/feed.xml`} className="hover:underline">RSS feed of new ADs</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-semibold text-brand-surface">{title}</dt>
      <dd className="mt-1 leading-relaxed text-muted-foreground">{children}</dd>
    </div>
  );
}
