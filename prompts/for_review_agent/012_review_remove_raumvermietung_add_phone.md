# Review Prompt - Musikinsel Batch 010 Remove Raumvermietung And Add Phone Field

You are acting as a repo-aware reviewer for the Musikinsel Leipzig structured static-site project.

The coding agent has just shipped Batch 010:

- `Raumvermietung` removed from the active public navigation
- `legacy_site/site/raumvermietung.html` deleted from the active deployed site
- `Raumvermietung` removed from the Kontakt `Thema` selector
- an optional `Telefon` field added to the Formspree Kontakt form
- current docs/artifacts updated

Your job is to independently verify the implementation. Do not trust the coding summary; re-derive the checks yourself from the files.

This batch is static HTML/docs only unless a truly necessary CSS/JS touch exists. The working Batch 009 Formspree integration must remain intact.

## Read first

- `prompts/for_coding_agent/012_remove_raumvermietung_add_phone.md`
- `prompts/for_coding_agent/000_project_handoff_context.md`
- `03_build/batch_010_rails.md`
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

## What to verify

### 1. Navigation and retired page

Confirm every active page nav has exactly these six items, in this order:

```text
Team
Instrumente
Gebühren
Veranstaltungen
Kontakt
Impressum
```

Pages to check:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/danke/index.html`

Confirm:

- no active nav item links to `raumvermietung.html`
- `legacy_site/site/raumvermietung.html` no longer exists
- no active internal link in `legacy_site/site/*.html` or `legacy_site/site/danke/index.html` points to the deleted page
- image assets were not deleted merely because the retired page used them

Do not treat old historical prompts or historical review entries as blockers just because they mention Raumvermietung.

### 2. Kontakt `Thema` selector

In `legacy_site/site/kontakt.html`, confirm:

- the `select` keeps `id="fach"` and `name="fach"`
- `fach` is not required
- the options are exactly, in order:
  - `Allgemein`
  - `Violine`
  - `Klavier`
  - `Gitarre`
  - `Cello`
  - `Gruppenunterricht`
- `Raumvermietung` is absent
- `Musiktheorie` was not re-added

### 3. New phone field

In `legacy_site/site/kontakt.html`, confirm:

- there is a visible `Telefon` field after E-Mail and before Thema
- label uses `for="telefon"`
- input uses `id="telefon"` and `name="telefon"`
- input uses `type="tel"`; it must not use `type="number"`
- input has `inputmode="tel"` and `autocomplete="tel"`
- the field is optional; it must not have `required`
- the pattern allows realistic German/international phone formatting, including digits, spaces, plus, slash, hyphen, and parentheses
- title/help text, if present, is German and explains allowed formatting

Required fields should remain only:

- `name`
- `email`
- `nachricht`

### 4. Formspree behavior preserved

In `legacy_site/site/kontakt.html`, confirm the active form still has:

- `name="kontakt"`
- `method="POST"`
- `action="https://formspree.io/f/mdavygdk"`
- `data-formspree-form`
- `data-success-url="/danke/"`
- `_gotcha` honeypot with `tabindex="-1"` and `autocomplete="off"`
- `data-form-status` with `aria-live="polite"`

In `legacy_site/site/assets/js/main.js`, confirm:

- `node --check` passes
- the Formspree handler still submits `new FormData(formspreeForm)`, so `telefon` will be included automatically when filled
- no unnecessary JS rewrite was introduced
- existing nav/year/slideshow/lightbox behavior is not obviously disturbed

### 5. Docs and governance

Confirm current/live docs match Batch 010:

- `03_build/batch_010_rails.md` exists and matches the shipped changes
- `03_build/implementation_plan.md` has a top/current Batch 010 block
- Batch 010 production verification is still PENDING DEPLOY / pending live test
- `03_build/qa_checklist.md` has a Batch 010 section
- `05_governance/decision_log.md` has a top `2026-09-05` Batch 010 decision block
- `06_deploy/nontechnical_formspree_check_guide.md` no longer instructs a Raumvermietung test and does instruct testing the optional phone field
- `06_deploy/publish_process.md` no longer lists Raumvermietung verification
- `prompts/for_coding_agent/000_project_handoff_context.md` reflects the current six-item nav and current contact form state

Historical Batch 006-009 notes may remain as history, but the current status/current operator instructions should not present room rental as an active path.

### 6. Out-of-scope regression check

Confirm no unrelated changes were introduced:

- Formspree endpoint unchanged
- `/danke/` page still exists and uses correct `../` paths
- CSS visual system unchanged except if a tiny form-layout adjustment was genuinely needed
- no new framework, backend, Netlify Function, external JS library, or provider change
- no unrelated changes to prices, team bios, event copy, homepage hero copy, images, typography, palette, favicon links, or footer copy

### 7. Local checks

Run:

```powershell
node --check legacy_site\site\assets\js\main.js
```

Serve `legacy_site/site` locally and confirm:

- `/index.html` returns 200
- `/kontakt.html` returns 200
- `/danke/` returns 200
- `/raumvermietung.html` returns 404

Run search checks:

```powershell
rg -n "Raumvermietung|raumvermietung" legacy_site\site
rg -n "id=\"telefon\"|name=\"telefon\"|type=\"tel\"|https://formspree.io/f/mdavygdk|_gotcha" legacy_site\site\kontakt.html
```

Expected:

- no live active-site references to Raumvermietung remain under `legacy_site/site`
- `kontakt.html` contains the phone field, Formspree endpoint, and `_gotcha`

Do not send a production Formspree submission during code review unless the user explicitly asks for it.

## Output

Produce a structured review:

1. **Blocking issues** - anything that means the retired section is still reachable from active navigation, the contact form lost Formspree functionality, or the phone field cannot submit.
2. **Should-fix before close** - smaller stale-current-doc issues, accessibility gaps, validation problems, or formatting/line-ending damage.
3. **Verification-quality note** - state whether the coding agent's completion summary holds up under independent checks.
4. **Production checks still required** - deploy, submit Kontakt with `Telefon` filled, confirm `/danke/`, Formspree submission includes `telefon`, and email alert arrives.
5. **Nice-to-have / next batch** - only if useful.
6. **Questions for the client** - likely none unless policy/content ambiguity remains.

Append the synthesis to:

```text
05_governance/reviews/review_synthesis.md
```

Final acceptance requires a production deploy and a real Formspree submission test from the deployed domain.
