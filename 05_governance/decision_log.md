# Decision Log

## 2026-06-14 - Batch 009 implementation decisions

### Decision 1 - Switch email alerts from Netlify Forms to Formspree

**Context.** Batch 008 form submissions reached Netlify Forms, but Netlify email notifications required a paid Netlify plan in the user's setup. The user created a Formspree form endpoint: `https://formspree.io/f/mdavygdk`.

**Chosen direction.** The Kontakt form now posts to the Formspree endpoint. Netlify-specific attributes and hidden fields were removed from the public form markup.

**Rationale.** Formspree's free plan starts at 50 submissions/month and supports email targets, which is sufficient for the expected low-volume contact form.

**Impact.** Formspree becomes the active production submission/email-alert provider. Netlify Forms documentation is retained only as historical setup context.

### Decision 2 - Preserve `/danke/` with a small JavaScript enhancement

**Context.** Formspree's dashboard thank-you redirect is not available on the free plan. A plain HTML POST would therefore send visitors to Formspree's default thank-you page.

**Chosen direction.** Added a small `data-formspree-form` submit handler in `main.js` that posts `FormData` to Formspree with `Accept: application/json`, then redirects the visitor to `/danke/` when Formspree returns success.

**Rationale.** This keeps the free plan and preserves the site's existing success page without adding a framework, build step, or external JavaScript dependency. If JavaScript fails, the form still has a normal HTML POST fallback to Formspree.

**Impact.** `main.js` now has a narrowly scoped form handler in addition to the existing navigation/slideshow behavior.

### Decision 3 - Use Formspree's `_gotcha` honeypot

**Context.** Batch 008 used Netlify's `bot-field` honeypot. Formspree documents `_gotcha` as its honeypot field and makes it available on all plans.

**Chosen direction.** Replaced `bot-field` with `_gotcha` while keeping the existing visually hidden `.form-hidden` utility and keyboard/autofill protections.

**Impact.** Spam trap behavior now matches Formspree's documented static form convention.

### Decision 4 - Keep one shared Kontakt form for Raumvermietung

**Context.** The Raumvermietung page already routes users to Kontakt and the `Thema` dropdown includes `Raumvermietung`.

**Chosen direction.** No separate Raumvermietung form was added.

**Impact.** General contact and room-rental inquiries arrive through the same Formspree form and are distinguished by the `fach` field.

---

## 2026-05-10 - Batch 008 implementation decisions

### Decision 1 - Honeypot uses a clip-rect utility, not `display: none`

**Context.** The honeypot field has to be invisible to real visitors but still present in the DOM so spam bots fill it in. `display: none` would also hide it from Netlify's bot-trap heuristic family in some configurations, and is generally discouraged because it removes the node from the accessibility tree entirely.

**Chosen direction.** Added a single `.form-hidden` utility in `styles.css` (BATCH 008 block) that uses `position: absolute; clip: rect(0 0 0 0); height: 1px; width: 1px; margin: -1px; padding: 0; border: 0; overflow: hidden;`. The honeypot field is wrapped in `<p class="form-hidden">` and carries `tabindex="-1"` and `autocomplete="off"` on the input so keyboard users skip it and password managers don't try to fill it.

**Rationale.** This is the standard "visually hidden but still rendered" pattern. It keeps the input fully present for bots while removing it from the visible layout and the keyboard tab order. It also leaves room for future additions (e.g. accessible-only labels) without re-deriving a new utility.

**Impact.** One small CSS rule appended to `styles.css`. No layout change to the visible Kontakt form.

### Decision 2 - `danke/index.html` lives in a subdirectory and uses `../` relative paths

**Context.** Netlify's `action="/danke/"` resolves to `/danke/` after deploy, so the simplest static mapping is a folder with an `index.html`. That moves the success page one directory deeper than the rest of the site, which means relative asset paths from the existing shell (`assets/css/styles.css`, `assets/images/logo02.jpg`, `assets/js/main.js`) and inter-page links (`team.html`, `kontakt.html`, ...) need to be reachable from `legacy_site/site/danke/`.

