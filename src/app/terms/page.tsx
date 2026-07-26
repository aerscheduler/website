import type { Metadata } from "next";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <h1 className="text-4xl font-semibold tracking-tight text-brand-surface">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated July 25, 2026</p>
      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          By using AerScheduler you agree to these terms. If you are using the
          service on behalf of an organization, you represent that you have
          authority to bind that organization.
        </p>
        <h2 className="text-xl font-semibold text-foreground">The service</h2>
        <p>
          AerScheduler provides scheduling, billing, and related tools for
          aviation organizations. Features may change as we improve the product.
          Self-serve plans are billed per the pricing shown at signup and on our
          pricing page.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Your responsibilities</h2>
        <p>
          You are responsible for the accuracy of data you enter, for managing
          access within your organization, and for complying with applicable
          aviation and privacy regulations in your jurisdiction.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Accounts & billing</h2>
        <p>
          You must keep credentials secure. Subscription fees are charged as
          described at purchase; unpaid accounts may lose access after notice.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Contact</h2>
        <p>
          Questions:{" "}
          <a className="font-medium text-primary hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
