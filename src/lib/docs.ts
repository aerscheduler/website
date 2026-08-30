/**
 * The help documentation registry.
 *
 * Structure lives here; prose lives in `src/content/docs/<section>/<slug>.mdx`.
 * Splitting them that way is what makes the sticky nav, the breadcrumbs, the
 * sitemap, the prev/next links, and the JSON-LD impossible to drift from each
 * other: they all read this one array, and `scripts/check-docs.mjs` fails the
 * build if an entry has no MDX file or an MDX file has no entry.
 *
 * These pages are a THIRD kind of page, distinct from the two the marketing
 * site already has, and the distinction is deliberate:
 *
 *   /features/[slug]   commercial intent  "flight school scheduling software"
 *   /resources/[slug]  informational      "what training records must I keep"
 *   /docs/[section]    support intent     "how do I enroll a student in a course"
 *
 * They do not compete for the same queries, so they do not cannibalise each
 * other. A docs page answers "how do I do this in AerScheduler", always names
 * the real screen and the real button, and never sells.
 */

export type DocKind = "overview" | "task" | "reference" | "troubleshooting";

export type DocAudience =
  | "Owners"
  | "Admins"
  | "Dispatchers"
  | "Instructors"
  | "Students"
  | "Renters"
  | "Technicians";

export type DocArticle = {
  slug: string;
  title: string;
  /** Shown under the title, in the nav tooltip, and as the meta description seed. */
  description: string;
  kind: DocKind;
  audience: DocAudience[];
  /** The search query this page should win. Feeds keywords, not copy. */
  seoQuery?: string;
  keywords?: string[];
  /**
   * Rendered at the foot of the article AND emitted as FAQPage JSON-LD.
   * Kept out of the MDX so the structured data cannot disagree with the prose.
   */
  faqs?: { q: string; a: string }[];
  /** Hrefs of related pages anywhere on the site (docs, resources, or features). */
  related?: string[];
};

export type DocSection = {
  slug: string;
  title: string;
  navLabel: string;
  /** One sentence for the docs hub card and the section hero. */
  blurb: string;
  /** Longer orientation paragraph for the section landing page. */
  intro: string;
  /** lucide-react icon name, resolved in the hub. */
  icon: "Compass" | "CalendarDays" | "CreditCard" | "Wrench" | "GraduationCap" | "BarChart3";
  articles: DocArticle[];
};

