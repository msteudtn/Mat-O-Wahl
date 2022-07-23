///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// FUNKTION / FUNCTION
// * Erstellt 1-x Buttons für die Kontaktaufnahme per E-Mail oder Telefon
// * Creates 1-x buttons for contact via mail or telephone  


// 1.) Allgemeine Angaben
// General Settings
var CONTACT_TEXT_EMAIL = "E-Mail"
var CONTACT_TEXT_TEL = "Telefon"

var CONTACT_DATA_EMAIL = "info@meine-freiwilligenagentur.de"
var CONTACT_DATA_TEL = "+49123456789"


// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig. 
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
	var observer = new MutationObserver(mow_addon_contacts_create_content)
	 
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
function mow_addon_contacts_create_content() {

	// id "#resultsHeading" wird in fnStart() am Anfang geleert (empty()).
	// -> mutationObserver erkennt Änderung und aktiviert diese Funktion :(
	// -> prüfen, ob Inhalt in DIV existiert 
	resultsHeadingContent = $("#resultsHeading").text()

	if (!resultsHeadingContent) {
		// nix. Noch keine Ergebnisse im DIV
	}
	// schreibe Kontakt-Buttons
	else {
		
		
		// divContent = '<div class="row">'

		// gehe durch Array und schreibe Inhalt
		for (i = 0; i <= (intParties-1); i++)
		{
			var partyNum=arSortParties[i];	// aus "output.js" kopiert. :)
		
			divContent = "";	
			divContent += ' <div class="col">'
			divContent += '  <a href="mailto:'+CONTACT_DATA_EMAIL+'" role="button" class="btn btn-sm btn-success" aria-pressed="true">'+CONTACT_TEXT_EMAIL+' - '+partyNum+'</a>'
			divContent += ' </div>'

			divContent += ' <div class="col">'
			divContent += '  <a href="tel:'+CONTACT_DATA_TEL+'" role="button" class="btn btn-sm btn-success" aria-pressed="true">'+CONTACT_TEXT_TEL+'</a>'
			divContent += ' </div>'

		// neues <div class="row"> erstellen und "divContent" hineinschreiben 
		var element_resultsShortParty_description = document.getElementById("resultsShortParty"+partyNum).getElementsByTagName("p")[0]
		var new_div_element = document.createElement('div');
		element_resultsShortParty_description_div = element_resultsShortParty_description.appendChild(new_div_element)
		element_resultsShortParty_description_div.className = "row"
		element_resultsShortParty_description_div.innerHTML = divContent		

			
		} // end: for intParties.length

		// divContent += '</div>'		

	} // end: else

}


// Start
window.addEventListener("load", mow_addon_textfilter_MutationObserver)

/*
window.onload = function () {
	mow_addon_textfilter_MutationObserver() 
}
*/
