/*
// EINSTELLUNGEN / SETTINGS
// http://www.mat-o-wahl.de

// FUNKTION / FUNCTION

* WENN der Mat-o-Wahl als <iframe> eingebunden wurde, prüft das Skript, 
  ob sich die Höhe ändert und ändert (dynamisch) auch die Höhe des Frames.

* IF the Mat-o-Wahl was included as a <iframe>, this script checks the height
  and adapts it to the current height
  
// EINSCHRÄNKUNGEN / LIMITATIONS

* Bitte prüfen ob nicht schon eine CSS height existiert.
  Ein   style="width:100%"   im <iframe> könnte hilfreich sein.
  Der Mat-o-Wahl nutzt die Bootstrap CONTAINER-FLUID-class. Es könnte zu unschönen Rändern auf dem Smartphone kommen.
  Das Skript funktioniert nur, wenn Mat-o-Wahl und die Hauptseite mit <iframe> auf der gleichen Domain liegen.
   
* Check your CSS on the <iframe> if you have "height" already.
  A   style="width:100%"   in the <iframe> might be useful.
  Mat-o-Wahl uses the Bootstrap CONTAINER-FLUID-class. There might be an ugly gap on the left and right side on small screens (phones)
  The script only works, if Mat-o-Wahl and the <iframe>-main page are on the same domain. 


// Verwandte Links / Related links
* Github issue: https://github.com/msteudtn/Mat-O-Wahl/issues/13
* Original source: https://stackoverflow.com/questions/9162933/make-iframe-height-dynamic-based-on-content-inside-jquery-javascript

*/

// Warte bis Seite geladen wurde ...
// window.onload = function() {
 window.addEventListener("load", function(event) {

  // Variablen zuweisen ...
  this.container = this.frameElement.contentWindow.document.body;

	// Überwachung starten ...
  this.watch = () => {
    cancelAnimationFrame(this.watcher);

	// wenn sich Höhe geändert hat ...
    if (this.lastScrollHeight !== container.scrollHeight) {
    	// neue Höhe des frameElement = 50px + innere Höhe des <iframe> 
      this.frameElement.height = 50 + this.frameElement.contentWindow.document.body.scrollHeight + "px";
    }
    
    // aktuelle Höhe abspeichern. 
    this.lastScrollHeight = container.scrollHeight;
    this.watcher = requestAnimationFrame(this.watch);
  };
  this.watcher = window.requestAnimationFrame(this.watch);
  
  });
