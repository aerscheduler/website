import type { Metadata } from "next";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Splitting the Bill: Group Ground School and Shared Flights";
const PATH = "/resources/split-billing-shared-flights";

export const metadata: Metadata = {
  title: TITLE,
  description: `How to bill a ground school class per student, split a shared aircraft between two pilots, and charge each pilot for the hours they actually flew — without creating a reservation each. From ${SITE_NAME}.`,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "One booking, one invoice per person. Charge a class per head, divide a shared aircraft, or bill each pilot for their own logged time.",
    url: PATH,
  },
};

/**
 * The five ways a charge can divide, in the same words the app uses.
 *
 * Deliberately the same copy as `server/src/utils/splitExamples.ts` APPORTIONMENT_COPY. A
 * marketing page that describes the feature differently from the settings screen is how a
 * school ends up choosing the wrong rule, so if that copy changes this should follow it.
 */
const RULES = [
  {
    name: "One person pays",
    what: "A single person is invoiced for the whole charge. Everyone else on the booking is billed nothing.",
    when: "Discovery flights, or any booking where one customer is footing the bill.",
    example: "A 2.0 hour flight at $180/hr → one invoice for $360.",
  },
  {
    name: "Split evenly",
    what: "The charge is divided equally between everyone being billed. Never loses a penny to rounding.",
    when: "Two renters sharing an aircraft, or a club splitting what a flight cost to run.",
    example: "A 2.0 hour flight at $180/hr, two pilots → $180 each. You still collect $360.",
  },
  {
    name: "Each pays their own time",
    what: "Everyone is billed for the hours they personally flew. You enter each person's meter readings at close-out, and they have to add up to what the aircraft actually ran.",
    when: "Two pilots splitting a cross-country, or partners sharing an aeroplane.",
    example: "Amy flies 1.4, Ben flies 0.6 → $252 and $108. Still $360 in total.",
  },
  {
    name: "Each pays in full",
    what: "Everyone is charged the full amount. This multiplies what you collect by the number of people — it is not a division.",
    when: "Group ground school and sim sessions, where you are selling seats rather than dividing an hour.",
    example: "Four students in a 2.0 hour class at $70/hr → $140 each, $560 collected.",
  },
  {
    name: "Set shares",
    what: "You choose each person's percentage. They have to add up to 100%.",
    when: "A partnership with standing shares, or a one-off arrangement that fits nothing else.",
    example: "60/40 on a $360 flight → $216 and $144.",
  },
];

const FAQS = [
  {
    q: "Can I put more than one student on a single reservation?",
    a: `Yes. A ground school class can hold up to twelve students, a simulator session six, and a flight with an instructor up to four. Everyone on the booking has to be free for the slot, and each of them gets their own invoice when you close it out — you do not create a reservation per student.`,
  },
  {
    q: "How do two pilots split time on one flight?",
    a: "Book it as a shared flight and enter each pilot's own Hobbs readings at close-out. Each is billed for the hours they flew, and AerScheduler checks that the individual legs add up to what the aircraft actually ran — if they don't, it tells you rather than quietly billing a different number of hours than the aeroplane flew.",
  },
  {
    q: "Why is a shared flight not just a solo with two people on it?",
    a: "Because solo has a regulatory meaning. 14 CFR 61.87 defines solo flight as the time during which a student pilot is the sole occupant of the aircraft, so a solo booking with two people on it is a false record — and dual-versus-solo is the split a training record and an examiner actually read. A shared flight is its own booking type, so your solo hours stay solo hours.",
  },
  {
    q: "Do I charge a ground school class per student or divide the hour?",
    a: "Whichever your school does — it is a setting, per booking type. Most schools sell a class per seat, so four students in a two-hour class each pay for two hours. AerScheduler shows you the arithmetic before you choose, because per-head multiplies what you collect rather than dividing it, and that is the one setting worth getting right first time.",
  },
  {
    q: "What about a safety pilot who isn't paying?",
    a: "Mark them as not billed, with a reason. They stay on the booking — so they still count for the double-booking check and the record of who was aboard — and owe nothing. You can also record what each person was doing on the flight, which is what makes a shared flight auditable a year later.",
  },
  {
    q: "Does splitting a booking change what I collect?",
    a: "Not unless you choose a rule that says it should. Dividing rules collect exactly what one person would have been charged for the whole booking — the split only changes who pays which part. Per-head is the deliberate exception, and it is labelled as such.",
  },
];

