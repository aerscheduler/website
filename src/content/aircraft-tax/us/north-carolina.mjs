import { src } from "../sources.mjs";

const SUTB = "https://www.ncdor.gov/sutb-2026pdf/open";
const AIRCRAFT = "https://www.ncdor.gov/taxes-forms/sales-and-use-tax/aircraft-and-qualified-jet-engines";
const GS = (s) => `https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_105/GS_${s}.html`;
const QUALIFIED = "An aircraft with a maximum take-off weight of 2,000 pounds and above.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "north-carolina",
  name: "North Carolina",
  code: "NC",
  summary:
    "North Carolina charges 4.75 percent state sales or use tax on aircraft, capped at $2,500 per aircraft, with no local tax. Repairs and parts for aircraft of 2,000 pounds or more are exempt, and counties tax aircraft as personal property each year.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "4.75 percent state sales tax on the price, including attached accessories, with a maximum tax of $2,500 per aircraft. Local and transit sales taxes do not apply. An occasional and isolated sale by someone not in the business of selling, such as an owner selling a personal aircraft, is not taxed.",
      sources: [
        src("North Carolina Department of Revenue", "Aircraft and Qualified Jet Engines", AIRCRAFT,
          "The retail sale of an aircraft, including all accessories attached when delivered to the purchaser, is subject to the 4.75% general state rate of sales and use tax with a maximum tax of $2,500 per article."),
        src("North Carolina Department of Revenue", "Aircraft and Qualified Jet Engines", AIRCRAFT,
          "Aircraft are not subject to the local and transit rates of sales and use tax."),
        src("North Carolina Department of Revenue", "Sales and Use Tax Bulletins, SUTB 2-7", SUTB,
          "An occasional and isolated sale is not subject to sales and use tax.", { dated: "January 2026" }),
      ],
      caveat: "SUTB 9-3 item 4 names 'an individual selling an aircraft personally owned' as exempt. Statute for the rate: G.S. 105-164.4(a)(1a)c.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "If sales tax was not paid, use tax at 4.75 percent, capped at $2,500, applies to an aircraft bought inside or outside North Carolina for use here. Sales or use tax paid to another state is credited and the difference is owed, but only if that state gives a similar credit for North Carolina tax.",
      sources: [
        src("North Carolina Department of Revenue", "Aircraft and Qualified Jet Engines", AIRCRAFT,
          "If sales tax has not been paid on the taxable purchase of an aircraft, a use tax at the 4.75% general state rate of sales and use tax with a maximum tax of $2,500 per article applies to an aircraft purchased or received from within or without this state for storage, use, or consumption in this state."),
        src("North Carolina General Statutes", "G.S. 105-164.6(c)(2)", GS("105-164.6"),
          "The credit allowed by this subdivision does not apply to tax paid to a state that does not grant a similar credit for sales or use taxes paid in North Carolina."),
      ],
      caveat: "No day count or fly-away safe harbor for nonresidents found in the Department's aircraft guidance or SUTB 9.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Exemptions are narrow. Aircraft bought for resale are exempt, and parts, repairs and service contracts for aircraft of 2,000 pounds or more are exempt. The Department's aircraft guidance names no nonresident fly-away exemption and no carrier exemption for the aircraft itself.",
      sources: [
        src("North Carolina Department of Revenue", "Sales and Use Tax Bulletins, SUTB 9-3", SUTB,
          "Any aircraft, accessories, and supplies purchased for resale as provided in SUTB 5.", { dated: "January 2026" }),
        src("North Carolina General Statutes", "G.S. 105-164.3(197)", GS("105-164.3"), QUALIFIED),
      ],
      caveat: "Interstate air businesses get fuel and component-part exemptions only for commercial aircraft over 12,500 pounds (SUTB 50-3, G.S. 105-164.13(45a)); not summarized in the answer.",
    },
    rental: {
      status: "taxable",
      answer:
        "A lease or rental of an aircraft is taxed at the same rate and maximum as a sale: 4.75 percent, with the $2,500 maximum figured separately for each lease or rental.",
      sources: [
        src("North Carolina General Statutes", "G.S. 105-164.4(a)(2)", GS("105-164.4"),
          "The applicable percentage rate is the rate and the maximum tax, if any, that applies to a sale of the property that is leased or rented."),
        src("North Carolina Department of Revenue", "Sales and Use Tax Bulletins, SUTB 54-1", SUTB,
          "The maximum tax, if applicable, must be determined for each lease or rental of tangible personal property, not on the aggregate tax for all leases or rentals of the leased tangible personal property.", { dated: "January 2026" }),
        src("North Carolina Department of Revenue", "Aircraft and Qualified Jet Engines", AIRCRAFT,
          "The retail sale of an aircraft, including all accessories attached when delivered to the purchaser, is subject to the 4.75% general state rate of sales and use tax with a maximum tax of $2,500 per article."),
      ],
      caveat: "Whether an hourly rental with a pilot (a charter) is a lease is not addressed in the aircraft guidance.",
    },
    instruction: {
      status: "unclear",
      answer:
        "North Carolina does not publish guidance on flight instruction or on the aircraft rental inside a lesson. Its aircraft guidance and sales tax bulletins do not mention flight schools.",
      sources: [],
      caveat: "Searched SUTB (January 2026) for flight, instruction, school; only the aircraft simulator exemption (SUTB 50-3) mentions flight training. Instruction is not an enumerated taxable service, but no primary source says so for flight lessons.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Repair, maintenance and installation services, and the parts used, are exempt for a qualified aircraft, one with a maximum take-off weight of 2,000 pounds and above. Repairs to lighter aircraft are taxable.",
      sources: [
        src("North Carolina Department of Revenue", "Sales and Use Tax Bulletins, SUTB 9-3", SUTB,
          "Parts and accessories used to repair or maintain a qualified aircraft or qualified jet engine.", { dated: "January 2026" }),
        src("North Carolina General Statutes", "G.S. 105-164.3(197)", GS("105-164.3"), QUALIFIED),
        src("North Carolina General Statutes", "G.S. 105-164.4(a)(1)c", GS("105-164.4"),
          "The sales price of or gross receipts derived from repair, maintenance, and installation services to tangible personal property or certain digital property, regardless of whether the tangible personal property or certain digital property is taxed under another subdivision in this section or is subject to a maximum tax under another subdivision in this section."),
      ],
      caveat: "Labor exemption for qualified aircraft: SUTB 9-3 item 2 and SUTB 75-3A.1.a; statute G.S. 105-164.13(45d) for parts. SUTB 75-2 says taxable repairs bear general State, local and transit rates.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft are personal property, taxed each year by the county where they are listed. An antique airplane, model year 1954 or older and not used to earn income, is assessed at the lower of its true value or $5,000.",
      sources: [
        src("North Carolina General Statutes", "G.S. 105-274(a)", GS("105-274"),
          "All property, real and personal, within the jurisdiction of the State shall be subject to taxation unless it is:"),
        src("North Carolina General Statutes", "G.S. 105-277.12(a)(1)", GS("105-277.12"),
          "It is registered with the Federal Aviation Administration and is a model year 1954 or older."),
        src("North Carolina General Statutes", "G.S. 105-277.12(b)", GS("105-277.12"),
          "An antique airplane shall be assessed at the lower of its true value or five thousand dollars ($5,000)."),
      ],
      caveat: "No state aircraft registration fee found. Counties (Mecklenburg, Harnett) list aircraft each January; no NCDOR statewide aircraft valuation guide located.",
    },
  },
};
