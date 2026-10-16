import Link from "next/link";
import { Check, ChevronRight, PlayCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { FeatureSection } from "@/components/landing/feature-sections";
import {
  HOME_SECTIONS,
  HeroWindow,
  MobileAppCard,
  PriceStatement,
  PricingBand,
  ShortQuote,
  TESTIMONIALS,
} from "@/components/landing/home-blocks";
import { JsonLd } from "@/components/json-ld";
import { Reveal, RevealGroup } from "@/components/reveal";
import {
  competitorHref,
  otherCompetitors,
  COMPETITOR_FAQS,
  SWITCH_OFFER,
  type Competitor,
} from "@/lib/competitors";
import { faqJsonLd } from "@/lib/seo";
import { DEMO_URL, PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

/**
 * One renderer for every competitor comparison page.
 *
 * The content lives in `lib/competitors.ts`; this file owns only the layout, so
 * a change to the argument is made once rather than seven times.
 *
 * Rebuilt 2026-10-16 to read like the home page (Tony: "make it feel like a home
 * page ... and really sell what our platform can do"). It is built from the home
 * page's own blocks (`components/landing/home-blocks.tsx`), so the two cannot
 * drift apart. Order, and why:
 *
 * 1. Hero: "AerScheduler vs X" in the pill, the alternative headline, the trial
 *    buttons, then the same product window as the home page.
 * 2. Why schools move, plus the customer quote. About half of home page visitors
 *    reach the second screen, so the reasons and the proof go there.
 * 3. The side-by-side table, while the visitor is still comparing.
 * 4. The home page's feature sections, without Training: `competitors.ts` rule 2
 *    keeps training off every comparison page.
 * 5. The price statement, the proof points, the mobile app card.
 * 6. How the move works, the FAQ and the honest "not a fit", then the pricing
 *    band with the full quote and the other comparisons.
 *
 * The living demos that used to sit under the hero were dropped with this
 * rebuild; the hero window shows the product instead, and the sandbox is one
 * button away.
 */

const COMPARE_SECTIONS = HOME_SECTIONS.filter((s) => s.id !== "training");

/** Fills `{name}` in the shared switching copy. */
const withName = (text: string, name: string) => text.replace(/\{name\}/g, name);

export function ComparePage({ competitor }: { competitor: Competitor }) {
  const others = otherCompetitors(competitor.slug);
  const faqs = COMPETITOR_FAQS[competitor.slug];
  const quote = TESTIMONIALS[0];

  return (
    <article className="bg-white text-[#0b0b0d]">
      {/* FAQPage only. `Breadcrumbs` already emits its own BreadcrumbList, and
          adding breadcrumbJsonLd here would ship the page two of them. */}
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero, in the home page's shape. Somebody who searched a rival by name
          has already decided they want software, so the buttons sit directly
          under the promise. */}
      <section className="relative isolate overflow-hidden">
        <div
          className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-8 text-center sm:px-6 lg:pt-10">
          <Breadcrumbs
            className="flex justify-center"
            items={[
              { name: "Resources", href: "/resources" },
              { name: competitor.navLabel, href: competitorHref(competitor.slug) },
            ]}
          />
          <h1 className="animate-fade-up mt-10 lg:mt-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm sm:text-sm">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {SITE_NAME} vs {competitor.name}
            </span>
            <span className="sr-only">: </span>
            <span className="mx-auto mt-6 block max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0b0b0d] sm:text-6xl lg:text-[5rem]">
              {competitor.heroHeadline}
            </span>
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl">
            Scheduling, billing, maintenance tracking and reporting in one
            system, with iOS and Android apps. ${PRICE_PER_AIRCRAFT} per
            aircraft with every instructor, student and renter included, and
            you can start today without a demo call.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href={DEMO_URL} size="lg" variant="secondary">
              <PlayCircle className="size-4 opacity-80" />
              Try the live demo
            </Button>
          </div>
          <p className="animate-fade-up-delay-3 mt-4 text-sm text-black/45">
            {TRIAL_DAYS}-day free trial · Cancel anytime · No sales call
          </p>
        </div>
        <HeroWindow />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" aria-hidden />
      </section>

      {/* Why schools move, in the home page's audience strip, with the customer
          quote under it. */}
      <section aria-labelledby="compare-reasons-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2
            id="compare-reasons-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40"
          >
            Why schools move from {competitor.name}
          </h2>
          <RevealGroup className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {competitor.reasons.map((reason, i) => (
              <p
                key={reason}
                className={`relative text-lg font-semibold leading-snug tracking-tight text-[#0b0b0d] lg:px-6 lg:first:pl-0 ${
                  i > 0
                    ? "lg:before:absolute lg:before:inset-y-1 lg:before:left-0 lg:before:w-px lg:before:bg-black/10"
                    : ""
                }`}
              >
                {reason}
              </p>
            ))}
          </RevealGroup>
          {quote && <ShortQuote t={quote} />}
        </div>
      </section>

      {/* Side by side, while the visitor is still comparing. Each row stacks on
          a phone, with the product named over each cell, rather than scrolling
          sideways. */}
      <section aria-labelledby="compare-table-heading" className="overflow-x-clip">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-20">
          <Reveal className="grid gap-6 md:grid-cols-2 md:gap-16">
            <h2
              id="compare-table-heading"
              className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#0b0b0d] sm:text-5xl lg:text-[3.5rem]"
            >
              Side by side{" "}<br />with {competitor.name}
            </h2>
            <p className="text-lg leading-relaxed text-black/60 sm:text-xl md:pt-2">
              What each product says it does. Where {competitor.name} does not
              publish something, the row says so rather than guessing.
            </p>
          </Reveal>

          {/* Our column sits on a faint tinted band (md and up). The band is
              positioned from the same 0.8 / 1.2 / 1.2 track sizes and 2rem gaps
              as the rows, widened by 1rem each side so the text has room. */}
          <Reveal className="relative mt-14 lg:mt-16">
            <div
              className="pointer-events-none absolute -top-4 bottom-12 hidden rounded-2xl bg-primary/[0.045] md:block"
              style={{
                left: "calc((100% - 4rem) * 0.25 + 1rem)",
                width: "calc((100% - 4rem) * 0.375 + 2rem)",
              }}
              aria-hidden
            />
            <div className="relative hidden grid-cols-[0.8fr_1.2fr_1.2fr] gap-8 pb-4 text-[13px] font-semibold uppercase tracking-[0.12em] md:grid">
              <span className="text-black/35">&nbsp;</span>
              <span className="flex items-center gap-2 text-primary">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {SITE_NAME}
              </span>
              <span className="text-black/40">{competitor.name}</span>
            </div>
            <dl className="relative">
              {competitor.rows.map(([topic, ours, theirs]) => (
                <div
                  key={topic}
                  className="grid gap-3 border-t border-black/[0.08] py-6 md:grid-cols-[0.8fr_1.2fr_1.2fr] md:gap-8"
                >
                  <dt className="text-[15px] font-semibold text-[#0b0b0d]">{topic}</dt>
                  <dd className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#0b0b0d]">
                    <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                    <span>
                      <span className="mr-1.5 font-semibold text-primary md:hidden">{SITE_NAME}:</span>
                      {ours}
                    </span>
                  </dd>
                  <dd className="text-[15px] leading-relaxed text-black/50 md:pl-0 pl-[26px]">
                    <span className="mr-1.5 font-semibold text-black/60 md:hidden">{competitor.name}:</span>
                    {theirs}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="relative border-t border-black/[0.08] pt-5 text-xs leading-relaxed text-black/40">
              {competitor.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* What the platform does, as the home page tells it. */}
      <div className="flex flex-col">
        {COMPARE_SECTIONS.map((section) => (
          <FeatureSection key={section.id} section={section} />
        ))}
      </div>

      <PriceStatement id="compare-price-statement" />

      {/* The page's own argument, as three to five plain points rather than
          cards. */}
      <section aria-labelledby="compare-proofs-heading">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
          <Reveal>
            <h2
              id="compare-proofs-heading"
              className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#0b0b0d] sm:text-5xl"
            >
              {competitor.proofsTitle}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {competitor.proofs.map((proof) => (
              <div key={proof.title} className="border-t border-black/[0.08] pt-6">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#0b0b0d]">
                  {proof.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/55">{proof.body}</p>
                <Link
                  href={proof.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-[15px] text-black/60 hover:text-[#0b0b0d]"
                >
                  {proof.label} <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <MobileAppCard />

      {/* The move itself. On a comparison page the objection is rarely "is it
          different" and usually "is moving worth the disruption". */}
      <section aria-labelledby="compare-switch-heading">
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
          <Reveal className="grid gap-6 md:grid-cols-2 md:gap-16">
            <h2
              id="compare-switch-heading"
              className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[#0b0b0d] sm:text-5xl lg:text-[3.5rem]"
            >
              {withName(SWITCH_OFFER.title, competitor.name)}
            </h2>
            <p className="text-lg leading-relaxed text-black/60 sm:text-xl md:pt-2">
              {competitor.intro}
            </p>
          </Reveal>
          <RevealGroup className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {SWITCH_OFFER.items.map((item, i) => (
              <div key={item.title} className="border-t border-black/[0.08] pt-6">
                <p className="text-sm font-semibold tabular-nums text-primary">0{i + 1}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-[#0b0b0d]">
                  {withName(item.title, competitor.name)}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/55">
                  {withName(item.body, competitor.name)}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Answers the question people actually typed, and emits FAQPage
          structured data. Beside it, the honest list: a comparison page with no
          losing rows is not believed by anyone who has read one before. */}
      <section aria-labelledby="faq">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16 lg:pb-28">
          <div>
            <h2
              id="faq"
              className="text-3xl font-medium tracking-[-0.03em] text-[#0b0b0d] sm:text-4xl"
            >
              Common questions
            </h2>
            <dl className="mt-8">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-t border-black/[0.08] py-6">
                  <dt className="text-lg font-semibold tracking-tight text-[#0b0b0d]">{faq.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-black/55">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="self-start rounded-[28px] border border-black/[0.05] bg-[#f5f7fa] p-8 lg:mt-[72px]">
            <h2 className="text-lg font-semibold tracking-tight text-[#0b0b0d]">
              {competitor.notFitTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {competitor.notFit.map((item) => (
                <li key={item} className="text-[15px] leading-relaxed text-black/55">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The close: the price, the trial, the full quote. Somebody comparing one
          product is usually comparing three, so the other pages are handed over
          here rather than through a search result. */}
      <PricingBand headingId="compare-pricing-heading">
        <div className="mt-8">
          <p className="text-sm font-semibold text-white">Comparing a few others?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={competitorHref(other.slug)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
              >
                {other.navLabel}
              </Link>
            ))}
            <Link
              href="/migrating/my-fbo"
              className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
            >
              Migrating from MyFBO
            </Link>
          </div>
        </div>
      </PricingBand>
    </article>
  );
}
