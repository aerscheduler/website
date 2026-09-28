import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  GraduationCap,
  PlayCircle,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/button";
import { FeatureSection, type FeatureSectionData } from "@/components/landing/feature-sections";
import { STATUS } from "@/components/landing/product-tokens";
import { PhoneMock } from "@/components/phone-mock";
import { StoreBadges } from "@/components/store-badges";
import { SkyScrim } from "@/components/sky-scrim";
import { Reveal, RevealGroup } from "@/components/reveal";
import {
  BillingComposite,
  HeroConsole,
  MobileHome,
  MaintenanceComposite,
  ReportingComposite,
  SchedulingComposite,
  TrainingComposite,
} from "@/components/landing/product-composites";
import {
  DEMO_URL,
  PRICE_PER_AIRCRAFT,
  SIGNUP_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  TRIAL_DAYS,
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

/*
 * The home page, rebuilt 2026-09-27 in the Linear style Tony picked after we
 * studied Linear, Raycast, Vercel, Stripe and Apple. What it copies:
 *
 * 1. THE PRODUCT, DRAWN BY HAND. HTML composites of the console (`components/landing/product-composites.tsx`): two panels, one
 *    overlapping the other, fading into the page at the edges. Rejected along
 *    the way: an abstract one-shape motion loop, real screenshots ("look so
 *    cheap"), and light mocks in a pinned tour ("I don't like this style").
 *    Every name and figure in them is invented.
 * 2. LINEAR'S SECTION PATTERN, VARIED. A two-line title, a paragraph and
 *    "Learn more", the composite, then a "Features" row of links, one section
 *    per module. Five identical sections in a row read as repetitive (Tony), so
 *    each has its own layout (`feature-sections.tsx`).
 *    Headings stay plain ("Maintenance tracking").
 * 3. THINGS HAPPEN AS YOU SCROLL. The hero window grows and flattens with the
 *    page scroll and its bookings land on load; each composite's back and front
 *    panels rise at different speeds (`.rise-back`, `.rise-front`), and its
 *    rows, bars and dots play once in view (`Moment`); the price statement
 *    fills word by word. CSS scroll-driven animation plus IntersectionObserver,
 *    no animation library, and readable with motion or JavaScript off.
 * 4. LIGHT, like every other page on the site (it was dark for a day; Tony
 *    moved it back for consistency). One accent, status colours only where
 *    they mean something.
 *
 * Kept on purpose: "Five modules. One operation." (Tony's favourite; leave it
 * exactly as it is) and the mobile app card.
 */

const PAGE_BG = "bg-white";

/**
 * The five feature sections, each with its own layout (see
 * `feature-sections.tsx`). Every "Features" link goes to a real page.
 */
const SECTIONS: FeatureSectionData[] = [
  {
    id: "scheduling",
    color: STATUS.blue,
    layout: "split",
    title: <>Scheduling<br />and dispatch</>,
    body: "Students and renters book from their phones under the rules you set. Currency, conflicts, grounded aircraft and open squawks show before a booking saves.",
    href: "/features/scheduling",
    visual: <SchedulingComposite />,
    features: [
      [
        { label: "Dispatch board", href: "/features/scheduling" },
        { label: "Self-booking", href: "/features/self-booking" },
        { label: "Currency checks", href: "/features/compliance" },
      ],
      [
        { label: "Standby and suggested slots", href: "/docs/scheduling/standby-and-slot-offers" },
        { label: "Multi-day trips", href: "/resources/overnight-and-multi-day-rentals" },
        { label: "Discovery flight requests", href: "/docs/scheduling/public-booking-requests" },
      ],
    ],
  },
  {
    id: "billing",
    color: STATUS.green,
    layout: "closeout",
    title: <>Billing<br />at close-out</>,
    body: "Hobbs and tach go in at ramp-in and the invoice is built from your rates. Charge a card on file, run autopay, or keep members on a prepaid account ledger.",
    href: "/features/billing",
    visual: <BillingComposite />,
    features: [
      [
        { label: "Invoices and autopay", href: "/features/billing" },
        { label: "Account ledger", href: "/features/billing" },
        { label: "Split billing", href: "/resources/split-billing-shared-flights" },
      ],
      [
        { label: "Club dues", href: "/features/memberships" },
        { label: "QuickBooks Online", href: "/resources/quickbooks-integration" },
        { label: "Stripe payouts", href: "/features/integrations" },
      ],
    ],
  },
  {
    id: "training",
    color: STATUS.purple,
    layout: "side",
    title: <>Training<br />records</>,
    body: "Part 61 and Part 141 courses with stages and stage checks. Lessons are graded against the flights that flew them, and hours credit themselves toward each requirement.",
    href: "/features/training",
    visual: <TrainingComposite />,
    features: [
      [
        { label: "Syllabi and stages", href: "/features/training" },
        { label: "Graded lessons", href: "/features/training" },
        { label: "Endorsements", href: "/resources/flight-training-records" },
      ],
      [
        { label: "Offline grading", href: "/features/mobile" },
        { label: "Instructor rates", href: "/features/instruction" },
        { label: "Training records", href: "/resources/flight-training-records" },
      ],
    ],
  },
  {
    id: "maintenance",
    color: STATUS.orange,
    layout: "readouts",
    title: <>Maintenance<br />tracking</>,
    body: "Every inspection counts down by tach, Hobbs or calendar month, and squawks come in from the ramp with photos. An overdue annual or 100-hour grounds the aircraft until it is signed off.",
    href: "/features/maintenance",
    visual: <MaintenanceComposite />,
    features: [
      [
        { label: "Inspection tracking", href: "/features/inspections" },
        { label: "Squawks", href: "/features/maintenance" },
        { label: "Automatic grounding", href: "/features/maintenance" },
      ],
      [
        { label: "AD compliance", href: "/resources/airworthiness-directive-tracking" },
        { label: "Go / No-Go board", href: "/docs/maintenance/use-the-go-no-go-board" },
        { label: "Mechanic access", href: "/docs/maintenance/who-can-do-what-in-maintenance" },
      ],
    ],
  },
  {
    id: "reporting",
    color: "#0f9aa8",
    layout: "tint",
    title: <>Reporting<br />and insight</>,
    body: "21 reports on the same records as the schedule, from revenue and utilization to currency and endorsements. Filter and group any of them, save the view, export it to CSV or PDF, or email it daily, weekly or monthly.",
    href: "/features/reports",
    visual: <ReportingComposite />,
    features: [
      [
        { label: "Revenue by aircraft", href: "/features/reports" },
        { label: "Utilization", href: "/features/utilization" },
        { label: "Saved views", href: "/features/reports" },
      ],
      [
        { label: "Scheduled emails", href: "/features/reports" },
        { label: "Custom dashboard", href: "/features/reports" },
        { label: "Reporting guide", href: "/resources/flight-school-reports" },
      ],
    ],
  },
];

const APP_ROLES: { who: string; what: string }[] = [
  { who: "Students and renters", what: "Book aircraft and pay invoices from their phone." },
  { who: "Instructors", what: "See the day and grade lessons in the app, even without a signal." },
  { who: "Mechanics", what: "Log squawks with photos and attach inspection files from the ramp." },
  { who: "Everyone", what: "Push notifications when the schedule changes, and standby offers to accept." },
];

const INCLUDED = [
  "Scheduling, billing, training, maintenance and reporting",
  "Unlimited instructors, students and renters",
  "iOS and Android apps",
  "Simulators and classrooms at no charge",
  "No setup fee and no contract",
];

/**
 * Real customer words only. The section renders nothing while this is empty, so
 * adding the first quote is the whole job. Never paraphrase a customer or invent
 * an attribution to fill it.
 */
type Testimonial = { quote: string; name: string; role: string; school: string };
const TESTIMONIALS: Testimonial[] = [];

export default function HomePage() {
  return (
    <div className={`${PAGE_BG} text-[#0b0b0d]`}>
      {/* Hero: the headline, subhead and calls to action centered over still
          column lines, then the dispatch board with the mobile app
          stacked over it, growing flat as the page scrolls. */}
      <section className="relative isolate overflow-hidden">
        {/* The same still column lines the hero carried before the rebuild
            (`.grid-lines`), fading out before the board. Footage, streamlines
            and an animated grid with beams and a cursor glow were tried and
            dropped as too busy. */}
        <div
          className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:pt-24">
          {/* The category phrase is the first line of the H1, styled as a pill.
              Every paid click on the generic ad group lands here, and somebody
              who searched "flight school management software" should read those
              words first. Keeping it INSIDE the h1 puts the exact search phrase
              in the page's main heading. */}
          <h1 className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-tight text-[#1b1c1f] shadow-sm sm:text-sm">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Flight school management software
            </span>
            <span className="sr-only">: </span>
            <span className="mx-auto mt-6 block max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#0b0b0d] sm:text-6xl lg:text-[5rem]">
              The command deck for your flight school.
            </span>
          </h1>
          {/* Calls to action directly under the promise, where the eye already
              is. They used to sit alone on the far right, which read as an
              afterthought. */}
          <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl">
            Scheduling, billing, training records and maintenance tracking in
            one system, with iOS and Android apps. ${PRICE_PER_AIRCRAFT} per
            aircraft, with every instructor, student and renter included.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href={DEMO_URL} size="lg" variant="secondary">
              <PlayCircle className="size-4 opacity-80" />
              Try the live demo
            </Button>
          </div>
          <p className="animate-fade-up-delay-3 mt-4 text-sm text-black/45">
            {TRIAL_DAYS}-day free trial · No credit card · No sales call
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1280px] px-4 sm:px-6 lg:mt-20">
          <div className="hero-window animate-fade-up-delay-3 relative">
            <div className="lg:mr-[190px]">
              <HeroConsole />
            </div>
            {/* The mobile app, stacked over the board (see MobileHome). It rises
                a little faster than the window as the page scrolls. */}
            <div className="hero-phone absolute -right-4 top-16 hidden lg:block xl:-right-10">
              <MobileHome />
            </div>
          </div>
        </div>
        {/* The window runs into the page rather than stopping at a line. */}
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white`} aria-hidden />
      </section>

      {/* Who it is for. Visitors sort themselves before they read anything else,
          and "Part 141" or "flying club" is the phrase they searched. */}
      <section aria-labelledby="home-audience-heading">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2
            id="home-audience-heading"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40"
          >
            Built for every kind of flying operation
          </h2>
          <RevealGroup className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            <AudiencePoint
              href="/features/scheduling"
              title="Part 61 flight schools"
              body="Book, fly, bill and log a lesson without the desk juggling three tools."
            />
            <AudiencePoint
              href="/features/training"
              title="Part 141 programs"
              body="Stages, stage checks and certified training records on one syllabus."
              rule
            />
            <AudiencePoint
              href="/features/memberships"
              title="Flying clubs"
              body="Members book themselves, dues collect monthly, balances stay current."
              rule
            />
            <AudiencePoint
              href="/features/compliance"
              title="Aircraft rental"
              body="Checkouts and currency checked before every booking, billed off the meters."
              rule
            />
          </RevealGroup>
        </div>
      </section>

      {/* Five modules: the product spine. LEFT EXACTLY AS IT WAS; see rule 1 at
          the top of the file.
          A photograph scrimmed by `SkyScrim` rather than a flat navy slab. The
          scrim tints from six time-of-day phases off one clock. */}
      <section className="relative isolate overflow-hidden bg-brand-surface">
        <Image
          src="/photos/homepage-fleet.jpg"
          alt="A row of light training aircraft parked in front of the hangars at golden hour"
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
        <SkyScrim />
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

      {/* The five feature sections, each laid out differently so they don't
          read as one block five times (see FeatureSection). Each composite's panels rise as it scrolls in. */}
      {SECTIONS.map((section) => (
        <FeatureSection key={section.id} section={section} />
      ))}

      {/* The statement: one fact, huge, filling in as it scrolls into view
          (`.statement-fill`). With motion off it is simply filled. */}
      <section aria-labelledby="home-price-statement">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <h2
            id="home-price-statement"
            className="statement-fill text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]"
          >
            ${PRICE_PER_AIRCRAFT} per aircraft. Every instructor, student and
            renter included. No sales call.
          </h2>
        </div>
      </section>

      {/* The mobile app, as a contained card (Tony: "incredible"; keep it). */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <Reveal
            as="div"
            className="relative isolate overflow-hidden rounded-[28px] bg-brand-surface shadow-[0_40px_80px_-40px_rgba(16,35,63,0.55)]"
          >
            <Image
              src="/photos/reporting-panel.jpg"
              alt="A pilot at the controls with the instrument panel lit"
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              quality={55}
              className="object-cover"
            />
            <SkyScrim />
            <div className="relative grid items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-16">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300">
                  Mobile app
                </p>
                <h2
                  id="home-app-heading"
                  className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  iOS and Android apps for students, instructors and mechanics
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
                  Included on every plan, and working from the same schedule,
                  invoices and maintenance records as the web console.
                </p>

                <dl className="mt-10 grid max-w-2xl gap-x-10 gap-y-6 sm:grid-cols-2">
                  {APP_ROLES.map((role) => (
                    <div key={role.who} className="border-t border-white/15 pt-4">
                      <dt className="text-sm font-semibold text-white">{role.who}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-white/65">{role.what}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <StoreBadges />
                  <Link
                    href="/app"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-white/85 hover:text-white"
                  >
                    About the app
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <PhoneMock badge={false} className="w-[260px] sm:w-[285px]" />
              </div>
            </div>
          </Reveal>

          {TESTIMONIALS.length > 0 && (
            <RevealGroup
              className={`mt-20 grid gap-12 ${TESTIMONIALS.length > 1 ? "lg:grid-cols-2" : "mx-auto max-w-3xl"}`}
            >
              {TESTIMONIALS.map((t) => (
                <figure key={t.name}>
                  <blockquote className="text-2xl font-medium leading-snug tracking-tight text-[#0b0b0d] sm:text-[1.75rem]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold text-[#0b0b0d]">{t.name}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      · {t.role}, {t.school}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </RevealGroup>
          )}

        </div>
      </section>

      {/* Pricing and the final call to action, as one closing section. The
          price is the pitch: most competitors quote per school, so a number you
          can read is itself the differentiator. */}
      <section
        className="relative isolate overflow-hidden bg-brand-surface text-white"
        aria-labelledby="home-pricing-heading"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(56,130,246,0.28),transparent_70%),radial-gradient(50%_70%_at_0%_100%,rgba(14,165,233,0.16),transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300">
              Flight school software pricing
            </p>
            <h2
              id="home-pricing-heading"
              className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]"
            >
              ${PRICE_PER_AIRCRAFT} per aircraft per month, with unlimited users
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              A ten-aircraft school pays ${PRICE_PER_AIRCRAFT * 10} a month.
              Start with a {TRIAL_DAYS}-day free trial, no credit card required.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={SIGNUP_URL} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href={DEMO_URL} size="lg" className={GLASS_BUTTON}>
                <PlayCircle className="size-4 opacity-80" />
                Try the live demo
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm sm:p-8">
              <p className="text-sm font-semibold text-white">Included in every plan</p>
              <ul className="mt-5 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-sky-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-sm">
                <span className="text-white/60">API access and custom integrations</span>
                <Link href="/pricing" className="inline-flex items-center gap-1 font-semibold text-white hover:underline">
                  See Enterprise
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/** The secondary button on a dark ground. */
const GLASS_BUTTON =
  "border border-white/20 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/[0.12]";

function AudiencePoint({
  href,
  title,
  body,
  rule,
}: {
  href: string;
  title: string;
  body: string;
  rule?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block lg:px-8 lg:first:pl-0 ${
        rule
          ? "lg:before:absolute lg:before:inset-y-1 lg:before:left-0 lg:before:w-px lg:before:bg-black/10"
          : ""
      }`}
    >
      <h3 className="flex items-center gap-1 text-lg font-semibold tracking-tight text-[#0b0b0d] transition-colors duration-150 group-hover:text-primary">
        {title}
        <ChevronRight className="size-4 text-primary opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </h3>
      <p className="mt-1.5 max-w-[17rem] text-sm leading-relaxed text-black/50">{body}</p>
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
