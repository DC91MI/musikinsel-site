# Batch 005 Rails

## Purpose

Keep the next coding pass tightly constrained to:

1. a style-family correction for the third pricing block on `gebuehren.html`
2. an image-sharpness fix for the instrument cards on `instrumente.html`

Read together with:

- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`

## Hard Boundaries

1. On the Gebühren page, only the third pricing block is in scope.
2. The third pricing block must visually match the same table family as the first two blocks.
3. Keep the first two pricing blocks unchanged unless a tiny shared CSS adjustment is required to support a correct one-column table variant.
4. The displayed numeric amount in the third pricing block stays the same; only the euro sign is added.
5. On the Instrumente page, do not change the layout, card size, card spacing, border radius, or general visual style.
6. Fix instrument-image blur through asset handling and image delivery, not through redesign.
7. No JS is required for either part of this batch.

## Exact Work

### `gebuehren.html`
- Keep the heading:
  - `Klavier, Cello und Gitarre - Gruppenunterricht`
- Replace the custom `.price-tile` markup with a one-column pricing-table structure that clearly belongs to the same component family as the other two pricing tables.
- Keep the label:
  - `50 Minuten Gruppenunterricht`
- Keep the current numeric amount and add `€` to the displayed value.

### `styles.css`
- Remove or stop using the custom Batch 004 `.price-tile` presentation for this page.
- Refine `.pricing-table-single` so it:
  - remains narrower than the full-width three-column tables
  - is centered inside the `.price-card`
  - uses the same border, header, cell, and radius language as the other pricing tables
  - avoids clipped sides or awkward empty-side borders

### `instrumente.html` and `assets/images/instrumente/`
- Keep the current card markup style unless a minimal attribute addition such as `srcset` is useful.
- Improve sharpness by using better-sized instrument-card assets matched to the current frame ratio and size.
- Preserve the current visible frame:
  - same width behavior
  - same `220px` height
  - same `20px` radius
  - same page composition

## Preferred Technical Direction For Instrument Images

Use one or more of these, while keeping the visible design unchanged:

- pre-cropped card-ready image derivatives
- 2x-density image assets for sharper display in a `280x220` frame
- `srcset` where it materially helps

Avoid:

- changing card dimensions
- changing the crop style dramatically
- reducing the image area size just to hide blur

## Non-Goals

- No redesign of the Gebühren page
- No redesign of the Instrumente page
- No typography or palette changes
- No navigation or copy cleanup outside these two targets
- No JS behavior changes

## Acceptance Gates

The batch is not ready to close unless all of these are true:

- The third pricing block visually matches the same family as the other pricing tables.
- The one-column pricing block includes `€`.
- The third pricing block is centered and not clipped at the sides.
- The first two pricing blocks remain intact.
- The Instrumente page keeps the same layout and card sizing.
- Instrument images render noticeably sharper without changing the overall look of the page.
