# Review Synthesis

## Agreed Issues

- Batch 001 is close, but the team-page biography expansion does not fully satisfy the prompt. The implementation adds expandable biographies, but the `<details>` blocks contain only shortened extra blurbs rather than the full biography text requested in the brief.
- `03_build/implementation_plan.md` overstates the team-page result by claiming the remaining biography text sits in the `<details>` block as the full biography and remains fully present in the markup.

## Open Questions

- Which homepage H1 option should replace the current placeholder heading?
- Is the current `Raumvermietung` placement acceptable, or should it move lower on the homepage in a later batch?
- Should the `Einstieg & Alter` content return later as a dedicated block with proper copy?
- Are the `object-fit: cover` crops on the instrument images, especially cello, visually acceptable on all target devices?

## Actionable Fixes

- Update every remaining team card so the `<details class="bio-more">` block contains the full biography text rather than only one short continuation sentence.
- Adjust `03_build/implementation_plan.md` so it matches what was actually shipped in Batch 001.
- Run a browser QA pass for the parallax effect, the responsive team layout, and the mobile pricing tables before formally closing the batch.

## Deferred Items

- Final homepage H1 choice remains a client decision.
- Final placement and content depth for `Raumvermietung` can be refined in a follow-up batch if needed.
- Instrument image cropping can be revisited later if the client prefers `contain` over `cover`.

## Verdict

Batch 001 is **not blocked**, but it should **not be fully closed yet**. The implementation is largely aligned with the prompt, and the homepage, instrument, fees, news, contact, and impressum edits are in good shape. The remaining issue is the team page: the "siehe mehr" interaction works, but it does not yet expose the full biographies requested by the client. After that correction and a quick browser QA pass, the batch should be ready for acceptance.

---

## Batch 003 Review Synthesis

### Scope Result

Batch 003 is structurally aligned with the rails in code. The nav labels, homepage H1 and bullet list, typography link, favicon references, Kontakt map embed, Raumvermietung simplification, and Gebühren normalization all landed in the expected files.

### Verified In Code

- All reviewed pages link the same Google Fonts URL and the three favicon assets.
- Primary navigation is consistently `Team`, `Instrumente`, `Gebühren`, `Raumvermietung`, `Veranstaltungen`, `Kontakt`, `Impressum`.
- `Start` is removed from the primary nav everywhere reviewed, while the brand still links to `index.html`.
- Homepage H1 is `Was uns auszeichnet`, and the six approved bullet items are present in order.
- Team page H1 is `Studierte Musikpädagog:innen`.
- Kontakt page replaces the old direct-contact content with a Google Maps iframe for `Nonnenstraße 42A, 04229 Leipzig`, including `loading="lazy"` and `referrerpolicy="no-referrer-when-downgrade"`.
- Raumvermietung now contains two text-only `.price-card` blocks plus a standalone `Anfrage senden` CTA to `kontakt.html`.
- Gebühren uses `€ pro Monat` wording, removes the specified labels/sentences, and reduces the third table to one column with `35`.
- `styles.css` contains `.hero-list`, `.plain-list`, and `.contact-map` in the Batch 003 additions block, while the old per-frame parallax CSS remains absent.

### Browser-Only Checks Still Pending

- Live visual confirmation of favicon legibility in the browser tab.
- Desktop verification that the pinned hero-stage still behaves as intended while scrolling.
- Keyboard and visual verification of active-nav highlighting on each page.
- Mobile confirmation at roughly 375px width for the map embed and pricing-table collapse.

### Deferred / Follow-Up Topics

- The typespec's warm-brown palette was intentionally deferred; Batch 003 only applied the font-role split.
- Footer "Schnellzugriff" still does not mirror the newer top-level pages and can be revisited later if parity matters.
- The stylesheet still carries duplicated slideshow/lightbox blocks from earlier batches; not a Batch 003 blocker, but worth a cleanup pass.

### Verdict

Batch 003 is **not blocked in code review** and appears ready for acceptance **pending browser QA of the remaining visual/interaction checks**. No rail-breaking implementation miss was found in the inspected files.

---

## Batch 004 Review Synthesis

### Scope Result

Batch 004 stayed tightly bounded in the inspected implementation. The third pricing block on `legacy_site/site/gebuehren.html` now uses a dedicated compact `.price-tile` instead of the old single-column faux-table treatment, and the new CSS lives in a dedicated Batch 004 block at the end of `legacy_site/site/assets/css/styles.css`.

### Verified In Code

- Third pricing block heading remains `Klavier, Cello und Gitarre - Gruppenunterricht`.
- The refined markup uses:
  - `.price-tile`
  - `.price-tile-label`
  - `.price-tile-amount`
  - `.price-tile-value`
  - `.price-tile-currency`
- The numeric amount is still `35`, with `€` added as a sibling span.
- `.price-tile` is centered and width-clamped with `width: min(100%, 320px)` and `margin: 1.25rem auto 0`.
- The label stays in `Inter`; the value/currency stay in `Cormorant Garamond`, preserving the Batch 003 typography role split.
- Mobile-specific size adjustments exist under `@media (max-width: 640px)`.
- No JS was introduced for this batch.

