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
 * test organisation, drives each route, and writes `public/docs/<id>.png`.
 *
 * A route may carry a `{placeholder}` for a record id: `{reservationId}`,
 * `{rampedReservationId}`, `{invoiceId}`, `{aircraftId}`, `{groundedAircraftId}`,
 * `{personId}` or `{ledgerPersonId}`. The script resolves each once per run against
 * whatever the org actually holds, because a hardcoded id pins the manifest to one
 * database.
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
  // Desktop only. There was a `viewport: "phone"` option and a `manual: ", ios"`
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

  /**
   * Selectors to click after navigating, in order, before the crop is taken.
   *
   * Roughly a third of these shots are of a dialog, a dropdown or a sheet, and
   * navigation alone never reaches one. Playwright selector syntax, so
   * `text=Add inspections` and `[data-doc-shot="x"] button` both work.
   */
  open?: string[];

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
    route: "/schedule",
    alt: "Calendar, month view",
    dataState:
      "A month where at least one day carries four or more bookings, so the three chips plus the plus N more link both show. The range lives in localStorage (usePersistedState 'view:schedule-range'), NOT in the URL, so ?view=month did nothing and this has to reach Month by clicking the toolbar control.",
    crop: '[data-doc-shot="schedule-month-grid"]',
    open: ['button[role="tab"]:has-text("Month")'],
  },
  {
    id: "schedule-unassigned-row",
    screen: "Calendar, day view, bottom row",
    route: "/schedule",
    alt: "Calendar, day view, bottom row",
    dataState:
      "Two or more bookings with no resource on them at all (a dual is the only type the server allows that), spread across the day so the row reads as a row. The label says Unassigned, and that is the honest label here: the lane grid only writes Other when the row also holds a booking whose resource has NO LANE, and every lane is visible to the staff account these are captured from. Seeded by seed-test-org-schedule-states-for-docs.mjs. Clicks Day first, because the range is remembered in localStorage and the month shot runs before this one.",
    crop: '[data-doc-shot="schedule-unassigned-row"]',
    open: ['button[role="tab"]:has-text("Day")'],
  },
  {
    id: "my-schedule-list",
    screen: "My schedule",
    route: "/me/schedule",
    alt: "My schedule",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com), who has a booking today, one tomorrow, and one later in the week, so all three day headings render. The default owner account is rostered on nothing but maintenance, so as them this page captures cleanly and quietly shows two weekday headings and no Today or Tomorrow at all.",
    crop: '[data-doc-shot="my-schedule-list"]',
  },
  {
    id: "reservation-detail-panel",
    screen: "Reservation detail panel",
    route: "/schedule?reservation={scheduledReservationId}",
    alt: "Reservation detail panel",
    dataState:
      "A dual that has not ramped out. Instructor and student both listed, notes filled in, a location set so the weather badge renders, and the Dispatch section showing the Not started badge. The Activity timeline is part of this panel but sits below the sheet's fold on a booking this full, so it is not in the frame.",
    crop: '[data-doc-shot="reservation-detail-panel"]',
  },
  {
    id: "close-out-readings",
    screen: "What the flight recorded, in the close-out",
    route: "/schedule?reservation={awaitingReviewReservationId}",
    alt: "Hobbs, tach, hours flown and instruction time recorded on a flight",
    dataState:
      "A booking that has ramped in, so both pairs of readings, the hours flown and the instruction time are all present, with the ramped out and ramped in times underneath. Absent entirely on a booking that has not flown.",
    crop: '[data-doc-shot="close-out-readings"]',
  },
  {
    id: "reservation-detail-awaiting-signoff",
    screen: "Reservation detail panel, close-out section",
    route: "/schedule?reservation={awaitingReviewReservationId}",
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
      "Signed in as an admin or dispatcher, which is what makes this the dispatch variant rather than the self one. Dual is already the default type for dispatch, so the steps only have to name the booking and fill the three pickers.",
    crop: '[data-doc-shot="reservation-form-dispatch"]',
    open: [
      'button:has-text("New reservation")',
      "fill:#res-title=Pattern work and three landings",
      // Each picker is a Popover + cmdk list, so it takes two clicks: open it, then
      // take an option. The tail is named, because the first one in the fleet may be
      // grounded or carrying squawks and would head this form with a notice that is a
      // different screenshot's subject. The people are taken first from their lists,
      // because the roster differs between the local database and the test org on prod.
      'button:has-text("Select resource")',
      '[role="option"]:has-text("{freeTail}")',
      'button:has-text("Assign instructor")',
      '[role="option"]',
      'button:has-text("Assign student")',
      '[role="option"]',
    ],
  },
  {
    id: "time-picker-next-available",
    screen: "Booking form, date and time picker",
    route: "/schedule",
    alt: "Booking form, date and time picker",
    dataState:
      "An aircraft booked solid for a whole day, two days out, so the Start dropdown has no options and the Next available date and time link appears. Seeded as an all-day maintenance block by seed-test-org-schedule-states-for-docs.mjs. Shot from the dispatch form rather than /me/book: it is the same picker component, and /me/book is an empty state for the owner account these are captured from, whose roles dispatch bookings rather than sit on them.",
    crop: '[data-doc-shot="time-picker-next-available"]',
    open: [
      // Day first, because the range is remembered in localStorage and the month shot
      // runs before this one, and the arrow's label follows the range.
      'button[role="tab"]:has-text("Day")',
      // Step the board forward BEFORE opening the form: the form takes its date from
      // the board. The fully blocked day is two days out rather than today, so that an
      // all-day booking is not stretching the hour ruler on either of the two boards
      // other shots are taken from.
      'button[aria-label="Next day"]',
      'button[aria-label="Next day"]',
      'button:has-text("New reservation")',
      'button:has-text("Select resource")',
      '[role="option"]:has-text("{fullyBookedTail}")',
    ],
  },
  {
    id: "repeat-dropdown-presets",
    screen: "Booking form, Repeat control",
    route: "/schedule",
    alt: "Booking form, Repeat control",
    dataState:
      "A booking form with a date and a start time already chosen, then the weekly preset taken, so the control reads Weekly on <day> and the summary line underneath reads Repeats every week on <day> with a booking count. The presets are derived from the start, so an untouched form offers only Does not repeat. The open list itself cannot be in this picture: Radix portals the dropdown to the document body, outside the control this crops to.",
    crop: '[data-doc-shot="repeat-dropdown-presets"]',
    open: [
      'button:has-text("New reservation")',
      // A tail with room left on it today. The Start dropdown is DISABLED when the
      // chosen aircraft has no free slots on the chosen day, and picking whichever
      // aeroplane came first in the fleet list landed on one that was out all day.
      'button:has-text("Select resource")',
      '[role="option"]:has-text("{freeTail}")',
      "#smart-start",
      '[role="option"]',
      "#repeat",
      '[role="option"]:has-text("Weekly on")',
    ],
  },
  {
    id: "drag-callout-conflict",
    screen: "Calendar, day view, block being dragged",
    route: "/schedule",
    alt: "Calendar, day view, block being dragged",
    dataState:
      "Two bookings on the same aircraft TOMORROW, the later one dragged back over the earlier one so the red callout names the clash. Tomorrow because a booking whose window has already closed cannot be dragged at all, which rules out every pair on today's board for most of the day. The callout only exists while the block is HELD, so this is the one shot whose step leaves the mouse button down until the crop is taken.",
    crop: '[data-doc-shot="drag-callout-conflict"]',
    open: [
      'button[role="tab"]:has-text("Day")',
      // Tomorrow's board, not today's. A booking whose window has already closed cannot
      // be picked up at all (the board answers the attempt with a toast rather than the
      // callout), which rules out every pair on today's board from mid-morning onwards.
      'button[aria-label="Next day"]',
      "drag:[aria-label^='{dragSourceTitle}'] => [aria-label^='{dragTargetTitle}']",
    ],
  },
  {
    id: "ramp-out-modal",
    screen: "Ramp out modal",
    route: "/schedule?reservation={scheduledReservationId}",
    alt: "Ramp out modal",
    dataState:
      "A booking with an aircraft that has current Hobbs and tach readings on its record, not yet ramped out, so both fields show prefilled values.",
    crop: '[data-doc-shot="ramp-out-modal"]',
    open: ['button:has-text("Ramp out")'],
  },
  {
    id: "ramp-in-modal-hours-flown",
    screen: "Ramp in modal",
    route: "/schedule?reservation={rampedOutReservationId}",
    alt: "Ramp in modal",
    dataState:
      "A same day booking that has ramped out, with an ending Hobbs typed that is 1.4 above the out reading so the live Hours flown line renders. The field arrives prefilled with the OUT reading, so without typing over it the picture is always of a flight of 0.0 hours.",
    crop: '[data-doc-shot="ramp-in-modal-hours-flown"]',
    open: ['button:has-text("Ramp in")', "fill:#ramp-hobbs={rampInHobbs}"],
  },
  {
    id: "ramp-in-overnight-notice",
    screen: "Ramp in modal, overnight notice",
    route: "/schedule?reservation={overnightRampedOutReservationId}",
    alt: "Ramp in modal, overnight notice",
    dataState:
      "An organization overnight minimum of 2.0 hours, a booking that spanned two nights and has ramped out, and an ending reading 1.5 hours above the out reading, so the notice reads that it will bill 4.0 hours rather than the 1.5 flown. The notice is computed from what has just been typed, so the reading has to be entered.",
    crop: '[data-doc-shot="ramp-in-overnight-notice"]',
    open: ['button:has-text("Ramp in")', "fill:#ramp-hobbs={overnightRampInHobbs}"],
  },
  {
    id: "review-times-modal-ground",
    screen: "Review times modal",
    route: "/schedule?reservation={groundReservationId}",
    alt: "Review times modal",
    dataState:
      "A Ground booking in a room that has not been closed out, so the modal is titled Review times and shows instruction time only, with no Hobbs or tach fields.",
    crop: '[data-doc-shot="review-times-modal-ground"]',
    open: ['button:has-text("Review times")'],
  },
  {
    id: "confirm-review-pin-modal",
    screen: "Confirm review modal",
    route: "/schedule?reservation={awaitingReviewReservationId}",
    alt: "Confirm review modal",
    dataState:
      "A booking that has ramped in, signed in AS A PILOT ON IT who has not yet confirmed. The default capture account owns and administers the school but is not rostered on any flight, and the console offers nobody else the button, so this one has to be captured with DOCS_EMAIL=test-student@aerscheduler.com.",
    crop: '[data-doc-shot="confirm-review-pin-modal"]',
    open: ['button:has-text("Confirm review")'],
  },
  {
    id: "guest-close-out-modal",
    screen: "Close out and bill guest modal",
    route: "/schedule?reservation={guestReservationId}",
    alt: "Close out and bill guest modal",
    dataState:
      "A Guest flight that has ramped in, with a guest name, email and phone on the record, signed in as an admin or as the instructor on it.",
    crop: '[data-doc-shot="guest-close-out-modal"]',
    open: ['button:has-text("Close out")'],
  },
  {
    id: "who-pays-what-panel",
    screen: "Who pays what panel",
    route: "/schedule?reservation={splitReservationId}",
    alt: "Who pays what panel",
    dataState:
      "A booking with more than one person billed for it that has ramped in and has not been invoiced. The panel renders itself once there are two payers; it disappears the moment the invoices exist, because the server refuses to change the shares after that. The per-payer leg and share fields have no ids of their own, so the live mismatch warnings are not reachable from a capture step yet. The panel now folds behind a summary, so the step has to open it first. THE COLLIDED LABELS ARE FIXED: the field grid was asking for up to five columns off the VIEWPORT width inside a panel capped at 448px, which ran Instruction (hrs) underneath Share %. It is two columns now, at every width.",
    crop: '[data-doc-shot="who-pays-what-panel"]',
    open: ['button:has-text("Who pays what")'],
  },
  {
    id: "who-pays-split-evenly",
    screen: "Who pays what, after Split evenly",
    route: "/schedule?reservation={splitReservationId}",
    alt: "Who pays what, after Split evenly",
    dataState:
      "The same booking, with Split evenly pressed: consecutive Hobbs legs per payer, instruction divided, 50/50 shares, and the running totals underneath reporting that the individual hours add up to what the aircraft flew and the shares come to 100%. The button only appears once the booking has ramped in, since before that there are no hours to divide.",
    crop: '[data-doc-shot="who-pays-what-panel"]',
    open: ['button:has-text("Who pays what")', 'button:has-text("Split evenly")'],
  },
  {
    id: "cancel-reservation-dialog",
    screen: "Cancel reservation dialog",
    route: "/schedule?reservation={repeatingReservationId}",
    alt: "Cancel reservation dialog",
    dataState:
      "One occurrence of a repeating booking that has not started, so both the reason type list and the three series scope options render. The scope options only appear on a booking that belongs to a series.",
    crop: '[data-doc-shot="cancel-reservation-dialog"]',
    open: ['button:has-text("Cancel reservation")'],
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
    route: "/schedule?personId={boardPersonId}",
    alt: "Calendar, filters applied",
    dataState:
      "A busy day with the Personnel facet pinned to somebody who is on several of the bookings but not all of them, so matched blocks are bright, the rest are faint, and the header reads N of M matching. personId is a real URL facet on the board, and the placeholder resolves to whoever is on the most bookings: pinning the first person in the roster dims everything and reads as a broken filter rather than a filter.",
    crop: '[data-doc-shot="board-filters-dimmed"]',
    open: ['button[role="tab"]:has-text("Day")'],
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
    route: "/schedule?reservation={multiDayReservationId}",
    alt: "Booking form with multi-day on",
    dataState:
      "Multi-day bookings enabled on the organization, and a two night trip that has not been dispatched yet, opened for editing. Reached through Edit rather than by filling in a new form: the dates are a calendar popover rather than a typed field, and an existing trip already carries the real Out on, Back on and Back at values the picture is about.",
    crop: '[data-doc-shot="overnight-booking-fields"]',
    open: ['button:has-text("Edit reservation")'],
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
      "An aircraft grounded with a reason, carrying two open squawks, selected in the booking form so the notice renders above the time picker. The placeholder resolves to whichever grounded tail has the most open squawks, so both halves of the notice have something to say.",
    crop: '[data-doc-shot="airworthiness-notice"]',
    open: [
      'button:has-text("New reservation")',
      'button:has-text("Select resource")',
      '[role="option"]:has-text("{airworthinessTail}")',
    ],
  },
  {
    id: "me-book-solo",
    screen: "Book a reservation, Solo",
    route: "/me/book",
    alt: "Book a reservation, Solo",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com), whose default type is Solo. At least three aircraft, one grounded and one with an open squawk, so the picker's right-hand column and the notice below it both have something to say.",
    crop: '[data-doc-shot="me-book-solo"]',
    // An aircraft has to be CHOSEN or the form is a column of empty fields and the
    // airworthiness notice the article's step 2 is about never renders. N44TS is
    // the grounded tail, which is the case that step describes.
    open: [
      '[data-doc-shot="me-book-solo"] button[role="combobox"]:has-text("Select resource")',
      '[cmdk-item]:has-text("{airworthinessTail}")',
    ],
  },
  {
    id: "me-book-type-dropdown",
    screen: "Book a reservation, Type dropdown open",
    route: "/me/book",
    alt: "Book a reservation, Type dropdown open",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com) with the Type dropdown open, so the narrowed list (no Rental, no Guest, no Maintenance) is visible. Signed in as anyone else the list is a different one and the crop element is not even rendered.",
    crop: '[data-doc-shot="me-book-type-dropdown"]',
    open: ["#res-type"],
  },
  {
    id: "me-book-your-seat",
    screen: "Book a reservation, Your seat toggle",
    route: "/me/book",
    alt: "Book a reservation, Your seat toggle",
    dataState:
      "Capture as the INSTRUCTOR (DOCS_EMAIL=test-instructor@aerscheduler.com), the one test account holding both the instructor and student roles. The toggle only renders for a member who holds both, on a type that has a counterpart, so as anyone else this element does not exist.",
    crop: '[data-doc-shot="me-book-your-seat"]',
    open: ["#res-type", '[role="option"]:has-text("Dual")'],
  },
  {
    id: "me-book-start-times",
    screen: "Book a reservation, Start dropdown open",
    route: "/me/book",
    alt: "Book a reservation, Start dropdown open",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com). An aircraft with free time left on the day it is captured: the list only offers 15-minute marks where the aircraft AND the member are both free, so a tail booked solid gives the Next available link instead and the dropdown never opens. N28TS is the one the test org keeps open. Run this one in the MORNING if you want the gaps: the list starts at the next free mark from now, so a late-afternoon run photographs one unbroken evening run with nothing to stop and restart around.",
    crop: '[data-doc-shot="me-book-start-times"]',
    // The Start select is disabled until a resource is chosen, so the aircraft
    // comes first and the dropdown second.
    open: [
      '[data-doc-shot="me-book-solo"] button[role="combobox"]:has-text("Select resource")',
      '[cmdk-item]:has-text("N28TS")',
      "#smart-start",
    ],
  },
  {
    id: "me-book-repeat",
    screen: "Book a reservation, Repeat control",
    route: "/me/book",
    alt: "Book a reservation, Repeat control",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com). A booking with an aircraft and a start time already chosen, then Repeat set to Custom. The start date is what seeds the weekday chip and the summary line, so without one the dialog opens with nothing selected.",
    crop: '[data-doc-shot="me-book-repeat"]',
    open: [
      '[data-doc-shot="me-book-solo"] button[role="combobox"]:has-text("Select resource")',
      '[cmdk-item]:has-text("N28TS")',
      "#smart-start",
      '[role="option"]',
      "#repeat",
      '[role="option"]:has-text("Custom")',
      // The count, by its wrapper rather than by its aria-label: a fill step splits
      // on the first "=", so a selector carrying one loses everything after it.
      // Doubles as the blur, since the interval box autofocuses and selects its own
      // value and a highlighted "1" reads as a field somebody is mid-edit on.
      "fill:div.flex-1 input.w-20=8",
    ],
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
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com), who has one booking today, one tomorrow, and two later in the week, so the Today / Tomorrow / weekday grouping is visible. As the default owner account this succeeds and shows neither heading.",
    crop: '[data-doc-shot="me-schedule-list"]',
  },
  {
    id: "me-currencies",
    screen: "Your currencies",
    route: "/me/currencies",
    alt: "Your currencies",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com), the only member in the test org carrying currencies: one current, one expiring within 30 days, one expired, and one never signed off, so all four counts are non-zero and the worst-first order is visible. As the default owner account this captures a four-zero header over Nothing tracked yet.",
    crop: '[data-doc-shot="me-currencies"]',
  },
  {
    id: "me-documents-upload",
    screen: "Upload a document modal",
    route: "/me/documents",
    alt: "Upload a document modal",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com). A school with at least three document types, one that expires and one marked restricted, so the expiry field appears and the picker visibly omits the restricted type. FAA medical certificate is the expiring one; Stage check record is the restricted one a member never sees.",
    crop: '[data-doc-shot="me-documents-upload"]',
    // Expires on is conditional on the chosen type, so a type has to be picked
    // or the field the article is about is not in the picture.
    open: [
      'button:has-text("Upload")',
      "#doc-type",
      '[role="option"]:has-text("FAA medical certificate")',
    ],
  },
  {
    id: "profile-availability",
    screen: "Profile, Availability tab",
    route: "/me/profile?tab=availability",
    alt: "Profile, Availability tab",
    dataState:
      "Capture as the INSTRUCTOR (DOCS_EMAIL=test-instructor@aerscheduler.com), with Tuesday to Saturday switched on with real hours, and Sunday and Monday off showing Unavailable. The tab is only built for a member holding the instructor role, so as the default owner account the route renders without it and the crop never appears.",
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
      "Signed in as an instructor so the Endorsements section renders, with the master Email notifications switch on and one individual category switched off. The Push card is below on the same page.",
    crop: '[data-doc-shot="me-notifications"]',
  },
  {
    id: "announcement-form-dialog",
    screen: "New announcement dialog",
    route: "/operations/announcements",
    alt: "New announcement dialog",
    dataState:
      "The New announcement dialog open with a title, a short message, and Expires left as Never. Nothing here is stored state: the dialog always opens blank, so the steps below type the whole notice.",
    crop: '[data-doc-shot="announcement-form-dialog"]',
    open: [
      'button:has-text("New announcement")',
      "fill:#announcement-title=Runway 4L closed Saturday morning",
      "fill:#announcement-message=Expect delays taxiing to the run-up area. Use 22 if you can.",
    ],
  },
  {
    id: "joining-and-fleet-settings",
    screen: "Settings, School",
    route: "/settings?tab=organization",
    alt: "Joining and fleet settings",
    dataState:
      "The Joining & fleet card with Approve people before they join off and Update aircraft home base on ramp in on, so the second switch is the one an article about home-base-on-ramp-in points at.",
    crop: '[data-doc-shot="joining-and-fleet-settings"]',
  },
  {
    id: "leave-organization-card",
    screen: "Profile, Security, Leave this school",
    route: "/me/profile?tab=security",
    alt: "Leave this school card",
    dataState:
      "DOCS_EMAIL=test-admin@aerscheduler.com, a member who is not the sole owner. The card lives on the Security tab of Profile & account, not the Profile tab.",
    crop: '[data-doc-shot="leave-organization-card"]',
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
      "Signed in as the owner. Billing enabled on. Rates and fees card: default instructor rate set, service fee 3 percent with a custom label, overnight minimum 2.0, grounding threshold 3.",
    crop: '[data-doc-shot="billing-settings-card"]',
  },
  {
    id: "ledger-mode-card",
    screen: "Settings, Billing, How members pay",
    route: "/settings?tab=billing",
    alt: "How members pay: Invoice each booking or Account ledger",
    caption: "Pick invoice-per-booking or an account ledger. Guests always get a pay-this-visit invoice.",
    dataState:
      "Signed in as the owner. Billing enabled on. Invoice each booking or Account ledger selected. Crop to the How members pay card.",
    crop: '[data-doc-shot="ledger-mode-card"]',
  },
  {
    id: "ledger-topup-card-fee",
    screen: "Settings, Billing, Card fee on account top-ups",
    route: "/settings?tab=billing",
    alt: "Card fee on account top-ups settings",
    caption: "Optional percent and flat fee when members add funds by card.",
    dataState:
      "Signed in as the owner with Account ledger selected so the card fee card is visible. Percent and flat left blank (placeholders 0.0 / 0.00). Crop to that card.",
    crop: '[data-doc-shot="ledger-topup-card-fee"]',
  },
  {
    id: "ledger-late-fees",
    screen: "Settings, Billing, Late fees",
    route: "/settings?tab=billing",
    alt: "Late fees on an overdue account balance",
    caption: "A percent of what is owed, plus an optional flat amount, once per member per month.",
    dataState:
      "DOCS_EMAIL=test-owner@aerscheduler.com with Account ledger selected, so the Late fees card is visible. Grace period left at the 30 day default.",
    crop: '[data-doc-shot="ledger-late-fees"]',
  },
  {
    id: "ledger-accounts-table",
    screen: "Billing, Accounts",
    route: "/billing?pane=accounts",
    alt: "Billing, Accounts tab: every member's running balance",
    caption: "Who owes and who has prepaid. Amber is owed, green is credit on account.",
    dataState:
      "DOCS_EMAIL=test-owner@aerscheduler.com, Account ledger on. At least one member in credit and one owing, so both colours appear and Days owing is populated on the amber row.",
    crop: '[data-doc-shot="ledger-accounts-table"]',
  },
  {
    id: "person-ledger",
    screen: "People, person, Ledger",
    route: "/people/{ledgerPersonId}?tab=ledger",
    alt: "A member's account ledger",
    caption: "Balance, entries, and the desk actions an admin gets on someone else's ledger.",
    dataState:
      "DOCS_EMAIL=test-owner@aerscheduler.com looking at another member with a non-zero balance and several entries of different types (a top-up, a flight charge, an adjustment), so the type column and the green credit rows are both worth reading.",
    crop: '[data-doc-shot="person-ledger"]',
  },
  {
    id: "ledger-add-credit-dialog",
    screen: "Add credit dialog",
    route: "/people/{ledgerPersonId}?tab=ledger",
    alt: "Add credit dialog",
    caption: "Desk credit for cash, check, or other money taken at the counter. The memo is required.",
    dataState:
      "DOCS_EMAIL=test-owner@aerscheduler.com on another member's ledger. The dialog opens blank, so the steps below type the amount and the memo.",
    crop: '[data-doc-shot="ledger-add-credit-dialog"]',
    open: ['button:has-text("Add credit")'],
  },
  {
    id: "ledger-adjustment-dialog",
    screen: "Adjustment dialog",
    route: "/people/{ledgerPersonId}?tab=ledger",
    alt: "Ledger adjustment dialog",
    caption: "A signed plus or minus that is not a flight and not a top-up.",
    dataState:
      "DOCS_EMAIL=test-owner@aerscheduler.com on another member's ledger. The dialog opens blank.",
    crop: '[data-doc-shot="ledger-adjustment-dialog"]',
    open: ['button:has-text("Adjustment")'],
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
    // The one spec that cannot be captured in a plain run, and the reason is
    // structural rather than fixable: this card and `billing-payouts-connected`
    // are the SAME card in the two states of one boolean, so no single org can
    // hold both, and the test org has Stripe connected because most of the other
    // billing shots need it to be.
    //
    // Staged by flipping `organizationBillingSettings.stripeEnabled` to false on
    // the test org, capturing this id alone, and flipping it straight back. Do
    // that on a LOCAL database, never on the test org in production: there the
    // column is the one Stripe's own webhook writes, and a hand-edit races it.
    dataState:
      "An organization with no Stripe account, so the badge reads Not connected and the button reads Connect payouts. Crop to the Payouts card. Staged locally by setting stripeEnabled false on the test org for this one capture, then restoring it.",
    crop: '[data-doc-shot="billing-payouts-not-connected"]',
  },
  {
    id: "aircraft-rate-fields",
    screen: "Aircraft, edit form",
    route: "/aircraft/{aircraftId}",
    alt: "Aircraft, edit form",
    dataState:
      "An aircraft with a wet rate of 165.00 and Bill by Hobbs time on, with the edit form open and scrolled to Rate, Rate basis and the Hobbs toggle.",
    open: ['button:has-text("Edit")'],
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
    route: "/schedule?reservation={scheduledReservationId}",
    alt: "Reservation detail sheet, Close-out section",
    dataState:
      "Today's dual booking with an aircraft and an instructor, not yet ramped, so the progress row highlights Dispatch and the Ramp out button is the only action. There are no readings yet, so that block is absent, and everything secondary is folded.",
    crop: '[data-doc-shot="close-out-not-started"]',
  },
  {
    id: "close-out-ramp-in-dialog",
    screen: "Ramp in dialog",
    route: "/schedule?reservation={rampedOutReservationId}",
    alt: "Ramp in dialog",
    dataState:
      "A dual already ramped out, with the ramp-in dialog open showing Hobbs in, Tach in and Instruction time, prefilled from the ramp-out readings. Instruction time only appears on a booking that has an instructor on it.",
    crop: '[data-doc-shot="ramp-in-modal-hours-flown"]',
    open: ['button:has-text("Ramp in")', "fill:#ramp-hobbs={rampInHobbs}"],
  },
  {
    id: "close-out-overnight-notice",
    screen: "Ramp in dialog with overnight notice",
    route: "/schedule?reservation={overnightRampedOutReservationId}",
    alt: "Ramp in dialog with overnight notice",
    dataState:
      "A booking that spans two nights on an org with a 2.0 hour overnight minimum, ramped out, with an ending reading typed, so the ramp-in dialog shows the two nights notice above the save button.",
    crop: '[data-doc-shot="ramp-in-overnight-notice"]',
    open: ['button:has-text("Ramp in")', "fill:#ramp-hobbs={overnightRampInHobbs}"],
  },
  {
    id: "close-out-invoice-summary",
    screen: "Reservation detail sheet, invoice summary",
    route: "/schedule?reservation={invoicedReservationId}",
    alt: "Reservation detail sheet, invoice summary",
    dataState:
      "A fully closed out and billed booking split between two payers, so the summary shows line items, a total, and the one of two shares label.",
    crop: '[data-doc-shot="close-out-invoice-summary"]',
  },
  {
    id: "close-out-bill-guest",
    screen: "Close out and bill guest dialog",
    route: "/schedule?reservation={guestReservationId}",
    alt: "Close out and bill guest dialog",
    dataState:
      "A guest booking with a complete guest record (name, email, phone), ramped out and in, with the Close out and bill guest dialog open.",
    crop: '[data-doc-shot="guest-close-out-modal"]',
    open: ['button:has-text("Close out")'],
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
      "The editor open on Sim, the one booking type the Flight school preset leaves with a different rule on each charge line: aircraft split evenly, instruction each pays in full. Opened anywhere else the worked example is an ordinary division and the amber warning never renders.",
    crop: '[data-doc-shot="cost-splitting-edit-modal"]',
    // Row picked by its own label rather than by position, then the help icon on
    // the instruction line. The example is a popover portalled to <body>, so it is
    // not inside the crop element, but it opens over the modal and the crop is a
    // page clip of that rectangle, so it lands in the picture anyway.
    open: [
      'div:has(> div > div > span:text-is("Sim")) button:has-text("Edit")',
      'button[aria-label="See an example of how instruction is split"]',
    ],
  },
  {
    id: "invoice-detail-panel",
    screen: "Invoice detail panel",
    // Opened by clicking the row rather than by `?invoice={invoiceId}`: the
    // placeholder resolves to whichever invoice the API hands back first, which
    // here is a voided one with no booking behind it. The panel only says
    // anything worth photographing for the SPECIFIC invoice described below, so
    // the row is picked by what it shows: the newest paid one billed to the
    // renter on the shared flight.
    //
    // `?status=paid` rather than a bare `/billing`, and the reason is not the
    // narrowing. A bare list route is REFILLED FROM localStorage on first paint
    // (see use-list-query-state), so arriving here after the unbilled shot put
    // this page on the Unbilled tab, where there are no invoice rows at all and
    // the step below waited ten seconds for one. Any route that names its own
    // filters is immune; a bare one inherits whichever spec ran before it.
    route: "/billing?status=paid",
    alt: "Invoice detail panel",
    dataState:
      "A paid invoice from a split booking: several line items including a service fee, a linked flight with two people, QuickBooks showing Synced with a Sales Receipt id, and the audit trail populated. The one the open step lands on is the most recent paid invoice whose customer is Test Renter.",
    crop: '[data-doc-shot="invoice-detail-panel"]',
    open: ['tr:has-text("Test Renter"):has-text("Paid")'],
  },
  {
    id: "create-invoice-dialog",
    screen: "New invoice dialog",
    route: "/billing",
    alt: "New invoice dialog",
    dataState:
      "The dialog open with a member selected, two line items (a headset rental and a checkride fee), a memo, a due date, and the running total. Nothing here is stored state: the dialog always opens blank, so the whole invoice is typed by the steps below.",
    crop: '[data-doc-shot="create-invoice-dialog"]',
    // Nothing reaches this dialog prefilled. Bill on an unbilled flight used to open
    // it with a draft and no longer does (it prices the booking outright), so a
    // click-only path photographs an empty form under a paragraph about line items.
    //
    // The due date is the 1st of NEXT month rather than a day in this one: pressing
    // the calendar's next arrow and taking its first "1" lands on a real future date
    // whatever month the capture runs in, where clicking a number in the visible grid
    // would go stale or pick a date already past.
    open: [
      'button:has-text("New invoice")',
      "#invoice-customer button",
      '[cmdk-item]:has-text("Test Student")',
      "fill:#invoice-item-0=Headset rental",
      "fill:div:has(> #invoice-item-0) input.pl-7=65.00",
      'button:has-text("Add line item")',
      "fill:#invoice-item-1=Checkride fee",
      "fill:div:has(> #invoice-item-1) input.pl-7=175.00",
      "fill:#invoice-memo=Supplies and checkride fee for August.",
      'button:has-text("No due date")',
      ".rdp-button_next",
      'button:text-is("1")',
    ],
  },
  {
    id: "my-invoices",
    screen: "My invoices",
    route: "/me/invoices",
    alt: "My invoices",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com). This page is the signed-in member's OWN invoices, and the owner has none of their own, so run as the owner it is an empty state. A member with one outstanding invoice and three paid ones, so both summary cards have a figure and the table shows a mix of statuses.",
    crop: '[data-doc-shot="my-invoices"]',
  },
  {
    id: "pay-invoice-dialog",
    screen: "Pay invoice dialog",
    // `?invoice=` only opens the read-only drawer; Pay now is a button inside it,
    // and the dialog it opens has no URL of its own.
    route: "/me/invoices",
    alt: "Pay invoice dialog",
    dataState:
      "Capture as the STUDENT (DOCS_EMAIL=test-student@aerscheduler.com): the owner has no invoices of their own and the page is empty. An outstanding invoice open with the Stripe card form showing. Use a Stripe test card only, and never capture a real member's name or amount.",
    crop: '[data-doc-shot="pay-invoice-dialog"]',
    open: ['tr:has-text("Outstanding")', 'button:has-text("Pay $")'],
  },
  {
    id: "payment-methods-autopay",
    screen: "Profile, Payment methods",
    route: "/me/profile?tab=payments",
    alt: "Profile, Payment methods",
    dataState:
      "One saved test card set as default with autopay on, so the Autopay card reads that new invoices are charged automatically and the card shows brand, last four and expiry. NOT YET STAGEABLE: a saved card lives in Stripe, not in our database, and nobody in the test org has one, so every account captured here so far photographs the empty state (autopay off, No cards saved yet) under an article about autopay being on. The earlier file was deleted for that reason. Save a Stripe TEST card against a test member first (see the stripe-local skill), then capture as whoever holds it.",
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
      "A saved plan open for editing with a join fee, quarterly dues, Bill everyone on the same day set to the 1st, prorate on, days to pay set, a booking window, and at least one per aircraft tier rate filled in. Full member is the plan that carries all of them.",
    crop: '[data-doc-shot="membership-plan-editor"]',
    // The plan is chosen by its own name, not by row order. The second click is
    // on the dialog heading and does nothing: the editor autofocuses Plan name
    // and SELECTS its text, so without it the picture opens on a blue highlight.
    open: [
      'div:has(> div > div > h3:text-is("Full member")) button:has-text("Edit")',
      '[role="dialog"] h2:has-text("Edit plan")',
    ],
  },
  {
    id: "person-membership-card",
    screen: "Person record, Billing tab",
    // Reached by name from the roster rather than by id. The subject has to be a
    // specific member (the one carrying the membership), and `{personId}` resolves
    // to whichever org user the API returns first, which is the owner.
    route: "/people",
    alt: "Person record, Billing tab",
    dataState:
      "A member on an active plan with the join fee billed, at least three dues periods in history (one waived, one failed), autopay on, and two invoices in the Invoices card below.",
    crop: '[data-doc-shot="person-membership-card"]',
    open: ['a:has-text("Test Student")', 'nav[aria-label="Member"] button:has-text("Billing")'],
  },
  {
    id: "quickbooks-setup",
    screen: "Settings, Integrations, QuickBooks Online",
    route: "/settings/integrations/quickbooks",
    alt: "Settings, Integrations, QuickBooks Online",
    dataState:
      "Owner, on the not-yet-connected page: the three-step strip, the subtitle and Connect QuickBooks, which is the step the article puts this image under. The CONNECTED version of this screen cannot be staged locally and the file on disk is deliberately the disconnected one. Connecting needs a real Intuit sandbox company and a real OAuth sign-in, and a hand-written settings row does not stand in: the Configuration section loads Products and Services live from Intuit, so a fabricated token leaves the income item reading 'No active items in QuickBooks' next to a Sync toggle that is on, which is a picture of a broken integration rather than a working one. Capture the connected state only from an org that is genuinely connected.",
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
    // Standard set is the mode the modal opens on, and it ticks the AVIATES rows
    // itself, so the header button is the whole path.
    open: ['button:has-text("Add inspections")'],
    crop: '[data-doc-shot="add-inspections-standard-set"]',
  },
  {
    id: "add-inspections-recurring",
    screen: "Add inspections, Recurring",
    route: "/maintenance?view=aircraft",
    alt: "Add inspections, Recurring",
    dataState:
      "Modal open in Recurring mode with a name typed, On the meter selected, Count tach time chosen, Every 100 and Warn me 10 filled, and Grounds the aircraft switched on.",
    // Every 100 and Warn 10 are the form's own defaults, so only the mode, the
    // basis, the meter and the grounds switch need a click. Name is left on its
    // placeholder: the steps click, they cannot type.
    open: [
      'button:has-text("Add inspections")',
      'button:has-text("Repeats on hours")',
      'button:has-text("On the meter")',
      'button:has-text("Count tach time")',
      "#insp-grounds",
    ],
    crop: '[data-doc-shot="add-inspections-recurring"]',
  },
  {
    id: "add-inspections-last-done",
    screen: "Add inspections, When was it last done?",
    route: "/maintenance?view=aircraft",
    alt: "Add inspections, When was it last done?",
    dataState:
      "Modal open in Recurring mode with a Date and a Meter reading typed and two aircraft selected under Applies to, so the amber shared-meter warning is on screen. Crop to the When was it last done? box plus the warning.",
    // The warning renders on `lastDoneHours !== "" && targets.length > 1`, so it
    // needs BOTH halves: two tails picked, and a reading typed. The chips are
    // matched on `font-mono`, which is what tells a tail chip apart from the
    // segmented controls above it; plain `[aria-pressed=false]` also matches
    // "On the calendar" and "Count Hobbs Time"and `.first()` would click one
    // of those instead. Each click flips a chip to pressed, so the same selector
    // picks a different tail the second time.
    //
    // The Date half of the state above stays unfilled: `#insp-last-date` is a
    // picker button rather than an input, and a `fill:` step on it throws.
    open: [
      'button:has-text("Add inspections")',
      'button:has-text("Repeats on hours")',
      "button.font-mono[aria-pressed=\"false\"]",
      "button.font-mono[aria-pressed=\"false\"]",
      "fill:#insp-last-hours=5800.0",
    ],
    crop: '[data-doc-shot="add-inspections-last-done"]',
  },
  {
    id: "add-inspections-calendar-unit",
    screen: "Add inspections, Recurring, on the calendar",
    route: "/maintenance?view=aircraft",
    alt: "A calendar interval, counted in days, weeks or calendar months",
    caption:
      "Calendar months is the default, and the note says why it is not the same as 365 days.",
    dataState:
      "The form's own opening state, which is the point: On the calendar is preselected, the unit is calendar months, and the number beside it is 12. No typing, only the two clicks that open the modal and switch it to Recurring. The sibling shot add-inspections-recurring clicks through to On the meter, so it cannot show this control at all.",
    open: ['button:has-text("Add inspections")', 'button:has-text("Recurring")'],
    crop: '[data-doc-shot="add-inspections-recurring"]',
  },
  {
    id: "add-inspections-source",
    screen: "Add inspections, Where this comes from",
    route: "/maintenance",
    alt: "Choosing an inspection's source",
    dataState:
      "The Add inspections dialog on the Recurring mode with a name and interval filled in, and the source set to Airworthiness Directive so the document number, revision and link fields are revealed.",
    open: [
      'button:has-text("Add inspections")',
      'button:has-text("Recurring")',
      '[data-testid="insp-source-type"]',
      '[role="option"]:has-text("Airworthiness Directive")',
    ],
    crop: '[data-doc-shot="add-inspections-source"]',
  },
  {
    id: "sign-off-compliance",
    screen: "Sign off, compliance record",
    // FILTERED TO AN AD, and that is the whole spec. The compliance half only opens by default
    // on an Airworthiness Directive; on an ordinary inspection the switch is off and the section
    // is one collapsed row. This used to be a bare /maintenance?view=reminders and clicked the
    // FIRST Sign off in the list, which is whatever is most overdue, so it captured a collapsed
    // toggle instead of the fields the article is about. It was a green run and a wrong picture.
    route: "/maintenance?view=reminders&q=2015-19-07",
    alt: "The compliance record section of a sign-off",
    dataState:
      "Capture as the TECHNICIAN (DOCS_EMAIL=test-technician@aerscheduler.com), whose profile carries certificate 3421887 (A&P), so the certificate and its kind arrive prefilled. As the default owner account both boxes are empty and the shot shows the \"no certificate on your profile yet\" hint instead, which is a true screen and the wrong illustration. Seeded by seed-test-org-maintenance-for-docs.mjs, which sets that certificate and creates the AD 2015-19-07 templates the query filters to.",
    open: ['[data-doc-shot="maintenance-all-inspections"] button:has-text("Sign off")'],
    crop: '[data-doc-shot="sign-off-compliance"]',
  },
  {
    id: "ad-tracking-modes",
    screen: "Settings, Airworthiness Directives",
    route: "/settings?tab=ad-tracking",
    alt: "The four choices for how much AerScheduler does about Airworthiness Directives",
    caption:
      "Nothing here is on by default, and Watch for new ones is not available yet.",
    dataState:
      "The default state: mode off, so Not here is the pressed card. Capture as the OWNER (DOCS_EMAIL=test-owner@aerscheduler.com); this tab is owner and admin only and does not render for anybody else, which is the point of the who-can-change-this section in the article.",
    crop: '[data-doc-shot="ad-tracking-modes"]',
  },
  {
    id: "ad-readiness-panel",
    screen: "Settings, What we could match",
    route: "/settings?tab=ad-tracking",
    alt: "Per aircraft, how precisely an Airworthiness Directive could be matched",
    caption: "A serial number is the one thing that narrows a match from a model to an aeroplane.",
    dataState:
      "A fleet where the three buckets are all non-empty, so the counts read as a distribution rather than a single number: at least one aircraft with make, model and serial (matched by serial), one with make and model only, and one missing a model. Seeded by seed-test-org-maintenance-for-docs.mjs. Owner or admin only.",
    crop: '[data-doc-shot="ad-readiness-panel"]',
  },
  {
    id: "compliance-log-scope",
    screen: "Maintenance, Compliance log with its caption",
    route: "/maintenance?view=compliance",
    alt: "The compliance log, under the sentence saying what it is not",
    caption:
      "The line above the table is the part that matters: this records the ADs you enter, and does not tell you which ADs apply.",
    dataState:
      "Four or more signed-off inspections across two aircraft, including Airworthiness Directives with real document numbers and revisions, one signed by an A&P and one by an IA so the certificate line shows both kinds. THE DEV DATABASE ACCUMULATES E2E LITTER: end-to-end runs sign off dozens of templates named E2E-something, and because compliance records are append-only there is no API that removes them. The first capture here was 111 rows of test data. Sweep them in SQL before shooting this. This crop deliberately includes the caption above the table: a school that believes this log IS its AD status is the one failure in this feature that could hurt somebody, and the sentence saying otherwise has to be in the picture.",
    crop: '[data-doc-shot="compliance-log"]',
  },
  {
    id: "sign-off-inspection-modal",
    screen: "Sign off",
    route: "/maintenance?view=reminders",
    alt: "Sign off",
    dataState:
      "An overdue hour-based inspection that carries the Grounds flag, on an aircraft currently auto-grounded with the reason Maintenance, so the modal shows the tach reading field and the return-to-service line.",
    // All inspections is sorted worst-first by the server, so the first Sign off
    // on the page belongs to the most urgent row, which is where the overdue
    // hour-based item lives.
    open: ['[data-doc-shot="maintenance-all-inspections"] button:has-text("Sign off")'],
    crop: '[data-doc-shot="sign-off-inspection-modal"]',
  },
  {
    id: "aircraft-maintenance-tab",
    screen: "Aircraft detail, Maintenance",
    route: "/aircraft/{aircraftId}?tab=maintenance",
    alt: "Aircraft detail, Maintenance",
    dataState:
      "One aircraft with at least five tracked inspections including one overdue and one due soon, plus two open squawks, viewed as an admin so Add, Sign off, Log and Resolve all render.",
    crop: '[data-doc-shot="aircraft-maintenance-tab"]',
  },
  {
    id: "aircraft-grounded-banner",
    screen: "Aircraft detail header, grounded",
    // The banner only renders on a grounded tail, and the fleet's first tail is
    // not one, so this asks for a grounded aircraft by name.
    route: "/aircraft/{groundedAircraftId}",
    alt: "Aircraft detail header, grounded",
    dataState:
      "An aircraft grounded by hand with a typed reason such as \"Prop strike\", viewed as an admin so the red banner sits above Edit, Approve members and Return to service.",
    crop: '[data-doc-shot="aircraft-grounded-banner"]',
  },
  {
    id: "ground-aircraft-modal",
    screen: "Ground aircraft",
    // {aircraftId} resolves to a tail that is NOT grounded, which is what makes
    // the header button read Ground rather than Return to service.
    route: "/aircraft/{aircraftId}",
    alt: "Ground aircraft",
    dataState:
      "An aircraft that is not currently grounded, with the Ground dialog open and the Reason box empty so its placeholder text is readable.",
    open: ['button:has-text("Ground")'],
    crop: '[data-doc-shot="ground-aircraft-modal"]',
  },
  {
    id: "log-squawk-modal",
    screen: "Log a squawk",
    route: "/maintenance?view=open",
    alt: "Log a squawk",
    dataState:
      "Two or more aircraft in the fleet. Dialog open with a realistic title and description typed and an aircraft picked, opened from the Maintenance page rather than from a tail so the Aircraft picker is visible.",
    // From the page header, not from a tail, so the Aircraft combobox is on
    // screen rather than a fixed row. Title and Description stay on their
    // placeholders: the steps click, they cannot type.
    open: [
      'button:has-text("Log a squawk")',
      '[data-doc-shot="log-squawk-modal"] [role="combobox"]',
      // The popover is portalled out of the modal, so the option cannot be
      // scoped to the crop. It closes on select and the tail lands in the
      // trigger, which is the part the picture is of.
      '[role="option"]',
    ],
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
    // The card opens the panel; scoped to the list so the page header's own
    // buttons cannot be what gets clicked.
    open: ['[data-doc-shot="maintenance-squawks-open"] [role="button"]'],
    crop: '[data-doc-shot="squawk-detail-panel"]',
  },
  {
    id: "resolve-squawk-modal",
    screen: "Resolve squawk",
    route: "/maintenance?view=open",
    alt: "Resolve squawk",
    dataState:
      "An open squawk with the Resolve dialog open, Completed defaulted to today, and notes partly typed so the character counter is visible.",
    // Resolve on the first open card. The counter renders whether or not the
    // notes have been typed into, so an empty box still shows it.
    open: ['[data-doc-shot="maintenance-squawks-open"] button:has-text("Resolve")'],
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
    open: [
      'button:has-text("New reservation")',
      'button:has-text("Select resource")',
      '[role="option"]:has-text("{airworthinessTail}")',
    ],
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
    open: ['button:has-text("Start from a template")'],
    dataState:
      "Dialog open showing all four templates with their stage, lesson and requirement counts, and the line saying every template is created as Part 61.",
    crop: '[data-doc-shot="training-template-picker"]',
  },
  {
    id: "training-new-course-dialog",
    screen: "New course dialog",
    route: "/training?tab=courses",
    alt: "New course dialog",
    open: ['button:has-text("New course")', "fill:#course-name=Instrument Rating"],
    dataState:
      "Dialog open with a name typed and the Trained under choice plus its helper text fully visible.",
    crop: '[data-doc-shot="training-new-course-dialog"]',
  },
  {
    id: "syllabus-stages-lessons",
    screen: "Course detail, Syllabus tab (draft)",
    // No course id in the route on purpose: ids differ between the local database and the
    // test org on prod, so the course is reached by name off the Courses list. The editor
    // only renders for a DRAFT and the page preselects the published version, so the
    // version dropdown has to be walked to Rev B before anything editable is on screen.
    route: "/training?tab=courses",
    alt: "Course detail, Syllabus tab (draft)",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      '[data-doc-shot="syllabus-published-locked"] [role="combobox"]',
      '[role="option"]:has-text("Rev B")',
      // One lesson expanded, so objectives, ACS tasks and the credit chips are visible.
      // An early one: the crop stops at the foot of the viewport, and a lesson opened
      // further down the syllabus has its expansion cut off by that edge.
      'button:has-text("Introduction and effects of controls")',
    ],
    dataState:
      "A draft version with two stages, one flagged Ends in a stage check, and one flight lesson expanded to show objectives, completion standards, ACS task chips and Credits toward chips.",
    crop: '[data-doc-shot="syllabus-stages-lessons"]',
  },
  {
    id: "syllabus-lesson-dialog-credits",
    screen: "Lesson dialog, Credits toward box",
    route: "/training?tab=courses",
    alt: "Lesson dialog, Credits toward box",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      '[data-doc-shot="syllabus-published-locked"] [role="combobox"]',
      '[role="option"]:has-text("Rev B")',
      // The pencil beside the lesson row. It carries an icon and no text, so it is reached
      // as the sibling of the row's own expand button rather than by a label.
      'button:has-text("Dual cross-country (day)") + button',
    ],
    dataState:
      "Draft version with at least four requirements already added, lesson dialog open on a flight lesson so flight time, ground time and per lesson can each be ticked. A second capture with nothing ticked, showing the amber Credits nothing line.",
    crop: '[data-doc-shot="syllabus-lesson-dialog-credits"]',
  },
  {
    id: "syllabus-requirements-tab",
    screen: "Course detail, Requirements tab",
    route: "/training?tab=courses",
    alt: "Course detail, Requirements tab",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      '[data-doc-shot="syllabus-published-locked"] [role="combobox"]',
      '[role="option"]:has-text("Rev B")',
      'nav[aria-label="Course"] button:has-text("Requirements")',
    ],
    dataState:
      "Draft version carrying the Private Pilot requirement set, including one requirement with a simulator limit chip, one with a transfer limit chip, and one with a recency window.",
    crop: '[data-doc-shot="syllabus-requirements-tab"]',
  },
  {
    id: "syllabus-grading-scale",
    screen: "Grading scale card",
    route: "/training?tab=courses",
    alt: "Grading scale card",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      '[data-doc-shot="syllabus-published-locked"] [role="combobox"]',
      '[role="option"]:has-text("Rev B")',
      'nav[aria-label="Course"] button:has-text("Requirements")',
    ],
    dataState:
      "Draft version with the default S, U and I scale, the Completes the lesson checkboxes visible and S ticked.",
    crop: '[data-doc-shot="syllabus-grading-scale"]',
  },
  {
    id: "syllabus-publish-dialog",
    screen: "Publish confirmation dialog",
    route: "/training?tab=courses",
    alt: "Publish confirmation dialog",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      '[data-doc-shot="syllabus-published-locked"] [role="combobox"]',
      '[role="option"]:has-text("Rev B")',
      // The header trigger, not the dialog's own "Publish and lock". Publishing is
      // irreversible, so this run must never reach the second one.
      'button:has-text("Publish")',
    ],
    dataState:
      "A Part 141 draft with at least a dozen lessons so the warning names a real count, and the optional FSDO approval reference field showing.",
    crop: '[data-doc-shot="syllabus-publish-dialog"]',
  },
  {
    id: "syllabus-published-locked",
    screen: "Course header, locked badge and version dropdown",
    route: "/training?tab=courses",
    alt: "Course header, locked badge and version dropdown",
    // The page lands on the published version by itself, which is exactly the state this
    // one is of, so the course link is the whole path.
    open: ['a:has-text("Private Pilot Certificate (Part 141)")'],
    dataState:
      "A course with a published Rev A (students enrolled) and a draft Rev B, so the dropdown holds two entries and the header reads Locked, students are enrolled against these lessons.",
    crop: '[data-doc-shot="syllabus-published-locked"]',
  },
  {
    id: "training-enroll-dialog",
    screen: "Enroll a student dialog",
    route: "/training?tab=courses",
    alt: "Enroll a student dialog",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      'nav[aria-label="Course"] button:has-text("Students")',
      'button:has-text("Enroll a student")',
      // Choose somebody, so the picture is of a filled-in form rather than a placeholder
      // over a disabled button. Selecting enrolls nobody; only the footer button does.
      '[data-doc-shot="training-enroll-dialog"] [role="combobox"]',
      '[role="option"]:has-text("Nate NeverFlew")',
    ],
    dataState:
      "A published, non-retired version selected, and a roster with several students plus one instructor so the (staff) suffix is visible in the picker.",
    crop: '[data-doc-shot="training-enroll-dialog"]',
  },
  {
    id: "course-enrollment-fee-card",
    screen: "Course detail, Enrollment fee card",
    route: "/training?tab=courses",
    alt: "Course detail, Enrollment fee card",
    open: [
      'a:has-text("Private Pilot Certificate (Part 141)")',
      'nav[aria-label="Course"] button:has-text("Students")',
    ],
    dataState:
      "A fee saved, for example $250, with custom invoice wording typed and the confirmation line reading Enrolling a student will record $250 owed.",
    crop: '[data-doc-shot="course-enrollment-fee-card"]',
  },
  {
    id: "enrollment-overview",
    screen: "Training record, Overview tab",
    // Reached off the roster rather than by id: enrollment ids differ between databases,
    // and only one row is the mid-course Part 141 record these shots are of.
    route: "/training?tab=students",
    alt: "Training record, Overview tab",
    open: ['a:has-text("Test Student"):has-text("Part 141")'],
    dataState:
      "A Part 141 student mid course: lessons bar part filled, pace badge showing At risk, the amber Not ready to graduate card naming two or more unmet requirements, an unbilled Course fee card, and one endorsement on the Endorsements card.",
    crop: '[data-doc-shot="enrollment-overview"]',
  },
  {
    id: "enrollment-requirements",
    screen: "Training record, Requirements tab",
    route: "/training?tab=students",
    alt: "Training record, Requirements tab",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'nav[aria-label="Enrollment"] button:has-text("Requirements")',
    ],
    dataState:
      "At least one requirement discounted by a simulator ceiling and one by a recency window, so both amber explanations render beside part-filled bars and credited is visibly lower than flown.",
    crop: '[data-doc-shot="enrollment-requirements"]',
  },
  {
    id: "enrollment-lessons",
    screen: "Training record, Lessons tab",
    route: "/training?tab=students",
    alt: "Training record, Lessons tab",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'nav[aria-label="Enrollment"] button:has-text("Lessons")',
    ],
    dataState:
      "Across two stages: one Complete lesson, one badged Next up, one record reading Awaiting student, and one Superseded record struck through with its Correction not signed underneath.",
    crop: '[data-doc-shot="enrollment-lessons"]',
  },
  {
    id: "enrollment-ledger",
    screen: "Training record, Ledger tab",
    route: "/training?tab=students",
    alt: "Training record, Ledger tab",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'nav[aria-label="Enrollment"] button:has-text("Ledger")',
    ],
    dataState:
      "Credits from at least four signed lessons, one transfer credit, one simulator credit and one negative reversal carrying an amendment reason, so every source chip and a negative amount appear.",
    crop: '[data-doc-shot="enrollment-ledger"]',
  },
  {
    id: "grade-lesson-dialog",
    screen: "Grade lesson dialog on the training record",
    route: "/training?tab=students",
    alt: "Grade lesson dialog on the training record",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'nav[aria-label="Enrollment"] button:has-text("Lessons")',
      // This lesson and not the first one on the page: it is the flight lesson carrying
      // both minimums and three credited requirements, which is what the dialog is of.
      'div:has(> div > span:has-text("Dual cross-country (day)")) button:has-text("Grade")',
    ],
    dataState:
      "Dialog open on a flight lesson that credits three requirements, with minimum flight and ground hours set on the lesson so the fields are prefilled and the Signing credits line lists all three.",
    crop: '[data-doc-shot="grade-lesson-dialog"]',
  },
  {
    id: "amend-record-dialog",
    screen: "Amend dialog",
    route: "/training?tab=students",
    alt: "Amend dialog",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'nav[aria-label="Enrollment"] button:has-text("Lessons")',
      // A record that is both signed and countersigned, so the dialog is offered at all.
      'div:has(> div > span:has-text("Basic instrument manoeuvres")) button:has-text("Amend")',
      "fill:#amend-reason=Hobbs read 1.4, not 1.6. Corrected against the dispatch sheet.",
    ],
    dataState:
      "A signed, countersigned record with the Amend dialog open and a plausible reason typed in the Why box.",
    crop: '[data-doc-shot="amend-record-dialog"]',
  },
  {
    id: "add-credit-dialog",
    screen: "Add credit dialog",
    route: "/training?tab=students",
    alt: "Add credit dialog",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'nav[aria-label="Enrollment"] button:has-text("Requirements")',
      'button:has-text("Add credit")',
      // Pick a requirement, so the dialog is not photographed on its placeholder. The
      // options render in a portal outside the crop; what lands in the picture is the
      // chosen label back on the trigger.
      '[data-doc-shot="add-credit-dialog"] [role="combobox"]',
      '[role="option"]:has-text("Night flight training")',
      // Addressed by an attribute that is merely PRESENT, because a fill step splits on
      // its first "=" and any [attr="value"] selector would be cut in half by its own
      // quotes. Hours is the only number input on screen, the date the only one with a
      // max. The date is deliberately old: prior training is the case this dialog is for.
      "fill:input[step]=18.4",
      "fill:input[max]=2024-06-14",
    ],
    dataState:
      "Dialog open with a requirement chosen, Previous training (Part 61) selected, hours entered, a date from a previous year in When it was flown, and a note.",
    crop: '[data-doc-shot="add-credit-dialog"]',
  },
  {
    id: "closeout-training-section",
    screen: "Close-out sheet, Training record section",
    route: "/schedule?reservation={trainingReservationId}",
    alt: "Close-out sheet, Training record section",
    dataState:
      "A completed dual booking with an enrolled student, Hobbs out and in plus briefing time entered, and the Training record block expanded so the lesson dropdown (with completed lessons prefixed by a tick), the grade and the prefilled Flight and Ground fields all show. The block starts collapsed behind a Grade this lesson button, so the step has to open it.",
    crop: '[data-doc-shot="closeout-training-section"]',
    //Two clicks now: the whole Training record block folds away behind a summary ("1 of 2
    //graded"), because a booking with two students on it opened a grading form per student
    //per course and buried the close-out itself.
    open: ['button:has-text("Grade the lesson")', 'button:has-text("Grade this lesson")'],
  },
  {
    id: "task-grades",
    screen: "Per-task ACS grades in the close-out grader",
    //The two-student booking, deliberately, and not {trainingReservationId}: the grader
    //that opens is the FIRST one on the sheet, and on that booking the first student's
    //first course is one whose next lesson carries no tasks, so the shot has nothing in it.
    //Here the first grader is a Part 141 flight lesson with four ACS tasks on it.
    route: "/schedule?reservation={splitReservationId}",
    alt: "Per-task ACS grades in the close-out grader",
    dataState:
      "A completed dual booking whose FIRST student's first course has a next lesson carrying ACS tasks, so each task shows its code and this course's marks as buttons and the header counts how many are marked. Nothing is marked: unmarked is the state the reader has to recognise.",
    crop: '[data-doc-shot="task-grades"]',
    open: ['button:has-text("Grade the lesson")', 'button:has-text("Grade this lesson")'],
  },
  {
    id: "booking-next-up-hint",
    screen: "Booking form, Next up hint",
    route: "/schedule",
    alt: "Booking form, Next up hint",
    dataState:
      "A new dual booking with an ENROLLED student picked in the Student field. The strip renders nothing at all for a student on no course, which is most of them, so the roster's first student has to be one who is enrolled.",
    crop: '[data-doc-shot="booking-next-up-hint"]',
    open: [
      'button:has-text("New reservation")',
      'button:has-text("Assign student")',
      '[role="option"]:has-text("{enrolledStudentName}")',
    ],
  },
  {
    id: "graduate-dialog",
    screen: "Graduate dialog",
    route: "/training?tab=students",
    alt: "Graduate dialog",
    // A different student from the other enrollment shots: this is the one whose every
    // requirement is met and whose record is certified, so the button is not disabled.
    open: [
      'a:has-text("Alex Active"):has-text("Part 141")',
      'button:has-text("Graduate")',
    ],
    dataState:
      "A Part 141 enrollment with every FAA-sourced requirement met and the record already certified, so the certificate number field shows and the button is enabled.",
    crop: '[data-doc-shot="graduate-dialog"]',
  },
  {
    id: "endorsements-card-sign",
    screen: "Sign an endorsement dialog",
    // The same card sits on the person page and on the training record, and only the
    // second one can be reached without an id, so the dialog is opened from there.
    route: "/training?tab=students",
    alt: "Sign an endorsement dialog",
    open: [
      'a:has-text("Test Student"):has-text("Part 141")',
      'button:has-text("Sign one")',
      'button:has-text("Solo flight (first 90-day period)")',
    ],
    dataState:
      "Template picker open on the Solo group, a template chosen so the body renders with the student's name filled in, two braces still unfilled and the blanks counter visible, certificate number empty.",
    crop: '[data-doc-shot="endorsements-card-sign"]',
  },
  {
    id: "person-training-card",
    screen: "Person detail, Training section",
    // By name off the roster, not by id: the subject is a student, and
    // `{personId}` resolves to whichever org user the API returns first.
    route: "/people",
    alt: "Person detail, Training section",
    dataState:
      "A student with one in-training and one graduated enrollment, plus two endorsements on the Endorsements card, one of them expiring inside 30 days.",
    crop: '[data-doc-shot="person-training-card"]',
    open: ['a:has-text("Test Student")', 'nav[aria-label="Member"] button:has-text("Training")'],
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
    // Reports is one route with a rail, keyed by `?report=`, the way Settings is
    // keyed by `?tab=`. The values are the server's report ids, plus "overview"
    // and "scheduled" for the two panes that are not reports.
    route: "/reports?report=training-progress",
    alt: "Reports, Student progress",
    dataState:
      "Six or more enrollments across two courses with varied lesson counts, shortfalls and days since flown. Range widened past the default year to date so an enrollment from last year is included. Sorted by Requirements short.",
    crop: '[data-doc-shot="report-student-progress"]',
  },
  {
    id: "report-training-records",
    screen: "Reports, Training records",
    route: "/reports?report=training-records",
    alt: "Reports, Training records",
    dataState:
      "Twenty or more graded lessons for one student over a 90 day window, including one Superseded and Correction pair, one row reading Awaiting student and one reading Not signed.",
    crop: '[data-doc-shot="report-training-records"]',
  },
  {
    id: "report-endorsement-expirations",
    screen: "Reports, Endorsement expirations",
    route: "/reports?report=endorsements",
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
    // One crop id for all three rail shots. It is the same rail in each: what
    // differs is who is signed in, which is DOCS_EMAIL, not a selector.
    crop: '[data-doc-shot="reports-rail"]',
  },
  {
    id: "reports-overview-board",
    screen: "Reports, Overview dashboard",
    route: "/reports?report=overview",
    alt: "Reports, Overview dashboard",
    dataState:
      "The default layout on Last 30 days with real figures in all eight number cards and both line charts. Needs a month of invoices and closed-out flights so no tile reads zero or blank.",
    crop: '[data-doc-shot="reports-overview-board"]',
  },
  {
    id: "reports-overview-attention",
    screen: "Reports, Overview, Needs attention card",
    route: "/reports?report=overview",
    alt: "Reports, Overview, Needs attention card",
    dataState:
      "At least five non-zero items and one Clear line. Requires an overdue invoice, a closed-out flight that was never invoiced, a booking awaiting close-out, an open squawk, and a document expiring inside 30 days.",
    crop: '[data-doc-shot="reports-overview-attention"]',
  },
  {
    id: "report-shell-revenue",
    screen: "Reports, Revenue report",
    route: "/reports?report=revenue",
    alt: "Reports, Revenue report",
    dataState:
      "Revenue selected, ungrouped, Last 30 days, two filter chips applied. Needs about 20 invoices across several aircraft so the table has rows on more than one page and the Totals row is meaningful.",
    crop: '[data-doc-shot="report-shell-revenue"]',
  },
  {
    id: "report-toolbar-export",
    screen: "Reports, report toolbar",
    route: "/reports?report=revenue",
    alt: "Reports, report toolbar",
    dataState:
      "Any report with rows and filters applied, cropped to the toolbar, the chips, and an enabled Export button.",
    crop: '[data-doc-shot="report-toolbar-export"]',
  },
  {
    id: "report-filters-menu",
    screen: "Reports, Filters menu",
    route: "/reports?report=revenue",
    alt: "Reports, Filters menu",
    dataState:
      "The Filters menu open on a report with several filterable fields, showing Group by and Columns at the top and one field submenu expanded with its Condition list.",
    // `text=` and unquoted attribute selectors only. `:has-text("x")` needs its
    // quotes, and a quote inside one of these strings is where the manifest
    // reader in scripts/capture-docs-screenshots.mjs stops reading the value.
    open: ["text=Filters"],
    crop: '[data-doc-shot="report-filters-menu"]',
  },
  {
    id: "report-columns-submenu",
    screen: "Reports, Columns submenu",
    route: "/reports?report=revenue",
    alt: "Reports, Columns submenu",
    dataState:
      "A report with 19 available columns and 7 ticked, so the counter reads 7 of 19, with the search box and Reset columns visible.",
    open: ["text=Filters", "[role=menuitem] >> text=Columns"],
    crop: '[data-doc-shot="report-columns-submenu"]',
  },
  {
    id: "report-grouped-utilization",
    screen: "Reports, Utilization grouped by Resource",
    route: "/reports?report=utilization",
    alt: "Reports, Utilization grouped by Resource",
    dataState:
      "At least five aircraft with flights in the window and clearly different totals, so the Share of bars vary and the records count under each group label is greater than one.",
    // Grouping is a menu choice rather than part of the report, so the shot has
    // to make it: Filters, then Group by, then Resource.
    open: [
      "text=Filters",
      "[role=menuitem] >> text=Group by",
      // Scoped to the radio row: the report's own Resource column header is on
      // the page too, and clicking that would sort the table instead.
      "[role=menuitemradio] >> text=Resource",
    ],
    crop: '[data-doc-shot="report-grouped-utilization"]',
  },
  {
    id: "report-saved-views",
    screen: "Reports, Saved views popover",
    route: "/reports?report=revenue",
    alt: "Reports, Saved views popover",
    dataState:
      "Four saved views on one report, at least one shared and one private, so both the trash icon and its absence are visible alongside the clock and pin icons.",
    open: ["text=Saved views"],
    crop: '[data-doc-shot="report-saved-views"]',
  },
  {
    id: "report-save-as-dialog",
    screen: "Reports, Save as dialog",
    route: "/reports?report=revenue",
    alt: "Reports, Save as dialog",
    dataState:
      "The dialog open with a name typed and the Share with the school switch visible.",
    open: ["text=Save as"],
    crop: '[data-doc-shot="report-save-as-dialog"]',
  },
  {
    id: "report-schedule-dialog",
    screen: "Reports, Schedule this report dialog",
    route: "/reports?report=revenue",
    alt: "Reports, Schedule this report dialog",
    dataState:
      "Set to Every week, Monday, 7am, with the grey cadence box showing what the window covers and at least four members with email addresses listed under Send to. Captured as an owner so the outside addresses field renders. Needs a saved view on Revenue, since the clock icon that opens this dialog lives on a saved view's row.",
    // The clock icon on a saved view's row. Anchored to the start of the label
    // on purpose: a view that already goes out on a cadence reads "Edit the
    // schedule for ..."and opens the same dialog in its editing state, which
    // is a different picture from the one this article wants.
    open: [
      "text=Saved views",
      '[data-doc-shot="report-saved-views"] button[aria-label^="Schedule"]',
    ],
    crop: '[data-doc-shot="report-schedule-dialog"]',
  },
  {
    id: "reports-schedules-page",
    screen: "Reports, Scheduled reports",
    route: "/reports?report=scheduled",
    alt: "Reports, Scheduled reports",
    dataState:
      "Three schedule cards: one healthy with a last sent date, one carrying a Paused chip, and one showing the red last send failed line with a reason.",
    crop: '[data-doc-shot="reports-schedules-page"]',
  },
  {
    id: "schedule-card-failed",
    screen: "Reports, Scheduled reports card with the row menu open",
    route: "/reports?report=scheduled",
    alt: "Reports, Scheduled reports card with the row menu open",
    dataState:
      "A schedule whose last send failed, with the three dot menu open on Edit, Send now, and Stop sending.",
    crop: '[data-doc-shot="schedule-card-failed"]',
  },
  {
    id: "dashboard-edit-mode",
    screen: "Reports, Overview in edit mode",
    route: "/reports?report=overview",
    alt: "Reports, Overview in edit mode",
    dataState:
      "Customise pressed, grip handles and resize corners visible on the tiles, and the Add tile, Reset, Cancel, and Done buttons in the header.",
    // Without this the crop is the ordinary board, which is a different picture
    // that happens to share an element.
    open: ["text=Customise"],
    crop: '[data-doc-shot="dashboard-edit-mode"]',
  },
  {
    id: "dashboard-tile-builder",
    screen: "Reports, Add tile dialog",
    route: "/reports?report=overview",
    alt: "Reports, Add tile dialog",
    dataState:
      "A report chosen that offers no dimension, so Line and Bar are greyed out with the reason shown, alongside the metric checkboxes and the Date range and Compare to fields.",
    open: ["text=Customise", "text=Add tile"],
    crop: '[data-doc-shot="dashboard-tile-builder"]',
  },
  {
    id: "dashboard-pin-view",
    screen: "Reports, Pin to dashboard dialog",
    route: "/reports?report=revenue",
    alt: "Reports, Pin to dashboard dialog",
    dataState:
      "Opened from the pin icon on a saved view, showing the locked report field, the carried-over title, and the note that the tile is a copy. Needs a saved view on Revenue for the pin icon to sit on.",
    open: ["text=Saved views", "[data-doc-shot=report-saved-views] button[aria-label^=Pin]"],
    crop: '[data-doc-shot="dashboard-pin-view"]',
  },
  {
    id: "reports-rail-dispatcher",
    screen: "Reports, left rail as a dispatcher",
    route: "/reports",
    alt: "Reports, left rail as a dispatcher",
    dataState:
      "Signed in as a dispatcher with no admin role, so Operations, Fleet, People, and Compliance appear and Financial is absent entirely.",
    crop: '[data-doc-shot="reports-rail"]',
  },
  {
    id: "reports-rail-technician",
    screen: "Reports, left rail as a technician",
    route: "/reports",
    alt: "Reports, left rail as a technician",
    dataState:
      "Signed in as a technician with no other role, so only the Fleet heading and its three reports appear.",
    crop: '[data-doc-shot="reports-rail"]',
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
    crop: '[data-doc-shot="audit-logs-table"]',
  },
  {
    id: "audit-detail-panel",
    screen: "Audit Logs, event detail panel",
    route: "/audit-logs",
    alt: "Audit Logs, event detail panel",
    dataState:
      "Open on a meter correction so the What changed boxes show hobbs values converted to hours, along with the When, Who, About, Aircraft, Via, and Record rows.",
    crop: '[data-doc-shot="audit-detail-panel"]',
    // The panel is opened by clicking a row, and the row it has to be is a meter
    // correction, which is one entry among hundreds in a thirty-day window. So the
    // page size goes to its largest first: `?event=` only resolves against the rows
    // currently on screen (deliberately, see audit-logs.tsx), so a correction sitting
    // on page three opens nothing at all rather than opening late.
    open: [
      '[aria-label="Rows per page"]',
      '[role="option"]:has-text("250")',
      '[data-doc-shot="audit-logs-table"] tr:has-text("Meters corrected")',
    ],
  },
  {
    id: "person-activity-tab",
    screen: "Member record, Activity tab",
    // By name off the roster, not by id: the subject is the student who has the
    // flights, and `{personId}` resolves to whichever org user comes back first.
    route: "/people",
    alt: "Member record, Activity tab",
    dataState:
      "A student with at least 15 closed-out flights spread over 90 days, so the tiles are non-zero and the Flying activity bar chart has visible gaps.",
    crop: '[data-doc-shot="person-activity-tab"]',
    open: ['a:has-text("Test Student")', 'nav[aria-label="Member"] button:has-text("Activity")'],
  },
  {
    id: "aircraft-utilization-tab",
    screen: "Aircraft record, Utilization tab",
    route: "/aircraft/{aircraftId}?tab=metrics",
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
    // Settings is one route keyed by `?tab=`, not a path segment: `/settings/organization`
    // is a 404. The tab values live in the console's lib/settings-sections.ts.
    route: "/settings?tab=organization",
    alt: "Settings, Organization",
    dataState:
      "Cropped to the time zone field with a zone selected.",
    crop: '[data-doc-shot="settings-org-timezone"]',
  },
  {
    id: "revenue-vs-payments",
    screen: "Revenue and Payments received over the same window",
    // The Payments half of the pair. Its twin is `report-shell-revenue`.
    route: "/reports?report=payments",
    alt: "Revenue and Payments received over the same window",
    dataState:
      "Two crops of the same window showing different totals and their two different date basis captions. Requires at least one invoice raised in one month and paid in the next.",
    // The Payments frame carries this id of its own. Cropping to the revenue
    // one would look right and quietly photograph nothing on this route.
    crop: '[data-doc-shot="revenue-vs-payments"]',
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
