# Mat-O-Wahl - Ein einfach zu bedienender, freier Wahl-O-Mat Klon für jedermann

## FEATURES / FUNKTIONEN

### Abfrage
- Fragen / Thesen / Meinungen abfragen
- Anpassbare **Auswahlmöglichkeiten**: große Zustimmung / Zustimmung / Enthaltung / Ablehnung / große Ablehnung / Überspringen
- Einzelne Fragen doppelt gewichten
- Zwischen den Fragen hin- und herspringen
- Fragen können in **Fragen-Kategorien** sortiert werden

<p float="left">
  <img src="examples/mow-example-questions-normal.png" width="45%" alt="Mat-o-Wahl mit den Standardeinstellungen - Fragen" title="Mat-o-Wahl mit den Standardeinstellungen - Fragen" /> 
  <img src="examples/mow-example-questions-plus.png" width="45%" alt="Mat-o-Wahl mit den erweiterten Einstellungen - Fragen" title="Mat-o-Wahl mit den erweiterten Einstellungen - Fragen" /> 
</p>

### Ergebnisse
- Übereinstimmungen zu einzelnen Kandidaten als Fortschrittsbalken und Prozentanzeige
- Ergebnisse werden nach Übereinstimmung **sortiert**
- Detaillierte Übersicht der **Fragen und jeweiligen Kandidaten-Antworten**
- Detaillierte Übersicht der **Kandidaten und ihrer jeweiligen Antworten**
- Meinung noch einmal anpassen und die Ergebnisse neu berechnen (auch wenn alle Fragen schon beantwortet sind)
- Ergebnisse können per **Filter-Kategorien** gefiltert werden
- Ergebnisse können als Statistik an den eigenen Server geschickt werden

<p float="left">
  <img src="examples/mow-example-results-byMatches-normal.png" width="45%" alt="Mat-o-Wahl mit den Standardeinstellungen - Ergebnisse" title="Mat-o-Wahl mit den Standardeinstellungen - Ergebnisse" /> 
  <img src="examples/mow-example-results-byMatches-plus.png" width="45%" alt="Mat-o-Wahl mit den erweiterten Einstellungen - Ergebnisse" title="Mat-o-Wahl mit den erweiterten Einstellungen - Ergebnisse" /> 
</p>

### Benutzerfreundlichkeit
- Mobile- und Desktop-Ansicht automatisch
- Fragen können auf dem Smartphone gewischt (swiped) werden
- Barrierefreie Bedienung per Tastatur für Menschen mit Einschränkungen (ARIA)
- Einfachere Administration mittels Textdateien (CSV-Tabellen und Konfiguration)
- Anpassung an eigene Designs

<p float="left">
  <img src="examples/mow-example-results-byQuestions.png" width="31%%" alt="Mat-o-Wahl - Ergebnisse sortiert nach Fragen" title="Mat-o-Wahl - Ergebnisse sortiert nach Fragen" /> 
  <img src="examples/mow-example-results-tuning.png" width="31%%" alt="Mat-o-Wahl - Ergebnisse noch einmal anpassen" title="Mat-o-Wahl - Ergebnisse noch einmal anpassen" /> 
  <img src="examples/mow-example-results-byCandidate.png" width="31%%" alt="Mat-o-Wahl - Ergebnisse sortiert nach Kandidaten" title="Mat-o-Wahl - Ergebnisse sortiert nach Kandidaten" /> 
</p>

### Mögliche Einsatzzwecke / Zielgruppe
- Wahlen für: B&uuml;rgermeister, Stadtrat, Kommune, Kreisrat, Landrat, Fachschaftsrat, Studentenrat, StuRa, Studentenparlament, Studierendenparlament, StuPa, AStA, Volksabstimmung, Plebiszit, 
- Privatpersonen, Vereine, Geschäftspersonen / Firmen, Bildungseinrichtungen (Schulen, Universitäten / Hochschulen), Forschungseinrichtungen (z.B. Statistik und Wahlforschung), Medien (z.B. Tageszeitungen, Blogs), Sonstige 
- nicht geeignet als allgemeine Umfrage mit Schulnoten-Bewertung, Sterne-Bewertung oder Textfeldern für Kommentare

