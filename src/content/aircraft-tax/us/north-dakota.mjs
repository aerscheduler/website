import { src } from "../sources.mjs";

const NDCC_5740 = "https://ndlegis.gov/cencode/t57c40-5.pdf";
const NDCC_205 = "https://ndlegis.gov/cencode/t02c05.pdf";
const AERO_TAX = "https://aero.nd.gov/licensing/aircraft-excise-tax/";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "north-dakota",
  name: "North Dakota",
  code: "ND",
  summary:
    "North Dakota charges a 5 percent aircraft excise tax, paid to the Aeronautics Commission at registration, in place of sales tax. Repair labor is not taxed but parts are, and aircraft operating in the state more than 30 days register every year for a fee set by weight.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "A 5 percent excise tax on the purchase price, or 3 percent for agricultural aircraft used only for aerial application, paid to the Aeronautics Commission before the aircraft is registered. A trade-in of another aircraft or a licensed motor vehicle is deducted. Sales tax does not apply to an aircraft taxed under the excise tax.",
      sources: [
        src("North Dakota Aeronautics Commission", "Aircraft Excise Tax", AERO_TAX,
          "Excise tax must be paid at a 5% rate on the purchase price for all non‐agricultural aircraft, or a 3% rate on the purchase price on agricultural aircraft used exclusively for aerial application."),
        src("North Dakota Aeronautics Commission", "Aircraft Excise Tax", AERO_TAX,
          "Excise tax is levied on every purchase transaction, with trade‐in allowance of another aircraft or licensed motor vehicle allowed."),
        src("North Dakota Century Code", "N.D.C.C. 57-39.2-04(37)", "https://ndlegis.gov/cencode/t57c39-2.pdf",
          "Gross receipts from the sale of any aircraft taxable under the provisions of chapter 57-40.5."),
      ],
      caveat: "The Aeronautics Commission page uses non-breaking hyphens (U+2010) in 'non‐agricultural' and 'trade‐in'; quoted as published. Statute: N.D.C.C. 57-40.5-02.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "The excise tax applies to aircraft bought in or outside North Dakota. An aircraft registered within 30 days of purchase is presumed bought for use here. Tax paid to another state is credited, but only if that state gives a similar credit; the Commission lists Alaska, Delaware, Montana, New Hampshire, Oregon, Texas and West Virginia as states without reciprocity.",
      sources: [
        src("North Dakota Century Code", "N.D.C.C. 57-40.5-07(2)", NDCC_5740,
          "When an application for registration of an aircraft is received by the director within thirty days of the date it was purchased or acquired by the purchaser, it is presumed, until the contrary is shown by the purchaser that it was purchased or acquired for use in this state."),
        src("North Dakota Century Code", "N.D.C.C. 57-40.5-08", NDCC_5740,
          "If the tax imposed in another state equals or exceeds the tax imposed by this chapter, then no tax is due on such aircraft."),
        src("North Dakota Aeronautics Commission", "Aircraft Excise Tax", AERO_TAX,
          "North Dakota has reciprocity with all States on sales or excise taxes except Alaska, Delaware, Montana, New Hampshire, Oregon, Texas and West Virginia."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "The excise tax exempts government aircraft, one aircraft of a disabled veteran, family and joint-tenant transfers without payment, air ambulances, aviation museums, aircraft of private nonprofit schools not used commercially, and a lessee's purchase after one year or longer in possession when the lessor paid the tax. A licensed dealer's aircraft held for sale and used only for demonstration is not taxed. There is no general nonresident or carrier exemption.",
      sources: [
        src("North Dakota Century Code", "N.D.C.C. 57-40.5-03(4)", NDCC_5740,
          "Aircraft transferred between a lessee and lessor, if the lessee has been in continuous possession of the aircraft for a period of one year or longer, and if the lessor has paid either the tax imposed under this chapter at the time of registering the aircraft in this state or the use tax imposed by chapter 57-40.2."),
        src("North Dakota Century Code", "N.D.C.C. 57-40.5-03(5)", NDCC_5740,
          "Aircraft acquired by any parochial or private nonprofit school."),
        src("North Dakota Aeronautics Commission", "Aircraft Excise Tax", AERO_TAX,
          "A purchaser of an aircraft who is licensed as an Aircraft Dealer within North Dakota, and who uses such property solely for demonstration or display and for which no charge is made while holding it for sale in the regular course of business, is not subject to the excise tax."),
      ],
      caveat: "'No general nonresident or carrier exemption' rests on the closed list in 57-40.5-03. The Commission page adds that nonresidents bringing in aircraft for commercial use 'may be subject to the excise tax'.",
    },
    rental: {
      status: "unclear",
      answer:
        "The excise statute also reaches the lease or rental cost of an aircraft rented dry, less fuel. A 2019 Attorney General's opinion says that when a purchase requiring registration occurs, the tax is figured on the purchase price, not later rental income, so how hourly rentals of an aircraft already taxed at purchase are treated is not clear.",
      sources: [
        src("North Dakota Century Code", "N.D.C.C. 57-40.5-02", NDCC_5740,
          "There is imposed an excise tax at the rate of five percent on the purchase price of any aircraft purchased or acquired either in or outside of the state of North Dakota or on the lease or rental cost of any aircraft, less fuel, if rented dry and required to be registered under the laws of"),
        src("North Dakota Aeronautics Commission", "Aircraft Excise Tax", AERO_TAX,
          "if a purchase requiring registration under the laws of the state of North Dakota occurs, the aircraft excise tax must be calculated based on the purchase price, not the subsequent lease or rental cost."),
      ],
      caveat: "The 57-40.5-02 sentence continues on the next PDF page ('this state, except on aircraft ... designed or modified for exclusive use as agricultural aircraft'). Read the AG opinion 2019-L-01 before publishing; no Tax Commissioner guidance on sales tax for aircraft rentals found.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Neither the Tax Commissioner nor the Aeronautics Commission publishes guidance on whether flight instruction or the aircraft time inside a lesson is taxed. A school buying an aircraft pays the 5 percent excise tax unless it is a private nonprofit school whose aircraft is not used commercially.",
      sources: [
        src("North Dakota Aeronautics Commission", "Aircraft Excise Tax", AERO_TAX,
          "Excise tax must be paid at a 5% rate on the purchase price for all non‐agricultural aircraft, or a 3% rate on the purchase price on agricultural aircraft used exclusively for aerial application."),
        src("North Dakota Century Code", "N.D.C.C. 57-40.5-03(5)", NDCC_5740,
          "The aircraft is not to be used for commercial activities."),
      ],
      caveat: "Searched tax.nd.gov guidelines and N.D.C.C. 57-39.2 for flight instruction; nothing found.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Repair labor is not taxable in North Dakota. Parts and other property sold or used in a repair are subject to sales or use tax, and the shop should itemize them on the invoice.",
      sources: [
        src("North Dakota Office of State Tax Commissioner", "Contractors", "https://www.tax.nd.gov/contractors",
          "Repair service labor is not taxable in North Dakota. However, tangible personal property sold or used for a repair is subject to sales or use tax."),
        src("North Dakota Office of State Tax Commissioner", "Contractors", "https://www.tax.nd.gov/contractors",
          "For example, if a contractor replaced the motor in your lawn mower, the contractor’s service labor is not taxable, but sales tax is collected on the itemized amount for the motor."),
      ],
      caveat: "General repair guidance, not aircraft-specific. No aircraft parts exemption found (a 2009 bill, SB 2374, to create one failed).",
    },
    annual: {
      status: "taxable",
      answer:
        "Every aircraft operating in North Dakota more than 30 days registers with the Aeronautics Commission each calendar year. The fee is set by maximum take-off weight, from $15 for 500 pounds or less to $3,000 for 100,001 pounds and over, and is half for aircraft based in the state after June 30. Antique, classic and warbird aircraft used only for display may instead register permanently, for one hundred twenty-five dollars.",
      sources: [
        src("North Dakota Century Code", "N.D.C.C. 2-05-11(1)", NDCC_205,
          "every aircraft or ultralight vehicle operating within this state for more than thirty days must be registered with the aeronautics commission for each calendar year in which the aircraft or ultralight vehicle is operated within this state, subject to rules adopted by the commission."),
        src("North Dakota Century Code", "N.D.C.C. 2-05-11(1), fee table", NDCC_205, "0 to 500 $ 15.00"),
        src("North Dakota Century Code", "N.D.C.C. 2-05-11(1), fee table", NDCC_205, "100,001 and over 3,000.00"),
        src("North Dakota Century Code", "N.D.C.C. 2-05-11(1)", NDCC_205,
          "For aircraft that become based in the state after June thirtieth of a calendar year, the registration fee is one-half the annual fee."),
        src("North Dakota Century Code", "N.D.C.C. 2-05-11.3", NDCC_205,
          "The fee for a permanent registration under section 2 -05-11.2 is one hundred twenty -five dollars."),
      ],
      caveat: "Fee-table quotes have the PDF's column spacing collapsed to single spaces; '$125' is spelled out in the statute ('one hundred twenty -five dollars', PDF spacing kept). Whether aircraft also escape local property tax not checked.",
    },
  },
};
