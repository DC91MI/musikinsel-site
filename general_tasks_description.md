# Artifact-First Static Web Workflow Framework

## Overview

This framework defines a structured approach to developing simple websites with AI assistance. It is designed for projects that are mostly static or fully static: HTML pages, CSS, assets, and only light JavaScript.

It integrates:
- structured context engineering through workspaces
- artifact-driven planning and delivery
- controlled use of AI agents
- iterative review and convergence
- light governance without heavy process

The goal is to maximize:
- **clarity**
- **traceability**
- **reviewability**
- **maintainability**
- **useful automation**

while avoiding:
- hidden project state
- overbuilt infrastructure
- unnecessary framework complexity
- generic status reporting that does not move real artifacts forward

---

## Core Principle

> The unit of progress is not an agent completing a task.  
> The unit of progress is an artifact advancing from one reviewable state to another.

---

## Key Concepts

### 1. Artifact-Centered Development

Artifacts are the primary outputs of the system.
Each meaningful step in the project creates or updates something durable.

Examples:
- problem statement
- site map
- page inventory
- copy deck
- design tokens
- QA checklist
- launch checklist
- HTML, CSS, image, and JavaScript files

Artifacts are:
- human-readable
- version-controlled
- reviewable
- reusable

---

### 2. Workspace-Based Context

The project is divided into **workspaces**, each representing a mode of work.

Each workspace:
- defines its own context
- has clear objectives
- produces specific artifacts

This keeps the active context narrow. A page copy task should not drag in deployment decisions unless those decisions matter.

---

### 3. Minimal Global Instructions

A root instruction file such as `CLAUDE.md` provides:
- project identity
- workspace map
- essential constraints
- default quality expectations

It should:
- stay concise
- avoid repeated detail
- route the agent to the right workspace rather than trying to contain the whole project

---

### 4. Localized Context Per Workspace

Each workspace contains a `CONTEXT.md` file defining:
- purpose of the workspace
- expected outputs
- definition of done
- relevant quality checks

Detailed guidance lives close to the artifacts it controls.

---

### 5. Role-Based AI Usage

AI is used in clearly defined roles:

#### Maker
- writes or edits artifacts
- implements the site
- updates supporting documentation

#### Reviewer
- critiques the current state
- identifies regressions, ambiguity, and missing checks
- focuses on accessibility, responsiveness, performance, clarity, and scope

#### Synthesizer
- merges review findings
- distinguishes between clear issues and optional improvements
- records a workable next step

---

### 6. Convergent Review Process

The framework favors convergence over collecting opinions:

1. Work is produced
2. Reviews are performed
3. Feedback is grouped into:
   - agreed issues
   - open questions
   - actionable fixes
4. Decisions are recorded
5. The next artifact update is scoped clearly

---

### 7. Skills and Reusable Checklists

Reusable workflows help keep site work consistent.

Examples:
- page launch checklist
- accessibility pass
- responsive layout review
- asset handoff checklist
- content import workflow

These reduce prompt drift and keep site work reviewable.

---

### 8. Selective Tool Integration

External tools are optional and should be introduced only when helpful.

Typical examples:
- hosting dashboards
- analytics platforms
- asset libraries
- CMS exports
- issue trackers

The repository remains the primary source of truth for project decisions and artifacts.

---

### 9. Version-Controlled Development

All artifacts and code are:
- stored in Git
- diffable
- reviewable over time

Git becomes the project memory and audit trail.

---

## System Architecture

The framework is composed of five layers:

### Layer 1 - Project Operating System
- root instructions
- workspace definitions
- naming conventions
- review expectations

### Layer 2 - Workspaces
- brief
- content
- design
- build
- launch
- governance
- deploy
- site

### Layer 3 - Artifacts
- planning documents
- design references
- QA notes
- launch records
- code and assets

### Layer 4 - Agent Roles
- maker
- reviewer
- synthesizer

### Layer 5 - Tooling
- editors
- browsers
- hosting services
- optional Node-based tooling

---

## Workspace Model

A standard project structure consists of six core workspaces plus two optional ones:

### 00_brief - Problem Definition
Defines:
- objective
- audience
- constraints
- success metrics
- assumptions
- non-goals

---

### 01_content - Site Structure and Copy
Defines:
- site map
- page inventory
- copy deck
- asset inventory
- SEO notes
- content sources

---

### 02_design - Visual and UX Direction
Contains:
- visual direction
- design tokens
- component inventory
- layout notes
- accessibility notes

---

### 03_build - Implementation Planning and QA
Contains:
- implementation plan
- QA checklist
- performance notes
- browser support notes

---

### 04_launch - Delivery and Handoff
Contains:
- launch checklist
- deployment notes
- handoff summary

---

### 05_governance - Decisions and Reviews
Contains:
- decision log
- assumptions log
- cost log
- risks
- reviews

---

### 06_deploy - Optional Hosting and Publish Setup
Contains:
- hosting strategy
- environments
- local setup
- publish process

---

### 07_site - Actual Website Files
Contains:
- HTML entry points
- CSS
- JavaScript
- images and downloadable assets

---

### 90_legacy_review - Existing Site Review
Used when the repo already has a site and you need to map it before reworking it.

---

## Artifact Lifecycle

Artifacts evolve through stages:

1. initial creation
2. refinement
3. review
4. consolidation
5. launch-ready state

Artifacts remain editable and versioned even after launch.

---

## Execution Flow

A typical workflow:

1. Define or update an artifact
2. Work inside the active workspace
3. Implement or revise the site
4. Review what changed
5. Record decisions and risks
6. Move to the next artifact

---

## Design Principles

### Clarity Over Cleverness
Prefer simple, inspectable structures over smart-looking complexity.

### Local Context Over Global Context
Keep the active scope narrow so prompts stay useful.

### Artifacts Over Hidden State
Important project knowledge should live in files, not just in chat history.

### Minimal Build Complexity
Do not add frameworks, bundlers, or deployment systems unless the project truly needs them.

### Reviewable Quality
Accessibility, responsiveness, performance, and maintainability should be visible in the artifacts and code.

### Evidence Over Assumption
Claims about site quality should come from inspection, checks, or explicit decisions.

---

## Intended Use Cases

This framework is especially suited for:
- brochure sites
- artist or portfolio sites
- event sites
- campaign or landing pages
- content-heavy static sites
- redesigns of small existing websites

---

## Limitations

- Requires discipline to keep artifacts current
- Can feel heavier than a purely ad hoc static site repo
- Is not optimized for large application backends
- Needs adaptation for highly dynamic CMS-driven systems

---

## Summary

This framework defines a structured, artifact-centered way to build and review simple websites with AI assistance.

It combines:
- localized context
- durable project artifacts
- controlled AI roles
- iterative review
- versioned development

The result is a process that stays transparent, practical, and easy to hand off.

## Necessary setup steps

01. Define the site goal, audience, and non-goals in `00_brief/`.
02. Decide the required pages and navigation in `01_content/`.
03. Establish the visual direction and reusable UI patterns in `02_design/`.
04. Plan implementation and QA in `03_build/`.
05. Keep decisions, assumptions, costs, and risks current in `05_governance/`.
06. Document hosting and publish details in `06_deploy/` only if needed.
07. Build the actual site in `07_site/`.
08. For existing sites, map the current system in `90_legacy_review/` before major changes.
