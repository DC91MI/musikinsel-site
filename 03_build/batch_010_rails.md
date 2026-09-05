# Batch 010 Rails - Remove Raumvermietung And Add Phone Field

## Purpose

Remove the public room-rental (Raumvermietung) section from the active site and let visitors optionally provide a phone number on the Kontakt form, without disturbing the working Batch 009 Formspree integration.

## Context

The user decided the Raumvermietung offering should no longer appear on the site. Separately, the Kontakt form should accept an optional phone number in addition to email so the studio can call back.

Formspree (`https://formspree.io/f/mdavygdk`) remains the active form provider and must not change. The existing `FormData(formspreeForm)` submission automatically picks up the new `telefon` field, so no JavaScript changes were required.

## Exact Work

### Navigation sweep (all active pages)

Removed the `Raumvermietung` nav item from every active static page:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/danke/index.html`

Nav order is now exactly: `Team`, `Instrumente`, `Gebühren`, `Veranstaltungen`, `Kontakt`, `Impressum`.

### Page retirement

- Deleted `legacy_site/site/raumvermietung.html`.
- Confirmed no active internal link points to it (nav was the only reference).
- Left image assets in place; unused assets are not deleted in this batch.

### `legacy_site/site/kontakt.html`

- Removed only the `Raumvermietung` option from the `Thema` (`fach`) selector. Remaining options: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`. `Musiktheorie` was not re-added; the `fach` field itself was kept and remains optional.
- Added an optional `Telefon` field after `E-Mail` and before `Thema`:
  - `id="telefon"`, `name="telefon"`, `type="tel"`, `inputmode="tel"`, `autocomplete="tel"`
  - `pattern="[0-9+()\s/-]{6,}"` so normal German/international formatting (`+49`, spaces, `/`, `-`, parentheses) is accepted while clearly unrelated text is rejected
  - not `required` — only `name`, `email`, and `nachricht` remain required
- Preserved all Batch 009 Formspree markers: `action="https://formspree.io/f/mdavygdk"`, `method="POST"`, `data-formspree-form`, `data-success-url="/danke/"`, the `_gotcha` honeypot, and the `data-form-status` / `aria-live="polite"` status area.

### `legacy_site/site/assets/js/main.js`

- No changes. `FormData(formspreeForm)` already includes `telefon` when filled; the optional field passes `checkValidity()` when empty.

### Documentation

- Removed obsolete Raumvermietung end-to-end test steps from the operator Formspree guide and publish process.
- Added Telefon-field verification to the contact-form test instructions.
- Documented the six-item nav and the trimmed `Thema` options as the current state.

## Acceptance Gates

- No active public page nav contains `Raumvermietung`.
- `legacy_site/site/raumvermietung.html` is removed; `/raumvermietung.html` returns 404 locally.
- No current/live documentation instructs the operator to test the old Raumvermietung inquiry flow.
- Kontakt `Thema` contains exactly: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`.
- Kontakt form includes an optional `Telefon` field with `id="telefon"` / `name="telefon"` using `type="tel"`.
- Formspree endpoint, honeypot, and `/danke/` success redirect are unchanged.
- Required-field validation still blocks missing name/email/message.
- If phone is filled, the submitted Formspree payload includes `telefon`.
- No unrelated content, pricing, bios, event copy, images, typography, palette, or layout changed.

## Production Verification - PENDING DEPLOY

Final acceptance requires a live deploy and a real Kontakt submission with the optional `Telefon` field filled, confirming the value reaches Formspree and the email alert at `musikinsel-leipzig@gmx.de`.
