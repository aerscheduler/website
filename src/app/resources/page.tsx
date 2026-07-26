import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: `Guides for flight school scheduling software, MyFBO alternatives, and switching platforms. From ${SITE_NAME}.`,
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources | ${SITE_NAME}`,
    description:
      "Guides on flight school software, migrations, and platform comparisons.",
    url: "/resources",
  },
};

const GUIDES = [
  {
    href: "/resources/myfbo-alternative",
    title: "MyFBO alternative",
    body: "What to look for when MyFBO shuts down, and how AerScheduler compares as a self-serve replacement.",
  },
  {
    href: "/resources/flight-school-scheduling-software",
    title: "Flight school scheduling software",
    body: "What modern flight school scheduling software should include: dispatch, self-booking, billing, and mobile.",
  },
  {
    href: "/compare/flight-schedule-pro",
    title: "AerScheduler vs Flight Schedule Pro",
    body: "A practical comparison of pricing model, self-serve setup, mobile apps, and who each product fits.",
  },
  {
    href: "/migrating/my-fbo",
    title: "Migrating from MyFBO",
    body: "Step-by-step playbook: back up your data, stand up AerScheduler, run in parallel, then cut over.",
  },
  {
    href: "/pricing",
    title: "Pricing",
    body: "$20 per aircraft per month. Sims and classrooms free. Unlimited users. 14-day trial.",
  },
  {
    href: "/features",
    title: "Features",
    body: "Scheduling, billing, maintenance, compliance, and the native app broken down by capability.",
  },
];

export default function ResourcesPage() {
  return (
    <section className="relative border-b border-border">
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Breadcrumbs items={[{ name: "Resources", href: "/resources" }]} />
        <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
          Resources for flight schools
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Guides on scheduling software, migrations, and how AerScheduler fits
          when you&apos;re choosing a platform.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {guide.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read
                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