**Chosen direction.** Used `../`-prefixed relative paths throughout the new `danke/index.html` (e.g. `../assets/css/styles.css`, `../index.html`, `../kontakt.html`). Did not switch the rest of the site to root-relative paths.

**Rationale.** Root-relative paths (`/assets/...`) would have broken local file:// previews used during development and would have introduced a footprint mismatch with the rest of the static shell. `../` paths work in both `file://` previews and on the Netlify deploy.

**Impact.** The `danke/` page renders identically to the other pages locally and in production. No changes needed to other pages' link strategy.

### Decision 3 - Add `<meta name="robots" content="noindex">` to the success page

**Context.** `/danke/` is a transactional confirmation page; it has no value as a search-result landing page and would only confuse users arriving from organic search.

**Chosen direction.** Added `<meta name="robots" content="noindex">` to `danke/index.html`'s `<head>`.

**Impact.** The page remains crawlable but should not appear in search results, which is the intended behavior for confirmation routes.

### Decision 4 - `required` on the three free-text fields, not on the `Thema` select

**Context.** The brief asks for name, email, and message to be required. The `Thema` select is a dropdown that always defaults to `Allgemein`, so it cannot be empty in practice and adding `required` would be redundant.

**Chosen direction.** Added the `required` attribute to `name`, `email` (already type-validated), and the `nachricht` textarea. Left the `Thema` select as-is.

**Impact.** The browser blocks empty submissions of the three free-text fields without changing the topic-selection UX or the existing seven `Thema` options.

### Decision 5 - Raumvermietung flow stays one-form, no markup change

**Context.** The brief and Decision 2 of the planning entry below both call for keeping a single Kontakt form for general and Raumvermietung inquiries. The Raumvermietung CTA already targets `kontakt.html`, and the `Thema` dropdown already includes `Raumvermietung`.

**Chosen direction.** Left `raumvermietung.html` untouched in this batch. No query parameter or anchor was added because the existing CTA + dropdown already produce a clear, JavaScript-free flow.

**Impact.** Raumvermietung inquiries continue to arrive through the same Netlify Forms submission stream with `fach=Raumvermietung` distinguishing them from general contact inquiries.

---

## 2026-05-10 - Batch 008 planning decisions

### Decision 1 - Use native Netlify Forms instead of adding backend code

**Context.** Production form submission currently fails with a `POST /kontakt` 404. The existing `kontakt.html` form posts back to the same static page and has no Netlify Forms detection markup.

**Chosen direction.** Batch 008 will keep the site static and use Netlify Forms markup: `data-netlify="true"`, a hidden `form-name`, honeypot spam protection, and a custom success route via `action="/danke/"`.

**Rationale.** The site is already hosted as a static Netlify site, and Netlify Forms is designed for this exact no-backend use case. Adding serverless functions, AJAX, or an outside form provider would increase complexity without solving a broader need.

**Impact.** The next coding pass should update `kontakt.html`, add `legacy_site/site/danke/index.html`, and avoid any backend or JavaScript submission layer.

### Decision 2 - Keep one shared Kontakt form for general and Raumvermietung inquiries

**Context.** `raumvermietung.html` currently uses an `Anfrage senden` CTA to send users to `kontakt.html`, and the Kontakt form already includes `Raumvermietung` in the `Thema` dropdown.

**Chosen direction.** Batch 008 will preserve that flow rather than creating a second visible form on Raumvermietung.

**Rationale.** One form keeps Netlify detection and notification setup simpler, avoids duplicated static form markup, and gives the owner one submissions stream in Netlify.

**Impact.** Raumvermietung inquiries will be identified through the existing `fach=Raumvermietung` field.

### Decision 3 - Add deployment documentation because code review cannot verify Netlify dashboard state

**Context.** Correct HTML is necessary but not sufficient. Netlify must detect the form on deploy, and notification emails must be configured in the site dashboard.

