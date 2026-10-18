import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AdList } from "@/components/ad-library/ad-list";
import { TailCheckForm } from "@/components/ad-library/tail-check-form";
import { AD_BASE, CHECK_BASE, fmt, pageHref } from "@/lib/ad-library";
import { getGuide, GUIDE_BASE, guideHref, guideTitle, share } from "@/lib/aircraft-guides";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl } from "@/lib/site";

/**
 * One aircraft model's ownership guide: the US fleet from the FAA registry, the model's ADs
 * and its engines', what to check before buying one, and the rest of its family. Every
 * figure is read from data, none written by hand; the page says where each comes from.
 */
export const revalidate = 86400;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGuide(slug);
  if (!g) return { title: "Not found", robots: { index: false } };
  const t = guideTitle(g);
  const y = g.profile?.years;
  const description = `${t}: ${fmt(g.fleetCount)} registered in the US${y ? `, built ${y.oldest} to ${y.newest}` : ""}, ${g.ads.current} current ADs (${g.ads.repetitive.length} with a repeat action), the engines they carry, and what to check before buying one.`;
  return {
    title: `${t} Ownership Guide: Fleet, ADs and What to Check`,
    description,
    alternates: { canonical: guideHref(g.slug) },
    openGraph: { title: `${t} ownership guide`, description, url: guideHref(g.slug), type: "article" },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = await getGuide(slug);
  if (!g) notFound();
  const t = guideTitle(g);
  const y = g.profile?.years;
  const engines = g.engines;
  const main = engines[0];
  const engineAds = engines.reduce((n, e) => n + (e.ads?.current ?? 0), 0);

  const faqs = [
    { q: `How many ${g.name}s are registered in the US?`, a: `${fmt(g.fleetCount)}, in the FAA aircraft registry.` },
    ...(y ? [{ q: `When was the ${g.name} built?`, a: `From about ${y.oldest} to ${y.newest}. Half of those registered today were built by ${y.median}.` }] : []),
    ...(main ? [{ q: `What engine does the ${g.name} have?`, a: `Most have the ${main.name} (${share(main.count, g.fleetCount)} of those registered)${engines.length > 1 ? `; others have the ${engines.slice(1).map((e) => e.name).join(", ")}` : ""}.` }] : []),
    {
      q: `How many Airworthiness Directives does the ${g.name} have?`,
      a: `${g.ads.current} current ADs name the ${g.designation} airframe, ${g.ads.repetitive.length} of them with a repeat action${engineAds ? `, and ${engineAds} more name its engines` : ""}. Whether each applies to one aircraft depends on its serial number and installed equipment.`,
    },
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd data={faqJsonLd(faqs)} />
      <Breadcrumbs
        items={[
          { name: "Aircraft guides", href: GUIDE_BASE },
          { name: t, href: guideHref(g.slug) },
        ]}
      />
      <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">Ownership guide</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">{t}</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        {fmt(g.fleetCount)} registered in the US{y ? `, built from about ${y.oldest} to ${y.newest}` : ""}
        {g.profile?.seats ? `, ${g.profile.seats} seats` : ""}
        {main ? `, most with the ${main.name}` : ""}. Its Airworthiness Directives, its engines&apos;, and what to check before buying one.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">The fleet</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg border border-border bg-white p-5 text-sm sm:grid-cols-3">
              <Fact label="Registered in the US">{fmt(g.fleetCount)}</Fact>
              <Fact label="Built">{y ? `${y.oldest} to ${y.newest}` : "Not recorded"}</Fact>
              <Fact label="Half built by">{y ? y.median : "Not recorded"}</Fact>
              <Fact label="Seats">{g.profile?.seats ?? "Not recorded"}</Fact>
              <Fact label="Engine type">{g.profile?.engineType ? g.profile.engineType.charAt(0).toUpperCase() + g.profile.engineType.slice(1) : "Not recorded"}</Fact>
              <Fact label="Most common engine">{main ? main.name : "Not recorded"}</Fact>
            </dl>
            {engines.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-brand-surface">Engines installed</h3>
                <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-white text-[15px]">
                  {engines.map((e) => (
                    <li key={e.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                      <span className="font-medium text-brand-surface">
                        {e.slug ? (
                          <Link href={pageHref("engine", e.slug)} className="hover:text-primary hover:underline">
                            {e.name}
                          </Link>
                        ) : (
                          e.name
                        )}
                      </span>
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {fmt(e.count)} aircraft ({share(e.count, g.fleetCount)})
                        {e.ads ? ` · ${e.ads.current} ADs, ${e.ads.repetitive} with a repeat action` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-sm text-muted-foreground">From the FAA aircraft registry, rebuilt daily. Years are those recorded on each registration.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Airworthiness Directives</h2>
            <p className="text-[15px] text-brand-surface">
              {g.ads.current} current AD{g.ads.current === 1 ? "" : "s"} name the {g.designation} airframe, {g.ads.repetitive.length} with a repeat action
              {g.ads.superseded ? `; ${g.ads.superseded} more were superseded` : ""}.
              {engineAds ? ` Its engines carry ${engineAds} more.` : ""}
              {g.ads.equipment ? ` ${g.ads.equipment} equipment AD${g.ads.equipment === 1 ? " names" : "s name"} the model.` : ""}
            </p>
            {g.ads.repetitive.length > 0 ? (
              <div className="space-y-2">
                <h3 className="font-semibold text-brand-surface">The ones that come back</h3>
                <p className="text-sm text-muted-foreground">
                  ADs with a repeat action: an inspection or replacement at an interval, for as long as the AD applies. These are the
                  airworthiness costs an owner keeps paying.
                </p>
                <AdList ads={g.ads.repetitive} filters={false} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No current airframe AD mentions a repeat action.</p>
            )}
            <p className="text-[15px]">
              <Link href={pageHref("aircraft", g.slug)} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                Every AD for the {g.name} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Before you buy one</h2>
            <ol className="list-decimal space-y-3 pl-5 text-[15px] marker:text-muted-foreground">
              <li>
                Run its N-number through the <Link href={CHECK_BASE} className="text-primary hover:underline">AD check</Link>: every AD that names its
                airframe and engine, as a checklist to take to the logbooks.
              </li>
              <li>
                For each repeat-action AD{g.ads.repetitive.length ? ` (${g.ads.repetitive.length} on the airframe)` : ""}, find the last compliance in the
                logbooks and when the next one is due.
              </li>
              <li>Compare the engine&apos;s time since overhaul with its maker&apos;s published overhaul time, and look for the reason behind any long gap in flying.</li>
              {g.ads.equipment > 0 && (
                <li>
                  {g.ads.equipment} equipment AD{g.ads.equipment === 1 ? " names" : "s name"} the {g.designation} (a muffler, a seat belt, a display): find out
                  which of that equipment is installed.
                </li>
              )}
              <li>
                Check the registration, the airworthiness certificate and the date of the last{" "}
                <Link href="/regulations/91-409" className="text-primary hover:underline">annual inspection</Link>.
              </li>
              <li>
                Work out the sales or use tax your state will charge with the{" "}
                <Link href="/aircraft-tax/calculator" className="text-primary hover:underline">aircraft tax calculator</Link>.
              </li>
            </ol>
          </section>

          {g.variants.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">The rest of the {g.family} family</h2>
              <div className="flex flex-wrap gap-2">
                {g.variants.map((v) => (
                  <Link
                    key={v.slug}
                    href={v.guide ? guideHref(v.slug) : pageHref("aircraft", v.slug)}
                    className="rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-primary hover:text-primary"
                  >
                    {v.nickname ? `${v.name} ${v.nickname}` : v.name}
                    <span className="text-muted-foreground"> · {fmt(v.fleetCount)}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Questions</h2>
            <dl className="space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-medium text-brand-surface">{f.q}</dt>
                  <dd className="mt-1 text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="border-t border-border pt-6 text-sm text-muted-foreground">
            Figures from the FAA aircraft registry and the FAA&apos;s Airworthiness Directives, rebuilt daily. An AD listed for a model is one
            to read; whether it applies to one aircraft depends on its serial number, equipment and records.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm font-medium text-brand-surface">Check one by N-number</p>
            <p className="mt-1 text-sm text-muted-foreground">Every AD for that aircraft&apos;s airframe and engine, as a checklist.</p>
            <TailCheckForm className="mt-3" compact />
          </div>
          <div className="rounded-lg bg-brand-surface p-4 text-sm text-white">
            <p className="font-semibold">Own one?</p>
            <p className="mt-1 text-white/75">AerScheduler lists its ADs, tracks the repeat inspections and the annual, and keeps the schedule and billing in one place.</p>
            <a href={signupUrl("maintenance")} className="mt-3 inline-block rounded-md bg-white px-3 py-1.5 font-medium text-brand-surface hover:bg-white/90">
              Try it free
            </a>
          </div>
          <p className="text-sm">
            <Link href={`${AD_BASE}/aircraft`} className="text-primary hover:underline">
              ADs by aircraft model
            </Link>
          </p>
        </aside>
      </div>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium text-brand-surface tabular-nums">{children}</dd>
    </div>
  );
}
