export type FeatureSlug =
  | "scheduling"
  | "self-booking"
  | "fleet"
  | "people-roles"
  | "compliance"
  | "instruction"
  | "billing"
  | "maintenance"
  | "mobile"
  | "reports"
  | "integrations";

export type Feature = {
  slug: FeatureSlug;
  title: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  bullets: string[];
  personas: string[];
  related: FeatureSlug[];
};

export type FeatureGroup = {
  title: string;
  items: FeatureSlug[];
};

export const FEATURES: Record<FeatureSlug, Feature> = {
  scheduling: {
    slug: "scheduling",
    title: "Scheduling & Dispatch",
    navLabel: "Scheduling & Dispatch",
    eyebrow: "Schedule",
    headline: "A dispatch board that feels like the ramp.",
    summary:
      "Day and week boards for every aircraft, sim, and classroom: conflict-aware booking, ramp-in close-out, and a live view for the front desk.",
    bullets: [
      "Lane views across aircraft, simulators, and rooms",
      "Dual, solo, rental, ground, sim, and maintenance reservations",
      "Ramp-out to ramp-in with Hobbs, tach, and fuel, then an invoice draft",
      "Conflict-aware create and edit so double-books don’t leave the desk",
      "Live refresh so the iPad on the counter stays current",
    ],
    personas: ["Owners", "Admins", "Dispatchers", "Instructors"],
    related: ["self-booking", "fleet", "billing", "mobile"],
  },
  "self-booking": {
    slug: "self-booking",
    title: "Self-Booking",
    navLabel: "Self-Booking",
    eyebrow: "Students & renters",
    headline: "Students and renters book themselves without calling the desk.",
    summary:
      "Approved members pick an aircraft, an instructor when needed, and a time that works. The same flow on web and in the native app.",
    bullets: [
      "Role-aware booking for students, renters, and instructors",
      "Aircraft + instructor pairing with availability-aware times",
      "Personal upcoming schedule for every member",
      "Checkout gating so only approved people fly each tail",
      "Book from the phone on the way to the airport",
    ],
    personas: ["Students", "Renters", "Instructors"],
    related: ["scheduling", "people-roles", "fleet", "mobile"],
  },
  fleet: {
    slug: "fleet",
    title: "Fleet & Facilities",
    navLabel: "Fleet & Facilities",
    eyebrow: "Resources",
    headline: "Every tail, sim, and classroom, with rates that feed billing.",
    summary:
      "Aircraft with wet/dry rates and Hobbs/tach, simulators and rooms as first-class resources, and grounding that actually blocks the board.",
    bullets: [
      "Aircraft CRUD with wet/dry rates and bill-by-Hobbs",
      "Simulators and classrooms included, free on your SaaS bill",
      "Ground / return-to-service with a reason, live on the schedule",
      "Approve renters and students per aircraft",
      "Multi-location home bases when you operate more than one field",
    ],
    personas: ["Owners", "Admins", "Technicians"],
    related: ["scheduling", "maintenance", "billing", "compliance"],
  },
  "people-roles": {
    slug: "people-roles",
    title: "People & Roles",
    navLabel: "People & Roles",
    eyebrow: "Roster",
    headline: "One roster for the whole operation.",
    summary:
      "Owners, dispatchers, CFIs, students, renters, and techs invited with the right roles, joinable by code, manageable without a spreadsheet.",
    bullets: [
      "Seven roles: owner, admin, dispatcher, instructor, student, renter, technician",
      "Invite by email with roles attached, or share a join code",
      "Join requests for private orgs; filter the roster by role",
      "Ground a member when they shouldn’t fly",
      "Multi-org switch for people who fly at more than one school",
    ],
    personas: ["Owners", "Admins", "Everyone on the roster"],
    related: ["instruction", "compliance", "self-booking", "billing"],
  },
  compliance: {
    slug: "compliance",
    title: "Go / No-Go",
    navLabel: "Go / No-Go",
    eyebrow: "Compliance",
    headline: "Who and what can’t fly today, at a glance.",
    summary:
      "Medicals, BFRs, checkouts, documents, and grounded assets on one board so dispatch doesn’t release a flight that shouldn’t go.",
    bullets: [
      "Org Go/No-Go board: grounded aircraft and grounded members",
      "Currency types (medical, BFR, checkout, and custom) with renewals",
      "Member document vault with expiry awareness",
      "Personal currencies for students, renters, and instructors",
      "A safety wall before the flight leaves the ramp",
    ],
    personas: ["Owners", "Admins", "Dispatchers", "Instructors", "Students"],
    related: ["fleet", "people-roles", "scheduling", "maintenance"],
  },
  instruction: {
    slug: "instruction",
    title: "Instruction",
    navLabel: "Instruction",
    eyebrow: "Training",
    headline: "Ratings, rates, availability, and CFI↔student pairing.",
    summary:
      "Define instruction types and hourly rates, assign instructors and students, and let availability drive what shows as bookable.",
    bullets: [
      "Organization instruction types with default instructor rates",
      "Assign and unassign instructors and students",
      "Instructor weekly availability that booking respects",
      "Dual, ground, and solo reservations wired to ratings",
      "Onboarding paths for flight schools and solo CFIs",
    ],
    personas: ["Owners", "Admins", "Instructors", "Students"],
    related: ["scheduling", "people-roles", "billing", "self-booking"],
  },
  billing: {
    slug: "billing",
    title: "Billing & Payments",
    navLabel: "Billing & Payments",
    eyebrow: "Money",
    headline: "Ramp-in drafts the invoice. Cards on file close the loop.",
    summary:
      "Close out a flight and the line items write themselves. Collect with saved cards. No separate billing tool taped onto the schedule.",
    bullets: [
      "Auto-drafted itemized invoices from Hobbs/tach close-out",
      "AR dashboard: outstanding, paid, and void",
      "Custom invoices when the flight isn’t the whole story",
      "Saved cards and autopay for members",
      "Aircraft and instruction rates flow into the same invoice",
    ],
    personas: ["Owners", "Admins", "Students", "Renters", "Instructors"],
    related: ["scheduling", "fleet", "instruction", "integrations"],
  },
  maintenance: {
    slug: "maintenance",
    title: "Maintenance & Squawks",
    navLabel: "Maintenance & Squawks",
    eyebrow: "Airworthiness",
    headline: "Squawks next to the schedule. Ground the tail when it matters.",
    summary:
      "Log issues at the aircraft, triage them with the tech, and keep grounded airplanes off the bookable board.",
    bullets: [
      "Log, triage, and resolve squawks, optionally grounding the aircraft",
      "Hour- and date-based maintenance reminders",
      "Open vs resolved views for techs and dispatch",
      "Grounded status visible across scheduling",
      "Log issues from the native app on the ramp",
    ],
    personas: ["Technicians", "Admins", "Dispatchers"],
    related: ["fleet", "scheduling", "compliance", "reports"],
  },
  mobile: {
    slug: "mobile",
    title: "Mobile App",
    navLabel: "Mobile App",
    eyebrow: "iOS",
    headline: "Built for the ramp, not a shrunk-down desktop.",
    summary:
      "A native iOS app for booking, invoices, documents, and squawks. The same operation as the web desk, in your pocket.",
    bullets: [
      "A real native app, not a mobile website",
      "Book and manage lessons from anywhere",
      "Pay invoices and keep documents current",
      "Log squawks and check the day on the go",
      "Same org data as app.aerscheduler.com",
    ],
    personas: ["Students", "Renters", "Instructors", "Everyone"],
    related: ["self-booking", "scheduling", "billing", "maintenance"],
  },
  reports: {
    slug: "reports",
    title: "Reports & Insights",
    navLabel: "Reports",
    eyebrow: "Insights",
    headline: "How the school is flying: hours, instruction, and open work.",
    summary:
      "KPIs for flight time, instruction, payments, members, and unresolved squawks, so owners aren’t guessing from the calendar.",
    bullets: [
      "Flight time and instruction given / received",
      "Scheduled vs completed activity",
      "Pending vs processed payments",
      "Active members and open squawks",
      "Date ranges for ops and finance reviews",
    ],
    personas: ["Owners", "Admins", "Dispatchers"],
    related: ["billing", "scheduling", "maintenance", "people-roles"],
  },
  integrations: {
    slug: "integrations",
    title: "Integrations",
    navLabel: "Integrations",
    eyebrow: "Connect",
    headline: "Connect the tools your school already uses.",
    summary:
      "Stripe payments, Google Calendar sync, and QuickBooks Online run today — shipped to every plan, not locked behind enterprise.",
    bullets: [
      "Stripe for invoices, cards, and school collections (available now)",
      "Google Calendar sync (available now)",
      "QuickBooks Online — paid invoices as Sales Receipts (available now)",
      "Request other tools; roadmap follows real school demand",
      "No premium tier for integrations",
    ],
    personas: ["Owners", "Admins"],
    related: ["billing", "scheduling", "reports"],
  },
};

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Schedule",
    items: ["scheduling", "self-booking", "fleet"],
  },
  {
    title: "Run the school",
    items: ["people-roles", "compliance", "instruction"],
  },
  {
    title: "Money & MX",
    items: ["billing", "maintenance"],
  },
  {
    title: "Everywhere",
    items: ["mobile", "reports", "integrations"],
  },
];

export const FEATURE_LIST = Object.values(FEATURES);

/** Feature detail pages live under /features/[slug], except integrations. */
export function featureHref(slug: FeatureSlug): string {
  if (slug === "integrations") return "/integrations";
  return `/features/${slug}`;
}

export function getFeature(slug: string): Feature | undefined {
  return FEATURES[slug as FeatureSlug];
}
