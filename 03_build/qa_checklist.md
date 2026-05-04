# QA Checklist

## Batch 003 Release Gates
- [ ] Primary navigation shows `Team`, `Raumvermietung`, and `Veranstaltungen`
- [ ] Redundant `Start` nav item is removed everywhere
- [ ] Browser tab/favicon uses the Musikinsel logo
- [ ] Shared head markup and font loading are consistent across touched pages

## Typography Checks
- [ ] `Cormorant Garamond` is used for display/headline roles
- [ ] `Inter` is used for body copy and UI controls
- [ ] Navigation, buttons, labels, and forms do not use `Cormorant Garamond`
- [ ] Title punctuation cleanup does not create awkward grammar or spacing

## Homepage Checks
- [ ] Homepage H1 is `Was uns auszeichnet`
- [ ] Homepage bullet list contains exactly the six approved points
- [ ] Homepage layout remains usable on mobile, tablet, and desktop after the content change

## Team and Contact Checks
- [ ] Team page heading reads `Studierte Musikpädagog:innen`
- [ ] Existing biography expand/collapse behavior still works
- [ ] Kontakt page no longer shows `Fächer` in the left column
- [ ] `Direkter Kontakt` box is replaced by a working map embed for `Nonnenstraße 42A, 04229 Leipzig`

## Raumvermietung Checks
- [ ] Box titles are removed
- [ ] Ausstattung copy matches the approved wording
- [ ] Konditionen copy matches the approved wording
- [ ] Third box is removed
- [ ] Green `Anfrage senden` CTA remains present and links to `kontakt.html`

## Gebühren Checks
- [ ] Monthly prices use the format `95€ pro Monat`
- [ ] Requested explanatory sentences are removed
- [ ] Green boxed labels are removed
- [ ] Third pricing block title is `Klavier, Cello und Gitarre - Gruppenunterricht`
- [ ] Third table is reduced to one column with `50 Minuten Gruppenunterricht` and `35`

## Batch 004 Gebühren Refinement
- [ ] Third pricing block no longer looks like a clipped single-column table
- [ ] Displayed price now includes a euro sign
- [ ] Third block is visually centered and balanced inside the `.price-card`
- [ ] First two pricing blocks remain unchanged
- [ ] No horizontal clipping or awkward side borders appear on mobile

## Batch 005 Combined Refinement
- [ ] Third pricing block now matches the same table family as the other pricing blocks
- [ ] Third pricing block includes `€` and is visually complete at desktop and mobile widths
- [ ] Instrumente page layout remains unchanged
- [ ] Instrument card images look sharper without changing card size or style
- [ ] Any new instrument image assets or `srcset` behavior load correctly

## Batch 007 Editorial And Layout Refinement
- [ ] Homepage starts with `Wer wir sind` / `Ein Musikstudio mit freundlicher Lernatmosphäre` and the supplied intro paragraph
- [ ] Homepage intro paragraph now says `Violin-, Klavier-, Gitarren-, Cello- und Gruppenunterricht ...`
- [ ] Homepage CTA order is preserved: `Probestunde anfragen`, then `Lehrkräfte kennenlernen`
- [ ] `Was uns auszeichnet` section still contains the approved six points and now appears after the intro + CTA block
- [ ] Homepage slideshow still opens with `assets/images/startseite/klavier.jpg`
- [ ] `instrumente.html` no longer shows a `Musiktheorie` card
- [ ] `Einstieg & Alter` uses the revised age text and occupies the freed card slot without layout drift
- [ ] Third Gebuehren value still reads `35€ pro Monat`
- [ ] Third Gebuehren value text size matches the equivalent value text sizing in the first two pricing tables
- [ ] On mobile, Gebühren duration labels stay paired with their corresponding prices instead of stacking all headers first and all prices afterwards
- [ ] `news.html` shows a vertical sequence on desktop and mobile: `Orchester ohne Noten`, then the Sommerkonzert invitation text card, then the Sommerkonzert poster
- [ ] `news.html` no longer falls back to a side-by-side desktop news layout
- [ ] `news.html` no longer shows a separate `Sommerkonzert` heading above the poster
- [ ] Veranstaltungen intro now begins `Wir laden Euch herzlich zu unserem Sommerkonzert 2025/2026 ein!`
- [ ] `news.html` includes a second visible news item using `assets/images/news/orchester_ohne_noten.jpg`
- [ ] `impressum.html` no longer shows the opening legal-summary sentence
- [ ] Footer text is updated consistently to `Instrumente & Einstieg`
- [ ] Footer summary sentence now uses `individuellen Unterricht`
- [ ] Team previews begin with the first real biography paragraph rather than the old short blurbs
- [ ] No `.price-tile` reference remains anywhere in `styles.css`
- [ ] Raumvermietung photo remains directly below the lead paragraph and before `Ausstattung`
- [ ] Raumvermietung photo is reduced to about 60% of its prior rendered size, centered, and not cropped
- [ ] `03_build/implementation_plan.md` no longer overstates the Team cleanup status

## Accessibility and Responsiveness
- [ ] Navigation remains keyboard-usable
- [ ] Embedded map does not overflow on narrow screens
- [ ] Pricing tables remain legible on mobile
- [ ] No new color-contrast issues are introduced by typography or CTA changes
