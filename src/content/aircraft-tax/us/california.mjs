import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "california",
  name: "California",
  code: "CA",
  summary:
    "California charges sales or use tax at the rate where the aircraft is hangared, and presumes an aircraft brought in within 12 months of purchase was bought for California use. Repair labor is not taxed; parts are. Counties may also charge personal property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer: "Sales or use tax at the rate for the place the aircraft is principally hangared, which varies by district.",
      sources: [
        src("California Department of Tax and Fee Administration", "Tax Guide for Purchasers of Vehicles, Vessels, and Aircraft: Aircraft", "https://cdtfa.ca.gov/industry/vehicles-vessels-aircraft/aircraft.htm",
          "The use tax rate is the same as the sales tax rate and is based on where you principally hangar the aircraft."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft bought out of state and brought into California within 12 months is presumed bought for California use if the buyer is a California resident, if it is subject to California property tax in the first 12 months, or, for a nonresident, if it is used or stored in California more than half that time. The presumption can be rebutted, and tax paid to another state is credited.",
      sources: [
        src("California Department of Tax and Fee Administration", "Aircraft tax guide", "https://cdtfa.ca.gov/industry/vehicles-vessels-aircraft/aircraft.htm",
          "it is presumed that the aircraft was purchased for use in California."),
        src("California Department of Tax and Fee Administration", "Aircraft tax guide", "https://cdtfa.ca.gov/industry/vehicles-vessels-aircraft/aircraft.htm",
          "The aircraft is subject to property tax in California during the first 12 months of ownership."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Common carrier use over 50 percent in the first 12 months; aircraft brought in within 12 months solely for repair, retrofit or modification at an FAA repair station; interstate or foreign commerce use; a nonresident whose only California use is flying it out; and purchases from close family members.",
      sources: [
        src("California Department of Tax and Fee Administration", "Aircraft tax guide", "https://cdtfa.ca.gov/industry/vehicles-vessels-aircraft/aircraft.htm", "more than 50 percent of the operational use"),
        src("California Department of Tax and Fee Administration", "Aircraft tax guide", "https://cdtfa.ca.gov/industry/vehicles-vessels-aircraft/aircraft.htm",
          "use tax does not apply to the purchase of an aircraft brought into this state within the first 12 months of ownership exclusively for the purposes of repair, retrofit, or modification."),
      ],
    },
    rental: {
      status: "taxable",
      answer:
        "A lease is a sale: the lessor collects use tax from the renter on each rental, unless the lessor paid tax on the aircraft's purchase price, in which case rentals are not taxed.",
      sources: [
        src("California Department of Tax and Fee Administration", "Regulation 1660, Leases of Tangible Personal Property", "https://cdtfa.ca.gov/lawguides/vol1/sutr/1660.html",
          "Generally, the applicable tax is a use tax upon the use in this state of the property by the lessee."),
      ],
    },
    instruction: {
      status: "conditional",
      answer:
        "Under a 1994 CDTFA annotation, an aircraft used only for instruction and never rented to qualified pilots is the school's own use: the student buys a service and no rental tax applies. If the same aircraft is also rented to any qualified pilot at the same rate, with instruction billed separately, the student's charge is a rental plus instruction.",
      sources: [
        src("California Department of Tax and Fee Administration", "Annotation 330.1860, Aircraft: Student Flight Instruction", "https://cdtfa.ca.gov/lawguides/vol2/suta/330-1860.html",
          "Student flight instruction is ordinarily considered to be a use of the aircraft by an owner-instructor.", { dated: "5/13/94" }),
      ],
      caveat: "The annotation dates from 1994. Confirm it still reflects CDTFA's position before publishing.",
    },
    maintenance: {
      status: "conditional",
      answer: "Under CDTFA's general repair guidance, repair labor is not taxable and parts are, when billed separately. When parts are 10 percent or less of a lump-sum repair bill, the shop is treated as their consumer.",
      sources: [
        src("California Department of Tax and Fee Administration", "Regulation 1546", "https://cdtfa.ca.gov/lawguides/vol1/sutr/1546.html", "10 percent or less of the total charge"),
        src("California Department of Tax and Fee Administration", "Regulation 1546, Installing, Repairing, Reconditioning", "https://cdtfa.ca.gov/lawguides/vol1/sutr/1546.html",
          "the repairman makes a separate charge for such property", { quoteExact: true }),
        src("California Department of Tax and Fee Administration", "Publication 108, Labor Charges", "https://cdtfa.ca.gov/formspubs/pub108/taxable-labor.htm",
          "Repair labor is not taxable.", { dated: "September 2018" }),
      ],
      caveat: "CDTFA's general repair guidance, not aircraft-specific; the page labels it that way.",
    },
    annual: {
      status: "taxable",
      answer: "Counties may assess personal property tax on aircraft; contact the county assessor where it is based.",
      sources: [
        src("California Department of Tax and Fee Administration", "Aircraft tax guide", "https://cdtfa.ca.gov/industry/vehicles-vessels-aircraft/aircraft.htm", "personal property tax may be due"),
      ],
    },
  },
};
