export type FactStatus = "taxable" | "exempt" | "conditional" | "none" | "unclear";

export type TaxSource = {
  publisher: string;
  title: string;
  url: string;
  /** The exact sentence the answer rests on. */
  quote: string;
  quoteExact: boolean;
  /** ISO date the source was last read. */
  checkedOn: string;
  /** The document's own revision date, when it prints one ("R. 04/15"). */
  dated?: string;
};

export type TaxFact = {
  status: FactStatus;
  /** Two or three plain sentences. Everything a reader needs is here. */
  answer: string;
  sources: TaxSource[];
  /** Internal note for whoever maintains the data. Never rendered. */
  caveat?: string;
};

export type TaxRegion = {
  country: string;
  slug: string;
  name: string;
  code: string;
  /** One or two sentences: the page's lede and its meta description. */
  summary: string;
  facts: Record<"buying" | "bringingIn" | "exemptions" | "rental" | "instruction" | "maintenance" | "annual", TaxFact>;
};
