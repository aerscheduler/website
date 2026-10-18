import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideGrid } from "@/components/aircraft-guides/guide-grid";
import { AD_BASE, CHECK_BASE, fmt } from "@/lib/ad-library";
import { getGuides, GUIDE_BASE } from "@/lib/aircraft-guides";

/** The ownership guides, one per model with at least 200 US registrations, by maker. */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Aircraft Ownership Guides: Fleet, ADs and What to Check, by Model",
  description:
    "Ownership guides for every aircraft model with 200 or more registered in the US, from the Cessna 172 and Piper Archer to the Cub and the Bonanza: how many are flying, when they were built, their engines, their Airworthiness Directives, and what to check before buying one.",
  alternates: { canonical: GUIDE_BASE },
};

export default async function GuidesPage() {
  const guides = await getGuides();
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs items={[{ name: "Aircraft guides", href: GUIDE_BASE }]} />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">Aircraft ownership guides</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        {guides.length ? `${fmt(guides.length)} models` : "Every model"} with 200 or more registered in the US: how many are flying, when they
        were built, the engines they carry, their Airworthiness Directives and the ones that repeat, and what to check before buying one.
        Built from the FAA aircraft registry and the{" "}
        <Link href={AD_BASE} className="text-primary hover:underline">
          AD library
        </Link>
        . Looking at one aircraft? Use the{" "}
        <Link href={CHECK_BASE} className="text-primary hover:underline">
          AD check by N-number
        </Link>
        .
      </p>
      <GuideGrid guides={guides} />
    </article>
  );
}