## LIVE-DEMO

https://www.mat-o-wahl.de/ -> Ausprobieren (DE) :beer:

## INSTALLATION / DOWNLOAD

### Installation (ohne Docker)
1. ZIP-Archiv **herunterladen und entpacken**
   (Github -> oben rechts -> Code -> Download ZIP)

2. Datei `/DATA/DEFINITION.JS` in einem **Texteditor (am besten mit Syntaxhervorhebung) bearbeiten**.   

3. `Fragen- und Antworten-CSV`-Datei in einem **Texteditor oder einer Tabellenkalkulation (MS Excel, LO Calc, ...) bearbeiten**. Der Dateiname kann frei gewählt werden.

4. **Testen mit `INDEX.HTML`** oder `QUICKTEST.HTML` 
   (am besten auf http://localhost/ oder im privaten Webspace) 

### Installation (mit Docker)

1. Installiere [docker](https://docs.docker.com/engine/install/) und docker-compose 

2. Fertiges Image: Lade die docker-compose.yml runter  
   Image selbst bauen: ZIP-Archiv **herunterladen und entpacken** (Github -> oben rechts -> Code -> Download ZIP)

3. Passe die Parameter für deine Zwecke in der `docker-compose-dev.yml` an
   - **Image:** Wähle aus, ob du eine spezielle Version verwenden möchtest.
   - **Port:** Ändere den Port, falls Port 80 bereits belegt ist.
   - **Volumes:** Passe den Pfad deiner Konfigurationsdateien an (Standard: `./data`).

4.  Fertiges Image: Starte den Service mit `docker-compose up` (du kannst den Service mit `docker-compose down` stoppen)  
    Image selbst bauen: Starte den Service mit `docker-compose -f docker-compose-dev.yml up` (du kannst den Service mit `docker-compose down` stoppen)

## VORAUSSETZUNGEN

- ein bisschen **Webspace** (ein günstiges Shared-Hosting-Paket reicht vollkommen aus)
- **kein** PHP oder MySQL / MariaDB nötig (optional für Statistik)
- Wissen, wie man eine **Textdatei** und/oder eine Tabellenkalkulation öffnet

## Mat-o-Wahl und DSGVO (Datenschutz)

- Alle **Verarbeitungen** passieren **innerhalb des Browsers** des Nutzers
- **keine Datenerhebung auf dem Server** (nur optional für eine Statistik - Ausnahme: Standardmäßige Erfassung der Zugriffe durch den Webhosting-Anbieter, z.B. IP-Adresse und Uhrzeit)
- kein Aufruf von externen Dateien (z.B. CDN / Content Delivery Network) - alles inklusive 

## LIZENZ

GPL 3 (siehe Verzeichnis /SYSTEM oder http://choosealicense.com/licenses/gpl-v3/)
- Quellcode, Lizenz und größere Änderungen müssen kenntlich gemacht werden.
- Änderungen, Weitergabe, sowie kommerzielle und private Nutzung erlaubt.
- Keine Garantie für Softwareschäden. 

## HILFE / KONTAKT / ÄNDERUNGEN

- Weitere Informationen und Dokumentation online unter https://www.mat-o-wahl.de
- oder per E-Mail (siehe unten).
- Änderungen zu den Vorgängerversionen finden sich im Changelog https://github.com/msteudtn/Mat-O-Wahl/blob/master/system/changelog.md

Wenn Sie den Mat-O-Wahl einsetzen, würde ich mich über eine **kurze Mitteilung von Ihnen** freuen.

mathias . steudtner (a) mailbox . org

