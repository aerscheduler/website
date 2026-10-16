import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/button";
import { type FeatureSectionData } from "@/components/landing/feature-sections";
import { STATUS } from "@/components/landing/product-tokens";
import {
  BillingComposite,
  HeroConsole,
  MaintenanceComposite,
  MobileHome,
  ReportingComposite,
  SchedulingComposite,
  TrainingComposite,
} from "@/components/landing/product-composites";
import { PhoneMock } from "@/components/phone-mock";
import { Reveal } from "@/components/reveal";
import { SkyScrim } from "@/components/sky-scrim";
import { StoreBadges } from "@/components/store-badges";
import { DEMO_URL, PRICE_PER_AIRCRAFT, SIGNUP_URL, TRIAL_DAYS } from "@/lib/site";

/*
 * The home page's building blocks, shared with the comparison pages
 * (`components/compare-page.tsx`) so a comparison reads like the home page
 * rather than a document. Moved here unchanged from `app/page.tsx` on
 * 2026-10-16; the rules for each block are still in the comments at the top of
 * that file.
 */

/**
 * The five feature sections, each with its own layout (see
 * `feature-sections.tsx`). Every "Features" link goes to a real page.
 */
export const HOME_SECTIONS: FeatureSectionData[] = [
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
    title: <>Maintenance<br />and work orders</>,
    body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Each job gets a work order, on your own fleet or a customer's aircraft, and a customer's job goes all the way to a paid invoice with the owner approving what you find.",
    href: "/features/maintenance",
    visual: <MaintenanceComposite />,
    features: [
      [
        { label: "Inspection tracking", href: "/features/inspections" },
        { label: "Squawks and grounding", href: "/features/maintenance" },
        { label: "AD compliance", href: "/resources/airworthiness-directive-tracking" },
      ],
      [
        { label: "Work orders", href: "/features/work-orders" },
        { label: "Owner approvals", href: "/docs/maintenance/see-your-aircraft-and-approve-work" },
        { label: "Customer aircraft", href: "/docs/maintenance/work-on-a-customers-aircraft" },
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
 * Real customer words only. Never paraphrase a customer or invent an
 * attribution: `lead`, `quote` and `short` are whole sentences copied from what
 * they sent. The quote is credited to the school, not the person (Tony's call).
 *
 * Shown twice, on purpose. PostHog scroll depth (60 days to 2026-10-08): about
 * half of home page visitors reach the audience strip, where `short` sits, and
 * only about 1 in 9 reach the pricing band, where the full quote sits. Proof up
 * top for everyone, the whole story where people decide.
 *
 * `lead` is the "before" sentence, set dimmer so the quote reads from where
 * they were to where they are, the same move as the price statement.
 */
export type Testimonial = {
  lead?: string;
  quote: string;
  /** One sentence of `quote` for the audience strip. */
  short: string;
  /** The school only: no person's name, and no town (it made Murray read small). */
  school: string;
  /**
   * In `public/customers/`: the logo's line art lifted onto transparency in our
   * ink colour, so it sits on the page like type rather than as a pasted sticker.
   */
  logo: { src: string; width: number; height: number };
  since: number;
};
export const TESTIMONIALS: Testimonial[] = [
  {
    // Dylan Freiberg, texted to Cooper 2026-10-08. Logo from flymurrayaviation.com.
    lead: "Before AerScheduler, we used a mix of a shared Google Calendar and Venmo to conduct aircraft rental, flight instruction and payments.",
    quote:
      "The AerScheduler system has improved our operations tremendously. Less need for owner supervision, aircraft maintenance is precisely tracked, and student progression is clearly defined.",
    short:
      "Less need for owner supervision, aircraft maintenance is precisely tracked, and student progression is clearly defined.",
    school: "Murray Aviation",
    logo: { src: "/customers/murray-aviation.png", width: 504, height: 326 },
    since: 2023,
  },
];

/** The secondary button on a dark ground. */
export const GLASS_BUTTON =
  "border border-white/20 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/[0.12]";

/**
 * The hero's product window: the dispatch board with the mobile app stacked
 * over it, growing flat as the page scrolls (`.hero-window`, `.hero-phone`).
 */
export function HeroWindow() {
  return (
    <div className="relative mx-auto mt-16 max-w-[1280px] px-4 sm:px-6 lg:mt-20">
      <div className="hero-window animate-fade-up-delay-3 relative">
        <div className="hidden md:block lg:mr-[190px]">
          <HeroConsole />
        </div>
        {/* Phones get the app's Home instead of the board. Squeezed to 343px
            the board's eleven hours left each booking a sliver ("P J.",
            "Cr...") and clipped New reservation, and a visitor on a phone
            is looking at the screen they would actually use. */}
        <div className="flex justify-center pb-10 md:hidden">
          <MobileHome />
        </div>
        {/* The mobile app, stacked over the board (see MobileHome). It rises
            a little faster than the window as the page scrolls. */}
        <div className="hero-phone absolute -right-4 top-16 hidden lg:block xl:-right-10">
          <MobileHome />
        </div>
      </div>
    </div>
  );
}

/**
 * The statement: one fact, huge, filling in as it scrolls into view
 * (`.statement-fill`). With motion off it is simply filled.
 */
export function PriceStatement({ id }: { id: string }) {
  return (
    <section aria-labelledby={id}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <h2
          id={id}
          className="statement-fill text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[6.5rem]"
        >
          ${PRICE_PER_AIRCRAFT} per aircraft. Every instructor, student and
          renter included. No sales call.
        </h2>
      </div>
    </section>
  );
}

/** The mobile app, as a contained card (Tony: "incredible"; keep it). */
export function MobileAppCard() {
  return (
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
      </div>
    </section>
  );
}

/**
 * Pricing and the final call to action, as one closing section. The price is
 * the pitch: most competitors quote per school, so a number you can read is
 * itself the differentiator. `children` render under the "Included" card, for
 * anything a page wants to close on.
 */
export function PricingBand({
  headingId,
  eyebrow = "Flight school software pricing",
  children,
}: {
  headingId: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-surface text-white"
      aria-labelledby={headingId}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(56,130,246,0.28),transparent_70%),radial-gradient(50%_70%_at_0%_100%,rgba(14,165,233,0.16),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-300">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.08]"
          >
            ${PRICE_PER_AIRCRAFT} per aircraft per month, with unlimited users
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            A ten-aircraft school pays ${PRICE_PER_AIRCRAFT * 10} a month.
            Start with a {TRIAL_DAYS}-day free trial. Nothing is charged until it ends.
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
          {TESTIMONIALS.map((t) => (
            <CustomerQuote key={t.school} t={t} />
          ))}
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
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * One customer, in their words, under the trial buttons in the closing pricing
 * band, so the proof sits where people decide. Small on purpose: as a large
 * band straight under the hero it crowded the console and broke the flow
 * (Tony, 2026-10-08). The "before" sentence is dimmer than the result, so it
 * reads as a change rather than praise. The logo is black line art, inverted
 * to white for the dark band.
 */
function CustomerQuote({ t }: { t: Testimonial }) {
  return (
    <figure className="mt-12 max-w-xl border-t border-white/10 pt-8">
      <blockquote className="text-[17px] leading-relaxed">
        {t.lead && <span className="text-white/45">&ldquo;{t.lead} </span>}
        <span className="text-white/90">
          {!t.lead && <>&ldquo;</>}
          {t.quote}&rdquo;
        </span>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <Image
          src={t.logo.src}
          alt={`${t.school} logo`}
          width={t.logo.width}
          height={t.logo.height}
          className="h-11 w-auto shrink-0 opacity-85 invert"
        />
        <div className="text-sm leading-snug">
          <p className="font-medium text-white">{t.school}</p>
          <p className="text-white/50">On AerScheduler since {t.since}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * One sentence of the quote under the audience strip, behind the same faint
 * rule the feature sections use. The point is reach, not weight: it sits in
 * the second screen, which about half of visitors see, and stays at the size of
 * the strip's own titles so it does not crowd the hero above it.
 */
export function ShortQuote({ t }: { t: Testimonial }) {
  return (
    <Reveal
      as="figure"
      className="mt-12 flex flex-col gap-5 border-t border-black/[0.06] pt-8 sm:flex-row sm:items-center sm:gap-6 lg:mt-14"
    >
      <Image
        src={t.logo.src}
        alt={`${t.school} logo`}
        width={t.logo.width}
        height={t.logo.height}
        className="h-11 w-auto shrink-0 self-start opacity-75 sm:self-center"
      />
      <div>
        <blockquote className="text-lg font-medium leading-snug tracking-tight text-[#0b0b0d] sm:text-xl">
          &ldquo;{t.short}&rdquo;
        </blockquote>
        <figcaption className="mt-1.5 text-sm text-black/45">
          {t.school}, on AerScheduler since {t.since}
        </figcaption>
      </div>
    </Reveal>
  );
}
