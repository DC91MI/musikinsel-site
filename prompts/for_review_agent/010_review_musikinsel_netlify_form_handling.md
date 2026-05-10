# Review Prompt — Musikinsel Batch 008 Netlify Form Handling

You are acting as a repo-aware reviewer for a structured static site project.

The coding agent has just shipped Batch 008 — a narrowly scoped fix for the broken contact form submission flow on the deployed Netlify site:

- Kontakt form converted to Netlify Forms-compatible static markup
- a real success page added at `/danke/`
- a `.form-hidden` honeypot utility added to `styles.css`
- Raumvermietung intentionally left routing through the same Kontakt form
- governance and deployment artifacts updated

This batch is HTML/CSS only. No backend, no Netlify Functions, no AJAX, no third-party form provider.

## Read first

- `prompts/for_coding_agent/010_musikinsel_netlify_form_handling.md`
- `03_build/batch_008_rails.md`
- `03_build/implementation_plan.md` (Batch 008 milestones; Milestones 1–5 should now be DONE; Milestone 6 should explicitly state PENDING DEPLOY)
- `03_build/qa_checklist.md` (Batch 008 Netlify Form Handling section)
- `06_deploy/netlify_forms_setup.md`
- `05_governance/decision_log.md` (top block "2026-05-10 - Batch 008 implementation decisions")

Then inspect:

- `legacy_site/site/kontakt.html`
- `legacy_site/site/danke/index.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/assets/css/styles.css` (BATCH 008 block at the end)

## What to verify

### 1. Kontakt form markup (`kontakt.html`)

Open the form element and confirm exactly:

- `<form name="kontakt" method="POST" action="/danke/" data-netlify="true" netlify-honeypot="bot-field">`
- A hidden `<input type="hidden" name="form-name" value="kontakt">` sits as the first child of the form (so the JS-free POST body still identifies the form for Netlify).
- A honeypot wrapper `<p class="form-hidden">` follows it, containing `<label>Nicht ausfüllen: <input name="bot-field" tabindex="-1" autocomplete="off"></label>` (or equivalent — input must be named exactly `bot-field` and must remain in the DOM, not removed via `display: none`).
- Visible fields preserved in the same order and with the same `id`/`name` attributes as before:
  - `name` (text)
  - `email` (email)
  - `fach` (select)
  - `nachricht` (textarea)
- `name`, `email`, and `nachricht` carry the `required` attribute. The `fach` select is not required (it always defaults to `Allgemein`).
- The seven `Thema` options are exactly, in this order: `Allgemein`, `Violine`, `Klavier`, `Gitarre`, `Cello`, `Gruppenunterricht`, `Raumvermietung`. No `Musiktheorie`.
- The submit button still reads `Nachricht senden` and uses the existing `.btn .btn-primary` styling.
- The map iframe and the page hero are unchanged.

Negative checks:
- No `<script>` form-submission handler was added to this page or to `main.js`.
- The `<form>` is not posting back to the same page (`action` must be `/danke/`, not absent and not `kontakt.html`).
- No third-party form endpoint, no `formspree` / `getform` / `web3forms` / etc.

### 2. Success page (`legacy_site/site/danke/index.html`)

- File exists at exactly that path. The folder name is lower-case `danke`, with a single `index.html` inside.
- `<head>` reuses the same global font preconnect/links, favicon set, and `assets/css/styles.css` import as the rest of the site, but with `../`-prefixed paths since this page sits one level deeper.
- `<head>` includes `<meta name="robots" content="noindex">` so the confirmation route is excluded from search indexes.
- Header/nav block matches the rest of the site shell — same brand link, same seven nav items in the same order, same mobile toggle pattern. Internal links must use `../<page>.html` form so they resolve both locally (`file://`) and at `/danke/` on Netlify.
- Page hero confirms successful submission: H1 should be a confirmation message (e.g. `Vielen Dank für Ihre Nachricht`) plus a short reassurance lead.
- Below that, a clear CTA back into the site — at minimum a primary `Zur Startseite` link to `../index.html` and a secondary path back to the contact page (`../kontakt.html`). A direct-email fallback (`musikinsel-leipzig@gmx.de`) is welcome but optional.
- Footer block matches the standard duplicated footer markup, including the `Instrumente & Einstieg` Schnellzugriff entry and the `individuellen Unterricht` tagline.
- `<script src="../assets/js/main.js"></script>` is included so the year stamp and any nav-toggle behavior keeps working.

### 3. Honeypot CSS (`assets/css/styles.css`)

- A `BATCH 008` block at the end of the file defines `.form-hidden` with the standard visually-hidden recipe (`position: absolute; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden;`).
- The rule does NOT use `display: none` or `visibility: hidden`.
- No other selectors were touched in this batch — only the appended block. Earlier blocks (BATCH 006, BATCH 007) remain in place.
- The visible Kontakt form layout is unaffected: the honeypot wrapper takes a 1×1 absolute box, so the `.form-grid` two-column layout and `.btn-row` are preserved.

### 4. Raumvermietung flow (`raumvermietung.html`)

