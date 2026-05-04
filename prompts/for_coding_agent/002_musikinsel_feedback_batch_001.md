# Musikinsel Leipzig - Coding Prompt - Feedback Batch 001

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The current implementation target is the existing static site in `legacy_site/site/`.
Do not migrate the site into a framework. Keep the work in plain HTML, CSS, and small JavaScript.

## Active workspaces
- `01_content`
- `02_design`
- `03_build`
- `05_governance`
- `90_legacy_review`

## Before starting

Read:
- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `05_governance/decision_log.md`
- `90_legacy_review/repo_map.md`
- `legacy_site/site/README.md`

Inspect before editing:
- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js`

## Project context

This site is already a static redesign of an earlier Wix-based website for Musikinsel Leipzig.
The task is not to invent a new architecture. The task is to apply a first batch of client feedback to the existing static implementation.

The client comments were provided in Portuguese and include:
- homepage title alternatives are needed for selection
- homepage hero text and KPI boxes should be reduced
- the homepage slideshow should get a scroll-linked behavior
- the logo image in the "Ein Musikstudio mit freundlicher Lernatmosphäre" section should be removed
- team biographies should support a `siehe mehr`-style expansion
- Michiko and Trang should be removed from the team page
- the Instrumente page should lose some text
- the cello image styling should match the rounded look
- the Gebühren page needs a restructuring of lesson/group pricing and wording
- the News page title should become `Neuigkeiten und Konzerte`
- `Raumvermietung` should be added in a confirmed location
- process-facing comments about the old site / new version / live site should be removed
- `Geige` should be replaced by `Violine`

## Confirmed implementation goals

### 1. Remove process-facing public copy

Remove or rewrite visitor-facing text that talks about:
- the original site
- the live site
- the new version
- the Wix presence
- internal redesign logic

Public pages should read like a finished site, not like a redesign commentary.

### 2. Homepage cleanup

Apply these edits to `legacy_site/site/index.html`:
- keep the hero structure but remove the first paragraph below the H1
- remove the three KPI boxes below the CTA buttons
- remove the logo/signet image from the "Ein Musikstudio mit freundlicher Lernatmosphäre" section
- preserve the slideshow and CTA buttons

Also prepare the homepage H1 so it can be swapped easily once the user chooses from the proposed options.

### 3. Homepage scroll-linked slideshow

Implement the requested behavior in a simple, reviewable way.

Confirmed interpretation:
- use a parallax-like scroll effect
- the slideshow should move more slowly than the surrounding page content
- do not introduce external libraries

Important:
- keep the behavior smooth
- keep it responsive
- do not create overlap bugs on mobile

### 4. Team page

Apply these edits to `legacy_site/site/team.html`:
- remove Michiko Saiki
- remove Van Trang Truong
- introduce a "siehe mehr" style pattern for biographies

Requirements for the biography expansion:
- default state shows a shorter preview
- user can expand to read the full biography
- interaction must be accessible
- prefer native HTML such as `details/summary` or a very small JS toggle
- do not hide the full biography from the markup

### 5. Instrumente page

Apply these edits to `legacy_site/site/instrumente.html`:
- remove the intro paragraph under the H1
- remove the descriptive text inside each instrument card so only the instrument names remain
- fix the current cello / music-theory mapping bug
- ensure the cello image corners match the rounded system used elsewhere
- replace `Geige` with `Violine`

### 6. Gebühren page

Apply these edits to `legacy_site/site/gebuehren.html`:
- keep the first table for instrument lessons as it is
- keep the second table for Violine plus group lessons as it is
- keep the third pricing block, rename it to `Gruppenunterricht`, and expand it
- keep the table styling clean and make border radii fit the content
- replace the `Rhythmus` heading with a better alternative
- replace the third condition card text with:

`Der Unterrichtspreis wird als Jahresgebühren berechnet und ist in 12 gleichen Raten monatlich zur Zahlung fällig. An gesetzlichen Feiertagen und in den Schulferien des Bundeslandes Sachsen für allgemeinbildende Schulen fällt der Unterricht aus, ohne dass dies Einfluss auf das vereinbarte Honorar nimmt.`

For the third pricing block:
- change the title to `Gruppenunterricht`
- include `Klavier`, `Cello`, and `Gitarre`
- use `30 Minuten`
- set all prices there to `25 EUR`

For wording, prefer `Unterrichtsfrequenz` unless a better fit becomes obvious from the layout.

### 7. News page

Apply these edits to `legacy_site/site/news.html`:
- change the page title / hero heading to `Neuigkeiten und Konzerte`
- remove process-facing wording that refers to the old site or redesign process

Do not invent new news content beyond the current available material.

### 8. Global terminology cleanup

Across the edited site:
- replace public-facing `Geige` with `Violine`
- remove redesign-commentary text
- keep the tone warm, calm, and professional

### 9. Raumvermietung

Add `Raumvermietung` as a new homepage section.

Placement:
- on the homepage
- between the Gebühren-related content and News

Scope:
- use placeholder copy only
- make it clear that the section is for renting the piano classroom
- do not create a new dedicated page unless clearly needed

## Out of scope

Do not:
- add a framework
- add a CMS
- connect a backend
- implement Netlify Forms integration
- rewrite the whole site
- invent new prices beyond the conservative interpretation above
- create a new information architecture unless the feedback explicitly requires it

## Deliverables

1. Updated static files in `legacy_site/site/`
2. Honest notes in `03_build/implementation_plan.md` if any new assumptions were required
3. An updated `05_governance/decision_log.md` entry if a non-obvious implementation choice had to be made

## Definition of done

- The requested first-batch edits are implemented according to the confirmed clarifications.
- Public-facing copy no longer reads like redesign commentary.
- The team page supports expandable biographies.
- The fees page matches the requested three-table structure.
- The site remains lightweight, responsive, and easy to review.
