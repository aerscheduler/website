import { src } from "../sources.mjs";

const TG = (s) => `https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gtg&section=${s}&enactments=false`;
const COMAR26 = "https://dsd.maryland.gov/regulations/Pages/03.06.01.26.aspx";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "maryland",
  name: "Maryland",
  code: "MD",
  summary:
    "Maryland charges 6 percent sales or use tax on aircraft and on aircraft rentals. Parts installed on aircraft under 12,500 pounds are exempt until June 30, 2030, and aircraft used principally in interstate commerce are exempt.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "6 percent of the price. A one-off sale by someone who does not normally sell is exempt only if the price is under $1,000 and no dealer or auctioneer is involved, so a private aircraft sale is effectively taxable.",
      sources: [
        src("Maryland Code", "Tax-General §11-104(a)(2)", TG("11-104"),
          "for a taxable price of $1 or more: (i) 6 cents for each exact dollar"),
        src("Code of Maryland Regulations", "COMAR 03.06.01.12, Casual and Isolated Sales", "https://dsd.maryland.gov/regulations/Pages/03.06.01.12.aspx",
          "The sales and use tax does not apply to a casual and isolated sale by a person who regularly does not sell tangible personal property, a digital code, a digital product or a taxable service if the sale price is less than $1,000 and the sale is not made through an auctioneer or a dealer."),
      ],
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft bought elsewhere and used in Maryland. Tax paid to another state before the aircraft enters Maryland is credited, and the owner pays only the difference if the other state's tax was lower.",
      sources: [
        src("Maryland Code", "Tax-General §11-102(a)", TG("11-102"),
          "a use, in the State, of tangible personal property, a digital code, a digital product, or a taxable service."),
        src("Maryland Code", "Tax-General §11-221(c)", TG("11-221"),
          "(2) If the tax paid to another state is less than the sales and use tax, the buyer shall pay the difference between the sales and use tax and the amount paid to the other state"),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft used principally to cross state lines in interstate or foreign commerce is exempt, along with parts used on it. The Comptroller's rule requires more than 50 percent of mileage, trips or days of use in its first year to be between pickup or delivery points in different states. We found no nonresident fly-away exemption for aircraft.",
      sources: [
        src("Maryland Code", "Tax-General §11-208(c)(1)", TG("11-208"),
          "to a sale of an aircraft, motor vehicle, railroad rolling stock, or vessel that is used principally to cross State lines in interstate or foreign commerce"),
        src("Code of Maryland Regulations", "COMAR 03.06.01.26B(1)", COMAR26,
          "More than 50 percent of the total mileage traveled is mileage between a pickup or delivery point in one state and a pickup or delivery point in another state or the District of Columbia (uninterrupted by intervening pickups or deliveries), between a pickup or delivery point within the United States and a pickup or delivery point outside the United States, or between pickup and delivery points wholly outside the United States."),
      ],
      caveat: "The Maryland Court of Special Appeals (Comptroller v. Atwood, 2021) applied COMAR .26 to an instruction aircraft; we did not read the opinion. The motor vehicle out-of-state titling exemption in 11-208(c)(3) does not mention aircraft.",
    },
    rental: {
      status: "taxable",
      answer: "A rental is a sale under Maryland law, so aircraft rentals are taxed at the regular rate.",
      sources: [
        src("Maryland Code", "Tax-General §11-101(i)(1)", TG("11-101"),
          "title to or possession of property, a digital code, or a digital product is transferred or is to be transferred absolutely or conditionally by any means, including by lease, rental, royalty agreement, or grant of a license for use"),
      ],
    },
    instruction: {
      status: "unclear",
      answer:
        "Maryland taxes only listed services, and personal or professional services outside that list are not taxed. No Maryland source we found addresses flight instruction, or whether the aircraft time inside a lesson is a taxable rental.",
      sources: [
        src("Code of Maryland Regulations", "COMAR 03.06.01.01A", "https://dsd.maryland.gov/regulations/Pages/03.06.01.01.aspx",
          "Except for taxable services set forth in Tax-General Article, §11-101(m), Annotated Code of Maryland, the tax does not apply to a personal, professional, or insurance service that involves a sale as an inconsequential element for which no separate charge is made."),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts and equipment installed to repair, maintain or upgrade an aircraft or its avionics are exempt if the aircraft weighs under 12,500 pounds maximum takeoff weight, or is heavier and used primarily in interstate commerce. The exemption runs until June 30, 2030.",
      sources: [
        src("Maryland Code", "Tax-General §11-237, effective until June 30, 2030", TG("11-237"),
          "The sales and use tax does not apply to the sale of materials, parts, or equipment used to repair, maintain, or upgrade aircraft or the avionics systems of aircraft if the materials, parts, or equipment are installed on an aircraft that: (1) has a maximum gross takeoff weight of less than 12,500 pounds; or (2) (i) has a maximum gross takeoff weight of 12,500 pounds or more; and (ii) is primarily used in interstate or foreign commerce."),
        src("Maryland Code", "Tax-General §11-237 status line", TG("11-237"),
          "EFFECTIVE UNTIL JUNE 30, 2030 PER CHAPTERS 957 AND 958 OF 2024"),
      ],
      caveat: "Whether repair labor is taxable in Maryland was not confirmed from a primary source.",
    },
    annual: {
      status: "unclear",
      answer:
        "We found no Maryland primary source on a yearly state aircraft registration fee or on personal property tax on aircraft.",
      sources: [],
      caveat: "An airport operator page says Maryland has no state registration; Maryland does require minimum insurance. Neither was confirmed from MDOT MAA or SDAT.",
    },
  },
};
