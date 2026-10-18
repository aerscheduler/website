import { ModelPageView, modelMetadata } from "@/components/ad-library/model-page";

export const revalidate = 3600;
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return modelMetadata("aircraft", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ModelPageView segment="aircraft" slug={(await params).slug} />;
}
