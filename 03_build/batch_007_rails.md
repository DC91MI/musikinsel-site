# Batch 007 Rails

## Purpose

Keep the next coding pass tightly constrained to the confirmed Batch 007 editorial/layout refinements and the two carried-forward cleanup items from recent review findings.

Read together with:

- `03_build/implementation_plan.md`
- `05_governance/decision_log.md`

## Hard Boundaries

1. Keep the work in plain HTML and CSS. No JS changes are needed.
2. Do not redesign the site visually; preserve the current card system, spacing language, and overall page rhythm.
3. On the homepage, reorder and replace content only within the opening sections; do not broadly rewrite later sections.
4. On `instrumente.html`, keep the existing card size, spacing, rounded corners, and image treatment. Only change which cards/content appear.
5. On `gebuehren.html`, preserve the desktop structure of the first two pricing tables; only normalize the third table's value text size and fix the small-screen responsive behavior so header/price pairs stay together on mobile.
6. On `news.html`, keep the Sommerkonzert poster asset, poster link, and no-crop behavior intact.
7. Footer copy changes must be applied consistently everywhere the shared footer markup is duplicated across pages.
8. Carry-forward review fixes are in scope for this batch:
   - remove the stale `.price-tile` CSS comment reference
   - fix Team previews so they truly begin with the first real biography paragraph
9. The homepage slideshow already starts with `assets/images/startseite/klavier.jpg`; preserve that ordering.
10. The Raumvermietung page already includes the inserted room photo below the lead paragraph; preserve that block in place, but resize/restyle it to be smaller, centered, and uncropped.

## Exact Work

### `index.html`
- Make the first visible content block on the homepage:
  - eyebrow `Wer wir sind`
  - heading `Ein Musikstudio mit freundlicher Lernatmosphäre`
  - paragraph:
    - `Die Musikinsel ist ein Musikstudio im Leipziger Stadtteil Plagwitz. Angeboten werden Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht für Kinder, Jugendliche und Erwachsene. Im Mittelpunkt stehen musikalische Grundlagen, ein pädagogisch fundierter Zugang und die Freude am Musizieren. Die Musikinsel legt Wert auf eine vertrauensvolle Atmosphäre und einen individuellen Zugang zum Lernen.`
- Immediately after that, keep the existing two CTA buttons:
  - `Probestunde anfragen`
  - `Lehrkräfte kennenlernen`
- After the CTA row, surface the existing `Musikunterricht in Leipzig-Plagwitz` / `Was uns auszeichnet` section with its six approved bullet points.

### `instrumente.html`
- Remove the `Musiktheorie` card completely (image + heading).
- Move `Einstieg & Alter` into the freed slot.
- Change the `Einstieg & Alter` text to:
  - `Kinder sind ab 4 Jahren für Violine, ab 6 Jahren für Klavier und Gitarre sowie ab 7 Jahren für Cello willkommen.`

### `gebuehren.html`
- Keep the third pricing value text as `35€ pro Monat`.
- Reduce/normalize its typography so it matches the equivalent value text size used in the first two pricing tables.
- Fix the mobile Gebühren layout so the first two multi-column tables no longer collapse into "all headers, then all prices".
- On narrow screens, each lesson duration must remain visually paired with its corresponding price.
- The desktop/tablet appearance should remain in the current table family.

### `news.html`
- Keep the page hero simple: eyebrow `Veranstaltungen` + H1 `Neuigkeiten und Konzerte`.
- Make the visible event sequence vertical on desktop and mobile:
  - first `Orchester ohne Noten`
  - then a text-only card with `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein! Die Schülerinnen und Schüler der Klavier-, Geigen-, Cello- und Gitarrenklassen präsentieren Musikstücke des klassischen Repertoires unterschiedlicher Niveaus. Diese werden sowohl solistisch als auch in Gruppen vorgetragen.`
  - then the Sommerkonzert poster card
