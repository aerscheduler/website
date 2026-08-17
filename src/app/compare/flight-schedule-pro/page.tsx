import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AerScheduler vs Flight Schedule Pro",
  description: `Compare ${SITE_NAME} and Flight Schedule Pro for flight schools: self-serve setup, $${PRICE_PER_AIRCRAFT}/mo per aircraft with unlimited users, a native app, and flight close-out that drafts the invoice.`,
  alternates: { canonical: "/compare/flight-schedule-pro" },
  openGraph: {
    title: "AerScheduler vs Flight Schedule Pro",
    description:
      "Self-serve vs demo-led. Per-aircraft pricing, unlimited users. Native app included.",
    url: "/compare/flight-schedule-pro",
  },
};

/**
 * Comparison rows.
 *
 * Every claim in the third column has to be defensible from the competitor's own
 * public pages. Where it is not, the row says what WE do and leaves theirs out
 * entirely rather than hedging with "varies by plan". Hedged claims read as
 * uncertainty to a buyer and are no safer legally than saying nothing.
 */
const ROWS: [string, string, string][] = [
  [
    "Getting started",
    "Self-serve signup. On the schedule the same day.",
    "Demo request",
  ],
  [
    "Pricing",
    `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Unlimited users. Simulators and classrooms free.`,
    "Quoted per school",
  ],
  [
    "Several people on one flight",
    "Built in. Split the cost per head, by logged time, or in set shares. One invoice each.",
    "Not published",
  ],
  [
    "Multi-day trips",
    "One reservation across nights, with a per-night minimum per tail.",
    "Not published",
  ],
  [
    "Mobile",
    "Native iOS app. Book, dispatch and close out from the ramp.",
    "iOS app",
  ],
  [
    "Billing",
    "Ramp-in closes the flight and drafts the invoice. Stripe cards and ACH.",
    "Available",
  ],
  [
    "Integrations",
    "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
    "Available",
  ],
];

/** The short answer, before anyone reaches a table. */
const REASONS = [
  "You want to be running this week, without a sales call",
  `Predictable cost: $${PRICE_PER_AIRCRAFT} per aircraft, every user included`,
  "Your instructors will actually open the app on the ramp",
  "You want the schedule, the invoice and the maintenance record to be one system",
];

export default function CompareFspPage() {
  return (
    <article className="border-b border-border">
      {/* Hero. Paid traffic arrives here from a "thinking of switching" ad, so the
          offer and the CTA are above the fold. The old version buried the only
          button under ~1,000 words of essay. */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              {
                name: "vs Flight Schedule Pro",
                href: "/compare/flight-schedule-pro",
              },
            ]}
          />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            AerScheduler vs Flight Schedule Pro
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Flight Schedule Pro is sold through a demo and quoted per school.
            AerScheduler publishes one price, ${PRICE_PER_AIRCRAFT} per aircraft
            with every user included, and you can sign up and dispatch the same
            day. Scheduling, billing and maintenance are one system rather than
            three that have to agree with each other.
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

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        {/* The three-line answer, before the table. Most readers decide here. */}
        <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
          Why schools move
        </h2>
        <ul className="mt-6 space-y-3">
          {REASONS.map((reason) => (
            <li key={reason} className="flex items-start gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-foreground">{reason}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          Side-by-side
        </h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[0.9fr_1.1fr_1.1fr] border-b border-border bg-muted/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-6">
            <span>Topic</span>
            <span>AerScheduler</span>
            <span>Flight Schedule Pro</span>
          </div>
          {ROWS.map(([topic, aer, fsp]) => (
            <div
              key={topic}
              className="grid grid-cols-[0.9fr_1.1fr_1.1fr] gap-3 border-b border-border px-4 py-4 text-sm last:border-b-0 sm:px-6"
            >
              <span className="font-medium text-foreground">{topic}</span>
              <span className="text-foreground">{aer}</span>
              <span className="text-muted-foreground">{fsp}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Flight Schedule Pro is a long-standing product and a trademark of its
          owner. Rows describe what each product publishes; &ldquo;not
          published&rdquo; means we could not confirm it, not that it is absent.
        </p>

        {/* Proof. A comparison page that never shows the product is asking to be
            taken on faith. */}
        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          What the difference looks like
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Everything here is in daily use in real schools. Training is off
              this page entirely: it is the newest thing we have built, and
              arguing about it against an established competitor is a fight
              worth declining on a page we pay to send buyers to. */}
          <div className="rounded-xl border border-border p-6">
            <p className="text-sm font-semibold text-foreground">
              The flight closes itself out into an invoice
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Ramp in with Hobbs, tach and fuel, and the invoice drafts from the
              rates already on the tail. No export, no second system, no evening
              spent reconciling the day&apos;s flying against the schedule.
            </p>
            <Link
              href="/features/billing"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              Billing
            </Link>
          </div>
          <div className="rounded-xl border border-border p-6">
            <p className="text-sm font-semibold text-foreground">
              Simulators and classrooms cost nothing
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              They are first-class resources on the dispatch board, bookable like
              any tail, and they never appear on your bill. You pay per aircraft
              and nothing else.
            </p>
            <Link
              href="/pricing"
              className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Kept, and kept honest. A comparison page with no losing rows is not
            believed by anyone who has read one before. */}
        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          When Flight Schedule Pro may fit better
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            You already run a large deployment and moving it would cost more than
            it saves
          </li>
          <li>You want a guided enterprise rollout with a named account team</li>
          <li>You need a specific workflow or integration we don&apos;t cover yet</li>
        </ul>

        <div className="mt-14 rounded-2xl border border-border bg-[#fafbfc] p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Try {SITE_NAME} free for {TRIAL_DAYS} days
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ${PRICE_PER_AIRCRAFT}/aircraft/mo after the trial · No credit card · No
            sales call
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
            {" · "}
            <Link href="/compare/flight-circle" className="text-primary hover:underline">
              vs Flight Circle
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
