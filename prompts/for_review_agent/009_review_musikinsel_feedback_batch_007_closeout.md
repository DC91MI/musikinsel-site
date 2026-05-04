# Review Prompt — Musikinsel Feedback Batch 007 Closeout

You are acting as a repo-aware reviewer. The coding agent has just shipped the Batch 007 closeout pass:

- Team previews actually trimmed (the open review finding)
- `03_build/implementation_plan.md` corrected to match the live HTML
- Homepage intro paragraph copy update
- Veranstaltungen lead opener update
- New `Orchester ohne Noten` news card
- Raumvermietung room photo shrunk, centered, and uncropped

## Read first

- `prompts/for_coding_agent/009_musikinsel_feedback_batch_007_closeout.md`
- `03_build/batch_007_rails.md`
- `03_build/implementation_plan.md` (Batch 007 milestones; Milestones 6 and 8 should now be DONE; Current Status describes the live HTML)
- `05_governance/decision_log.md` (top block "2026-05-04 - Batch 007 closeout implementation decisions")

Then inspect:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/news.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/images/news/orchester_ohne_noten.jpg`

## What to verify

### 1. Team previews actually start with the first real biography paragraph

For each of the seven cards in `team.html`, confirm `<p class="bio-preview">` no longer opens with the older short blurb:

- Raúl Sánchez should open with `Seine Ausbildung umfasste auch Themen wie Theorie, Geschichte, Philosophie und Musikpädagogik.` — not `Geboren in Cieza ...`.
- Maria João should open with `2013 absolvierte sie ein Bachelorstudium ...` — not `Maria João Laureano Maia wurde 1992 ...`.
- Delfim should open with `Bis 2010 wurde er an verschiedenen nationalen Konservatorien ausgebildet.` — not `Delfim Silva Carvalho wurde 1991 ...`.
- Nuno should open with `Bis 2006 wurde er von der Lehrerin Paula Marques unterrichtet.` — not `Geboren 1988 in Porto ...`.
- Humam should open with `Seine Leidenschaft für Musik führte ihn nach Deutschland ...` — not `Humam Nabuti ist ein Gitarrist aus Damaskus ...`.
- Paula should open with `Später wechselte sie zu Susanne Lamke nach Osnabrück ...` — not `Paula Schieferecke wurde 1990 ...`.
- Annegret should open with `Ab 2013 nahm sie zusätzlichen Klavierunterricht bei Prof. Frank Peter ...` — not `Annegret Neumann erhielt ihren ersten Klavierunterricht ...`.

`<details>` paragraphs should be unchanged.

### 2. `03_build/implementation_plan.md` honesty

- The Current Status block describes the live HTML, including the trimmed previews and the new Raumvermietung CSS shape.
- Milestone 6 reads DONE and explicitly says the Team trim was implemented.
- Milestone 8 reads DONE and lists the closeout adjustments that landed.

### 3. Homepage intro copy (`index.html`)

The intro paragraph (the one inside `.hero-intro`) should now end with `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht für Kinder, Jugendliche und Erwachsene.` and no longer mention `Musiktheorie- und Gehörbildungsunterricht`.

### 4. Veranstaltungen lead opener (`news.html`)

The `<p class="lead">` inside the page hero should now begin with exactly `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!` (capital `E` in `Euch`). The remainder of the invitation paragraph is unchanged.

### 5. New news card (`news.html`)

A second `<article class="news-card news-card-poster">` should sit immediately after the Sommerkonzert poster card, containing:

- `<h3>Orchester ohne Noten</h3>`
- a click-to-zoom anchor wrapping `assets/images/news/orchester_ohne_noten.jpg`
- no date, no venue, no body paragraph

The asset should exist on disk at the referenced path.

### 6. Raumvermietung photo (`raumvermietung.html` / `styles.css`)

- The room photo block remains directly below the lead paragraph and before the `Ausstattung` card.
- The `.room-photo` CSS now sets `width: min(100%, 480px)`, centers via auto margins, and uses `object-fit: contain` with `aspect-ratio: auto` and no `max-height` cap.
- Open the page at desktop and mobile widths: the image should be visibly smaller than before, centered, and uncropped at its native aspect ratio.

### 7. Out-of-scope check

- Navigation, favicon, typography system, and JS unchanged.
- Kontakt page unchanged.
- Gebühren, Impressum, Instrumente, footer copy from earlier in Batch 007 still intact.
- `klavier.jpg` still the first slide.

## Output

Produce a structured review:

1. **Blocking issues** — anything that fails an acceptance gate.
2. **Should-fix before close** — visible regressions or scope creep.
3. **Nice-to-have / next-batch** — for example: should the new `Orchester ohne Noten` card eventually carry a date once the client supplies one, should the news grid auto-balance the 1× tall + 1× wider asset shapes, should the room photo open in a click-to-zoom anchor like the news posters do?
4. **Questions for the client** — none expected for this closeout pass.

Append the synthesis to `05_governance/reviews/review_synthesis.md`. Final acceptance is the human owner's call.
