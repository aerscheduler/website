import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AdText } from "@/components/ad-library/ad-text";
import { Chip } from "@/components/ad-library/ad-list";
import { LibraryNotice } from "@/components/ad-library/notice";
import { AD_BASE, adAbout, adDate, adHref, adPublished, adTitle, getAd, KINDS, pageHref, PRODUCT_LABEL, segmentFor } from "@/lib/ad-library";
import { SITE_URL, signupUrl } from "@/lib/site";

/**
 * One Airworthiness Directive, readable: what it applies to, the FAA's own summary, what it
 * requires, what it replaced and what replaced it, and the aircraft, engines and equipment it
 * names. Generated on first visit and refreshed hourly; there are 12,000 of them.
 */
export const revalidate = 3600;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ adNumber: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { adNumber } = await params;
  const ad = await getAd(adNumber);
  if (!ad) return { title: "AD not found", robots: { index: false } };
  const who = adTitle(ad.title);
  const short = who.length > 80 ? `${who.slice(0, 77).replace(/[,\s]+\S*$/, "")}...` : who;
  const title = `AD ${ad.adNumber}: ${short}`;
  const description = (ad.summary ?? ad.unsafeCondition ?? ad.applicability ?? who).replace(/\s+/g, " ").slice(0, 300);
  // Not offered to search engines without its text: an AD from the FAA's index alone is a few
  // lines and a link, too thin to stand as a page.
  const readable = !!ad.details?.applicability?.length;
  return {
    title,
    description,
    alternates: { canonical: adHref(ad.adNumber), types: { "text/markdown": `${adHref(ad.adNumber)}.md` } },
    // Not offered to search engines until it is published, or when its layout could not be read.
    robots: readable && !ad.onPublicInspection ? undefined : { index: false, follow: true },
    openGraph: { title, description, url: adHref(ad.adNumber), type: "article" },
  };
}

