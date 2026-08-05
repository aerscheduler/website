import type { Metadata } from "next";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Overnight and Multi-Day Aircraft Rentals";
const PATH = "/resources/overnight-and-multi-day-rentals";

export const metadata: Metadata = {
  title: TITLE,
  description: `How to let a member keep an aircraft overnight without losing the weekend's revenue: multi-day bookings, a minimum charge per night away, and the disclosure that stops an argument at the front desk. From ${SITE_NAME}.`,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "Book a trip that spans nights, charge a minimum per night away, and tell the member the price before they agree to it.",
    url: PATH,
  },
};

/**
 * Why the unit is NIGHTS and not DAYS.
 *
 * This is the one thing on the page worth being exact about, because "daily minimum" is what
 * operators say and counting days is the obvious reading that quietly bills every local
 * circuit at the minimum. Same reasoning as `server/src/utils/bookingMinimums.ts`; if that
 * changes, this has to follow it.
 */
const WHY_NIGHTS = [
  {
    label: "A local flight is never affected",
    body: "A booking that is home the same day crosses no midnight, so the rule cannot fire on it. Counting days instead would charge a minimum on an afternoon circuit, which is the first thing a member would ring you about.",
  },
  {
    label: "Out Friday, back Sunday is two nights",
    body: "Two midnights away, so two nights at your minimum. The aircraft was on somebody else's ramp for both of them.",
  },
  {
    label: "Counted at the airport, not on a phone",
    body: "Nights are counted in your field's time zone. A member booking from another state cannot change what they are charged just by being somewhere else, and the same trip always bills the same way.",
  },
  {
    label: "A daylight-saving night is still one night",
    body: "The count is by calendar date rather than elapsed hours, so the two nights a year the clocks change do not add or remove a night from the bill.",
  },
];

const FAQS = [
  {
    q: "Can a member book an aircraft for a whole weekend?",
    a: "Yes, once your school turns multi-day bookings on. The booking runs from a departure date and time to a return date and time, and the aircraft is unavailable for the whole span rather than becoming free again the next morning. It is off by default, because a trip overrides the operating hours you set for that aircraft and that should be a deliberate choice.",
  },
  {
    q: "What is an overnight minimum?",
    a: "The least billable time you charge for each night an aircraft is kept away. Set 2.0 hours a night and a trip out Friday back Sunday bills at least 4.0 hours, however little it actually flew. It is a floor, not a surcharge: a trip that flew six hours is billed for six.",
  },
  {
    q: "Why would I charge a minimum at all?",
    a: "Because a member who takes an aeroplane away for a long weekend and flies four hours has denied every other member that aircraft for three days and paid for four hours. Every club and FBO handles that somehow. Without a minimum you silently under-bill your most disruptive bookings.",
  },
  {
    q: "Can I set a different minimum for different aircraft?",
    a: "Yes. Each aircraft can have its own figure, and it wins over the school-wide one. A twin sitting on somebody else's ramp costs its owner far more per night than a 152. You can also set an aircraft to zero, which exempts it entirely rather than falling back to the school's figure.",
  },
  {
    q: "Does the member know before they book?",
    a: "Yes, and this is the part that matters. The booking screen tells them how many nights the trip keeps the aircraft, what your minimum is per night, and what the booking will bill at the very least, in both the web console and the phone app. The same note follows the booking through dispatch and close-out, and at ramp-in it shows the actual figures: away two nights, so this bills 4.0 hours rather than the 1.5 flown.",
  },
  {
    q: "How does a minimum interact with splitting the bill?",
    a: "The minimum is applied to the booking once, then divided by whatever rule you use. Two pilots sharing a weekend owe one minimum between them, not one each. Charging it per person would multiply your revenue on exactly the bookings most likely to be shared, which is not what a minimum is for.",
  },
  {
    q: "Why do overnight trips make my utilization look terrible?",
    a: "Because a trip holds the aircraft for its whole span, so its booked hours are large next to its flown hours. The aeroplane was away earning, not sitting idle, so the utilization report lets you filter or group by Overnight to read the two apart, and points you at billed hours rather than flown hours for trips.",
  },
  {
    q: "Do I have to set a time zone first?",
    a: "Yes, and multi-day bookings will not switch on until you have. How many nights a trip spans decides what it bills, and that can only be counted in the airport's own time zone. Without one, two people booking the same trip from different places could be billed differently, so the setting is gated rather than merely warned about.",
  },
];

