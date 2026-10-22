import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { RentalRateCalculator, type RentalModel } from "@/components/aircraft-guides/rental-rate-calculator";
import { defaultTbo, FUEL_BURN, getGuide, GUIDE_BASE, GUIDE_REVALIDATE, guideHref, guideTitle, RATE_CALCULATOR_PATH } from "@/lib/aircraft-guides";
import { faqJsonLd } from "@/lib/seo";
import { signupUrl } from "@/lib/site";

/**
 * What to charge to rent an aircraft: the owner's costs per hour rented, plus a margin, as a wet
 * and a dry rate. For flight schools, flying clubs and leaseback owners. The model list is the
 * guides that have a typical fuel burn (FUEL_BURN), so a pick always fills something in.
 */
export const revalidate = GUIDE_REVALIDATE;

export const metadata: Metadata = {
  title: "Aircraft Rental Rate Calculator: What to Charge, Wet or Dry",
  description:
    "Work out what to charge to rent an aircraft: fuel, engine and propeller reserves, 100-hour inspections and a year's fixed costs per hour, plus your margin, as a wet and a dry rate. Shows its working.",
  alternates: { canonical: RATE_CALCULATOR_PATH },
  openGraph: { title: "Aircraft rental rate calculator", url: RATE_CALCULATOR_PATH },
};

const FAQS = [
  {
    q: "How do you work out an aircraft rental rate?",
    a: "Add up what each hour costs: fuel, a reserve toward the engine and propeller overhauls, the 100-hour inspections, other maintenance, and the year's fixed costs (insurance, hangar, annual, loan) divided by the hours it rents. That is the break-even rate. Your margin goes on top.",
  },
  {
    q: "What is the difference between a wet and a dry rate?",
    a: "A wet rate includes fuel. A dry rate does not, and the renter pays for fuel separately. The dry rate is the wet rate without the fuel line.",
  },
  {
    q: "Why does the number of hours matter so much?",
    a: "The fixed costs are owed whether the aircraft flies or not, so they are spread over the hours it rents. An aircraft that flies half as much as planned costs more per hour, and a rate set on hopeful hours loses money.",
  },
  {
    q: "Should I bill by Hobbs or by tach?",
    a: "Either works if the rate matches the clock. Tach time usually runs slower than Hobbs time, so a rate billed by tach has to be higher to bring in the same money. Enter your Hobbs-to-tach ratio and the calculator shows both.",
  },
];

async function rentalModels(): Promise<RentalModel[]> {
  const slugs = Object.keys(FUEL_BURN);
  const guides = await Promise.all(slugs.map((slug) => getGuide(slug)));
  return slugs
    .map((slug, i) => {
      const g = guides[i];
      return {
        slug,
        label: g ? guideTitle(g) : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        fuelBurn: FUEL_BURN[slug] ?? null,
        tbo: defaultTbo(slug, g?.engines[0]?.name ?? null),
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, "en-US", { numeric: true }));
}

export default async function RentalRateCalculatorPage() {
  const models = await rentalModels();
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs
        items={[
          { name: "Aircraft guides", href: GUIDE_BASE },
          { name: "Rental rate calculator", href: RATE_CALCULATOR_PATH },
        ]}
      />
      <header className="mt-6 max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-brand-surface sm:text-4xl">Aircraft rental rate calculator</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          What to charge per hour to rent an aircraft, wet or dry, for a flight school, a flying club or a leaseback. Enter what it costs you, and
          every line of the result shows how it was worked out.
        </p>
      </header>

      <div className="mt-10">
        <RentalRateCalculator models={models} />
      </div>

      <section className="mt-16 max-w-3xl space-y-6 border-t border-border pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-surface">Questions owners ask</h2>
        {FAQS.map((f) => (
          <div key={f.q} className="space-y-1.5">
            <h3 className="font-semibold text-brand-surface">{f.q}</h3>
            <p className="leading-relaxed text-foreground">{f.a}</p>
          </div>
        ))}
        <p className="leading-relaxed text-foreground">
          The fuel burn and overhaul times come from the{" "}
          <Link href={GUIDE_BASE} className="text-primary hover:underline">
            aircraft ownership guides
          </Link>
          , where each model also lists its Airworthiness Directives and what they cost to keep up with, as on the{" "}
          <Link href={guideHref("cessna-172s")} className="text-primary hover:underline">
            Cessna 172S
          </Link>{" "}
          guide.
        </p>
      </section>

      <aside className="mt-12 max-w-3xl space-y-2 border-t border-border pt-6 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          In AerScheduler the rate lives on the aircraft, wet or dry, billed by Hobbs or by tach, and every flight is priced from it when it is closed
          out.{" "}
          <Link href="/docs/billing/set-aircraft-and-instruction-rates" className="text-primary hover:underline">
            How aircraft rates work
          </Link>{" "}
          ·{" "}
          <a href={signupUrl("billing")} className="text-primary hover:underline">
            Try it free
          </a>
        </p>
      </aside>
    </article>
  );
}
