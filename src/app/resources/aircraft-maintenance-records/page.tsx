import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Aircraft Maintenance Records a Flight School Has to Keep";
const PATH = "/resources/aircraft-maintenance-records";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "What 14 CFR 91.417 and 43.9 actually ask for, which records transfer with the aircraft when you sell it, and why a tracking system is not a logbook. Written for flight school owners, chief instructors and the mechanics who sign.",
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "The two lists in 91.417, the entry contents in 43.9, what transfers at sale, and the difference between a tracking record and a logbook entry.",
    url: PATH,
  },
};

const KEEP = [
  {
    label: "The maintenance record entry itself",
    rule: "§ 43.9(a)",
    body: "A description of the work, the date it was completed, the name of the person who did it, and the signature, certificate number and kind of certificate held by the person approving the aircraft for return to service. The kind of certificate is the field most often left off, and it is the one that separates an A&P from an IA.",
  },
  {
    label: "Records you may discard after a year",
    rule: "§ 91.417(a)(1)",
    body: "Records of maintenance, preventive maintenance, alterations and 100 hour, annual and progressive inspections. These may be discarded once the work is repeated or superseded, or after one year.",
  },
  {
    label: "Records you keep for the life of the aircraft",
    rule: "§ 91.417(a)(2)",
    body: "Total time in service of the airframe, each engine, each propeller and each rotor. The current status of life-limited parts. Time since last overhaul of anything overhauled on a time basis. The current inspection status. The current status of applicable Airworthiness Directives, with the method of compliance, the AD number and the revision date, plus the next action for a recurring one. And a copy of the form for each major alteration.",
  },
  {
    label: "The inspection entry",
    rule: "§ 43.11(a)",
    body: "For an annual, 100 hour or progressive inspection: the type and extent of the inspection, the date and the aircraft total time in service, the signature and certificate details, and the certification wording. Where the aircraft is not approved for return to service, a signed and dated list of the discrepancies and unairworthy items goes to the owner.",
  },
];

const FAQS = [
  {
    q: "What aircraft maintenance records does a flight school have to keep?",
    a: "Two lists, and the difference between them matters. 14 CFR 91.417(a)(1) covers records of maintenance and inspections, which may be discarded once the work is repeated or superseded, or after a year. 91.417(a)(2) covers a shorter list kept for the life of the aircraft: total time in service, life-limited part status, time since overhaul, current inspection status, current Airworthiness Directive status, and major alteration forms.",
  },
  {
    q: "Which records transfer when the aircraft is sold?",
    a: "The 91.417(a)(2) records. 91.417(b)(2) requires them to be retained and transferred with the aircraft at the time it is sold. That is the practical reason to keep them in a form somebody can hand over as a set rather than reconstruct from a filing cabinet.",
  },
  {
    q: "Is a maintenance tracking system the same as a logbook?",
    a: "No, and any tracking product that lets you think so is doing you harm. A tracking system tells you what is due and keeps a record of what you signed off in it. The maintenance record entry required by 14 CFR 43.9, and the inspection entry required by 43.11, are separate documents that a certificated person makes. AerScheduler says this above the signature on the sign-off screen rather than in a help article nobody opens.",
  },
  {
    q: "What is time in service, exactly?",
    a: "14 CFR 1.1 defines it as the time from the moment the aircraft leaves the surface until it touches down at the next point of landing. It is not Hobbs and it is not tach. A Hobbs runs on master or oil pressure and includes taxi and runup; a tach is proportional to engine RPM. Both are useful and neither is time in service, so a record that captures a meter reading should say which meter rather than implying it is time in service.",
  },
  {
    q: "Why record both Hobbs and tach on a sign-off?",
    a: "Because a record naming one clock is hard to read later for somebody working off the other, and the aircraft is in front of the mechanic now and will not be later. It costs nothing to capture both at the moment of the work, and it makes the record legible for the life of the airframe.",
  },
  {
    q: "Can a maintenance record be edited afterwards?",
    a: `In ${SITE_NAME}, a signed compliance record cannot be edited or deleted by anybody, including us. A mistake is corrected by adding another record that supersedes it, and the original stays readable. Records are evidence, and evidence that can be quietly changed is worth less than none.`,
  },
  {
    q: "How long do we have to keep them?",
    a: "The 91.417(a)(1) group until the work is repeated or superseded, or one year. The 91.417(a)(2) group for the life of the aircraft, and then they go with it when it is sold. In practice most schools keep everything, because storage is cheap and reconstructing a discarded record is not possible.",
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
            { name: "Aircraft maintenance records", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Aircraft maintenance records a flight school has to keep
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          There are two lists in 14 CFR 91.417 and they have very different lifespans. One can be
          thrown away after a year. The other follows the aeroplane until somebody scraps it, and
          goes with it when you sell. Knowing which is which is most of the job.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">What has to exist</h2>
          <div className="mt-3 space-y-4">
            {KEEP.map((item) => (
              <div key={item.label} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium">{item.label}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{item.rule}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            A tracking system is not a logbook
          </h2>
          <p className="text-muted-foreground">
            This is the distinction worth being pedantic about, because every maintenance tracking
            product blurs it and a school that believes the blur has a gap where its records
            should be.
          </p>
          <p className="text-muted-foreground">
            A tracking system counts down what is due, warns you before it lapses, and keeps its
            own record of what was signed off in it. The maintenance record entry required by 43.9
            and the inspection entry required by 43.11 are documents a certificated person makes,
            and no software makes them for you. {SITE_NAME} puts that sentence directly above the
            signature on the sign-off screen, where somebody about to sign will actually read it.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            The status question, and why it is harder than it looks
          </h2>
          <p className="text-muted-foreground">
            91.417(a)(2)(v) asks for the current status of <i>applicable</i> Airworthiness
            Directives. That word is doing a lot of work. A log of what you signed off is not the
            same as a status against everything that applies, because the second requires knowing
            what applies, which is a determination made by a certificated person against a serial
            number.
          </p>
          <p className="text-muted-foreground">
            It is the single most common gap in a flight school&apos;s records, and it is worth
            checking who at your school owns it.{" "}
            <Link className="text-primary underline" href="/resources/airworthiness-directive-tracking">
              Airworthiness Directive tracking
            </Link>{" "}
            goes through the split in detail.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Related</h2>
          <p className="text-muted-foreground">
            <Link className="text-primary underline" href="/resources/calendar-months-and-inspection-due-dates">
              Calendar months and due dates
            </Link>{" "}
            covers the intervals these inspections run on.{" "}
            <Link className="text-primary underline" href="/features/maintenance">
              Maintenance and squawks
            </Link>{" "}
            is the product side.{" "}
            <Link className="text-primary underline" href="/resources/flight-training-records">
              Flight training records
            </Link>{" "}
            is the same question for people rather than aeroplanes.
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
          <h2 className="text-xl font-semibold tracking-tight">See what your fleet owes</h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Add an aeroplane, apply the standard airworthiness set,
            and the countdown starts from the dates you already have.
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
