import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

const TITLE = "Flight Training Records, Syllabi, and Endorsements";
const PATH = "/resources/flight-training-records";

export const metadata: Metadata = {
  title: TITLE,
  description: `What a flight school has to keep, and why a shared drive of PDFs stops working: versioned syllabi, hour requirements that move independently of lessons, records that cannot be edited after signing, and endorsements from AC 61-65K. Part 61 and Part 141, from ${SITE_NAME}.`,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description:
      "Versioned syllabi, hours against lessons, append-only records, and signed endorsements. What Part 61 and Part 141 schools need to keep.",
    url: PATH,
  },
};

/**
 * The four structural decisions, and each one exists because the obvious alternative fails a
 * real school in a specific way. Kept in step with `server/src/utils/curriculum.ts`, where
 * three of the four are enforced as pure functions (`versionWriteError`, `creditPostError`,
 * `recordWriteError`) precisely so they cannot drift into being advisory.
 */
const DECISIONS = [
  {
    label: "A syllabus is a version, not a document",
    body: "A student is enrolled against the version of the syllabus that existed on the day they started. Revise it in March and the person who enrolled in January is still trained, graded, and graduated against what they signed up to. A syllabus kept as one living document silently rewrites the standard every student is held to.",
  },
  {
    label: "Hours and lessons answer different questions",
    body: "One night cross-country credits night time, cross-country time, dual received, and total time all at once. So lessons completed and hours accumulated never move together, and progress measured as lessons ticked divided by lessons total cannot answer the only question a chief instructor asks: is this person short of anything the certificate requires.",
  },
  {
    label: "A signed record is frozen",
    body: "Once an instructor signs a lesson, that row never changes again. A correction is a new record that supersedes it, and the original stays readable. A training record is evidence, and evidence that can be quietly edited afterwards is worth less than no record at all.",
  },
  {
    label: "Credits are append-only",
    body: "Transfer credit from another school, or a correction to it, is posted as an entry rather than by overwriting a total. A negative entry undoes a mistake and leaves both the mistake and the fix visible, which is what lets somebody reconstruct a number two years later.",
  },
];

