# Review Prompt — Musikinsel Feedback Batch 004

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 004 — a single visual refinement on the third pricing block of `gebuehren.html`. Your job is narrow: confirm the fix is clean, bounded, and visually intentional.

## Read first

- `prompts/for_coding_agent/005_musikinsel_feedback_batch_004.md`
- `03_build/batch_004_rails.md`
- `03_build/implementation_plan.md` ("Batch 004 Milestone")
- `05_governance/decision_log.md` (top block "2026-04-30 - Batch 004 implementation decisions")

Then inspect:

- `legacy_site/site/gebuehren.html`
- `legacy_site/site/assets/css/styles.css` (the `BATCH 004` block at the end)

## What to verify

### 1. Scope discipline

- Only the third `.price-card` on `gebuehren.html` was touched.
- First two pricing blocks (Violine/Klavier/Gitarre/Cello and Violine + group) are byte-identical to their Batch 003 state.
- No other page, no nav, no typography rule, no palette token was altered.
- No JS introduced.

### 2. Markup

The third block is now:

```html
<article class="price-card">
  <h2>Klavier, Cello und Gitarre - Gruppenunterricht</h2>
  <div class="price-tile">
    <div class="price-tile-label">50 Minuten Gruppenunterricht</div>
    <div class="price-tile-amount">
      <span class="price-tile-value">35</span>
      <span class="price-tile-currency">€</span>
    </div>
  </div>
</article>
```

Confirm: heading verbatim, label verbatim, value `35` unchanged, `€` present as a sibling span.

### 3. CSS

The CSS block at the end of `styles.css` (commented `BATCH 004`) defines `.price-tile`, `.price-tile-label`, `.price-tile-amount`, `.price-tile-value`, `.price-tile-currency`, and a `@media (max-width: 640px)` adjustment.

Confirm:

- `.price-tile { width: min(100%, 320px); margin: ... auto; }` — narrower than the parent card and centered.
- Visual grouping via padding, border-radius, soft gradient background, 1px border, light box-shadow — feels like one intentional component, not a clipped table.
- `.price-tile-value` is the dominant element; `.price-tile-currency` is smaller and baseline-aligned with the value via flex `align-items: baseline; gap: 0.25rem`.
- Cormorant Garamond is used for the numeric/currency display; Inter is used for the label. Typography role split from Batch 003 is respected.
- The mobile rule prevents the tile from overflowing the card or its parent container at 375px width.

### 4. Visual QA

Open `gebuehren.html` in a browser at desktop (≥1024px) and at mobile (375px):

- Third block looks like a compact pricing tile, centered, balanced.
- No horizontal clipping or empty-side borders.
- The `35 €` reads as one unit; the gap between value and currency does not feel arbitrary.
- The tile sits comfortably inside the existing `.price-card` padding without crowding the heading above.

### 5. Acceptance gates

Walk the gates from `03_build/batch_004_rails.md` and confirm each:

- [ ] Third block no longer uses the faux single-column table.
- [ ] Price visibly includes `€`.
- [ ] Component is centered and not cut off.
- [ ] First two pricing blocks intact.
- [ ] Page remains responsive on narrow screens.

## Output

Produce a short structured review:

1. **Blocking issues** (any failed acceptance gate).
2. **Should-fix before close** (regressions or scope creep).
3. **Nice-to-have** (e.g., should the heading move closer to the tile, should the label use uppercase eyebrow styling, should the same tile shape replace the larger tables in a future batch?).
4. **Questions for the client** (none expected — this batch is a tightly scoped visual refinement).

Append the synthesis to `05_governance/reviews/review_synthesis.md`. Final acceptance is the human owner's call.
