import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AerScheduler vs Flight Circle",
  description: `Compare ${SITE_NAME} and Flight Circle for flight schools: training records, Part 61 and Part 141 syllabi, per-aircraft pricing, and how each handles the hours a certificate actually turns on.`,
  alternates: { canonical: "/compare/flight-circle" },
  openGraph: {
    title: "AerScheduler vs Flight Circle",
    description:
      "Both run a training module. The difference is whether the software tracks the hours §61.109 asks for, or only the lessons.",
    url: "/compare/flight-circle",
  },
};

const ROWS: [string, string, string][] = [
  [
    "Getting started",
    "Self-serve signup. Book in minutes.",
    "Account setup with the vendor",
  ],
  [
    "Pricing model",
    `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Sims & rooms free. Unlimited users.`,
    "Quoted per school",
  ],
  [
    "Custom syllabi",
    "Stages, lessons, graded tasks, your own grading scale",
    "Yes, with a lesson content builder",
  ],
  [
    "Hour requirements",
    "Tracked as a ledger. One night cross-country credits four requirements at once",
    "Lessons are ticked off; hour minimums are not modelled",
  ],
  [
    "Simulator & transfer caps",
    "Appendix B and §141.77 ceilings applied, with the clipped amount shown",
    "Not modelled",
  ],
  [
    "Editing a published syllabus",
    "Refused. Revising forks a version; enrolled students keep theirs",
    "Editable in place",
  ],
  [
    "Correcting a signed lesson",
    "A correction supersedes it and reverses what it credited. Both stay readable",
    "Records can be edited",
  ],
  [
    "Where grading happens",
    "Inside the flight close-out, alongside the invoice",
    "A separate training screen",
  ],
  [
    "Offline grading",
    "Yes, on iOS. Grades queue at the aircraft and sync later",
    "Not offered",
  ],
  [
    "Training permissions",
    "Configure, enroll/graduate, check instructor (per course), auditor",
    "Configure, enroll/graduate, check instructor, auditor",
  ],
  [
    "Course fees",
    "Set a fee per course, billed through your ordinary invoices",
    "Fee item attached at enrollment",
  ],
  [
    "Lesson content (video, reading, quizzes)",
    "Not built. We link out to Sporty's, King or Gleim",
    "Built in, via their content builder",
  ],
  [
    "Best fit",
    "Schools that want the record to answer whether a student is legal to test",
    "Schools that want courseware and the record in one tool",
  ],
];

/**
 * The four claims this page rests on, kept beside the table so the copy and the reasoning
 * cannot drift apart.
 *
 * Every one of these is checkable by an operator during a trial rather than a slogan: the
 * whole point of a comparison page is that a reader can call the bluff, and the fastest way
 * to lose a Part 141 school is a claim their own POI can disprove.
 */
const PROOFS = [
  {
    title: "Ask either product how many hours of night the student has",
    body: "Ours answers, and says where each tenth came from. §61.109 asks for 40 hours total, 20 dual, 10 solo, 3 night, 3 instrument and a list of specific flights. We store each as a requirement and every signed lesson deposits into it. A lesson list cannot answer the question, which is why finishing the syllabus and being ready to test are not the same day.",
  },
  {
    title: "Ask what happens to eighteen transfer hours when the rule allows ten",
    body: "§141.77 caps what a school may credit from previous training. We credit ten, keep the eighteen on the record, and say on screen that eight were above the cap. Dropping them silently is how a student finds out at a checkride.",
  },
  {
    title: "Try to fix a typo in a published syllabus",
    body: "Ours refuses, and explains that students are enrolled against exactly those lessons. Revising forks a new version and anyone mid-course keeps the one they started under. That refusal is the feature: under Part 141 the syllabus is a document you filed, not a page you edit.",
  },
  {
    title: "Correct a lesson you already signed",
    body: "Ours writes the correction beside the original, reverses everything the original credited, and keeps both readable forever. §141.101 asks for a record. A record where mistakes disappear is not one.",
  },
];

export default function CompareFlightCirclePage() {
  return (
    <article className="border-b border-border">
      <div className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "vs Flight Circle", href: "/compare/flight-circle" },
            ]}
          />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            AerScheduler vs Flight Circle
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Flight Circle is one of the few products that takes flight training
            seriously, and the comparison is closer here than anywhere else on
            this site. Both build syllabi, both enroll students against them,
            both sign lessons. The difference is what the record can tell you
            afterwards.
          </p>

          {/* Paid traffic lands here from a switching ad and does not scroll a
              thousand words to find a button. */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Start free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/demo" variant="secondary" size="lg">
              See the live demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            ${PRICE_PER_AIRCRAFT}/aircraft/mo · {TRIAL_DAYS}-day trial · No credit
            card · No sales call
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
          Side-by-side
        </h2>
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[0.9fr_1.1fr_1.1fr] border-b border-border bg-muted/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:px-6">
            <span>Topic</span>
            <span>AerScheduler</span>
            <span>Flight Circle</span>
          </div>
          {ROWS.map(([topic, aer, fc]) => (
            <div
              key={topic}
              className="grid grid-cols-[0.9fr_1.1fr_1.1fr] gap-3 border-b border-border px-4 py-4 text-sm last:border-b-0 sm:px-6"
            >
              <span className="font-medium text-foreground">{topic}</span>
              <span className="text-foreground">{aer}</span>
              <span className="text-muted-foreground">{fc}</span>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          Four questions to ask both products
        </h2>
        <p className="mt-3 text-muted-foreground">
          Not marketing claims. Things you can try during a trial.
        </p>
        <div className="mt-6 space-y-6">
          {PROOFS.map((p) => (
            <div key={p.title} className="rounded-xl border border-border p-5">
              <h3 className="font-medium text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
          When AerScheduler is the better fit
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            You need the record to answer whether a student is legal to test, not just how
            far through the lessons they are
          </li>
          <li>You are Part 141, or heading there, and want the immutability to already be in place</li>
          <li>Your instructors debrief at the aircraft, where there is no signal</li>
          <li>You want grading and invoicing to come out of the same close-out</li>
          <li>You prefer per-aircraft pricing with unlimited seats and a self-serve start</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-brand-surface">
          When Flight Circle may fit better
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            You want ground-school content (video, reading and quizzes) inside the same tool.
            We deliberately do not build courseware and link out to Sporty&apos;s, King or
            Gleim instead
          </li>
          <li>Your syllabus depends on their lesson content builder</li>
          <li>You need a Flight Circle workflow or integration we do not cover yet</li>
        </ul>

        <div className="mt-12 rounded-2xl border border-border bg-[#fafbfc] p-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Try it against your own syllabus
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Start from our Private, Instrument, Commercial or CFI template, enroll one
            student, and sign a lesson. The hours post themselves. {TRIAL_DAYS} days, no
            sales call.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button href={SIGNUP_URL}>Start free</Button>
            <Button href="/demo" variant="secondary">
              Try the live demo
            </Button>
            <Link
              href="/features/training"
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
            >
              How training records work
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
