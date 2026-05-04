# Musikinsel Leipzig - Coding Prompt - Feedback Batch 006

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML and CSS only.

## Active workspaces
- `02_design`
- `03_build`
- `05_governance`

## Read first

- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `03_build/batch_006_rails.md`
- `05_governance/decision_log.md`

Then inspect before editing:
- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/assets/css/styles.css`

## Context

This batch is a content-and-structure cleanup pass based on the latest client note.

Important:
- some items from that note are already implemented and must not be reworked unnecessarily
- `Klavier` must remain in the Kontakt topic list
- the Raumvermietung box title should use the correct spelling `Ausstattung`
- the already-correct Cello / Musiktheorie image swap on `instrumente.html` is out of scope

## Task

Implement Batch 006 exactly within the rails.

## Requirements

### 1. Homepage (`index.html`)

- Remove the entire muted information box that currently contains:
  - `Violine ...`
  - `Klavier & Cello ...`
  - `Theorie & Gehörbildung ...`
- Remove the sentence:
  - `Eltern und Schüler:innen heben die Qualität der Lehrkräfte, eine persönliche Atmosphäre und regelmäßige Auftrittsmöglichkeiten hervor.`
- Change:
  - `Die Kompetenz der Musik-Pädagogen ist beeindruckend.`
- to:
  - `Die Kompetenz der Musikpädagog:innen ist beeindruckend.`

Keep the rest of the homepage structure intact.

### 2. Team page (`team.html`)

- Remove the sentence under the H1:
  - `Die Lehrkräfte der Musikinsel stellen sich hier mit ihren Schwerpunkten und ihrem künstlerischen Werdegang vor.`
- For every teacher card:
  - remove the current short preview sentence above `siehe mehr`
  - replace it with the first paragraph of the full biography text
  - remove that same first paragraph from inside the expanded section

The desired behavior is:
- first paragraph visible immediately
- `siehe mehr` reveals only the remaining paragraphs

Keep the existing `<details>` interaction and styling.

### 3. Raumvermietung page (`raumvermietung.html`)

- Replace the lead paragraph with exactly:
  - `Wir bieten einen schönen und gemütlichen Raum mit einem Yamaha Flügel C2 zum Üben an. Bevorzugt werden Pianisten die langfristig den Raum nutzen möchten. Es darf im Raum kein Unterricht stattfinden.`
- Add the title `Ausstattung` to the first information box.
- Add the title `Konditionen` to the second information box.
- Add a third information box titled `Zeiten`.
- In that third box, include these two points:
  - `Montag – Freitag 8.00 - 14.00 Uhr / 19.00 - 22.00 Uhr`
  - `Samstag und Sonntag 9.00 - 22.00 Uhr`

Keep the CTA button.

### 4. Gebühren page (`gebuehren.html`)

- Remove the lead sentence under the H1:
  - `Übersicht der Unterrichtsformate, Preise und allgemeinen Bedingungen an der Musikinsel Leipzig.`
- Change the third pricing value from `35€` to:
  - `35€ pro Monat`
- Remove the three bottom condition cards:
  - `Vertrag`
  - `Unterrichtsfrequenz`
  - `Abrechnung`
- Replace them with one consolidated block titled:
  - `Konditionen`
- In that block, include these four distinct points:
  - `Es wird ein Unterrichtsvertrag zwischen der Lehrkraft und dem Schüler bzw. dessen Erziehungsberechtigten abgeschlossen.`
  - `Einzel- und Gruppenunterricht findet jeweils einmal wöchentlich statt.`
  - `An gesetzlichen Feiertagen und in den Schulferien des Bundeslandes Sachsen für allgemeinbildende Schulen fällt der Unterricht aus, ohne dass dies Einfluss auf das vereinbarte Honorar nimmt.`
  - `Der Unterrichtspreis wird als Jahresgebühren berechnet und ist in 12 gleichen Raten monatlich zur Zahlung fällig.`

If a literal pricing-table component is awkward for these four prose points, prefer a single wide content card/list titled `Konditionen`. The important part is one consolidated block, not three separate cards.

### 5. Veranstaltungen page (`news.html`)

- Change the green eyebrow from:
  - `Neuigkeiten`
- to:
  - `Veranstaltungen`

### 6. Kontakt page (`kontakt.html`)

- Remove the lead sentence under the H1:
  - `Schreiben Sie uns für eine Probestunde, eine Frage oder ein Anliegen. Wir melden uns so bald wie möglich zurück.`
- Update the `Thema` select options to exactly:
  - `Allgemein`
  - `Violine`
  - `Klavier`
  - `Gitarre`
  - `Cello`
  - `Gruppenunterricht`
  - `Raumvermietung`

Remove `Musiktheorie` from that select.

### 7. News page (`news.html`)

Remove the only current news item, create a new one from the pdf '\legacy_site\site\assets\images\news/Kopie von sommerkonzert.pdf' the whole pdf should be visible, convert it to png or jpg, you can use python for this. 

## Out of scope

Do not:
- touch `instrumente.html`
- revisit the existing instrument image swap
- redesign pricing tables beyond the one text change in the third value and the bottom conditions block replacement
- change typography, palette, navigation, or JS behavior

## Governance sync

If you make a non-obvious implementation choice:
- update `05_governance/decision_log.md`

Keep `03_build/implementation_plan.md` honest if the implementation differs materially from the rails.

## Definition of done

- Homepage muted info box is removed.
- Homepage testimonial summary sentence is removed and the first testimonial wording is corrected.
- Team page previews now show the first full paragraph for every teacher and `siehe mehr` reveals only the remainder.
- Raumvermietung has the new lead and three titled info boxes (`Ausstattung`, `Konditionen`, `Zeiten`).
- Gebühren lead is removed, third value reads `35€ pro Monat`, and the bottom area is one consolidated `Konditionen` block with four points.
- Veranstaltungen eyebrow is updated.
- Kontakt lead is removed and the `Thema` list matches the confirmed options including `Klavier`.
