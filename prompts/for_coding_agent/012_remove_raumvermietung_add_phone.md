# Musikinsel Leipzig - Coding Prompt - Remove Raumvermietung And Add Phone Field

You are working in the Musikinsel Leipzig structured static-site repository.

Follow `CLAUDE.md`, `README.md`, `glossary.md`, `general_tasks_description.md`, the project handoff, and the active workspace `CONTEXT.md` files.

This is Batch 010. The user wants to remove the room-rental/Raumvermietung public section and update the contact form so visitors can provide a phone number in addition to email.

Keep this narrow. The Formspree integration from Batch 009 is working in production and must remain the active form provider.

## Active implementation target

```text
legacy_site/site/
```

Do not work in `07_site/`; it is not the active deployed site.

## Read first

- `prompts/for_coding_agent/000_project_handoff_context.md`
- `CLAUDE.md`
- `README.md`
- `glossary.md`
- `general_tasks_description.md`
- `03_build/CONTEXT.md`
- `06_deploy/CONTEXT.md`
- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`
- `06_deploy/nontechnical_formspree_check_guide.md`
- `06_deploy/publish_process.md`

Then inspect:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/danke/index.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/js/main.js`
- `legacy_site/site/assets/css/styles.css`

## User request

1. Remove the `Raumvermietung` tab / section for room rental from the website.
2. Remove `Raumvermietung` from the Kontakt form `Thema` selector only.
3. Add a phone field to the Kontakt form so the visitor can enter a phone number in addition to email.

## Required implementation

### 1. Remove Raumvermietung from the active public site

Remove `Raumvermietung` from the primary navigation on every active static page:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/danke/index.html`

After this change, the nav order should be exactly:

```text
Team
Instrumente
Gebühren
Veranstaltungen
Kontakt
Impressum
```

Retire the active Raumvermietung page from the deployed site. Preferred implementation:

- delete `legacy_site/site/raumvermietung.html`
- make sure no active internal link points to it

Do not delete image assets only because they were used on that page; leave unused assets alone unless a direct acceptance gate requires removal.

Do not rewrite old historical prompts or old historical batch review sections just because they mention Raumvermietung. Update current/live docs only.

### 2. Remove Raumvermietung from the Kontakt `Thema` selector

In `legacy_site/site/kontakt.html`, keep the `Thema` selector, but remove only the room-rental option.

The `Thema` options should become exactly, in this order:

```text
Allgemein
Violine
Klavier
Gitarre
Cello
Gruppenunterricht
```

Do not remove the `fach` field itself.

Do not re-add `Musiktheorie`.

### 3. Add a phone field to the Kontakt form

Add a visible phone field to `legacy_site/site/kontakt.html`.

Recommended placement:

- after `E-Mail`
- before `Thema`

Recommended markup shape:

```html
<div>
  <label for="telefon">Telefon</label>
  <input
    id="telefon"
    name="telefon"
    type="tel"
    inputmode="tel"
    autocomplete="tel"
    placeholder="+49 ..."
    pattern="[0-9+()\\s/-]{6,}"
    title="Bitte geben Sie eine gültige Telefonnummer ein. Erlaubt sind Zahlen, Leerzeichen, +, /, - und Klammern.">
