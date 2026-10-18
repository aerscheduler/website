/**
 * Aircraft tax by jurisdiction (planned public pages at /aircraft-tax). DRAFT:
 * five pilot US states, researched 2026-10-18, awaiting Tony's review before
 * any page is built. Nothing imports this yet.
 *
 * COUNTRY FIRST, so going international adds rows rather than a rewrite:
 *   /aircraft-tax                               every country
 *   /aircraft-tax/<country-slug>                that country's overview
 *   /aircraft-tax/<country-slug>/<region-slug>  one state, province or the
 *                                               whole country if it has no
 *                                               regional taxes
 * The seven topics are generic ("buying", "bringing one in", "renting") and
 * each country names its own taxes for them: US sales and use tax, a VAT or
 * GST elsewhere. A country with only national taxes (most of Europe) gets one
 * region whose slug is the country's, so its URL is /aircraft-tax/<c>/<c>.
 *
 * ACCURACY RULES. Every fact cites a primary source (the tax authority, the
 * statute or the rule) with the exact sentence it rests on and the date it was
 * checked. Secondary sites point to sources; they are never one. When the
 * primary source does not clearly answer, the status is "unclear" and the page
 * says so. A fact whose quote is still a paraphrase has `quoteExact: false`
 * and must be fixed before it ships.
 */

/** @typedef {"taxable" | "exempt" | "conditional" | "none" | "unclear"} FactStatus */
/**
 * @typedef {{
 *   title: string, url: string, publisher: string,
 *   quote: string, quoteExact: boolean, checkedOn: string,
 *   dated?: string,
 * }} TaxSource
 */
/**
 * `caveat` is an internal note for whoever maintains the data; it is never
 * rendered. Anything a reader needs to know belongs in `answer`.
 * @typedef {{ answer: string, status: FactStatus, sources: TaxSource[], caveat?: string }} TaxFact
 */

/** Flip to true to list the pages: sitemap, nav, search, llms.txt, and indexing. */
export const PUBLISHED = false;

/** The questions every jurisdiction answers, in page order. Labels come from the country. */
export const TOPICS = ["buying", "bringingIn", "exemptions", "rental", "instruction", "maintenance", "annual"];

export const COUNTRIES = [
  {
    code: "US",
    slug: "united-states",
    name: "United States",
    currency: "USD",
    regionKind: "state",
    /** One question per topic, as people search it. {region} is the state's name. */
    questions: {
      buying: "Do you pay sales tax on an aircraft bought in {region}?",
      bringingIn: "Do you owe use tax on an aircraft bought outside {region}?",
      exemptions: "What aircraft sales tax exemptions does {region} have?",
      rental: "Are aircraft rentals taxed in {region}?",
      instruction: "Is flight instruction taxed in {region}?",
      maintenance: "Are aircraft parts and maintenance labor taxed in {region}?",
      annual: "Does {region} register or tax aircraft every year?",
    },
    labels: {
      buying: "Sales tax when you buy an aircraft",
      bringingIn: "Use tax when you bring one into the state",
      exemptions: "Exemptions owners plan around",
      rental: "Tax on aircraft rentals",
      instruction: "Flight instruction",
      maintenance: "Parts and labor for maintenance",
      annual: "Registration and yearly taxes",
    },
  },
  // Next: { code: "CA", slug: "canada", regionKind: "province", labels: { buying: "GST/HST and PST", ... } }
];

const CHECKED = "2026-10-18";
const src = (publisher, title, url, quote, extra = {}) => ({ publisher, title, url, quote, quoteExact: true, checkedOn: CHECKED, ...extra });

