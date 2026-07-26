import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { LOGIN_URL, SIGNUP_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to ${SITE_NAME} to manage your flight school schedule, billing, fleet, and team on web or in the native app.`,
  alternates: { canonical: "/login" },
  openGraph: {
    title: `Login | ${SITE_NAME}`,
    description: `Sign in to your ${SITE_NAME} account.`,
    url: "/login",
  },
};

export default function LoginPage() {
  return (
    <section className="relative border-b border-border">
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-xl px-4 py-16 sm:px-6 lg:py-24">
        <Breadcrumbs items={[{ name: "Login", href: "/login" }]} />
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
          Login to AerScheduler
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Sign in to your school&apos;s schedule, invoices, fleet, and team.
          Same account on the web and in the native iOS app.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={LOGIN_URL} size="lg">
            Continue to login
            <ChevronRight className="size-4 opacity-80" />
          </Button>
          <Button href={SIGNUP_URL} variant="secondary" size="lg">
            Create an account
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          New school?{" "}
          <a href={SIGNUP_URL} className="font-medium text-primary hover:underline">
            Start a free trial
          </a>{" "}
          in minutes. No sales call.
        </p>
      </div>
    </section>
  );
}
