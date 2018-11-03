///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// DE: Bei Problemen benutzen Sie bitte die /QUICKTEST.HTML 
// oder lesen in der /SYSTEM/MAT-O-WAHL-HILFE.PDF nach.

// ********************************************************************

// EN: Please try QUICKTEST.HTML in case of problems.

///////////////////////////////////////////////////////////////////////
// 1. ALLGEMEINE / EINFACHE EINSTELLUNGEN:

// DE: Bei den CSV-Dateien bitte beachten: 
// - ueberall das gleiche Trennzeichen benutzen (z.B. immer nur Komma)
// - Zweispaltig aufbauen, z.B.
// -- richtig: 1,"Wir sind dafür" 
// -- richtig: 1,"" 
// -- grenzwertig: 1,
// -- falsch:  1

// Bei Problemen mit Umlauten und Sonderzeichen benutzen Sie bitte
// den entsprechenden HTML-Code. z.B. ä = ae = &auml; Siehe: 
// http://de.selfhtml.org/html/allgemein/zeichen.htm#umlaute

// ********************************************************************

// 1. GENERAL / SIMPLE SETTINGS

// EN: When creating the CSV files, please take care of:
// - use always the same separator (e.g. always comma)
// - use two rows, e.g.
// -- right: 1,"We support it" 
// -- right: 1,"" 
// -- borderline: 1,
// -- wrong:  1

// In case of problems with special characters, please use its HTML code
// see here: https://www.utexas.edu/learn/html/spchar.html

// --------------------------------------------------------------------
// 1.1. FRAGENKATALOG:
// DE: Die erste Spalte der CSV-Datei enthält eine Kurzzusammenfassung der Frage, die zweite Spalte enthält die eigentliche Frage.
// z.B. "Flughafenausbau","Der Flughafen soll ausgebaut werden."

// ********************************************************************

// 1.1. LIST OF QUESTIONS:
// EN: First row always contains a short summary of the question while the second row holds the question itself. 
// e.g. "Airport","The airport shall be expanded."

var fileQuestions = "Fragen.csv";
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1.2. LISTE DER PARTEIEN und KANDIDATEN:

// 1.2.1. Liste der Parteipositionen und Begruendungen.
// DE: Die Inhalte der Listen bitte mit Komma trennen, Reihenfolge beachten und mit "" umschliessen
// - richtig: "Partei-A, Partei-B"
// - falsch:  "Partei-A, Partei-B -> fehlendes " am Ende
// - falsch:  "Partei-A Partei-B" -> fehlendes Komma

// ********************************************************************

// 1.2. LIST OF PARTIES and CANDIDATES:

// 1.2.1. List of party positions and reasons.
// EN: Please separate the contents of lists with comma, follow the right order and enclose it with ""
// - right: "Party-A, Party-B"
// - wrong:  "Party-A, Party-B -> missing " at the end
// - wrong:  "Party-A Party-B" -> missing comma
var strPartyFiles = "Apfelpartei.csv, Bananenpartei.csv, Citronenpartei.csv , Neutrale.csv";

// 1.2.2. Liste der Parteinamen - kurz
// 1.2.2. List of party names - short
var strPartyNamesShort = "APPD,Bananen,TBC,Neutrale";

// 1.2.3. Liste der Parteinamen - lang
// 1.2.2. List of party names - long
var strPartyNamesLong = "Appelpartei Deutschlands, Bananenrepublikpartei , Tradionelle Bundesdeutsche Citronenpartei, Neutrale Partei";

// 1.2.4. Logos der Parteien (und Bildgroesse fuer alle, Ursprungseinstellung = 50x25px)
// 1.2.4. Logos of parties (and picture size for all, default = 50x25px)
var strPartyLogosImg = " appel.png  , banane.jpg, tbc.gif,    egal.png   ";

// DEMNÄCHST VERALTET und wird ersetzt durch schicke, automatisch skalierte Bilder (Bootstrap) 
// TO BE DEPRECATED and to be replaced with fancy automatic sized images (Bootstrap) 
var intPartyLogosImgWidth = 50;
var intPartyLogosImgHeight = 25;

// 1.2.5. Internetseiten der Parteien/Kandidaten ohne http:// - Link oeffnet sich im neuen Fenster.
// 1.2.5. Website of parties/candidates without http:// - Link opens in a new window.
var strPartyInternet = "www.appelpartei.ap, www.banane.ba, www.die-citronen.ca, www.neutrale-partei.np";

// DEPRECATED v.0.3
// 1.2.6. Anzahl der Parteien, die in der detaillierten Auswertung sofort angezeigt werden sollen. 0 = alle
// 1.2.6. Number of parties to show in the detailed analysis. 0 = all
// var intPartyDefaultShow = 3
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1.3. UeBERSCHRIFTEN UND TEXTE:
// 1.3. HEADLINES AND TEXTS:

// 1.3.1. Hauptueberschrift
// 1.3.1. Main headline
var heading1 = "Fruchtkorbwahlen";

// 1.3.2. Zweite Ueberschrift
// 1.3.2. Second Headline
var heading2 = "Die Wahl zur neuen Regierung in Obsthausen.";

