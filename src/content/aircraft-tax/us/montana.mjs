import { src } from "../sources.mjs";

/** @type {import("../types").TaxRegion} */
export default {
  country: "US",
  slug: "montana",
  name: "Montana",
  code: "MT",
  summary:
    "Montana has no general sales tax, so buying, renting, teaching in and maintaining an aircraft carry no state sales tax. Instead, aircraft based in Montana register every year and pay a fee in lieu of property tax that falls with the aircraft's age.",
  facts: {
    buying: {
      status: "none",
      answer: "No state sales tax. Montana does not have a general sales tax.",
      sources: [
        src("Montana Department of Revenue", "Sales Tax Guidance for Montana Business and Residents", "https://revenuefiles.mt.gov/taxes/general-sales-tax", "Montana does not have a general sales tax."),
      ],
    },
    bringingIn: {
      status: "none",
      answer: "No state use tax on an aircraft bought elsewhere and based in Montana. It still registers and pays the yearly fee in lieu of tax.",
      sources: [
        src("Montana Department of Revenue", "Sales Tax Guidance for Montana Business and Residents", "https://revenuefiles.mt.gov/taxes/general-sales-tax", "Montana does not have a general sales tax."),
      ],
    },
    exemptions: {
      status: "none",
      answer: "With no general sales tax there is nothing to be exempted from. The yearly fee has its own exemptions.",
      sources: [
        src("Montana Department of Revenue", "Sales Tax Guidance for Montana Business and Residents", "https://revenuefiles.mt.gov/taxes/general-sales-tax", "Montana does not have a general sales tax."),
      ],
    },
    rental: {
      status: "none",
      answer: "Aircraft rentals carry no state sales tax in Montana.",
      sources: [
        src("Montana Department of Revenue", "Sales Tax Guidance for Montana Business and Residents", "https://revenuefiles.mt.gov/taxes/general-sales-tax", "Montana does not have a general sales tax."),
      ],
    },
    instruction: {
      status: "none",
      answer: "Flight instruction carries no state sales tax in Montana.",
      sources: [
        src("Montana Department of Revenue", "Sales Tax Guidance for Montana Business and Residents", "https://revenuefiles.mt.gov/taxes/general-sales-tax", "Montana does not have a general sales tax."),
      ],
    },
    maintenance: {
      status: "none",
      answer: "Parts and labor carry no state sales tax in Montana.",
      sources: [
        src("Montana Department of Revenue", "Sales Tax Guidance for Montana Business and Residents", "https://revenuefiles.mt.gov/taxes/general-sales-tax", "Montana does not have a general sales tax."),
      ],
    },
    annual: {
      status: "taxable",
      answer: "Aircraft based in Montana register every year and pay a fee in lieu of property tax, set by type and age. A single-engine, fixed-gear airplane of 200 horsepower or less pays $450 in its first five years, falling with age to $37.50; aircraft over 40 years old, homebuilts and antiques pay $30.",
      sources: [
        src("Montana Code Annotated", "MCA 67-3-204, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0040/0670-0030-0020-0040.html", "The registration fee is in lieu of property tax."),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Single engine, fixed gear, 200 horsepower and under | $ 450 | $ 262.50 | $ 150 | $ 75 | $ 37.50"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Single engine, fixed gear, over 200 horsepower | 750 | 375 | 225 | 112.50 | 75"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Single engine, retractable gear, 200 horsepower and under | 900 | 450 | 262.50 | 150 | 112.50"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Single engine, retractable gear, over 200 horsepower | 1,050 | 600 | 300 | 187.50 | 150"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Multi-engine, piston engine | 1,200 | 750 | 375 | 262.50 | 225"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Helicopter, piston engine | 1,050 | 675 | 337.50 | 225 | 187.50"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Single engine jet helicopter, prop jet | 2,250 | 1,050 | 675 | 450 | 262.50"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Multi-engine jet helicopter, prop jet | 3,000 | 1,500 | 900 | 600 | 300"),
        src("Montana Code Annotated", "MCA 67-3-206(1) schedule, ages 0-5 | 6-10 | 11-20 | 21-30 | 31-40, 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "Jet engine, no propeller | 4,500 | 2,250 | 1,200 | 750 | 375"),
        src("Montana Code Annotated", "MCA 67-3-206(3), 2025", "https://mca.legmt.gov/bills/mca/title_0670/chapter_0030/part_0020/section_0060/0670-0030-0020-0060.html", "The fee in lieu of tax imposed on any glider, ultralight, gyrocopter, balloon, homebuilt aircraft, antiques, or any aircraft over 40 years old is $30."),
      ],
    },
  },
};
