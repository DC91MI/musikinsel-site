# Musikinsel Leipzig - Project Handoff Context For Coding Agent

You are about to work in the Musikinsel Leipzig static website repository.

Read this handoff before reading the next numbered coding prompt. This file is orientation, not by itself an implementation task. Do not start changing code from this handoff alone unless the user explicitly asks you to.

## Project Identity

The project is a static website for Musikinsel Leipzig, a music studio / music school in Leipzig-Plagwitz.

The current public site is:

```text
https://musikinsel-leipzig.de/
```

The current implementation target in this repo is:

```text
legacy_site/site/
```

That folder contains the deployed static HTML/CSS/JS site. The older scaffold folder `07_site/` exists, but it is not the active production site for the current work.

## Development Method

This repo follows an artifact-first static-site workflow.

The core rule is:

> Progress means a durable artifact advances from one reviewable state to another.

That means code changes should usually be accompanied by updates to the relevant planning, QA, deployment, or governance files when the implementation changes the project state.

Before editing, read:

- `CLAUDE.md`
- `README.md`
- `glossary.md`
- `general_tasks_description.md`
- the relevant workspace `CONTEXT.md` files
- the current numbered coding prompt for the task
- any rails file named by that prompt

## Folder And Artifact Map

Use these folders deliberately:

- `00_brief/` - problem, audience, constraints, non-goals, success metrics
- `01_content/` - sitemap, page inventory, copy, assets, SEO notes
- `02_design/` - visual direction, design tokens, layout, components, accessibility
- `03_build/` - implementation plan, rails documents, QA checklist, performance/browser notes
- `04_launch/` - launch checklist, deployment notes, handoff summary
- `05_governance/` - decision log, assumptions, risks, review synthesis
- `06_deploy/` - hosting, Netlify, local setup, publish/check instructions
- `07_site/` - starter/static scaffold, currently not the active production target
- `90_legacy_review/` - legacy-site review workspace; currently mostly skeletal
- `legacy_site/site/` - active deployed static website
- `legacy_site/material/` - original supplied source documents and image material
- `prompts/for_coding_agent/` - implementation prompts
- `prompts/for_review_agent/` - matching review prompts

## Prompt Loop

The project uses a maker/reviewer loop:

1. A coding prompt in `prompts/for_coding_agent/` defines the exact task.
2. A coding agent implements it.
3. A review prompt in `prompts/for_review_agent/` verifies it.
4. The review synthesis is appended to:

```text
05_governance/reviews/review_synthesis.md
```

5. Important choices are logged in:

```text
05_governance/decision_log.md
```

Keep future prompts narrow and testable.

## Current Site Architecture

The active site is plain static HTML/CSS/JS:

- `legacy_site/site/index.html`
- `legacy_site/site/team.html`
- `legacy_site/site/instrumente.html`
- `legacy_site/site/gebuehren.html`
- `legacy_site/site/news.html`
- `legacy_site/site/kontakt.html`
- `legacy_site/site/raumvermietung.html`
- `legacy_site/site/impressum.html`
- `legacy_site/site/danke/index.html`
- `legacy_site/site/assets/css/styles.css`
- `legacy_site/site/assets/js/main.js`

There is no framework, no bundler, no backend, and no build step.

Do not introduce a framework, CMS, backend, Netlify Function, or AJAX form layer unless the next task explicitly asks for it and the reason is recorded in governance.

## Current Visual / UX System

Preserve the existing static site system:

- typography: Cormorant Garamond for headings, Inter for body/UI
- duplicated header/footer markup across static pages
- rounded card system and existing spacing rhythm
- plain JavaScript only for navigation, slideshow/lightbox, year stamp
- German public-facing copy

When changing shared header/footer/head markup, sweep all relevant static pages. There is no shared component system.

## Current Form State

Batch 008 converted the Kontakt form to Netlify Forms-compatible markup:

```text
legacy_site/site/kontakt.html
legacy_site/site/danke/index.html
06_deploy/netlify_forms_setup.md
06_deploy/nontechnical_formspree_check_guide.md
```

