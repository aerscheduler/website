import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Plane,
  Smartphone,
  Users,
  Wrench,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PhoneMock } from "@/components/phone-mock";
import { ProductMock } from "@/components/product-mock";
import {
  SIGNUP_URL,
  TRIAL_DAYS,
} from "@/lib/site";
import { StoreBadges } from "@/components/store-badges";

export const metadata: Metadata = {
  title: "Flight School Management Product",
  description:
    "Aircraft dispatch, fleet, billing, maintenance, and a native iOS app. See how AerScheduler runs a flight school from desk to ramp.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Flight School Management Product",
    description:
      "Dispatch, fleet, billing, and a native mobile app for flight schools, clubs, and FBOs.",
    url: "/product",
  },
};

export default function ProductPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 lg:pt-16">
          <Breadcrumbs items={[{ name: "Product", href: "/product" }]} />
          <p className="mt-6 text-sm font-semibold text-primary">Product</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            Flight school management software for desk, ramp, and mobile
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            AerScheduler connects scheduling, people, fleet, and money so your
            school runs from a single source of truth on the web and in the
            native mobile app.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Dispatch */}
      <ProductSection
        eyebrow="Scheduling & dispatch"
        title="A board that feels like the ramp."
        body="Lane views for aircraft and sims, conflict-aware booking, and ramp-in close-out that drafts the invoice, so dispatch isn’t a calendar plus a spreadsheet."
        points={[
          "Day and week boards by resource",
          "Dual, solo, shared, rental, ground, and sim reservations",
          "Multi-day trips that hold the aircraft all weekend",
          "Student self-booking with approval when you want it",
          "Close out with Hobbs/tach and an invoice draft",
        ]}
        visual={<ProductMock />}
      />

      {/* Mobile */}
      <ProductSection
        eyebrow="Native iOS"
        title="If you can do it at the desk, you should be able to do it on your phone."
        body="A real native app, not a mobile website. Students book lessons, instructors see their day, and owners aren’t stuck finding a computer to move a flight."
        points={[
          "Book and reschedule from anywhere",
          "Live aircraft and instructor availability",
          "Invoices and payment methods in pocket",
          "Same data as app.aerscheduler.com",
        ]}
        visual={<PhoneMock />}
        reverse
        dark
        extra={
          <div className="mt-8 inline-flex rounded-2xl bg-white p-3 shadow-sm">
            <StoreBadges />
          </div>
        }
      />

      {/* Fleet + people + billing grid */}
      <section className="border-t border-border bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-brand-surface">
            Built around how flight schools actually operate.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Capability
              icon={<Plane className="size-5" />}
              title="Fleet & facilities"
              body="Aircraft with wet/dry rates, Hobbs and tach, grounding that blocks the board. Simulators and classrooms are first-class, and free on your bill."
            />
            <Capability
              icon={<Users className="size-5" />}
              title="People & roles"
              body="Owners, dispatchers, instructors, students, and renters. Invite codes, join requests, documents, and currencies in one roster."
            />
            <Capability
              icon={<CreditCard className="size-5" />}
              title="Billing"
              body="Flights become invoices. Cards on file for renters. Collect payment without a separate billing tool."
            />
            <Capability
              icon={<Wrench className="size-5" />}
              title="Maintenance"
              body="Squawks and AVIATES inspections sit next to the schedule. Grounded aircraft don’t show as bookable."
            />
            <Capability
              icon={<CalendarDays className="size-5" />}
              title="Self-serve onboarding"
              body={`School, club, FBO, or solo instructor paths. ${TRIAL_DAYS}-day trial, no sales call. A bookable aircraft in minutes.`}
            />
            <Capability
              icon={<Smartphone className="size-5" />}
              title="One operation everywhere"
              body="Web for the desk. A native app for the ramp. No “we’ll build mobile later.” It’s already how the product ships."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-brand-surface text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              See it with your own fleet.
            </h2>
            <p className="mt-2 text-white/65">
              Create an account and run the real product: web and mobile.
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

function ProductSection({
  eyebrow,
  title,
  body,
  points,
  visual,
  reverse,
  dark,
  extra,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
  reverse?: boolean;
  dark?: boolean;
  extra?: ReactNode;
}) {
  return (
    <section
      className={`border-b border-border ${
        dark ? "bg-brand-surface text-white" : "bg-white"
      }`}
    >
      <div
        className={`mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:gap-14 lg:py-28 ${
          reverse ? "lg:grid-cols-[1.2fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.2fr]"
        }`}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <p
            className={`text-sm font-semibold ${
              dark ? "text-sky-300" : "text-primary"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
              dark ? "text-white" : "text-brand-surface"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 text-lg leading-relaxed ${
              dark ? "text-white/65" : "text-muted-foreground"
            }`}
          >
            {body}
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((item) => (
              <li
                key={item}
                className={`flex items-start gap-2.5 text-sm ${
                  dark ? "text-white/90" : "text-foreground"
                }`}
              >
                <Check
                  className={`mt-0.5 size-4 shrink-0 ${
                    dark ? "text-sky-300" : "text-primary"
                  }`}
                />
                {item}
              </li>
            ))}
          </ul>
          {extra}
        </div>
        <div className={`flex min-w-0 justify-center ${reverse ? "lg:order-1" : ""}`}>
          {visual}
        </div>
      </div>
    </section>
  );
}

function Capability({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}
