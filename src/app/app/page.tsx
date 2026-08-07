import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { PhoneMock } from "@/components/phone-mock";
import { StoreBadges } from "@/components/store-badges";
import { APP_STORE_URL, SIGNUP_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "iOS App",
  description: `Download the ${SITE_NAME} native iOS app. Book aircraft, pay invoices, log squawks, and run your flight school from your phone.`,
  alternates: { canonical: "/app" },
  openGraph: {
    title: `${SITE_NAME} iOS App`,
    description:
      "Native flight school apps for booking, invoices, documents, and squawks.",
    url: "/app",
  },
};

export default function AppPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
          <div>
            <Breadcrumbs items={[{ name: "App", href: "/app" }]} />
            <h1 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
              A native iOS app for your flight school
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Book lessons, check the board, pay invoices, and log squawks from
              your iPhone. The same operation as the web desk, not a mobile website.
            </p>
            <div className="mt-8">
              <StoreBadges />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={SIGNUP_URL} size="lg">
                Get started free
                <ChevronRight className="size-4 opacity-80" />
              </Button>
              <Button href="/features/mobile" variant="secondary" size="lg">
                See mobile features
              </Button>
            </div>
            <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={APP_STORE_URL}
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on the App Store
                </a>
              </li>
              {/* TODO(android): restore alongside PLAY_STORE_URL in lib/site.ts
              <li>
                <a
                  href={PLAY_STORE_URL}
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it on Google Play
                </a>
              </li>
              */}
            </ul>
          </div>
          <div className="mt-12 flex min-w-0 justify-center lg:mt-0 lg:justify-end">
            <PhoneMock />
          </div>
        </div>
      </section>

      <section className="bg-[#fafbfc]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">
            Built for the ramp, not a shrunk desktop
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              [
                "Book on the go",
                "Students and instructors reserve aircraft and lessons without calling the desk.",
              ],
              [
                "Stay current",
                "Invoices, documents, and alerts follow you between the hangar and home.",
              ],
              [
                "One school",
                "Web and mobile share the same schedule, fleet, and people. No double entry.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