Current behavior:

- Batch 009 switches the active email-alert provider to Formspree endpoint `https://formspree.io/f/mdavygdk`.
- Netlify Forms can detect the earlier Batch 008 form, but Netlify email notifications required a paid plan in the user's setup.
- Formspree is now the provider to test for production contact submissions.
- `/danke/` exists as the success page.
- Raumvermietung still routes through the same Kontakt form; the visitor manually chooses `Raumvermietung` in the `Thema` dropdown.
- Formspree's dashboard should be restricted to `musikinsel-leipzig.de`.

Do not assume the Netlify email-alert path is viable unless a future prompt explicitly says to return to Netlify paid notifications.

## Likely Next Task

The next coding task may be to review, refine, or test the Formspree integration.

Formspree has been selected and implemented in Batch 009.

Before making further provider changes:

1. Verify the current provider docs and pricing from official sources.
2. Check whether the free plan supports:
   - email notifications
   - enough monthly submissions for a small music school
   - spam protection / honeypot
   - a custom thank-you redirect or equivalent success UX
   - GDPR / data-processing expectations appropriate for a German/EU business
3. Record the provider choice and tradeoffs in `05_governance/decision_log.md`.
4. Update deployment/operator docs in `06_deploy/`.
5. Keep the implementation static and simple.

## Formspree Heads-Up

As of the latest check before this handoff:

- Formspree's official site describes it as a form backend and email service for static HTML/JavaScript forms.
- Formspree has a free plan, but limits and features can change.
- Formspree honeypot spam filtering uses an input named `_gotcha` and is documented as available on all plans.
- Formspree's custom thank-you redirect is not available on the free plan, so Batch 009 uses a small JavaScript submit handler to redirect to `/danke/` after a successful Formspree JSON response.

Official docs to re-check during the implementation task:

- https://formspree.io/plans
- https://formspree.io/
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering
- https://help.formspree.io/articles/form-and-project-settings/thank-you-redirect

If the JavaScript redirect creates problems, options include:

- accept Formspree's default success page on the free plan
- refine the existing JavaScript submit handler
- choose another free provider whose terms better match the desired `/danke/` flow
- keep Netlify Forms as storage fallback and add a visible email link

Do not quietly remove `/danke/`; if the provider cannot support it for free, surface that as a decision.

## Provider Comparison Guidance

Possible providers to compare:

- Formspree
- Web3Forms
- FormSubmit

Prefer:

- official docs over blog posts
- a provider with clear privacy/security documentation
- no secret keys committed to public HTML unless the provider is designed for public static form access keys
- a normal HTML form POST if it preserves the user experience
- minimal JavaScript only if the provider requires it or if it preserves `/danke/` on a free plan

For a German site, do not ignore privacy implications. If a third-party processor is chosen, update the relevant legal/deployment notes and flag if the Impressum/privacy text needs a human/legal review.

## Files Most Likely To Change In The Next Task

Depending on the chosen provider:

- `legacy_site/site/kontakt.html`
- `legacy_site/site/danke/index.html`
- `legacy_site/site/assets/css/styles.css` only if form UI changes are needed
- `legacy_site/site/assets/js/main.js` only if the approved provider path requires JavaScript
- `03_build/implementation_plan.md`
- `03_build/qa_checklist.md`
- `05_governance/decision_log.md`
- `05_governance/reviews/review_synthesis.md` after review
- `06_deploy/netlify_forms_setup.md`
- `06_deploy/nontechnical_formspree_check_guide.md`
- potentially `prompts/for_coding_agent/011_*.md`
- potentially `prompts/for_review_agent/011_*.md`

## Quality Bar

For form-provider work, verify:

- no visitor gets a 404 on submit
- test message reaches the provider dashboard
- email alert arrives
- spam trap still exists if supported
- required fields still work
- visible field names and German labels remain stable
- Raumvermietung inquiry path still works
- no unrelated Batch 007 content regresses
- documentation clearly tells a non-technical user how to test the live form

Final acceptance should include a real production submission test.