export const DOC_SECTIONS: DocSection[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    navLabel: "Getting started",
    blurb: "Set the school up, get everyone in, and learn the vocabulary.",
    intro:
      "The first week: what AerScheduler is, how to get your fleet and people in, what each role can do, and where everything lives.",
    icon: "Compass",
    articles: [
      {
        slug: "what-is-aerscheduler",
        title: "What AerScheduler is",
        description:
          "The three things everything else hangs off, and how the web console and the iOS app divide the work.",
        kind: "overview",
        audience: ["Owners", "Admins"],
        seoQuery: "what is AerScheduler",
      },
      {
        slug: "set-up-your-school",
        title: "Set up your school on day one",
        description:
          "The wizard (operation, first aircraft, billing), what you want working first, then the dashboard checklist that tells you what is still missing.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "flight school software setup first day",
      },
      {
        slug: "roles-and-permissions",
        title: "Roles, and what each one can do",
        description:
          "Owner, admin, dispatcher, instructor, student, renter and technician. One person can hold several, and the roles decide what they see, what they can book, and whose money they can look at.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "flight school software user roles permissions",
      },
      {
        slug: "permissions-and-grants",
        title: "Give one person an extra permission",
        description:
          "Roles say what somebody is to your school. Permissions say what they may do. Give a bookkeeper the invoice list without making them an admin, or let one instructor bill their own ground time, from that person's record.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "flight school software give staff member permission without admin",
        faqs: [
          {
            q: "Do I have to give everybody permissions now?",
            a: "No. Every role already carries the permissions it has always had, so a school that never opens this screen behaves exactly as it did before. Permissions only ever add.",
          },
          {
            q: "Can I use a permission to take something away?",
            a: "No, they only widen. If somebody can do something because of a role they hold, the switch for it is shown on and locked. To take it away, remove the role in Edit roles.",
          },
          {
            q: "Should a treasurer be a new role?",
            a: "No. Give them See invoices and balances, See revenue reports and Raise an invoice, and leave them off admin. That is the whole point of permissions: a job title becomes a set of switches rather than a new kind of person.",
          },
        ],
      },
      {
        slug: "invite-people",
        title: "Invite people to your school",
        description:
          "Email an invitation with roles already attached, or share your join code and approve the requests as they arrive.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "invite students and instructors to flight school software",
      },
      {
        slug: "join-a-school",
        title: "Join a school with a code",
        description:
          "What to do with the code or the invitation email you were sent, and what happens if your school has to approve you first.",
        kind: "task",
        audience: ["Students", "Renters", "Instructors", "Technicians"],
        seoQuery: "join flight school with a code AerScheduler",
      },
      {
        slug: "add-an-aircraft",
        title: "Add an aircraft",
        description:
          "Tail, make, model, year, category and class, meters, rates and a home base. Get the rates and meters right now, because billing and maintenance both read them.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "add an aircraft to flight school scheduling software",
      },
      {
        slug: "aircraft-categories-and-meters",
        title: "Categories, classes and meters",
        description:
          "What each field on an aircraft means: category and class in the same words a certificate uses, and which meters the aircraft has. Meters decide whether its flights are invoiced automatically.",
        kind: "reference",
        audience: ["Owners", "Admins"],
        seoQuery: "flight school software helicopter glider category class",
      },
      {
        slug: "add-a-simulator-or-classroom",
        title: "Add a simulator or a classroom",
        description:
          "Simulators and rooms are bookable resources like aircraft, and they are free on your bill. Only aircraft count toward what you pay.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "add a simulator or classroom to flight school software",
      },
      {
        slug: "approve-a-member-on-an-aircraft",
        title: "Check someone out on an aircraft",
        description:
          "Approve a student or renter from the aircraft or from their profile. With the approved-resources rule on, that checkout is also what lets them book it.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "how to approve a student or renter on an aircraft flight school",
        faqs: [
          {
            q: "Approve members only lists renters. Where are the students?",
            a: "The sheet lists students and renters. If someone is missing, they do not have either role yet. Grant one from People → their ⋯ menu → Edit roles. Instructors are left off on purpose, they are never held to the approved list.",
          },
          {
            q: "Can I approve someone from their profile?",
            a: "Yes. Open People → the person → Compliance. The Approved aircraft card has a switch per tail. That is the same checkout as Aircraft → Approve members.",
          },
          {
            q: "Is this people groups?",
            a: "No. Groups (Settings → School → Groups) scope currency rules such as medicals and flight reviews. Checkouts are per person, per tail.",
          },
        ],
      },
      {
        slug: "ground-archive-or-remove-a-member",
        title: "Ground, archive or remove a member",
        description:
          "Three different things that all look like taking somebody off the roster. Grounding stops them flying and emails them, archiving just tidies the list, and removing is permanent.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "ground a pilot or remove a member flight school software",
      },
      {
        slug: "member-documents",
        title: "Track medicals, certificates and other documents",
        description:
          "Set the document types your school requires, upload on somebody's behalf, and get told before one expires.",
        kind: "task",
        audience: ["Owners", "Admins", "Instructors", "Students", "Renters"],
        seoQuery: "track pilot medical certificate expiry flight school",
      },
      {
        slug: "notifications-and-emails",
        title: "Choose which emails and push alerts you get",
        description:
          "Notifications come by email and push to the iOS app, grouped by category so you can turn off the ones you do not need without losing the ones you do.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "turn off flight school software email notifications",
      },
      {
        slug: "find-anything",
        title: "Find anything with search",
        description:
          "One search box reaches people, aircraft, bookings and pages. What it returns depends on your role, so two people searching the same word see different things.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "search in AerScheduler",
      },
      {
        slug: "your-profile-and-time-zone",
        title: "Your profile, PIN and time zone",
        description:
          "Your details, the PIN you sign close-outs with, and why the schedule shows airport time rather than the time on your phone.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "set my PIN and time zone AerScheduler",
      },
      {
        slug: "switch-between-schools",
        title: "Fly at more than one school",
        description:
          "One login can belong to several organizations. The switcher changes everything on screen, including which roles you hold.",
        kind: "task",
        audience: ["Instructors", "Students", "Renters"],
        seoQuery: "one account multiple flight schools",
      },
      {
        slug: "the-mobile-app",
        title: "What the iOS app does",
        description:
          "The app is built for pilots away from a desk. It does some things the console cannot, and the console does a great deal the app does not.",
        kind: "reference",
        audience: ["Owners", "Admins", "Instructors", "Students", "Renters"],
        seoQuery: "AerScheduler iPhone app features",
      },
      {
        slug: "post-an-announcement",
        title: "Post an announcement",
        description:
          "Owners and admins post a school notice from Operations → Announcements. Members see it on Home until they tap Got it, then find it again on the announcements page.",
        kind: "task",
        audience: ["Owners", "Admins", "Instructors", "Students", "Renters"],
        seoQuery: "post flight school announcement AerScheduler",
        faqs: [
          {
            q: "How do I hide an announcement from Home?",
            a: "Tap Got it on the notice. It leaves Home for you only. The school still has it on Operations → Announcements, and in the app under Announcements, until an admin deletes it or it expires.",
          },
          {
            q: "Does Got it delete the announcement for everyone?",
            a: "No. Got it is only for you. Other members still see it on Home until they mark it themselves. Deleting from the board removes it for the whole school.",
          },
        ],
      },
      {
        slug: "delete-your-school",
        title: "Delete your school (30-day countdown)",
        description:
          "An owner schedules permanent deletion from Settings. The school stays for 30 days, every admin and owner is notified, and any of them can cancel before the date.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "delete flight school AerScheduler organization",
        faqs: [
          {
            q: "Is deleting a school immediate?",
            a: "No. Scheduling deletion starts a 30-day countdown. The school keeps working until that date, and any admin or owner can cancel from Settings → School.",
          },
          {
            q: "Who is told when a school is scheduled for deletion?",
            a: "Every admin and owner gets an email and an in-app notification with the deletion date and a link back to Settings.",
          },
          {
            q: "Who can cancel a scheduled deletion?",
            a: "Any admin or owner. Cancelling clears the countdown. Nothing has been removed yet.",
          },
          {
            q: "Why won't it let me schedule deletion?",
            a: "Every invoice for the school must be settled first. The server refuses while anything is unpaid.",
          },
        ],
      },
      {
        slug: "settings-reference",
        title: "Every setting, and what it changes",
        description:
          "A map of the Settings screen: what lives on each tab, who can open it, and which other part of the product each setting affects.",
        kind: "reference",
        audience: ["Owners", "Admins"],
        seoQuery: "AerScheduler settings reference",
      },
    ],
  },
  {
    slug: "scheduling",
    title: "Scheduling and dispatch",
    navLabel: "Scheduling",
    blurb: "Book, move, cancel and close out flights, for the front desk and for members.",
    intro:
      "The dispatch board, the booking form behind it, and the self-serve version members use. Everything from putting a flight on the schedule to closing it out and handing it to billing.",
    icon: "CalendarDays",
    articles: [
      {
        slug: "how-scheduling-works",
        title: "How scheduling works in AerScheduler",
        description:
          "The dispatch board, the five ways to look at it, and the life of a booking from booked through ramp out, ramp in, sign-off and invoice. Read this first if the rest of the section assumes something you have not seen yet.",
        kind: "overview",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "how does the AerScheduler dispatch board work",
      },
      {
        slug: "sync-your-personal-calendar",
        title: "Sync flights to Google, Apple Calendar or Outlook",
        description:
          "Connect Google Calendar for a live push, or subscribe with a private ICS link for Apple Calendar and Outlook. One-way from AerScheduler into your calendar.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "sync AerScheduler to Google Apple Outlook calendar",
        faqs: [
          {
            q: "Does AerScheduler sync both ways with Google Calendar?",
            a: "No. Flights go from AerScheduler into your calendar. Editing or deleting an event in Google, Apple Calendar or Outlook does not change the booking in AerScheduler.",
          },
          {
            q: "What if someone gets my subscription link?",
            a: "They can see your upcoming flights. Open Profile → Calendar (or Settings → Calendars in the app) and regenerate the link. The old one stops working.",
          },
        ],
      },
      {
        slug: "reservation-types",
        title: "Which reservation type should I use?",
        description:
          "Dual, solo, shared flight, rental, guest, ground, sim and maintenance. The type decides what resource is booked, who may be on it, how many, and who gets the invoice, so picking the wrong one is the most common reason a booking is refused.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "difference between dual solo and shared flight reservation",
      },
      {
        slug: "book-a-reservation",
        title: "Book a reservation from the dispatch board",
        description:
          "How the front desk books a flight, a lesson, a sim session or a room for somebody else, and what happens the moment you press Book reservation.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers"],
        seoQuery: "how to book a flight for a student",
      },
      {
        slug: "book-a-solo-flight",
        title: "Book your own flight or lesson",
        description:
          "Pick Solo, choose the aircraft, then pick a start time from the list. Only times when you and the aircraft are both free are offered.",
        kind: "task",
        audience: ["Students", "Instructors"],
        seoQuery: "book a solo flight in AerScheduler",
      },
      {
        slug: "set-up-a-repeating-booking",
        title: "Set up a lesson that repeats every week",
        description:
          "A repeat creates a real, separate booking for every date, so each one can be ramped, reviewed and invoiced on its own. Every repeat has an end, and if one date conflicts none of them are booked.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "how to schedule a recurring weekly flight lesson",
      },
      {
        slug: "overnight-and-multi-day-trips",
        title: "Book a trip that keeps the aircraft overnight",
        description:
          "Multi-day bookings are off until an admin turns them on, and they cannot be turned on until the school has a time zone, because the number of nights decides the bill.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Renters", "Instructors"],
        seoQuery: "book an aircraft overnight multi day rental",
      },
      {
        slug: "reschedule-a-booking",
        title: "Move a booking to a new time or a different aircraft",
        description:
          "Three ways to move a booking: edit it, drag it on the board, or nudge it with the arrow keys. Dragging up or down on the day board swaps the aircraft.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "how to reschedule a flight booking",
      },
      {
        slug: "change-or-cancel-your-booking",
        title: "Change or cancel your booking",
        description:
          "Open the booking and press Edit reservation. On the web, cancelling is limited to staff, technicians, and the instructor on the flight, so students and renters cancel from the iOS app or ask the front desk.",
        kind: "task",
        audience: ["Students", "Renters", "Instructors", "Technicians"],
        seoQuery: "cancel a flight reservation in AerScheduler",
      },
      {
        slug: "cancel-a-reservation",
        title: "Cancel a booking and record why",
        description:
          "Cancelling needs a reason type and a short note, both required, because that is what the cancellation report counts. A no-show is recorded by cancelling with the No-show reason after the start time.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "how to cancel a reservation and record a no show",
      },
      {
        slug: "standby-and-slot-offers",
        title: "Stand by for a slot and accept an offer",
        description:
          "Join standby on a booking, set standing preferences or an open window, and accept a time-limited offer when a matching slot opens. The desk can offer canceled slots and withdraw pending offers.",
        kind: "task",
        audience: ["Students", "Renters", "Instructors", "Owners", "Admins", "Dispatchers"],
        seoQuery: "how to join standby and accept an offer in AerScheduler",
        faqs: [
          {
            q: "Does AerScheduler rebook me automatically when a slot opens?",
            a: "No. You get a time-limited offer to accept. Decline or expiry can move the offer to the next eligible member.",
          },
          {
            q: "Can I accept or decline from the iPhone notification?",
            a: "Yes. Offer pushes include Accept, Decline, and View. Pull down the banner or open Notification Center to use them. Turn on Offers and standby under push notification settings.",
          },
          {
            q: "Where do I set days and types I want, not just one booking?",
            a: "On the web, open You → Profile → Standby. On iOS, open Settings → Standby. You can also reach it from Schedule → Offers → Manage standby. If your school requires checkouts, the aircraft list is limited to what you are approved on.",
          },
          {
            q: "Why did I not get an offer for a dual I was standing by for?",
            a: "Eligibility still applies. Your roles, checkouts, grounding, and schedule clashes filter candidates. On duals the instructor must confirm first. A renter-only account will not receive a dual offer. Slots that start in under 30 minutes are not offered by default.",
          },
        ],
      },
      {
        slug: "ramp-out-and-ramp-in",
        title: "Ramp out and ramp in a flight",
        description:
          "Ramp out records the departure Hobbs and tach and takes the aircraft off the line. Ramp in records the return readings, puts it back, and moves the booking to Awaiting review. These two steps are what turn a plan into a billable flight.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "how to record hobbs and tach time on a flight",
      },
      {
        slug: "sign-off-with-your-pin",
        title: "Sign off a flight with your PIN",
        description:
          "Every pilot on a booking confirms the close-out with their own four character PIN. The invoice is raised automatically when the last person signs off, so a flight nobody signs off is a flight nobody is billed for.",
        kind: "task",
        audience: ["Instructors", "Students", "Renters"],
        seoQuery: "confirmation PIN sign off flight reservation",
      },
      {
        slug: "close-out-a-ground-lesson",
        title: "Close out a ground lesson or a booking with no aircraft",
        description:
          "Nothing ramps in a classroom. A ground lesson goes straight from Not started to Awaiting review in one step, the button reads Review times instead of Ramp out, and instruction time is the only figure recorded.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students"],
        seoQuery: "how to close out a ground lesson flight school",
      },
      {
        slug: "close-out-a-guest-flight",
        title: "Close out and bill a discovery or guest flight",
        description:
          "A guest has no account and no PIN, so an admin or the instructor on the flight closes it out for them. The guest is emailed a secure link and pays by card.",
        kind: "task",
        audience: ["Owners", "Admins", "Instructors"],
        seoQuery: "how to bill a discovery flight to a guest",
      },
      {
        slug: "split-a-booking-between-payers",
        title: "Split a flight between two or more people",
        description:
          "The Who pays what panel divides one flight into a stake per person, and the booking mints one invoice per payer. Fill it in after the flight is back and before it is invoiced.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "split flight cost between two pilots",
      },
      {
        slug: "set-your-weekly-availability",
        title: "Set your weekly availability",
        description:
          "Set the hours you can be booked under Profile then Availability. The iOS app honors these hours when someone books you, and the web console does not.",
        kind: "task",
        audience: ["Instructors", "Admins"],
        seoQuery: "set instructor availability hours flight school",
      },
      {
        slug: "check-your-currency-status",
        title: "Check your currencies and fix one that blocks booking",
        description:
          "Your Currencies page shows medicals, flight reviews, and checkouts. Anything not current can stop you booking an aircraft, including one that has simply never been signed off.",
        kind: "task",
        audience: ["Students", "Renters", "Instructors"],
        seoQuery: "flight review currency expired cannot book aircraft",
      },
      {
        slug: "filter-and-search-the-schedule",
        title: "Find a booking on the schedule",
        description:
          "Search matches titles, notes, tail numbers, people and guests. Resource and Location remove lanes from the board. Every other filter dims what does not match instead of hiding it, on purpose.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "why does the schedule filter not hide other bookings",
      },
      {
        slug: "booking-rules-and-settings",
        title: "Booking rules: the settings that change how booking works",
        description:
          "Flying day, multi-day trips, payment-method gate, cancel/edit lock, late-cancel fee, max upcoming bookings, max reservation length, and account-ledger book/dispatch gates. What each does and where it lives.",
        kind: "reference",
        audience: ["Owners", "Admins"],
        seoQuery: "flight school booking rules and settings",
      },
      {
        slug: "who-can-do-what-on-the-schedule",
        title: "Who can book, edit and cancel: scheduling by role",
        description:
          "Everyone in the school sees the whole schedule. What changes by role is which lanes are drawn, what you can create, and what you can act on.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "flight school scheduling permissions by role",
      },
      {
        slug: "airport-time-and-time-zones",
        title: "Why the schedule shows airport time, and how to change it",
        description:
          "Every time on the schedule is drawn in the airport's own zone, not your device's, so a 9:00 AM lesson stays 9:00 AM wherever you check it from. You can switch to your own zone for yourself.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "flight school schedule showing wrong time zone",
      },
      {
        slug: "why-was-my-booking-refused",
        title: "Why was my booking refused?",
        description:
          "Every message AerScheduler gives when it will not create a booking, what it means, and the shortest way past it.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "does not meet currency requirements booking error flight school",
      },
      {
        slug: "why-cant-i-edit-move-or-cancel",
        title: "Why can't I edit, move or cancel this booking?",
        description:
          "Bookings lock as they move through the day, and a few actions are narrower than they look. This page says which rule caught you and what to do instead.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "you are unauthorized to make this request cancel reservation",
      },
    ],
  },
  {
    slug: "billing",
    title: "Billing and payments",
    navLabel: "Billing",
    blurb: "Price a flight, split it between the people on it, and get paid.",
    intro:
      "Rates, invoices or an account ledger, split billing, memberships and dues, and the Stripe and QuickBooks connections. What a booking costs and who pays it.",
    icon: "CreditCard",
    articles: [
      {
        slug: "how-billing-works",
        title: "How billing works in AerScheduler",
        description:
          "Invoice each booking or Account ledger: the path from booking to bill, what you set up first, where money shows up, and ledger-only tools like auto-refill and late fees.",
        kind: "overview",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "how does flight school billing work in AerScheduler",
        faqs: [
          {
            q: "Do we have to use invoices?",
            a: "No. Under Settings → Billing → How members pay, the owner can switch the school to Account ledger. Member flights then post to a balance instead of a Stripe invoice. Guests still get a pay-this-visit invoice.",
          },
          {
            q: "Can some members use invoices and others use a ledger?",
            a: "No. How members pay is school-wide. Guests are the exception: they always get a visit invoice even when members are on the ledger.",
          },
          {
            q: "Where do members add money on Account ledger?",
            a: "Billing under You (Add funds), or Profile → Payment methods. Admins can also desk-credit cash or check from People → the member → Ledger.",
          },
        ],
      },
      {
        slug: "who-can-do-what-in-billing",
        title: "Who can see and do what in billing",
        description:
          "Every billing action by role, including invoices, the account ledger, auto-refill, and the places being an admin is not enough.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "flight school billing permissions by role",
      },
      {
        slug: "turn-on-invoicing-and-card-payments",
        title: "Turn on invoicing and card payments",
        description:
          "Connect Stripe so the school can take card payments, switch billing on, pick invoice or account ledger, and set the rates and fees every bill is built from.",
        kind: "task",
        audience: ["Owners"],
        seoQuery: "how to accept card payments at a flight school with Stripe",
      },
      {
        slug: "choose-invoice-or-account-ledger",
        title: "Choose invoice or account ledger",
        description:
          "Bill members with a new invoice for each booking, or with a prepaid account balance (auto-refill, late fees, book/dispatch gates). Guests always get a pay-this-visit invoice.",
        kind: "task",
        audience: ["Owners"],
        seoQuery: "flight school account ledger vs invoice billing",
      },
      {
        slug: "set-a-card-fee-on-account-top-ups",
        title: "Set a card fee on account top-ups",
        description:
          "Optionally recover card processing when members add funds to a ledger balance. Cash and check at the desk stay dollar-for-dollar.",
        kind: "task",
        audience: ["Owners"],
        seoQuery: "card surcharge on flight school account top up",
      },
      {
        slug: "charge-a-flight-to-the-account-ledger",
        title: "Charge a flight to the account ledger",
        description:
          "When the school uses Account ledger, close-out posts a balance charge for members instead of a Stripe invoice. Guests still get a pay-this-visit invoice.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "charge flight to prepaid account balance AerScheduler",
        faqs: [
          {
            q: "Why is there no invoice after I closed out a member flight?",
            a: "If Settings → Billing is set to Account ledger, member flights post to the account balance. Look for Charged to account ledger on the booking, or a Flight row on the member's Billing tab.",
          },
          {
            q: "Do guest flights go on the ledger too?",
            a: "No. Guests always get a pay-this-visit invoice, even when the school uses Account ledger for members.",
          },
        ],
      },
      {
        slug: "manage-a-member-account-ledger",
        title: "Manage a member's account ledger",
        description:
          "Read the balance, add funds or desk credit, set auto-refill, late fees, statements, print a receipt, refund prepaid money, and reassign a flight charge.",
        kind: "task",
        audience: ["Owners", "Admins", "Students", "Renters"],
        seoQuery: "flight school member account ledger receipt reassign charge auto-refill",
        faqs: [
          {
            q: "Can I edit a ledger charge that was posted wrong?",
            a: "No. Reverse it (or reassign a flight charge) so both the mistake and the fix stay on the account. There is no edit-in-place.",
          },
          {
            q: "Who can reassign a flight charge?",
            a: "Owners and admins only, from People → the member → Billing, on a live Flight row that has not already been reversed.",
          },
          {
            q: "What does auto-refill do?",
            a: "It charges the member's default card on a schedule to add credit: when the balance drops under a floor, to pay what they owe, or a fixed amount. Three failed charges pause it and email the member; a successful charge emails the new balance. The card is not deleted.",
          },
          {
            q: "Do members get a late-fee email?",
            a: "Yes. A reminder about a week before grace (when grace is longer than 7 days), then a receipt email and in-app notice when the monthly fee posts. Open Receipt on the Fee row.",
          },
        ],
      },
      {
        slug: "review-account-balances-and-who-owes",
        title: "Review account balances and who owes",
        description:
          "On Account ledger, Operations Billing lists every member's balance. Filter who owes, open a ledger, and use Reports for aging.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "flight school accounts receivable ledger balances who owes",
        faqs: [
          {
            q: "Why do I still see an Invoices tab in ledger mode?",
            a: "Guests always get pay-this-visit invoices, and leftover invoices from before you switched still need a home. Member flights post to the Accounts tab.",
          },
          {
            q: "Where is aging, like 30 60 90 days?",
            a: "Operations Billing shows days owing on each row. The Accounts receivable report under Reports groups those balances (or unpaid invoices, in invoice mode) into age buckets and exports.",
          },
        ],
        related: [
          "/docs/billing/manage-a-member-account-ledger",
          "/docs/billing/choose-invoice-or-account-ledger",
          "/docs/reports/run-a-report",
        ],
      },
      {
        slug: "set-aircraft-and-instruction-rates",
        title: "Set your aircraft and instruction rates",
        description:
          "What an aircraft costs per hour, which meter it bills on, and what instruction costs, which together decide every number on a flight invoice.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "set hourly aircraft rate wet or dry hobbs or tach",
      },
      {
        slug: "close-out-a-flight-and-bill-it",
        title: "Close out a flight so it invoices",
        description:
          "Ramp out, ramp in, then every pilot confirms with their PIN. The bill posts when the last person signs off: a Stripe invoice, or a ledger charge when Account ledger is on.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "how to close out a flight and create the invoice",
      },
      {
        slug: "why-a-flight-was-not-invoiced",
        title: "Why a flight was not invoiced",
        description:
          "Work through the six reasons a completed flight produced no invoice, starting with the one that is true nine times out of ten.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Instructors"],
        seoQuery: "flight closed out but no invoice was created",
      },
      {
        slug: "set-up-cost-splitting",
        title: "Split a booking's cost between several people",
        description:
          "Set one rule per booking type deciding how the aircraft time and the instruction divide between the people on board. Each person then gets their own invoice.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "split flight cost between two pilots flight school software",
      },
      {
        slug: "who-pays-what-at-close-out",
        title: "Fill in Who pays what on a shared booking",
        description:
          "The panel between ramp-in and invoicing where you record each person's hours or share. Only the fields your school's rule uses actually matter.",
        kind: "task",
        audience: ["Dispatchers", "Instructors", "Admins", "Students", "Renters"],
        seoQuery: "who pays what panel shared booking hobbs per person",
      },
      {
        slug: "charge-a-minimum-for-overnight-trips",
        title: "Charge a minimum for overnight trips",
        description:
          "Set the least you will bill per night an aircraft is kept away, so a weekend away does not bill as 1.5 hours of flying.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "flight school overnight minimum aircraft rental charge per night",
      },
      {
        slug: "bill-a-discovery-or-guest-flight",
        title: "Bill a discovery or guest flight",
        description:
          "A guest has no account and no PIN, so a guest booking closes out in one step and Stripe emails them the invoice directly.",
        kind: "task",
        audience: ["Admins", "Instructors"],
        seoQuery: "invoice a discovery flight guest without an account",
      },
      {
        slug: "create-a-manual-invoice",
        title: "Create a manual invoice",
        description:
          "Bill for anything that is not a flight: headsets, checkride fees, fuel on a dry rate, a rental you are correcting by hand.",
        kind: "task",
        audience: ["Admins", "Owners", "Dispatchers", "Instructors"],
        seoQuery: "create a custom invoice for a flight school member",
      },
      {
        slug: "mark-an-invoice-paid-void-or-refund-it",
        title: "Mark an invoice paid, void it, or refund it",
        description:
          "Record a cash or check payment, cancel an invoice that should never have been raised, and understand why refunds only happen in Stripe.",
        kind: "task",
        audience: ["Admins", "Owners"],
        seoQuery: "how to refund or void a flight school invoice",
      },
      {
        slug: "chase-unpaid-invoices",
        title: "Chase an unpaid invoice",
        description:
          "Send a reminder by hand, let the nightly sweep chase for up to four weeks, then take over. Optionally ground members once they owe too many invoices.",
        kind: "task",
        audience: ["Admins", "Owners"],
        seoQuery: "send payment reminder for an unpaid flight school invoice",
      },
      {
        slug: "pay-an-invoice-and-save-a-card",
        title: "Pay your invoice and set up autopay",
        description:
          "Where to find what you owe, how to pay it by card, and how to save a card so future flights settle on their own.",
        kind: "task",
        audience: ["Students", "Renters", "Instructors"],
        seoQuery: "how do I pay my flight school invoice",
      },
      {
        slug: "set-up-membership-dues",
        title: "Set up membership plans and dues",
        description:
          "A plan is what belonging costs: a join fee, recurring dues, when they are billed, and what the tier gets in return.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "flying club membership dues billing software",
      },
      {
        slug: "add-a-member-to-a-plan",
        title: "Add a member to a plan and bill their dues",
        description:
          "Put somebody on a plan, bill or waive the join fee, and bill each dues period as it comes due. Dues are ordinary invoices, so they pay the same way.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "bill membership dues to a club member",
      },
      {
        slug: "send-paid-invoices-to-quickbooks",
        title: "Send paid invoices to QuickBooks Online",
        description:
          "Connect the Intuit company once, pick the income item every line posts to, and each invoice becomes a Sales Receipt the moment it is paid.",
        kind: "task",
        audience: ["Owners"],
        seoQuery: "AerScheduler QuickBooks Online integration for flight schools",
      },
      {
        slug: "billing-troubleshooting",
        title: "Billing troubleshooting and FAQ",
        description:
          "The billing behavior that surprises people most, including invoice vs ledger quirks, with the reason for each and what to do about it.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters"],
        seoQuery: "AerScheduler billing problems invoice wrong amount",
      },
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance and squawks",
    navLabel: "Maintenance",
    blurb: "Track what every aircraft owes, and keep an unairworthy tail off the schedule.",
    intro:
      "Inspections and their due dates, the squawks people report, grounding and return to service, and how all of it reaches the dispatch board.",
    icon: "Wrench",
    articles: [
      {
        slug: "how-maintenance-tracking-works",
        title: "How maintenance tracking works",
        description:
          "Read this first. It sets the vocabulary the rest of the section uses: an inspection is what an aircraft owes on a schedule, a squawk is a problem somebody found, and grounding is the only thing that actually stops a booking.",
        kind: "overview",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "how to track aircraft maintenance and inspections in AerScheduler",
      },
      {
        slug: "add-the-standard-airworthiness-inspections",
        title: "Add the standard airworthiness inspections",
        description:
          "Maintenance, then Add inspections, then leave the mode on Standard set. All seven AVIATES items are ticked to start. Untick what does not apply, say when each was last done, and pick the tails.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "set up annual and 100 hour inspection tracking for a flight school",
      },
      {
        slug: "add-your-own-inspection",
        title: "Add your own inspection or a one-off reminder",
        description:
          "Maintenance, then Add inspections. Choose Recurring for anything that repeats on hours or days, or One-off for a single date. Name it, set the interval and the warning lead, then pick the tails.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "add a custom aircraft inspection reminder such as an oil change",
      },
      {
        slug: "set-when-an-inspection-was-last-done",
        title: "Set when an inspection was last done",
        description:
          "When you attach an inspection to an aircraft, fill in When was it last done? with the date and the meter reading from the last time the work was actually performed. Leave it blank only if the work was just done.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "aircraft inspection reminder started from the wrong hours",
      },
      {
        slug: "choose-how-we-handle-airworthiness-directives",
        title: "Choose how much AerScheduler does about Airworthiness Directives",
        description:
          "Four choices, and nothing is on by default. Do nothing about ADs, track them here yourself, have AerScheduler watch newly published ADs for ones naming your fleet, or say that applicability is tracked in another system such as ADlog or AVTRAK. Also explains what a serial number buys you and why we never decide that an AD does not apply.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "turn off airworthiness directive tracking flight school software",
      },
      {
        slug: "track-airworthiness-directives",
        title: "Track Airworthiness Directives and keep the compliance record",
        description:
          "Set an inspection's source to Airworthiness Directive and give it the AD number and revision date. Signing it off then keeps a permanent record of what was done, the meter readings and who certified it. The Compliance log is the history and the Airworthiness compliance report prints it. AerScheduler records the ADs you enter; it does not tell you which ADs apply to your aircraft.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "track airworthiness directive AD compliance for a flight school aircraft",
      },
      {
        slug: "sign-off-an-inspection",
        title: "Sign off a completed inspection",
        description:
          "Click Sign off on the inspection row, set Completed on to the day the work actually finished, correct the meter reading, add notes, then Sign off. A repeating inspection immediately starts counting again from those numbers.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "sign off a completed 100 hour or annual inspection",
      },
      {
        slug: "change-or-stop-tracking-an-inspection",
        title: "Change which aircraft an inspection covers, or stop tracking it",
        description:
          "To add a tail from the console, open that aircraft and use Maintenance, then Add. To change the whole list or delete the rule, use Maintenance, then Set up. Deleting a rule stops tracking on every aircraft it covers.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "remove an aircraft from an inspection reminder or delete the reminder",
      },
      {
        slug: "when-aerscheduler-grounds-an-aircraft",
        title: "When AerScheduler grounds an aircraft by itself",
        description:
          "An inspection carrying the Grounds the aircraft flag grounds its tail the moment it comes due, with the reason Maintenance. Signing the last one off puts the aircraft back on the line on its own.",
        kind: "reference",
        audience: ["Owners", "Admins", "Technicians", "Dispatchers"],
        seoQuery: "aircraft grounded automatically when maintenance is due",
      },
      {
        slug: "ground-an-aircraft",
        title: "Ground an aircraft, and return it to service",
        description:
          "Open the aircraft and click Ground, or use the overflow menu on the Aircraft list. Type a reason. The aircraft cannot be booked for anything except maintenance until an admin returns it to service.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "how to ground an aircraft so it cannot be booked",
      },
      {
        slug: "report-a-squawk",
        title: "Report a squawk",
        description:
          "On the console: Maintenance, then Log a squawk. On the iOS app: any aircraft page, or the prompt that opens by itself after you enter Hobbs and tach at close-out. Give it a title, a description, and a tail.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians", "Instructors", "Students", "Renters"],
        seoQuery: "report an aircraft squawk or discrepancy in a flight school app",
      },
      {
        slug: "resolve-a-squawk",
        title: "Resolve a squawk",
        description:
          "Maintenance, then Squawks, then Open. Click Resolve on the card, set Completed to the day the work finished, write what was done, then Resolve squawk. Verify is a separate stamp and only exists in the iOS app.",
        kind: "task",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "resolve a squawk and the difference between resolved and verified",
      },
      {
        slug: "book-an-aircraft-in-for-maintenance",
        title: "Book an aircraft in for maintenance",
        description:
          "Start a booking, choose the Maintenance type, pick the aircraft and the window, and save. Nobody is assigned to it, it blocks the whole window on the dispatch board, and it is never invoiced.",
        kind: "task",
        audience: ["Technicians", "Owners", "Admins", "Dispatchers"],
        seoQuery: "schedule aircraft maintenance downtime so nobody books it",
      },
      {
        slug: "why-cant-i-book-this-aircraft",
        title: "Why can't I book this aircraft?",
        description:
          "If the booking is refused with \"Resource is grounded\", the aircraft has been taken off the line and only an admin can put it back. Open squawks are a warning and never block a booking.",
        kind: "troubleshooting",
        audience: ["Instructors", "Students", "Renters", "Dispatchers"],
        seoQuery: "resource is grounded cannot book aircraft flight school",
      },
      {
        slug: "who-can-do-what-in-maintenance",
        title: "Who can do what in maintenance",
        description:
          "Admins, owners and technicians do the work. Dispatchers can read every board but cannot sign anything off. Instructors, students and renters cannot open Maintenance in the console at all, and file squawks from the iOS app.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians", "Instructors"],
        seoQuery: "flight school technician and dispatcher permissions for maintenance",
      },
      {
        slug: "who-gets-maintenance-reminders-and-squawk-alerts",
        title: "Who gets maintenance reminders and squawk alerts",
        description:
          "Only admins and technicians ever receive maintenance reminders or squawk alerts. You can turn maintenance reminders off for yourself under Notifications. Squawk alerts cannot be turned off.",
        kind: "reference",
        audience: ["Owners", "Admins", "Technicians"],
        seoQuery: "turn off maintenance reminder emails for a flight school",
      },
      {
        slug: "troubleshooting-inspections-and-squawks",
        title: "Troubleshooting inspections and squawks",
        description:
          "Most maintenance surprises come down to four things: hour-based reminders only fire at close-out, a countdown that started from the wrong point, a character limit the form does not show you, and a grounding reason that was typed by hand.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Technicians", "Dispatchers"],
        seoQuery: "aircraft maintenance reminder not sending email or notification",
      },
    ],
  },
  {
    slug: "training",
    title: "Training and curriculum",
    navLabel: "Training",
    blurb: "Build a syllabus, enroll students, and keep the record the FAA asks for.",
    intro:
      "Courses, syllabus versions, enrollments, grading and sign-off, hour requirements, and endorsements. Start with the overview: the rest of this section builds on it.",
    icon: "GraduationCap",
    articles: [
      {
        slug: "how-training-works",
        title: "How training records work in AerScheduler",
        description:
          "The five pieces the training module is made of, and how a flight you already booked turns into a signed lesson, credited hours, and a record you can hand an inspector.",
        kind: "overview",
        audience: ["Owners", "Admins", "Instructors"],
        seoQuery: "flight school training records software how it works",
      },
      {
        slug: "part-61-vs-part-141",
        title: "Part 61 vs Part 141: what the setting changes",
        description:
          "Part 141 requires a published syllabus before enrolling, a certified record, and every FAA requirement met before graduation. Part 61 enforces none of it. The choice is made once per course and cannot be changed.",
        kind: "reference",
        audience: ["Owners", "Admins", "Instructors"],
        seoQuery: "part 61 vs part 141 flight training software",
      },
      {
        slug: "create-a-course",
        title: "Create a course",
        description:
          "Start from one of the four built-in syllabi, or from an empty course. Either way you choose Part 61 or Part 141 once, and you get a single editable draft called Rev A.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "create a flight training course syllabus template",
      },
      {
        slug: "build-a-syllabus",
        title: "Build a syllabus: stages, lessons and tasks",
        description:
          "Add stages, then lessons inside them, then the graded tasks inside a lesson. The control that matters most is Credits toward, because a lesson with nothing ticked credits no hours at all.",
        kind: "task",
        audience: ["Owners", "Admins", "Instructors"],
        seoQuery: "how to build a flight training syllabus",
      },
      {
        slug: "add-hour-requirements",
        title: "Add hour and landing requirements to a course",
        description:
          "Requirements are what a student must accumulate before graduating, tracked separately from lessons. Set the amount, where it comes from, and any simulator, transfer or recency limit.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "set flight hour requirements for a course",
      },
      {
        slug: "set-the-grading-scale",
        title: "Set the grading scale for a course",
        description:
          "Every course version has its own marks and decides which of them mean the lesson is complete. The default is S, U and I. Read the limits before you change it.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "change lesson grading scale flight school",
      },
      {
        slug: "publish-a-syllabus-version",
        title: "Publish a syllabus version, and change it later",
        description:
          "Publishing locks a version forever. To change a published syllabus you create a new version, publish that, and retire the old one. Students already enrolled finish on the version they started.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "edit a published syllabus flight school",
      },
      {
        slug: "enroll-a-student",
        title: "Enroll a student in a course",
        description:
          "Open the course, check which version is selected, then Enroll a student. The student is pinned to that exact version for the whole course.",
        kind: "task",
        audience: ["Owners", "Admins", "Instructors"],
        seoQuery: "enroll a student in a course flight school software",
      },
      {
        slug: "course-enrollment-fee",
        title: "Charge a course enrollment fee",
        description:
          "Set one amount per course and the wording that lands on the invoice. Each student records that amount as owed on the day they enroll, and it is billed in one click.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "charge a course enrollment fee flight school",
      },
      {
        slug: "grade-a-lesson-at-close-out",
        title: "Grade a lesson when you close out the flight",
        description:
          "The intended path. Close out the booking as usual, then grade and sign the lesson in the Training record section. Flight and ground hours are already filled in from the Hobbs and the briefing time.",
        kind: "task",
        audience: ["Instructors", "Admins"],
        seoQuery: "grade a training lesson after a flight",
      },
      {
        slug: "grade-a-lesson-from-a-training-record",
        title: "Grade a lesson from a student's training record",
        description:
          "Open the student's record, find the lesson, then save a draft or save and sign. Signing freezes the record and posts its hours to every requirement the lesson credits.",
        kind: "task",
        audience: ["Instructors", "Admins"],
        seoQuery: "record a training lesson grade student record",
      },
      {
        slug: "grade-lessons-offline-on-the-app",
        title: "Grade lessons offline on the iPhone app",
        description:
          "Grade at the aircraft with no signal. The grade is stored on the phone and syncs when you are back. Open the student once while online first, or the screen will not draw.",
        kind: "task",
        audience: ["Instructors", "Admins"],
        seoQuery: "grade flight lesson offline app",
      },
      {
        slug: "correct-a-signed-lesson",
        title: "Correct a signed lesson record",
        description:
          "A signed record can never be edited. Amend it instead: the original stays on the record struck through and a correction is created beside it. The hours come back only when you sign the correction.",
        kind: "task",
        audience: ["Instructors", "Admins"],
        seoQuery: "fix a signed training record mistake",
      },
      {
        slug: "credit-prior-training",
        title: "Credit prior training and simulator time",
        description:
          "Post credit against a requirement for training done at another school or in a device. Enter the date it was actually flown, not today.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "give a student credit for previous flight training",
      },
      {
        slug: "read-a-training-record",
        title: "Read a training record: lessons, hours and the ledger",
        description:
          "What each tab of a student's record means, why lessons complete and hours can disagree, and why a requirement can show fewer hours than the student actually flew.",
        kind: "reference",
        audience: ["Owners", "Admins", "Instructors", "Students"],
        seoQuery: "student training record progress hours flight school",
      },
      {
        slug: "graduate-or-end-an-enrollment",
        title: "Graduate a student, or end an enrollment",
        description:
          "Certify the record first if the course is Part 141, then graduate. Terminated and transferred enrollments keep everything already recorded.",
        kind: "task",
        audience: ["Owners", "Admins"],
        seoQuery: "graduate a student flight training course",
      },
      {
        slug: "sign-an-endorsement",
        title: "Sign an endorsement",
        description:
          "Pick a template, fill in every blank, add your certificate number, and sign. The text is stored exactly as you signed it, and the endorsement belongs to the pilot rather than to a course.",
        kind: "task",
        audience: ["Instructors", "Admins"],
        seoQuery: "sign a solo endorsement flight instructor software",
      },
      {
        slug: "endorsements-about-to-expire",
        title: "Find endorsements about to expire",
        description:
          "The Endorsement expirations report and the dashboard tile are the durable list. The nightly email is a convenience and is only sent once per stage.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors"],
        seoQuery: "endorsement expiration report flight school",
      },
      {
        slug: "my-training-for-students",
        title: "See your training progress and sign your lessons",
        description:
          "My training shows every course you are on, how far through the syllabus you are, the hours you still need, and any lesson waiting for your signature.",
        kind: "task",
        audience: ["Students", "Renters", "Instructors"],
        seoQuery: "student flight training progress app sign lesson",
      },
      {
        slug: "who-can-do-what-in-training",
        title: "Who can see and do what in Training",
        description:
          "What each role can do on its own, what the four training grants add, and the two places the screen offers a button the server will refuse.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors"],
        seoQuery: "training permissions flight school roles instructor",
      },
      {
        slug: "training-records-for-an-faa-inspection",
        title: "Pull training records for an FAA inspection",
        description:
          "The Training records report is the log to hand an inspector. Set the range, filter to the student, add the columns you need, and export.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers"],
        seoQuery: "faa 141 training records report export",
      },
      {
        slug: "training-troubleshooting",
        title: "Training: why it did that",
        description:
          "The behaviour people email about most: hours that will not count, buttons that are disabled, sections that never appear, and numbers that went down.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students"],
        seoQuery: "aerscheduler training records not counting hours",
      },
    ],
  },
  {
    slug: "reports",
    title: "Reports and analytics",
    navLabel: "Reports",
    blurb: "Run the numbers, save the view, and see who changed what.",
    intro:
      "The built-in reports, the filters and groupings that shape them, saved views, scheduled email, the dashboard, and the audit trail.",
    icon: "BarChart3",
    articles: [
      {
        slug: "how-reporting-works",
        title: "How reporting works in AerScheduler",
        description:
          "One Reports page holds 19 built-in reports, your own Overview dashboard, and the emails that go out on a schedule. Four ideas explain the rest: report, category, saved view, and date basis.",
        kind: "overview",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "AerScheduler reports and analytics",
      },
      {
        slug: "run-a-report",
        title: "Run a report and filter the results",
        description:
          "Pick a report from the left rail, set the date range, then use Filters to narrow it. Read the small caption under the toolbar first: it tells you which date the range applies to.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "how to filter a report in AerScheduler",
      },
      {
        slug: "group-a-report",
        title: "Group a report to rank aircraft, instructors, or students",
        description:
          "Group by collapses the rows into one line per aircraft, instructor, customer, or day, and adds a share bar so the ranking is obvious. It lives in the Filters menu, next to the column picker.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "group a flight school report by aircraft",
      },
      {
        slug: "export-a-report-to-csv",
        title: "Export a report to CSV or PDF",
        description:
          "Set the report up the way you want it and click Export. CSV is for a spreadsheet, PDF is for the copy somebody hands over. Both hold every matching row, not just the page on screen.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "export flight school report to csv excel",
      },
      {
        slug: "save-a-report-view",
        title: "Save a report as a view, and share it with the school",
        description:
          "A saved view remembers the filters, grouping, columns, sort, and dates that were on screen. It is how a school turns 18 reports into the thirty it actually asks for.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "save a custom report in AerScheduler",
      },
      {
        slug: "email-a-report-on-a-schedule",
        title: "Email a report to yourself or your accountant on a schedule",
        description:
          "Save the report as a view, then click the clock icon beside it. AerScheduler emails that view as a CSV every day, week, or month, at an hour on your school's clock.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "email a report automatically every week flight school",
      },
      {
        slug: "scheduled-report-not-arriving",
        title: "A scheduled report did not arrive",
        description:
          "Open Reports, then Scheduled reports, and read the last line on the card. It tells you when the last email went, that nothing has gone yet, or exactly why the last send failed.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Dispatchers"],
        seoQuery: "scheduled report email not sending flight school",
      },
      {
        slug: "build-your-overview-dashboard",
        title: "Build your Overview dashboard",
        description:
          "Overview is your own dashboard, not the school's. Click Customise to move, resize, add, or remove tiles, then Done to save. Nothing is stored until you press Done.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "customize reports dashboard flight school",
      },
      {
        slug: "needs-attention",
        title: "Work the Needs attention list",
        description:
          "The card under the Overview tiles counts what is genuinely outstanding: overdue invoices, flights flown but never invoiced, flights awaiting close-out, grounded aircraft, open squawks, and anything expiring. Click one and the report opens already filtered.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "flights flown but not invoiced flight school",
      },
      {
        slug: "member-and-aircraft-activity",
        title: "See one student's hours or one aircraft's utilization",
        description:
          "You do not need a report for a single person or a single tail. Open the member and choose Activity, or open the aircraft and choose Utilization. Each has its own date range.",
        kind: "task",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "how many hours has a student flown AerScheduler",
      },
      {
        slug: "audit-log",
        title: "Find out who changed something",
        description:
          "Audit Logs records who did what, from which surface, and exactly which fields moved. It is owner and admin only. Anyone who can see a booking can read that booking's own Activity timeline instead.",
        kind: "task",
        audience: ["Owners", "Admins", "Instructors", "Students"],
        seoQuery: "who cancelled this reservation flight school",
      },
      {
        slug: "report-catalog",
        title: "Every report, and what it counts",
        description:
          "The 19 built-in reports, the category each sits in, the date its range applies to, and the window it opens on. Use it to pick the right report the first time.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "list of flight school reports AerScheduler",
      },
      {
        slug: "who-can-see-which-reports",
        title: "Who can see which reports",
        description:
          "Reporting permissions come from one thing: the category a report sits in. Financial is owner and admin only. Dispatchers get everything else. Technicians get Fleet.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Instructors", "Students", "Renters", "Technicians"],
        seoQuery: "can a dispatcher see revenue reports flight school",
      },
      {
        slug: "date-ranges-and-time-zones",
        title: "Date ranges, date basis, and your school's time zone",
        description:
          "Every reporting window is measured on your school's clock, and every report states which date the window applies to. Set the time zone once, then read the caption on each report.",
        kind: "reference",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "flight school report wrong dates time zone",
      },
      {
        slug: "numbers-dont-match",
        title: "Report numbers that look wrong",
        description:
          "The usual reasons two AerScheduler numbers disagree, in the order people hit them. Nearly all of them come down to which date the window applies to, or a flight that was never closed out.",
        kind: "troubleshooting",
        audience: ["Owners", "Admins", "Dispatchers", "Technicians"],
        seoQuery: "flight school report numbers do not match",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export function getSection(slug: string): DocSection | undefined {
  return DOC_SECTIONS.find((s) => s.slug === slug);
}

export function getArticle(
  sectionSlug: string,
  articleSlug: string
): { section: DocSection; article: DocArticle } | undefined {
  const section = getSection(sectionSlug);
  const article = section?.articles.find((a) => a.slug === articleSlug);
  if (!section || !article) return undefined;
  return { section, article };
}

export function articleHref(sectionSlug: string, articleSlug: string): string {
  return `/docs/${sectionSlug}/${articleSlug}`;
}

/** Flat, in nav order. Used for prev/next and for the sitemap. */
export function allArticles(): { section: DocSection; article: DocArticle; href: string }[] {
  return DOC_SECTIONS.flatMap((section) =>
    section.articles.map((article) => ({
      section,
      article,
      href: articleHref(section.slug, article.slug),
    }))
  );
}

export function neighbours(sectionSlug: string, articleSlug: string) {
  const flat = allArticles();
  const index = flat.findIndex(
    (entry) => entry.section.slug === sectionSlug && entry.article.slug === articleSlug
  );
  return { previous: flat[index - 1], next: flat[index + 1] };
}

/** Every docs route, for the sitemap. */
export function docRoutes(): string[] {
  return [
    "/docs",
    ...DOC_SECTIONS.map((s) => `/docs/${s.slug}`),
    ...allArticles().map((entry) => entry.href),
  ];
}

export function articleCount(): number {
  return allArticles().length;
}

/* ------------------------------------------------------------------ */
/* Nav links                                                           */
/* ------------------------------------------------------------------ */

/**
 * Documentation entries for the Resources mega-menu and the footer.
 *
 * Shaped like `ResourceLink` but declared here rather than in `lib/resources.ts`
 * so the descriptions live next to the sections they describe. `resources.ts`
 * imports this; the reverse import is type-only and erased, so the pair is not
 * a runtime cycle (same arrangement as `lib/developers.ts`).
 */
export const DOC_LINKS: { href: string; label: string; description: string }[] = [
  {
    href: "/docs",
    label: "All documentation",
    description: "How to use every part of AerScheduler, step by step.",
  },
  ...DOC_SECTIONS.map((section) => ({
    href: `/docs/${section.slug}`,
    label: section.navLabel,
    description: section.blurb,
  })),
];
