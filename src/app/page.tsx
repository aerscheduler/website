import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Plane,
  CalendarDays,
  CreditCard,
  Smartphone,
  PlayCircle,
  Users,
  MoonStar,
} from "lucide-react";
import { Button } from "@/components/button";
import { ProductMock } from "@/components/product-mock";
import { PhoneMock } from "@/components/phone-mock";
import { ReportsMock } from "@/components/mocks";
import { StoreBadges } from "@/components/store-badges";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { Reveal, RevealGroup } from "@/components/reveal";
import {
  PRICE_PER_AIRCRAFT,
  SIGNUP_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  TRIAL_DAYS,
  DEMO_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | Flight School Management Software`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Flight School Management Software`,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <HeroAtmosphere />

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
              square on the web and in a native iOS app.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href={DEMO_URL} variant="secondary" size="lg">
                <PlayCircle className="size-4 opacity-80" />
                See the live demo
              </Button>
            </div>
            <p className="animate-fade-up-delay-3 mt-4 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day free trial · No credit card · Or explore the demo — no
              signup
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
          <RevealGroup className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            <ValuePoint
              href={DEMO_URL}
              eyebrow="Live demo"
              title="Try it before you sign up"
              body="Open a sample flight school and click around as any role — no account, no sales call."
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
              href="/app"
              eyebrow="Mobile"
              title="Native iOS"
              body="The same operation in your pocket, not a mobile website."
              rule
            />
          </RevealGroup>
        </div>
      </section>

      {/* Product teaser → /product */}
      <section className="relative bg-[#fafbfc]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              href="/app"
              icon={<Smartphone className="size-5" />}
              title="Native app"
              body="iOS for students, instructors, and the desk."
            />
          </RevealGroup>
        </div>
      </section>

      {/* Reports spotlight — the newest thing worth showing, and the one
          competitors do worst. Mirrors the mobile spotlight's layout with the
          visual on the opposite side so the page alternates down the scroll. */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28">
          <Reveal>
            <p className="text-sm font-semibold text-primary">Reports &amp; dashboards</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              The numbers behind the schedule.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Reports across revenue, hours, instruction, and compliance — and a
              dashboard you build yourself, where every figure opens the report
              behind it.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Booked vs flown vs billed, per tail",
                "Revenue by aircraft, instructor, or lesson type",
                "Save a view, pin it to the board, export it",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/features/reports">
                Explore reporting
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/resources/flight-school-reports" variant="secondary">
                Reporting guide
              </Button>
            </div>
          </Reveal>
          {/* The visual lands just after the sentence that sets it up. */}
          <Reveal delay={120} className="flex justify-center lg:justify-end">
            <ReportsMock />
          </Reveal>
        </div>
      </section>

      {/* Billing edge cases.
          The two bookings a school actually rings up about, and the two most competitors
          cannot express: a flight shared between people, and an aircraft kept overnight.
          Cards rather than a two-column spotlight because both only land once you have seen
          the arithmetic, and a worked example needs prose room the spotlight bullets don't
          have. Backgrounds from here down are shifted one step to keep the page alternating. */}
      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">Billing that matches the flight</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                The two bookings other software makes you fake.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                A flight two people share, and an aircraft somebody keeps for the
                weekend. Most schools handle both with a spreadsheet and an apology.
                Here they are just bookings.
              </p>
            </div>
            <Button href="/features/billing" variant="secondary">
              How billing works
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-2">
            <ExampleCard
              icon={<Users className="size-5" />}
              eyebrow="Split billing"
              title="One flight, one invoice each"
              body="Put everyone who flew on the booking and pick how the charge divides: evenly, by the hours each pilot flew, per head for a ground school, or a share you set yourself."
              example="Two renters share the 172. One booking, one close-out, two invoices that add up to exactly what the flight cost. Nobody re-types anything."
              href="/resources/split-billing-shared-flights"
            />
            <ExampleCard
              icon={<MoonStar className="size-5" />}
              eyebrow="Overnight & multi-day"
              title="A weekend away, priced like one"
              body="Book the whole trip as one reservation and the tail is unavailable for every day of it. Charge a minimum for each night it is away, school-wide or per aircraft."
              example="Out Friday, back Sunday, 1.5 hours flown. Two nights at a 2.0 hour minimum bills 4.0 hours, and the member reads that on the booking screen before they agree to it."
              href="/resources/overnight-and-multi-day-rentals"
            />
          </RevealGroup>
        </div>
      </section>

      {/* Mobile spotlight */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-28">
          <Reveal delay={120} className="order-2 flex justify-center lg:order-1">
            <PhoneMock className="animate-float" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-primary">Native mobile</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              Built for the ramp, not a shrunk-down desktop.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Students book from their phone. Instructors check the day on the go.
              Dispatchers aren&apos;t chained to a front-desk PC. Same schedule,
              same invoices in a real native app for iOS.
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
            <div className="mt-6">
              <Button href="/app" variant="secondary">
                App download page
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing teaser.
          `overflow-hidden` because the price card's glow is `-inset-6` (24px)
          inside a 16px mobile gutter, which pushed the whole document 8px wider
          than the viewport and gave the homepage a horizontal scroll on a
          phone. The glow is translucent and well inside the container at
          desktop widths, so clipping it costs nothing visually. */}
      <section className="overflow-hidden border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <Reveal>
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
                  "Web console + native iOS app included",
                  "Prorated when you add or remove a tail",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="relative">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-brand-surface text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <Reveal className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              See it running before you commit.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">
              Open the live demo and walk a real schedule, roster, and reports as any
              role — nothing to install, no signup. Ready to make it yours? Add a tail
              and go, or bring your questions.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-wrap items-center gap-3">
            <Button href={DEMO_URL} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
              <PlayCircle className="size-4 opacity-80" />
              Try the live demo
            </Button>
            <Button
              href={SIGNUP_URL}
              size="lg"
              className="border border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </Reveal>
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

/**
 * A capability with the arithmetic shown.
 *
 * Bigger than `TeaserCard` on purpose: split billing and overnight minimums are the two
 * things an operator reads twice, and the worked example in `example` is what settles it.
 * The example sits in its own tinted box so it reads as a number rather than more prose.
 */
function ExampleCard({
  icon,
  eyebrow,
  title,
  body,
  example,
  href,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  example: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-white p-7 shadow-sm transition-colors hover:border-primary/30"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-surface">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      <p className="mt-5 rounded-lg bg-[#fafbfc] px-4 py-3 text-sm leading-relaxed text-foreground">
        {example}
      </p>
      {/* mt-auto so both cards' links sit on the same line however the copy wraps. */}
      <span className="mt-auto inline-flex items-center gap-0.5 pt-6 text-sm font-semibold text-primary">
        Read the guide
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
