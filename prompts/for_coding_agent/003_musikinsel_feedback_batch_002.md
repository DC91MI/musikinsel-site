# Musikinsel Leipzig - Coding Prompt - Feedback Batch 002

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML, CSS, and small JavaScript only.

## Active workspaces
- `02_design`
- `03_build`
- `05_governance`
- `90_legacy_review`

## Read first

- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `05_governance/decision_log.md`
- `05_governance/reviews/review_synthesis.md`
- `prompts/for_coding_agent/002_musikinsel_feedback_batch_001.md`

Then inspect before editing:
- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js`
- `legacy_site/site/assets/images/instrumente/`

## Context

Batch 001 solved most of the first feedback pass, but review and client follow-up established several corrections:

- The `siehe mehr` implementation on the team page is structurally correct but does not include the full biographies.
- `Raumvermietung` should not be on the homepage. It should be its own top-level page like `Start`, `Unser Team`, or `News`.
- `Einstieg & Alter` should be restored on the Instrumente page, visually aligned with the instrument cards, and should keep the plant emoji.
- The phrase `laut Startseite` and similar cross-page phrasing should be removed wherever it appears.
- The cello and music-theory image assets are still mislabeled at the file level and need to be corrected by swapping the file names.
- The current homepage slideshow motion does not satisfy the intended behavior; the media should stay in place while the user scrolls through the opening area.

## Task

Implement Batch 002 as a focused correction pass.

## Requirements

### 1. Team page - full biographies in markup

Update `legacy_site/site/team.html` so that:
- each remaining biography keeps the current preview + expandable structure
- the `<details class="bio-more">` block contains the full remaining biography text, not just one short continuation line
- nothing is hidden with `display: none`
- the interaction remains keyboard-accessible

The review finding on Batch 001 should be fully resolved.

### 2. Homepage hero behavior - replace failed motion

The previous parallax-like offset did not meet the client’s expectation.

Replace it with behavior where:
- the slideshow remains visually anchored / pinned while the user scrolls through the opening homepage area
- the effect feels intentional and stable, not jittery
- the implementation remains lightweight
- reduced-motion users are respected
- mobile viewports do not suffer overlap or layout-break issues

You may use CSS sticky positioning and small supporting JS if needed.
Do not keep the old per-frame translate effect if it conflicts with the intended pinned behavior.

### 3. Raumvermietung must become a top-level page

The current homepage `Raumvermietung` section is not acceptable.

Do this instead:
- remove the homepage `Raumvermietung` section from `index.html`
- create a dedicated page, likely `raumvermietung.html`
- add it to the main navigation alongside the other top-level pages
- use placeholder content that clearly signals:
  - this page is for renting the piano classroom
  - details are provisional
  - contact should go through `kontakt.html`

Keep the page consistent with the visual system of the rest of the site.

### 4. Instrumente page

Update `legacy_site/site/instrumente.html` so that:
- `Einstieg & Alter` returns as a card
- the plant emoji remains
- the restored card is visually aligned with the rest of the grid
- any phrase like `laut Startseite` is removed
- the resulting wording reads naturally in German

Keep the existing five instrument cards and do not reintroduce the old long descriptive text.

### 5. Remove meta cross-page phrasing

Across the edited files, remove phrases like:
- `laut Startseite`
- similar references to another page as the source of truth

The copy should read as final visitor-facing site text, not as internal commentary.

### 6. Fix the mislabeled instrument assets

The cello and music-theory image assets are incorrectly labeled.

Correct this by:
- swapping the file names at the asset level
- updating any HTML references accordingly
- preserving the now-correct mapping between:
  - filename
  - image content
  - `alt`
  - heading

Be careful not to leave dangling references.

### 7. Governance sync

If your implementation choices are non-obvious:
- update `05_governance/decision_log.md`
- keep `03_build/implementation_plan.md` honest about what actually landed

## Out of scope

Do not:
- introduce a framework
- add build tooling
- broadly rewrite the site
- connect a backend
- expand the information architecture beyond adding the dedicated `Raumvermietung` page

## Definition of done

- Team biographies preserve the full biography content inside the expanders.
- The homepage hero stays visually in place while scrolling through the opening area.
- `Raumvermietung` is no longer a homepage section and now exists as its own top-level page.
- `Einstieg & Alter` is restored and visually aligned on the instrument page.
- `laut Startseite` and similar meta phrasing are removed wherever touched.
- The cello and music-theory image asset names are corrected safely.
- Governance artifacts match the shipped implementation.