const FAQS = [
  {
    q: "What training records does a flight school have to keep?",
    a: "For each student: what was trained and when, who trained them, the hours in each category the certificate requires, the endorsements signed on their behalf, and the tests they have passed. Part 61 sets what has to be true before a checkride; Part 141 additionally requires an approved syllabus, stages with stage checks, and records held to your POI's satisfaction. In both cases the burden is proving it later, not filing it now, which is why the format matters more than most schools expect.",
  },
  {
    q: "Can I use one syllabus and just edit it as we improve it?",
    a: "You can, and it is the most common mistake. Editing a live syllabus changes the standard for every student already enrolled against it, including ones most of the way through. AerScheduler versions the syllabus instead: a published version is immutable, revisions create a new version, and each enrollment stays pointed at the version it started on. Existing students finish what they started and new students get the improvement.",
  },
  {
    q: "How is this different from a progress bar?",
    a: "A progress bar tells you a student is 40% done. It cannot tell you whether 40% was the plan. AerScheduler reads two independent signals and reports the worse one: how long since they last flew, and their pace against the target duration you set for the course. Silence outranks pace, because a student who is 90% complete and has not flown since March is the one to ring today, and they are only recoverable for a while.",
  },
  {
    q: "Does a student who stops flying show up anywhere?",
    a: "Yes, and that is the point of measuring silence separately. A gap with no lesson in it is the single most useful thing a school can be told, because it is fixable with a phone call. It is advisory only and never gates anything: a weekend-only student reads as behind a full-time schedule and is perfectly fine, so it exists to start a conversation.",
  },
  {
    q: "What about endorsements?",
    a: "AerScheduler ships the endorsements a Part 61 or 141 flight school actually signs, taken from AC 61-65K Appendix A: pre-solo knowledge and training, the 90-day solo and its renewals, solo cross-country, Class B, the knowledge and practical tests, retests, flight reviews, and instrument proficiency checks. You pick one, it is filled in with the student's name and your certificate number, and the finished wording is stored.",
  },
  {
    q: "Why store the wording rather than a reference to the template?",
    a: "Because the Advisory Circular gets revised. K replaced H and will itself be replaced, and an endorsement has to keep saying what was signed on the day it was signed. Storing a pointer to a template means a future revision silently rewrites history. So the text is rendered once, at signing, and kept verbatim.",
  },
  {
    q: "Do solo endorsements expire?",
    a: "The ones the regulations give an expiry to, yes. A solo endorsement and the flight-proficiency check behind it both run 90 days under §61.87, so AerScheduler tracks their expiry and tells you before a student turns up to fly on a lapsed one. Everything else is recorded as not expiring, which is deliberately different from not knowing.",
  },
  {
    q: "Does this work for Part 61, or only Part 141?",
    a: "Both, and a course is trained under exactly one. Part 141 is the stricter shape, so the module is built to it: an approved syllabus, ordered stages, immutable published versions, and a ledger that survives an audit. A Part 61 school gets the same structure without the approval process, which is worth having anyway. The four built-in syllabi ship as Part 61 courses. Stage-check records themselves are not built yet — a stage can be marked as requiring one and a check instructor can be designated for a course, but the check is not recorded in the software today.",
  },
  {
    q: "Do I have to write a syllabus from scratch?",
    a: `No. ${SITE_NAME} includes four: Private Pilot single-engine, Instrument Rating, Commercial single-engine, and Flight Instructor. Each arrives with stages, lessons, graded tasks, and the hour requirements the certificate calls for, and each is yours to edit before you publish it.`,
  },
  {
    q: "Does a lesson have to be entered twice, once as a flight and once as training?",
    a: "No, and that is what makes the module cheap to run rather than a second job. A lesson record attaches to the reservation the flight was already booked as, so the aircraft, the instructor, the times, and the hours come from the booking your desk had made anyway.",
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
            { name: "Flight training records", href: PATH },
          ]}
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Flight training records, syllabi, and endorsements
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Every flight school tracks training somehow: a binder, a shared drive, a spreadsheet
          per student, an instructor&apos;s memory. All four work until the day somebody has to
          prove what was trained, when, and by whom. Here is what the records have to survive,
          and the four structural decisions that decide whether they do.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why the spreadsheet stops working
          </h2>
          <p className="text-muted-foreground">
            Not because it is inaccurate. Because it cannot answer questions about its own past.
            A spreadsheet tells you where a student is today. It cannot tell you which version
            of your syllabus they were held to, whether a figure was corrected and by whom, or
            what an endorsement said on the day it was signed rather than what the template says
            now.
          </p>
          <p className="text-muted-foreground">
            Those are exactly the questions asked at the worst possible times: a checkride
            disagreement, an instructor leaving mid-course, a student transferring in with hours
            from elsewhere, an audit. A record that reads well and cannot be reconstructed is
            the failure mode, and it looks fine right up until it matters.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">The four decisions</h2>
          <div className="mt-3 space-y-4">
            {DECISIONS.map((item) => (
              <div key={item.label} className="rounded-lg border p-4">
                <h3 className="font-medium">{item.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Hours against lessons, worked through
          </h2>
          <p className="text-muted-foreground">
            This is the one that surprises people, so it is worth the arithmetic. A Private
            Pilot certificate under §61.109 needs 40 hours total, 20 of them dual, 10 solo, and
            3 hours of night training.
          </p>
          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-medium">One flight, four requirements</h3>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              A 2.4 hour dual night cross-country credits total time, dual received,
              cross-country training, and night training. One lesson ticked; four requirements
              moved.
            </p>
            <p className="mt-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
              Weather turns it into a local day flight instead. The lesson is still complete, and
              two of those four requirements did not move at all. The syllabus said what it
              should credit; the record says what it did.
            </p>
          </div>
          <p className="text-muted-foreground">
            So a student can be through every lesson in a stage and still be hours short of the
            certificate, or be ahead on hours and behind on lessons. Reporting one number hides
            whichever of the two is the actual problem.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Correcting a record without erasing one
          </h2>
          <p className="text-muted-foreground">
            Instructors get things wrong, and a system that makes a correction awkward gets a
            correction that never happens. So amendments are cheap and deletions do not exist: a
            corrected lesson is a new record that supersedes the old one, and the old one stays
            readable with the new one pointing back at it.
          </p>
          <p className="text-muted-foreground">
            The same rule applies to hours credited from another school. A transfer posts entries
            rather than setting a total, and a mistake is undone by a negative entry. Two years
            later somebody can see both what was claimed and what was fixed, which is the whole
            reason to keep records at all.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Grading where there is no signal</h2>
          <p className="text-muted-foreground">
            Instructors debrief at the aircraft, and ramps have no coverage. The alternative,
            &ldquo;I will do it back at the desk&rdquo;, is the single biggest reason training
            records go stale, because the debrief is where the detail still exists.
          </p>
          <p className="text-muted-foreground">
            So the phone app grades a lesson offline and replays it when a connection comes back,
            and it keeps the time the instructor graded rather than the time it synced. A banner
            counts anything still waiting, because the value of grading offline is that the
            instructor stops thinking about it and the risk is that a grade goes quiet.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">What is in the box</h2>
          <ul className="space-y-2">
            {[
              "Four syllabi to start from: Private Pilot, Instrument, Commercial, and Flight Instructor",
              "Stages, lessons, graded tasks, and your own grading scale",
              "Hour requirements per course, tracked separately from lesson completion",
              "Enrollments pinned to a syllabus version, with certify and graduate steps",
              "Endorsements from AC 61-65K Appendix A, with expiry on the ones that have it",
              "Transfer credit in and corrections out, both as entries",
              "Pace and silence per student, advisory and never gating",
              "Lesson records attached to the reservation the flight was booked as",
              "Grading offline on the phone, replayed when there is signal",
            ].map((line) => (
              <li key={line} className="flex gap-2 text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
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

        <section className="mt-10 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Related</h2>
          <p className="text-muted-foreground">
            <Link className="text-primary underline" href="/features/training">
              Training and syllabi
            </Link>{" "}
            covers the same ground from the product side.{" "}
            <Link className="text-primary underline" href="/features/compliance">
              Go / no-go
            </Link>{" "}
            is the other half of keeping people legal: currency and medicals that block a booking
            rather than a certificate that ends one.
          </p>
        </section>

        <section className="mt-12 rounded-lg border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold tracking-tight">Try it on one student</h2>
          <p className="mt-2 text-muted-foreground">
            {TRIAL_DAYS} days, no card. Start from the Private Pilot syllabus, enroll somebody,
            record a lesson against a flight you already booked, and sign it.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={signupUrl()} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/features/training" variant="secondary" size="lg">
              See how training works
            </Button>
          </div>
        </section>
      </article>
    </>
  );
}
