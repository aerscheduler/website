import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Airworthiness Directive Tracking for Flight Schools";
const PATH = "/resources/airworthiness-directive-tracking";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "What AD tracking actually means, the difference between knowing which directives apply and proving what you did about them, and where a scheduling system helps versus where you still need ADlog or AVTRAK. Written for flight school owners and the mechanics who sign.",
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "Applicability versus compliance, why the two are different products, and how a schedule that grounds an aeroplane is the half a dedicated AD service cannot do.",
    url: PATH,
  },
};

/**
 * THE HONEST POSITION, and the page exists to state it rather than to blur it.
 *
 * We do not have an applicability catalogue and are not pretending to. Everything on this page
 * is checkable against the product, and the "what this does not do" section is deliberately
 * above the call to action rather than below it.
 */
const HALVES = [
  {
    label: "Applicability: which directives apply to this aeroplane",
    body: "An AD names the aircraft it applies to by make, model and usually a serial number range. Answering that for a whole fleet, and keeping the answer current as new directives are issued, is a curated catalogue maintained by people. ADlog, AVTRAK and Tdata sell exactly this, and it is the harder half. AerScheduler does not do it.",
  },
  {
    label: "Compliance: what you did about the ones that apply",
    body: "The method of compliance, the AD number, the revision date, who signed and with which certificate, the meter readings at the work, and when the next action falls due on a recurring one. This is what 14 CFR 91.417(a)(2)(v) asks a school to keep, and it is what an inspector asks for first. AerScheduler does this.",
  },
  {
    label: "Enforcement: stopping somebody flying it anyway",
    body: "A directive that lapses has to take the aeroplane off the line. That needs the schedule, the dispatch board, the instructor's roster and the student's booking, which is information a dedicated AD service does not have and cannot act on. This is the half only a scheduling system can do.",
  },
];