</div>
```

Rationale:

- do not use `type="number"` for phone numbers
- phone numbers are not mathematical numbers
- German/international phone numbers often contain `+49`, spaces, slashes, hyphens, or parentheses
- the field should accept normal phone-number formatting while still rejecting clearly unrelated text

Make the phone field optional unless the user explicitly says later that it must be required. The current required fields should remain:

- `name`
- `email`
- `nachricht`

Do not make `fach` required.

### 4. Preserve Batch 009 Formspree behavior

Do not break the working Formspree integration.

In `legacy_site/site/kontakt.html`, preserve:

- `action="https://formspree.io/f/mdavygdk"`
- `method="POST"`
- `data-formspree-form`
- `data-success-url="/danke/"`
- `_gotcha` honeypot
- `data-form-status` / `aria-live="polite"` status area

In `legacy_site/site/assets/js/main.js`, do not rewrite the Formspree handler unless the phone field requires a very small adjustment. The existing `FormData(formspreeForm)` submission should automatically include the new `telefon` field when it is filled.

### 5. Update current project artifacts

Update current/live artifacts so the project state is honest:

- Add `03_build/batch_010_rails.md`
- Update the top/current section of `03_build/implementation_plan.md`
- Add a `Batch 010` section to `03_build/qa_checklist.md`
- Add a top block to `05_governance/decision_log.md`
- Update `06_deploy/nontechnical_formspree_check_guide.md`
- Update `06_deploy/publish_process.md`
- Update `prompts/for_coding_agent/000_project_handoff_context.md`

Required doc changes:

- Current nav should be documented as six items, with no Raumvermietung tab.
- Current Kontakt `Thema` options should be documented without `Raumvermietung`.
- Current Formspree test instructions should no longer include a Raumvermietung end-to-end test.
- Contact-form test instructions should mention filling the optional `Telefon` field and checking that it appears in Formspree/email when filled.
- Production verification should remain pending until a live deploy and real submission test happen.

Historical Batch 008/009 records can remain historical even if they mention old Raumvermietung behavior, but avoid leaving current operator instructions pointing to an obsolete room-rental test.

## Acceptance gates

- No active public page nav contains `Raumvermietung`.
- `legacy_site/site/raumvermietung.html` is removed from the active deployed site.
- No current/live documentation instructs the operator to test the old Raumvermietung inquiry flow.
- Kontakt `Thema` selector contains exactly: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`.
- Kontakt form includes an optional `Telefon` field with `id="telefon"` and `name="telefon"`.
- Phone field uses `type="tel"` and supports normal German/international phone formatting.
- Existing Formspree endpoint and success redirect remain unchanged.
- Empty required-field validation still blocks missing name/email/message.
- If phone is filled, the submitted Formspree payload includes `telefon`.
- No unrelated content, pricing, team bios, event copy, images, typography, palette, or layout system is changed.

## Local checks

Run:

```powershell
node --check legacy_site\site\assets\js\main.js
```

Serve the active site locally and confirm:

- `/index.html` returns 200
- `/kontakt.html` returns 200
- `/danke/` returns 200
- `/raumvermietung.html` is not available if the file was deleted

Search checks:

```powershell
rg -n "Raumvermietung|raumvermietung" legacy_site\site
rg -n "id=\"telefon\"|name=\"telefon\"|type=\"tel\"|https://formspree.io/f/mdavygdk|_gotcha" legacy_site\site\kontakt.html
```

Expected:

- no `Raumvermietung` navigation or `Thema` option remains in active HTML
- `telefon`, Formspree endpoint, and `_gotcha` are present in `kontakt.html`

If browser tooling is available, visually inspect Kontakt on desktop and mobile widths:

- no layout break from adding the phone field
- tab order is Name -> E-Mail -> Telefon -> Thema -> Nachricht -> Submit
- honeypot is still invisible and skipped

Do not send a real production Formspree submission unless the user explicitly asks you to.

## Out of scope

Do not:

- change away from Formspree
- change the Formspree endpoint
- add Netlify Functions
- add a framework, bundler, or third-party JavaScript library
- redesign the site
- change prices, team bios, event content, homepage hero copy, images, typography, palette, or favicon links
- change the success page copy unless needed to remove obsolete Raumvermietung wording
- modify historical prompts/review files only to erase old history

## Deliverables

- Code changes in `legacy_site/site/`
- Current docs/artifacts updated for Batch 010
- Concise implementation summary
- Local verification results
- Clear note that production acceptance requires deploying and submitting a real Kontakt test with the optional phone field filled