**Chosen direction.** Add `06_deploy/netlify_forms_setup.md` with dashboard checks, notification setup, spam/honeypot verification, and production test steps.

**Rationale.** This separates code acceptance from deployment acceptance. A reviewer can verify markup, but only a production deploy can prove Netlify has registered the form and is sending notifications.

**Impact.** Final acceptance for Batch 008 should include a real production submission test after deployment.

---

## 2026-05-04 - Batch 007 closeout implementation decisions

### Decision 1 - Team preview trim implemented as a leading-prefix strip per card

**Context.** Review found that each card's `<p class="bio-preview">` still opened with the older short editorial blurb (e.g. "Geboren in Cieza ...") before the first real biography paragraph. The fix had to remove that leading sentence without disturbing the rest of the bio that follows in `<details>`.

**Chosen direction.** A small Python text-replacement script searched for `<p class="bio-preview">` followed by each per-teacher leading sentence and replaced the match with `<p class="bio-preview">` only. All seven cards matched and were trimmed. The full bio is now: post-strip preview text + the unchanged `<details>` paragraphs; the dropped opening sentence (which was previously editorial scaffolding around the bio start) is intentionally not preserved elsewhere because the brief explicitly framed it as "the older short blurb" to remove.

**Rationale.** A leading-prefix strip is the smallest viable diff and matches the brief's framing exactly ("preview should no longer begin with sentences like ..."). Re-deriving each preview from the docx source would have produced different sentence breaks per teacher and risked further drift.

**Impact.** All seven previews now begin directly with the first real biography paragraph content. The `<details>` interaction and CSS are untouched.

### Decision 2 - Orchester ohne Noten card uses the existing poster card pattern with conservative copy

**Context.** A new `assets/images/news/orchester_ohne_noten.jpg` was dropped in but no accompanying copy was supplied. The brief explicitly forbade fabricating event details.

**Chosen direction.** Added the new item as a second `<article class="news-card news-card-poster">` immediately after the existing Sommerkonzert poster card. It carries an `<h3>Orchester ohne Noten</h3>` derived from the filename, the click-to-zoom anchor, and the no-crop image rendering. No date, no venue, no descriptive paragraph.

**Rationale.** Keeping the same `.news-card.news-card-poster` shell preserves the responsive grid behavior. The conservative `<h3>` title is needed to give the card a visible accessible label without inventing event detail.

**Impact.** Veranstaltungen page now shows two visible news entries. The Sommerkonzert poster remains the first item.

### Decision 3 - Raumvermietung image becomes a constrained, centered, uncropped photo card

**Context.** The brief asked for the inserted room photo to be smaller (about 60% of its previous rendered size), centered, and uncropped, while staying in the same DOM location.

**Chosen direction.** Updated `.room-photo` CSS to:
- `width: min(100%, 480px)` and `margin-left/right: auto` (centered, narrower than the previous full-card width)
- `padding: 0; overflow: hidden; background: var(--surface-2)` (the photo fills the card edge-to-edge with a neutral fallback)
- inner `<img>`: `width: 100%; height: auto; aspect-ratio: auto; object-fit: contain; max-height: none; border-radius: 18px` (intrinsic ratio preserved, never cropped, never letterboxed below the prior 620px cap)

**Rationale.** Switching from `cover` to `contain` removes any chance of cropping the original image. Removing the `max-height: 620px` and clamping the *width* keeps the aspect ratio honest. The `min(100%, 480px)` width is a practical midpoint between "about 60% of the prior card width" and the desktop container — it reads as visually intentional on both desktop and mobile.

**Impact.** The Raumvermietung photo now sits centered, smaller, and uncropped above the `Ausstattung` card, with no other Raumvermietung markup changes.

### Decision 4 - Closeout housekeeping landed inside the existing Batch 007 milestones

**Context.** The closeout brief combines genuine carry-forward review fixes (Team previews, plan honesty) with three small client tweaks (homepage intro, Veranstaltungen lead, Raumvermietung photo) and one additive change (the new news card). To avoid milestone fragmentation the planner asked all of this to land inside Batch 007 rather than opening a new batch.

