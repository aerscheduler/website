import type { Metadata } from "next";
import { KindIndexView } from "@/components/ad-library/model-page";
import { AD_BASE } from "@/lib/ad-library";

export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).

export const metadata: Metadata = {
  title: "Equipment and Appliance Airworthiness Directives",
  description: "FAA Airworthiness Directives written against equipment rather than an aircraft: magnetos, ELTs, seats, oxygen, avionics and more, by maker.",
  alternates: { canonical: `${AD_BASE}/appliances` },
};

export default function Page() {
  return <KindIndexView segment="appliances" />;
}
