import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight, Code2 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { COMPETITOR_LIST, competitorHref } from "@/lib/competitors";
import { DEVELOPER_LINKS } from "@/lib/developers";
import { POPULAR_DOC_LINKS } from "@/lib/docs";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: `Guides on flight school scheduling, billing and split costs, airworthiness and inspection due dates, training records, and reporting. Plus help documentation, platform comparisons, and the REST API. From ${SITE_NAME}.`,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources | ${SITE_NAME}`,
    description:
      "Guides on flight school software, airworthiness, billing, training records and reporting, plus documentation and platform comparisons.",
    url: "/resources",
  },
};

/**
 * Cards for this index, grouped by topic rather than dumped in one grid.
 *
 * The flat list this replaced ran sixteen tiles in whatever order they were
 * written, so the airworthiness cluster (three pages that deliberately link to
 * each other) was scattered across it and the reporting pillar sat below a
 * QuickBooks how-to. Clustering is worth doing for a human, who is reading about
 * one subject rather than shopping a catalog, and for a crawler, which reads
 * three pages under one heading as a topic and sixteen in a row as a list.
 *
 * Copy here is deliberately longer than the `RESOURCE_GROUPS` entries in
 * `lib/resources.ts`, which feed the nav and footer where one line has to fit.
 * A new guide belongs in RESOURCE_GROUPS and the sitemap; promote it into
 * NAV_RESOURCE_GROUPS or FOOTER_RESOURCE_LINKS only when it earns a permanent
 * seat in the chrome.
 */
const GUIDE_CLUSTERS: {
  title: string;
  blurb: string;
  items: { href: string; title: string; body: string }[];
}[] = [
  {
    title: "Choosing a platform",
    blurb:
      "What to look for, what it should cost, and what moving actually involves.",
    items: [
      {
        href: "/resources/flight-school-scheduling-software",
        title: "Flight school scheduling software",
        body: "What modern flight school scheduling software should include: dispatch, self-booking, billing, and mobile.",
      },
      {
        href: "/migrating/my-fbo",
        title: "MyFBO alternative & migration",
        body: "MyFBO shut down in August 2026. How schools got their data out, stood AerScheduler up, ran both in parallel, and cut over.",
      },
      {
        href: "/pricing",
        title: "Pricing",
        body: "$20 per aircraft per month. Simulators and classrooms free. Unlimited users. 14-day trial.",
      },
    ],
  },
  {
    title: "Airworthiness",
    blurb:
      "Three pages for three different readers: an owner choosing a system, a mechanic checking a date, and whoever hands records to an inspector.",
    items: [
      {
        href: "/resources/airworthiness-directive-tracking",
        title: "Airworthiness Directive tracking",
        body: "Applicability, compliance and enforcement are three different jobs. Which of them a scheduling system can actually do, and where you still want ADlog or AVTRAK.",
      },
      {
        href: "/resources/calendar-months-and-inspection-due-dates",
        title: "Calendar months and inspection due dates",
        body: "An annual signed on 15 February is good through 28 February the following year. What 12 calendar months means, which inspections use it, and what tracking them as 365 days costs.",
      },
      {
        href: "/resources/aircraft-maintenance-records",
        title: "Aircraft maintenance records",
        body: "The two lists in 14 CFR 91.417 and their very different lifespans, which records go with the aeroplane when you sell it, and why a tracking system is not a logbook.",
      },
    ],
  },
  {
    title: "Billing and money",
    blurb:
      "The cases that decide whether billing is five minutes a day or an afternoon a month.",
    items: [
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
        href: "/resources/quickbooks-integration",
        title: "QuickBooks Online integration",
        body: "How paid AerScheduler invoices sync to QuickBooks Online as Sales Receipts, without CSV exports.",
      },
    ],
  },
  {
    title: "Reporting",
    blurb:
      "The pillar first, then the two numbers owners ask for by name.",
    items: [
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
    ],
  },
  {
    title: "Training",
    blurb: "What a school has to keep, and what makes a record hold up later.",
    items: [
      {
        href: "/resources/flight-training-records",
        title: "Flight training records",
        body: "What a school has to keep: versioned syllabi, hours that move independently of lessons, records frozen at signing, and endorsements from AC 61-65K.",
      },
    ],
  },
];

// Comparison pages come from `lib/competitors.ts` so adding a competitor lists
// it here automatically. They get their own band because somebody comparing one
// product is almost always comparing three, and a row of them is easier to scan
// than the same pages scattered through topic clusters.
const COMPARISONS = COMPETITOR_LIST.map((competitor) => ({
  href: competitorHref(competitor.slug),
  title: `${SITE_NAME} vs ${competitor.name}`,
  body: competitor.seoDescription,
}));

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
          Guides on scheduling, billing, airworthiness, training records and
          reporting, the product documentation, and how AerScheduler compares
          when you are choosing a platform.
        </p>

        {/* Product documentation answers a different question from every card
            below, so it gets its own band. Somebody who already bought and is
            stuck should not have to read past the comparison pages to find
            help. The four links under it go straight to articles rather than to
            another index, because an index is not an answer. */}
        <div className="mt-10 rounded-2xl border border-border bg-brand-surface p-6 text-white sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="flex items-center gap-2 text-lg font-semibold">
                <BookOpen className="size-5 opacity-80" aria-hidden />
                Product documentation
              </span>
              <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-white/70">
                Step-by-step guides for scheduling and dispatch, billing,
                maintenance, the Part 141 and Part 61 curriculum, and reporting.
                Written to the real screens.
              </span>
            </span>
            <Link
              href="/docs"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold hover:underline"
            >
              Open the docs
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
          <div className="mt-6 grid gap-x-6 gap-y-3 border-t border-white/15 pt-5 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_DOC_LINKS.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group flex items-start gap-2"
              >
                <ChevronRight className="mt-1 size-3.5 shrink-0 text-white/50" aria-hidden />
                <span className="text-sm font-medium text-white/85 group-hover:text-white">
                  {doc.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {GUIDE_CLUSTERS.map((cluster) => (
          <div key={cluster.title} className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
              {cluster.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {cluster.blurb}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cluster.items.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                    {guide.title}
                  </h3>
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
        ))}

        <div className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Compared with other platforms
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Each page records where the third column came from and the date it
            was checked. Not published means we could not confirm it, never that
            it is absent.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPARISONS.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  {guide.title}
                </h3>
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

        {/* The API used to live under Features, where a developer never looks
            for it. It reads as reference material, so it sits with the rest of
            the reading. */}
        <div className="mt-14 rounded-2xl border border-border bg-[#fafbfc] p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-brand-surface">
            <Code2 className="size-5 text-primary" aria-hidden />
            Developers
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A documented REST API over the schedule, the fleet and billing,
            available on the Enterprise plan.
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {DEVELOPER_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="group flex items-start gap-2.5">
                <ChevronRight className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
