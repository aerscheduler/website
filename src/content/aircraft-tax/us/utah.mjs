import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "utah",
  name: "Utah",
  code: "UT",
  summary:
    "Utah taxes aircraft as vehicles, at the rate for the aircraft's FAA registration address, and private sales are taxed too. Flight school rentals with an instructor present or supervising are not taxed, but solo rentals and repair labor are, and aircraft register every year with UDOT's Division of Aeronautics.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Aircraft that must be registered are treated as vehicles and taxed at the combined rate for the aircraft's registration address on file with the FAA. A trade-in reduces the taxable price. Buying from a private seller does not avoid the tax.",
      sources: [
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "The jurisdiction tax rate used is based on the aircraft's registration address filed with the FAA."),
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "Although an exemption exists for 'isolated or occasional sales,' that exemption does not apply to sales of vehicles that require registration, including aircraft."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An individual's aircraft stored and operated in Utah, wherever the owner lives, owes Utah tax if it is operated here more than six months or for most days of a year. An aircraft not used or stored in Utah can show no tax is due.",
      sources: [
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "the aircraft is operated in the state for more than six months, or the cumulative majority of days in a year"),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Private and occasional sales are not exempt. Work by a Utah maintenance, repair and overhaul provider on a fixed-wing turbine aircraft not registered in Utah is exempt.",
      sources: [
        src("Utah State Tax Commission", "Publication 25, Sales and Use Tax General Information", "https://files.tax.utah.gov/tax/forms/2025/pub-25.pdf",
          "Sales to or by a Utah aircraft maintenance, repair and overhaul provider to maintain, repair, overhaul or refurbish a fixed-wing turbine-powered aircraft that is not registered in Utah.", { dated: "Rev. 10/24" }),
      ],
    },
    rental: {
      status: "taxable",
      answer: "Renting an aircraft to a pilot without an instructor is taxed on the rental price.",
      sources: [
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "Any aircraft rented to pilots without an instructor are subject to sales tax on the rental price."),
      ],
    },
    instruction: {
      status: "exempt",
      answer:
        "A flight school's rental is not taxed when the school requires the instructor to be in the aircraft with the student or supervising from the ground. The school pays sales or use tax on its own purchase or lease of the aircraft.",
      sources: [
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "requires the instructor to be physically present in the plane with the student"),
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "Sales or use tax is due on the purchase or lease of the aircraft by the flight school."),
      ],
    },
    maintenance: {
      status: "taxable",
      answer: "Both parts and repair labor are taxed, unless the item being repaired or the part is itself exempt.",
      sources: [
        src("Utah State Tax Commission", "Publication 25", "https://files.tax.utah.gov/tax/forms/2025/pub-25.pdf",
          "Repair charges for labor are subject to sales tax unless the personal property being repaired is exempt under \u00a759-12-104.", { dated: "Rev. 10/24" }),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft must be registered every year with the Utah Department of Transportation's Division of Aeronautics. The fee is set by the Division and is not stated on the Tax Commission's page.",
      sources: [
        src("Utah State Tax Commission", "Aircraft Sales Tax", "https://tax.utah.gov/sales/aircraft-sales-tax",
          "Aircraft must be registered annually with the Utah Department of Transportation, Division of Aeronautics."),
      ],
      caveat: "Add the registration fee from Utah Code 72-10-110 once its text can be read (le.utah.gov renders it client-side).",
    },
  },
};
