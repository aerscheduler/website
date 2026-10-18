import { src } from "../sources.mjs";

const GAC = "Georgia Administrative Code";
const R04 = "https://rules.sos.ga.gov/gac/560-12-2-.04";
const R97 = "https://rules.sos.ga.gov/gac/560-12-2-.97";
const R08 = "https://rules.sos.ga.gov/gac/560-11-10-.08";
const LR_2015 = "https://dor.georgia.gov/document/sut-lr/lr-sut-2015-20/download";
const LR_2019 = "https://dor.georgia.gov/document/sut-lr/lr-sut-2019-03/download";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "georgia",
  name: "Georgia",
  code: "GA",
  summary:
    "Georgia charges 4 percent state sales or use tax on aircraft plus local tax. Flight schools that charge separately for flight time can treat it as a taxable aircraft rental, repair labor is not taxed, and aircraft are returned for county property tax each year.",
  facts: {
    buying: {
      status: "taxable",
      answer: "4 percent state sales tax on the price, plus any local sales taxes, collected by the dealer.",
      sources: [
        src("Georgia Department of Revenue", "Letter Ruling LR-SUT-2015-20 (Aircraft)", LR_2015,
          "Every purchaser of tangible personal property at retail in Georgia is liable for a tax on the purchase at a rate of 4 percent of the sales price of the purchase plus any applicable local sales taxes.",
          { dated: "December 11, 2015" }),
      ],
      caveat:
        "The rate quote is from a 2015 letter ruling, the most recent DOR document found that states the rate in a sentence; DOR's rate pages returned \"Page not found\". Private sales between individuals were not researched.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax of 4 percent of the cost applies on the first use or storage in Georgia of an aircraft bought outside the state. Like taxes paid to another state are credited.",
      sources: [
        src("Georgia Department of Revenue", "Letter Ruling LR-SUT-2015-20 (Aircraft), quoting O.C.G.A. 48-8-30(c)(1)", LR_2015,
          "[u]pon the first instance of use, consumption, distribution, or storage within this state of tangible personal property purchased at retail outside this state, the owner or user of the property shall . . . be liable for a tax at the rate of 4 percent of the cost price . . .",
          { dated: "December 11, 2015" }),
        src("Georgia Department of Revenue", "Letter Ruling LR-SUT-2015-20 (Aircraft)", LR_2015,
          "Thus, when a person purchases property outside Georgia and subsequently brings the property into Georgia, that individual is liable for Georgia use tax, and a credit is allowed for like taxes previously paid in another state.",
          { dated: "December 11, 2015" }),
      ],
      caveat: "No day-count or nonresident presence test was found.",
    },
    exemptions: {
      status: "unclear",
      answer:
        "Dealers buy aircraft for resale or rental tax-free, but no Department rule or ruling found describes an exemption for aircraft sold to nonresidents and flown out, or for aircraft bought by air carriers. Whether Georgia has a fly-away exemption is not confirmed.",
      sources: [
        src(GAC, "Rule 560-12-2-.04(1)(a)", R04,
          "Such dealers should purchase tax free such aircraft, accessories, tires, repair parts, fuels and lubricants for resale under certificates of exemption."),
      ],
      caveat: "The official Code of Georgia (O.C.G.A. 48-8-3) was not read directly; it is published only through Lexis. Exemptions for air carriers or nonresident buyers may exist there.",
    },
    rental: {
      status: "taxable",
      answer:
        "Aircraft rentals are taxable, and the owner registers as a dealer and collects tax on the rental charge. A \"charter\" where the customer hires and pays the pilot is treated as a lease; one where the owner employs the pilot is presumed to be a transportation service, which Georgia does not tax.",
      sources: [
        src(GAC, "Rule 560-12-2-.04(1)(d)", R04,
          "A \"charter\" transaction where the aircraft operator is employed and paid by the customer of the aircraft owner will be considered a lease transaction, unless the terms of the agreement or the surrounding circumstances indicate a service transaction."),
        src(GAC, "Rule 560-12-2-.04(1)(d)", R04,
          "For purposes of ascertaining tax liability, a \"charter\" transaction where the aircraft operator is employed and paid directly by the aircraft owner will be presumed to be a transportation service transaction unless the terms of the agreement or the surrounding circumstances indicate a lease."),
        src(GAC, "Rule 560-12-2-.97(1)(c)", R97,
          "Those schools operating under paragraph (a) which go beyond the rendition of services and lease or rent aircraft to licensed pilots and all schools operating under paragraph (b) shall register as a dealer, collect and remit the tax on the gross lease or rental charge."),
      ],
      caveat: "\"Which Georgia does not tax\" for transportation service rests on the rule treating it as a service and on LR SUT-2019-03 saying services are not taxed unless enumerated; no source says air charter is untaxed in those words.",
    },
    instruction: {
      status: "conditional",
      answer:
        "A school that bundles flight time into its instruction price is providing a service and pays tax on the aircraft when it buys them. A school that always charges flight time separately, for every aircraft and student, may treat that flight time as a taxable rental, collect tax on it, and then buy the aircraft and parts tax-free. The election is open to FAA-certificated schools and Part 61 schools with an established base.",
      sources: [
        src(GAC, "Rule 560-12-2-.97(1)(a)", R97,
          "Such persons are deemed to be consumers of all tangible personal property (including aircraft) purchased and used in providing such services and shall pay the tax thereon at the time of purchase."),
        src(GAC, "Rule 560-12-2-.97(1)(b)", R97,
          "Considering the record keeping requirements imposed by various governmental and regulatory agencies, such persons may elect to treat all such aircraft flight time which is a part of the training program as a rental of aircraft to the student."),
        src(GAC, "Rule 560-12-2-.97(1)(b)", R97,
          "Aircraft (as well as accessories, tires, and repair parts therefor) employed exclusively in these type operations may be purchased for resale, free of sales or use tax."),
        src(GAC, "Rule 560-12-2-.97(1)(b)1.", R97,
          "This election will only be available to those schools which are either appropriately certificated by the FAA as pilot training schools, or operating under FAR Part 61 with an established base of operations."),
      ],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Georgia does not tax services it has not listed, so repair labor is not taxed; the shop pays tax on materials it uses. Engines, parts and equipment installed while repairing in Georgia an aircraft not registered in Georgia are exempt.",
      sources: [
        src("Georgia Department of Revenue", "Letter Ruling LR SUT-2019-03 (Aircraft Painting)", LR_2019,
          "Unlike sales of tangible personal property, sales of services are not subject to sales and use tax unless the service is specifically designated as taxable.",
          { dated: "May 31, 2019" }),
        src("Georgia Department of Revenue", "Letter Ruling LR SUT-2019-03 (Aircraft Painting), note 7", LR_2019,
          "It is noted that Georgia law provides a sales and use tax exemption for the sale or use of engines, parts, equipment, and other tangible personal property used in the maintenance or repair of aircraft when such property is installed on an aircraft that is being repaired or maintained in this state, so long as such aircraft is not registered in this state.",
          { dated: "May 31, 2019" }),
      ],
      caveat:
        "Whether parts sold and installed on a Georgia-registered aircraft are taxed as a sale to the owner, or the shop is the consumer, was not found in a current rule; the 2019 ruling is about painting. \"Registered in this state\" is not defined in the ruling. The exemption is cited as O.C.G.A. 48-8-3(86), not read directly.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft are personal property for Georgia's county property tax. They are returned in the county of the owner's domicile, or where the aircraft is principally hangared or tied down if its home base is in another county.",
      sources: [
        src(GAC, "Rule 560-11-10-.08(1)", R08,
          "Examples of personal property are tangible items such as aircraft; boats and motors; inventories of retail stock, finished manufactured or processed goods, goods in process, raw materials and supplies; furniture, personal fixtures, trade fixtures, machinery and equipment."),
        src(GAC, "Rule 560-11-10-.08(3)", R08,
          "When the aircraft's primary home base is in a county other than where the owner is domiciled, the appraisal staff shall consider the tax situs of the aircraft to be where it is principally hangered or tied down and out of which its flights normally originate."),
        src(GAC, "Rule 560-11-10-.08", R08,
          "The return form PT-50A, entitled \"Aircraft Personal Property Tax Return,\" may be used for the return of aircraft."),
      ],
      caveat: "The 40% assessment ratio and the return deadline were seen only in a county brochure and forums, so they are left out. No state aircraft registration fee was found.",
    },
  },
};
