import { src } from "../sources.mjs";

const CH219 = "https://www.cga.ct.gov/current/pub/chap_219.htm";
const CH219_SUP = "https://www.cga.ct.gov/2026/sup/chap_219.htm";
const CGS = "Connecticut General Statutes";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "connecticut",
  name: "Connecticut",
  code: "CT",
  summary:
    "Connecticut charges 6.35 percent sales or use tax on aircraft under 6,000 pounds maximum takeoff weight and exempts heavier aircraft. Aircraft repair services and parts are exempt for all aircraft, and towns may not tax aircraft as property.",
  facts: {
    buying: {
      status: "conditional",
      answer:
        "Aircraft with a maximum certificated takeoff weight of six thousand pounds or more are exempt. Lighter aircraft pay the 6.35% sales tax. In a private sale, the buyer pays use tax on the full price to the Department of Revenue Services instead.",
      sources: [
        src(CGS, "Sec. 12-412(99), 2026 Supplement", CH219_SUP,
          "Sales of and the storage, use or other consumption of, aircraft having a maximum certificated takeoff weight of six thousand pounds or more."),
        src("Connecticut Department of Revenue Services", "Sales and Use Tax Information", "https://portal.ct.gov/drs/sales-tax/tax-information",
          "The sales tax rate of 6.35% applies to the retail sale, lease, or rental of most goods"),
        src(CGS, "Sec. 12-408(1)", CH219,
          "a tax is hereby imposed on all retailers at the rate of six and thirty-five-hundredths per cent of the gross receipts of any retailer from the sale of all tangible personal property sold at retail"),
        src(CGS, "Sec. 12-431(a)(1)", CH219,
          "in case of the purchase of any motor vehicle, snowmobile, vessel or aircraft other than from a licensed motor vehicle dealer or licensed motor vehicle lessor, a snowmobile dealer, a licensed marine dealer or a retailer of aircraft, respectively, the receipts therefrom shall not be included in the measure of the sales tax, but the purchaser thereof shall pay a use tax on the total purchase price thereof to the Commissioner of Revenue Services"),
      ],
      caveat:
        "The rate is written in words in the statute (\"six and thirty-five-hundredths per cent\"); the DRS page gives it as 6.35%. A 2025 bill (HB 5026) would have exempted aircraft under 6,000 pounds; the 2026 Supplement shows (99) unchanged, so it did not pass in that form.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to aircraft bought elsewhere for storage or use in Connecticut, unless the aircraft weighs six thousand pounds or more (maximum certificated takeoff weight) and so is exempt. Family transfers between spouses, parents, children and siblings owe no use tax.",
      sources: [
        src(CGS, "Sec. 12-411(1)(A)", CH219,
          "An excise tax is hereby imposed on the storage, acceptance, consumption or any other use in this state of tangible personal property purchased from any retailer for storage, acceptance, consumption or any other use in this state"),
        src(CGS, "Sec. 12-431(a)(2)", CH219,
          "No use tax shall be payable in cases of purchase (A) when the purchaser is the spouse, mother, father, brother, sister or child of the seller"),
      ],
      caveat: "The credit for sales tax paid to another state was not located and quoted; the answer does not mention it.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Aircraft of six thousand pounds or more maximum certificated takeoff weight are exempt outright. Aircraft built by a Connecticut manufacturer are exempt when sold to an interstate or foreign carrier, a foreign government, or a nonresident who uses them in Connecticut only to remove them. There is no general fly-away exemption for lighter aircraft.",
      sources: [
        src(CGS, "Sec. 12-412(99), 2026 Supplement", CH219_SUP,
          "Sales of and the storage, use or other consumption of, aircraft having a maximum certificated takeoff weight of six thousand pounds or more."),
        src(CGS, "Sec. 12-412(20)", CH219,
          "Sales of and the storage, use or other consumption, by a manufacturer of aircraft located in this state, of flyable aircraft complete with necessary equipment and modifications, but not separate engines and parts thereof, sold to persons taking delivery and using such aircraft as certificated or licensed carriers of persons or property in interstate or foreign commerce under authority of the laws of the United States or any foreign government, or sold to any foreign government for use by such government outside of this state, or sold to persons who are not residents of this state and who will not use such aircraft in this state otherwise than in the removal of such aircraft from this state."),
      ],
      caveat: "\"No general fly-away exemption for lighter aircraft\" is an inference from the exemption list in 12-412, which has no other aircraft sale exemption.",
    },
    rental: {
      status: "taxable",
      answer:
        "Leasing or renting tangible personal property of any kind is a taxable sale, so aircraft rentals are taxed unless the aircraft is exempt, such as one of six thousand pounds or more.",
      sources: [
        src(CGS, "Sec. 12-407(a)(2)(J)", CH219,
          "The leasing or rental of tangible personal property of any kind whatsoever, including, but not limited to, motor vehicles, linen or towels, machinery or apparatus, office equipment and data processing equipment"),
        src(CGS, "Sec. 12-412(99), 2026 Supplement", CH219_SUP,
          "Sales of and the storage, use or other consumption of, aircraft having a maximum certificated takeoff weight of six thousand pounds or more."),
      ],
      caveat:
        "No DRS guidance on aircraft rentals with a pilot (wet) or by flying clubs was found. Applying the 6,000-pound exemption to rentals is an inference from \"storage, use or other consumption\" in 12-412(99).",
    },
    instruction: {
      status: "unclear",
      answer:
        "The only flight instruction the statute lists as a taxable service is instruction by a certificated air carrier. No Department guidance says how a flight school's lessons, or the aircraft time inside them, are treated.",
      sources: [
        src(CGS, "Sec. 12-407(a)(37)(L)", CH219,
          "Flight instruction and chartering services by a certificated air carrier on an aircraft, the use of which for such purposes, but for the provisions of subdivision (4) of section 12-410 and subdivision (12) of section 12-411, would be deemed a retail sale and a taxable storage or use, respectively, of such aircraft by such carrier;"),
      ],
    },
    maintenance: {
      status: "exempt",
      answer: "Aircraft repair services and repair or replacement parts used in aircraft are exempt, for aircraft of any weight.",
      sources: [
        src(CGS, "Sec. 12-412(76), 2026 Supplement", CH219_SUP,
          "Sales of and the storage, use or other consumption of repair or replacement parts exclusively for use (A) in aircraft, or (B) in the significant overhauling or rebuilding of aircraft or aircraft parts or components on a factory basis."),
        src(CGS, "Sec. 12-412(77), 2026 Supplement", CH219_SUP,
          "Sales of aircraft repair services when such services are rendered in connection with (A) aircraft, or (B) the significant overhauling or rebuilding of aircraft or aircraft parts or components on a factory basis."),
      ],
    },
    annual: {
      status: "none",
      answer:
        "Towns must exempt aircraft from local property tax. The statutes that set state aircraft registration and fees have been repealed, so there is no yearly state aircraft fee.",
      sources: [
        src(CGS, "Sec. 12-71(e)", "https://www.cga.ct.gov/current/pub/chap_203.htm",
          "For assessment years commencing on or after October 1, 1992, each municipality shall exempt aircraft, as defined in section 15-34, from the provisions of this chapter."),
        src(CGS, "Secs. 15-46 to 15-51 (Regulation of aircraft, airmen, airports and air instruction; licenses and registrations; fees)", "https://www.cga.ct.gov/current/pub/chap_266.htm",
          "Sections 15-46 to 15-51, inclusive, are repealed."),
      ],
      caveat:
        "Sec. 12-430 still refers to obtaining an aircraft registration, so confirm with the Connecticut Airport Authority that no registration or fee exists under another section.",
    },
  },
};
