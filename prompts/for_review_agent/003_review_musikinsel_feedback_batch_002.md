# Review Prompt — Musikinsel Feedback Batch 002

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 002 — the correction pass that follows the Batch 001 review. Your job is to verify the six requested corrections landed cleanly and to catch regressions introduced while restructuring the hero area.

## Read first

- `CLAUDE.md`
- `prompts/for_coding_agent/003_musikinsel_feedback_batch_002.md` — the originating task
- `05_governance/reviews/review_synthesis.md` — the Batch 001 synthesis that drove this batch
- `03_build/implementation_plan.md` — coder's claim of what shipped
- `05_governance/decision_log.md` — the top block dated `2026-04-17 — Batch 002 implementation decisions`

Then inspect these files:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/raumvermietung.html` (new)
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js`
- `legacy_site/site/assets/images/instrumente/cello.jpg`
- `legacy_site/site/assets/images/instrumente/musiktheorie.jpg`
- `legacy_site/material/Unser Team.docx` (for bio verification; use `python-docx` or an equivalent)

## What to verify

### 1. Team biographies fully present in markup

For each of the 7 team cards in `team.html`:

- `<p class="bio-preview">` holds a short preview (1–2 sentences).
- `<details class="bio-more">` contains the remainder of the biography as **multiple** `<p>` blocks reflecting the paragraph structure of the source docx.
- No content is hidden with `display: none` or removed from the DOM when collapsed.
- Open the `<details>` with the keyboard: Tab should land on `<summary>`, Enter/Space should toggle, focus ring must be visible.

Cross-check the text against `legacy_site/material/Unser Team.docx` — every fact present in the docx biography for Raúl, Maria João, Delfim, Nuno, Humam, Paula, and Annegret should be reproduced in the card (preview + details combined). Flag any omission.

Acceptable silent edits (documented in Decision 3): tense alignment for closed periods ("war" rather than "ist"), `Schüler` → `Schüler:innen`, minor source-doc typo fixes ("Schmidt" not "Schimdt"). Flag anything that looks like a factual change or invented content.

### 2. Homepage pinned hero behavior

Inspect `index.html`:

- The top of `<main>` is a single `section.hero-stage` that merges the former hero + "Ein Musikstudio" sections.
- Left column holds the H1/CTA intro block and the "Wer wir sind" overview block, stacked with `margin-top: 4rem` between them.
- Right column is `<aside class="hero-panel hero-stage-panel">` containing the slideshow.
- `index.html` no longer contains `section#raumvermietung`.

Inspect `styles.css`:

- `.hero-stage-panel { position: sticky; top: 100px; align-self: start; }`.
- `@media (max-width: 980px)` unsticks the panel and collapses the grid.
- Old parallax-era rules (`will-change: transform`, `prefers-reduced-motion` transform override) are removed.

Inspect `main.js`:

- The parallax block (MAX_PARALLAX_PX, applyParallax, onScrollOrResize) is gone.
- No residual `style.transform = translate3d(...)` on the hero image.

Open `index.html` in a browser and scroll slowly:

- Desktop ≥980px: the slideshow should stay visually anchored near the top of the viewport while the reader scrolls through the hero intro and the "Ein Musikstudio" section, then release as the section ends.
- Tablet/mobile (≤980px): the slideshow sits inline under the text — no sticky behavior, no layout breakage, no overlap with the sticky site header.
- With `prefers-reduced-motion: reduce`: no animation / transform artifacts (sticky itself is not animated, so this should just work).

### 3. Raumvermietung as a top-level page

- `legacy_site/site/raumvermietung.html` exists, uses the shared header/footer, and its body is three `.price-card` blocks with clearly placeholder copy.
- Every existing page (`index`, `team`, `instrumente`, `gebuehren`, `news`, `kontakt`, `impressum`) has a `Raumvermietung` link in the primary `<nav>`, positioned between `Gebühren` and `News`.
- The `data-nav` + `aria-current` JS logic in `main.js` correctly highlights `Raumvermietung` when the user is on the new page.
- Footer "Schnellzugriff" is the same on every page (including `raumvermietung.html`) — Decision 5 parked this; decide whether to flag for next batch.

### 4. Einstieg & Alter restored

Inspect `instrumente.html`:

- The grid has 6 cards: 5 instruments (Violine, Klavier, Gitarre, Cello, Musiktheorie) + the Einstieg card.
- The Einstieg card uses `<div class="instrument-icon" aria-hidden="true">🌱</div>` instead of an `<img>`.
- In CSS, `.instrument-card .instrument-icon` is sized identically to `.instrument-card img` (280×220, radius 20px, soft gradient background) so the grid stays aligned.
- Card body reads naturally — no `laut Startseite`, no reference to another page.
- The plant emoji is the only glyph inside the icon frame.

### 5. Asset file swap

- `assets/images/instrumente/cello.jpg` now contains the cello photo.
- `assets/images/instrumente/musiktheorie.jpg` now contains the music-theory photo.
- HTML in `instrumente.html` still references `cello.jpg` for the Cello card and `musiktheorie.jpg` for the Musiktheorie card — the file rename is the correction.
- Grep confirms no other file in the repo referred to these two filenames, so no reference updates were needed.

### 6. No regressions

- All nav changes preserve the shared structure; no stray or missing `<li>` on any page.
- `main.js` still wires up the slideshow (prev/next, dots, lightbox, autoplay) without errors — check the console.
- `styles.css` still renders the Gebühren pricing tables correctly (nothing in the pinned-hero CSS should have bled into unrelated selectors).
- The Batch 001 hero-panel nesting fix (explicit closing tags inside the slideshow) is still intact after the structural move.

### 7. Accessibility and responsiveness

- Keyboard-only traversal of the expanded team biographies works.
- `Raumvermietung` page passes basic visual scan (eyebrow + H1, clear placeholder labeling).
- Pinned hero does not cause scroll jank on a mid-range device; the sticky `top: 100px` clears the sticky site header on all viewports.
- Mobile: no horizontal overflow; instrument grid collapses to one column; pricing tables still collapse to one column.

## Output

Produce the structured review with:

1. **Blocking issues**
2. **Should-fix before close**
3. **Nice-to-have / next-batch suggestions**
4. **Questions for the client** — H1 choice is still open; footer Schnellzugriff parity is the likely next open question; anything surfaced from the pinned-hero behavior on real devices.

Record the synthesized verdict in `05_governance/reviews/review_synthesis.md` (append a new block; do not overwrite the Batch 001 synthesis). The human owner makes the final call on whether Batch 002 is accepted.