**Chosen direction.** Implementation plan Milestones 6 and 8 are now both DONE. The plan no longer claims a verified state ahead of the code; the Current Status block reflects the live HTML.

**Impact.** Batch 007 closes cleanly with one consolidated record instead of a hanging review-findings document plus a Batch 008 stub.

### Decision 5 - Veranstaltungen now uses a single-column editorial stack to distinguish the two visible items

**Context.** After the closeout pass, the `news.html` markup already contained the desired content order (`Orchester ohne Noten`, then the Sommerkonzert invitation copy, then the Sommerkonzert poster). But the desktop page still inherited the old `.news-grid { grid-template-columns: repeat(2, ...) }` rule, so the two event items remained side by side and visually harder to distinguish. The client also called out that the "one-liner description" still appeared to belong to the wrong item.

**Chosen direction.** Kept the reordered HTML and added a narrow scoped CSS override:
- `news-grid news-grid-stack` forces `grid-template-columns: 1fr`
- the stack is width-clamped and centered with `max-width: 780px; margin-left/right: auto`
- the Sommerkonzert invitation copy lives in its own `.news-card.news-card-copy` between the two poster cards

**Rationale.** A page-specific stack override is the smallest fix that preserves the existing card language, keeps mobile behavior intact, and makes the two visible event items read as clearly separate entries on desktop.

**Impact.** Veranstaltungen now reads top-to-bottom on all breakpoints: `Orchester ohne Noten`, then the Sommerkonzert invitation text, then the Sommerkonzert poster. The `Orchester ohne Noten` card remains title + image only, with no invented descriptive body copy.

---

## 2026-05-04 - Batch 007 closeout planning decisions

### Decision 1 - Finish Batch 007 in one pass by combining the open review findings with the latest content/image tweaks

**Context.** Review found that the Team preview cleanup did not actually land and that `03_build/implementation_plan.md` now overstates the current state. The client also added three narrow follow-up requests: update one homepage sentence, tighten the opening Veranstaltungen sentence, and reduce/center the Raumvermietung image without cropping it.

