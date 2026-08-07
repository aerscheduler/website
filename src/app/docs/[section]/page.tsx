import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { DocsMobileNav, DocsNav } from "@/components/docs/docs-nav";
import { DOC_SECTIONS, articleHref, getSection, type DocKind } from "@/lib/docs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * A section landing page: every article in one area, grouped by what kind of
 * page it is.
 *
 * Worth having as its own route rather than folding into the hub because these
 * are the pages that rank for the broad support query ("AerScheduler billing
 * help"), and because a reader who arrives on one deep article needs somewhere
 * to see the rest of the area at a glance.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return DOC_SECTIONS.map((section) => ({ section: section.slug }));
}

type Props = { params: Promise<{ section: string }> };

const KIND_GROUPS: { kind: DocKind; title: string; blurb: string }[] = [
  { kind: "overview", title: "Start here", blurb: "How this part of AerScheduler fits together." },
  { kind: "task", title: "How-to guides", blurb: "Step by step, with the real screens." },
  { kind: "reference", title: "Reference", blurb: "Look things up: fields, rules, and permissions." },
  { kind: "troubleshooting", title: "Troubleshooting", blurb: "When it does not do what you expected." },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) return {};

  // Site name omitted: the root layout's title template appends it.
  const title = `${section.title} documentation`;
  const description = `${section.blurb} ${section.articles.length} guides covering ${section.navLabel.toLowerCase()} in ${SITE_NAME}.`;

  return {
    title,
    description,
    keywords: [
      `${SITE_NAME} ${section.navLabel.toLowerCase()} help`,
      `flight school ${section.navLabel.toLowerCase()} software guide`,
      `how to ${section.navLabel.toLowerCase()} flight school`,
    ],
    alternates: { canonical: `/docs/${section.slug}` },
    openGraph: {
      title: `${section.title}: ${SITE_NAME} documentation`,
      description,
      url: `/docs/${section.slug}`,
      type: "article",
    },
  };
}

export default async function DocSectionPage({ params }: Props) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();

  const groups = KIND_GROUPS.map((group) => ({
    ...group,
    articles: section.articles.filter((article) => article.kind === group.kind),
  })).filter((group) => group.articles.length > 0);

  const index = DOC_SECTIONS.findIndex((s) => s.slug === section.slug);
  const nextSection = DOC_SECTIONS[index + 1];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${section.title} documentation`,
          description: section.blurb,
          url: `${SITE_URL}/docs/${section.slug}`,
          isPartOf: { "@type": "WebSite", name: `${SITE_NAME} Documentation`, url: `${SITE_URL}/docs` },
          hasPart: section.articles.map((article) => ({
            "@type": "TechArticle",
            headline: article.title,
            description: article.description,
            url: `${SITE_URL}${articleHref(section.slug, article.slug)}`,
          })),
        }}
      />

      <div>
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <Breadcrumbs
              items={[
                { name: "Docs", href: "/docs" },
                { name: section.navLabel, href: `/docs/${section.slug}` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface">
              {section.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {section.intro}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {section.articles.length} article{section.articles.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <DocsMobileNav activeSection={section.slug} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="lg:flex lg:gap-10">
            <DocsNav activeSection={section.slug} />

            <div className="min-w-0 flex-1 py-10">
              {groups.map((group) => (
                <section key={group.kind} className="mb-12 last:mb-0">
                  <h2 className="text-xl font-semibold tracking-tight text-brand-surface">
                    {group.title}
                  </h2>
                  <p className="mt-1 text-[14.5px] text-muted-foreground">{group.blurb}</p>
                  <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
                    {group.articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={articleHref(section.slug, article.slug)}
                          className="group flex items-start gap-3 p-4 hover:bg-[#fafbfc]"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-[15px] font-semibold text-foreground">
                              {article.title}
                            </p>
                            <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                              {article.description}
                            </p>
                          </div>
                          <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-wrap gap-3">
              <Button href="/docs" variant="secondary">
                All documentation
              </Button>
              {nextSection && (
                <Button href={`/docs/${nextSection.slug}`} variant="secondary">
                  {nextSection.title}
                  <ChevronRight className="size-4 opacity-80" />
                </Button>
              )}
              <Button href="/demo">
                Try it in the live demo
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
