///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

// FUNKTION / FUNCTION
// * Erstellt Buttons für die Kontaktaufnahme per E-Mail oder Telefon
//   Optional: Zuerst wird in der Beschreibung der Partei in PARTEIEN.CSV nach dem unsichtbaren Text <span data-email="info@domain.com"></span> gesucht und übernommen.
//   Immer: Danach werden alternativ die Standardwerte aus diesen Einstellungen übernommen. 
// * Creates buttons for contact via mail or telephone  
//   Optional: First we'll look for an invisible text <span data-email="info@domain.com"></span> in the PARTIES.CSV and use these for the buttons.
//   Always: Then the addon uses the default values (below) to create the buttons as an alternative.


// 1.) Allgemeine Angaben
// General Settings

// Zeige einen Button für den Kontakt an? Ja/Nein? 1/0?
const CR_CONTACT_ACTIVE_EMAIL = 1
const CR_CONTACT_ACTIVE_TEL = 1

// Beschriftung der Buttons - unter der Ergebniszeile 
const CR_CONTACT_BUTTON_EMAIL = "Kontakt per E-Mail"
const CR_CONTACT_BUTTON_TEL = "Kontakt per Telefon"

// E-Mailadresse und Telefonnummer - unter der Ergebniszeile ...
// ... falls KEIN DATA-EMAIL-Tag in der CSV-Datei angegeben wurde.
let CR_CONTACT_ADDRESS_EMAIL = "info@meine-freiwilligenagentur.de"
const CR_CONTACT_ADDRESS_TEL = "+49123456789"

// E-Mail-Betreff für die Kontaktaufnahme ...
// 1. - wenn ein DATA-EMAIL-Tag in der CSV-Datei vorhanden ist.
const CR_CONTACT_SUBJECT_EMAIL_DATATAG = "Mitwirk-o-Mat - Ich habe Interesse an einer Mitarbeit in eurem Verein "
// 2. - Rückfall-Lösung falls kein DATA-EMAIL-Tag in der CSV angegeben wurde. 
const CR_CONTACT_SUBJECT_EMAIL_DEFAULT = "Mitwirk-o-Mat - Ich habe Interesse an folgendem Verein: "

// E-Mailinhalt für die Kontaktaufnahme ...
// 1. - wenn ein DATA-EMAIL-Tag in der CSV-Datei vorhanden ist.
let CONTACT_TEXT_EMAIL_DATATAG = "Hallo, \n\n\nich habe gerade den Mitwirk-o-Mat ausgeführt und bin bei euch gelandet. \n\nBitte ruft mich doch mal an oder schreibt mir, so dass ich euch besser kennen lernen kann."
// 2. - Rückfall-Lösung falls kein DATA-EMAIL-Tag in der CSV angegeben wurde.
let CONTACT_TEXT_EMAIL_DEFAULT = "Hallo, \n\n\nich habe gerade den Mitwirk-o-Mat ausgeführt und interessiere mich für einen bestimmten Verein. \n\nBitte ruft mich doch mal an oder schreibt mir, so dass ich den Verein besser kennen lernen kann."

