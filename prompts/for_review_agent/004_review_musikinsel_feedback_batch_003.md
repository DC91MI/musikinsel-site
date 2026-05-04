# Review Prompt — Musikinsel Feedback Batch 003

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 003 — the editorial-refinement pass. Your job is to confirm each rail item landed and to catch regressions introduced while applying typography and favicon changes globally.

## Read first

- `CLAUDE.md`
- `prompts/for_coding_agent/004_musikinsel_feedback_batch_003.md`
- `03_build/batch_003_rails.md` — controlling rails for this batch
- `03_build/qa_checklist.md` — the binary acceptance gates
- `03_build/implementation_plan.md` — coder claim of what shipped
- `05_governance/decision_log.md` — the top block "2026-04-30 - Batch 003 implementation decisions"
- `docs/Musikinsel-Typespec-Editorial.md` — controlling typography spec

Then inspect:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/favicon.ico`
- `legacy_site/site/assets/favicon-32.png`
- `legacy_site/site/assets/apple-touch-icon.png`

## What to verify

### 1. Navigation and titles

- Every page's primary `<nav>` contains exactly seven items in this order: `Team`, `Instrumente`, `Gebühren`, `Raumvermietung`, `Veranstaltungen`, `Kontakt`, `Impressum`.
- `Start` is nowhere in the primary nav. The brand element still links to `index.html`.
- `data-nav` + `aria-current` JS still highlights the correct item on each page (open each page in a browser and confirm).
- No `<h1>` on any page ends in a period. The homepage `<h2>` "Ein Musikstudio mit freundlicher Lernatmosphäre" no longer ends in a period. Body sentences keep their periods (this is correct).

### 2. Typography compliance

- Single `<link>` for Google Fonts in every page's head requests only Cormorant Garamond 400/500/600 (+italics 400/500) and Inter 300/400/500/600. No 700/800 weights are loaded.
- `h1, h2, h3, h4` use `Cormorant Garamond` with weight 500 and a small negative letter-spacing.
- `body`, `.btn`, `.eyebrow`, `.nav-links a`, and form fields all use `Inter`. No UI control falls back to Cormorant.
- `.eyebrow` is uppercase with ~0.18em letter-spacing.
- The colour palette was intentionally NOT migrated to the typespec's warm-brown system (Decision 1 in the decision log). Confirm this is acceptable, or flag for a future palette batch.

### 3. Favicon

- `<head>` of every page links three favicon variants: `assets/favicon.ico`, `assets/favicon-32.png`, `assets/apple-touch-icon.png`.
- Open `index.html` in a browser; confirm the tab shows the Musikinsel logo at small size and remains legible.
- The three files exist on disk under `legacy_site/site/assets/` and are non-trivial in size (`.ico` ~10–15 KB, `.png` 32 small, apple-touch-icon ~20–25 KB).

### 4. Homepage content

- H1 is exactly `Was uns auszeichnet`.
- Directly below the H1 is `<ul class="hero-list">` with exactly these six `<li>` entries in order: `Studierte Musikpädagog:innen`, `Viele Konzertmöglichkeiten für unsere Schüler:innen`, `Hochwertiges Unterrichtsinstrument (Yamaha C2-Flügel)`, `Individueller Unterricht, ausgerichtet auf die Bedürfnisse der Schüler:innen`, `Kammermusikunterricht`, `Streichorchester`.
- The pinned `hero-stage` from Batch 002 still functions: scroll the homepage on desktop ≥980px and verify the slideshow stays anchored while the new bullet list and the "Ein Musikstudio…" overview scroll past.

### 5. Team page

- H1 reads `Studierte Musikpädagog:innen`.
- Biography expand/collapse from Batch 002 still works (Tab → Enter → bio expands).

### 6. Kontakt page

- Left card is now `.contact-card.contact-map` wrapping a single `<iframe>` pointing at the Google Maps embed URL for Nonnenstraße 42A, 04229 Leipzig. `loading="lazy"` and `referrerpolicy="no-referrer-when-downgrade"` are set.
- `Direkter Kontakt`, `E-Mail`, `Adresse`, and `Fächer` paragraphs are gone from that card.
- Map renders without horizontal overflow at 375px width. Map remains usable (pan/zoom) on desktop.
- Form column on the right is unchanged in functionality.

### 7. Raumvermietung page

- Page hero remains; H1 has no trailing period.
- Body has exactly two `.price-card` blocks, each with no chip and no heading, each containing only a `<ul class="plain-list">`:
  - First card list items: `Regelmäßig gestimmtes und intoniertes Instrument`, `Klimatisiert, WC`.
  - Second card list items: `20€ pro Stunde (Mindestdauer 2 Stunden)`, `Individuelles Angebot für langfristiges Üben`.
- The third card from Batch 002 (Anfrage / Interesse?) is gone.
- A single `.btn.btn-primary` saying `Anfrage senden` links to `kontakt.html` and sits directly below the two cards on its own `.btn-row`.

### 8. Gebühren page

- All monthly prices read `95€ pro Monat` / `120€ pro Monat` / `145€ pro Monat` / `170€ pro Monat`. No `/monatlich` strings remain.
- The three `.price-label` chips (Instrumentalunterricht / Violine Gruppenunterricht / Gruppenunterricht) are gone.
- The three explanatory `<p class="lead">` sentences from the brief are gone.
- Third block heading is exactly `Klavier, Cello und Gitarre - Gruppenunterricht`.
- Third table is single-column: head `50 Minuten Gruppenunterricht`, cell `35`. (No `€`, no `EUR`, per the brief.)
- Tables remain legible at 375px width (existing single-column collapse via media query at 760px).

### 9. CSS hygiene

- `.contact-map`, `.hero-list`, `.plain-list` are present in the BATCH 003 ADDITIONS block at the end of `styles.css`.
- Old hero parallax CSS is still gone (no `will-change: transform` reintroduced).
- `pricing-table` rounded-corner clipping from Batch 001 is still present.
- No selector accidentally overrides headings back to `Inter`.

### 10. QA against `03_build/qa_checklist.md`

Walk every checkbox in `03_build/qa_checklist.md`. For each, mark verified, regressed, or not-yet-checked. Anything in the regressed bucket is at least a "should-fix-before-close".

## Output

Produce a structured review with:

1. **Blocking issues** — anything failing one of the acceptance gates in the rails.
2. **Should-fix before close** — visible regressions or scope mismatches.
3. **Nice-to-have / next-batch suggestions** — including the still-deferred typespec palette migration, footer "Schnellzugriff" parity for `Raumvermietung` / `Veranstaltungen`, and any responsive tightening on the new Maps iframe.
4. **Questions for the client** — particularly: should the typespec colors (`--accent #7a4a2b`, etc.) be adopted in a follow-up batch, or are the current teal-and-cream tokens locked in?

Append the synthesized verdict to `05_governance/reviews/review_synthesis.md` (do not overwrite the Batch 001 / 002 synthesis blocks). The human owner makes the final call on whether Batch 003 is accepted.
