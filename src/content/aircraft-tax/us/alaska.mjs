import { src } from "../sources.mjs";

const NO_STATE_TAX = src("Alaska Department of Commerce, Community, and Economic Development, Office of the State Assessor", "Alaska Sales Tax Information",
  "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation",
  "The State of Alaska does NOT levy a sales tax.");
const LOCAL_TAX = src("Alaska Department of Commerce, Community, and Economic Development, Office of the State Assessor", "Alaska Sales Tax Information",
  "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation",
  "The state constitution and other state laws give very broad authority to cities and boroughs in enacting a sales tax ordinance and determining what is taxable.");

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "alaska",
  name: "Alaska",
  code: "AK",
  summary:
    "Alaska has no state sales or use tax, but many cities and boroughs levy their own sales tax and decide what it covers, so the answer depends on where the aircraft is bought, based, rented or repaired. No state aircraft registration fee was found in force.",
  facts: {
    buying: {
      status: "conditional",
      answer:
        "No state sales tax. Several cities and boroughs levy their own sales tax and decide locally what is taxable, so a local tax can apply depending on where the sale takes place.",
      sources: [
        NO_STATE_TAX,
        src("Alaska Department of Commerce, Community, and Economic Development, Office of the State Assessor", "Alaska Sales Tax Information",
          "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation",
          "Several local municipalities within the state do levy a sales tax."),
        LOCAL_TAX,
      ],
      caveat: "No municipal ordinance was checked for how a local sales tax treats an aircraft sale (some cap the taxable amount per item).",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "No state use tax. A city or borough that levies a sales tax may also levy a use tax on goods stored or used there; sales tax already paid is credited, and only any difference is owed.",
      sources: [
        NO_STATE_TAX,
        src("Alaska Department of Commerce, Community, and Economic Development, Office of the State Assessor", "Alaska Sales Tax Information",
          "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation",
          "State law also allows municipalities that levy a sales tax to levy a use tax, which is a tax levied on the storage, use, or consumption of goods in a municipality."),
        src("Alaska Department of Commerce, Community, and Economic Development, Office of the State Assessor", "Alaska Sales Tax Information",
          "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation",
          "State law requires that if you furnish proof to the municipality that you have paid a sales tax on the item, you will only have to pay for the difference in the amount of the sales tax paid and the use tax, if there is a difference."),
      ],
    },
    exemptions: {
      status: "unclear",
      answer:
        "With no state sales tax there is no state exemption to plan around. Exemptions from local sales taxes are set by each city or borough, and the state does not publish them for aircraft.",
      sources: [
        src("Alaska Department of Commerce, Community, and Economic Development, Office of the State Assessor", "Alaska Sales Tax Information",
          "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation",
          "There are some exemptions spelled out in state law; however, other than these, exemptions are a local issue."),
      ],
    },
    rental: {
      status: "conditional",
      answer: "No state tax on aircraft rentals. Whether a local sales tax applies to a rental depends on the city or borough's own ordinance.",
      sources: [NO_STATE_TAX, LOCAL_TAX],
    },
    instruction: {
      status: "conditional",
      answer: "No state tax on flight instruction. Some local sales taxes reach services, so whether a lesson is taxed depends on the city or borough's own ordinance.",
      sources: [NO_STATE_TAX, LOCAL_TAX],
      caveat: "\"Some local sales taxes reach services\" is not stated in the quoted source; it only says municipalities decide what is taxable. No municipal ordinance was checked.",
    },
    maintenance: {
      status: "conditional",
      answer: "No state tax on parts or repair labor. Whether a local sales tax applies depends on the city or borough where the work is done.",
      sources: [NO_STATE_TAX, LOCAL_TAX],
    },
    annual: {
      status: "unclear",
      answer:
        "No state aircraft registration fee was found in force. The Department of Transportation proposed aircraft registration and fees in 2017 and withdrew the proposal in 2018. Cities and boroughs can tax personal property, including by a flat tax per item, so a local aircraft tax depends on where the aircraft is based.",
      sources: [
        src("Alaska Department of Transportation and Public Facilities", "Aircraft Registration Regulations Project: Notice of Withdrawal", "https://aws.state.ak.us/OnlinePublicNotices/Notices/View.aspx?id=189415",
          "The Department of Transportation and Public Facilities is withdrawing for further consideration the currently proposed changes to the regulations published on November 1, 2017 and related to implementing aircraft registration and fees for aircraft based in Alaska, and addressing protests, appeals, and definitions.",
          { dated: "April 2, 2018" }),
        src("Alaska Statutes", "AS 29.45.055(a)", "https://www.akleg.gov/basis/statutes.asp#29.45.055",
          "A municipality that levies a flat tax may classify the property as to type based on any characteristic and tax each item of property of the same type at a specific amount."),
      ],
      caveat:
        "Did not confirm in the current Alaska Administrative Code that no aircraft registration chapter (17 AAC 41) was later adopted. Municipal aircraft taxes (for example Anchorage, Kenai Peninsula Borough, Homer flat taxes) are known from secondary sources and city ordinances only; none was checked as current.",
    },
  },
};