// Telefon-Text (Messenger) - ohne Funktion - nicht eingebaut
let CONTACT_TEXT_TEL = ""



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
function mow_addon_contact_in_results_MutationObserver() {

	// zu überwachende Zielnode (target) auswählen
	var target = document.querySelector('#resultsHeading');
	 
	// eine Instanz des Observers erzeugen und Callback-Funktion aufrufen
	var observer = new MutationObserver(mow_addon_contacts_start)
	 
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
function mow_addon_contacts_start() {

	// id "#resultsHeading" wird in fnStart() am Anfang geleert (empty()).
	// -> mutationObserver erkennt Änderung und aktiviert diese Funktion :(
	// -> prüfen, ob Inhalt in DIV existiert 
	resultsHeadingContent = $("#resultsHeading").text()

	if (!resultsHeadingContent) {
		// nix. Noch keine Ergebnisse im DIV
	}
	// schreibe Kontakt-Buttons
	else {

		// Starte die Suche nach dem DATASET mit Wert XYZ im <SPAN>
		// und schreibe dann die Kontakt-Buttons 
		mow_addon_contacts_search_dataTag_in_partyDescritpion("email")

		// Klick-Funktion auf die gesamte Ergebnis-Zeile legen und am Anfang ausblenden
		mow_addon_contacts_add_click_on_row()

	} // end: else

}


// Klick-Funktion auf die gesamte Ergebnis-Zeile legen und am Anfang ausblenden
function mow_addon_contacts_add_click_on_row() {
	// Click-Funktion auf PARTEINAME-Zeile legen zum Anzeigen der BUTTONS 
	// kopiert / angepasst aus "output.js" - ca. Zeile 450
	
	for (let i = 0; i <= (intParties-1); i++)
	{
		// Klickfunktion - bei Überschrift
		$("#resultsShortParty"+i).click(function () { 
				$("#resultsShortPartyAddonContactsInResults"+i).toggle(500);
			});	

		// am Anfang ausblenden
		$("#resultsShortPartyAddonContactsInResults"+i).hide(500);
		
	}
	
}


// Die Ergebnisse der Umfrage in den E-Mailtext einfügen.
function mow_addon_contacts_add_results_to_email_text(showParty,showPersonal) {

		let statistics_text = "\n\n Meine Ergebnisse lauteten wie folgt: \n"


		if (showParty > 0) {

			statistics_text += "\n\nParteien / Vereine / Initiativen \n"
	
			// Parteien und die dazugehörigen Punkte
			for (i = 0; i <= (intParties-1); i++)
			{
				let partyNum=arSortParties[i];
	
				let partyNameLong = arPartyNamesLong[partyNum];
				let partyPoints = arResults[partyNum];
				
				statistics_text += "\n "+(i+1)+". "+partyNameLong+": "+partyPoints+" Punkte";
			} // end: for-i
		} // end: if showParty
		

		if (showPersonal > 0) {

			statistics_text += "\n\nPersönliches Ergebnis \n"
			
			// Fragen und persönliche Antworten
			for (i = 0; i <= (intQuestions-1); i++)
			{
	
				let questionShort  = arQuestionsShort[i];
				let questionPoints = arPersonalPositions[i];			
				
				statistics_text += "\n "+(i+1)+". "+questionShort+": "+questionPoints+" Punkte";
			} // end: for-i
		} // end: if showPersonal
		
		statistics_text = encodeURIComponent(statistics_text);
		return statistics_text;

}


// Die Kontakt-Buttons ins DOM schreiben 
function mow_addon_contacts_write_buttons_to_dom(partyNum, datasetNameValue) {
			
			var divContent = "";
	
			// neue Bootstrap-ROW-Zeile		
			divContent += '<div class="row" id="resultsShortPartyAddonContactsInResults'+partyNum+'">'

			// wenn die Variable auf 1 / aktiv gesetzt ist, schreibe Button
			if (CR_CONTACT_ACTIVE_EMAIL > 0 ) {	
			
				// Wenn im DATA-Tag ein Wert hinterlegt war, nutze diese Adresse, ansonsten den Standard-Wert von ganz oben
				let strMailAddress = "";
				let strMailSubject = ""; 
				let strMailBody = ""
				
				if (datasetNameValue) {	
					strMailAddress = mow_addon_contacts_validate_email_address(datasetNameValue);
					strMailSubject = encodeURIComponent(CR_CONTACT_SUBJECT_EMAIL_DATATAG)+''+encodeURIComponent(arPartyNamesLong[partyNum])
					strMailBody = encodeURIComponent(CONTACT_TEXT_EMAIL_DATATAG)+'%20'+mow_addon_contacts_add_results_to_email_text(0,1)	// zeige nur pers. Ergebnis (0,1)
					}
				else {	
					strMailAddress = mow_addon_contacts_validate_email_address(CR_CONTACT_ADDRESS_EMAIL);
					strMailSubject = encodeURIComponent(CR_CONTACT_SUBJECT_EMAIL_DEFAULT)+''+encodeURIComponent(arPartyNamesLong[partyNum])
					strMailBody = encodeURIComponent(CONTACT_TEXT_EMAIL_DEFAULT)+'%20'+mow_addon_contacts_add_results_to_email_text(1,1)	// zeige Partei und pers. Ergebnis (1,1)
					}
					
				// Jetzt den Button vorbereiten.
				divContent += ' <div class="col">'
				divContent += '  <a href="mailto:'+strMailAddress+'subject='+strMailSubject+'&amp;body='+strMailBody+'" role="button" class="btn btn btn-success" target="_blank" rel=noopener noreferrer>'+CR_CONTACT_BUTTON_EMAIL+'</a>'
				divContent += ' </div>'
			}
			
			// wenn die Variable auf 1 / aktiv gesetzt ist, schreibe Button
			if (CR_CONTACT_ACTIVE_TEL > 0 ) {
				divContent += ' <div class="col">'
				divContent += '  <a href="tel:'+CR_CONTACT_ADDRESS_TEL+'" role="button" class="btn btn btn-success" aria-pressed="true">'+CR_CONTACT_BUTTON_TEL+'</a>'
				divContent += ' </div>'
			}

			divContent += '</div>'
			

			// richtige Nummer der Partei finden und die neue ROW-Zeile dahinter einfügen    	
			var element_resultsShortParty = document.getElementById("resultsShortParty"+partyNum)		
			element_resultsShortParty.insertAdjacentHTML('afterend', divContent)
	
}


// Im Feld für die E-Mailadresse KÖNNTE ein zweiter Empfänger stehen.
// z.B. info@banane.ba?cc=vorstand@banane.ba
// Das Fragezeichen (?) darf laut RFC nur 1x am Anfang vorkommen. Danach wird "&" als Trenner benutzt.
function mow_addon_contacts_validate_email_address(emailaddress) {
	
	// Wenn es bereits ein Fragezeichen in der E-Mailadresse gibt, füge ein "&" ans Ende ...
	if (emailaddress.indexOf("?") > 0) {
			emailaddress += "&amp;"
	}
	// ... ansonsten füge ein Fragezeichen als ersten Parameter hinzu. 
	else {
		emailaddress += "?"
	}
	// console.log(emailaddress)
	return emailaddress;
	
}


// Starte die Suche nach dem DATASET mit Wert XYZ im <SPAN>
// und schreibe dann die Kontakt-Buttons 
function mow_addon_contacts_search_dataTag_in_partyDescritpion(datasetName) {
	
		// console.log("Suche nach "+datasetName)	
	
		// gehe durch das CSV-Array und schreibe Inhalt
		for (let j = 0; j <= (intParties-1); j++)
		{
			let partyNum=arSortParties[j];	

			// Das DATASET mit der ID befindet sch in der Beschreibung der Partei (im CSV-Array)
			let partyDescription = arPartyDescription[partyNum]
						
			// Die Zeichenkette aus dem CSV-Array in ein HTML-Objekt umwandeln, so dass man später damit arbeiten kann.   
			let partyDescriptionHTML = stringToHTML(partyDescription)	
			
			// Alle Vorkommen von <span> im neuen HTML-Objekt suchen
			let arSpanTags = partyDescriptionHTML.getElementsByTagName("span")

			// Alten "ID-Zähler" löschen, falls die neue SPAN-Zeile keine Informationen enthält. 
			// So dass die alte ID in der folgenden FOR-Schleife nicht mitgeschleppt wird.			
			var datasetNameFound = false

			
			for (let k = 0; k <= arSpanTags.length-1; k++) {

				// suche nach DATA-XYZ
				let datasetNameValue = arSpanTags[k].dataset[datasetName]
				
				if (datasetNameValue) {
					mow_addon_contacts_write_buttons_to_dom(partyNum, datasetNameValue)
				
					var datasetNameFound = true
					} // end: if (einrichtungsid)
				else {						
				} // end: if-else (einrichtungsid)
			
			} // end: for-arSpanTags


			// Fehlerbehandlung: Wenn KEIN DATA-Tag gefunden wurde, eine Alternative anbieten.
			if (!datasetNameFound) {
				
				mow_addon_contacts_write_buttons_to_dom(partyNum, "")
				
			} // end: if (!einrichtungsIdGefunden)
						
		} // end: for intParties
	
	
}


// https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};


// Start
window.addEventListener("load", mow_addon_contact_in_results_MutationObserver)

/*
window.onload = function () {
	mow_addon_textfilter_MutationObserver() 
}
*/
