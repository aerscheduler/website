import { src } from "../sources.mjs";

const KSA = "Kansas Statutes Annotated, 2026";
const B = "https://www.kslegislature.gov/li/b2025_26/statute/079_000_0000_chapter";
const S3603 = `${B}/079_036_0000_article/079_036_0003_section/079_036_0003_k/`;
const S3606 = `${B}/079_036_0000_article/079_036_0006_section/079_036_0006_k/`;
const S3703 = `${B}/079_037_0000_article/079_037_0003_section/079_037_0003_k/`;
const S201K = `${B}/079_002_0000_article/079_002_0001k_section/079_002_0001k_k/`;
const KDOR = "Kansas Department of Revenue";
const ST28L = "https://www.ksrevenue.gov/pdf/st28l.pdf";
const ST28L_T = "Form ST-28L, Aircraft Exemption Certificate";
const ST28L_D = { dated: "Rev. 2-20" };
const FS = "https://www.ksrevenue.gov/factsheets/fsairport.pdf";
const FS_T = "Fact sheet: Airports and FBOs";
const FS_D = { dated: "02/21/2008" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "kansas",
  name: "Kansas",
  code: "KS",
  summary:
    "Kansas charges 6.5 percent state sales or use tax on aircraft bought from a dealer, but not on a private sale, and exempts aircraft a nonresident takes out within 10 days. Repair parts and labor are exempt for all aircraft, rentals are taxed, and business aircraft are exempt from property tax.",
  facts: {
    buying: {
      status: "conditional",
      answer:
        "A dealer's sale of an aircraft owes the state sales tax of 6.5%. An isolated or occasional sale, such as one owner selling to another, is exempt; the exception for occasional sales covers only motor vehicles, not aircraft.",
      sources: [
        src(KSA, "K.S.A. 79-3603", S3603,
          "For the privilege of engaging in the business of selling tangible personal property at retail in this state or rendering or furnishing any of the services taxable under this act, there is hereby levied and there shall be collected and paid a tax at the rate of 6.5%"),
        src(KSA, "K.S.A. 79-3606(l)", S3606,
          "all isolated or occasional sales of tangible personal property, services, substances or things, except isolated or occasional sale of motor vehicles specifically taxed under the provisions of K.S.A. 79-3603(o), and amendments thereto;"),
        src(KDOR, ST28L_T, ST28L, "Purchasers must pay sales tax on the purchase price of aircraft.", ST28L_D),
      ],
      caveat:
        "Local sales taxes on dealer sales were not researched, so the answer gives only the state rate. Whether an aircraft bought in an occasional sale out of state owes compensating use tax on arrival was not confirmed.",
    },
    bringingIn: {
      status: "conditional",
      answer: "Compensating use tax of 6.5% applies to tangible personal property, including aircraft, bought elsewhere and used or stored in Kansas.",
      sources: [
        src(KSA, "K.S.A. 79-3703(a)", S3703,
          "There is hereby levied and there shall be collected from every person in this state a tax or excise for the privilege of using, storing, or consuming within this state any article of tangible personal property. Such tax shall be levied and collected in an amount equal to the consideration paid by the taxpayer multiplied by the rate of 6.5%."),
      ],
      caveat: "The credit for sales tax paid to another state (K.S.A. 79-3705 or nearby) was not located and quoted; the answer does not mention one.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "An aircraft sold and delivered in Kansas to a resident of another state is exempt if it will not be registered or based in Kansas and will not stay more than 10 days. Aircraft sold to certificated or licensed carriers in interstate or foreign commerce, including Part 135 operators, are exempt even if every flight stays in Kansas, as are aircraft for use outside the United States. Aircraft used exclusively for resale, rental or leasing are bought tax-free.",
      sources: [
        src(KSA, "K.S.A. 79-3606(k)", S3606,
          "any motor vehicle, semitrailer or pole trailer, as such terms are defined by K.S.A. 8-126, and amendments thereto, or aircraft sold and delivered in this state to a bona fide resident of another state, which motor vehicle, semitrailer, pole trailer or aircraft is not to be registered or based in this state and which vehicle, semitrailer, pole trailer or aircraft will not remain in this state more than 10 days;"),
        src(KSA, "K.S.A. 79-3606(g)", S3606,
          "sales of aircraft including remanufactured and modified aircraft sold to persons using directly or through an authorized agent such aircraft as certified or licensed carriers of persons or property in interstate or foreign commerce under authority of the laws of the United States or any foreign government or sold to any foreign government or agency or instrumentality of such foreign government and all sales of aircraft for use outside of the United States"),
        src(KDOR, ST28L_T, ST28L,
          "A licensed or certified carrier of persons or property engaged in interstate or foreign commerce is exempt even though the aircraft never leaves Kansas (all flights are intrastate).", ST28L_D),
        src(KDOR, ST28L_T, ST28L,
          "Aircraft, repair parts and labor, and oil and gas are also exempt when the aircraft is used exclusively for resale, rental, or leasing purposes.", ST28L_D),
      ],
    },
    rental: {
      status: "taxable",
      answer:
        "Leases and rentals of aircraft are taxable, unless the aircraft is operated by a certificated air carrier in interstate or foreign commerce. Charter flights are not taxed.",
      sources: [
        src(KDOR, FS_T, FS,
          "Leases (short and long-term) and rentals of aircraft that do not qualify as \"transportation equipment\". Qualifying “Transportation equipment” must be used in interstate commerce. Aircraft that are operated by air carriers authorized and certificated by the United States department of transportation or another federal or a foreign authority to engage in the carriage of persons or property in interstate or foreign commerce. Taxable",
          FS_D),
        src(KDOR, FS_T, FS, "Charter flights Exempt", FS_D),
      ],
      caveat: "The fact sheet is a two-column table; the quoted rows are its text with the Taxable/Exempt column at the end. It is from 2008.",
    },
    instruction: {
      status: "conditional",
      answer:
        "Pilot instruction is not taxed. Aircraft rental charges are taxable, so the aircraft time in a lesson is taxable if billed as a rental. Whether a school's own training aircraft can be bought tax-free is disputed between two Department documents, so assume the purchase is taxable.",
      sources: [
        src(KDOR, FS_T, FS, "Pilot instruction / training. Exempt", FS_D),
        src(KDOR, ST28L_T, ST28L,
          "Persons and businesses whose aircraft is used for personal, company, recreational, or instructional purposes are NOT exempt and cannot use this exemption certificate to purchase aircraft.", ST28L_D),
        src(KDOR, FS_T, FS, "Aircraft placed in use by the Airport or FBO for any commercial use including flight training and instruction Exempt", FS_D),
      ],
      caveat:
        "CONFLICT: the 2008 fact sheet lists aircraft an FBO places in commercial use including flight training as exempt; the 2020 exemption certificate says aircraft used for instructional purposes are not exempt. The answer follows the newer certificate. A school that rents its aircraft to students may qualify under the rental exemption instead; not confirmed.",
    },
    maintenance: {
      status: "exempt",
      answer: "Sales of repair, modification and replacement parts, and repair and modification labor, are exempt for all aircraft.",
      sources: [
        src(KSA, "K.S.A. 79-3606(g)", S3606,
          "and sales of aircraft repair, modification and replacement parts and sales of services employed in the remanufacture, modification and repair of aircraft;"),
        src(KDOR, ST28L_T, ST28L,
          "Effective January 1, 2005 sales of aircraft repair, modification and replacement parts and sales of services employed in the re-manufacture, modification and repair of all aircraft are exempt from Kansas retailers' sales and compensating use taxes.",
          ST28L_D),
      ],
      caveat: "Fuel and oil are taxable unless the aircraft is a carrier's or a rental; aircraft washing is listed exempt in the 2008 fact sheet.",
    },
    annual: {
      status: "conditional",
      answer:
        "Aircraft used predominantly to earn income in the owner's business, meaning at least 80% of their use, are exempt from Kansas property tax. Other aircraft are taxed as personal property by the county.",
      sources: [
        src(KSA, "K.S.A. 79-201k(b), First", S201K,
          "For all taxable years commencing after December 31, 2002, all aircraft used predominantly to earn income for the owner in the conduct of the owner's business or industry."),
        src(KSA, "K.S.A. 79-201k(b), First", S201K,
          "The term \"predominantly\" means: (1) At least 80% of the total use of the aircraft; or (2) utilization of the aircraft such that all of the aircraft costs are deductible for federal income tax purposes."),
      ],
      caveat:
        "\"Other aircraft are taxed as personal property by the county\" is an inference; the 30% assessment rate, any exemption for aircraft 30 years or older, and whether Kansas has a state aircraft registration were seen only in secondary or county sources and are left out.",
    },
  },
};
