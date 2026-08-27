import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightLeft,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  PlayCircle,
  ShieldCheck,
  UserRound,
  Video,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import {
  DEMO_URL,
  SALES_CALENDAR_URL,
  SIGNUP_URL,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  TRIAL_DAYS,
} from "@/lib/site";

const TITLE = "Book a Demo: Talk to a Real Person";
const DESCRIPTION = `Book a 30-minute call with ${SITE_NAME}. Get a guided tour, ask what your school actually runs on, and plan a migration from your current platform with a named point of contact.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/book-a-demo" },
  openGraph: {
    title: `Book a ${SITE_NAME} demo`,
    description:
      "Pick a time and talk to a real person. A guided tour of the product, honest answers, and a migration plan for the data you're carrying over.",
    url: "/book-a-demo",
  },
};

/** What the call is for, in the words a school owner would use. Ordered by how
 *  often it is the actual reason somebody books: migrations first. */
const AGENDA: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <ArrowRightLeft className="size-5" />,
    title: "You're moving off another platform",
    body: "Bring your exports. We'll walk through what comes across, what has to be rebuilt, and roughly how long the switch takes for a school your size.",
  },
  {
    icon: <ClipboardList className="size-5" />,
    title: "You want the tour of your operation, not ours",
    body: "Tell us how your school dispatches, bills, and tracks training today, and we'll show you those parts of AerScheduler rather than a canned slide deck.",
  },
  {
    icon: <UserRound className="size-5" />,
    title: "You want a name, not a shared inbox",
    body: "The person on the call stays your point of contact through setup, so there's somebody who already knows your school when a question comes up.",
  },
  {
    icon: <ShieldCheck className="size-5" />,
    title: "You need to know if it's a fit",
    body: "Clubs, FBOs, Part 61 and Part 141 schools all run differently. If AerScheduler is wrong for yours, we would rather say so on the call.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How long is the call?",
    a: "Thirty minutes is the default, and it is usually enough. If you're planning a migration and want longer, say so when you book and we'll set the time aside.",
  },
  {
    q: "Do I have to book a call to use AerScheduler?",
    a: `No. AerScheduler is self-serve: you can open the live demo without an account, or start a ${TRIAL_DAYS}-day trial without a card, and never speak to anyone. The call is there for schools that want a person alongside them.`,
  },
  {
    q: "Who will I be talking to?",
    a: "Someone who knows the product and works with flight schools every day, not a call centre reading a script. If your question turns out to be an engineering one, they'll bring an engineer in.",
  },
  {
    q: "Will you help me move my data over?",
    a: "Yes. Bring exports from your current system to the call and we'll go through them with you. Most schools are self-serve from the migration guide, but nobody has to be.",
  },
  {
    q: "I just have a quick question.",
    a: `Then don't book a call. Use the contact form or email ${SUPPORT_EMAIL} and you'll usually have an answer within one business day.`,
  },
];

export default function BookADemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/book-a-demo`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a demo",
      target: SALES_CALENDAR_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Book a demo", item: `${SITE_URL}/book-a-demo` },
      ],
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={[jsonLd, faqLd]} />

      {/* Hero. The booking button is the whole point of the page, so it is above
          the fold on every width and repeated once at the bottom. */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12 lg:pb-20 lg:pt-16">
          <div>
            <Breadcrumbs items={[{ name: "Book a demo", href: "/book-a-demo" }]} />
            <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              Book a demo with a real person
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Pick a time that suits you and we&rsquo;ll walk your school through
              AerScheduler: your fleet, your billing, your training records. If
              you&rsquo;re coming off another platform, bring your exports and
              we&rsquo;ll plan the move on the call.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={SALES_CALENDAR_URL}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                trackAs="book_a_demo"
              >
                <CalendarClock className="size-4 opacity-80" />
                Pick a time
              </Button>
              <Button href={DEMO_URL} variant="secondary" size="lg">
                <PlayCircle className="size-4 opacity-80" />
                Or open the live demo
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              30 minutes · Video call · No slide deck, no pressure
            </p>
          </div>

          {/* The booking card. Google's own picker cannot be framed from a short
              share link, so this hands off rather than embedding. */}
          <div className="mt-12 lg:mt-0">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
              <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Video className="size-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-brand-surface">
                Choose a slot
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our calendar opens in a new tab. Pick whatever time works, add
                what you&rsquo;d like to cover, and you&rsquo;ll get an invite with
                the video link straight away.
              </p>
              <Button
                href={SALES_CALENDAR_URL}
                size="lg"
                className="mt-5 w-full"
                target="_blank"
                rel="noopener noreferrer"
                trackAs="book_a_demo_card"
              >
                <CalendarClock className="size-4 opacity-80" />
                See available times
              </Button>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Rather not book a call?{" "}
                <Link href="/contact" className="font-semibold text-primary hover:underline">
                  Send us a message
                </Link>{" "}
                and a person answers, usually within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What the call covers */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              What we&rsquo;ll cover
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              Bring the awkward questions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              The software you schedule and bill on is not a small decision, and
              nobody switches on the strength of a feature list. Come with the
              parts of your operation you think will be hard.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {AGENDA.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="mt-4 font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 text-sm">
            <Link href="/migrating/my-fbo" className="font-medium text-primary hover:underline">
              Migration guide
            </Link>
            <Link href="/pricing" className="font-medium text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/features" className="font-medium text-primary hover:underline">
              Features
            </Link>
            <Link href="/integrations" className="font-medium text-primary hover:underline">
              Integrations
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Before you book
          </h2>
          <dl className="mt-8 space-y-8">
            {FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold tracking-tight text-foreground">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-surface text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Talk it through first.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">
              Thirty minutes with someone who knows both the product and how flight
              schools run. You&rsquo;ll leave knowing whether to switch, and what it
              takes if you do.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href={SALES_CALENDAR_URL}
              size="lg"
              className="bg-white text-brand-surface hover:bg-white/90"
              target="_blank"
              rel="noopener noreferrer"
              trackAs="book_a_demo_footer"
            >
              <CalendarClock className="size-4 opacity-80" />
              Pick a time
            </Button>
            <Button
              href={SIGNUP_URL}
              size="lg"
              className="border border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              Start {TRIAL_DAYS}-day free trial
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
