import type { FeatureSlug } from "@/lib/features";

/**
 * Landing-page content for feature pages.
 *
 * Why this is a separate file from `lib/features.ts`: that one is the registry
 * (what pages exist, what they are called, what they link to) and it is parsed
 * as a bare literal by `scripts/build-search-index.mjs`. This one is prose, it
 * changes on a marketing cadence rather than a product one, and it would have
 * tripled the length of the registry.
 *
 * Why it exists at all: the feature pages used to be a hero and a grid of ticked
 * boxes. A tick list answers "does it have X", which is a question somebody asks
 * once they have already chosen you. The question they arrive with is "does my
 * Tuesday get better", and only an outcome answers that. So every page now leads
 * with what changes, then shows how it works, and keeps the capability list as
 * reference further down.
 *
 * House rules for anything written in here:
 *
 *  - An outcome is a RESULT. "The desk stops fielding reschedule calls" is an
 *    outcome; "self-service rescheduling" is a feature.
 *  - Every claim has to be true of the shipped product. The copy below was
 *    written against the help documentation in `src/content/docs`, which is
 *    written against the real screens, so a claim here can be checked in one hop.
 *  - Numbers are better than adjectives, and the specific number is better than
 *    a round one. "Up to 4 renters on one rental" beats "flexible".
 *  - No em dashes anywhere in the workspace.
 */

export type LandingOutcome = { title: string; body: string };
export type LandingStep = { title: string; body: string };
export type LandingProof = { value: string; label: string };
export type LandingSection = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};
export type LandingFaq = { q: string; a: string };

export type FeatureLanding = {
  /** Overrides the H1. Use it to put the search phrase in the heading. */
  h1?: string;
  /** Small label above the outcomes heading. Defaults to "What changes". */
  outcomesEyebrow?: string;
  outcomesTitle: string;
  outcomesIntro?: string;
  outcomes: LandingOutcome[];
  /** Thin band under the hero. Four items or none: three looks like a gap. */
  proof?: LandingProof[];
  stepsTitle?: string;
  steps?: LandingStep[];
  sections?: LandingSection[];
  /** Heading over the capability list. Defaults to "Everything you get". */
  bulletsTitle?: string;
  /** Help-article hrefs, resolved against `lib/docs.ts` when the page renders. */
  docs?: string[];
  faqs?: LandingFaq[];
  /** Mid-page CTA band. */
  ctaTitle: string;
  ctaBody: string;
  /** Closing CTA band. Falls back to a generic pair. */
  closingTitle?: string;
  closingBody?: string;
};

