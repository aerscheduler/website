import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { FEATURES, featureHref } from "@/lib/features";
import { MODULES, CROSS_CUTTING } from "@/lib/modules";
import { DEMO_URL, PRICE_PER_AIRCRAFT, SIGNUP_URL, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Features",
  description:
    "The five modules that run a flight school: scheduling and dispatch, billing and payments, training records, maintenance and airworthiness, and reporting. Plus a native iOS app and integrations, on every plan.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Flight School Software Features",
    description:
      "Scheduling, billing, training records, maintenance and reporting, with the mobile app and integrations included.",
    url: "/features",
  },
};

/**
 * The features index, organised by module rather than by invented buckets.
 *
 * Each module gets a band with its hub page first and the pages under it beside
 * it, which is the same shape as the mega-menu and the same shape as the docs.
 * A visitor who opens the menu, this page and the help documentation should meet
 * one product, not three arrangements of one.
 */
export default function FeaturesIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:pt-16">
          <Breadcrumbs items={[{ name: "Features", href: "/features" }]} />
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Five modules, one flight school
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Scheduling, billing, training records, maintenance and reporting.
            They are one system rather than five, which is why closing a flight
            out writes the invoice, an overdue annual clears the board, and a
            graded lesson comes off the flight you already booked.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href={DEMO_URL} variant="secondary" size="lg">
              See the live demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            ${PRICE_PER_AIRCRAFT}/aircraft/mo · {TRIAL_DAYS}-day trial · No credit
            card · No sales call
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl divide-y divide-border px-4 sm:px-6">
          {MODULES.map((productModule) => {
            const hub = FEATURES[productModule.hub];
            return (
              <div
                key={productModule.slug}
                className="grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:py-16"
              >
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
                    {productModule.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {productModule.tagline}
                  </p>
                  <Link
                    href={featureHref(productModule.hub)}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {hub.navLabel}
                    <ChevronRight className="size-3.5" />
                  </Link>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <Link
                      href={`/docs/${productModule.docsSection}`}
                      className="hover:text-foreground"
                    >
                      Read the {productModule.title.toLowerCase()} documentation
                    </Link>
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[productModule.hub, ...productModule.supporting].map((slug) => {
                    const f = FEATURES[slug];
                    return (
                      <Link
                        key={slug}
                        href={featureHref(slug)}
                        className="group rounded-xl border border-border bg-[#fafbfc] p-5 transition-colors hover:border-primary/30 hover:bg-white"
                      >
                        <p className="font-semibold text-foreground group-hover:text-primary">
                          {f.navLabel}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {f.summary}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                          Learn more
                          <ChevronRight className="size-3.5" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Across every module
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            The roster decides who can book, be billed and be graded. The app and
            the integrations carry all five modules with them.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CROSS_CUTTING.map((slug) => {
              const f = FEATURES[slug];
              return (
                <Link
                  key={slug}
                  href={featureHref(slug)}
                  className="group rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/30"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary">
                    {f.navLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
