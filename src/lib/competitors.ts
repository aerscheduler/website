import { PRICE_PER_AIRCRAFT } from "@/lib/site";

/**
 * Competitor comparison pages.
 *
 * These are paid landing pages before they are anything else. Somebody clicks an
 * ad while searching a competitor by name, so the offer and the CTA sit above the
 * fold, and the page shows the product working rather than describing it.
 *
 * Three rules, all of them learned the expensive way:
 *
 * 1. **Every third-column claim has to be defensible from that company's own
 *    public pages.** "Not published" means we could not confirm it, not that it is
 *    missing. Each entry records where its facts came from and when.
 * 2. **Do not argue on ground we are weakest.** Training is the newest module and
 *    no school is running it in anger yet, so it is off these pages entirely. It
 *    is compared on /features/training for anyone who goes looking. We neither
 *    claim it here nor concede it.
 * 3. **A page with no losing rows is not believed.** `notFit` is real, and on the
 *    free competitor it is very real.
 *
 * Adding one: add the entry here and it routes, renders, enters the sitemap and
 * the search index automatically. Nothing else to register.
 */

export type CompetitorSlug =
  | "flight-schedule-pro"
  | "flight-circle"
  | "schedule-pointe"
  | "flightlogger"
  | "talon-systems"
  | "airplane-manager"
  | "bookourplane";

/**
 * Which living demo runs on the page.
 *
 * Deliberately one per competitor rather than the dispatch board everywhere: the
 * demo should show whatever the page is arguing about. The billing loop belongs
 * on the page that says the flight closes itself out, the roster belongs on the
 * page about per-student pricing, and so on. `compare-page.tsx` maps these to the
 * components in `components/mocks/living`.
 */
export type CompetitorDemo =
  | "scheduling"
  | "billing"
  | "maintenance"
  | "people"
  | "reports"
  | "self-booking"
  | "memberships";

export type CompareRow = [topic: string, ours: string, theirs: string];

export type CompareProof = {
  title: string;
  body: string;
  href: string;
  label: string;
};

export type Competitor = {
  slug: CompetitorSlug;
  /** How the other product refers to itself. Used in headings and table columns. */
  name: string;
  /** Short label for nav, breadcrumbs and search results. */
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  ogDescription: string;
  /** Hero paragraph. Leads on the difference, never on their strengths. */
  intro: string;
  demo: CompetitorDemo;
  demoTitle: string;
  demoBody: string;
  reasons: string[];
  rows: CompareRow[];
  /** Trailing note under the table. Trademark line plus the "not published" caveat. */
  disclaimer: string;
  proofsTitle: string;
  proofs: CompareProof[];
  notFitTitle: string;
  notFit: string[];
};

const PRICE_ROW_OURS = `$${PRICE_PER_AIRCRAFT}/mo per aircraft. Unlimited users. Simulators and classrooms free.`;

/** Reused verbatim so one wording change cannot drift across seven pages. */
const disclaimerFor = (name: string) =>
  `${name} is a trademark of its owner. Rows describe what each product publishes; "not published" means we could not confirm it, not that it is absent.`;

/** Proof cards that are true on every page, drawn from what schools run daily. */
const PROOF_CLOSE_OUT: CompareProof = {
  title: "The flight closes itself out into an invoice",
  body: "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates already on the tail. No export, no second system, no evening spent reconciling the day's flying against the schedule.",
  href: "/features/billing",
  label: "Billing",
};

const PROOF_SIMS_FREE: CompareProof = {
  title: "Simulators and classrooms cost nothing",
  body: `They are first-class resources on the dispatch board, bookable like any tail, and they never appear on your bill. You pay $${PRICE_PER_AIRCRAFT} per aircraft and nothing else, however many people you invite.`,
  href: "/pricing",
  label: "Pricing",
};

const PROOF_SPLIT: CompareProof = {
  title: "One reservation can hold several people, and several invoices",
  body: "A ground-school class, two pilots sharing a cross-country, a checkride with an examiner. Split the cost per head, by logged time, or in shares you set, and everyone gets their own invoice.",
  href: "/resources/split-billing-shared-flights",
  label: "Split billing",
};

const PROOF_MULTI_DAY: CompareProof = {
  title: "The tail goes out on Friday and comes back Sunday",
  body: "Multi-day trips are one reservation across nights, with an overnight minimum you set per aircraft or school-wide, so a weekend rental does not need a manual invoice and a mental note.",
  href: "/resources/overnight-and-multi-day-rentals",
  label: "Multi-day rentals",
};

