import type { Metadata } from "next";
import {
  ChevronRight,
  PlayCircle,
  CalendarDays,
  Users,
  BarChart3,
  Wrench,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { ProductMock } from "@/components/product-mock";
import { JsonLd } from "@/components/json-ld";
import {
  DEMO_URL,
  SIGNUP_URL,
  SITE_NAME,
  SITE_URL,
  TRIAL_DAYS,
  BOOK_DEMO_PATH,
} from "@/lib/site";

const TITLE = "Live Demo: Try Flight School Software, No Signup";
const DESCRIPTION =
  "Try AerScheduler free with no signup. Open a live, fully-loaded sample flight school in your browser: schedule aircraft, run reports, and explore every role. No account, no credit card, no sales call.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/demo" },
  openGraph: {
    title: `${SITE_NAME} Live Demo: No Signup`,
    description: DESCRIPTION,
    url: "/demo",
  },
};

/** What a visitor gets to poke at, phrased as outcomes rather than features. */
const EXPLORE: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <CalendarDays className="size-5" />,
    title: "A working dispatch board",
    body: "A full day of flights across a real fleet. Drag a booking, close one out, see the ramp.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Every role, one click apart",
    body: "Switch between owner, dispatcher, instructor, student, renter, and technician to see each person's view.",
  },
  {
    icon: <BarChart3 className="size-5" />,
    title: "Reports with real history",
    body: "Months of flights and invoices are already loaded, so utilization and revenue reports actually have something to show.",
  },
  {
    icon: <Wrench className="size-5" />,
    title: "Maintenance & squawks",
    body: "A grounded aircraft, an open squawk, and an overdue inspection. The parts of the day that matter most.",
  },
];

/** Single source for the FAQ: rendered below AND emitted as FAQPage JSON-LD, so
 *  the two can never drift and the page is eligible for FAQ rich results. */
const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need to sign up or enter a card to try it?",
    a: "No. The demo opens straight in your browser with no account and no payment details. When you want your own school, signup takes about two minutes and starts a free trial.",
  },
  {
    q: "Is this the real software?",
    a: "Yes. It's the actual AerScheduler web console, running a sample flight school. What you see in the demo is what you'd run your own operation on.",
  },
  {
    q: "Can I try it as an instructor or a student, not just an admin?",
    a: "Yes. A role switcher in the demo lets you view the school as an owner, dispatcher, instructor, student, renter, or technician, so you can see exactly what each person on your team would see.",
  },
  {
    q: "Will I break anything?",
    a: "You can't. It's an isolated sandbox with no real data, and a reset button restores it whenever you like.",
  },
];

export default function DemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/demo`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    // The demo is the primary action of this page; mark it as such for search
    // engines that surface sitelinks and actions.
    potentialAction: {
      "@type": "ViewAction",
      name: "Try the live demo",
      target: DEMO_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Live demo", item: `${SITE_URL}/demo` },
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

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:grid lg:grid-cols-[0.9fr_1.2fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-16">
          <div>
            <Breadcrumbs items={[{ name: "Live demo", href: "/demo" }]} />
            <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              Try AerScheduler live, with no signup
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              One click opens a fully-loaded sample flight school in your browser. Move
              flights, run the reports, and see the whole operation from every seat.
              No account, no credit card, nothing to install.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={DEMO_URL} size="lg">
                <PlayCircle className="size-4 opacity-80" />
                Open the live demo
              </Button>
              <Button href={SIGNUP_URL} variant="secondary" size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Opens instantly · Nothing here is real · Resets itself, so poke around
              freely
            </p>
            {/* The white-glove path. Most visitors want the sandbox, but a school
                migrating off another platform wants a person, and this page is
                where they arrive looking for one. */}
            <p className="mt-3 text-sm text-muted-foreground">
              Would rather be walked through it?{" "}
              <Link href={BOOK_DEMO_PATH} className="font-semibold text-primary hover:underline">
                Book a demo with a real person
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 flex min-w-0 justify-center lg:mt-0">
            <ProductMock />
          </div>
        </div>
      </section>

      {/* What you can explore */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              What&rsquo;s inside
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">
              A real day at a flight school, already set up
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Empty demos prove nothing. This one comes pre-loaded with a fleet, a full
              roster, months of history, and the messy bits, so you can judge the
              product on the work you actually do.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {EXPLORE.map((item) => (
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
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <Reassure
            icon={<ShieldCheck className="size-5" />}
            title="It's a sandbox"
            body="Made-up school, made-up people. No real data, and nothing you do leaves the demo."
          />
          <Reassure
            icon={<RotateCcw className="size-5" />}
            title="Reset anytime"
            body="A reset button puts it all back. Break things, try the edge cases. That's what it's for."
          />
          <Reassure
            icon={<PlayCircle className="size-5" />}
            title="No commitment"
            body="No account, no card, no call. When you're ready, your own school is a two-minute signup."
          />
        </div>
      </section>

      {/* FAQ: plain-language answers double as long-tail SEO */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Demo questions
          </h2>
          <dl className="mt-8 space-y-8">
            {FAQ.map((item) => (
              <Faq key={item.q} q={item.q} a={item.a} />
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-surface text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Take it for a lap.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/65">
              The fastest way to know if AerScheduler fits your school is to fly it.
              Open the demo. It&rsquo;s already waiting.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={DEMO_URL} size="lg" className="bg-white text-brand-surface hover:bg-white/90">
              <PlayCircle className="size-4 opacity-80" />
              Open the live demo
            </Button>
            <Button
              href={SIGNUP_URL}
              size="lg"
              className="border border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              Start {TRIAL_DAYS}-day free trial
            </Button>
            <Link
              href={BOOK_DEMO_PATH}
              className="text-sm font-semibold text-white/75 underline-offset-4 hover:text-white hover:underline"
            >
              Book a demo instead
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Reassure({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-semibold tracking-tight text-foreground">{q}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</dd>
    </div>
  );
}
