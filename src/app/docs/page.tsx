import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Code2,
  Compass,
  CreditCard,
  GraduationCap,
  Wrench,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { DocsMobileNav, DocsNav } from "@/components/docs/docs-nav";
import { DOC_SECTIONS, allArticles } from "@/lib/docs";
import { endpointCount } from "@/lib/openapi";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

/**
 * The documentation home.
 *
 * Two things live under /docs and the hub has to make the split obvious in one
 * glance: the help guides (how to use the product) and the API reference (how
 * to drive it from your own code). They serve different people who arrive from
 * different searches, so the hub leads with the guides and puts the API in its
 * own band rather than mixing them into one grid of cards.
 */

const ICONS = { Compass, CalendarDays, CreditCard, Wrench, GraduationCap, BarChart3 };

export const metadata: Metadata = {
  // Site name omitted: the root layout's title template appends it.
  title: "Documentation: Guides for Scheduling, Billing, Maintenance & Training",
  description: `How to use ${SITE_NAME}: step-by-step guides for the dispatch board, self-booking, invoicing and split billing, aircraft maintenance, Part 141 and Part 61 curriculum, and reporting.`,
  keywords: [
    "AerScheduler documentation",
    "AerScheduler help",
    "flight school software guide",
    "flight scheduling software help",
    "flight school billing how to",
    "flight training records software guide",
  ],
  alternates: { canonical: "/docs" },
  openGraph: {
    title: `${SITE_NAME} Documentation`,
    description: `Step-by-step guides for every part of ${SITE_NAME}, plus the full REST API reference.`,
    url: "/docs",
    type: "website",
  },
};

export default function DocsHubPage() {
  const flat = allArticles();
  const popular = flat.filter((entry) => entry.article.kind === "overview").slice(0, 6);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${SITE_NAME} Documentation`,
          description: `Guides and reference for ${SITE_NAME} flight school management software.`,
          url: `${SITE_URL}/docs`,
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          hasPart: DOC_SECTIONS.map((section) => ({
            "@type": "CollectionPage",
            name: section.title,
            description: section.blurb,
            url: `${SITE_URL}/docs/${section.slug}`,
          })),
        }}
      />

      <div>
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <Breadcrumbs items={[{ name: "Docs", href: "/docs" }]} />
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              {SITE_NAME} documentation
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Guides for scheduling, billing, maintenance, training and reporting, plus the
              full API reference.
            </p>
          </div>
        </div>

        <DocsMobileNav />

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="lg:flex lg:gap-10">
            <DocsNav />

            <div className="min-w-0 flex-1 py-10">
              <h2 className="text-xl font-semibold tracking-tight text-brand-surface">
                Browse by area
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {DOC_SECTIONS.map((section) => {
                  const Icon = ICONS[section.icon];
                  return (
                    <Link
                      key={section.slug}
                      href={`/docs/${section.slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
                    >
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/[0.08] text-primary">
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <span className="mt-3 flex items-center justify-between gap-2 text-[16px] font-semibold text-foreground">
                        {section.title}
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                        {section.blurb}
                      </span>
                      <span className="mt-3 text-[12.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                        {section.articles.length} article{section.articles.length === 1 ? "" : "s"}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {popular.length > 0 && (
                <>
                  <h2 className="mt-12 text-xl font-semibold tracking-tight text-brand-surface">
                    New to {SITE_NAME}?
                  </h2>
                  <p className="mt-1 text-[14.5px] text-muted-foreground">
                    One orientation page per area. Read these first and the rest of the docs
                    become lookups.
                  </p>
                  <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
                    {popular.map((entry) => (
                      <li key={entry.href}>
                        <Link
                          href={entry.href}
                          className="group flex items-start gap-3 p-4 hover:bg-[#fafbfc]"
                        >
                          <BookOpen className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                          <div className="min-w-0 flex-1">
                            <p className="text-[15px] font-semibold text-foreground">
                              {entry.article.title}
                            </p>
                            <p className="mt-0.5 text-[14px] leading-relaxed text-muted-foreground">
                              {entry.article.description}
                            </p>
                          </div>
                          <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <section className="mt-12 rounded-2xl border border-border bg-brand-surface p-6 text-white">
                <span className="flex size-9 items-center justify-center rounded-lg bg-white/10">
                  <Code2 className="size-4.5" aria-hidden />
                </span>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">API reference</h2>
                <p className="mt-1 max-w-xl text-[14.5px] leading-relaxed text-white/70">
                  {endpointCount()} REST endpoints for building on top of {SITE_NAME}: bookings,
                  invoices, aircraft, people, training, and reports. Authenticated with an API key,
                  included on every plan.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href="/docs/api" variant="secondary">
                    Read the API docs
                  </Button>
                </div>
              </section>

              <p className="mt-10 text-[14.5px] text-muted-foreground">
                Cannot find what you need? Email{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                and we will write the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
