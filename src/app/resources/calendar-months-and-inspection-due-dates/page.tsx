import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "What 12 Calendar Months Means for an Annual Inspection";
const PATH = "/resources/calendar-months-and-inspection-due-dates";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "A calendar month runs to the end of the month, not to the anniversary and not to 30 days. What that means for the annual, the transponder check, the static system and the ELT, worked through with dates, and what it costs a flight school to get it wrong.",
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "An annual signed on 15 February is good through 28 February the following year. Why, which inspections work this way, and why tracking them as 365 days grounds airworthy aeroplanes.",
    url: PATH,
  },
};

const INSPECTIONS = [
  { rule: "§ 91.409(a)", name: "Annual inspection", interval: "12 calendar months" },
  { rule: "§ 91.413", name: "Transponder check", interval: "24 calendar months" },
  { rule: "§ 91.411", name: "Static system and altimeter", interval: "24 calendar months" },
  { rule: "§ 91.207(d)", name: "ELT inspection", interval: "12 calendar months" },
];

const FAQS = [
  {
    q: "What does 12 calendar months mean for an annual inspection?",
    a: "The inspection is good for the rest of the month it was done in, plus twelve whole calendar months. An annual signed on any day in February 2026 is good through 28 February 2027. Signed on the 1st or the 28th of February, the expiry is the same date, which is what makes it a calendar month rather than an anniversary.",
  },
  {
    q: "Is 12 calendar months the same as 365 days?",
    a: "No, and the gap is up to a month. 365 days from 15 February 2026 is 15 February 2027, but the aircraft is legally airworthy until 28 February 2027. The difference depends on which day of which month the work was signed, and it is largest when the inspection falls early in a long month.",
  },
  {
    q: "Which inspections run on calendar months?",
    a: "The annual under 14 CFR 91.409(a) and the ELT under 91.207(d) are 12 calendar months. The transponder check under 91.413 and the static system and altimeter check under 91.411 are 24 calendar months. The 100 hour under 91.409(b) is not a calendar interval at all: it counts hours in service. A great many recurring Airworthiness Directives are also written in calendar months, often as an interval alongside an hour figure.",
  },
  {
    q: "Which day of the month should I record the inspection on?",
    a: "The day the work was actually signed. It does not change the expiry, since every day in the same month gives the same answer, but the record has to say what happened. Recording it as the last day of the month to make the arithmetic tidy puts a false date on a maintenance record.",
  },
  {
    q: "What does it cost to track a calendar month interval as 365 days?",
    a: "Roughly two weeks of availability per aircraft per year on average, and up to a month in the worst case, for every inspection tracked that way. On a fleet of ten with four calendar inspections each, that is a lot of aeroplane sitting on the ramp perfectly legal to fly. It is the safe direction to be wrong in, which is precisely why it goes unnoticed for years.",
  },
  {
    q: "What about 31 January plus one calendar month?",
    a: "There is no 31 February, which is why counting from the day never quite works. Counting to the end of the month always does: one calendar month after January is February, and the interval expires on 28 or 29 February depending on the year. That is also why the arithmetic needs no special case for leap years.",
  },
  {
    q: "Does the time zone matter?",
    a: "It does, in one narrow case that is easy to get wrong. Work signed at six in the evening on 31 January in Denver is stored as 1 February in UTC. Reading the month off the wrong clock moves the expiry a whole month later, which is the one direction this arithmetic must never be wrong in. AerScheduler reads the month on the school's own time zone for exactly this reason.",
  },
  {
    q: "Can I set inspections in weeks?",
    a: `Yes. A week is exactly seven days and always will be, so weeks and days are the same thing to the arithmetic. ${SITE_NAME} offers days, weeks and calendar months, and stores a week interval as days while reading it back to you as weeks.`,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Resources", href: "/resources" },
            { name: "Calendar months and due dates", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          What &ldquo;12 calendar months&rdquo; means, and why it is not 365 days
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Four of the inspections a flight school tracks are written in calendar months, and a
          calendar month is neither thirty days nor an anniversary. Getting it wrong does not make
          an aeroplane unairworthy. It does the opposite, and quietly costs a school a fortnight of
          availability per aircraft per year.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">The rule, in one sentence</h2>
          <p className="text-muted-foreground">
            An inspection is good for the rest of the month it was done in, plus that many whole
            calendar months. 14 CFR 91.409(a) puts it as an aircraft having had an annual
            inspection &ldquo;within the preceding 12 calendar months&rdquo;.
          </p>
          <div className="mt-4 rounded-lg border p-4">
            <h3 className="font-medium">Worked through</h3>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              Annual signed <b>15 February 2026</b>. Good through <b>28 February 2027</b>. Tracked
              as 365 days, it would come due on 15 February 2027, thirteen days early.
            </p>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              Annual signed <b>1 February 2026</b>. Also good through <b>28 February 2027</b>.
              Every sign-off in the same month shares an expiry, which is the whole idea.
            </p>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              Transponder checked <b>20 June 2026</b> on a 24 calendar month interval. Good through{" "}
              <b>30 June 2028</b>. Tracked as 730 days, it would come due on 19 June 2028.
            </p>
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Which inspections work this way</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b">
                <tr>
                  <th className="py-2 pr-4 font-medium">Inspection</th>
                  <th className="py-2 pr-4 font-medium">Interval</th>
                  <th className="py-2 font-medium">Rule</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {INSPECTIONS.map((i) => (
                  <tr key={i.name} className="border-b last:border-0">
                    <td className="py-2 pr-4">{i.name}</td>
                    <td className="py-2 pr-4">{i.interval}</td>
                    <td className="py-2 font-mono text-xs">{i.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground">
            The 100 hour inspection under 91.409(b) is not on this list, because it counts hours in
            service rather than the calendar. Many recurring Airworthiness Directives are on it,
            usually written as an hour figure and a calendar figure with whichever comes first
            binding.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why 31 January plus one month has no answer
          </h2>
          <p className="text-muted-foreground">
            Counting forward from the day is what makes the arithmetic awkward: there is no 31
            February, so software either clamps to the 28th, rolls into March, or picks something
            else. All three are wrong for different dates.
          </p>
          <p className="text-muted-foreground">
            Counting to the end of the month is always defined. One calendar month after January is
            February, and February always has a last day. There is no leap-year branch and no
            clamping, which is a good sign that it is the right way to model it.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">The cost of the safe mistake</h2>
          <p className="text-muted-foreground">
            Tracking a calendar month interval as a day count always errs early. That sounds
            harmless, and it is the reason it survives for years: nothing breaks, nobody is
            unairworthy, and no inspector ever mentions it.
          </p>
          <p className="text-muted-foreground">
            What it does is take an aeroplane off the line while it is still perfectly legal to
            fly. Average it across a fleet of ten with four calendar inspections apiece and the
            school is losing real availability every year to arithmetic. It is worth an afternoon
            to check how yours are set.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">How {SITE_NAME} handles it</h2>
          <p className="text-muted-foreground">
            Calendar months are a real interval, not a day count. Pick days, weeks or calendar
            months when you set an inspection up, and the due date lands on the last day of the
            month, worked out on your school&apos;s own time zone. The standard airworthiness
            presets use calendar months where the regulation does.
          </p>
          <p className="text-muted-foreground">
            An interval is also written back to you in the unit it is stored in. A rule set to 365
            days reads &ldquo;365 days&rdquo; rather than being rounded to twelve months, which is
            how you find the ones worth converting.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Related</h2>
          <p className="text-muted-foreground">
            <Link className="text-primary underline" href="/resources/airworthiness-directive-tracking">
              Airworthiness Directive tracking
            </Link>{" "}
            covers the recurring directives that use these intervals.{" "}
            <Link className="text-primary underline" href="/docs/maintenance/add-your-own-inspection">
              Add your own inspection
            </Link>{" "}
            is the step-by-step version.
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
          <h2 className="text-xl font-semibold tracking-tight">Check your own fleet</h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Add one aeroplane, apply the standard airworthiness set,
            and compare the due dates against what you have today.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={signupUrl()} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/features/maintenance" variant="secondary" size="lg">
              See how maintenance works
            </Button>
          </div>
        </section>
      </article>
    </>
  );
}
