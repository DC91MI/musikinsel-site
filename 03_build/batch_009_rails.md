# Batch 009 Rails - Formspree Email Alerts

## Purpose

Switch the Kontakt form from Netlify Forms storage-only behavior to Formspree email-alert handling on the free plan.

The user created this Formspree endpoint:

```text
https://formspree.io/f/mdavygdk
```

## Context

Batch 008 proved that the static form can submit successfully to Netlify Forms, but Netlify email notifications required a paid Netlify plan in the user's setup. Formspree's free plan is acceptable for the expected low contact volume.

Important Formspree docs checked for this batch:

- Basic HTML forms require the Formspree endpoint in the form `action` and named inputs.
- Honeypot spam filtering uses an input named `_gotcha` and is available on all plans.
- Free plan submission allowance starts at 50 submissions/month.
- Custom thank-you redirects in the dashboard are not available on the free plan, so the site uses a small JavaScript submit handler to keep the local `/danke/` success page.

## Exact Work

### `legacy_site/site/kontakt.html`

- Change the form `action` to `https://formspree.io/f/mdavygdk`.
- Keep `method="POST"`.
- Remove Netlify-only attributes and hidden fields:
  - `data-netlify`
  - `netlify-honeypot`
  - hidden `form-name`
  - `bot-field`
- Add a Formspree honeypot input named `_gotcha`.
- Keep visible fields unchanged:
  - `name`
  - `email`
  - `fach`
  - `nachricht`
- Keep required validation on name, email, and message.
- Add a small `aria-live` status area for submit errors.

### `legacy_site/site/assets/js/main.js`

- Add a small progressive enhancement for forms marked with `data-formspree-form`.
- On valid submit:
  - prevent the default browser submit
  - POST `FormData` to the Formspree endpoint with `Accept: application/json`
  - redirect to `/danke/` on success
  - show a short German error message on failure
- Do not add a framework or build step.
- Keep all slideshow/lightbox behavior unchanged.

### Documentation

- Update deployment/operator instructions to focus on Formspree rather than Netlify Forms email notifications.
- Keep a note that the Formspree dashboard should restrict submissions to `musikinsel-leipzig.de`.
- Keep a note that final acceptance requires a production submission test.

## Acceptance Gates

- `kontakt.html` posts to `https://formspree.io/f/mdavygdk`.
- The honeypot field is named `_gotcha`.
- The local `/danke/` page remains the success UX when JavaScript is enabled.
- If JavaScript fails, the form still has a normal HTML `action` fallback to Formspree.
- Visible form fields, labels, options, and required validation remain intact.
- Failure state gives the visitor a direct email fallback.
- Documentation tells a non-technical user how to test Formspree submissions and email alerts.
