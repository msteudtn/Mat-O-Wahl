"use strict"

///////////////////////////////////////////////////////////////////////

/*
	DEFINITIONEN *** DEFINITIONS
	http://www.mat-o-wahl.de

	DE: Bei Problemen benutzen Sie bitte die /QUICKTEST.HTML 
	oder lesen in der /SYSTEM/MAT-O-WAHL-HILFE.PDF nach.
	Diese Datei am besten in einem Editor mit Syntaxhervorhebung bearbeiten. z.B. Notepad++, gedit, kate, ...

	********************************************************************

	EN: Please try QUICKTEST.HTML in case of problems.
	Edit this file with an editor that uses syntax-highlighting, e.g.  Notepad++, gedit, kate, ...
*/

///////////////////////////////////////////////////////////////////////

/*
	1. ALLGEMEINE / EINFACHE EINSTELLUNGEN:

	DE: Bei den CSV-Dateien bitte beachten: 
	- ueberall das gleiche Trennzeichen benutzen (z.B. immer nur Komma)
	- Zweispaltig aufbauen, z.B.
	-- richtig: 	1,"Wir sind dafür" 
	-- richtig: 	1,"" 
	-- grenzwertig: 1,
	-- falsch:  	1

	Bei Problemen mit Umlauten und Sonderzeichen benutzen Sie bitte
	den entsprechenden HTML-Code. z.B. ä = ae = &auml; Anführungszeichen = &quot; 
	Siehe: http://de.selfhtml.org/html/allgemein/zeichen.htm#umlaute

	********************************************************************

	1. GENERAL / SIMPLE SETTINGS

	EN: When creating the CSV files, please take care of:
	- use always the same separator (e.g. always comma)
	- use two rows, e.g.
	-- right: 	1,"We support it" 
	-- right: 	1,"" 
	-- borderline: 	1,
	-- wrong:  	1

	In case of problems with special characters, please use its HTML code
	see here: https://www.utexas.edu/learn/html/spchar.html

*/

// 	--------------------------------------------------------------------

/*
	1.1. FRAGENKATALOG:
	DE: Die erste Spalte der CSV-Datei enthält eine Kurzzusammenfassung der Frage, die zweite Spalte enthält die eigentliche Frage.
	z.B. "Flughafenausbau","Der Flughafen soll ausgebaut werden."

	********************************************************************

	1.1. LIST OF QUESTIONS:
	EN: First row always contains a short summary of the question while the second row holds the question itself. 
	e.g. "Airport","The airport shall be expanded."
*/

const fileQuestions = "https://raw.githubusercontent.com/msteudtn/Mat-O-Wahl/refs/heads/v0.7.0/data/Obsthausen_Fragen_06x.csv";
// const fileQuestions = "data/Obsthausen_Fragen.csv"

// 	--------------------------------------------------------------------

//	1.2 ANZAHL der FRAGEN / 1.2 NUMBER of QUESTIONS

 const intQuestions = 6;
// const intQuestions = 36;

//	1.2a KATEGORIEN / 1.2 CATEGORIES

const intQuestionCategoriesActive = 0;


const objQuestionCategories = {
		q1: {"questions" : "1-2", "topic" : "Farbe und Form"},
		q2: {"questions" : "4,6", "topic" : "Geschmack"},
		q3: {"questions" : "3-4,5", "topic" : "Anderes"},
		q4: {"questions" : "1-2,3,4-5,6", "topic" : "Alle"}
		}


// 	--------------------------------------------------------------------

/* 
	1.3. KANDIDATEN, KANDIDATEN-INFORMATIONEN und ANTWORTEN

	Die Datei hat folgenden Aufbau:
		0;Parteiname kurz (z.B. APPD)
		0;Parteiname lang (z.B. Appelpartei Deutschlands)
		0;Beschreibung (optional, z.B. Die Apfelpartei steht seit vielen Jahren für alle Angelegenheiten des Apfels.)
		0;Webseite (z.B. https://www.appelpartei.ap)
		0;Logo / Bilddatei (z.B. appel.png)
		  Danach kommen die Antworten der Parteien, z.B.
		-1;Wir sind dagegen weil ...
		0;Das ist uns egal
		1;Wir sind dafür weil ...
		0;Zum Schluss kommt noch ein Leerzeile ohne Funktion, nur für die Übersicht. Danach geht es mit der nächsten Partei weiter.

	********************************************************************

 	1.3. PARTIES, PARTY-INFORMATION and ANSWERS
*/

