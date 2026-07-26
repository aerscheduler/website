import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  PRICE_PER_AIRCRAFT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SUPPORT_EMAIL,
  TRIAL_DAYS,
} from "@/lib/site";

/** Primary nav destinations Google should treat as sitelink candidates. */
export const PRIMARY_NAV = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "App", href: "/app" },
  { name: "Integrations", href: "/integrations" },
  { name: "Resources", href: "/resources" },
] as const;

export type BreadcrumbItem = { name: string; href: string };

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/brand/logo-blue.png"),
    email: SUPPORT_EMAIL,
    description: SITE_DESCRIPTION,
    sameAs: [APP_STORE_URL, PLAY_STORE_URL],
    contactPoint: {
      "@type": "ContactPoint",
      email: SUPPORT_EMAIL,
      contactType: "customer support",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
    offers: {
      "@type": "Offer",
      price: String(PRICE_PER_AIRCRAFT),
      priceCurrency: "USD",
      description: "Per aircraft, per month",
    },
    slogan: SITE_TAGLINE,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function siteNavigationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PRIMARY_NAV.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export const PRICING_FAQS = [
  {
    q: "When does billing start?",
    a: `After your ${TRIAL_DAYS}-day trial. We'll remind you before it ends. No card is required to start.`,
  },
  {
    q: "Do simulators count toward the bill?",
    a: "No. Only aircraft are billed. Simulators and ground-school rooms are free.",
  },
  {
    q: "What if I add or remove an aircraft mid-month?",
    a: "Quantity is prorated. Your subscription follows the size of your flying fleet.",
  },
  {
    q: "Is there a per-user fee?",
    a: "No. Instructors, students, renters, and dispatchers are unlimited.",
  },
  {
    q: "Are the mobile apps included?",
    a: "Yes. Native iOS and Android apps are included with every plan. Same price, no mobile surcharge.",
  },
  {
    q: "What about Google Calendar or QuickBooks?",
    a: "Google Calendar sync is available today, along with Stripe payments. QuickBooks is coming soon. See the Integrations page for status.",
  },
];

export const MYFBO_MIGRATION_FAQS = [
  {
    q: "Is MyFBO really shutting down?",
    a: "Yes. August 2026. Download your .bak backup while your account is still active so your history isn't stranded on a server that goes dark.",
  },
  {
    q: "Do I need a demo to start AerScheduler?",
    a: "No. Create an account, pick your persona (school, club, FBO, or solo instructor), and follow the in-app setup. You can be booking in minutes.",
  },
  {
    q: "Can you import my MyFBO .bak automatically?",
    a: "Not yet as a one-click importer. Back up the file regardless, then recreate fleet and people in AerScheduler (or send exports to support).",
  },
  {
    q: "How much does AerScheduler cost?",
    a: `$${PRICE_PER_AIRCRAFT} per aircraft per month after a ${TRIAL_DAYS}-day free trial. Simulators and rooms are free. Unlimited users.`,
  },
];
