"use strict"

///////////////////////////////////////////////////////////////////////

/*
	DEFINITIONEN *** DEFINITIONS
	http://www.mat-o-wahl.de

	DE: Bei Problemen benutzen Sie bitte die "/QUICKTEST.HTML"
	Diese Datei am besten in einem Editor mit Syntaxhervorhebung bearbeiten. z.B. Notepad++, gedit, kate, ...
	Informationen zum Format der CSV-Dateien finden Sie unter: https://mat-o-wahl.de/
	Allgemeine Beschriftungen finden Sie unter "/i18n/i18n_de.js"

	********************************************************************

	EN: Please try "/QUICKTEST.HTML" in case of problems.
	Best to edit this file with an editor that uses syntax-highlighting, e.g.  Notepad++, gedit, kate, ...
	You can find more information on the CSV-files at: https://mat-o-wahl.de/
	General descriptive texts are located in  "/i18n/i18n_en.js"
*/


///////////////////////////////////////////////////////////////////////


//	Trennzeichen für die CSV-Dateien (Excel benutzt häufig Semikolon, OpenOffice/LibreOffice ein Komma)
//	Delimiter for CSV files (Excel often uses a semicolon, OpenOffice/LibreOffice a comma)
const delimiter = ";";


///////////////////////////////////////////////////////////////////////

//	1. WILLKOMMENS-BILDSCHIRM / WELCOME-SCREEN

// 	Soll am Anfang eine kurze Beschreibung angezeigt (1) werden oder sollen gleich die Fragen (0) starten?
// 	Show a short description in the beginning (1) or start with the questions right (0) away?
let descriptionShowOnStart = 1


// 	Eigener Name des X-o-mat / Individual name of your X-o-mat
const my_o_mat = "Frucht-o-Mat";


// 	Hauptueberschrift / Main headline
const descriptionHeading1 = "Fruchtkorbwahlen";


// 	Zweite Ueberschrift / Second Headline
const descriptionHeading2 = "Die Wahl zur neuen Regierung in Obsthausen";


// 	Kurzer Text um was es bei der Wahl geht / Short (descriptive) text on what's the election about
const descriptionExplanation = "Am 30. Februar finden in Obsthausen Wahlen statt. Sie k&ouml;nnen sich hier alle Parteipositionen anschauen und miteinander vergleichen. Dies ist <strong>keine Wahlempfehlung</strong>, sondern ein Informationsangebot zu Wahlen! <br /> Zur Auswahl stehen vier Parteien mit unterschiedlichen Meinungen zu kontroversen Themen der Obst- und Frucht-Landschaft."; 


///////////////////////////////////////////////////////////////////////


//	2a. FRAGEN - allgemein / QUESTIONS - in general

//	Name und Ort der CSV-Datei mit den Fragen.
//	Name and location of the CSV-file with questions.
//const fileQuestions = "https://raw.githubusercontent.com/msteudtn/Mat-O-Wahl/refs/heads/v0.7.0/data/Obsthausen_Fragen_08x.csv"
const fileQuestions = "data/Obsthausen_Fragen_08x.csv"


//	Anzahl der Fragen / Number of questions
 const intQuestions = 8;


//	DE: Sollen die Fragen in KATEGORIEN einsortiert werden? -> nein = 0; ja = Spaltennummer, z.B. 3
//	    Nicht zu verwechseln mit Filter / Kandidaten-Kategorien!
//	EN: Should the questions be sorted into CATEGORIES? -> no = 0; yes = number of column, i.e. 3
//	    Not to be confused with filters / candidate's categories!
//
//	CSV: "Short title of question" ; "The long text of the question" ; "Category ABC"
const intQuestions_categories_rowInCSV = 3;


//	DE: Einige Fragen benötigen eine ERKLÄRUNG. Sie können mehr Informationen mit einem Trennzeichen Ihrer Wahl in die CSV-Datei hinzufügen.
//	Dieses Trennzeichen wird auf dem "Mehr Informationen"-Knopf angezeigt. (z.B. Unicode "Circled Latin Small Letter I" &#9432;)
//	Es kann nur eine Erklärung pro Frage angegeben werden. Beispiel:
//
//	"Short title of question" ; "The long text of the question with complicated &#9432; topics" ; "An explanation in a following column"
//
//	EN: Some questions need further EXPLANATION. You can add more information in the CSV files between a text of your choice. 
//	This string will be shown on a button to show more details. (i.e. Unicode "Circled Latin Small Letter I" &#9432;)
//	There can be only one explanation per question. Example above.
const strQuestions_moreInformation_symbol = "&#9432;" // "&#8505;" // "&#128712;"


