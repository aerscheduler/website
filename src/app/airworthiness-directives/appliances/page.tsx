import type { Metadata } from "next";
import { KindIndexView } from "@/components/ad-library/model-page";
import { AD_BASE } from "@/lib/ad-library";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Equipment and Appliance Airworthiness Directives",
  description: "FAA Airworthiness Directives since 1995 written against equipment rather than an aircraft: magnetos, ELTs, seats, oxygen, avionics and more, by maker.",
  alternates: { canonical: `${AD_BASE}/appliances` },
};

export default function Page() {
  return <KindIndexView segment="appliances" />;
}
