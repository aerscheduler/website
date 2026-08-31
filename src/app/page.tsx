import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  CalendarDays,
  CreditCard,
  GraduationCap,
  PlayCircle,
  Wrench,
  BarChart3,
  Users,
  MoonStar,
} from "lucide-react";
import { Button } from "@/components/button";
import { ScheduleHeroDemo } from "@/components/mocks/schedule-hero-demo";
import {
  BillingLiveDemo,
  TrainingLiveDemo,
  MaintenanceLiveDemo,
  ReportsLiveDemo,
  MobileLiveDemo,
  SchedulingLiveDemo,
} from "@/components/mocks/living";
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

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:gap-10 lg:pb-28 lg:pt-20">
          <div>
            {/* The eyebrow does the category work the H1 deliberately does not.
                Every paid click on the generic ad group lands here (that ad group
                points at "/"), and somebody who just searched "flight school
                management software" should not have to decode "command deck" to
                learn what this is. It also keeps the exact phrase people search
                in the first line of the page. */}
            <p className="animate-fade-up text-sm font-semibold tracking-tight text-primary">
              Flight school management software
            </p>
            <h1 className="animate-fade-up-delay-1 mt-3 max-w-xl text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-brand-surface sm:text-5xl lg:text-[3.35rem]">
              The command deck for your flight school.
            </h1>
            {/* Was a list of five modules, which answered "what is included" and
                left "why this one" unanswered. Now: one system, live for everyone,
                a published price, and how fast you can be running. Every clause is
                a claim we can stand behind. */}
            <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              The schedule, the invoice and the maintenance record in one system,
              updating live for everyone at once. Set it up this afternoon for
              ${PRICE_PER_AIRCRAFT} per aircraft, with every instructor, student
              and renter included.
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
            {/* "No sales call" earns its place here: every established competitor
                in this market is demo-led, so it is the fastest differentiator to
                read. The no-signup demo used to be spelled out here too, which
                pushed the line to two rows and left one orphaned word; the
                secondary CTA next to it already says the same thing. */}
            <p className="animate-fade-up-delay-3 mt-4 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day free trial · No credit card · No sales call
            </p>
          </div>

          <div className="animate-fade-up-delay-2 flex min-w-0 justify-center">
            <ScheduleHeroDemo />
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <RevealGroup className="grid gap-10 sm:grid-cols-3 sm:gap-0">
            <ValuePoint
              href={DEMO_URL}
              eyebrow="Live demo"
              title="Try it before you sign up"
              body="Open a sample flight school and click around as any role. No account, no sales call."
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

      {/* Five modules: the product spine.
          Photograph rather than the grid-lines pattern it used to carry. This
          is the one section on the home page that has to land the whole
          argument at once, and a row of trainers in front of the hangars says
          "this is your operation" faster than any heading can. Same treatment
          as the statement bands on the feature pages, so the two read as one
          site. */}
      <section className="relative isolate overflow-hidden bg-brand-surface">
        <Image
          src="/photos/homepage-fleet.jpg"
          alt="A row of light training aircraft parked in front of the hangars at golden hour"
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-surface via-brand-surface/85 to-brand-surface/45"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-surface/60 via-transparent to-brand-surface/70"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Five modules. One operation.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Everything a flight school runs day to day, on one data layer,
                so a reservation becomes a graded lesson, an invoice, and a
                report without a spreadsheet in between.
              </p>
            </div>
            <Button
              href="/features"
              className="border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              Explore all features
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <TeaserCard
              href="/features/scheduling"
              icon={<CalendarDays className="size-5" />}
              title="Scheduling"
              body="Dispatch boards, conflict-aware booking, ramp-in close-out."
            />
            <TeaserCard
              href="/features/billing"
              icon={<CreditCard className="size-5" />}
              title="Billing"
              body="Invoices or an account ledger. Cards on file when you are ready."
            />
            <TeaserCard
              href="/features/training"
              icon={<GraduationCap className="size-5" />}
              title="Training"
              body="Syllabi, graded lessons, hours, and endorsements."
            />
            <TeaserCard
              href="/features/maintenance"
              icon={<Wrench className="size-5" />}
              title="Maintenance"
              body="Squawks, inspections, and grounding that blocks the board."
            />
            <TeaserCard
              href="/features/reports"
              icon={<BarChart3 className="size-5" />}
              title="Reporting"
              body="Revenue, hours, utilization, and a dashboard you build."
            />
          </RevealGroup>
        </div>
      </section>

      {/* Scheduling spotlight */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14 lg:py-28">
          <Reveal>
            <p className="text-sm font-semibold text-primary">Scheduling</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              A dispatch board that feels like the ramp.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Lane views for every aircraft, sim, and classroom. Students and
              renters book themselves. Close out with Hobbs and tach, and the
              invoice starts drafting itself.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Day and week boards by resource",
                "Dual, solo, rental, ground, and sim reservations",
                "Self-booking with approval when you want it",
                "Optional cancel locks, late fees, and booking caps",
                "Standby, cancel recovery offers, and optional AI fill of idle matching time",
                "Conflict-aware create and edit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/features/scheduling">
                Explore scheduling
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/docs/scheduling/standby-and-slot-offers" variant="secondary">
                Standby & offers
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex min-w-0 justify-center">
            <SchedulingLiveDemo animated={false} />
          </Reveal>
        </div>
      </section>

      {/* Billing spotlight + hard cases tucked underneath */}
      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14">
            <Reveal delay={120} className="order-2 flex min-w-0 justify-center lg:order-1">
              <BillingLiveDemo animated={false} />
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-primary">Billing</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
                Close-out posts the bill.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Close out a flight and the line items write themselves. Bill each
                visit with a Stripe invoice, or put members on an account ledger
                with Add funds and auto-refill. No separate billing tool taped onto
                the schedule.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Invoice each booking, or Account ledger for a running balance",
                  "Auto-drafted bills from Hobbs and tach close-out",
                  "Saved cards, autopay, and optional auto-refill",
                  "AR: unpaid invoices, or who owes on Accounts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/features/billing">
                  Explore billing
                  <ChevronRight className="size-4 opacity-80" />
                </Button>
                <Button href="/resources/quickbooks-integration" variant="secondary">
                  QuickBooks
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Specialty cases: proof under Billing, not peers of the product */}
          <Reveal className="mt-14 border-t border-border pt-10">
            <p className="text-sm font-semibold text-primary">
              Billing that matches real flights
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The bookings most schools fake in a spreadsheet are just bookings
              here.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <HardCaseCard
                icon={<Users className="size-4" />}
                title="Split billing"
                body="One flight, one invoice each. Split evenly, by hours flown, or by a share you set."
                href="/resources/split-billing-shared-flights"
              />
              <HardCaseCard
                icon={<MoonStar className="size-4" />}
                title="Overnight and multi-day"
                body="Book the whole trip. Charge a minimum for each night the aircraft is away."
                href="/resources/overnight-and-multi-day-rentals"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Training spotlight */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14 lg:py-28">
          <Reveal>
            <p className="text-sm font-semibold text-primary">Training</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              Syllabus, hours, and endorsements in one record.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Build or import a syllabus, enroll a student, grade lessons off
              the flights you already booked, and sign endorsements. Part 61
              and Part 141.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Private, Instrument, Commercial, and CFI syllabi to start from",
                "Graded lessons tied to the bookings on the board",
                "Hour requirements tracked apart from lesson checklists",
                "Endorsements from AC 61-65K, with expiry where it matters",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/features/training">
                Explore training
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/resources/flight-training-records" variant="secondary">
                Training records guide
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex min-w-0 justify-center">
            <TrainingLiveDemo animated={false} />
          </Reveal>
        </div>
      </section>

      {/* Maintenance spotlight */}
      <section
        id="maintenance"
        aria-labelledby="home-maintenance-heading"
        className="border-t border-border bg-[#fafbfc]"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14 lg:py-28">
          <Reveal delay={120} className="order-2 flex min-w-0 justify-center lg:order-1">
            <MaintenanceLiveDemo animated={false} />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-primary">Maintenance</p>
            <h2
              id="home-maintenance-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl"
            >
              Squawks and AVIATES inspections on every tail.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Log defects at the aircraft, track annuals and 100-hours by Hobbs
              or calendar date, and ground a tail so it cannot be booked. Same
              data as the schedule — grounded aircraft leave the board.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Open and resolved squawks with optional grounding",
                "AVIATES inspections: annual, 100-hour, ELT, transponder, and more",
                "Hour- and date-based countdowns that move with close-out",
                "Sign off overdue items and return the aircraft to service",
                "Grounded status visible across scheduling and self-booking",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/features/maintenance">
                Explore maintenance
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/docs/maintenance/how-maintenance-tracking-works" variant="secondary">
                How maintenance works
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reporting spotlight */}
      <section
        id="reporting"
        aria-labelledby="home-reporting-heading"
        className="border-t border-border bg-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14 lg:py-28">
          <Reveal>
            <p className="text-sm font-semibold text-primary">Reporting</p>
            <h2
              id="home-reporting-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl"
            >
              Filter any report. Save it. Schedule it. Pin it.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Revenue, hours, instruction, and utilization on the same data as
              the schedule. Every figure on your dashboard opens the report
              behind it — same numbers, always.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Filter, group, and re-order any report the way you think about it",
                "Save a view for next month — Dual on N8830M, overdue invoices, and more",
                "Email a saved view to your team daily, weekly, or monthly",
                "Build your own Overview dashboard; each tile can pin its own date range",
                "Export any report to CSV",
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
          <Reveal delay={120} className="flex min-w-0 justify-center">
            <ReportsLiveDemo animated={false} />
          </Reveal>
        </div>
      </section>

      {/* Mobile spotlight */}
      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-28">
          <Reveal delay={120} className="order-2 flex min-w-0 justify-center lg:order-1">
            <div className="animate-float w-full min-w-0">
              <MobileLiveDemo animated={false} />
            </div>
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

      {/* Clubs side door: demoted from a full spotlight */}
      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Reveal>
            <Link
              href="/features/memberships"
              className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-5 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:gap-8 sm:px-8"
            >
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Also for flying clubs
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-brand-surface">
                  Membership dues that collect themselves on the 1st.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Tiers, joining fees, prorated mid-month joins. Same invoices
                  and reports as the rest of the school.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-primary">
                Explore memberships
                <ChevronRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Pricing teaser.
          `overflow-hidden` because the price card's glow is `-inset-6` (24px)
          inside a 16px mobile gutter, which pushed the whole document 8px wider
          than the viewport and gave the homepage a horizontal scroll on a
          phone. The glow is translucent and well inside the container at
          desktop widths, so clipping it costs nothing visually. */}
      <section className="overflow-hidden border-t border-border bg-white">
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
                  "Enterprise plan for API access, integrations, and dedicated support",
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
                  See full pricing & Enterprise
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
              role. Nothing to install, no signup. Ready to make it yours? Add a tail
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

function HardCaseCard({
  icon,
  title,
  body,
  href,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/30"
    >
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <p className="font-semibold tracking-tight text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
        <span className="mt-3 inline-flex items-center gap-0.5 text-sm font-semibold text-primary">
          Read the guide
          <ChevronRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Sits on the photographic band, so it is styled for a dark ground: a
 * translucent card with a blur behind it rather than white, which would punch
 * five bright holes in the photograph and undo the reason for having it.
 */
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
      className="rounded-xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-white/[0.12]"
    >
      <div className="inline-flex size-10 items-center justify-center rounded-lg bg-white/10 text-white">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/65">{body}</p>
    </Link>
  );
}
