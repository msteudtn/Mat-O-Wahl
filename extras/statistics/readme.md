
# vote_db.php, results_db.sql, db_settings.php

:de: Ein PHP-Skript um die **Ergebnisse des Mat-o-Wahl in eine Datenbank** zu schreiben.

Die DB-Zugangsdaten werden aus `db_settings.php` gelesen und müssen an den eigenen MySQL bzw. MariaDB-Server angepasst werden.

Am Anfang muss eine **Tabelle in der Datenbank erstellt** werden. Dazu kann man die `results_db.sql` in seine Datenbank importieren. 

Die Beispiel-Tabelle heißt `Results` kann aber auch umbenannt werden. Wenn die Tabelle umbenannt wird (Zeilen 16, 27 und 33 in der `results_db.sql`), muss die `db_settings.php` ebenfalls angepasst werden.

Um die **Statistik zu aktivieren** muss der Parameter `var statsRecord` in `/DATA/DEFINITION.JS` auf `1` gesetzt sein. 
Außerdem muss im Parameter `var statsServer` der Pfad zur `vote_db.php` eingetragen sein.

---

:us: A PHP-script to write the **results of Mat-o-Wahl into a database**.

DB-credentials come from `db_settings.php` and have to be adjusted to your own MySQL / MariaDB-settings.

First you have to **create a table** within the database. The file `results_db.sql` can be imported into the database for that.

The example table is named `Results` but you can change it to your needs. If you change the name (lines 16, 27 and 33 in `results_db.sql`), you have to adjust the settings in `db_settings.php` as well.

To **activate statistics**, you have to set the parameter `var statsRecord` in `/DATA/DEFINITION.JS` to `1`.
In addition the parameter `var statsServer` has to link to `vote_db.php`.


# vote_txt.php, results.txt, example_results.ods

:de: Die (schlechtere) Alternative zur Statistik-Erfassung in einer Datenbank ist die **Erfassung in einer Textdatei**.

Dazu dient die `vote_txt.php`. Sie schreibt ihre Ergebnisse in die `results.txt`.

Auch dieses Skript muss in der `/DATA/DEFINITION.JS` aktiviert werden. (siehe oben)

Die OpenOffice- / LibreOffice-Calc-Datei `example_results.ods` ist ein **Beispiel für eine Auswertung der Textdatei**.

---

:us:  The (bad) alternative to collect statistical data. Instead of using a database this script **uses a text-file**.

This is done in `vote_txt.php`. It writes the results into `results.txt`.

This script has to be activated in `/DATA/DEFINITION.JS` also.

The OpenOffice- / LibreOffice-Calc-file `example_results.ods` is just an **example for an evaluation of the text-file**.
