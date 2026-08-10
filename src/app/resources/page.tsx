import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: `Guides for flight school scheduling software, reporting and aircraft utilization, QuickBooks Online, MyFBO alternatives, and switching platforms. From ${SITE_NAME}.`,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources | ${SITE_NAME}`,
    description:
      "Guides on flight school software, reporting, QuickBooks, migrations, and platform comparisons.",
    url: "/resources",
  },
};

/**
 * Cards for this index.
 *
 * Deliberately longer copy than the curated `NAV_RESOURCE_GROUPS` /
 * `RESOURCE_GROUPS` entries in `lib/resources.ts`, which feed the nav and
 * footer where one line has to fit. A new guide belongs in RESOURCE_GROUPS
 * (and the sitemap); promote it into NAV_RESOURCE_GROUPS or
 * FOOTER_RESOURCE_LINKS only when it earns a permanent seat in the chrome.
 */
const GUIDES = [
  {
    href: "/resources/myfbo-alternative",
    title: "MyFBO alternative",
    body: "What to look for when MyFBO shuts down, and how AerScheduler compares as a self-serve replacement.",
  },
  {
    href: "/resources/flight-school-scheduling-software",
    title: "Flight school scheduling software",
    body: "What modern flight school scheduling software should include: dispatch, self-booking, billing, and mobile.",
  },
  {
    href: "/resources/split-billing-shared-flights",
    title: "Split billing & shared flights",
    body: "Group ground school billed per student, two pilots splitting a cross-country, and a safety pilot who isn't paying, all on one booking.",
  },
  {
    href: "/resources/overnight-and-multi-day-rentals",
    title: "Overnight & multi-day rentals",
    body: "Book a trip that spans nights, charge a minimum for every night the aircraft is away, and tell the member before they agree to it.",
  },
  {
    href: "/resources/flying-club-dues-and-fees",
    title: "Flying club dues & fees",
    body: "What clubs charge to join and to stay, the tiers they settle on, and the five awkward cases (mid-month joiners, seasonal members, a comped month) that decide whether dues are a five-minute job.",
  },
  {
    href: "/resources/flight-training-records",
    title: "Flight training records",
    body: "What a school has to keep: versioned syllabi, hours that move independently of lessons, records frozen at signing, and endorsements from AC 61-65K.",
  },
  {
    href: "/resources/flight-school-reports",
    title: "Flight school reports",
    body: "The reports worth having (revenue, utilization, instruction, fleet, compliance) and what each one answers.",
  },
  {
    href: "/resources/aircraft-utilization-report",
    title: "Aircraft utilization reports",
    body: "Booked vs flown vs billed hours per tail, and what the two gaps between them are quietly costing you.",
  },
  {
    href: "/resources/flight-school-revenue-reporting",
    title: "Revenue reporting",
    body: "Billed, collected, and outstanding, cut by aircraft, instructor, customer, or lesson type.",
  },
  {
    href: "/resources/quickbooks-integration",
    title: "QuickBooks Online integration",
    body: "How paid AerScheduler invoices sync to QuickBooks Online as Sales Receipts, without CSV exports.",
  },
  {
    href: "/compare/flight-schedule-pro",
    title: "AerScheduler vs Flight Schedule Pro",
    body: "A practical comparison of pricing model, self-serve setup, mobile apps, and who each product fits.",
  },
  {
    href: "/compare/flight-circle",
    title: "AerScheduler vs Flight Circle",
    body: "The closest comparison on this site. Both build syllabi; the difference is whether the record tracks the hours a certificate turns on, or only the lessons.",
  },
  {
    href: "/migrating/my-fbo",
    title: "Migrating from MyFBO",
    body: "Step-by-step playbook: back up your data, stand up AerScheduler, run in parallel, then cut over.",
  },
  {
    href: "/pricing",
    title: "Pricing",
    body: "$20 per aircraft per month. Sims and classrooms free. Unlimited users. 14-day trial.",
  },
  {
    href: "/features",
    title: "Features",
    body: "Scheduling, billing, maintenance, compliance, and the native app broken down by capability.",
  },
];

export default function ResourcesPage() {
  return (
    <section className="relative border-b border-border">
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Breadcrumbs items={[{ name: "Resources", href: "/resources" }]} />
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
          Resources for flight schools
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Guides on scheduling software, reporting, QuickBooks Online,
          migrations, and how AerScheduler fits when you&apos;re choosing a
          platform.
        </p>

        {/* Product documentation is answering a different question from every
            card below, so it gets its own band rather than a fourteenth tile.
            Somebody who already bought and is stuck should not have to read
            past the comparison pages to find help. */}
        <Link
          href="/docs"
          className="group mt-10 flex flex-col gap-2 rounded-2xl border border-border bg-brand-surface p-6 text-white transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="flex items-center gap-2 text-lg font-semibold">
              <BookOpen className="size-5 opacity-80" aria-hidden />
              Product documentation
            </span>
            <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-white/70">
              Already using AerScheduler? Step-by-step guides for scheduling and dispatch,
              billing, maintenance, the Part 141 and Part 61 curriculum, and reporting.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
            Open the docs
            <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {guide.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read
                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
