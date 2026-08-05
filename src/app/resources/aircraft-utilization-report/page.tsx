import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Aircraft Utilization Reports for Flight Schools";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "How to measure aircraft utilization at a flight school: booked vs flown vs billed hours, revenue per tail, and the two gaps that quietly cost you money. Built into AerScheduler.",
  alternates: { canonical: "/resources/aircraft-utilization-report" },
  openGraph: {
    title: TITLE,
    description:
      "Booked vs flown vs billed hours per aircraft — the utilization numbers that show where a flight school is losing revenue.",
    url: "/resources/aircraft-utilization-report",
  },
};

const FAQS = [
  {
    q: "What is aircraft utilization at a flight school?",
    a: "Utilization is how much of an aircraft's available time is actually earning. In practice you need three numbers per tail over the same window: hours booked, hours flown, and hours billed. Hours flown alone tells you the airplane moved, not whether the school got paid for it.",
  },
  {
    q: "What is a good utilization rate for a training aircraft?",
    a: "It varies with fleet size, climate, and whether the aircraft is a primary trainer or a complex type, so a single benchmark is misleading. The number that matters more is your own trend: whether efficiency — flown hours as a share of booked hours — is improving month over month, and whether any one tail is drifting away from the rest of the fleet.",
  },
  {
    q: "Why are my booked hours higher than my flown hours?",
    a: "Cancellations, no-shows, weather, and maintenance. A persistent gap means your schedule is optimistic and your fleet looks busier than it earns. AerScheduler reports the gap directly as an efficiency figure per aircraft, and the cancellations report breaks down the reasons.",
  },
  {
    // Overnight trips are a legitimate reason for a terrible-looking efficiency figure, and
    // without this the FAQ above reads as though the only causes are things going wrong.
    q: "Do overnight trips make utilization look worse than it is?",
    a: "Yes, and it is worth knowing before you act on the number. Booked hours measure how long the aircraft was unavailable, so a trip out Friday and back Sunday books around 49 hours and might fly six. That is one booking dragging a whole month's efficiency down, even though the aircraft was away earning. Filter or group the utilization report by Overnight to read trips and same-day flying apart, and judge trips on billed hours instead.",
  },
  {
    q: "How do I find flights that were flown but never invoiced?",
    a: "Compare flown hours against billed hours. Where flown exceeds billed, flying happened that nobody charged for. AerScheduler surfaces this as a 'flown, not invoiced' count on the dashboard that opens straight into the list of affected flights.",
  },
  {
    q: "Can I see revenue per aircraft?",
    a: `Yes. ${SITE_NAME} reports billed, collected, and outstanding revenue grouped by aircraft, so you can rank tails by what they actually earn rather than by how often they appear on the schedule.`,
  },
];

export default function AircraftUtilizationReportPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Resources", href: "/resources" },
          {
            name: "Aircraft utilization",
            href: "/resources/aircraft-utilization-report",
          },
        ])}
      />

      <article className="border-b border-border">
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <Breadcrumbs
              items={[
                { name: "Resources", href: "/resources" },
                {
                  name: "Aircraft utilization",
                  href: "/resources/aircraft-utilization-report",
                },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              Aircraft utilization reports for flight schools
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              One number — hours flown — is how most schools measure a tail, and
              it hides the two most expensive problems in the building. Here is
              what to measure instead, and what each gap is telling you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={signupUrl("scheduling")} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/resources/flight-school-reports" variant="secondary" size="lg">
                All flight school reports
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Three numbers, not one
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            For every aircraft, over the same window, you want:
          </p>
          <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-[#fafbfc]">
            <div className="px-5 py-4">
              <dt className="text-sm font-semibold text-foreground">Booked hours</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                What the schedule promised. This is demand — and the number a
                busy-looking calendar reflects.
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-sm font-semibold text-foreground">Flown hours</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                What actually happened, from Hobbs at close-out. This is
                delivery.
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-sm font-semibold text-foreground">Billed hours</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                What made it onto an invoice. This is revenue.
              </dd>
            </div>
          </dl>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Gap one: booked but not flown
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The distance between booked and flown is your{" "}
            <strong className="font-semibold text-foreground">efficiency</strong>.
            A school running 400 booked hours and 256 flown is at 64% — and the
            other 36% is weather, cancellations, no-shows, and maintenance
            pulling a tail off the line. You cannot fix that number without
            knowing which of those four it is, which is what a cancellations
            report broken down by reason is for.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This gap also distorts planning. Schools size their fleet against
            booked demand, then wonder why the extra aircraft did not pay for
            itself.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Gap two: flown but not billed
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This one is pure leakage. The aircraft flew, fuel was burned, an
            instructor was paid — and no invoice exists. It usually comes from
            flights that were never closed out, so the hours were never known.
            It is invisible on a calendar and invisible in a bank statement,
            because you cannot miss money you never billed.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            AerScheduler puts this on the dashboard as a{" "}
            <em>flown, not invoiced</em> count and an{" "}
            <em>awaiting close-out</em> count, both of which open into the exact
            list of flights so someone can fix them the same week rather than
            discovering them at month-end.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Then rank tails by what they earn
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Hours are a proxy. Revenue is the answer. Grouping revenue by
            aircraft tells you which tail earns its insurance and hangar space,
            which is the conversation you want before renewing a lease or buying
            another 172.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Booked, flown, and billed hours per aircraft, side by side",
              "Efficiency as a single percentage you can trend month over month",
              "Billed, collected, and outstanding revenue grouped by tail",
              "Downtime from squawks, so a low performer's excuse is visible too",
              "Any window you like, exported to CSV when the board wants a copy",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Where this lives in AerScheduler
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The Utilization and Fleet reports carry these numbers, and both are
            reachable from the dashboard — pin a utilization tile for the fleet
            and a second one filtered to a single aircraft, each with its own
            date range. See{" "}
            <Link
              href="/features/reports"
              className="font-medium text-primary hover:underline"
            >
              reports and dashboards
            </Link>{" "}
            for how that fits together, or{" "}
            <Link
              href="/features/fleet"
              className="font-medium text-primary hover:underline"
            >
              fleet management
            </Link>{" "}
            for where the rates and Hobbs readings come from.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            FAQ
          </h2>
          <dl className="mt-6 divide-y divide-border">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-2xl border border-border bg-[#fafbfc] p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              Find out what each tail actually earns.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day trial · ${PRICE_PER_AIRCRAFT}/aircraft/mo · Sims free
            </p>
            <Button href={signupUrl("scheduling")} size="lg" className="mt-5">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
