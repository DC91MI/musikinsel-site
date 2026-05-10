# Non-Technical Netlify Form Check Guide

This guide is for checking whether the Musikinsel Leipzig contact form works correctly after the updated site has already been deployed.

You do not need to upload files for this guide.

You need:

- access to the Netlify account that owns `musikinsel-leipzig.de`
- access to the email inbox `musikinsel-leipzig@gmx.de`
- a normal web browser

Official Netlify references:

- Netlify Forms setup: https://docs.netlify.com/manage/forms/setup/
- Form notifications: https://docs.netlify.com/manage/forms/notifications/
- Form submissions: https://docs.netlify.com/manage/forms/submissions/

## What We Are Checking

The website form has two parts:

1. The website form itself.
2. Netlify's form handling inside the Netlify dashboard.

The form is only fully working when all of these are true:

- the Kontakt page loads
- the Danke page loads
- submitting the form sends you to the Danke page
- Netlify shows the submission in the Forms area
- an email notification arrives at `musikinsel-leipzig@gmx.de`

## Step 1 - Check The Live Pages

Open these pages in your browser:

```text
https://musikinsel-leipzig.de/
https://musikinsel-leipzig.de/kontakt
https://musikinsel-leipzig.de/danke/
https://musikinsel-leipzig.de/raumvermietung.html
```

Check:

- the pages load
- the logo is visible
- the layout looks normal
- the Kontakt form is visible
- the Danke page says the message was received

If `/danke/` does not load, the latest version may not be published yet.

## Step 2 - Check That Netlify Detected The Form

1. Log in to Netlify.

2. Open the Musikinsel site.

3. Open **Forms**.

4. Look for a form named:

```text
kontakt
```

5. If the `kontakt` form is there, continue.

6. If the `kontakt` form is not there:
   - confirm the latest deploy is published
   - ask the technical person to check whether Netlify detected the form
   - do not continue to email testing yet

Important: Netlify may remove some form-code attributes from the final live HTML after it detects the form. That can be normal. What matters for a non-technical check is whether the form appears in Netlify under **Forms**.

## Step 3 - Check Email Notifications

Netlify can save form messages without sending email. So this step is important.

1. In Netlify, open the Musikinsel site.

2. Open **Forms**.

3. Open the form named `kontakt`.

4. Look for notification settings. Depending on Netlify's layout, this may be under:
   - **Notifications**
   - **Form notifications**
   - **Site configuration > Notifications**

5. Confirm there is an email notification going to:

```text
musikinsel-leipzig@gmx.de
```

6. If there is no email notification, add one.

7. Use a clear email subject, for example:

```text
Neue Nachricht von der Musikinsel Website
```

8. Save the notification.

## Step 4 - Send A Real Test Message

1. Open:

```text
https://musikinsel-leipzig.de/kontakt
```

2. Fill in:
   - Name: `Test`
   - E-Mail: your own email address
   - Thema: `Allgemein`
   - Nachricht: `Testnachricht. Bitte ignorieren.`

3. Click **Nachricht senden**.

4. The browser should go to:

```text
https://musikinsel-leipzig.de/danke/
```

If it goes to the Danke page, the website side of the form is behaving correctly.

## Step 5 - Check The Submission In Netlify

1. Go back to Netlify.

2. Open the Musikinsel site.

3. Open **Forms**.

4. Open the `kontakt` form.

5. Check that your test message appears there.

If the message appears in Netlify, the form submission was received by Netlify.

## Step 6 - Check The Email Inbox

1. Open the inbox for:

```text
musikinsel-leipzig@gmx.de
```

2. Look for the test message notification.

3. If it is not in the inbox, check the spam folder.

4. If the message appears in Netlify Forms but no email arrives, the form is working, but the email notification needs attention.

## Step 7 - Test Raumvermietung

1. Open:

```text
https://musikinsel-leipzig.de/raumvermietung.html
```

2. Click **Anfrage senden**.

3. You should arrive at the Kontakt page.

4. Fill in the form again.

5. Choose:

```text
Raumvermietung
```

as the Thema.

6. Submit the form.

7. Confirm the browser goes to `/danke/`.

8. Confirm the submission appears in Netlify Forms.

9. Confirm the notification email arrives.

## If Something Goes Wrong

### `/danke/` does not load

The latest site version may not be published.

Ask the technical person to check the latest deploy.

### The form submits but no message appears in Netlify

Netlify may not have detected the form.

Ask the technical person to check the form setup.

### The message appears in Netlify but no email arrives

The form is working, but the email notification is probably not set correctly.

Check:

- the email notification recipient is `musikinsel-leipzig@gmx.de`
- the inbox spam folder
- the Netlify form notification settings

### Raumvermietung does not preselect automatically

That is currently expected. The visitor should manually choose `Raumvermietung` in the Thema dropdown.

## Final Checklist

- [ ] Homepage loads
- [ ] Kontakt page loads
- [ ] Danke page loads at `/danke/`
- [ ] Netlify Forms shows `kontakt`
- [ ] Email notification goes to `musikinsel-leipzig@gmx.de`
- [ ] General test message redirects to `/danke/`
- [ ] General test message appears in Netlify Forms
- [ ] General test email arrives
- [ ] Raumvermietung button opens Kontakt
- [ ] Raumvermietung test message redirects to `/danke/`
- [ ] Raumvermietung test appears in Netlify Forms
- [ ] Raumvermietung test email arrives
