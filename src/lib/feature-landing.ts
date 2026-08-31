import type { FeatureSlug } from "@/lib/features";

/**
 * Landing-page content for feature pages.
 *
 * Separate from `lib/features.ts` because that one is the registry (what pages
 * exist, what they are called) and is parsed as a bare literal by
 * `scripts/build-search-index.mjs`. This one is prose on a marketing cadence.
 *
 * THE LENGTH BUDGET IS THE POINT. The first version of these pages had three
 * separate feature lists on every page: outcomes, then a bulleted deep-dive per
 * section, then the full capability list, then FAQs, then two grids of cards.
 * Nobody reads that. It tested as a wall of text and it was one.
 *
 * So the shape below is capped, deliberately, and the caps are not suggestions:
 *
 *   statement   one sentence, over a photograph. The single strongest claim.
 *   proof       exactly 3, and NOT a count of anything. "8 reservation
 *               types" and "5 report categories" are inventory: they read as
 *               a spec sheet and a buyer does not care how many kinds of a
 *               thing exist. Each one is a CONSEQUENCE instead, in three or
 *               four words: "Refused, not flagged", "One invoice each",
 *               "Grounds itself", "No per-user fee".
 *   outcomes    exactly 3, body under about 20 words.
 *   steps       exactly 4, body under about 14 words.
 *   sections    at most 2, at most 3 points each.
 *   faqs        at most 5.
 *   docs        at most 5, rendered as bare links with no descriptions.
 *
 * If something genuinely important does not fit, it belongs in the help
 * documentation, and the page should link to it rather than swallow it. The
 * capability list still exists further down the page, but it renders as a plain
 * scannable list rather than a grid of bordered cards, because it is reference
 * material for somebody checking a box, not an argument.
 *
 * House rules for the writing:
 *  - An outcome is a RESULT, never a feature.
 *  - Specifics beat adjectives, but a number is only worth printing when it is
 *    a consequence (a price, a limit somebody hits) and never when it is a
 *    count of our own internal taxonomy.
 *  - Every claim is true of the shipped product. This copy was written against
 *    the help docs in `src/content/docs`, so it is one hop from being checked.
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
  /** Overrides the H1, to put the search phrase in the heading. */
  h1?: string;
  /** One sentence over the photograph. Keep it short enough to set at 3xl. */
  statement: string;
  /** Exactly three. They sit under the statement, inside the photo band. */
  proof: LandingProof[];
  outcomesTitle: string;
  outcomes: LandingOutcome[];
  stepsTitle?: string;
  steps?: LandingStep[];
  sections?: LandingSection[];
  /** Heading over the capability list. Defaults to "Everything else in here". */
  bulletsTitle?: string;
  /** Help-article hrefs, resolved against `lib/docs.ts` at render. */
  docs?: string[];
  faqs?: LandingFaq[];
  ctaTitle: string;
  ctaBody: string;
  closingTitle?: string;
  closingBody?: string;
};

