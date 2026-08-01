import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Flight School Revenue Reporting";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Track flight school revenue by aircraft, instructor, customer, and lesson type. Billed vs collected vs outstanding, where revenue leaks, and how to close the month without a spreadsheet.",
  alternates: { canonical: "/resources/flight-school-revenue-reporting" },
  openGraph: {
    title: TITLE,
    description:
      "Billed, collected, and outstanding — broken down by aircraft, instructor, customer, and lesson type.",
    url: "/resources/flight-school-revenue-reporting",
  },
};

const FAQS = [
  {
    q: "How should a flight school track revenue?",
    a: "Track three figures over the same window, never one: billed (what you invoiced), collected (what actually arrived), and outstanding (what is still owed). A school that watches only collected revenue cannot tell a slow month from a slow payer.",
  },
  {
    q: "Can I see revenue by aircraft or by instructor?",
    a: `Yes. ${SITE_NAME} groups revenue by aircraft, instructor, customer, lesson type, reservation type, or location — the same report, cut whichever way answers the question in front of you.`,
  },
  {
    q: "How do I find revenue my flight school is losing?",
    a: "Two places, both invisible on a bank statement: flights that flew but were never invoiced, and invoices that were sent but never paid. AerScheduler surfaces both as counts on the dashboard that open into the exact list of flights or invoices.",
  },
  {
    q: "Does it handle sales tax?",
    a: "There is a dedicated tax report showing tax collected by rate and period, so filing does not mean re-deriving it from invoices by hand.",
  },
  {
    q: "Can my accountant get the numbers out?",
    a: "Every report exports to CSV with the filters and columns you configured. Paid invoices can also sync automatically to QuickBooks Online as Sales Receipts, so the books stay current without an export step at all.",
  },
  {
    q: "Who can see revenue reports?",
    a: "Owners and admins only. Dispatchers, instructors, technicians, students, and renters have no access to financial reports — enforced on the server, not merely hidden in the interface.",
  },
];

export default function FlightSchoolRevenueReportingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Resources", href: "/resources" },
          {
            name: "Revenue reporting",
            href: "/resources/flight-school-revenue-reporting",
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
                  name: "Revenue reporting",
                  href: "/resources/flight-school-revenue-reporting",
                },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              Flight school revenue reporting
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A bank balance tells you the month happened. It does not tell you
              which aircraft earned, which instructor filled their week, or how
              much flying you did for free. This is how to break revenue down so
              the answer is a click rather than an evening with a spreadsheet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={signupUrl("billing")} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/features/billing" variant="secondary" size="lg">
                See billing
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Billed, collected, outstanding — all three, always
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            These three move independently, and watching any one of them alone
            will mislead you. Billing up and collections flat means a payment
            problem, not a sales problem. Collections up and billing flat means
            you are working through a backlog, and next month will look worse
            through no fault of anyone. Outstanding climbing while both look
            healthy is the one that ends badly.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Then cut it by the thing you are deciding about
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            The same revenue report regroups on demand, because the useful
            breakdown depends entirely on the question:
          </p>
          <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-[#fafbfc]">
            {[
              {
                by: "By aircraft",
                q: "Is this tail worth its hangar, insurance, and note?",
              },
              {
                by: "By instructor",
                q: "Who is full, who has room, and who needs students?",
              },
              {
                by: "By customer",
                q: "Who are your best students — and who has quietly stopped flying?",
              },
              {
                by: "By lesson type",
                q: "Does primary training or checkout work actually pay better?",
              },
              {
                by: "By location",
                q: "Is the second base carrying itself?",
              },
            ].map((row) => (
              <div key={row.by} className="px-5 py-4">
                <dt className="text-sm font-semibold text-foreground">{row.by}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {row.q}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            The two leaks worth checking every week
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Flown but never invoiced.
            </strong>{" "}
            A flight that never got closed out has unknown hours, so nobody
            billed it. The aircraft still burned fuel and the instructor was
            still paid. This is the most expensive report in the building and
            the one nobody thinks to run.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Invoiced but never paid.
            </strong>{" "}
            Ordinary accounts receivable, except that at a flight school the
            customer keeps showing up and flying. Overdue invoices sit on the
            dashboard as a count that opens the list, so the conversation
            happens at the desk rather than ninety days later.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Close the month without rebuilding it
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Save your month-end configuration as a named view and reuse it",
              "Share it so the whole school reads one definition of the number",
              "Pin it to your dashboard as a tile with its own date range",
              "Export to CSV for the accountant, filters and columns intact",
              "Or sync paid invoices to QuickBooks Online automatically",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Related:{" "}
            <Link
              href="/resources/quickbooks-integration"
              className="font-medium text-primary hover:underline"
            >
              the QuickBooks integration
            </Link>
            ,{" "}
            <Link
              href="/resources/aircraft-utilization-report"
              className="font-medium text-primary hover:underline"
            >
              aircraft utilization
            </Link>
            , and{" "}
            <Link
              href="/resources/flight-school-reports"
              className="font-medium text-primary hover:underline"
            >
              the full reporting guide
            </Link>
            .
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
              See where the money actually comes from.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day trial · ${PRICE_PER_AIRCRAFT}/aircraft/mo · No demo required
            </p>
            <Button href={signupUrl("billing")} size="lg" className="mt-5">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