- The page is unchanged from Batch 007 closeout state.
- The `<a class="btn btn-primary" href="kontakt.html">Anfrage senden</a>` CTA is still present and still links to `kontakt.html`. It does NOT link to a separate `/raumvermietung-form/` route or open a second form.
- No new `<form>` element was added to this page.
- The room photo block, the three `.price-card` boxes (`Ausstattung`, `Konditionen`, `Zeiten`), and the lead paragraph are all unchanged.

### 5. Implementation plan honesty (`03_build/implementation_plan.md`)

- The Batch 008 `Current Status` block now describes the live HTML — the form attributes that landed, the existence of `danke/index.html`, the `.form-hidden` utility, and the unchanged Raumvermietung flow.
- Milestones 1, 2, 3, 4, 5 read DONE.
- Milestone 6 reads explicitly PENDING DEPLOY (or equivalent) — code review can verify the markup, but production verification still requires the human owner to deploy and walk the Netlify dashboard checklist. The plan must NOT claim production verification is already complete.
- Batch 007 milestones above are untouched.

### 6. Decision log (`05_governance/decision_log.md`)

- A new top block titled `2026-05-10 - Batch 008 implementation decisions` precedes the existing `2026-05-10 - Batch 008 planning decisions` block.
- Decisions cover, at minimum: the choice of clip-rect honeypot over `display: none`; the `danke/` subfolder + `../`-relative path strategy; the `noindex` meta on the success page; the scope of `required` (free-text fields only, not the always-defaulted `Thema` select); and the unchanged Raumvermietung flow.
- The earlier Batch 007 closeout / planning entries are intact below.

### 7. Deployment handoff (`06_deploy/netlify_forms_setup.md`)

- The checklist still describes the markup that actually shipped (form attributes, hidden `form-name`, honeypot wrapper, `/danke/` success route).
- The post-deploy steps still cover, in this order: redeploy, confirm form detection in the Netlify Forms tab, configure email notifications to `musikinsel-leipzig@gmx.de`, verify honeypot status, run a real production submission, check verified vs spam submissions, confirm `/danke/` resolves.
- The Raumvermietung end-to-end test (`Anfrage senden` → `Raumvermietung` topic → submit → `/danke/`) is still listed.

### 8. QA checklist (`03_build/qa_checklist.md`)

- The `Batch 008 Netlify Form Handling` section exists and matches the work that landed (form attributes, honeypot accessibility, `required` fields, `Thema` options, `/danke/` success route, Raumvermietung CTA flow, Netlify dashboard checks).

### 9. Out-of-scope check

Confirm the following are unchanged by this batch:

- Navigation labels and order across all eight pages.
- Typography (`Cormorant Garamond` + `Inter` link in `<head>`).
- Favicon links.
- Palette/tokens.
- All Batch 007 work: homepage hero order, team previews, Instrumente card set, Gebühren mobile pair-keeping + third value typography, Veranstaltungen vertical stack, Impressum lead removal, footer copy.
- `main.js` behavior — no new logic was added to this file in Batch 008.
- All image assets — no asset replacements or new derivatives.

### 10. Quick local sanity pass

Open `legacy_site/site/kontakt.html` and `legacy_site/site/danke/index.html` directly in a browser (file:// is fine) and confirm:

- Both pages render the standard header, nav, and footer with the brand mark visible.
- The Kontakt form layout is visually unchanged from before — the honeypot field is invisible to the eye, no extra empty paragraph or stray form row appears.
- Tabbing through the Kontakt form skips the honeypot input (because of `tabindex="-1"`) and reaches Name → E-Mail → Thema → Nachricht → Submit in that order.
- Submitting the form locally with empty Name/E-Mail/Nachricht is blocked by browser-native validation.
- The "Danke" page asset paths all resolve (no broken images, no broken stylesheet, no broken nav links — particularly check `../index.html`, `../kontakt.html`, `../assets/css/styles.css`, `../assets/js/main.js`).

## Output

Produce a structured review:

1. **Blocking issues** — anything that fails an acceptance gate (missing form attribute, broken `/danke/` page, honeypot using `display: none`, plan/decision-log overstating production verification, etc.).
2. **Should-fix before close** — visible regressions, scope creep, or accessibility gaps (e.g. honeypot label not actually labeling its input, missing `tabindex="-1"`, broken `../` path on the success page).
3. **Netlify dashboard checks still required** — items only the human owner can verify post-deploy: form detection in the Netlify Forms tab, notification email configured to `musikinsel-leipzig@gmx.de`, real production submission appears in Netlify and lands in the inbox, `/danke/` redirect on a real submit, Raumvermietung end-to-end flow.
4. **Nice-to-have / next-batch** — for example: should `/danke/` carry a small confirmation icon, should the form add `aria-describedby` text on the required fields, should the Raumvermietung CTA append `?fach=Raumvermietung` once a small JS preselect helper is acceptable, should the Kontakt page show a soft hint ("Antwort innerhalb von …") to set response-time expectations?
5. **Questions for the client** — none expected; the only real open item is the production verification, which is the human owner's responsibility per `06_deploy/netlify_forms_setup.md`.

Append the synthesis to `05_governance/reviews/review_synthesis.md`. Final acceptance still requires the production deploy and a real Netlify Forms submission test — code review alone cannot close Batch 008.
