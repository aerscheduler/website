import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "washington",
  name: "Washington",
  code: "WA",
  summary:
    "Washington charges 6.5 percent state sales tax plus local tax on aircraft, taxes repair labor and parts, and requires aircraft based in the state to register with WSDOT and pay a yearly aircraft excise tax.",
  facts: {
    buying: {
      status: "taxable",
      answer: "6.5 percent state retail sales tax plus local tax, collected by the dealer or broker on the selling price.",
      sources: [
        src("Revised Code of Washington", "RCW 82.08.020(1)", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.08.020",
          "a tax equal to six and five-tenths percent of the selling price on each retail sale in this state."),
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
          "Sales tax is due on the selling price and is collected by the aircraft dealer or broker."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer: "Residents owe use tax on aircraft used in Washington. Nonresidents may use an aircraft here up to 90 days in any continuous 12-month period without owing it.",
      sources: [
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
          "Washington residents have the responsibility to pay sales or use tax on aircraft used in Washington"),
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
          "Non-residents may use aircraft in this state for up to ninety (90) days in any continuous 12-month period"),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Aircraft used more than half the time in interstate or foreign commerce for hire; aircraft bought only to rent out without a pilot; private aircraft over 41,000 pounds sold to nonresidents; and gifts where the donor already paid Washington tax.",
      sources: [
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax", "Large private aircraft (over 41,000 pounds) sold to nonresidents"),
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
          "Aircraft purchased exclusively for the purpose of renting or leasing on a bare-rental basis, i.e., without a pilot."),
      ],
    },
    rental: {
      status: "taxable",
      answer: "An aircraft bought only for bare rental is exempt at purchase, and retail sales tax is then collected on the rentals.",
      sources: [
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
          "Aircraft purchased exclusively for the purpose of renting or leasing on a bare-rental basis, i.e., without a pilot."),
        src("Washington Department of Revenue", "Det. No. 19-0073, 40 WTD 178 (November 30, 2021)", "https://dor.wa.gov/sites/default/files/2022-02/40WTD178.pdf",
          "the taxpayer should collect retail sales tax on the aircraft rental payments"),
      ],
      caveat: "The rental quote is from a published determination rather than a rule; WAC 458-20-211 is the rule to cite when the page is built.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Department determinations treat aircraft a school buys to give flight instruction as subject to use tax, unless students genuinely lease the aircraft and the school collects sales tax on the leases. Not found in a current rule.",
      sources: [
        src("Washington Department of Revenue", "Det. No. 19-0073, 40 WTD 178 (November 30, 2021)", "https://dor.wa.gov/sites/default/files/2022-02/40WTD178.pdf",
          "in general, aircraft purchased by a taxpayer for providing flight instruction services are subject to use tax."),
      ],
      caveat: "A published determination, not a rule. It binds the Department only on its facts, so the page says so.",
    },
    maintenance: {
      status: "taxable",
      answer: "Repair labor and parts are both retail sales, taxed on the total charge. Repairs to private aircraft over 41,000 pounds owned by nonresidents are exempt.",
      sources: [
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax", "Large private aircraft (over 41,000 pounds) sold to nonresidents"),
        src("Washington Administrative Code", "WAC 458-20-173", "https://app.leg.wa.gov/wac/default.aspx?cite=458-20-173",
          "are required to collect the retail sales tax upon the total charge made for the rendition of such services"),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Every aircraft based or operating in Washington registers with WSDOT Aviation within 30 days of purchase and pays a yearly excise tax each January: $50 for a single-engine airplane now and $120 from 2027. Nonresident aircraft registered elsewhere and here under 90 days are exempt.",
      sources: [
        src("Revised Code of Washington", "RCW 82.48.100", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.48.100", "if the aircraft remains in this state or is based in this state, or both, for a period less than ninety days;"),
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax", "If you purchase an aircraft, you have 30 days to register with WSDOT."),
        src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
          "Aircraft excise tax is due every year during the month of January and is paid to the WSDOT Aviation Division."),
        src("Revised Code of Washington", "RCW 82.48.030, version effective January 1, 2027", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.48.030",
          "Single engine fixed wing | $50 | $70 | $120"),
        src("Revised Code of Washington", "RCW 82.48.100", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.48.100",
          "Aircraft that are owned by a nonresident and registered in another state,"),
      ],

    },
  },
};
