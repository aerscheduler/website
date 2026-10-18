import { src } from "../sources.mjs";

const KRS = "Kentucky Revised Statutes";
const S = (id) => `https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=${id}`;
const K139_010 = S(58185);
const K139_200 = S(58186);
const K139_310 = S(58189);
const K139_480 = S(57938);
const K139_510 = S(47353);
const K132_020 = S(53523);
const K132_200 = S(53524);

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "kentucky",
  name: "Kentucky",
  code: "KY",
  summary:
    "Kentucky charges 6 percent sales or use tax on aircraft, rentals and repair parts, with exemptions only for aircraft used in interstate commerce for hire. Aircraft not used for hire pay a low state property tax of $0.015 per $100 of value, and local property tax unless the local district exempts them.",
  facts: {
    buying: {
      status: "taxable",
      answer: "Six percent sales tax on the gross receipts from the retail sale of an aircraft.",
      sources: [
        src(KRS, "KRS 139.200(1)(a)", K139_200,
          "A tax is hereby imposed upon all retailers at the rate of six percent (6%) of the gross receipts derived from: (1) Retail sales of: (a) Tangible personal property, regardless of the method of delivery, made within this Commonwealth;"),
      ],
      caveat: "Private (isolated) sales were not researched. Kentucky has no local sales tax as far as known; not stated in a quoted source, so not in the answer.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft bought elsewhere and stored or used in Kentucky. Sales tax legally paid to another state is credited, and only any difference is owed, unless that state gives no credit for Kentucky tax.",
      sources: [
        src(KRS, "KRS 139.310(1)", K139_310, "An excise tax is hereby imposed on the storage, use, or other consumption"),
        src(KRS, "KRS 139.510(1)", K139_510,
          "If the amount of tax paid in another state is not equal to or greater than the amount of tax imposed by KRS 139.310, then the taxpayer shall pay to the department an amount sufficient to make the tax paid in the other state and in this state equal to the amount imposed by KRS 139.310."),
        src(KRS, "KRS 139.510(1)", K139_510,
          "No credit shall be given under this section for sales taxes paid in another state if that state does not grant credit for sales taxes paid in this state."),
      ],
      caveat: "The 139.310 quote is the opening words of subsection (1); the rest of the sentence was not captured.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Aircraft, their repair and replacement parts, and supplies other than fuel are exempt when the aircraft operates in interstate commerce and is used only to carry property or passengers for hire. No fly-away exemption for nonresident buyers is in current law.",
      sources: [
        src(KRS, "KRS 139.480(18)", K139_480,
          "Aircraft, repair and replacement parts therefor, and supplies, except fuel, for the direct operation of aircraft in interstate commerce and used exclusively for the conveyance of property or passengers for hire. Nominal intrastate use shall not subject the property to the taxes imposed by this chapter;"),
      ],
      caveat:
        "2026 HB 262 would have exempted aircraft sold and delivered to nonresidents (KRS 139.470) from August 1, 2026; its last recorded action was referral to Appropriations & Revenue on January 15, 2026, and the current 139.470 has no aircraft provision. Confirm it did not pass.",
    },
    rental: {
      status: "taxable",
      answer: "A lease or rental of tangible personal property is a retail sale in Kentucky, so aircraft rentals are taxed.",
      sources: [
        src(KRS, "KRS 139.010, definition of \"Retail sale\"", K139_010, "\"Retail sale\" means any sale, lease, or rental for any purpose other than resale, sublease, or subrent;"),
        src(KRS, "KRS 139.010, definition of \"Lease or rental\"", K139_010,
          "\"Lease or rental\" means any transfer of possession or control of tangible personal property for a fixed or indeterminate term for consideration."),
      ],
      caveat: "Wet rentals (with a pilot, where the customer has no control) are probably not a \"transfer of possession or control\"; not confirmed.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Kentucky taxes \"leisure, recreational, and athletic instructional services\". Whether flight training counts, particularly training for a pilot certificate or career, is not addressed in the statute, and no Department guidance on flight instruction was found.",
      sources: [
        src(KRS, "KRS 139.200(2)(ak)", K139_200, "Leisure, recreational, and athletic instructional services;"),
      ],
      caveat: "The Department of Revenue may have guidance on what counts as recreational instruction (2022 HB 8); not found or read.",
    },
    maintenance: {
      status: "taxable",
      answer:
        "Replacement parts are taxable, and the taxable price includes the charge for labor to install or apply them. Aircraft repair labor is not on the list of taxable services when no parts are sold. Parts for aircraft used in interstate commerce for hire are exempt.",
      sources: [
        src(KRS, "KRS 139.010, definition of \"Sales price\"", K139_010, "The amount charged for labor or services rendered in installing or applying the tangible personal property,"),
        src(KRS, "KRS 139.480(18)", K139_480,
          "Aircraft, repair and replacement parts therefor, and supplies, except fuel, for the direct operation of aircraft in interstate commerce and used exclusively for the conveyance of property or passengers for hire."),
      ],
      caveat:
        "\"Repair labor is not on the list of taxable services\" is from reading KRS 139.200(2), whose repair items cover only commercial refrigeration and apparel, footwear, watches and jewelry; no aircraft source says it directly.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft not used to carry persons or property for hire pay state property tax of one and one-half cents ($0.015) per $100 of value. They pay local property tax too, unless the county, city, school or other district where the aircraft is based approves an exemption.",
      sources: [
        src(KRS, "KRS 132.020(1)(f)", K132_020, "One and one-half cents ($0.015) upon each one hundred dollars ($100) of value of all:"),
        src(KRS, "KRS 132.020(1)(f)5.", K132_020, "Aircraft not used in the business of transporting persons or property for compensation or hire;"),
        src(KRS, "KRS 132.200(13)", K132_200,
          "Aircraft not used in the business of transporting persons or property for compensation or hire if an exemption is approved by the county, city, school, or other taxing district in which the aircraft has its taxable situs;"),
      ],
      caveat: "No state aircraft registration fee was found in KRS Chapter 183; aircraft used for hire are taxed at a different rate not researched.",
    },
  },
};
