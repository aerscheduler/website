import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Download, Layers, Rocket, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { contactHref } from "@/lib/contact";
import { faqJsonLd, MYFBO_MIGRATION_FAQS } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Migrating from MyFBO to AerScheduler",
  description:
    "MyFBO is shutting down in August 2026. Back up your data and set up AerScheduler yourself in minutes. Self-serve migration guide for flight schools.",
  alternates: { canonical: "/migrating/my-fbo" },
  openGraph: {
    title: "Migrating from MyFBO to AerScheduler",
    description:
      "Self-serve playbook for flight schools leaving MyFBO. No sales call required.",
    url: "/migrating/my-fbo",
  },
};

const STEPS = [
  {
    n: "1",
    title: "Back up your MyFBO data",
    body: "While your account is still live, download MyFBO’s database backup (.bak). Keep a copy you control. That file is your history no matter where you land.",
  },
  {
    n: "2",
    title: "Create your AerScheduler account",
    body: `Self-serve signup takes minutes. Add your fleet, invite your team, and put something on the schedule. ${TRIAL_DAYS}-day trial, no credit card.`,
  },
  {
    n: "3",
    title: "Run both systems in parallel",
    body: "Keep MyFBO online while your team practices on AerScheduler. Cut over when dispatch and billing feel right, on your timeline.",
  },
  {
    n: "4",
    title: "Cut over when you’re ready",
    body: "Pick a quieter week, flip the team to AerScheduler, and keep your MyFBO backup archived for records.",
  },
];

const MAP = [
  ["Online scheduling", "Lane dispatch, week views, student self-booking"],
  ["Aircraft & instructors", "Fleet, rates, grounding, instructor availability"],
  ["Members & students", "Roster, invite codes, roles, documents"],
  ["Invoicing & balances", "Flight → invoice or ledger, cards on file, online payments"],
  ["Web-only access", "Web console plus a native iOS app"],
];

export default function MigratingMyFboPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(MYFBO_MIGRATION_FAQS)} />
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:pt-16">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "Migrating from MyFBO", href: "/migrating/my-fbo" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold text-primary">Switching guides</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Migrating from MyFBO to AerScheduler
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            MyFBO is shutting down in August 2026. Before you choose a next home,
            secure your data. Then set up AerScheduler yourself. No demo queue,
            no sales call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="#playbook" variant="secondary" size="lg">
              Migration playbook
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Also looking at other platforms? This playbook works for any switch.
            More guides coming under{" "}
            <span className="font-medium text-foreground">/migrating</span>.
          </p>
        </div>
      </section>

      {/* Do this first */}
      <section className="bg-[#fafbfc] border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Download className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
                Do this first: back up your MyFBO data
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Whatever platform you move to, download MyFBO’s{" "}
                <span className="font-medium text-foreground">.bak</span> database
                backup while your account is still active. That file is your
                operational history. Keep it somewhere you control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Playbook */}
      <section id="playbook" className="scroll-mt-24 border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-surface">
            A simple migration playbook
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Four steps. Self-serve the whole way. AerScheduler is built so you
            can stand up a working schedule in one sitting.
          </p>
          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="rounded-xl border border-border bg-white p-6 shadow-sm"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {step.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why AerScheduler */}
      <section className="border-b border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-surface">
            Why schools pick AerScheduler
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Rocket className="size-5" />,
                title: "Live in minutes",
                body: "Competitors often gate setup behind a demo. AerScheduler is fully self-serve. Add a plane and book it today.",
              },
              {
                icon: <Layers className="size-5" />,
                title: "One connected platform",
                body: "Schedule, roster, billing, and maintenance share the same data. A reservation becomes an invoice without exports.",
              },
              {
                icon: <Users className="size-5" />,
                title: "Pay for aircraft, not seats",
                body: `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Unlimited users. Sims and classrooms free.`,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability map */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-surface">
            What you ran in MyFBO → AerScheduler
          </h2>
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-[1fr_1fr] border-b border-border bg-muted/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-6">
              <span>In MyFBO</span>
              <span>In AerScheduler</span>
            </div>
            {MAP.map(([from, to]) => (
              <div
                key={from}
                className="grid grid-cols-[1fr_1fr] gap-4 border-b border-border px-4 py-4 text-sm last:border-b-0 sm:px-6"
              >
                <span className="text-muted-foreground">{from}</span>
                <span className="font-medium text-foreground">{to}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Need help mapping a CSV export?{" "}
            <Link href={contactHref("migration")} className="font-medium text-primary hover:underline">
              Send us the details
            </Link>{" "}
            and we&apos;ll walk through it. We still keep signup self-serve.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Migration questions
          </h2>
          <dl className="mt-10 divide-y divide-border">
            {MYFBO_MIGRATION_FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 rounded-xl border border-border bg-[#fafbfc] p-6 text-center">
            <p className="font-semibold text-foreground">Ready when you are</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day trial · ${PRICE_PER_AIRCRAFT}/aircraft/mo · No sales call
            </p>
            <Button href={SIGNUP_URL} size="lg" className="mt-5">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              <Link href="/pricing" className="text-primary hover:underline">
                See pricing
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
