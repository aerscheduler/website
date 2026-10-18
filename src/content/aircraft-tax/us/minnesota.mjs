import { src } from "../sources.mjs";

const S82 = "https://www.revisor.mn.gov/statutes/cite/297A.82";
const S62 = "https://www.revisor.mn.gov/statutes/cite/297A.62";
const S531 = "https://www.revisor.mn.gov/statutes/cite/360.531";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "minnesota",
  name: "Minnesota",
  code: "MN",
  summary:
    "Minnesota charges its 6.5 percent sales or use tax plus an additional 0.375 percent and local tax on aircraft, including private sales. It taxes bare rentals but not flight instruction, or parts for aircraft operated under Part 91 or Part 135. Aircraft also pay a yearly registration tax set by list price, from $100, in place of property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "A 6.5 percent state sales tax plus an additional 0.375 percent required by the state constitution, and any local sales tax. Private sales are taxable too: the occasional sale exemption does not apply to aircraft, and the buyer pays use tax when registering the aircraft.",
      sources: [
        src("Minnesota Statutes", "Section 297A.62, subdivision 1", S62,
          "Except as otherwise provided in subdivision 3 or in this chapter, a sales tax of 6.5 percent is imposed on the gross receipts from retail sales as defined in section 297A.61, subdivision 4, made in this state or to a destination in this state by a person who is required to have or voluntarily obtains a permit under section 297A.83, subdivision 1."),
        src("Minnesota Statutes", "Section 297A.62, subdivision 1a", S62,
          "Except as otherwise provided in subdivision 3 or in this chapter, an additional sales tax of 0.375 percent, as required under the Minnesota Constitution, article XI, section 15, is imposed on the gross receipts from retail sales"),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Taxable Sales", "https://www.revenue.state.mn.us/guide/taxable-sales-1",
          "Aircraft dealers must charge the Minnesota general sales tax rate and any applicable local sales taxes at the time of sale, unless the sale qualifies for an exemption."),
        src("Minnesota Statutes", "Section 297A.82, subdivision 1", S82,
          "The exemption for an occasional sale under section 297A.67, subdivision 23, or 297A.68, subdivision 25, does not apply to the sale or purchase of an aircraft."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax is due on an aircraft owned and used in Minnesota without Minnesota sales tax, plus local use tax where it is hangared. Sales tax paid to another state is credited; if that state's rate was lower, the owner pays the difference. Tax is settled when the aircraft is registered with MnDOT.",
      sources: [
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Purchases and Use Tax", "https://www.revenue.state.mn.us/guide/purchases-and-use-tax-1",
          "You owe use tax if you own and use an aircraft in Minnesota but did not pay Minnesota sales tax. If you purchase, hangar, or store the aircraft in an area that has a local tax, you also owe local use tax."),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Purchases and Use Tax", "https://www.revenue.state.mn.us/guide/purchases-and-use-tax-1",
          "If the other state has a lower sales tax rate, you owe the difference to Minnesota as use tax."),
        src("Minnesota Statutes", "Section 297A.82, subdivision 1", S82,
          "An aircraft must not be registered or licensed in this state unless the applicant presents proof that the sales or use tax imposed by this chapter has been paid or that the transaction is exempt from the sales and use tax."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "A nonresident who takes delivery in Minnesota is exempt if the aircraft leaves, is registered in another state or country, and returns only for interstate commerce or occasional use; up to ten days of training in Minnesota first is allowed. Airline equipment is exempt only for aircraft of 30,000 pounds or more. Aircraft bought to lease out are exempt as resale.",
      sources: [
        src("Minnesota Statutes", "Section 297A.82, subdivision 4(e)", S82,
          "This exemption applies even if the purchaser takes possession of the aircraft in Minnesota and uses the aircraft in the state exclusively for training purposes for a period not to exceed ten days prior to removing the aircraft from this state."),
        src("Minnesota Statutes", "Section 297A.82, subdivision 4(d)", S82,
          "For purposes of this subdivision, \"air flight equipment\" includes airplanes and parts necessary for the repair and maintenance of such air flight equipment, and flight simulators, but does not include aircraft with a maximum takeoff weight of less than 30,000 pounds."),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Nontaxable Sales", "https://www.revenue.state.mn.us/guide/nontaxable-sales-2",
          "Aircraft and aircraft parts bought for resale or leasing are not taxable."),
      ],
    },
    rental: {
      status: "conditional",
      answer:
        "Rentals and leases without a pilot are taxable. Rentals with a pilot, including charter, are not taxed, but the operator pays tax when it buys the aircraft. A flying club's charges to its members, including dues and aircraft usage, are taxable.",
      sources: [
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Leases and Rentals", "https://www.revenue.state.mn.us/guide/leases-and-rentals", "Leases and rentals of aircraft that do not provide a pilot are taxable."),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Leases and Rentals", "https://www.revenue.state.mn.us/guide/leases-and-rentals", "Leases or rentals of aircraft that provide a pilot to operate the aircraft are not taxable."),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Flying Clubs", "https://www.revenue.state.mn.us/guide/flying-clubs", "The club or association must charge sales tax on all member or shareholder fees."),
      ],
    },
    instruction: {
      status: "conditional",
      answer:
        "Flight instruction fees are not taxed, but aircraft rental is, along with books and manuals. If the rental is separately stated the school collects tax on it; if it is bundled into the instruction fee, the school owes use tax on its own use of the aircraft.",
      sources: [
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Nontaxable Sales, Flight Instruction", "https://www.revenue.state.mn.us/guide/nontaxable-sales-2",
          "Flight instruction fees are not taxable. But tax is due on aircraft rentals or leases, and on other related products (books, manuals) unless an exemption applies."),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Nontaxable Sales, Flight Instruction", "https://www.revenue.state.mn.us/guide/nontaxable-sales-2",
          "If the items are included in the flight instruction fee, the instructor is responsible for reporting and paying any use tax due on these items."),
        src("Minnesota Statutes", "Section 297A.82, subdivision 6(b)", S82,
          "However, a proportionate share of the lease payment reflecting use for flight instruction or charter service is taxable under section 297A.63."),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Equipment, parts and installation labor to repair, maintain or upgrade aircraft operated under Part 91 or Part 135 are exempt. For other aircraft, parts are taxable; separately stated repair labor is not. Ultralights and sport planes do not get the parts exemption.",
      sources: [
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Nontaxable Sales, Repair and Maintenance", "https://www.revenue.state.mn.us/guide/nontaxable-sales-2",
          "Equipment, parts, and installation labor to repair, maintain or upgrade aircraft are not taxable if the aircraft operate under one of these Federal Aviation Regulations:"),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Nontaxable Sales, Other Nontaxable Sales", "https://www.revenue.state.mn.us/guide/nontaxable-sales-2", "Repair labor, if separately stated on the bill or invoice"),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Nontaxable Sales, Repair and Maintenance", "https://www.revenue.state.mn.us/guide/nontaxable-sales-2", "Note: The air-flight exemption does not apply to ultralights and sport-planes."),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft using Minnesota airspace pay a yearly aircraft registration tax, in place of all other taxes on the aircraft, set by the manufacturer's list price: $100 up to $500,000, $200 up to $1,000,000, then rising in steps to $75,000 over $40,000,000. A Minnesota resident registers on acquiring an aircraft; a nonresident registers after more than 60 days of operation in a year.",
      sources: [
        src("Minnesota Statutes", "Section 360.531, subdivision 1", S531,
          "All aircraft using the air space overlying the state of Minnesota or the airports thereof, except as set forth in section 360.55, shall be taxed in lieu of all other taxes thereon, on the basis and at the rate for each fiscal year as follows."),
        src("Minnesota Statutes", "Section 360.531, subdivision 2", S531, "Not over $500,000 $100 over $500,000 but not over $1,000,000 $200"),
        src("Minnesota Statutes", "Section 360.531, subdivision 2", S531, "over $40,000,000 $75,000"),
        src("Minnesota Statutes", "Section 360.531, subdivision 4(a)", S531, "The base price for taxation of an aircraft shall be the manufacturer's list price."),
        src("Minnesota Department of Revenue", "Aircraft Industry Guide: Registration Information", "https://www.revenue.state.mn.us/guide/registration-information", "Operates the aircraft in Minnesota for more than 60 days of the year"),
      ],
    },
  },
};