export default function Page() {
  return (
    <>
      {/* Breadcrumbs emits its own BreadcrumbList JSON-LD, so only the FAQ needs one here. */}
      <JsonLd data={faqJsonLd(FAQS)} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Resources", href: "/resources" },
            { name: "Overnight & multi-day rentals", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Overnight and multi-day aircraft rentals
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          A member wants the 172 for a long weekend. {SITE_NAME} can book the whole trip as one
          reservation, charge a minimum for every night it is away, and tell them the price
          before they agree to it.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            The booking most software cannot express
          </h2>
          <p className="text-muted-foreground">
            Every other booking has to fit inside one contiguous free window, which is how you
            say &ldquo;this aeroplane flies 08:00 to 18:00&rdquo;. A trip is not a longer
            booking: an aeroplane taken away for a weekend is not available 08:00 to 18:00 on
            the Saturday, it is simply gone.
          </p>
          <p className="text-muted-foreground">
            So schools work around it. They book the departure day and leave the rest of the
            weekend open, and somebody books over it. Or they make three back-to-back
            reservations and close out three flights for one trip.
          </p>
          <p className="text-muted-foreground">
            With multi-day bookings on, the reservation runs from a departure date and time to a
            return date and time. The aircraft shows as unavailable for every day in between,
            on the dispatch board and in the app, and nobody can book over it.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            A minimum for every night away
          </h2>
          <p className="text-muted-foreground">
            Pricing a trip off the Hobbs meter alone under-bills it. Four hours flown over three
            days is four hours of revenue from an aircraft that earned nothing else all weekend.
            An overnight minimum sets the least billable time per night away.
          </p>

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-medium">What a 2.0 hour minimum does</h3>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              Out Friday afternoon, back Sunday afternoon, 1.5 hours flown. Two nights away at
              2.0 hours a night is a 4.0 hour floor, so the booking bills 4.0 hours.
            </p>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              Same trip, 6.0 hours flown. Above the floor, so it bills 6.0 hours. A minimum is
              never a surcharge on a trip that flew.
            </p>
          </div>

          <h3 className="mt-6 text-lg font-medium">Why nights, and not days</h3>
          <div className="mt-3 space-y-4">
            {WHY_NIGHTS.map((item) => (
              <div key={item.label} className="rounded-lg border p-4">
                <h4 className="font-medium">{item.label}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Nobody should be surprised by the bill
          </h2>
          <p className="text-muted-foreground">
            The failure mode of a minimum is not a wrong number, it is a surprise. A member books
            a weekend, flies 1.5 hours, and gets an invoice for 4. That gets argued about at the
            front desk rather than reported as a problem, so the figure is shown at every point
            it matters:
          </p>
          <ul className="space-y-2">
            {[
              "On the booking screen, before it is saved, in the console and in the phone app",
              "Through dispatch and close-out, so whoever picks the booking up midway sees it too",
              "At ramp-in, next to the hours flown: away two nights, so this bills 4.0 hours rather than the 1.5 flown",
              "On the invoice itself, as the hours it charged for",
            ].map((line) => (
              <li key={line} className="flex gap-2 text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Per aircraft, or school-wide</h2>
          <p className="text-muted-foreground">
            Set one figure for the school and override it on any aircraft that needs its own.
            Zero on an aircraft is an exemption, not a fallback, so a club aeroplane you
            deliberately excluded stays excluded when you raise the school-wide minimum later.
          </p>
          <p className="text-muted-foreground">
            Leave the minimum blank and nothing changes: trips bill exactly what they flew,
            which is what every booking did before you opened the screen.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Sharing a trip between two pilots
          </h2>
          <p className="text-muted-foreground">
            A minimum applies to the booking, then divides by whatever rule you have set for that
            booking type. Two renters sharing a weekend and splitting evenly owe half the floor
            each: a 4.0 hour minimum becomes 2.0 hours on each invoice, and you still collect the
            same total. See{" "}
            <a className="text-primary underline" href="/resources/split-billing-shared-flights">
              split billing and shared flights
            </a>{" "}
            for the five ways a charge can divide.
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
          <h2 className="text-xl font-semibold tracking-tight">Try it on your own fleet</h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Put a weekend trip on the board and close it out. You
            will see the minimum on the booking screen before you save it, and on the invoice
            after.
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
