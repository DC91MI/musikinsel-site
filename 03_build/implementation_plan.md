# Implementation Plan

## Goal

Prepare Batch 009 for the Musikinsel Leipzig static site in `legacy_site/site/` as a narrowly scoped switch from Netlify Forms storage to Formspree email-alert handling.

Batch 008 proved form submission could reach Netlify Forms, but the user found that Netlify email notifications require a paid plan in their setup. The selected free provider is Formspree, using endpoint `https://formspree.io/f/mdavygdk`.

This batch should stay inside the existing static-site system:

- no backend
- no Netlify Functions
- only a tiny JavaScript submit enhancement to preserve the existing `/danke/` success page on Formspree's free plan
- no additional form provider beyond the selected Formspree endpoint
- no unrelated content, navigation, or design changes

## Current Status

- Batch 008 is closed as a useful intermediate Netlify Forms setup, but Netlify paid notifications are not the chosen path.
- Batch 009 code work is implemented; production verification is still pending the next deploy.
- `legacy_site/site/kontakt.html` now posts to `https://formspree.io/f/mdavygdk` and uses Formspree's `_gotcha` honeypot field.
- `legacy_site/site/assets/js/main.js` includes a small `data-formspree-form` submit handler that POSTs to Formspree with `Accept: application/json`, redirects to `/danke/` on success, and shows a German fallback error with the direct email address on failure.
- `legacy_site/site/danke/index.html` remains the success page.
- `legacy_site/site/raumvermietung.html` remains unchanged and continues routing through the same Kontakt form.
- `06_deploy/nontechnical_formspree_check_guide.md` is the current operator check guide.

## Batch 009 Milestones

### Milestone 1 - Formspree endpoint markup - DONE
- Kontakt form action changed to `https://formspree.io/f/mdavygdk`.
- Netlify-only hidden fields and attributes removed.
- Formspree `_gotcha` honeypot added.

### Milestone 2 - Success page preservation - DONE
- A tiny JS submit handler preserves the existing `/danke/` success UX after a successful Formspree response.
- The plain HTML `action` remains a fallback if JavaScript fails.

### Milestone 3 - Operator documentation - DONE
- Formspree check guide added at `06_deploy/nontechnical_formspree_check_guide.md`.
- Publish process points to the Formspree check guide.
- Netlify setup doc now states it is historical for the earlier Batch 008 path.

### Milestone 4 - Production verification - PENDING DEPLOY
- Final acceptance requires a live submission after deploy:
  - redirect to `/danke/`
  - submission appears in Formspree
  - email alert arrives at `musikinsel-leipzig@gmx.de`
  - Raumvermietung inquiry path works

---

## Previous Goal - Batch 008

Prepare Batch 008 for the Musikinsel Leipzig static site in `legacy_site/site/` as a narrowly scoped form-handling fix for Netlify deployment.

## Batch 008 Milestones

### Milestone 1 - Netlify form markup - DONE
- `kontakt.html` form now declares `method="POST"`, `action="/danke/"`, `data-netlify="true"`, and `netlify-honeypot="bot-field"`.
- Hidden `<input type="hidden" name="form-name" value="kontakt">` precedes the visible fields so the JavaScript-free POST body still identifies the form for Netlify.
- Honeypot field lives inside `<p class="form-hidden">` with `tabindex="-1"` and `autocomplete="off"` to keep it out of the keyboard/autofill flow for real users.
- Name, email, and message fields are marked `required`; the existing seven `Thema` options are preserved verbatim, including `Raumvermietung`.

### Milestone 2 - Success page - DONE
- `legacy_site/site/danke/index.html` exists, matches the site head/header/footer pattern, and uses `../`-relative asset paths so it renders both locally and at `/danke/` on Netlify.
- Page hero confirms successful submission (`Vielen Dank für Ihre Nachricht`, lead paragraph promising a reply).
- Body card includes the `musikinsel-leipzig@gmx.de` direct contact and two CTAs: `Zur Startseite` and `Zurück zum Kontakt`.
- `<meta name="robots" content="noindex">` keeps the confirmation route out of search indexes.

