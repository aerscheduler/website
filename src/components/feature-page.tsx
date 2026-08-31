import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/button";
import { StoreBadges } from "@/components/store-badges";
import { Reveal, RevealGroup } from "@/components/reveal";
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
import { JsonLd } from "@/components/json-ld";
import {
  FEATURES,
  featureHref,
  type Feature,
  type FeatureSlug,
} from "@/lib/features";
import { FEATURE_LANDING } from "@/lib/feature-landing";
import { moduleOf, moduleFeatures, isModuleHub, DEFAULT_PHOTO } from "@/lib/modules";
import { allArticles } from "@/lib/docs";
import { RESOURCE_LINKS } from "@/lib/resources";
import { faqJsonLd } from "@/lib/seo";
import {
  DEMO_URL,
  PRICE_PER_AIRCRAFT,
  TRIAL_DAYS,
  signupUrl,
  type CampaignSource,
} from "@/lib/site";

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
  utilization: "reports",
  maintenance: "maintenance",
  inspections: "maintenance",
  integrations: "quickbooks",
  training: "training",
  instruction: "training",
};

/**
 * One template for every feature page.
 *
 * The first version of this leaned the other way and it was wrong. It carried
 * outcomes, then a bulleted deep-dive per section, then the full capability
 * list, then FAQs, then two separate grids of cards: three feature lists and six
 * card grids on one page. Read end to end it was a wall, and a wall does not get
 * read, so the argument it contained may as well not have been there.
 *
 * What is here now alternates on purpose. Text, then a photograph, then short
 * cards, then a timeline, then a dark band, then two-column prose, then a plain
 * list. No two adjacent sections are the same shape, and the caps on the content
 * itself live in `lib/feature-landing.ts` where they can actually be enforced.
 *
 * The photograph is the one thing on the page not asking to be read. It is a
 * breath between arguments, and it carries the module's single strongest claim
 * so the scroller who reads nothing else reads that.
 */
