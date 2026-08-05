
// developers.ts imports only the ResourceLink *type* back from here, which is
// erased at compile time, so this pair is not a runtime cycle.
import { DEVELOPER_LINKS } from "@/lib/developers";

/** Resource / guide links for nav, footer, and resources index. */
export type ResourceLink = {
  href: string;
  label: string;
  description: string;
};

export type ResourceGroup = {
  title: string;
  items: ResourceLink[];
};

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    title: "Guides",
    items: [
      {
        href: "/resources/myfbo-alternative",
        label: "MyFBO alternative",
        description: "What to look for when MyFBO shuts down.",
      },
      {
        href: "/resources/flight-school-scheduling-software",
        label: "Scheduling software",
        description: "What modern flight school software should include.",
      },
      {
        href: "/resources/quickbooks-integration",
        label: "QuickBooks integration",
        description: "Paid invoices sync to QuickBooks Online as Sales Receipts.",
      },
      {
        href: "/migrating/my-fbo",
        label: "Migrating from MyFBO",
        description: "Self-serve playbook: backup, setup, cut over.",
      },
    ],
  },
  {
    title: "Billing",
    items: [
      {
        href: "/resources/split-billing-shared-flights",
        label: "Split billing & shared flights",
        description: "One booking, one invoice per person, and why a shared flight isn't a solo.",
      },
      {
        href: "/resources/overnight-and-multi-day-rentals",
        label: "Overnight & multi-day rentals",
        description: "Trips that span nights, and a minimum charge for every night away.",
      },
    ],
  },
  {
    // The pillar page sits first and the two topic guides link back to it, so
    // the internal linking points somewhere rather than in a ring.
    title: "Reporting",
    items: [
      {
        href: "/resources/flight-school-reports",
        label: "Flight school reports",
        description: "The reports worth having, and what each one answers.",
      },
      {
        href: "/resources/aircraft-utilization-report",
        label: "Aircraft utilization",
        description: "Booked vs flown vs billed, and what the gaps cost.",
      },
      {
        href: "/resources/flight-school-revenue-reporting",
        label: "Revenue reporting",
        description: "Revenue by aircraft, instructor, customer, and lesson type.",
      },
    ],
  },
  {
    // Sits in Resources as well as Features: somebody hunting for the API will
    // try one or the other, and there's no cost to being findable from both.
    // Defined in lib/developers.ts so the two menus can't drift apart.
    title: "Developers",
    items: DEVELOPER_LINKS,
  },
  {
    title: "Compare",
    items: [
      {
        href: "/compare/flight-schedule-pro",
        label: "vs Flight Schedule Pro",
        description: "Self-serve, pricing, and mobile side-by-side.",
      },
      {
        href: "/pricing",
        label: "Pricing",
        description: "$20/mo per aircraft. Sims and rooms free.",
      },
      {
        href: "/product",
        label: "Product overview",
        description: "How AerScheduler runs desk, ramp, and mobile.",
      },
    ],
  },
];

export const RESOURCE_LINKS: ResourceLink[] = RESOURCE_GROUPS.flatMap(
  (group) => group.items
);
