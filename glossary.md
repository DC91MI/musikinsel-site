# Glossary - Artifact-First Static Site Workflow

## Artifact
A concrete, persistent piece of work that represents progress.
Examples:
- `problem_statement.md`
- `site_map.md`
- `visual_direction.md`
- `qa_checklist.md`
- `index.html`

Artifacts are the unit of progress.

---

## Workspace
A structured folder representing a stage or function in the project.
Examples:
- `00_brief`
- `02_design`
- `07_site`

Each workspace has:
- a clear purpose
- its own `CONTEXT.md`
- specific artifacts

---

## Active Workspace
The workspace currently guiding the work.

It determines:
- what the agent should focus on
- which files should be updated
- what "done" means in the current step

---

## CONTEXT.md
A file inside each workspace that defines:
- purpose
- key artifacts
- common rules
- definition of done

It acts as local instructions for the agent.

---

## CLAUDE.md
The root instruction file for the repository.

Defines:
- overall behavior
- workspace structure
- global rules
- review expectations

---

## Artifact-First Workflow
A methodology where progress is measured by improving reviewable artifacts rather than by producing hidden state or vague status updates.

---

## Mode A (New Project)
Starting a new site from scratch with the full scaffold.

---

## Mode B (Existing Site)
Applying the framework to a site that already exists.

Includes:
- repository mapping
- reuse vs rewrite decisions
- migration boundaries

---

## Governance
Tracking decisions, costs, assumptions, risks, and reviews.

Ensures:
- traceability
- accountability
- cleaner handoff

---

## Decision Log
A record of important choices and why they were made.

---

## Cost Log
A record of tooling, hosting, domain, or other project costs.

---

## Review Loop
Process of:
1. Build or update an artifact
2. Review it
3. Synthesize the feedback
4. Decide what to change

---

## Site Map
A document describing the planned page structure and navigation.

---

## Page Inventory
A list of the pages, sections, templates, and status of the site.

---

## QA Checklist
A document used to verify responsiveness, accessibility, links, and launch readiness.

---

## Deploy Workspace
The optional workspace where hosting, environments, domains, and publish steps are documented.

---

## Legacy Review
Structured analysis of an existing site before major changes.

---

## Convergence
The process of combining multiple reviews into a clearer decision.

---

## Definition of Done
Criteria that define when a task is complete.

---

## Template Repository
A reusable repository used to initialize future projects.

---

## Agent
An AI system acting as maker, reviewer, or editor inside the repo.

---

## Reviewer
An agent or human evaluating the current artifacts and site code.
