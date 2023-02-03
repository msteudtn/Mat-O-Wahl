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

var intPartiesShowAtEnd = 3;


// 2.) Text für Buttons
// Text on buttons
var TEXT_RESULTS_BUTTON_SHOW_MORE = "Weitere Ergebnisse zeigen (von "+intParties+")"
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



// Buttons in INDEX.HTML schreiben (nur 1x am Anfang)
// Write buttons into INDEX.HTML (only once in the beginning)
function mow_addon_limit_results_create_buttons() {

	/* id "#resultsHeading" wird in fnStart() am Anfang geleert (empty()).
	   -> mutationObserver erkennt Änderung und aktiviert diese Funktion :(
	   -> prüfen, ob Inhalt in DIV existiert 
	   
	   id "#resultsHeading" is beeing emptied in fnStart() at the beginning
	   -> mutationObserver checks for changes and activates this function 
	   -> check if there's any content in the DIV 
	 */

	// resultsHeadingContent = $("#resultsHeading").text()
	resultsHeadingContent = document.getElementById("resultsHeading").innerText

	if (!resultsHeadingContent) {
		// nix. Noch keine Ergebnisse im DIV
		// Nothing writting in the results-DIV 
	}
	// schreibe Buttons (einmalig)
	// write the buttons (one time)
	else {	

		// Inhalt der Buttons 
		// Content of buttons

		buttonContent_Minus = '<button type="button" class="Buttons_showPartiesAtEnd_minus btn btn-outline-dark btn-sm btn-block" onclick="fnCalculate_Minus(0,0)">'+TEXT_RESULTS_BUTTON_SHOW_LESS+'</button>'
		buttonContent_Plus  = '<button type="button" class="Buttons_showPartiesAtEnd_plus  btn btn-outline-dark btn-sm btn-block"  onclick="fnCalculate_Plus(0,0)">'+TEXT_RESULTS_BUTTON_SHOW_MORE+'</button>'
		
		// Erstelle eine neue Zeile mit Bootstrap-Klassen 
		// -> 1. ROW -> 2a.) COL (links / left) + 2b.) COL (rechts / right)
		// Create a new line with Bootstrap-classes 
		
		// A. obere Tabelle / upper list - resultsShortTable
		// 1. ROW
		var element_resultsShortTable_col = document.getElementById("resultsShortTable").getElementsByClassName("col")[0]
		var div_element = document.createElement('div');
		resultsShortTable_col_row = element_resultsShortTable_col.appendChild(div_element)
		resultsShortTable_col_row.className = "row showAlwaysIsTrue" // "showAlwaysIsTrue" ist eine Pseudo-CSS-Klasse. -> nur für andere Addons als Warnung, z.B. "addon_results_textfilter_by_button.js"
		
		// 2a COL left
		var div_element = document.createElement('div');
		resultsShortTable_col_row_col_left = resultsShortTable_col_row.appendChild(div_element)
		resultsShortTable_col_row_col_left.className = "col"
		resultsShortTable_col_row_col_left.innerHTML = buttonContent_Minus

		// 2b COL right
		var div_element = document.createElement('div');
		resultsShortTable_col_row_col_right = resultsShortTable_col_row.appendChild(div_element)
		resultsShortTable_col_row_col_right.className = "col text-center"
		resultsShortTable_col_row_col_right.innerHTML = buttonContent_Plus

		
		// B. linke Tabelle / left list - resultsByThesis
		// 1. ROW		
		// ALT: bis August 2021: Buttons unter die Tabelle schreiben 
		// var element_resultsByThesisTable_col = document.getElementById("resultsByThesisTable").getElementsByClassName("col")[0]
		// NEU: ab August 2021: Buttons unter jede Frage schreiben "resultsByThesisAnswersToQuestionX"
		for (i = 0; i <= intQuestions-1; i++) {
			
			var element_resultsByThesisTable_col = document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0]
			var div_element = document.createElement('div');
			element_resultsByThesisTable_col_row = element_resultsByThesisTable_col.appendChild(div_element)
			element_resultsByThesisTable_col_row.className = "row showAlwaysIsTrue" // "showAlwaysIsTrue" ist eine Pseudo-CSS-Klasse. -> nur für andere Addons als Warnung, z.B. "addon_results_textfilter_by_button.js"

			// 2a COL left		
			var div_element = document.createElement('div');
			element_resultsByThesisTable_col_row_col_left = element_resultsByThesisTable_col_row.appendChild(div_element)
			element_resultsByThesisTable_col_row_col_left.className = "col"
			element_resultsByThesisTable_col_row_col_left.innerHTML = buttonContent_Minus

			// 2b COL right
			var div_element = document.createElement('div');
			element_resultsByThesisTable_col_row_col_right = element_resultsByThesisTable_col_row.appendChild(div_element)
			element_resultsByThesisTable_col_row_col_right.className = "col text-center"				
			element_resultsByThesisTable_col_row_col_right.innerHTML = buttonContent_Plus
		}
		
		// C. rechte Tabelle / right list - resultsByParty
		// 1. ROW
		var element_resultsByPartyTable_col = document.getElementById("resultsByPartyTable").getElementsByClassName("col")[0]
		var div_element = document.createElement('div');
		element_resultsByPartyTable_col_row = element_resultsByPartyTable_col.appendChild(div_element)
		element_resultsByPartyTable_col_row.className = "row showAlwaysIsTrue" // "showAlwaysIsTrue" ist eine Pseudo-CSS-Klasse. -> nur für andere Addons als Warnung, z.B. "addon_results_textfilter_by_button.js"

		// 2a COL left
		var div_element = document.createElement('div');
		element_resultsByPartyTable_col_row_col_left = element_resultsByPartyTable_col_row.appendChild(div_element)
		element_resultsByPartyTable_col_row_col_left.className = "col"
		element_resultsByPartyTable_col_row_col_left.innerHTML = buttonContent_Minus

		// 2b COL right
		var div_element = document.createElement('div');
		element_resultsByPartyTable_col_row_col_right = element_resultsByPartyTable_col_row.appendChild(div_element)
		element_resultsByPartyTable_col_row_col_right.className = "col text-center"				
		element_resultsByPartyTable_col_row_col_right.innerHTML = buttonContent_Plus


		// setze Werte auf Buttons / set values for buttons 
		fnCalculate_Buttons(0, intPartiesShowAtEnd)

		// Zeige / verstecke die Zeilen
		// Show / hide lines 
		
		fnShowOnlyIntPartiesAtEnd(0, intPartiesShowAtEnd)

	} // end: else

}


