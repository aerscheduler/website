import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "alabama",
  name: "Alabama",
  code: "AL",
  summary:
    "Alabama taxes airplanes as automotive vehicles, at a two percent state sales or use tax plus local tax. Separately stated repair labor is not taxed, and aircraft based in Alabama owe yearly property tax assessed by the Department of Revenue.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Alabama's sales tax rules count airplanes as automotive vehicles, which pay a state rate of two percent of the price instead of the general four percent. City and county sales taxes apply on top, and their rates vary by location.",
      sources: [
        src("Alabama Administrative Code", "Rule 810-6-1-.12(1)", "https://admincode.legislature.state.al.us/api/rule/810-6-1-.12",
          "The term \"automotive vehicles\" as used in the Sales and Use Tax laws shall mean and include, but shall not be limited to, automobiles, trucks, buses, tractors (crawler and pneumatic tired types), motorcycles, motorscooters, automotive industrial trucks, Ross Carriers, lift trucks, locomotive cranes, airplanes, tugs, motorboats with built-in motors"),
        src("Code of Alabama", "Section 40-23-2(4)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-2",
          "an amount equal to two percent of the gross proceeds of sale of the automotive vehicle or truck trailer, semitrailer, or house trailer"),
        src("Code of Alabama", "Section 40-23-2(1)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-2",
          "an amount equal to four percent of the gross proceeds of sales of the business except where a different amount is expressly provided herein."),
        src("Alabama Department of Revenue", "Sales and Use Tax Rates", "https://www.revenue.alabama.gov/sales-use/tax-rates/",
          "Sales and use tax rates vary across municipalities and counties, in addition to what is taxed by the state."),
      ],
      caveat:
        "Private (casual) sales: Rule 810-6-5-.11.05 routes casual-sale tax through the county licensing official for vehicles registered with the probate judge, which aircraft are not. No source found saying how a private sale of an airplane between individuals is taxed, so the answer does not mention it.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax of two percent applies to an automotive vehicle, which includes an airplane, bought elsewhere and stored or used in Alabama. Sales or use tax paid to another state is credited, and only any difference is owed, unless that state gives no credit for Alabama tax.",
      sources: [
        src("Code of Alabama", "Section 40-23-61(c)(1)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-61",
          "An excise tax is hereby imposed on the storage, use, or other consumption in this state of any automotive vehicle or truck trailer, semitrailer or house trailer"),
        src("Code of Alabama", "Section 40-23-61(c)(1)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-61",
          "at the rate of two percent of the sales price of such automotive vehicle, truck trailer, semitrailer or house trailer"),
        src("Code of Alabama", "Section 40-23-65", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-65",
          "If the amount of tax paid to the other state is less than the Alabama tax, then the difference between the out-of-state tax and the Alabama tax must be paid."),
        src("Code of Alabama", "Section 40-23-65", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-65",
          "No credit will be allowed for taxes paid on tangible personal property in any state which does not give credit for taxes paid on similar property in Alabama."),
      ],
      caveat: "No day-count or presence test for nonresidents was found in the statute or rules.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft manufactured, sold and delivered in Alabama is exempt if it is not permanently domiciled in Alabama and is removed from the state; a first flight planned to an out-of-state destination counts as removal. Aircraft and parts sold to an air carrier with a hub operation in Alabama are exempt. There is no general fly-away exemption for aircraft built elsewhere.",
      sources: [
        src("Code of Alabama", "Section 40-23-4(a)(38)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-4",
          "The gross receipts of any aircraft manufactured, sold, and delivered in this state if the aircraft are not permanently domiciled in Alabama and are removed to another state."),
        src("Alabama Department of Revenue", "Rule 810-6-3-.78(3)", "https://www.revenue.alabama.gov/wp-content/uploads/2021/12/810-6-3-.78.pdf",
          "An aircraft manufactured, sold and delivered in Alabama shall be considered removed from Alabama if the first flight of the aircraft after delivery, excluding any intrastate flights for post-delivery maintenance or modification work or for training in Alabama, is planned for a destination outside of Alabama, provided that the foregoing is not the exclusive method for showing removal of an aircraft from Alabama.",
          { dated: "Adopted effective August 21, 2015" }),
        src("Code of Alabama", "Section 40-23-4(a)(41)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-23-4",
          "The gross receipts from the sale of any aircraft and replacement parts, components, systems, supplies, and sundries affixed or used on the aircraft and ground support equipment and vehicles used by or for the aircraft to or by a certificated or licensed air carrier with a hub operation within this state, for use in conducting intrastate, interstate, or foreign commerce for transporting people or property by air."),
      ],
      caveat:
        "The rule cites the exemption as 40-23-4(a)(37); the current Code numbers it (a)(38). \"No general fly-away exemption\" is an inference from the statute listing only the manufactured-in-Alabama exemption; no source says it in those words.",
    },
    rental: {
      status: "taxable",
      answer:
        "Leasing or renting tangible personal property owes Alabama's rental tax: four percent generally, or one and one-half percent for automotive vehicles. The sales tax rules list airplanes as automotive vehicles, but the rental tax law does not say whether that carries over, so the rate on an aircraft rental is not certain. A rental with an operator, where the customer has no control of the equipment, is not a taxable rental.",
      sources: [
        src("Code of Alabama", "Section 40-12-222(a)(1)", "https://alison.legislature.state.al.us/code-of-alabama?section=40-12-222",
          "there is hereby levied and shall be collected a privilege or license tax on each person engaging or continuing within this state in the business of leasing or renting tangible personal property at the rate of four percent of the gross proceeds derived by the lessor from the lease or rental of tangible personal property."),
        src("Code of Alabama", "Section 40-12-222(a)(2)a.", "https://alison.legislature.state.al.us/code-of-alabama?section=40-12-222",
          "the privilege or license tax on each person engaging or continuing within this state in the business of leasing or renting any automotive vehicle or truck trailer, semitrailer, or house trailer shall be at the rate of one and one-half percent of the gross proceeds derived by the lessor from the lease or rental of such automotive vehicle or truck trailer, semitrailer, or house trailer."),
        src("Alabama Administrative Code", "Rule 810-6-5-.09.01(5)", "https://admincode.legislature.state.al.us/api/chapter/810-6-5",
          "For tax to be due, the lessee must have possession or use of the tangible personal property."),
      ],
      caveat:
        "The possession quote is from Rule 810-6-5-.09.01(5), the Steel City Crane Rental passage about cranes with operators. Applying it to a wet aircraft rental is an inference; no rule mentions aircraft rentals.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Alabama's sales and rental tax rules do not address flight instruction or the aircraft time inside a lesson. Alabama taxes sales and rentals of tangible property rather than services in general, but no rule says how a flight lesson is treated.",
      sources: [],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts a repair shop installs on an automotive vehicle, which includes an airplane, are taxable retail sales. Labor is not taxed when it is stated separately on the invoice; if it is not, the whole invoice is taxable.",
      sources: [
        src("Alabama Administrative Code", "Rule 810-6-1-.07(3)", "https://admincode.legislature.state.al.us/api/chapter/810-6-1",
          "If the labor, installation, and service charges are separately stated from the sale of parts, the labor, installation, and service charges are not taxable."),
        src("Alabama Administrative Code", "Rule 810-6-1-.07(1)", "https://admincode.legislature.state.al.us/api/chapter/810-6-1",
          "The full amount of an invoice will be subject to sales or use tax when it does not separately state the parts from the labor."),
      ],
      caveat:
        "Section 40-23-4(a)(49) exempts parts for military or certified transport category aircraft whose FAA registration address is outside Alabama, until May 30, 2027; not relevant to most readers so left out of the answer.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based in Alabama owe yearly property (ad valorem) tax. Owners file an aircraft return with the Department of Revenue between October 1 and December 31, and the aircraft is assessed at 20% of market value. Crop-dusting airplanes are exempt.",
      sources: [
        src("Alabama Administrative Code", "Rule 810-4-1-.09(1)(b)", "https://admincode.legislature.state.al.us/api/rule/810-4-1-.09",
          "Owners of taxable aircraft based in Alabama shall submit an aircraft return form (ADV-ACR45) to the department either by mail or electronically through the Optional Personal Property Assessment Link (OPPAL), between October 1 and December 31 annually."),
        src("Alabama Administrative Code", "Rule 810-4-1-.09(2)(a)", "https://admincode.legislature.state.al.us/api/rule/810-4-1-.09",
          "All aircraft are assessed as Class II property (20% of market value)."),
        src("Alabama Administrative Code", "Rule 810-4-1-.09(2)(d)", "https://admincode.legislature.state.al.us/api/rule/810-4-1-.09",
          "Airplanes used exclusively for the purpose of crop dusting are exempt from ad valorem tax."),
      ],
      caveat: "No separate state aircraft registration fee was found; not confirmed with ALDOT Aeronautics.",
    },
  },
};
