import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  CalendarDays,
  ChevronRight,
  CreditCard,
  GraduationCap,
  PlayCircle,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/button";
import { FeatureSection } from "@/components/landing/feature-sections";
import { HeroHeadline } from "@/components/landing/hero-headline";
import { AUDIENCES } from "@/lib/audiences";
import {
  HOME_SECTIONS,
  HeroWindow,
  MobileAppCard,
  PriceStatement,
  PricingBand,
  ShortQuote,
  TESTIMONIALS,
} from "@/components/landing/home-blocks";
import { SkyScrim } from "@/components/sky-scrim";
import { Reveal, RevealGroup } from "@/components/reveal";
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
 * Reads `?for=` and marks <html> before anything below it paints, so the matching headline,
 * subhead and section order are there on the first frame. Allowlisted: anything else is the
 * default flight school page. Inline because a bundled script would run after first paint.
 */
const AUDIENCE_SCRIPT = `try{var f=new URLSearchParams(location.search).get("for");if(f==="shop"||f==="club"||f==="maintenance")document.documentElement.dataset.for=f;else delete document.documentElement.dataset.for}catch(e){}`;

/** Hero subhead per `?for=` audience. Every claim is true of the shipped product. */
const SUBHEADS: { v: string; text: string }[] = [
  {
    v: "default",
    text: `Scheduling, billing, training records, maintenance tracking and shop work orders in one system, with iOS and Android apps. $${PRICE_PER_AIRCRAFT} per aircraft, with every instructor, student and renter included.`,
  },
  {
    v: "shop",
    text: "Work orders on your customers' aircraft, from the first finding to a paid invoice. Owners approve each item online, labor bills at your shop rate, parts at cost plus your markup, and the owner pays the invoice online by card.",
  },
  {
    v: "club",
    text: `Members book the aircraft themselves, dues bill every month, and each flight bills off the Hobbs to the member's card or account balance. $${PRICE_PER_AIRCRAFT} per aircraft, with every member included.`,
  },
  {
    v: "maintenance",
    text: `Every inspection counts down by tach, Hobbs or calendar month. An overdue annual or a grounding squawk grounds the aircraft, so nobody books an airplane that cannot fly. $${PRICE_PER_AIRCRAFT} per aircraft.`,
  },
];

export default function HomePage() {
  return (
    <div className={`${PAGE_BG} text-[#0b0b0d]`}>
      <script dangerouslySetInnerHTML={{ __html: AUDIENCE_SCRIPT }} />
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
          {/* The category phrase is the first line of the H1, styled as a pill
              that crossfades between flight school, maintenance and flying club
              software without changing width. The headline stays still. The
              server renders "flight school management software" first, because
              every paid click on the generic ad group lands here. See HeroHeadline. */}
          <HeroHeadline />
          {/* Calls to action directly under the promise, where the eye already
              is. They used to sit alone on the far right, which read as an
              afterthought. */}
          {SUBHEADS.map(({ v, text }) => (
            <p
              key={v}
              data-v={v}
              className="for-v animate-fade-up-delay-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-black/55 sm:text-xl"
            >
              {text}
            </p>
          ))}
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
            {TRIAL_DAYS}-day free trial · Cancel anytime · No sales call
          </p>
        </div>

        <HeroWindow />
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
            Built for flying operations and the shops that maintain them
          </h2>
          <RevealGroup className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {AUDIENCES.map((a, i) => (
              <AudiencePoint
                key={a.href}
                href={a.href}
                title={a.title}
                body={a.body}
                rule={i > 0}
                // The fifth sits alone on its row at sm, so it spans both columns there.
                className={i === AUDIENCES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
              />
            ))}
          </RevealGroup>
          {TESTIMONIALS[0] && <ShortQuote t={TESTIMONIALS[0]} />}
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
      {/* A flex column so `?for=` can move the searched-for section to the top with CSS
          `order` (globals.css), without client code or a layout shift. */}
      <div className="flex flex-col">
        {HOME_SECTIONS.map((section) => (
          <div key={section.id} data-sec={section.id}>
            <FeatureSection section={section} />
          </div>
        ))}
      </div>

      <PriceStatement id="home-price-statement" />

      <MobileAppCard />

      <PricingBand headingId="home-pricing-heading" />
    </div>
  );
}

function AudiencePoint({
  href,
  title,
  body,
  rule,
  className = "",
}: {
  href: string;
  title: string;
  body: string;
  rule?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative block lg:px-6 lg:first:pl-0 ${
        rule
          ? "lg:before:absolute lg:before:inset-y-1 lg:before:left-0 lg:before:w-px lg:before:bg-black/10"
          : ""
      } ${className}`}
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
