import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "arizona",
  name: "Arizona",
  code: "AZ",
  summary:
    "Arizona charges 5.6 percent state transaction privilege tax plus local tax on aircraft, taxes aircraft rentals, and requires aircraft based in the state to register with ADOT each year and pay a license tax of 0.5 percent of value.",
  facts: {
    buying: {
      status: "taxable",
      answer: "5.6 percent state transaction privilege tax plus county and city tax, which vary by location.",
      sources: [
        src("Arizona Department of Revenue", "TPT and Other Tax Rate Tables, effective September 1, 2026", "https://azdor.gov/sites/default/files/document/TPT_RATETABLE_09012026.pdf",
          "Table 1 provides the tax rates which combine the state's transaction privilege tax rate of 5.6% and the county excise tax rate."),
      ],
    },
    bringingIn: {
      status: "taxable",
      answer: "Use tax applies to an aircraft bought elsewhere for use in Arizona, and ADOT will not register the aircraft until it has been paid.",
      sources: [
        src("Arizona Revised Statutes", "A.R.S. 28-8322", "https://www.azleg.gov/ars/28/08322.htm",
          "unless the applicable tax has been paid as shown by a receipt from the collecting officer."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Aircraft sold to carriers and operators carrying persons for hire, to foreign governments, and to nonresidents who will not use them in Arizona except to remove them are exempt from the retail tax.",
      sources: [
        src("Arizona Revised Statutes", "A.R.S. 42-5061(B)(8)(c)", "https://www.azleg.gov/ars/42/05061.htm",
          "Persons who are not residents of this state and who will not use such property in this state"),
      ],
    },
    rental: {
      status: "taxable",
      answer:
        "Renting an aircraft falls under the personal property rental classification. The only aircraft exemption there is for nonprofit, accredited colleges renting to their own students and staff.",
      sources: [
        src("Arizona Revised Statutes", "A.R.S. 42-5071(A)", "https://www.azleg.gov/ars/42/05071.htm",
          "The personal property rental classification is comprised of the business of leasing or renting tangible personal property"),
        src("Arizona Revised Statutes", "A.R.S. 42-5071(A)(6)", "https://www.azleg.gov/ars/42/05071.htm",
          "Leasing or renting aircraft, flight simulators or similar training equipment to students or staff by nonprofit,"),
      ],
    },
    instruction: {
      status: "unclear",
      answer:
        "No exemption for flight instruction at a for-profit school was found. How a combined dual-instruction charge splits between the taxable aircraft rental and the instructor's service is not clearly published.",
      sources: [],
    },
    maintenance: {
      status: "unclear",
      answer:
        "Repair equipment and supplies used for certificated carriers' aircraft are exempt. For general aviation, not clearly published; a 2025 bill (SB 1085) proposed widening the exemption, and whether it passed has not been confirmed.",
      sources: [
        src("Arizona Revised Statutes", "A.R.S. 42-5061(B)(9)", "https://www.azleg.gov/ars/42/05061.htm",
          "Machinery, tools, equipment and related supplies used or consumed directly in repairing, remodeling or maintaining aircraft"),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based in Arizona are registered with ADOT each year and pay an aircraft license tax of 0.5 percent of the average fair market value for the make, model and year, at least $20. A nonresident's aircraft based here 90 consecutive days or less, with no intrastate commercial use, is excepted.",
      sources: [
        src("Arizona Revised Statutes", "A.R.S. 28-8335", "https://www.azleg.gov/ars/28/08335.htm", "on the basis of one-half percent of the average fair market value"),
        src("Arizona Revised Statutes", "A.R.S. 28-8335", "https://www.azleg.gov/ars/28/08335.htm", "at least $20 for a full year of registration."),
        src("Arizona Revised Statutes", "A.R.S. 28-8322", "https://www.azleg.gov/ars/28/08322.htm",
          "Owned by a nonresident who bases the aircraft in this state for a period of not more than ninety consecutive days"),
      ],
    },
  },
};
