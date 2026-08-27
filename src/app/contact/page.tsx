import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Clock, Mail, MessageSquare, Plug, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import {
  BOOK_DEMO_PATH,
  SIGNUP_URL,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  TRIAL_DAYS,
} from "@/lib/site";

const DESCRIPTION = `Contact ${SITE_NAME} about flight school scheduling software. Ask a product question, request an integration or feature, or get help migrating. We reply within one business day.`;

export const metadata: Metadata = {
  title: "Contact Us",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description:
      "Ask a question, request an integration or a feature, or get help moving your flight school over. We reply within one business day.",
    url: "/contact",
  },
};

/**
 * Answers to what people actually wonder before writing in. Doubles as FAQ
 * structured data, which is what earns the expanded result in search.
 */
const CONTACT_FAQS = [
  {
    q: "How quickly will I hear back?",
    a: `We reply to most messages within one business day. If something is urgent and account-related, email ${SUPPORT_EMAIL} directly and put your school name in the subject.`,
  },
  {
    q: "Do I need to talk to sales to try AerScheduler?",
    a: `No. AerScheduler is self-serve. You can create an account, add aircraft, and book your first lesson without talking to anyone. The ${TRIAL_DAYS}-day trial doesn't require a card. If you would rather be walked through it, or you're migrating from another platform, you can book a demo and talk to a real person.`,
  },
  {
    q: "Can I request an integration?",
    a: "Yes, and we want you to. Google Calendar, Stripe, and QuickBooks Online are live today. Roadmap priorities follow real demand from schools, so telling us what you already use counts as a vote.",
  },
  {
    q: "Can I request a feature?",
    a: "Yes. AerScheduler is built alongside working flight schools. Describe the problem you're trying to solve rather than the button you want, and we'll come back to you.",
  },
  {
    q: "I'm switching from another system. Can you help?",
    a: "We can. Follow the migration guide first (most schools are self-serve from there), then write in with your exports if you get stuck on data. Bigger moves are easier on a call: book a demo and bring the exports with you.",
  },
];

const REASONS = [
  {
    icon: MessageSquare,
    title: "Not sure if it fits",
    body: "Tell us how your school runs today and we'll tell you honestly whether AerScheduler is a fit.",
  },
  {
    icon: Plug,
    title: "Need an integration",
    body: "Say what you already use for billing, calendars, or logbooks. Demand from schools sets the roadmap.",
  },
  {
    icon: Sparkles,
    title: "Want a feature",
    body: "Describe the problem you're solving. Much of what shipped this year started as a request like yours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(CONTACT_FAQS)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${SITE_NAME}`,
          url: absoluteUrl("/contact"),
          description: DESCRIPTION,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
          mainEntity: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            email: SUPPORT_EMAIL,
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: SUPPORT_EMAIL,
                availableLanguage: "English",
              },
              {
                "@type": "ContactPoint",
                contactType: "sales",
                email: SUPPORT_EMAIL,
                availableLanguage: "English",
              },
            ],
          },
        }}
      />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="hero-mesh absolute inset-0 opacity-40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

          {/*
            Mobile order is heading → form → supporting detail: on a contact
            page the form is the thing people came for, and burying it under a
            screen of rail copy costs submissions. On large screens this lays
            back out as the usual two columns, with the form spanning both rows
            of the left-hand stack.
          */}
          <div className="mt-8 flex min-w-0 flex-col gap-10 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-14 lg:gap-y-10">
            <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-brand-surface sm:text-5xl">
                Talk to us
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                AerScheduler is self-serve, so most schools never need to. When
                you do, a real person reads this: usually within one business
                day.
              </p>
            </div>

            {/* The form. */}
            <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
              <ContactForm />
            </div>

            {/* Supporting detail: why you'd write in, and the ways that aren't a form. */}
            <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
              <ul className="space-y-6">
                {REASONS.map((reason) => (
                  <li key={reason.title} className="flex gap-3 sm:gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white shadow-sm">
                      <reason.icon className="size-[18px] text-primary" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-[15px] font-semibold text-foreground">{reason.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{reason.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-4 border-t border-border pt-8">
                <div className="flex flex-col gap-1 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
                  <span className="inline-flex items-center gap-3 text-muted-foreground">
                    <Mail className="size-4 shrink-0" aria-hidden />
                    Prefer email?
                  </span>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="break-all font-semibold text-primary hover:underline sm:break-normal"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm sm:items-center">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground sm:mt-0" aria-hidden />
                  <span className="text-muted-foreground">
                    Replies within one business day, Mon–Fri.
                  </span>
                </div>
              </div>

              {/* A form is the wrong shape for "I'm moving my whole school over
                  and I want to know who's helping me". That conversation gets a
                  calendar, not a text box. */}
              <div className="mt-8 rounded-xl border border-border bg-[#fafbfc] p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CalendarClock className="size-4 shrink-0 text-primary" aria-hidden />
                  Would rather talk?
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Book a 30-minute call and we&apos;ll walk your school through the
                  product, or plan your migration together.
                </p>
                <Link
                  href={BOOK_DEMO_PATH}
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Book a demo
                </Link>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-[#fafbfc] p-5">
                <h2 className="text-sm font-semibold text-foreground">Don&apos;t wait on us</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  You can start a {TRIAL_DAYS}-day trial and have your fleet on
                  the schedule before we even reply. No card required.
                </p>
                <a
                  href={SIGNUP_URL}
                  className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Start free trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-brand-surface">
            Before you write in
          </h2>
          <dl className="mt-10 space-y-8">
            {CONTACT_FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="text-[15px] font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 text-sm">
            <Link href="/pricing" className="font-medium text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/features" className="font-medium text-primary hover:underline">
              Features
            </Link>
            <Link href="/integrations" className="font-medium text-primary hover:underline">
              Integrations
            </Link>
            <Link href="/migrating/my-fbo" className="font-medium text-primary hover:underline">
              Migration guide
            </Link>
            <Link href={BOOK_DEMO_PATH} className="font-medium text-primary hover:underline">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
