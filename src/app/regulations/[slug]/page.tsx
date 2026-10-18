import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { OfficialText } from "@/components/regulations/official-text";
import { RegNotice } from "@/components/regulations/notice";
import { RegList } from "@/components/regulations/reg-list";
import {
  PARTS_WITH_PAGES,
  REG_BASE,
  REGS,
  TEXT_AS_OF,
  ecfrUrl,
  farCite,
  fullCite,
  getPart,
  getReg,
  getTopic,
  paraLabel,
  partHref,
  partSlug,
  productFor,
  regByCite,
  regHref,
  regTitle,
  regsInPart,
  resolvePara,
  shortCite,
  type Reg,
  type RegPart,
} from "@/lib/regulations";
import { faqJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * One address shape for two kinds of page: `/regulations/91-409` (a section)
 * and `/regulations/part-91` (a Part's index). Both are prebuilt from the
 * registry; anything else is a 404, never a request-time lookup.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...REGS.map((r) => ({ slug: r.slug })), ...PARTS_WITH_PAGES.map((p) => ({ slug: partSlug(p.part) }))];
}

type Props = { params: Promise<{ slug: string }> };

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reg = getReg(slug);
  if (reg) {
    const href = regHref(reg.slug);
    return {
      // "14 CFR 91.409: Annual and 100-hour inspections". The FAR spelling of the
      // cite is in the page's own text and JSON-LD; in the title it only pushed the
      // topic, the part people read, past where Google truncates.
      title: regTitle(reg),
      description: reg.summary.description,
      alternates: { canonical: href, types: { "text/markdown": `${href}.md` } },
      openGraph: { title: regTitle(reg), description: reg.summary.answer, url: href, type: "article" },
    };
  }
  const part = getPart(slug);
  if (!part) return {};
  return {
    title: `14 CFR Part ${part.part}: ${part.title}, in plain English`,
    description: `The sections of 14 CFR Part ${part.part} (${part.title}) that owners, flight schools and pilots look up most, each explained in plain English beside the official eCFR text.`,
    alternates: { canonical: partHref(part.part), types: { "text/markdown": `${partHref(part.part)}.md` } },
    openGraph: { title: `14 CFR Part ${part.part}: ${part.title}`, url: partHref(part.part) },
  };
}

export default async function RegulationPage({ params }: Props) {
  const { slug } = await params;
  const reg = getReg(slug);
  if (reg) return <SectionPage reg={reg} />;
  const part = getPart(slug);
  if (part) return <PartPage part={part} />;
  notFound();
}

