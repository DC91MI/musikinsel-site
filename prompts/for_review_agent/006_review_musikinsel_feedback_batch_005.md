# Review Prompt — Musikinsel Feedback Batch 005

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 005 — two narrow refinements:

1. The third pricing block on `gebuehren.html` was returned to the shared `.pricing-table` family (`.pricing-table-single` variant), and the Batch 004 `.price-tile` was retired.
2. The instrument card images on `instrumente.html` were swapped for pre-cropped 2x card-ready derivatives at 560×440 to fix perceived blur, with no change to layout.

Your job is to confirm each fix landed cleanly and to catch any scope creep.

## Read first

- `prompts/for_coding_agent/006_musikinsel_feedback_batch_005.md`
- `03_build/batch_005_rails.md`
- `03_build/implementation_plan.md` (Batch 005 milestones)
- `05_governance/decision_log.md` (top block "2026-04-30 - Batch 005 implementation decisions")

Then inspect:

- `legacy_site/site/gebuehren.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/images/instrumente/` — confirm the new `*-card.jpg` files exist and originals are still present

## What to verify

### Part 1 — Gebühren third block

Markup:

```html
<article class="price-card">
  <h2>Klavier, Cello und Gitarre - Gruppenunterricht</h2>
  <div class="pricing-table pricing-table-single">
    <div class="pricing-head">50 Minuten Gruppenunterricht</div>
    <div class="pricing-cell">35€</div>
  </div>
</article>
```

Confirm:

- Heading verbatim, label verbatim, value `35€` (single euro sign appended; no space, no `EUR`, no leading currency).
- No `.price-tile*` markup remains anywhere in the repo.

CSS:

- `.pricing-table-single` now has `grid-template-columns: 1fr; width: min(100%, 360px); margin-left/right: auto; border-bottom: 2px solid #111;`.
- Cell typography in `.pricing-table-single .pricing-cell` is bumped (~1.6rem, weight 600, padding 1.4rem).
- Batch 004 `.price-tile*` rules are gone (replaced by a one-line comment marker).
- The shared `.pricing-table` rule (the outer green/white/black border + 14px radius + overflow:hidden) is unchanged.

Visual QA:

- Open `gebuehren.html` in a browser at desktop and at 375px width.
- Third block renders as the same component family as the first two: green header band, white value cell, black 2px border, 14px rounded corners.
- The third block is narrower than the three-column tables and centered horizontally inside the `.price-card`.
- No empty side strips around the table — the single column fills the table's intrinsic width.
- First two pricing blocks render byte-identical to their Batch 003 state.

### Part 2 — Instrument image sharpness

Filesystem:

- New files exist: `assets/images/instrumente/geige-card.jpg`, `klavier-card.jpg`, `gitarre-card.jpg`, `cello-card.jpg`, `musiktheorie-card.jpg`. Each ~40–110 KB. Each opens to 560×440.
- Originals (`geige.jpg`, `klavier.jpg`, `gitarre.jpg`, `cello.jpg`, `musiktheorie.jpg`) are still present and unchanged.

`instrumente.html`:

- Each instrument card's `<img>` now points at the `-card.jpg` derivative.
- Each `<img>` carries `width="560" height="440" loading="lazy" decoding="async"`.
- Card structure / surrounding elements / `Einstieg & Alter` card are unchanged.

CSS:

- `.instrument-card img` rules are unchanged (still `width: min(100%, 280px); height: 220px; object-fit: cover; border-radius: 20px`). No layout drift.

Visual QA:

- Open `instrumente.html` in a browser. Compare visual sharpness of the five instrument photos against the previous build (or against rendering a 4080×3060 source through a 280×220 frame).
- All five images should look noticeably crisper. Pay special attention to `musiktheorie-card.jpg`, since its source has the least headroom (1304×1452 → cover-cropped to 14:11 → still ≥2x display).
- Card composition (size, spacing, radius, page rhythm) must match the previous build pixel-for-pixel. Anything that drifts is a regression.
- DevTools network tab should show the new `-card.jpg` files, not the originals. Each request should be small (≤ ~110 KB).

### Part 3 — Scope discipline

- No other page touched.
- No nav, typography, palette, or copy change beyond the third pricing block's value text.
- No JS introduced.
- No `.price-tile*` references anywhere in HTML or CSS.

### Part 4 — Acceptance gates from `03_build/batch_005_rails.md`

Walk each gate; mark verified / regressed / not-yet-checked.

- [ ] Third pricing block visually matches the same family as the other pricing tables.
- [ ] One-column pricing block includes `€`.
- [ ] Third pricing block is centered and not clipped at the sides.
- [ ] First two pricing blocks remain intact.
- [ ] Instrumente page keeps the same layout and card sizing.
- [ ] Instrument images render noticeably sharper without changing the overall look of the page.

## Output

Produce a short structured review:

1. **Blocking issues** — any failed acceptance gate.
2. **Should-fix before close** — visible regressions or scope creep.
3. **Nice-to-have / next-batch** — for example: should the cell value `35€` use the `95€ pro Monat`-style suffix (`pro Stunde`?), should `srcset` be added if a future page resizes the card frame responsively?
4. **Questions for the client** — none expected.

Append the synthesis to `05_governance/reviews/review_synthesis.md`. Final acceptance is the human owner's call.
