import { src } from "../sources.mjs";

const FYI105 = "https://realfile.tax.newmexico.gov/FYI-105.pdf";
const TRD = "New Mexico Taxation and Revenue Department";
const F = { dated: "FYI-105, 08/11/2025" };
const HB14 = "https://www.nmlegis.gov/Sessions/14%20regular/final/HB0014.pdf";
const L14 = { dated: "Laws 2014, effective July 1, 2014" };
const REG207 = "https://www.srca.nm.gov/parts/title03/03.002.0207.html";
const HB458 = "https://www.nmlegis.gov/Sessions/03%20Regular/FinalVersions/HB0458.html";
const L03 = { dated: "Laws 2003, effective July 1, 2003" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "new-mexico",
  name: "New Mexico",
  code: "NM",
  summary:
    "New Mexico taxes aircraft through its gross receipts tax, 4.875 percent state rate plus local, but half of the receipts from selling an aircraft are deductible and aircraft parts and maintenance are fully deductible. Aircraft rentals and flight instruction are taxed, and based aircraft register yearly in place of property tax.",
  facts: {
    buying: {
      status: "conditional",
      answer:
        "New Mexico's gross receipts tax, usually passed on to the buyer, runs from 4.875% to 10.8125% depending on location. Fifty percent of the receipts from selling an aircraft may be deducted, so the tax falls on half the price.",
      sources: [
        src(TRD, "Gross Receipts Tax Overview", "https://www.tax.newmexico.gov/businesses/gross-receipts-overview/",
          "Gross receipts tax (GRT) is imposed on businesses, but it is common for a business to pass the GRT on to the purchaser."),
        src(TRD, "FYI-105, Gross Receipts & Compensating Taxes: An Overview", FYI105, "The gross receipts tax rate varies throughout the state from 4.875% to 10.8125%", F),
        src("New Mexico Laws", "Section 7-9-62(A) NMSA 1978, as amended by HB 14 (2014)", HB14,
          "Except for receipts deductible under Subsection B of this section, fifty percent of the receipts from selling agricultural implements, farm tractors, aircraft or vehicles that are not required to be registered under the Motor Vehicle Code may be deducted from gross receipts", L14),
        src(TRD, "FYI-105, Gross Receipts & Compensating Taxes: An Overview", FYI105,
          "If you sell agricultural implements, vehicles or aircraft and your receipts are deductible under Section 7-9-62(A), use the required deduction code of D0-006 to report your deductible receipts.", F),
      ],
      caveat: "No source we read addresses a private sale between individuals. The statute is quoted from the 2014 session law; FYI-105 (2025) still describes subsections A, B and C the same way.",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Compensating tax applies to property used in New Mexico that was bought without gross receipts tax. A similar tax charged by another state may be credited, up to the compensating tax due.",
      sources: [
        src(TRD, "FYI-105, Gross Receipts & Compensating Taxes: An Overview", FYI105,
          "Compensating tax is an excise tax imposed on persons making taxable use of property, license, franchise or services in New Mexico as described below (7-9-7).", F),
        src(TRD, "FYI-105, Gross Receipts & Compensating Taxes: An Overview", FYI105,
          "Note: If another states tax similar to gross receipts, sales, or compensating tax has been charged you may be able to claim a credit for that tax paid in an amount not to exceed the amount of compensating tax due on the property or services used in New Mexico (7-9-79).", F),
      ],
      caveat: "Whether the 50 percent aircraft deduction (a gross receipts tax deduction) also reduces compensating tax on an imported aircraft was not confirmed.",
    },
    exemptions: {
      status: "conditional",
      answer:
        "Receipts of an aircraft manufacturer or its affiliate from selling aircraft, flight support, or pilot and maintenance training are fully deductible. In-state charter flights, with a pilot, are not subject to gross receipts tax. We found no nonresident fly-away deduction.",
      sources: [
        src("New Mexico Laws", "Section 7-9-62(B) NMSA 1978, as amended by HB 14 (2014)", HB14,
          "Receipts of an aircraft manufacturer or affiliate from selling aircraft or from selling aircraft flight support, pilot training or maintenance training services may be deducted from gross receipts.", L14),
        src("New Mexico Administrative Code", "3.2.207.8 NMAC, Example 4", REG207, "Receipts from in-state charter flights are not subject to gross receipts tax."),
      ],
    },
    rental: {
      status: "taxable",
      answer: "Receipts from leasing airplanes are subject to gross receipts tax. A charter, where the operator supplies the pilot, is not a lease.",
      sources: [
        src("New Mexico Administrative Code", "3.2.207.8 NMAC, Example 4", REG207, "The receipts from leasing airplanes and flight instructions are subject to the gross receipts tax."),
        src("New Mexico Administrative Code", "3.2.207.8 NMAC, Example 4", REG207, "A charter is not a lease."),
      ],
    },
    instruction: {
      status: "taxable",
      answer: "Flight instruction receipts are subject to gross receipts tax, as are the school's airplane rentals.",
      sources: [
        src("New Mexico Administrative Code", "3.2.207.8 NMAC, Example 4", REG207, "The receipts from leasing airplanes and flight instructions are subject to the gross receipts tax."),
      ],
      caveat: "The pilot training deduction in 7-9-62(B) applies only to aircraft manufacturers and their affiliates.",
    },
    maintenance: {
      status: "exempt",
      answer: "Receipts from selling aircraft parts, and from maintenance services on aircraft or aircraft parts, are fully deductible from gross receipts.",
      sources: [
        src("New Mexico Laws", "Section 7-9-62(C) NMSA 1978, as amended by HB 14 (2014)", HB14,
          "Receipts from selling aircraft parts or maintenance services for aircraft or aircraft parts may be deducted from gross receipts.", L14),
        src(TRD, "FYI-105, Gross Receipts & Compensating Taxes: An Overview", FYI105,
          "If you sell aircraft parts, provide maintenance services for aircraft and aircraft parts and your receipts are deductible under Section 7 -9-62(C), use the required deduction code of D0-008 to report your deductible receipts.", F),
      ],
    },
    annual: {
      status: "taxable",
      answer:
        "Aircraft based or hangared in New Mexico register every year with the Aviation Division, in place of personal property tax. The fee runs from two cents a pound of maximum gross weight for a model a year old or less down to one cent a pound at five years or more, capped at $300 per engine; a hot air balloon pays $10.",
      sources: [
        src("New Mexico Laws", "Section 64-4-4(A) NMSA 1978, as amended by HB 458 (2003)", HB458,
          "All aircraft based or hangared within this state shall be registered annually with the division, and a registration fee shall be paid as approved in the Aircraft Registration Act.", L03),
        src("New Mexico Laws", "Section 64-4-11(A) NMSA 1978, as amended by HB 458 (2003)", HB458,
          "when the model of the aircraft is one year or less old immediately prior to the year for which it is being registered, two cents ($.02) a pound of manufacturer's maximum gross weight", L03),
        src("New Mexico Laws", "Section 64-4-11(A) NMSA 1978, as amended by HB 458 (2003)", HB458,
          "when the model of the aircraft is five years or more old immediately prior to the year for which it is being registered, one cent ($.01) a pound of manufacturer's maximum gross weight", L03),
        src("New Mexico Laws", "Section 64-4-11(B)-(C) NMSA 1978, as amended by HB 458 (2003)", HB458,
          "The fees charged in Subsection A of this section shall not exceed three hundred dollars ($300) per engine regardless of the weight or age of the aircraft.", L03),
        src("New Mexico Laws", "Section 64-4-11(A)(7) NMSA 1978, as amended by HB 458 (2003)", HB458,
          "hot air balloons, a flat fee of ten dollars ($10.00) regardless of the age and weight of aircraft", L03),
        src("New Mexico Laws", "Section 64-4-11(C) NMSA 1978, as amended by HB 458 (2003)", HB458,
          "The fees set by this section are in lieu of all personal property taxes on aircraft authorized by any law of this state.", L03),
      ],
      caveat: "Quoted from the 2003 session law; a commercial code site shows the same tiers and per-engine cap as current, but the official codified NMSA text was not read. 18.11.2 NMAC (Aviation Division) refers to 64-4-11 for the fee.",
    },
  },
};