/*
	Berechne die neuen Werte für die PLUS + MINUS-Buttons 
	Calculate new values for PLUS + MINUS-buttons 

	Das Skript berechnet die Werte anhand des vorherigen Wertes
	z.B. 12 Ergebnisse, Start: 5 + 5 = 10 + 5 = 12 (max.) 
	12 (max.) - 5 = 7 - 5 = 02 - 5 = 01 (min.) 
	01 (min.) + 5 = 6 + 5 = 11 + 5 = 12 (max.) 
*/
function fnCalculate_Buttons(rowStart, rowEnd) {
		
//		rowStartMinus = 0
//		rowStartPlus  = 0
		rowEndMinus = rowEnd - intPartiesShowAtEnd
		rowEndPlus  = rowEnd + intPartiesShowAtEnd
		
		// verhindere negative Werte 
		// prevent negative values
		if (rowEndMinus <= 0)
		{ rowEndMinus = 1 }
		
		// Normalerweise würde man einfach nur Anfang und Ende an die Funktion "fnCalculate_Buttons(start,end)" übergeben. 
		// Aber das Addon "addon_results_textfilter_by_button.js" setzt alle Filter zurück. 
		// Deshalb übergebe ich stattdessen ein Array der zu filternden Zeilen. fnCalculate_Buttons("[0,1,2,3,4,5,6]")
		
		// finde alle (Pseudo)-Klassen für die Buttons um die Buttons später zu verändern
		// find all (pseudo)-classes for the buttons to change the buttons later
		var buttons_minus = document.getElementsByClassName("Buttons_showPartiesAtEnd_minus")
		var buttons_plus  = document.getElementsByClassName("Buttons_showPartiesAtEnd_plus")		

		// Klick-Funktionen mit neuen Werten auf die Buttons legen
		// change click-event with new values 
		for (var i = 0; i < buttons_plus.length; i++) {
		    buttons_plus[i].setAttribute("onclick","fnCalculate_Buttons("+rowStart+","+rowEndPlus+")")
		    // console.log("BTN+ "+i+" Start: "+rowStart+" Ende: "+rowEndPlus)
		}
		for (var i = 0; i < buttons_minus.length; i++) {
			buttons_minus[i].setAttribute("onclick","fnCalculate_Buttons("+rowStart+","+rowEndMinus+")")
			// console.log("BTN- "+i+" Start: "+rowStart+" Ende: "+rowEndMinus)
		}
		

		// wenn WENIGER Parteien (Zeilen) angezeigt werden sollten, als eigentlich vorhanden sind ...
		// if the script wants to show FEWER parties (lines) than exists ...
		if (rowEnd <= 1) {
			// ... blende den Button aus / ... hide button
			for (var i = 0; i < buttons_minus.length; i++) {
				fnFadeOut(buttons_minus[i], 500, 1)
			}
		}
		else {
			// ... ansonsten zeige den Button / ... otherwise show the button
			for (var i = 0; i < buttons_minus.length; i++) {
				fnFadeIn(buttons_minus[i], 500, 1)
			}
		}


		// wenn MEHR Parteien (Zeilen) angezeigt werden sollten, als eigentlich vorhanden sind ...
		// if the script wants to show MORE parties (lines) than exists ...
		if (rowEnd >= intParties) {
			// ... blende den Button aus /  ... hide button
			for (var i = 0; i < buttons_plus.length; i++) {
				fnFadeOut(buttons_plus[i], 500, 1)
			}
		}
		else {
			// ... ansonsten zeige den Button / ... otherwise show the button
			for (var i = 0; i < buttons_plus.length; i++) {
				fnFadeIn(buttons_plus[i], 500, 1)
			}
		}

		// Zeige / verstecke die Zeilen
		// Show / hide lines 		
		fnShowOnlyIntPartiesAtEnd(rowStart, rowEnd)
		
}


