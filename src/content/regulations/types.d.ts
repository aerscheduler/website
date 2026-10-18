/** One plain-English summary, written against the official text with hash `textHash`. */
export type RegSummary = {
  /** Matches `cite` in registry.mjs and the key in ecfr.json. */
  cite: string;
  /** The `hash` of the eCFR text this summary was written against. check-regulations.mjs compares them. */
  textHash: string;
  /** Meta description, at most 160 characters. */
  description: string;
  /** The answer, first: one or two sentences, shown under the heading and quoted by search and assistants. */
  answer: string;
  /**
   * The rule in plain English, each point citing the paragraph it comes from:
   * an anchor like "b-1-i". Empty only for a section with no lettered
   * paragraphs (most of Part 39), where the point cites the whole section.
   */
  points: { text: string; para: string }[];
  /** Questions people actually ask about the rule. Rendered as a FAQPage. */
  faqs: { q: string; a: string }[];
  /** Other cites in the library worth reading next. */
  related: string[];
  /** Pages elsewhere on the site: guides, the AD library. */
  links?: { href: string; label: string }[];
  /**
   * The one line about AerScheduler. Omitted: the topic's default. `null`: no
   * product line, for a rule the product does not track.
   */
  product?: { text: string; href: string } | null;
};
