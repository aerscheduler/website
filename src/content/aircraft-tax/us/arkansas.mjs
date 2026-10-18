import { src } from "../sources.mjs";

const RULES_URL = "https://dfa.arkansas.gov/wp-content/uploads/et2008_3.pdf";
const RULES = "Arkansas Department of Finance and Administration";
const RULES_DATED = { dated: "Revised 10/2008" };
const ACT_1182 = "https://www.arkleg.state.ar.us/Acts/FTPDocument?path=%2FACTS%2F2015%2FPublic%2F&file=1182.pdf&ddBienniumSession=2015%2F2015R";
const ACT_595 = "https://www.arkleg.state.ar.us/Acts/FTPDocument?path=%2FACTS%2F2017R%2FPublic%2F&file=595.pdf&ddBienniumSession=2017%2F2017R";
const ACT_879 = "https://www.arkleg.state.ar.us/Acts/FTPDocument?path=%2FACTS%2F2025R%2FPublic%2F&file=879.pdf&ddBienniumSession=2025%2F2025R";
const RATES_URL = "https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/sales-use-tax-rates/state-sales-use-tax-rates/";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "arkansas",
  name: "Arkansas",
  code: "AR",
  summary:
    "Arkansas charges 6.5 percent sales or use tax on aircraft, with local tax only on the first $2,500. Bare rentals under 30 days add a 1 percent short-term rental tax, aircraft repair is a taxable service except on heavy turbine aircraft, and aircraft are assessed for county personal property tax each year.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Sales of new and used aircraft owe the state's aviation sales and use tax of six and a half percent, listed as 6.500% in the Department's rate table. City and county taxes apply only to the first $2,500 of the price of a single aircraft. A sale under $2,000 owes no tax.",
      sources: [
        src("Arkansas Department of Finance and Administration", "State Sales & Use Tax Rates: Aviation Sales and Use Tax, effective 07/01/2013", RATES_URL,
          "Aviation Sales and Use Tax | 07/01/2013 | 6.500%"),
        src("Arkansas Department of Finance and Administration", "Sales and Use Tax FAQs", "https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/sales-and-use-tax-faqs/",
          "As of January 1, 2008, local tax caps on single transactions no longer apply except for sales of motor vehicles licensed for highway use, aircraft, watercraft and manufactured housing."),
        src(RULES, "Gross Receipts Tax Rule GR-14(A)(1)", RULES_URL,
          "Sales of new and used airplanes are subject to sales or use tax.", RULES_DATED),
        src(RULES, "Gross Receipts Tax Rule GR-91(A)(1)", RULES_URL,
          "All local taxes shall be collected only on the first $2,500.00 of gross receipts, gross proceeds, or sales price of a single motor vehicle, aircraft, watercraft, modular home, manufactured home, or mobile home.", RULES_DATED),
        src(RULES, "Gross Receipts Tax Rule GR-14(A)(2)", RULES_URL,
          "If the total gross receipts or gross proceeds for the sale of new or used aircraft is less than $2,000.00, then sales or use tax is not due.", RULES_DATED),
      ],
      caveat:
        "The current rules are published on codeofarrules.arkansas.gov, which refused every connection from this machine (TLS handshake reset). Quotes are from the DFA's own 10/2008 rules PDF; the Cornell LII mirror of the current GR-14 reads the same in substance (including the $2,000 floor and the credit). The rate table row is a table, not a sentence.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft bought elsewhere and used in Arkansas owes use tax. Sales or use tax legally paid to another state is credited, with proof of payment.",
      sources: [
        src(RULES, "Gross Receipts Tax Rule GR-14(A)(1)", RULES_URL,
          "If gross receipts, sales, compensating (use), or other similar tax has been legally paid by the taxpayer to another state, then the taxpayer is entitled to credit for that tax.", RULES_DATED),
      ],
      caveat: "No day-count or nonresident presence test was found. The compensating use tax statute (26-53-101 et seq.) could not be read from the official code site.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "A sale in Arkansas is exempt when a nonresident seller sells to a nonresident buyer who will base the aircraft outside Arkansas, or when an Arkansas seller sells an aircraft over 9,500 pounds maximum takeoff weight that will be based outside Arkansas. Taking delivery in Arkansas only to fly the aircraft out, or to finish maintenance first, does not lose the exemption. New aircraft built in Arkansas and sold for use only outside the state are exempt.",
      sources: [
        src("Arkansas General Assembly", "Act 1182 of 2015, adding Ark. Code Ann. 26-52-451", ACT_1182,
          "The fact that a purchaser takes possession of an aircraft in this state does not prevent the application of the exemption provided in this section if the purchaser takes possession of the aircraft for the sole purpose of: (1) Removing the aircraft from this state under its own power; or (2) Locating the aircraft at a maintenance facility in this state for the time period necessary to complete maintenance or modifications to the aircraft if the aircraft is removed from this state upon completion of the maintenance or modifications.",
          { dated: "Approved 04/07/2015" }),
        src("Arkansas General Assembly", "Act 595 of 2017, amending Ark. Code Ann. 26-52-451(a)", ACT_595,
          "Seller located in this state and the aircraft that is sold: (A) Has a certified maximum take-off weight of more than nine thousand five hundred pounds (9,500 lbs); and (B) Will be based outside of the State of Arkansas",
          { dated: "Approved 03/23/2017" }),
        src("Arkansas General Assembly", "Act 595 of 2017, amending Ark. Code Ann. 26-52-451(a)", ACT_595,
          "Person that is the resident of another state to a purchaser that: (A) Is a resident of another state; and (B) Will base the aircraft outside of the State of Arkansas",
          { dated: "Approved 03/23/2017" }),
        src(RULES, "Gross Receipts Tax Rule GR-14(F)", RULES_URL,
          "The gross receipts or gross proceeds derived from the sale of new aircraft manufactured or substantially completed within the State of Arkansas shall not be subject to the gross receipts tax when sold by the manufacturer or substantial completer to a purchaser for use exclusively outside this state notwithstanding the fact that possession may be taken in this state for the sole purpose of removing the aircraft from this state under its own power.",
          RULES_DATED),
      ],
      caveat:
        "Quotes are from the enacted acts (line numbers removed), not the codified section; later amendments to 26-52-451 were not checked because the official code was unreachable.",
    },
    rental: {
      status: "conditional",
      answer:
        "Renting an aircraft with a pilot, as a charter, is a non-taxable service. Renting the aircraft alone for less than 30 days owes sales tax plus a 1 percent short-term rental tax; for 30 days or more, tax is due on the rental charges unless Arkansas tax was paid on the aircraft's purchase. A business can buy an aircraft for rental tax-free only if yearly rental revenue is at least 7.5% of the aircraft's net price.",
      sources: [
        src(RULES, "Gross Receipts Tax Rule GR-14(E)(2)", RULES_URL,
          "If an aircraft is rented by an aircraft charter service with a pilot's service included, the rental of aircraft and pilot service is a non-taxable service. If the aircraft alone is rented for a period of less than thirty (30) days, then the sales tax and the one percent (1%) short-term rental tax (see Ark. Code Ann. § 26-63-301 and ET-5) must be collected on the rental charge. If the aircraft alone is rented for thirty (30) days or more, then the tax must be collected and remitted upon the rental charges unless the Arkansas tax was paid on the purchase price of the aircraft.",
          RULES_DATED),
        src("Arkansas General Assembly", "Act 879 of 2025, adding Ark. Code Ann. 26-52-409(e)(1)", ACT_879,
          "A transaction in which a person acquires an aircraft for the purpose of renting or leasing the aircraft in the ordinary course of the person's business is exempt under this section only if the person establishes that the annual amount of the gross revenue derived from renting or leasing the aircraft, including any revenue from related party transactions, is equal to at least seven and five-tenths percent (7.5%) of the net acquisition price for the aircraft, including the value of any trade or exchange and excluding any sales commission paid to a third party.",
          { dated: "Approved 4/17/25" }),
      ],
      caveat:
        "The rest of 26-52-409 (the purchase-for-rental exemption that subsection (e) limits) could not be read from the official code. The DFA was told to write rules for the 7.5% test; whether it has was not checked.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Arkansas taxes only listed services, and neither the gross receipts tax rules nor the aircraft rule mention flight instruction or the aircraft time inside a lesson. How a lesson is treated is not published.",
      sources: [],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Repairing, altering or cleaning an aircraft is a taxable service in Arkansas, and parts are taxable too. Repair of commercial jet aircraft, meaning turbine or turbojet aircraft over 12,500 pounds certified maximum takeoff weight, and the parts installed on them are exempt.",
      sources: [
        src(RULES, "Gross Receipts Tax Rule GR-9(A)(1)", RULES_URL,
          "The service of initial installation, alteration, addition, cleaning, refinishing, replacement and repair of the following items of tangible personal property are subject to the tax: motor vehicles, aircraft, farm machinery and farm implements, motors of all kinds",
          RULES_DATED),
        src(RULES, "Gross Receipts Tax Rule GR-30.1(A)", RULES_URL,
          "The gross receipts or gross proceeds derived from the alteration, addition, cleaning, refinishing, replacement or repair of commercial jet aircraft, commercial jet aircraft components or commercial jet aircraft subcomponents are exempt from sales tax.",
          RULES_DATED),
        src(RULES, "Gross Receipts Tax Rule GR-30.1(C)", RULES_URL,
          "“Commercial jet aircraft” means any commercial, military, private, or other turbine or turbojet aircraft having a certified maximum take-off weight of more than 12,500 pounds.",
          RULES_DATED),
      ],
      caveat:
        "Act 1182 of 2015 appears to change the parts definition from \"more than\" 12,500 pounds to 12,500 pounds \"or more\" (strike-through formatting is lost in the PDF text), so a 12,500-pound aircraft may qualify; the answer keeps the rule's wording. \"Parts are taxable too\" rests on the general sales tax on tangible personal property, not on a quoted aircraft-specific sentence.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft are personal property in Arkansas, assessed each year by the county assessor at their value on January 1 and taxed at local rates. Report them to the assessor by May 31 to avoid a 10% late penalty.",
      sources: [
        src("Arkansas Department of Finance and Administration, Assessment Coordination Division", "2025 Annual Report, Personal Property", "https://www.dfa.arkansas.gov/wp-content/uploads/AACD_AnnualReport_2025.pdf",
          "Automobiles and other vehicles which must be licensed in Arkansas includes; automobiles, pickups, vans, and other passenger vehicles; trucks and other non-passenger vehicles; boats and watercraft, motors, and trailers; motor homes, travel trailers, and other recreational vehicles; motorcycles, ATVS, and similar vehicles; and aircraft."),
        src("Arkansas Department of Finance and Administration, Assessment Coordination Division", "2025 Annual Report, Personal Property", "https://www.dfa.arkansas.gov/wp-content/uploads/AACD_AnnualReport_2025.pdf",
          "Personal Property is assessed annually, and its value determined as of January 1 of each assessment year."),
        src("Arkansas Department of Finance and Administration, Assessment Coordination Division", "2025 Annual Report, Personal Property", "https://www.dfa.arkansas.gov/wp-content/uploads/AACD_AnnualReport_2025.pdf",
          "Personal Property should be itemized and reported to the assessor by May 31 to avoid a late assessment penalty of 10%."),
      ],
      caveat: "No state aircraft registration fee was found. The assessment ratio and the statute for aircraft assessment were not read.",
    },
  },
};