// const fileCandidates = "data/Obsthausen_Parteien.csv";
const fileCandidates = "https://raw.githubusercontent.com/msteudtn/Mat-O-Wahl/refs/heads/v0.7.0/data/Obsthausen_Parteien_06Fragenx04Parteien.csv";



// 	--------------------------------------------------------------------

/*

	Version 0.7.x: DEPRECATED / VERALTET

 	1.5. BILDGROESSE des PARTEILOGOS (am Ende)
	DE: Die Breite und Höhe kann in Pixel und Prozent angegeben werden. 

	********************************************************************

	1.5. PICTURE SIZE OF PARTY-LOGO (at the end)
	EN: Width and height can be defined in pixels or percent. 


	Beispiele / Examples:
	const intPartyLogosImgWidth = 50;
	const intPartyLogosImgHeight = 25;

	const intPartyLogosImgWidth = "10%";
	const intPartyLogosImgHeight = "10%";

	const intPartyLogosImgWidth = 50;
	const intPartyLogosImgHeight = "";

*/ 

// const intPartyLogosImgWidth = "10%";
// const intPartyLogosImgHeight = "10%";

// 	--------------------------------------------------------------------


// 	1.6. UeBERSCHRIFTEN UND TEXTE / 1.6. HEADLINES AND TEXTS:

// 	1.6.2. Eigener Name des X-o-mat / Individual name of your X-o-mat

const my_o_mat = "Frucht-o-Mat";


// 	1.6.2. Hauptueberschrift / Main headline

const descriptionHeading1 = "Fruchtkorbwahlen";


// 	1.6.3. Zweite Ueberschrift / Second Headline

const descriptionHeading2 = "Die Wahl zur neuen Regierung in Obsthausen";


// 	1.6.4. Kurzer Text um was es bei der Wahl geht / Short (descriptive) text on what's the election about

const descriptionExplanation = "Am 30. Februar finden in Obsthausen Wahlen statt. Sie k&ouml;nnen sich hier alle Parteipositionen anschauen und miteinander vergleichen. Dies ist <strong>keine Wahlempfehlung</strong>, sondern ein Informationsangebot zu Wahlen! <br /> Zur Auswahl stehen vier Parteien mit unterschiedlichen Meinungen zu kontroversen Themen der Obst- und Frucht-Landschaft."; 


// 	--------------------------------------------------------------------

/*
	1.7. IMPRESSUM, KONTAKT: / LEGAL NOTICE, CONTACT:

	DE: OPTION A) Eigenes Impressum (empfohlen) -> Link anpassen und Option B ignorieren!
	Muster finden Sie z.B. auf: http://www.e-recht24.de/ oder http://www.datenschutz-generator.de/

	Empfohlener Hinweis bei einem eigenen Impressum (aber keine Pflicht)
	"Der XXXXX-o-Mat basiert auf dem www.Mat-O-Wahl.de und ist freie Software unter GPL 3 Lizenz."

	********************************************************************

	EN: OPTION A) Own legal notice (recommended) -> change link and ignore option B!


*/

	const imprintLink = "system/imprint.html"


// 	--------------------------------------------------------------------

/*

	DE: OPTION B) (Standard)-Mat-o-Wahl-Impressum.
	Wenn Sie keine (oder eigene) Angaben machen, so lassen Sie bitte die Variablen-Namen stehen.
	Loeschen Sie stattdessen einfach den Text, z.B.
	const imprintVATid = ``   oder   const imprintVATid = "";

	********************************************************************

	EN: OPTION B) Use (default) legal notice of Mat-o-Wahl.
	If you prefer to leave these information blank, please do not delete the variables
	but only its content, e.g.
	const imprintVATid = ``   or   const imprintVATid = "";

*/

// 	1.7.B.1: Allgemeines. "Angaben gemäß § 5 TMG" / General information

const imprintGeneral = `<p>Muster e. V.<br /> 
			Musterstra&szlig;e 111<br />
			Geb&auml;ude 44<br />
			90210 Musterstadt</p>

			<p>Vereinsregister: VR 12 3456<br />
			Registergericht: Amtsgericht Musterstadt</p>

			<p><strong>Vertreten durch:</strong><br />
			Vorstand: Dr. Harry Mustermann<br />
			Luise Beispiel</p>`


