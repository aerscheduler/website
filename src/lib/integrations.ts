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
    label: "Apple Calendar & Outlook",
    description: "Subscribe with a private ICS link from your profile.",
  },
  {
    href: "/resources/quickbooks-integration",
    label: "QuickBooks Online",
    description: "Paid invoices sync as Sales Receipts.",
  },
  {
    href: "/integrations",
    label: "SMS alerts",
    description: "Transactional US texts for the same categories as email and push.",
  },
];