// 1.3.3. Kurzer Text um was es bei der Wahl geht
// 1.3.3. Short (explaining) text on what's the election about
var explainingText = "Am 30. Februar finden in Obsthausen Wahlen statt. Sie k&ouml;nnen sich hier alle Parteipositionen anschauen und miteinander vergleichen. Dies ist keine Wahlempfehlung, sondern ein Informationsangebot zu Wahlen!"; 
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// 1.4. IMPRESSUM, KONTAKT:
// 1.4. IMPRINT, CONTACT:
// 
// DE: Sie können auch Ihre eigene Erklärung benutzen. Muster finden Sie z.B. auf:
// http://www.e-recht24.de/muster-disclaimer.htm oder http://www.datenschutz-generator.de/
// 
// Auch wenn Sie keine (oder eigene) Angaben machen, so lassen Sie bitte die Variablen stehen.
// Loeschen Sie stattdessen einfach den Text, z.B.
// var imprintEditorialNames = "";

// ********************************************************************

// EN: If you already have your own legal notice, you can link to it here
//
// If you prefer to leave these information blank, please do not delete these lines 
// but only its content, e.g.
// var imprintEditorialNames = "";

// 1.4.1. (optional) Redaktion: Person(en), die die Fragen ausgearbeitet hat
// 1.4.1. (optional) Editor: Person(s), who worked on the questions
var imprintEditorialNames = "Max Mustermann, Martina Mustermann, Harry Hirsch";

// 1.4.2. (optional) Redaktion: Kontakt-E-Mail
// 1.4.2. (optional) Editor: Contact email
var imprintEditorialEmail = "max@mustermann-politikfreund.de";

// 1.4.3. (optional) Technik: Person(en), die das System aufgesetzt hat
// 1.4.3. (optional) Programming: Person(s), who set up the system
var imprintTechnicsNames = "Max Mustermann, Hans Wurst";

// 1.4.4. (optional) Technik: Kontakt-E-Mail
// 1.4.4. (optional) Programming: Contact email
var imprintTechnicsEmail = "info@hans-wurst-webdesign-obsthausen.com";

// 1.4.5. (optional) Quellenangaben zu den Bildern
// 1.4.5. (optional) Sources of pictures
var imprintPictures = "Wikipedia, Max Mustermann, Foto Franz Frankfurt, Neutrale Partei";

// 1.4.6. (optional) Link zu einer Datenschutzerklaerung ohne http:// - erlaubt die anonyme Statistik
// 1.4.6. (optional) Link to a privacy policy without http:// - allows the anonymous statistics
var imprintPrivacyUrl = "www.hans-wurst-webdesign-obsthausen.com/datenschutz.html";
// --------------------------------------------------------------------


///////////////////////////////////////////////////////////////////////
// 2. ERWEITERTE EINSTELLUNGEN:
// 2. ADVANCED SETTINGS

// 2.1. Trennzeichen fuer die CSV-Dateien (Excel benutzt haeufig Semikolon, OpenOffice/LibreOffice ein Komma)
// 2.1. Separator for CSV files (Excel uses often a semicolon, OpenOffice/LibreOffice a comma)
var separator = ";";

// 2.2. Designvorlage (CSS) im Ordner /styles
// 2.2. Design (CSS) in folder /styles  
var design = "default";

// Sprache / Language
// see files in folder /i18n/
var language = "de";


///////////////////////////////////////////////////////////////////////
// 3. PROFESSIONELLE EINSTELLUNGEN:
// 3. PROFESSIONAL SETTINGS

// DE: STATISTIK
// Anonyme Auswertung zulassen: true/1 oder false/0 
// Die Einwilligung des Nutzers und eine Datenschutzerklaerung (s.o.) werden benoetigt! (*)
// Als Ergebnis erhaelt man die Liste mit der persoenlichen Auswahl in der Variablen "mowpersonal" (-1,0,1,99) 
// und die Liste mit der Anzahl der Uebereinstimmungen mit den Parteien als "mowparties" (5,1,0,2) zurueck.
// Als Trennzeichen fuer die Werte dient wieder ein Komma. ;-)
// Das Skript und der Mat-O-Wahl sollten auf der gleichen Domain liegen. 

// ********************************************************************

// EN: STATISTICS
// Allow anonymous analysis: true/1 or false/0 
// Consent of the user and a privacy policy are needed! (*)
// As a result you'll get the list of personal choices in a variable "mowpersonal" (-1,0,1,99) 
// and a list with the number of party-matches as "mowparties" (5,1,0,2).
// Separator for these variables is a comma gain. ;-)
// The script and Mat-O-Wahl should be on the same domain.

var statsRecord = 1;
var statsServer = "http://localhost/extras/vote.php";

// -> Ergebnis an Statistik gesendet: / Result sent to statistic
// http://localhost/extras/vote.php?mowpersonal=-1,0,1,99&mowparties=5,1,0,2

// (*) In der OUTPUT.JS etwa auf Zeile 29 kann man die Checkbox automatisch als 
// "checked" / angeklickt definieren. Das entspricht dem Opt-In Verfahren.

// (*) In OUTPUT.JS at around line 29 you can define the checkbox as "checked".
// This would be an opt-in method.