### Remaining Browser Check

The code strongly suggests the visual issue is resolved, but a live browser pass is still needed to confirm:

- the tile feels balanced at desktop width
- the `35 €` reads naturally as one unit
- the tile does not crowd the heading
- the component does not clip or overflow at narrow widths

### Verdict

Batch 004 is **not blocked in code review**. The implementation is clean, bounded, and aligned with the rails, pending a final browser look by the human owner.

---

## Batch 005 Review Synthesis

### Scope Result

Batch 005 is largely aligned with the rails. The third Gebühren block is back in the shared `.pricing-table` family, and the Instrumente page now points at dedicated `-card.jpg` derivatives with explicit intrinsic dimensions and lazy/async image hints. No JS was introduced.

### Verified In Code

- `gebuehren.html` now uses:
  - `pricing-table pricing-table-single`
  - `50 Minuten Gruppenunterricht`
  - `35€`
- `.pricing-table-single` is now a true one-column variant:
  - `grid-template-columns: 1fr`
  - `width: min(100%, 360px)`
  - centered with auto margins
  - explicit bottom border retained
- single-column cell typography was increased for emphasis
- `instrumente.html` now references:
  - `geige-card.jpg`
  - `klavier-card.jpg`
  - `gitarre-card.jpg`
  - `cello-card.jpg`
  - `musiktheorie-card.jpg`
- each instrument image now has `width="560" height="440" loading="lazy" decoding="async"`
- all five `-card.jpg` derivatives exist on disk and are 560×440
- original instrument images are still present on disk

### One Strict-Rail Mismatch

- The retired `.price-tile` name still appears in a CSS comment marker in `legacy_site/site/assets/css/styles.css`. The Batch 005 review brief asked for no `.price-tile*` references anywhere in HTML or CSS, so this is a tiny cleanup miss even though the component itself is gone.

### Browser-Only Checks Still Pending

- Desktop visual confirmation that the third Gebühren block now feels like the same family as the first two tables
- Mobile confirmation at roughly 375px width for the one-column table
- Visual confirmation that the new instrument derivatives are noticeably sharper while preserving the same card composition
- Network confirmation in DevTools that the page requests the `-card.jpg` derivatives rather than the original multi-megabyte files

### Verdict

Batch 005 is **not blocked in code review**, but there is **one small should-fix cleanup** if you want to satisfy the review brief literally: remove the lingering `.price-tile` mention from the CSS comment marker. Otherwise the implementation is clean, bounded, and on-rail, pending final browser QA by the human owner.

## Batch 006 Review Synthesis (2026-05-03)

### Scope Result

Batch 006 is mostly aligned with the rails. The homepage cleanup, Raumvermietung rewrite, Gebühren restructuring, Veranstaltungen poster card, Kontakt form-topic update, and the new poster asset all landed in code as requested.

### Verified In Code

- `index.html`
  - muted Violine / Klavier & Cello / Theorie box removed
  - Stimmen intro paragraph removed
  - first testimonial now reads `Die Kompetenz der Musikpädagog:innen ist beeindruckend.`
- `raumvermietung.html`
  - lead paragraph replaced with the requested Yamaha C2 copy
  - three cards now exist in this order: `Ausstattung`, `Konditionen`, `Zeiten`
  - `Anfrage senden` still links to `kontakt.html`
- `gebuehren.html`
  - lead sentence under the H1 removed
  - third pricing cell now reads `35€ pro Monat`
  - previous three bottom feature cards replaced by one `Konditionen` card with the requested four bullet points
- `news.html`
  - eyebrow now reads `Veranstaltungen`
  - previous visible `Tag der offenen Tür` card removed
  - new poster card uses `news-card news-card-poster`
  - poster image links to `assets/images/news/sommerkonzert-2026.jpg` in a new tab
- poster asset
  - `legacy_site/site/assets/images/news/sommerkonzert-2026.jpg` exists on disk
  - dimensions are `1200x1697`
  - file size is `199410` bytes
  - original `Kopie von sommerkonzert.pdf` is still present on disk
