import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { RegNotice } from "@/components/regulations/notice";
import { RegList } from "@/components/regulations/reg-list";
import { TOPICS } from "@/content/regulations/registry.mjs";
import { PARTS_WITH_PAGES, REG_BASE, REGS, TEXT_AS_OF, partHref, regsInPart, regsInTopic } from "@/lib/regulations";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAA Regulations in Plain English for Owners, Flight Schools and Pilots",
  description:
    "The 14 CFR sections aircraft owners, flight schools, mechanics, instructors and renters look up most: inspections, maintenance records, ADs, medicals, currency and Part 141. Each explained in plain English beside the official eCFR text.",
  alternates: { canonical: REG_BASE, types: { "text/markdown": `${REG_BASE}.md` } },
  openGraph: {
    title: "FAA regulations in plain English",
    description: "The FARs owners, flight schools and pilots look up most, explained beside the official text.",
    url: REG_BASE,
  },
};

const FAQS = [
  {
    q: "Is this the official text of the FARs?",
    a: "The text under each summary is the eCFR's, word for word, and each page links to the section on ecfr.gov. The eCFR is published by the Office of the Federal Register and is the current text. The plain-English summary above it is ours.",
  },
  {
    q: "How current is it?",
    a: "The official text is refreshed from the eCFR every week, and every page says the date its text is current as of and when the section was last amended. When a section changes, its summary is reread before the page shows the new text.",
  },
  {
    q: "Why these sections and not all of Part 91?",
    a: "These are the rules a new aircraft owner, a new flight school, a mechanic, an instructor or a renter actually looks up: the ones where the answer changes what you do this week. More are added over time.",
  },
  {
    q: "Is a FAR the same as 14 CFR?",
    a: "Yes. The Federal Aviation Regulations are Title 14 of the Code of Federal Regulations, so FAR 91.409 and 14 CFR 91.409 are the same rule.",
  },
];

export default function RegulationsHub() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="relative border-b border-border">
        <div className="hero-mesh pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
          <Breadcrumbs items={[{ name: "Regulations", href: REG_BASE }]} />
          <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">14 CFR, explained</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-balance text-brand-surface sm:text-5xl">
            FAA regulations in plain English
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The {REGS.length} sections of the FARs that aircraft owners, flight schools, mechanics, instructors and renters look up most.
            Each one starts with the answer, explains the rule paragraph by paragraph, and shows the official text underneath.
          </p>
          <nav aria-label="Topics" className="mt-8 flex flex-wrap gap-2">
            {TOPICS.filter((t) => regsInTopic(t.slug).length).map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-brand-surface hover:border-primary hover:text-primary"
              >
                {t.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl space-y-16 px-4 py-14 sm:px-6">
          {TOPICS.map((t) => {
            const regs = regsInTopic(t.slug);
            if (!regs.length) return null;
            return (
              <div key={t.slug} id={t.slug} className="scroll-mt-24 grid gap-6 lg:grid-cols-[16rem_1fr]">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">{t.title}</h2>
                  <p className="text-sm font-medium text-muted-foreground">{t.audience}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.blurb}</p>
                </div>
                <RegList regs={regs} />
              </div>
            );
          })}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">By Part</h2>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {PARTS_WITH_PAGES.map((p) => (
                <li key={p.part}>
                  <Link href={partHref(p.part)} className="group block">
                    <span className="font-medium text-primary group-hover:underline">Part {p.part}</span>{" "}
                    <span className="text-foreground">{p.title}</span>
                    <span className="block text-sm text-muted-foreground tabular-nums">
                      {regsInPart(p.part).length} {regsInPart(p.part).length === 1 ? "section" : "sections"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="faq" className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Questions</h2>
            <dl className="space-y-5">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <dt className="font-medium text-brand-surface">{f.q}</dt>
                  <dd className="mt-1 text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-muted-foreground">
              Official text current as of {TEXT_AS_OF}. Every summary and citation is also available as{" "}
              <a href={`${REG_BASE}/data.json`} className="text-primary hover:underline">
                JSON
              </a>{" "}
              and as{" "}
              <a href={`${REG_BASE}.md`} className="text-primary hover:underline">
                Markdown
              </a>
              .
            </p>
          </div>

          <RegNotice />

          <aside className="flex flex-col gap-4 rounded-xl bg-brand-surface p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <p className="text-lg font-semibold">Track the inspections, ADs and currencies these rules require</p>
              <p className="mt-1 text-white/75">
                AerScheduler, the scheduling and maintenance software this library comes from, tracks each aircraft&apos;s inspections and
                ADs and each pilot&apos;s medical and flight review, and keeps anything overdue off the schedule.
              </p>
            </div>
            <a
              href={signupUrl("maintenance")}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-medium text-brand-surface hover:bg-white/90"
            >
              Try it free <ArrowRight className="size-4" aria-hidden />
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
