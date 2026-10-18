# Aircraft tax data: how to research and add a state

One file per state in `us/<slug>.mjs` (slug: lowercase, hyphens, `district-of-columbia`).
Copy the shape of `us/idaho.mjs` or `us/florida.mjs`; they are the standard.

## The seven answers every state gives

| key | question |
|---|---|
| `buying` | Sales tax when you buy an aircraft: state rate, whether local tax applies, private sales |
| `bringingIn` | Use tax on an aircraft bought elsewhere and based or used here: triggers, days, credit for tax paid elsewhere |
| `exemptions` | Exemptions owners plan around: fly-away / nonresident removal, carriers (Part 121/135), aircraft held for rental, caps |
| `rental` | Are aircraft rentals taxed (bare / wet)? |
| `instruction` | Is flight instruction taxed? Is the aircraft rental inside a lesson taxed? Is the school's purchase taxed? |
| `maintenance` | Are parts and repair labor taxed? Any weight-based or nonresident exemptions? |
| `annual` | Yearly state aircraft registration fee, excise tax, or property tax |

Each answer: `status` (`taxable`, `exempt`, `conditional`, `none`, `unclear`), two or three
plain sentences in `answer`, and `sources`. A no-sales-tax state answers `none` for six
questions, quoting the revenue department's own "no sales tax" sentence, and still answers
`annual`. `summary` is one or two sentences for the page's lede (80 characters minimum).

## Accuracy rules (the build enforces the mechanical ones)

- **Primary sources only:** the state revenue department, the statute, the administrative
  rule, the state aviation agency. AOPA, NBAA, law firm and tax-software pages may point you
  to a source; they are never one.
- **Quote the exact sentence**, copied from the source, in `quote`. Never paraphrase. Use
  `src(publisher, title, url, quote, { dated })` from `../sources.mjs`; `dated` is the
  document's printed revision date when it has one.
- **Prefer the current rule or statute** over an old guide. If only an old guide answers,
  use it and set `dated` so the page shows its age.
- **If no primary source clearly answers, set `status: "unclear"`**, say so in `answer`, and
  leave `sources` empty or cite the closest thing. Never fill a gap from another state, a
  secondary site or general knowledge.
- Every number in an answer (rate, days, dollars, pounds) must appear in a quoted source.
- `caveat` is an internal note for the reviewer, never shown. Use it for anything you could
  not verify.
- House style: no em dashes, no spaced en dashes. Plain sentences.

## Tools that work

- PDFs: download with `curl -L -A "Mozilla/5.0"`, extract with
  `uv run -q --with pypdf python -I <script>` (pypdf `PdfReader(...).pages[i].extract_text()`),
  run from a directory that is not the download directory.
- Word files: `textutil -convert txt`.
- WebFetch summarizes; ask it to "quote verbatim" and check the sentence reads as source text.
  Long statute pages truncate: pass `offset`.

## Checking a file

```bash
node scripts/check-aircraft-tax.mjs us/<slug>.mjs
```

It fails on a paraphrase, a missing answer, an unsourced answer not marked `unclear`, a
source older than a year, or a banned dash. Do not add the state to `us/index.mjs`; the
reviewer does that after reading it.
