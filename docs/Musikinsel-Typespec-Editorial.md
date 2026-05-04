# Musikinsel Leipzig — Typografie-Spezifikation

**Richtung 01 · Editorial**
Display: **Cormorant Garamond** · Text: **Inter**

Diese Spezifikation richtet sich an die Webentwicklung. Sie beschreibt die zu verwendenden Schriftarten, Schnitte, Größen, Farben und CSS-Snippets zum direkten Übernehmen.

---

## 1. Schriftfamilien

| Rolle | Familie | Quelle | Schnitte |
|---|---|---|---|
| Display / Headlines | **Cormorant Garamond** | Google Fonts | 400, 500, 600 (regular & italic) |
| Text / UI / Body | **Inter** | Google Fonts | 300, 400, 500, 600 |

Beide Schriften sind kostenlos über Google Fonts verfügbar (SIL Open Font License) und decken Umlaute (ä ö ü ß) sowie deutsche Diakritika vollständig ab.

### Einbindung (HTML `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Self-Hosting (empfohlen für DSGVO-Konformität)

Statt der Google-Fonts-CDN können die Schriftdateien lokal gehostet werden. Über [google-webfonts-helper](https://gwfh.mranftl.com) lassen sich `.woff2`-Dateien plus `@font-face`-CSS herunterladen. Beispiel:

```css
@font-face {
  font-family: 'Cormorant Garamond';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/cormorant-garamond-v16-latin-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url('/fonts/inter-v13-latin-300.woff2') format('woff2');
}
/* …weitere Gewichte analog */
```

---

## 2. Farbpalette (passend zur Typo)

| Token | Hex | Verwendung |
|---|---|---|
| `--bg` | `#f7f3ec` | Hintergrund (warmes Off-White) |
| `--card` | `#fffaf2` | Karten / hervorgehobene Bereiche |
| `--ink` | `#2a2722` | Fließtext, Headlines |
| `--muted` | `#6c655c` | Sekundärer Text |
| `--rule` | `#e6dfd2` | Trennlinien, Borders |
| `--accent` | `#7a4a2b` | Eyebrows, Akzent-Links, Icons |

```css
:root{
  --bg:#f7f3ec;
  --card:#fffaf2;
  --ink:#2a2722;
  --muted:#6c655c;
  --rule:#e6dfd2;
  --accent:#7a4a2b;
}
```

---

## 3. Type-Scale

| Stil | Schrift | Gewicht | Größe (Desktop) | Zeilenhöhe | Letter-Spacing |
|---|---|---|---|---|---|
| **Hero / H1** | Cormorant Garamond | 500 | 64 px | 1.05 | −0.012em |
| **H2 / Sektionstitel** | Cormorant Garamond | 500 | 38 px | 1.15 | normal |
| **H3 / Karten-Titel** | Cormorant Garamond | 600 | 24 px | 1.25 | −0.005em |
| **Eyebrow / Kleinkapitel** | Inter | 500 | 12 px | 1.4 | 0.28em, ALL CAPS |
| **Body** | Inter | 300 | 17 px | 1.7 | normal |
| **Body Strong** | Inter | 500 | 17 px | 1.7 | normal |
| **Small / Meta** | Inter | 400 | 13 px | 1.5 | 0.04em |
| **Pull-Quote** | Cormorant Garamond *Italic* | 400 | 30 px | 1.35 | normal |
| **Button** | Inter | 500 | 13 px | 1 | 0.18em, ALL CAPS |

> **Faustregel:** Cormorant Garamond ist eine fein gezeichnete Renaissance-Antiqua. **Niemals** unter 22 px einsetzen — bei kleineren Größen wird sie spinnenartig dünn. Für alles Lesbarkeits-Kritische: Inter.

### Mobile-Skalierung (≤ 760 px)

- Hero / H1: 64 px → **40 px**
- H2: 38 px → **28 px**
- Body: 17 px → **16 px**

```css
@media (max-width: 760px){
  .h1 { font-size: 40px; }
  .h2 { font-size: 28px; }
  .body { font-size: 16px; }
}
```

---

## 4. CSS-Klassen (kopierfertig)

```css
body {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 300;
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

.h1 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
  font-size: 64px;
  line-height: 1.05;
  letter-spacing: -0.012em;
  color: var(--ink);
  margin: 0 0 20px;
}
.h1 em { font-style: italic; font-weight: 500; }

.h2 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
  font-size: 38px;
  line-height: 1.15;
  margin: 0 0 16px;
}

.h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.005em;
  margin: 0 0 8px;
}

.eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 14px;
}

.body {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink);
  max-width: 62ch;
}

.small {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.pull-quote {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 400;
  font-style: italic;
  font-size: 30px;
  line-height: 1.35;
  color: var(--ink);
  border-left: 2px solid var(--accent);
  padding-left: 24px;
  max-width: 50ch;
}

.btn {
  display: inline-block;
  padding: 14px 22px;
  border: 1px solid var(--ink);
  color: var(--ink);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.btn--solid {
  background: var(--ink);
  color: var(--card);
}
```

---

## 5. Verwendungsregeln

1. **Hierarchie:** Pro Seite **eine** H1. Weitere Überschriften absteigend (H2 → H3).
2. **Eyebrows:** Stehen **immer** über einer H1 oder H2 (nicht für sich allein), in `--accent`. Großbuchstaben, weit gesperrt.
3. **Italic in Headlines:** Cormorant kursiv eignet sich für ein bis zwei Wörter zur Betonung („Persönlicher Unterricht mit *musikalischer Tiefe*"). Nicht für ganze Sätze.
4. **Zeilenlänge:** Body max. 62 Zeichen pro Zeile (`max-width: 62ch`). Pull-Quotes max. 50 Zeichen.
5. **Cormorant nie für UI:** Buttons, Form-Labels, Navigation, Captions → **immer Inter**.
6. **Akzentfarbe sparsam:** `--accent` nur für Eyebrows, kleine Hervorhebungen, Icons. Niemals für H1/H2.
7. **Kein Underline auf Body-Links** im Fließtext — stattdessen `color: var(--accent)` + `border-bottom: 1px solid currentColor`.
8. **Typografische Anführungszeichen** verwenden: „…" (deutsch) oder «…» — **nicht** "…".
9. **Halbgeviertstrich** (–) für Bereichsangaben („Mo–Fr"), **Geviertstrich** (—) für Einschübe.
10. **Geschützte Leerzeichen** (`&nbsp;`) zwischen Zahl und Einheit, z. B. „4&nbsp;Lebensjahr", „17&nbsp;€".

---

## 6. Beispiel-Markup

```html
<section>
  <p class="eyebrow">Musikunterricht in Leipzig-Plagwitz</p>
  <h1 class="h1">Persönlicher Unterricht mit <em>musikalischer Tiefe.</em></h1>
  <p class="body">
    Die Musikinsel ist ein Musikstudio im Leipziger Stadtteil
    Plagwitz. Angeboten werden Violin-, Klavier-, Gitarren-, Cello-,
    Musiktheorie- und Gehörbildungsunterricht für Kinder, Jugendliche
    und Erwachsene.
  </p>
  <a class="btn btn--solid" href="/kontakt">Probestunde anfragen</a>
  <a class="btn" href="/team">Lehrkräfte kennenlernen</a>
</section>

<blockquote class="pull-quote">
  „Die Kompetenz der Musik-Pädagog:innen ist beeindruckend —
  Internationalität und Einfühlsamkeit spielen eine große Rolle."
</blockquote>
```

---

## 7. Performance & Best Practices

- **`font-display: swap`** verwenden, damit Text während des Font-Ladens lesbar bleibt.
- **Nur benötigte Gewichte laden** — die obige `<link>`-URL ist bereits minimiert.
- **Subset auf `latin`** reicht für Deutsch (inkl. ä ö ü ß).
- **Preload kritischer Fonts** bei Self-Hosting:
  ```html
  <link rel="preload" href="/fonts/inter-v13-latin-300.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/cormorant-garamond-v16-latin-500.woff2" as="font" type="font/woff2" crossorigin>
  ```
- **Fallback-Stack** mit ähnlichen Metriken angeben, um Layout-Shift zu vermeiden:
  - Serif-Fallback: `'Cormorant Garamond', Georgia, 'Times New Roman', serif`
  - Sans-Fallback: `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`

---

## 8. Lizenz

Beide Schriften stehen unter der **SIL Open Font License 1.1** und dürfen kostenlos für kommerzielle Webprojekte eingesetzt, eingebettet und mit dem Server ausgeliefert werden.

- Cormorant Garamond: <https://fonts.google.com/specimen/Cormorant+Garamond>
- Inter: <https://fonts.google.com/specimen/Inter>

---

*Erstellt für Musikinsel Leipzig · Stand April 2026*
