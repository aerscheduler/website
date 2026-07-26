import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { FEATURE_GROUPS, FEATURES, featureHref } from "@/lib/features";
import { SIGNUP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Features",
  description:
    "Explore AerScheduler features: aircraft scheduling, self-booking, billing, maintenance, compliance, instruction, reports, and native mobile apps.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Flight School Software Features",
    description:
      "Scheduling, billing, fleet, instruction, maintenance, mobile apps, and more.",
    url: "/features",
  },
};

export default function FeaturesIndexPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:pt-16">
          <Breadcrumbs items={[{ name: "Features", href: "/features" }]} />
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Flight school software features
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From the dispatch board to the ramp phone: scheduling, people,
            billing, maintenance, and compliance in one platform.
          </p>
          <Button href={SIGNUP_URL} size="lg" className="mt-8">
            Get started
            <ChevronRight className="size-4 opacity-80" />
          </Button>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-14 px-4 py-16 sm:px-6 lg:py-20">
          {FEATURE_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.title}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((slug) => {
                  const f = FEATURES[slug];
                  return (
                    <Link
                      key={slug}
                      href={featureHref(slug)}
                      className="rounded-xl border border-border bg-[#fafbfc] p-5 transition-colors hover:border-primary/30 hover:bg-white"
                    >
                      <p className="font-semibold text-foreground">{f.navLabel}</p>
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
          ))}
        </div>
      </section>
    </>
  );
}
