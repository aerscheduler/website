import { src } from "../sources.mjs";

const PUB = "Colorado Department of Revenue";
const AIRCRAFT = "https://tax.colorado.gov/sites/default/files/documents/SUTT_Aircraft_Jul_2026.pdf";
const AIRCRAFT_TITLE = "Sales & Use Tax Topics: Aircraft";
const AIRCRAFT_DATED = { dated: "Revised July 2026" };
const GUIDE = "https://tax.colorado.gov/sites/default/files/documents/Sales_Tax_Guide_May_2026.pdf";
const GUIDE_TITLE = "Colorado Sales Tax Guide";
const GUIDE_DATED = { dated: "Revised May 2026" };
const HOME_RULE = src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
  "The information in this publication does not apply to sales and use taxes administered directly by home-rule cities.", AIRCRAFT_DATED);

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "colorado",
  name: "Colorado",
  code: "CO",
  summary:
    "Colorado charges 2.9 percent state sales or use tax on aircraft plus local tax, with a nonresident exemption if the aircraft leaves within 120 days. Permanently installed aircraft parts are exempt, and personal aircraft pay a fuel excise tax instead of yearly property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "2.9 percent state sales tax, plus state-administered local sales taxes for the location. Home-rule cities collect their own sales tax under their own rules.",
      sources: [
        src(PUB, `${GUIDE_TITLE}, Part 3`, GUIDE, "Colorado state sales tax is imposed at a rate of 2.9%.", GUIDE_DATED),
        src(PUB, `${GUIDE_TITLE}, Part 3`, GUIDE, "Any sale made in Colorado may also be subject to state-administered local sales taxes.", GUIDE_DATED),
        HOME_RULE,
      ],
      caveat: "No source was found on how a private sale between individuals is treated; the answer does not address it.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An owner who relocates an aircraft into Colorado generally owes Colorado consumer use tax on it. Sales or use tax legally imposed and paid in another state is credited; tax paid to a foreign country is not.",
      sources: [
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "If an aircraft owner relocates an aircraft into Colorado, the aircraft owner generally must pay Colorado consumer use tax on the aircraft.", AIRCRAFT_DATED),
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "The owner is allowed a credit for any legally imposed sales or use taxes the purchaser paid in another state for the aircraft.", AIRCRAFT_DATED),
      ],
      caveat: "The publication gives no day-count or time-since-purchase test for when a relocated aircraft owes use tax.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "A sale to a nonresident is exempt if the aircraft leaves Colorado within 120 days of the sale, or 30 days after work done as part of the sale, whichever is later, and is not hangared or parked overnight in Colorado more than 73 days in any of the next three calendar years. The buyer signs an affidavit. Aircraft bought by a scheduled commercial airline for interstate use are exempt; on-demand operators do not qualify.",
      sources: [
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "To qualify for the exemption, the aircraft must be sold to a nonresident and removed from the state within the longer of the following: 120 days after the date of the sale; or 30 days after the completion of maintenance, interior refurbishment, paint, or engine work associated with the sale of the aircraft.",
          AIRCRAFT_DATED),
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "The aircraft cannot be hangared or parked overnight in Colorado for more than 73 days in any of the three calendar years following the calendar year in which the aircraft is removed from Colorado.",
          AIRCRAFT_DATED),
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "Aircraft purchased for use in interstate commerce by a commercial airline are exempt from sales and use tax.", AIRCRAFT_DATED),
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "On-demand operators do not qualify as commercial airlines for the purpose of the exemption because their flights are not regularly scheduled.", AIRCRAFT_DATED),
      ],
    },
    rental: {
      status: "conditional",
      answer:
        "Aircraft leases and rentals are generally retail sales subject to sales tax. A lease of 36 months or less is exempt if the owner already paid Colorado sales or use tax on the aircraft; an owner that bought the aircraft tax-free for leasing collects tax on every payment instead.",
      sources: [
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "In general, aircraft leases are considered retail sales and are subject to Colorado and state-administered sales and use taxes.", AIRCRAFT_DATED),
        src(PUB, `${GUIDE_TITLE}, Part 1`, GUIDE,
          "However, a lease for a term of 36 months or less (a “short-term lease”) is tax-exempt if the lessor has paid Colorado sales or use tax on the acquisition of the leased property.", GUIDE_DATED),
        src(PUB, `${GUIDE_TITLE}, Part 1`, GUIDE,
          "A lessor may submit a completed Lessor Registration for Sales Tax Collection (DR 0440) to the Department to request permission to acquire tangible personal property tax-free for short-term lease on the condition that the lessor agrees to collect sales tax on all lease payments received on the property.", GUIDE_DATED),
      ],
      caveat: "Whether an hourly rental with a pilot (wet) is a lease or a service is not addressed in either publication.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Colorado generally does not tax services, but the Department's aircraft and sales tax publications do not address flight instruction or the aircraft rental inside a lesson. How a lesson that includes aircraft time is treated is not published.",
      sources: [
        src(PUB, `${GUIDE_TITLE}, Part 2`, GUIDE, "Sales of services are generally not subject to Colorado sales tax.", GUIDE_DATED),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts permanently installed as a component of an aircraft, such as fuselage and engine parts, are generally exempt. Colorado generally does not tax services, so repair labor that is separate from a sale of taxable goods is not taxed. Home-rule cities set their own rules.",
      sources: [
        src(PUB, AIRCRAFT_TITLE, AIRCRAFT,
          "In general, the sale of tangible personal property that is to be permanently affixed or attached as a component part of an aircraft is exempt from sales and use taxes.", AIRCRAFT_DATED),
        src(PUB, `${GUIDE_TITLE}, Part 2`, GUIDE, "Sales of services are generally not subject to Colorado sales tax.", GUIDE_DATED),
        HOME_RULE,
      ],
      caveat:
        "The Sales Tax Guide includes labor in the taxable price when it is part of a sale of taxable property; the answer assumes repair labor on exempt parts is not swept in. Not confirmed by an aircraft-specific source.",
    },
    annual: {
      status: "none",
      answer:
        "No yearly aircraft property tax for personal aircraft: they pay a fuel excise tax instead. Some commercial aircraft also pay the fuel tax instead, while airline companies are assessed by the state as public utilities. No state aircraft registration fee was found.",
      sources: [
        src("Colorado Division of Property Taxation", "FAQs: Do I have to pay personal property taxes on my vehicle or aircraft?", "https://dpt.colorado.gov/faqs",
          "Personal aircraft pay a fuel excise tax in lieu of personal property taxes pursuant to § 43-10-111, C.R.S."),
        src("Colorado Division of Property Taxation", "FAQs: Do I have to pay personal property taxes on my vehicle or aircraft?", "https://dpt.colorado.gov/faqs",
          "Some commercial aircraft also pay the fuel excise tax in lieu of personal property taxes."),
      ],
      caveat: "\"No state aircraft registration fee\" was not confirmed against a Colorado Division of Aeronautics source.",
    },
  },
};
