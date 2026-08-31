
// developers.ts imports only the ResourceLink *type* back from here, which is
// erased at compile time, so this pair is not a runtime cycle.
import { COMPETITOR_LIST, competitorHref } from "@/lib/competitors";
import { DEVELOPER_LINKS } from "@/lib/developers";
import { DOC_LINKS, POPULAR_DOC_LINKS } from "@/lib/docs";

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
    // Individual help articles, as opposed to the section landings above.
    // They are here so the nav can point at a page that ANSWERS something
    // rather than at another index, and so those pages pick up a site-wide
    // internal link instead of sitting two clicks below the docs hub.
    title: "Help articles",
    items: POPULAR_DOC_LINKS,
  },
  {
    title: "Guides",
    items: [
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
        label: "MyFBO alternative & migration",
        description: "MyFBO has shut down. What the move involved, start to finish.",
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
    // Airworthiness sits on its own rather than under Guides because the three pages answer
    // three different people: an owner deciding what to buy, a mechanic checking a due date,
    // and whoever has to hand records to an inspector. The pillar is the AD page and the other
    // two link back to it, so the internal linking points somewhere rather than in a ring.
    title: "Airworthiness",
    items: [
      {
        href: "/resources/airworthiness-directive-tracking",
        label: "Airworthiness Directive tracking",
        description:
          "Applicability, compliance and enforcement are three jobs. Which ones a scheduling system can actually do.",
      },
      {
        href: "/resources/calendar-months-and-inspection-due-dates",
        label: "Calendar months and due dates",
        description:
          "An annual signed on 15 February is good through 28 February the following year, not 365 days later.",
      },
      {
        href: "/resources/aircraft-maintenance-records",
        label: "Aircraft maintenance records",
        description:
          "The two lists in 14 CFR 91.417, what transfers at sale, and why a tracking system is not a logbook.",
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
    // Generated from `lib/competitors.ts` rather than listed by hand. These pages
    // are where paid traffic lands, so a new one being absent from the nav and the
    // resources index is the difference between it existing and it being found.
    //
    // The old hand-written Flight Circle blurb led on training records, which is
    // the one argument that page deliberately does not make any more.
    title: "Compare",
    items: [
      ...COMPETITOR_LIST.map((competitor) => ({
        href: competitorHref(competitor.slug),
        label: competitor.navLabel,
        description: competitor.ogDescription,
      })),
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
 * Mega-menu (and mobile Resources accordion). Four columns, one row.
 *
 * The previous curation was picked for tidiness rather than for value, and it
 * showed: a Documentation column of four INDEX pages (the hub, then three
 * section landings, none of which answers anything), and a Guides column whose
 * best entry was a QuickBooks how-to. The pages this site actually ranks with,
 * the airworthiness cluster and the reporting pillar, were not in the menu at
 * all, and the API sat under Features where no developer looks for it.
 *
 * What each column is now FOR:
 *
 *   Guides          the five pillar pages, which own informational search and
 *                   are the strongest thing to hand somebody still reading
 *   Help articles   real documentation that answers a question, not an index
 *   Switching       the pages paid traffic lands on, plus the published price
 *   Developers      moved here from Features, next to the rest of the reading
 *
 * Every entry is a link a site-wide menu spends internal-link equity on, so the
 * bar is "would I send a prospect this", not "does this exist". The rest of the
 * catalog stays one click away on `/resources`.
 */
export const NAV_RESOURCE_GROUPS: ResourceGroup[] = [
  {
    title: "Guides",
    items: linksByHref(
      "/resources/flight-school-scheduling-software",
      "/resources/flight-school-reports",
      "/resources/flight-training-records",
      "/resources/airworthiness-directive-tracking",
      "/resources/split-billing-shared-flights"
    ),
  },
  {
    title: "Help articles",
    items: POPULAR_DOC_LINKS,
  },
  {
    // MyFBO came out of the nav on 2026-08-31: that platform has shut down and
    // the migration is finished, so a permanent seat in the chrome was spending
    // a site-wide internal link on a campaign that is over. The page itself is
    // still live and still in the sitemap for anyone searching the name.
    title: "Switching",
    items: linksByHref(
      "/compare/flight-schedule-pro",
      "/compare/flight-circle",
      "/compare/talon-systems",
      "/compare/schedule-pointe",
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
    description: "Guides, comparisons, and documentation.",
  },
  ...linksByHref(
    "/compare/flight-schedule-pro",
    "/compare/flight-circle",
    "/resources/flight-school-scheduling-software"
  ),
];
