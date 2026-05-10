# Musikinsel Leipzig - Coding Prompt - Batch 008 Netlify Form Handling

You are working in a structured artifact-first static site repository.

Follow `CLAUDE.md` and the active workspace `CONTEXT.md` files.

The implementation target remains the existing static site in `legacy_site/site/`.
Keep the work in plain HTML and CSS. Do not add a backend, framework, or JavaScript form-submission layer.

## Active workspaces

- `03_build`
- `05_governance`
- `06_deploy`
- `90_legacy_review`

## Read first

- `CLAUDE.md`
- `03_build/CONTEXT.md`
- `06_deploy/CONTEXT.md`
- `03_build/implementation_plan.md`
- `03_build/batch_008_rails.md`
- `06_deploy/netlify_forms_setup.md`
- `05_governance/decision_log.md`

Then inspect before editing:

- `legacy_site/site/kontakt.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/index.html`
- `legacy_site/site/assets/css/styles.css`

## Context

The deployed site works, but submitting the Kontakt form currently produces a `404` at:

```text
https://musikinsel-leipzig.de/kontakt
```

The current form posts back to the same static page:

```html
<form name="kontakt" method="post">
```

That is not enough for Netlify to intercept and store form submissions. The email address in the footer is not the form handler. Netlify needs to detect the form during deploy, and notification emails must be configured in the Netlify dashboard.

This batch should make the static HTML correct for Netlify Forms and provide a real success route.

## Task

Implement Batch 008 exactly within `03_build/batch_008_rails.md`.

## Requirements

### 1. Contact form markup

Update the existing form in `legacy_site/site/kontakt.html` so it:

- keeps `name="kontakt"`
- uses `method="POST"`
- posts to `action="/danke/"`
- includes `data-netlify="true"`
- includes honeypot spam protection via `netlify-honeypot="bot-field"` or `data-netlify-honeypot="bot-field"`
- includes:
  - `<input type="hidden" name="form-name" value="kontakt">`
- includes a hidden honeypot field named `bot-field`
- keeps visible fields for `name`, `email`, `fach`, and `nachricht`
- makes name, email, and message required
- preserves the existing Thema options, including `Raumvermietung`

Do not change the form into AJAX. Keep it normal static HTML.

### 2. Thank-you page

Create:

```text
legacy_site/site/danke/index.html
```

The page should:

- match the current site head/header/footer pattern
- be reachable as `/danke/` after deploy
- confirm that the message was sent
- include a clear next step, such as returning to the homepage or contact page
- include the shared JS file if needed for nav/year behavior

### 3. Honeypot CSS

If the honeypot needs a utility class, add a small `.form-hidden` rule to `legacy_site/site/assets/css/styles.css`.

Do not use `display: none` for the honeypot field.

### 4. Raumvermietung flow

Keep `legacy_site/site/raumvermietung.html` as a page with a CTA to Kontakt.

The current implementation can keep linking to `kontakt.html`, because the `Thema` dropdown already includes `Raumvermietung`. Do not create a second visible form on the Raumvermietung page.

Optional: if you add a query parameter or anchor to make the flow clearer, keep it small and do not introduce JavaScript unless absolutely necessary.

### 5. Deployment documentation

Update `06_deploy/netlify_forms_setup.md` if your final implementation differs from the current checklist.

Make sure it tells the human owner how to:

- redeploy
- confirm Netlify detected the `kontakt` form
- configure email notifications to `musikinsel-leipzig@gmx.de`
- verify honeypot spam protection
- submit a real production test
- check verified and spam submissions
- confirm `/danke/` after success

### 6. Governance and QA

Update:

- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md` if a non-obvious implementation choice was made

## Out of scope

Do not:

- add Netlify Functions
- add a backend
- add AJAX submission
- add reCAPTCHA unless explicitly requested later
- add a new third-party form provider
- change navigation labels
- change pricing, event, team, homepage, or Raumvermietung copy except where needed for the form flow
- change image assets

## Definition of done

- `kontakt.html` contains Netlify Forms-compatible markup.
- The form posts to `/danke/`, not back to `/kontakt`.
- `danke/index.html` exists and matches the current site system.
- Honeypot spam protection is present and visually hidden without `display: none`.
- General contact and Raumvermietung inquiries use the same `kontakt` form.
- Deployment documentation tells the human owner what must be checked in Netlify after deploy.
- Supporting artifacts are updated honestly.
