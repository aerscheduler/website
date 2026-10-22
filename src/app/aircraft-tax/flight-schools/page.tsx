import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { StatusText, TaxNotice } from "@/components/aircraft-tax/fact";
import {
  COUNTRY_LIST,
  FLIGHT_SCHOOL_TAX_PATH,
  PUBLISHED,
  STATUS_LABEL,
  TAX_BASE,
  regionHref,
  regionsIn,
  type TaxRegion,
  type TaxStatus,
} from "@/lib/aircraft-tax";
import { faqJsonLd } from "@/lib/seo";

/**
 * Sales tax on flight instruction and aircraft rental in every US state, for the people who
 * charge for both: flight schools and flying clubs. Nothing here is new research. Every status
 * and answer is the state page's own (content/aircraft-tax/us), which quotes its source, so
 * the two can never disagree; the examples below are picked from that data by state code and
 * print the state's answer, never a sentence written here about it.
 */

const US = COUNTRY_LIST.find((c) => c.code === "US")!;
const STATES = regionsIn(US);
/** "50 states and DC", counted rather than assumed. */
const SCOPE = `${STATES.filter((r) => r.code !== "DC").length} states${STATES.some((r) => r.code === "DC") ? " and DC" : ""}`;
const ORDER: TaxStatus[] = ["taxable", "exempt", "conditional", "none", "unclear"];
/** "None" alone reads as "no answer" in a count; here it means the state has no sales tax. */
const COUNT_LABEL: Record<TaxStatus, string> = { ...STATUS_LABEL, none: "No sales tax" };

function tally(topic: "instruction" | "rental") {
  const counts = Object.fromEntries(ORDER.map((s) => [s, 0])) as Record<TaxStatus, number>;
  for (const r of STATES) counts[r.facts[topic].status as TaxStatus] += 1;
  return counts;
}
const INSTRUCTION = tally("instruction");
const RENTAL = tally("rental");

/** States whose answer turns on how the bill is written, and states where solo time is treated differently. */
const pick = (codes: string[]) => codes.map((code) => STATES.find((r) => r.code === code)).filter((r): r is TaxRegion => !!r);
const BILLING_MATTERS = pick(["PA", "WI", "MN", "IN"]);
const SOLO_MATTERS = pick(["FL", "MS", "UT"]);

const phrase = (n: number) => `${n} ${n === 1 ? "state" : "states"}`;

export const metadata: Metadata = {
  title: "Sales Tax on Flight Instruction and Aircraft Rental, by State",
  description:
    "Is flight instruction taxed? Are aircraft rentals? The answer for all 50 states and DC, for flight schools and flying clubs, each quoted from the state's own source.",
  alternates: { canonical: FLIGHT_SCHOOL_TAX_PATH },
  openGraph: { title: "Sales tax for flight schools, by state", url: FLIGHT_SCHOOL_TAX_PATH },
  ...(PUBLISHED ? {} : { robots: { index: false, follow: true } }),
};

const FAQS = [
  {
    q: "Is flight instruction subject to sales tax?",
    a: `In most states nobody has said. Of the ${SCOPE}, ${phrase(INSTRUCTION.taxable)} tax it, ${phrase(INSTRUCTION.exempt)} exempt it, ${phrase(INSTRUCTION.conditional)} tax part of it depending on how it is billed, ${phrase(INSTRUCTION.none)} have no sales tax, and ${phrase(INSTRUCTION.unclear)} publish nothing clear.`,
  },
  {
    q: "Are aircraft rentals taxed?",
    a: `Usually. Aircraft rentals are taxed in ${phrase(RENTAL.taxable)}, exempt in ${phrase(RENTAL.exempt)}, depend on the circumstances in ${phrase(RENTAL.conditional)}, not taxed at all in ${phrase(RENTAL.none)}, and not clearly addressed in ${phrase(RENTAL.unclear)}.`,
  },
  {
    q: "Does it matter if instruction and the aircraft are on separate lines?",
    a: "In several states, yes. Where instruction is not taxed but the aircraft rental is, a bill that lumps the two together can make the whole amount taxable. Pennsylvania, Wisconsin, Minnesota and Indiana are examples; each state's page quotes the rule.",
  },
];

