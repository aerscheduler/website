import { src } from "../sources.mjs";

const HRS = "Hawaii Revised Statutes";
const H = "https://www.capitol.hawaii.gov/hrscurrent/";
const S237_13 = `${H}Vol04_Ch0201-0257/HRS0237/HRS_0237-0013.htm`;
const S237_8_6 = `${H}Vol04_Ch0201-0257/HRS0237/HRS_0237-0008_0006.htm`;
const S237_24_3 = `${H}Vol04_Ch0201-0257/HRS0237/HRS_0237-0024_0003.htm`;
const S237_24_9 = `${H}Vol04_Ch0201-0257/HRS0237/HRS_0237-0024_0009.htm`;
const S238_1 = `${H}Vol04_Ch0201-0257/HRS0238/HRS_0238-0001.htm`;
const S238_2 = `${H}Vol04_Ch0201-0257/HRS0238/HRS_0238-0002.htm`;
const S238_3 = `${H}Vol04_Ch0201-0257/HRS0238/HRS_0238-0003.htm`;
const S261_15_5 = `${H}Vol05_Ch0261-0319/HRS0261/HRS_0261-0015_0005.htm`;
const S261_15_6 = `${H}Vol05_Ch0261-0319/HRS0261/HRS_0261-0015_0006.htm`;

const GET_SALES = src(HRS, "HRS 237-13(2)(A)", S237_13,
  "Upon every person engaging or continuing in the business of selling any tangible personal property whatsoever, there is likewise hereby levied, and shall be assessed and collected, a tax equivalent to four per cent of the gross proceeds of sales of the business;");
const SURCHARGE = src(HRS, "HRS 237-8.6(a)", S237_8_6,
  "No county shall set the surcharge on state tax at a rate greater than one-half per cent of all gross proceeds and gross income taxable under this chapter.");
const GET_SERVICES = src(HRS, "HRS 237-13(6)(A)", S237_13,
  "Upon every person engaging or continuing within the State in any service business or calling including professional services not otherwise specifically taxed under this chapter, there is likewise hereby levied and shall be assessed and collected a tax equal to four per cent of the gross income of the business");
const GET_OTHER = src(HRS, "HRS 237-13(9)", S237_13,
  "Upon every person engaging or continuing within the State in any business, trade, activity, occupation, or calling not included in the preceding paragraphs or any other provisions of this chapter, there is likewise hereby levied and shall be assessed and collected, a tax equal to four per cent of the gross income thereof.");

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "hawaii",
  name: "Hawaii",
  code: "HI",
  summary:
    "Hawaii has no sales tax but taxes almost every business receipt with its 4 percent general excise tax, plus a county surcharge of up to half a percent, so aircraft sales, rentals, flight lessons and repairs are all taxed. Aircraft at state airports pay a $10 yearly registration fee.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Hawaii's general excise tax of four percent applies to the seller's gross proceeds from selling an aircraft, and counties may add a surcharge of up to one-half percent. The tax is on the seller, who usually passes it on.",
      sources: [GET_SALES, SURCHARGE],
      caveat: "\"Usually passes it on\" is general knowledge of GET practice, not quoted.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft imported into Hawaii or bought from an unlicensed seller, at four percent of its value for an owner using it, unless the acquisition was already taxed under the general excise tax.",
      sources: [
        src(HRS, "HRS 238-2", S238_2,
          "There is hereby levied an excise tax on the use in this State of tangible personal property which is imported by a taxpayer in this State whether owned, purchased from an unlicensed seller, or however acquired for use in this State."),
        src(HRS, "HRS 238-2(3)", S238_2, "In all other cases, four per cent of the value of the property."),
        src(HRS, "HRS 238-3(f)", S238_3,
          "The tax imposed by this chapter shall not apply to any use or consumption of aircraft and vessels, the transfer of which aircraft or vessel to, or the acquisition of which by, the person so using or consuming the same, or the rental for the use of the aircraft or vessel, has actually been or actually is taxed under chapter 237."),
      ],
      caveat: "No credit for sales tax paid to another state was found in chapter 238; the answer does not mention one.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Rent from leasing aircraft or engines to lessees who use them for interstate air transportation of passengers and goods is exempt from the general excise tax, and so is leasing for commercial transportation under the use tax. No general fly-away or nonresident exemption for aircraft was found.",
      sources: [
        src(HRS, "HRS 237-24.3(11)", S237_24_3,
          "Amounts received as rent for the rental or leasing of aircraft or aircraft engines used by the lessees or renters for interstate air transportation of passengers and goods."),
        src(HRS, "HRS 238-1, definition of \"use\" (exclusions), (6)", S238_1,
          "The leasing or renting of any aircraft or the keeping of any aircraft solely for leasing or renting to lessees or renters using the aircraft for commercial transportation of passengers and goods or the acquisition or importation of any such aircraft or aircraft engines by any lessee or renter engaged in interstate air transportation."),
      ],
      caveat: "Where item (6) sits in 238-1 (the exclusions from \"use\") was inferred from the page text. Hawaii's export exemptions (237-29.5) were not checked for aircraft flown out of state.",
    },
    rental: {
      status: "taxable",
      answer:
        "Renting out an aircraft is a business activity taxed under the general excise tax at four percent of the rental income, unless the renter uses it for interstate air transportation.",
      sources: [GET_OTHER, SURCHARGE],
      caveat: "No Department of Taxation guidance on aircraft rentals was read; the answer rests on the general excise tax reaching every business activity, and the exact paragraph covering rentals of tangible property was not pinned down.",
    },
    instruction: {
      status: "taxable",
      answer:
        "Flight instruction is a service business, and Hawaii's general excise tax applies to service income at four percent, plus any county surcharge.",
      sources: [GET_SERVICES, SURCHARGE],
      caveat: "No Department guidance addresses flight schools specifically; the answer applies the general service-business rate.",
    },
    maintenance: {
      status: "taxable",
      answer:
        "Repair and maintenance income is taxed under the general excise tax at four percent. The exemption for aircraft service and maintenance covers only scheduled commercial aircraft with two or more jet engines, serviced in a facility of at least thirty thousand square feet.",
      sources: [
        GET_SERVICES,
        src(HRS, "HRS 237-24.9(b)", S237_24_9,
          "\"Aircraft\" means any craft or artificial contrivance of whatever description engaged in intrastate, interstate, or international scheduled commercial use as defined in chapter 263, that operates with two or more jet engines."),
        src(HRS, "HRS 237-24.9(b)", S237_24_9,
          "\"Aircraft service and maintenance facility\" means a facility for aircraft service and maintenance that is not less than thirty thousand square feet in area"),
      ],
      caveat: "A 2026 bill (HB1688 / SB2399) on parts for aircraft service was seen but not checked for enactment.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft operated at a state-owned airport must be registered with the Department of Transportation, for a $10 yearly fee. Aircraft operating mainly in interstate commerce, in transit, or owned by the United States are exempt.",
      sources: [
        src(HRS, "HRS 261-15.6", S261_15_6,
          "The department shall assess and collect an annual registration fee of $10 from each operator of aircraft required to be registered under section 261-15.5."),
        src(HRS, "HRS 261-15.5", S261_15_5,
          "Unless an aircraft is exempted by this section, no person shall operate or cause or authorize to be operated any aircraft at an airport owned or controlled by the department, unless the aircraft has a certificate of registration issued in accordance with rules adopted by the department."),
      ],
      caveat: "No primary source was found stating that Hawaii has no personal property tax on aircraft (an AOPA summary says so); the answer does not claim it.",
    },
  },
};
