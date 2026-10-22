import type { Metadata } from "next";
import { KindIndexView } from "@/components/ad-library/model-page";
import { AD_BASE } from "@/lib/ad-library";

export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).

export const metadata: Metadata = {
  title: "Airworthiness Directives by Aircraft Model",
  description: "The FAA Airworthiness Directives for each aircraft model registered in the US, from the Cessna 172 to the Cirrus SR22, readable and free.",
  alternates: { canonical: `${AD_BASE}/aircraft` },
};

export default function Page() {
  return <KindIndexView segment="aircraft" />;
}
