/** Integration links for nav mega-menu. */
export type IntegrationLink = {
  href: string;
  label: string;
  description: string;
};

export const INTEGRATION_LINKS: IntegrationLink[] = [
  {
    href: "/integrations",
    label: "Stripe",
    description: "Cards on file, invoices, and online payments.",
  },
  {
    href: "/integrations",
    label: "Google Calendar",
    description: "Push lessons and reservations to personal calendars.",
  },
  {
    href: "/integrations",
    label: "Apple Calendar",
    description: "Subscribe with a private ICS link from your profile.",
  },
  {
    href: "/integrations",
    label: "Outlook",
    description: "Add the same private ICS link to Outlook calendar.",
  },
  {
    href: "/resources/quickbooks-integration",
    label: "QuickBooks Online",
    description: "Paid invoices sync as Sales Receipts.",
  },
  {
    href: "/integrations",
    label: "FAA Aircraft Registry",
    description: "Type a tail number and make, model, and year fill in.",
  },
  {
    href: "/integrations",
    label: "Aviation Weather",
    description: "Current METAR and sunset on upcoming flights.",
  },
];