- `kontakt.html`
  - lead sentence under the H1 removed
  - `Thema` options are now: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung`
- out of scope
  - `instrumente.html` remains on the Batch 005 image-derivative setup (`*-card.jpg` plus `Einstieg & Alter`)

### Should-Fix Mismatch

- `team.html` does not fully match the editorial restructuring rail. The short preview blurbs were supposed to be removed and replaced by the first paragraph of the full biography, with the `<details>` block starting at the second paragraph. In the shipped markup, the old short intro sentence is still present and the first full paragraph has been appended after it for the preview text.

### Browser-Only Checks Still Pending

- poster rendering at full aspect ratio on desktop and mobile
- confirmation that the poster card scales cleanly without top/bottom crop
- live confirmation that the `siehe mehr` toggles still behave correctly for every team card

### Verdict

Batch 006 is **not blocked overall**, but it does carry **one meaningful should-fix mismatch** on the Team page: the previews still preserve the old short blurbs instead of truly beginning with the first paragraph from the full biography text. The rest of the inspected scope is on-rail in code, pending final browser QA by the human owner.

## Batch 007 Review Synthesis (2026-05-04)

### Scope Result

Batch 007 mostly landed cleanly. The homepage hero reorder is in place, `klavier.jpg` is still the first slideshow image, Instrumente is trimmed to five cards, the Gebühren mobile-pairing fix is present in CSS, the Veranstaltungen invitation paragraph and poster cleanup landed, the Impressum lead sentence is gone, the footer copy is updated site-wide, and the Raumvermietung photo block remains in place.

### Verified In Code

- `index.html`
  - `.hero-intro` now carries `Wer wir sind`, the homepage H1, the merged intro paragraph, and the two CTAs
  - `.hero-overview` now carries `Musikunterricht in Leipzig-Plagwitz`, `Was uns auszeichnet` as H2, and the six approved bullets
  - initial slide source is `assets/images/startseite/klavier.jpg`
- `main.js`
  - `heroSlides[0]` is still `assets/images/startseite/klavier.jpg`
- `instrumente.html`
  - five cards remain: Violine, Klavier, Gitarre, Cello, Einstieg & Alter
  - no Musiktheorie card remains
  - Einstieg & Alter copy matches the revised wording
- `gebuehren.html` / `styles.css`
  - third value remains `35€ pro Monat`
  - mobile `order` rules now interleave heads and cells so duration labels and prices stay paired on narrow screens
  - no `.price-tile` reference remains in CSS
- `news.html`
  - hero includes the invitation paragraph as `.lead`
  - poster card no longer contains an inner `<h3>Sommerkonzert</h3>`
- `impressum.html`
  - opening legal-summary lead sentence removed
- site-wide footer
  - tagline now uses `individuellen Unterricht`
  - `Fächer & Einstieg` is gone; `Instrumente & Einstieg` is present
- `kontakt.html`
  - topic list remains `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung`
- `raumvermietung.html`
  - inserted photo block still sits directly below the lead paragraph

### Should-Fix Mismatches

- `team.html` still does not satisfy the carried-forward review cleanup. The visible `bio-preview` text still starts with the older short intro blurbs (for example `Geboren in Cieza ...`, `Maria João Laureano Maia wurde 1992 ...`, `Delfim Silva Carvalho wurde 1991 ...`) instead of beginning directly with the first real biography paragraph.
- `03_build/implementation_plan.md` now overstates the Batch 007 result by marking the Team preview issue as already fixed/verified, even though the shipped HTML still retains the old short blurbs.

### Browser-Only Checks Still Pending

- sticky hero panel behavior on desktop scroll
- no-crop poster rendering at real browser sizes
- real-device/mobile confirmation that the Gebühren tables read clearly after the CSS `order` fix

### Verdict

Batch 007 is **not blocked overall**, but it still carries **one meaningful unresolved content mismatch** on the Team page, and the implementation plan currently claims that mismatch is closed when it is not. The rest of the inspected scope is aligned in code, pending final browser QA by the human owner.

## Batch 007 Closeout Review Synthesis (2026-05-04)

### Scope Result

The Batch 007 closeout pass is aligned in code. The previously open Team-preview finding is resolved, the implementation plan now matches the live HTML, the homepage intro sentence is updated, the Veranstaltungen lead opener is updated, the new `Orchester ohne Noten` card is present, and the Raumvermietung photo is now smaller, centered, and uncropped while staying in the same DOM position.

### Verified In Code

- `team.html`
  - all seven `bio-preview` blocks now begin with the first real biography paragraph
  - the older short blurbs no longer open the visible preview text
  - existing `<details>` content remains in place
- `03_build/implementation_plan.md`
  - Current Status now matches the live HTML
  - Milestone 6 and Milestone 8 both describe the Team trim as completed
- `index.html`
  - homepage intro paragraph now says `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht ...`
- `news.html`
  - lead paragraph now begins `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
  - a second visible `news-card news-card-poster` is present with `<h3>Orchester ohne Noten</h3>`
  - the new card uses `assets/images/news/orchester_ohne_noten.jpg`
  - no invented date, venue, or body paragraph was added
- `styles.css`
  - `.room-photo` now uses `width: min(100%, 480px)`, auto margins, `aspect-ratio: auto`, `object-fit: contain`, and no `max-height` cap
  - no `.price-tile` reference remains
- `main.js`
  - `klavier.jpg` is still the first slide

### Remaining Verification Gap

- Browser-only confirmation is still worth doing for:
  - sticky hero behavior on desktop
  - real phone rendering of the Gebühren mobile pairing fix
  - visual confirmation that the resized Raumvermietung image feels right at desktop and mobile widths

### Verdict

Batch 007 closeout is **clean in code review**. I found **no remaining code-level acceptance misses** in the inspected scope. Final acceptance now mostly depends on human browser QA and visual sign-off.
