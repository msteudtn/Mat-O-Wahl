
# read_db_write_text.php

:de: Das PHP-Skript liest die **Ergebnisse des Mat-o-Wahl aus der Datenbank** aus und **speichert sie in der Textdatei** `results_db.txt`

Es kann einfach im Browser aufgerufen werden, z.B. www.unser-buergerverein-in-stadtname.de/wahlcheck/extras/statistics_db/read_db_write_text.php

Die **Zugangsdaten zur Datenbank** werden automatisch aus `/EXTRAS/STATISTICS/DB_SETTINGS.PHP` ausgelesen. (Es sind die gleichen Zugangsdaten, wie zum Schreiben in die Datenbank.)
Die Zugangsdaten müssen natürlich an die eigenen Bedürfnisse angepasst werden. :)

Die Textdatei `results_db.txt` kann dann als **Datei-Quelle** `var fileResults` in die `/SYSTEM/RESULTS.JS` eingetragen werden.

---

:us: The PHP-script reads the **results of Mat-o-Wahl from the database** and **saves it into the text-file** `results_db.txt`

It can be called from a browser, e.g. www.unser-buergerverein-in-stadtname.de/wahlcheck/extras/statistics_db/read_db_write_text.php

The **credentials to the database** are read from `/EXTRAS/STATISTICS/DB_SETTINGS.PHP`. (It's the same as with writing the statistics.)
Obviously you have to adapt it to your needs. :)

The text-file `results_db.txt` can later be uses as **source file** `var fileResults` in `/SYSTEM/RESULTS.JS`.


# htaccess, htpasswd

:de: Man **kann** seine Ergebnisse mit einem Passwort vor fremden Zugriffen schützen. Andernfalls hat jeder Besucher Zugriff auf die Statistik-Textdatei (das kann aber auch natürlich genauso gewollt sein).

Dazu bitte wie folgt vorgehen:

* Der aktuelle Nutzername heißt `mow` und das aktuelle Passwort lautet ebeneso `mow`. Diese müssen noch geändert werden.

  * Entweder: Auf einem System mit installierten Apache-Server (oder auf dem eigenen Web-Server, z.B. per SSH-Zugriff) den folgenden Befehl ausführen. `htpasswd -c -B htpasswd NUTZERNAME`. Dies fragt nach dem Passwort für den Nutzer "NUTZERNAME" und schreibt das Passwort in die Datei "htpasswd".
  * Oder: Einen Online-Service für das Passwort-Erstellen nutzen, wie z.B. https://www.redim.de/blog/passwortschutz-mit-htaccess-einrichten oder https://hostingcanada.org/htpasswd-generator/ Das Ergebnis muss dann in die "htpasswd"-Datei eingetragen werden.

* Den Beispiel-Pfad zum Verzeichnis `/var/www/htdocs/mat-o-wahl/extras/statistics_db/.htpasswd` muss mit dem richtigen Pfad aus der eigenen Server-Konfiguration angepasst werden.

  * Der Pfad zum eigenen Skript wird in der `READ_DB_WRITE_TEXT.PHP` am Anfang angezeigt.
 
  * Die htpasswd-Datei sollte nicht im gleichen Ordner liegen, wie die htaccess-Datei, sondern woanders, z.B. außerhalb des Web-Bereichs, z.B. `/var/www/geheim/.htpasswd`
 
* Die beiden Dateien `htaccess` und `htpasswd` müssen noch umbenannt werden. Es muss ein Punkt an den Anfang gestellt werden, so dass sie unter Linux-Systemen als versteckte Dateien ausgeblendet werden, also `.htaccess` und `.htpasswd`. Wenn das unter Windows nicht funktioniert, kann man es nach dem Hochladen auf dem Server erledigen (z.B. mit dem FTP-Programm)

---

:us: You **can** protect your results with a password from unauthorized access. Otherwise anybody can access your statistics-text-file. (But maybe you would like to have public access and this doesn't concern you.)

* This folder has two example files `htaccess` and `htpasswd`. 
* They have to be renamed to `.htaccess` and `.htpasswd` ...
* ... and the password has to be replaced (currently username and password are both `mow`)
* ... and the pathname in `htaccess` has to be adjusted
* ... and they have to be uploaded.
