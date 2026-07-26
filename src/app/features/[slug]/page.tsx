import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturePage } from "@/components/feature-page";
import { FEATURE_LIST, getFeature } from "@/lib/features";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FEATURE_LIST.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  return {
    title: feature.title,
    description: feature.summary,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) notFound();
  return <FeaturePage feature={feature} />;
}
