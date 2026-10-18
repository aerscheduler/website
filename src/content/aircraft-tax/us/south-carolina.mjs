import { src } from "../sources.mjs";

const RR = "https://dor.sc.gov/resources-site/lawandpolicy/Advisory%20Opinions/RR21-8.pdf";
const MANUAL = "https://dor.sc.gov/resources-site/lawandpolicy/Documents/Chapter%2010%20-%20Maximum%20Tax%20Items.pdf";
const T12C36 = "https://www.scstatehouse.gov/code/t12c036.php";
const T12C43 = "https://www.scstatehouse.gov/code/t12c043.php";
const DOR = "South Carolina Department of Revenue";
const CODE = "South Carolina Code of Laws";
const RR_TITLE = "SC Revenue Ruling #21-8, Onetime Sales of Airplanes and Boats";
const MANUAL_TITLE = "Sales and Use Tax Manual, Chapter 10, Maximum Tax Items";
const MANUAL_DATED = { dated: "September 2025" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "south-carolina",
  name: "South Carolina",
  code: "SC",
  summary:
    "South Carolina taxes aircraft sales and long leases at 5 percent with a $500 maximum and no local tax, and private sales pay a casual excise tax on the same terms. Parts used to repair aircraft are exempt, and counties tax aircraft as personal property each year.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "Sales of aircraft are taxed at 5 percent with a maximum of $500, and local sales taxes do not apply. A private sale by someone not in the business is not subject to sales tax, but the buyer pays a casual excise tax at the same 5 percent, $500 maximum, when the aircraft is titled or registered.",
      sources: [
        src(DOR, RR_TITLE, RR,
          "In addition, sales, rentals, and leases of airplanes or boats are subject to the sales and use tax at a rate of 5%, but no more than $500."),
        src(DOR, RR_TITLE, RR,
          "Sales, rentals, and leases of items subject to a maximum tax are exempt from local sales and use taxes administered and collected by the Department."),
        src(DOR, RR_TITLE, RR,
          "As such, sales, rentals, and leases of airplanes or boats are subject to the casual excise tax at a rate of 5%, but no more than $500."),
      ],
      caveat: "Statute: S.C. Code 12-36-2110(A)(1) and (4); casual excise tax 12-36-1710. Ruling is dated 2021 and applies to all open periods.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Use tax applies to an aircraft bought elsewhere for use in South Carolina, subject to the same $500 maximum. Sales or use tax paid to another state is credited, and any shortfall is paid to the Department. An aircraft delivered to the buyer in South Carolina is taxed even if it is flown out of state.",
      sources: [
        src(CODE, "S.C. Code 12-36-1310(C)", T12C36,
          "When a taxpayer is liable for the use tax imposed by this section on tangible personal property purchased in another state, upon which a sales or use tax was due and paid in the other state, the amount of the sales or use tax due and paid in the other state is allowed as a credit against the use tax due this State, upon proof that the sales or use tax was due and paid in the other state."),
        src(DOR, MANUAL_TITLE, MANUAL, "A maximum tax of $500 is established for the sale2 or lease3 of each:4", MANUAL_DATED),
        src(DOR, RR_TITLE, RR,
          "If the tangible personal property is delivered to the purchaser in South Carolina, the sales tax applies even if the purchaser takes the item out-of-state."),
      ],
      caveat: "The manual quote includes footnote markers (2, 3, 4) as extracted; the list it introduces names 'aircraft'. No day-count safe harbor for visiting aircraft found.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "There is no fly-away exemption for an aircraft delivered in South Carolina. The casual excise tax excludes transfers to immediate family, to heirs, and from an owner to a newly formed partnership or corporation.",
      sources: [
        src(DOR, RR_TITLE, RR,
          "If the tangible personal property is delivered to the purchaser in South Carolina, the sales tax applies even if the purchaser takes the item out-of-state."),
        src(CODE, "S.C. Code 12-36-1710(B)(1)", T12C36, "transferred to members of the immediate family;"),
        src(CODE, "S.C. Code 12-36-1710(B)(1)", T12C36, "transferred to a legal heir, legatee, or distributee;"),
      ],
      caveat: "No carrier (Part 121/135) exemption for the aircraft itself found in 12-36-2120; air carrier hub property tax exemptions exist (12-37-220(B)(33)).",
    },
    rental: {
      status: "taxable",
      answer:
        "Aircraft rentals and leases are taxable. A written lease that states a term of more than 90 continuous days, and stays in force that long, gets the 5 percent rate and $500 maximum; shorter rentals do not qualify for the maximum.",
      sources: [
        src(DOR, RR_TITLE, RR,
          "In addition, sales, rentals, and leases of airplanes or boats are subject to the sales and use tax at a rate of 5%, but no more than $500."),
        src(DOR, MANUAL_TITLE, MANUAL,
          "For the lease of any of the above items to qualify for the $500 maximum tax, the lease must specifically state the term of, and remain in force for, a period in excess of 90 continuous days.", MANUAL_DATED),
      ],
      caveat: "The rate for hourly rentals that miss the cap is not stated for aircraft; for other non-capped items the manual cites 6 percent plus local tax.",
    },
    instruction: {
      status: "unclear",
      answer:
        "The Department has no current published guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed.",
      sources: [],
      caveat: "SC Private Letter Ruling #89-18 (1989) treated a school's instruction as untaxed and its rentals as taxed, but a PLR 'applies only to the specific facts' and has 'no precedential value', so it is not cited.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Parts and supplies used by aircraft repair businesses are exempt, but tools and equipment that do not become part of the aircraft are not. We did not find guidance on whether repair labor on aircraft is taxed.",
      sources: [
        src(CODE, "S.C. Code 12-36-2120(52)", T12C36,
          "parts and supplies used by persons engaged in the business of repairing or reconditioning aircraft. This exemption does not extend to tools and other equipment not attached to or that do not become a part of the aircraft;"),
      ],
      caveat: "Since 2015 (Act No. 69) the exemption is no longer limited to federal government or commercial carrier aircraft.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft are personal property taxed each year by the county, valued from a nationally recognized aircraft value guide. A county may lower the assessment ratio for general aviation aircraft to no less than four percent of fair market value; otherwise personal property is assessed at ten and one-half percent.",
      sources: [
        src(CODE, "S.C. Code 12-43-360", T12C43,
          "The governing body of a county by ordinance may reduce the assessment ratio otherwise applicable in determining the assessed value of general aviation aircraft subject to property tax in the county to a ratio not less than four percent of the fair market value of the general aviation aircraft."),
        src(CODE, "S.C. Code 12-43-220(f)", T12C43,
          "Except as specifically provided by law, all other personal property must be taxed on an assessment of ten and one-half percent of fair market value of the property"),
        src(CODE, "S.C. Code 12-37-930", "https://www.scstatehouse.gov/code/t12c037.php",
          "The fair market value for vehicles, watercraft, and aircraft must be based on values derived from a nationally recognized publication of vehicle valuations, except that the value may not exceed ninety-five percent of the prior year's value."),
      ],
      caveat: "State aircraft registration (S.C. Code 55-7) was repealed in 1988. The Aeronautics Commission publishes county aircraft millage and assessment ratios (2024 PDF), not used here.",
    },
  },
};
