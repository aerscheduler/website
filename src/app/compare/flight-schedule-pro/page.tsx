import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AerScheduler vs Flight Schedule Pro",
  description: `Compare ${SITE_NAME} and Flight Schedule Pro for flight schools: self-serve setup, per-aircraft pricing, native apps, and who each product fits best.`,
  alternates: { canonical: "/compare/flight-schedule-pro" },
  openGraph: {
    title: "AerScheduler vs Flight Schedule Pro",
    description:
      "Self-serve vs demo-led. Per-aircraft pricing. Native apps included.",
    url: "/compare/flight-schedule-pro",
  },
};

const ROWS: [string, string, string][] = [
  [
    "Getting started",
    "Self-serve signup. Book in minutes.",
    "Typically demo / sales-led onboarding",
  ],
  [
    "Pricing model",
    `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Sims & rooms free. Unlimited users.`,
    "Plan-based packaging (varies by org)",
  ],
  [
    "Mobile",
    "Native iOS and Android apps included",
    "iOS app available; check current Android status",
  ],
  [
    "Scheduling",
    "Lane dispatch, week views, student self-booking",
    "Mature scheduling & training workflows",
  ],
  [
    "Billing",
    "Flight close-out → invoice, Stripe payments",
    "Billing capabilities vary by plan / add-ons",
  ],
  [
    "Integrations",
    "Stripe & Google Calendar available; QuickBooks coming",
    "Broad ecosystem depending on plan",
  ],
  [
    "Best fit",
    "Schools that want to start today without a sales call",
    "Large orgs that prefer guided enterprise rollout",
  ],
];

export default function CompareFspPage() {
  return (
    <article className="border-b border-border">
      <div className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
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
            Both products help flight schools schedule aircraft and people.
            The biggest differences show up in how you buy, how you start, and
            how mobile fits the day-to-day.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Flight Schedule Pro is a long-standing competitor. Details below
            reflect typical public positioning; always verify current FSP plans
            on their site.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
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

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          When AerScheduler is the better fit
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>You want to start today without booking a demo</li>
          <li>You prefer simple per-aircraft pricing with unlimited seats</li>
          <li>Native iOS and Android for the whole team matters</li>
          <li>You&apos;re leaving MyFBO and need a clean self-serve path</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-brand-surface">
          When Flight Schedule Pro may fit better
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>You already run a large FSP deployment and training is deep</li>
          <li>You want a guided enterprise sales process</li>
          <li>You need a specific FSP workflow or integration we don&apos;t cover yet</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-[#fafbfc] p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Try AerScheduler free for {TRIAL_DAYS} days
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ${PRICE_PER_AIRCRAFT}/aircraft/mo after trial · No sales call
          </p>
          <Button href={SIGNUP_URL} size="lg" className="mt-5">
            Get started
            <ChevronRight className="size-4 opacity-80" />
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link href="/pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            {" · "}
            <Link href="/features" className="text-primary hover:underline">
              Features
            </Link>
            {" · "}
            <Link href="/resources" className="text-primary hover:underline">
              Resources
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
