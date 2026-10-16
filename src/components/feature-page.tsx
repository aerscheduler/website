import Link from "next/link";
import Image from "next/image";
import { Check, ChevronRight, PlayCircle } from "lucide-react";
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
  WorkOrdersLiveDemo,
} from "@/components/mocks/living";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PricingBand, ShortQuote, TESTIMONIALS } from "@/components/landing/home-blocks";
import { SkyScrim } from "@/components/sky-scrim";
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
  "work-orders": "shop",
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
  const quote = TESTIMONIALS[0];

  return (
    <div className="bg-white text-[#0b0b0d]">
      {/* FAQPage only. `Breadcrumbs` emits its own BreadcrumbList, and adding
          one here would ship the page two of them. */}
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      {/* Hero: split, the claim on the left and the running preview on the right. */}
      <section className="relative isolate overflow-hidden">
        <div
          className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pb-24 lg:pt-10">
          <Breadcrumbs
            items={[
              { name: "Features", href: "/features" },
              { name: feature.navLabel, href: featureHref(feature.slug) },
            ]}
          />
          <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[0.95fr_1.15fr] lg:gap-12">
            <div>
              {productModule && !isHub ? (
                <Link
                  href={featureHref(productModule.hub)}
                  className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm hover:border-black/20 sm:text-sm"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {productModule.title}
                  <ChevronRight className="size-3.5 opacity-60" />
                </Link>
              ) : (
                <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm sm:text-sm">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {productModule ? `${productModule.title} module` : feature.eyebrow}
                </p>
              )}
              <h1 className="animate-fade-up mt-6 text-balance text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
                {landing?.h1 ?? feature.title}
              </h1>
              <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl">
                {feature.summary}
              </p>
              <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <Button href={cta} size="lg">
                  Start free trial
                  <ChevronRight className="size-4 opacity-80" />
                </Button>
                <Button href={DEMO_URL} variant="secondary" size="lg">
                  <PlayCircle className="size-4 opacity-80" />
                  Try the live demo
                </Button>
              </div>
              <p className="animate-fade-up-delay-3 mt-4 text-sm text-black/45">
                ${PRICE_PER_AIRCRAFT}/aircraft/mo · {TRIAL_DAYS}-day free trial · Cancel anytime · No
                sales call
              </p>
            </div>
            <div className="animate-fade-up-delay-3 flex min-w-0 justify-center">
              <FeatureVisual slug={feature.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* The statement and its three proofs over the module's photograph (each
          module carries one, `ModulePhoto` in lib/modules.ts), set as a contained
          card like the home page's app card, then the customer quote. */}
      {landing && (
        <section aria-labelledby="feature-statement">
          <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
            <Reveal
              as="div"
              className="relative isolate overflow-hidden rounded-[28px] bg-brand-surface shadow-[0_40px_80px_-40px_rgba(16,35,63,0.55)]"
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 1232px, 100vw" quality={60} className="object-cover" />
              <SkyScrim />
              <div className="relative px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
                <h2
                  id="feature-statement"
                  className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl"
                >
                  {landing.statement}
                </h2>
                <dl className="mt-12 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-3">
                  {landing.proof.map((item) => (
                    <div key={item.label} className="border-t border-white/15 pt-4">
                      <dt className="text-lg font-semibold tracking-tight text-white">{item.value}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-white/65">{item.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            {quote && <ShortQuote t={quote} />}
          </div>
        </section>
      )}

      {/* Outcomes: three, numbered, behind faint rules. */}
      {landing && (
        <section aria-labelledby="feature-outcomes">
          <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:pb-32">
            <Reveal>
              <h2
                id="feature-outcomes"
                className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]"
              >
                {landing.outcomesTitle}
              </h2>
            </Reveal>
            <RevealGroup className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
              {landing.outcomes.map((outcome, index) => (
                <div key={outcome.title} className="border-t border-black/[0.08] pt-6">
                  <p className="text-sm font-semibold tabular-nums text-primary" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">{outcome.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/55">{outcome.body}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* How it works, as a timeline inside the home page's tinted panel. */}
      {landing?.steps && landing.steps.length > 0 && (
        <section aria-labelledby="feature-steps" className="overflow-x-clip px-2 sm:px-4">
          <div
            className="mx-auto max-w-[1400px] rounded-[28px] border border-black/[0.05] lg:rounded-[40px]"
            style={{
              background:
                "radial-gradient(60% 50% at 80% 0%, color-mix(in srgb, #3b6fe0 9%, transparent), transparent 70%), #f5f7fa",
            }}
          >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
              <Reveal>
                <p className="text-[15px] text-black/45">How it works</p>
                <h2
                  id="feature-steps"
                  className="mt-3 text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl"
                >
                  {landing.stepsTitle ?? "Start to finish"}
                </h2>
              </Reveal>
              <RevealGroup className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {landing.steps.map((step, index) => (
                  <div key={step.title} className="relative">
                    {/* The rule joins the steps into a sequence; hidden on the last
                        one and on narrow screens, where the steps stack. */}
                    {index < landing.steps!.length - 1 && (
                      <span className="absolute left-10 right-0 top-4 hidden h-px bg-black/10 lg:block" aria-hidden />
                    )}
                    <span className="relative inline-flex size-8 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold text-primary shadow-sm">
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-black/55">{step.body}</p>
                  </div>
                ))}
              </RevealGroup>
            </div>
          </div>
        </section>
      )}

      {/* Spotlights: at most two, in the home page's split shape. */}
      {landing?.sections && landing.sections.length > 0 && (
        <div className="mx-auto max-w-7xl space-y-24 px-4 pt-28 sm:px-6 lg:space-y-32 lg:pt-36">
          {landing.sections.map((section) => (
            <Reveal as="section" key={section.title} className="grid gap-6 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-[15px] text-black/45">{section.eyebrow}</p>
                <h2 className="mt-3 text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                  {section.title}
                </h2>
              </div>
              <div className="md:pt-9">
                <p className="text-lg leading-relaxed text-black/60 sm:text-xl">{section.body}</p>
                <ul className="mt-8 space-y-3 border-t border-black/[0.08] pt-6">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[15px] text-black/70">
                      <Check className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* The rest of the capability list, plain, then the help articles. It
          answers "is the thing I need in here", a checking question. */}
      <section aria-labelledby="feature-everything">
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-36">
          <div className="border-t border-black/[0.06] pt-8">
            <h2 id="feature-everything" className="text-[15px] text-black/45">
              {landing?.bulletsTitle ?? "Everything else in here"}
            </h2>
            <ul className="mt-6 columns-1 gap-x-12 sm:columns-2 lg:columns-3">
              {feature.bullets.map((item) => (
                <li key={item} className="mb-3 flex break-inside-avoid items-start gap-2.5 text-[15px] leading-relaxed text-black/60">
                  <span className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-black/30" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {(docs.length > 0 || guides.length > 0) && (
            <div className="mt-12 grid gap-y-4 border-t border-black/[0.06] pt-8 md:grid-cols-[1fr_2fr]">
              <p className="text-[15px] text-black/45">Read more</p>
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {[...guides.map((g) => ({ href: g.href, label: g.label })), ...docs].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group inline-flex items-center gap-2 text-[15px] text-black/60 hover:text-[#0b0b0d]">
                      {link.label}
                      <span className="text-black/35 transition-transform group-hover:translate-x-0.5">+</span>
                    </Link>
                  </li>
                ))}
                {productModule && (
                  <li>
                    <Link
                      href={`/docs/${productModule.docsSection}`}
                      className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary hover:underline"
                    >
                      All {productModule.title.toLowerCase()} docs <span aria-hidden>→</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* A light call to action between the reference material and the FAQ. */}
      {landing && (
        <section aria-labelledby="feature-cta">
          <Reveal className="mx-auto max-w-3xl px-4 pt-28 text-center sm:px-6 lg:pt-36">
            <h2 id="feature-cta" className="text-balance text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              {landing.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-black/55">{landing.ctaBody}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={cta} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href={DEMO_URL} variant="secondary" size="lg">
                <PlayCircle className="size-4 opacity-80" />
                Try the live demo
              </Button>
            </div>
          </Reveal>
        </section>
      )}

      {/* FAQ, two columns behind faint rules, so five answers are not five screens. */}
      {faqs.length > 0 && (
        <section aria-labelledby="faq">
          <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-36">
            <h2 id="faq" className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              Common questions
            </h2>
            <dl className="mt-8 grid gap-x-14 lg:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-t border-black/[0.08] py-6">
                  <dt className="text-lg font-semibold tracking-tight">{faq.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-black/55">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* More in this module: the home page's Features row of links. */}
      {explore.length > 0 && (
        <section aria-labelledby="feature-more">
          <div className="mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 lg:pb-36">
            <div className="grid gap-y-4 border-t border-black/[0.06] pt-8 md:grid-cols-[1fr_2fr]">
              <h2 id="feature-more" className="text-[15px] text-black/45">
                {productModule ? `More in ${productModule.title}` : "Explore more"}
              </h2>
              <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {explore.map((f) => (
                  <li key={f.slug}>
                    <Link href={featureHref(f.slug)} className="group inline-flex items-center gap-2 text-[15px] text-black/60 hover:text-[#0b0b0d]">
                      {f.navLabel}
                      <span className="text-black/35 transition-transform group-hover:translate-x-0.5">+</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <PricingBand headingId="feature-pricing-heading" />
    </div>
  );
}

/**
 * The running preview in the hero.
 *
 * Exhaustive on purpose, with no `default:`. The old version fell back to the
 * dispatch board, which meant a new feature slug shipped a page whose copy talked
 * about invoices while the picture showed a schedule. That is a silent bug and it
 * has happened here before. A missing case is now a type error at build time.
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
    case "work-orders":
      return <WorkOrdersLiveDemo />;
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