// 	1.7.B.2: Kontaktdaten / Contact details

const imprintContact = `<p>Telefon: +49 (0) 123 44 55 66<br />
			Telefax: +49 (0) 123 44 55 99<br />
			E-Mail: mustermann@musterfirma.de<br />
			Web: musterfirma.de</p>`


//	1.7.B.3: (optional) Umsatzsteuer-ID / (optional) VAT-ID

const imprintVATid = `<p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
			DE 999 999 999</p>`

//	1.7.B.5
//	(optional) Redaktion: Person(en), die die Fragen ausgearbeitet hat
//	(optional) Editor: Person(s), who worked on the questions

const imprintEditors = `<p>Max Mustermann, Martina Mustermann, Harry Hirsch</p>
		     <p> <a href='mailto:max@mustermann-politikfreund.de'>max@mustermann-politikfreund.de</a></p>`;


//	1.7.B.6
//	(optional) Technik: Person(en), die das System aufgesetzt hat
//	(optional) Programming: Person(s), who set up the system

const imprintProgramming = `<p>Max Mustermann, Hans Wurst</p>
			<p> <a href='mailto:info@hans-wurst-webdesign-obsthausen.com'>E-Mailadresse</a> </p>`;


//	1.7.B.7
//	(optional) Quellenangaben zu den Bildern
//	(optional) Sources of pictures

const imprintPictures = `<p> Bilder mit freundlicher Genehmigung von / Pictures with permission from: 
			<br /> Max Mustermann, Foto Franz Frankfurt, Neutrale Partei
			<br /> Äpfel: Von Glysiak - Eigenes Werk, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=8146365
			<br /> Bananen: Von Steve Hopson, www.stevehopson.com, CC BY-SA 2.5, https://commons.wikimedia.org/w/index.php?curid=1541726
			<br /> Zitronen: Von André Karwath aka Aka - Eigenes Werk, CC BY-SA 2.5, https://commons.wikimedia.org/w/index.php?curid=59992 `;


//	1.7.B.8
//	(optional) Link zu einer Datenschutzerklaerung beginnend mit http(s) -> nötig für die anonyme Statistik
//	(optional) Link to a privacy policy starting with http(s) -> necessary for anonymous statistics

const imprintPrivacyUrl = "https://www.hans-wurst-webdesign-obsthausen.com/datenschutz.html";
// const imprintPrivacyUrl = ""

//	--------------------------------------------------------------------


///////////////////////////////////////////////////////////////////////

// 2. ERWEITERTE EINSTELLUNGEN: / 2. ADVANCED SETTINGS


//	2.1 Standard-Sprache / Default language
//	see files in folder /i18n/ -> "de" = i18n_de.js, "en" = i18n_en.js, ...

const language = "de";

// 	--------------------------------------------------------------------

// 	1.6.1 Soll am Anfang eine kurze Beschreibung angezeigt (1) werden oder sollen gleich die Fragen (0) starten?
// 	Show a short description in the beginning (1) or start with the questions right (0) away?

let descriptionShowOnStart = 1

// 	--------------------------------------------------------------------

//	Anzahl der Fragen-Buttons. Standard ist 3
//	Number of question-buttons. Default is 3
//	Beispiel / Example:
//	3 =               [pro] - [neutral] - [contra]
//	5 = [extra pro] - [pro] - [neutral] - [contra] - [extra contra]

const intQuestionButtons = 5


//	DE: Zeige Button [neutral / egal] -> ja (1) - nein (0)
//	In Verbindung mit "intQuestionButtons = 3" bleibt nur noch [pro] [contra]
//	EN: Show button [neutral] -> yes (1) - no (0)
//	In connection with "intQuestionButtons = 3" only [pro] [contra] remains.
//	Attention / Known bug: It's still possible to vote neutral in the "results by question"

const intShowButtonNeutral = 1


//	Zeige Button [x2 doppelt gewichten] -> ja (1) - nein (0)
//	Show button [x2 double]  -> yes (1) - no (0)
//	Attention / Known bug: It's still possible to vote double in the "results by question"

const intShowButtonDouble = 1


