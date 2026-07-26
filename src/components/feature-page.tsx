import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { PhoneMock } from "@/components/phone-mock";
import { StoreBadges } from "@/components/store-badges";
import {
  ScheduleMock,
  BillingMock,
  FleetMock,
  PeopleMock,
  ComplianceMock,
  InstructionMock,
  MaintenanceMock,
  SelfBookingMock,
  ReportsMock,
  IntegrationsMock,
} from "@/components/mocks";
import { FEATURES, type Feature, type FeatureSlug } from "@/lib/features";
import { SIGNUP_URL } from "@/lib/site";

export function FeaturePage({ feature }: { feature: Feature }) {
  const related = feature.related
    .map((slug) => FEATURES[slug])
    .filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-20">
          <div>
            <p className="text-sm font-semibold text-primary">{feature.eyebrow}</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              {feature.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {feature.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Get started
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                See pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Built for {feature.personas.join(" · ")}
            </p>
          </div>
          <div className="mt-12 flex justify-center lg:mt-0 lg:justify-end">
            <FeatureVisual slug={feature.slug} />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            What you get
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {feature.bullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-[#fafbfc] p-5"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Related features
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((f) => (
                <Link
                  key={f.slug}
                  href={`/features/${f.slug}`}
                  className="rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-primary/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {f.eyebrow}
                  </p>
                  <p className="mt-2 font-semibold text-foreground">{f.navLabel}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {f.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-brand-surface text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Try {feature.title.toLowerCase()} on your fleet.
            </h2>
            <p className="mt-2 text-white/65">Self-serve. No sales call.</p>
          </div>
          <Button href={SIGNUP_URL} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
            Get started
            <ChevronRight className="size-4 opacity-80" />
          </Button>
        </div>
      </section>
    </>
  );
}

function FeatureVisual({ slug }: { slug: FeatureSlug }) {
  switch (slug) {
    case "scheduling":
      return <ScheduleMock />;
    case "self-booking":
      return <SelfBookingMock />;
    case "fleet":
      return <FleetMock />;
    case "people-roles":
      return <PeopleMock />;
    case "compliance":
      return <ComplianceMock />;
    case "instruction":
      return <InstructionMock />;
    case "billing":
      return <BillingMock />;
    case "maintenance":
      return <MaintenanceMock />;
    case "reports":
      return <ReportsMock />;
    case "integrations":
      return <IntegrationsMock />;
    case "mobile":
      return (
        <div className="flex flex-col items-center gap-6">
          <PhoneMock />
          <StoreBadges />
        </div>
      );
    default:
      return <ScheduleMock />;
  }
}
