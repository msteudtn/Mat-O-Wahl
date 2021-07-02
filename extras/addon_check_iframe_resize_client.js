/*
// EINSTELLUNGEN / SETTINGS
// http://www.mat-o-wahl.de

/* EINSATZZWECK / USE CASE

* WENN der Mat-o-Wahl als <iframe> eingebunden wurde, prüft das Skript, 
  ob sich die Höhe ändert und ändert (dynamisch) auch die Höhe des Frames.
  Funktioniert Cross-Domain und mit gleicher Domain.

* IF the Mat-o-Wahl was included as an <iframe>, this script checks the height
  and adapts it to the current height.
  Works cross-domain and on same-domain.

	********************************************************************

* Dies ist der Teil, welcher im Mat-o-Wahl geladen werden muss in -> DEFINITION.JS

* This is the part to be included in Mat-o-Wahl in -> DEFINITION.JS

  var addons = ["extras/addon_check_iframe_resize_client.js"]  

///////////////////////////////////////////////////////////////////////  


// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.


///////////////////////////////////////////////////////////////////////

*/


// Funktion im Mat-o-Wahl zum Prüfen der aktuellen Höhe 
// Aufruf muss innerhalb des iframe erfolgen = aus dem Mat-o-Wahl (!!!)
function fnCheckBodyHeight() {

	// Bestimmen der aktuellen Höhe des sichtbaren Bereichs zzgl. 20px Reserve
	
	// Suche das erste (einzige) HTML-Tag in der Seite -> Deshalb muss diese 
	// Funktion im Mat-o-Wahl (also innerhalb des <iframe> ausgeführt werden 
	// und soll nicht von der Eltern-Seite kommen. Dort erhält man größere Height-Werte. :(
	var height = document.getElementsByTagName("html")[0].offsetHeight + 20;
	
	// sende die Höhe an die Listener-Funktion (fnMatoWahlIframeEventListener)
	// Die Listener-Funktion wurde in einer separaten JS-Datei in der Eltern-HTML geladen.
	parent.postMessage(["setHeight", height], "*"); 
}


// Starte, wenn der Mat-o-Wahl geladen wurde ... und wiederhole die Funktion alle 0,25 Sekunden (250 ms)
window.addEventListener('load', function() {
	window.setInterval(fnCheckBodyHeight, 250)	
});


