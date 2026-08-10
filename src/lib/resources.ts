
// developers.ts imports only the ResourceLink *type* back from here, which is
// erased at compile time, so this pair is not a runtime cycle.
import { DEVELOPER_LINKS } from "@/lib/developers";
import { DOC_LINKS } from "@/lib/docs";

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

/**
 * Full catalog. Feeds `RESOURCE_LINKS` (feature pages, docs cross-links) and
 * remains the source of truth for what exists. The mega-menu and footer use the
 * curated subsets below so they stay short; everything else lives on
 * `/resources`.
 */
export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    // Product documentation sits at the head of the menu because it answers a
    // different question from everything below it. The guides underneath are
    // written for someone deciding whether to buy; these are for someone who
    // already did and is stuck. That reader is the one who otherwise emails
    // support, so they should not have to scroll past the sales material.
    title: "Documentation",
    items: DOC_LINKS,
  },
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
      {
        href: "/resources/flying-club-dues-and-fees",
        label: "Flying club dues & fees",
        description: "Joining fees, monthly dues, tiers, and the cases that make collecting them a chore.",
      },
    ],
  },
  {
    title: "Training",
    items: [
      {
        href: "/resources/flight-training-records",
        label: "Flight training records",
        description: "Versioned syllabi, hours against lessons, and endorsements that hold up.",
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
        href: "/compare/flight-circle",
        label: "vs Flight Circle",
        description: "Training records: lessons ticked off, or hours that answer the checkride question.",
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

function linksByHref(...hrefs: string[]): ResourceLink[] {
  return hrefs.map((href) => {
    const link = RESOURCE_LINKS.find((item) => item.href === href);
    if (!link) {
      throw new Error(`Unknown resource href in nav/footer curation: ${href}`);
    }
    return link;
  });
}

/**
 * Mega-menu (and mobile Resources accordion). Four short columns, one row: the
 * full catalog above was wrapping Documentation + Reporting into a second band
 * and leaving empty space beside Training's single link. Topic guides, reporting
 * deep-dives, and extra doc sections stay on `/resources`.
 */
export const NAV_RESOURCE_GROUPS: ResourceGroup[] = [
  {
    title: "Documentation",
    items: linksByHref(
      "/docs",
      "/docs/getting-started",
      "/docs/scheduling",
      "/docs/billing"
    ),
  },
  {
    title: "Guides",
    items: linksByHref(
      "/resources/myfbo-alternative",
      "/resources/flight-school-scheduling-software",
      "/resources/quickbooks-integration",
      "/migrating/my-fbo"
    ),
  },
  {
    title: "Compare",
    items: linksByHref(
      "/compare/flight-schedule-pro",
      "/compare/flight-circle",
      "/pricing"
    ),
  },
  {
    title: "Developers",
    items: DEVELOPER_LINKS,
  },
];

/**
 * Footer Resources column. Hub + a few high-intent pages; the rest of the
 * catalog is one click away on `/resources`. The hub itself is not in
 * RESOURCE_GROUPS (the index isn't a guide), so it is hand-built here.
 */
export const FOOTER_RESOURCE_LINKS: ResourceLink[] = [
  {
    href: "/resources",
    label: "All resources",
    description: "Guides, comparisons, migrations, and documentation.",
  },
  ...linksByHref(
    "/resources/myfbo-alternative",
    "/migrating/my-fbo",
    "/compare/flight-schedule-pro",
    "/compare/flight-circle"
  ),
];
