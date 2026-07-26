import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturePage } from "@/components/feature-page";
import {
  FEATURE_LIST,
  getFeature,
  type FeatureSlug,
} from "@/lib/features";

type Props = { params: Promise<{ slug: string }> };

const FEATURE_SEO: Record<
  FeatureSlug,
  { title: string; description: string }
> = {
  scheduling: {
    title: "Flight School Scheduling & Dispatch Software",
    description:
      "Lane-board aircraft scheduling with conflict detection, ramp-in close-out, and dispatch tools built for flight schools.",
  },
  "self-booking": {
    title: "Student Self-Booking for Flight Schools",
    description:
      "Let students and renters book aircraft and instructors online while your school keeps control of rules and availability.",
  },
  fleet: {
    title: "Aircraft Fleet Management Software",
    description:
      "Manage aircraft, simulators, and classrooms with rates, grounding, and schedule-aware fleet status.",
  },
  "people-roles": {
    title: "Flight School Staff & Student Management",
    description:
      "Roles, invites, and roster tools for owners, instructors, students, renters, and dispatchers.",
  },
  compliance: {
    title: "Pilot Currency & Go/No-Go Compliance",
    description:
      "Block bookings when aircraft or members are not current. Medical, BFR, and grounding checks on the board.",
  },
  instruction: {
    title: "Flight Instruction Rates & Ratings",
    description:
      "Configure ratings, dual rates, and instructor availability for private, instrument, and commercial training.",
  },
  billing: {
    title: "Flight School Billing & Invoicing Software",
    description:
      "Turn closed-out flights into invoices, take cards online with Stripe, and keep accounts receivable current.",
  },
  maintenance: {
    title: "Aircraft Maintenance Squawk Tracking",
    description:
      "Log squawks, ground aircraft on the schedule, and track airworthiness reminders for your fleet.",
  },
  mobile: {
    title: "Flight School iOS App",
    description:
      "The native AerScheduler app for booking, invoices, documents, and squawks. The same operation as the web desk.",
  },
  reports: {
    title: "Flight School Reports & Analytics",
    description:
      "Flight hours, instruction, collections, and maintenance insights across your fleet and school.",
  },
  integrations: {
    title: "Flight School Software Integrations",
    description:
      "Stripe and Google Calendar available now. QuickBooks Online on the roadmap. Integrations on every plan.",
  },
};

export function generateStaticParams() {
  return FEATURE_LIST.filter((f) => f.slug !== "integrations").map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeature(slug);
  if (!feature) return {};
  const seo = FEATURE_SEO[feature.slug];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: `/features/${feature.slug}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `/features/${feature.slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug === "integrations") notFound();
  const feature = getFeature(slug);
  if (!feature) notFound();
  return <FeaturePage feature={feature} />;
}