function SectionPage({ reg }: { reg: Reg }) {
  const { official, summary } = reg;
  const href = regHref(reg.slug);
  const topic = getTopic(reg.topic);
  const product = productFor(reg);
  const related = summary.related.map(regByCite).filter((r): r is Reg => !!r);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Legislation",
          name: `${fullCite(reg)}: ${official.heading}`,
          alternateName: [farCite(reg), reg.name],
          legislationIdentifier: fullCite(reg),
          legislationJurisdiction: "US",
          legislationType: "Regulation",
          legislationPassedBy: { "@type": "GovernmentOrganization", name: "Federal Aviation Administration" },
          isPartOf: { "@type": "Legislation", name: `14 CFR Part ${reg.part}`, legislationIdentifier: `14 CFR Part ${reg.part}` },
          ...(official.amendedOn ? { legislationDateVersion: official.amendedOn } : {}),
          url: `${SITE_URL}${href}`,
          sameAs: ecfrUrl(reg),
          abstract: summary.answer,
        }}
      />
      <JsonLd data={faqJsonLd(summary.faqs)} />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs
          items={[
            { name: "Regulations", href: REG_BASE },
            { name: `Part ${reg.part}`, href: partHref(reg.part) },
            { name: shortCite(reg), href },
          ]}
        />

        <header className="mt-6 space-y-4">
          <p className="text-sm font-medium text-primary">
            14 CFR Part {reg.part}
            {official.subpart ? ` · Subpart ${official.subpart.label} · ${official.subpart.title}` : official.partTitle ? ` · ${official.partTitle}` : ""}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">
            <span className="whitespace-nowrap">{fullCite(reg)}</span>: {reg.name}
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-foreground">{summary.answer}</p>
          <p className="text-sm text-muted-foreground tabular-nums">
            {official.amendedOn ? <>Section last amended {fmtDate(official.amendedOn)} · </> : null}
            Text current as of {fmtDate(TEXT_AS_OF)} · Also cited as {farCite(reg)} ·{" "}
            <a href={ecfrUrl(reg)} className="inline-flex items-center gap-1 text-primary hover:underline" rel="noopener">
              Read it on eCFR <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </p>
        </header>

        <section className="mt-10 space-y-4" aria-labelledby="plain">
          <h2 id="plain" className="text-xl font-semibold tracking-tight text-brand-surface">
            {fullCite(reg)} in plain English
          </h2>
          <ul className="space-y-3">
            {summary.points.map((p, i) => {
              const anchor = resolvePara(reg, p.para) ?? p.para;
              return (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                  <span>
                    {p.text}
                    {p.para && (
                      <>
                        {" "}
                        <a href={`#${anchor}`} className="text-sm font-medium whitespace-nowrap text-primary tabular-nums hover:underline">
                          {paraLabel(p.para)}
                        </a>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="faq" className="mt-12 space-y-5" aria-labelledby="questions">
          <h2 id="questions" className="text-xl font-semibold tracking-tight text-brand-surface">
            Common questions
          </h2>
          <dl className="space-y-5">
            {summary.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-brand-surface">{f.q}</dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 space-y-4 border-t border-border pt-10" aria-labelledby="official">
          <div className="space-y-1">
            <h2 id="official" className="text-xl font-semibold tracking-tight text-brand-surface">
              Official text of {fullCite(reg)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {reg.kind === "appendix" ? official.heading : `§ ${reg.cite} ${official.heading}.`} Verbatim from the eCFR, current as of {fmtDate(TEXT_AS_OF)}.
            </p>
          </div>
          <OfficialText blocks={official.blocks} />
        </section>

        {(related.length > 0 || summary.links?.length) && (
          <section className="mt-12 space-y-3" aria-labelledby="related">
            <h2 id="related" className="text-xl font-semibold tracking-tight text-brand-surface">
              Related
            </h2>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={regHref(r.slug)} className="group block">
                    <span className="font-medium text-primary tabular-nums group-hover:underline">{shortCite(r)}</span>{" "}
                    <span className="text-foreground">{r.name}</span>
                  </Link>
                </li>
              ))}
              {summary.links?.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-medium text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              {topic && (
                <li>
                  <Link href={`${REG_BASE}#${topic.slug}`} className="text-muted-foreground hover:text-primary hover:underline">
                    All {topic.title.toLowerCase()} regulations
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}

        {product && (
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            {product.text}{" "}
            <Link href={product.href} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              See how <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </p>
        )}

        <RegNotice className="mt-10" />
      </article>
    </>
  );
}

function PartPage({ part }: { part: RegPart }) {
  const regs = regsInPart(part.part);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "Regulations", href: REG_BASE },
          { name: `Part ${part.part}`, href: partHref(part.part) },
        ]}
      />
      <header className="mt-6 space-y-3">
        <p className="text-sm font-medium text-primary">14 CFR Part {part.part}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">{part.title}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {part.blurb} The {regs.length === 1 ? "section" : `${regs.length} sections`} below are the ones owners, schools and pilots look up
          most, each explained in plain English beside the official text.
        </p>
      </header>
      <RegList regs={regs} className="mt-10" />
      <p className="mt-8 text-sm text-muted-foreground">
        The rest of Part {part.part} is on the{" "}
        <a href={`https://www.ecfr.gov/current/title-14/part-${part.part}`} className="text-primary hover:underline" rel="noopener">
          eCFR
        </a>
        .
      </p>
      <RegNotice className="mt-10" />
    </div>
  );
}
