import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "oregon",
  name: "Oregon",
  code: "OR",
  summary:
    "Oregon has no general sales or use tax, so buying, bringing in, renting out, teaching in and maintaining an aircraft carry no sales tax. Aircraft based in Oregon register with the Oregon Department of Aviation every year, $65 for a single-engine piston airplane.",
  facts: {
    buying: {
      status: "none",
      answer: "No sales tax. Oregon has no general sales or use tax.",
      sources: [
        src("Oregon Department of Revenue", "Sales tax in Oregon", "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx", "Oregon doesn't have a general sales or use/transaction tax."),
      ],
    },
    bringingIn: {
      status: "none",
      answer: "No use tax on an aircraft bought elsewhere and based in Oregon, because Oregon has no general use tax. The aircraft still has to be registered.",
      sources: [
        src("Oregon Department of Revenue", "Sales tax in Oregon", "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx", "Oregon doesn't have a general sales or use/transaction tax."),
      ],
    },
    exemptions: {
      status: "none",
      answer: "With no general sales or use tax there is nothing to be exempted from. Registration exemptions are listed under registration.",
      sources: [
        src("Oregon Department of Revenue", "Sales tax in Oregon", "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx", "Oregon doesn't have a general sales or use/transaction tax."),
      ],
    },
    rental: {
      status: "none",
      answer: "Aircraft rentals carry no sales tax in Oregon.",
      sources: [
        src("Oregon Department of Revenue", "Sales tax in Oregon", "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx", "Oregon doesn't have a general sales or use/transaction tax."),
      ],
    },
    instruction: {
      status: "none",
      answer: "Flight instruction carries no sales tax in Oregon.",
      sources: [
        src("Oregon Department of Revenue", "Sales tax in Oregon", "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx", "Oregon doesn't have a general sales or use/transaction tax."),
      ],
    },
    maintenance: {
      status: "none",
      answer: "Parts and labor carry no sales tax in Oregon.",
      sources: [
        src("Oregon Department of Revenue", "Sales tax in Oregon", "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx", "Oregon doesn't have a general sales or use/transaction tax."),
      ],
    },
    annual: {
      status: "taxable",
      answer: "Aircraft based in Oregon, or used here for commercial operations, register with the Oregon Department of Aviation within 60 days and renew every year: $65 for a single-engine piston airplane or piston helicopter, $150 for a piston twin, $250 for a single-engine turboprop, and $700 for a jet.",
      sources: [
        src("Oregon Revised Statutes", "ORS 837.040(5)(a), 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "The owner of a civil aircraft that is based in Oregon shall register the aircraft within 60 days of the date the aircraft becomes subject to registration."),
        src("Oregon Revised Statutes", "ORS 837.040(1)(a), 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "The owner of a civil aircraft that is capable of flight and that is based in this state."),
        src("Oregon Revised Statutes", "ORS 837.045(1) fee schedule, 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "Single engine fixed wing, piston | $ 65"),
        src("Oregon Revised Statutes", "ORS 837.045(1) fee schedule, 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "Single engine fixed wing, turboprop | 250"),
        src("Oregon Revised Statutes", "ORS 837.045(1) fee schedule, 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "Multiengine fixed wing, piston | 150"),
        src("Oregon Revised Statutes", "ORS 837.045(1) fee schedule, 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "Turbojet fixed wing | 700"),
        src("Oregon Revised Statutes", "ORS 837.045(1) fee schedule, 2025 edition", "https://www.oregonlegislature.gov/bills_laws/ors/ors837.html", "Helicopter piston engine | 65"),
      ],
    },
  },
};
