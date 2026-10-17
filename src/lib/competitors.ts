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
 * One row of the side-by-side. The optional fourth value is a group heading; the
 * page starts a new group whenever it changes, so rows of a group sit together.
 */
export type CompareRow = [topic: string, ours: string, theirs: string, group?: string];

/** The home page sections a comparison page can re-angle (see `angles`). */
export type CompareSectionId = "scheduling" | "billing" | "maintenance" | "work-orders" | "reporting";

/**
 * A comparison page's take on one of the shared feature sections. Every field is
 * optional; whatever is left out keeps the home page's wording. `title` takes a
 * "\n" for its line break. `note` is one sentence set against the other product,
 * and has to meet rule 1 like any table row.
 */
export type SectionAngle = {
  title?: string;
  body?: string;
  note?: string;
};

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
  /**
   * The H1. Names the visitor's intent ("a modern alternative to X") rather than
   * opening with a table, because somebody who typed a competitor's name has
   * already decided they want software and is now deciding whether to move.
   * The "AerScheduler vs X" phrasing survives as the eyebrow above it and in the
   * title tag, so the comparison query is not given up to win the alternative one.
   */
  heroHeadline: string;
  /**
   * Hero paragraph. Sells the outcome and takes the switching risk off the table.
   * The objection on these pages is never "is this different", it is "is this
   * worth the disruption", so this paragraph has to answer the second one.
   */
  intro: string;
  /**
   * The hero's paragraph, when the page has its own. Without one the page uses a
   * plain description of the product.
   */
  heroSubhead?: string;
  /**
   * What the other product sells, one line each, for the back panel of the hero's
   * price card (Flight Schedule Pro's hubs, say). The price itself is always the
   * "Pricing" row's third column, so the hero and the table cannot disagree.
   */
  priceLines?: (string | [label: string, note: string])[];
  /**
   * Which picture the hero shows. "price" (the default) is the live price card;
   * use it only where our price wins. "app" sets our app against what the other
   * product publishes about its phone experience (`phoneLines`).
   */
  heroVisual?: "price" | "app";
  phoneLines?: [label: string, value: string][];
  /** The "app" picture's panel title and tag. Default "{name} on a phone", no tag. */
  phoneTitle?: string;
  phoneTag?: string;
  /** Per-section copy for the shared feature sections. */
  angles?: Partial<Record<CompareSectionId, SectionAngle>>;
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

/**
 * Realtime is genuinely deployed (POST /realtime/ticket authenticates in prod, and
 * the server publishes on the schedule, notifications and billing channels), so
 * this is a claim we can make. Written as the consequence rather than the
 * mechanism: nobody buys software because it uses WebSockets.
 */
const PROOF_REALTIME: CompareProof = {
  title: "The whole school sees the same schedule, immediately",
  body: "A booking change reaches every browser and phone in the school as it happens, so the front desk, the instructor walking to the ramp and the student at home are never looking at three different versions of today.",
  href: "/features/scheduling",
  label: "Scheduling & Dispatch",
};


/**
 * The switching offer, shared by every comparison page.
 *
 * This is the single biggest lever on these pages: the objection is not "is
 * AerScheduler different", it is "is moving worth the disruption". Nothing here
 * is a product feature, and the wording is careful about that.
 *
 * What each line is standing on, so nobody has to re-derive it:
 *
 * - **Moving data is a PERSON, not an importer.** There is no import pipeline in
 *   the codebase and the copy must never imply one. Confirmed with Tony on
 *   2026-08-19: no code for it, but the team will do it by hand when a school
 *   asks. Written as "a person", deliberately, so nobody arrives expecting a
 *   one-click migration from a competitor's export.
 * - **Onboarding help is offered, never required.** Self-serve signup is the
 *   whole advantage over the demo-led incumbents, so help is framed as available
 *   rather than as a gate. "Never as a condition of signing up" earns its place.
 * - **Running in parallel** needs nothing from us: two systems, no integration.
 * - **CSV export** is real. The report engine serialises to CSV for ordinary
 *   users (`server/src/routes/reports/engine.routes.ts`). Note it says reports,
 *   not "all your data", because the public API is Enterprise-only.
 *
 * `{name}` is substituted with the competitor's own name by `compare-page.tsx`.
 */
export const SWITCH_OFFER = {
  title: "Moving from {name}",
  items: [
    {
      title: "A person moves your data, not an importer",
      body: "Export what you can out of {name} and we get it into AerScheduler with you. Odd formats and missing fields become a conversation rather than a dead end, because a human is doing it.",
    },
    {
      title: "We set the school up with you",
      body: "Aircraft, rates, instructors, permissions and booking rules, configured with the team that builds the product. On a call if you want one, and never as a condition of signing up.",
    },
    {
      title: "Keep both running until you are ready",
      body: "Nothing forces a cutover date. Run {name} alongside AerScheduler and stop using it when the front desk stops opening it, which is usually the moment you know.",
    },
    {
      title: "Nothing to sign, nothing locked in",
      body: "14 days free, and nothing is charged if you cancel before they end. Every report exports to CSV, so the answer to \"what if we change our mind\" is a download rather than a support ticket.",
    },
  ],
};

