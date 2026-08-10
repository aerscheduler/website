/**
 * The reporting catalogue, as the marketing site describes it.
 *
 * Stated once because four pages reference it: the feature page, the pillar
 * guide, and two topic guides: and a list of reports that disagrees with
 * itself across the site is the kind of thing prospects notice and trust less.
 *
 * Keep this honest against the real registry in
 * `server/src/reports/registry/`. If a report is added or renamed there, it
 * changes here. **Nothing in this file may describe something that has not
 * shipped**: anything on the roadmap belongs in `REPORTING_ROADMAP` below,
 * which every surface renders with a "coming soon" label.
 */

export type ReportCategory = {
  key: string;
  label: string;
  blurb: string;
  reports: { name: string; description: string }[];
};

export const REPORT_CATEGORIES: ReportCategory[] = [
  {
    key: "financial",
    label: "Financial",
    blurb:
      "What the school billed, what it actually collected, and what is still owed.",
    reports: [
      {
        name: "Revenue",
        description:
          "Billed, collected, and outstanding, broken down by aircraft, instructor, customer, or lesson type.",
      },
      {
        name: "Payments received",
        description: "Every payment, by method and by customer, over any window.",
      },
      {
        name: "Items sold",
        description: "Which line items earn: instruction, rental, fuel, fees.",
      },
      {
        name: "Tax collected",
        description: "Tax by rate and by period, for filing season.",
      },
    ],
  },
  {
    key: "operations",
    label: "Operations",
    blurb: "What was booked, what actually flew, and what fell through.",
    reports: [
      {
        name: "Utilization",
        description:
          "Booked vs flown vs billed hours per aircraft, and the efficiency between them.",
      },
      {
        name: "Flight log",
        description: "Every flight with Hobbs, tach, and close-out status.",
      },
      {
        name: "Cancellations & no-shows",
        description:
          "What is being cancelled, by whom, and for which reason category.",
      },
    ],
  },
  {
    key: "fleet",
    label: "Fleet",
    blurb: "Which tails earn, which sit, and which are grounded.",
    reports: [
      {
        name: "Fleet",
        description: "Hours, revenue, and downtime for every aircraft and sim.",
      },
      {
        name: "Squawks & downtime",
        description: "Open and resolved squawks, with how long each grounded a tail.",
      },
      {
        name: "Maintenance due",
        description: "What is coming due by hours or by date, before it bites.",
      },
    ],
  },
  {
    key: "people",
    label: "People",
    blurb: "Who is teaching, who is flying, and who has gone quiet.",
    reports: [
      {
        name: "Instructor activity",
        description:
          "Flight and ground hours per CFI, students seen, and cancellation rate.",
      },
      {
        name: "Customer activity",
        description: "Spend and hours per student or renter, and when they last flew.",
      },
    ],
  },
  {
    key: "compliance",
    label: "Compliance",
    blurb: "Who is legal to fly today, and who is about to lapse.",
    reports: [
      {
        name: "Document expirations",
        description: "Medicals, insurance, and reviews already lapsed or due soon.",
      },
      {
        name: "Pilot currency",
        description: "Currency by type and by person, with what expires next.",
      },
    ],
  },
];

/**
 * There is deliberately no exported REPORT_COUNT.
 *
 * The copy used to advertise "14 reports". Two problems, and the maintenance
 * one was the lesser: a count invites a comparison on **list length**, which is
 * a contest against incumbents we have no reason to enter and every reason to
 * lose. And it undersells this: each report filters, groups, and saves, so the
 * number of questions a school can actually ask is open-ended, not fourteen.
 *
 * The pillar guide still shows breadth, but by rendering the catalogue below
 * rather than by asserting a number over it. The list is the evidence; a
 * numeral is just a claim, and one that dates.
 */

/** Spelled out for prose that reads badly with a numeral ("those five families"). */
export const CATEGORY_COUNT_WORD = ["zero", "one", "two", "three", "four", "five", "six", "seven"][
  REPORT_CATEGORIES.length
] ?? String(REPORT_CATEGORIES.length);

/**
 * On the roadmap, not shipped.
 *
 * Empty as of the scheduled-reports release: that was the only entry, and it
 * now ships, so it moved into the copy proper.
 *
 * The list stays here rather than being deleted: keeping roadmap items in their
 * own array is what stops one being written into the feature copy by accident.
 * Every surface renders these with an explicit "coming soon" label, and renders
 * nothing at all when the list is empty.
 */
export const REPORTING_ROADMAP: { name: string; description: string }[] = [];
