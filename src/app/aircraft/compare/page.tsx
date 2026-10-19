import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { COMPARE_BASE, compareHref, PAIRS } from "@/lib/aircraft-compare";
import { getGuides, GUIDE_BASE, guideTitle } from "@/lib/aircraft-guides";

/** Every comparison, by the kind of aircraft. */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Aircraft Comparisons: Cessna 172 vs Piper Archer and More",
  description:
    "Aircraft compared side by side from FAA and NTSB data: Cessna 172 vs Piper Archer, SR22 vs Bonanza, Cub vs Champ and more. Fleet, ages, engines, ADs, what mechanics report, accident records and fuel burn.",
  alternates: { canonical: COMPARE_BASE },
};

export default async function CompareIndex() {
  const guides = new Map((await getGuides()).map((g) => [g.slug, g]));
  const pairs = PAIRS.filter(([a, b]) => guides.has(a) && guides.has(b));
  return (
    <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Breadcrumbs
        items={[
          { name: "Aircraft guides", href: GUIDE_BASE },
          { name: "Compare", href: COMPARE_BASE },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-surface sm:text-4xl">Aircraft compared</h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        The models buyers weigh against each other, side by side from the FAA registry, the FAA&apos;s Airworthiness Directives and Service
        Difficulty Reports, and the NTSB&apos;s accident database. Every model also has its own{" "}
        <Link href={GUIDE_BASE} className="text-primary hover:underline">
          ownership guide
        </Link>
        .
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {pairs.map(([a, b]) => (
          <li key={`${a}-${b}`}>
            <Link href={compareHref(a, b)} className="block rounded-lg border border-border bg-white px-4 py-3 hover:border-primary">
              <span className="font-medium text-brand-surface">
                {guideTitle(guides.get(a)!)} vs {guideTitle(guides.get(b)!)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
