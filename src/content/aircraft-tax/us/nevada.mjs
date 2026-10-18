import { src } from "../sources.mjs";

const NRS372 = "https://www.leg.state.nv.us/NRS/NRS-372.html";
const DECK = "https://tax.nv.gov/wp-content/uploads/2024/03/Basic-Training-New-1.pdf";
const NVT = "Nevada Department of Taxation";
const DK = { dated: "uploaded March 2024" };
/** The rate slide separates county and rate with an en dash; the quotes keep it as printed. */
const ND = "–";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "nevada",
  name: "Nevada",
  code: "NV",
  summary:
    "Nevada's sales and use tax on aircraft runs from 6.85 percent to 8.375 percent depending on the county, and an occasional sale by a private owner is exempt. Repair labor is not taxed, and we found no aircraft-specific rules for rentals, instruction or registration.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Nevada's rate depends on the county where the sale or delivery happens: 6.850% in the lowest counties, 8.265% in Washoe and 8.375% in Clark. An occasional sale is exempt, and a seller who makes no more than two retail sales in 12 months is not a retailer, so a one-off private sale is generally not taxed.",
      sources: [
        src(NVT, "Basic Training presentation, Sales/Use Tax", DECK,
          "Nevada’s Sales & Use Tax rates vary by county. Taxes are applied in the county the transaction takes place or the county the delivery is made.", DK),
        src(NVT, "Basic Training presentation, Nevada Tax Rates by County", DECK, `Esmeralda ${ND} 6.850% Eureka ${ND} 6.850%`, DK),
        src(NVT, "Basic Training presentation, Nevada Tax Rates by County", DECK, `Storey ${ND} 7.600% Washoe ${ND} 8.265%`, DK),
        src(NVT, "Basic Training presentation, Nevada Tax Rates by County", DECK, `Churchill ${ND} 7.600% Clark ${ND} 8.375%`, DK),
        src("Nevada Revised Statutes", "NRS 372.320", NRS372,
          "There are exempted from the taxes imposed by this chapter the gross receipts from occasional sales of tangible personal property and the storage, use or other consumption in this State of tangible personal property, the transfer of which to the purchaser is an occasional sale."),
        src("Nevada Revised Statutes", "NRS 372.055(1)(c)", NRS372,
          "Every person making more than two retail sales of tangible personal property during any 12-month period, including sales made in the capacity of assignee for the benefit of creditors, or receiver or trustee in bankruptcy."),
      ],
      caveat: "The rate table comes from a Department training presentation (uploaded 2024), not a rate notice; county rates should be rechecked against the Department's current rate list.",
    },
    bringingIn: {
      status: "unclear",
      answer:
        "Nevada imposes use tax on property bought out of state in a transaction that would have been taxable here, so an aircraft bought from a dealer elsewhere is generally subject to it. We found no Nevada source on credit for tax paid to another state, or on how long an aircraft can be in Nevada first.",
      sources: [
        src("Nevada Revised Statutes", "NRS 372.185(2)", NRS372,
          "The tax is imposed with respect to all property which was acquired out of state in a transaction that would have been a taxable sale if it had occurred within this State."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "An occasional sale is exempt. A sale is exempt when the seller delivers the aircraft outside Nevada under the contract of sale. We found no general fly-away exemption for a buyer who flies the aircraft out of state.",
      sources: [
        src("Nevada Revised Statutes", "NRS 372.320", NRS372,
          "There are exempted from the taxes imposed by this chapter the gross receipts from occasional sales of tangible personal property and the storage, use or other consumption in this State of tangible personal property, the transfer of which to the purchaser is an occasional sale."),
        src("Nevada Revised Statutes", "NRS 372.335", NRS372,
          "There are exempted from the computation of the amount of the sales tax the gross receipts from any sale of tangible personal property which is shipped to a point outside this State pursuant to the contract of sale by delivery by the vendor to such point by means of:"),
      ],
      caveat: "Older NRS indexes list NRS 372.317, \"Aircraft and major components of aircraft\", and NRS 372.726; neither appears in the current chapter 372 (read 2026-10-18), and 372.726 is shown repealed by 2015 c. 406. NRS 360.753 provides a partial abatement for certain aircraft businesses; not reviewed.",
    },
    rental: {
      status: "taxable",
      answer: "The Department's own training says leases are taxed on the rental payments, and a lessor that takes no other action must charge tax on the rental stream.",
      sources: [
        src(NVT, "Basic Training presentation, Leases", DECK, "Sales tax on the rental stream", DK),
        src(NVT, "Basic Training presentation, Leases", DECK, "Take no action = MUST tax on rental stream", DK),
      ],
      caveat: "The slide cites NAC 372.936 to 372.940 and Tax Bulletin SUT 14-0001, which we did not read; they may let a lessor pay tax on the purchase instead. No aircraft-specific rental guidance found.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Nevada does not tax services that are not tied to a sale of goods, but no Nevada source we found addresses flight instruction or whether the aircraft time inside a lesson is a taxable rental.",
      sources: [
        src(NVT, "Basic Training presentation, Sales Tax Exemptions", DECK, "Services not associated with a sale of tangible personal property", DK),
      ],
    },
    maintenance: {
      status: "conditional",
      answer: "Parts are taxable. Installation and repair labor are not.",
      sources: [
        src(NVT, "Basic Training presentation, Sales Tax Exemptions", DECK, "Installation labor and repair labor", DK),
        src("Nevada Revised Statutes", "NRS 372.7261(1)(a)", NRS372,
          "The Department shall calculate the amount of tax imposed on tangible personal property purchased for use in owning, operating, manufacturing, servicing, maintaining, testing, repairing, overhauling or assembling an aircraft or any component of an aircraft as follows:"),
      ],
      caveat: "\"Parts are taxable\" rests on the general sales tax; no aircraft parts exemption was found. Whether labor must be separately stated was not confirmed (the deck cites a Repairs presentation not read).",
    },
    annual: {
      status: "unclear",
      answer: "We found no Nevada primary source on a yearly state aircraft registration fee, or on how counties tax aircraft as personal property.",
      sources: [],
    },
  },
};