/** @type {{ country: string, slug: string, name: string, code: string, summary: string, facts: Record<string, TaxFact> }[]} */
export const REGIONS = [
  {
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
  },
  {
    country: "US",
    slug: "texas",
    name: "Texas",
    code: "TX",
    summary:
      "Texas charges state and local sales tax on aircraft, up to 8.25 percent combined. Aircraft bought or rented for FAA-approved flight instruction are exempt, other rentals are taxed, and separately stated repair labor is not.",
    facts: {
      buying: {
        status: "taxable",
        answer: "State sales tax plus local tax of up to 2 percent, to a maximum combined 8.25 percent, usually at the rate where the seller does business.",
        sources: [
          src("Texas Comptroller", "Publication 94-168, Aircraft and Texas Sales and Use Tax", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "The maximum combined tax rate is 8.25 percent.", { dated: "Revised 01/2020" }),
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "In most cases, the total tax paid is based on the rate in effect at the seller's place of business.", { dated: "Revised 01/2020" }),
        ],
      },
      bringingIn: {
        status: "conditional",
        answer:
          "Use tax applies to an aircraft bought elsewhere and used in Texas, with credit for sales tax paid to the out-of-state seller. It does not apply if the aircraft is predominantly used outside Texas, meaning more than half its departures, for at least one year.",
        sources: [
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "is not subject to Texas sales and use tax if it is predominantly used outside of this state for at least one year.", { dated: "Revised 01/2020" }),
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "more than 50 percent of its departures are made from locations outside Texas.", { dated: "Revised 01/2020" }),
        ],
      },
      exemptions: {
        status: "conditional",
        answer:
          "Fly-away: no tax if the aircraft is predominantly used outside Texas in its first year, documented on Form 01-907. Carriers certificated under Parts 121, 125, 133 or 135 are exempt. Aircraft bought for flight instruction are exempt.",
        sources: [
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "can be used in Texas within the first year, as long as it is predominantly used outside of Texas for that first year.", { dated: "Revised 01/2020" }),
        ],
      },
      rental: {
        status: "taxable",
        answer: "Rentals and leases are taxable, except an aircraft rented for FAA-approved flight instruction.",
        sources: [
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "Sales and use tax is due on the sale, lease or rental of an aircraft.", { dated: "Revised 01/2020" }),
        ],
      },
      instruction: {
        status: "exempt",
        answer:
          "No tax on the sale, lease or rental of an aircraft bought for flight instruction. A student cannot buy an aircraft tax free, but can rent one by the hour tax free for FAA-approved instruction, including solo flights, using Form 01-339. The school or instructor needs a sales tax permit.",
        sources: [
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "Tax is not due on the sale, lease or rental of an aircraft bought for flight instruction.", { dated: "Revised 01/2020" }),
        ],
      },
      maintenance: {
        status: "conditional",
        answer: "Separately stated parts and materials are taxable; separately stated labor is not. On a lump-sum repair bill the shop pays tax on its materials and the customer pays none.",
        sources: [
          src("Texas Comptroller", "Publication 94-168", "https://comptroller.texas.gov/taxes/publications/94-168.php",
            "Sales tax is due on separately stated charges for materials and parts when you have your aircraft serviced.", { dated: "Revised 01/2020" }),
        ],
      },
      annual: {
        status: "unclear",
        answer: "The Comptroller's aircraft publication does not cover registration or property tax. Not clearly published there.",
        sources: [],
      },
    },
  },
  {
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
  },
  {
    country: "US",
    slug: "arizona",
    name: "Arizona",
    code: "AZ",
    summary:
      "Arizona charges 5.6 percent state transaction privilege tax plus local tax on aircraft, taxes aircraft rentals, and requires aircraft based in the state to register with ADOT each year and pay a license tax of 0.5 percent of value.",
    facts: {
      buying: {
        status: "taxable",
        answer: "5.6 percent state transaction privilege tax plus county and city tax, which vary by location.",
        sources: [
          src("Arizona Department of Revenue", "TPT and Other Tax Rate Tables, effective September 1, 2026", "https://azdor.gov/sites/default/files/document/TPT_RATETABLE_09012026.pdf",
            "Table 1 provides the tax rates which combine the state's transaction privilege tax rate of 5.6% and the county excise tax rate."),
        ],
      },
      bringingIn: {
        status: "taxable",
        answer: "Use tax applies to an aircraft bought elsewhere for use in Arizona, and ADOT will not register the aircraft until it has been paid.",
        sources: [
          src("Arizona Revised Statutes", "A.R.S. 28-8322", "https://www.azleg.gov/ars/28/08322.htm",
            "unless the applicable tax has been paid as shown by a receipt from the collecting officer."),
        ],
      },
      exemptions: {
        status: "conditional",
        answer:
          "Aircraft sold to carriers and operators carrying persons for hire, to foreign governments, and to nonresidents who will not use them in Arizona except to remove them are exempt from the retail tax.",
        sources: [
          src("Arizona Revised Statutes", "A.R.S. 42-5061(B)(8)(c)", "https://www.azleg.gov/ars/42/05061.htm",
            "Persons who are not residents of this state and who will not use such property in this state"),
        ],
      },
      rental: {
        status: "taxable",
        answer:
          "Renting an aircraft falls under the personal property rental classification. The only aircraft exemption there is for nonprofit, accredited colleges renting to their own students and staff.",
        sources: [
          src("Arizona Revised Statutes", "A.R.S. 42-5071(A)", "https://www.azleg.gov/ars/42/05071.htm",
            "The personal property rental classification is comprised of the business of leasing or renting tangible personal property"),
          src("Arizona Revised Statutes", "A.R.S. 42-5071(A)(6)", "https://www.azleg.gov/ars/42/05071.htm",
            "Leasing or renting aircraft, flight simulators or similar training equipment to students or staff by nonprofit,"),
        ],
      },
      instruction: {
        status: "unclear",
        answer:
          "No exemption for flight instruction at a for-profit school was found. How a combined dual-instruction charge splits between the taxable aircraft rental and the instructor's service is not clearly published.",
        sources: [],
      },
      maintenance: {
        status: "unclear",
        answer:
          "Repair equipment and supplies used for certificated carriers' aircraft are exempt. For general aviation, not clearly published; a 2025 bill (SB 1085) proposed widening the exemption, and whether it passed has not been confirmed.",
        sources: [
          src("Arizona Revised Statutes", "A.R.S. 42-5061(B)(9)", "https://www.azleg.gov/ars/42/05061.htm",
            "Machinery, tools, equipment and related supplies used or consumed directly in repairing, remodeling or maintaining aircraft"),
        ],
      },
      annual: {
        status: "taxable",
        answer:
          "Aircraft based in Arizona are registered with ADOT each year and pay an aircraft license tax of 0.5 percent of the average fair market value for the make, model and year, at least $20. A nonresident's aircraft based here 90 consecutive days or less, with no intrastate commercial use, is excepted.",
        sources: [
          src("Arizona Revised Statutes", "A.R.S. 28-8335", "https://www.azleg.gov/ars/28/08335.htm", "at least $20 for a full year of registration."),
          src("Arizona Revised Statutes", "A.R.S. 28-8322", "https://www.azleg.gov/ars/28/08322.htm",
            "Owned by a nonresident who bases the aircraft in this state for a period of not more than ninety consecutive days"),
        ],
      },
    },
  },
  {
    country: "US",
    slug: "washington",
    name: "Washington",
    code: "WA",
    summary:
      "Washington charges 6.5 percent state sales tax plus local tax on aircraft, taxes repair labor and parts, and requires aircraft based in the state to register with WSDOT and pay a yearly aircraft excise tax.",
    facts: {
      buying: {
        status: "taxable",
        answer: "6.5 percent state retail sales tax plus local tax, collected by the dealer or broker on the selling price.",
        sources: [
          src("Revised Code of Washington", "RCW 82.08.020(1)", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.08.020",
            "a tax equal to six and five-tenths percent of the selling price on each retail sale in this state."),
          src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
            "Sales tax is due on the selling price and is collected by the aircraft dealer or broker."),
        ],
      },
      bringingIn: {
        status: "conditional",
        answer: "Residents owe use tax on aircraft used in Washington. Nonresidents may use an aircraft here up to 90 days in any continuous 12-month period without owing it.",
        sources: [
          src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
            "Washington residents have the responsibility to pay sales or use tax on aircraft used in Washington"),
          src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
            "Non-residents may use aircraft in this state for up to ninety (90) days in any continuous 12-month period"),
        ],
      },
      exemptions: {
        status: "conditional",
        answer:
          "Aircraft used more than half the time in interstate or foreign commerce for hire; aircraft bought only to rent out without a pilot; private aircraft over 41,000 pounds sold to nonresidents; and gifts where the donor already paid Washington tax.",
        sources: [
          src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
            "Aircraft purchased exclusively for the purpose of renting or leasing on a bare-rental basis, i.e., without a pilot."),
        ],
      },
      rental: {
        status: "taxable",
        answer: "An aircraft bought only for bare rental is exempt at purchase, and retail sales tax is then collected on the rentals.",
        sources: [
          src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
            "Aircraft purchased exclusively for the purpose of renting or leasing on a bare-rental basis, i.e., without a pilot."),
          src("Washington Department of Revenue", "Det. No. 19-0073, 40 WTD 178 (November 30, 2021)", "https://dor.wa.gov/sites/default/files/2022-02/40WTD178.pdf",
            "the taxpayer should collect retail sales tax on the aircraft rental payments"),
        ],
        caveat: "The rental quote is from a published determination rather than a rule; WAC 458-20-211 is the rule to cite when the page is built.",
      },
      instruction: {
        status: "unclear",
        answer:
          "Department determinations treat aircraft a school buys to give flight instruction as subject to use tax, unless students genuinely lease the aircraft and the school collects sales tax on the leases. Not found in a current rule.",
        sources: [
          src("Washington Department of Revenue", "Det. No. 19-0073, 40 WTD 178 (November 30, 2021)", "https://dor.wa.gov/sites/default/files/2022-02/40WTD178.pdf",
            "in general, aircraft purchased by a taxpayer for providing flight instruction services are subject to use tax."),
        ],
        caveat: "A published determination, not a rule. It binds the Department only on its facts, so the page says so.",
      },
      maintenance: {
        status: "taxable",
        answer: "Repair labor and parts are both retail sales, taxed on the total charge. Repairs to private aircraft over 41,000 pounds owned by nonresidents are exempt.",
        sources: [
          src("Washington Administrative Code", "WAC 458-20-173", "https://app.leg.wa.gov/wac/default.aspx?cite=458-20-173",
            "are required to collect the retail sales tax upon the total charge made for the rendition of such services"),
        ],
      },
      annual: {
        status: "taxable",
        answer:
          "Every aircraft based or operating in Washington registers with WSDOT Aviation within 30 days of purchase and pays a yearly excise tax each January: $50 for a single-engine airplane now, $120 from January 1, 2027. Nonresident aircraft registered elsewhere and here under 90 days are exempt.",
        sources: [
          src("Washington Department of Revenue", "Aircraft excise tax", "https://dor.wa.gov/taxes-rates/other-taxes/aircraft-excise-tax",
            "Aircraft excise tax is due every year during the month of January and is paid to the WSDOT Aviation Division."),
          src("Revised Code of Washington", "RCW 82.48.030, version effective January 1, 2027", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.48.030",
            "Single engine fixed wing | $50 | $70 | $120"),
          src("Revised Code of Washington", "RCW 82.48.100", "https://app.leg.wa.gov/rcw/default.aspx?cite=82.48.100",
            "Aircraft that are owned by a nonresident and registered in another state,"),
        ],

      },
    },
  },
];
