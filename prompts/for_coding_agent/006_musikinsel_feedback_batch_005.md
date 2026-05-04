# Musikinsel Leipzig - Coding Prompt - Feedback Batch 005

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML and CSS only unless a minimal image-processing step is needed to prepare sharper static assets.

## Active workspaces
- `02_design`
- `03_build`
- `05_governance`

## Read first

- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `03_build/batch_005_rails.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`

Then inspect before editing:
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/images/instrumente/`

## Context

Batch 004 introduced a custom `.price-tile` for the third pricing block on the Gebühren page.
The client explicitly rejected that direction because it looks too different from the other pricing tables.

Separately, the Instrumente page layout is approved, but the instrument images look blurry in their cards.
The client wants the same size and overall style preserved.

This batch is therefore a two-part refinement:

1. restore style-family consistency on the third Gebühren pricing block
2. improve instrument-image sharpness without changing the layout

## Task

Implement Batch 005 exactly within the rails.

## Requirements

### 1. Gebühren page - return the third block to the same table family

On `legacy_site/site/gebuehren.html`:

- keep the heading exactly:
  - `Klavier, Cello und Gitarre - Gruppenunterricht`
- remove the custom `.price-tile` markup
- replace it with a one-column pricing-table structure that clearly belongs to the same family as the first two pricing tables
- keep the label:
  - `50 Minuten Gruppenunterricht`
- keep the current numeric amount
- add the euro sign to the displayed value

The result should:
- use the same green header band / white value row / border language as the other pricing tables
- be centered
- not look clipped at the sides
- not feel like a different component family

### 2. Gebühren CSS - refine the shared one-column variant

In `legacy_site/site/assets/css/styles.css`:

- stop using the Batch 004 custom tile styles for this page
- refine `.pricing-table-single` so it works as a proper one-column version of the existing pricing tables
- keep it narrower than the full three-column tables
- center it inside the `.price-card`
- preserve the shared table-family look

Do not redesign the first two pricing blocks.
Only make minimal shared adjustments if they are truly needed to support a correct one-column variant.

### 3. Instrumente page - keep layout, fix sharpness

On `legacy_site/site/instrumente.html` and the related image assets:

- keep the visible card layout unchanged
- keep the visible image frame unchanged:
  - same width behavior
  - same `220px` height
  - same `20px` radius
  - same overall page composition
- improve sharpness through better image handling, not through layout changes

Preferred direction:
- create card-ready instrument image derivatives matched to the displayed aspect ratio
- target roughly 2x display resolution for the current frame, around `560x440`
- use `srcset` only if it materially helps and stays simple
- preserve the current crop/style feel so the page still looks the same

Important:
- do not reduce the image area to hide blur
- do not change spacing, card width, or page rhythm
- pay special attention to `musiktheorie.jpg`, since it has the least source headroom

### 4. Scope discipline

Do not:
- redesign the Gebühren page
- redesign the Instrumente page
- change typography or palette
- alter navigation or other pages
- introduce new JS behavior
- broaden this into a larger asset overhaul across the whole site

### 5. Governance sync

If you make a non-obvious implementation choice:
- update `05_governance/decision_log.md`

Keep `03_build/implementation_plan.md` honest if the implementation differs materially from the current rails.

## Definition of done

- The third pricing block visually matches the same family as the other pricing tables.
- The third pricing block includes `€`.
- The one-column pricing block is centered and not clipped at the sides.
- The first two pricing blocks remain intact.
- The Instrumente page keeps the same layout, card size, spacing, and overall style.
- Instrument images render noticeably sharper than before without changing the page design.
