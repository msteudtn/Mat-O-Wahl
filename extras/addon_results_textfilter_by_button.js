///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// FUNKTION / FUNCTION
// * Filtert Text in den Ergebnislisten anhand eines Zeichens / Zeichenkette.
// Nützlich für mehrere Wahlen, z.B. Bürgermeister + Stadtrat
 // * Filters text in the results based on a character or string.
// Useful for multiple elections (Mayor + Council) 

// 1.) Sonderzeichen oder Zeichenkette für die Filter (im Array) bestimmen
// Define special character or string for filter (in an array)
// Beispiel / example: U+1F464 (128100)	- BUST IN SILHOUETTE (Menschliche Silhouette)
// https://de.wikipedia.org/wiki/Unicodeblock_Verschiedene_piktografische_Symbole
// ODER unsichtbare Zeichen / OR invisible characters:
// https://stackoverflow.com/questions/17978720/invisible-characters-ascii
// U+200B    Zero-Width Space       &#8203;
// U+200C    Zero Width Non-Joiner  &#8204;
// U+200D    Zero Width Joiner      &#8205;
// U+200E    Left-To-Right Mark     &#8206;
// U+200F    Right-To-Left Mark     &#8207;
var TEXTFILTER_KEYWORDS = ["&#8203;", "&#x1F464;", "&#8205;", "&#8206;"]

// 2.) Text für Buttons
// Text on buttons
var TEXTFILTER_BUTTONTEXTS = ["Alle anzeigen", "Bürgermeisterkandidaten &#x1F464; anzeigen", "Südfrüchte anzeigen", "Runde Früchte anzeigen"]


// 3.) Filter-Sonderzeichen in PARTEIEN-ANTWORTEN.CSV einfügen. Beispiel:
// Put the filter character(s) in PARTY-ANSWERS.CSV. Example:
// Partei_Beschreibung:;"Die Apfelpartei steht seit vielen Jahren für alle Angelegenheiten des Apfels. &#x1F464; &#8203; &#8206;"
// Partei_Beschreibung:;"Warum ist die Banane krumm? [...] alle Belange der Bananen.  &#8203; &#8205;"

// 4.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_results_textfilter_by_button.js"]

// 5.) Fertig. 
// That's it.


///////////////////////////////////////////////////////////////////////  


// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.


///////////////////////////////////////////////////////////////////////


// MutationObserver starten - prüft Änderungen im DOM
// https://medium.com/better-programming/js-mutationobserver-1d7aed479da2
// https://developer.mozilla.org/de/docs/Web/API/MutationObserver
function mow_addon_textfilter_MutationObserver() {

	// zu überwachende Zielnode (target) auswählen
	var target = document.querySelector('#resultsHeading');
	 
	// eine Instanz des Observers erzeugen und Callback-Funktion aufrufen
	var observer = new MutationObserver(mow_addon_textfilter_create_buttons)
	 
	// Konfiguration des Observers: alles melden - Änderungen an Daten, Kindelementen und Attributen
	var config = { 
		attributes: true, 
		childList: true, 
		subtree: true };
	 
	// eigentliche Observierung starten und Zielnode und Konfiguration übergeben
	observer.observe(target, config);
	 
	// später: Observation wieder einstellen
	// observer.disconnect();
}


// Buttons in Addon-DIV in INDEX.HTML schreiben
function mow_addon_textfilter_create_buttons() {

	// alten Inhalt (jedes Mal) löschen
	$("#resultsAddonTop").empty()

	// id "#resultsHeading" wird in fnStart() am Anfang geleert (empty()).
	// -> mutationObserver erkennt Änderung und aktiviert diese Funktion :(
	// -> prüfen, ob Inhalt in DIV existiert 
	resultsHeadingContent = $("#resultsHeading").text()

	if (!resultsHeadingContent) {
		// nix. Noch keine Ergebnisse im DIV
	}
	// schreibe Buttons
	else {
		divContent = '<div class="row">'

		// gehe durch Array und schreibe Inhalt
		for (i = 0; i < TEXTFILTER_BUTTONTEXTS.length; i++) {
			divContent += ' <div class="col">'
			divContent += '  <button type="button" class="btn btn-secondary btn-block mow_addon_textfilter_button'+i+'" onclick="mow_addon_textfilter_filter_tables(\''+TEXTFILTER_KEYWORDS[i]+'\','+i+');">'+TEXTFILTER_BUTTONTEXTS[i]+'</button>'
			divContent += ' </div>'
		} // end: for TEXTFILTER_BUTTONTEXTS.length

		divContent += '</div>'

		// bis Version 0.6.0.2 - alleinige Anzeige der Buttons über der Überschrift :(
		// $("#resultsAddonTop").append(divContent).fadeIn(750);
		 
		// Buttons OBEN anzeigen - UNTER der Überschrift und ÜBER der ersten Tabelle  
		$( divContent ).insertBefore( $("#resultsShort") ).fadeIn(750);
		
		// Buttons UNTEN anzeigen - UNTER den ausführlichen Auswertungen und über der Fußzeile
		$( divContent ).insertBefore( $("#sectionFooter") ).fadeIn(750); 

		// ersten Button mit ID 0 aktivieren, so dass er gleich eingefärbt ist.
		mow_addon_textfilter_color_buttons(0)

	} // end: else

}


