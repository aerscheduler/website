import { src } from "../sources.mjs";

const MEMO15 = "https://www.tax.ny.gov/pdf/memos/sales/m15_3s.pdf";
const MEMO09 = "https://www.tax.ny.gov/pdf/memos/sales/m09_18s.pdf";
const T1115 = "https://www.nysenate.gov/legislation/laws/TAX/1115";
const T1101 = "https://www.nysenate.gov/legislation/laws/TAX/1101";
const DTF = "New York State Department of Taxation and Finance";
const M15 = { dated: "July 24, 2015" };
const M09 = { dated: "November 5, 2009" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "new-york",
  name: "New York",
  code: "NY",
  summary:
    "New York exempts general aviation aircraft, their sale, lease or rental, and equipment installed on them from state and local sales and use tax, and exempts repair and maintenance services on aircraft. Aircraft used for hire are covered by a separate commercial aircraft exemption.",
  facts: {
    buying: {
      status: "exempt",
      answer:
        "Buying a general aviation aircraft is exempt from state and local sales tax, including built-in equipment needed for its operation such as avionics. Accessories such as artwork, tableware or linens are taxable and should be invoiced separately.",
      sources: [
        src("New York Tax Law", "Section 1115(a)(21-a)", T1115, "(21-a) General aviation aircraft, and machinery or equipment to be installed on such aircraft."),
        src(DTF, "TSB-M-15(3)S, Sales and Use Tax Exemption for General Aviation Aircraft", MEMO15,
          "Effective September 1, 2015, Part TT of Chapter 59 of the Laws of 2015 amends the Tax Law to provide an exemption from state and local sales and use tax (sales tax) for general aviation aircraft and for machinery or equipment to be installed on general aviation aircraft.", M15),
        src(DTF, "TSB-M-15(3)S, Sales and Use Tax Exemption for General Aviation Aircraft", MEMO15,
          "Such items remain fully taxable and should be invoiced separately from the price of the aircraft itself.", M15),
      ],
    },
    bringingIn: {
      status: "exempt",
      answer: "The exemption covers use tax too, so a general aviation aircraft bought elsewhere and used in New York owes no New York use tax.",
      sources: [
        src(DTF, "TSB-M-15(3)S, Sales and Use Tax Exemption for General Aviation Aircraft", MEMO15,
          "Effective September 1, 2015, Part TT of Chapter 59 of the Laws of 2015 amends the Tax Law to provide an exemption from state and local sales and use tax (sales tax) for general aviation aircraft and for machinery or equipment to be installed on general aviation aircraft.", M15),
      ],
    },
    exemptions: {
      status: "exempt",
      answer:
        "General aviation means any civil aircraft that is not a commercial, military or drone aircraft. Commercial aircraft, those used primarily to carry people or property for hire, have their own exemption when primarily engaged in commerce. Either way the aircraft is exempt, so no fly-away exemption is needed.",
      sources: [
        src("New York Tax Law", "Section 1115(a)(21-a)", T1115,
          "For purposes of this subdivision, \"general aviation aircraft\" means an aircraft that is used in civil aviation, that is not a commercial aircraft as defined in paragraph seventeen of subdivision (b) of section eleven hundred one of this article, military aircraft, unmanned aerial vehicle or drone."),
        src("New York Tax Law", "Section 1101(b)(17)", T1101,
          "Aircraft used primarily (i) to transport persons or property, for hire, (ii) by the purchaser of the aircraft to transport such person's tangible personal property in the conduct of such person's business, or (iii) for both such purposes."),
        src("New York Tax Law", "Section 1115(a)(21)", T1115,
          "(21) Commercial aircraft primarily engaged in intrastate, interstate or foreign commerce, machinery or equipment to be installed on such aircraft and property used by or purchased for the use of such aircraft for maintenance and repairs and flight simulators purchased by commercial airlines."),
      ],
      caveat: "A commercial aircraft that is not primarily engaged in commerce would fall outside both exemptions; we found no guidance on that edge case.",
    },
    rental: {
      status: "exempt",
      answer: "The exemption applies to the lease or rental of a general aviation aircraft as well as its sale.",
      sources: [
        src(DTF, "TSB-M-15(3)S, Sales and Use Tax Exemption for General Aviation Aircraft", MEMO15,
          "For the sale (including a lease or rental) of a general aviation aircraft, the new exemption applies to the receipts for:", M15),
      ],
    },
    instruction: {
      status: "unclear",
      answer:
        "We found no New York source that addresses flight instruction fees. The aircraft rental inside a lesson, and a school's purchase of training aircraft, fall under the general aviation exemption.",
      sources: [
        src(DTF, "TSB-M-15(3)S, Sales and Use Tax Exemption for General Aviation Aircraft", MEMO15,
          "For the sale (including a lease or rental) of a general aviation aircraft, the new exemption applies to the receipts for:", M15),
      ],
      caveat: "New York taxes only enumerated services, and instruction is not one we know of, but we did not find a primary source that says so for flight training.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Installing, maintaining, servicing and repairing aircraft are exempt services, along with parts that become part of the aircraft and storage during the work. Machinery or equipment installed on a general aviation aircraft is exempt too.",
      sources: [
        src("New York Tax Law", "Section 1115(dd)(1)", T1115,
          "Services otherwise taxable under paragraph three of subdivision (c) of section eleven hundred five or under section eleven hundred ten of this article, and tangible personal property purchased and used by the person who sells such services in performing such services, where such property becomes a physical component part of the property upon which the services are performed or where such property is a lubricant applied to aircraft, shall be exempt from tax under this article where such services are performed on aircraft."),
        src(DTF, "TSB-M-09(18)S, Repair and Maintenance of Aircraft Exemption Made Permanent", MEMO09, "the services of maintaining, servicing, and repairing aircraft.", M09),
        src(DTF, "TSB-M-15(3)S, Sales and Use Tax Exemption for General Aviation Aircraft", MEMO15,
          "Machinery or equipment that is installed on a general aviation aircraft subsequent to its purchase and that is necessary for:", M15),
      ],
      caveat: "Parts bought over the counter by an owner (not installed by the repair vendor) are exempt only if they are \"machinery or equipment\" for equipping or normal operation; consumable parts sold separately were not confirmed.",
    },
    annual: {
      status: "unclear",
      answer: "We found no New York primary source on a yearly state aircraft registration fee or a property tax on aircraft.",
      sources: [],
    },
  },
};
