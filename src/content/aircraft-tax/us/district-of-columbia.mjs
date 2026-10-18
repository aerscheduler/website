import { src } from "../sources.mjs";

const CODE = "Code of the District of Columbia";
const URL = (s) => `https://code.dccouncil.gov/us/dc/council/code/sections/${s}`;

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "district-of-columbia",
  name: "District of Columbia",
  code: "DC",
  summary:
    "The District of Columbia has no aircraft-specific sales tax rules: aircraft sales, rentals and repair services fall under the general sales and use tax, which rose from 6.0 to 7.0 percent on October 1, 2026.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "No exemption or special rate for aircraft was found, so a retail sale of an aircraft in the District owes the general sales tax: 6.0% before October 1, 2026, and 7.0% from that date.",
      sources: [
        src(CODE, "D.C. Code 47-2002(a)", URL("47-2002"),
          "The rate of such tax on the gross receipts from sales of or charges for such tangible personal property and services shall be 6.0% before October 1, 2026, and 7.0% beginning on October 1, 2026, and continuing thereafter"),
      ],
      caveat: "\"No exemption or special rate for aircraft\" rests on searching 47-2001, 47-2002 and 47-2005 for \"aircraft\"; the only hits are food sold aboard aircraft and common-carrier property.",
    },
    bringingIn: {
      status: "taxable",
      answer:
        "Compensating use tax applies at the same rate, 6.0% before October 1, 2026 and 7.0% from that date, to tangible personal property bought elsewhere and used or stored in the District.",
      sources: [
        src(CODE, "D.C. Code 47-2202(a)", URL("47-2202"),
          "There is hereby imposed and there shall be paid by every vendor engaging in business in the District and by every purchaser a tax on the use, storage, or consumption of any tangible personal property and service sold or purchased at retail sale."),
        src(CODE, "D.C. Code 47-2202(a)", URL("47-2202"),
          "The rate of tax imposed by this section on the sales price of such tangible personal property and services shall be 6.0% before October 1, 2026, and 7.0% beginning on October 1, 2026, and continuing thereafter"),
      ],
      caveat: "A credit for sales tax paid to another state was not found in 47-2201 to 47-2206; the answer does not mention one.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "The only aircraft exemption found is for property a common carrier holds for use mainly outside the District in interstate commerce, as part of an aircraft. No fly-away or nonresident exemption for aircraft was found.",
      sources: [
        src(CODE, "D.C. Code 47-2201", URL("47-2201"),
          "The use or storage within the District of tangible personal property owned and held by a common carrier or sleeping car company for use principally without the District in the course of interstate commerce, or commerce between the District and a state, in or upon, or as part of, any train, aircraft, or boat; or"),
      ],
      caveat: "The subsection letter of the common-carrier passage in 47-2201 was not pinned down from the page text.",
    },
    rental: {
      status: "taxable",
      answer: "A lease or rental of tangible personal property, of any length, is a taxable sale, with the tax computed on the rent.",
      sources: [
        src(CODE, "D.C. Code 47-2001(n)(1)(F)", URL("47-2001"),
          "The sale or charges for possession or use of any article of tangible personal property granted under a lease or contract, regardless of the length of time of such lease or contract or whether such lease or contract is oral or written; in such event, for the purposes of this chapter, such lease or contract shall be considered the sale of such article and the tax shall be computed and paid by the vendor upon the rental paid"),
      ],
      caveat: "Aircraft are not mentioned; this is the general rule. Wet rentals (with a pilot) are not addressed.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Flight instruction is not among the services the District lists as taxable, and no guidance addresses lessons or the aircraft time inside them.",
      sources: [],
    },
    maintenance: {
      status: "taxable",
      answer: "Repair services on tangible personal property, including installing replacement parts, are taxable, whether or not parts are transferred.",
      sources: [
        src(CODE, "D.C. Code 47-2001(n)(1)(I)", URL("47-2001"),
          "The sale of or charges for the service of repairing, altering, mending, or fitting tangible personal property, or applying or installing tangible personal property as a repair or replacement part of other tangible personal property, whether or not such service is performed by other means of coin-operated equipment or by any other means, and whether or not any tangible personal property is transferred in conjunction with such service;"),
      ],
      caveat: "Aircraft are not mentioned; this is the general rule.",
    },
    annual: {
      status: "unclear",
      answer:
        "No District aircraft registration or aircraft-specific yearly tax was found. Whether the District's personal property tax on business property reaches an aircraft was not confirmed.",
      sources: [],
      caveat:
        "D.C. Code 47-1522 taxes tangible personal property used in a trade or business, and the 47-1508 exemptions cover registered motor vehicles but do not mention aircraft, so a business-owned aircraft kept in the District may be taxable; no source says so directly, and personally owned aircraft were not addressed.",
    },
  },
};
