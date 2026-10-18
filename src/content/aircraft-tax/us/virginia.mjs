import { src } from "../sources.mjs";

const CH15 = "https://law.lis.virginia.gov/vacodefull/title58.1/chapter15/";
const CH6 = "https://law.lis.virginia.gov/vacodefull/title58.1/chapter6/";
const S515 = "https://law.lis.virginia.gov/vacode/title5.1/chapter1/section5.1-5/";
const S3506 = "https://law.lis.virginia.gov/vacode/title58.1/chapter35/section58.1-3506/";
const CODE = "Code of Virginia";
const PARTS =
  "Beginning July 1, 2018, and ending July 1, 2030, parts, engines, and supplies used for maintaining, repairing, or reconditioning aircraft or any aircraft's avionics system, engine, or component parts.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "virginia",
  name: "Virginia",
  code: "VA",
  summary:
    "Virginia charges a 2 percent aircraft sales and use tax in place of its retail sales tax, with a 60-day fly-away exemption for aircraft registered elsewhere. Repair parts for aircraft of 2,400 pounds or more are exempt through June 2030, and aircraft register with the Department of Aviation and pay local personal property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Two percent of the sale price of each aircraft sold in Virginia, with no deduction for trade-ins. It is collected by the Tax Commissioner before the Department of Aviation registers the aircraft, and the retail sales tax does not apply to aircraft taxed this way.",
      sources: [
        src(CODE, "Va. Code 58.1-1502(1)", CH15, "Two percent of the sale price of each aircraft sold in the Commonwealth."),
        src(CODE, "Va. Code 58.1-1501, Sale price", CH15,
          "\"Sale price\" means the total price paid for an aircraft and all attachments thereon and accessories thereto, exclusive of any federal manufacturer's excise tax, without any allowance or deduction for trade-ins or unpaid liens or encumbrances."),
        src(CODE, "Va. Code 58.1-609.1(5)", CH6, "Aircraft subject to tax under Chapter 15 (§ 58.1-1500 et seq.)."),
      ],
      caveat: "Answer spells 'Two percent' as the statute does. Whether a private sale is a 'retail sale' is not separately addressed; the definition of 'Sale' covers any transfer of ownership.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft bought elsewhere and required to be registered in Virginia owes two percent of its sale price. If it is registered six months or more after acquisition, the tax is two percent of the lower of market value or purchase price. Tax paid to another state on the purchase is credited, up to the Virginia tax.",
      sources: [
        src(CODE, "Va. Code 58.1-1502(2)", CH15,
          "However, if the aircraft is licensed in the Commonwealth six months or more after its acquisition, the tax shall be two percent of the market value of such aircraft at the time it is licensed or two percent of the purchase price thereof, whichever is lower."),
        src(CODE, "Va. Code 58.1-1504", CH15,
          "The amount of the credit shall be equal to the tax paid by him to another state by reason of the imposition of a similar tax on his purchase or use of the property or the amount of Virginia retail sales and use tax paid on the component parts of such assembled aircraft."),
        src(CODE, "Va. Code 5.1-5(A)", S515,
          "Every resident of the Commonwealth owning a civil aircraft, every nonresident owning a civil aircraft based in the Commonwealth for more than 90 days during any 12-month period, and every owner of an aerial application aircraft operating within the Commonwealth or of a civil aircraft operated in the Commonwealth as a for-hire intrastate air carrier shall register such aircraft with the Department before such aircraft is operated in the Commonwealth."),
      ],
      caveat: "5.1-5 uses 90 days for nonresident registration; 58.1-1505(D) refers to use tax on aircraft 'based in the Commonwealth for over 60 days in any 12-month period'. Both quoted; the two figures are not reconciled in the Code.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft sold in Virginia but registered outside it is exempt if removed within 60 days of purchase. Scheduled air carriers under Parts 121, 129 or 135, government aircraft, certain charities and display-only warbirds built in 1954 or earlier are exempt. Aircraft brought in only for major maintenance or repair need not register.",
      sources: [
        src(CODE, "Va. Code 58.1-1505(D)", CH15,
          "Any aircraft sold in the Commonwealth as evidenced by Federal Aviation Administration Bill of Sale AC Form 8050-2 and registered outside of the Commonwealth as evidenced by Federal Aviation Administration Aircraft Registration AC Form 8050-1 shall be exempt from the sales tax imposed by this chapter, so long as the aircraft is removed from the Commonwealth within 60 days of the date of purchase on the Bill of Sale."),
        src(CODE, "Va. Code 58.1-1501, Scheduled air service", CH15,
          "\"Scheduled air service\" means any scheduled service provided by an air carrier or foreign air carrier operating pursuant to authority issued by the U.S. Department of Transportation and under Federal Aviation Regulations, Parts 121, 129 or 135."),
        src(CODE, "Va. Code 58.1-1505(B)", CH15,
          "Aircraft that are (i) considered Warbirds, manufactured and intended for military use, excluding those manufactured after 1954"),
        src(CODE, "Va. Code 5.1-5(C)", S515,
          "Notwithstanding the provisions of subsection A, no aircraft shall be required to be registered if the aircraft is brought into the Commonwealth solely for major maintenance or major repair."),
      ],
    },
    rental: {
      status: "unclear",
      answer:
        "Virginia's aircraft tax defines a sale to include a lease or rental, but taxes rental receipts directly only for commercially licensed aircraft held by a dealer who elects to pay two percent of monthly gross receipts. How ordinary hourly rentals of an aircraft already taxed at purchase are treated is not stated.",
      sources: [
        src(CODE, "Va. Code 58.1-1501, Sale", CH15,
          "\"Sale\" means any transfer of ownership or possession of an aircraft by exchange or barter, lease or rental, conditional or otherwise, in any manner or by any means whatsoever."),
        src(CODE, "Va. Code 58.1-1502(3)", CH15,
          "Two percent of the monthly gross receipts from the lease, charter or other use of any aircraft licensed for commercial use pursuant to § 5.1-5 B and held for sale by a dealer who has elected to be taxed under this paragraph as provided in § 58.1-1507."),
      ],
      caveat: "No Virginia Tax guidance page on aircraft rental found (tax.virginia.gov/aircraft-sales-and-use-tax returned no content).",
    },
    instruction: {
      status: "unclear",
      answer:
        "For a dealer paying on gross receipts, charges for pilots or instructors in the aircraft are taxed unless separately stated on the invoice. Virginia publishes no guidance on instruction charges at other schools.",
      sources: [
        src(CODE, "Va. Code 58.1-1501, Gross receipts", CH15,
          "\"Gross receipts\" means the charges made or voluntary contributions received for the hourly rental and maintenance of an aircraft, all other charges for the use of an aircraft and, unless separately stated on the invoice, all charges for services of pilots or instructors in such aircraft."),
      ],
      caveat: "The gross receipts measure applies only under the dealer election in 58.1-1502(3) and 58.1-1507.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Until July 1, 2030, parts, engines and supplies used to maintain or repair aircraft, avionics and engines are exempt, for manned aircraft with a maximum takeoff weight of at least 2,400 pounds. Tools are not. Separately charged repair labor is not taxed.",
      sources: [
        src(CODE, "Va. Code 58.1-609.10(20)", CH6, PARTS),
        src(CODE, "Va. Code 58.1-609.10(20)", CH6,
          "However, for manned systems, \"aircraft\" shall include only aircraft with a maximum takeoff weight of at least 2,400 pounds."),
        src(CODE, "Va. Code 58.1-609.5(2)", CH6,
          "An amount separately charged for labor or services rendered in installing, applying, remodeling, or repairing property sold or rented."),
      ],
      caveat: "Parts for aircraft under 2,400 pounds are taxed at the retail sales tax rate (not quoted here).",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft register with the Virginia Department of Aviation, for no more than $30 a year for a noncommercial single aircraft, $55 for two years or $70 for three. Localities also tax aircraft as tangible personal property, in a separate class whose rate may not exceed that of general personal property.",
      sources: [
        src(CODE, "Va. Code 5.1-5(B)", S515,
          "The Department shall furnish any necessary forms pursuant to the issuance of noncommercial single aircraft registration and may assess a fee for such issuance not in excess of $30 annually. The Department may offer multiyear noncommercial single aircraft registrations not to exceed three years. The total fee for two-year registrations shall not exceed $55, and the total fee for three-year registrations shall not exceed $70."),
        src(CODE, "Va. Code 58.1-3506(A)(5)", S3506, "All other aircraft not included in subdivision 2, 3, or 4 and flight simulators;"),
        src(CODE, "Va. Code 58.1-3506(B)", S3506,
          "The governing body of any county, city, or town may levy a tax on the property enumerated in subsection A at different rates from the tax levied on other tangible personal property."),
        src(CODE, "Va. Code 58.1-3506(B)", S3506,
          "The rates of tax and the rates of assessment shall (i) for purposes of subdivisions A 1, 2, 3, 4, 5, 6, 8, 11 through 20, 22 through 24, 26 through 47, and 49, not exceed that applicable to the general class of tangible personal property"),
      ],
      caveat: "The fees are statutory maximums; the Department's actual fee was not checked.",
    },
  },
};
