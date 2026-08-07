import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircleQuestion } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { DocsMobileNav, DocsNav, DocsToc } from "@/components/docs/docs-nav";
import {
  DOC_SECTIONS,
  allArticles,
  articleHref,
  getArticle,
  neighbours,
} from "@/lib/docs";
import { tableOfContents } from "@/lib/docs-toc";
import { faqJsonLd } from "@/lib/seo";
import { RESOURCE_LINKS } from "@/lib/resources";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

/**
 * One statically-generated page per help article.
 *
 * The MDX body is imported by path from `src/content/docs`, which keeps prose
 * out of the routing tree entirely: this single file owns the hero, the sticky
 * nav, the table of contents, the FAQ block, the structured data, and the
 * prev/next links for every article, so none of that can be forgotten on a new
 * one. Adding an article means an MDX file and a registry entry, nothing else.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return allArticles().map(({ section, article }) => ({
    section: section.slug,
    slug: article.slug,
  }));
}

type Props = { params: Promise<{ section: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: sectionSlug, slug } = await params;
  const found = getArticle(sectionSlug, slug);
  if (!found) return {};
  const { section, article } = found;

  // The root layout appends "| AerScheduler" via a title template, so the site
  // name is deliberately absent here. The OpenGraph title is NOT templated, so
  // it spells the brand out itself.
  const title = `${article.title} | ${section.title} docs`;
  const href = articleHref(section.slug, article.slug);

  return {
    title,
    description: article.description,
    keywords: [
      ...(article.keywords ?? []),
      ...(article.seoQuery ? [article.seoQuery] : []),
      `${SITE_NAME} help`,
      "flight school software documentation",
    ],
    alternates: { canonical: href },
    openGraph: {
      title: `${article.title} | ${SITE_NAME} docs`,
      description: article.description,
      url: href,
      type: "article",
    },
  };
}

export default async function DocArticlePage({ params }: Props) {
  const { section: sectionSlug, slug } = await params;
  const found = getArticle(sectionSlug, slug);
  if (!found) notFound();
  const { section, article } = found;

  const { default: Body } = await import(`../../../../content/docs/${sectionSlug}/${slug}.mdx`);

  const toc = tableOfContents(sectionSlug, slug);
  const { previous, next } = neighbours(sectionSlug, slug);
  const href = articleHref(section.slug, article.slug);

  // Related links are hrefs only, resolved here against whatever they point at,
  // so a retitled guide cannot leave a stale label behind on an article.
  const related = (article.related ?? [])
    .map((target) => {
      const doc = allArticles().find((entry) => entry.href === target);
      if (doc) return { href: target, label: doc.article.title, description: doc.article.description };
      const resource = RESOURCE_LINKS.find((link) => link.href === target);
      if (resource) return resource;
      return null;
    })
    .filter((link): link is { href: string; label: string; description: string } => link !== null);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: article.title,
          description: article.description,
          url: `${SITE_URL}${href}`,
          articleSection: section.title,
          isPartOf: {
            "@type": "WebSite",
            name: `${SITE_NAME} Documentation`,
            url: `${SITE_URL}/docs`,
          },
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      {/* The FAQ block renders from the same array that produces this markup, so
          a question can never be answered on the page and differently in the
          structured data. Breadcrumbs emits its own BreadcrumbList. */}
      {article.faqs && article.faqs.length > 0 && <JsonLd data={faqJsonLd(article.faqs)} />}

      <article>
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <Breadcrumbs
              items={[
                { name: "Docs", href: "/docs" },
                { name: section.navLabel, href: `/docs/${section.slug}` },
                { name: article.title, href },
              ]}
            />
            <h1 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {article.description}
            </p>
            {article.audience.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                For {formatList(article.audience)}
              </p>
            )}
          </div>
        </div>

        <DocsMobileNav activeSection={section.slug} />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="lg:flex lg:gap-10">
            <DocsNav activeSection={section.slug} activeArticle={article.slug} />

            <div className="min-w-0 flex-1 py-10">
              <Body />

              {article.faqs && article.faqs.length > 0 && (
                <section className="mt-12 border-t border-border pt-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
                    Common questions
                  </h2>
                  <dl className="mt-5 space-y-5">
                    {article.faqs.map((faq) => (
                      <div key={faq.q} className="rounded-xl border border-border bg-[#fafbfc] p-4">
                        <dt className="text-[15px] font-semibold text-foreground">{faq.q}</dt>
                        <dd className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">
                          {faq.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {related.length > 0 && (
                <section className="mt-12 border-t border-border pt-8">
                  <h2 className="text-lg font-semibold text-foreground">Related</h2>
                  <ul className="mt-3 space-y-2">
                    {related.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group flex items-baseline gap-2 text-[15px] text-primary"
                        >
                          <span className="font-medium underline decoration-primary/30 underline-offset-2 group-hover:decoration-primary">
                            {link.label}
                          </span>
                          <span className="text-[13.5px] text-muted-foreground">{link.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="mt-12 flex flex-col gap-3 rounded-2xl border border-border bg-[#fafbfc] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <MessageCircleQuestion className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">
                      Still stuck on this?
                    </p>
                    <p className="mt-0.5 text-[14px] text-muted-foreground">
                      Email {SUPPORT_EMAIL} and tell us what you were trying to do. We answer.
                    </p>
                  </div>
                </div>
                <Button href="/contact" variant="secondary" className="shrink-0">
                  Contact support
                </Button>
              </section>
            </div>

            <DocsToc entries={toc} />
          </div>
        </div>

        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-stretch sm:justify-between sm:px-6">
            {previous ? (
              <Link
                href={previous.href}
                className="flex-1 rounded-2xl border border-border bg-white p-5 hover:shadow-md"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Previous
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground">
                  {previous.article.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {previous.section.navLabel}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next && (
              <Link
                href={next.href}
                className="flex-1 rounded-2xl border border-border bg-white p-5 text-right hover:shadow-md"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Next
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground">
                  {next.article.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{next.section.navLabel}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-wrap gap-3">
              <Button href={`/docs/${section.slug}`} variant="secondary">
                All {section.navLabel} docs
              </Button>
              <Button href="/demo">
                Try it in the live demo
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function formatList(items: string[]): string {
  if (items.length === 1) return items[0].toLowerCase();
  const lower = items.map((item) => item.toLowerCase());
  return `${lower.slice(0, -1).join(", ")} and ${lower[lower.length - 1]}`;
}

// Referenced so a section with no articles is still a compile-time-visible
// mistake rather than an empty nav column at runtime.
if (process.env.NODE_ENV !== "production") {
  const empty = DOC_SECTIONS.filter((section) => section.articles.length === 0);
  if (empty.length > 0) {
    console.warn(`[docs] sections with no articles: ${empty.map((s) => s.slug).join(", ")}`);
  }
}
