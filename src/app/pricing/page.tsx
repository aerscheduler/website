import type { Metadata } from "next";
import { Check, ChevronRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd, PRICING_FAQS } from "@/lib/seo";
import {
  BOOK_DEMO_PATH,
  ENTERPRISE_FEATURES,
  PRICE_PER_AIRCRAFT,
  SIGNUP_URL,
  TRIAL_DAYS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Pricing",
  description: `Simple flight school software pricing at $${PRICE_PER_AIRCRAFT}/mo per aircraft. Simulators and classrooms free. ${TRIAL_DAYS}-day free trial, no credit card. Enterprise available for larger operations.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Flight School Software Pricing",
    description: `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Sims and rooms free. ${TRIAL_DAYS}-day trial.`,
    url: "/pricing",
  },
};

/**
 * What the per-aircraft price buys. Everything here must be live TODAY, this is the
 * page a prospect checks a claim against, so anything half-built belongs on a feature
 * page with its own caveats, not in this list.
 */
const INCLUDED = [
  "Unlimited instructors, students, and renters",
  "Aircraft, simulator, and classroom scheduling",
  "Student self-booking with conflict checks",
  "Training records & syllabi, Part 61 and 141",
  "Invoices, online payments, and member accounts",
  "Split billing across everyone on a flight",
  "Club memberships and recurring dues",
  "Maintenance squawks and AVIATES inspections",
  "Reports, dashboards, and an audit log",
  "QuickBooks Online and Google Calendar sync",
  "Native iOS app + web console",
  "Proration when fleet size changes",
];

/** Named on the standard card so the one exclusion is visible before the Enterprise card. */
const NOT_INCLUDED = "API access is on Enterprise.";

const FEATURES = [
  {
    title: "Scheduling & dispatch",
    items: [
      "Lane and week views",
      "Conflict detection",
      "Student self-booking",
      "Drag to reschedule",
      "Multi-day and overnight rentals",
      "Ramp in / out and close-out",
    ],
  },
  {
    title: "People & compliance",
    items: [
      "Roles & invite codes",
      "Documents & currencies",
      "Instructor availability",
      "Approved aircraft per pilot",
      "Join requests",
      "Airport time, not device time",
    ],
  },
  {
    title: "Training",
    items: [
      "Private, Instrument, Commercial, CFI syllabi",
      "Stages, lessons, and graded tasks",
      "Hour requirements tracked separately",
      "Endorsements from AC 61-65K",
      "Grade offline at the aircraft",
      "Course fees billed on enrollment",
    ],
  },
  {
    title: "Money",
    items: [
      "Flight → invoice or account ledger",
      "Split a booking between everyone on it",
      "Memberships, joining fees, and dues",
      "Auto-refill, late fees, and statements",
      "Cards on file and autopay",
      "Instruction rates, per instructor",
    ],
  },
  {
    title: "Fleet & maintenance",
    items: [
      "Squawks with triage and grounding",
      "AVIATES inspections on hours or dates",
      "Hobbs and tach meters",
      "Grounded aircraft off the board",
      "Simulators and classrooms",
      "Locations and multiple fields",
    ],
  },
  {
    title: "Reporting & admin",
    items: [
      "Utilization, revenue, and instructor reports",
      "Scheduled reports by email",
      "AR: who owes and how much",
      "Audit log of who changed what",
      "Announcements to your members",
      "Export any table to CSV",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(PRICING_FAQS)} />
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 lg:pt-16">
          <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} />
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Flight school software pricing: ${PRICE_PER_AIRCRAFT}/mo per aircraft
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            One clear number for the aircraft you fly, not seats and not modules.
            Bigger operations that need our API and their own integrations get an
            Enterprise plan, quoted per account.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-primary">Standard</p>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                Self-serve
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight text-brand-surface tabular-nums">
                ${PRICE_PER_AIRCRAFT}
              </span>
              <span className="text-muted-foreground">/ aircraft / month</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Simulators and ground-school rooms are free. Start with a{" "}
              {TRIAL_DAYS}-day trial. No credit card to begin. {NOT_INCLUDED}
            </p>
            <Button href={SIGNUP_URL} size="lg" className="mt-8">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
          {/* Enterprise. Deliberately no number: it is quoted per account, and putting a
              "from $X" here would be a number we would then have to defend on every call. */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-primary">Enterprise</p>
              <span className="rounded-full bg-brand-surface/10 px-2.5 py-1 text-[11px] font-semibold text-brand-surface">
                Talk to us
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-brand-surface">
                Custom pricing
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For larger fleets and multi-location operations that need our API, their own
              integrations, and a person to call.
            </p>
            {/* Enterprise is quoted per account, so this CTA has always been a
                conversation. It now opens a calendar instead of a form: a school
                at this size wants a time and a name, not a reply tomorrow. */}
            <Button href={BOOK_DEMO_PATH} size="lg" variant="secondary" className="mt-6">
              Contact sales
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <ul className="mt-6 grid gap-3">
              {ENTERPRISE_FEATURES.map((feature) => (
                <li key={feature.title} className="flex items-start gap-2 text-sm">
                  {feature.soon ? (
                    <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  )}
                  <span>
                    <span className="font-medium text-foreground">{feature.title}</span>
                    {feature.soon && (
                      <span className="ml-2 rounded-full border border-border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Coming soon
                      </span>
                    )}
                    <span className="block text-muted-foreground">{feature.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Tell us your fleet size and what you need to connect to, and we&apos;ll come
              back with a number.
            </p>
          </div>

          <div className="rounded-2xl bg-brand-surface p-8 text-white shadow-lg">
            <p className="text-sm font-semibold text-sky-300">What you don&apos;t pay</p>
            <ul className="mt-6 space-y-0 divide-y divide-white/10">
              {[
                ["Per-user fees", "Unlimited seats for your whole team"],
                ["Simulator seats", "Sims & classrooms are free"],
                ["Setup calls", "Onboard yourself in minutes"],
                ["Hidden modules", "Scheduling, billing, and maintenance included"],
              ].map(([title, body]) => (
                <li key={title} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-white/60">{body}</p>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface sm:text-3xl">
            Everything below is included at ${PRICE_PER_AIRCRAFT} per aircraft
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            No modules, no tiers, no &ldquo;talk to sales&rdquo; to unlock a screen. Only the
            API and what comes with it sit on Enterprise.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-brand-surface">
            Pricing questions
          </h2>
          <dl className="mt-10 divide-y divide-border">
            {PRICING_FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
