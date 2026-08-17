import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AerScheduler vs Flight Circle",
  description: `Compare ${SITE_NAME} and Flight Circle for flight schools: self-serve setup, $${PRICE_PER_AIRCRAFT}/mo per aircraft with unlimited users, dispatch that closes out into an invoice, and a native app.`,
  alternates: { canonical: "/compare/flight-circle" },
  openGraph: {
    title: "AerScheduler vs Flight Circle",
    description:
      "Self-serve setup, per-aircraft pricing, and the whole day in one system.",
    url: "/compare/flight-circle",
  },
};

/**
 * Rows are ordered so the operational side comes first.
 *
 * An earlier version of this page led with training records and spent most of
 * its length there, which meant arguing on the ground Flight Circle is
 * strongest on, using the newest module we have built. Training is off this
 * page entirely now. It is compared on `/features/training` for anyone who goes
 * looking, and this page competes where the product is proven in daily use.
 *
 * Third-column claims have to be defensible from their own public pages.
 * "Not published" means we could not confirm it, not that it is missing.
 */
const ROWS: [string, string, string][] = [
  [
    "Getting started",
    "Self-serve signup. On the schedule the same day.",
    "Account setup with the vendor",
  ],
  [
    "Pricing",
    `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Unlimited users. Simulators and classrooms free.`,
    "Quoted per school",
  ],
  [
    "Dispatch board",
    "Lane views across aircraft, simulators and rooms, with conflict-aware booking and a live front-desk view.",
    "Scheduling calendar",
  ],
  [
    "Closing out a flight",
    "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
    "Available",
  ],
  [
    "Several people on one flight",
    "Built in. Split per head, by logged time, or in set shares. One invoice each.",
    "Not published",
  ],
  [
    "Multi-day trips",
    "One reservation across nights, with a per-night minimum set per tail.",
    "Not published",
  ],
  [
    "Maintenance",
    "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
    "Available",
  ],
  [
    "Mobile",
    "Native iOS app for the whole team. Book, dispatch and close out from the ramp.",
    "Mobile access",
  ],
  [
    "Integrations",
    "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
    "Available",
  ],
];

const REASONS = [
  "You want to be dispatching this week, without a sales call",
  `Predictable cost: $${PRICE_PER_AIRCRAFT} per aircraft, every user included, sims and rooms free`,
  "The schedule, the invoice and the maintenance record should be one system",
  "Your instructors and renters will actually open the app on the ramp",
];

/**
 * Proof points, deliberately drawn from what schools run every day rather than
 * from the newest module.
 */
const PROOFS = [
  {
    title: "The day ends with the invoices already drafted",
    body: "Ramp out, fly, ramp in with Hobbs, tach and fuel. The rates are already on the tail, so the invoice is drafted before the aircraft is tied down. Nobody spends the evening reconciling the schedule against the billing.",
    href: "/features/billing",
    label: "Billing",
  },
  {
    title: "One reservation can hold several people, and several invoices",
    body: "A ground-school class, two pilots sharing a cross-country, a checkride with an examiner. Split the cost per head, by logged time, or in shares you set, and everyone gets their own invoice.",
    href: "/features/scheduling",
    label: "Scheduling & Dispatch",
  },
  {
    title: "Simulators and classrooms cost nothing to schedule",
    body: `They are first-class resources on the board, bookable like any tail, and they never appear on your bill. You pay $${PRICE_PER_AIRCRAFT} per aircraft and nothing else, however many people you invite.`,
    href: "/pricing",
    label: "Pricing",
  },
  {
    title: "The tail goes out on Friday and comes back Sunday",
    body: "Multi-day trips are one reservation across nights, with an overnight minimum you set per aircraft or school-wide, so a weekend rental does not need a manual invoice and a mental note.",
    href: "/resources/overnight-and-multi-day-rentals",
    label: "Multi-day rentals",
  },
];

export default function CompareFlightCirclePage() {
  return (
    <article className="border-b border-border">
      <div className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "vs Flight Circle", href: "/compare/flight-circle" },
            ]}
          />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            AerScheduler vs Flight Circle
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Both products run a flight school&apos;s schedule. What schools tell
            us decides it is the rest of the day: how quickly you can start, what
            it costs as you add aircraft, and whether dispatch, billing and
            maintenance live in one place or three.
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
            <span>Flight Circle</span>
          </div>
          {ROWS.map(([topic, aer, fc]) => (
            <div
              key={topic}
              className="grid grid-cols-[0.9fr_1.1fr_1.1fr] gap-3 border-b border-border px-4 py-4 text-sm last:border-b-0 sm:px-6"
            >
              <span className="font-medium text-foreground">{topic}</span>
              <span className="text-foreground">{aer}</span>
              <span className="text-muted-foreground">{fc}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Flight Circle is a trademark of its owner. Rows describe what each
          product publishes; &ldquo;not published&rdquo; means we could not
          confirm it, not that it is absent.
        </p>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          What running the day looks like
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {PROOFS.map((p) => (
            <div key={p.title} className="rounded-xl border border-border p-6">
              <p className="text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <Link
                href={p.href}
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                {p.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Deliberately short and non-specific. A comparison page with no losing
            rows is not believed, but these are scope limits rather than an
            endorsement of anything the other product does well. */}
        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          When we may not be the right fit
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            You want ground-school courseware, video, reading and quizzes, inside
            the same tool. We do not build it, and link out to Sporty&apos;s,
            King or Gleim instead
          </li>
          <li>
            You already run a large deployment elsewhere and moving it would cost
            more than it saves
          </li>
          <li>You need a workflow or integration we do not cover yet</li>
        </ul>

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
            {" · "}
            <Link
              href="/compare/flight-schedule-pro"
              className="text-primary hover:underline"
            >
              vs Flight Schedule Pro
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
