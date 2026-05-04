# Review Prompt — Musikinsel Feedback Batch 007

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 007 — a focused editorial-and-layout refinement pass:

- homepage hero reordered
- Instrumente trimmed (Musiktheorie out, Einstieg & Alter promoted)
- Gebühren third value typography normalized + mobile pair-keeping fix
- Veranstaltungen invitation paragraph + heading cleanup
- Impressum opening sentence dropped
- site-wide footer copy refreshed
- two carry-forward review items closed (`.price-tile` comment removal; team previews verified as first real bio paragraph)

## Read first

- `prompts/for_coding_agent/008_musikinsel_feedback_batch_007.md`
- `03_build/batch_007_rails.md`
- `03_build/implementation_plan.md` (Batch 007 milestones, all DONE/VERIFIED)
- `05_governance/decision_log.md` (top block "2026-05-04 - Batch 007 implementation decisions")

Then inspect:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js` (only to confirm `klavier.jpg` first-slide preservation)

## What to verify

### 1. Homepage (`index.html`)

- The first content block in `.hero-stage-text` is now `.hero-intro` carrying:
  - eyebrow `Wer wir sind`
  - `<h1>Ein Musikstudio mit freundlicher Lernatmosphäre</h1>`
  - the merged single intro paragraph (combines the two prior paragraphs verbatim)
  - the two CTAs (`Probestunde anfragen`, `Lehrkräfte kennenlernen`)
- The second block is `.hero-overview` carrying:
  - eyebrow `Musikunterricht in Leipzig-Plagwitz`
  - `<h2>Was uns auszeichnet</h2>` (note: H2, not H1 — there should be exactly one H1 on the page)
  - the unchanged six-bullet `<ul class="hero-list">`
- Sticky panel still works: scroll on desktop ≥980px and confirm the slideshow stays anchored.
- Slideshow first image source is `assets/images/startseite/klavier.jpg`.

### 2. Team page (`team.html`)

- Each `<p class="bio-preview">` already begins with the first real biography paragraph from `legacy_site/material/Unser Team.docx` (no Batch 002 short editorial intro remains).
- `<details class="bio-more">` retains the remaining biography paragraphs.

### 3. Instrumente page (`instrumente.html`)

- Card grid contains exactly 5 cards in order: Violine, Klavier, Gitarre, Cello, Einstieg & Alter.
- No Musiktheorie card. No Musiktheorie image referenced.
- Einstieg & Alter card uses the plant emoji icon and copy: `Kinder sind ab 4 Jahren für Violine, ab 6 Jahren für Klavier und Gitarre sowie ab 7 Jahren für Cello willkommen.`
- Instrument-card sizing, radius (20px), 280×220 frame, and gradient `.instrument-icon` styling unchanged from Batch 005.

### 4. Gebühren page (`gebuehren.html`)

Desktop:
- First two pricing tables byte-identical to their Batch 005 / 006 state.
- Third table (`pricing-table-single`) renders one column with header `50 Minuten Gruppenunterricht` and cell `35€ pro Monat`. Cell typography now matches the first two tables (no oversized 1.6rem treatment).
- Bottom `Konditionen` block intact.

Mobile (≤760px, narrow viewport like 375px):
- Each duration label sits directly above its corresponding price. The previous "all heads first, then all cells" stack is gone.
- The `.pricing-table-single` variant still renders correctly (head + cell, full-width).
- No horizontal overflow.

CSS:
- `.pricing-table-single .pricing-cell` typography override is gone.
- Mobile breakpoint contains explicit `order: 1..6` rules on `.pricing-table .pricing-head:nth-child(1..3)` and `.pricing-table .pricing-cell:nth-child(4..6)`.
- No `.price-tile` reference anywhere in `styles.css`.

### 5. Veranstaltungen (`news.html`)

- Page hero contains: eyebrow `Veranstaltungen`, `<h1>Neuigkeiten und Konzerte</h1>`, and the new `<p class="lead">` invitation paragraph (text verbatim).
- Below that, a single `.news-card.news-card-poster` containing only the click-to-zoom anchor wrapping `assets/images/news/sommerkonzert-2026.jpg`. No `<h3>Sommerkonzert</h3>` remains.
- Poster still renders without aspect-ratio cropping.

### 6. Impressum (`impressum.html`)

- The `<p class="lead">Rechtliche Angaben gemäß § 5 TMG…` opening sentence is gone.
- H1 still reads `Rechtliche Angaben`. Below it, the existing legal-card content is unchanged.

### 7. Footer parity across all 8 pages

For every page in `legacy_site/site/*.html`:

- The first footer column tagline reads: `Musikunterricht in Leipzig-Plagwitz für Kinder, Jugendliche und Erwachsene – mit Fokus auf musikalische Grundlagen, individuellen Unterricht und Freude am Musizieren.` (note `individuellen Unterricht`, not `persönliches Lernen`).
- The Schnellzugriff list contains an `Instrumente & Einstieg` link (not `Fächer & Einstieg`).

Run a grep over `legacy_site/site/*.html` for the strings `Fächer &amp; Einstieg` and `persönliches Lernen` — both should return zero matches.

### 8. Out-of-scope check

- Navigation unchanged.
- Kontakt page unchanged (Thema list still `Allgemein, Violine, Klavier, Gitarre, Cello, Gruppenunterricht, Raumvermietung`).
- Typography link in `<head>` unchanged (Cormorant Garamond + Inter at the typespec weights).
- Favicon links unchanged.
- Sommerkonzert poster JPG asset unchanged.
- Raumvermietung photo block still sits directly below the lead paragraph.
- No JS behavior changes — the only file touched in `main.js` should be the existing first-slide ordering already shipped (verify: `klavier.jpg` is the first entry in `heroSlides`).

## Output

Produce a structured review:

1. **Blocking issues** — anything failing an acceptance gate.
2. **Should-fix before close** — visible regressions, missed copy, or scope creep.
3. **Nice-to-have / next-batch** — for example: should the Instrumente grid go to a 4-column row to evenly fit the new 5-card set, should the homepage `<h2>Was uns auszeichnet</h2>` have its own visible heading style adjustment, should the news page show the date alongside the poster card, should the Impressum body copy carry a small "Stand: [Datum]" hint?
4. **Questions for the client** — none expected; the previous Batch 006 open question (editorial status hooks) has not been re-raised in this batch.

Append the synthesis to `05_governance/reviews/review_synthesis.md`. Final acceptance is the human owner's call.
