import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Rss } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdList } from "@/components/ad-library/ad-list";
import { FollowForm } from "@/components/ad-library/follow-form";
import { PageGrid } from "@/components/ad-library/page-grid";
import { LibraryNotice, Pre1995Note } from "@/components/ad-library/notice";
import { AD_BASE, adDate, csvHref, fmt, getModelPage, getPages, KINDS, pageHref, type KindSegment } from "@/lib/ad-library";
import { signupUrl } from "@/lib/site";

/**
 * One page of the library: every AD that names one aircraft model, engine family, or propeller
 * or equipment maker, with its figures, a CSV, and a way to be told about the next one. The four
 * route folders (aircraft, engines, propellers, appliances) each render this.
 */

const titleFor = (segment: KindSegment, name: string) =>
  segment === "aircraft" || segment === "engines"
    ? `${name} Airworthiness Directives`
    : name === "Various aircraft"
      ? "Airworthiness Directives for equipment on various aircraft"
      : `${name} ${segment === "propellers" ? "propeller" : "equipment"} Airworthiness Directives`;

export async function modelMetadata(segment: KindSegment, slug: string): Promise<Metadata> {
  const page = await getModelPage(KINDS[segment].kind, slug);
  if (!page) return { title: "Not found", robots: { index: false } };
  const title = titleFor(segment, page.name);
  const description = `All ${page.figures.total} Airworthiness Directives published since 1995 that name the ${page.name}, ${page.figures.notSuperseded} not superseded, laid out readably, with a CSV and email alerts for new ones.`;
  return { title, description, alternates: { canonical: pageHref(page.kind, page.slug) }, openGraph: { title, description, url: pageHref(page.kind, page.slug) } };
}

export async function ModelPageView({ segment, slug }: { segment: KindSegment; slug: string }) {
  const k = KINDS[segment];
  const page = await getModelPage(k.kind, slug);
  if (!page) notFound();
  const isMaker = page.isMaker;
  // Every year from the first to the last, with the empty ones, so a gap reads as a gap.
  const counts = new Map(page.figures.byYear.map((y) => [y.year, y.count]));
  const first = page.figures.byYear[0]?.year ?? 0;
  const last = page.figures.byYear[page.figures.byYear.length - 1]?.year ?? 0;
  const years = first ? Array.from({ length: last - first + 1 }, (_, i) => ({ year: first + i, count: counts.get(first + i) ?? 0 })) : [];
  const maxYear = Math.max(1, ...years.map((y) => y.count));

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: k.plural, href: `${AD_BASE}/${segment}` },
          { name: page.name, href: pageHref(page.kind, page.slug) },
        ]}
      />
      <header className="mt-6 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">{titleFor(segment, page.name)}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {segment === "aircraft" || segment === "engines"
            ? isMaker
              ? `Every AD in the library that names a ${page.name} ${segment === "aircraft" ? "aircraft model" : "engine"}, gathered from its model pages.`
              : `Every AD in the library whose text names the ${page.name}${page.fleetCount ? `, of which ${fmt(page.fleetCount)} are registered in the US` : ""}.`
            : `Every ${segment === "propellers" ? "propeller" : "equipment"} AD in the library that names ${page.name} as the maker.`}
        </p>
        <Pre1995Note />
      </header>

      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4">
        <Figure label="ADs listed" value={fmt(page.figures.total)} />
        <Figure label="Not superseded" value={fmt(page.figures.notSuperseded)} />
        <Figure label="Of those, with a repeat action" value={fmt(page.figures.repetitive)} />
        <Figure label="Newest" value={adDate(page.figures.newest) ?? "None"} />
      </dl>

      {years.length > 2 && (
        <figure className="mt-6 rounded-lg border border-border bg-white p-4">
          <figcaption className="mb-3 text-sm font-medium text-brand-surface">ADs by year published</figcaption>
          <div className="flex h-24 items-end gap-[3px]" role="img" aria-label="ADs by year published">
            {years.map((y) => (
              <div key={y.year} className="group relative flex-1">
                <div
                  className={y.count ? "w-full rounded-t-sm bg-primary/70 group-hover:bg-primary" : "w-full bg-border"}
                  style={{ height: y.count ? `${Math.max(4, (y.count / maxYear) * 96)}px` : "1px" }}
                  title={`${y.year}: ${y.count}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums">
            <span>{first}</span>
            <span>{last}</span>
          </div>
        </figure>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-4">
          {page.ads.length > 0 ? (
            <AdList ads={page.ads} showMaker={!(segment === "aircraft" || segment === "engines")} emptyText="No ADs match these filters." />
          ) : (
            <p className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
              No AD since 1995 names the {page.name} as an airframe. The equipment ADs below name it.
            </p>
          )}
          {page.equipment.length > 0 && (
            <section className="space-y-3 pt-6">
              <h2 className="text-xl font-semibold text-brand-surface">Equipment ADs that mention the {page.name}</h2>
              <p className="text-sm text-muted-foreground">
                ADs written for equipment (an exhaust muffler, a display, a seat belt) whose text names the {page.name}, usually in a list of
                aircraft it is approved for. Whether one applies depends on whether that equipment is installed.
              </p>
              <AdList ads={page.equipment} showMaker emptyText="No equipment ADs match these filters." />
            </section>
          )}
          <p className="text-sm text-muted-foreground">
            Listed by the model designations in each AD&apos;s text. An AD written for a part number, or for &quot;all&quot; engines of a
            maker, may name no model and so not appear here: search the library for the part or the maker as well.
          </p>
        </div>
        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-white p-4">
            <FollowForm kind={page.kind} slug={page.slug} name={page.name} />
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-white p-4 text-sm">
            <a href={csvHref(page.kind, page.slug)} className="flex items-center gap-2 text-primary hover:underline">
              <Download className="size-4" aria-hidden /> Download these ADs as CSV
            </a>
            <Link href={`${AD_BASE}/new`} className="flex items-center gap-2 text-primary hover:underline">
              <Rss className="size-4" aria-hidden /> New ADs, every hour
            </Link>
          </div>
          <div className="rounded-lg bg-brand-surface p-4 text-sm text-white">
            <p className="font-semibold">Own or maintain one?</p>
            <p className="mt-1 text-white/75">AerScheduler lists these on each aircraft, records who decided each one, and tracks the inspections.</p>
            <a href={signupUrl("maintenance")} className="mt-3 inline-block rounded-md bg-white px-3 py-1.5 font-medium text-brand-surface hover:bg-white/90">
              Try it free
            </a>
          </div>
        </aside>
      </div>

      <LibraryNotice className="mt-10" />
    </article>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-xl font-semibold text-brand-surface tabular-nums">{value}</dd>
    </div>
  );
}

/** An index of one kind: every page, busiest first, with a filter. */
export async function KindIndexView({ segment }: { segment: KindSegment }) {
  const k = KINDS[segment];
  const pages = await getPages(k.kind);
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: k.plural, href: `${AD_BASE}/${segment}` },
        ]}
      />
      <header className="mt-6 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">Airworthiness Directives by {k.singular}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {segment === "aircraft"
            ? `${fmt(pages.length)} aircraft models and makers with at least five registered in the US and at least one AD since 1995, most registered first.`
            : segment === "engines"
              ? `${fmt(pages.length)} engine families and makers from the US registry, most installed first.`
              : `${fmt(pages.length)} makers named by ${segment === "propellers" ? "propeller" : "equipment"} ADs since 1995.`}
        </p>
      </header>
      <PageGrid pages={pages} kind={k.kind} />
    </article>
  );
}
