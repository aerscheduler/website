import { src } from "../sources.mjs";

const RS302 = "https://legis.la.gov/Legis/Law.aspx?d=101816";
const RS303 = "https://legis.la.gov/Legis/Law.aspx?d=101870";
const RS305 = "https://legis.la.gov/Legis/Law.aspx?d=101873";
const RR07002 = "https://dam.ldr.la.gov/lawspolicies/RR07002.pdf";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "louisiana",
  name: "Louisiana",
  code: "LA",
  summary:
    "Louisiana charges 5 percent state sales or use tax on aircraft, plus parish and local tax, and taxes aircraft rentals and repairs. An aircraft hangared in Louisiana owes use tax even if it flies interstate, and light private aircraft are exempt from personal property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "The state sales tax rate is 5 percent since January 2025, and parish and other local sales taxes are added on top. Local rates vary by parish.",
      sources: [
        src("Louisiana Department of Revenue", "Revenue Information Bulletin 25-007, State Sales Tax Rate", "https://dam.ldr.la.gov/lawspolicies/RIB%2025-007%20-%20State%20Sales%20Tax%20Rate.pdf",
          "beginning on January 1, 2025, the Louisiana state sales tax rate is 5%.", { dated: "December 23, 2024" }),
        src("Louisiana Department of Revenue", "FAQ: What is the sales tax rate in Louisiana?", "https://revenue.louisiana.gov/tax-education-and-faqs/faqs/sales-tax/what-is-the-sales-tax-rate-in-louisiana",
          "Sales and use taxes levied by political subdivisions of the state are in addition to the sales and use taxes levied by the state."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax is due on an aircraft bought elsewhere that comes to rest in Louisiana. An airplane hangared here and based here for interstate trips owes use tax; one that only stops to refuel, for repair, or to pick up or drop off passengers does not. Sales tax paid to another state is credited only if that state grants Louisiana the same credit.",
      sources: [
        src("Louisiana Department of Revenue", "Revenue Ruling 07-002, Sales and Use Taxation of Airplanes", RR07002,
          "However, an airplane that is indefinitely hangered in Louisiana and uses Louisiana as its base of operation for interstate travel is subject to the Louisiana use tax.", { dated: "May 22, 2007" }),
        src("Louisiana Department of Revenue", "Revenue Ruling 07-002, Sales and Use Taxation of Airplanes", RR07002,
          "A commercial or private airplane that enters the state from an out-of-state point of origin for the sole purpose of re-fueling, repair, or letting off or taking on passengers or cargo is not subject to the Louisiana use tax on the basis of that entry into the state because, in such instances, the airplane would not have come to rest in the state.", { dated: "May 22, 2007" }),
        src("Louisiana Revised Statutes", "R.S. 47:303(A)(3)(a)", RS303,
          "The credit provided herein shall only be granted in the case where the state to which a similar tax has been paid grants a similar credit as provided herein"),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Louisiana does not tax bona fide interstate commerce, but the Department reads this narrowly for aircraft: the airplane must be used continuously in interstate commerce from the moment it enters the state. Flying owners or employees between states for purposes other than direct revenue production does not count.",
      sources: [
        src("Louisiana Department of Revenue", "Revenue Ruling 07-002, Sales and Use Taxation of Airplanes", RR07002,
          "In order for an airplane that is imported into Louisiana to be considered in bona fide interstate commerce during the airplane’s time of use, consumption, distribution or storage in Louisiana, such that the levy of the use tax on the airplane is barred by La. Rev. Stat. Ann. § 47:305(E), the bona fide interstate commerce activity must be continuous and uninterrupted from the moment that the airplane enters the state.", { dated: "May 22, 2007" }),
        src("Louisiana Department of Revenue", "Revenue Ruling 07-002, Sales and Use Taxation of Airplanes", RR07002,
          "Mileage to transport business owners, officers, or employees between states for purposes other than direct revenue production will not be considered bona fide interstate commerce for the airplanes used in such transportation.", { dated: "May 22, 2007" }),
      ],
      caveat:
        "Revenue Ruling 07-002 predates the 2025 sales tax reform; The interstate commerce sentence the ruling cites as R.S. 47:305(E) is now R.S. 47:305(F) (read 2026-10-18), worded the same apart from adding digital products. The exemptions for sales and leases of airplanes to Louisiana-domiciled commuter airlines (R.S. 47:301(7)(d), (10)(k)) and for Louisiana-made aircraft (47:301(10)(m)) are marked repealed effective 01/01/2025 in LDR form R-1002 (1/25). No current nonresident fly-away exemption found.",
    },
    rental: {
      status: "taxable",
      answer: "Louisiana levies sales tax on the lease or rental of tangible personal property, and an aircraft rental is not excluded. Local rental taxes apply as well.",
      sources: [
        src("Louisiana Revised Statutes", "R.S. 47:302(B)", RS302,
          "There is hereby levied a tax upon the lease or rental within this state of each item or article of tangible personal property or digital product, as defined in this Chapter."),
      ],
      caveat: "No Louisiana source distinguishes bare from wet aircraft rentals; the answer rests on the general rental levy.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Louisiana taxes only the services on its list, and flight instruction is not one of them. No Louisiana source we found says whether the aircraft time inside a lesson is a taxable rental, or how a school's aircraft purchase is treated.",
      sources: [
        src("Louisiana Department of Revenue", "FAQ: What services are subject to sales tax in Louisiana?", "https://www.revenue.la.gov/tax-education-and-faqs/faqs/sales-tax-reform/what-services-are-subject-to-sales-tax-in-louisiana",
          "The following services are subject to state (and local, unless otherwise noted) sales tax:"),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts and repair labor are both taxable; repair and maintenance of tangible personal property is a taxable service. Repairs on an aircraft that is then delivered outside the state are exempt from state (not local) tax, and painting of transport category or military aircraft registered outside Louisiana is exempt.",
      sources: [
        src("Louisiana Department of Revenue", "FAQ: What services are subject to sales tax in Louisiana?", "https://www.revenue.la.gov/tax-education-and-faqs/faqs/sales-tax-reform/what-services-are-subject-to-sales-tax-in-louisiana",
          "Repairs and maintenance of tangible personal property and digital products"),
        src("Louisiana Revised Statutes", "R.S. 47:305(E)(4)(a)", RS305,
          "However, as to aircraft, delivery may be by the best available means."),
        src("Louisiana Revised Statutes", "R.S. 47:305(E)(4)(a)", RS305,
          "The provisions of this Paragraph shall only apply to sales and use taxes levied by the state."),
        src("Louisiana Revised Statutes", "R.S. 47:305(E)(3)", RS305,
          "Surface preparation, coating, and painting of a fixed or rotary wing military aircraft or certified transport category aircraft as long as the Federal Aviation Administration registration address of the aircraft is not in this state."),
      ],
    },
    annual: {
      status: "conditional",
      answer:
        "No personal property tax is due on an aircraft with an operating empty weight under seven thousand pounds owned by an individual or LLC and flown under 14 CFR Part 91, from January 2026. Heavier or commercially used aircraft may be assessed by the parish.",
      sources: [
        src("Louisiana Revised Statutes", "R.S. 47:6001(A), as amended by Acts 2025, No. 283", "https://legis.la.gov/Legis/Law.aspx?d=102356",
          "No personal property tax shall be imposed on any aircraft with an operating empty weight less than seven thousand pounds which is owned by a private individual or limited liability company and used in 14 CFR Part 91 operation."),
      ],
      caveat: "We found no Louisiana state aircraft registration fee, but did not find a primary source saying so; how parishes assess other aircraft was not researched.",
    },
  },
};
