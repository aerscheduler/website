import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { PRICE_PER_AIRCRAFT, SIGNUP_URL, SITE_NAME, TRIAL_DAYS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Best MyFBO Alternative for Flight Schools",
  description: `Looking for a MyFBO alternative? ${SITE_NAME} is self-serve flight school software with scheduling, billing, native apps, and $${PRICE_PER_AIRCRAFT}/mo per aircraft pricing.`,
  alternates: { canonical: "/resources/myfbo-alternative" },
  openGraph: {
    title: "Best MyFBO Alternative for Flight Schools",
    description:
      "Self-serve scheduling, billing, and native apps. No demo required.",
    url: "/resources/myfbo-alternative",
  },
};

const FAQS = [
  {
    q: "What should I look for in a MyFBO alternative?",
    a: "Scheduling that works for dispatch, clear pricing, native mobile apps, billing that closes out flights, and a way to start without waiting on a sales team.",
  },
  {
    q: "Is AerScheduler a full MyFBO replacement?",
    a: "AerScheduler covers scheduling, fleet, people, billing, maintenance, compliance, and native apps. Start with the migration playbook and map your MyFBO workflows before cutover.",
  },
  {
    q: "Do I need a demo to switch?",
    a: "No. AerScheduler is fully self-serve. Create an account and set up your school in minutes.",
  },
];

export default function MyFboAlternativePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <article className="border-b border-border">
        <div className="relative overflow-hidden border-b border-border">
          <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <Breadcrumbs
              items={[
                { name: "Resources", href: "/resources" },
                { name: "MyFBO alternative", href: "/resources/myfbo-alternative" },
              ]}
            />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              The best MyFBO alternative for modern flight schools
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              MyFBO is shutting down in August 2026. If you need a replacement
              you can stand up yourself, AerScheduler is built for that: schedule,
              bill, maintain, and run the school on web and native mobile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Start free trial
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/migrating/my-fbo" variant="secondary" size="lg">
                Migration playbook
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Why schools look past MyFBO clones
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Replacing a long-running FBO platform is stressful. The wrong
            alternative locks you into demos, per-seat pricing, or a web-only
            experience your instructors won&apos;t open on the ramp. A strong
            MyFBO alternative should get you operational quickly and keep the
            whole team in one system.
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            What AerScheduler includes
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Lane-board scheduling and student self-booking",
              "Fleet, rates, grounding, and maintenance squawks",
              "Invoices and Stripe payments",
              "Native iOS and Android apps plus web",
              `$${PRICE_PER_AIRCRAFT}/mo per aircraft · sims and rooms free · ${TRIAL_DAYS}-day trial`,
              "Self-serve signup with no sales call",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            How to switch without chaos
          </h2>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-muted-foreground">
            <li>Download your MyFBO .bak backup while the account is still live.</li>
            <li>Create an AerScheduler org and recreate fleet + people.</li>
            <li>Run both systems in parallel until dispatch feels solid.</li>
            <li>Cut over on a quieter week and keep the backup archived.</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            Full steps:{" "}
            <Link href="/migrating/my-fbo" className="font-medium text-primary hover:underline">
              Migrating from MyFBO
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-brand-surface">
            FAQ
          </h2>
          <dl className="mt-6 divide-y divide-border">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <dt className="font-semibold text-foreground">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-2xl border border-border bg-[#fafbfc] p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              Ready to try a MyFBO alternative?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {TRIAL_DAYS}-day trial · ${PRICE_PER_AIRCRAFT}/aircraft/mo · No demo
            </p>
            <Button href={SIGNUP_URL} size="lg" className="mt-5">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