- `Orchester ohne Noten` should use a conservative placeholder treatment:
  - title `Orchester ohne Noten`
  - image shown inside the existing news-card visual system
  - no invented date, venue, or explanatory body copy
- Remove the separate `Sommerkonzert` heading above the poster image.
- Do not let the page fall back to the old two-column desktop layout.

### `impressum.html`
- Remove the opening sentence:
  - `Rechtliche Angaben gemäß § 5 TMG und ergänzende Hinweise zu Haftung, Urheberrecht und Datenschutz.`

### Footer copy on all pages using the shared duplicated footer markup
- Change:
  - `Fächer & Einstieg`
  - to:
  - `Instrumente & Einstieg`
- Change:
  - `Musikunterricht in Leipzig-Plagwitz für Kinder, Jugendliche und Erwachsene – mit Fokus auf musikalische Grundlagen, persönliches Lernen und Freude am Musizieren.`
  - to:
  - `Musikunterricht in Leipzig-Plagwitz für Kinder, Jugendliche und Erwachsene – mit Fokus auf musikalische Grundlagen, individuellen Unterricht und Freude am Musizieren.`

### Carry-forward cleanup
- In `team.html`, replace the old short preview blurbs with the first real biography paragraphs, keeping the remaining biography text in `<details>`.
- In `styles.css`, remove the lingering `.price-tile` name from the retired Batch 004/005 comment marker.
- In `03_build/implementation_plan.md`, remove any claim that the Team preview issue is already verified until the HTML actually matches the brief.

### Already implemented and to be preserved
- Keep `assets/images/startseite/klavier.jpg` as the explicit first slide in the homepage carousel.
- Keep the inserted Raumvermietung photo block directly below the lead paragraph and before `Ausstattung`.
- Resize that photo to roughly 60% of its current rendered width, center it, and avoid cropping the original image. Prefer natural aspect ratio and `object-fit: contain` / intrinsic sizing over cover-cropping.

## Non-Goals

- No nav restructuring
- No Kontakt-page content changes
- No new assets
- No image-processing changes
- No poster replacement
- No typography-system or palette migration
- No changes to the current Sommerkonzert JPG file
- No replacement or renaming of `orchester_ohne_noten.jpg`
- No reordering of the homepage slideshow away from `klavier.jpg` first
- No removal or relocation of the inserted Raumvermietung photo block
- No unnecessary desktop redesign of the Gebühren tables

## Acceptance Gates

The batch is not ready to close unless all of these are true:

- Homepage begins with the new `Wer wir sind` intro block, then the two CTAs, then the `Was uns auszeichnet` section.
- `instrumente.html` no longer has a `Musiktheorie` card, and `Einstieg & Alter` appears in that slot with the revised text.
- Third Gebuehren pricing value still says `35€ pro Monat` and visually matches the first two pricing tables' value sizing.
- On mobile, every Gebühren duration label remains paired with its corresponding price.
- `news.html` shows a vertical sequence: `Orchester ohne Noten`, then the Sommerkonzert invitation text card, then the Sommerkonzert poster.
- `news.html` no longer falls back to a side-by-side desktop news layout.
- `news.html` no longer shows the extra `Sommerkonzert` heading above the poster.
- `news.html` also includes a second visible news item using `assets/images/news/orchester_ohne_noten.jpg`.
- `impressum.html` no longer shows the legal-summary lead sentence.
- Footer copy is updated consistently across all pages.
- Team previews now begin with the first real biography paragraph.
- No `.price-tile` reference remains anywhere in `styles.css`.
- The homepage slideshow still opens with `klavier.jpg`.
- The homepage intro paragraph now says `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht ...`
- The Veranstaltungen intro now begins `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
- The Raumvermietung photo still appears directly below the lead paragraph, but is visibly smaller, centered, and not cropped.
- `03_build/implementation_plan.md` no longer claims the Team cleanup is already verified unless the HTML actually matches.
