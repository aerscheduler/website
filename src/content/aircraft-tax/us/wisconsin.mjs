import { src } from "../sources.mjs";

const RULE = "https://docs.legis.wisconsin.gov/code/admin_code/tax/11/IX/84";
const S7752 = "https://docs.legis.wisconsin.gov/document/statutes/77.52(1)";
const S7754 = "https://docs.legis.wisconsin.gov/statutes/statutes/77/iii/54";
const S7770 = "https://docs.legis.wisconsin.gov/document/statutes/77.70(1)";
const S11420 = "https://docs.legis.wisconsin.gov/document/statutes/114.20";
const DOR_EX = "https://www.revenue.wi.gov/Pages/TaxPro/2014/news-2014-140617a.aspx";
const ADMIN = "Wisconsin Administrative Code";
const STATS = "Wisconsin Statutes";
const DOR = "Wisconsin Department of Revenue";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "wisconsin",
  name: "Wisconsin",
  code: "WI",
  summary:
    "Wisconsin charges 5 percent state sales or use tax on aircraft, plus county tax where adopted, including on most private sales. Aircraft parts and repair labor are exempt, flight instruction billed separately is not taxed, and aircraft based in the state pay a registration fee by weight in place of property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "5 percent state sales tax on the sale of an aircraft, plus 0.5 percent county tax in counties that adopt it. An occasional sale between private parties is taxable too, unless it is to a close family member and the aircraft was already registered in Wisconsin to the seller.",
      sources: [
        src(STATS, "Wis. Stat. 77.52(1)(a)", S7752,
          "For the privilege of selling, licensing, leasing or renting tangible personal property at retail a tax is imposed upon all retailers at the rate of 5 percent of the sales price from the sale, license, lease or rental of tangible personal property sold, licensed, leased or rented at retail in this state"),
        src(STATS, "Wis. Stat. 77.70(1)", S7770, "The rate of the tax imposed under this subsection is 0.5 percent of the sales price or purchase price."),
        src(ADMIN, "Tax 11.84(1)(b)", RULE, "The occasional sale of an aircraft in Wisconsin is taxable unless one of the following applies:"),
        src(ADMIN, "Tax 11.84(1)(b)1.", RULE,
          "The transfer is to the spouse, parent, stepparent, father-in-law, mother-in-law, child, stepchild, son-in-law, or daughter-in-law of the transferor; the aircraft was previously registered or titled in Wisconsin in the transferor’s name, if required to be registered or titled; and the transferor is not engaged in the business of selling aircraft."),
      ],
      caveat: "Milwaukee County and city have additional rates (77.70(2), 77.701).",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to aircraft registered or customarily hangared in Wisconsin, even if also flown elsewhere, and is paid at registration if not already paid. Sales or use tax paid to other states is credited. A new resident's personal aircraft bought 90 days or more before the move is exempt.",
      sources: [
        src(ADMIN, "Tax 11.84(1)(c)", RULE,
          "The tax applies to aircraft registered or customarily hangared or both in Wisconsin, even though the aircraft also may be used out-of-state."),
        src(ADMIN, "Tax 11.84(1)(c)", RULE,
          "If the purchase of an aircraft subject to Wisconsin use taxes was subject to a sales or use tax in the state in which the purchase was made or in a state where the aircraft was stored, used, or consumed prior to being stored, used, or consumed in Wisconsin, the amount of the sales or use taxes paid to the other state or states shall be applied as a credit against and deducted from, to the extent thereof, the Wisconsin state and county use"),
        src(ADMIN, "Tax 11.84(1)(d)", RULE,
          "The use tax does not apply to aircraft for an individual’s personal use purchased by a nonresident outside this state 90 days or more before bringing the aircraft into Wisconsin in connection with a change of domicile to this state."),
      ],
      caveat: "Tax 11.84(1)(e) also exempts aircraft of out-of-state owners with no other Wisconsin property who paid tax where purchased; not summarized.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Exempt: aircraft sold to certificated carriers of persons or property in interstate or foreign commerce, and aircraft sold to nonresidents who use them in Wisconsin only to remove them or to have them repaired or maintained. Holding an airworthiness certificate alone does not qualify an owner as a carrier.",
      sources: [
        src(STATS, "Wis. Stat. 77.54(5)(a)1.", S7754,
          "Aircraft, including accessories, attachments, and fuel for such aircraft, sold to persons using the aircraft as certified or licensed carriers of persons or property in interstate or foreign commerce under authority of the laws of the United States or any foreign government, or sold to any foreign government for use by such government outside this state."),
        src(STATS, "Wis. Stat. 77.54(5)(a)2.", S7754,
          "Aircraft, including attachments for such aircraft, sold to persons who are not residents of this state and who will not use such aircraft in this state otherwise than in the removal of such aircraft from this state or in the repair, service, alteration, fitting, cleaning, painting, coating, towing, inspection, and maintenance of such aircraft in this state."),
        src(ADMIN, "Tax 11.84(3)(a)", RULE,
          "This exemption does not apply to persons with air worthiness certificates which indicate certain safety standards have been met, if they do not otherwise qualify."),
      ],
    },
    rental: {
      status: "taxable",
      answer:
        "Leases and rentals of aircraft are taxable. Carrying passengers or cargo for hire, where the customer picks only the departure time and destination and the owner keeps control of the aircraft, is not taxable. Hangar and tie-down parking is taxable.",
      sources: [
        src(ADMIN, "Tax 11.84(1)(a)", RULE, "The sales and use tax applies to the sales price from the sale, license, lease, or rental of aircraft."),
        src(ADMIN, "Tax 11.84(4)(a)", RULE,
          "Except as provided in sub. (2) (c), transporting customers or property for hire when the customer only designates the time of departure and destination while the owner retains control over the aircraft in all other respects."),
        src(ADMIN, "Tax 11.84(2)(b)2.", RULE, "Indoor parking, such as single or multiple “T” hangar parking, and outdoor, or “tie-down,” parking are taxable."),
      ],
    },
    instruction: {
      status: "conditional",
      answer:
        "Flight instruction is not taxable when the instruction fee is stated separately from the aircraft rental charge. The aircraft rental itself is taxable.",
      sources: [
        src(ADMIN, "Tax 11.84(4)(b)", RULE, "Flight instruction when the fees for the instruction are separately stated from the charge for the rental of the aircraft."),
        src(ADMIN, "Tax 11.84(1)(a)", RULE, "The sales and use tax applies to the sales price from the sale, license, lease, or rental of aircraft."),
      ],
      caveat: "The 11.84(4)(b) quote is a list item under 'Amounts received from the following services are not taxable:' (11.84(4) intro). Whether a school's aircraft purchase is exempt as bought for rental (resale) is not addressed in 11.84.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Parts used to modify or repair aircraft, including built-in avionics, tires and spark plugs, are exempt, and so are charges for repair, inspection and maintenance of any aircraft. Supplies such as engine oil, hydraulic fluid and deicing fluid stay taxable. No exemption certificate is needed.",
      sources: [
        src(STATS, "Wis. Stat. 77.54(5)(a)3.", S7754, "Parts used to modify or repair aircraft."),
        src(ADMIN, "Tax 11.84(4)(j)", RULE,
          "Repair, service, alteration, fitting, cleaning, painting, coating, towing, inspection, and maintenance of any aircraft or any part used to modify or repair an aircraft."),
        src(ADMIN, "Tax 11.84(3)(c)2.", RULE,
          "“Parts used to modify or repair aircraft” include tires, oil filters, spark plugs, engine cowls, built-in radios and avionics equipment, strobes, and flap cable."),
        src(DOR, "Sales and Use Tax Exemptions for Aircraft", DOR_EX,
          "Examples of items that are supplies for an aircraft (and not parts used to modify or repair an aircraft) include engine oil, hydraulic fluid, deicing fluids, and oxygen.", { dated: "2014" }),
        src(DOR, "Sales and Use Tax Exemptions for Aircraft", DOR_EX,
          "A purchaser does not need to give a retailer an exemption certificate for these purchases; and a retailer does not need to obtain an exemption certificate from the purchaser.", { dated: "2014" }),
      ],
      caveat: "Exemptions effective July 1, 2014 (2013 Act 185).",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based in Wisconsin register with the Department of Transportation by weight, in place of property tax. Aircraft of 3,000 pounds or less pay every two years, $60 up to 2,000 pounds, $78 up to 2,500 and $100 up to 3,000; heavier aircraft pay yearly, $70 up to 3,500 pounds rising to $3,125 over 100,000. Antique and amateur-built aircraft pay a one-time $50.",
      sources: [
        src(STATS, "Wis. Stat. 114.20(1)(c)", S11420,
          "An aircraft is presumed to be based in this state if it is kept in the state for a period of 30 consecutive days or for a cumulative period of 60 days in any calendar year."),
        src(STATS, "Wis. Stat. 114.20(3)", S11420, "Fees paid on aircraft under this section are in lieu of general property taxes."),
        src(STATS, "Wis. Stat. 114.20(9m)(a)", S11420, "Not more than 2,000 $ 60"),
        src(STATS, "Wis. Stat. 114.20(9m)(b)", S11420, "Not more than 2,500 78"),
        src(STATS, "Wis. Stat. 114.20(9m)(c)", S11420, "Not more than 3,000 100"),
        src(STATS, "Wis. Stat. 114.20(9)(d)", S11420, "Not more than 3,500 $ 70"),
        src(STATS, "Wis. Stat. 114.20(9)(u)", S11420, "More than 100,000 3,125"),
        src(STATS, "Wis. Stat. 114.20(6)", S11420, "Any antique aircraft may be registered upon receipt of the proper application and payment of a $50 registration fee."),
      ],
      caveat: "Fee-table quotes are a row's weight and fee cells joined by a space. Biennial registration applies to aircraft of not more than 3,000 pounds not subject to sub. (10) (114.20(1)(a)). Amateur-built $50 is 114.20(8).",
    },
  },
};
