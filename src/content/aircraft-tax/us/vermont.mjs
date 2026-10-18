import { src } from "../sources.mjs";

const VSA = (s) => `https://legislature.vermont.gov/statutes/section/32/233/${s}`;
const CC = "https://tax.vermont.gov/tax-law-and-guidance/compliance/archive";
const DOT = "Vermont Department of Taxes";
const CC_TITLE = "Compliance Corner, Aircraft Sales and Purchases";
const CC_DATED = { dated: "September 16, 2022" };
const LAW = "Vermont Statutes";
const EXEMPT_29 =
  "Aircraft, but not drones, sold to a person that holds itself out to the general public as engaging in air commerce, for use primarily in the carriage of persons or property for compensation or hire; and parts, machinery, and equipment to be installed in any aircraft, other than drones.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "vermont",
  name: "Vermont",
  code: "VT",
  summary:
    "Vermont charges 6 percent sales or use tax on aircraft, except aircraft bought by air carriers for hire. Parts and equipment installed in any aircraft are exempt, and Vermont has no state aircraft registration fee that we could find.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Six percent sales tax applies when an aircraft is sold and possession is taken in Vermont, including when it is bought out of state and possession is taken here. Towns that vote a 1% local option tax add it to transactions subject to Vermont sales tax.",
      sources: [
        src(LAW, "32 V.S.A. 9771", VSA("09771"), "The tax shall be paid at the rate of six percent of the sales price"),
        src(DOT, CC_TITLE, CC, "Aircraft is sold in Vermont and possession is taken in Vermont. Sales tax due.", CC_DATED),
        src(DOT, CC_TITLE, CC, "Aircraft is sold out of state and possession is taken in Vermont. Sales tax due.", CC_DATED),
        src(DOT, "Compliance Corner, Local Option Tax", CC,
          "A municipality may vote to levy a 1% local option tax in addition to collecting state business taxes. A transaction is subject to local option tax if it is subject to the Vermont sales, meals, rooms, or alcoholic beverage tax."),
      ],
      caveat: "Whether private (casual) sales are taxed was not found in aircraft guidance.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax at six percent is due on an aircraft bought out of state and brought into Vermont. Sales or use tax legally paid to another state is credited if that state gives Vermont the same treatment; if Vermont's rate is higher, the difference is owed.",
      sources: [
        src(DOT, CC_TITLE, CC, "Aircraft is purchased out of state and brought into Vermont. Use tax is due.", CC_DATED),
        src(LAW, "32 V.S.A. 9773", VSA("09773"), "the rate of six percent for the use within this State, except as otherwise exempted"),
        src(LAW, "32 V.S.A. 9744(a)(3)", VSA("09744"),
          "property or services to the extent that a retail sales or use tax was legally due and paid thereon, without any right to a refund or credit thereof, to any other state or jurisdiction within any other state but only when it is shown that the other state or jurisdiction allows a corresponding exemption with respect to the sale or use of tangible personal property or services upon which such a sales tax or compensating use tax was paid to this State"),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Aircraft sold to a business that holds itself out to the public as engaged in air commerce, for use mainly carrying people or property for hire, are exempt. Parts, machinery and equipment installed in any aircraft are exempt. Drones get neither exemption.",
      sources: [
        src(LAW, "32 V.S.A. 9741(29)", VSA("09741"), EXEMPT_29),
        src(DOT, CC_TITLE, CC, "Aircraft, purchased for commercial use can be purchased tax-free.", CC_DATED),
      ],
      caveat: "No nonresident fly-away exemption found. The Compliance Corner's 'commercial use' is broader wording than the statute's 'air commerce ... for compensation or hire'; the statute controls.",
    },
    rental: {
      status: "unclear",
      answer:
        "Vermont's sales tax reaches rentals of tangible personal property generally, but the Department of Taxes publishes no guidance on aircraft rentals.",
      sources: [],
      caveat: "32 V.S.A. 9701 defines sales to include rentals; not fetched and no aircraft-specific source found.",
    },
    instruction: {
      status: "unclear",
      answer: "The Department of Taxes publishes no guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
      caveat: "Whether a flight school's aircraft qualifies under 9741(29) ('air commerce ... for compensation or hire') is not addressed.",
    },
    maintenance: {
      status: "exempt",
      answer:
        "Parts, machinery and equipment to be installed in any aircraft, including personal aircraft, are exempt from sales and use tax. Drones are excluded.",
      sources: [
        src(LAW, "32 V.S.A. 9741(29)", VSA("09741"), EXEMPT_29),
        src(DOT, CC_TITLE, CC,
          "Parts, machinery, and equipment purchased to be installed on all aircraft, including those for personal use, excluding drones, are not subject to Vermont's sales and use tax.", CC_DATED),
      ],
      caveat: "Repair labor is not addressed; Vermont does not generally tax services, but no source says so for aircraft repair.",
    },
    annual: {
      status: "unclear",
      answer:
        "We found no Vermont aircraft registration or yearly state aircraft fee in the statutes on aeronautics or in Department of Taxes guidance, but no primary source states that none exists.",
      sources: [],
      caveat: "Title 5 chapters 9 to 17 cover airports, operations and abandoned aircraft; no aircraft registration section. 2017 legislative testimony says registration was removed in 1979 (testimony, not a source). Municipal property tax on aircraft not checked.",
    },
  },
};
