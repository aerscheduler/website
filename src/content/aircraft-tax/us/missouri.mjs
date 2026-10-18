import { src } from "../sources.mjs";

const RS = (s) => `https://revisor.mo.gov/main/OneSection.aspx?section=${s}`;
const DOR = "https://dor.mo.gov/business/sales-tax/";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "missouri",
  name: "Missouri",
  code: "MO",
  summary:
    "Missouri charges 4.225 percent state sales or use tax on aircraft, plus city and county tax, but exempts all aircraft repair parts and equipment and nonresidents' aircraft that leave within ten business days. Counties tax aircraft as personal property.",
  facts: {
    buying: {
      status: "taxable",
      answer: "4.225 percent state sales tax, plus city, county and special district sales taxes where they apply.",
      sources: [
        src("Missouri Department of Revenue", "Sales/Use Tax", DOR,
          "The 4.225 percent state sales and use tax is distributed into four funds to finance portions of state government"),
        src("Missouri Department of Revenue", "Sales/Use Tax", DOR,
          "Cities and counties may impose a local sales and use tax. Special taxing districts (such as fire districts) may also impose additional sales taxes."),
      ],
      caveat: "No Missouri source we read addresses private (isolated) aircraft sales specifically.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft stored or used in Missouri without Missouri sales tax. Tax paid to another state is credited; if it was lower, the owner pays the difference.",
      sources: [
        src("Missouri Department of Revenue", "Sales/Use Tax", DOR, "Use tax is imposed on the storage, use or consumption of tangible personal property in this state."),
        src("Missouri Revised Statutes", "Section 144.615(5)", RS("144.615"),
          "Tangible personal property which has been subjected to a tax by any other state in this respect to its sales or use; provided, if such tax is less than the tax imposed by sections 144.600 to 144.745, such property, if otherwise taxable, shall be subject to a tax equal to the difference between such tax and the tax imposed by sections 144.600 to 144.745"),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft sold or delivered in Missouri to a nonresident is exempt if it will not be based in Missouri and leaves within ten business days of the title transfer or of its return to service after work done at the time of sale. Sales of aircraft to common carriers for storage or interstate commerce are exempt.",
      sources: [
        src("Missouri Revised Statutes", "Section 144.030.2(43)", RS("144.030"),
          "Any new or used aircraft sold or delivered in this state to a person who is not a resident of this state or a corporation that is not incorporated in this state, and such aircraft is not to be based in this state and shall not remain in this state more than ten business days subsequent to the last to occur of:"),
        src("Missouri Revised Statutes", "Section 144.030.2(20)", RS("144.030"), "All sales of aircraft to common carriers for storage or for use in interstate commerce"),
      ],
    },
    rental: {
      status: "conditional",
      answer:
        "Aircraft rentals are taxable, unless the owner paid sales or use tax when it bought the aircraft; then the rental receipts are not taxed again.",
      sources: [
        src("Missouri Revised Statutes", "Section 144.020.1(8)", RS("144.020"),
          "provided that if the lessor or renter of any tangible personal property had previously purchased the property under the conditions of sale at retail or leased or rented the property and the tax was paid at the time of purchase, lease or rental, the lessor, sublessor, renter or subrenter shall not apply or collect the tax on the subsequent lease, sublease, rental or subrental receipts from that property."),
      ],
      caveat: "The Missouri Supreme Court has addressed when an aircraft lease supports a resale exemption on the purchase (Business Aviation, LLC v. Director of Revenue); we did not read the opinion.",
    },
    instruction: {
      status: "unclear",
      answer: "We found no Missouri statute, rule or Department guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
    },
    maintenance: {
      status: "exempt",
      answer:
        "All materials, replacement parts and equipment used to modify, repair or maintain an aircraft, its engines or accessories are exempt, for any aircraft. Whether separately stated repair labor is taxed was not confirmed.",
      sources: [
        src("Missouri Revised Statutes", "Section 144.030.2(40)", RS("144.030"),
          "All materials, replacement parts, and equipment purchased for use directly upon, and for the modification, replacement, repair, and maintenance of aircraft, aircraft power plants, and aircraft accessories"),
      ],
      caveat: "Repair labor was not confirmed from a primary source.",
    },
    annual: {
      status: "conditional",
      answer:
        "County assessors assess personal property, aircraft included, at thirty-three and one-third percent of its value as of January first, and local property tax rates apply to that. An aircraft at least twenty-five years old, flown only noncommercially and less than two hundred hours a year, or a kit-built aircraft, is assessed at five percent of its value.",
      sources: [
        src("Missouri Revised Statutes", "Section 137.115.1", RS("137.115"),
          "Except as otherwise provided in subsection 3 of this section and section 137.078, the assessor shall annually assess all personal property at thirty-three and one-third percent of its true value in money as of January first of each calendar year."),
        src("Missouri Revised Statutes", "Section 137.115.3(4)", RS("137.115"),
          "aircraft which are at least twenty-five years old and which are used solely for noncommercial purposes and are operated less than two hundred hours per year or aircraft that are home built from a kit, five percent"),
      ],
      caveat: "We found no Missouri state aircraft registration fee, but did not find a primary source saying there is none. Local levy rates vary and were not researched.",
    },
  },
};
