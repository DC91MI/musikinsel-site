# Musikinsel Leipzig - Coding Prompt - Remove Gruppenunterricht Pricing Card And Topic

You are working in the Musikinsel Leipzig structured static-site repository.

Follow `CLAUDE.md`, `README.md`, `glossary.md`, `general_tasks_description.md`, the project handoff, and the active workspace `CONTEXT.md` files.

This is Batch 011. The user wants to remove the specific Gebühren pricing card titled `Klavier, Cello und Gitarre - Gruppenunterricht` and remove `Gruppenunterricht` from the Kontakt form `Thema` selector.

Keep this narrow. The Batch 009 Formspree integration and the Batch 010 phone-field / Raumvermietung removal must remain intact.

## Active implementation target

```text
legacy_site/site/
```

Do not work in `07_site/`; it is not the active deployed site.

## Read first

- `prompts/for_coding_agent/000_project_handoff_context.md`
- `prompts/for_coding_agent/012_remove_raumvermietung_add_phone.md`
- `CLAUDE.md`
- `README.md`
- `glossary.md`
- `general_tasks_description.md`
- `03_build/CONTEXT.md`
- `06_deploy/CONTEXT.md`
- `03_build/batch_010_rails.md`
- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`
- `06_deploy/nontechnical_formspree_check_guide.md`
- `06_deploy/publish_process.md`

Then inspect:

- `legacy_site/site/gebuehren.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/assets/js/main.js`
- `legacy_site/site/assets/css/styles.css`

## User Request

1. In the Gebühren section, remove the whole card:

```text
Klavier, Cello und Gitarre - Gruppenunterricht
```

2. In the Kontakt form, remove the `Thema` option:

```text
Gruppenunterricht
```

## Required Implementation

### 1. Remove the specific Gebühren pricing card

In `legacy_site/site/gebuehren.html`, remove the entire `<article class="price-card">` whose heading is exactly:

```text
Klavier, Cello und Gitarre - Gruppenunterricht
```

That includes its internal `pricing-table-single`, the `50 Minuten Gruppenunterricht` label, and `35€ pro Monat`.

After removal, the Gebühren page should keep:

- `Violine, Klavier, Gitarre und Cello`
- `Violine - Einzel- und Gruppenunterricht`
- `Konditionen`

Important scope note:

- Do not remove the separate `Violine - Einzel- und Gruppenunterricht` card unless the user explicitly asks for that later. It is not the card named in this request.
- Do not rewrite the remaining prices, conditions, or page copy.
- Do not remove CSS rules only because they were previously used by the deleted card unless they become clearly obsolete and no longer used anywhere.

### 2. Remove `Gruppenunterricht` from the Kontakt `Thema` selector

In `legacy_site/site/kontakt.html`, keep the `Thema` selector itself, but remove the `Gruppenunterricht` option.

After this change, the `Thema` options should be exactly, in this order:

```text
Allgemein
Violine
Klavier
Gitarre
Cello
```

Do not re-add `Raumvermietung`.
Do not re-add `Musiktheorie`.
Do not remove the `fach` field.
Do not make `fach` required.

### 3. Preserve Kontakt form behavior

The working Formspree setup must remain unchanged.

In `legacy_site/site/kontakt.html`, preserve:

- `name="kontakt"`
- `method="POST"`
- `action="https://formspree.io/f/mdavygdk"`
- `data-formspree-form`
- `data-success-url="/danke/"`
- `_gotcha` honeypot
- `data-form-status` / `aria-live="polite"` status area
- optional `Telefon` field from Batch 010
- required validation on `name`, `email`, and `nachricht`

Do not change `legacy_site/site/assets/js/main.js` unless a real verification issue requires it. `FormData(formspreeForm)` should continue to submit all form fields, including `telefon`.

### 4. Update current project artifacts

Update current/live artifacts so the project state is honest:

- Add `03_build/batch_011_rails.md`
- Update the top/current section of `03_build/implementation_plan.md`
- Add a `Batch 011` section to `03_build/qa_checklist.md`
- Add a top block to `05_governance/decision_log.md`
- Update `06_deploy/nontechnical_formspree_check_guide.md`
- Update `06_deploy/publish_process.md` only if its current verification wording mentions `Gruppenunterricht`
- Update `prompts/for_coding_agent/000_project_handoff_context.md`

Required doc changes:

- Current Gebühren state should no longer mention the deleted `Klavier, Cello und Gitarre - Gruppenunterricht` card as active.
- Current Kontakt `Thema` options should be documented as `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`.
- Current Formspree test instructions should no longer tell the operator to choose `Gruppenunterricht`.
- Batch 010/earlier historical notes can remain as history; do not rewrite old prompts/reviews just to erase old state.
- Production verification should remain pending until a live deploy and real submission test happen.

## Acceptance Gates

- `legacy_site/site/gebuehren.html` no longer contains the card heading `Klavier, Cello und Gitarre - Gruppenunterricht`.
- `legacy_site/site/gebuehren.html` no longer contains the deleted card's `35€ pro Monat` single-card pricing.
- The remaining Gebühren cards still render in a coherent order.
- `legacy_site/site/kontakt.html` `Thema` selector contains exactly: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`.
- `Gruppenunterricht`, `Raumvermietung`, and `Musiktheorie` are absent from the Kontakt `Thema` selector.
- Formspree endpoint, honeypot, success redirect, status area, and optional `Telefon` field are preserved.
- `name`, `email`, and `nachricht` remain required; `telefon` and `fach` remain optional.
- No unrelated navigation, team, events, homepage, image, typography, palette, footer, or provider changes.

