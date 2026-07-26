import type { ReactNode } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Plane,
  CalendarDays,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/button";
import { ProductMock } from "@/components/product-mock";
import { PhoneMock } from "@/components/phone-mock";
import { StoreBadges } from "@/components/store-badges";
import {
  PRICE_PER_AIRCRAFT,
  SIGNUP_URL,
  TRIAL_DAYS,
  LOGIN_URL,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-90" aria-hidden />
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-20">
          <div>
            <p className="animate-fade-up text-sm font-semibold tracking-tight text-primary">
              AerScheduler
            </p>
            <h1 className="animate-fade-up-delay-1 mt-3 max-w-xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-brand-surface sm:text-5xl lg:text-[3.35rem]">
              The command deck for your flight school.
            </h1>
            <p className="animate-fade-up-delay-2 mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Schedule aircraft, manage instructors and renters, and keep billing
              square on the web and in native iOS & Android apps.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Get started
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href={LOGIN_URL} variant="secondary" size="lg">
                Sign in
              </Button>
            </div>
            <p className="animate-fade-up-delay-3 mt-4 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day free trial · No credit card · No sales call
            </p>
          </div>

          <div className="animate-fade-up-delay-2 flex justify-center lg:justify-end">
            <ProductMock />
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            <ValuePoint
              href={SIGNUP_URL}
              eyebrow="Get started"
              title="Self-serve in minutes"
              body="Create an account and book your first aircraft today. No demo queue."
            />
            <ValuePoint
              href="/pricing"
              eyebrow="Pricing"
              title={
                <>
                  <span className="tabular-nums">${PRICE_PER_AIRCRAFT}</span>
                  <span className="text-[0.55em] font-semibold tracking-normal text-muted-foreground">
                    /mo
                  </span>{" "}
                  per aircraft
                </>
              }
              body="Simulators and classrooms are always free on your bill."
              rule
            />
            <ValuePoint
              href="/features/mobile"
              eyebrow="Mobile"
              title="Native iOS & Android"
              body="The same operation in your pocket, not a mobile website."
              rule
            />
          </div>
        </div>
      </section>

      {/* Product teaser → /product */}
      <section className="relative bg-[#fafbfc]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                Everything your operation needs to fly.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Scheduling, roster, billing, and maintenance on one data layer,
                so a reservation becomes an invoice without a spreadsheet in between.
              </p>
            </div>
            <Button href="/features" variant="secondary">
              Explore features
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TeaserCard
              href="/features/scheduling"
              icon={<CalendarDays className="size-5" />}
              title="Dispatch"
              body="Lane boards, conflict-aware booking, ramp-in close-out."
            />
            <TeaserCard
              href="/features/fleet"
              icon={<Plane className="size-5" />}
              title="Fleet"
              body="Aircraft, sims, and rooms, with rates and grounding."
            />
            <TeaserCard
              href="/features/billing"
              icon={<CreditCard className="size-5" />}
              title="Billing"
              body="Flights draft invoices. Cards on file when you're ready."
            />
            <TeaserCard
              href="/features/mobile"
              icon={<Smartphone className="size-5" />}
              title="Native apps"
              body="iOS and Android for students, instructors, and the desk."
            />
          </div>
        </div>
      </section>

      {/* Mobile spotlight */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-28">
          <div className="order-2 flex justify-center lg:order-1">
            <PhoneMock className="animate-float" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-primary">Native mobile</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              Built for the ramp, not a shrunk-down desktop.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Students book from their phone. Instructors check the day on the go.
              Dispatchers aren&apos;t chained to a front-desk PC. Same schedule,
              same invoices in real native apps for iOS and Android.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Book and manage lessons from anywhere",
                "See aircraft availability in real time",
                "Pay invoices and keep documents current",
                "Works alongside the full web app at app.aerscheduler.com",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <StoreBadges />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                Simple pricing that scales with your fleet.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Pay for aircraft. Simulators and ground-school rooms are free.
                Start with a {TRIAL_DAYS}-day trial. No card required.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited instructors, students, and renters",
                  "Web console + native iOS & Android included",
                  "Prorated when you add or remove a tail",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[linear-gradient(118deg,rgba(25,103,210,0.18),rgba(14,165,233,0.2),rgba(16,35,63,0.12))]"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-8 shadow-lg">
                <p className="text-sm font-semibold text-primary">Per aircraft</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight text-brand-surface tabular-nums">
                    ${PRICE_PER_AIRCRAFT}
                  </span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Billed monthly. Sims & rooms free. {TRIAL_DAYS} days free to start.
                </p>
                <Button href={SIGNUP_URL} size="lg" className="mt-8 w-full">
                  Start free trial
                  <ChevronRight className="size-4 opacity-80" />
                </Button>
                <Button href="/pricing" variant="ghost" className="mt-2 w-full">
                  See full pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-brand-surface text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Two minutes to a bookable aircraft.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">
              No demo queue. Create an account, add a tail, and put something on
              the schedule today, then open it on your phone.
            </p>
          </div>
          <Button href={SIGNUP_URL} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
            Get started
            <ChevronRight className="size-4 opacity-80" />
          </Button>
        </div>
      </section>
    </>
  );
}

function ValuePoint({
  href,
  eyebrow,
  title,
  body,
  rule,
}: {
  href: string;
  eyebrow: string;
  title: ReactNode;
  body: string;
  rule?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-xl sm:px-8 sm:py-1 lg:px-10 ${
        rule
          ? "sm:before:absolute sm:before:inset-y-2 sm:before:left-0 sm:before:w-px sm:before:bg-border"
          : ""
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </p>
      <p className="mt-3 text-xl font-semibold tracking-tight text-brand-surface transition-colors duration-150 group-hover:text-primary sm:text-[1.35rem]">
        {title}
      </p>
      <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
      <span className="mt-4 inline-flex items-center gap-0.5 text-sm font-semibold text-primary">
        Learn more
        <ChevronRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function TeaserCard({
  href,
  icon,
  title,
  body,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-primary/30"
    >
      <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </Link>
  );
}
