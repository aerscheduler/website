import { src } from "../sources.mjs";

const MCL = (s) => `https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-${s}`;
const TREASURY = "https://www.michigan.gov/en/taxes/coll-audit/discovery/content/aircraft";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "michigan",
  name: "Michigan",
  code: "MI",
  summary:
    "Michigan charges 6 percent sales or use tax on aircraft, collected by the Treasury's aircraft unit, with short exemptions for aircraft in the state only to be bought or repaired. Aircraft based in Michigan register every year at 1 cent per pound, in place of property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "6 percent on an aircraft used, stored, registered or transferred in Michigan, due on the greater of the purchase price or the aircraft's retail value. The Treasury's aircraft unit collects it, using Aircraft Transfer Questionnaire Form 4281.",
      sources: [
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "Michigan's Use Tax Act (Public Act 94 of 1937) and the Streamlined Sales and Use Tax Revenue Equalization Act (Public Act 175 of 2004) provide for a 6% tax levied on aircraft that is used, stored, registered or transferred in this state."),
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "For a Non-Qualified Aircraft, 6% tax is due on the greater of the purchase price or the retail value of the aircraft* at the time of acquisition."),
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "Owners of both Qualified Aircraft and Non-Qualified Aircraft must complete Aircraft Transfer Questionnaire Form 4281."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax is due when the aircraft enters Michigan. A personal-use aircraft bought out of state by a nonresident and brought in more than 90 days later, or by a resident more than 360 days later, is taxed on its retail value on the first day used in Michigan instead of on the price. Tax paid to another state is credited if that state credits Michigan's tax, and the owner pays any difference.",
      sources: [
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY, "Tax is due when the aircraft enters Michigan."),
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "The aircraft is purchased by a person who is a non-resident of Michigan (at the time of purchase) and is brought into Michigan more than 90 days after the date of purchase."),
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "The aircraft is purchased by a person who is a resident of Michigan (at the time of purchase) and brought into Michigan more than 360 days after the date of purchase."),
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "For a Qualified Aircraft, 6% tax is due on the retail value of the aircraft* on the first day it is used, stored, registered, or transferred in Michigan."),
        src("Michigan Compiled Laws", "MCL 205.94(1)(e)", MCL("205-94"),
          "If the sale or use of property was already subjected to a tax under the law of any other state or local governmental unit within a state in an amount less than the tax imposed by this act, this act applies, but at a rate measured by the difference between the rate provided in this act and the rate by which the previous tax was computed."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft in Michigan only to be sold and inspected, customized or repaired is exempt if it leaves within 15 days and is not based or registered in Michigan before or after. Domestic air carrier aircraft of at least 6,000 pounds are exempt, and so are transfers to close family members.",
      sources: [
        src("Michigan Compiled Laws", "MCL 205.94k(3)", MCL("205-94k"),
          "(a) The aircraft leaves this state within 15 days after the sale and the completion of any prepurchase evaluation, customization, improvement, maintenance, or repair that is associated with the sale, whichever is later."),
        src("Michigan Compiled Laws", "MCL 205.94k(6)(a)", MCL("205-94k"),
          "\"Based in this state\" means hangared or stored in this state for not less than 10 days in not less than 3 nonconsecutive months during the immediately preceding 12-month period."),
        src("Michigan Compiled Laws", "MCL 205.94(1)(u)", MCL("205-94"),
          "The storage, use, or consumption of an aircraft by a domestic air carrier for use solely in the transport of air cargo, passengers, or a combination of air cargo and passengers, that has a maximum certificated takeoff weight of at least 6,000 pounds."),
        src("Michigan Compiled Laws", "MCL 205.93(3)(a)", MCL("205-93"),
          "A transaction or a portion of a transaction if the transferee or purchaser is the spouse, mother, father, brother, sister, child, stepparent, stepchild, stepbrother, stepsister, grandparent, grandchild, legal ward, or a legally appointed guardian with a certified letter of guardianship, of the transferor."),
      ],
    },
    rental: {
      status: "conditional",
      answer:
        "Either the owner pays tax when buying the aircraft and the rental receipts are then exempt, or a lessor elects to pay use tax on its rental receipts instead of on the purchase. The Treasury asks lessors making that election for their use tax registration and lease agreements.",
      sources: [
        src("Michigan Compiled Laws", "MCL 205.95(4)", MCL("205-95"),
          "A lessor may elect to pay use tax on receipts from the rental or lease of the tangible personal property in lieu of payment of sales or use tax on the full cost of the property at the time it is acquired."),
        src("Michigan Compiled Laws", "MCL 205.94a(a)", MCL("205-94a"),
          "Rental receipts if the tangible personal property rented or leased was previously subject to 1 of the following when purchased by the lessor"),
        src("Michigan Department of Treasury", "Aircraft (Discovery and Tax Enforcement)", TREASURY,
          "Lessors who elect to pay use tax on the receipts from the lease of an aircraft must meet certain deadlines; see, Question 6 of the questionnaire for more information."),
      ],
    },
    instruction: {
      status: "unclear",
      answer:
        "We found no Michigan statute, rule or Treasury guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts are taxable. Parts installed on an aircraft that is not based or registered in Michigan are exempt if it leaves within 15 days of the work being finished, as are parts for domestic air carrier aircraft.",
      sources: [
        src("Michigan Compiled Laws", "MCL 205.54x(2)", MCL("205-54x"),
          "(a) The aircraft leaves this state within 15 days after the sooner of the issuance of the final billing or authorized approval for final return to service, completion of the maintenance record entry, and completion of the test flight and ground test for inspection as required under 14 CFR 91.407."),
      ],
      caveat: "Whether separately stated repair labor is taxable was not confirmed from a primary source.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft tied down, hangared or based in Michigan register every year with the state, at 1 cent per pound of maximum gross or takeoff weight, whichever is greater. The fee replaces all property tax on the aircraft. A first registration after July 1 is 50% of the annual fee.",
      sources: [
        src("Michigan Compiled Laws", "MCL 259.77(5)", MCL("259-77"),
          "A registration fee shall be paid at the rate of 1 cent per pound of either maximum gross weight or maximum takeoff weight, whichever is greater, for which the aircraft is certified under the federal aviation administration airworthiness certificate."),
        src("Michigan Compiled Laws", "MCL 259.77(4)", MCL("259-77"),
          "A registration fee shall be in lieu of all property taxes on the aircraft, either general or local."),
        src("Michigan Compiled Laws", "MCL 259.77(3)", MCL("259-77"),
          "However, for an aircraft being registered for the first time, a registration certificate issued after July 1 shall be issued at the rate of 50% of the annual fee."),
        src("Michigan Compiled Laws", "MCL 259.76(1)", MCL("259-76"),
          "An aircraft tied down, moored, hangared, or based within this state and the number assigned to that aircraft by the federal aviation administration shall be registered annually with the commission and a registration fee paid."),
      ],
      caveat: "SB 1165 (2024) proposed raising the fee to 5 cents per pound; MCL 259.77 still read 1 cent on 2026-10-18 (MCL complete through PA 103 of 2026).",
    },
  },
};
