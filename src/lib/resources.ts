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