export function FeaturePage({ feature }: { feature: Feature }) {
  const landing = FEATURE_LANDING[feature.slug];
  const productModule = moduleOf(feature.slug);
  const isHub = isModuleHub(feature.slug);
  const photo = productModule?.photo ?? DEFAULT_PHOTO;

  //Resolved by href rather than duplicated on the feature, so a guide can be retitled in one
  //place. `filter(Boolean)` because a guide that has been removed should vanish from here
  //rather than render an empty card pointing at a 404.
  const guides = (feature.guides ?? [])
    .map((href) => RESOURCE_LINKS.find((link) => link.href === href))
    .filter((link): link is (typeof RESOURCE_LINKS)[number] => link != null);

  // Help articles, resolved the same way against the docs registry, so a renamed
  // article cannot leave a stale title here and a deleted one degrades to
  // silence rather than a 404.
  const docs = (landing?.docs ?? [])
    .map((href) => {
      const found = allArticles().find((entry) => entry.href === href);
      return found ? { href, label: found.article.title } : null;
    })
    .filter((link): link is { href: string; label: string } => link != null);

  // Siblings in the same module, then anything else related, deduplicated and
  // merged into ONE grid. They used to be two separate sections of four cards
  // each, which is eight cards saying roughly "there are other pages".
  const siblingSlugs = productModule
    ? moduleFeatures(productModule).filter((slug) => slug !== feature.slug)
    : [];
  const seen = new Set<FeatureSlug>([feature.slug, ...siblingSlugs]);
  const alsoSlugs = feature.related.filter((slug) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
  const explore = [...siblingSlugs, ...alsoSlugs].slice(0, 4).map((slug) => FEATURES[slug]);

  const cta = signupUrl(FEATURE_SOURCE[feature.slug]);
  const faqs = landing?.faqs ?? [];

  return (
    <>
      {/* FAQPage only. `Breadcrumbs` emits its own BreadcrumbList, and adding
          one here would ship the page two of them. */}
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:grid lg:grid-cols-[0.95fr_1.15fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
          <div>
            <Breadcrumbs
              items={[
                { name: "Features", href: "/features" },
                { name: feature.navLabel, href: featureHref(feature.slug) },
              ]}
            />

            {productModule && !isHub ? (
              <Link
                href={featureHref(productModule.hub)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                {productModule.title}
                <ChevronRight className="size-3.5" />
              </Link>
            ) : (
              <p className="mt-6 text-sm font-semibold text-primary">
                {productModule ? `${productModule.title} module` : feature.eyebrow}
              </p>
            )}

            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              {landing?.h1 ?? feature.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {feature.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta} size="lg">
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

          <div className="mt-12 flex min-w-0 justify-center lg:mt-0">
            <FeatureVisual slug={feature.slug} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Statement over a photograph                                      */}
      {/* ---------------------------------------------------------------- */}
      {landing && (
        <section className="relative isolate overflow-hidden bg-brand-surface">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            className="object-cover"
            // Not `priority`: it sits below the fold on every page, and the hero
            // demo above it is the thing that should win the network.
          />
          {/* Two layers rather than one flat tint: the gradient keeps the left
              edge dark enough for text at any crop, while the right stays light
              enough that the photograph is still a photograph. */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-surface via-brand-surface/75 to-brand-surface/25"
            aria-hidden
          />
          {/* A second, vertical wash. Without it the statement sits on whatever
              the photograph happens to be doing at that crop, and two of the
              five have a bright sky exactly where the text lands. */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-brand-surface/70 via-transparent to-brand-surface/40"
            aria-hidden
          />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
            <Reveal>
              <p className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {landing.statement}
              </p>
            </Reveal>
            <RevealGroup className="mt-12 grid max-w-4xl gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
              {landing.proof.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-semibold tracking-tight text-white">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Outcomes. Three, short.                                          */}
      {/* ---------------------------------------------------------------- */}
      {landing && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <Reveal>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                {landing.outcomesTitle}
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {landing.outcomes.map((outcome, index) => (
                <div key={outcome.title}>
                  <span
                    className="block text-sm font-semibold tabular-nums text-primary"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-lg font-semibold leading-snug text-brand-surface">
                    {outcome.title}
                  </p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {outcome.body}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* How it works, as a timeline                                      */}
      {/* ---------------------------------------------------------------- */}
      {landing?.steps && landing.steps.length > 0 && (
        <section className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <Reveal>
              <p className="text-sm font-semibold text-primary">How it works</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-surface sm:text-3xl">
                {landing.stepsTitle ?? "Start to finish"}
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {landing.steps.map((step, index) => (
                <div key={step.title} className="relative">
                  {/* The rule joins the steps into a sequence instead of four
                      unrelated cards. Hidden on the last one and on narrow
                      screens, where the steps stack and the line would point
                      sideways into nothing. */}
                  {index < landing.steps!.length - 1 && (
                    <span
                      className="absolute left-9 right-0 top-4 hidden h-px bg-border lg:block"
                      aria-hidden
                    />
                  )}
                  <span className="relative inline-flex size-8 items-center justify-center rounded-full border border-border bg-white text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="mt-4 font-semibold text-brand-surface">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Spotlights. At most two, three points each.                      */}
      {/* ---------------------------------------------------------------- */}
      {landing?.sections && landing.sections.length > 0 && (
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl space-y-14 px-4 py-16 sm:px-6 lg:py-20">
            {landing.sections.map((section) => (
              <Reveal
                key={section.title}
                className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {section.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-brand-surface sm:text-3xl">
                    {section.title}
                  </h3>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-l-2 border-primary/25 pl-5">
                    {section.points.map((point) => (
                      <li key={point} className="text-sm leading-relaxed text-foreground">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Mid-page CTA                                                     */}
      {/* ---------------------------------------------------------------- */}
      {landing && (
        <section className="border-y border-border bg-brand-surface text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {landing.ctaTitle}
              </h2>
              <p className="mt-2 leading-relaxed text-white/65">{landing.ctaBody}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href={cta} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button
                href={DEMO_URL}
                size="lg"
                className="border border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Open the demo
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Capability list, as a plain list.                                */}
      {/* It answers "is the thing I need in here", which is a checking     */}
      {/* question. Bordered cards gave it the visual weight of an argument.*/}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {landing?.bulletsTitle ?? "Everything else in here"}
          </h2>
          <ul className="mt-6 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
            {feature.bullets.map((item) => (
              <li
                key={item}
                className="mb-2.5 break-inside-avoid border-l border-border pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>

          {(docs.length > 0 || guides.length > 0) && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-8">
              <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Read more
              </span>
              {guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {guide.label}
                </Link>
              ))}
              {docs.map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {doc.label}
                </Link>
              ))}
              {productModule && (
                <Link
                  href={`/docs/${productModule.docsSection}`}
                  className="inline-flex items-center gap-1 px-2 text-sm font-semibold text-primary hover:underline"
                >
                  All {productModule.title.toLowerCase()} docs
                  <ChevronRight className="size-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ, two columns so five answers are not five screens            */}
      {/* ---------------------------------------------------------------- */}
      {faqs.length > 0 && (
        <section className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 id="faq" className="text-2xl font-semibold tracking-tight text-brand-surface sm:text-3xl">
              Common questions
            </h2>
            <dl className="mt-8 grid gap-x-14 gap-y-8 lg:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <dt className="font-semibold text-brand-surface">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Explore more. One grid, not two.                                 */}
      {/* ---------------------------------------------------------------- */}
      {explore.length > 0 && (
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {productModule ? `More in ${productModule.title}` : "Explore more"}
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {explore.map((f) => (
                <Link
                  key={f.slug}
                  href={featureHref(f.slug)}
                  className="group flex items-baseline gap-2 border-t border-border pt-4"
                >
                  <span className="font-semibold text-brand-surface group-hover:text-primary">
                    {f.navLabel}
                  </span>
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-border bg-brand-surface text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {landing?.closingTitle ?? `Try ${feature.title.toLowerCase()} on your fleet.`}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/65">
              {landing?.closingBody ??
                `Add a tail, put a flight on the board, and see it work on your own operation. ${TRIAL_DAYS} days, no credit card, no sales call.`}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={cta} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button
                href={DEMO_URL}
                size="lg"
                className="border border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Try the live demo
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/50">
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
              {" · "}
              <Link href="/features" className="hover:text-white">
                All features
              </Link>
              {" · "}
              <Link href="/book-a-demo" className="hover:text-white">
                Book a walkthrough
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * The running preview in the hero.
 *
 * Exhaustive on purpose, with no `default:`. The old version fell back to the
 * dispatch board, which meant a new feature slug shipped a page whose copy talked
 * about invoices while the picture showed a schedule. That is a silent bug and it
 * has happened here before. A missing case is now a type error at build time,
 * which is the same rule `CompetitorDemoVisual` already follows.
 */
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
    case "inspections":
      return <MaintenanceLiveDemo />;
    case "reports":
      return <ReportsLiveDemo />;
    case "utilization":
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
  }
}
