# Netlify Forms Setup And Verification

## Why The Current Error Happens

The deployed contact form currently posts back to the contact page. On a static site, a plain POST to `/kontakt` has no backend route unless Netlify Forms detects and handles the form during deploy.

The fix is code plus Netlify dashboard verification:

- mark the form as a Netlify Form in static HTML
- include a hidden `form-name`
- add honeypot spam protection
- redirect successful submissions to `/danke/`
- configure notification emails in Netlify

Official Netlify docs to check if anything changes:

- Forms setup: https://docs.netlify.com/manage/forms/setup/
- Form submissions: https://docs.netlify.com/manage/forms/submissions/
- Form notifications: https://docs.netlify.com/manage/forms/notifications/
- Spam filters: https://docs.netlify.com/manage/forms/spam-filters/

## Code Changes To Expect

The contact form in `legacy_site/site/kontakt.html` should look structurally like this:

```html
<form name="kontakt" method="POST" action="/danke/" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="kontakt">

  <p class="form-hidden">
    <label>Nicht ausfüllen: <input name="bot-field"></label>
  </p>

  <!-- visible fields stay here -->
</form>
```

There should also be a real success page at:

```text
legacy_site/site/danke/index.html
```

That page should be reachable on the deployed site as:

```text
https://musikinsel-leipzig.de/danke/
```

## Netlify Dashboard Steps After Deploy

1. Deploy the updated static site to Netlify.

2. In Netlify, open the Musikinsel site dashboard.

3. Go to **Forms**.

4. Confirm a form named `kontakt` appears.

5. If no form appears:
   - confirm the source HTML in the deploy includes `data-netlify="true"` before Netlify post-processing
   - remember that Netlify may strip the detection attribute from the final deployed HTML after it registers the form
   - confirm the form has a unique `name="kontakt"`
   - confirm form detection is enabled for the site
   - trigger a fresh deploy after the markup change

6. Open the `kontakt` form in the Forms tab.

7. Configure email notifications:
   - recipient: `musikinsel-leipzig@gmx.de`
   - choose a clear subject such as `Neue Nachricht von der Musikinsel Website`

8. Confirm spam prevention:
   - the form should show honeypot spam protection after Netlify detects the field
   - if not, verify the form has `netlify-honeypot="bot-field"` and an input named `bot-field`

9. Submit a real production test from:

```text
https://musikinsel-leipzig.de/kontakt.html
```

or, if Netlify pretty URLs are active:

```text
https://musikinsel-leipzig.de/kontakt/
```

10. During the test:
    - choose `Allgemein`
    - send a short message
    - confirm the browser redirects to `/danke/`
    - confirm the submission appears in Netlify Forms
    - confirm the notification email arrives at `musikinsel-leipzig@gmx.de`

11. Test Raumvermietung flow:
    - open `https://musikinsel-leipzig.de/raumvermietung.html`
    - click `Anfrage senden`
    - choose `Raumvermietung` in the contact form
    - submit
    - confirm `/danke/` and Netlify submission capture

## If Email Does Not Arrive

Check these in order:

1. Netlify Forms tab: confirm the submission exists.
2. Spam submissions: confirm the test was not filtered.
3. Email notification settings: confirm `musikinsel-leipzig@gmx.de` is the configured recipient.
4. Recipient mailbox spam folder.
5. Netlify form notification logs, if available in the dashboard.

If the submission appears in Netlify but no email arrives, the form code is working and the issue is notification configuration or email deliverability.

If the submission does not appear in Netlify, the issue is form detection or deploy configuration.

## Final Acceptance Check

- Form submission no longer returns `404`.
- `/danke/` loads after successful submission.
- The `kontakt` form appears in Netlify Forms.
- A test submission appears in Netlify Forms.
- The configured recipient receives an email notification.
- Raumvermietung inquiries are captured through the same `kontakt` form using the `Raumvermietung` topic.
