# Review Prompt — Musikinsel Feedback Batch 001

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just implemented the first batch of client feedback against the existing static site in `legacy_site/site/`. Your job is to verify the result against the originating prompt and the confirmed clarifications, flag regressions, and call out any places where the implementation drifted from the artifacts.

## Read first

- `CLAUDE.md`
- `prompts/for_coding_agent/002_musikinsel_feedback_batch_001.md` — the originating task
- `03_build/implementation_plan.md` — what the coder claims was done
- `05_governance/decision_log.md` — entries dated `2026-04-17 — Batch 001 implementation decisions`
- `02_design/CONTEXT.md`, `02_design/accessibility_notes.md`
- `03_build/qa_checklist.md`

Then inspect these files:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js`

## What to verify

### 1. Public copy no longer reads like a redesign log

Grep-level sanity check for the following terms across all `.html` files under `legacy_site/site/`:

- `Geige`, `geige` (only acceptable hit: the on-disk path `assets/images/instrumente/geige.jpg`)
- `Wix` / `WIX`
- `Originalseite` / `Originalauftritt`
- `neue Version` / `neue Fassung` / `neue Seite`
- `live Seite` / `live Website` / `live sichtbar`
- `hochgeladen` / `Redesign` / `bestehende WIX-Präsenz`
- `Netlify Forms`

Any match in rendered copy (i.e. not inside an HTML comment or file path) is a finding. Flag it with file + line.

### 2. Homepage edits

Inspect `index.html`:

- Hero paragraph below H1 is removed.
- KPI grid is removed.
- Logo signet `<div class="photo-card">` is gone; the enclosing `.split-grid` has been simplified to a single-column `.container`.
- "Warum die Seite funktioniert" section is gone entirely (decision log Decision 2).
- Slideshow, CTA buttons, and dots still function (the nesting fix in the hero panel must not have broken the slideshow markup).
- H1 options comment is present directly above the H1.
- `Raumvermietung` section is a standalone `<section id="raumvermietung">` with placeholder copy and a CTA to `kontakt.html`. Confirm placement matches Decision 1 and flag if option (a) — after Stimmen — would read better.

### 3. Scroll-linked parallax

Inspect `assets/js/main.js` and `assets/css/styles.css`:

- Parallax logic is `requestAnimationFrame`-throttled and uses a passive scroll listener.
- `prefers-reduced-motion` disables parallax (CSS fallback + JS guard).
- Translation is clamped (±28px) so no container edges show.
- The old `:hover` scale rule and the 6s transform transition on `.hero-image img` are both gone (they would conflict with per-frame transforms).

If possible: open `index.html` in a browser, scroll up and down, and watch the hero image for: jitter, clipping at the container edges, layout shift on mobile viewports (resize to 375px width and retest), and correctness when `prefers-reduced-motion: reduce` is set.

### 4. Team page

Inspect `team.html`:

- Michiko Saiki and Van Trang Truong are removed.
- Every remaining card uses the `<p class="bio-preview">…</p>` + `<details class="bio-more">` structure.
- The full biography text is inside the `<details>` — nothing is hidden via `display: none` or removed from the markup.
- `<summary>` is keyboard-accessible (Tab reaches it, Enter/Space toggle it, focus ring visible).
- Summary label text flips between `siehe mehr` and `weniger anzeigen` via the CSS `::before` content swap.
- Maria João's bio no longer references "Auf der Originalseite..." — the factual "Ab März 2025 in Elternzeit" line is preserved.

### 5. Instrumente page

Inspect `instrumente.html`:

- Intro paragraph under the H1 is removed.
- Five instrument cards remain (Violine, Klavier, Gitarre, Cello, Musiktheorie), each with only an image and a heading — no body text.
- The pre-existing **cello / Musiktheorie mapping bug** is fixed: every image/alt/heading triple agrees.
- `Geige` label is replaced with `Violine` (heading and alt). The filename `geige.jpg` is still on disk — confirm this is acceptable.
- Cello image corners visibly match the rounded system. `object-fit: cover` with `height: 220px` applied uniformly. Flag any instrument image where `cover` cropping removes meaningful content.
- `Einstieg & Alter` card removal (Decision 5) is acceptable or should be reinstated in the next batch with proper copy.

### 6. Gebühren page

Inspect `gebuehren.html`:

- First table (Violine / Klavier / Gitarre / Cello Einzelunterricht) is intact with `Violine` in the heading and lead.
- Second table (Violine Einzel- und Gruppenunterricht, with the 50-Minuten note) is intact.
- Third block is now `Gruppenunterricht`, three columns — `Klavier – 30 Minuten`, `Cello – 30 Minuten`, `Gitarre – 30 Minuten`, each `25 EUR`.
- Conditions cards: the middle card is now `Unterrichtsfrequenz` (not `Rhythmus`); the right card uses the verbatim Jahresgebühren / Sachsen Schulferien paragraph supplied in the brief.
- `.pricing-table` has rounded outer corners (`border-radius: 14px; overflow: hidden`) and still renders correctly on mobile (single-column fallback in the existing `@media (max-width: 760px)` block).

### 7. News page

Inspect `news.html`:

- `<title>`, `<h1>`, and eyebrow all reference `Neuigkeiten und Konzerte` / `Neuigkeiten`.
- The one visible news card (17. September 2023, Tag der offenen Tür) has no redesign-commentary paragraph.
- Commented-out news cards below it were preserved (for future content) — confirm they do not contain remaining Geige references that a future uncomment would surface (spot-check: the 31. August 2020 card should now say `Violine`, not `Geige`).

### 8. Kontakt and Impressum

- Kontakt lead is replaced with neutral "Schreiben Sie uns..." copy; the internal "Netlify Forms" notice div is removed; the `Geige` entry in the Fächer list and in the `<select>` is replaced with `Violine`.
- Impressum lead is neutral; the final "Impressum auf Basis des hochgeladenen Quelltexts." line is removed.

### 9. Accessibility and responsiveness

- `<details>` controls reachable by keyboard with visible focus.
- All images keep meaningful `alt` text (Violine, Klavier, Gitarre, Cello, Musiktheorie, team member names).
- No new color contrast issues on the `Raumvermietung` CTA.
- Mobile (≤640px) still renders the hero without overflow or layout shift; pricing tables collapse to single column; team grid collapses to one column.
- Parallax is disabled when the user has `prefers-reduced-motion: reduce`.

### 10. Governance artifacts vs implementation

- `03_build/implementation_plan.md` reflects what was actually shipped.
- `05_governance/decision_log.md` carries the seven decisions for Batch 001 with rationale.
- Any implementation detail that did not land in either file is a gap — flag it.

## Output

Produce a structured review with these sections:

1. **Blocking issues** — anything that would make this batch unshippable.
2. **Should-fix before close** — meaningful regressions or scope mismatches.
3. **Nice-to-have / next-batch suggestions** — especially around client-facing questions (H1 choice, Raumvermietung placement, cello cropping).
4. **Questions for the client** — everything that requires a human decision (H1 pick, whether `Warum die Seite funktioniert` should be reinstated with fresh copy, whether `Einstieg & Alter` info should come back as a dedicated block, whether the Instrumente images should go back to `contain` to avoid cropping).

Record the synthesized verdict in `05_governance/reviews/review_synthesis.md`. The human owner makes the final call on whether Batch 001 is accepted.
