///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// 1.) Sonderzeichen oder Zeichenkette für den Filter bestimmen
// Define special character or string for filter
// Beispiel / example: U+1F464 (128100)	- BUST IN SILHOUETTE (Menschliche Silhouette)
// https://de.wikipedia.org/wiki/Unicodeblock_Verschiedene_piktografische_Symbole
var TEXTFILTER_SEARCH_KEYWORD = "&#x1F464;"

// 2.) Text für Button 1 - Filter
// Text on button 1 - filter
var TEXTFILTER_BUTTONTEXT_KEYWORD = "Bürgermeisterkandidaten anzeigen"

// 3.) Text für Button 2 - Gegenteil vom Filter
// Text on button 2 - opposite of filter
var TEXTFILTER_BUTTONTEXT_NOKEYWORD = "Parteien für Stadtrat anzeigen"

// 4.) Filter-Sonderzeichen in DEFINITION.JS einfügen. Beispiel:
// Put the filter character(s) in DEFINITION.JS. Example:
// var strPartyNamesShort = "&#x1F464; APPD,Bananen,&#x1F464; TBC,Neutrale";

// 5.) Folgende Zeile kurz vor </HEAD> der INDEX.HTML einfügen. (ohne "//")
// Add the following line just before </HEAD> of INDEX.HTML (without "//")
// <script type="text/javascript" src="extras/addon_results_textfilter_by_button.js"></script>

// 6.) Fertig. 
// That's it.

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
	else {
//		Buttons einfügen
		divContent = '<div class="row">'
		divContent += ' <div class="col">'
		divContent += '  <button id="mow_addon_textfilter_button1" type="button" class="btn btn-secondary btn-block" onclick="mow_addon_textfilter_filter_table(\''+TEXTFILTER_SEARCH_KEYWORD+'\',1);  mow_addon_textfilter_color_buttons(1,2);">'+TEXTFILTER_BUTTONTEXT_KEYWORD+'</button>'
		divContent += ' </div>'
		divContent += ' <div class="col">'
		divContent += '  <button id="mow_addon_textfilter_button2" type="button" class="btn btn-secondary btn-block" onclick="mow_addon_textfilter_filter_table(\''+TEXTFILTER_SEARCH_KEYWORD+'\',0); mow_addon_textfilter_color_buttons(2,1);">'+TEXTFILTER_BUTTONTEXT_NOKEYWORD+'</button>'
		divContent += ' </div>'
		divContent += '</div>'
		$("#resultsAddonTop").append(divContent).fadeIn(750); 

		// ersten Button am Anfang "klicken" um Vorauswahl zu haben
		document.getElementById("mow_addon_textfilter_button1").click();

	}
}


// Filter-Funktion
// "search_keyword" kommt vom Button
function mow_addon_textfilter_filter_table(search_keyword, status) {

	// Declare variables
	var tableShort, tableLong, tr, td, paragraph, i, txtValue;
	search_keyword = search_keyword.toUpperCase();

	// 1.) OBERE TABELLE resultsShort
	// https://www.w3schools.com/howto/howto_js_filter_table.asp

	// ID der oberen Tabelle (zum Filtern) finden
	tableShort = document.getElementById("resultsShortTable");
	tr = tableShort.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0]; // 0 = erste Spalte. Dort ist das gesuchte TEXTFILTER_SEARCH_KEYWORD
		if (td) {
			txtValue = td.textContent || td.innerText;

			if (txtValue.toUpperCase().indexOf(search_keyword) > -1) {
				if (status == 1) { tr[i].style.display = ""; }
				else { tr[i].style.display = "none" } 
				
			} else {

				if (status == 1) { tr[i].style.display = "none";  }
				else { tr[i].style.display = "" } 
				
			}
		}
	}

	// 2.) UNTERE TABELLE resultsLong
	// https://www.w3schools.com/howto/howto_js_filter_lists.asp

	tableLong = document.getElementById("resultsLongTable");
	paragraph = tableLong.getElementsByTagName('p');

	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < paragraph.length; i++) {

		txtValue = paragraph[i].textContent || paragraph[i].innerText;

		if (txtValue.toUpperCase().indexOf(search_keyword) > -1) {
			if (status == 1) { paragraph[i].style.display = ""; }
			else { paragraph[i].style.display = "none" } 
		} else {
			if (status == 1) { paragraph[i].style.display = "none"; }
			else { paragraph[i].style.display = "" }
	 	}
	}
}


// aktiven Button grün färben -> wird beim Klick auf Button aktiviert.
function mow_addon_textfilter_color_buttons(active, inactive) {

	var buttonactive, buttoninactive 
	buttonactive = "#mow_addon_textfilter_button"+active 
	buttoninactive = "#mow_addon_textfilter_button"+inactive 

	$(buttonactive).addClass('btn-primary').removeClass('btn-secondary');
	$(buttoninactive).addClass('btn-secondary').removeClass('btn-primary');
}


// Start
$(document).ready(function() { 
	mow_addon_textfilter_MutationObserver()
});
