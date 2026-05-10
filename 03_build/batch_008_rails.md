# Batch 008 Rails - Netlify Form Handling

## Purpose

Fix the contact form submission flow for the deployed Netlify site so Besucher:innen can submit general contact and Raumvermietung inquiries without hitting a `POST /kontakt` 404.

The current issue is likely not the destination email address. The existing form posts back to the contact page with no static-site form handler configured:

```html
<form name="kontakt" method="post">
```

On a static Netlify site, this needs Netlify Forms markup and a real success route.

Read together with:

- `03_build/implementation_plan.md`
- `06_deploy/netlify_forms_setup.md`
- `05_governance/decision_log.md`

## Hard Boundaries

1. Keep the site plain static HTML/CSS/JS.
2. Do not add a backend, serverless function, third-party form service, or JavaScript form submission layer.
3. Do not change the visual design of the Kontakt page beyond what is necessary for the honeypot field and success flow.
4. Keep one contact form in `kontakt.html`; Raumvermietung should continue routing users to that form.
5. Do not invent a second visible Raumvermietung form unless a later client request explicitly asks for it.
6. Preserve the existing `Thema` option `Raumvermietung` so the same form can handle room-rental inquiries.
7. Add an actual success page at `/danke/` rather than posting back to `/kontakt`.
8. Document the Netlify dashboard checks required after the code deploys.

## Exact Work

### `legacy_site/site/kontakt.html`

Update the existing form to be a Netlify Forms-compatible static HTML form:

- keep `name="kontakt"`
- use `method="POST"`
- add `action="/danke/"`
- add `data-netlify="true"`
- add `netlify-honeypot="bot-field"` or `data-netlify-honeypot="bot-field"`
- add hidden input:
  - `<input type="hidden" name="form-name" value="kontakt">`
- add a hidden honeypot input named `bot-field`
- keep the visible fields:
  - `name`
  - `email`
  - `fach`
  - `nachricht`
- make visible user fields required where reasonable:
  - name required
  - email required
  - message required
- preserve the existing `Thema` options exactly:
  - `Allgemein`
  - `Violine`
  - `Klavier`
  - `Gitarre`
  - `Cello`
  - `Gruppenunterricht`
  - `Raumvermietung`

### `legacy_site/site/danke/index.html`

Create a real success page that Netlify can serve at `/danke/`.

Requirements:

- use the same global head/font/favicon/header/footer pattern as the rest of the site
- page title should be clear, e.g. `Danke | Musikinsel Leipzig`
- H1 should confirm successful submission
- copy should tell visitors that Musikinsel Leipzig will respond soon
- include a clear CTA back to `index.html` and/or `kontakt.html`
- keep the page static and lightweight

### Honeypot Styling

If a CSS class is needed for the honeypot wrapper, add a small utility to `legacy_site/site/assets/css/styles.css`.

Recommended shape:

```css
.form-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
```

Do not hide the honeypot with `display: none`.

### `legacy_site/site/raumvermietung.html`

Keep the page button as the entry point to the existing contact form.

Preferred refinement:

- link the CTA to `kontakt.html`
- keep button text `Anfrage senden`
- optionally add a short note near the CTA only if it improves clarity, but do not create a new form on this page

### `06_deploy/netlify_forms_setup.md`

Keep or update the deployment checklist so the human owner can verify Netlify after the code deploys.

It must cover:

- confirming Netlify Forms detection is enabled
- redeploying after the form markup changes
- checking the Netlify dashboard Forms tab for the `kontakt` form
- configuring email notifications to `musikinsel-leipzig@gmx.de`
- confirming spam prevention / honeypot status
- submitting a real test from production
- checking both verified and spam submissions if the email does not arrive
- confirming `/danke/` resolves after submission

## Non-Goals

- No Netlify Functions.
- No AJAX submission.
- No CMS.
- No CRM integration.
- No custom mail server or SMTP setup.
- No changes to prices, page hierarchy, typography, image assets, navigation labels, or Batch 007 content.

## Acceptance Gates

- `kontakt.html` form has Netlify Forms attributes, hidden `form-name`, honeypot field, and `action="/danke/"`.
- `legacy_site/site/danke/index.html` exists and is reachable as `/danke/` on Netlify.
- The form no longer posts to `/kontakt`.
- Raumvermietung inquiries can use the same form via the `Raumvermietung` topic option.
- Honeypot styling is accessible and does not disrupt layout.
- Existing visible contact fields and options remain intact.
- The deployment checklist explains exactly what to verify in Netlify after deploying.
- No backend, framework, or external form service is introduced.
