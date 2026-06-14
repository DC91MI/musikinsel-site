# Musikinsel Leipzig - Coding Prompt - Verify Batch 009 Formspree Email Alerts

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md`, the project handoff, and the active workspace `CONTEXT.md` files.

The Formspree integration was already implemented directly in the repo. Your task is to inspect it carefully, correct anything missed, and leave the artifacts honest. Treat this as a verification-and-cleanup coding pass, not a redesign.

## Active workspaces

- `03_build`
- `05_governance`
- `06_deploy`
- `legacy_site/site`

## Read first

- `prompts/for_coding_agent/000_project_handoff_context.md`
- `CLAUDE.md`
- `03_build/CONTEXT.md`
- `06_deploy/CONTEXT.md`
- `03_build/batch_009_rails.md`
- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`
- `06_deploy/nontechnical_formspree_check_guide.md`
- `06_deploy/netlify_forms_setup.md`

Then inspect:

- `legacy_site/site/kontakt.html`
- `legacy_site/site/danke/index.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/js/main.js`
- `legacy_site/site/assets/css/styles.css`
- `06_deploy/publish_process.md`
- `prompts/for_coding_agent/000_project_handoff_context.md`

## Current Intended State

The active form provider should now be Formspree:

```text
https://formspree.io/f/mdavygdk
```

Netlify Forms was useful during Batch 008, but Netlify email notifications required a paid Netlify plan in the user's setup. Netlify should now be treated as historical context, not the active email-alert provider.

## Task

Verify the Formspree implementation end to end in code and docs. If any small mismatch is found, fix it.

## What To Verify

### 1. Kontakt form markup

In `legacy_site/site/kontakt.html`, confirm:

- the form keeps `name="kontakt"`
- the form uses `method="POST"`
- the form action is exactly:
  - `https://formspree.io/f/mdavygdk`
- the form has:
  - `data-formspree-form`
  - `data-success-url="/danke/"`
- Netlify-only markup is gone from the active form:
  - no `data-netlify`
  - no `netlify-honeypot`
  - no hidden `form-name`
  - no `bot-field`
- Formspree honeypot exists:
  - input name is exactly `_gotcha`
  - it has `tabindex="-1"`
  - it has `autocomplete="off"`
  - it remains in the DOM
- visible fields are unchanged:
  - `name`
  - `email`
  - `fach`
  - `nachricht`
- `name`, `email`, and `nachricht` are required
- `fach` options remain exactly:
  - `Allgemein`
  - `Violine`
  - `Klavier`
  - `Gitarre`
  - `Cello`
  - `Gruppenunterricht`
  - `Raumvermietung`
- an `aria-live` status area exists for form errors
- submit button still reads `Nachricht senden`

### 2. Formspree submit handler

In `legacy_site/site/assets/js/main.js`, confirm:

- there is a narrowly scoped handler for `[data-formspree-form]`
- it does not affect other forms or unrelated pages
- it respects browser-native validation by allowing invalid forms to use native validation
- it prevents default only for valid submits
- it posts `FormData` to `formspreeForm.action`
- it sends `Accept: application/json`
- on `response.ok`, it redirects to `/danke/` via the `data-success-url`
- on failure, it shows a German error message with the direct email fallback:
  - `musikinsel-leipzig@gmx.de`
- the submit button is disabled while sending and restored afterward
- existing navigation, slideshow, lightbox, and year behavior remain intact

### 3. CSS

In `legacy_site/site/assets/css/styles.css`, confirm:

- `.form-hidden` still visually hides the honeypot without `display: none`
- `.form-status` exists and is small/non-invasive
- no broad style changes were introduced

### 4. Danke page

Confirm `legacy_site/site/danke/index.html`:

- still exists
- still uses `../` paths for assets and links
- still has `noindex`
- still includes the shared shell and CTAs

### 5. Raumvermietung flow

Confirm `legacy_site/site/raumvermietung.html`:

- remains unchanged
- still links `Anfrage senden` to `kontakt.html`
- has no second form

### 6. Docs and artifacts

Confirm:

- `03_build/batch_009_rails.md` matches the implementation
- `03_build/implementation_plan.md` clearly says Batch 009 is implemented but production verification is pending deploy
- `03_build/qa_checklist.md` has Batch 009 Formspree checks
- `05_governance/decision_log.md` has Batch 009 implementation decisions
- `06_deploy/nontechnical_formspree_check_guide.md` is the current non-technical test guide
- `06_deploy/publish_process.md` points to the Formspree guide
- `06_deploy/netlify_forms_setup.md` clearly says it is historical / Batch 008 context
- `prompts/for_coding_agent/000_project_handoff_context.md` no longer points future agents to the deleted Netlify nontechnical guide

### 7. Local verification

Run local checks:

- `node --check legacy_site/site/assets/js/main.js`
- serve `legacy_site/site` locally
- confirm `kontakt.html` returns 200
- confirm `/danke/` returns 200
- confirm `kontakt.html` contains `https://formspree.io/f/mdavygdk`
- confirm `kontakt.html` contains `_gotcha`

If browser tooling is available, open the local Kontakt page and confirm the form layout still looks normal. Do not submit a real Formspree production test from local if the Formspree domain restriction is enabled for `musikinsel-leipzig.de`.

## Out Of Scope

Do not:

- change provider away from Formspree
- add React, a framework, or build tooling
- add Netlify Functions
- add a second Raumvermietung form
- change unrelated site content, pricing, team bios, news items, images, typography, navigation, or footer copy
- send a production test unless explicitly instructed by the user

## Deliverables

- Any small fixes needed to make code and docs match Batch 009 rails
- Updated artifacts only if they were stale
- A concise summary of what was verified
- Clear note that final acceptance still requires a live production Formspree submission test after deployment

## Definition Of Done

- Active form markup points to Formspree and contains no active Netlify-only fields.
- JavaScript submit handler is syntax-valid and narrowly scoped.
- `/danke/` remains the success UX for JavaScript-enabled browsers.
- Non-JavaScript fallback still posts to Formspree.
- Docs and governance point to Formspree as the active path.
- Local static checks pass.