// Filter-Funktion
// "search_keyword" und "status" kommen vom Button
// Status = Suchbegriff anzeigen (1) oder ausblenden (0)
function mow_addon_textfilter_filter_tables(search_keyword, idNumber) {
	
	// Button einfaerben
	mow_addon_textfilter_color_buttons(idNumber)


	var search_keyword = search_keyword.toUpperCase();

	// obere Tabelle filtern - kurze Übersicht der Ergebnisse mit Prozentbalken
	mow_addon_textfilter_hide_show_row(search_keyword, "resultsShortTable")
	
	// untere Tabelle 1 filtern - Ergebnisse sortiert nach Antworten
	// Das Filter-Suchwort steht im TBODY mit der ID "resultsByThesisAnswersToQuestion"+j". 
	// Die Frage steht in der Zeile darüber.
	for (j = 0; j <= (intQuestions-1); j++) {
		mow_addon_textfilter_hide_show_row(search_keyword, "resultsByThesisAnswersToQuestion"+j)
	}

	// untere Tabelle 2 filtern - Ergebnisse sortiert nach Parteien
	// Schritt 1: in TBODY den ausgeblendeten Text finden
	for (j = 0; j <= (intParties-1); j++) {
		mow_addon_textfilter_hide_show_row(search_keyword, "resultsByPartyAnswersToQuestion"+j)
	}

	// untere Tabelle 2 filtern - Ergebnisse sortiert nach Parteien
	// Schritt 2: in der Überschrift den ausgeblendeten Text finden
	for (j = 0; j <= (intParties-1); j++) {
		mow_addon_textfilter_hide_show_row(search_keyword, "resultsByPartyHeading"+j)
	}

}


// die eigentliche Filter-Funktion
// https://www.w3schools.com/howto/howto_js_filter_table.asp
function mow_addon_textfilter_hide_show_row(search_keyword, tableID) {
	
   table = document.getElementById(tableID);
	zeile = table.getElementsByClassName("row")

	if (tableID == "resultsShortTable") {
		// Anzahl der Zeilen (mit Bootstrap-Klasse "row") finden für FOR-Schleife  später
		// Nur relevant in der #resultsShortTable (oben) falls es noch extra Zeilen aus anderen Addons gibt.
		var resultsShortTable_rows = zeile
		var resultsShortTable_rows_length = resultsShortTable_rows.length - 1; // "-1" weil unten noch die Buttons "mehr" und "weniger" angefügt werden.
		var multiplikator = resultsShortTable_rows_length / intParties // z.B. 8 Zeilen / 4 Parteien = 2

		// Workaround: Bei "addon_limit_results" gibt es eine extra Zeile mit Buttons "Mehr / Weniger Ergebnisse anzeigen"
		// z.B. 36 Zeilen hier gefunden -> minus 1 = 35 Zeilen / 12 Parteien = 2,9 -> aufrunden = 3 		
		multiplikator = Math.ceil(multiplikator)	 
	}


	// Durch alle Zeilen gehen und diejenigen verstecken, ohne Suchbegriff.
	for (i = 0; i < zeile.length; i++) {

		// console.log(i+" "+zeile[i].textContent)
		txtValue = zeile[i].textContent || zeile[i].innerText;

		// Wenn Suchbegriff gefunden, dann CSS-display-Eigenschaft zurücksetzen. = anzeigen
		// ... oder wenn CSS-(Pseudo)-Klasse "showAlwaysIsTrue" vorhanden ist = anzeigen (Buttons von addon_limit_results.js)
		if ( (txtValue.toUpperCase().indexOf(search_keyword) > -1) || ( zeile[i].className.indexOf("showAlwaysIsTrue") > -1 ) ) {

				zeile[i].style.display = ""
				zeile[i].style.visibility = ""				

			// Ausnahme: #resultsShortTable -> Klammerzeile #resultsShortPartyClampX ohne Klasse ".row" abfangen
			if (tableID == "resultsShortTable") {
				// Workaround für "addon_limit_results" mit der zusätzlichen Zeile
				// z.B. Anzahl Parteien x Multiplikator = Zähler = 12 x 3 = 36 = letzte Zeile mit Buttons "mehr / weniger anzeigen"
				// Hier NICHT das Elternelement verändern. 
				if (i == (intParties * multiplikator) ) {}
				else {
					zeile[i].parentElement.style.display = ""
				}

				// alle nachfolgenden, dazugehörigen "row" überspringen (und somit nicht ausblenden)  
				i = i + 	multiplikator -1;
			} 
			
		} 
		// wenn Suchbegriff nicht gefunden, dann CSS-display-Eigenschaft auf "none".
		// aber CSS:visibility belassen für "addon_limit_results.js" usw.
		else {

			zeile[i].style.display = "none"
			zeile[i].style.visibility = "" 

			// Ausnahme: #resultsShortTable -> Klammerzeile #resultsShortPartyClampX ohne Klasse ".row" abfangen
			if (tableID == "resultsShortTable") { 
				zeile[i].parentElement.style.display = "none"
			}

		} // end: if-else (Suchbegriff || showAlwaysIsTrue) 
	} // end: for zeile.length
	
}


// Den ausgewählten Button aktiv färben -> wird beim Klick auf Button aktiviert.
function mow_addon_textfilter_color_buttons(idNumber) {

	// Array 
	for (i = 0; i < TEXTFILTER_BUTTONTEXTS.length; i++) {

		if (i == idNumber)
		{
			$(".mow_addon_textfilter_button"+i).addClass('btn-primary').removeClass('btn-secondary');
		}
		else
		{
			$(".mow_addon_textfilter_button"+i).addClass('btn-secondary').removeClass('btn-primary');
		}

	} // end: for
}


// Start
window.addEventListener("load", mow_addon_textfilter_MutationObserver)

/*
window.onload = function () {
	mow_addon_textfilter_MutationObserver() 
}
*/
