import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { LibraryNotice } from "@/components/ad-library/notice";
import { TailCheckForm } from "@/components/ad-library/tail-check-form";
import { AD_BASE, CHECK_BASE } from "@/lib/ad-library";
import { faqJsonLd } from "@/lib/seo";

/**
 * The AD check by N-number: the tool's own page, the one search engines see. A result lives at
 * /check/N12345 and is not indexed (one page per registration would be 300,000 thin pages about
 * somebody's aeroplane). Without JavaScript the form goes to ./go, which sends it on.
 */
export const metadata: Metadata = {
  title: "AD Check by N-Number: Every Airworthiness Directive for One Aircraft",
  description:
    "Enter an N-number and get the FAA Airworthiness Directives that name that aircraft's airframe and engine, with the repeat inspections marked, as a checklist for a pre-buy or an annual. Free, from the FAA registry and every AD back to 1943.",
  alternates: { canonical: CHECK_BASE },
};

const FAQS = [
  {
    q: "Where does the aircraft's information come from?",
    a: "The FAA aircraft registry: year, make, model, serial number and engine, the same record anyone can look up on the FAA's site. Nothing about the owner is shown or stored with the check.",
  },
  {
    q: "Does the list say which ADs apply?",
    a: "No. It lists the ADs that name the aircraft's model or engine, which are the ones to read. Whether each applies depends on its serial number ranges, installed equipment and what is already in the logbooks, and that is a mechanic's determination.",
  },
  {
    q: "What does it leave out?",
    a: "The propeller and installed equipment are not in the FAA registry, so propeller ADs and ADs written for a part number are not found from the N-number. Equipment ADs that name the model are listed apart, and the propeller maker pages list theirs. Superseded ADs are left out and counted.",
  },
  {
    q: "Can I use it for a pre-buy inspection?",
    a: "That is what it is for: print the checklist and work through it against the logbooks with the mechanic doing the pre-buy. Each line has room for the compliance date, the method and when a repeat action is next due.",
  },
];

export default function TailCheckPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs
        items={[
          { name: "AD library", href: AD_BASE },
          { name: "Check by N-number", href: CHECK_BASE },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">Check an aircraft&apos;s ADs by N-number</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Every FAA Airworthiness Directive that names the aircraft&apos;s airframe or engine, from its registry record, with the repeat
        inspections marked. Print it as a checklist for a pre-buy or an annual.
      </p>
      <TailCheckForm className="mt-8" autoFocus />

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-brand-surface">What you get</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            The aircraft as the FAA registers it: year, make, model, <span className="text-foreground">serial number</span> and engine. AD
            applicability is written against the serial number, so it is printed at the top.
          </li>
          <li>The ADs that name the airframe, then the engine, the exact model before the family, superseded ones left out.</li>
          <li>Which ones have a repeat action, and what each requires, in the FAA&apos;s words.</li>
          <li>Equipment ADs that name the model, apart: a muffler or a seat belt AD applies only if that part is installed.</li>
          <li>A printable checklist with room for the compliance date, method and next due time.</li>
        </ul>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="text-xl font-semibold text-brand-surface">Questions</h2>
        <dl className="space-y-5">
          {FAQS.map((f) => (
            <div key={f.q}>
              <dt className="font-medium text-brand-surface">{f.q}</dt>
              <dd className="mt-1 text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        Looking for a model rather than one aircraft? Browse{" "}
        <Link href={`${AD_BASE}/aircraft`} className="text-primary hover:underline">
          ADs by aircraft model
        </Link>
        .
      </p>
      <LibraryNotice className="mt-10" compact />
    </article>
  );
}
