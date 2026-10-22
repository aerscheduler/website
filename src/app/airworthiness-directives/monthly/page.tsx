import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AD_BASE, getMonths } from "@/lib/ad-library";

export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).

export const metadata: Metadata = {
  title: "Airworthiness Directives by Month",
  description: "Every FAA Airworthiness Directive published each month, with the FAA's summary of each.",
  alternates: { canonical: `${AD_BASE}/monthly` },
};

const monthName = (ym: string) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${ym}-01T00:00:00Z`));

export default async function MonthsPage() {
  const months = await getMonths();
  const byYear = new Map<string, { month: string; count: number }[]>();
  for (const m of months) byYear.set(m.month.slice(0, 4), [...(byYear.get(m.month.slice(0, 4)) ?? []), m]);
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "By month", href: `${AD_BASE}/monthly` },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">Airworthiness Directives by month</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">Every AD published in a month, with the FAA&apos;s own summary of each.</p>
      <div className="mt-8 space-y-6">
        {[...byYear.entries()].map(([year, list]) => (
          <section key={year}>
            <h2 className="mb-2 text-lg font-semibold text-brand-surface">{year}</h2>
            <ul className="flex flex-wrap gap-2">
              {list.map((m) => (
                <li key={m.month}>
                  <Link href={`${AD_BASE}/monthly/${m.month}`} className="inline-flex items-baseline gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-primary">
                    {monthName(m.month).split(" ")[0]} <span className="text-muted-foreground tabular-nums">{m.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
