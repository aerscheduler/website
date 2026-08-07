import { existsSync } from "node:fs";
import path from "node:path";

/**
 * The screenshot manifest for the help docs.
 *
 * Every image an article wants is declared here first, with the *data state*
 * needed to stage it. That field is the point of the file: a screenshot of an
 * empty dispatch board teaches nothing, and the person capturing the image
 * months from now will not otherwise know that the board needed two aircraft,
 * one dual booking, and one grounded tail to be worth looking at.
 *
 * `scripts/capture-docs-screenshots.mjs` reads this manifest, signs in to the
 * demo organisation, drives each route, and writes `public/docs/<id>.png`.
 *
 * Until a file lands, `<Screenshot>` renders a labelled frame rather than a
 * broken image, so an article is publishable before its pictures exist and no
 * page can ship with a dead `<img>`.
 */

export type ScreenshotSpec = {
  id: string;
  /** The screen, as a user would name it. Becomes the placeholder label. */
  screen: string;
  /** Console path to drive to, relative to the app origin. */
  route: string;
  /** Alt text. Written for a screen reader, not for SEO stuffing. */
  alt: string;
  /** Shown under the image. Optional; skip it when the alt says enough. */
  caption?: string;
  /** What has to exist in the org before this image is worth taking. */
  dataState: string;
  // Desktop only. There was a `viewport: "phone"` option and a `manual: "ios"`
  // flag for shooting the mobile app; both are gone. The documentation
  // illustrates the web console, which is the full operations surface, and a
  // phone-width image of it is a narrower picture of the same thing rather than
  // a different subject. The ten iOS-app specs were removed with them.
  /**
   * The element to crop to, always a `[data-doc-shot="..."]` attribute placed in
   * the console for this purpose.
   *
   * REQUIRED for anything the capture script shoots. A whole-viewport image
   * arrives on the page about 700px wide, so the nav rail and the topbar eat
   * half of it and the subject becomes a postage stamp. The script refuses a
   * spec that does not declare one.
   *
   * The attribute rather than a class chain, because a class chain is correct
   * until somebody restyles the card and then silently crops the wrong thing.
   */
  crop?: string;

};

