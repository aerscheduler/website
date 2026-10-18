import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "texas",
  name: "Texas",
  code: "TX",
  summary:
    "Texas charges state and local sales tax on aircraft, up to 8.25 percent combined. Aircraft bought or rented for FAA-approved flight instruction are exempt, other rentals are taxed, and separately stated repair labor is not.",
  facts: {
    buying: {
      status: "taxable",
      answer: "State sales tax plus local tax of up to 2 percent, to a maximum combined 8.25 percent, usually at the rate where the seller does business.",
      sources: [
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php", "Local sales and use tax rates vary throughout the state, up to 2 percent.", { dated: "Revised 01/2020" }),
        src("Texas Comptroller", "Publication 94-168, Aircraft and Texas Sales and Use Tax", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "The maximum combined tax rate is 8.25 percent.", { dated: "Revised 01/2020" }),
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "In most cases, the total tax paid is based on the rate in effect at the seller's place of business.", { dated: "Revised 01/2020" }),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft bought elsewhere and used in Texas, with credit for sales tax paid to the out-of-state seller. It does not apply if the aircraft is predominantly used outside Texas, meaning more than half its departures, for at least one year.",
      sources: [
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "is not subject to Texas sales and use tax if it is predominantly used outside of this state for at least one year.", { dated: "Revised 01/2020" }),
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "more than 50 percent of its departures are made from locations outside Texas.", { dated: "Revised 01/2020" }),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Fly-away: no tax if the aircraft is predominantly used outside Texas in its first year, documented on the Comptroller's fly-away form signed by buyer and seller. Aircraft bought for flight instruction are exempt, and so are aircraft bought by FAA-certificated carriers.",
      sources: [
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "can be used in Texas within the first year, as long as it is predominantly used outside of Texas for that first year.", { dated: "Revised 01/2020" }),
      ],
    },
    rental: {
      status: "taxable",
      answer: "Rentals and leases are taxable, except an aircraft rented for FAA-approved flight instruction.",
      sources: [
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "Sales and use tax is due on the sale, lease or rental of an aircraft.", { dated: "Revised 01/2020" }),
      ],
    },
    instruction: {
      status: "exempt",
      answer:
        "No tax on the sale, lease or rental of an aircraft bought for flight instruction. A student cannot buy an aircraft tax free, but can rent one by the hour tax free for FAA-approved instruction, including solo flights, with the Comptroller's exemption form. The school or instructor needs a sales tax permit.",
      sources: [
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "Tax is not due on the sale, lease or rental of an aircraft bought for flight instruction.", { dated: "Revised 01/2020" }),
      ],
    },
    maintenance: {
      status: "conditional",
      answer: "Separately stated parts and materials are taxable; separately stated labor is not. On a lump-sum repair bill the shop pays tax on its materials and the customer pays none.",
      sources: [
        src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
          "Sales tax is due on separately stated charges for materials and parts when you have your aircraft serviced.", { dated: "Revised 01/2020" }),
      ],
    },
    annual: {
      status: "unclear",
      answer: "The Comptroller's aircraft publication does not cover registration or property tax. Not clearly published there.",
      sources: [],
    },
  },
};
