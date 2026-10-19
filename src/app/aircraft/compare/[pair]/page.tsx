import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AD_BASE, adAbout, adHref, fmt } from "@/lib/ad-library";
import { COMPARE_BASE, compareHref, compareRows, differences, PAIRS, pairsFor, pairTitle, parsePair } from "@/lib/aircraft-compare";
import { getGuide, getGuides, GUIDE_BASE, guideHref, guideTitle, type Guide, type GuideSummary } from "@/lib/aircraft-guides";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl } from "@/lib/site";

/**
 * Two ownership guides side by side: fleet, engines, ADs, what gets reported, accidents and
 * running cost. Every figure comes from the two guides; the sentences only say which is more.
 */
export const revalidate = 86400;

export function generateStaticParams() {
  return PAIRS.map(([a, b]) => ({ pair: `${a}-vs-${b}` }));
}

type Props = { params: Promise<{ pair: string }> };

async function load(pair: string) {
  const p = parsePair(pair);
  if (!p) return null;
  const [a, b] = await Promise.all([getGuide(p[0]), getGuide(p[1])]);
  return a && b ? { a, b } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const d = await load(pair);
  if (!d) return { title: "Not found", robots: { index: false } };
  const t = pairTitle(d.a, d.b);
  const description = `${t}, side by side: ${fmt(d.a.fleetCount)} and ${fmt(d.b.fleetCount)} registered, their ages, engines, Airworthiness Directives, what mechanics report, accident records and fuel burn.`;
  const href = compareHref(...parsePair(pair)!);
  return { title: `${t}: Fleet, ADs, Problems and Accidents Compared`, description, alternates: { canonical: href, types: { "text/markdown": `${href}.md` } }, openGraph: { title: t, description, url: href, type: "article" } };
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const d = await load(pair);
  if (!d) notFound();
  const { a, b } = d;
  const rows = compareRows(a, b);
  const diffs = differences(a, b);
  const href = compareHref(a.slug, b.slug);
  const faqs = [
    { q: `Which has more Airworthiness Directives, the ${a.name} or the ${b.name}?`, a: `${a.ads.current} current ADs name the ${a.name} airframe and ${b.ads.current} the ${b.name}; ${a.ads.repetitive.length} and ${b.ads.repetitive.length} of them have a repeat action.` },
    ...(a.profile?.years && b.profile?.years
      ? [{ q: `Which is newer, the ${a.name} or the ${b.name}?`, a: `Half of the ${a.name}s registered were built by ${a.profile.years.median}, half of the ${b.name}s by ${b.profile.years.median}.` }]
      : []),
    ...(a.safety && b.safety
      ? [{ q: `How do the ${a.name} and ${b.name} accident records compare?`, a: `${fmt(a.safety.accidents)} accidents since 2008 for the ${a.name} (${fmt(a.safety.fatal)} fatal) against ${fmt(b.safety.accidents)} for the ${b.name} (${fmt(b.safety.fatal)} fatal), from fleets of ${fmt(a.fleetCount)} and ${fmt(b.fleetCount)}. Counts, not rates per hour flown.` }]
      : []),
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Aircraft guides", href: GUIDE_BASE },
          { name: "Compare", href: COMPARE_BASE },
          { name: pairTitle(a, b), href },
        ]}
      />
      <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">Compare</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">{pairTitle(a, b)}</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        The two side by side, from the FAA registry, the FAA&apos;s Airworthiness Directives and Service Difficulty Reports, and the NTSB&apos;s accident
        database. Each has a full guide:{" "}
        <Link href={guideHref(a.slug)} className="text-primary hover:underline">{guideTitle(a)}</Link>,{" "}
        <Link href={guideHref(b.slug)} className="text-primary hover:underline">{guideTitle(b)}</Link>.
      </p>

      {diffs.length > 0 && (
        <section className="mt-10 space-y-3">
          <h2 id="differences" className="scroll-mt-24 text-2xl font-semibold tracking-tight text-brand-surface">Where they differ</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] text-brand-surface marker:text-muted-foreground">
            {diffs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 space-y-3">
        <h2 id="side-by-side" className="scroll-mt-24 text-2xl font-semibold tracking-tight text-brand-surface">Side by side</h2>
        <div className="overflow-x-auto rounded-lg border border-border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="w-1/3 px-4 py-3 font-medium text-muted-foreground"></th>
                <th className="px-4 py-3 font-semibold text-brand-surface">
                  <Link href={guideHref(a.slug)} className="hover:text-primary hover:underline">{guideTitle(a)}</Link>
                </th>
                <th className="px-4 py-3 font-semibold text-brand-surface">
                  <Link href={guideHref(b.slug)} className="hover:text-primary hover:underline">{guideTitle(b)}</Link>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.label} className="align-top">
                  <th scope="row" className="px-4 py-2.5 text-left font-normal text-muted-foreground">
                    {r.label}
                    {r.note && <span className="mt-0.5 block text-xs">{r.note}</span>}
                  </th>
                  <td className="px-4 py-2.5 text-brand-surface tabular-nums">{r.a}</td>
                  <td className="px-4 py-2.5 text-brand-surface tabular-nums">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Report and accident counts are not rates: nobody publishes the hours each model flies, and a training fleet flies far more than a private one.
          Fuel burn is a typical cruise figure; the engine interval is its maker&apos;s published figure for the usual engine.
        </p>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        {[a, b].map((g) => (
          <div key={g.slug} className="min-w-0 space-y-3">
            <h2 className="text-xl font-semibold text-brand-surface">The {g.name}&apos;s repeat-action ADs</h2>
            {g.ads.repetitive.length ? (
              <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white text-[15px]">
                {g.ads.repetitive.map((ad) => (
                  <li key={ad.adNumber} className="px-4 py-2.5">
                    <Link href={adHref(ad.adNumber)} className="font-mono text-sm text-primary hover:underline">{ad.adNumber}</Link>
                    <span className="mt-0.5 block text-brand-surface">{ad.requires ?? adAbout(ad)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No current airframe AD mentions a repeat action.</p>
            )}
            <Link href={`${AD_BASE}/aircraft/${g.slug}`} className="text-sm text-primary hover:underline">Every AD for the {g.name}</Link>
          </div>
        ))}
      </section>

      <section className="mt-10 space-y-5">
        <h2 id="questions" className="scroll-mt-24 text-2xl font-semibold tracking-tight text-brand-surface">Questions</h2>
        <dl className="space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-medium text-brand-surface">{f.q}</dt>
              <dd className="mt-1 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <OtherComparisons a={a} b={b} names={new Map((await getGuides()).map((g) => [g.slug, g]))} />

      <aside className="mt-12 flex flex-col gap-4 rounded-xl bg-brand-surface p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="max-w-xl">
          <p className="text-lg font-semibold">Whichever you choose</p>
          <p className="mt-1 text-white/75">AerScheduler lists its ADs, tracks the repeat inspections and the annual, and keeps the schedule and billing in one place.</p>
        </div>
        <a href={signupUrl("maintenance")} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-brand-surface hover:bg-white/90">
          Try it free
        </a>
      </aside>
    </article>
  );
}

function OtherComparisons({ a, b, names }: { a: Guide; b: Guide; names: Map<string, GuideSummary> }) {
  const others = [...pairsFor(a.slug).map((p) => ({ ...p, self: a })), ...pairsFor(b.slug).map((p) => ({ ...p, self: b }))].filter((p) => p.other !== a.slug && p.other !== b.slug);
  if (!others.length) return null;
  return (
    <section className="mt-10 space-y-3">
      <h2 className="text-xl font-semibold text-brand-surface">Other comparisons</h2>
      <div className="flex flex-wrap gap-2">
        {others
          .filter((p) => names.has(p.other))
          .map((p) => (
            <Link key={p.href} href={p.href} className="rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-primary hover:text-primary">
              {p.self.name} vs {names.get(p.other)!.name}
            </Link>
          ))}
      </div>
    </section>
  );
}
