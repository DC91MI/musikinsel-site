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
https://musikinsel-leipzig.de/raumvermietung.html
```

Check that the pages load, the logo is visible, the Kontakt form is visible, and the Danke page says the message was received.

## Step 3 - Send A Real Test Message

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

## Step 4 - Check Formspree And Email

1. In Formspree, open the `kontakt` form.
2. Open **Submissions**.
3. Confirm the test message appears.
4. Open the inbox for `musikinsel-leipzig@gmx.de`.
5. Confirm the Formspree notification email arrives.
6. If the email is missing, check spam.

If the message appears in Formspree but no email arrives, the website form is working and the email/notification setup needs attention.

## Step 5 - Test Raumvermietung

1. Open:

```text
https://musikinsel-leipzig.de/raumvermietung.html
```

2. Click **Anfrage senden**.
3. Fill in the Kontakt form.
4. Choose `Raumvermietung` as the Thema.
5. Submit.
6. Confirm `/danke/`, Formspree submission, and email alert.

## Final Checklist

- [ ] Homepage loads
- [ ] Kontakt page loads
- [ ] Danke page loads at `/danke/`
- [ ] Formspree endpoint is `https://formspree.io/f/mdavygdk`
- [ ] Restrict to Domain is `musikinsel-leipzig.de`
- [ ] Email alert goes to `musikinsel-leipzig@gmx.de`
- [ ] General test redirects to `/danke/`
- [ ] General test appears in Formspree
- [ ] General test email arrives
- [ ] Raumvermietung test redirects to `/danke/`
- [ ] Raumvermietung test appears in Formspree
- [ ] Raumvermietung test email arrives
