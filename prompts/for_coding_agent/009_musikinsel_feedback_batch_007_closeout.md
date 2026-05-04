# Musikinsel Leipzig - Coding Prompt - Feedback Batch 007 Closeout

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
- `05_governance/reviews/review_synthesis.md`

Then inspect before editing:
- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/news.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/css/styles.css`

## Context

Batch 007 is almost closed. Two review findings are still open:

1. Team previews still retain the old short blurbs before the first real biography paragraph.
2. `03_build/implementation_plan.md` incorrectly claims that Team issue is already fixed and verified.

In addition to closing those findings, the client added three small changes:

- on the homepage, update the intro sentence from `...Musiktheorie- und Gehörbildungsunterricht...` to `...Cello- und Gruppenunterricht...`
- on the Veranstaltungen page, change the opening sentence to `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
- on the Raumvermietung page, make the inserted room photo smaller, centered, and uncropped (about 60% of its current rendered size)
- add a second visible news item using `assets/images/news/orchester_ohne_noten.jpg`

## Task

Implement this closeout pass exactly within the Batch 007 rails.

## Requirements

### 1. Team page (`team.html`)

Fix the open review issue for real:

- each visible `bio-preview` must begin directly with the first real biography paragraph
- remove the older short blurbs from the preview text
- keep the remaining biography paragraphs inside `<details>`
- keep the existing `siehe mehr` interaction and styling intact

This means the visible preview should no longer begin with sentences like:
- `Geboren in Cieza ...`
- `Maria João Laureano Maia wurde 1992 ...`
- `Delfim Silva Carvalho wurde 1991 ...`

Instead, it should begin with the first actual biography paragraph content that currently follows.

### 2. Governance artifact honesty (`03_build/implementation_plan.md`)

Update the Batch 007 implementation plan so it no longer claims the Team cleanup is already implemented/verified before the HTML actually reflects that.

The plan should:
- accurately describe the remaining issue before the fix
- stop overstating completion
- remain consistent with the live code after your changes

### 3. Homepage intro copy (`index.html`)

In the intro paragraph under:
- `Wer wir sind`
- `Ein Musikstudio mit freundlicher Lernatmosphäre`

replace:
- `Violin-, Klavier-, Gitarren-, Cello-, Musiktheorie- und Gehörbildungsunterricht für Kinder, Jugendliche und Erwachsene.`

with:
- `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht für Kinder, Jugendliche und Erwachsene.`

Do not disturb:
- the reordered hero structure
- the two CTAs
- the six approved bullet points
- the slideshow
- `klavier.jpg` as first slide

### 4. Veranstaltungen lead copy (`news.html`)

Replace the opening sentence of the lead paragraph with exactly:
- `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`

Keep the rest of the invitation paragraph intact:
- `Die Schülerinnen und Schüler der Klavier-, Geigen-, Cello- und Gitarrenklassen präsentieren Musikstücke des klassischen Repertoires unterschiedlicher Niveaus. Diese werden sowohl solistisch als auch in Gruppen vorgetragen.`

Important:
- capitalize `Euch`
- remove the old `...und freuen uns auf euch!...` phrasing
- keep the hero structure and poster-card behavior unchanged

### 5. Additional news item (`news.html`)

Add a second visible news item using:
- `assets/images/news/orchester_ohne_noten.jpg`

Important:
- keep the existing Sommerkonzert poster card as the first visible item
- add the new item within the existing `news-grid` / `news-card` system
- if no supporting copy is available in the repo, use a conservative placeholder treatment:
  - title: `Orchester ohne Noten`
  - image visible
  - no invented date
  - no invented venue
  - no invented body paragraph

Do not fabricate event details that were not provided.

### 6. Raumvermietung image presentation (`raumvermietung.html` / `styles.css`)

Keep the inserted room photo in the same location:
- directly below the lead paragraph
- before `Ausstattung`

But change its presentation so that:
- it is centered
- it is about 60% of its current rendered size
- it does not crop the original image if possible
- it uses the original aspect ratio
- it does not look blurry

Preferred direction:
- constrain width rather than height
- keep `height: auto`
- prefer `object-fit: contain` or intrinsic sizing over `cover`

Do not:
- remove the image
- move the image elsewhere on the page
- replace the asset

## Already done - preserve these exactly

Do not redo or undo:
- homepage carousel first-slide ordering with `assets/images/startseite/klavier.jpg`
- the inserted Raumvermietung photo block location
- Gebühren mobile pair-keeping fix
- Gebühren third-value sizing normalization
- Sommerkonzert poster asset generation and poster-card no-crop behavior
- new `orchester_ohne_noten.jpg` asset filename
- Kontakt page topic-list work from Batch 006
- footer copy refresh from Batch 007

## Out of scope

Do not:
- change navigation
- change Kontakt page content
- change favicon or typography system
- change palette/tokens
- replace poster/image assets
- redesign the instrument card layout
- revisit Gebühren structure beyond preserving the already-shipped fix

## Governance sync

If you make a non-obvious implementation choice:
- update `05_governance/decision_log.md`

Keep `03_build/implementation_plan.md` honest if the implementation differs materially from the rails.

## Definition of done

- Team previews no longer retain the old short blurbs and now begin directly with the first real biography paragraph.
- `03_build/implementation_plan.md` no longer overstates the Team cleanup status.
- Homepage intro paragraph now says `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht ...`
- Veranstaltungen lead now begins `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
- `news.html` now includes a second visible news item using `assets/images/news/orchester_ohne_noten.jpg`
- Raumvermietung photo stays in place but is visibly smaller, centered, and uncropped.
- All previously shipped Batch 007 work remains intact.