// Zeige / verstecke die Zeilen
// Show / hide lines 
function fnShowOnlyIntPartiesAtEnd(rowStart, rowEnd) {		
				
		// Anzahl der Zeilen (mit Bootstrap-Klasse "row") finden für FOR-Schleife  später
		// Nur relevant in der #resultsShortTable (oben) falls es noch extra Zeilen aus anderen Addons gibt.
		var resultsShortTable_rows = document.getElementById("resultsShortTable").getElementsByClassName("row")
		var resultsShortTable_rows_length = resultsShortTable_rows.length - 1; // "-1" weil unten noch die Buttons "mehr" und "weniger" angefügt werden.
		var multiplikator = resultsShortTable_rows_length / intParties // z.B. 8 Zeilen / 4 Parteien = 2
				
		var element_resultsShortTable_col = document.getElementById("resultsShortTable").getElementsByClassName("col")[0]
		var element_resultsByThesisTable_col = document.getElementById("resultsByThesisTable").getElementsByClassName("col")[0]
		
		// 1. obere (erste) Tabelle #resultsShort + 2. Tabelle sortiert nach Parteien (rechts) #resultsByParty
		// 1. upper (first) list #resultsShort + 2. list sorted by parties (right) #resultsByParty
		for (i = 0; i <= intParties-1; i++) {

			if ( (i >= rowStart) &&  (i < rowEnd) ) {
				
				// erste Tabelle: resultsShortTable (oben)
				// Es kann sein, dass andere Addons zusätzliche Zeilen (rows) eingefügt haben. (z.B. addon_contacts_in_results.js) 
				// Nun wird geprüft, ob es eine normale Zeile ist oder eine eingefügte Zeile.
				
				// Bsp.: 5 Parteien x (1 Standardzeile + 2 extra Zeilen) = Multiplikator von 3 
				for (j = (i*multiplikator); j <= ( (i+1) * multiplikator-1); j++) {
					// i: 0 - - 1 - - 2 - -
					// j: 0 - - 3 - - 6 - - 
					if (j == (i*multiplikator)) {
						// Standardzeile (Parteiname, Bild, Prozent, Beschreibung) -> anzeigen
						// fnFadeIn(element_resultsShortTable_col.getElementsByClassName("row")[j], 500, 1)
						element_resultsShortTable_col.getElementsByClassName("row")[j].style.display = ""
						element_resultsShortTable_col.getElementsByClassName("row")[j].parentElement.style.display = ""  // #resultsShortPartyClampX - wird mehrfach ausgeführt :(
						element_resultsShortTable_col.getElementsByClassName("row")[j].style.visibility = ""
						element_resultsShortTable_col.getElementsByClassName("row")[j].parentElement.style.visibility = ""  // #resultsShortPartyClampX - wird mehrfach ausgeführt :(
						// console.log("IF-IN  i: "+i+" j: "+j+" multiplikator: "+multiplikator)	
					}
					// i: - 0 0 - 1 1 - 2 2 
					// j: - 1 2 - 4 5 - 7 8 
					else {
						// nix - Zeile sollte durch das Addon bereits ausgeblendet sein
						// console.log("IF-out i: "+i+" j: "+j+" multiplikator: "+multiplikator)
					}
					
				}


				// Tabelle sortiert nach Parteien (rechts)
				// fnFadeIn(document.getElementById("resultsByPartyHeading"+i).getElementsByClassName("row")[0], 500, 1)
				// fnFadeIn(document.getElementById("resultsByPartyAnswersToQuestion"+i).getElementsByClassName("row")[0], 500, 1)
				
				document.getElementById("resultsByPartyHeading"+i).getElementsByClassName("row")[0].style.display = ""
				document.getElementById("resultsByPartyAnswersToQuestion"+i).getElementsByClassName("row")[0].style.display = ""  // #resultsShortPartyClampX - wird mehrfach ausgeführt :(
			}
			
			// Alle Zeilen, die außerhalb des Limits liegen -> ausblenden!
			else {
				
				// erste Tabelle: resultsShortTable (oben)
				// i: 3 - - -4 - - -5 - - 
				// j: 9 - - 12 - - 15 - - 
				for (j = (i*multiplikator); j <= ( (i+1) * multiplikator-1); j++) {
					if (j == (i*multiplikator)) {
						// Standardzeile (Parteiname, Bild, Prozent, Beschreibung) -> ausblenden
						// fnFadeOut(element_resultsShortTable_col.getElementsByClassName("row")[j], 500, 1)
						element_resultsShortTable_col.getElementsByClassName("row")[j].style.display = "none"
						element_resultsShortTable_col.getElementsByClassName("row")[j].parentElement.style.display = "none" // #resultsShortPartyClampX - wird mehrfach ausgeführt :(
						// element_resultsShortTable_col.getElementsByClassName("row")[j].style.visibility = "hidden"
						// console.log("ELSE-if  i: "+i+" j: "+j+" multiplikator: "+multiplikator)	
					}
					// i: -- -3 -3 -- -4 -4 -- -5 -5 
					// j: -- 10 11 -- 13 14 -- 16 17 
					else {
						// Standardzeile (Parteiname, Bild, Prozent, Beschreibung) -> verstecken 
						// fnFadeOut() nutzt CSS:visibility und CSS:display -> Anzeigeprobleme! :(
						element_resultsShortTable_col.getElementsByClassName("row")[j].style.display = "none"
						element_resultsShortTable_col.getElementsByClassName("row")[j].parentElement.style.display = "none"  // #resultsShortPartyClampX - wird mehrfach ausgeführt :(
						// console.log("ELSE-else i: "+i+" j: "+j+" multiplikator: "+multiplikator)
						}

				}			
				
				// Tabelle sortiert nach Parteien (rechts)
				// fnFadeOut(document.getElementById("resultsByPartyHeading"+i).getElementsByClassName("row")[0], 500, 1)
				// fnFadeOut(document.getElementById("resultsByPartyAnswersToQuestion"+i).getElementsByClassName("row")[0], 500, 1)
				
				document.getElementById("resultsByPartyHeading"+i).getElementsByClassName("row")[0].style.display = "none"
				document.getElementById("resultsByPartyAnswersToQuestion"+i).getElementsByClassName("row")[0].style.display = "none"
				
			}
			 
		} // end: for-intParties


		// 3. Tabelle sortiert nach Fragen (links) / 3. list sorted by questions (left) #resultsByThesis
		for (i = 0; i <= intQuestions-1; i++) {


			for (j = 0; j <= intParties-1; j++) {

				if ( (j >= rowStart) &&  (j < rowEnd) ) {
					// fnFadeIn(document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j], 500, 1)
					document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j].style.display = ""
				}
				else {
					// fnFadeOut(document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j], 500, 1)
					document.getElementById("resultsByThesisAnswersToQuestion"+i).getElementsByClassName("col")[0].getElementsByClassName("row")[j].style.display = "none"
				}
						
				} // // end: for-intParties

		} // end: for-intQuestions		

	
}


function fnTestVonTextfilter() {
	
	// console.log("Aufruf in Limit-Results aus Textfilter - "+arrayRowNumbersTextfilter)
	stringRowNumbersTextfilter = "";
	}

// Start
window.addEventListener("load", mow_addon_limit_results__MutationObserver)
