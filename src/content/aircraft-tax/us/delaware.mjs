import { src } from "../sources.mjs";

const NO_SALES_TAX = src("Delaware Division of Revenue", "Doing Business in Delaware, Step 4: Gross Receipts Taxes", "https://revenue.delaware.gov/services/business-tax/step-4/",
  "Delaware does not impose a state or local sales tax, but does impose a gross receipts tax on the seller of goods (tangible or otherwise) or provider of services in the state.");
const LEASE_TAX = "https://delcode.delaware.gov/title30/c043/index.html";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "delaware",
  name: "Delaware",
  code: "DE",
  summary:
    "Delaware has no sales tax, so buying, bringing in, maintaining an aircraft and paying for lessons carry no sales tax; sellers pay a gross receipts tax instead. Leasing an aircraft carries a 1.9914 percent lessee use tax, and there is no state personal property tax or aircraft registration fee.",
  facts: {
    buying: {
      status: "none",
      answer: "No sales tax. Delaware has no state or local sales tax; the seller pays a gross receipts tax on its own receipts.",
      sources: [NO_SALES_TAX],
    },
    bringingIn: {
      status: "none",
      answer: "No use tax on an aircraft bought elsewhere and based in Delaware. The only use tax on aircraft is the tax on leases, covered under rentals.",
      sources: [
        NO_SALES_TAX,
        src("Delaware Code", "Title 30, Chapter 43 (Use Tax on Leases of Tangible Personal Property), heading", LEASE_TAX,
          "CHAPTER 43. Use Tax on Leases of Tangible Personal Property"),
      ],
      caveat: "\"The only use tax on aircraft is the tax on leases\" is an inference: no other Delaware use tax on goods was found, but no Division of Revenue sentence says so in those words.",
    },
    exemptions: {
      status: "none",
      answer: "With no sales tax there is nothing to be exempted from on a purchase.",
      sources: [NO_SALES_TAX],
    },
    rental: {
      status: "conditional",
      answer:
        "A lessee of tangible personal property in Delaware owes a use tax of 1.9914% of the rent, collected by the lessor. Aircraft are not on the list of excluded property, so an aircraft lease or rental is covered. Whether an hourly rental with a pilot counts as a lease is not addressed.",
      sources: [
        src("Delaware Code", "30 Del. C. 4302(a)", LEASE_TAX,
          "There is imposed by this section on every lessee a use tax, for the use within this State, under a lease of tangible personal property (other than motor vehicles, household furniture, household fixtures or household furnishings, hospital equipment and any and all medical and remedial equipment"),
        src("Delaware Code", "30 Del. C. 4302(a)", LEASE_TAX, "equal to 1.9914% of the rent under such lease."),
        src("Delaware Code", "30 Del. C. 4301(1)", LEASE_TAX,
          "“Lease” means an agreement (either written or oral) under which a lessor grants to a lessee the right to use property for a specified period or at the will of either the lessor or lessee."),
        src("Delaware Code", "30 Del. C. 4301(5)", LEASE_TAX,
          "“Person required to collect the tax” shall include every lessor of property the use of which is subject to tax under § 4302 of this title"),
      ],
      caveat: "No Division of Revenue guidance on aircraft leases or rentals was found; applying 4302 to hourly aircraft rentals rests on the statute's general wording.",
    },
    instruction: {
      status: "none",
      answer: "No sales tax on flight instruction. The school pays gross receipts tax on what it takes in, as any Delaware business does. Whether aircraft time inside a lesson counts as a lease for the lessee use tax is not addressed.",
      sources: [NO_SALES_TAX],
    },
    maintenance: {
      status: "none",
      answer: "No sales tax on parts or repair labor. The repair shop pays gross receipts tax on its receipts.",
      sources: [NO_SALES_TAX],
    },
    annual: {
      status: "none",
      answer:
        "Delaware does not tax personal property, so there is no yearly aircraft property tax at the state level. The aeronautics chapter of the Delaware Code has no aircraft registration or fee.",
      sources: [
        src("Delaware Code", "30 Del. C. 102(a)", "https://www.delcode.delaware.gov/title30/c001/index.html",
          "No tax shall be levied, assessed or collected by this State upon personal property whether tangible or intangible."),
      ],
      caveat:
        "Title 2, Chapter 1, Subchapter III (Registration and Licenses) covers airport licensing only; bills for an annual aircraft fee (HB 427 of 2018, HB 84 of 2019, HB 232 of 2021) were found but none appears in the Code. 30 Del. C. 102(a) names only the State; the 1939 session law also barred political subdivisions, but the current text was not confirmed for counties.",
    },
  },
};