**Chosen direction.** Treat these as one closeout pass inside Batch 007 rather than opening a new milestone:
- correct the Team previews
- correct the implementation plan wording
- update the homepage intro sentence to `...Cello- und Gruppenunterricht...`
- update the Veranstaltungen lead to start `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
- resize/restyle the Raumvermietung image so it is smaller, centered, and uncropped

**Rationale.** These are all narrow acceptance-closeout changes on already-touched files. Keeping them in Batch 007 avoids fragmentation and lets the milestone close cleanly once the review findings are actually resolved.

**Impact.** The next coding pass should preserve the already-shipped structure and asset placements, but refine the copy, the room-photo presentation, and the Team/plan accuracy gap.

### Decision 2 - New `orchester_ohne_noten.jpg` should ship as a second visible Veranstaltungen item with minimal invented content

**Context.** A new image asset has been dropped into `legacy_site/site/assets/images/news/orchester_ohne_noten.jpg`, but no accompanying text/date/location copy exists in the repo or the latest user message.

**Chosen direction.** Add it as a second visible news item in `news.html` using the existing news-card system. If no other source copy is found during implementation, use a conservative placeholder treatment derived from the filename:
- title `Orchester ohne Noten`
- image visible
- no invented date, venue, or descriptive paragraph

**Rationale.** This lets the site surface the asset now without fabricating editorial details that were not supplied.

**Impact.** The next coding pass should preserve the Sommerkonzert poster card as the first visible item and add the new image card alongside/below it within the current news grid.

## 2026-05-04 - Batch 007 implementation decisions

### Decision 1 - Homepage hero columns reordered in place; existing `hero-stage` skeleton kept

**Context.** The brief asked for the homepage to begin with a "Wer wir sind" introduction + CTAs, and only after that surface the `Was uns auszeichnet` value-proposition section.

**Chosen direction.** Inside the existing `<section class="hero-stage">` left-column stack, the two `.hero-intro` and `.hero-overview` blocks were swapped: `.hero-intro` now carries the `Wer wir sind` eyebrow, the `Ein Musikstudio mit freundlicher Lernatmosphäre` H1, the supplied long intro paragraph (the two prior paragraphs merged into one), and the two CTA buttons. `.hero-overview` now carries the `Musikunterricht in Leipzig-Plagwitz` eyebrow, the `Was uns auszeichnet` H2, and the existing six-bullet `<ul class="hero-list">`.

**Rationale.** Reordering inside the established `hero-stage-text` container preserves the sticky panel behavior, the responsive collapse at 980px, and the spacing rhythm. No new section, no markup outside the existing left column.

**Impact.** The H1 of the homepage is now `Ein Musikstudio mit freundlicher Lernatmosphäre`. `Was uns auszeichnet` was demoted to H2 to keep one H1 per page (the brief was about ordering, not about which level the heading sits at). The slideshow continues to start with `klavier.jpg` per the existing in-place edit.

### Decision 2 - Gebühren mobile pair-keeping via CSS `order` rather than markup change

**Context.** The Gebühren tables use a flat 6-children grid (3 heads then 3 cells). At ≤760px the grid collapses to one column, so the visual order became: head1, head2, head3, cell1, cell2, cell3 — breaking the pairing.

**Options considered.**
- (a) Wrap each `head + cell` pair in a `.pricing-pair` div; restructure desktop grid accordingly.
- (b) Keep the flat structure; use the CSS `order` property on the mobile breakpoint to interleave children to: head1, cell1, head2, cell2, head3, cell3.

**Chosen direction.** (b). On `@media (max-width: 760px)` each `.pricing-head` and `.pricing-cell` was given an explicit `order` value (1–6) so the existing grid items lay out as proper `head/cell` pairs without changing the markup of any of the three tables. The `.pricing-table-single` variant has only two children and is unaffected by the `order` rules (selectors target nth-child counts beyond 2).

**Rationale.** A pure-CSS fix avoids touching the HTML of three tables and keeps the desktop look untouched. The existing per-cell `border-bottom: 2px solid #111` already provides a visible separation between successive pairs, so no extra spacing rules were needed.

**Impact.** Each duration label now sits directly above its price on phone-width screens. Desktop / tablet rendering is unchanged.

### Decision 3 - Third Gebühren value typography reverted to the shared `.pricing-cell` defaults

**Context.** Batch 005 had bumped `.pricing-table-single .pricing-cell` to `font-size: 1.6rem; font-weight: 600; padding: 1.4rem 0.75rem;` so the single-cell variant did not look thin. The brief now asks the third value to match the first two tables' value sizing.

**Chosen direction.** Removed the `.pricing-table-single .pricing-cell` typography override. The cell now inherits the standard `.pricing-cell` styling (1.2rem, default weight, 1.15rem 0.75rem padding) — identical to the values in the first two tables.

**Impact.** `35€ pro Monat` now renders at the same size and weight as `95€ pro Monat`, `120€ pro Monat`, etc.

### Decision 4 - Stale `.price-tile` CSS comment marker removed

**Context.** The Batch 005 retirement of `.price-tile*` left a one-line comment marker referring to the dead component. Review flagged it.

**Chosen direction.** Deleted the comment block entirely.

**Impact.** No `.price-tile` reference remains in the repo.

### Decision 5 - News poster card now leans on its image alone, no card-level title

**Context.** The brief asked to remove the `Sommerkonzert` heading above the poster and add an invitation paragraph below the page hero.

