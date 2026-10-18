import { src } from "../sources.mjs";

const REV832 = "https://www.pa.gov/content/dam/copapwp-pagov/en/revenue/documents/formsandpublications/formsforbusinesses/sut/documents/rev-832.pdf";
const RULE = "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/061/chapter58/s58.8.html";
const TRC204 = "https://www.palegis.us/statutes/unconsolidated/law-information/view-statute?SESSYR=1971&SESSIND=0&ACTNUM=2&SMTHLWIND=&CHPT=2&SCTN=4&SUBSCTN=";
const DOR = "Pennsylvania Department of Revenue";
const CODE = "Pennsylvania Code";
const RULE_TITLE = "61 Pa. Code 58.8";
const RULE_DATED = { dated: "effective March 10, 1984" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "pennsylvania",
  name: "Pennsylvania",
  code: "PA",
  summary:
    "Pennsylvania charges 6 percent sales or use tax on fixed-wing aircraft, 7 percent in Allegheny County and 8 percent in Philadelphia, including on private sales. Helicopters, aircraft parts and aircraft services are exempt, and flight instruction is not taxed though the aircraft rental inside a lesson is.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "6 percent sales tax on the purchase price less any trade-in, 7 percent for Allegheny County addresses or use and 8 percent for Philadelphia. Casual sales between private parties are taxable too. Helicopters and similar rotorcraft are exempt.",
      sources: [
        src(DOR, "Instructions for Form REV-832, Aircraft Sales and Use Tax Return", REV832,
          "If the address of the purchaser is in Pennsylvania, or if the aircraft is used in Pennsylvania after purchase, the 6 percent (0.06) tax rate applies. The 7 percent (0.07) tax rate applies to Allegheny County addresses or use and the 8 percent (0.08) tax rate applies to Philadelphia County addresses or use.", { dated: "REV-832 IN (DR) 10-24" }),
        src(CODE, RULE_TITLE + "(b)(1)", RULE,
          "Examples of taxable transactions include casual or dealer sales or purchases of aircraft, and leases or rentals of aircraft; sales, purchases, leases or purchases of aircraft parts; and sales or purchases of repair or maintenance services.", RULE_DATED),
        src("Pennsylvania Tax Reform Code", "Section 204(68)", TRC204,
          "The sale at retail or use or lease of helicopters and similar rotorcraft, and flight simulators, as well as training materials, operational documents and publications relating to the use or operation of helicopters and similar rotorcraft and flight simulators."),
      ],
      caveat: "The 1984 rule's parts and repairs language is superseded by Section 204(69) (2013); quoted here only for casual sales. Section 204(1) excludes aircraft from the isolated-sale exclusion.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft delivered outside Pennsylvania owes use tax when it enters the state. A resident who brings it in within 6 months of purchase pays on the purchase price; after 6 months, the resident may pay on market value when it enters. Tax paid to another state is credited only if that state gives similar credit.",
      sources: [
        src(CODE, RULE_TITLE + "(c)(1)", RULE,
          "If the aircraft enters this Commonwealth following delivery, it becomes subject to Pennsylvania use tax unless the purchaser or lessee is entitled to claim one of the exemptions listed at subsection (d).", RULE_DATED),
        src(CODE, RULE_TITLE + "(c)(2)", RULE,
          "If a resident brings an aircraft or aircraft part into this Commonwealth within 6 months following the date of an out-of-state purchase, the use tax is based upon the original purchase price. If after 6 months of the date of purchase, the resident brings the aircraft into this Commonwealth, the resident purchaser may elect to pay use tax based upon the prevailing market value on the date the aircraft or aircraft part enters this Commonwealth.", RULE_DATED),
        src(CODE, RULE_TITLE + "(e)", RULE,
          "No credit will be granted unless the other state grants similar tax relief to persons who have paid tax to the Commonwealth.", RULE_DATED),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Exempt purchases include aircraft bought to sell, rent or lease under a Pennsylvania sales tax license; aircraft used in scheduled or charter common carrier service; aircraft used for flight instruction or contract freight, with use tax paid on fair rental value; gifts with no debt assumed; and helicopters. A nonresident owes nothing for use as a tourist or for 7 days or less.",
      sources: [
        src(DOR, "Form REV-832, Aircraft Sales and Use Tax Return, exemption 1", REV832,
          "Aircraft will be sold, rented or leased in the ordinary course of the purchaser’s business under Pennsylvania sales and use tax license", { dated: "REV-832 (DR) 06-23" }),
        src(DOR, "Form REV-832, Aircraft Sales and Use Tax Return, exemption 2", REV832,
          "Aircraft will be used directly by purchaser in rendering scheduled or charter service as a common carrier and purchaser has an FAA air carrier operating certificate on file with the U.S. Department of Transportation.", { dated: "REV-832 (DR) 06-23" }),
        src(CODE, RULE_TITLE + "(c)(3)", RULE,
          "Used in this Commonwealth other than as a tourist or vacationer, for a period of 7 days or less.", RULE_DATED),
      ],
      caveat: "REV-832 exemption 3 reads 'Aircraft will be used in rendering flight instructions or the hauling of freight by contract. Use tax will be remitted by purch aser on the fair rental value' (PDF text split 'purch aser'). A nonresident establishing residence or business is exempt only if the aircraft was bought more than 6 months earlier (58.8(c)(3)(iii)).",
    },
    rental: {
      status: "taxable",
      answer:
        "Leases and rentals of aircraft are taxable on the full rental payment, including maintenance and insurance the lessee pays. Separately stated fuel charges, within limits, and separately stated instructor fees are excluded.",
      sources: [
        src(CODE, RULE_TITLE + "(b)(4)", RULE,
          "If the transaction is a lease or rental, the tax is imposed upon the full lease or rental payment.", RULE_DATED),
        src(CODE, RULE_TITLE + "(a), Rental or lease payment", RULE,
          "Excluding separately stated charges for instructor fees if such fees are identified.", RULE_DATED),
      ],
      caveat: "Fuel exclusion requires the charge to be separately stated and not exceed 110 percent of the manufacturer's consumption rate (58.8(a)). Helicopter leases are exempt under Section 204(68).",
    },
    instruction: {
      status: "conditional",
      answer:
        "Flight instruction charges are not taxed, but the rental of the aircraft used in the lesson is. If the aircraft charge is not stated separately, tax is due on the whole amount billed to the student. A school can buy its aircraft exempt and pay use tax on the fair rental value instead.",
      sources: [
        src(CODE, RULE_TITLE + "(g)", RULE,
          "Airport operators who engage in the business of providing flight instructions are required to collect sales tax upon all equipment and supplies including the rental of an aircraft used in providing this service. No tax need be collected on charges made for flight instructions. If the charges for an aircraft are not separately stated, the Department will require tax to be collected on the amount billed to the student.", RULE_DATED),
        src(CODE, RULE_TITLE + "(f)", RULE,
          "Thereafter, if the commercial aircraft operator makes a taxable use of such aircraft, he is permitted to pay tax to the Department based upon the fair rental value of the aircraft during such taxable use.", RULE_DATED),
      ],
      caveat: "Rule is from 1984 but still current on the Pennsylvania Code site (through 56 Pa.B. 5370, August 8, 2026). 'Commercial aircraft operator' includes a person 'Providing flight instruction' (58.8(a)).",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Aircraft parts, services to aircraft and aircraft components are exempt, for fixed-wing, powered, tilt-rotor, glider and unmanned aircraft. Helicopter parts and their installation are exempt under a separate clause.",
      sources: [
        src("Pennsylvania Tax Reform Code", "Section 204(69), added July 9, 2013", TRC204,
          "The sale at retail or use of aircraft parts, services to aircraft and aircraft components."),
        src("Pennsylvania Tax Reform Code", "Section 204(69)", TRC204,
          "For purposes of this clause, the term \"aircraft\" shall include a fixed-wing aircraft, powered aircraft, tilt-rotor or tilt-wing aircraft, glider or unmanned aircraft."),
      ],
      caveat: "61 Pa. Code 58.8(b)(1) (1984) still lists parts and repair services as taxable; the 2013 statute overrides it. Helicopter clause is 204(67).",
    },
    annual: {
      status: "unclear",
      answer:
        "We found no Pennsylvania aircraft registration fee or yearly aircraft tax in the Department of Revenue's or PennDOT's published material, but no primary source states that none exists.",
      sources: [],
      caveat: "PennDOT Bureau of Aviation pages cover airport licensing only. Pennsylvania has no general personal property tax, but no source tying that to aircraft was found.",
    },
  },
};