export default function Page() {
  return (
    <>
      {/* Breadcrumbs emits its own BreadcrumbList JSON-LD, so only the FAQ needs one here —
          two BreadcrumbLists on a page is worse than none. */}
      <JsonLd data={faqJsonLd(FAQS)} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Resources", href: "/resources" },
            { name: "Split billing & shared flights", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Splitting the bill: group ground school and shared flights
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Four students in one classroom. Two renters on one cross-country. A safety pilot who
          isn&rsquo;t paying. All of it is one booking in {SITE_NAME}, and everyone on it gets
          their own invoice.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            The problem with one reservation per person
          </h2>
          <p className="text-muted-foreground">
            Most scheduling software makes you build a separate reservation for each pilot when
            they share a flight, then check them in one at a time in the right order. It works,
            and it is tedious enough that people stop doing it — the class goes on the schedule
            once and the other three students never get billed.
          </p>
          <p className="text-muted-foreground">
            The alternative some tools offer is a two-person &ldquo;ride share&rdquo; that
            splits a bill in half. That covers two renters and nothing else: it cannot hold a
            class, and it typically cannot account for an instructor&rsquo;s time at all.
          </p>
          <p className="text-muted-foreground">
            {SITE_NAME} puts everyone on one booking and works out the money from rules you set
            once.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Five ways a charge can divide</h2>
          <p className="text-muted-foreground">
            A booking is priced in two parts — the aircraft, simulator or room, and the
            instruction — and each part can divide differently. A classroom class can charge
            every student the full instruction rate while the room itself is shared.
          </p>

          <div className="mt-6 space-y-4">
            {RULES.map((rule) => (
              <div key={rule.name} className="rounded-lg border p-4">
                <h3 className="font-medium">{rule.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{rule.what}</p>
                <p className="mt-2 text-sm">
                  <span className="text-muted-foreground">Best for: </span>
                  {rule.when}
                </p>
                <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">{rule.example}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Every one of those figures is calculated by the same code that prices your invoices,
            and the settings screen shows it to you before you choose — so what you read is what
            lands on the bill.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Shared flights, and why they aren&rsquo;t solos
          </h2>
          <p className="text-muted-foreground">
            When two pilots share an aeroplane with no instructor aboard — splitting a
            cross-country, or one flying under the hood with the other as safety pilot — that is
            a <strong>shared flight</strong>, its own booking type.
          </p>
          <p className="text-muted-foreground">
            It is deliberately not a solo with two people on it. 14 CFR 61.87 defines solo
            flight as the time during which a student pilot is the sole occupant of the
            aircraft, so recording a two-pilot flight as a solo would put something in your
            records that isn&rsquo;t true — and dual-versus-solo is the split a training record
            and an examiner actually read. Your solo hours stay solo hours.
          </p>
          <ul className="space-y-2">
            {[
              "Each pilot can be billed for the hours they personally flew",
              "The individual legs are checked against what the aircraft actually ran",
              "A safety pilot can be on the booking and not billed, with the reason recorded",
              "What each person was doing on the flight is recorded, so it is auditable later",
            ].map((line) => (
              <li key={line} className="flex gap-2 text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Start from the kind of operation you run
          </h2>
          <p className="text-muted-foreground">
            Flight school, flying club, FBO or partnership — each has a starting point that
            writes sensible rules, and you can change any of them. A school that never opens the
            screen bills one person for the whole booking, exactly as before.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Questions</h2>
          <dl className="space-y-5">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-1 text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 rounded-lg border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Try it on your own schedule
          </h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Put a class on the board and close it out — you will see
            an invoice per student.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={signupUrl("billing")} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/features/billing" variant="secondary" size="lg">
              See how billing works
            </Button>
          </div>
        </section>
      </article>
    </>
  );
}