export const SCREENSHOTS: ScreenshotSpec[] = [
  {
    id: "schedule-day-board",
    screen: "Calendar, day view",
    route: "/schedule?view=day",
    alt: "Calendar, day view",
    dataState:
      "Today. At least three aircraft, one simulator and one room lane. Six or more bookings spread across the day including one dual, one rental, one sim, one maintenance on a grounded tail, and one dual with no aircraft so the catch-all row is populated. Capture on a weekday so the red now-line lands mid board. A second capture of the same day signed in as a renter, to show the aircraft only board.",
    crop: '[data-doc-shot="schedule-day-board"]',
  },
  {
    id: "schedule-month-grid",
    screen: "Calendar, month view",
    route: "/schedule?view=month",
    alt: "Calendar, month view",
    dataState:
      "A month where at least one day carries four or more bookings, so the three chips plus the plus N more link both show.",
    crop: '[data-doc-shot="schedule-month-grid"]',
  },
  {
    id: "schedule-unassigned-row",
    screen: "Calendar, day view, bottom row",
    route: "/schedule?view=day",
    alt: "Calendar, day view, bottom row",
    dataState:
      "One dual booked with no aircraft, plus one room booking, so the row is labelled Other rather than Unassigned. Crop to the last row and its label.",
    crop: '[data-doc-shot="schedule-unassigned-row"]',
  },
  {
    id: "my-schedule-list",
    screen: "My schedule",
    route: "/me/schedule",
    alt: "My schedule",
    dataState:
      "A student with a booking today, one tomorrow, and one later in the week, so all three day headings render.",
    crop: '[data-doc-shot="my-schedule-list"]',
  },
  {
    id: "reservation-detail-panel",
    screen: "Reservation detail panel",
    route: "/schedule?reservation=<id>",
    alt: "Reservation detail panel",
    dataState:
      "A dual that has not ramped out. Instructor and student both listed, notes filled in, a location set so the weather badge renders, Dispatch section showing the Not started badge, and at least a Booked line in the audit timeline.",
    crop: '[data-doc-shot="reservation-detail-panel"]',
  },
  {
    id: "reservation-detail-awaiting-signoff",
    screen: "Reservation detail panel, close-out section",
    route: "/schedule?reservation=<id>",
    alt: "Reservation detail panel, close-out section",
    dataState:
      "A two person dual that has ramped in, with one of the two pilots already confirmed, so the panel reads Flown. Needs pilot sign-off. 1 of 2 confirmed.",
    crop: '[data-doc-shot="reservation-detail-awaiting-signoff"]',
  },
  {
    id: "reservation-form-dispatch",
    screen: "New reservation modal, dispatch variant",
    route: "/schedule",
    alt: "New reservation modal, dispatch variant",
    dataState:
      "Signed in as an admin or dispatcher. Modal open with a title typed, Type set to Dual, an aircraft chosen, and an instructor and a student assigned. A second capture of the same modal with the Type dropdown open showing all eight types.",
    crop: '[data-doc-shot="reservation-form-dispatch"]',
  },
  {
    id: "time-picker-next-available",
    screen: "Booking form, date and time picker",
    route: "/me/book",
    alt: "Booking form, date and time picker",
    dataState:
      "An aircraft booked solid for the chosen day, so the Start dropdown has no options and the Next available date and time link appears.",
    crop: '[data-doc-shot="time-picker-next-available"]',
  },
  {
    id: "repeat-dropdown-presets",
    screen: "Booking form, Repeat control",
    route: "/schedule",
    alt: "Booking form, Repeat control",
    dataState:
      "A booking form with a Monday date and a start and end time already chosen, Repeat dropdown open on the derived presets, and the summary line reading Repeats every week on Monday with a booking count.",
    crop: '[data-doc-shot="repeat-dropdown-presets"]',
  },
  {
    id: "drag-callout-conflict",
    screen: "Calendar, day view, block being dragged",
    route: "/schedule?view=day",
    alt: "Calendar, day view, block being dragged",
    dataState:
      "Two bookings on the same aircraft, one being dragged over the other so the red callout names the clash. A second capture of the hover tooltip on an invoiced block, which needs one closed out and invoiced flight on the same day.",
    crop: '[data-doc-shot="drag-callout-conflict"]',
  },
  {
    id: "ramp-out-modal",
    screen: "Ramp out modal",
    route: "/schedule?reservation=<id>",
    alt: "Ramp out modal",
    dataState:
      "A booking with an aircraft that has current Hobbs and tach readings on its record, not yet ramped out, so both fields show prefilled values.",
    crop: '[data-doc-shot="ramp-out-modal"]',
  },
  {
    id: "ramp-in-modal-hours-flown",
    screen: "Ramp in modal",
    route: "/schedule?reservation=<id>",
    alt: "Ramp in modal",
    dataState:
      "A same day booking that has ramped out, with an ending Hobbs typed that is 1.4 above the out reading so the live Hours flown line renders.",
    crop: '[data-doc-shot="ramp-in-modal-hours-flown"]',
  },
  {
    id: "ramp-in-overnight-notice",
    screen: "Ramp in modal, overnight notice",
    route: "/schedule?reservation=<id>",
    alt: "Ramp in modal, overnight notice",
    dataState:
      "An organization overnight minimum of 2.0 hours, a booking that spanned two nights and has ramped out, and an ending reading 1.5 hours above the out reading, so the notice reads that it will bill 4.0 hours rather than the 1.5 flown.",
    crop: '[data-doc-shot="ramp-in-overnight-notice"]',
  },
  {
    id: "review-times-modal-ground",
    screen: "Review times modal",
    route: "/schedule?reservation=<id>",
    alt: "Review times modal",
    dataState:
      "A Ground booking in a room that has not been closed out, so the modal is titled Review times and shows instruction time only, with no Hobbs or tach fields.",
    crop: '[data-doc-shot="review-times-modal-ground"]',
  },
  {
    id: "confirm-review-pin-modal",
    screen: "Confirm review modal",
    route: "/schedule?reservation=<id>",
    alt: "Confirm review modal",
    dataState:
      "A booking that has ramped in, signed in as a pilot on it who has not yet confirmed and who has a PIN set.",
    crop: '[data-doc-shot="confirm-review-pin-modal"]',
  },
  {
    id: "guest-close-out-modal",
    screen: "Close out and bill guest modal",
    route: "/schedule?reservation=<id>",
    alt: "Close out and bill guest modal",
    dataState:
      "A Guest flight that has ramped in, with a guest name, email and phone on the record, signed in as an admin or as the instructor on it.",
    crop: '[data-doc-shot="guest-close-out-modal"]',
  },
  {
    id: "who-pays-what-panel",
    screen: "Who pays what panel",
    route: "/schedule?reservation=<id>",
    alt: "Who pays what panel",
    dataState:
      "A shared flight with three payers that has ramped in and has not been invoiced. Enter individual legs that add up to 0.2 short of the aircraft hours so the live mismatch warning is visible, and set shares to 90 percent so the share warning is visible too.",
    crop: '[data-doc-shot="who-pays-what-panel"]',
  },
  {
    id: "cancel-reservation-dialog",
    screen: "Cancel reservation dialog",
    route: "/schedule?reservation=<id>",
    alt: "Cancel reservation dialog",
    dataState:
      "One occurrence of a repeating booking that has not started, so both the reason type list and the three series scope options render.",
    crop: '[data-doc-shot="cancel-reservation-dialog"]',
  },
  {
    id: "cancellations-report",
    screen: "Cancellations",
    route: "/operations/cancellations",
    alt: "Cancellations",
    dataState:
      "A quarter containing at least twenty cancellations across five or more categories, with a mix of notice given including some inside 24 hours, so both summary charts are populated.",
    crop: '[data-doc-shot="cancellations-report"]',
  },
  {
    id: "board-filters-dimmed",
    screen: "Calendar, filters applied",
    route: "/schedule?view=day",
    alt: "Calendar, filters applied",
    dataState:
      "A day with roughly 47 bookings, Personnel filtered to one instructor with about a dozen matches, so matched blocks are bright, the rest are faint, and the header reads 12 of 47 matching.",
    crop: '[data-doc-shot="board-filters-dimmed"]',
  },
  {
    id: "booking-preferences-tab",
    screen: "Settings, Booking preferences",
    route: "/settings?tab=booking-preferences",
    alt: "Settings, Booking preferences",
    dataState:
      "Two captures. One with all four toggles visible and multi-day bookings on. One in an organization with no time zone set, so Allow multi-day bookings is greyed out with its amber note.",
    crop: '[data-doc-shot="booking-preferences-tab"]',
  },
  {
    id: "overnight-booking-fields",
    screen: "Booking form with multi-day on",
    route: "/schedule",
    alt: "Booking form with multi-day on",
    dataState:
      "Multi-day bookings enabled and an overnight minimum set. Form filled in for a two night trip, so Out on, Back on and Back at all render along with the overnight minimum notice.",
    crop: '[data-doc-shot="overnight-booking-fields"]',
  },
  {
    id: "profile-time-zone-card",
    screen: "Profile, My time zone",
    route: "/me/profile",
    alt: "Profile, My time zone",
    dataState:
      "A member whose device zone differs from the organization's zone, so the card shows both and the Airport time recommended option is selected.",
    crop: '[data-doc-shot="profile-time-zone-card"]',
  },
  {
    id: "airworthiness-notice",
    screen: "Booking form, airworthiness notice",
    route: "/schedule",
    alt: "Booking form, airworthiness notice",
    dataState:
      "An aircraft grounded with a reason, carrying two open squawks, selected in the booking form so the notice renders above the time picker.",
    crop: '[data-doc-shot="airworthiness-notice"]',
  },
  {
    id: "me-book-solo",
    screen: "Book a reservation, Solo",
    route: "/me/book",
    alt: "Book a reservation, Solo",
    dataState:
      "Signed in as a student. At least three aircraft, one grounded and one with an open squawk, so the picker's right-hand column and the notice below it both have something to say.",
    crop: '[data-doc-shot="me-book-solo"]',
  },
  {
    id: "me-book-type-dropdown",
    screen: "Book a reservation, Type dropdown open",
    route: "/me/book",
    alt: "Book a reservation, Type dropdown open",
    dataState:
      "Signed in as a student with the Type dropdown open, so the narrowed list (no Rental, no Guest, no Maintenance) is visible.",
    crop: '[data-doc-shot="me-book-type-dropdown"]',
  },
  {
    id: "me-book-your-seat",
    screen: "Book a reservation, Your seat toggle",
    route: "/me/book",
    alt: "Book a reservation, Your seat toggle",
    dataState:
      "Signed in as a member holding both the instructor and student roles, with Type set to Dual so the toggle renders.",
    crop: '[data-doc-shot="me-book-your-seat"]',
  },
  {
    id: "me-book-start-times",
    screen: "Book a reservation, Start dropdown open",
    route: "/me/book",
    alt: "Book a reservation, Start dropdown open",
    dataState:
      "An aircraft with two existing bookings on the chosen day, so the 15-minute slots visibly stop and restart around them.",
    crop: '[data-doc-shot="me-book-start-times"]',
  },
  {
    id: "me-book-repeat",
    screen: "Book a reservation, Repeat control",
    route: "/me/book",
    alt: "Book a reservation, Repeat control",
    dataState:
      "A booking with Start and End filled in and the Repeat control expanded, set to weekly and ending after eight occurrences.",
    crop: '[data-doc-shot="me-book-repeat"]',
  },
  {
    id: "me-book-maintenance",
    screen: "Book a reservation, technician view",
    route: "/me/book",
    alt: "Book a reservation, technician view",
    dataState:
      "Signed in as a technician-only account, so the subtitle reads 'Schedule maintenance and take an aircraft off the line' and the Type field is fixed to Maintenance.",
    crop: '[data-doc-shot="me-book-maintenance"]',
  },
  {
    id: "me-schedule-list",
    screen: "Your schedule",
    route: "/me/schedule",
    alt: "Your schedule",
    dataState:
      "A member with one booking today, one tomorrow, and two later in the week, so the Today / Tomorrow / weekday grouping is visible.",
    crop: '[data-doc-shot="me-schedule-list"]',
  },
  {
    id: "me-currencies",
    screen: "Your currencies",
    route: "/me/currencies",
    alt: "Your currencies",
    dataState:
      "A member with one current currency, one expiring within 30 days, one expired, and one never signed off, so all four counts are non-zero and the worst-first order is visible.",
    crop: '[data-doc-shot="me-currencies"]',
  },
  {
    id: "me-documents-upload",
    screen: "Upload a document modal",
    route: "/me/documents",
    alt: "Upload a document modal",
    dataState:
      "A school with at least three document types, one that expires and one marked restricted, so the expiry field appears and the picker visibly omits the restricted type.",
    crop: '[data-doc-shot="me-documents-upload"]',
  },
  {
    id: "profile-availability",
    screen: "Profile, Availability tab",
    route: "/me/profile?tab=availability",
    alt: "Profile, Availability tab",
    dataState:
      "Signed in as an instructor with Tuesday to Saturday switched on with real hours, and Sunday and Monday off showing Unavailable.",
    crop: '[data-doc-shot="profile-availability"]',
  },
  {
    id: "profile-security-pin",
    screen: "Profile, Security tab",
    route: "/me/profile?tab=security",
    alt: "Profile, Security tab",
    dataState:
      "A member who has not set a confirmation PIN yet, so the button reads Set PIN rather than Update PIN.",
    crop: '[data-doc-shot="profile-security-pin"]',
  },
  {
    id: "me-notifications",
    screen: "Email notifications",
    route: "/me/notifications",
    alt: "Email notifications",
    dataState:
      "Signed in as an instructor so the Endorsements section renders, with the master Email notifications switch on and one individual category switched off.",
    crop: '[data-doc-shot="me-notifications"]',
  },
  {
    id: "join-school-code",
    screen: "Join your school",
    route: "/join",
    alt: "Join your school",
    dataState:
      "Signed in and email verified, not yet a member of any school, with the School code field empty so the placeholder is readable.",
    crop: '[data-doc-shot="join-school-code"]',
  },
  {
    id: "billing-invoice-list",
    screen: "Billing",
    route: "/billing",
    alt: "Billing",
    dataState:
      "At least eight invoices in the last 30 days: five paid, two outstanding, one voided, one carrying a QuickBooks tick. Date range on the last 30 days so all four stat cards show real numbers.",
    crop: '[data-doc-shot="billing-invoice-list"]',
  },
  {
    id: "billing-unbilled-reservations",
    screen: "Billing, Unbilled reservations",
    route: "/billing?status=unbilled",
    alt: "Billing, Unbilled reservations",
    dataState:
      "Two or three past reservations that were never invoiced, each with an aircraft and a named customer, so the Bill button and the empty invoice column are both visible.",
    crop: '[data-doc-shot="billing-unbilled-reservations"]',
  },
  {
    id: "billing-settings-card",
    screen: "Settings, Billing",
    route: "/settings?tab=billing",
    alt: "Settings, Billing",
    dataState:
      "Signed in as the owner. Billing enabled on, default instructor rate set, service fee 3 percent with a custom label, overnight minimum 2.0, grounding threshold 3.",
    crop: '[data-doc-shot="billing-settings-card"]',
  },
  {
    id: "billing-payouts-connected",
    screen: "Settings, Billing, Payouts card",
    route: "/settings?tab=billing",
    alt: "Settings, Billing, Payouts card",
    dataState:
      "An organization whose Stripe account is connected and enabled, so the badge reads Connected and the button reads Manage payouts. Crop to the Payouts card.",
    crop: '[data-doc-shot="billing-payouts-connected"]',
  },
  {
    id: "billing-payouts-not-connected",
    screen: "Settings, Billing, Payouts card",
    route: "/settings?tab=billing",
    alt: "Settings, Billing, Payouts card",
    dataState:
      "An organization with no Stripe account, so the badge reads Not connected and the button reads Connect payouts. Crop to the Payouts card.",
    crop: '[data-doc-shot="billing-payouts-not-connected"]',
  },
  {
    id: "aircraft-rate-fields",
    screen: "Aircraft, edit form",
    route: "/aircraft/<resourceId>",
    alt: "Aircraft, edit form",
    dataState:
      "An aircraft with a wet rate of 165.00 and Bill by Hobbs time on, with the edit form open and scrolled to Rate, Rate basis and the Hobbs toggle.",
    crop: '[data-doc-shot="aircraft-rate-fields"]',
  },
  {
    id: "instruction-rates-tab",
    screen: "Settings, Instruction rates",
    route: "/settings?tab=rates",
    alt: "Settings, Instruction rates",
    dataState:
      "At least three ratings (Private Pilot, Instrument, Commercial), each with a different hourly instructor rate, plus one rating with no rate so the fallback is visible.",
    crop: '[data-doc-shot="instruction-rates-tab"]',
  },
  {
    id: "close-out-not-started",
    screen: "Reservation detail sheet, Close-out section",
    route: "/schedule",
    alt: "Reservation detail sheet, Close-out section",
    dataState:
      "Today's dual booking with an aircraft and an instructor, not yet ramped, so the step badge reads Not started and the Ramp out button is the only action.",
    crop: '[data-doc-shot="close-out-not-started"]',
  },
  {
    id: "close-out-ramp-in-dialog",
    screen: "Ramp in dialog",
    route: "/schedule",
    alt: "Ramp in dialog",
    dataState:
      "A booking already ramped out, with the ramp-in dialog open showing Hobbs in, Tach in and Instruction time, prefilled from the ramp-out readings.",
    crop: '[data-doc-shot="ramp-in-modal-hours-flown"]',
  },
  {
    id: "close-out-overnight-notice",
    screen: "Ramp in dialog with overnight notice",
    route: "/schedule",
    alt: "Ramp in dialog with overnight notice",
    dataState:
      "A booking that starts Friday and ends Sunday on an org with a 2.0 hour overnight minimum, ramped out, so the ramp-in dialog shows the two nights notice above the save button.",
    crop: '[data-doc-shot="ramp-in-overnight-notice"]',
  },
  {
    id: "close-out-invoice-summary",
    screen: "Reservation detail sheet, invoice summary",
    route: "/schedule",
    alt: "Reservation detail sheet, invoice summary",
    dataState:
      "A fully closed out and billed booking split between two payers, so the summary shows line items, a total, and the one of two shares label.",
    crop: '[data-doc-shot="close-out-invoice-summary"]',
  },
  {
    id: "close-out-bill-guest",
    screen: "Close out and bill guest dialog",
    route: "/schedule",
    alt: "Close out and bill guest dialog",
    dataState:
      "A guest booking with a complete guest record (name, email, phone), ramped out and in, with the Close out and bill guest dialog open.",
    crop: '[data-doc-shot="guest-close-out-modal"]',
  },
  {
    id: "cost-splitting-summary",
    screen: "Settings, Cost splitting",
    route: "/settings?tab=cost-splitting",
    alt: "Settings, Cost splitting",
    dataState:
      "Rules configured from the Flight school preset, with at least one booking type edited so a Your rule badge shows, and the status card reading as configured.",
    crop: '[data-doc-shot="cost-splitting-summary"]',
  },
  {
    id: "cost-splitting-edit-modal",
    screen: "Cost splitting, per booking type editor",
    route: "/settings?tab=cost-splitting",
    alt: "Cost splitting, per booking type editor",
    dataState:
      "The editor open on a shared booking type, with both charge lines showing their five options and the server computed worked money example visible, including the amber Each pays in full example.",
    crop: '[data-doc-shot="cost-splitting-edit-modal"]',
  },
  {
    id: "invoice-detail-panel",
    screen: "Invoice detail panel",
    route: "/billing?invoice=<id>",
    alt: "Invoice detail panel",
    dataState:
      "A paid invoice from a split booking: several line items including a service fee, a linked flight with two people, QuickBooks showing Synced with a Sales Receipt id, and the audit trail populated.",
    crop: '[data-doc-shot="invoice-detail-panel"]',
  },
  {
    id: "create-invoice-dialog",
    screen: "New invoice dialog",
    route: "/billing",
    alt: "New invoice dialog",
    dataState:
      "The dialog open with a member selected, two line items (a headset rental and a checkride fee), a memo, a due date, and the running total.",
    crop: '[data-doc-shot="create-invoice-dialog"]',
  },
  {
    id: "my-invoices",
    screen: "My invoices",
    route: "/me/invoices",
    alt: "My invoices",
    dataState:
      "A member with one outstanding invoice and three paid ones, so both summary cards have a figure and the table shows a mix of statuses.",
    crop: '[data-doc-shot="my-invoices"]',
  },
  {
    id: "pay-invoice-dialog",
    screen: "Pay invoice dialog",
    route: "/me/invoices?invoice=<id>",
    alt: "Pay invoice dialog",
    dataState:
      "An outstanding invoice open with the Stripe card form showing. Use a Stripe test card only, and never capture a real member's name or amount.",
    crop: '[data-doc-shot="pay-invoice-dialog"]',
  },
  {
    id: "payment-methods-autopay",
    screen: "Profile, Payment methods",
    route: "/me/profile?tab=payments",
    alt: "Profile, Payment methods",
    dataState:
      "One saved test card set as default with autopay on, so the Autopay card reads that new invoices are charged automatically and the card shows brand, last four and expiry.",
    crop: '[data-doc-shot="payment-methods-autopay"]',
  },
  {
    id: "memberships-plans-list",
    screen: "Settings, Memberships",
    route: "/settings?tab=memberships",
    alt: "Settings, Memberships",
    dataState:
      "Three live plans at different price points (full, associate, student) with member counts above zero, one billed on a fixed day and one on anniversary, plus one retired plan listed separately.",
    crop: '[data-doc-shot="memberships-plans-list"]',
  },
  {
    id: "membership-plan-editor",
    screen: "Membership plan editor",
    route: "/settings?tab=memberships",
    alt: "Membership plan editor",
    dataState:
      "A saved plan open for editing with a join fee, quarterly dues, Bill everyone on the same day set to the 1st, prorate on, days to pay set, a booking window, and at least one per aircraft tier rate filled in.",
    crop: '[data-doc-shot="membership-plan-editor"]',
  },
  {
    id: "person-membership-card",
    screen: "Person record, Billing tab",
    route: "/people/<orgUserId>?tab=billing",
    alt: "Person record, Billing tab",
    dataState:
      "A member on an active plan with the join fee billed, at least three dues periods in history (one waived, one failed), autopay on, and two invoices in the Invoices card below.",
    crop: '[data-doc-shot="person-membership-card"]',
  },
  {
    id: "quickbooks-setup",
    screen: "Settings, Integrations, QuickBooks Online",
    route: "/settings/integrations/quickbooks",
    alt: "Settings, Integrations, QuickBooks Online",
    dataState:
      "Signed in as the owner of a connected sandbox company, with an income item chosen, Sync paid invoices on, and an activity feed holding at least one success, one skipped and one error entry.",
    crop: '[data-doc-shot="quickbooks-setup"]',
  },
  {
    id: "maintenance-by-aircraft",
    screen: "Maintenance, By aircraft",
    route: "/maintenance?view=aircraft",
    alt: "Maintenance, By aircraft",
    dataState:
      "At least four aircraft. One grounded with a typed reason, one with an overdue grounding inspection, one with an item due soon, and one with nothing tracked yet, so all four badge states appear.",
    crop: '[data-doc-shot="maintenance-by-aircraft"]',
  },
  {
    id: "maintenance-all-inspections",
    screen: "Maintenance, All inspections",
    route: "/maintenance?view=reminders",
    alt: "Maintenance, All inspections",
    dataState:
      "At least six live inspections across two tails: one overdue carrying the red Grounds flag, one due soon counted in hours, one due soon counted in days, and one comfortably not yet due, so the progress bars differ.",
    crop: '[data-doc-shot="maintenance-all-inspections"]',
  },
  {
    id: "maintenance-set-up",
    screen: "Maintenance, Set up",
    route: "/maintenance?view=templates",
    alt: "Maintenance, Set up",
    dataState:
      "Rules in all three groups (On the meter, On the calendar, One-off). One rule attached to three or more aircraft with its chip list expanded, one carrying the Grounds badge, and one attached to no aircraft so the inert warning line shows.",
    crop: '[data-doc-shot="maintenance-set-up"]',
  },
  {
    id: "add-inspections-standard-set",
    screen: "Add inspections, Standard set",
    route: "/maintenance?view=aircraft",
    alt: "Add inspections, Standard set",
    dataState:
      "Two or more aircraft so Applies to has options. Modal open on Standard set with all seven AVIATES rows ticked, the two Also common rows unticked, and the regulation and caveat lines visible.",
    crop: '[data-doc-shot="add-inspections-standard-set"]',
  },
  {
    id: "add-inspections-recurring",
    screen: "Add inspections, Recurring",
    route: "/maintenance?view=aircraft",
    alt: "Add inspections, Recurring",
    dataState:
      "Modal open in Recurring mode with a name typed, On the meter selected, Count tach time chosen, Every 100 and Warn me 10 filled, and Grounds the aircraft switched on.",
    crop: '[data-doc-shot="add-inspections-recurring"]',
  },
  {
    id: "add-inspections-last-done",
    screen: "Add inspections, When was it last done?",
    route: "/maintenance?view=aircraft",
    alt: "Add inspections, When was it last done?",
    dataState:
      "Modal open in Recurring mode with a Date and a Meter reading typed and two aircraft selected under Applies to, so the amber shared-meter warning is on screen. Crop to the When was it last done? box plus the warning.",
    crop: '[data-doc-shot="add-inspections-last-done"]',
  },
  {
    id: "sign-off-inspection-modal",
    screen: "Sign off",
    route: "/maintenance?view=reminders",
    alt: "Sign off",
    dataState:
      "An overdue hour-based inspection that carries the Grounds flag, on an aircraft currently auto-grounded with the reason Maintenance, so the modal shows the tach reading field and the return-to-service line.",
    crop: '[data-doc-shot="sign-off-inspection-modal"]',
  },
  {
    id: "aircraft-maintenance-tab",
    screen: "Aircraft detail, Maintenance",
    route: "/aircraft/:resourceId?tab=maintenance",
    alt: "Aircraft detail, Maintenance",
    dataState:
      "One aircraft with at least five tracked inspections including one overdue and one due soon, plus two open squawks, viewed as an admin so Add, Sign off, Log and Resolve all render.",
    crop: '[data-doc-shot="aircraft-maintenance-tab"]',
  },
  {
    id: "aircraft-grounded-banner",
    screen: "Aircraft detail header, grounded",
    route: "/aircraft/:resourceId",
    alt: "Aircraft detail header, grounded",
    dataState:
      "An aircraft grounded by hand with a typed reason such as \"Prop strike\", viewed as an admin so the red banner sits above Edit, Approve renters and Return to service.",
    crop: '[data-doc-shot="aircraft-grounded-banner"]',
  },
  {
    id: "ground-aircraft-modal",
    screen: "Ground aircraft",
    route: "/aircraft/:resourceId",
    alt: "Ground aircraft",
    dataState:
      "An aircraft that is not currently grounded, with the Ground dialog open and the Reason box empty so its placeholder text is readable.",
  },
  {
    id: "log-squawk-modal",
    screen: "Log a squawk",
    route: "/maintenance?view=open",
    alt: "Log a squawk",
    dataState:
      "Two or more aircraft in the fleet. Dialog open with a realistic title and description typed and an aircraft picked, opened from the Maintenance page rather than from a tail so the Aircraft picker is visible.",
    crop: '[data-doc-shot="log-squawk-modal"]',
  },
  {
    id: "maintenance-squawks-open",
    screen: "Maintenance, Squawks, Open",
    route: "/maintenance?view=open",
    alt: "Maintenance, Squawks, Open",
    dataState:
      "At least four open squawks across two aircraft with different reported dates, each with a description long enough to show the preview line.",
    crop: '[data-doc-shot="maintenance-squawks-open"]',
  },
  {
    id: "squawk-detail-panel",
    screen: "Squawk detail panel",
    route: "/maintenance?view=open",
    alt: "Squawk detail panel",
    dataState:
      "A squawk with a full description, a named reporter, and a verified timestamp already set from the iOS app, so the Verified row renders alongside Reported.",
    crop: '[data-doc-shot="squawk-detail-panel"]',
  },
  {
    id: "resolve-squawk-modal",
    screen: "Resolve squawk",
    route: "/maintenance?view=open",
    alt: "Resolve squawk",
    dataState:
      "An open squawk with the Resolve dialog open, Completed defaulted to today, and notes partly typed so the character counter is visible.",
    crop: '[data-doc-shot="resolve-squawk-modal"]',
  },
  {
    id: "booking-airworthiness-notice",
    screen: "New booking, airworthiness notice",
    route: "/schedule",
    alt: "New booking, airworthiness notice",
    dataState:
      "The reservation form with a grounded aircraft selected that also carries two or more open squawks, so the red grounded line and the amber squawk list appear together above the form.",
    crop: '[data-doc-shot="airworthiness-notice"]',
  },
  {
    id: "notification-preferences-maintenance",
    screen: "Notification preferences, Maintenance",
    route: "/me/notifications",
    alt: "Notification preferences, Maintenance",
    dataState:
      "Signed in as an admin or technician so the Maintenance section renders at all. Crop to that section plus the footer line about push categories.",
    crop: '[data-doc-shot="notification-preferences-maintenance"]',
  },
  {
    id: "training-courses-list",
    screen: "Training, Courses section",
    route: "/training?tab=courses",
    alt: "Training, Courses section",
    dataState:
      "Three or more courses: one Part 141, one published version with students enrolled so a version badge reads Rev A published and a card reads 3 in training, and one still a draft. Stat cards populated.",
    crop: '[data-doc-shot="training-courses-list"]',
  },
  {
    id: "training-template-picker",
    screen: "Start from a template dialog",
    route: "/training?tab=courses",
    alt: "Start from a template dialog",
    dataState:
      "Dialog open showing all four templates with their stage, lesson and requirement counts, and the line saying every template is created as Part 61.",
    crop: '[data-doc-shot="training-template-picker"]',
  },
  {
    id: "training-new-course-dialog",
    screen: "New course dialog",
    route: "/training?tab=courses",
    alt: "New course dialog",
    dataState:
      "Dialog open with a name typed and the Trained under choice plus its helper text fully visible.",
    crop: '[data-doc-shot="training-new-course-dialog"]',
  },
  {
    id: "syllabus-stages-lessons",
    screen: "Course detail, Syllabus tab (draft)",
    route: "/training/$courseId?tab=syllabus",
    alt: "Course detail, Syllabus tab (draft)",
    dataState:
      "A draft version with two stages, one flagged Ends in a stage check, and one flight lesson expanded to show objectives, completion standards, ACS task chips and Credits toward chips.",
    crop: '[data-doc-shot="syllabus-stages-lessons"]',
  },
  {
    id: "syllabus-lesson-dialog-credits",
    screen: "Lesson dialog, Credits toward box",
    route: "/training/$courseId?tab=syllabus",
    alt: "Lesson dialog, Credits toward box",
    dataState:
      "Draft version with at least four requirements already added, lesson dialog open on a flight lesson so flight time, ground time and per lesson can each be ticked. A second capture with nothing ticked, showing the amber Credits nothing line.",
    crop: '[data-doc-shot="syllabus-lesson-dialog-credits"]',
  },
  {
    id: "syllabus-requirements-tab",
    screen: "Course detail, Requirements tab",
    route: "/training/$courseId?tab=requirements",
    alt: "Course detail, Requirements tab",
    dataState:
      "Draft version carrying the Private Pilot requirement set, including one requirement with a simulator limit chip, one with a transfer limit chip, and one with a recency window.",
    crop: '[data-doc-shot="syllabus-requirements-tab"]',
  },
  {
    id: "syllabus-grading-scale",
    screen: "Grading scale card",
    route: "/training/$courseId?tab=requirements",
    alt: "Grading scale card",
    dataState:
      "Draft version with the default S, U and I scale, the Completes the lesson checkboxes visible and S ticked.",
    crop: '[data-doc-shot="syllabus-grading-scale"]',
  },
  {
    id: "syllabus-publish-dialog",
    screen: "Publish confirmation dialog",
    route: "/training/$courseId?tab=syllabus",
    alt: "Publish confirmation dialog",
    dataState:
      "A Part 141 draft with at least a dozen lessons so the warning names a real count, and the optional FSDO approval reference field showing.",
    crop: '[data-doc-shot="syllabus-publish-dialog"]',
  },
  {
    id: "syllabus-published-locked",
    screen: "Course header, locked badge and version dropdown",
    route: "/training/$courseId?tab=syllabus",
    alt: "Course header, locked badge and version dropdown",
    dataState:
      "A course with a published Rev A (students enrolled) and a draft Rev B, so the dropdown holds two entries and the header reads Locked, students are enrolled against these lessons.",
    crop: '[data-doc-shot="syllabus-published-locked"]',
  },
  {
    id: "training-enroll-dialog",
    screen: "Enroll a student dialog",
    route: "/training/$courseId?tab=students",
    alt: "Enroll a student dialog",
    dataState:
      "A published, non-retired version selected, and a roster with several students plus one instructor so the (staff) suffix is visible in the picker.",
    crop: '[data-doc-shot="training-enroll-dialog"]',
  },
  {
    id: "course-enrollment-fee-card",
    screen: "Course detail, Enrollment fee card",
    route: "/training/$courseId?tab=students",
    alt: "Course detail, Enrollment fee card",
    dataState:
      "A fee saved, for example $250, with custom invoice wording typed and the confirmation line reading Enrolling a student will record $250 owed.",
    crop: '[data-doc-shot="course-enrollment-fee-card"]',
  },
  {
    id: "enrollment-overview",
    screen: "Training record, Overview tab",
    route: "/training/enrollments/$enrollmentId?tab=overview",
    alt: "Training record, Overview tab",
    dataState:
      "A Part 141 student mid course: lessons bar part filled, pace badge showing At risk, the amber Not ready to graduate card naming two or more unmet requirements, an unbilled Course fee card, and one endorsement on the Endorsements card.",
    crop: '[data-doc-shot="enrollment-overview"]',
  },
  {
    id: "enrollment-requirements",
    screen: "Training record, Requirements tab",
    route: "/training/enrollments/$enrollmentId?tab=requirements",
    alt: "Training record, Requirements tab",
    dataState:
      "At least one requirement discounted by a simulator ceiling and one by a recency window, so both amber explanations render beside part-filled bars and credited is visibly lower than flown.",
    crop: '[data-doc-shot="enrollment-requirements"]',
  },
  {
    id: "enrollment-lessons",
    screen: "Training record, Lessons tab",
    route: "/training/enrollments/$enrollmentId?tab=lessons",
    alt: "Training record, Lessons tab",
    dataState:
      "Across two stages: one Complete lesson, one badged Next up, one record reading Awaiting student, and one Superseded record struck through with its Correction not signed underneath.",
    crop: '[data-doc-shot="enrollment-lessons"]',
  },
  {
    id: "enrollment-ledger",
    screen: "Training record, Ledger tab",
    route: "/training/enrollments/$enrollmentId?tab=ledger",
    alt: "Training record, Ledger tab",
    dataState:
      "Credits from at least four signed lessons, one transfer credit, one simulator credit and one negative reversal carrying an amendment reason, so every source chip and a negative amount appear.",
    crop: '[data-doc-shot="enrollment-ledger"]',
  },
  {
    id: "grade-lesson-dialog",
    screen: "Grade lesson dialog on the training record",
    route: "/training/enrollments/$enrollmentId?tab=lessons",
    alt: "Grade lesson dialog on the training record",
    dataState:
      "Dialog open on a flight lesson that credits three requirements, with minimum flight and ground hours set on the lesson so the fields are prefilled and the Signing credits line lists all three.",
    crop: '[data-doc-shot="grade-lesson-dialog"]',
  },
  {
    id: "amend-record-dialog",
    screen: "Amend dialog",
    route: "/training/enrollments/$enrollmentId?tab=lessons",
    alt: "Amend dialog",
    dataState:
      "A signed, countersigned record with the Amend dialog open and a plausible reason typed in the Why box.",
    crop: '[data-doc-shot="amend-record-dialog"]',
  },
  {
    id: "add-credit-dialog",
    screen: "Add credit dialog",
    route: "/training/enrollments/$enrollmentId?tab=requirements",
    alt: "Add credit dialog",
    dataState:
      "Dialog open with a requirement chosen, Previous training (Part 61) selected, hours entered, a date from a previous year in When it was flown, and a note.",
    crop: '[data-doc-shot="add-credit-dialog"]',
  },
  {
    id: "closeout-training-section",
    screen: "Close-out sheet, Training record section",
    route: "/schedule",
    alt: "Close-out sheet, Training record section",
    dataState:
      "A completed dual booking with one enrolled student, Hobbs out and in plus briefing time entered, and the Training record block expanded so the lesson dropdown (with completed lessons prefixed by a tick), the grade and the prefilled Flight and Ground fields all show.",
    crop: '[data-doc-shot="closeout-training-section"]',
  },
  {
    id: "booking-next-up-hint",
    screen: "Booking form, Next up hint",
    route: "/schedule",
    alt: "Booking form, Next up hint",
    dataState:
      "A new dual booking created on behalf of a student who is enrolled and has completed four of twenty-one lessons, so the grey strip reads Next up with the count.",
    crop: '[data-doc-shot="booking-next-up-hint"]',
  },
  {
    id: "graduate-dialog",
    screen: "Graduate dialog",
    route: "/training/enrollments/$enrollmentId",
    alt: "Graduate dialog",
    dataState:
      "A Part 141 enrollment with every FAA-sourced requirement met and the record already certified, so the certificate number field shows and the button is enabled.",
    crop: '[data-doc-shot="graduate-dialog"]',
  },
  {
    id: "endorsements-card-sign",
    screen: "Sign an endorsement dialog",
    route: "/people/$orgUserId?tab=training",
    alt: "Sign an endorsement dialog",
    dataState:
      "Template picker open on the Solo group, a template chosen so the body renders with the student's name filled in, two braces still unfilled and the blanks counter visible, certificate number empty.",
    crop: '[data-doc-shot="endorsements-card-sign"]',
  },
  {
    id: "person-training-card",
    screen: "Person detail, Training section",
    route: "/people/$orgUserId?tab=training",
    alt: "Person detail, Training section",
    dataState:
      "A student with one in-training and one graduated enrollment, plus two endorsements on the Endorsements card, one of them expiring inside 30 days.",
    crop: '[data-doc-shot="person-training-card"]',
  },
  {
    id: "me-training-progress",
    screen: "My training, Progress tab",
    route: "/me/training?tab=progress",
    alt: "My training, Progress tab",
    dataState:
      "Signed in as a student with one active enrollment, a part-filled lessons bar, at least one requirement showing a cap explanation, and one lesson in the highlighted A lesson needs your signature block.",
    crop: '[data-doc-shot="me-training-progress"]',
  },
  {
    id: "training-permissions-tab",
    screen: "Training, Permissions section",
    route: "/training?tab=permissions",
    alt: "Training, Permissions section",
    dataState:
      "All four grants listed with their descriptions, holders on at least two of them, and one Check instructor grant scoped to a single course.",
    crop: '[data-doc-shot="training-permissions-tab"]',
  },
  {
    id: "report-student-progress",
    screen: "Reports, Student progress",
    route: "/reports",
    alt: "Reports, Student progress",
    dataState:
      "Six or more enrollments across two courses with varied lesson counts, shortfalls and days since flown. Range widened past the default year to date so an enrollment from last year is included. Sorted by Requirements short.",
    crop: '[data-doc-shot="report-student-progress"]',
  },
  {
    id: "report-training-records",
    screen: "Reports, Training records",
    route: "/reports",
    alt: "Reports, Training records",
    dataState:
      "Twenty or more graded lessons for one student over a 90 day window, including one Superseded and Correction pair, one row reading Awaiting student and one reading Not signed.",
    crop: '[data-doc-shot="report-training-records"]',
  },
  {
    id: "report-endorsement-expirations",
    screen: "Reports, Endorsement expirations",
    route: "/reports",
    alt: "Reports, Endorsement expirations",
    dataState:
      "At least three endorsements with expiry dates: one already expired with negative days left, one expiring inside 30 days, one still valid.",
    crop: '[data-doc-shot="report-endorsement-expirations"]',
  },
  {
    id: "reports-rail-owner",
    screen: "Reports, left rail",
    route: "/reports",
    alt: "Reports, left rail",
    dataState:
      "Signed in as an owner in a school with enough activity that the welcome screen has retired: 5 or more reservations in the window 45 days back to 60 days ahead, and at least one invoice. All five category headings must be present.",
  },
  {
    id: "reports-overview-board",
    screen: "Reports, Overview dashboard",
    route: "/reports",
    alt: "Reports, Overview dashboard",
    dataState:
      "The default layout on Last 30 days with real figures in all eight number cards and both line charts. Needs a month of invoices and closed-out flights so no tile reads zero or blank.",
    crop: '[data-doc-shot="reports-overview-board"]',
  },
  {
    id: "reports-overview-attention",
    screen: "Reports, Overview, Needs attention card",
    route: "/reports",
    alt: "Reports, Overview, Needs attention card",
    dataState:
      "At least five non-zero items and one Clear line. Requires an overdue invoice, a closed-out flight that was never invoiced, a booking awaiting close-out, an open squawk, and a document expiring inside 30 days.",
    crop: '[data-doc-shot="reports-overview-attention"]',
  },
  {
    id: "report-shell-revenue",
    screen: "Reports, Revenue report",
    route: "/reports",
    alt: "Reports, Revenue report",
    dataState:
      "Revenue selected, ungrouped, Last 30 days, two filter chips applied. Needs about 20 invoices across several aircraft so the table has rows on more than one page and the Totals row is meaningful.",
    crop: '[data-doc-shot="report-shell-revenue"]',
  },
  {
    id: "report-toolbar-export",
    screen: "Reports, report toolbar",
    route: "/reports",
    alt: "Reports, report toolbar",
    dataState:
      "Any report with rows and filters applied, cropped to the toolbar, the chips, and an enabled Export button.",
    crop: '[data-doc-shot="report-toolbar-export"]',
  },
  {
    id: "report-filters-menu",
    screen: "Reports, Filters menu",
    route: "/reports",
    alt: "Reports, Filters menu",
    dataState:
      "The Filters menu open on a report with several filterable fields, showing Group by and Columns at the top and one field submenu expanded with its Condition list.",
    crop: '[data-doc-shot="report-filters-menu"]',
  },
  {
    id: "report-columns-submenu",
    screen: "Reports, Columns submenu",
    route: "/reports",
    alt: "Reports, Columns submenu",
    dataState:
      "A report with 19 available columns and 7 ticked, so the counter reads 7 of 19, with the search box and Reset columns visible.",
    crop: '[data-doc-shot="report-columns-submenu"]',
  },
  {
    id: "report-grouped-utilization",
    screen: "Reports, Utilization grouped by Resource",
    route: "/reports",
    alt: "Reports, Utilization grouped by Resource",
    dataState:
      "At least five aircraft with flights in the window and clearly different totals, so the Share of bars vary and the records count under each group label is greater than one.",
    crop: '[data-doc-shot="report-grouped-utilization"]',
  },
  {
    id: "report-saved-views",
    screen: "Reports, Saved views popover",
    route: "/reports",
    alt: "Reports, Saved views popover",
    dataState:
      "Four saved views on one report, at least one shared and one private, so both the trash icon and its absence are visible alongside the clock and pin icons.",
    crop: '[data-doc-shot="report-saved-views"]',
  },
  {
    id: "report-save-as-dialog",
    screen: "Reports, Save as dialog",
    route: "/reports",
    alt: "Reports, Save as dialog",
    dataState:
      "The dialog open with a name typed and the Share with the school switch visible.",
    crop: '[data-doc-shot="report-save-as-dialog"]',
  },
  {
    id: "report-schedule-dialog",
    screen: "Reports, Schedule this report dialog",
    route: "/reports",
    alt: "Reports, Schedule this report dialog",
    dataState:
      "Set to Every week, Monday, 7am, with the grey cadence box showing what the window covers and at least four members with email addresses listed under Send to. Captured as an owner so the outside addresses field renders.",
    crop: '[data-doc-shot="report-schedule-dialog"]',
  },
  {
    id: "reports-schedules-page",
    screen: "Reports, Scheduled reports",
    route: "/reports",
    alt: "Reports, Scheduled reports",
    dataState:
      "Three schedule cards: one healthy with a last sent date, one carrying a Paused chip, and one showing the red last send failed line with a reason.",
    crop: '[data-doc-shot="reports-schedules-page"]',
  },
  {
    id: "schedule-card-failed",
    screen: "Reports, Scheduled reports card with the row menu open",
    route: "/reports",
    alt: "Reports, Scheduled reports card with the row menu open",
    dataState:
      "A schedule whose last send failed, with the three dot menu open on Edit, Send now, and Stop sending.",
    crop: '[data-doc-shot="schedule-card-failed"]',
  },
  {
    id: "dashboard-edit-mode",
    screen: "Reports, Overview in edit mode",
    route: "/reports",
    alt: "Reports, Overview in edit mode",
    dataState:
      "Customise pressed, grip handles and resize corners visible on the tiles, and the Add tile, Reset, Cancel, and Done buttons in the header.",
    crop: '[data-doc-shot="dashboard-edit-mode"]',
  },
  {
    id: "dashboard-tile-builder",
    screen: "Reports, Add tile dialog",
    route: "/reports",
    alt: "Reports, Add tile dialog",
    dataState:
      "A report chosen that offers no dimension, so Line and Bar are greyed out with the reason shown, alongside the metric checkboxes and the Date range and Compare to fields.",
    crop: '[data-doc-shot="dashboard-tile-builder"]',
  },
  {
    id: "dashboard-pin-view",
    screen: "Reports, Pin to dashboard dialog",
    route: "/reports",
    alt: "Reports, Pin to dashboard dialog",
    dataState:
      "Opened from the pin icon on a saved view, showing the locked report field, the carried-over title, and the note that the tile is a copy.",
    crop: '[data-doc-shot="dashboard-pin-view"]',
  },
  {
    id: "reports-rail-dispatcher",
    screen: "Reports, left rail as a dispatcher",
    route: "/reports",
    alt: "Reports, left rail as a dispatcher",
    dataState:
      "Signed in as a dispatcher with no admin role, so Operations, Fleet, People, and Compliance appear and Financial is absent entirely.",
  },
  {
    id: "reports-rail-technician",
    screen: "Reports, left rail as a technician",
    route: "/reports",
    alt: "Reports, left rail as a technician",
    dataState:
      "Signed in as a technician with no other role, so only the Fleet heading and its three reports appear.",
  },
  {
    id: "reports-welcome",
    screen: "Reports welcome screen",
    route: "/reports?welcome=1",
    alt: "Reports welcome screen",
    dataState:
      "Forced on with the query parameter. Shows the three sample preview cards with their Ready and unlock labels and the Sample data caption.",
    crop: '[data-doc-shot="reports-welcome"]',
  },
  {
    id: "audit-logs-table",
    screen: "Audit Logs",
    route: "/audit-logs",
    alt: "Audit Logs",
    dataState:
      "Thirty days of varied activity so the table mixes reservations, invoices, and members, with at least two destructive actions rendering red and one row attributed to AerScheduler showing a via line.",
  },
  {
    id: "audit-detail-panel",
    screen: "Audit Logs, event detail panel",
    route: "/audit-logs",
    alt: "Audit Logs, event detail panel",
    dataState:
      "Open on a meter correction so the What changed boxes show hobbs values converted to hours, along with the When, Who, About, Aircraft, Via, and Record rows.",
    crop: '[data-doc-shot="audit-detail-panel"]',
  },
  {
    id: "person-activity-tab",
    screen: "Member record, Activity tab",
    route: "/people/:orgUserId?tab=activity",
    alt: "Member record, Activity tab",
    dataState:
      "A student with at least 15 closed-out flights spread over 90 days, so the tiles are non-zero and the Flying activity bar chart has visible gaps.",
    crop: '[data-doc-shot="person-activity-tab"]',
  },
  {
    id: "aircraft-utilization-tab",
    screen: "Aircraft record, Utilization tab",
    route: "/aircraft/:resourceId?tab=metrics",
    alt: "Aircraft record, Utilization tab",
    dataState:
      "A tail with flights in most weeks of the last 90 days and at least one open squawk, captured as an admin so the Collected and Outstanding tiles render.",
    crop: '[data-doc-shot="aircraft-utilization-tab"]',
  },
  {
    id: "cancellations-insights",
    screen: "Cancellations",
    route: "/operations/cancellations",
    alt: "Cancellations",
    dataState:
      "At least 15 cancellations with mixed reason types and several inside 24 hours, so the three stat cards, the By reason type breakdown, and the Export CSV button are all meaningful.",
    crop: '[data-doc-shot="cancellations-insights"]',
  },
  {
    id: "settings-org-timezone",
    screen: "Settings, Organization",
    route: "/settings/organization",
    alt: "Settings, Organization",
    dataState:
      "Cropped to the time zone field with a zone selected.",
    crop: '[data-doc-shot="settings-org-timezone"]',
  },
  {
    id: "revenue-vs-payments",
    screen: "Revenue and Payments received over the same window",
    route: "/reports",
    alt: "Revenue and Payments received over the same window",
    dataState:
      "Two crops of the same window showing different totals and their two different date basis captions. Requires at least one invoice raised in one month and paid in the next.",
    crop: '[data-doc-shot="report-shell-revenue"]',
  },
];

const byId = new Map(SCREENSHOTS.map((s) => [s.id, s]));

export function getScreenshot(id: string): ScreenshotSpec | undefined {
  return byId.get(id);
}

/** Whether the captured file actually exists yet. Build-time only. */
export function screenshotExists(id: string): boolean {
  return existsSync(path.join(process.cwd(), "public", "docs", `${id}.png`));
}

export function screenshotSrc(id: string): string {
  return `/docs/${id}.png`;
}
