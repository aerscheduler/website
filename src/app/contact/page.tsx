import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SIGNUP_URL, SUPPORT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} support for flight school software questions, migration help, or account assistance.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description: "Reach AerScheduler support for product and migration questions.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="relative border-b border-border">
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
        <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-brand-surface sm:text-5xl">
          Contact AerScheduler
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We&apos;re a self-serve product. Most schools start without talking to
          us. When you need a hand, email support and we&apos;ll help.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Support
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-3 block text-2xl font-semibold text-primary hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Best for migration questions, billing, and account access. Include
            your school name and the email on the account when you write in.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-[#fafbfc] p-5">
            <h2 className="font-semibold text-foreground">Start without us</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create an account, add aircraft, and book your first lesson in
              minutes.
            </p>
            <a
              href={SIGNUP_URL}
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Start free trial
            </a>
          </div>
          <div className="rounded-xl border border-border bg-[#fafbfc] p-5">
            <h2 className="font-semibold text-foreground">Switching from MyFBO?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow the self-serve playbook, then email us if you get stuck on
              data.
            </p>
            <a
              href="/migrating/my-fbo"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Migration guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
