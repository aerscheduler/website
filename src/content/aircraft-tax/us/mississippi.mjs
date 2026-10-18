import { src } from "../sources.mjs";

const RULE = "https://sos.ms.gov/adminsearch/ACProposed/00027645b.pdf";
const RULE_TITLE = (n) => `Miss. Admin. Code 35.IV.11.03.${n}, Aircraft`;
const D = { dated: "revised effective October 20, 2024" };
const ADMIN = "Mississippi Administrative Code (Department of Revenue)";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "mississippi",
  name: "Mississippi",
  code: "MS",
  summary:
    "Mississippi taxes aircraft sales and rentals at a special 3 percent rate instead of the regular 7 percent. Repair and service charges are exempt, but parts are taxed at 7 percent, and an aircraft is not rented when an instructor is aboard.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Retail sales of aircraft are taxed at a special 3 percent rate, not the regular 7 percent. Accessories attached at the time of sale are taxed with the aircraft at 3 percent. If a broker fails to collect the tax, the buyer owes it to the Department directly.",
      sources: [
        src(ADMIN, RULE_TITLE(101), RULE, "Retail sales of aircraft are taxable at the special rate of 3%.", D),
        src("Mississippi Department of Revenue", "Sales Tax Rates", "https://www.dor.ms.gov/business/sales-use-tax/sales-tax-rates",
          "Trucks (greater than 10,000.00 lbs.), aircraft, semitrailers, mobile homes and modular homes ...... 3%"),
        src(ADMIN, RULE_TITLE(104), RULE,
          "Accessories permanently attached to an aircraft at the time of sale, such as radios, lights, instruments, etc., are taxable at the same rate as that of the aircraft.", D),
        src(ADMIN, RULE_TITLE(106), RULE, "The purchaser is liable for the tax if the facilitator fails to collect the Mississippi tax.", D),
        src("Mississippi Department of Revenue", "Sales Tax Rates", "https://www.dor.ms.gov/business/sales-use-tax/sales-tax-rates", "Sale of tangible personal property ...... 7%"),
      ],
      caveat: "No source we read says whether a private sale between individuals (no dealer or broker) is taxable in Mississippi.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft bought from a dealer in another state for use in Mississippi owes use tax at the same 3 percent rate. Sales tax paid to the other state's dealer is credited, with proof of payment.",
      sources: [
        src(ADMIN, RULE_TITLE(602), RULE,
          "Persons who buy aircraft or parts to repair aircraft from dealers in other states for use in Mississippi are liable for the payment of a use tax at the same rate and on the same basis as sales tax.", D),
        src(ADMIN, RULE_TITLE(602), RULE,
          "Credit for the amount of sales tax paid to the dealer in the other state is allowed against the Mississippi use tax due on such purchases.", D),
        src(ADMIN, RULE_TITLE(101), RULE, "Retail sales of aircraft are taxable at the special rate of 3%.", D),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "A helicopter exported within 48 hours and registered and first used in another state is exempt; the rule names only rotary-wing aircraft. Fixed-wing aircraft sold to or used by certified common carriers, offshore oil and gas transport aircraft, and aircraft bought for resale or rental are exempt.",
      sources: [
        src(ADMIN, RULE_TITLE(203), RULE,
          "The gross proceeds from the sale of rotary-wing aircraft if exported from this state within forty-eight (48) hours and registered and first used in another state are exempt from sales tax.", D),
        src(ADMIN, RULE_TITLE(205), RULE,
          "Sales, leases, or other retail transfers of fixed-wing aircraft to, or to be used by, certified common carriers that transport people or property within and outside of the State, as well as engines, accessories and spare parts for such aircraft are exempt from sales tax.", D),
        src(ADMIN, RULE_TITLE(206), RULE,
          "Sales of aircraft, accessories, repair parts and labor to licensed retailers for resale or rental in the regular course of business are exempt from sales and use tax.", D),
      ],
      caveat: "A dealer's sale is presumed made in Mississippi unless the dealer can show delivery outside the state for first use elsewhere (rule 501). We found no general fixed-wing fly-away exemption.",
    },
    rental: {
      status: "taxable",
      answer: "Aircraft rentals are taxed at the same rate as a sale of the aircraft, 3 percent. Separately invoiced fuel and hangar storage charges are not taxed.",
      sources: [
        src(ADMIN, RULE_TITLE(302), RULE, "Income from renting or leasing tangible personal property is taxed at the same rates as sales of the same property.", D),
        src(ADMIN, RULE_TITLE(101), RULE, "Retail sales of aircraft are taxable at the special rate of 3%.", D),
        src(ADMIN, RULE_TITLE(303), RULE,
          "Rebilling or pass through fuel charges are not considered to be taxable rental income when separately invoiced from the charge for rental or lease.", D),
      ],
    },
    instruction: {
      status: "conditional",
      answer:
        "An aircraft is not rented when an instructor is aboard with the student for instruction, so dual lessons carry no rental tax. Solo time is an ordinary rental. A school's aircraft bought to rent out is exempt as a purchase for rental.",
      sources: [
        src(ADMIN, RULE_TITLE(302), RULE, "An aircraft is not rented when an instructor accompanies a student for purposes of instruction.", D),
        src(ADMIN, RULE_TITLE(206), RULE,
          "Sales of aircraft, accessories, repair parts and labor to licensed retailers for resale or rental in the regular course of business are exempt from sales and use tax.", D),
      ],
      caveat: "No source says outright that the instruction fee itself is untaxed; flight instruction is not on the Department's list of taxable services, and the solo-rental reading follows from rule 302.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Repair and service charges on aircraft are exempt, but parts are taxed at 7 percent. A repair shop pays the 7 percent on parts it pulls for a job and does not charge tax on the repair bill. Parts for out-of-state aircraft used only in interstate transportation are exempt.",
      sources: [
        src(ADMIN, RULE_TITLE(102), RULE, "All charges for repairs and servicing to aircraft are exempt from sales tax.", D),
        src(ADMIN, RULE_TITLE(103), RULE,
          "Any facility operating as a repair/service center and aircraft parts dealer will be required to collect and remit Mississippi sales tax at the rate of 7% on all sales from parts and remit sales tax at the rate of 7% on the cost of parts withdrawn from inventory for use in the performance of a repair or service.", D),
        src(ADMIN, RULE_TITLE(103), RULE, "Tax will not be due on the repair or service charge, including the provided parts, billed to the consumer.", D),
        src(ADMIN, RULE_TITLE(202), RULE,
          "Sales of parts used in the repair and servicing of aircraft not registered in Mississippi engaged exclusively in the business of foreign or interstate transportation to businesses engaged in aircraft repair and maintenance are exempt from sales tax.", D),
      ],
    },
    annual: {
      status: "unclear",
      answer: "We found no Mississippi primary source on a yearly state aircraft registration fee, or on how counties tax aircraft as property.",
      sources: [],
    },
  },
};
