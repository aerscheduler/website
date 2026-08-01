import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { EndpointSection, MethodBadge, EndpointPath } from "@/components/api-docs";
import { API_BASE_URL, getTagDoc, getTagDocs } from "@/lib/openapi";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * One statically-generated reference page per API area.
 *
 * Separate pages rather than one long scroll: each area is a distinct thing
 * somebody searches for ("flight school billing API", "aircraft maintenance
 * API"), each gets its own title, description, and canonical URL, and a page
 * about eight endpoints ranks better than a section of a page about a hundred
 * and forty.
 */

export function generateStaticParams() {
  return getTagDocs().map((tag) => ({ tag: tag.slug }));
}

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getTagDoc(slug);
  if (!tag) return {};

  const title = `${tag.name} API — ${SITE_NAME} Reference`;
  const description = `${tag.description} ${tag.endpoints.length} endpoints with parameters, responses, and example requests. Part of the ${SITE_NAME} flight school API.`;

  return {
    title,
    description,
    keywords: [
      `flight school ${tag.name.toLowerCase()} API`,
      `${tag.name.toLowerCase()} REST API aviation`,
      `${SITE_NAME} ${tag.name} endpoints`,
      "flight school software API",
    ],
    alternates: { canonical: `/docs/api/${tag.slug}` },
    openGraph: { title, description, url: `/docs/api/${tag.slug}`, type: "article" },
  };
}

export default async function ApiTagPage({ params }: Props) {
  const { tag: slug } = await params;
  const tag = getTagDoc(slug);
  if (!tag) notFound();

  const all = getTagDocs();
  const index = all.findIndex((t) => t.slug === tag.slug);
  const previous = all[index - 1];
  const next = all[index + 1];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: `${tag.name} API reference`,
          description: tag.description,
          url: `${SITE_URL}/docs/api/${tag.slug}`,
          isPartOf: { "@type": "TechArticle", name: `${SITE_NAME} API Documentation`, url: `${SITE_URL}/docs/api` },
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />

      <article>
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <Breadcrumbs
              items={[
                { name: "API documentation", href: "/docs/api" },
                { name: tag.name, href: `/docs/api/${tag.slug}` },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface">
              {tag.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {tag.description}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {tag.endpoints.length} endpoint{tag.endpoints.length === 1 ? "" : "s"} · base URL{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px] text-foreground">
                {API_BASE_URL}
              </code>
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="lg:flex lg:gap-10">
            {/* On this page — a plain anchor list, so it works without JS and
                gives crawlers the endpoint names as real links. */}
            <nav
              className="hidden w-60 shrink-0 py-10 lg:block"
              aria-label={`${tag.name} endpoints`}
            >
              <div className="sticky top-24">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  On this page
                </p>
                <ul className="mt-3 space-y-0.5">
                  {tag.endpoints.map((endpoint) => (
                    <li key={endpoint.slug}>
                      <a
                        href={`#${endpoint.slug}`}
                        className="flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-muted"
                      >
                        <MethodBadge method={endpoint.method} className="mt-0.5" />
                        <span className="min-w-0 text-xs leading-snug text-muted-foreground">
                          {endpoint.summary}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="min-w-0 flex-1 py-10">
              {tag.endpoints.map((endpoint) => (
                <EndpointSection key={endpoint.slug} endpoint={endpoint} />
              ))}
            </div>
          </div>
        </div>

        {/* Prev / next, so every reference page links onward rather than being
            a leaf that a reader (or a crawler) dead-ends on. */}
        <div className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-stretch sm:justify-between sm:px-6">
            {previous ? (
              <Link
                href={`/docs/api/${previous.slug}`}
                className="flex-1 rounded-2xl border border-border bg-white p-5 hover:shadow-md"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Previous
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground">{previous.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{previous.description}</span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next && (
              <Link
                href={`/docs/api/${next.slug}`}
                className="flex-1 rounded-2xl border border-border bg-white p-5 text-right hover:shadow-md"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Next
                </span>
                <span className="mt-1 block text-base font-semibold text-foreground">{next.name}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{next.description}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              All areas
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {all.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/docs/api/${other.slug}`}
                    className={
                      other.slug === tag.slug
                        ? "inline-flex rounded-full bg-brand-surface px-3 py-1.5 text-sm font-medium text-white"
                        : "inline-flex rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                    }
                  >
                    {other.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/docs/api" variant="secondary">
                API overview
              </Button>
              <Button href="/contact">
                Talk to us
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
