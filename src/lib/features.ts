
export type FeatureSlug =
  | "scheduling"
  | "self-booking"
  | "fleet"
  | "people-roles"
  | "compliance"
  | "instruction"
  | "training"
  | "billing"
  | "memberships"
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
  /**
   * Guide pages that explain one corner of this feature in depth.
   *
   * Hrefs only, resolved against `RESOURCE_LINKS` when the page renders, so the label and
   * description live in exactly one place and a guide renamed in `lib/resources.ts` cannot
   * leave a stale title on a feature page. An href that no longer resolves is dropped rather
   * than rendered blank, so deleting a guide degrades to silence.
   *
   * Worth having because the two newest billing behaviours (splitting a booking between
   * people, and charging for a night away) are the kind of thing an operator only believes
   * once they have seen a worked example, and a bullet has no room for one.
   */
  guides?: string[];
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
      "Day and week boards for every aircraft, sim, and classroom, with conflict-aware booking, ramp-in close-out, and a live view for the front desk.",
    bullets: [
      "Lane views across aircraft, simulators, and rooms",
      "Dual, solo, shared, rental, ground, sim, and maintenance reservations",
      "Several people on one booking, whether a ground school class or two pilots sharing a flight",
      "Multi-day trips. Out Friday, back Sunday, one reservation, and the tail is gone in between",
      "Optional cancel locks, late-cancel fees, and caps on upcoming bookings",
      "Standby and timed offers for cancels, plus optional AI fill of matching idle aircraft time",
      "Ramp-out to ramp-in with Hobbs, tach, and fuel, then an invoice draft",
      "Conflict-aware create and edit so double-books don’t leave the desk",
      "Live refresh so the iPad on the counter stays current",
    ],
    personas: ["Owners", "Admins", "Dispatchers", "Instructors"],
    related: ["self-booking", "fleet", "billing", "mobile"],
    guides: ["/resources/overnight-and-multi-day-rentals"],
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
      "School rules that cap how far ahead and how many bookings a member can hold",
      "Standby preferences, cancel recovery offers, and optional AI offers for idle matching time",
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
      "An overnight minimum per tail, or none at all, on top of the school-wide figure",
      "Multi-location home bases when you operate more than one field",
    ],
    personas: ["Owners", "Admins", "Technicians"],
    related: ["scheduling", "maintenance", "billing", "compliance"],
    guides: ["/resources/overnight-and-multi-day-rentals"],
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
    title: "Compliance",
    navLabel: "Compliance",
    eyebrow: "Safety",
    headline: "Who and what can’t fly today, at a glance.",
    summary:
      "Medicals, BFRs, checkouts, documents, and grounded assets on one board so dispatch doesn’t release a flight that shouldn’t go.",
    bullets: [
      "Org compliance board for grounded aircraft and grounded members",
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
    // Was "Training", which now belongs to the feature that actually is training.
    // This page is the commercial/ops half: rates, who may teach whom, and the
    // weekly availability that booking respects — not the syllabus or grades.
    eyebrow: "Rates & pairing",
    headline: "Who can teach whom, at what rate, and when they’re free.",
    summary:
      "Instruction types set the dual and ground rates on every invoice. Pairing decides which CFI a student can book with. Weekly availability is what the desk and self-booking actually offer. The syllabus and lesson grades live under Training.",
    bullets: [
      "Instruction types with default dual and ground rates",
      "Per-instructor rate overrides when a CFI bills differently",
      "Assign students to instructors — booking only offers valid pairs",
      "Weekly availability that self-booking and the desk both respect",
      "Dual, ground, and solo reservations priced from the same rates",
      "Clear split from Training: rates & pairing here, syllabus & records there",
    ],
    personas: ["Owners", "Admins", "Instructors", "Students"],
    related: ["training", "scheduling", "people-roles", "billing"],
  },
  training: {
    slug: "training",
    title: "Training Records & Syllabi",
    navLabel: "Training & Syllabi",
    eyebrow: "Part 61 & 141",
    headline: "The syllabus, the hours, and the endorsements in one record.",
    summary:
      "Build or import a syllabus, enroll a student against a version of it, grade lessons off the flights you already booked, and sign the endorsements. Part 61 and Part 141.",
    bullets: [
      "Four syllabi to start from: Private, Instrument, Commercial, and CFI",
      "Stages, lessons, graded tasks, and your own grading scale",
      "A published version is immutable, so revising it never moves a student's goalposts",
      "Hour requirements tracked apart from lessons. One night cross-country credits four at once",
      "Endorsements from AC 61-65K, with expiry on the 90-day solo",
      "A signed lesson is frozen; a correction supersedes it and the original stays readable",
      "Pace and silence per student, so somebody who has stopped flying surfaces",
      "Grade at the aircraft with no signal; it syncs when there is",
      "Charge a course fee at enrollment, billed through the invoices you already run",
    ],
    personas: ["Owners", "Chief instructors", "Instructors", "Students"],
    related: ["instruction", "people-roles", "compliance", "mobile"],
    guides: ["/resources/flight-training-records"],
  },
  billing: {
    slug: "billing",
    title: "Billing & Payments",
    navLabel: "Billing & Payments",
    eyebrow: "Money",
    headline: "Close-out posts the bill. Cards on file close the loop.",
    summary:
      "Close out a flight and the line items write themselves. Bill each visit with a Stripe invoice, or put members on an account ledger with Add funds, auto-refill, and late fees. No separate billing tool taped onto the schedule.",
    bullets: [
      "Invoice each booking, or Account ledger for a running member balance",
      "Split a booking between everyone on it. Each person gets their own invoice or ledger charge",
      "Charge a class per head, divide a shared aircraft, or bill each pilot for the hours they flew",
      "An overnight minimum so a weekend away bills for the nights, not just the Hobbs",
      "Auto-drafted itemized bills from Hobbs/tach close-out",
      "Auto-refill, late fees, statements, and book/dispatch balance gates on the ledger",
      "AR dashboard: outstanding invoices, or who owes on Accounts",
      "Custom invoices when the flight isn't the whole story",
      "Saved cards, autopay, and card top-ups for members",
      "Aircraft and instruction rates flow into the same bill",
    ],
    personas: ["Owners", "Admins", "Students", "Renters", "Instructors"],
    related: ["scheduling", "fleet", "instruction", "integrations"],
    guides: [
      "/resources/split-billing-shared-flights",
      "/resources/overnight-and-multi-day-rentals",
      "/resources/flying-club-dues-and-fees",
      "/resources/quickbooks-integration",
    ],
  },
  memberships: {
    slug: "memberships",
    title: "Club Memberships & Dues",
    navLabel: "Memberships & Dues",
    eyebrow: "Money",
    headline: "Dues collect themselves. Nobody chases the 1st of the month.",
    summary:
      "Set up your tiers once (full, associate, social) and every member is billed on schedule. Joining fees, monthly or annual dues, and a part-month for anyone who joins mid-cycle.",
    bullets: [
      "A plan per tier (full, associate, family, social), priced how your club actually prices",
      "One-time joining fee and recurring dues, together or on their own",
      "Monthly, quarterly or annual. Bill everyone on the same day, or each member on their own anniversary",
      "Join on the 20th and pay for the days you get, not a whole month",
      "Dues invoices raise themselves overnight, or wait for you to press the button",
      "Pause a member for the winter and the meter stops. No arrears when they come back",
      "Every period is on the record: billed, waived, or still owed",
      "Dues land in the same invoice list, the same reports, and the same QuickBooks sync as everything else",
    ],
    personas: ["Flying clubs", "FBOs", "Owners", "Admins", "Members"],
    related: ["billing", "people-roles", "reports", "integrations"],
    guides: ["/resources/flying-club-dues-and-fees", "/resources/split-billing-shared-flights"],
  },
  maintenance: {
    slug: "maintenance",
    title: "Maintenance & Squawks",
    navLabel: "Maintenance & Squawks",
    eyebrow: "Airworthiness",
    headline: "Squawks next to the schedule. Inspections that ground when they lapse.",
    summary:
      "Track AVIATES inspections and squawks on each tail, triage with the tech, and keep grounded airplanes off the bookable board.",
    bullets: [
      "Log, triage, and resolve squawks, optionally grounding the aircraft",
      "AVIATES inspections — annual, 100-hour, ELT, and the rest — on hour and date intervals",
      "Sign off overdue items and return the aircraft to service",
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
      "A native iOS app with a real Home — next booking, open squawks, unpaid invoices, and AVIATES inspections — the same operation as the web desk.",
    bullets: [
      "A real native app, not a mobile website",
      "Home shows what's next: flights, maintenance, squawks, and dues",
      "Book and manage lessons from anywhere",
      "Pay invoices and keep documents current",
      "Log squawks and check inspections on the go",
    ],
    personas: ["Students", "Renters", "Instructors", "Everyone"],
    related: ["self-booking", "scheduling", "billing", "maintenance"],
  },
  reports: {
    slug: "reports",
    title: "Reports & Dashboards",
    navLabel: "Reports",
    eyebrow: "Insights",
    headline: "Every report you need, and a dashboard you build yourself.",
    summary:
      "Revenue, utilization, instructor activity, squawks, currency. Filter any report the way you think about it, save it, export it, schedule it by email, and pin it to a dashboard where every number opens the report behind it.",
    bullets: [
      "Reports across financial, operations, fleet, people, and compliance",
      "Filter, group, and re-order any report, then save the view for next month",
      "Build your own dashboard. Drag, resize, and give each tile its own date range",
      "Click any figure to open the report that produced it. Same numbers, always",
      "Export any report to CSV",
      "Financial reports stay owner-and-admin only; dispatchers see operations",
      "Email any saved view to your team daily, weekly, or monthly",
    ],
    personas: ["Owners", "Admins", "Dispatchers", "Technicians"],
    related: ["billing", "scheduling", "maintenance", "people-roles"],
    guides: [
      "/resources/flight-school-reports",
      "/resources/aircraft-utilization-report",
      "/resources/flight-school-revenue-reporting",
    ],
  },
  integrations: {
    slug: "integrations",
    title: "Integrations",
    navLabel: "Integrations",
    eyebrow: "Connect",
    headline: "Connect the tools your school already uses.",
    summary:
      "Stripe payments, Google Calendar sync, Apple Calendar, Outlook, and QuickBooks Online run today. Shipped to every plan, not locked behind enterprise.",
    bullets: [
      "Stripe for invoices, cards, and school collections (available now)",
      "Google Calendar sync, into whichever calendar you pick (available now)",
      "Apple Calendar via private ICS subscription (available now)",
      "Outlook via the same private ICS subscription (available now)",
      "QuickBooks Online: paid invoices as Sales Receipts (available now)",
      "No premium tier for integrations",
    ],
    personas: ["Owners", "Admins"],
    related: ["billing", "scheduling", "reports"],
  },
};

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    // People and compliance sit with Schedule: currencies and roles gate a
    // booking, which is a front-desk concern (a syllabus gates a certificate).
    title: "Schedule",
    items: ["scheduling", "self-booking", "fleet", "people-roles", "compliance"],
  },
  {
    title: "Train",
    items: ["training", "instruction"],
  },
  {
    title: "Money & MX",
    items: ["billing", "memberships", "maintenance"],
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
