import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { contactHref } from "@/lib/contact";
import { signupUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Integrations",
  description:
    "AerScheduler integrates with Stripe, Google Calendar, and QuickBooks Online. Connect the tools your flight school already uses — on every plan.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Flight School Software Integrations",
    description:
      "Stripe, Google Calendar, and QuickBooks Online — available now on every plan.",
    url: "/integrations",
  },
};

type Status = "available" | "coming_soon";

const INTEGRATIONS: {
  name: string;
  status: Status;
  blurb: string;
  detail: string;
  logo: string;
  logoAlt: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
}[] = [
  {
    name: "Stripe",
    status: "available",
    blurb: "Cards on file, invoices, and online payments for your school.",
    detail:
      "Accept cards and pay invoices through Stripe. Subscription billing for your school runs through Stripe too. No separate gateway to wire up.",
    logo: "/integrations/stripe.svg",
    logoAlt: "Stripe logo",
  },
  {
    name: "Google Calendar",
    status: "available",
    blurb: "Push lessons and reservations to personal calendars.",
    detail:
      "Sync instructor and student schedules out to Google Calendar so flights show up next to everything else.",
    logo: "/integrations/google-calendar.svg",
    logoAlt: "Google Calendar logo",
  },
  {
    name: "QuickBooks",
    status: "available",
    blurb: "Paid invoices post to QuickBooks as Sales Receipts.",
    detail:
      "Connect QuickBooks Online from Settings. Paid AerScheduler invoices sync as Sales Receipts — matched to customers by email, without CSV exports.",
    logo: "/integrations/quickbooks.svg",
    logoAlt: "QuickBooks logo",
    learnMoreHref: "/resources/quickbooks-integration",
    learnMoreLabel: "How QuickBooks sync works",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:pt-16">
          <Breadcrumbs items={[{ name: "Integrations", href: "/integrations" }]} />
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Flight school software integrations
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Stripe payments, Google Calendar sync, and QuickBooks Online are live
            today — in the same self-serve product, not as an enterprise add-on.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {INTEGRATIONS.map((item) => (
              <article
                key={item.name}
                className="flex flex-col rounded-xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-white p-2 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.logo}
                      alt={item.logoAlt}
                      width={40}
                      height={40}
                      className="size-10 object-contain"
                    />
                  </div>
                  <StatusPill status={item.status} />
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {item.name}
                </h2>
                <p className="mt-2 text-sm font-medium text-foreground/80">
                  {item.blurb}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
                {item.learnMoreHref ? (
                  <Link
                    href={item.learnMoreHref}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {item.learnMoreLabel ?? "Learn more"}
                    <ChevronRight className="size-3.5" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-[#fafbfc] p-8 md:flex md:items-center md:justify-between md:gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
                Need something else?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tell us what you integrate with today. Roadmap priorities follow
                real school demand, and everything ships to every plan, not a
                premium tier.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
              <Button href={contactHref("integration")} variant="secondary">
                Request an integration
              </Button>
              <Button href={signupUrl("quickbooks")}>
                Get started
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatusPill({ status }: { status: Status }) {
  if (status === "available") {
    return (
      <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
        Available
      </span>
    );
  }
  return (
    <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
      Coming soon
    </span>
  );
}
