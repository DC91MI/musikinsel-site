# Batch 006 Rails

## Purpose

Keep the next coding pass tightly constrained to the remaining confirmed content changes from the latest client note.

Read together with:

- `03_build/implementation_plan.md`
- `05_governance/decision_log.md`

## Hard Boundaries

1. Do not rework already-solved items just because they appear in older notes.
2. Keep the current overall layouts intact unless this batch explicitly asks to remove or replace a specific content block.
3. On the Team page, preserve the existing `<details>` / `siehe mehr` interaction and only change which biography text is visible by default.
4. On the Instrumente page, do not touch the already-correct image swap.
5. On the Gebühren page, only the lead sentence, the third value text, and the bottom conditions area are in scope.
6. Keep the work in plain HTML and CSS. No JS changes are needed.

## Exact Work

### `index.html`
- Remove the entire muted information box below the studio overview text.
- Remove the summary sentence beside the `Stimmen` heading.
- Change `Die Kompetenz der Musik-Pädagogen ist beeindruckend.` to `Die Kompetenz der Musikpädagog:innen ist beeindruckend.`

### `team.html`
- Remove the lead sentence under the H1.
- For each teacher card:
  - replace the short preview sentence with the first paragraph currently living in the expanded/full biography
  - remove that first paragraph from the expanded section so `siehe mehr` reveals only the remaining paragraphs

### `raumvermietung.html`
- Replace the lead paragraph with:
  - `Wir bieten einen schönen und gemütlichen Raum mit einem Yamaha Flügel C2 zum Üben an. Bevorzugt werden Pianisten die langfristig den Raum nutzen möchten. Es darf im Raum kein Unterricht stattfinden.`
- Add `Ausstattung` title to the first box.
- Add `Konditionen` title to the second box.
- Add a third box titled `Zeiten` with:
  - `Montag – Freitag 8.00 - 14.00 Uhr / 19.00 - 22.00 Uhr`
  - `Samstag und Sonntag 9.00 - 22.00 Uhr`

### `gebuehren.html`
- Remove the lead sentence under the H1.
- Change `35€` to `35€ pro Monat`.
- Remove the three bottom condition cards.
- Replace them with one consolidated `Konditionen` block containing the four confirmed points.

### `news.html`
- Change the green eyebrow text from `Neuigkeiten` to `Veranstaltungen`.

### `kontakt.html`
- Remove the lead sentence under the H1.
- Update the `Thema` options to exactly:
  - `Allgemein`
  - `Violine`
  - `Klavier`
  - `Gitarre`
  - `Cello`
  - `Gruppenunterricht`
  - `Raumvermietung`

## Non-Goals

- No instrument-image changes
- No pricing-table redesign
- No typography or palette changes
- No nav restructuring
- No backend or form behavior changes

## Acceptance Gates

The batch is not ready to close unless all of these are true:

- Homepage muted info box is gone.
- Homepage testimonial summary sentence is gone and the first testimonial wording is updated.
- Team previews now use the first full paragraph for every teacher.
- Raumvermietung has the new lead plus three titled info boxes.
- Gebühren lead is gone, third value reads `35€ pro Monat`, and the bottom area is one `Konditionen` block with four points.
- Veranstaltungen eyebrow is corrected.
- Kontakt lead is gone and the `Thema` list matches the confirmed option set including `Klavier`.
