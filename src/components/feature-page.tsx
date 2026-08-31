import Link from "next/link";
import { ArrowRight, Check, ChevronRight, BookOpen } from "lucide-react";
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
import { moduleOf, moduleFeatures, isModuleHub } from "@/lib/modules";
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
 * One template for every feature page, module hub and supporting page alike.
 *
 * What it used to be: a hero, a grid of ticked boxes, and a footer CTA. That is a
 * specification sheet, and it is the wrong document. Somebody who searched
 * "flight school billing software" and landed here has already decided they want
 * the category; what they are weighing is whether their Tuesday gets better, and
 * a list of capabilities does not answer that.
 *
 * So the order of the page is the order of that decision:
 *
 *   what changes for you   (outcomes, first, because it is the only question)
 *   what it looks like     (the running demo in the hero)
 *   how it actually works  (four steps, in operator vocabulary)
 *   the detail underneath  (deep sections, for the reader who is now convinced)
 *   what you get           (the capability list, demoted to reference)
 *   the honest answers     (FAQ, which also ships FAQPage structured data)
 *
 * Every block below `outcomes` is optional and renders only when the feature has
 * content for it in `lib/feature-landing.ts`, so a page is never padded with an
 * empty heading. There are four calls to action down the page rather than one at
 * the bottom, because the reader who is sold at "how it works" should not have to
 * scroll past the FAQ to act on it.
 */
