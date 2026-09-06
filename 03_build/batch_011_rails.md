# Batch 011 Rails - Remove Gruppenunterricht Pricing Card And Topic

## Purpose

Remove the specific Gebühren pricing card titled `Klavier, Cello und Gitarre - Gruppenunterricht` and remove the `Gruppenunterricht` option from the Kontakt `Thema` selector, without disturbing the Batch 009 Formspree integration or the Batch 010 phone-field / Raumvermietung removal.

## Context

The user asked to drop this one group-lessons pricing card and the matching contact-form topic. This is a narrow content/option change only. Formspree (`https://formspree.io/f/mdavygdk`) remains the active provider; no JavaScript change is needed because `FormData(formspreeForm)` already submits every field.

## Exact Work

### `legacy_site/site/gebuehren.html`

- Removed the entire `<article class="price-card">` whose heading is exactly `Klavier, Cello und Gitarre - Gruppenunterricht`, including its `pricing-table-single`, the `50 Minuten Gruppenunterricht` label, and the `35€ pro Monat` value.
- Kept the other cards unchanged and in order: `Violine, Klavier, Gitarre und Cello`, `Violine – Einzel- und Gruppenunterricht`, `Konditionen`.
- Did **not** remove the separate `Violine – Einzel- und Gruppenunterricht` card.
- Did not rewrite any remaining prices, conditions, or copy.
- Left CSS untouched: `.pricing-table-single` is still defined and is not clearly obsolete site-wide, so no rules were deleted.

### `legacy_site/site/kontakt.html`

- Removed only the `<option>Gruppenunterricht</option>` from the `Thema` (`fach`) selector.
- Remaining options, in order: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`.
- Did not re-add `Raumvermietung` or `Musiktheorie`; kept the `fach` field; did not make it required.
- Preserved all Batch 009/010 markers: `name="kontakt"`, `method="POST"`, `action="https://formspree.io/f/mdavygdk"`, `data-formspree-form`, `data-success-url="/danke/"`, the `_gotcha` honeypot, the `data-form-status` / `aria-live="polite"` status area, the optional `Telefon` field, and required validation on `name`, `email`, `nachricht`.

### `legacy_site/site/assets/js/main.js`

- No changes.

## Acceptance Gates

- `gebuehren.html` no longer contains the heading `Klavier, Cello und Gitarre - Gruppenunterricht` or its `35€ pro Monat` single-card pricing.
- Remaining Gebühren cards render in a coherent order with no awkward gap.
- Kontakt `Thema` contains exactly `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`.
- `Gruppenunterricht`, `Raumvermietung`, and `Musiktheorie` are absent from the `Thema` selector.
- Formspree endpoint, honeypot, `/danke/` redirect, status area, and optional `Telefon` field are preserved.
- `name`, `email`, `nachricht` remain required; `telefon` and `fach` remain optional.
- No unrelated navigation, team, events, homepage, image, typography, palette, footer, or provider changes.

## Production Verification - PENDING DEPLOY

Final acceptance requires a live deploy and a real Kontakt submission using one of the remaining `Thema` options, confirming `/danke/`, the Formspree submission, and the email alert at `musikinsel-leipzig@gmx.de`.
