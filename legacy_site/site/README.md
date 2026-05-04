# Musikinsel Leipzig – statische Netlify-Version

## Was im ZIP enthalten ist
- `site/` ist direkt deploybar auf Netlify.
- Startpunkt ist `site/index.html`.
- Alle Seiten sind reine statische HTML/CSS/JS-Dateien.

## Wohin Bilder kopieren?
Lege alle finalen Bilder in:
- `site/assets/images/`

Bereits eingebunden sind:
- `logo02.jpg`
- `logo-wide.jpg`
- `news-gitarre.jpeg`

Wenn du später echte Teamfotos oder Raumfotos ergänzen willst, kopiere sie ebenfalls in `site/assets/images/` und tausche dann in den HTML-Dateien die jeweiligen `src`-Pfade aus.

## Wohin Texte kopieren?
Die hochgeladenen Texte wurden bereits in die HTML-Dateien übernommen.
Wenn du etwas ändern willst, bearbeite direkt:
- `site/index.html`
- `site/team.html`
- `site/instrumente.html`
- `site/gebuehren.html`
- `site/news.html`
- `site/kontakt.html`
- `site/impressum.html`

## Netlify
Für den ersten Upload einfach den Ordner `site/` in Netlify ziehen.
Später kann das Kontaktformular auf Netlify Forms umgestellt werden.

## Offene Punkte
- In den gelieferten Dateien fehlten verifizierbare Preiszahlen. Deshalb sind auf `gebuehren.html` bewusst keine erfundenen Tarife eingetragen.
- Es wurden nur wenige Bilder mitgeliefert. Deshalb nutzt die Seite derzeit ein reduziertes visuelles System mit Logo, Promo-Grafik und typografischen Karten.
