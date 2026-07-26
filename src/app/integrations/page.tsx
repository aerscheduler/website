import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Calendar, ChevronRight, CreditCard, BookOpen } from "lucide-react";
import { Button } from "@/components/button";
import { SIGNUP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "AerScheduler integrations — Stripe payments today, Google Calendar and QuickBooks coming soon.",
};

type Status = "available" | "coming_soon";

const INTEGRATIONS: {
  name: string;
  status: Status;
  blurb: string;
  detail: string;
  icon: ReactNode;
}[] = [
  {
    name: "Stripe",
    status: "available",
    blurb: "Cards on file, invoices, and Connect for school collections.",
    detail:
      "Accept cards and pay invoices through Stripe. Subscription billing for your school runs through Stripe too — no separate gateway to wire up.",
    icon: <CreditCard className="size-5" />,
  },
  {
    name: "Google Calendar",
    status: "coming_soon",
    blurb: "Push lessons and reservations to personal calendars.",
    detail:
      "Sync instructor and student schedules out to Google Calendar so flights show up next to everything else. We’re building this next — join and you’ll get it when it ships.",
    icon: <Calendar className="size-5" />,
  },
  {
    name: "QuickBooks",
    status: "coming_soon",
    blurb: "Send closed-out flights and invoices into your books.",
    detail:
      "Close the loop from ramp-in to accounting without CSV exports. QuickBooks Online integration is on the roadmap.",
    icon: <BookOpen className="size-5" />,
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:pt-20">
          <p className="text-sm font-semibold text-primary">Integrations</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Connect the tools your school already uses.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Payments run on Stripe today. Calendar and accounting connections are
            next — we&apos;ll ship them into the same self-serve product, not as
            enterprise add-ons.
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
                  <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
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
                real school demand — and everything ships to every plan, not a
                premium tier.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
              <Button href="mailto:support@aerscheduler.com" variant="secondary">
                Request an integration
              </Button>
              <Button href={SIGNUP_URL}>
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