const PROOF_MAINTENANCE: CompareProof = {
  title: "An aircraft that is out of annual cannot be booked",
  body: "Inspections carry server-computed due dates against hours and calendar time. When one comes due the aircraft grounds itself on the board, so nobody dispatches a tail that should not fly.",
  href: "/features/maintenance",
  label: "Maintenance",
};

export const COMPETITORS: Record<CompetitorSlug, Competitor> = {
  /* ---------------------------------------------------------------- */
  /* Flight Schedule Pro                                               */
  /* Facts from flightschedulepro.com, checked 2026-08-18.             */
  /* ---------------------------------------------------------------- */
  "flight-schedule-pro": {
    slug: "flight-schedule-pro",
    name: "Flight Schedule Pro",
    navLabel: "vs Flight Schedule Pro",
    seoTitle: "AerScheduler vs Flight Schedule Pro",
    seoDescription: `Compare AerScheduler and Flight Schedule Pro for flight schools: self-serve setup, $${PRICE_PER_AIRCRAFT}/mo per aircraft with unlimited users, a native app, and flight close-out that drafts the invoice.`,
    ogDescription:
      "Self-serve vs demo-led. Per-aircraft pricing, unlimited users. Native app included.",
    intro: `Flight Schedule Pro is sold through a demo and quoted per school. AerScheduler publishes one price, $${PRICE_PER_AIRCRAFT} per aircraft with every user included, and you can sign up and dispatch the same day. Scheduling, billing and maintenance are one system rather than three that have to agree with each other.`,
    demo: "billing",
    demoTitle: "This is the part that usually lives in another system",
    demoBody:
      "The flight is closed out, the invoice is already drafted from the rates on the tail, and the balance is chased from the same screen. Have a click around.",
    reasons: [
      "You want to be running this week, without a sales call",
      `Predictable cost: $${PRICE_PER_AIRCRAFT} per aircraft, every user included`,
      "Your instructors will actually open the app on the ramp",
      "You want the schedule, the invoice and the maintenance record to be one system",
    ],
    rows: [
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Demo request",
      ],
      ["Pricing", PRICE_ROW_OURS, "Quoted per school"],
      [
        "Several people on one flight",
        "Built in. Split the cost per head, by logged time, or in set shares. One invoice each.",
        "Not published",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum per tail.",
        "Not published",
      ],
      [
        "Mobile",
        "Native iOS app. Book, dispatch and close out from the ramp.",
        "iOS app",
      ],
      [
        "Billing",
        "Ramp-in closes the flight and drafts the invoice. Stripe cards and ACH.",
        "Available",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
        "Available",
      ],
    ],
    disclaimer: `Flight Schedule Pro is a long-standing product and a trademark of its owner. Rows describe what each product publishes; "not published" means we could not confirm it, not that it is absent.`,
    proofsTitle: "What the difference looks like",
    proofs: [PROOF_CLOSE_OUT, PROOF_SIMS_FREE],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You already run a large deployment and moving it would cost more than it saves",
      "You want a guided enterprise rollout with a named account team",
      "You need a specific workflow or integration we do not cover yet",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Flight Circle                                                     */
  /* Facts from flightcircle.com, checked 2026-08-18.                  */
  /* ---------------------------------------------------------------- */
  "flight-circle": {
    slug: "flight-circle",
    name: "Flight Circle",
    navLabel: "vs Flight Circle",
    seoTitle: "AerScheduler vs Flight Circle",
    seoDescription: `Compare AerScheduler and Flight Circle for flight schools: self-serve setup, $${PRICE_PER_AIRCRAFT}/mo per aircraft with unlimited users, dispatch that closes out into an invoice, and a native app.`,
    ogDescription:
      "Self-serve setup, per-aircraft pricing, and the whole day in one system.",
    intro:
      "Both products run a flight school's schedule. What schools tell us decides it is the rest of the day: how quickly you can start, what it costs as you add aircraft, and whether dispatch, billing and maintenance live in one place or three.",
    demo: "scheduling",
    demoTitle: "The board your front desk will live on",
    demoBody:
      "Lanes for every aircraft, simulator and classroom, conflict-aware booking, and drag to reschedule. This is the real interface, not a screenshot.",
    reasons: [
      "You want to be dispatching this week, without a sales call",
      `Predictable cost: $${PRICE_PER_AIRCRAFT} per aircraft, every user included, sims and rooms free`,
      "The schedule, the invoice and the maintenance record should be one system",
      "Your instructors and renters will actually open the app on the ramp",
    ],
    rows: [
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Account setup with the vendor",
      ],
      ["Pricing", PRICE_ROW_OURS, "Quoted per school"],
      [
        "Dispatch board",
        "Lane views across aircraft, simulators and rooms, with conflict-aware booking and a live front-desk view.",
        "Scheduling calendar",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Available",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum set per tail.",
        "Not published",
      ],
      [
        "Maintenance",
        "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
        "Available",
      ],
      [
        "Mobile",
        "Native iOS app for the whole team. Book, dispatch and close out from the ramp.",
        "Mobile access",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
        "Available",
      ],
    ],
    disclaimer: disclaimerFor("Flight Circle"),
    proofsTitle: "What running the day looks like",
    proofs: [PROOF_CLOSE_OUT, PROOF_SPLIT, PROOF_SIMS_FREE, PROOF_MULTI_DAY],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You want ground-school courseware, video, reading and quizzes, inside the same tool. We do not build it, and link out to Sporty's, King or Gleim instead",
      "You already run a large deployment elsewhere and moving it would cost more than it saves",
      "You need a workflow or integration we do not cover yet",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Schedule Pointe                                                   */
  /* Facts from schedulepointe.com, checked 2026-08-18: serves flight  */
  /* schools, clubs and charter alongside medical practices, health    */
  /* clubs, CPA firms and salons; modules listed as Scheduling,        */
  /* Dispatch, Invoicing, Accounts Receivable, Curriculum and Advanced */
  /* Maintenance Tracking; no published pricing, a phone number and a  */
  /* custom demo; iOS and Android apps (SchedulePt, SchedulePointeGo). */
  /* ---------------------------------------------------------------- */
  "schedule-pointe": {
    slug: "schedule-pointe",
    name: "Schedule Pointe",
    navLabel: "vs Schedule Pointe",
    seoTitle: "AerScheduler vs Schedule Pointe",
    seoDescription: `Compare AerScheduler and Schedule Pointe for flight schools and clubs: one published price at $${PRICE_PER_AIRCRAFT}/mo per aircraft, self-serve signup, and software built only for aviation.`,
    ogDescription:
      "Built for aviation only, with a published price and no demo call.",
    intro: `Schedule Pointe sells scheduling into aviation alongside several other industries, and prices it through a custom demo. AerScheduler does one thing: it runs flight schools, clubs and rental operations. The price is on the website, $${PRICE_PER_AIRCRAFT} per aircraft with every user included, and you can be dispatching before anyone would have returned your call.`,
    demo: "maintenance",
    demoTitle: "Maintenance that stops a dispatch, not just a report",
    demoBody:
      "Squawks, inspections and due dates. When an aircraft comes due it grounds itself on the board. Try grounding one and watch the schedule react.",
    reasons: [
      "The price is published, so you can decide without booking a call",
      "Every screen was designed for a flight school, not adapted from another industry",
      "Self-serve signup, on the schedule the same day",
      "Maintenance, dispatch and invoicing are the same system, not three modules that have to agree",
    ],
    rows: [
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Custom demo, arranged by phone",
      ],
      ["Pricing", PRICE_ROW_OURS, "Not published. Quoted per operation"],
      [
        "Who it is built for",
        "Flight schools, flying clubs and aircraft rental operations. Aviation only.",
        "Aviation operations plus other industries served by the same platform",
      ],
      [
        "Dispatch board",
        "Lane views across aircraft, simulators and rooms, with conflict-aware booking and a live front-desk view.",
        "Scheduling and dispatch",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Invoicing and accounts receivable",
      ],
      [
        "Maintenance",
        "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
        "Advanced maintenance tracking",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum set per tail.",
        "Not published",
      ],
      [
        "Mobile",
        "Native iOS app for the whole team. Book, dispatch and close out from the ramp.",
        "iOS and Android apps",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
        "Not published",
      ],
    ],
    disclaimer: disclaimerFor("Schedule Pointe"),
    proofsTitle: "What running the day looks like",
    proofs: [PROOF_MAINTENANCE, PROOF_CLOSE_OUT, PROOF_SIMS_FREE, PROOF_SPLIT],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You run charter alongside training and need crew duty-time tracking, which we do not build",
      "You schedule something other than aircraft and want one vendor across all of it",
      "You need a workflow or integration we do not cover yet",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* FlightLogger                                                      */
  /* Facts from flightlogger.net/packages, checked 2026-08-18: the     */
  /* platform package includes unlimited aircraft, simulators, renters,*/
  /* instructors, crew and admin users, with variable "Active Student  */
  /* & Operations Flights Fees" on top, and pricing given by quote     */
  /* ("Only pay for what you train"). No dollar figures are published, */
  /* so none are quoted here.                                          */
  /* ---------------------------------------------------------------- */
  flightlogger: {
    slug: "flightlogger",
    name: "FlightLogger",
    navLabel: "vs FlightLogger",
    seoTitle: "AerScheduler vs FlightLogger",
    seoDescription: `Compare AerScheduler and FlightLogger: a flat $${PRICE_PER_AIRCRAFT}/mo per aircraft with unlimited users, versus pricing that varies with how many students you train and how much you fly.`,
    ogDescription:
      "A fixed per-aircraft price versus a bill that moves with your student count.",
    intro:
      "The difference shows up on the invoice. FlightLogger publishes a usage-based model, a platform fee plus fees tied to active students and operational flights, quoted per school. AerScheduler charges for aircraft and nothing else. Train twice as many students next year and your bill is identical.",
    demo: "people",
    demoTitle: "Add the whole school. The bill does not move.",
    demoBody:
      "Students, instructors, renters, dispatchers, technicians, office staff. Invite as many as you like, set what each role can do, and pay for aircraft only.",
    reasons: [
      "Your software cost stops depending on how busy you are",
      `One published number: $${PRICE_PER_AIRCRAFT} per aircraft per month`,
      "Every user is included, so nobody is left off the system to save money",
      "Self-serve signup, no quote and no discovery call",
    ],
    rows: [
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Custom quote based on training volume",
      ],
      [
        "Pricing",
        PRICE_ROW_OURS,
        "Platform package plus active-student and operational-flight fees",
      ],
      [
        "What moves your bill",
        "The number of aircraft. Nothing else.",
        "How many students are active and how much you fly",
      ],
      [
        "Users included",
        "Unlimited, on every plan.",
        "Unlimited renters, instructors, crew and admin users",
      ],
      [
        "Dispatch board",
        "Lane views across aircraft, simulators and rooms, with conflict-aware booking and a live front-desk view.",
        "Scheduling",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Available",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum set per tail.",
        "Not published",
      ],
      [
        "Maintenance",
        "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
        "Available",
      ],
      [
        "Mobile",
        "Native iOS app for the whole team. Book, dispatch and close out from the ramp.",
        "Available",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
        "Not published",
      ],
    ],
    disclaimer: disclaimerFor("FlightLogger"),
    proofsTitle: "What a fixed price actually buys you",
    proofs: [PROOF_SIMS_FREE, PROOF_CLOSE_OUT, PROOF_SPLIT, PROOF_MULTI_DAY],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You train under EASA rules and need reporting built around them. We are built for FAA Part 61 and Part 141 operations",
      "You run a multi-base academy and need a single deployment across several countries",
      "You need a workflow or integration we do not cover yet",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Talon Systems                                                     */
  /* Facts from talonsystems.com and talonsystems.com/taloneta,        */
  /* checked 2026-08-18: trading since 2001, product is TalonETA (not  */
  /* "DaVinci"), web-based training management for universities and    */
  /* flight schools with Embry-Riddle and Western Michigan named as    */
  /* customers, sold via "Request a Demo" with no published pricing,   */
  /* configurable per customer, sibling modules TalonRMS and           */
  /* TalonSMART.                                                       */
  /* ---------------------------------------------------------------- */
  "talon-systems": {
    slug: "talon-systems",
    name: "Talon Systems",
    navLabel: "vs Talon Systems",
    seoTitle: "AerScheduler vs Talon Systems (Talon ETA)",
    seoDescription: `Compare AerScheduler and Talon Systems ETA: a published price at $${PRICE_PER_AIRCRAFT}/mo per aircraft and same-day self-serve setup, versus an enterprise platform sold by demo and configured per organization.`,
    ogDescription:
      "Same-day setup and a published price, versus a configured enterprise rollout.",
    intro: `Talon Systems builds ETA for university aviation programs and large academies, sold through a demo and configured to the organization. That is a real fit for an operation with a procurement process. If you are an independent school or club with a handful of aircraft, AerScheduler is the other end of the market: $${PRICE_PER_AIRCRAFT} per aircraft, published, and running the same afternoon you sign up.`,
    demo: "reports",
    demoTitle: "The numbers, without asking anyone to build a report",
    demoBody:
      "Utilization, revenue, instructor activity, receivables. Filter it, save it, and click any figure to open the report behind it.",
    reasons: [
      "You want to evaluate the software by using it, not by sitting through a demo",
      "The price is published and does not depend on a negotiation",
      "There is no implementation project. You add a tail and book a flight",
      `A school with six aircraft pays $${PRICE_PER_AIRCRAFT * 6} a month, all users included`,
    ],
    rows: [
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Request a demo",
      ],
      ["Pricing", PRICE_ROW_OURS, "Not published. Quoted per organization"],
      [
        "Typical customer",
        "Independent flight schools, flying clubs and rental operations.",
        "Universities and flight training organizations, including named university programs",
      ],
      [
        "Setup",
        "You configure it yourself in an afternoon.",
        "Configured to the organization's requirements",
      ],
      [
        "Dispatch board",
        "Lane views across aircraft, simulators and rooms, with conflict-aware booking and a live front-desk view.",
        "Scheduling and flight operations",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Billing and invoicing",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum set per tail.",
        "Not published",
      ],
      [
        "Maintenance",
        "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
        "Available as a separate module",
      ],
      [
        "Mobile",
        "Native iOS app for the whole team. Book, dispatch and close out from the ramp.",
        "Not published",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
        "Not published",
      ],
    ],
    disclaimer: disclaimerFor("Talon Systems"),
    proofsTitle: "What you get without an implementation project",
    proofs: [PROOF_CLOSE_OUT, PROOF_MAINTENANCE, PROOF_SIMS_FREE, PROOF_SPLIT],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You are a university program with a procurement process and need a vendor who will answer an RFP",
      "You need a formal safety management system alongside your training records",
      "You run hundreds of aircraft across multiple campuses and need a configured deployment",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Airplane Manager                                                  */
  /* Positioning from airplanemanager.com as summarised in its own     */
  /* public listings, checked 2026-08-18: web-based flight scheduling  */
  /* "crafted exclusively for corporate jets" since 2009, connecting   */
  /* pilots, passengers, owners and executive assistants, sold on      */
  /* month-to-month plans priced by aircraft count.                    */
  /*                                                                   */
  /* NOTE: airplanemanager.com returned HTTP 403 to our fetch, so this */
  /* entry is built only from claims the company publishes about       */
  /* itself elsewhere. Everything uncertain says "not published".      */
  /* Re-verify before making any new claim here.                       */
  /* ---------------------------------------------------------------- */
  "airplane-manager": {
    slug: "airplane-manager",
    name: "Airplane Manager",
    navLabel: "vs Airplane Manager",
    seoTitle: "AerScheduler vs Airplane Manager",
    seoDescription: `Airplane Manager is built for corporate flight departments. AerScheduler is built for flight schools, clubs and rental operations, at $${PRICE_PER_AIRCRAFT}/mo per aircraft with students, instructors and renters included.`,
    ogDescription:
      "Corporate jet scheduling versus software for a flight school or club.",
    intro:
      "These two products serve different operations. Airplane Manager describes itself as scheduling crafted for corporate jets, connecting pilots, passengers, owners and assistants. If that is your operation, it is aimed squarely at you. AerScheduler is for the other kind of flight line: students and renters who book themselves, instructors with availability, aircraft billed by the hour, and an invoice at the end of every flight.",
    demo: "self-booking",
    demoTitle: "Students and renters book themselves",
    demoBody:
      "The rules are yours: who is approved on which aircraft, how far ahead they can book, whether an instructor is required. The desk stops being a switchboard.",
    reasons: [
      "Your schedule is driven by students and renters, not by trip requests",
      "Instructors need availability, pairing and their own rates",
      "Aircraft are billed by Hobbs or tach, and every flight ends in an invoice",
      `$${PRICE_PER_AIRCRAFT} per aircraft with every student, instructor and renter included`,
    ],
    rows: [
      [
        "Who it is built for",
        "Flight schools, flying clubs and aircraft rental operations.",
        "Corporate flight departments and private jet operations",
      ],
      ["Pricing", PRICE_ROW_OURS, "Monthly plans by aircraft count"],
      [
        "The people on the system",
        "Students, instructors, renters, dispatchers, technicians and office staff, each with their own permissions.",
        "Pilots, passengers, owners and schedulers",
      ],
      [
        "Self-booking",
        "Approved students and renters book their own aircraft and instructor within rules you set.",
        "Not published",
      ],
      [
        "Instructors",
        "Weekly availability, student pairing, and dual and ground rates that flow into the invoice.",
        "Not published",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Not published",
      ],
      [
        "Billing the renter",
        "Stripe cards and ACH, account balances, and dues for club members.",
        "Not published",
      ],
      [
        "Maintenance",
        "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
        "Not published",
      ],
      [
        "Mobile",
        "Native iOS app for the whole team. Book, dispatch and close out from the ramp.",
        "Mobile access",
      ],
    ],
    disclaimer: `Airplane Manager is a trademark of its owner and is built for a different kind of operation, which is the point of this page rather than a criticism. Rows describe what each product publishes; "not published" means we could not confirm it, not that it is absent.`,
    proofsTitle: "What a training operation needs that a jet schedule does not",
    proofs: [PROOF_CLOSE_OUT, PROOF_SPLIT, PROOF_MAINTENANCE, PROOF_SIMS_FREE],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You run a corporate flight department and need passenger manifests, catering and trip requests. Airplane Manager is built for that and we are not",
      "You need crew duty-time tracking for Part 135 charter",
      "Your aircraft are not billed by the hour to the person flying them",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* BookOurPlane                                                      */
  /* Facts from bookourplane.com/features and /about, checked          */
  /* 2026-08-18: free since 2004, unlimited members, aircraft and      */
  /* bookings, six member roles, instructor availability, club and     */
  /* aircraft messaging, file archive, member directory, maintenance   */
  /* scheduling, iCalendar, METAR/TAF, mobile-friendly web. Their own  */
  /* site states invoicing and payments are NOT included and lists     */
  /* payments and logbooks as possible future paid options.            */
  /* ---------------------------------------------------------------- */
  bookourplane: {
    slug: "bookourplane",
    name: "BookOurPlane",
    navLabel: "vs BookOurPlane",
    seoTitle: "AerScheduler vs BookOurPlane",
    seoDescription: `BookOurPlane is a free aircraft booking calendar for flying clubs. AerScheduler adds the money and the maintenance: invoicing, dues, inspection due dates and a native app, at $${PRICE_PER_AIRCRAFT}/mo per aircraft.`,
    ogDescription:
      "Free booking calendar versus running the money and the maintenance too.",
    intro:
      "Let us be straight about this one. BookOurPlane has been giving flying clubs a free booking calendar since 2004, and if a shared calendar is genuinely all your club needs, free is the right price and you should keep using it. The reason clubs move is everything that happens after the booking: billing the flight, collecting monthly dues, and knowing an aircraft is not overdue an inspection before somebody takes it.",
    demo: "memberships",
    demoTitle: "The part a booking calendar leaves to a spreadsheet",
    demoBody:
      "Membership tiers, joining fees and monthly dues billed automatically, with prorated first periods and a record of every period billed, waived or owed.",
    reasons: [
      "Your treasurer is chasing dues and flight time in a spreadsheet",
      "You want the flight billed from Hobbs the moment it is closed out, not typed up later",
      "Somebody needs to know the annual is due in eleven hours, before the aircraft is booked",
      "Members would rather open an app than a mobile website",
    ],
    rows: [
      ["Price", PRICE_ROW_OURS, "Free"],
      [
        "Booking",
        "Lane views across aircraft, simulators and rooms, with conflict-aware booking.",
        "Aircraft booking with member roles and instructor availability",
      ],
      [
        "Invoicing the flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts itself from the rates on the tail.",
        "Not included. Their site lists payments as a possible future option",
      ],
      [
        "Member dues",
        "Membership tiers, joining fees and recurring dues, billed automatically with prorated first periods.",
        "Not included",
      ],
      [
        "Taking payment",
        "Stripe cards and ACH, account balances and auto-refill.",
        "Not included",
      ],
      [
        "Maintenance",
        "Squawks, inspections with server-computed due dates, and grounding that blocks the board.",
        "Maintenance scheduling",
      ],
      [
        "Several people on one flight",
        "Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum set per tail.",
        "Not published",
      ],
      [
        "Mobile",
        "Native iOS app for the whole club.",
        "Mobile-friendly website",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar, QuickBooks Online, plus a public REST API.",
        "iCalendar feed",
      ],
    ],
    disclaimer: `BookOurPlane is a trademark of its owner and has served flying clubs for over twenty years at no charge. Rows describe what each product publishes, including what BookOurPlane itself states is not included; "not published" means we could not confirm it, not that it is absent.`,
    proofsTitle: "What you get for the twenty dollars",
    proofs: [PROOF_CLOSE_OUT, PROOF_MAINTENANCE, PROOF_SPLIT, PROOF_MULTI_DAY],
    notFitTitle: "When you should stay on BookOurPlane",
    notFit: [
      "Your club shares one or two aircraft, settles up informally, and a calendar is genuinely all you need. Free is hard to argue with",
      "Nobody is billing by the hour, so there is no invoice to draft",
      "Your maintenance is tracked on paper by one member who knows every aircraft, and that works",
    ],
  },
};

export const COMPETITOR_LIST: Competitor[] = Object.values(COMPETITORS);

export const competitorHref = (slug: CompetitorSlug) => `/compare/${slug}`;

export const getCompetitor = (slug: string): Competitor | undefined =>
  COMPETITORS[slug as CompetitorSlug];

/**
 * The other comparison pages, for the footer cross-links.
 *
 * Someone comparing one product is usually comparing three, so the page that
 * failed to convert should hand them the next one rather than the home page.
 */
export const otherCompetitors = (slug: CompetitorSlug, limit = 3): Competitor[] =>
  COMPETITOR_LIST.filter((c) => c.slug !== slug).slice(0, limit);

/**
 * Per-page FAQs, which do two jobs.
 *
 * They answer the question somebody actually typed (most competitor searches are
 * really "what does it cost" and "can I switch without a sales call"), and they
 * emit FAQPage structured data, which is how these pages earn extra surface in the
 * results. The existing comparison pages are already the best-ranking pages on the
 * site, so the marginal SEO here is worth more than anywhere else.
 *
 * `Record<CompetitorSlug, ...>` on purpose: a new competitor will not compile until
 * it has FAQs, rather than quietly shipping a page without them.
 *
 * Same evidence rule as the comparison rows. Where a competitor does not publish a
 * price, the answer says so rather than guessing at one.
 */
export const COMPETITOR_FAQS: Record<
  CompetitorSlug,
  { q: string; a: string }[]
> = {
  "flight-schedule-pro": [
    {
      q: "How much does AerScheduler cost compared to Flight Schedule Pro?",
      a: `AerScheduler is $${PRICE_PER_AIRCRAFT} per aircraft per month with every user included, and simulators and classrooms are free. Flight Schedule Pro is quoted per school and does not publish a price, so there is no public figure to compare against.`,
    },
    {
      q: "Can I switch from Flight Schedule Pro without a sales call?",
      a: "Yes. Signup is self-serve, the trial is 14 days, and no credit card is required. You can add an aircraft and put a flight on the board the same afternoon.",
    },
    {
      q: "Does AerScheduler have a mobile app?",
      a: "Yes, a native iOS app for the whole team. Instructors, students and renters can book, and dispatchers can ramp a flight in and out from the ramp itself.",
    },
    {
      q: "Can several people be billed for one flight?",
      a: "Yes. Split the cost per head, by logged time, or in shares you set, and each person gets their own invoice. Useful for ground school, shared cross-countries and checkrides.",
    },
  ],
  "flight-circle": [
    {
      q: "How is AerScheduler different from Flight Circle?",
      a: "Both run a flight school's schedule. The differences schools tell us about are how quickly you can start, what it costs as you add aircraft, and whether dispatch, billing and maintenance are one system or three.",
    },
    {
      q: `What does AerScheduler cost?`,
      a: `$${PRICE_PER_AIRCRAFT} per aircraft per month. Every user is included, and simulators and classrooms never appear on the bill.`,
    },
    {
      q: "Can I try it before talking to anyone?",
      a: "Yes. There is a live demo you can open with no signup, and a 14-day trial that needs no credit card and no sales call.",
    },
    {
      q: "Does it handle multi-day and overnight rentals?",
      a: "Yes. A trip that spans nights is one reservation, with an overnight minimum you set per aircraft or school-wide, so a weekend rental does not need a manual invoice afterwards.",
    },
  ],
  "schedule-pointe": [
    {
      q: "How much does Schedule Pointe cost?",
      a: `Schedule Pointe does not publish pricing and asks you to arrange a custom demo. AerScheduler publishes one number: $${PRICE_PER_AIRCRAFT} per aircraft per month, every user included.`,
    },
    {
      q: "Is AerScheduler built only for aviation?",
      a: "Yes. Flight schools, flying clubs and aircraft rental operations, and nothing else. Schedule Pointe sells scheduling into aviation alongside several other industries from the same platform.",
    },
    {
      q: "Does AerScheduler track inspection due dates?",
      a: "Yes. Inspections carry server-computed due dates against both hours and calendar time, and an aircraft that comes due grounds itself on the dispatch board so nobody can book it.",
    },
    {
      q: "Can I sign up without booking a demo?",
      a: "Yes. Signup is self-serve and takes minutes. There is also a live demo you can open with no account at all.",
    },
  ],
  flightlogger: [
    {
      q: "Does AerScheduler charge per student?",
      a: `No. AerScheduler charges $${PRICE_PER_AIRCRAFT} per aircraft per month and nothing else. Students, instructors, renters, dispatchers and office staff are all included at no extra cost.`,
    },
    {
      q: "How much does FlightLogger cost?",
      a: "FlightLogger publishes a usage-based model rather than a price: a platform package plus active-student and operational-flight fees, quoted per school. No dollar figures are published, so none are quoted here.",
    },
    {
      q: "What happens to my bill if the school grows?",
      a: "Nothing, unless you add aircraft. Doubling your student intake does not change what you pay, which is the main practical difference between the two pricing models.",
    },
    {
      q: "Is AerScheduler built for FAA or EASA training?",
      a: "FAA. AerScheduler is built for Part 61 and Part 141 operations in the United States. If you train under EASA rules and need reporting built around them, FlightLogger is likely the better fit.",
    },
  ],
  "talon-systems": [
    {
      q: "What is Talon ETA?",
      a: "ETA is Talon Systems' web-based training management system for universities and flight training organizations, covering scheduling, records, billing and compliance. It is sold through a demo and configured to the organization.",
    },
    {
      q: "Is AerScheduler a good fit for a small flight school?",
      a: `Yes, that is who it is built for. Independent schools, flying clubs and rental operations. A school with six aircraft pays $${PRICE_PER_AIRCRAFT * 6} a month with every user included.`,
    },
    {
      q: "How long does setup take?",
      a: "An afternoon. There is no implementation project and no configuration engagement: you add your aircraft, invite your people and book a flight.",
    },
    {
      q: "How much does Talon Systems cost?",
      a: "Talon Systems does not publish pricing. Every call to action on their site is a demo request, so the figure is quoted per organization.",
    },
  ],
  "airplane-manager": [
    {
      q: "Is Airplane Manager built for flight schools?",
      a: "Airplane Manager describes itself as flight scheduling crafted for corporate jets, connecting pilots, passengers, owners and assistants. It is aimed at corporate flight departments rather than training operations.",
    },
    {
      q: "Can students and renters book their own aircraft?",
      a: "In AerScheduler, yes. Approved students and renters book their own aircraft and instructor within rules you set: who is approved on which tail, how far ahead they can book, and whether an instructor is required.",
    },
    {
      q: "Does AerScheduler bill by Hobbs or tach time?",
      a: "Either. Ramp in with Hobbs, tach and fuel and the invoice drafts from the rates already on the aircraft, so the flight is billed before the aircraft is tied down.",
    },
    {
      q: "What does AerScheduler cost?",
      a: `$${PRICE_PER_AIRCRAFT} per aircraft per month, with every student, instructor, renter and staff member included. Simulators and classrooms are free.`,
    },
  ],
  bookourplane: [
    {
      q: "Is BookOurPlane really free?",
      a: "Yes. BookOurPlane has offered free booking to flying clubs since 2004. Their own site states that payments, statistics and logbooks are features that might be offered for a fee in future, and are not included today.",
    },
    {
      q: "Why would a club pay for AerScheduler instead?",
      a: "For everything after the booking: invoicing the flight from Hobbs, collecting monthly dues automatically, and knowing an aircraft is not overdue an inspection before somebody takes it. If a shared calendar is all your club needs, free is the right price.",
    },
    {
      q: "Can AerScheduler bill monthly club dues?",
      a: "Yes. Membership tiers, joining fees and recurring dues bill automatically, with prorated first periods for mid-month joiners and a record of every period billed, waived or owed.",
    },
    {
      q: "What does AerScheduler cost for a flying club?",
      a: `$${PRICE_PER_AIRCRAFT} per aircraft per month with unlimited members. A club with three aircraft pays $${PRICE_PER_AIRCRAFT * 3} a month however many people are on the roster.`,
    },
  ],
};
