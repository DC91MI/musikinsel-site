# Review Prompt — Musikinsel Batch 009 Formspree Email Alerts Verification

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just completed a **verification-and-cleanup pass** over the Batch 009 Formspree integration (coding prompt `011_verify_formspree_email_alerts.md`). The coding agent reported that the implementation was already consistent with the rails and that **no code or doc changes were required**.

Your job is twofold:

1. Independently confirm that the active code and documentation consistently use Formspree as the email-alert path.
2. Treat the coding agent's "no fixes were needed" conclusion as a claim to be **verified, not trusted**. A verification pass that wrongly concludes "all good" is itself a defect. Re-derive the checks yourself rather than restating the coding agent's summary.

This batch is HTML/CSS/JS-progressive-enhancement only. No backend, no Netlify Functions, no framework, no second Raumvermietung form, no provider change away from Formspree.

## Read first

- `prompts/for_coding_agent/011_verify_formspree_email_alerts.md`
- `prompts/for_coding_agent/000_project_handoff_context.md`
- `03_build/batch_009_rails.md`
- `03_build/implementation_plan.md` (Batch 009 block; Milestones 1–3 DONE, Milestone 4 PENDING DEPLOY)
- `03_build/qa_checklist.md` (Batch 009 Formspree Email Alerts section)
- `05_governance/decision_log.md` (top block `2026-06-14 - Batch 009 implementation decisions`)
- `06_deploy/nontechnical_formspree_check_guide.md`

Then inspect:

- `legacy_site/site/kontakt.html`
- `legacy_site/site/danke/index.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/js/main.js`
- `legacy_site/site/assets/css/styles.css`
- `06_deploy/publish_process.md`
- `06_deploy/netlify_forms_setup.md`

## What to verify

### 1. Kontakt form markup (`kontakt.html`)

Open the `<form>` element and confirm exactly:

