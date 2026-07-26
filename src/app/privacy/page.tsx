import type { Metadata } from "next";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-brand-surface">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated July 25, 2026</p>
      <div className="prose-aer mt-10 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          AerScheduler (&quot;we&quot;, &quot;us&quot;) operates aerscheduler.com and
          related apps. This policy describes how we collect, use, and protect
          information when you use our services.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
        <p>
          Account details (name, email), organization and operational data you
          enter (fleet, schedules, invoices), device and usage telemetry needed to
          run and improve the product, and payment-related information processed
          by our payment providers (such as Stripe).
        </p>
        <h2 className="text-xl font-semibold text-foreground">How we use information</h2>
        <p>
          To provide and secure the product, bill for subscriptions, communicate
          about your account, and improve reliability and features. We do not sell
          your personal information.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Sharing</h2>
        <p>
          We share data with subprocessors that help us operate the service
          (hosting, payments, email, analytics) under contractual safeguards, and
          when required by law.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p>
          Questions about privacy:{" "}
          <a className="font-medium text-primary hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