export default async function AdPage({ params }: Props) {
  const { adNumber } = await params;
  const ad = await getAd(adNumber);
  if (!ad) notFound();
  // "AD 2013-11-11" or a lowercase revision suffix: one address per AD.
  if (ad.adNumber !== decodeURIComponent(adNumber)) redirect(adHref(ad.adNumber));

  const about = adAbout(ad);
  const pagesByKind = (Object.keys(KINDS) as (keyof typeof KINDS)[])
    .map((seg) => ({ seg, label: KINDS[seg].plural, pages: ad.pages.filter((p) => segmentFor(p.kind) === seg) }))
    .filter((g) => g.pages.length);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Legislation",
          name: `Airworthiness Directive ${ad.adNumber}`,
          legislationIdentifier: `AD ${ad.adNumber}`,
          alternateName: ad.title,
          legislationDate: ad.publishedOn.slice(0, 10),
          ...(ad.effectiveOn ? { legislationDateVersion: ad.effectiveOn.slice(0, 10) } : {}),
          legislationJurisdiction: "US",
          legislationPassedBy: { "@type": "GovernmentOrganization", name: "Federal Aviation Administration" },
          url: `${SITE_URL}${adHref(ad.adNumber)}`,
          sameAs: ad.url,
        }}
      />
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "AD library", href: AD_BASE },
            { name: `AD ${ad.adNumber}`, href: adHref(ad.adNumber) },
          ]}
        />

        <header className="mt-6 space-y-3">
          <p className="text-sm font-medium text-primary">
            Airworthiness Directive{ad.amendment ? ` · Amendment ${ad.amendment}` : ""} · {about}
          </p>
          <h1 className="font-mono text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">AD {ad.adNumber}</h1>
          <p className="text-lg text-balance text-muted-foreground">{adTitle(ad.title)}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {ad.onPublicInspection && <Chip tone="amber">On public inspection: to be published {adDate(ad.publishedOn, "long")}</Chip>}
            {ad.supersededBy.length > 0 && <Chip tone="grey">Superseded</Chip>}
            {ad.repetitive && <Chip tone="blue">Mentions a repeat action</Chip>}
            <Chip tone="grey">{PRODUCT_LABEL[ad.productType] ?? ad.productType}</Chip>
          </div>
        </header>

        {ad.supersededBy.length > 0 && (
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-foreground">
            <span className="font-semibold text-brand-surface">Superseded.</span> A later AD replaced this one:{" "}
            {ad.supersededBy.map((n, i) => (
              <span key={n}>
                {i > 0 && ", "}
                <Link href={adHref(n)} className="font-mono font-medium text-primary hover:underline">
                  AD {n}
                </Link>
              </span>
            ))}
            . Comply with the one in force.
          </p>
        )}
        {ad.onPublicInspection && (
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            The FAA has filed this AD for publication in the Federal Register on {adDate(ad.publishedOn, "long")}. This page shows the
            public-inspection copy and is replaced by the published text when it appears. Its effective date is set at publication.
          </p>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-lg border border-border bg-white p-4 text-sm sm:grid-cols-4">
          <Fact label={ad.onPublicInspection ? "To be published" : ad.datedByNumber ? "Issued" : "Published"}>{adPublished(ad, "long")}</Fact>
          <Fact label="Effective">{adDate(ad.effectiveOn, "long") ?? (ad.onPublicInspection ? "Set at publication" : "Not stated")}</Fact>
          <Fact label="Maker">{ad.manufacturer}</Fact>
          <Fact label="Supersedes">
            {ad.supersedes.length
              ? ad.supersedes.map((n, i) => (
                  <span key={n}>
                    {i > 0 && ", "}
                    {ad.supersedesInLibrary.includes(n) ? (
                      <Link href={adHref(n)} className="font-mono text-primary underline-offset-2 hover:underline">
                        {n}
                      </Link>
                    ) : (
                      <span className="font-mono">{n}</span>
                    )}
                  </span>
                ))
              : "Nothing"}
          </Fact>
        </dl>

        <div className="mt-10 space-y-10">
          <Section title="Applies to">
            {ad.details?.applicability?.length ? (
              <AdText blocks={ad.details.applicability} />
            ) : ad.source === "drs" ? (
              <div className="space-y-2">
                <p className="text-[15px] leading-relaxed">{ad.applicability}</p>
                <p className="text-sm text-muted-foreground">
                  The models as the FAA&apos;s AD index lists them. The serial ranges, installed parts and exceptions are in the AD itself:{" "}
                  <a href={ad.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    read it at the FAA
                  </a>
                  .
                </p>
              </div>
            ) : ad.applicability ? (
              <p className="text-[15px] leading-relaxed">{ad.applicability}</p>
            ) : (
              <p className="text-muted-foreground">The Federal Register printed this AD without its applicability text. Read it at the link below.</p>
            )}
          </Section>

          {ad.summary && (
            <Section title="The FAA's summary">
              <p className="text-[15px] leading-relaxed">{ad.summary}</p>
            </Section>
          )}

          {ad.unsafeCondition && !ad.summary && (
            <Section title="Unsafe condition">
              <p className="text-[15px] leading-relaxed">{ad.unsafeCondition}</p>
            </Section>
          )}

          {ad.details && ad.details.actions.length > 0 && (
            <Section title="What it requires">
              <div className="space-y-6">
                {ad.details.actions.map((s, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-semibold text-brand-surface">{s.heading}</h3>
                    <AdText blocks={s.blocks} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {pagesByKind.length > 0 && (
            <Section title="Filed under">
              <p className="mb-3 text-sm text-muted-foreground">
                The aircraft, engines and makers this AD names, by the model designations in its text. A model listed here may still be
                outside the AD&apos;s serial ranges.
              </p>
              <div className="space-y-3">
                {pagesByKind.map((g) => (
                  <div key={g.seg}>
                    <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">{g.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.pages.slice(0, 40).map((p) => (
                        <Link key={`${p.kind}/${p.slug}`} href={pageHref(p.kind, p.slug)} className="rounded-full border border-border bg-white px-3 py-1 text-sm hover:border-primary hover:text-primary">
                          {p.name}
                          {p.mentioned && <span className="text-muted-foreground"> (mentioned)</span>}
                        </Link>
                      ))}
                      {g.pages.length > 40 && <span className="px-2 py-1 text-sm text-muted-foreground">and {g.pages.length - 40} more</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title="Official sources">
            <ul className="space-y-2 text-[15px]">
              {ad.source === "drs" ? (
                <li>
                  <a href={ad.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline">
                    The AD at the FAA <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                  <span className="text-muted-foreground"> · its text as the FAA keeps it</span>
                </li>
              ) : (
                <li>
                  <a href={ad.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline">
                    {ad.onPublicInspection ? "The public-inspection copy at the Federal Register" : "The Federal Register document"} <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                  <span className="text-muted-foreground"> · document {ad.frDocumentNumber}, the legal text</span>
                </li>
              )}
              <li>
                <a href="https://drs.faa.gov/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary underline-offset-2 hover:underline">
                  FAA Dynamic Regulatory System (DRS) <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
                <span className="text-muted-foreground"> · search {ad.adNumber} for its current status and any corrections</span>
              </li>
            </ul>
          </Section>

          <LibraryNotice />

          <aside className="flex flex-col gap-3 rounded-lg bg-brand-surface p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Track ADs like this one on your own aircraft</p>
              <p className="text-sm text-white/75">
                AerScheduler lists the ADs that name each of your aircraft, alerts you to new ones, and keeps who decided what.
              </p>
            </div>
            <a href={signupUrl("maintenance")} className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-medium text-brand-surface hover:bg-white/90">
              Try it free
            </a>
          </aside>
        </div>
      </article>
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium break-words text-brand-surface">{children}</dd>
    </div>
  );
}

/** A section with an anchor from its title ("Applies to" is #applies-to), to link or cite. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const id = title.toLowerCase().replace(/&apos;|'/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <section className="space-y-3">
      <h2 id={id} className="scroll-mt-24 text-xl font-semibold tracking-tight text-brand-surface">{title}</h2>
      {children}
    </section>
  );
}