export const COMPETITORS: Record<CompetitorSlug, Competitor> = {
  /* ---------------------------------------------------------------- */
  /* Flight Schedule Pro                                               */
  /* Facts from flightschedulepro.com, checked 2026-08-18, rechecked   */
  /* 2026-10-16 page by page:                                          */
  /* - /plans-and-pricing: a Scheduling Hub with Billing, Training,    */
  /*   Maintenance and Reporting Hubs added, or a Suite; "simple per   */
  /*   aircraft pricing" by custom quote, no figure.                   */
  /* - /ios-app: "iPhone or iPad"; offline grading, self-dispatch.     */
  /*   A Google Play search returns no app of theirs.                  */
  /* - /maintenance-hub: work orders with clock-in and clock-out,      */
  /*   serialized parts inventory with low-stock alerts, logbook       */
  /*   entries from the work, recurring reminders. No word of outside  */
  /*   owners, owner approvals or ADs.                                 */
  /* - /automated-billing: their own merchant account, QuickBooks      */
  /*   Online sync, minimum balance before dispatch, packages.         */
  /* - /in-app-api-access: a custom API, "case-by-case".               */
  /* The AD row describes the AD library (server adLibrary.service.ts, */
  /* built 2026-10-16); Tony asked for it to be written as shipped.    */
  /* ---------------------------------------------------------------- */
  "flight-schedule-pro": {
    slug: "flight-schedule-pro",
    name: "Flight Schedule Pro",
    navLabel: "vs Flight Schedule Pro",
    seoTitle: "AerScheduler vs Flight Schedule Pro",
    seoDescription: `Compare AerScheduler and Flight Schedule Pro: $${PRICE_PER_AIRCRAFT} per aircraft a month with every module and user included, iOS and Android apps, work orders on customers' aircraft, and self-serve setup with no demo call.`,
    ogDescription:
      "A published price instead of a quote, every module in one plan, iOS and Android apps, and work orders on customers' aircraft.",
    heroHeadline: "The Flight Schedule Pro alternative with every module included",
    heroSubhead: `Flight Schedule Pro sells scheduling, billing, training, maintenance and reporting as separate hubs, priced by quote. AerScheduler puts all of it in one plan at $${PRICE_PER_AIRCRAFT} per aircraft a month, with iOS and Android apps and every user included, and you can start today.`,
    priceLines: ["Scheduling Hub", "Billing Hub", "Training Hub", "Maintenance Hub", "Reporting Hub"],
    intro: "Flight Schedule Pro works, and your school has years of history inside it. That is exactly why moving feels like a project, and it is the part we take off you: we move your data with you, set the school up with you, and you keep Flight Schedule Pro running until your staff stop reaching for it. What is on the other side is one system for the schedule, the invoice and the maintenance record, and a price you can read on this page.",
    angles: {
      scheduling: {
        note: "Its app is for iPhone and iPad. AerScheduler's runs on iOS and Android, so the renter with an Android phone books from the app too.",
      },
      billing: {
        title: "Billing\nin every plan",
        note: "Billing is Flight Schedule Pro's Billing Hub, added to a plan. Here it is part of the price, with an invoice each when several people share a flight.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
        note: "Flight Schedule Pro sells maintenance as its Maintenance Hub and does not publish AD tracking. Here inspections, squawks and ADs come with every plan.",
      },
      "work-orders": {
        note: "Flight Schedule Pro's Maintenance Hub runs work orders with mechanic time clocks. It does not publish owner approvals or billing an aircraft's owner.",
      },
      reporting: {
        title: "Reporting\non the same plan",
        note: "Both email reports on a schedule. Here every report is part of the price, where Flight Schedule Pro sells a Reporting Hub.",
      },
    },
    reasons: [
      "You want to start this week, without a demo call",
      "You want the price on the page, not a quote",
      "Your front desk wants a board that updates on every screen the moment a booking moves",
      "Your renters and instructors carry Android phones as well as iPhones",
    ],
    rows: [
      ["Pricing", PRICE_ROW_OURS, "Per aircraft, by custom quote. No price published.", "Buying it"],
      [
        "What the price covers",
        "Scheduling, billing, maintenance, work orders and reporting, in every plan.",
        "A Scheduling Hub, with Billing, Training, Maintenance and Reporting Hubs added one by one or as a Suite.",
        "Buying it",
      ],
      [
        "Getting started",
        "Sign up and put the first flight on the board the same day. No call needed.",
        "Request a demo, or ask for pricing.",
        "Buying it",
      ],
      [
        "Booking",
        "Only the times when the aircraft, instructor and student are all free are offered, checked for currency and checkouts, and live on every screen.",
        "Drag-and-drop scheduling, and Intelligent Scheduling in beta.",
        "Running the day",
      ],
      [
        "Mobile apps",
        "iOS and Android, for students, renters, instructors and mechanics.",
        "iOS app for iPhone and iPad.",
        "Running the day",
      ],
      [
        "Live schedule",
        "Every screen in the school updates the moment a booking changes.",
        "Not published",
        "Running the day",
      ],
      [
        "Close-out",
        "Ramp-in drafts the invoice from the meters and the rates on the tail. Card, ACH or account balance.",
        "Automated billing through their own merchant account.",
        "Running the day",
      ],
      [
        "Inspections",
        "Tach, Hobbs and calendar-month countdowns. An overdue inspection grounds the aircraft.",
        "Recurring maintenance reminders.",
        "Maintenance",
      ],
      [
        "Airworthiness directives",
        "Every AD since 1995 naming the airframe, engine or propeller, listed for a person to decide, with alerts for new ones.",
        "Not published",
        "Maintenance",
      ],
      [
        "Work orders",
        "On your own fleet and on customers' aircraft.",
        "Work orders with mechanic clock-in and clock-out.",
        "Maintenance",
      ],
      [
        "Owner approval and billing",
        "The owner approves, declines or puts off each finding online, then pays the job's invoice by card or ACH.",
        "Not published",
        "Maintenance",
      ],
      [
        "Parts",
        "Parts on each job at cost plus your markup, labor at your shop rate.",
        "Serialized parts inventory with low-stock alerts, and logbook entries written from the work.",
        "Maintenance",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar and QuickBooks Online.",
        "QuickBooks Online and an integrations marketplace.",
        "Connecting",
      ],
      [
        "API",
        "A documented public REST API on the Enterprise plan.",
        "A custom API, enabled case by case.",
        "Connecting",
      ],
    ],
    disclaimer: `Flight Schedule Pro is a long-standing product and a trademark of its owner. Rows describe what each product publishes; "not published" means we could not confirm it, not that it is absent.`,
    proofsTitle: "Also in every plan",
    proofs: [PROOF_SIMS_FREE, PROOF_SPLIT, PROOF_MULTI_DAY],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You already run a large deployment and moving it would cost more than it saves",
      "You want a guided enterprise rollout with a named account team",
      "You want parts inventory and logbook entries kept inside the maintenance software",
      "You need a specific workflow or integration we do not cover yet",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Flight Circle                                                     */
  /* Facts from flightcircle.com, checked 2026-08-18, rechecked        */
  /* 2026-10-16 (the August entry said "quoted per school" and         */
  /* "account setup with the vendor"; both were wrong):                */
  /* - docs/about-flight-circle/pricing: "$10 per month, per aircraft  */
  /*   or sim", unlimited users. Home page: self-serve Sign Up and a   */
  /*   60-day free trial. So price is NOT our argument here.           */
  /* - docs/users/faq: on a phone it is a web app added to the home    */
  /*   screen; "Soon we will have offline options". No Flight Circle   */
  /*   app on the App Store (iTunes search API) or Google Play.        */
  /* - schedule settings: "Rideshare" adds a second user and splits    */
  /*   the bill; a multi-day scheduling restriction exists.            */
  /* - maintenance reminders: meter, time and calendar; expired ones   */
  /*   block dispatch for basic users; an AD is a reminder you enter,  */
  /*   with a reference URL. No work orders anywhere in the docs.      */
  /* - also: ledger, autopay, block time contracts, inventory and      */
  /*   point of sale, a safety management system, QuickBooks Online,   */
  /*   Google Calendar, Mailchimp, Fiserv terminals, API by contact.   */
  /* ---------------------------------------------------------------- */
  "flight-circle": {
    slug: "flight-circle",
    name: "Flight Circle",
    navLabel: "vs Flight Circle",
    seoTitle: "AerScheduler vs Flight Circle",
    seoDescription: `Compare AerScheduler and Flight Circle: native iOS and Android apps instead of a home-screen web app, any number of people billed on one flight, work orders on customers' aircraft, and ADs picked from a library.`,
    ogDescription:
      "Native iOS and Android apps, split billing for any number of people, work orders and an AD library.",
    heroHeadline: "The Flight Circle alternative with native iOS and Android apps",
    heroSubhead: "Flight Circle runs on a phone as a web page added to the home screen. AerScheduler has its own apps on the App Store and Google Play, and a dispatch board that updates on every screen the moment a booking moves, with billing, maintenance and work orders on the same record.",
    heroVisual: "app",
    phoneTag: "No native app",
    phoneLines: [
      ["App Store", "Not listed"],
      ["Google Play", "Not listed"],
      ["How you get it", "Add the website to the home screen from the browser"],
      ["Offline", "\"Soon\", in its own FAQ"],
    ],
    intro: "Flight Circle already runs your schedule, so the question is not whether software helps. It is whether the rest of the day still costs you more admin than it should. We move your data and set the school up with you, and you keep Flight Circle running in parallel for as long as it takes to trust the new one.",
    angles: {
      scheduling: {
        note: "Both check checkouts and currency before a booking saves. Here students and renters book from a native app, with a push notification when the schedule changes.",
      },
      billing: {
        title: "Billing\nfor shared flights",
        note: "Flight Circle's Rideshare splits a flight between two pilots. Here any number of people share a booking, split per head, by logged time or in set shares, with an invoice each.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
        note: "In Flight Circle an AD is a reminder you type in, with a link to the directive. Here you pick it from the library and track it on the airframe or the component it applies to.",
      },
      "work-orders": {
        note: "Flight Circle tracks squawks and maintenance reminders, and its documentation has no work orders. Here a job runs from the finding to the owner's approval to a paid invoice.",
      },
      reporting: {
        note: "Flight Circle has standard reports with CSV export. Here each of 21 reports can be filtered, grouped, saved as a view and emailed daily, weekly or monthly.",
      },
    },
    reasons: [
      "Your front desk wants a board that updates on every screen the moment a booking moves",
      "Your pilots want an app from the App Store or Google Play, not a website on the home screen",
      "Several people share flights and each needs their own invoice",
      "Your mechanics work on customers' aircraft as well as your own",
    ],
    rows: [
      ["Pricing", PRICE_ROW_OURS, "$10 per aircraft or simulator a month. Unlimited users.", "Buying it"],
      [
        "Booking",
        "Only the times when the aircraft, instructor and student are all free are offered, checked for currency and checkouts, and live on every screen.",
        "A schedule with split views, recurring reservations and booking restrictions.",
        "Scheduling",
      ],
      [
        "Live schedule",
        "Every screen in the school updates the moment a booking changes.",
        "Not published",
        "Scheduling",
      ],
      [
        "Mobile apps",
        "Native apps on the App Store and Google Play, with push notifications.",
        "A web app added to the home screen from the browser. Not on the App Store or Google Play.",
        "Scheduling",
      ],
      [
        "Shared flights",
        "Any number of people on one booking, split per head, by logged time or in set shares, with an invoice each.",
        "Rideshare: a second pilot on the reservation, with the bill split between them.",
        "Money",
      ],
      [
        "Overnight trips",
        "One reservation across nights, with a minimum charge per night set per aircraft.",
        "A multi-day scheduling restriction. Per-night minimums not published.",
        "Money",
      ],
      [
        "Close-out",
        "Ramp-in drafts the invoice from the meters and the rates on the tail. Card, ACH or account balance.",
        "Check-in bills the flight. Cards on file, ACH, autopay and a member ledger.",
        "Money",
      ],
      [
        "Inspections",
        "Tach, Hobbs and calendar-month countdowns. An overdue inspection grounds the aircraft.",
        "Meter, time and calendar reminders. An expired one blocks dispatch for basic users.",
        "Maintenance",
      ],
      [
        "Airworthiness directives",
        "Every AD since 1995 naming the airframe, engine or propeller, from a library updated daily, listed for a person to decide.",
        "Entered by hand as a maintenance reminder, with a link to the directive.",
        "Maintenance",
      ],
      [
        "Work orders",
        "On your own fleet and on customers' aircraft, with the owner approving each finding online and paying the invoice.",
        "Not published",
        "Maintenance",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar and QuickBooks Online.",
        "QuickBooks Online, Google Calendar, Mailchimp and Fiserv card terminals.",
        "Connecting",
      ],
      [
        "API",
        "A documented public REST API on the Enterprise plan.",
        "By arrangement: contact them.",
        "Connecting",
      ],
    ],
    disclaimer: disclaimerFor("Flight Circle"),
    proofsTitle: "Also in every plan",
    proofs: [PROOF_SIMS_FREE, PROOF_REALTIME, PROOF_MULTI_DAY],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "Cost per aircraft decides it: Flight Circle publishes $10 a month per aircraft or simulator",
      "You want a safety management system with safety reports in the same tool",
      "You sell at the counter and want inventory and a point of sale in the scheduler",
      "You already run a large deployment elsewhere and moving it would cost more than it saves",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* Schedule Pointe                                                   */
  /* Facts from schedulepointe.com, checked 2026-08-18, rechecked      */
  /* 2026-10-16: serves flight schools, clubs and charter alongside    */
  /* medical practices, health clubs, CPA firms and salons; modules    */
  /* listed as Scheduling, Dispatch, Invoicing, Accounts Receivable,   */
  /* Curriculum and Advanced Maintenance Tracking; no published        */
  /* pricing, a phone number and a custom demo; iOS and Android apps   */
  /* (SchedulePt, SchedulePointeGo). Nothing on ADs or work orders.    */
  /* ---------------------------------------------------------------- */
  "schedule-pointe": {
    slug: "schedule-pointe",
    name: "Schedule Pointe",
    navLabel: "vs Schedule Pointe",
    seoTitle: "AerScheduler vs Schedule Pointe",
    seoDescription: `Compare AerScheduler and Schedule Pointe for flight schools and clubs: software built only for aviation, $${PRICE_PER_AIRCRAFT}/mo per aircraft published, self-serve signup, work orders and AD tracking.`,
    ogDescription:
      "Built only for aviation, with a published price, work orders and AD tracking.",
    heroHeadline: "The Schedule Pointe alternative built only for flight schools and clubs",
    heroSubhead: `Schedule Pointe sells the same scheduling platform to medical practices, salons and CPA firms, and its price comes after a phone call. AerScheduler is built only for flying operations, at $${PRICE_PER_AIRCRAFT} per aircraft a month with every user included, and you can start today.`,
    intro: "Every screen in AerScheduler was drawn for a flight line rather than adapted from another industry, the price is published, and you can be dispatching this afternoon instead of waiting for a call back. If you are on Schedule Pointe today, we help you move what you can export and configure the school with you, and nothing forces a cutover date.",
    angles: {
      scheduling: {
        note: "Schedule Pointe's scheduling also runs salons, health clubs and CPA firms. Here every screen is built around aircraft, instructors, checkouts and currency.",
      },
      billing: {
        note: "Schedule Pointe lists invoicing and accounts receivable. Here close-out drafts the invoice from the meters, and several people on one flight each get their own.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
        note: "Schedule Pointe lists advanced maintenance tracking and does not publish AD tracking. Here ADs come from a library and sit on the airframe or the component.",
      },
      "work-orders": {
        note: "Schedule Pointe does not publish work orders. Here a job runs from the finding to the owner's approval to a paid invoice.",
      },
    },
    reasons: [
      "The price is published, so you can decide without booking a call",
      "Every screen was designed for a flight school, not adapted from another industry",
      "Self-serve signup, on the schedule the same day",
      "Your shop works on customers' aircraft as well as your own",
    ],
    rows: [
      ["Pricing", PRICE_ROW_OURS, "Not published. Quoted per operation", "Buying it"],
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Custom demo, arranged by phone",
        "Buying it",
      ],
      [
        "Who it is built for",
        "Flight schools, flying clubs and aircraft rental operations. Aviation only.",
        "Aviation operations, plus medical practices, health clubs, CPA firms and salons on the same platform",
        "Buying it",
      ],
      [
        "Booking",
        "Only the times when the aircraft, instructor and student are all free are offered, checked for currency and checkouts, and live on every screen.",
        "Scheduling and dispatch",
        "Running the day",
      ],
      [
        "Mobile apps",
        "Native iOS and Android apps for the whole team. Book, dispatch and close out from the ramp.",
        "iOS and Android apps",
        "Running the day",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Invoicing and accounts receivable",
        "Money",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
        "Money",
      ],
      [
        "Multi-day trips",
        "One reservation across nights, with a per-night minimum set per tail.",
        "Not published",
        "Money",
      ],
      [
        "Inspections",
        "Tach, Hobbs and calendar-month countdowns. An overdue inspection grounds the aircraft.",
        "Advanced maintenance tracking",
        "Maintenance",
      ],
      [
        "Airworthiness directives",
        "Every AD since 1995 naming the airframe, engine or propeller, from a library updated daily, listed for a person to decide.",
        "Not published",
        "Maintenance",
      ],
      [
        "Work orders",
        "On your own fleet and on customers' aircraft, with the owner approving each finding online and paying the invoice.",
        "Not published",
        "Maintenance",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar and QuickBooks Online, plus a public REST API on the Enterprise plan.",
        "Not published",
        "Connecting",
      ],
    ],
    disclaimer: disclaimerFor("Schedule Pointe"),
    proofsTitle: "Also in every plan",
    proofs: [PROOF_REALTIME, PROOF_SIMS_FREE, PROOF_MULTI_DAY],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You run charter alongside training and need crew duty-time tracking, which we do not build",
      "You schedule something other than aircraft and want one vendor across all of it",
      "You need a workflow or integration we do not cover yet",
    ],
  },

  /* ---------------------------------------------------------------- */
  /* FlightLogger                                                      */
  /* Facts from flightlogger.net/packages, checked 2026-08-18,         */
  /* rechecked 2026-10-16: the platform package includes unlimited     */
  /* aircraft, simulators, renters, instructors, crew and admin users, */
  /* with "Active Student & Operations Flights Fees" on top, priced by */
  /* quote ("Only pay for what you train"). Optional add-on modules    */
  /* include the Financial Module (billing, QuickBooks), Business      */
  /* Insights, an LMS, a safety management system and an Integration   */
  /* Module. No dollar figures are published, so none are quoted here. */
  /* ---------------------------------------------------------------- */
  flightlogger: {
    slug: "flightlogger",
    name: "FlightLogger",
    navLabel: "vs FlightLogger",
    seoTitle: "AerScheduler vs FlightLogger",
    seoDescription: `Compare AerScheduler and FlightLogger: a flat $${PRICE_PER_AIRCRAFT}/mo per aircraft with every module and user included, versus a platform fee plus charges for each active student and operational flight.`,
    ogDescription:
      "A flat price per aircraft versus a bill that grows with every student and flight.",
    heroHeadline: "The FlightLogger alternative that does not charge per student",
    heroSubhead: `FlightLogger adds a fee for every active student and operational flight on top of its platform package, and billing and business reports are add-on modules. AerScheduler is $${PRICE_PER_AIRCRAFT} per aircraft a month with every module and every user included, however many students you train.`,
    priceLines: [
      ["Platform package", "Quote"],
      ["Active students", "Fee per student"],
      ["Operational flights", "Fee per flight"],
      ["Financial Module", "Add-on"],
      ["Business Insights", "Add-on"],
    ],
    intro: "The clearest difference shows up when the school grows. FlightLogger prices on active students and operational flights, so a bigger intake costs more; AerScheduler charges for aircraft and nothing else, so it does not. Moving is not a project either. We help get your data across and set the school up with you, and you can run both systems until the change has stuck.",
    angles: {
      billing: {
        title: "Billing\nin every plan",
        note: "Billing is FlightLogger's Financial Module, an add-on. Here it is part of the price, with an invoice each when several people share a flight.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
        note: "FlightLogger does not publish AD tracking. Here ADs come from a library and sit on the airframe or the component they apply to.",
      },
      "work-orders": {
        note: "FlightLogger does not publish work orders on customers' aircraft. Here a job runs from the finding to the owner's approval to a paid invoice.",
      },
      reporting: {
        title: "Reporting\non the same plan",
        note: "Business Insights is a FlightLogger add-on. Here all 21 reports come with every plan.",
      },
    },
    reasons: [
      "Your software cost stops depending on how busy you are",
      `One published number: $${PRICE_PER_AIRCRAFT} per aircraft per month`,
      "Billing and reports are in the plan, not add-on modules",
      "Self-serve signup, no quote and no discovery call",
    ],
    rows: [
      [
        "Pricing",
        PRICE_ROW_OURS,
        "Platform package plus active-student and operational-flight fees",
        "Buying it",
      ],
      [
        "What moves your bill",
        "The number of aircraft. Nothing else.",
        "How many students are active and how much you fly",
        "Buying it",
      ],
      [
        "What the price covers",
        "Scheduling, billing, maintenance, work orders and reporting, in every plan.",
        "The platform, with the Financial Module, Business Insights and others as add-ons",
        "Buying it",
      ],
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Custom quote based on training volume",
        "Buying it",
      ],
      [
        "Booking",
        "Only the times when the aircraft, instructor and student are all free are offered, checked for currency and checkouts, and live on every screen.",
        "Scheduling",
        "Running the day",
      ],
      [
        "Mobile apps",
        "Native iOS and Android apps for the whole team. Book, dispatch and close out from the ramp.",
        "Available",
        "Running the day",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Through the Financial Module, an add-on",
        "Money",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
        "Money",
      ],
      [
        "Inspections",
        "Tach, Hobbs and calendar-month countdowns. An overdue inspection grounds the aircraft.",
        "Available",
        "Maintenance",
      ],
      [
        "Airworthiness directives",
        "Every AD since 1995 naming the airframe, engine or propeller, from a library updated daily, listed for a person to decide.",
        "Not published",
        "Maintenance",
      ],
      [
        "Work orders",
        "On your own fleet and on customers' aircraft, with the owner approving each finding online and paying the invoice.",
        "Not published",
        "Maintenance",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar and QuickBooks Online, plus a public REST API on the Enterprise plan.",
        "QuickBooks through the Financial Module, and an Integration Module add-on",
        "Connecting",
      ],
    ],
    disclaimer: disclaimerFor("FlightLogger"),
    proofsTitle: "What a fixed price actually buys you",
    proofs: [PROOF_SIMS_FREE, PROOF_REALTIME, PROOF_MULTI_DAY],
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
  /* checked 2026-08-18, rechecked 2026-10-16: trading since 2001,     */
  /* product is TalonETA, web-based training management for            */
  /* universities and flight schools with Embry-Riddle and Western     */
  /* Michigan named as customers, sold via "Request a Demo" with no    */
  /* published pricing, configurable per customer. Separate products:  */
  /* Talon RMS (maintenance, "integrates with RMS"), Talon Mobile and  */
  /* TalonSMART. ETA lists "300+ Built-In Reports" with automated      */
  /* delivery, smart scheduling that checks currency, and automated    */
  /* billing from contract or student rates. The August entry said     */
  /* mobile was "not published"; Talon Mobile exists, so it is fixed.  */
  /* RMS was not reviewed, so nothing here claims what it lacks.       */
  /* ---------------------------------------------------------------- */
  "talon-systems": {
    slug: "talon-systems",
    name: "Talon Systems",
    navLabel: "vs Talon Systems",
    seoTitle: "AerScheduler vs Talon Systems (Talon ETA)",
    seoDescription: `Compare AerScheduler and Talon Systems ETA: one system at $${PRICE_PER_AIRCRAFT}/mo per aircraft that an independent school sets up itself, versus ETA, RMS and Talon Mobile sold by demo and configured per organization.`,
    ogDescription:
      "One system you set up yourself, versus separate products sold by demo.",
    heroHeadline: "The Talon Systems alternative for independent flight schools and clubs",
    heroSubhead: `Talon sells ETA, RMS for maintenance and Talon Mobile as separate products, by demo, mostly to universities and large academies. AerScheduler is one system at $${PRICE_PER_AIRCRAFT} per aircraft a month with every user included, and an independent school can set it up this afternoon.`,
    priceLines: [
      ["Talon ETA", "Training and operations"],
      ["Talon RMS", "Separate product"],
      ["Talon Mobile", "Separate product"],
      ["TalonSMART", "Separate product"],
    ],
    intro: "Talon builds ETA for university programs with a procurement process behind them, and for that kind of operation it is a real fit. If you run an independent school or club, you can have AerScheduler configured and dispatching this afternoon, at a price that is published rather than negotiated. Coming off ETA, we help move what you can export and set the school up with you.",
    angles: {
      scheduling: {
        note: "Both check instructor and aircraft currency before a booking. Talon configures ETA for each organization; here a school sets its own rules in an afternoon.",
      },
      billing: {
        note: "Talon bills each activity from contract or student rates. Here close-out drafts the invoice from the meters, and any number of people can share a flight with an invoice each.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
        note: "Talon tracks maintenance in RMS, a separate product. Here inspections, squawks and ADs live in the same system as the schedule.",
      },
    },
    reasons: [
      "You want to evaluate the software by using it, not by sitting through a demo",
      "The price is published and does not depend on a negotiation",
      "Scheduling, billing and maintenance are one system, not separate products",
      `A school with six aircraft pays $${PRICE_PER_AIRCRAFT * 6} a month, all users included`,
    ],
    rows: [
      ["Pricing", PRICE_ROW_OURS, "Not published. Quoted per organization", "Buying it"],
      [
        "Getting started",
        "Self-serve signup. On the schedule the same day.",
        "Request a demo",
        "Buying it",
      ],
      [
        "Typical customer",
        "Independent flight schools, flying clubs and rental operations.",
        "Universities and flight training organizations, including named university programs",
        "Buying it",
      ],
      [
        "Setup",
        "You configure it yourself in an afternoon.",
        "Configured to the organization's requirements",
        "Buying it",
      ],
      [
        "Booking",
        "Only the times when the aircraft, instructor and student are all free are offered, checked for currency and checkouts, and live on every screen.",
        "Scheduling and flight operations",
        "Running the day",
      ],
      [
        "Mobile apps",
        "Native iOS and Android apps for the whole team, in the same plan.",
        "Talon Mobile, a separate product",
        "Running the day",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Hobbs and tach billing, with per-activity costs from contract or student rates",
        "Money",
      ],
      [
        "Several people on one flight",
        "Built in. Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
        "Money",
      ],
      [
        "Maintenance",
        "Inspections, squawks and grounding in the same system as the schedule.",
        "Talon RMS, a separate product that integrates with ETA",
        "Maintenance",
      ],
      [
        "Airworthiness directives",
        "Every AD since 1995 naming the airframe, engine or propeller, from a library updated daily, listed for a person to decide.",
        "Not published in ETA",
        "Maintenance",
      ],
      [
        "Reports",
        "21 reports you can filter, group, save and email daily, weekly or monthly.",
        "300+ built-in reports, with automated delivery",
        "Reports and integrations",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar and QuickBooks Online, plus a public REST API on the Enterprise plan.",
        "Not published",
        "Reports and integrations",
      ],
    ],
    disclaimer: disclaimerFor("Talon Systems"),
    proofsTitle: "What you get without an implementation project",
    proofs: [PROOF_REALTIME, PROOF_SIMS_FREE, PROOF_SPLIT],
    notFitTitle: "When we may not be the right fit",
    notFit: [
      "You are a university program with a procurement process and need a vendor who will answer an RFP",
      "You need hundreds of built-in reports, or a formal safety management system alongside your training records",
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
    heroHeadline: "Flight school software, not corporate jet scheduling",
    heroSubhead: `Airplane Manager is built for corporate flight departments: trips, passengers and owners. AerScheduler is built for the flight school day, with students and renters booking themselves, instructors with their own rates and an invoice at the end of every flight, at $${PRICE_PER_AIRCRAFT} per aircraft a month.`,
    intro: "Airplane Manager is built for corporate flight departments and says so plainly. A flight school day looks nothing like that: students and renters booking themselves, instructors with availability and their own rates, aircraft billed by the hour, and an invoice at the end of every flight. AerScheduler is built for that day, and we help you move across and get set up rather than handing you a login and wishing you luck.",
    angles: {
      scheduling: {
        note: "Airplane Manager schedules trips for pilots, passengers and owners. Here students and renters book their own aircraft and instructor under rules you set.",
      },
      billing: {
        note: "Airplane Manager does not publish billing the person who flew by the hour. Here every flight ends in an invoice, drafted from the meters.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
      },
    },
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
        "Buying it",
      ],
      ["Pricing", PRICE_ROW_OURS, "Monthly plans by aircraft count", "Buying it"],
      [
        "The people on the system",
        "Students, instructors, renters, dispatchers, technicians and office staff, each with their own permissions.",
        "Pilots, passengers, owners and schedulers",
        "Running the day",
      ],
      [
        "Self-booking",
        "Approved students and renters book their own aircraft and instructor within rules you set.",
        "Not published",
        "Running the day",
      ],
      [
        "Instructors",
        "Weekly availability, student pairing, and dual and ground rates that flow into the invoice.",
        "Not published",
        "Running the day",
      ],
      [
        "Mobile apps",
        "Native iOS and Android apps for the whole team. Book, dispatch and close out from the ramp.",
        "Mobile access",
        "Running the day",
      ],
      [
        "Closing out a flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts from the rates on the tail.",
        "Not published",
        "Money",
      ],
      [
        "Billing the renter",
        "Stripe cards and ACH, account balances, and dues for club members.",
        "Not published",
        "Money",
      ],
      [
        "Inspections",
        "Tach, Hobbs and calendar-month countdowns. An overdue inspection grounds the aircraft.",
        "Not published",
        "Maintenance",
      ],
      [
        "Work orders",
        "On your own fleet and on customers' aircraft, with the owner approving each finding online and paying the invoice.",
        "Not published",
        "Maintenance",
      ],
    ],
    disclaimer: `Airplane Manager is a trademark of its owner and is built for a different kind of operation, which is the point of this page rather than a criticism. Rows describe what each product publishes; "not published" means we could not confirm it, not that it is absent.`,
    proofsTitle: "What a training operation needs that a jet schedule does not",
    proofs: [PROOF_CLOSE_OUT, PROOF_SPLIT, PROOF_SIMS_FREE],
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
  /* 2026-08-18, rechecked 2026-10-16: "100% Free"; unlimited users,   */
  /* aircraft and bookings; six member roles; instructor availability; */
  /* aircraft messages that can ground an aircraft; club messages; a   */
  /* file archive; scheduled maintenance; a member directory;          */
  /* iCalendar; METAR/TAF. "You do not need to download an app" (an    */
  /* HTML5 website). It lists payments, statistics and logbooks as     */
  /* possible future paid options, so invoicing and payments are not   */
  /* included today.                                                   */
  /* ---------------------------------------------------------------- */
  bookourplane: {
    slug: "bookourplane",
    name: "BookOurPlane",
    navLabel: "vs BookOurPlane",
    seoTitle: "AerScheduler vs BookOurPlane",
    seoDescription: `BookOurPlane is a free aircraft booking calendar for flying clubs. AerScheduler adds the money and the maintenance: invoicing, dues, inspection due dates, AD tracking and native iOS and Android apps, at $${PRICE_PER_AIRCRAFT}/mo per aircraft.`,
    ogDescription:
      "A free booking calendar versus running the club's money and maintenance too.",
    heroHeadline: "When your club outgrows a free booking calendar",
    heroSubhead: `BookOurPlane is a free calendar, and its own site says payments are not included. AerScheduler bills each flight from the Hobbs, collects monthly dues, tracks inspections and ADs, and comes as an app on the App Store and Google Play, at $${PRICE_PER_AIRCRAFT} per aircraft a month.`,
    heroVisual: "app",
    phoneTitle: "What BookOurPlane includes",
    phoneTag: "Free",
    phoneLines: [
      ["Price", "Free, for any number of members and aircraft"],
      ["On a phone", "The website; there is no app to download"],
      ["Billing flights", "Not included; payments are a possible future option"],
      ["Member dues", "Not included"],
    ],
    intro: "BookOurPlane has given flying clubs a free calendar since 2004, and if a calendar is genuinely all your club needs then keep it. Clubs move when the money starts costing somebody their evenings: billing the flight from Hobbs, chasing monthly dues, and knowing an aircraft is not overdue an inspection before a member takes it. We help move your roster and set the club up, and the first 14 days cost nothing.",
    angles: {
      scheduling: {
        note: "Both have member roles and instructor availability. Here members book from a native app and get a push notification when the schedule changes.",
      },
      billing: {
        title: "Billing\nand dues",
        body: "Hobbs and tach go in at ramp-in and the invoice is built from your rates. Monthly dues bill themselves, and members pay by card, ACH or their account balance.",
        note: "BookOurPlane's site lists payments as a possible future option. Here the flight is billed the moment it is closed out.",
      },
      maintenance: {
        title: "Maintenance\nand AD tracking",
        body: "Every inspection counts down by tach, Hobbs or calendar month, and an overdue annual grounds the aircraft until it is signed off. Every AD published since 1995 that names the airframe, engine or propeller is listed for a person to decide, from a library updated daily.",
        note: "In BookOurPlane an admin schedules maintenance and can ground an aircraft with a message. Here inspections count down and ground the aircraft on their own.",
      },
      reporting: {
        note: "BookOurPlane lists statistics as a possible future option. Here 21 reports come with every plan.",
      },
    },
    reasons: [
      "Your treasurer is chasing dues and flight time in a spreadsheet",
      "You want the flight billed from Hobbs the moment it is closed out, not typed up later",
      "Somebody needs to know the annual is due in eleven hours, before the aircraft is booked",
      "Members would rather open an app than a mobile website",
    ],
    rows: [
      ["Price", PRICE_ROW_OURS, "Free", "Buying it"],
      [
        "Booking",
        "Only the times when the aircraft, instructor and student are all free are offered, checked for currency and checkouts, and live on every screen.",
        "Aircraft booking with member roles and instructor availability",
        "Running the day",
      ],
      [
        "Mobile apps",
        "Native iOS and Android apps for the whole club.",
        "Mobile-friendly website; no app to download",
        "Running the day",
      ],
      [
        "Invoicing the flight",
        "Ramp in with Hobbs, tach and fuel, and the invoice drafts itself from the rates on the tail.",
        "Not included. Their site lists payments as a possible future option",
        "Money",
      ],
      [
        "Member dues",
        "Membership tiers, joining fees and recurring dues, billed automatically with prorated first periods.",
        "Not included",
        "Money",
      ],
      [
        "Taking payment",
        "Stripe cards and ACH, and account balances.",
        "Not included",
        "Money",
      ],
      [
        "Several people on one flight",
        "Split per head, by logged time, or in set shares. One invoice each.",
        "Not published",
        "Money",
      ],
      [
        "Inspections",
        "Tach, Hobbs and calendar-month countdowns. An overdue inspection grounds the aircraft.",
        "Maintenance scheduling, and a grounding message",
        "Maintenance",
      ],
      [
        "Airworthiness directives",
        "Every AD since 1995 naming the airframe, engine or propeller, from a library updated daily, listed for a person to decide.",
        "Not published",
        "Maintenance",
      ],
      [
        "Integrations",
        "Stripe, Google Calendar and QuickBooks Online, plus a public REST API on the Enterprise plan.",
        "iCalendar feed",
        "Connecting",
      ],
    ],
    disclaimer: `BookOurPlane is a trademark of its owner and has served flying clubs for over twenty years at no charge. Rows describe what each product publishes, including what BookOurPlane itself states is not included; "not published" means we could not confirm it, not that it is absent.`,
    proofsTitle: "What you get for the twenty dollars",
    proofs: [PROOF_CLOSE_OUT, PROOF_SPLIT, PROOF_MULTI_DAY],
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
      a: `AerScheduler is $${PRICE_PER_AIRCRAFT} per aircraft per month with every user included, and simulators and classrooms are free. Flight Schedule Pro prices per aircraft by custom quote and does not publish the figure, so there is no public number to compare against.`,
    },
    {
      q: "Can I switch from Flight Schedule Pro without a sales call?",
      a: "Yes. Signup is self-serve and the trial is 14 days, with nothing charged if you cancel before it ends. You can add an aircraft and put a flight on the board the same afternoon.",
    },
    {
      q: "Does AerScheduler have a mobile app?",
      a: "Yes, native iOS and Android apps for the whole team. Instructors, students and renters can book, and dispatchers can ramp a flight in and out from the ramp itself.",
    },
    {
      q: "Can several people be billed for one flight?",
      a: "Yes. Split the cost per head, by logged time, or in shares you set, and each person gets their own invoice. Useful for ground school, shared cross-countries and checkrides.",
    },
  ],
  "flight-circle": [
    {
      q: "How is AerScheduler different from Flight Circle?",
      a: "Both run a flight school's schedule, billing and maintenance. AerScheduler's dispatch board updates on every screen the moment a booking moves and books from native iOS and Android apps, where Flight Circle is a web app on the home screen. Any number of people can share a booking with an invoice each, work orders run on customers' aircraft as well as your own, and ADs come from a library.",
    },
    {
      q: "Is AerScheduler cheaper than Flight Circle?",
      a: `No. Flight Circle publishes $10 per aircraft or simulator a month. AerScheduler is $${PRICE_PER_AIRCRAFT} per aircraft, with simulators and classrooms free and every user included. Schools move for the scheduling: only the times when the aircraft, instructor and student are all free are offered, every screen updates at once, and students book from a native app, with billing, maintenance and work orders on the same record.`,
    },
    {
      q: "Can I try it before talking to anyone?",
      a: "Yes. There is a live demo you can open with no signup, and a 14-day free trial with no sales call.",
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
