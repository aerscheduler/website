import { src } from "../sources.mjs";

const CODE = "Iowa Code 2026";
const C = (s) => `https://www.legis.iowa.gov/docs/code/${s}.pdf`;
const IAC = "Iowa Administrative Code";
const IAC_218 = "https://www.legis.iowa.gov/docs/iac/chapter/701.218.pdf";
const IAC_D = { dated: "IAC 2/5/25" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "iowa",
  name: "Iowa",
  code: "IA",
  summary:
    "Iowa exempts aircraft that register in Iowa from sales tax but charges six percent use tax on them, plus a yearly registration fee based on the list price. Flight instruction and rentals of 60 days or less are taxable services, while aircraft repair parts and labor are exempt.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "The sale of an aircraft that must register in Iowa is exempt from sales tax, but Iowa's use tax of six percent of the purchase price applies to it instead.",
      sources: [
        src(CODE, "Section 423.3(73)", C("423.3"),
          "The sales price from sales of vehicles subject to registration or subject only to the issuance of a certificate of title and sales of aircraft subject to registration under section 328.20."),
        src(CODE, "Section 423.5(1)(a)", C("423.5"),
          "an excise tax at the rate of six percent of the purchase price or installed purchase price is imposed on the following: a. The use in this state of tangible personal property as defined in section 423.1, including aircraft subject to registration under section 328.20, purchased for use in this state."),
        src(CODE, "Section 423.6(6)", C("423.6"),
          "Tangible personal property, specified digital products, or services the sales price of which is exempt from the sales tax under section 423.3, except section 423.3, subsections 39 and 73, as it relates to the sale, but not the lease or rental, of vehicles subject only to the issuance of a certificate of title and as it relates to aircraft subject to registration under section 328.20."),
      ],
      caveat:
        "Who collects the use tax on a registered aircraft (Department of Revenue or DOT at registration) was not confirmed. Because it is a use tax, local option sales tax presumably does not apply; not confirmed.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft owned by an Iowa resident, or operated or kept in Iowa for more than 30 days, must register in Iowa, and its use in Iowa owes the six percent use tax.",
      sources: [
        src(CODE, "Section 328.20(1)", C("328.20"),
          "A civil aircraft owned either wholly or in part by persons residing in this state, or operated, or otherwise controlled within the boundaries of the state for a period of more than thirty days, unless specifically excepted under this chapter, shall be registered annually with the department, by the owner thereof."),
        src(CODE, "Section 423.5(1)(a)", C("423.5"),
          "an excise tax at the rate of six percent of the purchase price or installed purchase price is imposed on the following: a. The use in this state of tangible personal property as defined in section 423.1, including aircraft subject to registration under section 328.20, purchased for use in this state."),
      ],
      caveat: "The credit for sales tax paid to another state was not located and quoted; the answer does not mention one.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Aircraft bought for a scheduled interstate FAA-certificated air carrier operation are exempt. An aircraft dealer can buy aircraft tax-free to rent out if they stay in inventory for sale and the dealer can take them back the moment a buyer appears. No fly-away exemption for nonresident buyers was found.",
      sources: [
        src(CODE, "Section 423.3(74)", C("423.3"),
          "The sales price from the sale of aircraft for use in a scheduled interstate federal aviation administration certificated air carrier operation."),
        src(CODE, "Section 423.3(77)(a)", C("423.3"),
          "The sales price from the sale of aircraft to an aircraft dealer who in turn rents or leases the aircraft if all of the following apply: (1) The aircraft is kept in the inventory of the dealer for sale at all times. (2) The dealer reserves the right to immediately take the aircraft from the renter or lessee when a buyer is found."),
      ],
      caveat: "Searched 423.3 for \"nonresident\" and \"removed\"; no aircraft fly-away provision. How a sale to a nonresident who flies out within 30 days is treated is not stated.",
    },
    rental: {
      status: "taxable",
      answer: "Renting an aircraft for 60 days or less is a taxable service, including an aircraft carrying only the pilot. Charter transportation is not a taxable flying service.",
      sources: [
        src(IAC, "Rule 701-218.9(1)", IAC_218, "Persons engaged in the business of renting aircraft for 60 days or less are selling a service subject to sales tax.", IAC_D),
        src(IAC, "Rule 701-218.9(2)", IAC_218, "“Aircraft” also includes any drone aircraft or any aircraft transporting only the pilot.", IAC_D),
        src(IAC, "Rule 701-218.8(2)", IAC_218,
          "Flying services do not include those relating to agricultural aerial application, those relating to aerial commercial and chartered transportation services,", IAC_D),
      ],
      caveat: "Leases longer than 60 days are not addressed in these rules. The IAC prints rule numbers with a long dash after 701; a hyphen is used here.",
    },
    instruction: {
      status: "taxable",
      answer:
        "Flight instruction is a taxable \"flying service\" in Iowa. Instructor time, ground school, dual instruction and the aircraft rental in a lesson are all taxable.",
      sources: [
        src(IAC, "Rule 701-218.8(1)", IAC_218,
          "Persons engaged in the business of teaching a course of instruction in the art of operation and flying of an airplane, and instructions in repairing, renovating, reconditioning an airplane, or any other related service are selling a service subject to sales tax.", IAC_D),
        src(IAC, "Rule 701-218.8(3)", IAC_218,
          "Taxable charges include but are not limited to the sales price for the following: a. Instructors' services, ground instruction, and ground school. b. Students learning to fly with an instructor and dual flying. c. Rental of a plane.", IAC_D),
        src(CODE, "Section 423.2(6)(s)", C("423.2"), "Flying service."),
      ],
    },
    maintenance: {
      status: "exempt",
      answer:
        "Parts permanently attached to an aircraft, and all aircraft repair, remodeling and maintenance services on aircraft, engines and components, are exempt from sales tax.",
      sources: [
        src(CODE, "Section 423.3(76)", C("423.3"),
          "The sales price from the sale of tangible personal property permanently affixed or attached as a component part of the aircraft, including but not limited to repair or replacement materials or parts; and the sales price of all services used for aircraft repair, remodeling, and maintenance services when such services are performed on aircraft, aircraft engines, or aircraft component materials or parts."),
        src(CODE, "Section 423.3(76)", C("423.3"), "For the purposes of this exemption, “aircraft” means the same as defined in section 328.1."),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft register every year with the Iowa Department of Transportation. The first year's fee is one percent of the manufacturer's list price, falling to one quarter of one percent from the fourth year, never less than thirty-five dollars or more than five thousand dollars. Antique aircraft 30 years or older used only noncommercially pay thirty-five dollars.",
      sources: [
        src(CODE, "Section 328.21(1)", C("328.21"),
          "Unless otherwise provided in this section, for the first registration, a sum equal to one percent of the manufacturer's list price of the aircraft, not to exceed five thousand dollars."),
        src(CODE, "Section 328.21(2)", C("328.21"),
          "The second year's registration fee is seventy-five hundredths of one percent of the manufacturer's list price of the aircraft; the third year's fee is fifty hundredths of one percent; and the fourth and subsequent year's fee is twenty-five hundredths of one percent."),
        src(CODE, "Section 328.21(2)", C("328.21"),
          "However, an aircraft shall not be registered for a fee of less than thirty-five dollars or more than five thousand dollars."),
        src(CODE, "Section 328.21(5)", C("328.21"),
          "An aircraft thirty years old or older, which is used exclusively for noncommercial purposes, shall be registered as an antique aircraft for a fee of thirty-five dollars."),
      ],
      caveat: "Whether registration is in lieu of property tax was not confirmed. Used aircraft are charged by years previously registered in Iowa (328.21(2)), which the answer simplifies.",
    },
  },
};
