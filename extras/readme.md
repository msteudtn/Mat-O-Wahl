:de: Dieser Ordner enthält **Erweiterungen** und zusätzliche Informationen. 

:us: This folder contains **add-ons** and additional information

# Erweiterungen / Addons

:de: | :us:
---- | ----
Die Erweiterungen werden über die Variable `var addons` in der `/DATA/DEFINITION.JS` aktiviert. | Add-ons are activated via `var addons` in `/DATA/DEFINITION.JS`
Man kann keine, eine oder mehrere Erweiterungen laden, z.B. | You can load none, one or several add-ons

```  	
var addons = []
var addons = ["extras/addon_results_textfilter_by_button.js"]
var addons = ["extras/addon_results_textfilter_by_button.js", "extras/addon_limit_results.js"]
```

:de: | :us:
---- | ----
Eine **kurze Anleitung** befindet sich üblicherweise innerhalb der Dateien. | You'll find a **short manual** within the files.
Eine **detaillierte Anleitung** findet sich in der Dokumentation https://www.mat-o-wahl.de/dokumentation.html | A **detailled manual** (in German) can be found online.

## addon_check_iframe_resize_client.js, addon_check_iframe_resize_host.js

:de: | :us:
---- | ----
Eine Erweiterung um den Mat-o-Wahl **in einem iFrame zu laden**. z.B. eingebettet auf seiner **Webseite, in Wordpress, Joomla, Typo3** oder einem anderen Content Management System (CMS). | An add-on to load the Mat-o-Wahl in an iframe for your CMS or web-site.

## addon_limit_results.js

:de: | :us:
---- | ----
Eine Erweiterung mit der man die **Anzahl der Ergebnisse begrenzen** kann. z.B. "nur die ersten 10 Ergebnisse anzeigen" und dann 10 weitere laden. | An add-on to limit the number of results, e.g. "show only the first 10 results" and load 10 more after that.

## addon_results_textfilter_by_button.js

:de: | :us:
---- | ----
Eine Erweiterung um die **Ergebnisse zu filtern**. So kann man z.B. die gleichen Fragen für den Stadtrat und Bürgermeister nutzen oder man bietet einen regionalen Filter an, z.B. "Alle Kandidaten aus Nord / Ost / Süd / West" | An add-on to filter the results, e.g. "Show only candidates for mayor or city council" or "Show only candidates from North / East / South / West"

# data_fruitville.zip, data_obsthausen.zip, data_springfield.zip

:de: | :us:
---- | ----
Beispiel-Daten für das `/DATA/`-Verzeichnis | Examples for the `/DATA/`-folder

# startSimplePythonServer.txt

:de: | :us:
---- | ----
Ein beispielhaftes Vorgehen zum Starten eines einfachen HTTP-Servers mit Hilfe der Python-Sprache. | An example to start an HTTP-server via Python programming language
