import type { Metadata } from "next";
import { KindIndexView } from "@/components/ad-library/model-page";
import { AD_BASE } from "@/lib/ad-library";

export const revalidate = 604800; // A week; the API refreshes it the moment ADs change (AD_CACHE_TAG in lib/ad-library.ts).

export const metadata: Metadata = {
  title: "Propeller Airworthiness Directives",
  description: "FAA propeller Airworthiness Directives by maker: Hartzell, McCauley, Sensenich, MT-Propeller and others, readable and free.",
  alternates: { canonical: `${AD_BASE}/propellers` },
};

export default function Page() {
  return <KindIndexView segment="propellers" />;
}