const FAQS = [
  {
    q: "What does AD tracking mean for a flight school?",
    a: "Two different jobs that are usually sold as one. The first is applicability: working out which Airworthiness Directives apply to each aeroplane by make, model and serial number, and keeping that current as new ones are issued. The second is compliance: recording what you did about each one, when, at what meter reading, and who signed. Products that advertise AD tracking usually mean the first. An inspector asking to see your records usually means the second.",
  },
  {
    q: "Do I need dedicated AD software, or is my scheduling system enough?",
    a: "If you have no reliable way to learn that a directive has been issued against your fleet, you need something that does applicability, and a scheduling system is not it. What a scheduling system adds is the part a dedicated service cannot: it knows the aeroplane is booked at two o'clock, so a lapsed directive can take it off the board rather than appearing on a report somebody reads on Monday. Most schools are best served by both, with applicability tracked where it is maintained and the recurring items entered where the flying is scheduled.",
  },
  {
    q: "What has to be in an AD compliance record?",
    a: "14 CFR 91.417(a)(2)(v) asks for the current status of applicable Airworthiness Directives including, for each one, the method of compliance, the AD number and the revision date. Where the action recurs, it also asks for the time and date the next action is required. Separately, 14 CFR 43.9(a) requires the maintenance record entry itself to carry a description of the work, the date completed, and the signature, certificate number and kind of certificate of the person approving return to service.",
  },
  {
    q: "Why does the kind of certificate matter as well as the number?",
    a: "Because a number on its own does not say whether the signer held an Inspection Authorization, and that is the whole question on an annual inspection. An A&P and an IA can both sign plenty of work; only one of them can approve an annual for return to service. A record that stores the number but not the rating leaves the most important fact about the signature out.",
  },
  {
    q: "What happens if an AD is superseded after we complied with it?",
    a: "Nothing should happen to the record you already made. A compliance record has to say what was true on the day it was signed, so the AD number and its revision are copied onto the record at signature rather than read through to the rule afterwards. Update the rule you track and the past record keeps citing the revision the mechanic actually complied with. A record that silently follows the current revision is worse than no record, because it reads as evidence and is not.",
  },
  {
    q: "Can a compliance record be corrected?",
    a: "Not by editing it. A mistake is corrected by adding another record that supersedes it, and the original stays readable. Evidence that can be quietly changed afterwards is worth less than no evidence, so in AerScheduler nobody can edit or delete a signed record, including us.",
  },
  {
    q: "Is a compliance log the same as an AD status report?",
    a: "No, and conflating the two is the mistake worth avoiding. A log of sign-offs tells you what you did about the directives you entered. An AD status tells you where the aircraft stands against every directive that applies to it, including one-time ones complied with decades ago and ones found not applicable by serial number. The second requires a catalogue. AerScheduler says this on the screen rather than in a footnote.",
  },
  {
    q: "Does a lapsed Airworthiness Directive stop the aircraft being booked?",
    a: `In ${SITE_NAME}, yes, if you set the inspection to ground the aircraft. The moment it goes overdue the tail comes off the dispatch board and the booking is refused, on the web console and in the app. 14 CFR 39.9 is the reason that matters: where the requirements of a directive have not been met, the operating rule is violated on each flight rather than once.`,
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
            { name: "Airworthiness Directive tracking", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Airworthiness Directive tracking for flight schools
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          &ldquo;AD tracking&rdquo; is sold as one thing and is really three. Knowing which
          directives apply to your aeroplanes is one job. Proving what you did about them is a
          second. Stopping somebody flying an aircraft whose directive has lapsed is a third, and
          it is the one that actually keeps you out of trouble on a Tuesday afternoon.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">The three halves of one job</h2>
          <p className="text-muted-foreground">
            They are worth separating because they are solved by different products, and a school
            that buys one believing it covers the others has a gap it cannot see.
          </p>
          <div className="mt-3 space-y-4">
            {HALVES.map((item) => (
              <div key={item.label} className="rounded-lg border p-4">
                <h3 className="font-medium">{item.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            What {SITE_NAME} does, and what it does not
          </h2>
          <p className="text-muted-foreground">
            We keep the record and we enforce the lapse. We do not have an applicability
            catalogue, we will not tell you a new directive has been issued, and the settings page
            says so in its first paragraph rather than in the small print.
          </p>
          <p className="text-muted-foreground">
            If you already pay for ADlog, AVTRAK or a Tdata subscription, keep it. Track
            applicability where it is maintained, enter the recurring items where the flying is
            scheduled, and let the schedule do the part your AD service cannot: refuse the
            booking. There is a setting for exactly that posture, and any document we produce says
            on its face where applicability actually lives, so nobody mistakes our records for the
            authoritative list.
          </p>
          <p className="text-muted-foreground">
            Nothing about this is on by default. A school using {SITE_NAME} for oil changes and
            annuals is not opted in to anything, and never sees the word.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            The determination nobody should automate
          </h2>
          <p className="text-muted-foreground">
            Whether a directive applies to a particular aeroplane is a judgement made by a
            certificated person against a serial number and a set of paragraphs. It is the one
            thing in this whole area where software being confidently wrong could hurt somebody,
            so {SITE_NAME} never makes it. We will not tell you an Airworthiness Directive does
            not apply to your aircraft, whatever the settings say, and that sentence is on the
            screen where the choice is made.
          </p>
          <p className="text-muted-foreground">
            The corollary is worth saying too. Because we cannot rule a directive out, a school
            that treats our compliance log as a complete AD status is relying on something it is
            not. The log says what you signed. It does not say what you owe.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Calendar months, and the annual</h2>
          <p className="text-muted-foreground">
            A recurring directive is usually written as an interval: every so many hours, every so
            many calendar months, or whichever comes first. Calendar months are the part that
            catches schools out, because a calendar month is not thirty days and it is not an
            anniversary. It runs to the end of the month, so an annual signed on 15 February is
            good through 28 February the following year.
          </p>
          <p className="text-muted-foreground">
            Storing that as 365 days brings it due up to a month early, every year, on every tail.
            That is not an airworthiness problem, it is a money problem: it grounds aeroplanes
            that are legally fine to fly.{" "}
            <Link className="text-primary underline" href="/resources/calendar-months-and-inspection-due-dates">
              How calendar months work, and why 365 days is not the same
            </Link>{" "}
            goes through the arithmetic.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Related</h2>
          <p className="text-muted-foreground">
            <Link className="text-primary underline" href="/features/maintenance">
              Maintenance and squawks
            </Link>{" "}
            covers the same ground from the product side.{" "}
            <Link className="text-primary underline" href="/resources/aircraft-maintenance-records">
              Aircraft maintenance records
            </Link>{" "}
            is the wider question of what a school has to keep.{" "}
            <Link className="text-primary underline" href="/docs/maintenance/track-airworthiness-directives">
              Track Airworthiness Directives
            </Link>{" "}
            is the step-by-step version for somebody already using {SITE_NAME}.
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
          <h2 className="text-xl font-semibold tracking-tight">Try it on one aeroplane</h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Add the directive you are already tracking somewhere else,
            set it to ground the tail, and sign it off from the phone at the aircraft.
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
