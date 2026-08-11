import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { StoreBadges } from "@/components/store-badges";
import {
  SchedulingLiveDemo,
  BillingLiveDemo,
  MembershipsLiveDemo,
  FleetLiveDemo,
  PeopleLiveDemo,
  ComplianceLiveDemo,
  InstructionLiveDemo,
  MaintenanceLiveDemo,
  SelfBookingLiveDemo,
  ReportsLiveDemo,
  IntegrationsLiveDemo,
  TrainingLiveDemo,
  MobileLiveDemo,
} from "@/components/mocks/living";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  FEATURES,
  featureHref,
  type Feature,
  type FeatureSlug,
} from "@/lib/features";
import { RESOURCE_LINKS } from "@/lib/resources";
import { signupUrl, type CampaignSource } from "@/lib/site";

/**
 * Which setup track a feature page hands to the app.
 *
 * Someone reading the maintenance page should land on a checklist that starts with
 * maintenance, not with "add your first aircraft". See `web/src/lib/onboarding-tracks.ts`.
 * Features with no track of their own send nothing and get the default order.
 */
const FEATURE_SOURCE: Partial<Record<FeatureSlug, CampaignSource>> = {
  scheduling: "scheduling",
  "self-booking": "scheduling",
  billing: "billing",
  memberships: "billing",
  reports: "reports",
  maintenance: "maintenance",
  integrations: "quickbooks",
  training: "training",
  instruction: "training",
};

export function FeaturePage({ feature }: { feature: Feature }) {
  const related = feature.related
    .map((slug) => FEATURES[slug])
    .filter(Boolean);
  //Resolved by href rather than duplicated on the feature, so a guide can be retitled in one
  //place. `filter(Boolean)` because a guide that has been removed should vanish from here
  //rather than render an empty card pointing at a 404.
  const guides = (feature.guides ?? [])
    .map((href) => RESOURCE_LINKS.find((link) => link.href === href))
    .filter((link): link is (typeof RESOURCE_LINKS)[number] => link != null);
  const cta = signupUrl(FEATURE_SOURCE[feature.slug]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:grid lg:grid-cols-[0.9fr_1.2fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-16">
          <div>
            <Breadcrumbs
              items={[
                { name: "Features", href: "/features" },
                { name: feature.navLabel, href: featureHref(feature.slug) },
              ]}
            />
            <p className="mt-6 text-sm font-semibold text-primary">{feature.eyebrow}</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              {feature.title}
            </h1>
            <p className="mt-3 max-w-2xl text-xl font-medium tracking-tight text-brand-surface/80">
              {feature.headline}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {feature.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta} size="lg">
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
          <div className="mt-12 flex min-w-0 justify-center lg:mt-0">
            <FeatureVisual slug={feature.slug} />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
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

          {/* Sits inside the white "What you get" block rather than in a section of its own
              so the page keeps alternating backgrounds down the scroll, and so the guides
              read as the deep end of this feature rather than as a separate detour. */}
          {guides.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Go deeper
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-xl border border-border bg-[#fafbfc] p-5 transition-colors hover:border-primary/30 hover:bg-white"
                  >
                    <p className="font-semibold text-foreground">{guide.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {guide.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Read the guide
                      <ChevronRight className="size-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Related features
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((f) => (
                <Link
                  key={f.slug}
                  href={featureHref(f.slug)}
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
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Try {feature.title.toLowerCase()} on your fleet.
            </h2>
            <p className="mt-2 text-white/65">Self-serve. No sales call.</p>
          </div>
          <Button href={cta} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
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
      return <SchedulingLiveDemo />;
    case "self-booking":
      return <SelfBookingLiveDemo />;
    case "fleet":
      return <FleetLiveDemo />;
    case "people-roles":
      return <PeopleLiveDemo />;
    case "compliance":
      return <ComplianceLiveDemo />;
    case "instruction":
      return <InstructionLiveDemo />;
    case "training":
      return <TrainingLiveDemo />;
    case "billing":
      return <BillingLiveDemo />;
    case "memberships":
      return <MembershipsLiveDemo />;
    case "maintenance":
      return <MaintenanceLiveDemo />;
    case "reports":
      return <ReportsLiveDemo />;
    case "integrations":
      return <IntegrationsLiveDemo />;
    case "mobile":
      return (
        <div className="flex flex-col items-center gap-6">
          <MobileLiveDemo />
          <StoreBadges />
        </div>
      );
    default:
      return <SchedulingLiveDemo />;
  }
}