//	DE: Zeige Button [x2 überspringen] -> ja (1) - nein (0)
//	Achtung: Fragen können trotzdem innerhalb der Navigation ("indicator") übersprungen werden
//	EN: Show button [x2 skip]  -> yes (1) - no (0)
//	Attention / Known bug: It's still possible to skip questions using the navigation ("indicator") and in the "results by question"

const intShowButtonSkip = 1

// 	--------------------------------------------------------------------

//	2.1. Trennzeichen fuer die CSV-Dateien (Excel benutzt haeufig Semikolon, OpenOffice/LibreOffice ein Komma)
//	2.1. Delimiter for CSV files (Excel often uses a semicolon, OpenOffice/LibreOffice a comma)

const delimiter = ";";


/*	
	2.2. CSS-Designvorlage(n)  

	Der Mat-o-Wahl nutzt das "Bootstrap"-Framework für mobile Ansichten.
	Alle Standard-Bootstrap-Einstellungen können aber überschrieben werden. 	
	Die Dateien finden sich im Ordner /STYLES.
	Beispiele für das DESIGN-Aray:

	********************************************************************

	const design = ["default.css","buttons-colors-on.css", "progressbar.css"];
	const design = ["default.css","buttons-colors-off.css", "progressbar.css"];
	const design = ["default.css","buttons-colors-on.css"];
	const design = ["my-personal-styles.css"];

	********************************************************************

	2.2. CSS-Design(s) 

	Mat-o-Wahl uses the "bootstrap" framework for responsive design.
	All default settings can be overwritten.
	You can find the files in the /STYLES folder.
	Please find some examples above.  
*/  

const design = ["default.css","bootstrap-override.css"];


/*
	2.3. Add-ons / Plug-Ins / Extras  

	Man kann eigene und fremde Addons einbinden. 
	Einige Beispiele liegen im Ordner /EXTRAS.
	Die Einstellungen finden sich üblicherweise innerhalb den dortigen Dateien.
	Beispiele für das ADDONS-Aray:

	********************************************************************

	const addons = ["extras/addon_results_textfilter_by_button.js"]
	const addons = ["extras/addon_results_textfilter_by_button.js", "extras/addon_check_iframe_resize_client.js", "extras/addon_limit_results.js", "extras/addon_favorite_party.js", "extras/addon_show_first_results.js"]
	const addons = []
	const addons = ["my_folder/my_file.js"]	

	********************************************************************

	2.3. Add-ons / Plug-Ins / Extras

	You can include your own and external add-ons.
	Some examples are in the folder /EXTRAS.
	The settings are usually inside the corresponding files.
	Please find some examples above.  

*/

const addons = []



///////////////////////////////////////////////////////////////////////

/*
	3. PROFESSIONELLE EINSTELLUNGEN:
	3. PROFESSIONAL SETTINGS

	DE: STATISTIK
	Anonyme Auswertung zulassen: true/1 oder false/0 
	Die Einwilligung des Nutzers und eine Datenschutzerklaerung (s.o.) werden benoetigt!
	Als Ergebnis erhaelt man die Liste mit der persoenlichen Auswahl in der Variablen "mowpersonal" (-1,0,1,99) 
	und die Liste mit der Anzahl der Uebereinstimmungen mit den Parteien als "mowparties" (5,1,0,2) zurueck.
	Als Trennzeichen fuer die Werte dient wieder ein Komma. ;-)
	Das Skript und der Mat-O-Wahl sollten auf der gleichen Domain und Netzwerk-Protokoll liegen. (kein "cross origin" / CORS)

	********************************************************************

	EN: STATISTICS
	Allow anonymous analysis: true/1 or false/0 
	Consent of the user and a privacy policy are needed!
	As a result you'll get the list of personal choices in a variable "mowpersonal" (-1,0,1,99) 
	and a list with the number of party-matches as "mowparties" (5,1,0,2).
	Separator for these variables is a comma gain. ;-)
	The script and Mat-O-Wahl must be on the same domain and network-protocoll. (no "cross origin" / CORS)
*/

const statsRecord = 1;
 const statsServer = "http://localhost:8082/extras/statistics/vote_txt.php";
// const statsServer = ""

/*
	-> POST-Aufruf der gesendeten Ergebnisse / POST-Call of sent results:
	http://localhost/extras/statistics/vote_txt.php?mowpersonal=-1,0,1,99&mowparties=5,1,0,2

*/
