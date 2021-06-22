/*
// EINSTELLUNGEN / SETTINGS
// http://www.mat-o-wahl.de

* Hauptseite / Main page
	<script src="https://mat-o-wahl.de/iframe/extras/addon_check_iframe_resize_cross_domain.js"></script>
	[...]
	<iframe id="myIframe" src="https://meineSeite.de/mat-o-wahl/index.html" style="min-width:100%;" loading="lazy"></iframe>
	
	<script>
		window.onload = function() {
			fnMatoWahlCrossDomainEventListener("myIframe");
		}
	</script>

* Mat-o-Wahl/Data/Definition.js

 

// FUNKTION / FUNCTION

* WENN der Mat-o-Wahl als <iframe> eingebunden wurde, prüft das Skript, 
  ob sich die Höhe ändert und ändert auch die Höhe des Frames.
  
* IF the Mat-o-Wahl was included as a <iframe>, this script checks the height
  and adapts it to the current height

  
// EINSCHRÄNKUNGEN / LIMITATIONS

* Bitte prüfen ob nicht schon eine CSS height existiert.
  Ein   style="width:100%"   im <iframe> könnte hilfreich sein.
  Der Mat-o-Wahl nutzt die Bootstrap CONTAINER-FLUID-class. Es könnte zu unschönen Rändern auf dem Smartphone kommen.
  Das Skript dafür gedacht, wenn Mat-o-Wahl und die Hauptseite mit <iframe> auf UNTERSCHIEDLICHEN Domains liegen.
  Die Höhe geht nicht wieder zurück.
   
* Check your CSS on the <iframe> if you have "height" already.
  A   style="width:100%"   in the <iframe> might be useful.
  Mat-o-Wahl uses the Bootstrap CONTAINER-FLUID-class. There might be an ugly gap on the left and right side on small screens (phones)
  The script is intended for a setting where Mat-o-Wahl and the <iframe>-main page are on DIFFERENT domains.
  The height doesn't go back down.  


// Verwandte Links / Related links
* Github issue: https://github.com/msteudtn/Mat-O-Wahl/issues/13
* Original source: https://stackoverflow.com/questions/9162933/make-iframe-height-dynamic-based-on-content-inside-jquery-javascript

*/


function fnMatoWahlCrossDomainEventListener(iFrameID) {

	window.addEventListener('message', function(ereignis) {
	  var meinIframe = document.getElementById(iFrameID);
	  var eventName = ereignis.data[0];
	  var data = ereignis.data[1];
	  switch(eventName) {
	 case 'setHeight':
	meinIframe.height = data
	break;
	  }
	}, false);
	
}

// window.onload = function() {
window.addEventListener("load", function(event) {
	window.setInterval(resizeCrossDomain, 1500)
	})

function resizeCrossDomain() {
  var height = document.getElementsByTagName("html")[0].scrollHeight;
  parent.postMessage(["setHeight", height], "*"); 
}
