import { src } from "../sources.mjs";

const T39 = "https://wyoleg.gov/statutes/compress/title39.pdf";
const WYDOT = "https://dot.state.wy.us/home/aeronautics/information.html";
const STATS = "Wyoming Statutes";
const DOT = "Wyoming Department of Transportation, Aeronautics";
const DOT_TITLE = "Wyoming Aircraft Registration";
const DOT_DATED = { dated: "May 2014" };
const SALE_QUOTE =
  "Regarding Wyoming sales and property tax, all purchases of aircrafts in Wyoming are subject to Wyoming sales tax, unless an exemption applies.";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "wyoming",
  name: "Wyoming",
  code: "WY",
  summary:
    "Wyoming charges 4 percent state sales or use tax on aircraft, plus any local tax, and taxes aircraft rentals. Repairs at FAA-certified repair stations and aircraft used in FAA commercial operations are exempt, and Wyoming has no state aircraft registration.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "All purchases of aircraft in Wyoming are subject to sales tax unless an exemption applies. The state rate is four percent, made up of a three percent base and a one percent addition. In a private sale the buyer usually pays the Department of Revenue directly, based on where possession was transferred.",
      sources: [
        src(DOT, DOT_TITLE, WYDOT, SALE_QUOTE, DOT_DATED),
        src(STATS, "W.S. 39-15-104(a)", T39,
          "Except as provided by W.S. 39-15-105 there is levied and shall be paid by the purchaser on all sales and purchases an excise tax of three percent (3%) upon all events as provided by W.S. 39-15-103(a)."),
        src(STATS, "W.S. 39-15-104(b)", T39,
          "Effective July 1, 1993, in addition to the excise tax under subsection (a) of this section there is imposed an additional excise tax of one percent (1%) which shall be administered as if the tax rate under subsection (a) of this section was increased from three percent (3%) to four percent (4%)."),
        src(DOT, DOT_TITLE, WYDOT,
          "In most cases the purchaser will remit tax directly to the Department, based on the location where possession transferred to the purchaser.", DOT_DATED),
      ],
      caveat: "WYDOT page is dated May 2014; the sales tax statute text is current (title 39 PDF reflects Laws 2026, ch. 19, which folded the old use tax chapter 39-16 into 39-15). Local option taxes (39-15-2xx) not quantified.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft bought outside Wyoming whose first use is in Wyoming owes use tax unless an exemption applies. Sales tax legally paid to another state is credited, up to the Wyoming use tax.",
      sources: [
        src(DOT, DOT_TITLE, WYDOT,
          "Furthermore, all purchases of aircrafts outside of the state of Wyoming, where first use occurs in Wyoming, are subject to Wyoming use tax, again unless an exemption applies.", DOT_DATED),
        src(STATS, "W.S. 39-15-109", T39,
          "The department shall allow a credit for sales tax legally imposed and paid to another state on a purchase equal to but not exceeding the liability for use tax under this article on that purchase."),
      ],
      caveat: "Credit subsection located in 39-15-109 (taxpayer remedies) in the 2026 compressed title; paragraph letter not confirmed. No day-count rule for 'first use' found.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "The sale or lease of any aircraft used in an FAA commercial operation is exempt, with its installed parts and its repair and maintenance services. No nonresident fly-away exemption was found.",
      sources: [
        src(STATS, "W.S. 39-15-105(a)(viii)(P)", T39,
          "The sale or lease of any aircraft used in a federal aviation administration commercial operation including the sale of all:"),
      ],
      caveat: "'FAA commercial operation' is not defined in the text read; whether a Part 141 or 61 school counts is unknown.",
    },
    rental: {
      status: "taxable",
      answer:
        "Wyoming taxes the gross rental paid for a lease transferring possession of property whose sale would be taxable, so dry aircraft rentals are taxed. Intrastate passenger transportation by carriers is taxed too.",
      sources: [
        src(STATS, "W.S. 39-15-103(a)(i)(B)", T39,
          "The gross rental paid for the lease or contract transferring possession of tangible personal property if the transfer of possession would be taxable if a sale occurred;"),
        src(STATS, "W.S. 39-15-103(a)(i)(D)", T39, "The sales price paid to carriers for intrastate transportation of passengers;"),
        src(DOT, DOT_TITLE, WYDOT, SALE_QUOTE, DOT_DATED),
      ],
      caveat: "Leases of aircraft used in an FAA commercial operation are exempt (39-15-105(a)(viii)(P)). No Department of Revenue aircraft rental guidance found.",
    },
    instruction: {
      status: "unclear",
      answer: "The Department of Revenue publishes no guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
      caveat: "Wyoming taxes services only where listed in 39-15-103; flight instruction was not found there, but no source says so.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Aircraft repair, remodeling and maintenance services at an FAA-certified repair station are exempt, including parts and materials. Work done elsewhere is not covered by that exemption, unless the aircraft is used in an FAA commercial operation.",
      sources: [
        src(STATS, "W.S. 39-15-105(a)(viii)(J)", T39,
          "The sale of aircraft repair, remodeling or maintenance services at a federal aviation administration certified repair station including, but not limited to, repair or replacement materials or parts;"),
        src(STATS, "W.S. 39-15-105(a)(viii)(P)(II)", T39,
          "Aircraft repair, remodeling and maintenance services performed on the aircraft, its engine or its component materials or parts."),
      ],
      caveat: "Whether parts bought separately by an owner, or repairs by an A&P mechanic outside a Part 145 station, are taxable is not addressed by a Department source.",
    },
    annual: {
      status: "unclear",
      answer:
        "Wyoming has no aircraft registration requirement, so there are no state aircraft registration fees. WYDOT refers property tax questions on aircraft to the Department of Revenue's Property Tax Division without saying whether aircraft are taxed.",
      sources: [
        src(DOT, DOT_TITLE, WYDOT,
          "May 2014 - At this time, there is no aircraft registration requirement for Wyoming, therefore, there are no state aircraft registration fees.", DOT_DATED),
      ],
      caveat: "Source is a WYDOT page dated May 2014, still live on 2026-10-18. Wyoming property tax on aircraft (W.S. 39-11, 39-13) not checked.",
    },
  },
};
