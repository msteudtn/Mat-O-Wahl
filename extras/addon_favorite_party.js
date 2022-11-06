///////////////////////////////////////////////////////////////////////
// DEFINITIONEN *** DEFINITIONS
// http://www.mat-o-wahl.de

/*  EINSATZZWECK / USE CASE
	Vorabfrage, welche Partei man normalerweise wählen würde.
	Die Antwort wird am Ende wieder eingefärbt. 
	
	Question in the beginning, which party you would usually vote for.
	The reply will be highlighted later in the results.    
*/    

// 1. Willkommensnachricht / Erklärung
//    Welcome Message / Description
var TEXT_ADDON_FAVORITE_PARTY_WELCOME_MESSAGE = "Bevor wir anfangen, eine kurze Frage: <br /> Wenn morgen Wahl wäre, wen würdest du normalerweise wählen?"

// 2. Text, wenn man die Frage überspringt
//	   Text, if you skip the answer
var TEXT_ADDON_FAVORITE_PARTY_SKIP_DECISION = "Überspringen / Keine Antwort"

// 3. Farbe und Transparenz (0.0 - 1.0 = 0 - 100%) des Ergebnisses
//		Color and transparency (0.0 - 1.0 = 0 - 100%) of the result
var STYLE_ADDON_FAVORITE_PARTY_COLOR = "#fff"
var STYLE_ADDON_FAVORITE_PARTY_OPACITY = "0.8"

///////////////////////////////////////////////////////////////////////  


// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.


///////////////////////////////////////////////////////////////////////

// Auswahl der Parteien am Anfang in Bootstrap-MODAL
// Aufruf nach dem Laden des Dokuments
function mow_addon_show_parties_at_start() {	
	
	divContent =  ''
	
		divContent += '<div style="all: unset;"></div>'	// CSS zurück setzen: "#sectionDescription > div:nth-of-type(1)"
		 
		divContent += '<div class="modal fade" id="favoritePartyModal" tabindex="-1" role="dialog" aria-labelledby="favoritePartyModalLabel" aria-hidden="true">'
			divContent += '<div class="modal-dialog modal-dialog-centered" role="document">'
				divContent += '<div class="modal-content">'
				
					divContent += '<div class="modal-header">'
						divContent += '<h5 class="modal-title" id="favoritePartyModalLabel">'+TEXT_ADDON_FAVORITE_PARTY_WELCOME_MESSAGE+'</h5>'
							divContent += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
								divContent += '<span aria-hidden="true">&times;</span>'
							divContent += '</button>'
						divContent += '</div>'
					
					divContent += '<div class="modal-body">'

		// divContent +=  ''
	
	for (i = 0; i <= (intParties-1); i++)
	{
		divContent += '<button type="button" class="btn btn-outline-dark btn-block" onclick="mow_addon_favorite_parties_set_favorite_party('+i+')">'+arPartyNamesLong[i]+'</button>'
	}

					divContent += '</div>'

					divContent += '<div class="modal-footer">'
						divContent += '<button type="button" class="btn btn-secondary" data-dismiss="modal">'+TEXT_ADDON_FAVORITE_PARTY_SKIP_DECISION+'</button>'
					divContent += '</div>'

				divContent += '</div>'	
			divContent += '</div>'
		divContent += '</div>'
	divContent += '</div>'


	// #sectionDescription wurde in OUTPUT.JS / fnHideWelcomeMessage() gelöscht und ausgeblendet
	// ich benutzte die ID hier wieder um Daten rein zu schreiben
		
	$('#sectionDescription').append(divContent).show();
	$('#favoritePartyModal').modal('show')
}


// MutationObserver starten - prüft Änderungen im DOM
// Aufruf nach dem Laden des Dokuments
// https://medium.com/better-programming/js-mutationobserver-1d7aed479da2
// https://developer.mozilla.org/de/docs/Web/API/MutationObserver
function mow_addon_favorite_parties_MutationObserver() {

	// zu überwachende Zielnode (target) auswählen
	var target = document.querySelector('#resultsHeading');
	 
	// eine Instanz des Observers erzeugen und Callback-Funktion aufrufen
	var observer = new MutationObserver(mow_addon_favorite_parties_highlight_party)
	 
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


// Klick-Funktion auf den Buttons mit dem Parteinamen
var favorite_party = -1
function mow_addon_favorite_parties_set_favorite_party(number) {
	// setze (globale) Variable
	favorite_party = number
	
	// schließe Bootstrap-Modal
	$('#favoritePartyModal').modal('toggle')
}


// Hintergrund der ursprünglich ausgewählten Partei einfärben
// Aufruf aus  mow_addon_favorite_parties_MutationObserver()
function mow_addon_favorite_parties_highlight_party() {
	
	// Hintergrund einfärben
	try {
		// die Partei 0 ist in der Zeile "resultsShortParty0" usw. 
		document.getElementById("resultsShortPartyClamp"+favorite_party).style.background = STYLE_ADDON_FAVORITE_PARTY_COLOR;
		document.getElementById("resultsShortPartyClamp"+favorite_party).style.opacity = STYLE_ADDON_FAVORITE_PARTY_OPACITY;		
	} 
	catch (e) {
		// Ergebnisse noch nicht aufgebaut.
	}

}


// Start
window.addEventListener("load", function () {
	
	// MutationObserver starten - prüft ob die Ergebnisse geladen wurden 
	mow_addon_favorite_parties_MutationObserver()
	
	// Klick-Funktion auf START-Knopf (unter der Willkommensnachricht) legen
	document.getElementById("descriptionButtonStart").addEventListener("click", function() {
		// Auswahl der Parteien am Anfang in Bootstrap-MODAL
  		mow_addon_show_parties_at_start() 
  		});
  	}); 
