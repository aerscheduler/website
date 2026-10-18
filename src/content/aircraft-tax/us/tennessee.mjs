import { src } from "../sources.mjs";

const DOR = "Tennessee Department of Revenue";
const KB = (id, slug) => `https://revenue.support.tn.gov/hc/en-us/articles/${id}-${slug}`;
const A1 = KB("360059301552", "Aircraft-1-Aircraft-Generally-Subject-to-Sales-Tax");
const A2 = KB("360059301712", "Aircraft-2-How-to-Register-Aircraft-in-Tennessee");
const A4 = KB("360059303252", "Aircraft-4-How-to-Calculate-Sales-or-Use-Tax-on-Aircraft-Purchase");
const A9 = KB("360059752711", "Aircraft-9-Aircraft-Moved-into-Tennessee-From-Another-State-is-Taxable-Event-Credit-Allowed-for-Tax-Previously-Paid-in-Another-State");
const A10 = KB("360059341092", "Aircraft-10-Tennessee-Resident-with-Aircraft-Domiciled-Outside-Tennessee-Not-Subject-to-Tennessee-Tax");
const A17 = KB("360059760951", "Aircraft-17-Taxability-of-Transferring-Aircraft-to-Family-Member");
const A19 = KB("360059350012", "Aircraft-19-Aircraft-Transferred-from-Owner-to-Company-is-Taxable-Transaction");
const A20 = KB("360059762211", "Aircraft-20-Aircraft-Leased-Exclusively-to-Flight-School-Exempt-from-Sales-Tax");
const SUT42 = KB("360058626751", "SUT-42-Leases-and-Capital-Leases");
const LR2111 = "https://www.tn.gov/content/dam/tn/revenue/documents/rulings/sales/21-11.pdf";
const KB_DATED = { dated: "updated April 13, 2021" };
const LR_DATED = { dated: "November 17, 2021" };

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "tennessee",
  name: "Tennessee",
  code: "TN",
  summary:
    "Tennessee charges 7 percent state sales or use tax on aircraft, plus local tax and the state single article tax on limited amounts, including on private sales. Dry rentals are taxed, aircraft parts generally are, and there is no state aircraft registration.",
  facts: {
    buying: {
      status: "taxable",
      answer:
        "7 percent state tax on the total consideration, plus local tax on the first $1,600 and a 2.75 percent state single article tax on the next $1,600. A purchase from an individual or out-of-state seller is taxable too, and the buyer pays the Department directly.",
      sources: [
        src(DOR, "Aircraft-4, How to Calculate Sales or Use Tax on Aircraft Purchase", A4,
          "Tennessee applies a 7% state tax on the total amount of consideration, a local tax on the first $1,600, and a State single article tax rate of 2.75% on the following $1,600.", KB_DATED),
        src(DOR, "Aircraft-1, Aircraft Generally Subject to Sales Tax", A1,
          "If your purchase was from an individual who is not a dealer or from an out-of-state dealer or individual, you are required to pay tax directly to the Department of Revenue.", KB_DATED),
      ],
      caveat: "Rates are the Department's 2021 article; the 7 percent state rate and single article tax structure were not re-checked against Tenn. Code Ann. 67-6-202 and 67-6-702 (official code is on LexisNexis only).",
    },
    bringingIn: {
      status: "conditional",
      answer:
        "Bringing an aircraft into Tennessee is a taxable import, taxed on its fair market value, with credit for sales tax paid to another state. There is no set number of days: an aircraft hangared in Tennessee, even part time, may be taxable, and the owner must prove an aircraft based elsewhere stayed elsewhere.",
      sources: [
        src(DOR, "Aircraft-9, Aircraft Moved into Tennessee From Another State is Taxable Event", A9,
          "The tax base is the fair market value of the aircraft that is determined using the best information available to the Department in accordance with Tennessee law", KB_DATED),
        src(DOR, "Aircraft-9, Aircraft Moved into Tennessee From Another State is Taxable Event", A9,
          "Sales tax paid to another state does not eliminate the tax liability in Tennessee. However, Tennessee law allows a credit against the Tennessee liability.", KB_DATED),
        src(DOR, "Aircraft-10, Tennessee Resident with Aircraft Domiciled Outside Tennessee", A10,
          "An aircraft that is hangered in Tennessee, even if also hangered in another state, may be subject to tax in Tennessee as a taxable import. There is no bright line test in Tennessee for how long an aircraft must be in Tennessee to be taxable in Tennessee.", KB_DATED),
      ],
    },
    exemptions: {
      status: "conditional",
      answer:
        "Transfers to a spouse, sibling, parent, child, grandparent or grandchild are exempt with documentation. An aircraft bought only to lease to a flight school can be bought tax free for resale by a buyer with an active sales and use tax account. A transfer from an owner to a corporation or multimember LLC is taxable.",
      sources: [
        src(DOR, "Aircraft-17, Taxability of Transferring Aircraft to Family Member", A17,
          "A lineal relative transfer of an aircraft is exempt from sales and use tax but the transfer must be supported with proper documentation.", KB_DATED),
        src(DOR, "Aircraft-20, Aircraft Leased Exclusively to Flight School Exempt from Sales Tax", A20,
          "If the aircraft is purchased exclusively for lease to a flight school, the purchasing entity may obtain the aircraft free from sales tax. However, to qualify for the exemption of resale the purchaser must be registered with the Department of Revenue with an active sales and use account.", KB_DATED),
        src(DOR, "Aircraft-19, Aircraft Transferred from Owner to Company is Taxable Transaction", A19,
          "In Tennessee a corporation or multimember LLC is considered a separate legal entity.", KB_DATED),
      ],
      caveat: "No nonresident fly-away or Part 135 exemption for the aircraft itself found in the Department's 20 aircraft articles.",
    },
    rental: {
      status: "taxable",
      answer:
        "Sales and use tax is due on leases and rentals of tangible personal property, which Tennessee defines as handing over possession or control without an operator. A dry aircraft rental is taxable; a rental that comes with the owner's pilot is not a lease under that definition.",
      sources: [
        src(DOR, "SUT-42, Leases and Capital Leases", SUT42,
          "A lease or rental is defined as any transfer of possession or control of tangible personal property, without providing an operator, for a fixed or indeterminate term for consideration. Sales and use tax is due on the sales price/ purchase price on all leases or rentals of tangible personal property or computer software in Tennessee.", { dated: "updated March 27, 2025" }),
      ],
      caveat: "Letter Ruling 07-32 applied this to airplanes (dry lease taxable, lease with pilot not), but letter rulings bind only the requester. Whether a with-pilot charter is a taxable service was not checked.",
    },
    instruction: {
      status: "unclear",
      answer:
        "The Department publishes no guidance on whether flight instruction, or the aircraft time inside a lesson, is taxed. It does say an aircraft bought only to lease to a flight school can be bought tax free for resale.",
      sources: [
        src(DOR, "Aircraft-20, Aircraft Leased Exclusively to Flight School Exempt from Sales Tax", A20,
          "If the aircraft is purchased exclusively for lease to a flight school, the purchasing entity may obtain the aircraft free from sales tax.", KB_DATED),
      ],
      caveat: "Tennessee taxes services only when enumerated (Letter Ruling 21-11); flight instruction is not known to be enumerated, but no primary source says so.",
    },
    maintenance: {
      status: "conditional",
      answer:
        "Aircraft parts are generally taxable. Repair of an aircraft based outside Tennessee is exempt if it leaves within thirty days of completion and the work is done under a supplemental type certificate or, for transport category aircraft, by an OEM-authorized facility. Parts for aircraft under 12,500 pounds are taxable even for out-of-state owners.",
      sources: [
        src(DOR, "Letter Ruling 21-11", LR2111,
          "There is no general exemption for aircraft replacement and repair parts.", LR_DATED),
        src(DOR, "Letter Ruling 21-11", LR2111,
          "The aircraft and aircraft components must have their situs outside of Tennessee and be removed from Tennessee within thirty days from the completion of repair and refurbishment services.", LR_DATED),
        src(DOR, "Letter Ruling 21-11", LR2111,
          "There is no exemption from Tennessee sales and use tax for airplane replacement and repair parts delivered to a repair person in Tennessee for use on aircraft with a certified maximum take- off weight of less than 12,500 pounds, that are purchased by an airplane owner with a situs outside of Tennessee and removed from Tennessee within thirty days after delivery to the repair person.", LR_DATED),
      ],
      caveat: "Letter rulings bind only the requester but describe Tenn. Code Ann. 67-6-313(h)(1)(D) and (k). Parts for large aircraft (12,500 pounds or more) at an authorized large aircraft facility are exempt if removed within fifteen days (67-6-313(k)(2)). SB 2143 (2026) would widen the repair exemption; status unknown.",
    },
    annual: {
      status: "unclear",
      answer:
        "Tennessee does not require aircraft to be registered with any state agency, so there is no state registration fee. The Department's aircraft guidance does not say whether counties tax aircraft as personal property.",
      sources: [
        src(DOR, "Aircraft-2, How to Register Aircraft in Tennessee", A2,
          "Aircraft are not required to be registered with any Tennessee state government agency.", { dated: "updated April 14, 2021" }),
      ],
      caveat: "An Affidavit of Transfer is required on every purchase, transfer or import (Aircraft-2); whether it carries a fee was not checked.",
    },
  },
};
