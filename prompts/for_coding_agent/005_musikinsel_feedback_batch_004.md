# Musikinsel Leipzig - Coding Prompt - Feedback Batch 004

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML and CSS only.

## Active workspaces
- `02_design`
- `03_build`
- `05_governance`

## Read first

- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `03_build/batch_004_rails.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`

Then inspect before editing:
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/assets/css/styles.css`

## Context

Batch 003 normalized the Gebühren page content and reduced the third pricing block to a single-column table.

That solved the structural brief, but the current UI result is weak:
- the third block looks like a broken collapsed table
- the outer width feels too large for a one-value component
- the sides look cut off
- the displayed price lacks a euro sign

This batch is a visual refinement only.

## Task

Refine the third pricing block on `legacy_site/site/gebuehren.html` so it looks intentional, compact, and visually coherent with the rest of the page.

## Requirements

### 1. Scope control

Keep the work tightly limited to the third pricing block on the Gebühren page.

Do not:
- redesign the whole page
- change the first two pricing blocks
- alter navigation
- touch other pages

### 2. Keep the existing content meaning

Preserve:
- the third block heading:
  - `Klavier, Cello und Gitarre - Gruppenunterricht`
- the label text:
  - `50 Minuten Gruppenunterricht`

Keep the currently displayed numeric amount and add a euro sign to its presentation.

Do not change the amount itself unless a future brief explicitly does so.

### 3. Replace the awkward faux-table treatment

The current `.pricing-table.pricing-table-single` approach is the problem.

Refine it so the third block reads more like a compact pricing highlight or mini price card inside the existing `.price-card`, rather than like a clipped one-column table.

Preferred direction:
- narrower component
- centered horizontally
- rounded, intentional grouping
- clear visual relationship between label and price
- stronger whitespace balance

You may replace the existing markup with a dedicated wrapper and dedicated CSS if that produces the cleanest result.

### 4. Visual quality

The result should:
- avoid the cut-off side look
- display the price with `€`
- feel balanced on desktop
- remain clean on mobile

### 5. Governance sync

If you make a non-obvious implementation choice:
- update `05_governance/decision_log.md`

Keep `03_build/implementation_plan.md` honest if the implementation differs materially from the rails.

## Out of scope

Do not:
- change the first two pricing tables
- revise any other copy on the Gebühren page
- change typography system or color system
- introduce JS
- broaden this into a larger redesign batch

## Definition of done

- The third pricing block no longer looks like a broken one-column table.
- The price includes a euro sign.
- The component is narrower, centered, and visually coherent inside the `.price-card`.
- The first two pricing blocks remain intact.
- The Gebühren page still works cleanly on narrow screens.
