# Project Instructions

## Purpose
This repository follows an artifact-first workflow for small website development.

The unit of progress is not "an agent completed a task."
The unit of progress is "a site artifact advanced from one reviewable state to another."

## Workspace map
- `00_brief/` - objective, scope, constraints, audience, success metrics
- `01_content/` - site map, page inventory, copy, assets, SEO notes
- `02_design/` - visual direction, design tokens, components, layout, accessibility
- `03_build/` - implementation plan, QA, performance, browser support
- `04_launch/` - launch checklist, deployment notes, handoff summary
- `05_governance/` - decisions, costs, assumptions, risks, reviews
- `06_deploy/` - optional hosting, environments, publish process
- `07_site/` - actual static site files
- `90_legacy_review/` - required before major rework on an existing site

## Default behavior
1. Read the relevant workspace `CONTEXT.md` before editing.
2. Prefer updating existing artifacts over creating ad hoc notes.
3. Keep plans, page decisions, and QA notes in markdown alongside the site.
4. Log important choices in `05_governance/decision_log.md`.
5. Log meaningful spend assumptions or actual spend in `05_governance/cost_log.md`.
6. Treat accessibility, responsiveness, and performance as first-class requirements.
7. Avoid adding build complexity, frameworks, or backend logic unless the artifacts justify it.
8. For existing sites, populate `90_legacy_review/` before major structural changes.

## Review workflow
- One agent may implement the work.
- A second reviewer may inspect the artifacts and the site code independently.
- A synthesis review should be recorded in `05_governance/reviews/review_synthesis.md`.
- The human owner makes the final decision.
