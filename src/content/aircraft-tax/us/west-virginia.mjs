import { src } from "../sources.mjs";

const WV = (s) => `https://code.wvlegislature.gov/${s}/`;
const CODE = "West Virginia Code";
const FLYAWAY =
  "Sales of an aircraft sold in this state on or after July 1, 2020, as evidenced by a Federal Aviation Administration Bill of Sale AC Form 8050-2 and registered outside of this state as evidenced by Federal Aviation Administration Aircraft Registration AC Form 8050-1 shall be exempt, so long as the aircraft is removed from this state within 60 days of the date of purchase on the bill of sale.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "west-virginia",
  name: "West Virginia",
  code: "WV",
  summary:
    "West Virginia charges 6 percent sales or use tax on aircraft, with a 60-day fly-away exemption for aircraft registered elsewhere. Aircraft repair, maintenance and installed parts have been exempt since September 2021, and counties tax aircraft as personal property.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "West Virginia's consumers sales and service tax is six cents on the dollar, and an aircraft sold in the state is taxed unless an exemption applies. The Tax Department publishes no aircraft-specific guidance on private sales or local tax.",
      sources: [
        src(CODE, "W. Va. Code 11-15-3(b)", WV("11-15-3"),
          "The general consumers sales and service tax imposed by this article shall be at the rate of six cents on the dollar of sales or services, excluding gasoline and special fuel sales, which remain taxable at the rate of five cents on the dollar of sales."),
      ],
      caveat: "Municipal sales taxes up to 1 percent exist; whether they apply to aircraft was not checked. No casual-sale rule for aircraft found.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax at six percent applies to an aircraft used in West Virginia that was not taxed on purchase. Sales tax lawfully paid to another state is credited, up to the West Virginia use tax.",
      sources: [
        src(CODE, "W. Va. Code 11-15A-2(a)", WV("11-15A-2"),
          "An excise tax is hereby levied and imposed on the use in this state of tangible personal property, custom software or taxable services, to be collected and paid as provided in this article or article fifteen-b of this chapter, at the rate of six percent of the purchase price of the property"),
        src(CODE, "W. Va. Code 11-15A-10a(a)", WV("11-15A-10a"),
          "A person is entitled to a credit against the tax imposed by this article on the use of a particular item of tangible personal property, custom software or service equal to the amount, if any, of sales tax lawfully paid to another state for the acquisition of that property or service: Provided, That the amount of credit allowed does not exceed the amount of use tax imposed on the use of the property in this state."),
      ],
      caveat: "No day-count threshold for visiting aircraft found, other than the 60-day removal window in 11-15-9(a)(50).",
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft sold in West Virginia and registered outside it is exempt if removed within 60 days of purchase. Repairs and installed parts for aircraft of licensed carriers and governments have a separate exemption, now widened to all aircraft.",
      sources: [
        src(CODE, "W. Va. Code 11-15-9(a)(50)", WV("11-15-9"), FLYAWAY),
        src(CODE, "W. Va. Code 11-15-9(a)(33)", WV("11-15-9"),
          "Sales of aircraft repair, remodeling, and maintenance services when the services are to an aircraft operated by a certified or licensed carrier of persons or property, or by a governmental entity"),
      ],
      caveat: "No exemption for the purchase of an aircraft by a carrier, a lessor or a flight school found in 11-15-9.",
    },
    rental: {
      status: "unclear",
      answer: "The Tax Department publishes no guidance on how aircraft rentals are taxed.",
      sources: [],
      caveat: "West Virginia generally taxes rentals of tangible personal property; no aircraft source found.",
    },
    instruction: {
      status: "unclear",
      answer: "The Tax Department publishes no guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
      caveat: "West Virginia taxes services broadly (11-15-8); whether flight instruction is a taxable service was not determined.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Aircraft repair, remodeling and maintenance services, parts permanently attached in the course of that work, and tools used only for it are exempt for sales on and after September 1, 2021. The buyer pays and claims a refund, or uses a direct pay permit or an approved exemption certificate.",
      sources: [
        src(CODE, "W. Va. Code 11-15-9t(a)", WV("11-15-9t"),
          "The following sales are exempt from the consumers sales and service tax: Sales of aircraft repair, remodeling, and maintenance services, or to an engine or other component part of an aircraft; sales of tangible personal property that is permanently affixed or permanently attached as a component part of an aircraft, as part of the repair, remodeling, or maintenance service;"),
        src(CODE, "W. Va. Code 11-15-9t(d)", WV("11-15-9t"), "The provisions of this section shall apply to sales made on and after September 1, 2021."),
      ],
      caveat: "Refund or certificate procedure is 11-15-9t(b).",
    },
    annual: {
      status: "conditional",
      answer:
        "Counties tax aircraft as personal property. Aircraft owned or leased by commercial airlines, or by businesses that fly employees or others for business purposes, are valued at salvage value: the lower of fair market salvage value or five percent of original cost. We found no state aircraft registration fee.",
      sources: [
        src(CODE, "W. Va. Code 11-6H-3", WV("11-6H-3"),
          "Notwithstanding any other provision of this code to the contrary, the value of special aircraft property, for the purpose of ad valorem property taxation under this chapter and under article X of the Constitution of the State of West Virginia, shall be its salvage value."),
        src(CODE, "W. Va. Code 11-6H-2(b)(7)", WV("11-6H-2"), "“Special aircraft property” means all aircraft owned or leased by commercial airlines or private carriers"),
        src(CODE, "W. Va. Code 11-6H-2(b)(6)", WV("11-6H-2"), "“Salvage value” means the lower of fair market salvage value or five percent of the original cost of the property."),
        src(CODE, "W. Va. Code 11-6H-2(b)(5)", WV("11-6H-2"),
          "that is engaged in a primary business other than commercial air transportation that operates an aircraft for the transportation of employees or others for business purposes."),
      ],
      caveat: "Text read from the PDF of article 6H (code.wvlegislature.gov/pdf/11-6H/). Valuation of personal-use aircraft and the existence of county taxation of them rest on general property tax law (11-3), not read; the WV Aeronautics Commission statute (29-2A) has no registration section.",
    },
  },
};
