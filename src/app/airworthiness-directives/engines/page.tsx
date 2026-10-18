import type { Metadata } from "next";
import { KindIndexView } from "@/components/ad-library/model-page";
import { AD_BASE } from "@/lib/ad-library";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Airworthiness Directives by Engine",
  description: "FAA Airworthiness Directives for each engine family on US-registered aircraft: Lycoming O-320, O-360, IO-540, Continental O-200, IO-520, Rotax 912 and more.",
  alternates: { canonical: `${AD_BASE}/engines` },
};

export default function Page() {
  return <KindIndexView segment="engines" />;
}
