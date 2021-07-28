# CHANGELOG

## To Do (einfach)

- Ueberlegung zum Aendern der Lizenz von GPL zu AGPL - https://de.wikipedia.org/wiki/GNU_Affero_General_Public_License
- Pruefen: Unterschiede beim Einlesen von CSV-Dateien zwischen Windows, Mac und Unix?


## To Do (etwas komplizierter)

- Technik: Quellcode aufraeumen, optimieren und besser dokumentieren.
- Technik: Wechsel von Arrays (wo die Daten gespeichert sind) hin zu HTML5-Datenbanktechniken (z.B. IndexedDB, evtl. WebStorage)
- Technik: remove all jquery, use JavaScript-Framework like VUE.JS, ANGULAR or REACT
- Creator / Configurator: Survey-Tool with basic questions and automatic creation of Mat-o-Wahl ZIP-file.


## To Do (Features)

- Technik: More than two answers (yes/no) like in https://github.com/JohnboyJovi/Mat-O-Wahl-multiAnswer -> "agree a lot, agree, -, disagree, disagree a lot"
- Technik: Update jquery-csv to a new version (https://github.com/typeiii/jquery-csv) or "CSV-ES"-project (https://github.com/vanillaes/csv)
- Technik: Update Bootstrap to latest version
- Design: jumpToQuestion-Tabelle unter den Fragen: per Bootstrap-Gridsystem automatisch skalieren
- Design: jumpToQuestion-Tabelle unter den Fragen: Alternative Ansicht: Keine Nummerierung (Mat-o-Wahl), sondern Punkte und Sterne (Wahl-o-Mat)
- Technik: Include videos in questions or party-answers
- Technik: Add Instagram Button (and maybe some more Social Media) ... or outsource via https://github.com/heiseonline/shariff


## To Do (Bugfixes)

- Technik: if you skip questions, you can't change it later in the "resultsLongTable". GENERAL.JS -> fnToggleSelfPosition()


## Versions:

........20210926 Bundestagswahl in Deutschland 

### 0.6.0.2021xxxx

#### 0.6.0.stable.20210727 (BMBF-PTF)

- **Update** for "Show only X parties in the list of results right away. The rest is visible on click."
  - https://github.com/msteudtn/Mat-O-Wahl/issues/21 - Nur die ersten 20 (?) Parteien in Tabellen anzeigen und darunter ein Button "Weitere anzeigen"
  - `EXTRAS/ADDON_LIMIT_RESULTS.JS`
  - new: Option to show less results
  - new / changed: Buttons are shown directly under the (three) result-lists (tables). Before it was just one button at the end. 
  
- Slowly starting to **remove jQuery**
  - **New:** `@keyframes myFadeIn, @keyframes myFadeOut` in `DEFAULT.CSS` to support fading
  - **New:** functions `fnFadeIn(), fnFadeOut()` in `GENERAL.JS`
  - e.g. `fnFadeOut(document.getElementById("myId"), 750, 1)` = fade out `#myId` within 750ms and set `display:none` (1)    


#### 0.6.0.stable.20210723 (BMBF-PTF-APx)

- New setting in `/extras/statistics/db_settings.php` to include the table-name, also.
  - https://github.com/msteudtn/Mat-O-Wahl/issues/43 - DB-Tabellenname in db_settings.php definieren
  - Before, only the usual database-credentials were saved in `db_settings.php`
  - Now, you can add the name of your table as well (if you like)
  - Find more details in `/extras/statistics/readme.md`


#### 0.6.0.stable.20210709 (BMBF-PTF-AP3)

- Question in the beginning to **ask for the favorite party**
  - **NEW**: `/EXTRAS/ADDON_FAVORITE_PARTY.JS`
  - highlight chosen party from the beginning at the end

  
#### 0.6.0.stable.20210707 (BMBF-PTF-APx)

- Added option to show **statistics from database** with the included `RESULTS.HTML` (based on a text-file) 
  - https://github.com/msteudtn/Mat-O-Wahl/issues/18 - results.js/html so anpassen, dass Statistiken aus Datenbanktabelle visualisiert werden
  - **NEW:** `EXTRAS/STATISTICS_DB/READ_DB_WRITE_TEXT.PHP` - reads data from database and writes a textfile for `RESULTS.HTML` 
  - **NEW**: `EXTRAS/STATISTICS/DB_SETTINGS.PHP` - credentials for database. Is used in `READ_DB_WRITE_TEXT.PHP` and `VOTE_DB.PHP` 


#### 0.6.0.stable.20210702 (BMBF-PTF-APx)

- Include Mat-o-Wahl via `iframe` in an existing site (next try)
  - https://github.com/msteudtn/Mat-O-Wahl/issues/25 - iframe mit variabler Höhe - Gleiche und unterschiedliche Domain
  - **NEW:** `EXTRAS/ADDON_CHECK_IFRAME_RESIZE_HOST.JS`
  - **NEW:** `EXTRAS/ADDON_CHECK_IFRAME_RESIZE_CLIENT.JS`
  - can be on the same domain or a different domain
  - still two separate scripts :( but the same technology for same-domain and cross-domain
  - **Replacement** for https://github.com/msteudtn/Mat-O-Wahl/issues/13  (see also version 20210605) 


#### 0.6.0.stable.20210626 (BMBF-PTF-APx)

- New: Bootstrap-Modal in `INDEX.HTML` popping up **after the last question** and **requesting permission for data analytics**
  - https://github.com/msteudtn/Mat-O-Wahl/issues/35 Abfrage nach statistischer Auswertung als letzter Schritt vor dem Ranking
  - `GENERAL.JS, OUTPUT.JS, INDEX.HTML, i18n`
  - **Removed**: toggle-button under the questions to ask for permission 
  - **NEW:** variables in i18n: ` TEXT_ALLOW_STATISTIC_TITLE, TEXT_ALLOW_STATISTIC_TEXT, TEXT_ALLOW_STATISTIC_YES, TEXT_ALLOW_STATISTIC_NO`

- Changed the sizing of the welcoming-message
  - https://github.com/msteudtn/Mat-O-Wahl/issues/26 Größe der Beschreibungs-/Willkommensbox definieren
  - Updated CSS in `/STYLES` and `INDEX.HTML`


#### 0.6.0.stable.20210620 (BMBF-PTF-APx)

- Show only X parties in the list of results right away. The rest is visible on click.
  - https://github.com/msteudtn/Mat-O-Wahl/issues/21 - Nur die ersten 20 (?) Parteien in Tabellen anzeigen und darunter ein Button "Weitere anzeigen"
  - **NEW:** `EXTRAS/ADDON_LIMIT_RESULTS.JS`  


#### 0.6.0.stable.20210618 (BMBF-PTF-APx)

- Bugfix: https://github.com/msteudtn/Mat-O-Wahl/issues/27 
  - `GENERAL.JS, OUTPUT.JS`
  - buttons in right overview-table (sorted by party) did not change, when changing your view in the left table (sorted by answers)
  - **Changed:** from `id=selfPosition123` to `class=selfPosition123`

........20210606 Landtagswahlen in Sachsen-Anhalt

#### 0.6.0.stable.20210605 (BMBF-PTF-APx)

- Include Mat-o-Wahl via `iframe` in an existing site
  - https://github.com/msteudtn/Mat-O-Wahl/issues/13 - iframe mit variabler Höhe ermöglichen 
  - **NEW:** `EXTRAS/ADDON_CHECK_IFRAME_RESIZE_SAME_DOMAIN.JS`
  - **NEW:** `EXTRAS/ADDON_CHECK_IFRAME_RESIZE_CROSS_DOMAIN.JS`
  - can be on the same domain or a different domain   
  - currently two separate scripts. But should be included into one script eventually


#### 0.6.0.stable.20210514 (BMBF-PTF-AP4)

- UX improvements
  - **Removed the icons** (like [x] [o]) from the buttons in `i18n`. Site looks "quieter", now. 
  - **Re-arranged the order of the buttons** and put "count twice" in front, so people can click it before.
  - Progress bar is hidden now. Progress is already shown in the table with the numbers below the questions.


#### 0.6.0.stable.20210423 (BMBF-PTF-AP2)

- new option to include / exlude add-ons via `DEFINITION.JS` instead of messing in `INDEX.HTML`
   - **NEW:** array `var addons = []`

- adjustments for smalller screens
  - The view of the short summary (first list) gets adjusted on small screens (left cell + right cell => upper cell + lower cell)
  - view of party-answers (AP1) gets adjusted on small screens 

- CSS-Stylesheets are now split into multiple small files separated by topic (default, buttons, progressbar)
  - `DEFAULT.CSS, INDEX.HTML, DEFINITION.JS`
  - Stylesheet can be individually added in `DEFINITION.JS`
  - **Changed Type**: `var design` is now an `ARRAY` and not a `STRING`

- updated `QUICKTEST.HTML, QUICKTEST.JS` to new variable names

- some new example-images of fruits in `/DATA` :)


#### 0.6.0.stable.20210411 (BMBF-PTF-AP2)

- new option to show/hide a description at the beginning (What's the election about). Before, the explanation was always shown and wasted space on small screens.
  - `DEFINITION.JS, OUTPUT.JS, INDEX.HTML`
  - **renamed variables** in `DEFINITION.JS`
     - `heading1 -> descriptionHeading1`
     - `heading2 -> descriptionHeading2`
     - `explanation -> descriptionExplanation`
     - **NEW:** `descriptionShowOnStart`
  - **Revert** setting from 20210313: `#descriptionHeading2, #descriptionExplanation` are not hidden on small screens (not needed anymore)
  - new IDs on `<SECTION>` for easier fadeIn() / fadeOut() in `INDEX.HTML`

- hide column "[x2]" ("important to me") on small screens in `OUTPUT.JS`

- removed (uncommented) a number of unused stylesheets in `DEFAULT.CSS`



#### 0.6.0.stable.20210405 (BMBF-PTF-AP2)

- textfilter-addon for multiple elections using arrays
  - `OUTPUT.JS, EXTRAS/TEXTFILTER`
  - use textfilter on all lists: short summary, questions, parties (from AP1)
  - use "invisible" characters for filter (examples in the file in `/EXTRAS` folder)

- fadeIn() party-answers (from AP1) like the question-list already does (in `OUTPUT.JS`)

- adjusted Bootstrap-colors for accessibility (WACG) in `DEFAULT.CSS`

........20210314 Landtagswahlen in Rheinland-Pfalz und Baden-Württemberg

#### 0.6.0.stable.20210313 (BMBF-PTF-AP1)

- Show a list of all parties and their answers (fnEvaluationByParty())
  - `OUTPUT.JS, INDEX.HTML`
  - **renamed**: `#resultsLong -> #resultsByThesis`, `fnEvaluationLong() -> fnEvaluationByThesis()`

- Bugfix: Hide privacy-statement if `statsRecord` in `DEFINITION.JS` is set to 0/false

- i18n
  - **removed**: `TEXT_RESULTS_MATCHES_DETAILS, TEXT_RESULTS_MATCHES_DETAILS_TABLE`
  - **renamed**: `TEXT_RESULTS_MATCHES_DETAILS_INFO -> TEXT_RESULTS_INFO_THESES; TEXT_RESULTS_MATCHES_GENERAL -> TEXT_RESULTS_HEADING`
  - new: `TEXT_RESULTS_INFO_PARTIES, TEXT_RESULTS_BUTTON_THESES, TEXT_RESULTS_BUTTON_PARTIES`

- Bugfix: If a party did not answer a question, the line was not selected from the CSV file. (e.g. CSV content: "1;") in `GENERAL.JS`
  
- DEFAULT.CSS, OUTPUT.JS
  - removed: CSS `body -> font-size` and all CSS for `table` in `DEFAULT.CSS`
  - instead: using Bootstrap's `class='table table-bordered table-striped table-hover` in `OUTPUT.JS`

- INDEX.HTML, DEFINITION.JS
  - `var heading2, var explainingText / #heading2, #explanation` only shown on screens larger than Bootstrap's "medium" (>= 768px)

- replaced open brackets (&#x2335;) from v.0.5.0.1. with [+]/[-] sign to indicate open/close (collapse) in `OUTPUT.JS`


### 0.5.1.20201230

- GENERAL.JS
  - Bugfix: Update algorithm for results (before: no half points if party said yes or no) 
 -> better compliance with original Wahl-o-Mat https://www.bpb.de/system/files/dokument_pdf/Rechenmodell%20des%20Wahl-O-Mat%202019.pdf

### 0.5.0.1.20201130

- answers.CSV
  - short descritpion / explanation in first row

- OUTPUT.JS
  - open brackets (&#x2335;) to show, that you can open "#resultsLong"-table for further details on parties


### 0.5.0.20200830

- DEFINITION.JS, answers.CSV
  - complete change: only ONE file for the parties and answers instead of independet CSV-files 
   (before: "party-A.csv, B-party.csv, ...". Now: "party+answers.csv")
   Reason: CSV-files got loaded at different times on slow connections (mobile EDGE, modem, ...)
	   This ended up in wrong results. (AJAX-bug)
	   An alternative would be synchronous calls but this blocks the browser. :(
   New: All information on the party goes in the ANSWERS-file too. (like: www, party-name, ...)
 	Possiblity to add a party description 

- OUTPUT.JS
  - Informationen zu Parteien beim Klick ein-/ausblenden (so wie bei den Antworten in der unteren Tabelle)
  - Partei-Bild rechtsbündig neben Parteinamen in der gleichen Zelle
  - Punkt-Bewertung verschoben in Fortschrittsbalken 
  - jumpToQuestion-Tabelle unter den Fragen: bei onMouseOver() die Frage anzeigen
  - Bilder müssen nun mit genauem Pfad angegeben werden, z.B. "data/image.jpg" oder "https://domain.com/images/pic.jpg"

- DEFINITION.JS, IMPRINT.HTML, new: IMPRINT.JS 
  - complete change: focus on German registered societies ("eingetragener Verein, e.V.")
                    and adjustments to current legal situation.
		    * Still, this is NOT a PERFECT imprint. *
		    * Dies ist KEIN PERFEKTES Impressum! *
  - Note on how to refer to Mat-o-Wahl if you use your own imprint

- GENERAL.JS
  - arPersonal with corrected values for statistics (Thanks to Marius Nisslmueller)
   before: -1,0,1 -> now: -2,-1,0,1,2

- EXTRAS\STATISTICS
  - example of MySQL-Table and PHP-script for statistics / counter (Thanks to Marius Nisslmueller)

- EXTRAS\startSimplePythonServer.txt
  - Kurzanleitung zum Starten eines http-Servers

- INDEX.HTML
  - Built-In Bootstrap toogle-switch "custom-control custom-switch" instead of "Flat Toggle Switch" by https://bootsnipp.com/snippets/z8b8y 

- QUICKTEST.HTML, QUICKTEST.JS
  - adaption to new DEFINITION.JS

- DEFINITION.JS
  - Picture size in percent (%) instead of pixels (px)

- VERSION.TXT renamed to CHANGELOG.TXT


### 0.4.1.20200228

- QUICKTEST.HTML, RESULTS.HTML, IMPRINT.HTML
  - local copies of Bootstrap and jQuery
- i18n, OUTPUT.JS
  - moved Unicode-characters from OUTPUT.JS into i18n, e.g. [agree-tickbox]
- DEFINITION.JS, OUTPUT.JS
  - added option/link for own legal notice (Impressum)

### 0.4.0.20200125

- INDEX.HTML
  - update Bootstrap to 4.4.1
  - update jQuery to 3.4.1
  - local copies of Bootstrap and jQuery for better compliance with EU General Data Protection Regulation (GDPR - Datenschutz-Grundverordnung / EU-DSGVO)
  - new addon-interface. "#descriptionAddonTop", "#descriptionAddonBottom", "#resultsAddonTop", "#resultsAddonBottom"
   Probably best to use with "MutationObserver" https://developer.mozilla.org/de/docs/Web/API/MutationObserver 
- DEFINITION.JS, OUTPUT.JS, i18N
  - links to external pages need the full URL with http(s):// now. Before, I linked to (unsecure) http:// directly.  
- EXTRAS/ADDON_RESULTS_TEXTFILTER_BY_BUTTON.JS
  - first addon: Selection-Buttons for joint elections (e.g. town council + mayor, z.B. Stadtrat + Bürgermeister)

........20190929 zehn Jahre! / ten years! :) \
........20191027 Landtagswahl in Thüringen \
........20190901 Landtagswahl in Brandenburg und Sachsen \
........20190526 Europawahl

### 0.3.0.20181103

- INDEX.HTML, OUTPUT.JS, GENERAL.JS, ...
  - Bootstrap-Framework for responsive design
  - Ajax-Promises: $.ajax({}).done()
  - jquery-csv-library instead of own JavaScript-functions (and update existing jquery-csv from 0.7.1 to 0.8.9)
- CSS
  - Adaptions to Bootstrap-Framework
- i18n
  - internationalisation-files (not via CSV but JS)
- IMG-folder
  - pictures deleted (CSS instead)

........20181028 Landtagswahl in Hessen \
........20181014 Landtagswahl in Bayern \
........20170924 Bundestagswahl in Deutschland

### 0.2.4.2.20161021

- INDEX.HTML, VOTE.PHP
  - Translations / Uebersetzungen
- CSS
  - Added description for "tr:nth-child(even)"

### 0.2.4.1.20151115

- INDEX.HTML
  - Social Media Buttons
  - Wahlknoepfe umbenannt: "Stimme dafür" -> "Stimme zu", "Stimme dagegen" -> "Stimme nicht zu"
- CSS
  - Social Media Buttons
  - tr:nth-child(even) in Ergebnis-Tabellen anstelle von Funktionen GENERAL.JS/"fnCreateMiddleColor" und "fnTransformHexToDec"
- RESULTS.HTML
  - Auswertung nach Tagen und optische Verbesserungen
- IMPRINT.HTML, CSS, DEFINITION.JS
  - Translations / Uebersetzungen

### 0.2.4.20150222

Riesigen Dank an Ben Kobrinski (mail@benkob.de) für:
- Sortierung der Ergebnistabelle nach Übereinstimmung 
- Wichtung ausgewählter Thesen (z.B. "Dieses Thema ist mir besonders wichtig" -> doppelte Punktzahl)
- Live-Auswertung und Aenderung in der Ergebnistabelle (z.B. "Habe mich bei Frage 3 spontan umentschieden." -> Was kommt jetzt raus?)
  (Die Reihenfolge in der statistischen Auswertung "mowpersonal" und "mowparties" wird davon nicht berührt)
- GENERAL.JS
  - neue globale Variablen: arVotingDouble, arSortParties, activeQuestion
  - neue Variablen fnEvaluation() -> var faktor
  - neue Funktionen: fnToggleSelfPosition(), fnToggleDouble()
- OUTPUT.JS
  - Checkbox für doppelte Bewertung
  - neue Funktionen: fnChangeVotingDouble(), fnReEvaluate()
- INDEX.HTML
  - Checkbox für doppelte Bewertung
  - Sprechblase (Speechbubble) für These
  - Pro, Neutral und Contra auf erste Zeile. "Doppelt werten" und "Überspringen" auf zweite Zeile gelegt.
- optische Verbesserungen (Teil-Transparenz bei Buttons, Farbverlauf für Hintergrund, Sprechblase für These, ...)
- Hilfe-Dokument überarbeitet

........20150215 - Bürgerschaftswahl in Hamburg \
........20140831 - Landtagswahl in Sachsen

### 0.2.3.2.20140724

- GENERAL.JS 
  - Funktion fnReadCsv() um "async: false," erweitert. (Das "A" in AJAX deaktiviert.) Sollte den Lade-Bug hoffentlich bereinigen. Ausserdem den "error:"-Text um eine kurze Hilfe erweitert.
- OUTPUT.JS
  - Hintergrundfarbe in Funktion fnJumpToQuestionNumber() mit der Rahmenfarbe angeglichen.
  - Anzeige der These UND der vollen Frage in der ausfuehrlichen Auswertung (fnEvaluationLong() -> arQuestionsLong[i])
- DEFAULT.CSS
  - "height" aus #middle entfernt. Jetzt gibt es zwar keine feste Hoehe mehr aber dafuer kann man am Ende alles problemlos ausdrucken.
- Hilfe-Dokument um FAQ erweitert

........20140525 - Europawahl in Deutschland

### 0.2.3.1.20140518

- QUICKTEST.HTML prueft nun auf fehlende Variablen
- IMPRINT.HTML
  - fehlende, optionale Werte werden mit "keine Angabe" ersetzt.
  - Texte und Links aufgeraeumt.
- In INDEX.HTML den #results-DIV aufgeteilt in #resultsShort und #resultsLong um CSS-Vererbung von #content zu vermeiden (Schriftgroesse in den Ergebnistabellen ist nun immer gleich / Standardgröße)
- In OUTPUT.JS die feste Beschraenkung auf 16 Fragen / Zeile aufgehoben (in fnJumpToQuestionNumber()). 12 Fragen / Zeile als neue Vorgabe eingestellt. Kann jetzt im Quelltext geaendert werden.
- In DEFINITION.JS Informationen und Beispiele zur Problemvermeidung hinzugefuegt
  - gleiches Trennzeichen nutzen!
  - CSV-Dateien mit zwei Spalten nutzen!
  - HTML-Notation bei Sonderzeichen benutzen!

### 0.2.3.20140511

- kleines Skript für die Auswertung hinzugefügt (RESULTS.HTML) für die Ergebnisse aus der VOTE.PHP / TEST.TXT
- Erklaerungen in QUICKTEST.HTML praezisiert
- Möglichkeit die Bildgroesse des Parteilogos in der DEFINITION.JS anzugeben (intPartyLogosImgWidth und intPartyLogosImgHeight)
- optische und inhaltliche Verbesserungen (Mit Dank an OpenData Wuppertal, www.opendatal.de, www.talomat.de)
  - Icons ausgetauscht und vergroessert 
  - Rahmen zentriert und schattiert, Schriftgroessen und -farben angepasst

......20130922 - Bundestagswahl in Deutschland

### 0.2.2.20120930

- Lizenzhinweise aktualisiert (manchmal stand noch GPL 2)
- optische und inhaltliche Verbesserungen in der detaillierten Auswertung (Mit Dank an Peter Lutz, Passau)
  - Icons hinzugefuegt, z.B. für rot-gruen-blinde Personen 
  - Position der Partei im Tooltip (vorher: "Parteiname: Begruendung", jetzt: "Parteiname: Stimme dafuer/dagegen: Begruendung")

### 0.2.1.20091216

- Bewertungssystem korrigiert. Enthaltung wurde als 0,5 gewertet, ist nun 0
- Vor- und Zurueckspringen bei Fragen nun moeglich
- Moeglichkeit ein anderes Trennzeichen als das Komma fuer die CSV zu definieren
- Einstellungen der Partei/Positionslisten in der DEFINITION.JS von Arrays auf Strings umgestellt fuer einfachere Administration
- Schnelltest verbessert zur einfacheren Fehlersuche
- optische Verbesserungen
  - Alternativtext in Ergebnisliste beschreibt auch persoenliche Position mit Worten statt 1/0/-1

### 0.2.0.1.20091027

- Bewertungssystem an den Wahlomat angepasst. Neutrale Positionen der Parteien werden nun als halber Punkt angerechnet.

### 0.2.0.20091004

- Moeglichkeit, einzelne Parteien in der Ergebnisliste einzeln auszuwaehlen
- Schnelltest zum Pruefen der Konfiguration
- optische Verbesserungen
  - Rahmen mit Farbe der eigenen Position (z.B. rot) um Bild der Parteiposition (z.B: gruen) in detaillierter Auswertung
  - Stylesheet-Datei verbessert (Schriftgroesse mit % statt pt)

### 0.1.1.20090930

- Variable fuer Internetadressen der Parteien hinzugefuegt
- Austausch der Designvorlagen (CSS) moeglich
- Moeglichkeit der anonymen "Wahlprogonose" nach Nutzereinwilligung
- optische Verbesserungen
  - Hervorhebeung von geraden Tabellenspalten in der Auswertung
  - Verschiedene Farben in der Auswertung je nach Prozent der uebereinstimmung mit Partei

### 0.1.0.20090929

- erste Veroeffentlichung
- Abfrage von Parteipositionen
- kurze Auswertung
- detaillierte Auswertung

......20090927 - Bundestagswahl in Deutschland

https://de.wikipedia.org/wiki/Liste_von_Wahlen#21._Jahrhundert \
http://www.mat-o-wahl.de 
