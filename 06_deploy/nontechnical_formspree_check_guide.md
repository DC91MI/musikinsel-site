# Non-Technical Formspree Form Check Guide

This guide is for checking whether the Musikinsel Leipzig contact form works correctly with Formspree after the updated site has been deployed.

You need:

- access to the Formspree account that owns the `kontakt` form
- access to the email inbox `musikinsel-leipzig@gmx.de`
- a normal web browser

## Step 1 - Check The Formspree Form Settings

1. Log in to Formspree.
2. Open the form named `kontakt`.
3. Confirm the form endpoint is:

```text
https://formspree.io/f/mdavygdk
```

4. Confirm the target/notification email is:

```text
musikinsel-leipzig@gmx.de
```

5. Confirm **Restrict to Domain** is set to:

```text
musikinsel-leipzig.de
```

Do not include `https://` or a slash in the domain restriction field.

## Step 2 - Check The Live Pages

Open these pages:

```text
https://musikinsel-leipzig.de/
https://musikinsel-leipzig.de/kontakt
https://musikinsel-leipzig.de/danke/
```

Check that the pages load, the logo is visible, the Kontakt form is visible, and the Danke page says the message was received.

The navigation should show exactly: `Team`, `Instrumente`, `Gebühren`, `Veranstaltungen`, `Kontakt`, `Impressum`. There should be no `Raumvermietung` tab.

## Step 3 - Send A Real Test Message

1. Open:

```text
https://musikinsel-leipzig.de/kontakt
```

2. Fill in:
   - Name: `Test`
   - E-Mail: your own email address
   - Telefon: any real-looking number, for example `+49 341 1234567` (this field is optional)
   - Thema: `Allgemein`
   - Nachricht: `Testnachricht. Bitte ignorieren.`

3. Click **Nachricht senden**.
4. The browser should go to:

```text
https://musikinsel-leipzig.de/danke/
```

## Step 4 - Check Formspree And Email

1. In Formspree, open the `kontakt` form.
2. Open **Submissions**.
3. Confirm the test message appears.
4. Confirm the submission includes the `telefon` value you entered.
5. Open the inbox for `musikinsel-leipzig@gmx.de`.
6. Confirm the Formspree notification email arrives and shows the phone number.
7. If the email is missing, check spam.

If the message appears in Formspree but no email arrives, the website form is working and the email/notification setup needs attention.

## Final Checklist

- [ ] Homepage loads
- [ ] Kontakt page loads
- [ ] Danke page loads at `/danke/`
- [ ] Navigation shows no `Raumvermietung` tab
- [ ] Formspree endpoint is `https://formspree.io/f/mdavygdk`
- [ ] Restrict to Domain is `musikinsel-leipzig.de`
- [ ] Email alert goes to `musikinsel-leipzig@gmx.de`
- [ ] Test redirects to `/danke/`
- [ ] Test appears in Formspree
- [ ] Test email arrives
- [ ] The optional `Telefon` value appears in the Formspree submission and email when filled
