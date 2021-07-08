
# vote_db.php, results_db.sql, db_settings.php

Ein PHP-Skript um die **Ergebnisse des Mat-o-Wahl in eine Datenbank** zu schreiben.

Die DB-Zugangsdaten werden aus `db_settings.php` gelesen und müssen an den eigenen MySQL bzw. MariaDB-Server angepasst werden.

Am Anfang muss eine Tabelle in der Datenbank erstellt werden. Dazu gibt kann man die `results_db.sql` in seine Datenbank importieren. 
Die Beispiel-Tabelle heißt `Results` kann aber auch umbenannt werden. Dann müssen aber auch andere Abfragen in den PHP-Skripten angepasst werden. :)

Um die Statistik zu aktivieren muss der Parameter `var statsRecord` in `/DATA/DEFINITION.JS` auf `1` gesetzt sein. 
Außerdem muss im Parameter `var statsServer` der Pfad zur `vote_db.php` eingetragen sein.


# vote_txt.php, results.txt, example_results.ods

Die (schlechtere) Alternative zur Statistik-Erfassung in einer Datenbank ist die **Erfassung in einer Textdatei**.

Dazu dient die `vote_txt.php`. Sie schreibt ihre Ergebnisse in die `results.txt`.

Auch dieses Skript muss in der `/DATA/DEFINITION.JS` aktiviert werden. (siehe oben)

Die OpenOffice- / LibreOffice-Calc-Datei `example_results.ods` ist ein **Beispiel für eine Auswertung der Textdatei**.
