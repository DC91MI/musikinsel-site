# Musikinsel Leipzig - Coding Prompt - Feedback Batch 003

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML, CSS, and lightweight static embeds only.

## Active workspaces
- `02_design`
- `03_build`
- `05_governance`
- `90_legacy_review`

## Read first

- `CLAUDE.md`
- `03_build/implementation_plan.md`
- `03_build/batch_003_rails.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`
- `docs/Musikinsel-Typespec-Editorial.md`
- `prompts/for_coding_agent/003_musikinsel_feedback_batch_002.md`

Then inspect before editing:
- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/css/styles.css`
- any existing logo asset you intend to use for the favicon

## Context

Batch 002 established the current static baseline and confirmed that `Raumvermietung` belongs as its own top-level page.

This new batch is not a broad redesign. It is a tightly scoped refinement pass focused on:
- navigation cleanup
- title punctuation cleanup
- approved typography rollout
- favicon/browser-tab icon support
- homepage content revision
- contact page map integration
- Raumvermietung simplification
- Gebühren copy/structure normalization

The controlling rails for this batch are already written in `03_build/batch_003_rails.md`.
Treat that file as binding.

## Task

Implement Batch 003 exactly as described in the plan and rails documents.

## Requirements

### 1. Global navigation and title cleanup

Across all affected pages:
- replace `Unser Team` with `Team`
- replace `News` with `Veranstaltungen`
- remove the redundant `Start` nav item
- keep the homepage reachable via the existing brand/home link
- remove trailing full stops from page titles and headline-style titles where they appear

Do not rename page filenames or alter the information architecture beyond these label changes.

### 2. Typography implementation

Read `docs/Musikinsel-Typespec-Editorial.md` carefully before editing any CSS or `<head>` markup.

Implement the approved font system:
- display/headlines: `Cormorant Garamond`
- body/UI/navigation/buttons/forms/labels: `Inter`

Rules:
- do not use `Cormorant Garamond` for nav items, buttons, form labels, or other UI controls
- keep one consistent font-loading strategy across the site
- preserve responsiveness while moving the typography toward the approved hierarchy

If a small compromise is needed, preserve the role split first:
- headlines = `Cormorant Garamond`
- UI/body = `Inter`

### 3. Favicon / browser tab icon

Add a small Musikinsel logo favicon so the site shows a brand icon in the browser tab / URL area.

Constraints:
- use an existing repo logo asset if possible
- keep it lightweight and static-site friendly
- do not turn this into a branding redesign or asset pipeline task

If you need to derive a favicon file from an existing logo asset, keep that derivation minimal and local to the repo.

### 4. Homepage (`index.html`)

Change the homepage H1 from:
- `Persönlicher Unterricht mit musikalischer Tiefe.`

to:
- `Was uns auszeichnet`

Add a bullet list on the landing page with exactly these points:
- `Studierte Musikpädagog:innen`
- `Viele Konzertmöglichkeiten für unsere Schüler:innen`
- `Hochwertiges Unterrichtsinstrument (Yamaha C2-Flügel)`
- `Individueller Unterricht, ausgerichtet auf die Bedürfnisse der Schüler:innen`
- `Kammermusikunterricht`
- `Streichorchester`

Keep the page structurally simple.
Do not reintroduce the removed `Start` nav item.

### 5. Team page (`team.html`)

Change:
- `Musikpädagog:innen mit künstlerischer Praxis`

to:
- `Studierte Musikpädagog:innen`

Keep the existing Batch 002 biography-expand/collapse behavior intact.
Do not turn this into a broader content rewrite.

### 6. Kontakt page (`kontakt.html`)

In the left column:
- remove `Fächer`

For the `Direkter Kontakt` box:
- remove its current information completely
- replace it with a Google Maps embed pinned to:
  - `Nonnenstraße 42A`
  - `04229 Leipzig`

Constraints:
- keep the implementation static and lightweight
- do not introduce API-key logic, custom JS map integrations, or backend dependencies
- make sure the map remains usable on narrow/mobile layouts

### 7. Raumvermietung page (`raumvermietung.html`)

Keep `Raumvermietung` as its own top-level page.

Update the page so that:
- the titles of the three current boxes are removed
- the Ausstattung box copy becomes exactly:
  - `Regelmäßig gestimmtes und intoniertes Instrument`
  - `Klimatisiert, WC`
- the Konditionen box copy becomes exactly:
  - `20€ pro Stunde (Mindestdauer 2 Stunden)`
  - `Individuelles Angebot für langfristiges Üben`
- the third box is removed completely
- only the green `Anfrage senden` CTA remains, linking to `kontakt.html`

Keep the page visually coherent with the rest of the site.

### 8. Gebühren page (`gebuehren.html`)

Normalize the pricing language and structure.

Requirements:
- convert monthly prices to the format `95€ pro Monat`
- remove these information sentences:
  - `Für Violine, Klavier, Gitarre und Cello gelten dieselben monatlichen Preise im Einzelunterricht.`
  - `Für Violine gibt es zusätzlich Unterrichtsangebote, die als Einzel- und Gruppenunterricht geführt werden. Der Gruppenunterricht dauert 50 Minuten`
  - `Gruppenunterricht in Klavier, Cello und Gitarre für Einsteiger:innen und Gruppen.`
- remove the green boxed labels:
  - `Instrumentalunterricht`
  - `Violine Gruppenunterricht`
  - `Gruppenunterricht`
- change the bold title of the third pricing block to:
  - `Klavier, Cello und Gitarre - Gruppenunterricht`
- change the third table to a single-column table with:
  - `50 Minuten Gruppenunterricht`
  - `35`

Do not interpret this as a broader pricing redesign.
Apply the requested copy and structure changes only.

### 9. Governance sync

If any implementation choice is non-obvious and not already settled by the brief:
- update `05_governance/decision_log.md`

Keep `03_build/implementation_plan.md` honest if something materially differs from the current planned milestone.

## Out of scope

Do not:
- introduce a framework
- add build tooling
- add backend/contact-form integrations
- create new pages
- move `Raumvermietung` back onto the homepage
- rewrite large sections of copy beyond the exact requested substitutions
- broaden the map task into a richer app-like experience

## Definition of done

- Nav labels read `Team`, `Raumvermietung`, and `Veranstaltungen`, and `Start` is gone.
- Title punctuation cleanup is applied where requested without harming grammar.
- Typography follows the approved `Cormorant Garamond` / `Inter` role split.
- The site has a working favicon/browser-tab icon based on the Musikinsel logo.
- Homepage H1 is `Was uns auszeichnet` and the bullet list contains exactly the six approved points.
- Team page lead title is `Studierte Musikpädagog:innen`.
- Kontakt page no longer shows `Fächer`, and the `Direkter Kontakt` box is now a map embed for the school address.
- Raumvermietung is simplified to the approved two-text-block plus CTA structure.
- Gebühren uses `€ pro Monat` wording consistently and the third table is reduced to one column with `35`.
- Governance artifacts remain aligned with what actually shipped.