//	In welcher CSV-Spalte steht die Erklärung zur Frage? -> keine Erklärung = 0; sonst Spaltennummer, z.B. 4
//	Which column is the explanation in? -> no explanation = 0; otherwise number of column, i.e. 4
const intQuestions_moreInformation_rowInCSV = 4;


///////////////////////////////////////////////////////////////////////


//	2b. FRAGEN - Knöpfe / QUESTIONS - Buttons

//	Anzahl der Fragen-Buttons. Standard ist 2, sonst 4, Beispiel:
//	Number of question-buttons. Default is 2, otherwise 4, Example:
//	2 =               [pro] - [...] - [contra]
//	4 = [extra pro] - [pro] - [...] - [contra] - [extra contra]
const intQuestionButtons = 4


//	DE: Zeige Button [neutral / egal] -> ja = 1; nein = 0
//	EN: Show button [neutral] -> yes = 1; no = 0
const intShowButtonNeutral = 1


//	Zeige Button [x2 doppelt gewichten] -> ja = 1; nein = 0
//	Show button [x2 double]  -> yes = 1; no = 0
const intShowButtonDouble = 1


//	DE: Zeige Button [x2 überspringen] -> ja = 1; nein = 0
//	EN: Show button [x2 skip]  -> yes = 1; no = 0
const intShowButtonSkip = 1


///////////////////////////////////////////////////////////////////////



//	KANDIDATEN / CANDIDATES

//	Name und Ort der CSV-Datei mit den Kandidaten.
//	Name and location of the CSV-file with candidates.
// const fileCandidates = "https://raw.githubusercontent.com/msteudtn/Mat-O-Wahl/refs/heads/v0.7.0/data/Obsthausen_Parteien_08Fragenx09Parteien.csv";
const fileCandidates = "data/Obsthausen_Parteien_08Fragenx09Parteien.csv"


///////////////////////////////////////////////////////////////////////


// 	ERGEBNISSE / RESULTS

//	DE: Begrenze die Anzahl der Ergebnisse auf X Ergebnisse am Anfang oder zeige alle (0) sofort an.
//	    Wenn Sie die Ergebnisse begrenzen (z.B. "3"), erscheinen zwei Knöpfe um mehr Ergebnisse einzublenden.
//	EN: Limit the number of results at the beginning to X or show all (0).
//	    If you limit the results (e.g. to "3"), two buttons will appear to show more results.
//
//	    * 1. apples - 90% 
//	    * 2. bananas - 80% 
//	    * 3. citron - 75% 
//	    [ show less ] - [ show more ]
const intLimitResults = 3


//	DE: Zeige einen Filter in den Ergebnissen anhand der Kandidaten-Kategorien (nicht: Fragen-Kategorien) an. -> ja = 1; nein = 0
//	    Kategorien stehen als Spalte 3-n in der Zeile "filter". Beispiel:
//	EN: Show a filter in the results based on the candidate's categories (not: question-categories). yes = 1, no = 0
//	    Categories are in colum 3-n in the line with "filter"
//	CSV: "Candidate-filter" ; "Local fruits" ; "Yellow fruits" ; "Red fruits"; "Green fruits" ; "Round fruits"
const intShowResultsFilter = 1



///////////////////////////////////////////////////////////////////////


//	AUSSEHEN / LOOK

//	Sprache / language
//	Siehe Ordner / see folder: "/i18n/" -> "de" = i18n_de.js, "en" = i18n_en.js, ...
const language = "de";


//	DE: Die Standard-CSS-Designvorlagen können überschrieben oder angepasst werden.
//	    Standardmäßig werden zwei Dateien aus dem Ordner "/styles/" genutzt. Beispiele:
//
//	const design = ["styles/default.css","styles/bootstrap-override.css"];
//	const design = ["../other_folder/my-personal-style.css"];
//
// 	EN: Default designs can be adjusted or overwritten.
//	    By default, Mat-o-Wahl uses two CSS files from "/styles/". Examples above.
const design = ["styles/default.css","styles/bootstrap-override.css"];


///////////////////////////////////////////////////////////////////////


//	IMPRESSUM, KONTAKT / LEGAL NOTICE, CONTACT

//	DE: OPTION (A) Eigenes Impressum (empfohlen) -> Link anpassen und Option (B) ignorieren!
//	    Empfohlener Hinweis bei einem eigenen Impressum (aber keine Pflicht)
//	    "Der XXXXX-o-Mat basiert auf dem www.Mat-O-Wahl.de und ist freie Software unter GPL 3 Lizenz."
//	EN: OPTION (A) Own legal notice (recommended) -> change link and ignore option (B)!
//	    Please add (if possible) a little note to your site, like this:
//	    "XXXXX-o-Mat is based on www.Mat-O-Wahl.de and free software under GPL3 license."
const imprintLink = "system/imprint.html"


