import { src } from "../sources.mjs";

const EXEMPT = "https://webserver.rilegislature.gov/Statutes/TITLE44/44-18/44-18-30.htm";
const SALES = "https://webserver.rilegislature.gov/Statutes/TITLE44/44-18/44-18-7.htm";
const REG = "https://webserver.rilegislature.gov/Statutes/TITLE1/1-4/1-4-6.htm";
const GL = "Rhode Island General Laws";
const AIRCRAFT_EXEMPT =
  "Notwithstanding the provisions of this chapter, the tax imposed by §§ 44-18-18 and 44-18-20 shall not apply with respect to the sale and to the storage, use, or other consumption in this state of any new or used aircraft or aircraft parts.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "rhode-island",
  name: "Rhode Island",
  code: "RI",
  summary:
    "Rhode Island exempts new and used aircraft and aircraft parts from sales and use tax. Aircraft based in the state register each year with the Rhode Island Airport Corporation for a fee set by weight, which replaces personal property tax.",
  facts: {
    buying: {
      status: "exempt",
      answer: "No sales tax applies to the sale of any new or used aircraft or aircraft parts in Rhode Island.",
      sources: [src(GL, "R.I. Gen. Laws 44-18-30(56)", EXEMPT, AIRCRAFT_EXEMPT)],
    },
    bringingIn: {
      status: "exempt",
      answer: "No use tax applies to the storage, use or other consumption in Rhode Island of an aircraft bought elsewhere.",
      sources: [src(GL, "R.I. Gen. Laws 44-18-30(56)", EXEMPT, AIRCRAFT_EXEMPT)],
    },
    exemptions: {
      status: "exempt",
      answer:
        "The aircraft exemption covers every new or used aircraft and its parts, with no residency, weight or use conditions in the statute, so owners do not need fly-away or carrier exemptions.",
      sources: [src(GL, "R.I. Gen. Laws 44-18-30(56)", EXEMPT, AIRCRAFT_EXEMPT)],
      caveat: "The legislature's page lists amendment history only through P.L. 2022, ch. 231 (effective October 1, 2022); later session laws not checked against it.",
    },
    rental: {
      status: "exempt",
      answer:
        "Rhode Island defines a sale to include a lease or rental of tangible personal property, and the aircraft exemption covers the sale of any aircraft, so read together the two statutes exempt aircraft rentals. The Division of Taxation has published no guidance on aircraft rentals in particular.",
      sources: [
        src(GL, "R.I. Gen. Laws 44-18-7(1)", SALES,
          "Any transfer of title or possession, exchange, barter, lease, or rental, conditional or otherwise, in any manner or by any means of tangible personal property for a consideration."),
        src(GL, "R.I. Gen. Laws 44-18-30(56)", EXEMPT, AIRCRAFT_EXEMPT),
      ],
      caveat: "Reading of two statutes together; no Division of Taxation guidance on aircraft rentals found. Reviewer should decide whether this is clear enough for 'exempt'.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Aircraft a school buys are exempt like any aircraft. The Division of Taxation does not publish guidance on whether a charge for flight instruction is taxed.",
      sources: [src(GL, "R.I. Gen. Laws 44-18-30(56)", EXEMPT, AIRCRAFT_EXEMPT)],
      caveat: "Flight instruction is not in the taxable sales list in 44-18-7, but no primary source says so for flight lessons.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Aircraft parts are exempt. Repair labor in Rhode Island is not taxed when it is stated separately from parts.",
      sources: [
        src(GL, "R.I. Gen. Laws 44-18-30(56)", EXEMPT, AIRCRAFT_EXEMPT),
        src("Rhode Island Division of Taxation", "280-RICR-20-70-24.7(A)(1), Repairers and Reconditioners, effective 01/04/2022", "https://rules.sos.ri.gov/regulations/part/280-20-70-24",
          "In such event that labor or service charges are separately stated, such charges are not subject to the imposition of the sales/use tax."),
      ],
      caveat: "The repair rule is general, not aircraft-specific; with parts exempt, an unitemized aircraft repair bill should also be untaxed, but no source says so.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based or primarily used in Rhode Island register each year with the Rhode Island Airport Corporation: $30 under 2,000 pounds, $60 to 3,000, $110 to 4,500, $160 to 12,500 and $250 over 12,500 pounds gross weight. Registrations after the first 6 months are half price, and the fee replaces personal property tax. Nonresidents may fly noncommercially without registering for up to 90 days a calendar year.",
      sources: [
        src(GL, "R.I. Gen. Laws 1-4-6(b)", REG,
          "Aircraft weighing less than two thousand (2,000) pounds, thirty dollars ($30.00); two thousand and one (2,001) to three thousand (3,000) pounds, sixty dollars ($60.00); three thousand and one (3,001) to four thousand five hundred (4,500) pounds, one hundred ten dollars ($110); four thousand five hundred and one (4,501) to twelve thousand five hundred (12,500) pounds, one hundred sixty dollars ($160); over twelve thousand five hundred pounds (12,500), two hundred fifty dollars ($250)."),
        src(GL, "R.I. Gen. Laws 1-4-6(c)", REG,
          "All fees are in lieu of all personal property taxes on aircraft authorized by any law or ordinance. Registration certificates issued after expiration of the first six (6) months of the annual registration period, as prescribed by the president and CEO, are issued at the rate of fifty percent (50%) of the annual fee."),
        src(GL, "R.I. Gen. Laws 1-4-6(a)", REG,
          "Nonresidents may operate noncommercially within this state as an owner and operator, or owner or operator, or as a dealer, without that registration for not more than ninety (90) days in any calendar year."),
      ],
      caveat: "RIAC's registration form (instructions dated 06-30-20) sets a June 30 renewal; not used as a source because it is over a year old.",
    },
  },
};