export const FEATURE_LANDING: Partial<Record<FeatureSlug, FeatureLanding>> = {
  /* ================================================================== */
  /* SCHEDULING                                                          */
  /* ================================================================== */
  scheduling: {
    h1: "Flight school scheduling and dispatch software",
    statement: "If it is not on the board, it did not happen.",
    proof: [
      { value: "Refused, not flagged", label: "A clash is stopped when the booking saves, from every surface" },
      { value: "Airport time", label: "9:00 AM stays 9:00 AM, whoever is looking and from where" },
      { value: "Live", label: "The board redraws as other people book, move and cancel" },
    ],
    outcomesTitle: "What changes on Monday",
    outcomes: [
      {
        title: "The double-booking argument stops",
        body: "Conflicts are refused when the booking saves, from every surface, including an edit two weeks later.",
      },
      {
        title: "No flight goes quietly unbilled",
        body: "Every booking carries a badge for where it is stuck, so the one nobody closed out is visible today, not at month end.",
      },
      {
        title: "The desk stops rescheduling for people",
        body: "Members move their own bookings inside your rules. Drag a block, drop it on another tail, undo it if you were wrong.",
      },
    ],
    stepsTitle: "Empty lane to paid invoice",
    steps: [
      { title: "Book it", body: "The type decides the resource, who may be on it, and how many." },
      { title: "Ramp out", body: "Departure Hobbs and tach. The aircraft comes off the line." },
      { title: "Ramp in", body: "Return readings, fuel, instruction time. Oddities flagged before you save." },
      { title: "Sign off", body: "Each pilot confirms with their PIN. The invoice raises itself." },
    ],
    sections: [
      {
        eyebrow: "The board",
        title: "Filtering dims. It never hides.",
        body: "A schedule with rows secretly removed is how somebody books over a flight that was always there. Only Resource and Location take lanes away.",
        points: [
          "Day, week, month and list views",
          "Aircraft, simulators and classrooms as lanes",
          "Updates hold while somebody is mid-drag",
        ],
      },
      {
        eyebrow: "Your rules",
        title: "Off by default, every one of them",
        body: "Turn on only what your school actually runs, and a refusal names the rule and the number rather than just saying no.",
        points: [
          "Cancel locks and late-cancel fees",
          "Caps on booking length and bookings held",
          "Checkouts and a card on file before self-booking",
        ],
      },
    ],
    docs: [
      "/docs/scheduling/how-scheduling-works",
      "/docs/scheduling/reservation-types",
      "/docs/scheduling/booking-rules-and-settings",
      "/docs/scheduling/ramp-out-and-ramp-in",
      "/docs/scheduling/standby-and-slot-offers",
    ],
    faqs: [
      {
        q: "What actually stops a double booking?",
        a: "The conflict check runs when the booking saves, not as a warning afterwards, and it covers the aircraft and everybody on the flight. The same check runs from the dispatch board, from a member's phone, and on an edit weeks later.",
      },
      {
        q: "What happens when an aircraft goes down mid-week?",
        a: "Ground it and it stops being bookable everywhere immediately, with the reason attached. Bookings already on it stay visible so the desk can move them. You can also put the downtime on the board as a maintenance reservation, which is never billed.",
      },
      {
        q: "Can I control how far ahead and how many bookings someone holds?",
        a: "Yes. Cap upcoming bookings per member, cap how long one booking can run, and set how far ahead each membership tier may book. Nobody can book more than 365 days out. A repeating series is checked for every date it would create and refused before anything is booked.",
      },
      {
        q: "Does it handle simulators and classrooms?",
        a: "They are first-class resources with their own lanes and their own person limits, up to 6 on a sim and 12 in a ground class. They are also free on your subscription: only aircraft count toward the bill.",
      },
      {
        q: "What happens across a daylight saving change?",
        a: "The schedule is drawn in the airport's own time zone, so a 9:00 AM lesson stays at 9:00 AM. That is also why multi-day bookings need a school time zone set first: the number of nights away decides the bill.",
      },
    ],
    ctaTitle: "Put your fleet on a board this week",
    ctaBody: "Add a tail, book a flight, ramp it in. Nothing to install, nobody to talk to first.",
    closingTitle: "Your whole schedule, on one board.",
    closingBody:
      "Aircraft are $20 a month each. Simulators and classrooms are free, and every instructor, student and renter is included.",
  },

  "self-booking": {
    h1: "Online aircraft booking for students and renters",
    statement: "Give the front desk its afternoon back.",
    proof: [
      { value: "Web + iOS", label: "The same flow on both" },
      { value: "Your rules", label: "Checked at save, not after" },
      { value: "Standby", label: "Cancellations get refilled" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "The phone stops ringing for slots on the screen",
        body: "Members pick an aircraft, an instructor when they need one, and a time. Only genuinely free times are offered.",
      },
      {
        title: "Your rules hold with nobody enforcing them",
        body: "Checkouts, currency, tier booking windows, a card on file, an account balance. Each refusal names its reason.",
      },
      {
        title: "Cancellations turn back into flying hours",
        body: "A freed slot goes out as a time-limited offer, accepted straight from the phone notification.",
      },
    ],
    docs: [
      "/docs/scheduling/book-a-solo-flight",
      "/docs/scheduling/change-or-cancel-your-booking",
      "/docs/scheduling/standby-and-slot-offers",
      "/docs/scheduling/why-was-my-booking-refused",
    ],
    faqs: [
      {
        q: "Can I stop members booking themselves entirely?",
        a: "You do not have to use it, and the rules narrow it as far as you like: checkouts per tail, a saved card, a cap on upcoming bookings, a cap on length, and how far ahead each tier may go.",
      },
      {
        q: "Can a member cancel at the last minute?",
        a: "Only if you allow it. A cancel lock stops members changing a booking inside a window you set, while staff and instructors still can. With Stripe connected you can let them cancel inside the window if they accept a fee, billed before the slot is released.",
      },
      {
        q: "Can members book repeating lessons?",
        a: "Yes, and each date is a real separate booking so it can be ramped and invoiced on its own. If any one date conflicts, none are booked.",
      },
      {
        q: "What stops somebody with an unpaid balance from booking?",
        a: "On the account ledger you can set a minimum credit to self-book and a maximum they may owe, and check both again at ramp-out. Staff booking on someone's behalf skip the check.",
      },
    ],
    ctaTitle: "Let members book themselves, inside your rules",
    ctaBody: "Turn on the rules you run and leave the rest off. Nothing is enforced that you did not ask for.",
  },

  fleet: {
    h1: "Aircraft fleet management software for flight schools",
    statement: "One record per tail, feeding everything else.",
    proof: [
      { value: "$0", label: "Simulators and rooms cost nothing" },
      { value: "Wet or dry", label: "Per aircraft, on Hobbs or tach" },
      { value: "Per tail", label: "Rates, meters, home base, hours" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "The rate on the invoice is the rate on the aircraft",
        body: "Set once on the tail and read at close-out, so nobody retypes a rate and nobody mistypes one.",
      },
      {
        title: "Grounding an aircraft actually grounds it",
        body: "It stops being bookable everywhere at once: the board, the app, and a member's self-booking.",
      },
      {
        title: "The right people fly the right aeroplanes",
        body: "Check a member out from either side, the aircraft or the person, and students and renters are refused anything else.",
      },
    ],
    docs: [
      "/docs/getting-started/add-an-aircraft",
      "/docs/getting-started/aircraft-categories-and-meters",
      "/docs/getting-started/add-a-simulator-or-classroom",
      "/docs/getting-started/approve-a-member-on-an-aircraft",
    ],
    faqs: [
      {
        q: "Do simulators and classrooms count toward my bill?",
        a: "No. Pricing is per aircraft. Simulators and ground-school rooms are free however many you add, and they schedule exactly like aircraft.",
      },
      {
        q: "Can different aircraft have different rates and meters?",
        a: "Each tail carries its own hourly rate, whether that rate is wet or dry, and whether it bills on Hobbs or tach. Pilots enter both meters either way and only the chosen one is priced.",
      },
      {
        q: "Can one aircraft have different flying hours from the rest?",
        a: "Yes. The school sets a flying day and an individual aircraft can override it, which is what a night-capable tail needs.",
      },
      {
        q: "We operate from more than one airport. Does that work?",
        a: "Aircraft carry a home base, the board filters by location, and the home base can be changed at ramp-in when an aircraft is repositioned.",
      },
    ],
    ctaTitle: "Get your fleet in, rates and all",
    ctaBody: "Add each tail once. Every booking and invoice after that reads from it.",
  },

  compliance: {
    h1: "Pilot currency and compliance tracking",
    statement: "The flight that should not go, does not go.",
    proof: [
      { value: "Always on", label: "Currency cannot be switched off" },
      { value: "At save", label: "Checked before the booking exists" },
      { value: "Your own types", label: "Beyond medicals and reviews, on your own renewal periods" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "A lapsed medical stops a booking, not a conversation",
        body: "The refusal names the person and what has lapsed, instead of leaving the desk to work it out.",
      },
      {
        title: "Nobody has to remember whose review is due",
        body: "Medicals, flight reviews, checkouts and your own types carry renewals and surface before they bite.",
      },
      {
        title: "Members can fix it themselves",
        body: "A student sees exactly which currency is blocking them, including one that was never signed off in the first place.",
      },
    ],
    docs: [
      "/docs/scheduling/check-your-currency-status",
      "/docs/getting-started/member-documents",
      "/docs/getting-started/ground-archive-or-remove-a-member",
      "/docs/scheduling/why-was-my-booking-refused",
    ],
    faqs: [
      {
        q: "Can currency checks be turned off?",
        a: "No, and that is deliberate. Every other booking rule is off by default and optional. Currency is always on, because a scheduling system that will dispatch a pilot with a lapsed medical is worse than no scheduling system.",
      },
      {
        q: "Can I add currencies specific to my school?",
        a: "Yes. Alongside medicals, flight reviews and checkouts you can define your own types with their own renewal periods.",
      },
      {
        q: "What if the student is current but the instructor is not?",
        a: "Both are checked, and the refusal tells you which person is the problem.",
      },
      {
        q: "Can I stop one person flying without deleting them?",
        a: "Ground the member. They stay on the roster with their history intact and cannot be put on a booking until you lift it.",
      },
    ],
    ctaTitle: "Stop the flight that should not go",
    ctaBody: "Currency checks run on every booking from day one, with nothing to configure first.",
  },

  /* ================================================================== */
  /* BILLING                                                             */
  /* ================================================================== */
  billing: {
    h1: "Flight school billing and invoicing software",
    statement: "The flight bills itself before the pilot reaches the car park.",
    proof: [
      { value: "One invoice each", label: "Everybody on a shared flight is billed at their own rate" },
      { value: "No second system", label: "The schedule and the books are the same product" },
      { value: "Your Stripe", label: "Payouts land in your own account, on your own schedule" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "No hand-off between flying and billing",
        body: "Ramp-in captures the meters, the last PIN raises the invoice, and it goes out with a pay link. No export step.",
      },
      {
        title: "Shared flights stop leaking revenue",
        body: "Several payers on one booking get one bill each, priced at their own rate and quoting their own hours.",
      },
      {
        title: "Nobody chases invoices for the first month",
        body: "A daily sweep reminds members up to four times, then tells your admins that further chasing is on the school.",
      },
    ],
    stepsTitle: "Ramp-in to the bank",
    steps: [
      { title: "Close it out", body: "Meters, instruction time, and who pays what if more than one person does." },
      { title: "Everyone signs", body: "Nothing bills until the last pilot confirms with their PIN." },
      { title: "The bill posts", body: "A Stripe invoice per payer, or a charge against each member's balance." },
      { title: "Money moves", body: "Card or autopay, payouts to your own account, paid invoices on to QuickBooks." },
    ],
    sections: [
      {
        eyebrow: "Two models",
        title: "Bill each visit, or run accounts",
        body: "Schools that invoice each flight and clubs that run a balance want genuinely different software. This is one switch, not two products.",
        points: [
          "Invoices settled by card, autopay or marked paid",
          "Balances that may go negative, with auto-refill and late fees",
          "Guests are always invoiced, having no account to draw down",
        ],
      },
      {
        eyebrow: "Split billing",
        title: "Quantities are apportioned, then priced",
        body: "That order is why a member and a non-member can share one aircraft with no special case. The worked examples on the settings screen are computed by the engine that prices the real invoice.",
        points: [
          "Evenly, per head, by logged time, or in set shares",
          "Mark somebody not billed and the rest divide what is left",
          "An overnight minimum counted in the airport's time zone",
        ],
      },
    ],
    docs: [
      "/docs/billing/how-billing-works",
      "/docs/billing/choose-invoice-or-account-ledger",
      "/docs/billing/set-up-cost-splitting",
      "/docs/billing/why-a-flight-was-not-invoiced",
      "/docs/billing/send-paid-invoices-to-quickbooks",
    ],
    faqs: [
      {
        q: "Do I need Stripe?",
        a: "Yes, for anything to bill. It is your own Stripe account through their hosted onboarding, so payouts stay yours and card details never touch AerScheduler. You can build rates and rules before connecting, but nothing is raised until Stripe is connected and invoicing is on.",
      },
      {
        q: "Can I run accounts or tabs instead of invoicing every flight?",
        a: "Yes, one school-wide switch. Members hold a balance, top it up by card or get credited at the desk for cash, and flights draw it down. You get auto-refill, late fees, statements, and optional gates on booking and ramp-out.",
      },
      {
        q: "How do I split a flight between two pilots?",
        a: "Set the rule once for that booking type. A Who pays what panel then appears on any booking with more than one payer, and whoever is at the ramp fills in only the fields your rule uses. Each payer gets their own invoice at their own rate.",
      },
      {
        q: "Does it work with QuickBooks?",
        a: "QuickBooks Online. Every invoice becomes a Sales Receipt the moment it is paid, matched by email, once and only once. Two honest limits: unpaid and voided invoices never sync, and a refund made inside Stripe does not reverse the Sales Receipt.",
      },
      {
        q: "Why did a flight not get invoiced?",
        a: "Nine times out of ten nobody finished the PIN sign-offs. After that: invoicing is off, Stripe onboarding was never finished, the tail has no rate, or it was a maintenance booking, which is never billed.",
      },
    ],
    ctaTitle: "Close a flight out and watch the invoice write itself",
    ctaBody: "Connect Stripe, put a rate on one tail, bill a real flight. Then decide.",
    closingTitle: "Stop running billing in a second system.",
    closingBody: "The flight, the rate, the split and the invoice in one place, so nothing is carried across by hand.",
  },

  memberships: {
    h1: "Flying club membership and dues billing software",
    statement: "Nobody chases the first of the month.",
    proof: [
      { value: "Never twice", label: "One member, one period, enforced by the database itself" },
      { value: "Prorated", label: "Join on the 20th, pay for 10 days" },
      { value: "Pause", label: "A winter off creates no arrears" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "Dues raise themselves overnight",
        body: "Or wait for you to press the button. Either way every period is on the record as billed, waived, skipped or owed.",
      },
      {
        title: "Nobody is ever charged twice",
        body: "A member and a period collide in the database, so a double-fired job and an impatient admin cannot both win.",
      },
      {
        title: "Raising prices does not reprice your members",
        body: "Prices are snapshotted at joining. Entitlements like the booking window apply to the whole tier immediately.",
      },
    ],
    docs: [
      "/docs/billing/set-up-membership-dues",
      "/docs/billing/add-a-member-to-a-plan",
      "/docs/billing/review-account-balances-and-who-owes",
    ],
    faqs: [
      {
        q: "Can I have more than one tier?",
        a: "A plan per tier, priced how your club actually prices. Each carries its own joining fee, dues, booking window and per-tail rates.",
      },
      {
        q: "Monthly, quarterly or annual?",
        a: "All three, and you choose whether the tier is billed on a common day or each member on their own anniversary.",
      },
      {
        q: "Can I pause a member instead of cancelling them?",
        a: "Yes. Suspend them and the dues stop, with no arrears to unpick when they come back.",
      },
      {
        q: "Do you handle a membership agreement?",
        a: "You can record that one is on file. There is no e-signature in the product, and the console says on file rather than signed for exactly that reason.",
      },
    ],
    ctaTitle: "Set the tiers up once and stop thinking about the 1st",
    ctaBody: "Joining fees, dues, part months and pauses, on the invoices and reports you already run.",
  },

  /* ================================================================== */
  /* TRAINING                                                            */
  /* ================================================================== */
  training: {
    h1: "Part 141 and Part 61 training records software",
    statement:
      "Written for the instructor on Tuesday and the inspector two years later.",
    proof: [
      { value: "Frozen at signing", label: "A signed record cannot be quietly tidied up later" },
      { value: "Part 141 enforced", label: "Stage checks, certification, and graduation actually blocked" },
      { value: "Offline", label: "Grade at the aircraft, and it syncs when there is signal" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "An inspection is one report, not a week of paper",
        body: "One row per graded lesson with hours, instructor and signature state, exported to a PDF carrying the school name and window.",
      },
      {
        title: "Instructors stop doing paperwork at home",
        body: "Grading is part of the close-out. Flight time is prefilled from the Hobbs difference, ground from the briefing.",
      },
      {
        title: "Revising a syllabus cannot move a student's goalposts",
        body: "Students enroll against a version, and publishing locks that version permanently.",
      },
    ],
    stepsTitle: "Syllabus to certificate",
    steps: [
      { title: "Fork a syllabus", body: "Four starters, or an empty course. Part 61 or 141, chosen once." },
      { title: "Publish it", body: "It names how many lessons are about to freeze." },
      { title: "Enroll and fly", body: "Any course fee is recorded as owed on the spot." },
      { title: "Grade and sign", body: "Signing freezes the record and posts hours to every requirement it feeds." },
    ],
    sections: [
      {
        eyebrow: "Part 141",
        title: "One setting, six enforced rules",
        body: "Part 141 is the shape the module was built to. Part 61 is the same tables with the gates disarmed, and the choice cannot be flipped later.",
        points: [
          "Publish before anyone can be enrolled",
          "Stage checks by a designated check instructor",
          "Graduation blocked while an FAA requirement is unmet",
        ],
      },
      {
        eyebrow: "Hours",
        title: "The question a lesson list cannot answer",
        body: "Requirements are tracked in their own right, so a student can be on lesson 19 of 21 and still be short. One night cross-country credits several at once.",
        points: [
          "Measured in hours or in events",
          "Simulator and transfer ceilings applied when read, not by discarding hours",
          "Prior training credited with the date it was actually flown",
        ],
      },
    ],
    docs: [
      "/docs/training/how-training-works",
      "/docs/training/part-61-vs-part-141",
      "/docs/training/build-a-syllabus",
      "/docs/training/grade-a-lesson-at-close-out",
      "/docs/training/training-records-for-an-faa-inspection",
    ],
    faqs: [
      {
        q: "Does it really do Part 141, or is it a checkbox?",
        a: "Six rules are enforced: publish before enroll, an out-of-order warning, stage checks by a designated check instructor, certification of the record, graduation blocked on unmet requirements, and the certificate number stored. What it does not do is verify that whoever certifies is genuinely your chief instructor. It checks the permission you gave them.",
      },
      {
        q: "Can I use my own syllabus?",
        a: "Yes, and most schools should. The four starters exist so the first screen is not thirty lessons of typing. None of them is an approved training course outline: approval is per school and per FSDO, so treat a template as a starting point to take to your POI.",
      },
      {
        q: "What happens to enrolled students when I revise a syllabus?",
        a: "Nothing. They are enrolled against a version. You create a new version, edit the copy, publish it and retire the old one. The trade worth knowing up front is that publishing is permanent: there is no unpublish.",
      },
      {
        q: "Can instructors grade without a signal?",
        a: "Yes, on the iPhone app. Two things stated plainly rather than hidden: open each student's enrollment once while you have signal, because the screen works from a cached syllabus, and nothing syncs in the background, so a queued grade goes up when somebody next opens Training.",
      },
      {
        q: "Can a signed lesson be corrected?",
        a: "It can be amended, which creates a correction alongside it. The original stays signed, readable and marked superseded, and both appear in an export. Amending requires a typed reason.",
      },
    ],
    ctaTitle: "Put one student on a syllabus and see the record it makes",
    ctaBody: "Fork a starter, enroll somebody, grade a lesson off a flight. That is the whole loop.",
    closingTitle: "Training records built for the second reader.",
    closingBody: "The instructor on Tuesday and the inspector two years later want different things from the same record.",
  },

  instruction: {
    h1: "Instructor rates, pairing and availability",
    statement: "Who can teach whom, at what rate, and when they are free.",
    proof: [
      { value: "Per rating", label: "Dual and ground rates" },
      { value: "Only valid pairs", label: "Booking stops offering combinations you did not intend" },
      { value: "Weekly", label: "Availability self-booking respects" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "The dual rate on the invoice is the rate you set",
        body: "Read at close-out, so a dual and a ground lesson bill from the same place with nobody retyping a figure.",
      },
      {
        title: "Booking only offers pairings you allow",
        body: "Assign students to instructors and the form stops offering combinations you did not intend.",
      },
      {
        title: "Nobody books a CFI on their day off",
        body: "Weekly availability is what self-booking offers, so free hours are the only hours members can take.",
      },
    ],
    docs: [
      "/docs/billing/set-aircraft-and-instruction-rates",
      "/docs/scheduling/set-your-weekly-availability",
      "/docs/scheduling/reservation-types",
    ],
    faqs: [
      {
        q: "How is this different from training records?",
        a: "This page is rates, pairing and availability: what scheduling and billing read. Training records is the syllabus, the lessons, the hours and the endorsements. They are separate because a club with no syllabus still needs instruction rates.",
      },
      {
        q: "Can each instructor bill a different rate?",
        a: "Rates are per rating rather than per instructor today, so every CFI teaching a rating bills the same figure. Schools needing a different number for one instructor use a booking-level price override.",
      },
      {
        q: "Does availability stop the front desk booking somebody?",
        a: "Availability is what self-booking offers. The desk can still book outside it, which is what you want when an instructor has agreed to come in.",
      },
    ],
    ctaTitle: "Set your instruction rates once",
    ctaBody: "Rates per rating, pairings booking respects, and hours members can actually take.",
  },

  /* ================================================================== */
  /* MAINTENANCE                                                         */
  /* ================================================================== */
  maintenance: {
    h1: "Aircraft maintenance and squawk tracking software",
    statement: "Nothing unairworthy leaves the ramp.",
    proof: [
      { value: "Grounds itself", label: "An overdue annual clears the board with nobody remembering" },
      { value: "Reported from the ramp", label: "Anybody who flies can file a squawk against the tail" },
      { value: "Never edited", label: "A note on a squawk cannot be changed or deleted, by anybody" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "An overdue annual clears the board by itself",
        body: "The aircraft is grounded the moment it comes due, and signing off the last item returns it to service on its own.",
      },
      {
        title: "Squawks stop living in a group text",
        body: "Filed against a tail from the aircraft page or the close-out prompt, where the tech will actually look.",
      },
      {
        title: "Money stays out of the hangar",
        body: "A technician gets maintenance and the fleet, and reaches no invoice, rate or balance anywhere in the product.",
      },
    ],
    stepsTitle: "Soft brake to return to service",
    steps: [
      { title: "Somebody reports it", body: "A title, a description and a tail, from the console or the phone." },
      { title: "Decide if it flies", body: "A squawk grounds nothing on its own. Grounding is an explicit call." },
      { title: "Work it", body: "Notes record progress without closing anything, and cannot be edited later." },
      { title: "Resolve it", body: "What was done, and the date. Verify separately if your shop works that way." },
    ],
    sections: [
      {
        eyebrow: "Three things, one page",
        title: "Only grounding stops a booking",
        body: "An aircraft with six open squawks and an overdue annual is still bookable unless something grounded it. Making every discrepancy an operational decision would make the grounding decision meaningless.",
        points: [
          "Inspections count down, on the meter or the calendar",
          "Squawks are discrepancies filed against one tail",
          "Grounding is a flag and a reason on the aircraft itself",
        ],
      },
    ],
    docs: [
      "/docs/maintenance/how-maintenance-tracking-works",
      "/docs/maintenance/report-a-squawk",
      "/docs/maintenance/resolve-a-squawk",
      "/docs/maintenance/ground-an-aircraft",
      "/docs/maintenance/who-can-do-what-in-maintenance",
    ],
    faqs: [
      {
        q: "Does this replace my maintenance logbooks?",
        a: "No, and it does not try to. The aircraft logbooks required by 14 CFR 91.417 are the maintenance record, kept by whoever did the work. This is a tracking system: it counts down to what is due, keeps the aircraft off the schedule when it should not fly, and records the sign-offs you entered. A tracking system that called itself a logbook would be the wrong answer to an inspector.",
      },
      {
        q: "Does it track Airworthiness Directives?",
        a: "It keeps the compliance record for the ADs you enter: number, revision, meter readings, who certified it, and a report that prints the history. It does not tell you which directives apply to your fleet, and it never decides that one does not apply. That determination belongs to a certificated person. If you run ADlog or AVTRAK, name it and we propose nothing.",
      },
      {
        q: "Can my mechanic have access without seeing the money?",
        a: "Yes. The technician role opens maintenance and the fleet and reaches no invoice, rate or balance. It is why the role exists.",
      },
      {
        q: "Does it stop somebody booking a grounded aircraft?",
        a: "Every booking type except maintenance is refused with the reason. Grounding does not cancel bookings already on the aircraft, so the desk can see what has to be moved rather than having flights vanish.",
      },
      {
        q: "How do I schedule downtime?",
        a: "Book it. Choose the maintenance reservation type, pick the aircraft and the window. Nobody is assigned to it, it blocks the window, and it is never invoiced.",
      },
    ],
    ctaTitle: "See what your fleet actually owes",
    ctaBody: "The standard airworthiness set is a few clicks and a last-done date per tail.",
    closingTitle: "Airworthiness the schedule respects.",
    closingBody: "The due date, the squawk and the grounding all reach the board the desk is booking from.",
  },

  inspections: {
    h1: "Aircraft inspection tracking software",
    statement: "An annual signed 15 February is good through the end of February.",
    proof: [
      { value: "Calendar months", label: "Counted to the end of the month, never as 365 days" },
      { value: "No guessed dates", label: "An hour-based inspection reports the meter, not an average" },
      { value: "Tach or Hobbs", label: "Each inspection counts the meter you choose, not the billing one" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "Calendar months are counted as calendar months",
        body: "A regulation written in months runs to the end of the month. Tracking that as 365 days quietly shortens every annual you own.",
      },
      {
        title: "An hour-based inspection never invents a date",
        body: "A 100-hour depends on how much the aircraft flies, so it is reported against the meter rather than averaged into a date you might plan around.",
      },
      {
        title: "Coming due tells somebody",
        body: "The warning lead both flags the row and sends the email. There is no cosmetic idea of soon that notifies nobody.",
      },
    ],
    stepsTitle: "Four steps to a fleet that counts itself",
    steps: [
      { title: "Add the standard set", body: "Untick anything your operation does not owe." },
      { title: "Say when each was last done", body: "The date and reading from when the work was actually performed." },
      { title: "Pick the tails", body: "One rule for the school becomes a live inspection per aircraft." },
      { title: "Sign off", body: "A repeating inspection starts again from those numbers." },
    ],
    docs: [
      "/docs/maintenance/add-the-standard-airworthiness-inspections",
      "/docs/maintenance/add-your-own-inspection",
      "/docs/maintenance/set-when-an-inspection-was-last-done",
      "/docs/maintenance/sign-off-an-inspection",
      "/docs/maintenance/when-aerscheduler-grounds-an-aircraft",
    ],
    faqs: [
      {
        q: "Which inspections come as presets?",
        a: "The standard airworthiness set: annual, 100-hour, VOR check, Airworthiness Directive review, transponder check, ELT, and static system and altimeter. Oil change and ELT battery replacement sit alongside them. Everything is ticked to start and you untick what you do not owe.",
      },
      {
        q: "Does an overdue inspection ground the aircraft?",
        a: "Only if that inspection carries the grounding flag. Of the standard set, exactly two do: the annual and the 100-hour. The rest come due and notify people without taking the aircraft off the board.",
      },
      {
        q: "What about an aircraft due on hours rather than a date?",
        a: "Track it on the meter, counting tach or Hobbs, whichever you choose. It deliberately never shows a due date, because an averaged date is a guess presented as a fact.",
      },
      {
        q: "Can I track my own inspections?",
        a: "Yes. Any recurring interval, or a one-off reminder for a single date. Oil changes, hose lives, a prop coming back from the shop.",
      },
      {
        q: "Does removing a rule affect other aircraft?",
        a: "Yes, and it is worth knowing before you press it. A rule lives once for the school and covers every tail attached to it. To take one aircraft off, change which tails it covers instead.",
      },
    ],
    ctaTitle: "See what your fleet actually owes",
    ctaBody: "Add the set, give each tail a last-done date, and the countdown is already running.",
  },

  /* ================================================================== */
  /* REPORTING                                                           */
  /* ================================================================== */
  reports: {
    h1: "Flight school reporting software and dashboards",
    statement: "A figure and the report behind it can never disagree.",
    proof: [
      { value: "Locked by role", label: "Financial stays owner and admin only, enforced on every run" },
      { value: "CSV and PDF", label: "Every matching row, with a totals row, ready for your accountant" },
      { value: "Sends itself", label: "Any saved view emails daily, weekly or monthly, on your clock" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "You learn which tail earns its keep",
        body: "Revenue against hours for every resource, including the ones that flew nothing. The zero rows are the point.",
      },
      {
        title: "Your dispatcher runs ops without browsing revenue",
        body: "Permissions are by category and enforced on every run. A dispatcher sees no financial heading at all.",
      },
      {
        title: "Your accountant gets a file, not an afternoon",
        body: "Export every matching row, or schedule the saved view to email itself to them on the first of the month.",
      },
    ],
    stepsTitle: "Question to answer, then to nobody's inbox",
    steps: [
      { title: "Pick the nearest report", body: "Financial, operations, fleet, people or compliance." },
      { title: "Shape it", body: "Filter, group to rank, choose columns. A share-of bar does the arithmetic." },
      { title: "Save the view", body: "Sharing never grants access somebody did not already have." },
      { title: "Send it", body: "Export, schedule the email, or pin it to your dashboard." },
    ],
    sections: [
      {
        eyebrow: "Numbers that agree",
        title: "Two reports disagreeing is usually correct",
        body: "An invoice raised in June and paid in August is June's revenue and August's cash. Every report states its date basis on the page rather than leaving you to guess.",
        points: [
          "Windows resolved in the airport's own time zone",
          "Ratio columns re-derived rather than averaged",
          "A dash means nothing recorded, never zero",
        ],
      },
      {
        eyebrow: "Your dashboard",
        title: "A board per person, not one the school argues about",
        body: "Drag tiles, resize them, and give each its own date range, which is how revenue this week and revenue this month sit side by side and are both right.",
        points: [
          "Number, bar, line and table tiles",
          "Click a figure to open the report behind it",
          "A needs-attention list with its own window per item",
        ],
      },
    ],
    docs: [
      "/docs/reports/how-reporting-works",
      "/docs/reports/report-catalog",
      "/docs/reports/save-a-report-view",
      "/docs/reports/email-a-report-on-a-schedule",
      "/docs/reports/numbers-dont-match",
    ],
    faqs: [
      {
        q: "Can I see revenue per aircraft?",
        a: "Revenue opens already grouped by resource, and can be cut by instructor, customer or lesson type instead. The fleet report puts revenue against hours for every tail, including the ones that did not fly.",
      },
      {
        q: "Can I stop dispatchers seeing money?",
        a: "Yes, and it is the default. Financial reports are owners and admins only, the heading is absent rather than locked, and the permission is checked on the server every time a report runs.",
      },
      {
        q: "Can I build my own report?",
        a: "There is no blank-report builder, deliberately. You take the nearest report, filter it, group it, choose columns and save it as a view, which can then be shared, pinned and scheduled.",
      },
      {
        q: "Why do two reports show different totals for the same dates?",
        a: "Usually the date basis. Revenue counts an invoice when it was raised, payments when it was paid, and both are correct. Cancelled bookings are also excluded from utilization and the flight log, and voided invoices from every financial report.",
      },
      {
        q: "Is there reporting in the mobile app?",
        a: "No. Reporting is a web console feature. The app covers the ramp and the flight.",
      },
    ],
    ctaTitle: "Ask your fleet a question and get an answer today",
    ctaBody: "Every report filters, groups, saves, exports and schedules. Nothing to build first.",
    closingTitle: "Every number, and the report behind it.",
    closingBody: "Revenue, utilization, receivables and currency, on a dashboard you build and a schedule you set once.",
  },

  utilization: {
    h1: "Aircraft utilization tracking software",
    statement: "The money is in the gap between booked, flown and billed.",
    proof: [
      { value: "Booked, flown, billed", label: "Side by side, because the gaps between them are the finding" },
      { value: "Idle tails included", label: "A resource that flew nothing still gets its own row" },
      { value: "Sends itself", label: "Monthly, covering the previous calendar month exactly" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "You see the aircraft that is busy on the board and idle in the air",
        body: "Booked next to flown exposes the tail that is permanently reserved and rarely goes anywhere.",
      },
      {
        title: "You see the flying that was never billed",
        body: "Flown next to billed is the other gap, and it is the one quietly worth money every month.",
      },
      {
        title: "Ranking needs no arithmetic",
        body: "Group by resource and a share-of bar appears beside each row. Export it, pin it, or schedule it.",
      },
    ],
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
        a: "Efficiency is flown over booked, and an overnight trip holds the aircraft for the whole trip while it is away earning rather than idle. Group by overnight to read the two populations apart, and compare billed rather than flown on trips.",
      },
      {
        q: "Can I see utilization per instructor or customer?",
        a: "Group the report differently, or use the instructor and customer activity reports, which cover hours, distinct students and cancellation rate.",
      },
      {
        q: "Can I get this monthly without remembering to run it?",
        a: "Save the view and give it a monthly schedule. The cadence sets the window, so each email covers the previous calendar month exactly.",
      },
    ],
    ctaTitle: "Find out what each tail actually returns",
    ctaBody: "Booked against flown against billed, per aircraft, for any window.",
  },

  /* ================================================================== */
  /* ACROSS EVERY MODULE                                                 */
  /* ================================================================== */
  "people-roles": {
    h1: "Flight school staff and student management",
    statement: "One roster the whole operation reads from.",
    proof: [
      { value: "No per-user fee", label: "Instructors, students, renters and staff are all unlimited" },
      { value: "Grounded, not deleted", label: "Stop somebody flying without losing any of their history" },
      { value: "Two schools, one login", label: "For the instructors who teach at more than one" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "People get exactly the access their job needs",
        body: "Seven roles, plus a single extra permission grantable from someone's own record when a role is nearly right.",
      },
      {
        title: "Getting people in is not a data-entry project",
        body: "Invite by email with roles attached, or share a join code and approve the requests that come back.",
      },
      {
        title: "Somebody can be stopped without being deleted",
        body: "Ground a member and they stay on the roster with their history intact, unable to be booked until you lift it.",
      },
    ],
    docs: [
      "/docs/getting-started/roles-and-permissions",
      "/docs/getting-started/permissions-and-grants",
      "/docs/getting-started/invite-people",
      "/docs/getting-started/switch-between-schools",
    ],
    faqs: [
      {
        q: "Is there a per-user fee?",
        a: "No. Pricing is per aircraft. Instructors, students, renters, dispatchers and technicians are unlimited.",
      },
      {
        q: "Can somebody have more than one role?",
        a: "Yes. An instructor who also rents, or an owner who dispatches, holds both and gets the union of what they allow.",
      },
      {
        q: "Can I give one person a single extra permission?",
        a: "Yes, from their own record. Grants only ever widen, so a treasurer can get invoices and revenue reports without being made an admin.",
      },
    ],
    ctaTitle: "Get your people in this afternoon",
    ctaBody: "Invite by email or hand out a join code. Every role after that is a switch.",
  },

  mobile: {
    h1: "The flight school app for iPhone",
    statement: "Built for the ramp, not shrunk from a desktop.",
    proof: [
      { value: "Included", label: "On every plan, no surcharge" },
      { value: "Offline", label: "Lesson grading works without signal" },
      { value: "Native", label: "Not a mobile website" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "Instructors grade at the aircraft, offline",
        body: "Held on the device and sent when there is signal, with any refusal shown in full rather than swallowed.",
      },
      {
        title: "Squawks get reported while somebody is looking at the problem",
        body: "From any aircraft page, or the prompt that opens once the meters go in at close-out.",
      },
      {
        title: "Standby offers are accepted from the notification",
        body: "Accept and decline sit on the push itself, which is what makes a time-limited offer workable.",
      },
    ],
    docs: [
      "/docs/getting-started/the-mobile-app",
      "/docs/training/grade-lessons-offline-on-the-app",
      "/docs/scheduling/standby-and-slot-offers",
    ],
    faqs: [
      { q: "Does the app cost extra?", a: "No. It is included with every plan at the same per-aircraft price." },
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
        a: "Lesson grading does, which is the case that matters at a rural field. Open the student's enrollment once while you have signal, because the screen works from a cached syllabus.",
      },
    ],
    ctaTitle: "Put the ramp in everybody's pocket",
    ctaBody: "Included on every plan, on the App Store, the same operation as the desk.",
  },

  integrations: {
    h1: "Flight school software integrations",
    statement: "Every integration, on every plan.",
    proof: [
      { value: "No tier", label: "Nothing is behind a premium plan" },
      { value: "Your Stripe", label: "Payouts land in your own account" },
      { value: "Once paid", label: "Invoices post to QuickBooks Online" },
    ],
    outcomesTitle: "What changes",
    outcomes: [
      {
        title: "Paid invoices reach your books without retyping",
        body: "QuickBooks Online receives each as a Sales Receipt the moment it is paid, matched by email, once only.",
      },
      {
        title: "Flights appear in the calendar people actually look at",
        body: "Google Calendar syncs into whichever calendar you pick. Apple Calendar and Outlook subscribe by private link.",
      },
      {
        title: "Money lands in your own account",
        body: "Stripe connects as your school's own account, so payouts stay yours and card details never touch AerScheduler.",
      },
    ],
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
        a: "QuickBooks Online, and only paid invoices, as Sales Receipts. Unpaid and voided invoices never sync, and a refund made inside Stripe does not reverse the Sales Receipt.",
      },
      {
        q: "Is there an API?",
        a: "Yes, a documented REST API, available on the Enterprise plan.",
      },
    ],
    ctaTitle: "Connect Stripe, your calendar and QuickBooks",
    ctaBody: "All of it on the standard plan, a few minutes each.",
  },
};