- `name="kontakt"`
- `method="POST"`
- `action="https://formspree.io/f/mdavygdk"` (exact endpoint — no typo, no trailing slash, no other form id)
- `data-formspree-form` attribute present
- `data-success-url="/danke/"` present
- A `_gotcha` honeypot input inside a `<p class="form-hidden">` wrapper, named exactly `_gotcha`, with `tabindex="-1"` and `autocomplete="off"`, still in the DOM (not removed via `display: none`)
- Visible fields preserved in the same order with the same `id`/`name`: `name` (text), `email` (email), `fach` (select), `nachricht` (textarea)
- `name`, `email`, and `nachricht` carry `required`; the `fach` select is not required (always defaults to `Allgemein`)
- The seven `Thema` options are exactly, in order: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung` (no `Musiktheorie`)
- A status region exists: `<p class="form-status" data-form-status aria-live="polite">`
- The submit button still reads `Nachricht senden` and uses `.btn .btn-primary`
- The map iframe and page hero are unchanged

Negative checks (these must NOT appear anywhere in the active form):

- no `data-netlify`
- no `netlify-honeypot`
- no hidden `<input ... name="form-name">`
- no `bot-field`
- no second/other third-party form endpoint (`getform`, `web3forms`, etc.)

A fast way to confirm the negatives: `grep -c 'data-netlify\|netlify-honeypot\|bot-field\|name="form-name"' kontakt.html` should return `0`, and `grep -c 'https://formspree.io/f/mdavygdk' kontakt.html` and `grep -c '_gotcha' kontakt.html` should each return `1`.

### 2. JavaScript submit handler (`assets/js/main.js`)

Confirm:

- `node --check legacy_site/site/assets/js/main.js` passes (run it yourself)
- The handler is scoped to a single `[data-formspree-form]` lookup — it does not bind to all forms or to unrelated pages
- Ordering is correct: `if (!form.checkValidity()) return;` happens **before** `event.preventDefault()`, so an invalid form falls through to browser-native validation and is NOT swallowed
- `preventDefault()` runs only for a valid submit
- It POSTs `new FormData(form)` to `form.action` (the Formspree endpoint), with header `Accept: application/json`
- On `response.ok` it redirects via `form.dataset.successUrl` (falling back to `/danke/`)
- On a non-ok response it writes a German error into the status node that names the direct-email fallback `musikinsel-leipzig@gmx.de`
- The `catch` (network failure) path also shows a German message with the same email fallback
- The submit button is disabled + relabeled while sending and restored in a `finally` block (so a failed submit re-enables the button)
- Existing behavior is untouched and not obviously disturbed: menu toggle, year stamp, nav `active`/`aria-current`, hero slideshow preload + autoplay, lightbox open/close + keyboard nav. In particular confirm the form handler sits **above** the early `return` guard for the slideshow elements, so pages without a slideshow still wire up the form.

### 3. CSS (`assets/css/styles.css`)

Confirm:

- `.form-hidden` uses the clip-rect visually-hidden recipe (`position: absolute; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; ...`) and does NOT use `display: none` or `visibility: hidden`
- `.form-status` exists, is minimal/non-invasive (small margin + a muted/error text color), and does not broadly alter layout
- No broad or unrelated style changes were introduced relative to the prior batch

### 4. Danke page (`legacy_site/site/danke/index.html`)

Confirm:

- File still exists at exactly that path (lower-case `danke/index.html`)
- All asset and internal links use `../` relative paths (e.g. `../assets/css/styles.css`, `../index.html`, `../kontakt.html`)
- `<meta name="robots" content="noindex">` is present
- Header/nav/footer match the shared site shell; the success hero + CTAs (`Zur Startseite`, `Zurück zum Kontakt`) and the direct-email fallback are intact

### 5. Raumvermietung flow (`raumvermietung.html`)

Confirm:

- The page is unchanged
- `<a class="btn btn-primary" href="kontakt.html">Anfrage senden</a>` is still present and still links to `kontakt.html`
- No second `<form>` was added; no separate Raumvermietung endpoint

### 6. Docs and governance

Confirm:

- `03_build/batch_009_rails.md` matches the code that landed
- `03_build/implementation_plan.md` Batch 009 block: Milestones 1–3 read DONE; Milestone 4 reads explicitly PENDING DEPLOY. The plan must NOT claim production verification is already complete.
- `03_build/qa_checklist.md` has a `Batch 009 Formspree Email Alerts` section matching the work (endpoint, removed Netlify markup, `_gotcha`, required fields, `Thema` options, JS redirect to `/danke/`, failure email fallback, no-JS POST fallback, domain restriction, post-deploy submit/email/Raumvermietung gates)
- `05_governance/decision_log.md` has a `2026-06-14 - Batch 009 implementation decisions` block recording: the switch to Formspree, the small-JS approach to preserve `/danke/` (because the free-plan dashboard redirect is unavailable), the `_gotcha` honeypot swap, and the single-form Raumvermietung decision. Earlier Batch 008/007 entries remain intact below.
- `06_deploy/nontechnical_formspree_check_guide.md` is Formspree-specific, current, and walks a non-technical operator through settings check, domain restriction, a real test submit, dashboard + email verification, and the Raumvermietung path
- `06_deploy/publish_process.md` points to the Formspree guide (not the old Netlify guide)
- `06_deploy/netlify_forms_setup.md` is clearly marked historical / Batch 008 context and points forward to the Formspree guide
- The project handoff (`000_project_handoff_context.md`) no longer points future agents to the deleted Netlify non-technical guide. Confirm the deleted file is actually gone and unreferenced: `grep -rn 'nontechnical_netlify_deploy_guide' .` should return **no matches** repo-wide, and the file should not exist under `06_deploy/`.

### 7. Out-of-scope / regression check

Confirm the following are unchanged by this batch:

- Navigation labels and order across all eight pages
- Typography (`Cormorant Garamond` + `Inter`) and favicon links
- Palette/tokens and the rounded-card system
- All Batch 007 content: homepage hero order/intro copy, team previews, Instrumente card set, Gebühren mobile pairing + third-value typography, Veranstaltungen vertical stack, Impressum lead, footer copy
- The Batch 008 `.form-hidden` utility recipe (only the honeypot field name changed from `bot-field` to `_gotcha`, not the CSS mechanism)
- Image assets — no replacements or new derivatives
- `main.js` slideshow/lightbox/nav logic — only the scoped form handler is new relative to Batch 007

### 8. Local checks

Confirm the coding agent ran these, and re-run them yourself:

- `node --check legacy_site/site/assets/js/main.js` → valid
- Serve `legacy_site/site` locally and confirm HTTP 200 for `kontakt.html`, `/danke/`, and `raumvermietung.html`
- `kontakt.html` contains `https://formspree.io/f/mdavygdk` and `_gotcha`; contains zero active Netlify-only markers (see the grep in §1)

Do NOT require a real production Formspree submit during code review — final acceptance still depends on the human owner deploying and testing from `musikinsel-leipzig.de`. Do not submit a production test from local, especially if the Formspree domain restriction is enabled.

## Output

Produce a structured review:

1. **Blocking issues** — anything that means Formspree submission will not work, the no-JS POST fallback is broken, `/danke/` is lost, or docs point to the wrong provider.
2. **Should-fix before close** — smaller gaps, stale docs, accessibility issues (e.g. honeypot label not actually labeling its input, missing `aria-live`, a status message that is announced incorrectly), or any place the verification pass over- or under-claimed.
3. **Verification-quality note** — explicitly state whether the coding agent's "no fixes were needed" conclusion holds up under independent re-checking, and call out anything it missed or asserted without evidence.
4. **Production checks still required** — live submit from `musikinsel-leipzig.de`, Formspree dashboard submission appears, email arrives at `musikinsel-leipzig@gmx.de`, domain restriction set to `musikinsel-leipzig.de`, Raumvermietung flow end to end.
5. **Nice-to-have / next batch** — e.g. preselect `Raumvermietung` via `?fach=` from the Raumvermietung CTA, a privacy/Datenschutz note for the third-party processor (GDPR — may need human/legal review of the Impressum), inline per-field error copy, a response-time hint on the form.
6. **Questions for the client** — typically none; the only real open item is the production verification, which is the human owner's responsibility per `06_deploy/nontechnical_formspree_check_guide.md`.

Append the synthesis to:

```text
05_governance/reviews/review_synthesis.md
```

Final acceptance requires a real production submission test from the deployed domain — code review alone cannot close Batch 009.
