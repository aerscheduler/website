import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "florida",
  name: "Florida",
  code: "FL",
  summary:
    "Florida charges 6 percent sales or use tax on aircraft, with county surtax only on the first $5,000. Flight instruction and most repairs on aircraft over 2,000 pounds are exempt, aircraft rentals are taxed, and there is no state aircraft registration.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "6 percent state sales tax, plus the county's discretionary sales surtax. The surtax applies only to the first $5,000 of the price, so on most aircraft the tax is close to 6 percent.",
      sources: [
        src("Florida Department of Revenue", "GT-800008, Sales and Use Tax on Aircraft", "https://floridarevenue.com/Forms_library/gt800008.pdf",
          "Florida's six percent (6%) use tax, plus any applicable discretionary sales surtax, is due on an aircraft used or stored in Florida", { dated: "R. 04/15" }),
        src("Florida Statutes", "s. 212.054(2)(b)1., 2026", "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0212/Sections/0212.054.html",
          "The sales amount above $5,000 on any item of tangible personal property shall not be subject to the surtax."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax is due on an aircraft bought in another state and brought to Florida within 6 months of purchase, or bought abroad and brought in at any time. Sales tax paid to another state is credited. An aircraft used elsewhere for 6 months or more before arriving is presumed not bought for Florida use.",
      sources: [
        src("Florida Department of Revenue", "GT-800008, Sales and Use Tax on Aircraft", "https://floridarevenue.com/Forms_library/gt800008.pdf",
          "The aircraft is purchased in another state, territory of the United States, or District of Columbia and is brought into Florida within six (6) months of the purchase date", { dated: "R. 04/15" }),
        src("Florida Statutes", "s. 212.06(8)(a), 2026", "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0212/Sections/0212.06.html",
          "for 6 months or longer before being imported into this state was not purchased for use in this state."),
        src("Florida Statutes", "s. 212.06(7), 2026", "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0212/Sections/0212.06.html",
          "and paid in another state, territory of the United States, or the District of Columbia."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "A nonresident buying from a Florida dealer pays no tax if the aircraft leaves within 10 days of purchase, or within 20 days after repairs. A nonresident's aircraft may be in Florida less than 21 days in the 6 months after purchase, plus any time spent solely on flight training or repairs. A private sale between individuals is taxable.",
      sources: [
        src("Florida Administrative Code", "Rule 12A-1.007(10)(a), effective 2/20/2025", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.007", "Aircraft is to be repaired or altered and will be removed from Florida by me or by my designated agent within 20 days after completion of the repairs or alterations."),
        src("Florida Administrative Code", "Rule 12A-1.007(10)(a), effective 2/20/2025", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.007",
          "Aircraft will be removed by me or by my designated agent from Florida to a jurisdiction within the United States or one of its territories within 10 days after the date of purchase."),
        src("Florida Statutes", "s. 212.08(7)(eee), 2026", "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0200-0299/0212/Sections/0212.08.html",
          "enters and remains in this state for less than a total of 21 days during the 6-month period after the date of purchase."),
        src("Florida Administrative Code", "Rule 12A-1.007(10)(h)", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.007",
          "The occasional or isolated sale of an aircraft of a class or type required to be registered, licensed, titled, or documented in this state or by the United States Government is taxable."),
      ],
    },
    rental: {
      status: "taxable",
      answer: "Aircraft rentals are taxable. A charter, where the passenger does not fly or take possession of the aircraft, is a transportation service and exempt.",
      sources: [
        src("Florida Administrative Code", "Rule 12A-1.071(20)-(21), technical change 10-12-26", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.071", "The rental of aircraft is taxable."),
      ],
    },
    instruction: {
      status: "exempt",
      answer:
        "Charges for flight instruction are exempt, including supervised solo flights. Solo flights after the student finishes the course are rentals and taxable. The school's purchase of an aircraft for instruction is taxable.",
      sources: [
        src("Florida Administrative Code", "Rule 12A-1.071(22)", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.071",
          "A charge for flight instruction, which includes supervised solo flights, is exempt. The purchase of an aircraft for this use is taxable."),
        src("Florida Administrative Code", "Rule 12A-1.071(23)", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.071",
          "The charge for any solo flights made by the student after completing his flight course, even though he may be logging hours for a rating or license, is a rental and is taxable."),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Repair labor, replacement engines, parts and equipment are exempt for aircraft with a maximum certified takeoff weight over 2,000 pounds. Modifications under an STC are exempt. Lighter aircraft do not get the repair exemption.",
      sources: [
        src("Florida Administrative Code", "Rule 12A-1.007(10)(i)", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.007",
          "Labor charges for the repair and maintenance of aircraft with a maximum certified take-off weight that exceeds 2,000 pounds, including rotary wing aircraft, and charges for replacement engines, parts, or equipment used and installed on such aircraft being repaired or maintained in Florida are exempt."),
        src("Florida Administrative Code", "Rule 12A-1.007(10)(e)1.", "https://www.flrules.org/gateway/ruleNo.asp?id=12A-1.007",
          "All charges for aircraft modification services, including parts, equipment, and labor furnished or installed in connection therewith, performed under authority of a supplemental type certificate issued by the Federal Aviation Administration"),
      ],
    },
    annual: {
      status: "unclear",
      answer:
        "Florida has no state aircraft registration. Whether a county taxes an aircraft as tangible personal property is not covered in the Department's aircraft guidance.",
      sources: [
        src("Florida Department of Revenue", "GT-800008, Sales and Use Tax on Aircraft", "https://floridarevenue.com/Forms_library/gt800008.pdf",
          "Florida does not require a separate state registration of aircraft.", { dated: "R. 04/15" }),
      ],
    },
  },
};
