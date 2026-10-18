import { src } from "../sources.mjs";

const ILCS = "Illinois Compiled Statutes";
const DOC = (s) => `https://www.ilga.gov/legislation/ilcs/documents/${s}.htm`;
const IDOR_AIRCRAFT = "https://tax.illinois.gov/research/taxinformation/sales/aircraft.html";
const IDOR = "Illinois Department of Revenue";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "illinois",
  name: "Illinois",
  code: "IL",
  summary:
    "Illinois charges 6.25 percent tax on aircraft, whether bought from a dealer or in a private sale, with a fly-away exemption if the aircraft leaves within 15 days. Parts installed in aircraft repair are exempt through 2029, the 2025 lease tax does not reach registered aircraft, and IDOT registration is $20 every two years.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "A dealer's sale is taxed under the Retailers' Occupation Tax at 6.25% of the price. An aircraft bought from someone who is not an aircraft dealer, or received as a gift or transfer, owes the Aircraft Use Tax at 6.25% of the selling price, filed on Form RUT-75 within 30 days.",
      sources: [
        src(ILCS, "35 ILCS 120/2-10", DOC("003501200K2-10"),
          "Unless otherwise provided in this Section, the tax imposed by this Act is at the rate of 6.25% of gross receipts from sales, which, on and after January 1, 2025, includes leases, of tangible personal property made in the course of business."),
        src(ILCS, "35 ILCS 157/10-15", DOC("003501570K10-15"),
          "The rate of tax shall be 6.25% of the selling price for each purchase of aircraft that qualifies under this Law."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "The tax is imposed on aircraft purchased (or acquired by gift or transfer) from another individual or person or business that is not in the business of selling aircraft at retail."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "This form is due no later than 30 days from the acquisition date or the date the item is brought into Illinois, whichever is later."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT, "Form RUT-75, Aircraft/Watercraft Use Tax Transaction Return"),
      ],
      caveat: "Local retailers' occupation taxes on dealer sales were not researched, so the answer gives only the state rate.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "An aircraft bought from an out-of-state retailer and brought into Illinois owes use tax, reported on Form RUT-25. Tax properly paid to another state is credited. Temporary storage of an aircraft that is then used only outside Illinois is exempt.",
      sources: [
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "The use of the aircraft in Illinois is already taxed under the Illinois Use Tax Act. For example, the aircraft is purchased from an out-of-state retailer."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT, "This type of transaction is taxed and reported on Form RUT-25, Use Tax Transaction Return."),
        src(ILCS, "35 ILCS 105/3-55(d)", DOC("003501050K3-55"),
          "The use, in this State, of tangible personal property that is acquired outside this State and caused to be brought into this State by a person who has already paid a tax in another State in respect to the sale, purchase, or use of that property, to the extent of the amount of the tax properly due and paid in the other State."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "The temporary storage of an aircraft that was acquired outside of Illinois and after being brought into Illinois and stored temporarily, is used solely outside Illinois."),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "A sale is exempt if the aircraft leaves Illinois within 15 days after the final bill or its return to service, is not based or registered in Illinois afterward, and the buyer signs the Department's certificate. \"Based\" means hangared, stored or used in Illinois for 10 or more days in the 12 months after the sale. Aircraft bought by interstate carriers for hire as rolling stock, and aircraft used more than 50% in production agriculture, are also exempt.",
      sources: [
        src(ILCS, "35 ILCS 120/2-5(25-7)", DOC("003501200K2-5"),
          "the aircraft leaves this State within 15 days after the later of either the issuance of the final billing for the sale of the aircraft, or the authorized approval for return to service, completion of the maintenance record entry, and completion of the test flight and ground test for inspection, as required by 14 CFR 91.407;"),
        src(ILCS, "35 ILCS 120/2-5(25-7)", DOC("003501200K2-5"),
          "\"Based in this State\" means hangared, stored, or otherwise used, excluding post-sale customizations as defined in this Section, for 10 or more days in each 12-month period immediately following the date of the sale of the aircraft."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "The aircraft is acquired by an interstate carrier for hire for use as rolling stock to transport persons or commodities in interstate commerce."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "The aircraft is used primarily (more than 50%) in production agriculture."),
      ],
    },
    rental: {
      status: "exempt",
      answer:
        "Since January 1, 2025, Illinois taxes leases of most tangible property, but the lease tax does not extend to aircraft that must be registered with the state. Rentals of such aircraft are not taxed.",
      sources: [
        src(ILCS, "35 ILCS 120/1", DOC("003501200K1"), "On and after January 1, 2025, the term \"sale\", when used in this Act, includes a lease."),
        src(ILCS, "35 ILCS 120/2", DOC("003501200K2"),
          "The inclusion of leases in the tax imposed under this Act by Public Act 103-592 does not, however, extend to motor vehicles, watercraft, aircraft, and semitrailers, as defined in Section 1-187 of the Illinois Vehicle Code, that are required to be registered with an agency of this State."),
      ],
      caveat:
        "Under the pre-2025 rule the lessor owed tax on its purchase of the rental aircraft as the end user; whether that still applies to registered aircraft was not confirmed in an IDOR source. The IDOR lease bulletin (FY 2025-15) returned 404.",
    },
    instruction: {
      status: "unclear",
      answer:
        "No Illinois statute or Department guidance found addresses flight instruction or the aircraft time inside a lesson. Illinois taxes sales of property rather than services in general, but how a lesson is treated is not published.",
      sources: [],
    },
    maintenance: {
      status: "conditional",
      answer:
        "Through December 31, 2029, materials, parts, equipment and consumables incorporated into an aircraft during repair, maintenance or modification are exempt when sold to an FAA Part 145 repair station with a Class IV rating, or to a shop working on aircraft engines. Aircraft of Part 121 or Part 129 scheduled passenger carriers are excluded.",
      sources: [
        src(ILCS, "35 ILCS 120/2-5(40)", DOC("003501200K2-5"),
          "Beginning January 1, 2010 and continuing through December 31, 2029, materials, parts, equipment, components, and furnishings incorporated into or upon an aircraft as part of the modification, refurbishment, completion, replacement, repair, or maintenance of the aircraft."),
        src(ILCS, "35 ILCS 120/2-5(40)", DOC("003501200K2-5"),
          "From January 1, 2024 through December 31, 2029, this exemption applies only to the sale of qualifying tangible personal property to: (A) persons who modify, refurbish, complete, repair, replace, or maintain aircraft and who (i) hold an Air Agency Certificate and are empowered to operate an approved repair station by the Federal Aviation Administration, (ii) have a Class IV Rating, and (iii) conduct operations in accordance with Part 145 of the Federal Aviation Regulations; and (B) persons who engage in the modification, replacement, repair, and maintenance of aircraft engines or power plants without regard to whether or not those persons meet the qualifications of item (A)."),
        src(ILCS, "35 ILCS 120/2-5(40)", DOC("003501200K2-5"),
          "The exemption does not include aircraft operated by a commercial air carrier providing scheduled passenger air service pursuant to authority issued under Part 121 or Part 129 of the Federal Aviation Regulations."),
      ],
      caveat:
        "Whether repair labor is taxed (Illinois Service Occupation Tax taxes property transferred incident to service, not labor) was not confirmed in an aircraft source, so the answer does not address labor. Parts from a shop that is not a Class IV Part 145 station and not an engine shop are taxable.",
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft operating in Illinois register with the Department of Transportation every two years, for $20 per aircraft. The registration requires proof that the use tax was paid or the aircraft is exempt.",
      sources: [
        src(ILCS, "620 ILCS 5/42(b)(1)", DOC("062000050K42"),
          "It shall charge a fee, payable every 2 years, for the registration of each federal license, certificate or permit of $20 for each aircraft certificate and a one-time fee of $20, payable at registration, for each airman's certificate."),
        src(IDOR, "Aircraft Use Tax", IDOR_AIRCRAFT,
          "You must submit proof of tax payment or proof of exemption before your aircraft registration will be issued by the Illinois Department of Transportation."),
      ],
      caveat: "Whether any Illinois property tax reaches aircraft was not researched; the answer covers registration only.",
    },
  },
};