### Milestone 3 - Honeypot styling - DONE
- Added a `BATCH 008` block at the end of `styles.css` with a single `.form-hidden` utility (`position: absolute; clip: rect(0 0 0 0); height/width: 1px; margin: -1px;`).
- No `display: none` so screen-reader and assistive-tech users still see the field exists; visual layout is unaffected because the wrapper occupies a 1×1 absolute box.

### Milestone 4 - Raumvermietung flow preservation - DONE
- `raumvermietung.html` was inspected and intentionally left untouched.
- Its existing `<a class="btn btn-primary" href="kontakt.html">Anfrage senden</a>` still routes Raumvermietung inquiries into the shared Kontakt form, where the `Raumvermietung` `Thema` option distinguishes them.

### Milestone 5 - Deployment handoff - DONE
- `06_deploy/netlify_forms_setup.md` already describes the markup that landed and the Netlify dashboard checks to perform after deploy: form detection, recipient `musikinsel-leipzig@gmx.de`, honeypot verification, production submission, redirect to `/danke/`, and the spam-folder fallback path.
- No further edits were required on the operator checklist.

### Milestone 6 - Review and production verification - PENDING DEPLOY
- Code review can verify the HTML/CSS landed and `/danke/` is wired up.
- Final acceptance still requires the human owner to deploy and run the Netlify-side checklist (form detected in dashboard, notification email configured, real submission redirects to `/danke/` and lands in the Forms inbox).

---

## Previous Goal - Batch 007

Prepare Batch 007 for the Musikinsel Leipzig static site in `legacy_site/site/` as a focused editorial-and-layout refinement pass across:

- homepage content order and copy
- Instrumente card set reduction and `Einstieg & Alter` repositioning
- Gebuehren third-table typography normalization
- Veranstaltungen poster-card copy cleanup
- Impressum lead cleanup
- sitewide footer copy updates
- carry-forward cleanup from prior review findings on Team and CSS comment hygiene

This batch should stay inside the existing static-site system:

- no new JS
- no broad visual redesign
- no typography or palette rework
- no page hierarchy changes

## Current Status

- Batch 007 is closed.
- Homepage hero columns reordered as in the previous status note. The intro paragraph now reads `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht für Kinder, Jugendliche und Erwachsene.` (no `Musiktheorie- und Gehörbildungsunterricht…` clause).
- Team previews now begin directly with the first real biography paragraph for all seven cards. The older short editorial blurb that previously opened each preview (e.g. `Geboren in Cieza ...`, `Maria João Laureano Maia wurde 1992 ...`, `Delfim Silva Carvalho wurde 1991 ...`, `Geboren 1988 in Porto ...`, `Humam Nabuti ist ein Gitarrist aus Damaskus ...`, `Paula Schieferecke wurde 1990 ...`, `Annegret Neumann erhielt ihren ersten Klavierunterricht ...`) has been removed from the visible preview text. The full bio remains in the DOM via the existing `<details>` interaction.
- Instrumente page unchanged from earlier in this batch: Violine / Klavier / Gitarre / Cello / Einstieg & Alter.
- Gebühren third value typography and mobile pair-keeping unchanged from earlier in this batch.
- `.price-tile` CSS marker removal unchanged.
- Veranstaltungen is now arranged as a vertical editorial sequence inside `.news-grid.news-grid-stack`: first the `Orchester ohne Noten` poster card, then a text-only `news-card-copy` with `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!` plus the unchanged invitation sentence, then the Sommerkonzert poster card. The page hero retains the eyebrow + H1 only, so the two visible items are easier to distinguish from one another on desktop and mobile.
- The `Orchester ohne Noten` card remains intentionally minimal: conservative `<h3>` title, click-to-zoom image, no invented date, venue, or body copy.
- Impressum opening sentence removal unchanged.
- Site-wide footer copy refresh unchanged.
- Raumvermietung photo block stays in the same location, but the `.room-photo` CSS now constrains it to `min(100%, 480px)`, centers it via auto margins, uses `object-fit: contain` with `aspect-ratio: auto`, and removes the prior `max-height: 620px` cap — so the image renders smaller, centered, and uncropped.