//	OPTION (B) (Standard)-Mat-o-Wahl-Impressum.
//	OPTION (B) Use (default) legal notice of Mat-o-Wahl.
// 	Allgemeines. "Angaben gemäß § 5 TMG" / General information
const imprintGeneral = `<p>Muster e. V.<br /> 
			Musterstra&szlig;e 111<br />
			Geb&auml;ude 44<br />
			90210 Musterstadt</p>

			<p>Vereinsregister: VR 12 3456<br />
			Registergericht: Amtsgericht Musterstadt</p>

			<p><strong>Vertreten durch:</strong><br />
			Vorstand: Dr. Harry Mustermann<br />
			Luise Beispiel</p>`


// 	Kontaktdaten / Contact details
const imprintContact = `<p>Telefon: +49 (0) 123 44 55 66<br />
			Telefax: +49 (0) 123 44 55 99<br />
			E-Mail: mustermann@musterfirma.de<br />
			Web: musterfirma.de</p>`


//	(optional) Umsatzsteuer-ID / (optional) VAT-ID
const imprintVATid = `<p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
			DE 999 999 999</p>`


//	(optional) Redaktion: Person(en), die die Fragen ausgearbeitet hat
//	(optional) Editors: Person(s), who worked on the questions
const imprintEditors = `<p>Max Mustermann, Martina Mustermann, Harry Hirsch</p>
		     <p> <a href='mailto:max@mustermann-politikfreund.de'>max@mustermann-politikfreund.de</a></p>`;


//	(optional) Technik: Person(en), die das System aufgesetzt hat
//	(optional) Programming: Person(s), who set up the system
const imprintProgramming = `<p>Max Mustermann, Hans Wurst</p>
			<p> <a href='mailto:info@hans-wurst-webdesign-obsthausen.com'>E-Mailadresse</a> </p>`;


//	(optional) Quellenangaben zu den Bildern
//	(optional) Sources of pictures
const imprintPictures = `<p> Bilder mit freundlicher Genehmigung von / Pictures with permission from: 
			<br /> Max Mustermann, Foto Franz Frankfurt
			<br /> Äpfel: Von Glysiak - Eigenes Werk, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=8146365
			<br /> Bananen: Von Steve Hopson, www.stevehopson.com, CC BY-SA 2.5, https://commons.wikimedia.org/w/index.php?curid=1541726
			<br /> Zitronen: Von André Karwath aka Aka - Eigenes Werk, CC BY-SA 2.5, https://commons.wikimedia.org/w/index.php?curid=59992 
			<br /> Erdbeeren: Von Jon 'ShakataGaNai' Davis, CC BY-SA 3.0, via Wikimedia Commons https://commons.wikimedia.org/wiki/File:Bowl_of_Strawberries.jpg 
			<br /> Schwarz-weißer Fabrverlauf für Neutrale Partei: Eigenes Werk`;


//	(optional) Link zu einer Datenschutzerklaerung -> nötig für die anonyme Statistik
//	(optional) Link to a privacy policy -> necessary for anonymous statistics
const imprintPrivacyUrl = "https://www.hans-wurst-webdesign-obsthausen.com/datenschutz.html";


///////////////////////////////////////////////////////////////////////


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
	DE: STATISTIK
	Anonyme Auswertung zulassen? -> ja = 1; nein = 0 
	Die Einwilligung des Nutzers und eine Datenschutzerklaerung (s.o.) werden benoetigt!
	Ein Aufruf könnte so aussehen:

	https://my-domain.com/analysis.php?mowpersonalanswers=1,-1,-1,-1,-1,1,0,1&mowpersonalmultiplier=1,1.5,1,2,3,1,0,1&mowcandidatespoints=10.5,8,5.25,3.5,3,2,2,2,2

	mowpersonalanswers    = [1, -1,-1,-1,-1,1,0,1]      = personal answers (yes / no / neutral / skip)
	mowpersonalmultiplier = [1,1.5, 1, 2, 3,1,0,1]      = personal importance (strong yes / yes / no / strong no / doubled)
	mowcandidatespoints   = [10.5,8,5.25,3.5,3,2,2,2,2] = points of the candidates in their CSV-order

	EN: STATISTICS
	Allow anonymous analysis? yes = 1; no = 0 
	An opt-in by the user and a privacy policy are necessary!
	A call to the server could look like the example above.
*/

const statsRecord = 0;
const statsServer = "http://localhost:8082/extras/statistics/vote_txt.php";
