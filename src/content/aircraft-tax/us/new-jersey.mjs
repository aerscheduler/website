import { src } from "../sources.mjs";

const FAQ = "https://www.nj.gov/treasury/taxation/aircraftpurchase.shtml";
const FAQ_TITLE = "Aircraft Purchases and Casual Sales Frequently Asked Questions";
const NJT = "New Jersey Division of Taxation";
const FQ = { dated: "Last Updated 09/09/25" };
const PL = "https://www.njleg.state.nj.us/9899/Bills/PL99/246_.HTM";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "new-jersey",
  name: "New Jersey",
  code: "NJ",
  summary:
    "New Jersey charges 6.625 percent sales or use tax on aircraft bought from a dealer, but a private owner's sale of a personally used aircraft is an exempt casual sale. Repairs on aircraft of 6,000 pounds or more are exempt, and there is no state aircraft registration.",
  facts: {
    buying: {
      status: "conditional",
      answer:
        "6.625% statewide on an aircraft bought from a dealer. A sale by an owner who used the aircraft personally is an exempt casual sale; it is taxable if the seller held it for resale, rental, lease or charter, or used it for flight instruction, or if a broker runs the money through its own account.",
      sources: [
        src(NJT, "Rates and Boundaries", "https://www.nj.gov/treasury/taxation/salestax.shtml", "Sales Tax is to be charged at the rate of 6.625% on January 1, 2018."),
        src(NJT, FAQ_TITLE, FAQ,
          "If the previous owner was using the airplane for his own personal use, then the subsequent sale qualifies as a casual sale under the law and Sales Tax is not due.", FQ),
        src(NJT, FAQ_TITLE, FAQ, "Examples of prior use of an aircraft by the previous owner that would cause the transaction to be taxable:", FQ),
        src(NJT, FAQ_TITLE, FAQ, "Held for rental,lease or charter;", FQ),
        src(NJT, FAQ_TITLE, FAQ, "Used for flight instruction.", FQ),
        src(NJT, FAQ_TITLE, FAQ,
          "The casual sales exemption is unavailable and tax is due if the broker runs the funds through his books/account.", FQ),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "A New Jersey resident who brings an aircraft into the state owes use tax on its value when it arrives, unless an exemption applies; an aircraft bought from a private owner who used it personally is not taxed. A nonresident storing an aircraft in New Jersey owes no tax, but owning a home or doing business in New Jersey makes you a resident for this purpose.",
      sources: [
        src(NJT, FAQ_TITLE, FAQ,
          "However, if you bring this airplane into New Jersey, you would owe Use Tax based on the value of the airplane at the time you brought it into this State, unless a valid exemption applies.", FQ),
        src(NJT, FAQ_TITLE, FAQ,
          "The purchase is taxable if the aircraft was purchased from an aircraft dealer, or an owner who used the aircraft for rental and/or leasing activity.", FQ),
        src(NJT, FAQ_TITLE, FAQ, "If you are not a resident of New Jersey, you do not owe Sales and Use Tax.", FQ),
        src(NJT, FAQ_TITLE, FAQ, "Do you maintain a permanent place of abode in New Jersey?", FQ),
        src(NJT, FAQ_TITLE, FAQ, "Are you engaged in trade, business or profession in New Jersey?", FQ),
      ],
      caveat: "We did not find a New Jersey source on credit for sales tax paid to another state on an aircraft.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Casual sales between personal-use owners are exempt, including trades. Aircraft bought to rent or lease out are exempt as a sale for resale if the buyer is registered to collect tax on the rentals. Aircraft, repairs and parts for air carriers based in New Jersey are exempt.",
      sources: [
        src(NJT, FAQ_TITLE, FAQ,
          "Subsequent transfers qualify as casual sales under the law and tax is not due as long as both owners used the airplanes for their own personal use.", FQ),
        src(NJT, FAQ_TITLE, FAQ,
          "No, the purchase qualifies as a sale for resale as long as your business is registered with New Jersey to collect and remit Sales Tax on the rental/lease of the airplane.", FQ),
        src("New Jersey Laws", "P.L.1999, c.246, N.J.S.A. 54:32B-8.35(a)", PL,
          "sales of aircraft and repairs thereto including machinery or equipment to be installed on such aircraft and replacement parts therefor when utilized by an air carrier as defined by the Civil Aeronautics Board or the Code of Federal Regulations having its principal place of operations within the State and engaging in interstate, foreign, or intrastate air commerce", { dated: "Approved October 15, 1999" }),
      ],
    },
    rental: {
      status: "taxable",
      answer: "Aircraft rentals and leases are taxable; a business renting aircraft registers to collect and remit sales tax on the rentals.",
      sources: [
        src(NJT, FAQ_TITLE, FAQ,
          "No, the purchase qualifies as a sale for resale as long as your business is registered with New Jersey to collect and remit Sales Tax on the rental/lease of the airplane.", FQ),
      ],
    },
    instruction: {
      status: "unclear",
      answer:
        "We found no New Jersey source on whether flight instruction, or the aircraft time inside a lesson, is taxed. The Division does say a used aircraft that the seller used for flight instruction is not a casual sale, so its later sale is taxable.",
      sources: [
        src(NJT, FAQ_TITLE, FAQ, "Examples of prior use of an aircraft by the previous owner that would cause the transaction to be taxable:", FQ),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Repairs, installed equipment and replacement parts on aircraft with a maximum certificated takeoff weight of 6,000 pounds or more are exempt. Lighter aircraft get no aircraft repair exemption.",
      sources: [
        src("New Jersey Laws", "P.L.1999, c.246, N.J.S.A. 54:32B-8.35(b)", PL,
          "repairs on aircraft having a maximum certificated takeoff weight, as contained in the certificate type issued by the Federal Aviation Administration, of 6,000 pounds or more, including machinery or equipment to be installed on such aircraft and replacement parts therefor are exempt from the tax imposed under the Sales and Use Tax Act.", { dated: "Approved October 15, 1999" }),
        src(NJT, "Sales and Use Tax", "https://www.nj.gov/treasury/businesses/salestax/index.shtml",
          "New Jersey assesses a 6.625% Sales Tax on sales of most tangible personal property, specified digital products, and certain services unless specifically exempt under New Jersey law."),
      ],
      caveat: "The statute is quoted from the 1999 chapter law; a commercial code service shows the same text current through L. 2023, c. 256, but the official codified text was not read. That repair labor on lighter aircraft is taxable follows from the exemption's wording; no Division page on aircraft repair labor was found.",
    },
    annual: {
      status: "none",
      answer: "New Jersey has no state aircraft registration or registration fee.",
      sources: [
        src("New Jersey Department of Transportation", "Aviation FAQs", "https://www.nj.gov/transportation/freight/aviation/faqs.shtm",
          "New Jersey has no state registration requirements or fees for aircraft."),
      ],
      caveat: "Whether New Jersey municipalities tax aircraft as personal property was not researched.",
    },
  },
};