## Batch 007 Milestones

### Milestone 1 - Homepage content reorder — DONE
- `.hero-intro` now opens the page with `Wer wir sind` / `Ein Musikstudio mit freundlicher Lernatmosphäre` (H1) / the supplied intro paragraph / two CTAs.
- `.hero-overview` now follows with `Musikunterricht in Leipzig-Plagwitz` / `Was uns auszeichnet` (H2) / six bullets.

### Milestone 2 - Instrumente simplification — DONE
- Musiktheorie card removed. Five cards remain: Violine, Klavier, Gitarre, Cello, Einstieg & Alter (in that order).
- Einstieg & Alter copy: `Kinder sind ab 4 Jahren für Violine, ab 6 Jahren für Klavier und Gitarre sowie ab 7 Jahren für Cello willkommen.`
- Instrument-card sizing/radius/spacing unchanged.

### Milestone 3 - Gebuehren value-size normalization — DONE
- `.pricing-table-single .pricing-cell` typography override removed; the third value now matches the first two tables.
- Mobile pair-keeping: CSS `order: 1..6` rules in `@media (max-width: 760px)` interleave heads and cells in the flat 6-children grid so each duration label sits directly above its corresponding price.
- Desktop/tablet presentation unchanged. `.pricing-table-single` (2-children variant) untouched by the new order rules.

### Milestone 4 - Veranstaltungen poster-card cleanup — DONE
- The page hero now carries only the eyebrow `Veranstaltungen` and the H1 `Neuigkeiten und Konzerte`.
- The visible Veranstaltungen sequence is now vertical and editorially separated:
  - `Orchester ohne Noten` poster card
  - text-only card with `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!` plus the remaining invitation sentence
  - Sommerkonzert poster card
- The former hero-level invitation paragraph and the extra poster heading were removed; click-to-zoom anchors and no-crop poster rendering are preserved.

### Milestone 5 - Impressum and footer copy cleanup — DONE
- Impressum opening `<p class="lead">` deleted.
- Footer sweep across all 8 pages: `Fächer & Einstieg` → `Instrumente & Einstieg`; tagline summary updated to the new wording.

### Milestone 6 - Carry-forward cleanup from review findings — DONE
- `.price-tile` comment marker deleted from `styles.css`.
- Team previews trimmed: the leading short editorial blurb (the first sentence of each prior preview) was stripped from all seven cards. Each preview now begins directly with the first real biography paragraph; the full bio (the dropped sentence is no longer present anywhere) remains expressed by the post-strip preview plus the existing `<details>` paragraphs.

### Milestone 7 - Preserve direct image additions already applied — VERIFIED
- `klavier.jpg` is still the first slide source in `index.html` and the leading entry in the `heroSlides` array in `main.js`.
- Raumvermietung page still shows `Raumvermietung.jpg` directly below the lead paragraph.

### Milestone 8 - Closeout adjustments for acceptance — DONE
- Team previews actually trimmed (see Milestone 6 above).
- This plan is now consistent with the live HTML: it no longer claims a verified state ahead of code.
- Homepage intro paragraph changed from `Violin-, Klavier-, Gitarren-, Cello-, Musiktheorie- und Gehörbildungsunterricht für Kinder, Jugendliche und Erwachsene.` to `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht für Kinder, Jugendliche und Erwachsene.`
- Veranstaltungen invitation copy is no longer attached to the page hero. It now sits in its own text-only card between the two visible event items, beginning `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
- `Orchester ohne Noten` is now the first visible event item, followed by the Sommerkonzert invitation text card, followed by the Sommerkonzert poster card.
- `news-grid.news-grid-stack` forces a single-column vertical sequence on desktop and mobile so the two items remain visually distinct.
- `.room-photo` CSS rewritten so the Raumvermietung image is clamped to `width: min(100%, 480px)`, centered via auto margins, and renders uncropped via `object-fit: contain` + `aspect-ratio: auto`. The Batch 007 `max-height: 620px` cap and the `cover` crop were removed.

## File Ownership / Areas

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/assets/css/styles.css`
- `03_build/implementation_plan.md`
- `03_build/batch_007_rails.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`

