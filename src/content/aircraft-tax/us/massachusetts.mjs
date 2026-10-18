import { src } from "../sources.mjs";

const C64H6 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section6";
const C64H1 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter64H/Section1";
const TIR = "https://www.mass.gov/technical-information-release/tir-02-2-sales-and-use-tax-exemptions-for-aircraft-and-replacement-parts";
const REG = "https://www.mass.gov/how-to/how-to-register-an-aircraft";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "massachusetts",
  name: "Massachusetts",
  code: "MA",
  summary:
    "Massachusetts exempts aircraft and aircraft repair and replacement parts from sales and use tax, and does not tax services such as flight instruction or repair labor. Aircraft based in Massachusetts register with MassDOT's Aeronautics Division, $100 to $300 by weight.",
  facts: {
    buying: {
      status: "exempt",
      answer: "Sales of aircraft are exempt from the Massachusetts sales tax, with no paperwork required. The Department reads \"aircraft\" to include airplanes, helicopters and gliders.",
      sources: [
        src("Massachusetts General Laws", "c. 64H, §6(vv)", C64H6, "(vv) Sales of aircraft."),
        src("Massachusetts Department of Revenue", "TIR 02-2, Sales and Use Tax Exemptions for Aircraft and Replacement Parts", TIR,
          "No documentation is required to receive the benefit of these exemptions.", { dated: "01/24/2002" }),
      ],
    },
    bringingIn: {
      status: "exempt",
      answer: "Storage and use of an aircraft in Massachusetts is exempt from use tax, so an aircraft bought elsewhere owes no Massachusetts use tax.",
      sources: [
        src("Massachusetts Department of Revenue", "TIR 02-2, Sales and Use Tax Exemptions for Aircraft and Replacement Parts", TIR,
          "(e) Storage, use or other consumption of aircraft.", { dated: "01/24/2002" }),
      ],
    },
    exemptions: {
      status: "exempt",
      answer:
        "Every aircraft sale and use is exempt, so fly-away, carrier and rental-fleet exemptions are not needed. Repair and replacement parts used exclusively in aircraft are exempt too.",
      sources: [
        src("Massachusetts General Laws", "c. 64H, §6(vv)", C64H6, "(vv) Sales of aircraft."),
        src("Massachusetts General Laws", "c. 64H, §6(uu)", C64H6,
          "(uu) Sales of repair or replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components on a factory basis."),
      ],
    },
    rental: {
      status: "exempt",
      answer: "Massachusetts law counts a rental as a sale, and sales of aircraft are exempt, so aircraft rentals carry no sales tax.",
      sources: [
        src("Massachusetts General Laws", "c. 64H, §1, definition of \"Sale\"", C64H1,
          "''Sale'' and ''selling'', include (i) any transfer of title or possession, or both, exchange, barter, lease, rental, conditional or otherwise, of tangible personal property or the performance of services for a consideration, in any manner or by any means whatsoever"),
        src("Massachusetts General Laws", "c. 64H, §6(vv)", C64H6, "(vv) Sales of aircraft."),
      ],
      caveat: "This reads the statutory definition of sale together with §6(vv); we found no DOR statement that addresses aircraft rentals specifically.",
    },
    instruction: {
      status: "exempt",
      answer: "Flight instruction is a service, and Massachusetts taxes only telecommunications services. The aircraft time inside a lesson and the school's aircraft purchase fall under the aircraft exemption.",
      sources: [
        src("Massachusetts General Laws", "c. 64H, §1, definition of \"Services\"", C64H1,
          "and provided further, that the term services shall be limited to telecommunications services"),
        src("Massachusetts General Laws", "c. 64H, §6(vv)", C64H6, "(vv) Sales of aircraft."),
      ],
    },
    maintenance: {
      status: "exempt",
      answer: "Repair and replacement parts used exclusively in aircraft are exempt. Repair labor is a service, which Massachusetts does not tax.",
      sources: [
        src("Massachusetts General Laws", "c. 64H, §6(uu)", C64H6,
          "(uu) Sales of repair or replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components on a factory basis."),
        src("Massachusetts General Laws", "c. 64H, §1, definition of \"Services\"", C64H1,
          "and provided further, that the term services shall be limited to telecommunications services"),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based in Massachusetts register with MassDOT's Aeronautics Division. The fee runs by maximum takeoff weight: $100 up to 2,000 pounds, $165 to 3,500, $230 to 12,500 and $300 above, halved for aircraft acquired on or after July 1.",
      sources: [
        src("MassDOT Aeronautics Division", "How to register an aircraft, schedule of fees", REG, "0-2,000 | $100.00 | $50.00"),
        src("MassDOT Aeronautics Division", "How to register an aircraft, schedule of fees", REG, "2,001-3,500 | $165.00 | $82.50"),
        src("MassDOT Aeronautics Division", "How to register an aircraft, schedule of fees", REG, "3,501-12,500 | $230.00 | $115.00"),
        src("MassDOT Aeronautics Division", "How to register an aircraft, schedule of fees", REG, "Over 12,501 | $300.00 | $150.00"),
        src("MassDOT Aeronautics Division", "How to register an aircraft, schedule of fees", REG, "Registration Fee Aircraft Acquired On or after July 1"),
      ],
      caveat:
        "The basing thresholds (reportedly 60 and 180 days in 702 CMR 3.02) and the renewal period could not be read: the 702 CMR 3.00 PDF on mass.gov refuses scripted downloads. Whether towns tax aircraft as personal property was not researched.",
    },
  },
};