**Chosen direction.** Moved the invitation paragraph into the page hero as a `.lead` (consistent with other pages' lead style). The `<h3>` inside the poster news card was deleted; the card now holds only the click-to-zoom anchor wrapping the poster image. Existing `.news-card-poster` CSS keeps the no-crop full-poster rendering.

**Impact.** Veranstaltungen page reads: hero (eyebrow + H1 + invitation paragraph) → poster card. Cleaner editorial flow without a redundant card title.

### Decision 6 - Footer copy refresh applied site-wide via a single sweep

**Context.** Two strings needed site-wide replacement: the tagline summary (`...persönliches Lernen...` → `...individuellen Unterricht...`) and the Schnellzugriff link label (`Fächer & Einstieg` → `Instrumente & Einstieg`).

**Chosen direction.** Single Python text-replacement sweep over all eight `legacy_site/site/*.html` files. Both strings appear once per file inside the duplicated footer markup; both swaps applied successfully on every page.

**Impact.** All eight pages now carry the new tagline and the renamed footer link.

---

## 2026-05-04 - Batch 007 planning decisions

### Decision 1 - Homepage should introduce the studio before repeating the value-proposition list

**Context.** The current homepage opens directly with the `Was uns auszeichnet` structure. The next client brief wants the page to begin with a short "who we are" introduction, then the CTAs, and only afterwards the existing value-proposition section.

**Chosen direction.** Treat the new `Wer wir sind` / `Ein Musikstudio mit freundlicher Lernatmosphäre` block as the first content section on `index.html`, followed by the existing CTA row, followed by the existing `Was uns auszeichnet` section with the six approved bullets.

**Rationale.** This preserves the strong CTA and value-proposition content already on the page while giving visitors a clearer studio introduction before the marketing list.

**Impact.** The next coding pass should reorder and relabel the top homepage sections without redesigning the rest of the page.

### Decision 2 - Instrumente should trade the Musiktheorie card for onboarding information, not add a new layout pattern

**Context.** The client now wants the `Musiktheorie` card removed entirely and the `Einstieg & Alter` content moved into that freed slot with revised age-copy wording.

**Chosen direction.** Keep the existing six-card grid and current visual system, but reduce the content set to five instrument cards plus one onboarding card (`Einstieg & Alter`) occupying the former `Musiktheorie` slot.

**Rationale.** This solves the content-priority request without introducing new grid behavior or changing the established card styling.

**Impact.** `instrumente.html` changes are content- and ordering-only; image sizing, card dimensions, and spacing should remain untouched.

### Decision 3 - The third Gebuehren table needs typographic normalization, not structural redesign

**Context.** The content of the third pricing block is already correct (`35€ pro Monat`), but its value text currently appears larger than the equivalent values in the first two tables.

**Chosen direction.** Limit the change to typography normalization so the third value visually matches the other price rows while keeping the single-column table structure introduced in Batch 005.

**Rationale.** The problem is consistency, not markup or layout. A narrow text-size correction keeps the family intact.

**Impact.** The next coding pass should avoid touching the first two tables and should not reintroduce any alternative component for the third block.

### Decision 4 - Veranstaltungen keeps the poster card and gains a short invitation paragraph

**Context.** The Sommerkonzert poster treatment from Batch 006 is correct, but the client now wants a short invitation paragraph added and the redundant `Sommerkonzert` heading above the image removed.

**Chosen direction.** Preserve the poster asset, link behavior, and no-crop image treatment; add the invitation copy near the hero and remove the extra card heading above the poster.

**Rationale.** The poster remains the primary content object, while the paragraph provides enough context without turning the card back into a mixed-content news teaser.

**Impact.** `news.html` changes stay content-only; no new assets or CSS systems should be introduced unless needed for spacing.

### Decision 5 - Footer copy updates are sitewide and the two open review findings should close in this same batch

**Context.** The next brief includes footer copy changes that must appear consistently across the duplicated static footer markup. At the same time, two recent review findings remain open: the stale `.price-tile` CSS comment and the Team-page preview text mismatch.

**Chosen direction.** Batch 007 will carry those review cleanups forward explicitly:
- footer wording updates on every page using the shared footer markup
- removal of the lingering `.price-tile` reference in `styles.css`
- completion of the Team preview restructuring so previews begin with the first real biography paragraphs

**Rationale.** This keeps the next coding pass honest: the site moves forward on new client requests while also closing the small-but-real quality gaps already identified in review.

**Impact.** Batch 007 spans multiple HTML files plus a tiny CSS cleanup, but remains fully in plain static markup/CSS territory.

### Decision 6 - Two image-related requests were applied directly and are now preservation constraints

**Context.** After Batch 007 planning, two additional image requests came in: the new `klavier.jpg` should be the first homepage carousel image, and `Raumvermietung.jpg` should appear on the Raumvermietung page between the lead paragraph and the `Ausstattung` card.

**Chosen direction.** Those two edits were applied directly in the live site state:
- `assets/images/startseite/klavier.jpg` is now the explicit first item in the `heroSlides` array and the initial homepage slide source
- `assets/images/instrumente/Raumvermietung.jpg` is now rendered as a `photo-card room-photo` block immediately below the Raumvermietung lead paragraph

**Rationale.** Both were narrow, deterministic content placements and did not need a separate milestone.

**Impact.** The next coding pass should preserve these two changes and focus only on the remaining Batch 007 work.

### Decision 7 - Gebühren needs a mobile-only pairing fix, not a new desktop pricing design

**Context.** The latest phone screenshot shows that the current Gebühren responsive rule stacks all `pricing-head` elements first and all `pricing-cell` elements afterwards. That technically fits the narrow width, but it breaks the semantic pairing between a lesson duration and its price.

**Chosen direction.** Treat this as a mobile-layout bug. The next coding pass should preserve the current desktop/tablet pricing-table family, but change the narrow-screen behavior so each duration label remains visually grouped with its corresponding price.

**Rationale.** The issue is not the desktop component design; it is the small-screen collapse logic. Fixing the pairing avoids unnecessary redesign while solving the real usability problem.

**Impact.** Batch 007 now includes a Gebühren mobile responsiveness gate in addition to the previously planned third-value text-size normalization.

## 2026-05-03 - Batch 006 implementation decisions

### Decision 1 - Team previews now hold the merged "first paragraph", editorial status hooks dropped

**Context.** Batch 002 had stored each card's preview as a 1-sentence editorial summary plus an inline status hook (`Ab März 2025 in Elternzeit.`, `Seit 2022 Teil des Teams.`, `Seit 2020 an der Musikinsel.`). Batch 006 wants the actual first paragraph of the bio in the preview, with the rest of the bio in `<details>`.

**Chosen direction.** For each of the seven cards, the new `<p class="bio-preview">` holds the merger of the previous preview's factual prefix (with the editorial status hook stripped) and the previous first `<details>` paragraph. The `<details>` block now starts at what was previously its second paragraph — Maria, Delfim, Nuno, Raúl all retain two `<p>` blocks under `siehe mehr`; Paula and Annegret retain one each (their bios are shorter).

**Rationale.** The brief asked for the first real biography paragraph as the preview, not editorial summarization. The Batch 002 editorial status hooks were not part of the source `legacy_site/material/Unser Team.docx` and were therefore dropped to match the brief verbatim.

**Impact.** Team page previews are noticeably longer; mobile rendering keeps working since `bio-preview` has no width clamp. The `<details>` interaction and CSS are untouched.

### Decision 2 - Gebühren bottom block consolidated into a single titled `Konditionen` price-card

**Context.** The brief explicitly preferred one consolidated information block over the three separate `Vertrag` / `Unterrichtsfrequenz` / `Abrechnung` cards.

**Chosen direction.** The three `feature-card` entries inside `card-grid` were replaced by a single `<article class="price-card">` containing an `<h2>Konditionen</h2>` and a `<ul class="plain-list">` of the four exact bullet strings supplied. The `card-grid` wrapper was dropped since one card needs no grid; the section now uses a plain `.container`.

**Rationale.** Reuses the existing `.price-card` shell and the `.plain-list` style introduced in Batch 003 for Raumvermietung. Same border-radius/shadow/padding language as the rest of the page; no new CSS required.

**Impact.** Gebühren reads as one policy block at the bottom rather than three peer marketing cards. The four bullets sit cleanly inside a familiar component.

### Decision 3 - Sommerkonzert news card uses a poster-sized full-aspect image with a click-to-zoom link

**Context.** The brief asked to remove the existing `Tag der offenen Tür` news card, render `legacy_site/site/assets/images/news/Kopie von sommerkonzert.pdf` to image, and surface the whole poster.

**Chosen direction.** Used PyMuPDF (`fitz`) to rasterize the single PDF page at 2× zoom (2381×3368), then Pillow to downscale to 1200×1697 JPEG (q=86, progressive, optimized) at `legacy_site/site/assets/images/news/sommerkonzert-2026.jpg` (~200 KB). The news markup uses a new `.news-card-poster` modifier that overrides `.news-card img`'s `aspect-ratio: 16/10; object-fit: cover` (which would crop the poster) — instead the poster image keeps its natural aspect ratio and is wrapped in an anchor opening the full file in a new tab.

**Rationale.** A poster with cropped content is not informative. Disabling the aspect-ratio crop for this single card class lets the entire poster show without redesigning the news grid system or the cover crop on future news cards.

**Impact.** New JPG asset ~200 KB. New `.news-card-poster` and `.news-poster-link` selectors at the end of `styles.css` (BATCH 006 block). Original `Kopie von sommerkonzert.pdf` retained on disk.

### Decision 4 - Kontakt `Thema` select drops `Musiktheorie` and adds `Gruppenunterricht` + `Raumvermietung`

**Context.** Per the brief's exact list. The old `Musiktheorie` topic is removed because it no longer maps to a current offering on the price tables, and the two new entries route inquiries the site now supports.

**Impact.** No layout change; the seven new options match the brief verbatim, in order.

---

## 2026-05-03 - Batch 006 planning decisions

### Decision 1 - Team previews should now use the first real biography paragraph

**Context.** The client no longer wants short editorial summary blurbs above `siehe mehr`. They want each teacher card to begin directly with the first real paragraph of the biography, with the rest revealed on expansion.

**Chosen direction.** Batch 006 will move the first full biography paragraph into the visible preview area for every teacher and keep only the remaining paragraphs inside `<details>`.

**Rationale.** This keeps the current accessible `siehe mehr` interaction while making the page feel more substantial and less summarized.

**Impact.** The next coding pass should change text placement, not the overall team-card component or the expand/collapse behavior.

### Decision 2 - Gebühren bottom conditions should become one consolidated block

**Context.** The client wants the three smaller bottom cards on the Gebühren page removed and replaced by one unified `Konditionen` area with four distinct points.

**Chosen direction.** Treat this as one consolidated information block rather than preserving the three-card split.

**Rationale.** The requested content reads as one policy block, not three peer marketing cards. Consolidating it reduces fragmentation and matches the instruction more closely.

**Impact.** The next coding pass may replace the current three-card layout in that area with one wider card/list, while keeping the rest of the Gebühren page intact.

### Decision 3 - Do not revisit already-correct Instrumente image state

**Context.** The latest instruction note repeated the Cello / Musiktheorie swap, but the user explicitly clarified that this is already implemented and should be treated as solved.

**Chosen direction.** Exclude `instrumente.html` from this batch entirely.

**Rationale.** Avoids churn and protects the current correct state.

**Impact.** The next coding pass should not touch the Instrumente page.

---

## 2026-04-30 - Batch 005 implementation decisions

### Decision 1 - Third Gebühren block returned to `.pricing-table.pricing-table-single`, custom `.price-tile` retired

**Context.** The client rejected the custom Batch 004 price-tile direction because it looked too different from the other pricing tables.

**Chosen direction.** Batch 005 restored the third pricing block to the shared `.pricing-table` family with a corrected one-column variant.

**Rationale.** The problem was inconsistency, not the need for a separate component family.

**Impact.** The third pricing block once again matches the larger table family while remaining narrower and centered.

---

(Older decision entries continue below unchanged.)