## Local Checks

Run:

```powershell
node --check legacy_site\site\assets\js\main.js
```

Serve the active site locally and confirm:

- `/gebuehren.html` returns 200
- `/kontakt.html` returns 200
- `/danke/` returns 200
- `/raumvermietung.html` still returns 404 from Batch 010

Search checks:

```powershell
rg -n "Klavier, Cello und Gitarre - Gruppenunterricht|35€ pro Monat|50 Minuten Gruppenunterricht" legacy_site\site\gebuehren.html
rg -n "<option>Gruppenunterricht</option>|<option>Raumvermietung</option>|<option>Musiktheorie</option>" legacy_site\site\kontakt.html
rg -n "https://formspree.io/f/mdavygdk|_gotcha|id=\"telefon\"|name=\"telefon\"|type=\"tel\"" legacy_site\site\kontakt.html
```

Expected:

- first two searches return no matches
- third search confirms Formspree, honeypot, and phone field are still present

If browser tooling is available, visually inspect `gebuehren.html` and `kontakt.html` on desktop and mobile widths:

- Gebühren has no awkward empty gap after removing the card
- Kontakt form layout still works with the phone field and trimmed topic list
- tab order remains Name -> E-Mail -> Telefon -> Thema -> Nachricht -> submit

Do not send a real production Formspree submission unless the user explicitly asks you to.

## Out Of Scope

Do not:

- remove the `Violine - Einzel- und Gruppenunterricht` pricing card
- change away from Formspree
- change the Formspree endpoint
- remove the optional phone field
- revive Raumvermietung
- add or remove navigation items
- add a framework, backend, Netlify Function, or third-party JavaScript library
- redesign the Gebühren or Kontakt page
- change prices, team bios, event copy, homepage hero copy, images, typography, palette, favicon links, or footer copy
- rewrite historical prompts/review entries only because they mention prior batches

## Deliverables

- Code changes in `legacy_site/site/gebuehren.html` and `legacy_site/site/kontakt.html`
- Current docs/artifacts updated for Batch 011
- Concise implementation summary
- Local verification results
- Clear note that production acceptance requires deploying and submitting a real Kontakt test with one of the remaining Thema options
