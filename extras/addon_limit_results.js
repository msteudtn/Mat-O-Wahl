///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

/*  FUNKTION / FUNCTION
	In der Ergebnisübersicht werden X Parteien SOFORT angezeigt. Der Rest bei Klick auf [+]
	Show only X parties in the list of results RIGHT AWAY. The rest is visible on click.
*/    

/*
	1.) Anzahl der Parteien (Ergebnisse) definieren
 		 Define number of parties (results) 

	Hinweis für Deutschland: Beim Einsatz als "Wahl-o-Mat" bitte
	"Beschluss vom 20.05.2019" (6 L 1056/19) des VG Köln beachten! 
	-> Chancengleichheit gewährleisten, indem alle Parteien angezeigt werden.
	Bei einem anderem Einsatzzweck ist das *vermutlich* irrelevant.
	
	********************************************************************
	
	Beispiele / Examples:
	var intPartiesShowAtEnd = 25; // 25 Ergebnisse anzeigen, bei Klick 25 weitere nachladen
	
*/

var intPartiesShowAtEnd = 5;


// 2.) Text für Buttons
// Text on buttons
var TEXT_RESULTS_BUTTON_SHOW_MORE = "Weitere Ergebnisse zeigen"
var TEXT_RESULTS_BUTTON_SHOW_LESS = "Weniger Ergebnisse zeigen"

// 3.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS

// 4.) Fertig. 
// That's it.


///////////////////////////////////////////////////////////////////////  


// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.


///////////////////////////////////////////////////////////////////////


// MutationObserver starten - prüft Änderungen im DOM
// https://medium.com/better-programming/js-mutationobserver-1d7aed479da2
// https://developer.mozilla.org/de/docs/Web/API/MutationObserver
function mow_addon_limit_results__MutationObserver() {

	// zu überwachende Zielnode (target) auswählen
	var target = document.querySelector('#resultsHeading');
	 
	// eine Instanz des Observers erzeugen und Callback-Funktion aufrufen
	var observer = new MutationObserver(mow_addon_limit_results_create_buttons)
	 
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
function mow_addon_limit_results_create_buttons() {

	// alten Inhalt (jedes Mal) löschen
	$("#resultsAddonBottom").empty()

	// id "#resultsHeading" wird in fnStart() am Anfang geleert (empty()).
	// -> mutationObserver erkennt Änderung und aktiviert diese Funktion :(
	// -> prüfen, ob Inhalt in DIV existiert 
	resultsHeadingContent = $("#resultsHeading").text()

	if (!resultsHeadingContent) {
		// nix. Noch keine Ergebnisse im DIV
	}
	// schreibe Buttons
	else {
		divContent =  '<div id="Buttons_showPartiesAtEnd_resultsShort" class="row">'
		
		divContent += '	<div class="col-1 col-md-6">'
		divContent += '	</div>'
						
		divContent += '	<div class="col-5 col-md-3">'
//		divContent += '		<button type="button" id="Buttons_showPartiesAtEnd_resultsShort_minus" class="btn btn-outline-dark btn-sm btn-block" onclick="">'+TEXT_RESULTS_BUTTON_SHOW_LESS+'</button>'
		divContent += '	</div>'

		divContent += '	<div class="col-5 col-md-3">'
		divContent += '		<button type="button" id="Buttons_showPartiesAtEnd_resultsShort_plus" class="btn btn-outline-dark btn-sm btn-block" onclick="fnShowOnlyIntPartiesAtEnd_Plus(0, 0)">'+TEXT_RESULTS_BUTTON_SHOW_MORE+'</button>'
		divContent += '	</div>'
		
		divContent += '</div>`'

		$("#resultsAddonBottom").append(divContent).fadeIn(750); 

		fnShowOnlyIntPartiesAtEnd_Plus(0, 0)

	} // end: else

}


// Aufruf bei Klick auf den Button und am Anfang "mow_addon_limit_results_create_buttons()"
function fnShowOnlyIntPartiesAtEnd_Plus(rowStart, rowEnd) {

		
		rowStart = 0
		rowEnd = rowEnd + intPartiesShowAtEnd
		
		// onclick-Funktion auf Button PLUS legen 
		document.getElementById("Buttons_showPartiesAtEnd_resultsShort_plus").setAttribute("onclick","fnShowOnlyIntPartiesAtEnd_Plus("+rowStart+","+rowEnd+")")
		
		var element_resultsShortTable_col = document.getElementById("resultsShortTable").getElementsByClassName("col")[0]
		var element_resultsByThesisTable_col = document.getElementById("resultsByThesisTable").getElementsByClassName("col")[0]
		
		for (i = 0; i <= intParties-1; i++) {
						
			if ( (i >= rowStart) &&  (i < rowEnd) ) {
				// obere Tabelle: resultsShortTable
				element_resultsShortTable_col.getElementsByClassName("row")[i].style.visibility = ""
				element_resultsShortTable_col.getElementsByClassName("row")[i].style.display = ""
								
				// Tabelle sortiert nach Parteien
				document.getElementById("resultsByPartyHeading"+i).style.visibility = ""
				document.getElementById("resultsByPartyHeading"+i).style.display = ""
			}
			else {
				// obere Tabelle: resultsShortTable
				element_resultsShortTable_col.getElementsByClassName("row")[i].style.visibility = "hidden"
				element_resultsShortTable_col.getElementsByClassName("row")[i].style.display = "none"
				
				// Tabelle sortiert nach Parteien
				document.getElementById("resultsByPartyHeading"+i).style.visibility = "hidden"
				document.getElementById("resultsByPartyHeading"+i).style.display = "none"
			}
			 
		} // end: for-intParties


		// Tabelle sortiert nach Fragen
		for (i = 0; i <= intQuestions-1; i++) {


			for (j = 0; j <= intParties-1; j++) {

				if ( (j >= rowStart) &&  (j < rowEnd) ) {
					document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j].style.visibility = ""
					document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j].style.display = ""														 
				}
				else {
					document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j].style.visibility = "hidden"
					document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j].style.display = "none"
				}
						
				} // // end: for-intParties

		} // end: for-intQuestions		

		// wenn mehr Parteien angezeigt werden sollten, als eigentlich vorhanden sind ...
		if (rowEnd >= intParties) {
			// ... blende den Button aus
			document.getElementById("Buttons_showPartiesAtEnd_resultsShort_plus").style.visibility = "hidden"
		}		

	
}


// Start
window.addEventListener("load", mow_addon_limit_results__MutationObserver)

/*
window.onload = function () {
	mow_addon_limit_results__MutationObserver() 
}
*/