export const FEATURE_LANDING: Partial<Record<FeatureSlug, FeatureLanding>> = {
  /* ================================================================== */
  /* SCHEDULING MODULE                                                   */
  /* ================================================================== */
  scheduling: {
    h1: "Flight school scheduling and dispatch software",
    outcomesTitle: "What a better board is actually worth",
    outcomesIntro:
      "A schedule is not a calendar. It is the thing that decides whether an aircraft flies today, whether the flight gets billed, and how many times the phone rings before either happens.",
    proof: [
      { value: "8", label: "Reservation types, from dual to maintenance, each with its own rules about who may be on it" },
      { value: "365 days", label: "The furthest ahead anyone can book, whatever their role or membership tier" },
      { value: "15 min", label: "Everything snaps to the quarter hour, so there is no such thing as an 09:07 departure" },
      { value: "Live", label: "The board updates as other people book, move and cancel, and reconnects itself when the laptop wakes" },
    ],
    outcomes: [
      {
        title: "Nobody books over a flight they could not see",
        body: "The board is the whole school's schedule, not each person's own. Every member sees every lane, on purpose. A red now-line shows what is out, and the counter reads 12 of 47 matching the moment you filter.",
      },
      {
        title: "The double-booking argument stops happening",
        body: "Conflicts are refused when the booking is saved, not flagged afterwards, and the same check runs whether the booking came from the front desk, a student's phone, or an edit two weeks later.",
      },
      {
        title: "A flight cannot quietly go unbilled",
        body: "Ramp out, ramp in, sign off, invoiced. Every booking carries the badge for where it is stuck, so the flight that never got closed out is visible rather than discovered at month end.",
      },
      {
        title: "The desk stops being the rescheduling department",
        body: "Members move their own bookings inside rules you set. Drag a block on the board, drop it on another tail to swap the aircraft, or nudge it with the arrow keys, and undo it if you were wrong.",
      },
      {
        title: "An out-of-currency pilot never gets handed the keys",
        body: "Medicals, flight reviews and checkouts are checked at booking and they are always on, not an option. A grounded aircraft and a grounded member both stop the booking before it exists.",
      },
      {
        title: "A cancelled slot gets refilled instead of lost",
        body: "Members join standby on a booking or leave standing preferences. When a matching slot opens they get a time-limited offer they can accept from the iPhone notification itself, and it moves to the next person if it expires.",
      },
      {
        title: "The weekend rental is one booking, not five",
        body: "Turn on multi-day and the aircraft goes out Friday and comes back Sunday as a single reservation. It is gone from the board in between rather than looking free again each morning.",
      },
      {
        title: "9:00 AM means 9:00 AM, from anywhere",
        body: "Times are drawn in the airport's own zone rather than the device's, so checking the schedule from a hotel in another state does not shift every lesson. Individuals can switch to their own zone for themselves.",
      },
    ],
    stepsTitle: "From an empty lane to a paid invoice",
    steps: [
      {
        title: "Book it",
        body: "Pick the type first: it decides what resource is booked, who may be on it and how many. Only times when the aircraft and the people are all free are offered.",
      },
      {
        title: "Ramp out",
        body: "Record the departure Hobbs and tach. The aircraft comes off the line, the badge moves to In flight, and the booking locks against the edits that would now be wrong.",
      },
      {
        title: "Ramp in",
        body: "Return readings, fuel, and instruction time if a CFI was teaching. The aircraft goes back on the line, and anything odd is flagged in plain figures before you save.",
      },
      {
        title: "Sign off",
        body: "Every pilot confirms with their own four-character PIN. The invoice is raised automatically when the last one signs, which is why nothing here needs a billing hand-off.",
      },
    ],
    sections: [
      {
        eyebrow: "The board",
        title: "Five ways to look at the same day, and one of them is the ramp",
        body: "Aircraft, simulators and rooms are all lanes. Renters and technicians see aircraft only. Filtering dims what does not match rather than hiding it, deliberately, because a schedule with rows secretly removed is how somebody books over a flight that was always there.",
        points: [
          "Day, week, month and list views",
          "Lanes for aircraft, simulators and classrooms",
          "Search matches titles, notes, tail numbers, people and guests",
          "Resource and Location remove lanes; every other filter dims",
          "Cancelled bookings are never drawn on the board",
          "Updates hold while somebody is mid-drag, then apply",
        ],
      },
      {
        eyebrow: "Rules, not policing",
        title: "Write the school's rules down once and stop enforcing them by hand",
        body: "Every booking rule is off by default, so nothing surprises a school that never opens the page. Turn on the ones you actually run, and the refusal message names the rule and the number rather than saying no.",
        points: [
          "Flying day hours, with a per-tail override for a night-capable aircraft",
          "Cancel and edit lock, with an optional late-cancel fee billed before the slot is released",
          "Max upcoming bookings a student or renter may hold at once",
          "Max reservation length",
          "Members can only book aircraft they are checked out on",
          "Require a saved card before a member books themselves",
        ],
      },
      {
        eyebrow: "Close-out",
        title: "The part every other system leaves to somebody's memory",
        body: "Close-out is where a flight becomes money, so it is built as a step in the flight rather than a task in an inbox. A booking with no aircraft, a classroom ground lesson, skips the ramp steps and goes straight to review in one press.",
        points: [
          "Hobbs and tach at both ends, plus fuel",
          "Instruction time entered once on a dual",
          "Unusual readings and overnight minimums flagged before you save",
          "Who pays what, when more than one person is being billed",
          "Log a squawk from the same screen if something is wrong",
          "Correct a bad reading afterwards without unpicking the booking",
        ],
      },
    ],
    bulletsTitle: "Everything in scheduling and dispatch",
    docs: [
      "/docs/scheduling/how-scheduling-works",
      "/docs/scheduling/reservation-types",
      "/docs/scheduling/booking-rules-and-settings",
      "/docs/scheduling/ramp-out-and-ramp-in",
      "/docs/scheduling/standby-and-slot-offers",
      "/docs/scheduling/who-can-do-what-on-the-schedule",
    ],
    faqs: [
      {
        q: "What actually stops a double booking?",
        a: "The conflict check runs when the booking is saved, not as a warning afterwards, and it covers the aircraft and every person on the flight. The same check runs from the dispatch board, from a member's phone, and on an edit weeks later, so there is no surface that can slip one through.",
      },
      {
        q: "What happens when an aircraft goes down for maintenance mid-week?",
        a: "Ground it, and it stops being bookable across the whole schedule immediately, with the reason attached. Bookings already on it are visible so the desk can move them. You can also put the downtime on the board as a maintenance reservation, which books the aircraft, carries nobody, and is never billed.",
      },
      {
        q: "Can students book aircraft they have not been checked out on?",
        a: "Only if you let them. Turn on approved resources and students and renters can book only the tails they are signed off on, enforced when the booking saves rather than by hiding aircraft from a list. Instructors are deliberately exempt so the setting cannot ground your dual bookings, and owners, admins and dispatchers can still assign anyone to anything, which is what you need during a checkout.",
      },
      {
        q: "Can I control how far ahead and how many bookings someone holds?",
        a: "Yes. Cap the number of upcoming bookings a student or renter can hold, cap how long a single booking can run, and set how far ahead each membership tier may book. Nobody can book more than 365 days out whatever their tier says. A repeating series is checked against the cap for every date it would create, and refused before anything is booked rather than half way through.",
      },
      {
        q: "Does it handle simulators and classrooms?",
        a: "They are first-class resources with their own lanes on the same board, and sim and ground reservations have their own person limits (up to 6 on a sim, up to 12 in a ground class). Simulators and rooms are also free on your subscription: only aircraft count toward the bill.",
      },
      {
        q: "Do you handle more than one airport?",
        a: "Yes. Aircraft carry a home base, Location filters the board down to one field, and the home base can be moved at ramp-in when an aircraft is repositioned.",
      },
      {
        q: "What happens across a daylight saving change?",
        a: "The schedule is drawn in the airport's own time zone, so a 9:00 AM lesson stays at 9:00 AM through the change instead of drifting an hour. That is also why multi-day bookings cannot be turned on until the school has set a time zone: the number of nights away decides the bill, and nights can only be counted in one place.",
      },
      {
        q: "Does the board update when somebody else changes something?",
        a: "Yes, live. If the connection drops because a laptop slept it reconnects on its own and falls back to a quiet refresh in the meantime. Updates are held while somebody is mid-drag and applied when they let go, so a block is never yanked out from under the cursor.",
      },
    ],
    ctaTitle: "Put your fleet on a board and fly it this week",
    ctaBody:
      "Add a tail, book a flight, ramp it in, and watch the invoice draft itself. Nothing to install, and nobody to talk to first.",
    closingTitle: "Your whole schedule, on one board.",
    closingBody:
      "Set the school up this afternoon. Aircraft are $20 a month each, simulators and classrooms are free, and every instructor, student and renter is included.",
  },

  "self-booking": {
    h1: "Online aircraft booking for students and renters",
    outcomesTitle: "Give the front desk its afternoon back",
    outcomesIntro:
      "Self-booking is only a saving if it stays inside your rules. This one refuses the booking rather than letting the desk unpick it afterwards.",
    outcomes: [
      {
        title: "The phone stops ringing for slots that are on the screen",
        body: "Approved members pick the aircraft, the instructor when they need one, and a time from the list. Only times when everyone and everything is free are offered in the first place.",
      },
      {
        title: "Members book at the airport, not from the office",
        body: "The same flow runs in the native iOS app, so somebody driving to the field can take the 4pm slot that just opened without finding a laptop.",
      },
      {
        title: "Your rules hold without anybody enforcing them",
        body: "Checkouts, currency, how far ahead a tier may book, how many bookings someone holds, a card on file, an account balance. Each one is checked at save and each refusal names the reason.",
      },
      {
        title: "Cancellations turn back into flying hours",
        body: "Standing standby preferences mean a freed slot goes out as a time-limited offer to somebody who wanted it, accepted straight from the phone notification.",
      },
    ],
    stepsTitle: "What a member actually does",
    steps: [
      {
        title: "Pick the type",
        body: "Students see dual, solo, shared, ground and sim. Renters see rental and shared. The type sets who may be on the booking.",
      },
      {
        title: "Pick the aircraft",
        body: "If checkouts are on, only the tails they are approved on are accepted, and the refusal names the person and the tail.",
      },
      {
        title: "Pick a time",
        body: "The list only contains times when the aircraft, the instructor and the member are all free, so there is no clash to discover on save.",
      },
      {
        title: "Fly it",
        body: "Their upcoming flights sit on their own home screen on web and on the phone, alongside anything they owe.",
      },
    ],
    bulletsTitle: "Everything in self-booking",
    docs: [
      "/docs/scheduling/book-a-solo-flight",
      "/docs/scheduling/change-or-cancel-your-booking",
      "/docs/scheduling/standby-and-slot-offers",
      "/docs/scheduling/why-was-my-booking-refused",
      "/docs/scheduling/set-up-a-repeating-booking",
    ],
    faqs: [
      {
        q: "Can I stop members booking themselves entirely?",
        a: "You do not have to use it, and the rules narrow it as far as you like: checkouts per tail, a saved card before booking, a cap on upcoming bookings, a cap on booking length, and how far ahead each membership tier may go.",
      },
      {
        q: "Can a member cancel at the last minute?",
        a: "Only if you allow it. A cancel and edit lock stops members changing a booking inside a window you set, while the front desk, instructors and technicians can still move it. With Stripe connected you can let them cancel inside the window if they accept a late-cancel fee, which is billed before the slot comes off the board.",
      },
      {
        q: "Does a student need an instructor to book a dual?",
        a: "They pick the instructor as part of the booking, and only pairings you allow are offered. On a standby offer for a dual, the instructor confirms first.",
      },
      {
        q: "Can members book repeating lessons?",
        a: "Yes, and each date is created as a real separate booking so it can be ramped, reviewed and invoiced on its own. If any single date conflicts, none of them are booked.",
      },
      {
        q: "What stops somebody with an unpaid balance from booking?",
        a: "On the account ledger you can set a minimum credit to self-book and a maximum they may owe and still book, and optionally check both again at ramp-out on the morning of the flight. Staff booking on someone's behalf skip the check.",
      },
    ],
    ctaTitle: "Let your members book themselves, inside your rules",
    ctaBody:
      "Turn on the rules you actually run and leave the rest off. Nothing is enforced that you did not ask for.",
  },

  fleet: {
    h1: "Aircraft fleet management software for flight schools",
    outcomesTitle: "One record per tail, feeding everything else",
    outcomesIntro:
      "The aircraft record is where the rate that bills, the meter that counts and the status that grounds all live. Get it right once and the schedule, the invoice and the maintenance page agree by construction.",
    outcomes: [
      {
        title: "The rate on the invoice is the rate on the aircraft",
        body: "Wet or dry, billed on Hobbs or tach, set on the tail and read at close-out. Nobody retypes a rate into a bill, so nobody mistypes one.",
      },
      {
        title: "Grounding an aircraft actually grounds it",
        body: "Ground with a reason and it stops being bookable everywhere at once, on the board, in the app, and on a member's self-booking. Return to service puts it back.",
      },
      {
        title: "Simulators and classrooms cost you nothing to schedule",
        body: "They are full resources with their own lanes and their own person limits, and they are free on your subscription. Only aircraft count toward what you pay.",
      },
      {
        title: "The right people fly the right aeroplanes",
        body: "Check a member out on a tail from either side, the aircraft or the person. With approved resources on, students and renters are refused anything else.",
      },
    ],
    bulletsTitle: "Everything in fleet and facilities",
    docs: [
      "/docs/getting-started/add-an-aircraft",
      "/docs/getting-started/aircraft-categories-and-meters",
      "/docs/getting-started/add-a-simulator-or-classroom",
      "/docs/getting-started/approve-a-member-on-an-aircraft",
      "/docs/billing/set-aircraft-and-instruction-rates",
    ],
    faqs: [
      {
        q: "Do simulators and classrooms count toward my bill?",
        a: "No. Pricing is per aircraft. Simulators and ground-school rooms are free however many you add, and they schedule exactly like aircraft.",
      },
      {
        q: "Can different aircraft have different rates and meters?",
        a: "Yes. Each tail carries its own hourly rate, whether that rate is wet or dry, and whether it bills on Hobbs or tach. Pilots enter both meters either way; only the one you chose is priced.",
      },
      {
        q: "Can one aircraft have different flying hours from the rest?",
        a: "Yes. The school sets a flying day, and an individual aircraft can override it, which is what a night-capable tail needs.",
      },
      {
        q: "We operate from more than one airport. Does that work?",
        a: "Aircraft carry a home base, the board filters by location, and the home base can be changed at ramp-in when an aircraft is repositioned.",
      },
    ],
    ctaTitle: "Get your fleet in, rates and all, in an afternoon",
    ctaBody:
      "Add each tail once with its rate, its meter and its home base, and every booking and invoice after that reads from it.",
  },

  compliance: {
    h1: "Pilot currency and compliance tracking for flight schools",
    outcomesTitle: "The flight that should not go, does not go",
    outcomesIntro:
      "Currency is the one rule a scheduling system has no business making optional, so it is the one rule here that cannot be switched off.",
    outcomes: [
      {
        title: "A lapsed medical stops a booking, not a conversation",
        body: "Currency is checked when the booking is saved, always, for every school. The refusal names the person and what has lapsed instead of leaving the desk to work it out.",
      },
      {
        title: "Nobody has to remember whose flight review is due",
        body: "Medicals, flight reviews, checkouts and your own custom currency types all carry renewals, and expiring ones surface on the compliance board and in reports before they bite.",
      },
      {
        title: "Documents stop living in a filing cabinet",
        body: "Each member has a document vault with expiry dates, so the certificate you need for an audit is attached to the person rather than in somebody's email.",
      },
      {
        title: "Members can fix it themselves",
        body: "A student or renter can see exactly which currency is blocking them and what it needs, including one that has simply never been signed off in the first place.",
      },
    ],
    bulletsTitle: "Everything in compliance",
    docs: [
      "/docs/scheduling/check-your-currency-status",
      "/docs/getting-started/member-documents",
      "/docs/getting-started/ground-archive-or-remove-a-member",
      "/docs/scheduling/why-was-my-booking-refused",
    ],
    faqs: [
      {
        q: "Can currency checks be turned off?",
        a: "No, and that is deliberate. Every other booking rule on the system is off by default and optional. Currency is always on, because a scheduling system that will dispatch a pilot with a lapsed medical is worse than no scheduling system.",
      },
      {
        q: "Can I add currencies that are specific to my school?",
        a: "Yes. Alongside medicals, flight reviews and checkouts you can define your own currency types with their own renewal periods.",
      },
      {
        q: "What if a student is current but the instructor is not?",
        a: "Both are checked. A dual can still go when the rules allow flying with a current instructor, and the refusal tells you which person is the problem.",
      },
      {
        q: "Can I stop one specific person flying without deleting them?",
        a: "Ground the member. They stay on the roster with their history intact and cannot be put on a booking until you lift it.",
      },
    ],
    ctaTitle: "Stop the flight that should not go",
    ctaBody:
      "Currency checks run on every booking from the day you sign up, with nothing to configure first.",
  },

  /* ================================================================== */
  /* BILLING MODULE                                                      */
  /* ================================================================== */
  billing: {
    h1: "Flight school billing and invoicing software",
    outcomesTitle: "Money that collects itself",
    outcomesIntro:
      "Most schools do not have a billing problem. They have a hand-off problem: the flight happens here, the invoice happens over there, and the gap between them is where the revenue goes.",
    proof: [
      { value: "2 models", label: "Invoice each booking, or run member accounts with a balance. One school-wide switch." },
      { value: "5 ways", label: "To divide one booking's cost, from evenly to by each pilot's own logged hours" },
      { value: "1 each", label: "A shared flight mints one invoice per payer, at that payer's own rate" },
      { value: "QuickBooks", label: "Paid invoices post to QuickBooks Online as Sales Receipts, matched by email" },
    ],
    outcomes: [
      {
        title: "The bill is written before the pilot reaches the car park",
        body: "Ramp-in captures the meters and the instruction time, the last PIN sign-off raises the invoice, and it is emailed with a pay link. There is no export step and no second system.",
      },
      {
        title: "Flights that never got billed stop being invisible",
        body: "An Unbilled reservations filter lists them, and an admin can raise the invoice or post it to the ledger straight from the booking. What used to be found in a month-end reconciliation is now a filter.",
      },
      {
        title: "Nobody chases invoices for the first month",
        body: "A daily sweep reminds members automatically, at most once a week and no more than four times, then tells your admins that further chasing is on the school. Manual reminders do not count against the four.",
      },
      {
        title: "Money can arrive before the flight instead of 30 days after",
        body: "Put members on an account balance with auto-refill, and optionally refuse a self-booking, or the ramp-out itself, below a credit floor you set.",
      },
      {
        title: "Shared flights stop leaking revenue",
        body: "One booking with several payers produces one bill each, priced at that person's own rate and quoting their own hours, which is what lets a member and a non-member share an aircraft without a special case.",
      },
      {
        title: "The weekend rental bills for the weekend",
        body: "An overnight minimum floors the charge per night away, counted in the airport's own time zone so two people booking the same trip from different states cannot get different bills.",
      },
      {
        title: "Your bookkeeper stops retyping paid invoices",
        body: "Each one posts to QuickBooks Online as a Sales Receipt the moment it is paid, once and only once, with a private note carrying the member, the instructor, the flight date and the tail.",
      },
      {
        title: "Who owes what is a screen, not an afternoon",
        body: "Balances sorted most-owing first with days owing beside them, plus an accounts receivable report in 30, 60 and 90 day buckets that exports to CSV.",
      },
    ],
    stepsTitle: "From ramp-in to the bank",
    steps: [
      {
        title: "Close the flight out",
        body: "Hobbs and tach at both ends, instruction time if a CFI was aboard. If more than one person is paying, Who pays what sits in the same panel.",
      },
      {
        title: "Everyone signs off",
        body: "Each pilot confirms with their own PIN. Nothing bills until the last one lands, which is the answer to almost every missing-invoice question.",
      },
      {
        title: "The bill posts",
        body: "One Stripe invoice per payer, or one charge against each member's balance, drafted from the meters and your rates rather than typed.",
      },
      {
        title: "The money moves",
        body: "Card, autopay, or an account top-up. Payouts land in your school's own Stripe account, and paid invoices flow on to QuickBooks.",
      },
    ],
    sections: [
      {
        eyebrow: "Two models",
        title: "Bill each visit, or run accounts. Not a plugin either way",
        body: "Schools that invoice each flight and clubs that run a running balance want genuinely different software. This is one switch rather than two products, and guests are always invoiced regardless, because a guest has no account to draw down.",
        points: [
          "Invoice each booking, settled by card, autopay, or marked paid for cash",
          "Account ledger with a running balance that may go negative",
          "Add funds by card, or the desk credits cash and checks",
          "Auto-refill under a floor, to what is owed, or a fixed amount",
          "Late fees as a percentage, a flat charge, or both, after a grace period",
          "Statements for any date range, printed or emailed",
        ],
      },
      {
        eyebrow: "Split billing",
        title: "One booking, several payers, one invoice each",
        body: "Set the rule once per booking type and the close-out asks only for the figures that rule needs. The worked money examples on the settings screen are computed by the same engine that prices the real invoice, so the screen cannot describe something different from what the member is charged.",
        points: [
          "One person pays, for the simple case",
          "Split evenly between everyone on the flight",
          "Each pays their own time, from per-person meter readings",
          "Set shares, as percentages that must total 100",
          "Each pays in full, for a ground class billed per head",
          "Mark somebody not billed, and the rest divide what is left",
        ],
      },
      {
        eyebrow: "Rates",
        title: "Set the price once, on the thing that has the price",
        body: "The tail carries its hourly rate, whether that rate is wet or dry, and whether it bills on Hobbs or tach. Instruction is priced per rating. Nothing is retyped into an invoice, so nothing is mistyped into one.",
        points: [
          "Wet or dry hourly rates per aircraft",
          "Bill on Hobbs or on tach, per tail",
          "Instruction rates per rating",
          "An overnight minimum per tail, or school-wide, or none",
          "A service fee percentage with a label you choose",
          "Override the price on a single booking when you need to",
        ],
      },
    ],
    bulletsTitle: "Everything in billing and payments",
    docs: [
      "/docs/billing/how-billing-works",
      "/docs/billing/choose-invoice-or-account-ledger",
      "/docs/billing/set-up-cost-splitting",
      "/docs/billing/close-out-a-flight-and-bill-it",
      "/docs/billing/why-a-flight-was-not-invoiced",
      "/docs/billing/send-paid-invoices-to-quickbooks",
    ],
    faqs: [
      {
        q: "Do I need Stripe?",
        a: "Yes, for anything to bill. It is your own Stripe account, connected through Stripe's hosted onboarding, so payouts and your payout schedule stay yours and card details never touch AerScheduler. You can set up rates, plans and splitting rules before you connect, but no invoice or ledger charge is raised until Stripe is connected and invoicing is switched on.",
      },
      {
        q: "What are the fees?",
        a: "Stripe's normal processing comes out of your payout rather than being added to what the member pays, and your Stripe dashboard is the authority on it. AerScheduler adds a Connect application fee. Separately, you can add two of your own if you want them: a service fee percentage on every bill, and a card fee on account top-ups.",
      },
      {
        q: "Can members pay by card?",
        a: "Yes. Members save a card and can turn on autopay, which charges flight invoices as they appear. Cards are held by Stripe on your school's own account. Your Stripe-hosted invoice and top-up pages also offer whatever other payment methods you have enabled in your own Stripe account.",
      },
      {
        q: "Can I run accounts or tabs instead of invoicing every flight?",
        a: "Yes. Account ledger is one school-wide switch. Members hold a running balance, top it up by card or get credited at the desk for cash and checks, and flights draw it down. You get auto-refill, late fees, statements and optional booking and dispatch gates. Guests still get a pay-this-visit invoice either way.",
      },
      {
        q: "How do I split a flight between two pilots?",
        a: "Set the rule once for that booking type, then a Who pays what panel appears on any booking with more than one payer. Whoever is at the ramp fills in only the fields your rule uses. Each payer gets their own invoice at their own rate, quoting their own hours, with a memo naming the others on the flight.",
      },
      {
        q: "Does it bill flying club dues?",
        a: "Yes. A plan per tier with a joining fee and recurring dues, billed on a common day or on each member's own anniversary, prorated for anyone joining mid-cycle, and pausable for a member who stops flying over the winter. See memberships and dues.",
      },
      {
        q: "Does it work with QuickBooks?",
        a: "QuickBooks Online. Every invoice becomes a Sales Receipt the moment it is paid, matched to a customer by email, once and only once. Two honest limits: unpaid and voided invoices never sync, and a refund made inside Stripe does not reverse the Sales Receipt.",
      },
      {
        q: "What happens if a member's balance goes negative?",
        a: "It is allowed on purpose, and what you do about it is yours to set. Days owing starts the day the balance last went negative, late fees post once a member per month after a grace period, and balance gates can refuse their next self-booking or their next ramp-out. In invoice mode the equivalent is grounding a member after a number of unpaid invoices.",
      },
      {
        q: "Why did a flight not get invoiced?",
        a: "Nine times out of ten nobody finished the PIN sign-offs, and nothing bills until the last pilot confirms. After that: invoicing is switched off, Stripe onboarding was never finished, the tail has no rate, or it was a maintenance booking, which is never billed by design.",
      },
    ],
    ctaTitle: "Close a flight out and watch the invoice write itself",
    ctaBody:
      "Connect Stripe, put a rate on one tail, and bill a real flight before you decide anything else.",
    closingTitle: "Stop running billing in a second system.",
    closingBody:
      "The flight, the rate, the split and the invoice in one place, so nothing has to be carried across by hand.",
  },

  memberships: {
    h1: "Flying club membership and dues billing software",
    outcomesTitle: "Nobody chases the first of the month",
    outcomesIntro:
      "Dues are not hard, they are just relentless. The work is in the exceptions: the member who joined on the 20th, the one who stops for the winter, the one whose card failed in March.",
    outcomes: [
      {
        title: "Dues raise themselves overnight",
        body: "Or wait for you to press the button, per plan and per member. Either way every period is on the record as billed, waived, skipped or still owed.",
      },
      {
        title: "Nobody is ever charged twice",
        body: "A member and a period can only be charged once, enforced by the database rather than by careful code. A redeployed server, a cron that fires twice and an admin clicking bill this period all collide, and exactly one wins.",
      },
      {
        title: "Joining on the 20th costs 10 days, not a month",
        body: "The first period is prorated against the real length of the cycle, so the awkward conversation about a part month never happens.",
      },
      {
        title: "A winter pause does not create arrears",
        body: "Suspend a member and the meter stops. Bring them back and it starts again, with nothing owed for the months they were not flying.",
      },
      {
        title: "Raising your prices does not repricing your members",
        body: "Prices are snapshotted when somebody joins, so existing members keep the price they joined at. Entitlements like the booking window apply to the whole tier immediately.",
      },
      {
        title: "Dues land where the rest of the money already is",
        body: "The same invoice list, the same reports, and the same QuickBooks sync as flight revenue, with a memberships and dues report when you need to read them apart.",
      },
    ],
    bulletsTitle: "Everything in memberships and dues",
    docs: [
      "/docs/billing/set-up-membership-dues",
      "/docs/billing/add-a-member-to-a-plan",
      "/docs/billing/review-account-balances-and-who-owes",
    ],
    faqs: [
      {
        q: "Can I have more than one membership tier?",
        a: "Yes. A plan per tier, priced the way your club actually prices: full, associate, family, social, whatever you run. Each can carry its own joining fee, its own dues, its own booking window and its own per-tail rates.",
      },
      {
        q: "Monthly, quarterly or annual?",
        a: "All three, and you choose whether the whole tier is billed on a common day of the month or each member on their own joining anniversary.",
      },
      {
        q: "What happens to somebody who joins mid-cycle?",
        a: "Their first period is prorated by whole days against the length of that cycle, so a ten-day stub on a quarterly plan is charged as ten days.",
      },
      {
        q: "Can I pause a member instead of cancelling them?",
        a: "Yes. Suspend them and the dues stop. There are no arrears to unpick when they come back.",
      },
      {
        q: "What if I change a plan's price?",
        a: "Existing members keep the price they joined at. Entitlements such as the booking window and tier rates apply to everybody on the tier straight away, which is almost always what you want and worth knowing before you edit.",
      },
      {
        q: "Do you handle a membership agreement?",
        a: "You can record that one is on file. There is no e-signature in the product, and the console says on file rather than signed for exactly that reason.",
      },
    ],
    ctaTitle: "Set the tiers up once and stop thinking about the 1st",
    ctaBody:
      "Joining fees, recurring dues, part months and pauses, on the same invoices and the same reports as your flying.",
  },

  /* ================================================================== */
  /* TRAINING MODULE                                                     */
  /* ================================================================== */
  training: {
    h1: "Part 141 and Part 61 training records software",
    outcomesTitle: "Records that hold up, without a paperwork evening",
    outcomesIntro:
      "A training record has two readers: the instructor filling it in on a Tuesday, and an inspector reading it two years later. Most systems are built for one of them.",
    proof: [
      { value: "4 syllabi", label: "Private, Instrument, Commercial and CFI to start from, or build your own from an empty course" },
      { value: "6 gates", label: "What the Part 141 setting arms, from publish-before-enroll to a blocked graduation" },
      { value: "A.1 to A.17", label: "Endorsements from AC 61-65K Appendix A, with the 90-day expiry on the solo periods" },
      { value: "Offline", label: "Grade at the aircraft with no signal. It syncs when there is." },
    ],
    outcomes: [
      {
        title: "An inspection is one report, not a week of rebuilding paper",
        body: "One row per graded lesson with the date, student, course, lesson, grade, hours, instructor and signature state, exported to a PDF that carries the school name and the window.",
      },
      {
        title: "The record an inspector reads cannot have been tidied up",
        body: "An instructor's signature freezes the lesson. A correction is a new record alongside the original, which stays readable and marked superseded, and both appear in the export.",
      },
      {
        title: "Revising a syllabus does not move a student's goalposts",
        body: "Students are enrolled against a version, not a course. Publishing locks that version permanently, so somebody who started in January is graded and graduated against what they started on.",
      },
      {
        title: "Instructors stop doing paperwork at home",
        body: "Grading is part of the close-out they are already doing. The lesson is preselected, flight time is prefilled from the Hobbs difference and ground from the briefing time. One press signs it.",
      },
      {
        title: "Hours and lessons are allowed to disagree",
        body: "Requirements are tracked apart from lessons, so a student can be on lesson 19 of 21 and still be short. One night cross-country credits several requirements from a single signature.",
      },
      {
        title: "A student who has quietly stopped flying surfaces",
        body: "Silence and pace are read separately and the worse one wins, so somebody who has not flown for two months is visible before they are unrecoverable. It is advisory and gates nothing.",
      },
      {
        title: "Endorsements still say what they said",
        body: "The wording is rendered once at signing and stored verbatim with your name, date and certificate number, because the advisory circular gets revised and a signed endorsement must not change underneath it.",
      },
      {
        title: "Under Part 141, the rules are actually enforced",
        body: "A stage check cannot be signed by the student's own instructor, graduation is blocked while a required hour is unmet, and the certificate number is stored on graduation.",
      },
    ],
    stepsTitle: "Syllabus to certificate",
    steps: [
      {
        title: "Build or fork a syllabus",
        body: "Start from Private, Instrument, Commercial or CFI, or from an empty course. Stages, lessons, tasks with ACS codes, and your own grading marks.",
      },
      {
        title: "Publish the version",
        body: "It names how many lessons are about to freeze. From then on it is read-only, which is the whole point of it.",
      },
      {
        title: "Enroll and fly",
        body: "The student is enrolled against that version. Any course fee is recorded as owed on the spot and billed through the invoices you already run.",
      },
      {
        title: "Grade, sign, graduate",
        body: "Grade off the flight you already booked, or on the phone at the aircraft. Signing freezes the record and posts the hours to every requirement the lesson feeds.",
      },
    ],
    sections: [
      {
        eyebrow: "Part 61 and Part 141",
        title: "One setting, six gates, chosen once per course",
        body: "Part 141 is not a badge on the same screens. It arms a specific set of rules, and the choice cannot be flipped later because that would retro-arm gates against records made under the other regime.",
        points: [
          "Publish the syllabus before anyone can be enrolled",
          "A warning when lessons are taken out of order, never a block",
          "Stage checks by a designated check instructor",
          "Certification of the record before graduation",
          "Graduation blocked while an FAA hour requirement is unmet",
          "The graduation certificate number stored on the record",
        ],
      },
      {
        eyebrow: "Hours",
        title: "The requirements a lesson list cannot answer",
        body: "Hour and landing requirements are tracked in their own right, with their own caps. Post prior training or simulator time against them with the date it was actually flown, and the ceilings are applied when the record is read rather than by discarding the excess.",
        points: [
          "Requirements measured in hours or in events",
          "One flight can credit several requirements at once",
          "Simulator and transfer ceilings applied at read time",
          "Credit prior training from another school",
          "Every hour stays on the ledger with the raw figure beside it",
          "Your own requirements, which can never block a graduation",
        ],
      },
    ],
    bulletsTitle: "Everything in training records",
    docs: [
      "/docs/training/how-training-works",
      "/docs/training/part-61-vs-part-141",
      "/docs/training/build-a-syllabus",
      "/docs/training/grade-a-lesson-at-close-out",
      "/docs/training/sign-an-endorsement",
      "/docs/training/training-records-for-an-faa-inspection",
    ],
    faqs: [
      {
        q: "Does it really do Part 141, or is it a checkbox?",
        a: "Part 141 is the shape the module was built to and Part 61 is the same tables with the gates disarmed. Six rules are enforced: publish before enroll, an out-of-order warning, stage checks by a designated check instructor, certification of the record, graduation blocked on unmet requirements, and the certificate number stored. What it does not do is verify that the person certifying is genuinely your chief instructor. It checks that they hold the permission you gave them.",
      },
      {
        q: "Can I use my own syllabus?",
        a: "Yes, and most schools should. Build your own stages, lessons, tasks and grading marks. The four starter syllabi exist so the first screen is not thirty lessons of typing. None of them is an approved training course outline: approval is per school and per FSDO, so no vendor can ship you one. Treat a template as a starting point to take to your POI.",
      },
      {
        q: "What happens to enrolled students when I revise the syllabus?",
        a: "Nothing happens to them. They are enrolled against a version. You create a new version, edit the copy, publish it and retire the old one. Students on the old revision are graded and graduated against it, including its grading scale. The trade worth knowing up front is that publishing is permanent: there is no unpublish.",
      },
      {
        q: "Can instructors grade without a signal?",
        a: "Yes, on the iPhone app, and it is a large part of why the app exists for CFIs. Two things stated plainly rather than hidden: open each student's enrollment once while you have signal, because the grading screen works from a cached syllabus, and nothing syncs in the background, so a queued grade goes up when somebody next opens Training.",
      },
      {
        q: "Can a signed lesson be corrected?",
        a: "It can be amended, which creates a correction alongside it. The original stays signed, readable and marked superseded, and both rows appear in an export. Amending requires a typed reason, and the moment you amend, the credited hours are reversed until the correction is signed.",
      },
      {
        q: "Does it track FAA hour requirements or only lessons?",
        a: "Both, separately, and they are meant to disagree. That is the question the module exists to answer: a student can be nearly through the lesson list and still be short of a requirement, and one night cross-country can credit several requirements from a single signature.",
      },
      {
        q: "Can I credit training a student did somewhere else?",
        a: "Yes, posted against a requirement with the source and the date it was actually flown. Ceilings for simulator time and transfer credit are applied when the record is read, so posting thirty hours against a capped requirement may credit fewer, and every hour still shows with the raw figure beside it.",
      },
      {
        q: "Do endorsements expire?",
        a: "The 90-day solo endorsements carry their expiry and reach a report and a nightly digest. Renewal signs a fresh endorsement rather than moving a date, so the old text stays on the record.",
      },
    ],
    ctaTitle: "Put one student on a syllabus and see the record it makes",
    ctaBody:
      "Fork a starter syllabus, enroll somebody, and grade a lesson off a flight. Fifteen minutes, and it is the whole loop.",
    closingTitle: "Training records built for the second reader.",
    closingBody:
      "The instructor on Tuesday and the inspector two years later want different things from the same record. This one is written for both.",
  },

  instruction: {
    h1: "Instructor rates, pairing and availability",
    outcomesTitle: "The commercial half of instruction",
    outcomesIntro:
      "Who may teach whom, at what rate, and when they are free. The syllabus and the lesson grades live under training records; this is what the booking form and the invoice read.",
    outcomes: [
      {
        title: "The dual rate on the invoice is the rate you set",
        body: "Instruction is priced per rating and read at close-out, so a dual and a ground lesson bill from the same place without anybody retyping a figure.",
      },
      {
        title: "Booking only offers pairings that are allowed",
        body: "Assign students to instructors and the booking form stops offering the combinations you did not intend, rather than refusing them after the fact.",
      },
      {
        title: "Nobody books a CFI on their day off",
        body: "Weekly availability is what self-booking offers, so the hours an instructor is genuinely free are the hours members can take.",
      },
    ],
    bulletsTitle: "Everything in instruction",
    docs: [
      "/docs/billing/set-aircraft-and-instruction-rates",
      "/docs/scheduling/set-your-weekly-availability",
      "/docs/scheduling/reservation-types",
    ],
    faqs: [
      {
        q: "How is this different from training records?",
        a: "This page is rates, pairing and availability: the things scheduling and billing read. Training records is the syllabus, the lessons, the hours and the endorsements. They are deliberately separate because a club with no syllabus still needs instruction rates.",
      },
      {
        q: "Can each instructor bill a different rate?",
        a: "Rates are set per rating rather than per instructor today, so every CFI teaching a given rating bills the same figure. Schools that need a different number for one instructor use a booking-level price override.",
      },
      {
        q: "Does availability stop the front desk booking somebody?",
        a: "Availability is what self-booking offers. The desk can still book outside it, which is what you want when an instructor has agreed to come in.",
      },
    ],
    ctaTitle: "Set your instruction rates once",
    ctaBody:
      "Rates per rating, pairings that booking respects, and weekly hours members can actually take.",
  },

  /* ================================================================== */
  /* MAINTENANCE MODULE                                                  */
  /* ================================================================== */
  maintenance: {
    h1: "Aircraft maintenance and squawk tracking software",
    outcomesTitle: "The aeroplane that should not fly, cannot be booked",
    outcomesIntro:
      "Three different things live under maintenance, and only one of them stops a flight. Being clear about which is which is most of the value.",
    proof: [
      { value: "3 things", label: "An inspection is what an aircraft owes, a squawk is what somebody found, grounding is what stops a booking" },
      { value: "2 of 7", label: "Of the standard airworthiness presets, only the annual and the 100-hour ground the aircraft when they come due" },
      { value: "Everyone", label: "Any member can report a squawk, from the ramp, on the phone, at close-out" },
      { value: "Never edited", label: "A note on a squawk cannot be changed or deleted afterwards, by anybody, including us" },
    ],
    outcomes: [
      {
        title: "An overdue annual takes the aircraft off the board by itself",
        body: "An inspection carrying the grounding flag grounds its tail the moment it comes due, with the reason Maintenance. Signing off the last one puts the aircraft back on the line on its own.",
      },
      {
        title: "Squawks stop living in a group text",
        body: "Anybody who flies can report one from the aircraft page or from the prompt that opens at close-out, against a specific tail, where the tech will actually look for it.",
      },
      {
        title: "The tech and the front desk read the same screen",
        body: "One work queue for the whole school, worst first, with the current meter and the most urgent item per tail. Nobody has to ask what is due.",
      },
      {
        title: "Downtime is planned, not discovered",
        body: "Put the shop visit on the dispatch board as a maintenance booking. It blocks the window, carries nobody, and is never invoiced.",
      },
      {
        title: "The record of what was done cannot be quietly changed",
        body: "Notes on a squawk are a running thread stamped with who wrote them, and none of them can be edited or deleted. A mistake is corrected by adding another note, which is what an account of work on an aircraft has to mean.",
      },
      {
        title: "Resolved and verified are two different claims",
        body: "Verifying is a separate second stamp, and a squawk can be resolved without ever being verified. The distinction is kept because in a shop it is a real one.",
      },
      {
        title: "Nobody can book a grounded aircraft by accident",
        body: "Every booking type except maintenance is refused on a grounded tail, on the board, in the app and on a member's self-booking, with the reason attached.",
      },
      {
        title: "Money stays out of the hangar",
        body: "A technician can be given the maintenance and fleet views without seeing a single invoice, rate or balance anywhere in the product.",
      },
    ],
    stepsTitle: "From a soft brake to a return to service",
    steps: [
      {
        title: "Somebody reports it",
        body: "A title, a description and a tail, from the console or from the phone at the aircraft. The close-out prompts for one after the meters go in.",
      },
      {
        title: "Decide whether it flies",
        body: "A squawk does not ground anything on its own. Ground the aircraft if it should not go, and every booking except maintenance is refused until it comes back.",
      },
      {
        title: "Work it",
        body: "Notes record progress without closing anything: the part is ordered, it is waiting on a hangar slot, it did not repeat. None of them can be edited later.",
      },
      {
        title: "Resolve and return to service",
        body: "The date the work finished and what was done. Verify separately if your shop works that way, then return the aircraft to service.",
      },
    ],
    sections: [
      {
        eyebrow: "Three things, one page",
        title: "Only grounding stops a booking, and that is on purpose",
        body: "An aircraft with six open squawks and an overdue annual is still bookable unless something grounded it. Making an open squawk block a flight would mean every trivial discrepancy became an operational decision, so the grounding decision stays explicit and visible.",
        points: [
          "Inspections count down, on the meter or the calendar",
          "Squawks are discrepancies, filed against one tail",
          "Grounding is a flag with a reason on the aircraft itself",
          "An inspection can be set to ground its tail when it comes due",
          "Whoever files a squawk can ground the aircraft with it",
          "Return to service is an explicit action by an admin",
        ],
      },
    ],
    bulletsTitle: "Everything in maintenance",
    docs: [
      "/docs/maintenance/how-maintenance-tracking-works",
      "/docs/maintenance/report-a-squawk",
      "/docs/maintenance/resolve-a-squawk",
      "/docs/maintenance/ground-an-aircraft",
      "/docs/maintenance/book-an-aircraft-in-for-maintenance",
      "/docs/maintenance/who-can-do-what-in-maintenance",
    ],
    faqs: [
      {
        q: "Does this replace my maintenance logbooks?",
        a: "No, and it does not try to. The aircraft logbooks required by 14 CFR 91.417 are the maintenance record, and they are kept by the person who did the work. This is a tracking system: it counts down to what is due, keeps the aircraft off the schedule when it should not fly, and keeps a record of the sign-offs you entered. Those are different jobs, and a tracking system that called itself a logbook would be the wrong answer to an inspector.",
      },
      {
        q: "Does it track Airworthiness Directives?",
        a: "It keeps the compliance record for the ADs you enter: the number, the revision, the meter readings at compliance, who certified it, and a report that prints the history. What it does not do is tell you which directives apply to your fleet, and it never decides that one does not apply. That determination belongs to a certificated person. If you already run ADlog, AVTRAK or similar, you can name it and we propose nothing.",
      },
      {
        q: "What happens when an inspection lapses?",
        a: "It shows as overdue and notifies your admins and technicians. Whether it also grounds the aircraft is a switch on the inspection. Of the standard airworthiness presets, only the annual and the 100-hour ground a tail by default.",
      },
      {
        q: "Can my mechanic have access without seeing the money?",
        a: "Yes. The technician role opens maintenance and the fleet, and reaches no invoice, rate or balance anywhere in the product. It is the reason the role exists.",
      },
      {
        q: "Does it stop somebody booking a grounded aircraft?",
        a: "Yes. Every booking type except maintenance is refused with the reason. Grounding does not cancel bookings that are already on the aircraft, so the desk can see what has to be moved rather than having flights disappear.",
      },
      {
        q: "How do I schedule downtime?",
        a: "Book it. Choose the maintenance reservation type, pick the aircraft and the window, and save. Nobody is assigned to it, it blocks the whole window on the board, and it is never invoiced.",
      },
      {
        q: "Who can report a squawk?",
        a: "Anybody who flies, including students and renters, from the aircraft page or from the prompt that appears at close-out. Resolving, verifying and writing notes is limited to owners, admins and technicians.",
      },
    ],
    ctaTitle: "Put your fleet's inspections in and see what is actually due",
    ctaBody:
      "The standard airworthiness set is a few clicks and a last-done date per tail. Everything else follows from it.",
    closingTitle: "Airworthiness the schedule respects.",
    closingBody:
      "The due date, the squawk and the grounding all reach the same board the desk is booking from.",
  },

  inspections: {
    h1: "Aircraft inspection tracking software",
    outcomesTitle: "Due dates that are right, including the awkward ones",
    outcomesIntro:
      "Inspection tracking is arithmetic, and most of the cost of getting it wrong is invisible until the day somebody notices an aircraft has been flying out of annual.",
    proof: [
      { value: "7 presets", label: "The standard airworthiness set, ticked to start. Untick what your operation does not owe." },
      { value: "3 ways", label: "Count on the meter, on the calendar, or as a single one-off date" },
      { value: "28 Feb", label: "An annual signed 15 February is good through the end of February next year, not 365 days later" },
      { value: "Tach or Hobbs", label: "Each inspection counts the meter you choose, which is usually not your billing meter" },
    ],
    outcomes: [
      {
        title: "Setting up the standard inspections takes minutes, not a spreadsheet",
        body: "The airworthiness set arrives ticked. Untick what does not apply, say when each was last done, pick the tails, and every aircraft starts counting from real numbers.",
      },
      {
        title: "Calendar months are counted as calendar months",
        body: "A regulation written in months runs to the end of the month, so an annual signed on 15 February is good through 28 February the following year. Tracking that as 365 days quietly shortens every one of your annuals.",
      },
      {
        title: "An hour-based inspection never invents a date",
        body: "A 100-hour depends entirely on how much the aircraft flies, so it is reported against the meter and not averaged into a fake due date you might plan around.",
      },
      {
        title: "You inspect on tach and bill on Hobbs without confusion",
        body: "Each inspection names the meter it means and shows both numbers, so a row reads due at 1250.0 tach, now 1237.6 rather than leaving anyone to work out which clock it meant.",
      },
      {
        title: "Coming due tells somebody, at the lead you chose",
        body: "The warning lead does both jobs: it is when the row turns to due soon and when the email and push go out. There is no separate cosmetic idea of soon that notifies nobody.",
      },
      {
        title: "Signing off starts the next one from the right numbers",
        body: "Record the day the work actually finished and correct the meter reading, and a repeating inspection immediately begins counting again from there.",
      },
    ],
    stepsTitle: "Four steps to a fleet that counts itself",
    steps: [
      {
        title: "Add the standard set",
        body: "Leave the mode on the standard airworthiness set and untick anything your operation does not owe, such as the 100-hour or the IFR checks.",
      },
      {
        title: "Say when each was last done",
        body: "The date and the meter reading from the last time the work was actually performed. This is the single field most worth getting right.",
      },
      {
        title: "Pick the tails",
        body: "A rule lives once for the school. Attaching it to an aircraft creates the live inspection that counts down for that tail.",
      },
      {
        title: "Sign off when it is done",
        body: "The completion date and the corrected reading. A repeating inspection starts again from those numbers, and a grounded tail returns to service by itself.",
      },
    ],
    sections: [
      {
        eyebrow: "Intervals",
        title: "Hours, days, weeks, calendar months, or a single date",
        body: "How an inspection is counted is chosen when you create it and is never silently converted into something else. That rigidity is the point: a 100-hour and an annual are different kinds of obligation and blending them is how due dates go wrong.",
        points: [
          "On the meter, counting tach or Hobbs",
          "On the calendar, in days or weeks",
          "In calendar months, which run to the end of the month",
          "One-off, for a single date that never returns",
          "A warning lead per inspection, in hours or days",
          "A grounding flag per inspection, on or off",
        ],
      },
      {
        eyebrow: "The record",
        title: "What you signed off, and when, kept permanently",
        body: "Signing an inspection off keeps what was done, the meter readings at the time and who certified it. Set an inspection's source to Airworthiness Directive and it also carries the AD number and revision into a compliance log and a report you can print.",
        points: [
          "Permanent compliance record per sign-off",
          "Meter readings captured at compliance",
          "AD number and revision date when the source is a directive",
          "An airworthiness compliance report that prints the history",
          "Custom inspections for anything your shop tracks",
          "One-off reminders, such as a prop back from overhaul",
        ],
      },
    ],
    bulletsTitle: "Everything in inspection tracking",
    docs: [
      "/docs/maintenance/add-the-standard-airworthiness-inspections",
      "/docs/maintenance/add-your-own-inspection",
      "/docs/maintenance/set-when-an-inspection-was-last-done",
      "/docs/maintenance/sign-off-an-inspection",
      "/docs/maintenance/when-aerscheduler-grounds-an-aircraft",
      "/docs/maintenance/track-airworthiness-directives",
    ],
    faqs: [
      {
        q: "Which inspections come as presets?",
        a: "The standard airworthiness set: annual, 100-hour, VOR check, Airworthiness Directive review, transponder check, ELT, and static system and altimeter. Oil change and ELT battery replacement sit alongside them as common shop extras. Everything is ticked to start and you untick what your operation does not owe.",
      },
      {
        q: "Does an overdue inspection ground the aircraft?",
        a: "Only if that inspection carries the grounding flag. Of the standard set, exactly two do: the annual and the 100-hour. The rest come due, show as overdue and notify people without taking the aircraft off the board.",
      },
      {
        q: "What about an aircraft due on hours rather than a date?",
        a: "Track it on the meter. It counts flying hours against the tach or the Hobbs, whichever you tell it to count, and it deliberately never shows a due date, because a 100-hour depends on how much the aircraft flies and an averaged date would be a guess presented as a fact.",
      },
      {
        q: "Can I track my own inspections, not just the regulatory ones?",
        a: "Yes. Create a recurring inspection on any interval, or a one-off reminder for a single date. Oil changes, hose replacements, a prop coming back from the shop.",
      },
      {
        q: "What if I set the last-done reading wrong?",
        a: "Correct it. When you sign an inspection off you set the completion date and the meter reading, and a repeating inspection immediately recounts from those numbers.",
      },
      {
        q: "Does removing an inspection rule affect other aircraft?",
        a: "Yes, and it is worth knowing before you press it. A rule lives once for the school and covers every tail attached to it, so deleting the rule stops tracking on all of them. To take one aircraft off, change which tails it covers instead.",
      },
    ],
    ctaTitle: "See what your fleet actually owes",
    ctaBody:
      "Add the standard set, give each tail a last-done date, and the countdown is running before you finish your coffee.",
  },

  /* ================================================================== */
  /* REPORTING MODULE                                                    */
  /* ================================================================== */
  reports: {
    h1: "Flight school reporting software and dashboards",
    outcomesTitle: "Answers, without asking anyone to build a report",
    outcomesIntro:
      "The reports a school needs are not exotic. What is hard is getting numbers that agree with each other, that the right people can see, and that arrive without somebody remembering to run them.",
    proof: [
      { value: "5 categories", label: "Financial, operations, fleet, people and compliance, each with its own permission" },
      { value: "CSV and PDF", label: "Every matching row, with a totals row, in a file your accountant can open" },
      { value: "Scheduled", label: "Any saved view can email itself daily, weekly or monthly, including to an outside address" },
      { value: "One engine", label: "Tiles, exports and emails all run the same reports, so a figure and its report cannot disagree" },
    ],
    outcomes: [
      {
        title: "You find out which tail earns its keep and which is decoration",
        body: "Revenue against hours for every resource, including the ones that flew nothing in the window. The zero rows are the point, and they are the ones most systems drop.",
      },
      {
        title: "You see the gap between an aircraft being blocked out and earning",
        body: "Booked, flown and billed hours side by side, which catches both an aircraft held and not flown and flying that was never billed.",
      },
      {
        title: "You know which instructor is full and which is idle without asking",
        body: "Ground and flight hours per CFI, distinct students seen, and cancellation rate. Instructors with no bookings still appear at zero rather than vanishing.",
      },
      {
        title: "You can tell revenue from cash, and defend the difference",
        body: "Revenue counts an invoice on the day it was raised, payments on the day it was paid, and every report prints which basis it used under the date picker.",
      },
      {
        title: "Your dispatcher runs operations without browsing revenue",
        body: "Permissions are by category and enforced on every run, not just hidden in the menu. A dispatcher sees no financial heading at all: no padlock, no upgrade prompt.",
      },
      {
        title: "You hand your accountant a file instead of an afternoon",
        body: "Export every matching row with plain numeric columns and a totals row, or schedule the saved view to email itself to them on the first of the month.",
      },
      {
        title: "Money left on the table surfaces before month end",
        body: "A needs-attention list counts flights closed out but never invoiced, and bookings that flew and were never closed out, each over its own window. Click a count and land on the report, pre-filtered.",
      },
      {
        title: "Nobody has to build a report, they filter one and save it",
        body: "Filter, group, choose columns, save it as a view, share it with the school, pin it to a dashboard. That is how a fixed set of reports becomes the thirty a school actually asks for.",
      },
    ],
    stepsTitle: "Question to answer, and then to nobody's inbox",
    steps: [
      {
        title: "Pick the nearest report",
        body: "Grouped into financial, operations, fleet, people and compliance. Categories you cannot run are simply absent.",
      },
      {
        title: "Shape it",
        body: "Filter with real conditions, group to rank aircraft or instructors, and choose the columns. Grouping adds a share-of bar so ranking needs no arithmetic.",
      },
      {
        title: "Save the view",
        body: "Name it and optionally share it with the school. Sharing never grants access: somebody who cannot run the report still cannot see it.",
      },
      {
        title: "Export, email or pin it",
        body: "CSV or PDF, a schedule that emails itself on a cadence, or a tile on your own dashboard with its own date range.",
      },
    ],
    sections: [
      {
        eyebrow: "Numbers that agree",
        title: "Why two reports disagreeing is usually correct",
        body: "An invoice raised in June and paid in August is June's revenue and August's cash, and both are right. Every report states its date basis on the page rather than leaving you to guess, and windows are resolved in the airport's own time zone so a tile and the report behind it cannot drift by six hours at each end.",
        points: [
          "The date basis printed under every date picker",
          "Windows resolved in your school's own time zone",
          "Ratio columns re-derived rather than averaged",
          "A dash means nothing recorded, not zero",
          "Totals and sorting run over every matching row, not the page",
          "Cancelled bookings and voided invoices excluded consistently",
        ],
      },
      {
        eyebrow: "Your dashboard",
        title: "A board per person, not one the school argues about",
        body: "Everybody builds their own. Drag tiles, resize them, and give each its own date range and comparison, which is how revenue this week and revenue this month sit side by side and are both right. Click any figure and the report behind it opens.",
        points: [
          "Number, bar, line and table tiles",
          "Per-tile date range and comparison against the previous period or last year",
          "Pin a saved view straight from the report toolbar",
          "A needs-attention list with its own windows per item",
          "Click through from a figure to the report that produced it",
          "Tiles you have lost access to are dropped, and the rest still renders",
        ],
      },
    ],
    bulletsTitle: "Everything in reporting",
    docs: [
      "/docs/reports/how-reporting-works",
      "/docs/reports/report-catalog",
      "/docs/reports/save-a-report-view",
      "/docs/reports/email-a-report-on-a-schedule",
      "/docs/reports/build-your-overview-dashboard",
      "/docs/reports/numbers-dont-match",
    ],
    faqs: [
      {
        q: "Can I see revenue per aircraft?",
        a: "Yes. Revenue opens already grouped by resource, and can be cut by instructor, customer or lesson type instead. The fleet report puts revenue against hours for every tail, including the ones that did not fly.",
      },
      {
        q: "Can I stop dispatchers seeing money?",
        a: "Yes, and it is the default. Financial reports are owners and admins only. A dispatcher sees no financial heading at all, and the permission is checked on the server every time a report is run rather than only hidden in the menu.",
      },
      {
        q: "Can I export to my accountant?",
        a: "Three ways. CSV with every matching row, plain numeric columns and a totals row. PDF for something to hand over. Or schedule the saved view monthly and add your accountant's address, which owners and admins can do.",
      },
      {
        q: "Can I build my own report?",
        a: "There is no blank-report builder, deliberately. You take the nearest report, filter it, group it, choose columns and save it as a view, which can then be shared, pinned and scheduled. That is how schools get the specific answers they want without maintaining a query tool.",
      },
      {
        q: "Can I get a report emailed automatically?",
        a: "Daily, weekly or monthly, at an hour on your school's clock. The cadence decides the window, so a weekly email always covers last week rather than whatever dates happened to be on screen when the view was saved. Monthly caps at the 28th so it never skips February.",
      },
      {
        q: "Why do two reports show different totals for the same dates?",
        a: "Usually the date basis. Revenue counts an invoice when it was raised, payments when it was paid, and both are correct. Other common causes are cancelled bookings, which are excluded from utilization and the flight log and have their own report, and voided invoices, which are excluded from every financial report.",
      },
      {
        q: "Is there reporting in the mobile app?",
        a: "No. Reporting is a web console feature. The app covers the ramp and the flight; reports are read on a laptop or an iPad browser.",
      },
      {
        q: "Can I see who changed something?",
        a: "Owners and admins get an audit log with who did what, from which surface, and a field-by-field before and after. It is append-only: there is no edit and no delete for anybody, including owners.",
      },
    ],
    ctaTitle: "Ask your fleet a question and get an answer today",
    ctaBody:
      "Every report filters, groups, saves, exports and schedules. There is nothing to build first.",
    closingTitle: "Every number, and the report behind it.",
    closingBody:
      "Revenue, utilization, receivables and currency, on a dashboard you build and a schedule you set once.",
  },

  utilization: {
    h1: "Aircraft utilization tracking software",
    outcomesTitle: "Booked, flown, billed. The two gaps are the money",
    outcomesIntro:
      "Utilization is only useful when it is three numbers rather than one. The interesting part is never the hours flown, it is the distance between hours held, hours flown and hours billed.",
    outcomes: [
      {
        title: "You see the aircraft that is busy on the board and idle in the air",
        body: "Booked hours next to flown hours exposes the tail that is permanently reserved and rarely goes anywhere, which is a scheduling problem dressed up as a demand problem.",
      },
      {
        title: "You see the flying that was never billed",
        body: "Flown hours next to billed hours is the other gap, and it is the one that is quietly worth money every month.",
      },
      {
        title: "The aircraft that flew nothing still appears",
        body: "Zero rows are kept rather than dropped, because a tail earning nothing is exactly the row you opened the report to find.",
      },
      {
        title: "Efficiency you can actually read",
        body: "Ratio columns are re-derived from the two columns beside them rather than averaged, so a group total always agrees with the numbers it is sitting under.",
      },
      {
        title: "Rank the fleet without doing arithmetic",
        body: "Group by resource and a share-of bar appears next to each row. Export it, pin it to your dashboard, or have it email itself every month.",
      },
    ],
    bulletsTitle: "Everything in utilization reporting",
    docs: [
      "/docs/reports/run-a-report",
      "/docs/reports/group-a-report",
      "/docs/reports/export-a-report-to-csv",
      "/docs/reports/numbers-dont-match",
    ],
    faqs: [
      {
        q: "What counts as a booked hour?",
        a: "The hours the aircraft was held on the schedule in the window, on the date of the booking. Cancelled bookings are excluded and have their own report.",
      },
      {
        q: "Why does efficiency look bad on a fleet I know is busy?",
        a: "Efficiency is flown over booked, and an overnight trip holds the aircraft for the whole trip while it is away earning rather than idle. Group by overnight to read the two populations apart, and compare billed rather than flown on trips, because an overnight minimum is charged on top of what was flown.",
      },
      {
        q: "Can I see utilization per instructor or per customer instead?",
        a: "Group the report differently, or use the instructor activity and customer activity reports, which cover hours, distinct students and cancellation rate.",
      },
      {
        q: "Can I get this monthly without remembering to run it?",
        a: "Save the view and give it a monthly schedule. The cadence sets the window, so each email covers the previous calendar month exactly, with no gaps and no double counting.",
      },
    ],
    ctaTitle: "Find out what each tail actually returns",
    ctaBody:
      "Booked against flown against billed, per aircraft, for any window you choose.",
  },

  /* ================================================================== */
  /* ACROSS EVERY MODULE                                                 */
  /* ================================================================== */
  "people-roles": {
    h1: "Flight school staff and student management",
    outcomesTitle: "One roster the whole operation reads from",
    outcomesIntro:
      "Every module asks the same question about a person: what are they allowed to do here. Answering it in one place is what stops the other five disagreeing.",
    outcomes: [
      {
        title: "Somebody gets exactly the access their job needs",
        body: "Seven roles covering owner, admin, dispatcher, instructor, student, renter and technician, and a single extra permission can be granted from a person's own record when a role is nearly right.",
      },
      {
        title: "Getting people in is not a data-entry project",
        body: "Invite by email with the roles already attached, or share a join code and approve the requests that come back.",
      },
      {
        title: "Somebody who should not fly can be stopped without being deleted",
        body: "Ground a member and they stay on the roster with their history intact, unable to be put on a booking until you lift it.",
      },
      {
        title: "People who fly at two schools are one person",
        body: "A member can belong to more than one organization and switch between them, which matters for instructors far more often than schools expect.",
      },
    ],
    bulletsTitle: "Everything in people and roles",
    docs: [
      "/docs/getting-started/roles-and-permissions",
      "/docs/getting-started/permissions-and-grants",
      "/docs/getting-started/invite-people",
      "/docs/getting-started/ground-archive-or-remove-a-member",
      "/docs/getting-started/switch-between-schools",
    ],
    faqs: [
      {
        q: "Is there a per-user fee?",
        a: "No. Pricing is per aircraft. Instructors, students, renters, dispatchers and technicians are unlimited.",
      },
      {
        q: "Can somebody have more than one role?",
        a: "Yes. An instructor who also rents, or an owner who dispatches, holds both, and the product gives them the union of what those roles allow.",
      },
      {
        q: "Can I give one person a single extra permission?",
        a: "Yes, from that person's own record. Grants only ever widen what somebody can do, so a treasurer can be given invoices and revenue reports without being made an admin.",
      },
      {
        q: "How do people join?",
        a: "An emailed invite with the roles already attached, or a join code they use themselves, with join requests you approve if the school is private.",
      },
    ],
    ctaTitle: "Get your people in this afternoon",
    ctaBody:
      "Invite by email or hand out a join code. Every role after that is a switch, not a migration.",
  },

  mobile: {
    h1: "The flight school app for iPhone",
    outcomesTitle: "Built for the ramp, not shrunk from a desktop",
    outcomesIntro:
      "The app is not the console made small. It carries the handful of jobs that genuinely happen away from a desk, and it does them without a signal where it can.",
    outcomes: [
      {
        title: "Instructors grade at the aircraft, offline",
        body: "Grades are held on the device and go up when there is a signal, with a refusal shown in full rather than swallowed. It is the single strongest reason a CFI opens the app.",
      },
      {
        title: "Squawks get reported while somebody is still looking at the problem",
        body: "From any aircraft page, or from the prompt that opens by itself once the meters go in at close-out.",
      },
      {
        title: "Members book on the way to the airport",
        body: "The same rules, the same availability, and the slot that just opened taken from a phone in a car park.",
      },
      {
        title: "Standby offers can be accepted from the notification",
        body: "Accept, decline and view are on the push itself, which is what makes a time-limited offer workable at all.",
      },
    ],
    bulletsTitle: "Everything in the app",
    docs: [
      "/docs/getting-started/the-mobile-app",
      "/docs/training/grade-lessons-offline-on-the-app",
      "/docs/scheduling/standby-and-slot-offers",
    ],
    faqs: [
      {
        q: "Does the app cost extra?",
        a: "No. It is included with every plan at the same per-aircraft price.",
      },
      {
        q: "Is there an Android app?",
        a: "Not today. The iPhone app is live on the App Store, and the web console runs in any mobile browser in the meantime.",
      },
      {
        q: "Can I run reports on the phone?",
        a: "No. Reporting is a web console feature. The app covers the ramp, the booking and the flight.",
      },
      {
        q: "Does it work without a signal?",
        a: "Lesson grading does, which is the case that matters at a rural field. Open the student's enrollment once while you have a signal, because the grading screen works from a cached syllabus, and the queued grade goes up when Training is next opened.",
      },
    ],
    ctaTitle: "Put the ramp in everybody's pocket",
    ctaBody:
      "Included on every plan, on the App Store, and the same operation as the desk.",
  },

  integrations: {
    h1: "Flight school software integrations",
    outcomesTitle: "Connect what you already run",
    outcomesIntro:
      "Every integration here is on every plan. There is no premium connector tier, because charging twice for the tools a school already pays for is not a business model we wanted.",
    outcomes: [
      {
        title: "Paid invoices reach your books without retyping",
        body: "QuickBooks Online receives each one as a Sales Receipt the moment it is paid, matched to the customer by email, once and only once.",
      },
      {
        title: "Flights appear in the calendar people actually look at",
        body: "Google Calendar syncs into whichever calendar you pick, and Apple Calendar and Outlook subscribe through a private link you can regenerate.",
      },
      {
        title: "Money lands in your own account",
        body: "Stripe is connected as your school's own account, so payouts and the payout schedule stay yours and card details never touch AerScheduler.",
      },
    ],
    bulletsTitle: "Available now",
    docs: [
      "/docs/billing/send-paid-invoices-to-quickbooks",
      "/docs/scheduling/sync-your-personal-calendar",
      "/docs/billing/turn-on-invoicing-and-card-payments",
    ],
    faqs: [
      {
        q: "Are integrations on every plan?",
        a: "Yes. Stripe, Google Calendar, Apple Calendar, Outlook and QuickBooks Online are included at the standard per-aircraft price. There is no connector tier.",
      },
      {
        q: "Does calendar sync go both ways?",
        a: "No. Flights go from AerScheduler into your calendar. Editing or deleting the event in Google, Apple Calendar or Outlook does not change the booking.",
      },
      {
        q: "Which QuickBooks?",
        a: "QuickBooks Online. Paid invoices sync as Sales Receipts. Unpaid and voided invoices never sync, and a refund made inside Stripe does not reverse the Sales Receipt.",
      },
      {
        q: "Is there an API?",
        a: "Yes, a documented REST API, available on the Enterprise plan. The reference is in the developer documentation.",
      },
    ],
    ctaTitle: "Connect Stripe, your calendar and QuickBooks",
    ctaBody:
      "All of it on the standard plan, set up from the integrations page in a few minutes each.",
  },
};
