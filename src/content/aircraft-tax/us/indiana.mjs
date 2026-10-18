import { src } from "../sources.mjs";

const DOR = "Indiana Department of Revenue";
const SIB74 = "https://www.in.gov/dor/files/sib74.pdf";
const SIB74_T = "Sales Tax Information Bulletin #74, Sales and Use Tax Exemption for Aircraft Being Repaired or Remanufactured";
const SIB74_D = { dated: "May 2026" };
const SIB76 = "https://www.in.gov/dor/files/sib76.pdf";
const SIB76_T = "Sales Tax Information Bulletin #76, Determination of Sales Tax for Leased Aircraft and for Flight Instruction";
const SIB76_D = { dated: "April 2023" };
const AE7 = "https://forms.in.gov/Download.aspx?id=14086";
const AE7_T = "Form AE-7, Application for Aircraft Registration, instructions";
const AE7_D = { dated: "R11 / 7-26" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "indiana",
  name: "Indiana",
  code: "IN",
  summary:
    "Indiana charges 7 percent sales or use tax on aircraft, with a nonresident exemption if the aircraft leaves within 30 days. The aircraft rental inside a flight lesson is taxed while separately stated instruction is not, and aircraft register every year with the Department of Revenue and pay an aircraft excise tax by weight, age and type.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "7% sales or use tax on the purchase price less any trade-in. An aircraft bought from a private seller is reported and the tax paid when the owner registers it with the Department of Revenue, within 31 days of purchase.",
      sources: [
        src(DOR, `${AE7_T}, line 35`, AE7, "The current sales/use tax rate is 7%.", AE7_D),
        src(DOR, AE7_T, AE7,
          "Any resident of Indiana who owns an aircraft must submit this form within 31 days of purchase date or within 31days of the Federal Aviation Administration (F A A) issuing the airworthiness certificate in the case of homebuilt aircraft.",
          AE7_D),
      ],
      caveat: "Indiana has no local sales tax as far as known, but no source quoted here says so; the answer does not mention local tax.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax at 7% applies to an aircraft brought into Indiana, with a credit for sales tax paid to another state up to the Indiana amount. A nonresident who bases an aircraft in Indiana for more than 60 days must register it. Aircraft brought in only for repair, completion work or a prepurchase evaluation, and flown out within 30 days after the work, are exempt.",
      sources: [
        src(DOR, `${AE7_T}, line 35`, AE7, "The current sales/use tax rate is 7%.", AE7_D),
        src(DOR, `${AE7_T}, line 37`, AE7,
          "If you paid sales tax to another state, you are entitled to a credit not to exceed the amount on Line 36.", AE7_D),
        src(DOR, AE7_T, AE7,
          "Any nonresident who bases an aircraft in Indiana for more than 60 days must submit this form within 60 days of establishing a base in Indiana.", AE7_D),
        src(DOR, SIB74_T, SIB74,
          "Within 30 days after completion of the repair, refurbishment, remanufacture, or prepurchase evaluation, the aircraft is transported to a destination outside Indiana.", SIB74_D),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "A nonresident's purchase is exempt if the aircraft leaves Indiana within 30 days after delivery or after work done in Indiana, is titled or registered elsewhere, and is not titled or registered in Indiana. Indiana presumes evasion when an Indiana resident buys through a business formed in a state without sales tax, such as Montana or Delaware, and from July 1, 2026 adds a $500 penalty. A purchase for rental is exempt only if yearly rental revenue reaches 7.5% of the price, and aircraft leased for public transportation are exempt.",
      sources: [
        src(DOR, SIB74_T, SIB74, "The purchaser transports the aircraft to a destination outside Indiana within 30 days after:", SIB74_D),
        src(DOR, SIB74_T, SIB74, "The aircraft will not be titled or registered in Indiana.", SIB74_D),
        src(DOR, SIB74_T, SIB74,
          "purchased by a limited liability company, partnership, corporation, or other closely held business organized in another state that does not have a sales tax or equivalent tax (i.e., Montana, Alaska, Delaware, Oregon, and New Hampshire);",
          SIB74_D),
        src(DOR, SIB74_T, SIB74,
          "Beginning July 1, 2026, the purchaser will also be subject to a $500 penalty for each transaction made after June 30, 2026.", SIB74_D),
        src(DOR, SIB76_T, SIB76,
          "An exemption will be granted on the purchase of the aircraft if the annual revenue derived from renting or leasing the aircraft is equal to or greater than 7.5% of the net acquisition price for the aircraft or the book value of the aircraft as published in the Vref Aircraft Value Reference (VAVR) guide for the aircraft.",
          SIB76_D),
        src(DOR, SIB76_T, SIB76,
          "A person who acquires an aircraft to rent or lease to another person for predominate use in public transportation by the other person is exempt from sales or use tax.", SIB76_D),
      ],
    },
    rental: {
      status: "taxable",
      answer:
        "Aircraft rentals and leases are taxed, and every use of a rental aircraft, including by related parties, must be charged a rental fee plus sales tax. An owner who bought the aircraft tax-free for rental must keep yearly rental revenue at 7.5% of the price until the tax collected on rentals equals the tax exempted, or 13 years pass, or owe use tax on the original price.",
      sources: [
        src(DOR, SIB76_T, SIB76, "All use of the aircraft must be charged a lease or rental fee plus sales tax, including related parties.", SIB76_D),
        src(DOR, SIB76_T, SIB76,
          "A person is required to meet the 7.5% revenue requirement until the earlier of the date the aircraft has generated Indiana sales tax on leases or rental income that equals the amount of the original sales tax exemption, or the elapse of 13 years.",
          SIB76_D),
        src(DOR, SIB76_T, SIB76,
          "If a person engaged in the business of leasing an aircraft does not meet the minimum annual revenue amount for the lease of the aircraft, the person will be subject to use tax in the amount of sales tax that would have been originally due based on the original cost or VAVR book value of the aircraft.",
          SIB76_D),
      ],
    },
    instruction: {
      status: "conditional",
      answer:
        "When a lesson combines aircraft rental with instruction, the aircraft rental charge is taxable. The instructor's charge is exempt if it is stated separately from the aircraft rental.",
      sources: [
        src(DOR, SIB76_T, SIB76,
          "If the instructor leases or rents an aircraft to the student and provides flight instruction to the student during the term of the lease or rental, the gross retail income that is subject to the sales tax is the amount charged by the instructor for the lease or rental of the aircraft used in conjunction with the flight instruction services provided to the student pilot.",
          SIB76_D),
        src(DOR, SIB76_T, SIB76,
          "Any charges related to the instructor's service of instructing the student are exempt from the sales tax if the lease or rental of the aircraft and the charge for the instructor's services are separately stated.",
          SIB76_D),
      ],
      caveat: "The bulletin does not say what happens when instruction and aircraft are billed as one price; presumably the whole charge is taxable, but that is not stated.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts, materials, equipment and engines used in repairing or maintaining an aircraft or its avionics are exempt when the work is done by an FAA repair station, or by an FAA-certified mechanic working from a leased maintenance facility at a public-use airport that meets the airport's minimum standards.",
      sources: [
        src(DOR, SIB74_T, SIB74,
          "There is also a sales tax exemption for parts, materials, equipment, and engines used, consumed, or installed in the repair, maintenance, refurbishing, remodeling, or remanufacturing of an aircraft or an avionics system of an aircraft.",
          SIB74_D),
        src(DOR, SIB74_T, SIB74,
          "If the work is performed by a retail merchant who possesses a valid repair station certificate issued by the Federal Aviation Administration; or", SIB74_D),
        src(DOR, SIB74_T, SIB74,
          "has leased a facility at a public use airport for the maintenance of aircraft, b. meets the public use airport owner's minimum standards for an aircraft facility, and c. the work is performed by a mechanic who is certified by the Federal Aviation Administration.",
          SIB74_D),
      ],
      caveat: "Treatment of repair labor is not stated in the bulletin; the answer covers parts only. Work by a mechanic who does not meet either condition makes the parts taxable.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based in Indiana register with the Department of Revenue every year for a $10 fee and pay an aircraft excise tax per pound of maximum landing weight, set by class and age. A piston aircraft up to 4 years old pays four cents a pound, falling with age to one cent a pound at 26 years and older.",
      sources: [
        src(DOR, `${AE7_T}, line 44`, AE7,
          "The registration fee is $10 unless the aircraft is owned by a nonprofit museum or by the State of Indiana, in which case there is no registration fee.", AE7_D),
        src(DOR, "Form AE-7, line 23 rate table, ages | Class A | Class B | Class C | Class D", AE7, "0-4 Years $.04 $.065 $.09 $.0175", AE7_D),
        src(DOR, "Form AE-7, line 23 rate table, ages | Class A | Class B | Class C | Class D", AE7, "26 Years and Older $.01 $.01 $.01 $.005", AE7_D),
      ],
      caveat:
        "Whether the aircraft excise tax replaces personal property tax was not confirmed in a primary source; the answer does not say so. The schedule is from the July 2026 form and matches the DOR miscellaneous rates page.",
    },
  },
};
