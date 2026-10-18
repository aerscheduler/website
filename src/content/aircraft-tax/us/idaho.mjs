import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "idaho",
  name: "Idaho",
  code: "ID",
  summary:
    "Idaho charges 6 percent sales or use tax on aircraft and on bare aircraft rentals, but not on flight instruction or separately stated repair labor. Aircraft operating in Idaho register with the Idaho Transportation Department every year, at 3 cents per pound of maximum gross weight.",
  facts: {
    buying: {
      status: "taxable",
      answer: "6 percent of the sales price on each retail sale of an aircraft, under Idaho's general sales tax.",
      sources: [
        src("Idaho Code", "Section 63-3619", "https://legislature.idaho.gov/statutesrules/idstat/title63/t63ch36/sect63-3619/",
          "An excise tax is hereby imposed upon each sale at retail at the rate of six percent (6%) of the sales price"),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft bought elsewhere and used in Idaho. An LLC or other entity an Idaho resident forms in another state to own aircraft is not a nonresident, and its aircraft owes use tax on first use in Idaho.",
      sources: [
        src("Idaho Administrative Code", "IDAPA 35.01.02.037.01.c, effective 7-1-26", "https://adminrules.idaho.gov/rules/current/35/350102.pdf",
          "The use of an aircraft owned by such an entity will be subject to use tax upon its first use in Idaho."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Sales or leases to nonresidents for use outside Idaho are exempt if the aircraft leaves and is not used in Idaho more than 90 days in any 12-month period. Aircraft used primarily as common carriers or for air ambulance service are exempt, and so are parts installed on nonresidents' private aircraft by an FAA-approved Idaho repair station.",
      sources: [
        src("Idaho Code", "Section 63-3622GG(3)", "https://legislature.idaho.gov/statutesrules/idstat/title63/t63ch36/sect63-3622gg/",
          "ninety (90) days in any twelve (12) month period"),
        src("Idaho Code", "Section 63-3622GG(4)", "https://legislature.idaho.gov/statutesrules/idstat/title63/t63ch36/sect63-3622gg/",
          "nonresident privately owned aircraft by qualified employees of an FAA-approved Idaho repair station"),
      ],
    },
    rental: {
      status: "taxable",
      answer:
        "Renting an aircraft without a pilot is a taxable sale, and the owner collects tax on each rental payment. A flying club's rentals to its members are taxable bare rentals too.",
      sources: [
        src("Idaho Administrative Code", "IDAPA 35.01.02.024.01, effective 7-1-26", "https://adminrules.idaho.gov/rules/current/35/350102.pdf",
          "A bare equipment rental is a rental of equipment without an operator and is a taxable sale."),
        src("Idaho Administrative Code", "IDAPA 35.01.02.038.01", "https://adminrules.idaho.gov/rules/current/35/350102.pdf",
          "The aircraft rentals to the club members are considered bare equipment rentals and are taxable at a reasonable rental value."),
      ],
    },
    instruction: {
      status: "exempt",
      answer:
        "Flight instruction, including solo flights within the lessons, is a service and not taxed. The school's purchase or lease of aircraft used mainly for instruction is taxable.",
      sources: [
        src("Idaho Administrative Code", "IDAPA 35.01.02.037.03", "https://adminrules.idaho.gov/rules/current/35/350102.pdf",
          "Flying instructions or lessons which may include solo flights are a service and the fees are not taxable."),
        src("Idaho Administrative Code", "IDAPA 35.01.02.037.03.a", "https://adminrules.idaho.gov/rules/current/35/350102.pdf",
          "Aircraft purchased, rented, or leased to be used primarily for flying instruction are taxable."),
      ],
    },
    maintenance: {
      status: "conditional",
      answer: "Parts and materials are taxable. Repair labor is not, if it is stated separately; an unitemized repair bill is taxable in full.",
      sources: [
        src("Idaho Administrative Code", "IDAPA 35.01.02.062.02, effective 7-1-26", "https://adminrules.idaho.gov/rules/current/35/350102.pdf",
          "Separately stated repair labor isn't taxable."),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Every aircraft operating in Idaho registers with the Idaho Transportation Department each year, at 3 cents per pound of maximum certified gross weight, at least $20 and at most $600, in place of personal property tax. A nonresident's aircraft is exempt unless it operates in Idaho more than 90 days in the registration year.",
      sources: [
        src("Idaho Code", "Section 21-114", "https://legislature.idaho.gov/statutesrules/idstat/title21/t21ch1/sect21-114/", "in no case to be less than twenty dollars ($20.00) and not to exceed six hundred dollars ($600) upon any one (1) aircraft, provided that such fee shall be in lieu of all personal property taxes on such aircraft."),
        src("Idaho Code", "Section 21-114", "https://legislature.idaho.gov/statutesrules/idstat/title21/t21ch1/sect21-114/",
          "three cents (3\u00a2) per pound of the manufacturer's certified maximum gross weight"),
        src("Idaho Code", "Section 21-114", "https://legislature.idaho.gov/statutesrules/idstat/title21/t21ch1/sect21-114/",
          "a cumulative period of greater than ninety (90) days"),
      ],
    },
  },
};
