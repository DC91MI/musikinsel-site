# Artifact-First Static Site Template

A GitHub template repository for AI-assisted development of small, mostly static websites built from HTML, CSS, images, and light JavaScript.

## Included
- Root `CLAUDE.md` with repo operating rules
- Workspace `CONTEXT.md` files for content, design, build, launch, and deploy work
- Artifact templates for briefs, page plans, design decisions, QA, and launch
- Governance logs for decisions, assumptions, risks, and reviews
- A starter `07_site/` workspace for the actual site files
- Optional legacy review workspace for importing an existing site safely
- Bash and PowerShell helper scripts to prune optional folders

## Project modes
- **Mode A:** new static site from scratch
- **Mode B:** existing site refresh, cleanup, or migration

## Suggested first steps
1. Edit `CLAUDE.md` so it reflects your site, stack, and hosting preferences.
2. Fill `00_brief/problem_statement.md` and `00_brief/success_metrics.md`.
3. Sketch the structure in `01_content/site_map.md` and `01_content/page_inventory.md`.
4. Capture the visual direction in `02_design/visual_direction.md`.
5. Decide whether `06_deploy/` and `90_legacy_review/` are needed for this project.
6. Start implementation in `07_site/`.

## Workspace summary
- `00_brief/` - objective, scope, constraints, audience, success metrics
- `01_content/` - pages, copy, assets, SEO notes
- `02_design/` - visual direction, tokens, components, accessibility
- `03_build/` - implementation plan, QA, performance, browser support
- `04_launch/` - launch checklist, deployment notes, handoff summary
- `05_governance/` - decisions, assumptions, costs, risks, reviews
- `06_deploy/` - optional hosting and publishing setup
- `07_site/` - actual site code and static assets
- `90_legacy_review/` - optional review workspace for existing sites

## GitHub template usage
1. Upload these contents to a new GitHub repository.
2. In repository settings, enable **Template repository**.
3. For each new project, click **Use this template**.
4. Clone the new repo locally and tailor the scaffold before building.
