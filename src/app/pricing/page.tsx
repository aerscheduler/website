import type { Metadata } from "next";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd, PRICING_FAQS } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Software Pricing",
  description: `Simple flight school software pricing at $${PRICE_PER_AIRCRAFT}/mo per aircraft. Simulators and classrooms free. ${TRIAL_DAYS}-day free trial, no credit card, no sales call.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Flight School Software Pricing",
    description: `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Sims and rooms free. ${TRIAL_DAYS}-day trial.`,
    url: "/pricing",
  },
};

const INCLUDED = [
  "Unlimited instructors, students, and renters",
  "Aircraft, simulator, and classroom scheduling",
  "Invoices and online payments",
  "Maintenance squawks and reminders",
  "Native iOS & Android apps + web",
  "Proration when fleet size changes",
];

const FEATURES = [
  {
    title: "Scheduling & dispatch",
    items: ["Lane and week views", "Conflict detection", "Student self-booking", "Ramp in / out"],
  },
  {
    title: "People & compliance",
    items: ["Roles & invite codes", "Documents & currencies", "Instructor availability", "Join requests"],
  },
  {
    title: "Money",
    items: ["Flight → invoice", "Cards on file", "Instruction rates", "Online payments"],
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
            One clear number. Pay for the aircraft you fly, not seats, not
            modules, not a sales conversation.
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
              {TRIAL_DAYS}-day trial. No credit card to begin.
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
      </section>

      <section className="bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface sm:text-3xl">
            Features available out of the box
          </h2>
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
