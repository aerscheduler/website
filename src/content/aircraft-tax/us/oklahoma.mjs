import { src } from "../sources.mjs";

const OSCN = (id) => `https://www.oscn.net/applications/oscn/DeliverDocument.asp?CiteID=${id}`;
const OS = "Oklahoma Statutes";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "oklahoma",
  name: "Oklahoma",
  code: "OK",
  summary:
    "Oklahoma charges a 3.25 percent aircraft excise tax in place of sales tax when an aircraft is bought or based in the state. Engine, airframe, interior and paint repairs and parts are exempt from sales tax, and aircraft based in Oklahoma pay a yearly registration fee by weight and type in place of property tax.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "An excise tax of three and one-fourth percent of the purchase price applies when ownership of an FAA-registered aircraft transfers, in place of sales tax and other transfer taxes. Service Oklahoma collects it when it registers the aircraft, and it becomes delinquent from the twentieth day after ownership or possession is obtained.",
      sources: [
        src(OS, "68 O.S. 6002", OSCN(93319),
          "Beginning on and after July 1, 1984, there shall be levied an excise tax of three and one-fourth percent (3 1/4%) of the purchase price of each aircraft that is to be registered with the Federal Aviation Administration, upon the transfer of legal ownership of any such aircraft or the use of any such aircraft within this state."),
        src(OS, "68 O.S. 6002", OSCN(93319),
          "The excise tax levied pursuant to the provisions of this section shall be delinquent from and after the twentieth day after the legal ownership or possession of any aircraft is obtained."),
      ],
      caveat: "'In place of sales tax' rests on 6002's 'in lieu of all other taxes on the transfer or the first registration'; OAC 710:65-13-30 says so directly but was only read on a Justia mirror.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "The excise tax also applies to use in Oklahoma, which means operating or basing the aircraft at an Oklahoma airport for 30 days or more. Tax paid to another state is credited, and only the difference in rates is owed. Aircraft stored here awaiting shipment to another state, or kept here only for repair or maintenance, are not in use.",
      sources: [
        src(OS, "68 O.S. 6001(4)", OSCN(93318),
          "\"Use\" means and includes the operation or basing of an aircraft on or from any airport in this state for a period of thirty (30) days or more."),
        src(OS, "68 O.S. 6003(11)", OSCN(93320),
          "Aircraft on which a tax levied pursuant to the laws of another state, in an amount less than the excise tax levied by Section 6002 of this title, has been paid by the person using the aircraft in this state shall be subject to the levy of the excise tax at a rate equal to the difference between the rate of tax levied by Section 6002 of this title and the rate of tax levied by the other state;"),
        src(OS, "68 O.S. 6001(4)", OSCN(93318),
          "For purposes of Section 6001 et seq. of this title, the term \"use\" does not apply to aircraft which are intended for exclusive use in another state, but which are stored in this state pending shipment to such other state, or aircraft which are retained in this state solely for fabrication, repair, testing, alteration, modification, refurbishing or maintenance."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Exempt: aircraft over $2,500,000 sold to a nonresident for immediate transfer out of state; airline and Part 135 aircraft that fly Part 91 no more than 50 percent of their operations; dealer inventory; government aircraft; inheritances; gifts between spouses or parent and child; and transfers into and out of entities the same owners control.",
      sources: [
        src(OS, "68 O.S. 6003(16)", OSCN(93320),
          "Aircraft which have a selling price in excess of Two Million Five Hundred Thousand Dollars ($2,500,000.00) and which are transferred to a purchaser who is not a resident of this state for immediate transfer out of state;"),
        src(OS, "68 O.S. 6003(5)", OSCN(93320),
          "Aircraft purchased or used by commercial airlines as defined by paragraph 2 of Section 6001 of this title, provided any such aircraft does not operate under Part 91 of Title 14 of the Code of Federal Regulations, 14 C.F.R., Part 91, for more than fifty percent (50%) of its annual operations."),
        src(OS, "68 O.S. 6003(14)", OSCN(93320),
          "Aircraft which is transferred between husband and wife or parent and child where no valuable consideration is given;"),
      ],
      caveat: "6003 has 18 items; agricultural spraying, trust and entity-reorganization items summarized loosely. No exemption for aircraft held for rental or for flight schools.",
    },
    rental: {
      status: "unclear",
      answer:
        "Oklahoma's sales tax reaches the rental or lease of tangible personal property, but no Tax Commission rule or statute we found says how that applies to aircraft rentals, given the excise tax paid at purchase.",
      sources: [
        src(OS, "68 O.S. 1354(A)(18)", OSCN(440447),
          "The gross receipts or gross proceeds from the rental or lease of tangible personal property, including rental or lease of personal property when the rental or lease agreement requires the vendor to launder, clean, repair, or otherwise service the rented or leased property on a regular basis, without any deduction for the cost of the service rendered."),
      ],
      caveat: "Searched 68 O.S. 1354, 1357, 6001-6007 and the OAC 710:65 aircraft rules (Justia mirror); none addresses aircraft rental.",
    },
    instruction: {
      status: "unclear",
      answer:
        "Oklahoma does not publish guidance on whether flight instruction or the aircraft time inside a lesson is taxed. A school buying an aircraft pays the excise tax; the exemption list has none for flight schools.",
      sources: [
        src(OS, "68 O.S. 6002", OSCN(93319),
          "Beginning on and after July 1, 1984, there shall be levied an excise tax of three and one-fourth percent (3 1/4%) of the purchase price of each aircraft that is to be registered with the Federal Aviation Administration, upon the transfer of legal ownership of any such aircraft or the use of any such aircraft within this state."),
      ],
      caveat: "The only training exemption (6003(18), rotary-wing aircraft for U.S. military training) ended January 1, 2018.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Engine repairs and parts, airframe repairs and modification, interior modification, paint, and the labor for that work are exempt from sales tax. Other parts and accessories, such as avionics, are not named in the exemption.",
      sources: [
        src(OS, "68 O.S. 1357(28)", OSCN(92350),
          "Beginning July 1, 2005, sales of aircraft engine repairs, modification, and replacement parts, sales of aircraft frame repairs and modification, aircraft interior modification, and paint"),
      ],
      caveat: "OSCN shows 1357 with versions effective 11/01/2026 and 01/01/2027; paragraph 28 reads the same in each except one serial comma, so the quote stops before it. Whether avionics count as 'frame' or 'interior' work is not addressed; OAC 710:65-13-63 restates the exemption (Justia mirror only).",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based or operated in Oklahoma 30 days or more register every year with Service Oklahoma. Single-engine piston aircraft pay from $30 under 1,750 pounds to $2,250 at 100,001 pounds and over; rotorcraft pay two times, multiengine piston three, turboprops six and jets ten times that. Fees drop 10 percent a year from manufacture down to 50 percent; antique, homebuilt, sailplanes and balloons pay $10. The fee is in place of property tax.",
      sources: [
        src(OS, "3 O.S. 254(B)", OSCN(64713), "Registration requirements shall not apply to aircraft based or operated in the state for less than thirty (30) days."),
        src(OS, "3 O.S. 256(A)(1), Schedule A", OSCN(64717), "Less than 1,750 $30.00"),
        src(OS, "3 O.S. 256(A)(1), Schedule A", OSCN(64717), "100,001 and over $2,250.00"),
        src(OS, "3 O.S. 256(A)(6)", OSCN(64717),
          "Antique aircraft as defined by the Federal Aviation Administration, sailplanes, balloons, and home-built aircraft shall be subject to a flat-rate fee of Ten Dollars ($10.00)."),
        src(OS, "3 O.S. 256(A)(7)", OSCN(64717),
          "shall be reduced at a rate of ten percent (10%) each year following the date of manufacture until the fee is equal to fifty percent (50%) of the original fee, which shall then be the fee for each year thereafter."),
        src(OS, "3 O.S. 256(B)", OSCN(64717), "Registration fees and taxes shall be in lieu of all aircraft ad valorem taxes."),
      ],
      caveat: "Schedule A quotes join the table's weight and fee cells with a space. Multipliers are 256(A)(2)-(5). An owner may appeal the fee and be assessed instead at fair market value times 12 percent at county millage (256(A)(8)).",
    },
  },
};