export function FeaturePage({ feature }: { feature: Feature }) {
  const landing = FEATURE_LANDING[feature.slug];
  const productModule = moduleOf(feature.slug);
  const isHub = isModuleHub(feature.slug);

  const related = feature.related.map((slug) => FEATURES[slug]).filter(Boolean);

  //Resolved by href rather than duplicated on the feature, so a guide can be retitled in one
  //place. `filter(Boolean)` because a guide that has been removed should vanish from here
  //rather than render an empty card pointing at a 404.
  const guides = (feature.guides ?? [])
    .map((href) => RESOURCE_LINKS.find((link) => link.href === href))
    .filter((link): link is (typeof RESOURCE_LINKS)[number] => link != null);

  // Help articles, resolved against the docs registry the same way, so a
  // renamed article cannot leave a stale title on a marketing page and a
  // deleted one degrades to silence rather than a 404.
  const docs = (landing?.docs ?? [])
    .map((href) => {
      const found = allArticles().find((entry) => entry.href === href);
      if (!found) return null;
      return {
        href,
        label: found.article.title,
        description: found.article.description,
      };
    })
    .filter((link): link is { href: string; label: string; description: string } =>
      link != null
    );

  // Siblings inside the same module, for the reader who landed deep from a
  // search and has no idea the other four pages exist.
  const siblings = productModule
    ? moduleFeatures(productModule)
        .filter((slug) => slug !== feature.slug)
        .map((slug) => FEATURES[slug])
    : [];

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

            {/* The eyebrow names the module rather than repeating the page
                title. On a supporting page it is a link, so somebody who
                arrived from a long-tail search can climb up to the hub instead
                of bouncing back to the results. */}
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
            <p className="mt-4 max-w-2xl text-xl font-medium leading-snug tracking-tight text-brand-surface/80">
              {feature.headline}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
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

            {/* The three objections a shopper raises before they read a word of
                the page: what does it cost, do I have to talk to anyone, and
                can I back out. Answering them in the hero is why the compare
                pages convert, and it costs one line. */}
            <p className="mt-4 text-sm text-muted-foreground">
              ${PRICE_PER_AIRCRAFT}/aircraft/mo · {TRIAL_DAYS}-day trial · No credit
              card · No sales call
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Built for {feature.personas.join(" · ")}
            </p>
          </div>

          <div className="mt-12 flex min-w-0 justify-center lg:mt-0">
            <FeatureVisual slug={feature.slug} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Proof strip                                                      */}
      {/* ---------------------------------------------------------------- */}
      {landing?.proof && landing.proof.length > 0 && (
        <section className="border-b border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {landing.proof.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-semibold tracking-tight text-brand-surface">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Outcomes. The reason the page exists.                            */}
      {/* ---------------------------------------------------------------- */}
      {landing && landing.outcomes.length > 0 && (
        <section className="bg-[#fafbfc]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">
                {landing.outcomesEyebrow ?? "What changes"}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                {landing.outcomesTitle}
              </h2>
              {landing.outcomesIntro && (
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {landing.outcomesIntro}
                </p>
              )}
            </Reveal>

            <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {landing.outcomes.map((outcome) => (
                <div
                  key={outcome.title}
                  className="rounded-2xl border border-border bg-white p-6 shadow-sm"
                >
                  <p className="font-semibold leading-snug text-foreground">
                    {outcome.title}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {outcome.body}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                     */}
      {/* ---------------------------------------------------------------- */}
      {landing?.steps && landing.steps.length > 0 && (
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                {landing.stepsTitle ?? "Start to finish"}
              </h2>
            </Reveal>
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {landing.steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="mt-4 font-semibold text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Mid-page CTA. The reader who is sold by "how it works" should not */}
      {/* have to scroll past the FAQ to act on it.                        */}
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
              <Button
                href={cta}
                size="lg"
                className="bg-white text-brand-surface hover:bg-white/90"
              >
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
      {/* Deep sections                                                    */}
      {/* ---------------------------------------------------------------- */}
      {landing?.sections && landing.sections.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-20 lg:py-20">
            {landing.sections.map((section) => (
              <Reveal
                key={section.title}
                className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {section.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-brand-surface">
                    {section.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </div>
                <ul className="grid gap-3 self-center sm:grid-cols-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 rounded-xl border border-border bg-[#fafbfc] p-4"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Capability list. Demoted to reference: it answers "is the thing I */}
      {/* need in here", which is a checking question, not a buying one.    */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            {landing?.bulletsTitle ?? "Everything you get"}
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {feature.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-1 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          {siblings.length > 0 && productModule && (
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {isHub
                  ? `More in ${productModule.title}`
                  : `The rest of ${productModule.title}`}
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={featureHref(sibling.slug)}
                    className="group rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/30"
                  >
                    <p className="font-semibold text-foreground group-hover:text-primary">
                      {sibling.navLabel}
                    </p>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {sibling.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Go deeper: guides for the shopper, help docs for the evaluator    */}
      {/* ---------------------------------------------------------------- */}
      {(guides.length > 0 || docs.length > 0) && (
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            {guides.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
                  Go deeper
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              </>
            )}

            {/* The documentation is the strongest thing this site can show a
                prospect who is genuinely evaluating: it is written to the real
                screens and it does not sell. Linking it from the feature page
                is the cheapest proof available that the feature exists. */}
            {docs.length > 0 && (
              <div className={guides.length > 0 ? "mt-14" : ""}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="inline-flex items-center gap-2 text-2xl font-semibold tracking-tight text-brand-surface">
                    <BookOpen className="size-5 text-primary" aria-hidden />
                    How it works, in the documentation
                  </h2>
                  {productModule && (
                    <Link
                      href={`/docs/${productModule.docsSection}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      All {productModule.title.toLowerCase()} docs
                      <ChevronRight className="size-3.5" />
                    </Link>
                  )}
                </div>
                <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {docs.map((doc) => (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      className="group flex items-start gap-2.5"
                    >
                      <ArrowRight className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden />
                      <span>
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                          {doc.label}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                          {doc.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                              */}
      {/* ---------------------------------------------------------------- */}
      {faqs.length > 0 && (
        <section className="border-t border-border bg-[#fafbfc]">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 id="faq" className="text-3xl font-semibold tracking-tight text-brand-surface">
              Common questions
            </h2>
            <dl className="mt-8 divide-y divide-border">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="font-semibold text-foreground">{faq.q}</dt>
                  <dd className="mt-2 leading-relaxed text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Related features                                                 */}
      {/* ---------------------------------------------------------------- */}
      {related.length > 0 && (
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              Works with
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((f) => (
                <Link
                  key={f.slug}
                  href={featureHref(f.slug)}
                  className="rounded-xl border border-border bg-[#fafbfc] p-5 transition-colors hover:border-primary/30 hover:bg-white"
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
              <Button
                href={cta}
                size="lg"
                className="bg-white text-brand-surface hover:bg-white/90"
              >
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
