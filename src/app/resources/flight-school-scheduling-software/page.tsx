import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flight School Scheduling Software",
  description: `${SITE_NAME} is flight school scheduling software with dispatch boards, self-booking, billing, maintenance, and a native iOS app. From $${PRICE_PER_AIRCRAFT}/mo per aircraft.`,
  alternates: { canonical: "/resources/flight-school-scheduling-software" },
  openGraph: {
    title: "Flight School Scheduling Software",
    description:
      "Dispatch, self-booking, billing, and a mobile app for flight schools.",
    url: "/resources/flight-school-scheduling-software",
  },
};

const MUST_HAVES = [
  [
    "Dispatch-grade board",
    "See every aircraft, sim, and room in a day or week view with conflict detection.",
  ],
  [
    "Self-booking",
    "Students and renters book without calling the desk, inside rules you control.",
  ],
  [
    "Close-out to invoice",
    "Ramp-in Hobbs/tach should turn into a bill without retyping the flight.",
  ],
  [
    "Mobile that people use",
    "A native iOS app so instructors and students stay in the system off-desk.",
  ],
  [
    "Compliance on the board",
    "Grounded aircraft and expired currencies should block bad bookings.",
  ],
  [
    "Clear pricing",
    "Pay for aircraft you fly. Unlimited users. No surprise modules.",
  ],
];

const FAQS = [
  {
    q: "What is flight school scheduling software?",
    a: "Software that schedules aircraft and instructors, supports dispatch, and usually ties into billing, maintenance, and student booking for flight training organizations.",
  },
  {
    q: "How is AerScheduler different from a generic calendar?",
    a: "AerScheduler understands aircraft resources, dual vs solo, grounding, rates, and invoices. A calendar app does not.",
  },
  {
    q: "Does AerScheduler include a mobile app?",
    a: "Yes. The native iOS app is included with every plan.",
  },
];

export default function SchedulingSoftwareGuidePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <article className="border-b border-border">
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <Breadcrumbs
              items={[
                { name: "Resources", href: "/resources" },
                {
                  name: "Scheduling software",
                  href: "/resources/flight-school-scheduling-software",
                },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              Flight school scheduling software that runs the whole operation
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Scheduling is the front door. The best flight school scheduling
              software also connects fleet status, people, billing, and mobile
              so the desk and the ramp stay in sync.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Try AerScheduler
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/features/scheduling" variant="secondary" size="lg">
                Scheduling features
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            What good flight school scheduling software includes
          </h2>
          <div className="mt-8 space-y-6">
            {MUST_HAVES.map(([title, body]) => (
              <div key={title} className="flex items-start gap-3">
                <Check className="mt-1 size-4 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
            How AerScheduler approaches it
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            AerScheduler is built as a command deck for the school: lane-board
            dispatch, student self-booking, fleet grounding, currency checks,
            flight-to-invoice billing, and a native app. Pricing is{" "}
            ${PRICE_PER_AIRCRAFT} per aircraft per month after a {TRIAL_DAYS}-day
            trial. Simulators and classrooms are free.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Explore{" "}
            <Link href="/features" className="font-medium text-primary hover:underline">
              all features
            </Link>
            ,{" "}
            <Link href="/pricing" className="font-medium text-primary hover:underline">
              pricing
            </Link>
            , or the{" "}
            <Link href="/app" className="font-medium text-primary hover:underline">
              mobile app
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            FAQ
          </h2>
          <dl className="mt-6 divide-y divide-border">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </>
  );
}
