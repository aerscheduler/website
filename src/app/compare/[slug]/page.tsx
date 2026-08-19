import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparePage } from "@/components/compare-page";
import {
  COMPETITOR_LIST,
  competitorHref,
  getCompetitor,
} from "@/lib/competitors";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMPETITOR_LIST.map((competitor) => ({ slug: competitor.slug }));
}

/** Anything not in the registry is a 404 rather than an empty comparison. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};
  const url = competitorHref(competitor.slug);
  return {
    title: competitor.seoTitle,
    description: competitor.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: competitor.seoTitle,
      description: competitor.ogDescription,
      url,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();
  return <ComparePage competitor={competitor} />;
}