## Confirmed Client Directions For This Pass

1. `Klavier` stays in the Kontakt `Thema` dropdown; Kontakt is otherwise out of scope for this batch.
2. `Ausstattung` must remain correctly spelled.
3. Already-solved items should not be reopened just because they appear in older notes.
4. `Instrumente` should no longer surface a `Musiktheorie` card in this pass.
5. The new homepage first-slide image and the inserted Raumvermietung photo are already implemented and should not be reworked.
6. The Raumvermietung photo should stay in the same location, but may be resized and restyled to be smaller, centered, and uncropped.

## Scope Discipline

- Keep the work in plain HTML and CSS.
- Do not redesign the instrument-card layout; only change which cards/content are present.
- Do not rework the first two Gebuehren tables.
- Do not rework the first two Gebuehren tables on desktop; only fix their mobile responsive behavior and the third-table value sizing.
- Do not change the Sommerkonzert poster asset itself unless blocked by a real rendering issue.
- Do not change the newly added homepage carousel ordering unless required to preserve `klavier.jpg` as the first slide.
- Do not remove or relocate the inserted Raumvermietung photo block; only resize/restyle it.
- Keep navigation, favicon, typography system, and JS behavior untouched.

## Expected Outcome

Batch 007 should leave the site more aligned with the client’s preferred editorial flow:

- a warmer and clearer introduction on the homepage
- a simpler Instrumente page with stronger onboarding information
- tighter visual consistency on the Gebuehren page
- Gebühren tables that remain readable and correctly paired on mobile
- a cleaner Veranstaltungen poster section
- the new Orchester-ohne-Noten image surfaced as an additional news item
- cleaner legal/footer copy
- closure on the remaining Team/plan review findings plus the final copy/image polish requested by the client

---

## Previous Batch Notes

### Batch 006

Prepare Batch 006 for the Musikinsel Leipzig static site in `legacy_site/site/` as a focused content-and-structure refinement pass across:

- homepage cleanup
- team-page biography preview restructuring
- Raumvermietung content expansion
- Gebühren lead/conditions cleanup
- Veranstaltungen eyebrow rename
- Kontakt lead/select updates

This batch should exclude the items already implemented in the current site state, especially:

- the Cello / Musiktheorie image swap on `instrumente.html`
- the established instrument-card layout
- prior typography/nav/favicon work

## Current Status

- Batch 006 is implemented.
- Homepage muted info box and the testimonial summary sentence are removed; the first testimonial now reads `Die Kompetenz der Musikpädagog:innen ist beeindruckend.`
- Team page lead removed. Each of the seven team-card previews now contains the merged first paragraph of the biography; `<details>` retains only the remaining paragraphs. Editorial status hooks (`Ab März 2025 in Elternzeit.`, `Seit 2022 Teil des Teams.`, `Seit 2020 an der Musikinsel.`) were dropped to match the brief.
- Raumvermietung lead replaced; three titled `.price-card` blocks (`Ausstattung`, `Konditionen`, `Zeiten`) now hold the requested bullet copy; `Anfrage senden` CTA preserved.
- Gebühren lead removed; third pricing value now reads `35€ pro Monat`; the three bottom condition cards consolidated into one `.price-card` titled `Konditionen` with four bullets.
- Veranstaltungen page eyebrow renamed `Veranstaltungen`.
- Kontakt lead removed; `Thema` select is now `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung`.
- News card content swapped: rendered `Kopie von sommerkonzert.pdf` to a 1200×1697 JPG (full poster) and replaced the previous `Tag der offenen Tür` card with a click-to-zoom poster card.

