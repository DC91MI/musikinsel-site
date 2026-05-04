# Batch 004 Rails

## Purpose

Keep the next coding pass tightly constrained to a single UI refinement on the Gebühren page.

Read together with:

- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`

## Hard Boundaries

1. Only the third pricing block on `legacy_site/site/gebuehren.html` is in scope.
2. Keep the first two pricing blocks visually and structurally unchanged unless a tiny alignment adjustment is truly necessary.
3. Do not change the third block heading text.
4. Do not change the numeric price amount; only add the euro sign to the displayed value.
5. Prefer a dedicated compact pricing component over reusing the shared `.pricing-table` system for a case it no longer fits.
6. Keep the solution in plain HTML and CSS. No JS is needed.

## Exact Work

### `gebuehren.html`
- Keep the heading:
  - `Klavier, Cello und Gitarre - Gruppenunterricht`
- Replace the current one-column table treatment with more appropriate compact markup.
- Preserve the label text:
  - `50 Minuten Gruppenunterricht`
- Display the price with a euro sign:
  - use the current numeric value already on the page and add `€`

### `styles.css`
- Add dedicated styles for the refined third pricing component.
- Make the block narrower than the current full-width single-column table.
- Center it inside the existing `.price-card`.
- Use padding, border-radius, and visual grouping so it reads like one intentional component rather than a clipped table.
- Keep mobile behavior clean; avoid horizontal clipping or awkward empty side borders.

## Preferred Visual Direction

The refined third block should feel like:

- a compact pricing tile
- one clear label band
- one emphasized price area
- balanced whitespace above and below

It should not feel like:

- a leftover table fragment
- a full-width bordered row with empty sides
- a visually broken collapse of the larger pricing-table pattern

## Non-Goals

- No rewrite of the Gebühren copy outside this block
- No new pricing logic
- No palette redesign
- No typography-system changes
- No changes to navigation or other pages

## Acceptance Gates

The batch is not ready to close unless all of these are true:

- The third pricing block no longer uses the visually broken single-column faux-table look.
- The price visibly includes a euro sign.
- The component is centered and does not look cut off at the sides.
- The first two pricing blocks remain intact.
- The page remains responsive on narrow screens.
