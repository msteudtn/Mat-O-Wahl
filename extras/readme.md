Dieser Ordner enthält **Erweiterungen** und zusätzliche Informationen.

# Erweiterungen

Die Erweiterungen werden über die Variable `var addons` in der `/DATA/DEFINITION.JS` aktiviert.
Man kann keine, eine oder mehrere Erweiterungen laden, z.B.

```  	
var addons = []
var addons = ["extras/addon_results_textfilter_by_button.js"]
var addons = ["extras/addon_results_textfilter_by_button.js", "extras/addon_limit_results.js"]
```

Eine **kurze Anleitung** befindet sich üblicherweise innerhalb der Dateien.

Eine **detaillierte Anleitung** findet sich in der Dokumentation https://www.mat-o-wahl.de/dokumentation.html

## addon_check_iframe_resize_client.js, addon_check_iframe_resize_host.js

Eine Erweiterung um den Mat-o-Wahl **in einem iFrame zu laden**. z.B. eingebettet auf seiner **Webseite, in Wordpress, Joomla** oder einem anderen CMS.

## addon_limit_results.js

Eine Erweiterung mit der man die **Anzahl der Ergebnisse begrenzen** kann. z.B. "nur die ersten 10 Ergebnisse anzeigen" und dann 10 weitere laden.

## addon_results_textfilter_by_button.js

Eine Erweiterung um die **Ergebnisse zu filtern**. So kann man z.B. die gleichen Fragen für den Stadtrat und Bürgermeister nutzen oder man bietet einen regionalen Filter an, 
z.B. "Alle Kandidaten aus Nord / Ost / Süd / West"

# data_fruitville.zip, data_obsthausen.zip, data_springfield.zip

Beispiel-Daten für das `/DATA/`-Verzeichnis 

# startSimplePythonServer.txt

Ein beispielhaftes Vorgehen zum Starten eines einfachen HTTP-Servers mit Hilfe der Python-Sprache.
