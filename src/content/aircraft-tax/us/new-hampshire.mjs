import { src } from "../sources.mjs";

const FAQ = "https://www.revenue.nh.gov/resource-center/frequently-asked-questions/general-information";
const NO_SALES_TAX = () =>
  src("New Hampshire Department of Revenue Administration", "FAQ: Does New Hampshire have a sales tax?", FAQ,
    "No, there is no general sales tax on goods purchased in New Hampshire.");
const RSA = (s) => `https://gc.nh.gov/rsa/html/${s}`;

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "new-hampshire",
  name: "New Hampshire",
  code: "NH",
  summary:
    "New Hampshire has no general sales tax, so buying, bringing in, renting out, teaching in and maintaining an aircraft carry no sales tax. Aircraft that need a New Hampshire registration certificate pay a yearly operating fee by weight, $100 for most light aircraft.",
  facts: {
    buying: {
      status: "none",
      answer: "No sales tax. New Hampshire has no general sales tax on goods.",
      sources: [NO_SALES_TAX()],
    },
    bringingIn: {
      status: "none",
      answer: "No use tax on an aircraft bought elsewhere and based in New Hampshire, because there is no general sales tax to complement. The aircraft may still need a state registration.",
      sources: [NO_SALES_TAX()],
      caveat: "The Department's sentence is about sales tax; we found no New Hampshire use tax on goods, but no source states \"no use tax\" in those words.",
    },
    exemptions: {
      status: "none",
      answer: "With no general sales tax there is nothing to be exempted from. Registration fee exceptions are under registration.",
      sources: [NO_SALES_TAX()],
    },
    rental: {
      status: "none",
      answer:
        "Aircraft rentals carry no sales tax. New Hampshire's 8.5 percent rentals tax applies only to rental agreements for motor vehicles.",
      sources: [
        NO_SALES_TAX(),
        src("New Hampshire Revised Statutes", "RSA 78-A:6, II-a", RSA("V/78-A/78-A-6.htm"), "A tax of 8.5 percent is imposed upon the gross rental receipts of each rental."),
        src("New Hampshire Revised Statutes", "RSA 78-A:3, definition of rental agreement", RSA("V/78-A/78-A-3.htm"),
          "\"Rental agreement\" means an agreement by the owner of a motor vehicle to provide, for not longer than 180 days, the exclusive use of that motor vehicle to another for consideration, whether directly or indirectly, through a rental facilitator or otherwise"),
      ],
    },
    instruction: {
      status: "none",
      answer: "Flight instruction and the aircraft time inside a lesson carry no sales tax in New Hampshire.",
      sources: [NO_SALES_TAX()],
    },
    maintenance: {
      status: "none",
      answer: "Parts and repair labor carry no sales tax in New Hampshire.",
      sources: [NO_SALES_TAX()],
    },
    annual: {
      status: "taxable",
      answer:
        "Each aircraft that needs a New Hampshire registration certificate pays a yearly aircraft operating fee: $100 for an antique, glider or experimental aircraft, and by maximum gross weight for others, $100 up to 3,000 lbs., $250 up to 8,000 lbs., $2,500 up to 12,500 lbs. and $3,500 above. Registrations run for one year, timed by the first digit of the N-number.",
      sources: [
        src("New Hampshire Revised Statutes", "RSA 422:31, III", RSA("XXXIX/422/422-31.htm"),
          "An aircraft operating fee for each aircraft for which a state registration certificate is required. The amount of the fee for an antique aircraft, glider, or experimental aircraft shall be $100."),
        src("New Hampshire Revised Statutes", "RSA 422:31, III fee schedule", RSA("XXXIX/422/422-31.htm"),
          "0-3,000 lbs. $ 100 3,001-8,000 lbs. $ 250 8,001-12,500 lbs. $2,500 more than 12,500 lbs. $3,500"),
        src("New Hampshire Revised Statutes", "RSA 422:21, IV", RSA("XXXIX/422/422-21.htm"),
          "A state registration certificate shall normally remain in force for one year following the date of its issue, unless it is an aircraft registered out of cycle, in which case paragraph V shall apply."),
      ],
      caveat: "Which aircraft must hold a state registration certificate (for example, those based in New Hampshire) is set in RSA 422:21, 422:22 and NHDOT rules, which we did not read in full.",
    },
  },
};
