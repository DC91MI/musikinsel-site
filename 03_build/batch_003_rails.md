# Batch 003 Rails

## Purpose

Keep the next coding pass tightly constrained. This document is the execution rail for Batch 003 and should be read together with:

- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`
- `docs/Musikinsel-Typespec-Editorial.md`

## Hard Boundaries

1. Work only inside the listed static-site HTML/CSS/assets files.
2. Do not introduce a framework, package manager, build step, CMS, or backend service.
3. Do not invent new marketing sections or rewrite page structure beyond the requested edits.
4. Do not treat the typography document as optional; it is the controlling design spec for fonts and headline/body role assignment.
5. Do not remove existing accessibility affordances unless the replacement is at least as accessible.
6. Do not broaden the Google Maps task into custom JS, API-key setup, or geolocation features. Use a static embed approach suitable for a simple site.

## Exact Page-by-Page Work

### Global / shared
- Primary nav:
  - remove `Start`
  - rename `Unser Team` to `Team`
  - rename `News` to `Veranstaltungen`
- Remove full stops from page titles and headline-style titles on all affected pages.
- Apply the approved font system:
  - `Cormorant Garamond` for H1/H2/H3-style display headlines
  - `Inter` for body, nav, forms, buttons, labels, captions, and UI
- Add favicon/browser-tab icon using the Musikinsel logo.

### `index.html`
- H1 becomes `Was uns auszeichnet`
- Add a bullet list containing exactly:
  - `Studierte Musikpädagog:innen`
  - `Viele Konzertmöglichkeiten für unsere Schüler:innen`
  - `Hochwertiges Unterrichtsinstrument (Yamaha C2-Flügel)`
  - `Individueller Unterricht, ausgerichtet auf die Bedürfnisse der Schüler:innen`
  - `Kammermusikunterricht`
  - `Streichorchester`
- Do not reintroduce the removed `Start` nav item.

### `team.html`
- Change `Musikpädagog:innen mit künstlerischer Praxis` to `Studierte Musikpädagog:innen`
- Keep biography expand/collapse behavior intact
- Clean title punctuation if needed

### `kontakt.html`
- Remove `Fächer` from the left column
- Clear the current contents of the `Direkter Kontakt` box
- Replace that box content with a Google Maps embed pinned to:
  - `Nonnenstraße 42A`
  - `04229 Leipzig`
- Keep the page static and lightweight

### `raumvermietung.html`
- Remove the visible titles from the current three boxes
- Ausstattung text becomes exactly:
  - `Regelmäßig gestimmtes und intoniertes Instrument`
  - `Klimatisiert, WC`
- Konditionen text becomes exactly:
  - `20€ pro Stunde (Mindestdauer 2 Stunden)`
  - `Individuelles Angebot für langfristiges Üben`
- Remove the third box entirely
- Leave only the green `Anfrage senden` CTA to `kontakt.html`

### `gebuehren.html`
- Reformat monthly prices to `95€ pro Monat`
- Delete these explanatory sentences:
  - `Für Violine, Klavier, Gitarre und Cello gelten dieselben monatlichen Preise im Einzelunterricht.`
  - `Für Violine gibt es zusätzlich Unterrichtsangebote, die als Einzel- und Gruppenunterricht geführt werden. Der Gruppenunterricht dauert 50 Minuten`
  - `Gruppenunterricht in Klavier, Cello und Gitarre für Einsteiger:innen und Gruppen.`
- Remove green boxed labels:
  - `Instrumentalunterricht`
  - `Violine Gruppenunterricht`
  - `Gruppenunterricht`
- Rename the third pricing block heading to `Klavier, Cello und Gitarre - Gruppenunterricht`
- Third table becomes one column:
  - `50 Minuten Gruppenunterricht`
  - `35`

### `news.html`
- Primary nav label changes only (`Veranstaltungen`)
- Remove title punctuation if present

### `impressum.html` and other touched pages
- Keep changes minimal:
  - nav consistency
  - title punctuation cleanup
  - favicon/head font includes if shared per page

## Typography Compliance Rules

The coding agent must verify these during implementation:

- There is one consistent font-loading strategy across the site.
- `Cormorant Garamond` is not used for navigation, buttons, form labels, or other UI controls.
- `Inter` remains the UI/body font.
- Headline scale and hierarchy should move toward the type roles in `docs/Musikinsel-Typespec-Editorial.md` without causing responsive regressions.
- If compromises are required, preserve the role separation first:
  - display/headlines = Cormorant
  - UI/body = Inter

## Implementation Sequence

1. Update shared `<head>` and navigation patterns across pages.
2. Apply global typography and favicon support in CSS/head markup.
3. Update homepage content and title hierarchy.
4. Update Team and Kontakt page copy/structure.
5. Simplify Raumvermietung.
6. Normalize Gebühren wording and table structure.
7. Run QA against the checklist before closing.

## Non-Goals

- No content expansion beyond the requested bullet list and exact replacement strings.
- No new page creation in this batch.
- No backend/contact-form integration.
- No visual overhaul beyond typography and the requested content/layout cleanups.
- No asset renaming campaign beyond what is needed for favicon delivery.

## Acceptance Gates

The batch is not ready to close unless all of these are true:

- Nav labels match the brief and `Start` is gone.
- Homepage H1 is `Was uns auszeichnet`.
- Homepage bullet list contains exactly the six approved points.
- Team title reads `Studierte Musikpädagog:innen`.
- Kontakt page has no `Fächer` block and the direct-contact box is now a map.
- Raumvermietung uses the new two-text-box plus CTA shape.
- Gebühren uses `€ pro Monat` wording consistently and the third table is reduced to one column with `35`.
- The favicon displays from a real local asset reference.
- Typography visibly follows the approved font pairing and role separation.

## Escalate Only If Blocked

The coding agent should only pause for clarification if one of these happens:

- The repository does not contain a usable logo asset for favicon generation.
- The existing page structure makes the Google Maps embed impossible without breaking the layout.
- The typography spec conflicts with a hard technical limitation in the current static setup.
