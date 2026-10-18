import { src } from "../sources.mjs";

const FAQ = "https://tax.ohio.gov/help-center/faqs/vehicle-taxability-compliance-aircraft/motor-vehicle-taxability-aircraft";
const ORC_573902 = "https://codes.ohio.gov/ohio-revised-code/section-5739.02";
const ORC_456118 = "https://codes.ohio.gov/ohio-revised-code/section-4561.18";
const ODT = "Ohio Department of Taxation";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "ohio",
  name: "Ohio",
  code: "OH",
  summary:
    "Ohio charges 5.75 percent state sales or use tax on aircraft plus county tax, with no fly-away exemption and no trade-in credit. Parts and repair of general aviation aircraft are exempt, bare rentals are taxed, and aircraft based in Ohio pay a yearly license tax of $15 per seat in place of other ownership taxes.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Ohio's state sales tax is five and three-fourths percent, and the county rate where the purchase takes place is added. Tax is on the total consideration, with no trade-in credit. A one-time sale by a private individual not in the business is a casual sale and not taxed, unless a broker or dealer was involved.",
      sources: [
        src("Ohio Revised Code", "R.C. 5739.02(A)(1), effective September 30, 2025", ORC_573902,
          "The rate of the tax shall be five and three-fourths per cent."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "If the aircraft was purchased in Ohio, the tax rate is based on the county where the purchase took place."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "You must pay Ohio tax based on the total amount of consideration given for the aircraft. There is no trade-in credit for aircraft."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "You do not have to pay tax if the seller was a private individual making a one-time sale and not in the business of selling aircraft. This is called a casual sale. However, if the buyer or previous owner utilized an intermediary such as a broker or dealer this would not be a casual sale."),
      ],
    },
    bringingIn: {
      status: "taxable",
      answer:
        "An aircraft bought in another state and brought to Ohio for storage owes Ohio use tax at the rate of the county where it is hangared, whether it arrives right after purchase or years later. Sales or use tax paid to other states is subtracted.",
      sources: [
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "If you buy an aircraft in another state and bring it to Ohio for storage, you still owe Ohio use tax. This holds true even if you sell the aircraft or only keep it for a few years."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "The tax rate is determined by the county in which the aircraft will be hangered."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "Regardless of the aircraft being stored in Ohio immediately after purchase or is brought to Ohio years later, the tax would still be owed. However, you can subtract any sales or use tax already paid to other states."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "There is no fly-away exemption: a purchase in Ohio is taxed even if the aircraft is kept elsewhere. An aircraft bought mainly for bare rental, or mainly for charter flights entirely inside Ohio, is exempt as a purchase for resale. There is no exemption for business use.",
      sources: [
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "There is no \"fly-away\" exemption in Ohio. Even if the plane will be stored out of state after the purchase, you still pay tax if the purchase occurred in Ohio."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "If the aircraft is used to transport people with a pilot as part of a charter service and the entire flight is inside Ohio, it is considered a transportation service and the charge for the ride is taxable. If the aircraft is primarily used for these charter trips, the original purchase would be tax exempt."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "There is no tax exemption for business use. A person or entity purchasing an aircraft to transport corporate officers would still be taxable."),
      ],
      caveat: "Charter aircraft used mainly for flights out of Ohio are taxable at purchase (same FAQ). H.B. 977 (136th GA) would add a nonresident exemption; introduced only.",
    },
    rental: {
      status: "taxable",
      answer:
        "Renting an aircraft without a pilot is a taxable sale, and the owner must hold a vendor's license and collect sales tax. A charter with a pilot entirely inside Ohio is a taxable transportation service; flights to places outside Ohio are not taxed.",
      sources: [
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "When an aircraft is rented without a pilot the sale is taxable. The owner must have a vendor's license and collect sales tax. If the plane is primarily rented without a pilot the purchase would be exempt for resale."),
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "The flights charged to customers traveling outside the state of Ohio would not be taxable."),
      ],
    },
    instruction: {
      status: "unclear",
      answer:
        "The Department says a flight school owes tax on the aircraft it buys, because it uses the aircraft to provide a service rather than reselling it. It does not say whether the instruction charge, or the aircraft time inside a lesson, is taxed.",
      sources: [
        src(ODT, "Sales Tax for Motor Vehicles, Watercraft, and Aircraft: Aircraft", FAQ,
          "Flight schools are not tax-exempt-- they owe tax on the purchase price of the plane because they are using the aircraft to provide a service, not reselling it to their customers."),
      ],
      caveat: "Flight instruction is not among the taxable services in R.C. 5739.01(B)(3), but no Department guidance says so for flight lessons. The FAQ's reasoning (school provides a service) implies lessons are a nontaxable service; not stated.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Parts, materials, engines and repair, remodeling and maintenance services for aircraft and their avionics are exempt, for aircraft of more than six thousand pounds maximum certified takeoff weight or used exclusively in general aviation.",
      sources: [
        src("Ohio Revised Code", "R.C. 5739.02(B)(49), effective September 30, 2025", ORC_573902,
          "Sales of materials, parts, equipment, or engines used in the repair or maintenance of aircraft or avionics systems of such aircraft, and sales of repair, remodeling, replacement, or maintenance services in this state performed on aircraft or on an aircraft's avionics, engine, or component materials or parts."),
        src("Ohio Revised Code", "R.C. 5739.02(B)(49), effective September 30, 2025", ORC_573902,
          "As used in division (B)(49) of this section, \"aircraft\" means aircraft of more than six thousand pounds maximum certified takeoff weight or used exclusively in general aviation."),
      ],
      caveat: "Information Release ST 2008-04 (revised 01-07-09) is the Department's longer guide; not read.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based in Ohio register every year with the Ohio Department of Transportation and pay a license tax of fifteen dollars per seat, by the manufacturer's maximum listed seating; gliders and balloons pay fifteen dollars. This tax replaces all other taxes on owning an aircraft, so there is no personal property tax.",
      sources: [
        src("Ohio Revised Code", "R.C. 4561.18(D)(1)", ORC_456118,
          "Each registration form shall be accompanied by the proper license tax, which, for all aircraft other than those described in division (D)(2) of this section, shall be at the annual rate of fifteen dollars per seat, based on the manufacturer's maximum listed seating capacity."),
        src("Ohio Revised Code", "R.C. 4561.18(D)(2)", ORC_456118, "The license tax for gliders and balloons shall be fifteen dollars annually."),
        src("Ohio Revised Code", "R.C. 4561.18(F)", ORC_456118,
          "The taxes this section requires are in lieu of all other taxes on or with respect to ownership of an aircraft."),
      ],
      caveat: "Figures spelled out in the answers because the statutes spell them. Types exempt from registration are in R.C. 4561.17(A)(1)-(5); not listed here.",
    },
  },
};
