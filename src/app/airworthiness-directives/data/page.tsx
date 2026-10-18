import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AD_BASE, apiBase } from "@/lib/ad-library";

export const metadata: Metadata = {
  title: "Airworthiness Directive Data: Free JSON API, CSV and RSS",
  description:
    "Free, keyless access to every FAA Airworthiness Directive since 1995: a JSON API, CSV per aircraft, engine and maker, and an RSS feed of new ADs.",
  alternates: { canonical: `${AD_BASE}/data` },
};

const ENDPOINTS: { path: string; what: string }[] = [
  { path: "/search?q=seat+rail&page=1", what: "Ranked search: an AD number or its start, or any words. 25 a page." },
  { path: "/ads/2011-10-09", what: "One AD in full: applicability and required actions as structured blocks, supersession, the pages it is filed on." },
  { path: "/recent?days=30", what: "Published in the last 30 days (up to 90), plus anything on public inspection now." },
  { path: "/pages/aircraft", what: "Every page of a kind: aircraft, engine, propeller or appliance." },
  { path: "/pages/aircraft/cessna-172s", what: "One page: its ADs, figures by year." },
  { path: "/pages/aircraft/cessna-172s.csv", what: "The same as CSV." },
  { path: "/months/2026-09", what: "Every AD published in a month, with the FAA's summary." },
  { path: "/stats", what: "Counts, the years covered, when the library last changed." },
];

export default function DataPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "Data and API", href: `${AD_BASE}/data` },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">AD data, free</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        The library&apos;s text is the Federal Register&apos;s, a US government work. Take it: no key, no account. A link back to the
        library is appreciated.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-brand-surface">JSON API</h2>
        <p className="text-muted-foreground">
          Base address <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{apiBase}</code>. GET only, cached for a few minutes, and
          limited to 3,000 requests per 5 minutes from one address. Dates are UTC days.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {ENDPOINTS.map((e) => (
                <tr key={e.path} className="border-b border-border align-top last:border-0">
                  <td className="px-3 py-2.5 font-mono whitespace-nowrap">
                    <a href={`${apiBase}${e.path}`} className="text-primary hover:underline">{e.path}</a>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{e.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-brand-surface">CSV</h2>
        <p className="text-muted-foreground">Every aircraft, engine, propeller and equipment page has a CSV link: one row per AD, with the Federal Register link.</p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-brand-surface">RSS</h2>
        <p className="text-muted-foreground">
          <Link href={`${AD_BASE}/feed.xml`} className="text-primary hover:underline">{AD_BASE}/feed.xml</Link> lists the newest ADs, including
          those on public inspection, refreshed every 15 minutes.
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-brand-surface">What the fields mean</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
          <li><code>onPublicInspection</code>: filed with the Federal Register and not yet published; <code>publishedOn</code> is the scheduled date.</li>
          <li><code>supersedes</code> and <code>supersededBy</code>: AD numbers, from the AD&apos;s own text.</li>
          <li><code>repetitive</code>: the required actions mention doing something again. A reading aid, not a compliance answer.</li>
          <li>Pages list an AD when its text names the model; a listing is not a determination that the AD applies.</li>
        </ul>
      </section>
    </article>
  );
}
