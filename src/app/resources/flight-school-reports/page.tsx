import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import {
  CATEGORY_COUNT_WORD,
  REPORT_CATEGORIES,
  REPORTING_ROADMAP,
} from "@/lib/reports";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Flight School Reports: What to Track and Why";

export const metadata: Metadata = {
  title: TITLE,
  description: `The reports a flight school actually needs — aircraft utilization, revenue, instructor activity, squawks, and currency — and how to build a dashboard that answers them. From ${SITE_NAME}.`,
  alternates: { canonical: "/resources/flight-school-reports" },
  openGraph: {
    title: TITLE,
    description: `Aircraft utilization, revenue by tail, instructor activity, and compliance — the reporting a flight school needs, and how ${SITE_NAME} delivers it.`,
    url: "/resources/flight-school-reports",
  },
};

const FAQS = [
  {
    q: "What reports does a flight school actually need?",
    a: `${CATEGORY_COUNT_WORD.charAt(0).toUpperCase()}${CATEGORY_COUNT_WORD.slice(1)} families cover almost every question an owner asks: financial (billed, collected, outstanding), operations (booked vs flown hours, cancellations), fleet (utilization and downtime per tail), people (instructor and student activity), and compliance (expiring documents and currency). AerScheduler groups its reports into those ${CATEGORY_COUNT_WORD} families, and every one of them filters, groups, and exports the same way.`,
  },
  {
    q: "How do I measure aircraft utilization at a flight school?",
    a: "Compare booked hours against flown hours against billed hours for each aircraft over the same window. Booked-vs-flown shows how much of your schedule evaporates; flown-vs-billed shows how much flying never made it onto an invoice. Utilization on its own — hours per tail — hides both problems.",
  },
  {
    q: "Can I export flight school reports to CSV or Excel?",
    a: "Yes. Every report in AerScheduler exports to CSV with the filters and columns you are looking at, so what you open in Excel is what you configured on screen.",
  },
  {
    q: "Can I build a custom dashboard?",
    a: "Yes. Add tiles for any metric from any report, drag and resize them, and give each tile its own date range and filters — so a 'this week' revenue card can sit next to a 'year to date' one. Every figure links through to the report that produced it.",
  },
  {
    q: "Can I stop instructors and dispatchers seeing revenue?",
    a: "Yes. Report access follows role by category. Owners and admins see financial reports; dispatchers see operations, fleet, people, and compliance but not revenue; technicians see fleet reports only. Students and renters have no reporting access at all.",
  },
  {
    q: "Can AerScheduler email reports on a schedule?",
    a: "Yes. Save a report as a named view, then schedule it daily, weekly, or monthly to anyone at your school. The CSV arrives attached. Each email covers exactly the period since the last one — a weekly send covers the previous seven days — and times are your school's, so 7am means 7am at the field.",
  },
];

export default function FlightSchoolReportsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Resources", href: "/resources" },
          { name: "Flight school reports", href: "/resources/flight-school-reports" },
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
                  name: "Flight school reports",
                  href: "/resources/flight-school-reports",
                },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              Flight school reports: what to track, and why
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Most schools run on a calendar and a bank balance. That tells you
              the month was busy, not whether it was profitable — or which
              aircraft paid for itself. This guide covers the reports worth
              having, the numbers that actually change decisions,
              and how to get them without exporting anything to a spreadsheet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/features/reports" variant="secondary" size="lg">
                See the reporting feature
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            The three questions reporting has to answer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Owners tend to ask the same three things, and a calendar answers
            none of them: <strong className="font-semibold text-foreground">is
            the fleet earning?</strong> (revenue and hours per tail),{" "}
            <strong className="font-semibold text-foreground">where is
            money leaking?</strong> (flights flown but never invoiced,
            cancellations, unpaid balances), and{" "}
            <strong className="font-semibold text-foreground">what is about
            to stop us flying?</strong> (a lapsing medical, a maintenance item
            coming due, a grounded aircraft). Good reporting is mostly about
            being able to ask those three quickly enough to act on the answers.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            The reports, by category
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every report below filters, groups, sorts, and exports the same way,
            so learning one teaches you all of them.
          </p>

          <div className="mt-8 space-y-8">
            {REPORT_CATEGORIES.map((category) => (
              <section key={category.key}>
                <h3 className="text-lg font-semibold tracking-tight text-brand-surface">
                  {category.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{category.blurb}</p>
                <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-[#fafbfc]">
                  {category.reports.map((report) => (
                    <div key={report.name} className="px-5 py-4">
                      <dt className="text-sm font-semibold text-foreground">
                        {report.name}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {report.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
            Save the question, not just the answer
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The report you build at month-end is one you will want again next
            month. Configure it once — filters, columns, grouping — and save it
            as a named view. Share it with the school and everyone reads the
            same definition of &ldquo;instructor hours&rdquo; instead of four
            people rebuilding it four slightly different ways.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            A dashboard where every number is clickable
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Most dashboards are a separate thing from the reports underneath
            them, which is why the summary and the detail so often disagree. In
            AerScheduler a tile <em>is</em> a report — the number on the card is
            produced by running the report you click into, so the two cannot
            drift apart. Pin any saved view to the board, drag the tiles where
            you want them, and give each one its own window.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Number cards, line charts, bar charts, and tables",
              "Per-tile date ranges — 'this week' beside 'year to date'",
              "Per-tile filters, so one card can watch a single aircraft",
              "Drag and resize freely; collapses to one column on a phone",
              "A needs-attention strip for overdue invoices, open squawks, and lapsing documents",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Who sees what
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Reporting access follows role, by category. Owners and admins see
            everything including revenue; dispatchers get operations, fleet,
            people, and compliance without the financials; technicians see fleet
            reports. It is enforced on the server, not hidden in the interface —
            a dispatcher cannot reach a revenue figure by guessing a URL.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Have it arrive without asking
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The report you remember to run is the one that gets run. Schedule a
            saved view and it arrives as a CSV — daily, weekly, or monthly — to
            whoever at the school should see it.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Each email covers the period since the last one — no gaps, nothing counted twice",
              "A weekly send covers the previous seven days; monthly covers the previous calendar month",
              "Times are your school's, so 7am means 7am at the field",
              "Recipients are people at your school, picked from your roster",
              "Anyone who loses access to a report stops receiving it automatically",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          {REPORTING_ROADMAP.length > 0 && (
            <div className="mt-8 rounded-2xl border border-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Coming soon
              </p>
              {REPORTING_ROADMAP.map((item) => (
                <div key={item.name} className="mt-3">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
            Go deeper
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <GuideCard
              href="/resources/aircraft-utilization-report"
              title="Aircraft utilization"
              body="Booked vs flown vs billed, and what the gaps are costing you."
            />
            <GuideCard
              href="/resources/flight-school-revenue-reporting"
              title="Revenue reporting"
              body="Revenue by aircraft, instructor, and lesson type — and where it leaks."
            />
          </div>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
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
              See your own numbers, not a demo dataset.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day trial · ${PRICE_PER_AIRCRAFT}/aircraft/mo · No sales call
            </p>
            <Button href={SIGNUP_URL} size="lg" className="mt-5">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}

function GuideCard({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-primary/30"
    >
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Read the guide
        <ChevronRight className="size-3.5" />
      </span>
    </Link>
  );
}
