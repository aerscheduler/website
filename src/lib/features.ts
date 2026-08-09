
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
      "Day and week boards for every aircraft, sim, and classroom: conflict-aware booking, ramp-in close-out, and a live view for the front desk.",
    bullets: [
      "Lane views across aircraft, simulators, and rooms",
      "Dual, solo, shared, rental, ground, sim, and maintenance reservations",
      "Several people on one booking — a ground school class, or two pilots sharing a flight",
      "Multi-day trips: out Friday, back Sunday, one reservation, and the tail is gone in between",
      "Standby and timed slot offers when a canceled booking opens up again",
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
      "Standby preferences and slot offers when a matching time opens",
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
    //Was "Training", which now belongs to the feature that actually is training. This one is
    //rates, ratings and who may teach whom; two cards both labelled Training sitting next to
    //each other in "Related features" told a visitor nothing.
    eyebrow: "Rates & ratings",
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
      "Hour requirements tracked apart from lessons — one night cross-country credits four at once",
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
    headline: "Ramp-in drafts the invoice. Cards on file close the loop.",
    summary:
      "Close out a flight and the line items write themselves. Collect with saved cards. No separate billing tool taped onto the schedule.",
    bullets: [
      "Split a booking between everyone on it — each person gets their own invoice",
      "Charge a class per head, divide a shared aircraft, or bill each pilot for the hours they flew",
      "An overnight minimum so a weekend away bills for the nights, not just the Hobbs",
      "Auto-drafted itemized invoices from Hobbs/tach close-out",
      "AR dashboard: outstanding, paid, and void",
      "Custom invoices when the flight isn’t the whole story",
      "Saved cards and autopay for members",
      "Aircraft and instruction rates flow into the same invoice",
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
      "Set up your tiers once — full, associate, social — and every member is billed on schedule. Joining fees, monthly or annual dues, and a part-month for anyone who joins mid-cycle.",
    bullets: [
      "A plan per tier: full, associate, family, social — priced how your club actually prices",
      "One-time joining fee and recurring dues, together or on their own",
      "Monthly, quarterly or annual — bill everyone on the same day, or each member on their own anniversary",
      "Join on the 20th and pay for the days you get, not a whole month",
      "Dues invoices raise themselves overnight, or wait for you to press the button",
      "Pause a member for the winter and the meter stops — no arrears when they come back",
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
    title: "Reports & Dashboards",
    navLabel: "Reports",
    eyebrow: "Insights",
    headline: "Every report you need, and a dashboard you build yourself.",
    summary:
      "Revenue, utilization, instructor activity, squawks, currency — filter any report the way you think about it, save it, export it, schedule it by email, and pin it to a dashboard where every number opens the report behind it.",
    bullets: [
      "Reports across financial, operations, fleet, people, and compliance",
      "Filter, group, and re-order any report, then save the view for next month",
      "Build your own dashboard: drag, resize, and give each tile its own date range",
      "Click any figure to open the report that produced it — same numbers, always",
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
    title: "Train",
    items: ["training", "instruction"],
  },
  {
    // Compliance sits here rather than under Train: currency and medicals gate a BOOKING,
    // which is a front-desk concern, where a syllabus gates a certificate.
    title: "Run the school",
    items: ["people-roles", "compliance"],
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
