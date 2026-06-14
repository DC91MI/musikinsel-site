# Publish Process

## Trigger

Use the plain-language Formspree form-check guide after the site is deployed:

- `06_deploy/nontechnical_formspree_check_guide.md`

Preferred trigger:

- GitHub auto deploy, if the Netlify site is connected to the production GitHub branch.

Fallback trigger:

- manual drag-and-drop deploy of `legacy_site/site` in Netlify.

## Steps

See `06_deploy/nontechnical_formspree_check_guide.md`.

## Verification

At minimum:

- live homepage loads
- `kontakt.html` loads
- `/danke/` loads
- Formspree receives the `kontakt` submission
- a real production submission redirects to `/danke/`
- submission appears in Formspree
- Formspree email alert arrives at `musikinsel-leipzig@gmx.de`
- Raumvermietung flow works through the same Kontakt form

## Rollback

If a manual deploy breaks the site, open Netlify **Deploys** and restore the previous published deploy.

If a GitHub deploy breaks the site, revert or fix the GitHub commit and deploy again.
