import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Clock, PlayCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { PricingBand, ShortQuote, TESTIMONIALS } from "@/components/landing/home-blocks";
import { PriceCard } from "@/components/landing/price-quote";
import { Reveal, RevealGroup } from "@/components/reveal";
import { faqJsonLd, PRICING_FAQS } from "@/lib/seo";
import {
  BOOK_DEMO_PATH,
  DEMO_URL,
  ENTERPRISE_FEATURES,
  PRICE_PER_AIRCRAFT,
  SIGNUP_URL,
  TRIAL_DAYS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Pricing",
  description: `Simple flight school software pricing at $${PRICE_PER_AIRCRAFT}/mo per aircraft. Simulators and classrooms free. ${TRIAL_DAYS}-day free trial, cancel anytime. Enterprise available for larger operations.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Flight School Software Pricing",
    description: `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Sims and rooms free. ${TRIAL_DAYS}-day trial.`,
    url: "/pricing",
  },
};

/*
 * The pricing page, rebuilt 2026-10-16 in the home page's style (it was two
 * dense checklist cards). Order: the price, worked out live from the fleet
 * (`PriceCard`); what you do not pay; everything the price covers; how other
 * products price, linking to each comparison; Enterprise; the questions; the
 * closing band with the customer quote.
 *
 * Everything listed here must be live TODAY: this is the page a prospect checks
 * a claim against, so anything half-built belongs on a feature page with its
 * own caveats, not in these lists.
 */

/** What a school does not pay for, in the home page's audience-strip shape. */
const NOT_CHARGED: { title: string; body: string }[] = [
  { title: "No per-user fees", body: "Every instructor, student, renter and member is included." },
  { title: "No charge for simulators", body: "Simulators and classrooms are on the board and never on the bill." },
  { title: "No setup fee", body: "No contract and no onboarding call. Set the school up yourself." },
  { title: "No add-on modules", body: "Scheduling, billing, maintenance, work orders and reporting in every plan." },
];

const INCLUDED: { title: string; items: string[] }[] = [
  {
    title: "Scheduling and dispatch",
    items: [
      "Only mutually free times offered",
      "Currency and checkouts checked at booking",
      "Student and renter self-booking",
      "Standby lists and suggested slots",
      "Multi-day and overnight rentals",
      "Ramp out, ramp in and close-out",
    ],
  },
  {
    title: "Billing",
    items: [
      "Invoices drafted at close-out",
      "Account ledger and prepaid balances",
      "Split a booking between everyone on it",
      "Memberships, joining fees and dues",
      "Cards on file, ACH and autopay",
      "Per-instructor rates",
    ],
  },
  {
    title: "Maintenance and work orders",
    items: [
      "Inspections on tach, Hobbs or calendar",
      "Squawks that ground the aircraft",
      "ADs from a library published since 1995",
      "Life-limited components",
      "Work orders on customers' aircraft",
      "Owner approvals and job invoices",
    ],
  },
  {
    title: "Training",
    items: [
      "Part 61 and Part 141 syllabi",
      "Stages, lessons and graded tasks",
      "Hour requirements tracked separately",
      "Endorsements from AC 61-65K",
      "Grade offline at the aircraft",
      "Course fees billed on enrollment",
    ],
  },
  {
    title: "People and compliance",
    items: [
      "Roles and invite codes",
      "Documents, medicals and flight reviews",
      "Instructor availability",
      "Approved aircraft per pilot",
      "Airport time, not device time",
      "iOS and Android apps for everyone",
    ],
  },
  {
    title: "Reporting and admin",
    items: [
      "21 reports, filtered and grouped",
      "Saved views emailed on a schedule",
      "Who owes what, and since when",
      "Audit log of who changed what",
      "QuickBooks Online and Google Calendar",
      "Export any table to CSV",
    ],
  },
];

/**
 * How other products price, from the facts recorded in `lib/competitors.ts`
 * (each checked against the product's own site). Only products whose price is
 * a quote or a usage fee are listed: this row is about readable pricing.
 */
const OTHERS: { name: string; how: string; href: string }[] = [
  {
    name: "Flight Schedule Pro",
    how: "A Scheduling Hub with Billing, Training, Maintenance and Reporting Hubs added, by custom quote.",
    href: "/compare/flight-schedule-pro",
  },
  {
    name: "FlightLogger",
    how: "A platform package plus a fee for every active student and operational flight, by quote.",
    href: "/compare/flightlogger",
  },
  {
    name: "Talon Systems",
    how: "ETA, RMS and Talon Mobile as separate products, priced per organization after a demo.",
    href: "/compare/talon-systems",
  },
];

export default function PricingPage() {
  const quote = TESTIMONIALS[0];

  return (
    <div className="bg-white text-[#0b0b0d]">
      <JsonLd data={faqJsonLd(PRICING_FAQS)} />

      {/* Hero: the claim on the left, the price worked out live on the right. */}
      <section className="relative isolate overflow-hidden">
        <div
          className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:pb-24 lg:pt-10">
          <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} />
          <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h1 className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm sm:text-sm">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  Flight school software pricing
                </span>
                <span className="sr-only">: </span>
                <span className="mt-6 block text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4rem]">
                  ${PRICE_PER_AIRCRAFT} per aircraft a month, with every user included
                </span>
              </h1>
              <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl">
                Every module is in the plan. Simulators and classrooms are free,
                there is no setup fee and no contract, and a {TRIAL_DAYS}-day
                free trial starts today.
              </p>
              <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
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
            <div className="animate-fade-up-delay-3 mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
              <PriceCard extra={["Simulators and classrooms", "Free"]} />
            </div>
          </div>
        </div>
      </section>

      {/* What you do not pay, in the home page's audience-strip shape, with the
          customer quote under it. */}
      <section aria-labelledby="pricing-not-charged">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-20">
          <h2
            id="pricing-not-charged"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40"
          >
            What you do not pay for
          </h2>
          <RevealGroup className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {NOT_CHARGED.map((item, i) => (
              <div
                key={item.title}
                className={`relative lg:px-6 lg:first:pl-0 ${
                  i > 0
                    ? "lg:before:absolute lg:before:inset-y-1 lg:before:left-0 lg:before:w-px lg:before:bg-black/10"
                    : ""
                }`}
              >
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 max-w-[17rem] text-sm leading-relaxed text-black/50">{item.body}</p>
              </div>
            ))}
          </RevealGroup>
          {quote && <ShortQuote t={quote} />}
        </div>
      </section>

      {/* Everything the price covers, in the home page's tinted panel. */}
      <section aria-labelledby="pricing-included" className="overflow-x-clip px-2 sm:px-4">
        <div
          className="mx-auto max-w-[1400px] rounded-[28px] border border-black/[0.05] lg:rounded-[40px]"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, color-mix(in srgb, #3b6fe0 9%, transparent), transparent 70%), #f5f7fa",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
            <Reveal className="grid gap-6 md:grid-cols-2 md:gap-16">
              <h2
                id="pricing-included"
                className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]"
              >
                Everything included
                <br />
                at ${PRICE_PER_AIRCRAFT} per aircraft
              </h2>
              <p className="text-lg leading-relaxed text-black/60 sm:text-xl md:pt-2">
                No tiers and no modules to unlock. The only thing on Enterprise is
                the public API and the work that comes with it.
              </p>
            </Reveal>
            <RevealGroup className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {INCLUDED.map((group) => (
                <div key={group.title} className="border-t border-black/[0.08] pt-6">
                  <h3 className="text-[15px] font-semibold">{group.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] text-black/60">
                        <Check className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* How other products price, each row linking to its comparison. */}
      <section aria-labelledby="pricing-others">
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:pt-36">
          <Reveal className="grid gap-6 md:grid-cols-2 md:gap-16">
            <h2
              id="pricing-others"
              className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]"
            >
              How other flight school
              <br />
              software is priced
            </h2>
            <p className="text-lg leading-relaxed text-black/60 sm:text-xl md:pt-2">
              Most of the alternatives quote a price after a demo, or charge for
              the students you train. Here is what each one publishes about itself.
            </p>
          </Reveal>
          <dl className="mt-14">
            {OTHERS.map((o) => (
              <div
                key={o.name}
                className="grid gap-2 border-t border-black/[0.08] py-6 md:grid-cols-[0.8fr_2fr_auto] md:items-center md:gap-8"
              >
                <dt className="text-[15px] font-semibold">{o.name}</dt>
                <dd className="text-[15px] leading-relaxed text-black/55">{o.how}</dd>
                <dd>
                  <Link
                    href={o.href}
                    className="inline-flex items-center gap-1.5 text-[15px] text-black/60 hover:text-[#0b0b0d]"
                  >
                    Compare <span aria-hidden>→</span>
                  </Link>
                </dd>
              </div>
            ))}
            <div className="grid gap-2 border-y border-black/[0.08] py-6 md:grid-cols-[0.8fr_2fr_auto] md:items-center md:gap-8">
              <dt className="flex items-center gap-2 text-[15px] font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                AerScheduler
              </dt>
              <dd className="text-[15px] leading-relaxed">
                ${PRICE_PER_AIRCRAFT} per aircraft a month, on this page, with every module and every user included.
              </dd>
              <dd />
            </div>
          </dl>
        </div>
      </section>

      {/* Enterprise. Deliberately no number: it is quoted per account, and a
          "from $X" here would be a number to defend on every call. */}
      <section aria-labelledby="pricing-enterprise">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-36">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id="pricing-enterprise"
              className="text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl"
            >
              Enterprise
              <br />
              for larger operations
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/60">
              For larger fleets and multi-location operations that need our API,
              their own integrations and a person to call. Tell us your fleet size
              and what you need to connect, and we come back with a number.
            </p>
            {/* Enterprise is quoted per account, so this button opens a calendar:
                a school at this size wants a time and a name, not a reply tomorrow. */}
            <Button href={BOOK_DEMO_PATH} size="lg" variant="secondary" className="mt-8">
              Contact sales
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </Reveal>
          <RevealGroup className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div key={feature.title} className="border-t border-black/[0.08] pt-5">
                <h3 className="flex flex-wrap items-center gap-2 text-[15px] font-semibold">
                  {feature.soon ? (
                    <Clock className="size-3.5 text-black/40" aria-hidden />
                  ) : (
                    <Check className="size-3.5 text-primary" aria-hidden />
                  )}
                  {feature.title}
                  {feature.soon && (
                    <span className="rounded-full border border-black/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/45">
                      Coming soon
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-black/55">{feature.body}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="faq">
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
          <h2 id="faq" className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            Pricing questions
          </h2>
          <dl className="mt-8 grid gap-x-14 lg:grid-cols-2">
            {PRICING_FAQS.map((faq) => (
              <div key={faq.q} className="border-t border-black/[0.08] py-6">
                <dt className="text-lg font-semibold tracking-tight">{faq.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-black/55">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PricingBand headingId="pricing-close-heading" eyebrow="Start today" />
    </div>
  );
}
