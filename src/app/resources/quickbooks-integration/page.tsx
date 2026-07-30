import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "QuickBooks Online Integration for Flight Schools",
  description: `${SITE_NAME} syncs paid flight school invoices to QuickBooks Online as Sales Receipts — matched to customers by email, on every plan. No CSV exports.`,
  alternates: { canonical: "/resources/quickbooks-integration" },
  openGraph: {
    title: "QuickBooks Online Integration for Flight Schools",
    description:
      "Paid AerScheduler invoices post to QuickBooks Online as Sales Receipts. Self-serve connect, every plan.",
    url: "/resources/quickbooks-integration",
  },
};

const FAQS = [
  {
    q: "Does AerScheduler integrate with QuickBooks Online?",
    a: "Yes. Connect QuickBooks Online from Settings. When an invoice is paid in AerScheduler, it syncs to QuickBooks as a Sales Receipt.",
  },
  {
    q: "Why Sales Receipts instead of invoices?",
    a: "Stripe already collected the payment in AerScheduler. A Sales Receipt records the sale as paid in QuickBooks without creating a second unpaid invoice or a separate payment entry to reconcile.",
  },
  {
    q: "How are QuickBooks customers matched?",
    a: "AerScheduler looks up QuickBooks customers by email. If no match exists, it creates one and caches the link for later syncs.",
  },
  {
    q: "Is QuickBooks an add-on or enterprise-only feature?",
    a: `No. QuickBooks Online is included on every AerScheduler plan — the same $${PRICE_PER_AIRCRAFT}/mo per aircraft pricing, with a ${TRIAL_DAYS}-day trial.`,
  },
  {
    q: "Do I still need Stripe?",
    a: "Yes. Stripe remains the payment rail for students and renters. QuickBooks is the books of record — payments happen in AerScheduler, then post to QuickBooks.",
  },
];

export default function QuickBooksIntegrationPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <article className="border-b border-border">
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <Breadcrumbs
              items={[
                { name: "Resources", href: "/resources" },
                {
                  name: "QuickBooks integration",
                  href: "/resources/quickbooks-integration",
                },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              QuickBooks Online for flight schools
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Stop exporting CSVs at month-end. AerScheduler posts paid invoices
              to QuickBooks Online as Sales Receipts — matched to the right
              customer by email — so your books stay current as flights close out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/integrations" variant="secondary" size="lg">
                All integrations
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Why flight schools connect QuickBooks
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Most schools already run books in QuickBooks Online. The gap is
            getting ramp activity — dual instruction, rentals, ground — into
            those books without retyping every paid invoice. A native QuickBooks
            integration keeps scheduling, Stripe payments, and accounting in one
            loop instead of a spreadsheet in the middle.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            How the AerScheduler QuickBooks integration works
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Owner connects QuickBooks Online from Settings → Integrations",
              "Students and renters pay invoices in AerScheduler via Stripe",
              "Each paid invoice syncs to QuickBooks as a Sales Receipt",
              "Customers match by email; missing customers are created automatically",
              "Retry and status live on the invoice if a sync needs attention",
              "Included on every plan — not an enterprise upsell",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Sales Receipts, not duplicate invoices
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Payment already happened in AerScheduler. Posting a QuickBooks
            invoice would leave an unpaid document on your books and force a
            second payment step. Sales Receipts record the sale as paid —
            cleaner for schools that collect with Stripe and report in QuickBooks.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            Built into billing, not bolted on
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            AerScheduler already turns closed flights into invoices and Stripe
            payments. QuickBooks sits at the end of that path so your accountant
            sees the same revenue your desk collected. Pair it with{" "}
            <Link
              href="/features/billing"
              className="font-medium text-primary hover:underline"
            >
              flight school billing
            </Link>{" "}
            and the rest of the{" "}
            <Link
              href="/integrations"
              className="font-medium text-primary hover:underline"
            >
              integrations
            </Link>{" "}
            catalog (Stripe and Google Calendar).
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
              Ready to sync flight school billing to QuickBooks?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day trial · ${PRICE_PER_AIRCRAFT}/aircraft/mo · No demo
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
