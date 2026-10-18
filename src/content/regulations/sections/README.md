# Plain-English regulation summaries

One file per topic in `registry.mjs`. Each entry explains one section of 14 CFR
and renders at `/regulations/<slug>`, above the official eCFR text.

House rules, enforced where possible by `scripts/check-regulations.mjs`:

- **Write against the text on the page.** Read the section in `../ecfr.json` (or
  on the page) before writing, and set `textHash` to that section's `hash`. When
  the sync pulls an amended section the build fails until the summary is reread
  and the hash updated. Never update a hash without rereading.
- **Answer first.** `answer` is one or two sentences that answer the question
  people search for. It is the snippet Google and assistants quote.
- **Every point cites its paragraph** (`para: "b-1-i"`). Leave it empty only for
  a section with no lettered paragraphs, or for its unlettered lead-in.
- **Say only what the text says.** Where a common reading depends on FAA legal
  interpretations or advisory circulars, say so ("the FAA treats", "check with
  your FSDO") rather than stating it as the rule.
- **Descriptions fit in 160 characters.** No em dashes anywhere.
- **The product line is earned.** Omit `product` to use the topic's line, or set
  `product: null` when AerScheduler does not track the rule. Every claim must
  match `src/lib/features.ts`.
- **Adding a section:** a line in `registry.mjs`, `node scripts/sync-ecfr.mjs
  <cite>`, a summary here. Sitemap, search, llms.txt, Markdown and JSON follow.
