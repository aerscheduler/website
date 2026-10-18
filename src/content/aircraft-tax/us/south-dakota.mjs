import { src } from "../sources.mjs";

const SDCL = (s) => `https://sdlegislature.gov/Statutes/${s}`;
const LAW = "South Dakota Codified Laws";
const TAX_4 =
  "In addition to all other registration fees paid to the department, an additional original registration tax of four percent, based upon the purchase price of the aircraft, shall be paid to the department, along with the application for the original registration of an aircraft.";
const IN_LIEU = "Aircraft subject to the tax imposed by this chapter are exempt from taxes imposed by chapters 10-45 and 10-46.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "south-dakota",
  name: "South Dakota",
  code: "SD",
  summary:
    "South Dakota charges a one-time 4 percent registration tax on an aircraft's purchase price in place of sales tax. Parts and repairs are taxed, and every aircraft operated in the state registers each year for a fee set by weight, halved for aircraft ten years old or more.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "A four percent original registration tax on the purchase price, three percent for aircraft built and used only for agriculture, paid to the Department of Transportation with the first South Dakota registration. Aircraft subject to it are exempt from sales and use tax. A South Dakota-registered aircraft taken in trade is deducted from the price.",
      sources: [
        src(LAW, "SDCL 50-11-19", SDCL("50-11-19"), TAX_4),
        src(LAW, "SDCL 50-11-19", SDCL("50-11-19"),
          "For an initial registration of aircraft manufactured and used exclusively for agricultural purposes, the registration tax under this section is three percent."),
        src(LAW, "SDCL 50-11-19", SDCL("50-11-19"), IN_LIEU),
        src(LAW, "SDCL 50-11-19.1(1)", SDCL("50-11-19.1"),
          "For an aircraft purchase, sale, or transfer, the total consideration for the aircraft whether received in money or otherwise less the value of any aircraft taken by the seller as trade, if the aircraft traded was registered in South Dakota."),
      ],
      caveat: "The Department of Transportation administers registration (SDCL 50-11-9 'the department').",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft operated in South Dakota must be registered within thirty days, and the four percent tax applies to any aircraft not previously registered here. A person moving to South Dakota gets credit for a similar original registration tax paid in the old state, if that state grants the same to South Dakota residents.",
      sources: [
        src(LAW, "SDCL 50-11-9", SDCL("50-11-9"),
          "A person who fails to register an aircraft within thirty days after it is operated in this state is guilty of a Class 2 misdemeanor."),
        src(LAW, "SDCL 50-11-19", SDCL("50-11-19"), TAX_4),
        src(LAW, "SDCL 50-11-20(1)", SDCL("50-11-20"),
          "Aircraft, owned by a person coming into this state from another state for the purpose of making the person's home within this state, and registered in the other state, are exempt from the additional original registration tax of this state to the extent of a similar additional original registration tax previously paid in the other state upon the purchase price of the aircraft."),
      ],
      caveat: "50-11-20(1) credits a similar 'original registration tax', not explicitly another state's sales tax; whether sales tax paid elsewhere counts is not stated.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Nonresidents registered at home may fly in South Dakota up to ninety days a year without registering, if not doing intrastate commercial work. Aircraft in regularly scheduled interstate or foreign commerce, and aircraft under a dealer certificate, are exempt from sales and use tax. Seasonal agricultural applicators from reciprocal states are exempt from the registration tax.",
      sources: [
        src(LAW, "SDCL 50-11-27", SDCL("50-11-27"),
          "Any aircraft of any resident of another state, and any nonresident person, having complied with the registration requirements of that state, may be operated or operate within this state for a period of not more than ninety days in any one year without complying with this chapter if the aircraft or person is not engaged in any intrastate commercial activity within this state, and that under the laws of the state of the person's residence, like exemptions and privileges are granted to aircraft owned by residents of this state and resident persons of this state duly registered under the laws of this state."),
        src(LAW, "SDCL 50-11-19", SDCL("50-11-19"),
          "Aircraft used under a use stamp or dealer certificate, or engaged in regularly scheduled flying consisting of an act of interstate or foreign commerce, are exempt from the taxes imposed by chapters 10-45 and 10-46."),
      ],
      caveat: "Seasonal applicator exemption is 50-11-20(4). No exemption for aircraft held for rental or for flight schools found.",
    },
    rental: {
      status: "unclear",
      answer:
        "South Dakota taxes leases and rentals generally, but aircraft subject to the registration tax are exempt from sales and use tax, and no Department guidance says which rule governs aircraft rental charges.",
      sources: [src(LAW, "SDCL 50-11-19", SDCL("50-11-19"), IN_LIEU)],
      caveat: "Searched SDCL 10-45, ARSD 64:06 and Department of Revenue fact sheets for aircraft rental; nothing found.",
    },
    instruction: {
      status: "unclear",
      answer:
        "South Dakota taxes many services, and no Department of Revenue guidance or rule we found says whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
      caveat: "SDCL 10-45-4 taxes services generally with exemptions by industry code (10-45-12.1); whether flight training falls in an exempt code was not confirmed.",
    },
    maintenance: {
      status: "taxable",
      answer:
        "Parts and repairs to an aircraft, and items attached after it is registered, are subject to state and municipal sales tax.",
      sources: [
        src("South Dakota Department of Revenue", "Agricultural Services fact sheet", "https://dor.sd.gov/media/agmf2q4o/ag-services.pdf",
          "No sales tax is due on the aircraft. Parts and repairs to the aircraft, along with any item s attached after the plane is registered, are subject to the state and applicable municipal sales tax.", { dated: "July 2023" }),
      ],
      caveat: "The quote keeps the PDF's split word 'item s'. It sits in the aerial-applicator section of an agricultural fact sheet; no general aviation fact sheet found.",
    },
    annual: {
      status: "taxable",
      answer:
        "Every aircraft operated in South Dakota pays an annual registration fee by maximum take-off weight, from $25 for 1,500 pounds or less to $300 for 15,001 pounds and over. Aircraft ten years old or more pay half; newly registered aircraft bought on or after July first pay half and on or after October first a quarter.",
      sources: [
        src(LAW, "SDCL 50-11-12", SDCL("50-11-12"),
          "There shall be paid to the secretary of transportation at the time of the registration of an aircraft an annual registration fee for each such aircraft based upon its maximum permissible take-off weight to be computed as follows:"),
        src(LAW, "SDCL 50-11-12, fee table", SDCL("50-11-12"), "0 -- 1,500 $ 25"),
        src(LAW, "SDCL 50-11-12, fee table", SDCL("50-11-12"), "15,001 and over 300"),
        src(LAW, "SDCL 50-11-14", SDCL("50-11-14"),
          "If any aircraft, according to the manufacturer's records as to date of manufacture, was ten years old or more on January first of the year for which registration and fee is required, the fee required by § 50-11-12 shall be one-half of the fee ordinarily prescribed."),
        src(LAW, "SDCL 50-11-15", SDCL("50-11-15"),
          "The fee for registering any theretofore unregistered aircraft purchased on or after July first of any year shall be one-half the amount prescribed by § 50-11-12 and, as to such aircraft purchased on or after October first of any year, one-fourth of such prescribed amount."),
      ],
      caveat: "Fee-table quotes join the table cells with a space. Whether aircraft also pay local property tax was not checked.",
    },
  },
};
