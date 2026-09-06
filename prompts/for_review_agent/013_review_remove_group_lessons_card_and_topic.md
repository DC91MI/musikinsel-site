# Review Prompt - Musikinsel Batch 011 Remove Gruppenunterricht Card And Topic

You are acting as a repo-aware reviewer for the Musikinsel Leipzig structured static-site project.

The coding agent has just shipped Batch 011:

- removed the Gebühren pricing card titled `Klavier, Cello und Gitarre - Gruppenunterricht`
- removed `Gruppenunterricht` from the Kontakt form `Thema` selector
- preserved the Batch 009 Formspree setup
- preserved the Batch 010 optional phone field and Raumvermietung removal
- updated current docs/artifacts

Your job is to independently verify the implementation. Treat the coding summary as a claim, not as evidence.

## Read first

- `prompts/for_coding_agent/013_remove_group_lessons_card_and_topic.md`
- `prompts/for_coding_agent/000_project_handoff_context.md`
- `03_build/batch_011_rails.md`
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
- `legacy_site/site/danke/index.html`

## What to verify

### 1. Gebühren card removal

In `legacy_site/site/gebuehren.html`, confirm:

- the entire `<article class="price-card">` headed `Klavier, Cello und Gitarre - Gruppenunterricht` is gone
- the deleted card's `pricing-table-single` block is gone from `gebuehren.html`
- the deleted card's `50 Minuten Gruppenunterricht` label is gone
- the deleted card's `35€ pro Monat` value is gone

Confirm the remaining Gebühren content still includes, in coherent order:

- `Violine, Klavier, Gitarre und Cello`
- `Violine - Einzel- und Gruppenunterricht`
- `Konditionen`

Important:

- Do not flag the remaining `Violine - Einzel- und Gruppenunterricht` card as an issue; the coding prompt explicitly preserved it.
- Do flag accidental removal or rewrite of remaining prices, conditions, or page copy.

### 2. Kontakt `Thema` selector

In `legacy_site/site/kontakt.html`, confirm:

- the `select` keeps `id="fach"` and `name="fach"`
- `fach` is not required
- options are exactly, in order:
  - `Allgemein`
  - `Violine`
  - `Klavier`
  - `Gitarre`
  - `Cello`
- `Gruppenunterricht` is absent
- `Raumvermietung` is absent
- `Musiktheorie` is absent

### 3. Formspree and phone field preserved

In `legacy_site/site/kontakt.html`, confirm:

- form still has `name="kontakt"`
- `method="POST"` remains
- action remains exactly `https://formspree.io/f/mdavygdk`
- `data-formspree-form` remains
- `data-success-url="/danke/"` remains
- `_gotcha` honeypot remains with `tabindex="-1"` and `autocomplete="off"`
- `data-form-status` / `aria-live="polite"` status area remains
- optional `Telefon` field remains with `id="telefon"`, `name="telefon"`, and `type="tel"`
- `telefon` is not required
- `name`, `email`, and `nachricht` remain required

### 4. JavaScript and CSS

Confirm:

- `node --check legacy_site/site/assets/js/main.js` passes
- no unnecessary JS rewrite was introduced
- `new FormData(formspreeForm)` remains the submission path
- CSS was not changed unnecessarily
- no framework, backend, Netlify Function, external JS library, or provider change was introduced

### 5. Batch 010 preservation

Confirm:

- `legacy_site/site/raumvermietung.html` still does not exist
- active navigation still has no Raumvermietung tab
- local `/raumvermietung.html` still returns 404
- `/danke/` still exists and uses correct relative paths

### 6. Docs and governance

Confirm current/live docs match Batch 011:

- `03_build/batch_011_rails.md` exists and matches the shipped changes
- `03_build/implementation_plan.md` has a top/current Batch 011 block
- Batch 011 production verification remains PENDING DEPLOY / pending live test
- `03_build/qa_checklist.md` has a Batch 011 section
- `05_governance/decision_log.md` has a top `2026-09-06` Batch 011 decision block
- `prompts/for_coding_agent/000_project_handoff_context.md` reflects the current Gebühren cards and five Thema options
- `06_deploy/nontechnical_formspree_check_guide.md` does not instruct the operator to choose `Gruppenunterricht`
- `06_deploy/publish_process.md` does not list `Gruppenunterricht` as a verification path

Historical Batch 006-010 notes may remain as history. Do not flag historical records only because they mention old states.

### 7. Local checks

Run:

```powershell
node --check legacy_site\site\assets\js\main.js
```

Serve `legacy_site/site` locally and confirm:

- `/gebuehren.html` returns 200
- `/kontakt.html` returns 200
- `/danke/` returns 200
- `/raumvermietung.html` returns 404

Run:

```powershell
rg -n "Klavier, Cello und Gitarre - Gruppenunterricht|35€ pro Monat|50 Minuten Gruppenunterricht" legacy_site\site\gebuehren.html
rg -n "<option>Gruppenunterricht</option>|<option>Raumvermietung</option>|<option>Musiktheorie</option>" legacy_site\site\kontakt.html
rg -n "https://formspree.io/f/mdavygdk|_gotcha|id=\"telefon\"|name=\"telefon\"|type=\"tel\"" legacy_site\site\kontakt.html
```

Expected:

- first two searches return no matches
- third search confirms the Formspree endpoint, honeypot, and phone field remain

If browser tooling is available, visually inspect `gebuehren.html` and `kontakt.html`:

- no awkward empty gap where the deleted card was
- Kontakt layout still works with the five-option topic list
- tab order remains Name -> E-Mail -> Telefon -> Thema -> Nachricht -> submit

Do not send a production Formspree submission unless the user explicitly asks.

## Output

Produce a structured review:

1. **Blocking issues** - anything that means the requested card/topic removal did not actually land, Formspree broke, or Batch 010 regressed.
2. **Should-fix before close** - smaller stale-current-doc issues, formatting damage, validation gaps, or accidental scope creep.
3. **Verification-quality note** - state whether the coding agent's completion summary holds up under independent checks.
4. **Production checks still required** - deploy, submit Kontakt using one remaining Thema option, confirm `/danke/`, Formspree submission, and email alert.
5. **Nice-to-have / next batch** - only if useful.
6. **Questions for the client** - likely none unless ambiguity remains.

Append the synthesis to:

```text
05_governance/reviews/review_synthesis.md
```

Final acceptance requires a production deploy and a real Formspree submission test from the deployed domain.
