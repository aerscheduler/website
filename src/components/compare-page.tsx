import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import {
  SchedulingLiveDemo,
  BillingLiveDemo,
  MaintenanceLiveDemo,
  PeopleLiveDemo,
  ReportsLiveDemo,
  SelfBookingLiveDemo,
  MembershipsLiveDemo,
} from "@/components/mocks/living";
import { JsonLd } from "@/components/json-ld";
import {
  competitorHref,
  otherCompetitors,
  COMPETITOR_FAQS,
  SWITCH_OFFER,
  type Competitor,
  type CompetitorDemo,
} from "@/lib/competitors";
import { faqJsonLd } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

/**
 * One renderer for every competitor comparison page.
 *
 * The content lives in `lib/competitors.ts`; this file owns only the layout, so
 * a change to the argument is made once rather than seven times. Same reasoning
 * as `FeaturePage`.
 *
 * Page order is deliberate and comes from how paid traffic behaves. The offer and
 * the CTA are above the fold because the visitor arrived mid-decision from an ad.
 * The running product comes second, before any prose, because a comparison table
 * written by one of the two vendors is worth less than thirty seconds of watching
 * the thing work.
 */

/**
 * Each page runs a different demo, chosen to match what that page argues.
 *
 * No `default:` case. The union is closed and exhaustive, so adding a demo kind
 * without wiring it here is a type error rather than a page that silently shows
 * a dispatch board while the copy talks about invoices. `FeatureVisual` has that
 * silent fallback and it has caused exactly this bug before.
 */
function CompetitorDemoVisual({ demo }: { demo: CompetitorDemo }) {
  switch (demo) {
    case "scheduling":
      return <SchedulingLiveDemo />;
    case "billing":
      return <BillingLiveDemo />;
    case "maintenance":
      return <MaintenanceLiveDemo />;
    case "people":
      return <PeopleLiveDemo />;
    case "reports":
      return <ReportsLiveDemo />;
    case "self-booking":
      return <SelfBookingLiveDemo />;
    case "memberships":
      return <MembershipsLiveDemo />;
  }
}

export function ComparePage({ competitor }: { competitor: Competitor }) {
  const others = otherCompetitors(competitor.slug);
  const faqs = COMPETITOR_FAQS[competitor.slug];

  return (
    <article className="border-b border-border">
      {/* FAQPage only. `Breadcrumbs` already emits its own BreadcrumbList, and
          adding breadcrumbJsonLd here would ship the page two of them. */}
      <JsonLd data={faqJsonLd(faqs)} />
      {/* Hero. Paid traffic arrives here from a "thinking of switching" ad, so the
          offer and the CTA are above the fold rather than under a thousand words. */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              {
                name: competitor.navLabel,
                href: competitorHref(competitor.slug),
              },
            ]}
          />
          <p className="mt-6 text-sm font-semibold text-primary">
            {SITE_NAME} vs {competitor.name}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            {competitor.heroHeadline}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {competitor.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              See the live demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            ${PRICE_PER_AIRCRAFT}/aircraft/mo · {TRIAL_DAYS}-day trial · No credit
            card · No sales call
          </p>
        </div>
      </div>

      {/* The switching offer, above everything except the hero. On a competitor
          page this outranks the feature argument: somebody who searched a rival
          by name already believes in the software, and is weighing disruption. */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          {/* No icon: it sat to the left of the heading and pushed the heading
              text ~27px off the cards underneath, and no other section on this
              page carries one. */}
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            {SWITCH_OFFER.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {SWITCH_OFFER.intro}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SWITCH_OFFER.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-[#fafbfc] p-6"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item.title.replace(/\{name\}/g, competitor.name)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body.replace(/\{name\}/g, competitor.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* An interactive preview of the interface, before the argument starts.
          It is a mock, not the live app, so nothing here claims otherwise: the
          link underneath sends anyone who wants the real thing to the sandbox. */}
      <section className="border-b border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">Product preview</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-surface sm:text-3xl">
              {competitor.demoTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {competitor.demoBody}
            </p>
          </div>
          {/* `AppMockShell` is `w-full max-w-[720px]`, so dropping it straight
              into this 1280px container left it hard against the left edge:
              `justify-center` centres a flex child, and the child was full
              width. Constraining the wrapper to the shell's own max width and
              centring the wrapper is what actually puts it in the middle. */}
          <div className="mx-auto mt-10 w-full min-w-0 max-w-[720px]">
            <CompetitorDemoVisual demo={competitor.demo} />
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Want to drive the real thing?{" "}
            <Link href="/demo" className="text-primary hover:underline">
              Open the live sandbox
            </Link>
            , no signup required.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        {/* The short answer, before the table. Most readers decide here. */}
        <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
          Why schools move
        </h2>
        <ul className="mt-6 space-y-3">
          {competitor.reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-foreground">
                {reason}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          {competitor.proofsTitle}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {competitor.proofs.map((proof) => (
            <div key={proof.title} className="rounded-xl border border-border p-6">
              <p className="text-sm font-semibold text-foreground">
                {proof.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {proof.body}
              </p>
              <Link
                href={proof.href}
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                {proof.label}
              </Link>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          Side-by-side
        </h2>
        {/* Scrolls inside itself on a narrow screen rather than pushing the page
            sideways. Three columns of prose do not fit a phone. */}
        <div className="mt-8 overflow-x-auto">
          <div className="min-w-[640px] overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-[0.9fr_1.1fr_1.1fr] border-b border-border bg-muted/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-6">
              <span>Topic</span>
              <span>{SITE_NAME}</span>
              <span>{competitor.name}</span>
            </div>
            {competitor.rows.map(([topic, ours, theirs]) => (
              <div
                key={topic}
                className="grid grid-cols-[0.9fr_1.1fr_1.1fr] gap-3 border-b border-border px-4 py-4 text-sm last:border-b-0 sm:px-6"
              >
                <span className="font-medium text-foreground">{topic}</span>
                <span className="text-foreground">{ours}</span>
                <span className="text-muted-foreground">{theirs}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {competitor.disclaimer}
        </p>

        {/* Kept, and kept honest. A comparison page with no losing rows is not
            believed by anyone who has read one before. */}
        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          {competitor.notFitTitle}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {competitor.notFit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* Answers the question people actually typed, and emits FAQPage
            structured data. These pages already out-rank everything else on the
            site, so the marginal SEO is worth more here than anywhere. */}
        <h2 id="faq" className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          Common questions
        </h2>
        <dl className="mt-4 divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <dt className="font-semibold text-foreground">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 rounded-2xl border border-border bg-[#fafbfc] p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Try {SITE_NAME} on your own fleet
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Add a tail, put a flight on the board, ramp it in and watch the
            invoice draft itself. {TRIAL_DAYS} days, no credit card, no sales
            call.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              Try the live demo
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link href="/pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            {" · "}
            <Link href="/features" className="text-primary hover:underline">
              Features
            </Link>
          </p>
        </div>

        {/* Somebody comparing one product is usually comparing three. Hand them
            the next page rather than making them go back to a search result. */}
        <div className="mt-10">
          <p className="text-sm font-semibold text-foreground">
            Comparing a few others?
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={competitorHref(other.slug)}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {other.navLabel}
              </Link>
            ))}
            <Link
              href="/migrating/my-fbo"
              className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
            >
              Migrating from MyFBO
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
