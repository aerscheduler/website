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
    href: "/resources/quickbooks-integration",
    label: "QuickBooks Online",
    description: "Paid invoices sync as Sales Receipts.",
  },
];