export default function FlightSchoolTaxPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs
        items={[
          { name: "Aircraft tax", href: TAX_BASE },
          { name: "Flight schools", href: FLIGHT_SCHOOL_TAX_PATH },
        ]}
      />
      <header className="mt-6 max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">
          Sales tax on flight instruction and aircraft rental, by state
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          For flight schools and flying clubs: whether each state taxes the lessons you teach and the aircraft you rent out. Every answer is the
          one on that state&apos;s aircraft tax page, where the statute, rule or guidance it rests on is quoted with the date we checked it.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Across all states">
        {(
          [
            ["Flight instruction", INSTRUCTION],
            ["Aircraft rental", RENTAL],
          ] as const
        ).map(([label, counts]) => (
          <div key={label} className="rounded-lg border border-border bg-white p-5">
            <h2 className="font-semibold text-brand-surface">{label}, across the {SCOPE}</h2>
            <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5 text-[15px]">
              {ORDER.map((s) => (
                <div key={s} className="contents">
                  <dt className="text-muted-foreground">{COUNT_LABEL[s]}</dt>
                  <dd className="text-right font-medium text-brand-surface tabular-nums">{counts[s]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      <section className="mt-12 max-w-3xl space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">How you write the bill can decide the tax</h2>
          <p className="leading-relaxed">
            Where instruction is not taxed but the aircraft is, the aircraft and the instructor belong on separate lines. In each state&apos;s words:
          </p>
          <ul className="space-y-3">
            {BILLING_MATTERS.map((r) => (
              <li key={r.code} className="leading-relaxed">
                <Link href={`${regionHref(r)}#instruction`} className="font-medium text-primary hover:underline">
                  {r.name}
                </Link>
                : {r.facts.instruction.answer}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Solo time is not always instruction</h2>
          <ul className="space-y-3">
            {SOLO_MATTERS.map((r) => (
              <li key={r.code} className="leading-relaxed">
                <Link href={`${regionHref(r)}#instruction`} className="font-medium text-primary hover:underline">
                  {r.name}
                </Link>
                : {r.facts.instruction.answer}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Most states have not said</h2>
          <p className="leading-relaxed">
            {INSTRUCTION.unclear} states publish no clear rule on flight instruction. If yours is one of them, a written ruling from the state&apos;s
            revenue department, or a CPA who knows aviation, settles it before an audit does.
          </p>
        </div>
      </section>

      <section className="mt-14 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Every state</h2>
        <div className="divide-y divide-border rounded-lg border border-border bg-white">
          {STATES.map((r) => (
            <div key={r.slug} className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[11rem_1fr_1fr] lg:gap-6">
              <h3 className="font-semibold">
                <Link href={regionHref(r)} className="text-primary hover:underline">
                  {r.name}
                </Link>
              </h3>
              {(["instruction", "rental"] as const).map((t) => (
                <div key={t} className="min-w-0 space-y-1 text-[15px] leading-relaxed">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{t === "instruction" ? "Flight instruction" : "Aircraft rental"}</p>
                  <p>
                    <Link href={`${regionHref(r)}#${t}`} className="hover:underline">
                      <StatusText status={r.facts[t].status as TaxStatus} className="font-semibold" />
                    </Link>
                    . {r.facts[t].answer}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Each state&apos;s page also covers buying an aircraft, bringing one in, maintenance parts and labor, and yearly fees. To compare those
          too, see{" "}
          <Link href={TAX_BASE} className="text-primary hover:underline">
            aircraft tax by state
          </Link>
          .
        </p>
      </section>

      <TaxNotice className="mt-14 max-w-3xl" />
    </div>
  );
}
