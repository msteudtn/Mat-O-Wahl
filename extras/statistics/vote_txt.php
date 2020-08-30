<?php

// --------------------------------------------------------------------
// DE: ALLGEMEINES
//
// Dies ist ein sehr simples Beispiel zur Auswertung der abgegebenen Stimmen.
// Die Routine zum Schreiben der Datei stammt von http://de3.php.net/manual/de/function.fwrite.php
// Wie in der "definition.js" erwaehnt, erhaelt das Skript zwei Variablen:
// "mowpersonal" und "mowparties"
// http://localhost/extras/vote.php?mowpersonal=-1,0,1,99&mowparties=5,1,0,2
// Diese werden hier zusammen mit dem Unix-Zeitstempel abgespeichert.
//
// Sie koennen (sollten!) Daten stattdessen auch in einer Datenbank (z.B. MySQL) ablegen.
// Siehe "moegliche Probleme" am Ende dieser Datei.

// ********************************************************************

// EN: GENERAL
//
// This is a very simple script for evaluation.
// The routine for writing files is from http://de3.php.net/manual/de/function.fwrite.php
// As mentioned in "definition.js" the script has two variables:
// "mowpersonal" and "mowparties"
// http://localhost/extras/vote.php?mowpersonal=-1,0,1,99&mowparties=5,1,0,2
// They are saved with an Unix-timestamp.
//
// You can (should!) use a real data-base instead to save your data.
// See "possible problems" at the end of this file.

// ********************************************************************

// --------------------------------------------------------------------
// DE: RECHTLICHES
// 
// Muster-Erklärungen für den Datenschutz finden Sie z.B. auf:
// http://www.e-recht24.de/muster-disclaimer.htm 
// oder http://www.datenschutz-generator.de/
// 
// Einen Blick Wert ist auch die Datenschutz-Erklärung von https://www.lokal-o-mat.de/tool/ahlen/
// "Bei der Nutzung von lokal-o-mat werden für die Dauer Verbindungsdaten wie die IP-Adresse der Nutzer übermittelt. Diese Daten werden nur zum Zweck des Verbindungsaufbaus verwendet.
// Die Nutzungsdaten einschließlich der angekreuzten Antworten der Nutzer werden zu statistischen und wissenschaftlichen Zwecken gespeichert. Dazu werden diese Daten vor der Speicherung anonymisiert, so dass ein Personenbezug nicht mehr hergestellt werden kann.
// Darüberhinaus werden keinerlei personenbezogene Daten bei der Nutzung des lokal-o-mat gespeichert."
// 
// DIES IST KEINE RECHTSBERATUNG! Bitte sorgen Sie selbst für eine passende Erklärung. (z.B. gemäß EU DSGVO, ...)

// ********************************************************************

// EN: LEGAL
// 
// Some countries require an opt-in and/or a privacy statement to collect user data.
//
// I'M NOT GIVING ANY LEGAL ADVICE(S)! 
// Please refer to your local data protection / privacy-laws and adjust it accordingly. (e.g. EU GDPR, ...)

// ********************************************************************

// --------------------------------------------------------------------
// SKRIPT / SCRIPT

// DE: Dateiname fuer Ergebnisse
// EN: Filename for results
$filename = 'test.txt';


// DE: IP-Adresse des Besuchers
// EN: Ip address of visitor
	if (getenv("HTTP_X_FORWARDED_FOR"))
		{
		$ip=getenv("HTTP_X_FORWARDED_FOR");
		}
	else
		{
		$ip=getenv("REMOTE_ADDR");
		}

	$ip = explode (',', $ip);
	$ip = $ip[0];

// DE: Wenn keine IP gespeichert werden soll, einfach die folgende Zeile auskommentieren.
// Hierbei wird das soeben erhaltene Ergebnis von "$ip" mit einem "Null-Wert" überschrieben 
// aber das Format für die simple Auswertung (results.html) bleibt erhalten.
//
// EN: If you do not wish to save any IP addresses (privacy) please uncomment the following line.
// It replaces the result of "$ip" with zeros but keeps the right format.
// 
// $ip="0.0.0.0";


// DE: Daten in Datei schreiben und einzelne Elemente mit Leerzeichen trennen
// EN: Write data to file and separate with space.
//
// (1.) IP-ADDRESS UNIX-TIMESTAMP MOWPERSONAL MOWPARTIES
// (2.) IP-ADDRESS UNIX-TIMESTAMP M,O,W,P,E,R,S,O,N,A,L M,O,W,P,A,R,T,I,E,S

$somecontent = "\n".$ip." ".time()." ".$_GET["mowpersonal"]." ".$_GET["mowparties"];

// DE: Sichergehen, dass die Datei existiert und beschreibbar ist
// EN: Let's make sure the file exists and is writable first.
if (is_writable($filename)) {

    // DE: Wir öffnen $filename im "Anhängen" - Modus.
    // Der Dateizeiger befindet sich am Ende der Datei, und
    // dort wird $somecontent später mit fwrite() geschrieben.

	// EN: In our example we're opening $filename in append mode.
    // The file pointer is at the bottom of the file hence
    // that's where $somecontent will go when we fwrite() it.
    if (!$handle = fopen($filename, "a")) {
         print "Cannot open file ($filename)";
         exit;
    }

    // DE: Schreibe $somecontent in die geöffnete Datei.
	// EN: Write $somecontent to our opened file.
    if (!fwrite($handle, $somecontent)) {
        print "Cannot write to file $filename";
        exit;
    }

    print "Success, wrote ($somecontent) to file ($filename)";

    fclose($handle);

} else {
    print "The file $filename is not writable";
}

// --------------------------------------------------------------------
// DE: MOEGLICHE PROBLEME
// 
// 1. Die Datei kann nicht geoeffnet / geschrieben werden 
// Ursache: fehlende Dateizugriffsrechte unter Unix/Linux
// Lösung: Rechte setzen, 664 sollte klappen, 777 klappt garantiert, ist aber bedenklich

// EN: POSSIBLE PROBLEMS
// 
// 1. File can not be opened / is not writeable.
// Reason: missing file-access rights in Unix/Linux
// Solution: Set rights, 664 should work, 777 works for sure but might be a (security)-risk.

// 2. DE: Die Daten wurden nicht richtig uebertragen / eingetragen, z.B.
// 2. EN: Data has not been written correctly. e.g.

// GOOD: 127.0.0.1 1254322473 1,1,-1,-1,-1,1 2,5,5,0
// BAD:  127.0.0.11254322473 1,1,-1,-1,-1,1 2,5,5,0
// BAD:  127.0.0.1 1254322473 1,1,-1,,, 2,5,5,0
// BAD:  127.0.0.1 1254322473 ,,,,, 2,5,5,0
// BAD:  127.0.0.1 1254322473  2,5,5,0
// BAD:  127.0.0.1 1254322473   

// DE: Ursache: unbekannt
// Lösung: Datenbank benutzen (z.B. MySQL, ...) oder die Datei regelmaessig manuell sichern und pruefen

// EN: Reason: unknown
// Solution: Use a data-base (MySQL, ...) or back-up and check your file on a regular basis

?> 
