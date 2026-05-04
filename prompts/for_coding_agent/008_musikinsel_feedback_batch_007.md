# Musikinsel Leipzig - Coding Prompt - Feedback Batch 007

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML and CSS unless preserving already-shipped JS behavior requires a tiny markup-aligned adjustment.

## Active workspaces
- `02_design`
- `03_build`
- `05_governance`

## Read first

- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `03_build/batch_007_rails.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`

Then inspect before editing:
- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js`

## Context

Batch 007 is a focused editorial/layout refinement pass plus two carried-forward cleanup items from prior reviews.

Important:
- two image-related requests are already implemented and must be preserved, not redone:
  - homepage carousel starts with `assets/images/startseite/klavier.jpg`
  - Raumvermietung page already shows `assets/images/instrumente/Raumvermietung.jpg` directly below the lead paragraph
- Kontakt is out of scope for this batch
- the Sommerkonzert poster asset is already correct and should stay as-is
- the first two Gebuehren pricing tables are correct and should not be reworked
- the Gebühren page still has one important mobile bug: on narrow screens the duration headers and prices no longer read as pairs

## Task

Implement the **remaining** Batch 007 changes exactly within the rails.

## Requirements

### 1. Homepage (`index.html`)

Reorder the opening homepage content so it reads in this sequence:

1. `Wer wir sind`
2. `Ein Musikstudio mit freundlicher Lernatmosphäre`
3. the supplied introduction copy
4. CTA buttons:
   - `Probestunde anfragen`
   - `Lehrkräfte kennenlernen`
5. `Musikunterricht in Leipzig-Plagwitz`
6. `Was uns auszeichnet`
7. the existing six approved bullet points

Use this exact studio-introduction copy:

`Die Musikinsel ist ein Musikstudio im Leipziger Stadtteil Plagwitz. Angeboten werden Violin-, Klavier-, Gitarren-, Cello-, Musiktheorie- und Gehörbildungsunterricht für Kinder, Jugendliche und Erwachsene. Im Mittelpunkt stehen musikalische Grundlagen, ein pädagogisch fundierter Zugang und die Freude am Musizieren. Die Musikinsel legt Wert auf eine vertrauensvolle Atmosphäre und einen individuellen Zugang zum Lernen.`

Important:
- preserve the existing two CTA buttons
- preserve the existing six approved bullet points
- preserve the homepage slideshow
- preserve `assets/images/startseite/klavier.jpg` as the first slide

### 2. Team page (`team.html`)

Fix the carried-forward review issue:

- each visible `bio-preview` must begin with the **first real biography paragraph**
- remove the older short editorial blurbs from the visible preview text
- keep the remaining biography text inside `<details>`
- keep the existing `siehe mehr` interaction and styling intact

This is a cleanup of the current partial implementation, not a redesign.

### 3. Instrumente page (`instrumente.html`)

- Remove the `Musiktheorie` card completely, including image and heading.
- Move `Einstieg & Alter` into that freed card slot.
- Change the `Einstieg & Alter` text to exactly:
  - `Kinder sind ab 4 Jahren für Violine, ab 6 Jahren für Klavier und Gitarre sowie ab 7 Jahren für Cello willkommen.`

Important:
- keep the existing card grid, card sizing, spacing, rounded corners, and overall visual style unchanged
- do not touch the existing image derivative setup for the remaining instrument cards

### 4. Gebühren page (`gebuehren.html`)

- Keep the third pricing value text as:
  - `35€ pro Monat`
- Adjust only its text size/typography so it matches the equivalent value text sizing used in the first two pricing tables.
- Fix the mobile-responsive behavior of the Gebühren tables.

Current problem:
- on small screens, the responsive CSS stacks all `.pricing-head` items first and all `.pricing-cell` items afterwards
- this breaks the pairing between each lesson duration and its price

Required outcome:
- on narrow screens, each duration label must stay visually paired with its corresponding price
- the desktop/tablet look should remain in the same pricing-table family
- do not introduce a totally different design language just for desktop

You may solve this by adjusting the markup, CSS, or both, but the result must be clear and intentional on mobile.

Also fix the carried-forward review cleanup:
- remove the lingering `.price-tile` reference from the retired CSS comment in `styles.css`

Do not change:
- the first two pricing tables
- the third table structure on desktop
- the bottom `Konditionen` block

### 5. Veranstaltungen page (`news.html`)

- Add this paragraph below the hero area:
  - `Wir laden euch herzlich zu unserem Sommerkonzert ein und freuen uns auf euch! Die Schülerinnen und Schüler der Klavier-, Geigen-, Cello- und Gitarrenklassen präsentieren Musikstücke des klassischen Repertoires unterschiedlicher Niveaus. Diese werden sowohl solistisch als auch in Gruppen vorgetragen.`
- Remove the separate `Sommerkonzert` heading above the poster image.

Important:
- keep the poster JPG
- keep the poster link behavior
- keep the no-crop full-poster rendering behavior

### 6. Impressum page (`impressum.html`)

- Remove the opening sentence:
  - `Rechtliche Angaben gemäß § 5 TMG und ergänzende Hinweise zu Haftung, Urheberrecht und Datenschutz.`

### 7. Footer copy across all pages using the shared duplicated footer markup

Replace:
- `Fächer & Einstieg`

with:
- `Instrumente & Einstieg`

Replace:
- `Musikunterricht in Leipzig-Plagwitz für Kinder, Jugendliche und Erwachsene – mit Fokus auf musikalische Grundlagen, persönliches Lernen und Freude am Musizieren.`

with:
- `Musikunterricht in Leipzig-Plagwitz für Kinder, Jugendliche und Erwachsene – mit Fokus auf musikalische Grundlagen, individuellen Unterricht und Freude am Musizieren.`

Apply these footer text changes consistently everywhere that footer markup is duplicated across the static pages.

## Already done - preserve these exactly

Do not redo or undo:
- homepage carousel first-slide ordering with `assets/images/startseite/klavier.jpg`
- the inserted Raumvermietung photo block below the lead paragraph
- Sommerkonzert poster asset generation and poster-card behavior
- Kontakt page topic-list work from Batch 006

## Out of scope

Do not:
- change navigation
- change Kontakt page content
- change favicon or typography system
- change palette/tokens
- replace poster/image assets
- alter JS behavior beyond preserving the already-shipped slideshow order
- redesign the instrument card layout
- redesign the pricing table system

## Governance sync

If you make a non-obvious implementation choice:
- update `05_governance/decision_log.md`

Keep `03_build/implementation_plan.md` honest if the implementation differs materially from the rails.

## Definition of done

- Homepage begins with the new `Wer wir sind` introduction, then the two CTAs, then the `Was uns auszeichnet` section with the six approved points.
- Homepage slideshow still opens with `assets/images/startseite/klavier.jpg`.
- Team previews now begin with the first real biography paragraph.
- `instrumente.html` no longer shows a `Musiktheorie` card, and `Einstieg & Alter` occupies that slot with the revised text.
- Third Gebuehren value still reads `35€ pro Monat` and matches the first two pricing tables' value sizing.
- On mobile, every Gebühren duration label remains paired with its corresponding price.
- No `.price-tile` reference remains anywhere in `styles.css`.
- `news.html` includes the invitation paragraph and no longer shows the extra `Sommerkonzert` heading above the poster.
- `impressum.html` no longer shows the opening legal-summary sentence.
- Footer copy is updated consistently across pages.
- Raumvermietung photo still appears directly below the lead paragraph.
