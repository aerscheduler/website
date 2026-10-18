import { src } from "../sources.mjs";

const REG067 = "https://revenue.nebraska.gov/sites/default/files/doc/legal/regs/1-067.pdf";
const REG082 = "https://revenue.nebraska.gov/sites/default/files/doc/legal/regs/1-082.pdf";
const GUIDE = "https://revenue.nebraska.gov/files/doc/info/6-317.pdf";
const NE = "Nebraska Department of Revenue";
const R067 = { dated: "April 12, 2005" };
const G = { dated: "March 9, 2021" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "nebraska",
  name: "Nebraska",
  code: "NE",
  summary:
    "Nebraska charges 5.5 percent state sales or use tax, plus local tax, on aircraft, bare aircraft rentals, parts and repair labor. Dual instruction by the aircraft owner or its employees is exempt, and nonresidents who remove an aircraft within ten days pay no tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "5.5 percent state sales tax plus any local sales tax on an aircraft for private or business use. An aircraft bought in an occasional sale is not subject to use tax.",
      sources: [
        src(NE, "Nebraska Sales and Use Tax", "https://revenue.nebraska.gov/businesses/sales-and-use-tax", "The Nebraska state sales and use tax rate is 5.5% (.055)."),
        src(NE, "Reg-1-067.03, Aircraft and Related Services", REG067, "Aircraft and repair parts sold for private use or business use other than as a common or contract carrier are taxable.", R067),
        src(NE, "Nebraska Use Tax Information Guide", GUIDE, "The purchase of the aircraft qualifies as an occasional sale;", G),
      ],
      caveat: "The guide lists \"occasional sale\" as a use tax exception for aircraft but we did not read the statutory definition of an occasional sale (Neb. Rev. Stat. 77-2701.23), so whether every private sale qualifies is not confirmed.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft brought into Nebraska within one year of purchase owes use tax if it is regularly based here or flies more than half its operating hours here. Brought in a year or more after purchase, it owes nothing if it was neither based nor used mostly in Nebraska in that first year. Tax paid to another state at an equal or higher rate removes Nebraska use tax.",
      sources: [
        src(NE, "Reg-1-067.10, Aircraft and Related Services", REG067,
          "If an aircraft is brought into Nebraska within one year of purchase and is either regularly based within this state or more than one-half of the aircraft's operating hours are within this state, such aircraft is taxable in this state.", R067),
        src(NE, "Nebraska Use Tax Information Guide", GUIDE,
          "The aircraft was brought into Nebraska one year or more after purchase and was neither regularly based nor used for more than one-half of the aircraft’s operating hours inside Nebraska during the year after the aircraft was purchased.", G),
        src(NE, "Nebraska Use Tax Information Guide", GUIDE,
          "Transactions where tax was properly paid in another state at a rate equal to or greater than the appropriate state and local sales tax rate;", G),
      ],
      caveat: "The guide does not say in so many words that a lower out-of-state tax is credited and only the difference is owed.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "A nonresident, or a business located outside Nebraska, may buy an aircraft tax free if it will not be based or registered in Nebraska and leaves within ten days. Aircraft and parts for federally certified interstate air carriers are exempt.",
      sources: [
        src(NE, "Reg-1-067.03A, Aircraft and Related Services", REG067,
          "A nonresident individual, or other person with a business location outside this state may purchase an aircraft in this state without the payment of tax if the aircraft will not be based or registered in this state and is removed from the state within ten days of its purchase.", R067),
        src(NE, "Reg-1-067.02, Aircraft and Related Services", REG067,
          "Sales of aircraft, and aircraft repair and replacement parts for such aircraft, operated by air carriers authorized and certified by the United States Department of Transportation or another federal authority or a foreign authority to engage in the carriage of persons or property in interstate or foreign commerce are exempt from the sales or use tax.", R067),
      ],
    },
    rental: {
      status: "conditional",
      answer:
        "When the customer supplies the pilot, the use of the aircraft is a taxable rental. When the owner or its employee flies it, as in charter, the charge is exempt. A business renting aircraft may elect to pay use tax on its gross receipts from the aircraft instead of on the purchase price.",
      sources: [
        src(NE, "Reg-1-067.05, Aircraft and Related Services", REG067, "If a customer, rather than the aircraft owner, furnishes the pilot, the use of the airplane is a rental which is taxable.", R067),
        src(NE, "Reg-1-067.07, Aircraft and Related Services", REG067,
          "A retailer of aircraft as provided in 067.06 may, in lieu of paying tax on the sales price of the aircraft, elect to pay use tax on the gross receipts realized from the use of such aircraft.", R067),
      ],
    },
    instruction: {
      status: "conditional",
      answer:
        "Private pilot lessons and all dual instruction are exempt when the instructor owns the aircraft or works for its owner. The school pays tax when it buys the aircraft, or elects to pay use tax on the aircraft's gross receipts instead. Solo rentals, where the customer is the pilot, are taxable.",
      sources: [
        src(NE, "Reg-1-067.04, Aircraft and Related Services", REG067,
          "Charges for flying lessons to obtain a private pilot's license and all dual instruction, banner towing, crop-dusting, patrols, air ambulance, search and rescue, livestock feeding, sky diving and parachuting, and charter services, when the pilot or instructor is the owner of the aircraft or employed by the aircraft owner, are exempt.", R067),
        src(NE, "Reg-1-067.04, Aircraft and Related Services", REG067,
          "Except as provided in 067.02, the purchase or use of an aircraft in providing such services is taxable based on the sales price to the purchaser.", R067),
        src(NE, "Reg-1-067.05, Aircraft and Related Services", REG067, "If a customer, rather than the aircraft owner, furnishes the pilot, the use of the airplane is a rental which is taxable.", R067),
      ],
    },
    maintenance: {
      status: "taxable",
      answer:
        "Repair parts are taxable, and so is repair labor on taxable property, even when stated separately. A nonresident's aircraft not based or registered in Nebraska is exempt on parts and repair services delivered at an airport if it leaves within ten days.",
      sources: [
        src(NE, "Reg-1-067.03, Aircraft and Related Services", REG067, "Aircraft and repair parts sold for private use or business use other than as a common or contract carrier are taxable.", R067),
        src(NE, "Reg-1-082.03B, Labor Charges", REG082,
          "Charges for installation and repair labor are taxable when the item of property being installed, repaired, or replaced is taxable and is not annexed to real property.", { dated: "February 22, 2009" }),
        src(NE, "Reg-1-082.04, Labor Charges", REG082,
          "Taxable charges for labor performed on tangible personal property are taxable regardless of whether they are separately stated on the same sales invoice or are separately invoiced.", { dated: "February 22, 2009" }),
        src(NE, "Reg-1-067.03B, Aircraft and Related Services", REG067,
          "A nonresident individual, or other person with a business location outside this state may purchase repair parts or repair services for an aircraft in this state without the payment of tax if the aircraft will not be based or registered in this state, the parts or services are delivered at an airport, and the airplane is removed from the state within ten days.", R067),
      ],
    },
    annual: {
      status: "unclear",
      answer: "We found no Nebraska primary source on a yearly state aircraft registration fee, or on how personal property tax applies to aircraft.",
      sources: [],
      caveat: "AOPA reports a personal property tax on business aircraft with a $10,000 exemption (2015 law) and no tax on non-business aircraft; not confirmed from statute or the Department.",
    },
  },
};
