import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { SIGNUP_URL, SITE_NAME, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} builds flight school management software for scheduling, billing, maintenance, and compliance. Self-serve, with native iOS and Android apps.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description:
      "Flight school software for modern schools, clubs, and instructors.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
            About AerScheduler
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            AerScheduler is flight school management software for owners,
            instructors, students, and dispatchers. Schedule aircraft, run
            billing, track maintenance, and stay current on compliance from the
            web or native mobile apps.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            What we believe
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Flight schools should not need a sales call to buy software. Sign
              up, add your fleet, invite your team, and start booking.
            </p>
            <p>
              Pricing should be obvious. Pay per aircraft. Simulators and
              classrooms stay free. Unlimited seats for the people who run your
              school.
            </p>
            <p>
              The desk and the ramp should share one system. That means a real
              web console and native iOS &amp; Android apps, not a mobile
              afterthought.
            </p>
          </div>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight text-brand-surface">
            Who it&apos;s for
          </h2>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Flight schools and Part 141 / Part 61 training organizations</li>
            <li>Flying clubs and FBOs that rent aircraft</li>
            <li>Independent instructors who need a shared schedule</li>
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Button href={SIGNUP_URL} size="lg">
              Get started
              <ChevronRight className="size-4 opacity-80" />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Questions?{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-medium text-primary hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            {" · "}
            <Link href="/product" className="font-medium text-primary hover:underline">
              Product overview
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
