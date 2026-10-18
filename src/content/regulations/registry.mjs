/**
 * The plain-English regulations library (`/regulations`): which sections of
 * 14 CFR it covers, how they are grouped, and what each page is called.
 *
 * Plain ESM rather than TypeScript because three plain-node scripts read it
 * (`sync-ecfr.mjs`, `check-regulations.mjs`, `build-search-index.mjs`) as well
 * as the pages, through `src/lib/regulations.ts`, which adds the types.
 *
 * WHAT GOES IN. The sections a new aircraft owner, a new flight school owner, a
 * mechanic, an instructor or a renter actually looks up, curated rather than the
 * whole of Parts 61 and 91. A section earns a page when people search for it by
 * number or by its topic and the answer changes what they do. Adding one is a
 * line here, a summary in `sections/<topic>.mjs`, and `node scripts/sync-ecfr.mjs
 * <cite>`; the sitemap, search, llms.txt and Markdown twin derive themselves.
 *
 * Grouped by TOPIC, the way people search ("required inspections"), not by
 * Part, the way the CFR is filed. Each Part still gets an index page.
 */

/** @typedef {{ slug: string, title: string, blurb: string, audience: string }} RegTopic */
/** @typedef {{ part: string, title: string, blurb: string }} RegPart */
/**
 * @typedef {{
 *   cite: string,
 *   slug: string,
 *   kind: "section" | "appendix",
 *   part: string,
 *   topic: string,
 *   name: string,
 *   ecfrId?: string,
 * }} RegEntry
 */

/** @type {RegTopic[]} */
export const TOPICS = [
  {
    slug: "owning-an-aircraft",
    title: "Owning an aircraft",
    audience: "New owners, clubs and leaseback owners",
    blurb: "Who is responsible for airworthiness, what has to be on board, and what you may fly with when something is broken.",
  },
  {
    slug: "inspections",
    title: "Required inspections",
    audience: "Owners, flight schools and mechanics",
    blurb: "The annual, the 100-hour, and the checks that come due on their own clocks: transponder, pitot-static, ELT and VOR.",
  },
  {
    slug: "maintenance-records",
    title: "Maintenance and records",
    audience: "Owners and mechanics",
    blurb: "Who may work on an aircraft, who may sign it off, what each logbook entry must say, and what an owner must keep.",
  },
  {
    slug: "airworthiness-directives",
    title: "Airworthiness Directives",
    audience: "Owners and mechanics",
    blurb: "What an AD is, what happens if you fly without complying, and the ways around one: an alternative method or a ferry permit.",
  },
  {
    slug: "pilots-and-renters",
    title: "Pilots and renters",
    audience: "Students, renters and club members",
    blurb: "Certificates to carry, how long a medical lasts, the flight review, currency, endorsements, and splitting the cost of a flight.",
  },
  {
    slug: "instructors-and-students",
    title: "Instructors and students",
    audience: "Flight instructors and chief instructors",
    blurb: "Solo and cross-country endorsements, the private pilot's hours, the records an instructor keeps, and renewing the certificate.",
  },
  {
    slug: "running-a-flight-school",
    title: "Running a flight school",
    audience: "New flight school and flight business owners",
    blurb: "What a Part 141 certificate takes, the people and records it requires, and the letter of authorization for sightseeing flights.",
  },
];

/** @type {RegPart[]} */
export const PARTS = [
  { part: "39", title: "Airworthiness Directives", blurb: "What an AD is, the legal effect of one, and how to comply another way." },
  { part: "43", title: "Maintenance, preventive maintenance, rebuilding, and alteration", blurb: "Who may perform and approve maintenance, and what the records must say." },
  { part: "47", title: "Aircraft registration", blurb: "Registering an aircraft and keeping the registration current." },
  { part: "61", title: "Certification: pilots, flight instructors, and ground instructors", blurb: "Pilot certificates, medicals, currency, endorsements and instructor rules." },
  { part: "91", title: "General operating and flight rules", blurb: "Operating rules, required equipment, and the owner's maintenance and inspection duties." },
  { part: "141", title: "Pilot schools", blurb: "Certificated pilot schools: the certificate, personnel, courses and records." },
];