## Batch 006 Milestones

### Milestone 1 - Homepage cleanup — DONE
- Removed the muted information box (Violine / Klavier & Cello / Theorie & Gehörbildung anchor cards).
- Removed the sentence "Eltern und Schüler:innen heben die Qualität der Lehrkräfte, eine persönliche Atmosphäre und regelmäßige Auftrittsmöglichkeiten hervor."
- Updated first testimonial copy to "Die Kompetenz der Musikpädagog:innen ist beeindruckend."

### Milestone 2 - Team page preview restructuring — DONE
- Lead sentence under the H1 removed.
- For each of the seven team cards: merged the prior preview's factual prefix with the first `<details>` paragraph into a new `bio-preview`. The first `<details>` paragraph was then removed, so `siehe mehr` reveals only the remaining paragraphs.
- Editorial status hooks dropped (Decision 1 in the decision log).

### Milestone 3 - Raumvermietung content update — DONE
- Lead paragraph replaced verbatim.
- First card now titled `Ausstattung`; second card titled `Konditionen`; new third card titled `Zeiten` with the two opening-hours bullets.
- `Anfrage senden` CTA preserved.

### Milestone 4 - Gebühren page cleanup — DONE
- Lead sentence under the H1 removed.
- Third pricing cell value changed from `35€` to `35€ pro Monat`.
- The three bottom `.feature-card` entries (Vertrag, Unterrichtsfrequenz, Abrechnung) consolidated into a single `<article class="price-card">` titled `Konditionen` with the four supplied bullet strings rendered through `<ul class="plain-list">`.

### Milestone 5 - Veranstaltungen and Kontakt cleanup — DONE
- `news.html` eyebrow changed from `Neuigkeiten` to `Veranstaltungen`.
- `kontakt.html` lead sentence removed.
- `Thema` select now exactly: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung`.

### Milestone 6 - News page poster swap — DONE
- Rendered `legacy_site/site/assets/images/news/Kopie von sommerkonzert.pdf` page 1 via PyMuPDF at 2× zoom, downscaled with Pillow to 1200×1697 JPEG (q=86, progressive, optimized) → `assets/images/news/sommerkonzert-2026.jpg` (~200 KB).
- Replaced the only visible news card on `news.html` with a `.news-card.news-card-poster` containing an `<h3>Sommerkonzert</h3>` and a click-to-zoom poster image inside an anchor.
- Added a `BATCH 006` CSS block at the end of `styles.css` overriding `.news-card img`'s aspect-ratio crop for the poster variant so the whole flyer is visible.

## File Ownership / Areas

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/assets/css/styles.css`
- `03_build/implementation_plan.md`
- `03_build/batch_006_rails.md`
- `05_governance/decision_log.md`
- `prompts/for_coding_agent/007_musikinsel_feedback_batch_006.md`

## Confirmed Client Directions For This Pass

1. `Klavier` must remain in the Kontakt `Thema` dropdown.
2. The box title on Raumvermietung should use the correct spelling `Ausstattung`.
3. Already implemented items should not be redundantly revisited, especially the Cello / Musiktheorie image swap.

## Scope Discipline

- Keep the work in plain HTML and CSS.
- Do not revisit implemented instrument-image or pricing-table-family work unless this batch explicitly requires text changes inside the third Gebühren block.
- Do not redesign page layouts broadly; this batch is mostly content and component-structure cleanup.
- Keep the `siehe mehr` interaction pattern on Team; only change what appears before vs after expansion.

## Expected Outcome

Batch 006 should leave the site cleaner and more editorially direct:

- less redundant summary copy on the homepage
- stronger long-form previews on the team page
- more useful Raumvermietung information
- a clearer single `Konditionen` block on Gebühren
- corrected section labels and contact topics
