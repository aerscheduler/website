import { ModelPageView, modelMetadata } from "@/components/ad-library/model-page";

export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return modelMetadata("propellers", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ModelPageView segment="propellers" slug={(await params).slug} />;
}