/** @type {RegEntry[]} */
export const REGULATIONS = [
  // Owning an aircraft
  { cite: "91.403", slug: "91-403", kind: "section", part: "91", topic: "owning-an-aircraft", name: "The owner is responsible for airworthiness" },
  { cite: "91.405", slug: "91-405", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Maintenance the owner must have done" },
  { cite: "91.407", slug: "91-407", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Flying after maintenance or alteration" },
  { cite: "91.7", slug: "91-7", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Flying only an airworthy aircraft" },
  { cite: "91.9", slug: "91-9", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Flight manual, markings and placards" },
  { cite: "91.203", slug: "91-203", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Documents required on board" },
  { cite: "91.205", slug: "91-205", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Required instruments and equipment" },
  { cite: "91.213", slug: "91-213", kind: "section", part: "91", topic: "owning-an-aircraft", name: "Flying with inoperative equipment" },
  { cite: "47.40", slug: "47-40", kind: "section", part: "47", topic: "owning-an-aircraft", name: "Registration expiration and renewal" },

  // Required inspections
  { cite: "91.409", slug: "91-409", kind: "section", part: "91", topic: "inspections", name: "Annual and 100-hour inspections" },
  { cite: "91.411", slug: "91-411", kind: "section", part: "91", topic: "inspections", name: "Altimeter and pitot-static checks for IFR" },
  { cite: "91.413", slug: "91-413", kind: "section", part: "91", topic: "inspections", name: "Transponder tests and inspections" },
  { cite: "91.207", slug: "91-207", kind: "section", part: "91", topic: "inspections", name: "ELT inspection and battery replacement" },
  { cite: "91.171", slug: "91-171", kind: "section", part: "91", topic: "inspections", name: "VOR equipment check for IFR" },
  { cite: "91.225", slug: "91-225", kind: "section", part: "91", topic: "inspections", name: "ADS-B Out: where it is required" },
  {
    cite: "43-appendix-d",
    slug: "43-appendix-d",
    kind: "appendix",
    part: "43",
    ecfrId: "Appendix D to Part 43",
    topic: "inspections",
    name: "What an annual and 100-hour inspection must cover",
  },

  // Maintenance and records
  { cite: "91.417", slug: "91-417", kind: "section", part: "91", topic: "maintenance-records", name: "Maintenance records an owner must keep" },
  { cite: "91.419", slug: "91-419", kind: "section", part: "91", topic: "maintenance-records", name: "Maintenance records when an aircraft is sold" },
  { cite: "91.421", slug: "91-421", kind: "section", part: "91", topic: "maintenance-records", name: "Records for a rebuilt engine" },
  { cite: "43.3", slug: "43-3", kind: "section", part: "43", topic: "maintenance-records", name: "Who may perform maintenance" },
  { cite: "43.7", slug: "43-7", kind: "section", part: "43", topic: "maintenance-records", name: "Who may approve a return to service" },
  { cite: "43.9", slug: "43-9", kind: "section", part: "43", topic: "maintenance-records", name: "What a maintenance logbook entry must say" },
  { cite: "43.11", slug: "43-11", kind: "section", part: "43", topic: "maintenance-records", name: "What an inspection logbook entry must say" },
  {
    cite: "43-appendix-a",
    slug: "43-appendix-a",
    kind: "appendix",
    part: "43",
    ecfrId: "Appendix A to Part 43",
    topic: "maintenance-records",
    name: "Major repairs, major alterations and preventive maintenance",
  },

  // Airworthiness Directives
  { cite: "39.3", slug: "39-3", kind: "section", part: "39", topic: "airworthiness-directives", name: "What an Airworthiness Directive is" },
  { cite: "39.7", slug: "39-7", kind: "section", part: "39", topic: "airworthiness-directives", name: "Flying without complying with an AD" },
  { cite: "39.11", slug: "39-11", kind: "section", part: "39", topic: "airworthiness-directives", name: "What an AD can require" },
  { cite: "39.15", slug: "39-15", kind: "section", part: "39", topic: "airworthiness-directives", name: "ADs on a modified aircraft or part" },
  { cite: "39.19", slug: "39-19", kind: "section", part: "39", topic: "airworthiness-directives", name: "Alternative methods of compliance (AMOC)" },
  { cite: "39.23", slug: "39-23", kind: "section", part: "39", topic: "airworthiness-directives", name: "Ferrying an aircraft with an open AD" },

  // Pilots and renters
  { cite: "61.3", slug: "61-3", kind: "section", part: "61", topic: "pilots-and-renters", name: "Certificates a pilot must hold and carry" },
  { cite: "61.23", slug: "61-23", kind: "section", part: "61", topic: "pilots-and-renters", name: "How long a medical certificate lasts" },
  { cite: "91.17", slug: "91-17", kind: "section", part: "91", topic: "pilots-and-renters", name: "Alcohol and drugs: the eight-hour rule" },
  { cite: "61.31", slug: "61-31", kind: "section", part: "61", topic: "pilots-and-renters", name: "Complex, high-performance and tailwheel endorsements" },
  { cite: "61.51", slug: "61-51", kind: "section", part: "61", topic: "pilots-and-renters", name: "Pilot logbooks" },
  { cite: "61.56", slug: "61-56", kind: "section", part: "61", topic: "pilots-and-renters", name: "The flight review" },
  { cite: "61.57", slug: "61-57", kind: "section", part: "61", topic: "pilots-and-renters", name: "Currency: recent flight experience" },
  { cite: "61.113", slug: "61-113", kind: "section", part: "61", topic: "pilots-and-renters", name: "Private pilot privileges and sharing costs" },
  { cite: "91.3", slug: "91-3", kind: "section", part: "91", topic: "pilots-and-renters", name: "Pilot in command authority" },
  { cite: "91.103", slug: "91-103", kind: "section", part: "91", topic: "pilots-and-renters", name: "Preflight action" },
  { cite: "91.151", slug: "91-151", kind: "section", part: "91", topic: "pilots-and-renters", name: "VFR fuel requirements" },

  // Instructors and students
  { cite: "61.87", slug: "61-87", kind: "section", part: "61", topic: "instructors-and-students", name: "Student pilot solo requirements" },
  { cite: "61.93", slug: "61-93", kind: "section", part: "61", topic: "instructors-and-students", name: "Student solo cross-country flights" },
  { cite: "61.109", slug: "61-109", kind: "section", part: "61", topic: "instructors-and-students", name: "Private pilot flight experience" },
  { cite: "61.189", slug: "61-189", kind: "section", part: "61", topic: "instructors-and-students", name: "Records a flight instructor must keep" },
  { cite: "61.195", slug: "61-195", kind: "section", part: "61", topic: "instructors-and-students", name: "Flight instructor limitations" },
  { cite: "61.197", slug: "61-197", kind: "section", part: "61", topic: "instructors-and-students", name: "Renewing a flight instructor certificate" },

  // Running a flight school
  { cite: "141.5", slug: "141-5", kind: "section", part: "141", topic: "running-a-flight-school", name: "Getting a Part 141 pilot school certificate" },
  { cite: "141.33", slug: "141-33", kind: "section", part: "141", topic: "running-a-flight-school", name: "Personnel a Part 141 school must have" },
  { cite: "141.55", slug: "141-55", kind: "section", part: "141", topic: "running-a-flight-school", name: "What a Part 141 training course must contain" },
  { cite: "141.101", slug: "141-101", kind: "section", part: "141", topic: "running-a-flight-school", name: "Part 141 training records" },
  { cite: "91.147", slug: "91-147", kind: "section", part: "91", topic: "running-a-flight-school", name: "Sightseeing flights for compensation (LOA)" },
];
