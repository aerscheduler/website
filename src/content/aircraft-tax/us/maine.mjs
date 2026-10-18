import { src } from "../sources.mjs";

const S1760 = "https://legislature.maine.gov/statutes/36/title36sec1760.html";
const S1752 = "https://legislature.maine.gov/statutes/36/title36sec1752.html";
const S1482 = "https://legislature.maine.gov/statutes/36/title36sec1482.html";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "maine",
  name: "Maine",
  code: "ME",
  summary:
    "Maine exempts sales, use and leases of aircraft, and aircraft repair and replacement parts, from sales and use tax through June 30, 2033. Aircraft owned by Maine residents pay an annual excise tax to the town where they are based instead.",
  facts: {
    buying: {
      status: "exempt",
      answer: "Buying an aircraft in Maine is exempt from sales tax through June 30, 2033, under a temporary exemption that covers sales, use and leases of aircraft.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1760(88-A)", S1760,
          "Sales, use or leases of aircraft and sales of repair and replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components from July 1, 2011 to June 30, 2033."),
      ],
    },
    bringingIn: {
      status: "exempt",
      answer: "Using in Maine an aircraft bought elsewhere is exempt from use tax through June 30, 2033, under the same exemption.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1760(88-A)", S1760,
          "Sales, use or leases of aircraft and sales of repair and replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components from July 1, 2011 to June 30, 2033."),
      ],
    },
    exemptions: {
      status: "exempt",
      answer:
        "Through June 30, 2033 every aircraft sale, use and lease is exempt. A separate exemption with no end date covers sales and leases of aircraft over 6,000 pounds, turbine aircraft, and aircraft used by a Part 135 operator. If the temporary exemption lapses, a nonresident's aircraft is exempt from use tax if it is in Maine no more than 20 days in the 12 months after purchase, not counting days for major repairs or maintenance.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1760(88-A)", S1760,
          "Sales, use or leases of aircraft and sales of repair and replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components from July 1, 2011 to June 30, 2033."),
        src("Maine Revised Statutes", "36 M.R.S. §1760(88)", S1760,
          "Sales or leases of aircraft that weigh over 6,000 pounds, that are propelled by one or more turbine engines or that are in use by a Federal Aviation Administration classified 135 operator."),
        src("Maine Revised Statutes", "36 M.R.S. §1760(45)(A-3)", S1760,
          "If the property is an aircraft not exempted under subsection 88 or 88‑A and the owner at the time of purchase was a resident of another state or tax jurisdiction and the aircraft is present in this State not more than 20 days during the 12 months following its purchase, exclusive of days during which the aircraft is in this State for the purpose of undergoing \"major alterations,\" \"major repairs\" or \"preventive maintenance\" as those terms are described in 14 Code of Federal Regulations, Appendix A to Part 43, as in effect on January 1, 2005."),
      ],
    },
    rental: {
      status: "exempt",
      answer: "Maine treats rentals as sales, but the aircraft exemption covers leases of aircraft, so aircraft rentals are exempt through June 30, 2033.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1752(13)", S1752,
          "\"Sale\" means any transfer, exchange or barter, in any manner or by any means whatsoever, for a consideration and includes leases and rentals, conditional sale contracts and any contract under which possession of the property is given to the purchaser but title is retained by the seller as security for the payment of the purchase price, and leases and contracts that are determined by the assessor to be in lieu of purchase."),
        src("Maine Revised Statutes", "36 M.R.S. §1760(88-A)", S1760,
          "Sales, use or leases of aircraft and sales of repair and replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components from July 1, 2011 to June 30, 2033."),
      ],
      caveat: "No Maine source addresses hourly aircraft rentals specifically or wet versus bare rentals; the answer reads \"leases\" in 88-A together with \"leases and rentals\" in the definition of sale.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Maine taxes only listed services, and we found no Maine source that addresses flight instruction. A school's purchase of a training aircraft is exempt through June 30, 2033 under the general aircraft exemption.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1760(88-A)", S1760,
          "Sales, use or leases of aircraft and sales of repair and replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components from July 1, 2011 to June 30, 2033."),
      ],
      caveat: "36 M.R.S. §1752(17-B) defines \"taxable service\" as a list; flight instruction did not appear in the part we read, but we did not find a source that says instruction is untaxed.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Repair and replacement parts used exclusively in aircraft are exempt through June 30, 2033. Labor for repairing property is not part of the taxable price when it is charged separately.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1760(88-A)", S1760,
          "Sales, use or leases of aircraft and sales of repair and replacement parts exclusively for use in aircraft or in the significant overhauling or rebuilding of aircraft or aircraft parts or components from July 1, 2011 to June 30, 2033."),
        src("Maine Revised Statutes", "36 M.R.S. §1752(14)(B)(4)", S1752,
          "The price received for labor or services used in installing or applying or repairing the property sold or fabricated, if separately charged or stated"),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft owned or controlled by a Maine resident pay an annual excise tax, paid to the town where the aircraft is based: 9 mills per dollar of the maker's average equipped price in the first year, falling to 3 mills from the 5th year, with a $10 minimum. Antique and experimental aircraft are exempt.",
      sources: [
        src("Maine Revised Statutes", "36 M.R.S. §1482(1)(A)", S1482,
          "9 mills on each dollar of the maker's average equipped price for the first or current year of model; 7 mills for the 2nd year; 5 mills for the 3rd year; 4 mills for the 4th year; and 3 mills for the 5th and succeeding years. The minimum tax is $10."),
        src("Maine Revised Statutes", "36 M.R.S. §1484(1)", "https://legislature.maine.gov/statutes/36/title36sec1484.html",
          "The excise tax on an aircraft must be paid to the municipality where the aircraft is based except as follows."),
        src("Maine Revised Statutes", "36 M.R.S. §1483(14)", "https://legislature.maine.gov/statutes/36/title36sec1483.html",
          "Antique and experimental aircraft as defined in Title 6, section 3, subsections 10‑A and 18‑E that are registered in accordance with the provisions of Title 6"),
      ],
      caveat: "Title 6 chapter 4 (state aircraft registration) is repealed; we found no separate state registration fee. Aircraft at county airports pay the county; at Augusta State Airport, the state.",
    },
  },
};
