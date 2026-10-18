import type { Metadata } from "next";
import { KindIndexView } from "@/components/ad-library/model-page";
import { AD_BASE } from "@/lib/ad-library";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Airworthiness Directives by Aircraft Model",
  description: "Every FAA Airworthiness Directive since 1995 for each aircraft model registered in the US, from the Cessna 172 to the Cirrus SR22, readable and free.",
  alternates: { canonical: `${AD_BASE}/aircraft` },
};

export default function Page() {
  return <KindIndexView segment="aircraft" />;
}
