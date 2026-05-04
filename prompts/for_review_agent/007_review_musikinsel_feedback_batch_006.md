# Review Prompt — Musikinsel Feedback Batch 006

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 006 — a content-and-structure cleanup pass spanning the homepage, team page, Raumvermietung, Gebühren, Veranstaltungen, Kontakt, and the News card content (now a Sommerkonzert poster rendered from PDF).

## Read first

- `prompts/for_coding_agent/007_musikinsel_feedback_batch_006.md`
- `03_build/batch_006_rails.md`
- `03_build/implementation_plan.md` (Batch 006 milestones)
- `05_governance/decision_log.md` (top block "2026-05-03 - Batch 006 implementation decisions")

Then inspect:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/assets/css/styles.css` (BATCH 006 block at the end)
- `legacy_site/site/assets/images/news/sommerkonzert-2026.jpg`

## What to verify

### 1. Homepage (`index.html`)

- The muted info box with Violine / Klavier & Cello / Theorie & Gehörbildung anchor cards is gone.
- The Stimmen section's intro paragraph "Eltern und Schüler:innen heben die Qualität…" is gone.
- The first testimonial reads "Die Kompetenz der Musikpädagog:innen ist beeindruckend." (note the colon-i form, not "Musik-Pädagogen").
- No other homepage section was altered.

### 2. Team page (`team.html`)

- The lead sentence under the H1 ("Die Lehrkräfte der Musikinsel stellen sich hier mit ihren Schwerpunkten…") is gone. The H1 is still `Studierte Musikpädagog:innen`.
- For each of the seven cards: `<p class="bio-preview">` now contains the merged first paragraph of the biography. The `<details>` block that follows starts at what was previously the second paragraph.
- Editorial status hooks dropped: no `Ab März 2025 in Elternzeit.`, `Seit 2022 Teil des Teams.`, or `Seit 2020 an der Musikinsel.` strings remain in any preview.
- `siehe mehr` toggle still works and the full bio is still in the DOM (preview + details combined = full bio per docx).

### 3. Raumvermietung (`raumvermietung.html`)

- Lead paragraph is exactly: "Wir bieten einen schönen und gemütlichen Raum mit einem Yamaha Flügel C2 zum Üben an. Bevorzugt werden Pianisten die langfristig den Raum nutzen möchten. Es darf im Raum kein Unterricht stattfinden."
- Three `.price-card` blocks in this order: `Ausstattung` (with the two-bullet list), `Konditionen` (two bullets), `Zeiten` (two bullets, exactly: "Montag – Freitag 8.00 - 14.00 Uhr / 19.00 - 22.00 Uhr" and "Samstag und Sonntag 9.00 - 22.00 Uhr").
- `Anfrage senden` button still links to `kontakt.html`.

### 4. Gebühren (`gebuehren.html`)

- The lead sentence under the H1 is gone.
- First two pricing tables byte-identical to their Batch 005 state.
- Third pricing cell text reads `35€ pro Monat`.
- Bottom area is one `.price-card` titled `Konditionen` with a `<ul class="plain-list">` of the four exact bullet strings supplied in the brief, in the brief's order. The previous three `.feature-card` entries (Vertrag, Unterrichtsfrequenz, Abrechnung) are gone.

### 5. Veranstaltungen (`news.html`)

- Eyebrow now reads `Veranstaltungen` (chip styling unchanged).
- The previous `Tag der offenen Tür` card is gone.
- The new card is `.news-card.news-card-poster` with `<h3>Sommerkonzert</h3>` and a poster image wrapped in an anchor that opens `assets/images/news/sommerkonzert-2026.jpg` in a new tab.
- The poster JPG exists at `legacy_site/site/assets/images/news/sommerkonzert-2026.jpg`, sized 1200×1697, file size around 200 KB.
- The original `Kopie von sommerkonzert.pdf` is still on disk.
- The poster renders unscaled vertically (no top/bottom crop). On desktop, the card width is similar to the previous news card width; on mobile the image scales down within the card.

### 6. Kontakt (`kontakt.html`)

- The lead sentence under the H1 is gone. The H1 still reads `Fragen? Wir freuen uns auf Ihre Nachricht`.
- `Thema` select options are exactly, in this order: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung`. No `Musiktheorie`.
- The map embed is unchanged.

### 7. CSS hygiene

- A `BATCH 006` block at the end of `styles.css` defines `.news-card-poster`, `.news-card-poster .news-poster-link`, and `.news-card-poster img` — overrides `.news-card img`'s `aspect-ratio: 16/10` and `object-fit: cover`.
- No earlier rules accidentally loosened or duplicated.
- No new framework / JS introduced.

### 8. Out-of-scope check

- `instrumente.html` is untouched (the cello/musiktheorie image swap and `-card.jpg` derivatives from Batch 005 remain intact).
- Typography, palette, navigation, favicon, JS unchanged.
- No filename or page hierarchy changes.

## Output

Produce a structured review:

1. **Blocking issues** — anything that fails an acceptance gate.
2. **Should-fix before close** — visible regressions or scope creep.
3. **Nice-to-have / next-batch** — for example: should the news grid auto-balance now that the poster card is much taller than future short cards, should team `siehe mehr` text auto-collapse on page load (it already does — confirm), should the empty Maria Elternzeit note be reintroduced as a visible status badge in a future batch?
4. **Questions for the client** — the only realistic open question: was dropping the editorial status hooks on Maria/Delfim/Nuno/Paula/Annegret/Raúl/Humam acceptable, or should they reappear as small standalone status notes outside the bio-preview?

Append the synthesis to `05_governance/reviews/review_synthesis.md`. Final acceptance is the human owner's call.
