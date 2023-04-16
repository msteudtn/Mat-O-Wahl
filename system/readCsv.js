// Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion "fnCallback"
export function fnReadCsv(csvFile,fnCallback)
{
// http://michaelsoriano.com/working-with-jquerys-ajax-promises-and-deferred-objects/
 $.ajax({ 
	type: "GET", 
	url: csvFile,
	dataType: "text", 
	contentType: "application/x-www-form-urlencoded",
	error: function(objXML, textStatus, errorThrown) {
		console.log("Mat-O-Wahl ERROR - Reading CSV-file \n Code - objXML-Status: "+objXML.status+" \n Code - textStatus: "+textStatus+" \n Code - errorThrown: "+errorThrown+" \n Name and folder of CSV-file should be: "+csvFile+" \n\nPossible solutions: Check for capital letters? OR check the extension of the file (csv / xls / xlsx)? OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de"); 
		// document.getElementById("descriptionAddonTop").innerHTML("nanu. Da ist etwas schief gegangen.")
			$("#descriptionExplanation").css("color","red").css("font-size", "150%")
			text = "<p>Nanu? Da ist etwas schief gegangen. Einige Dateien konnten nicht geladen werden. <br /> Sind Sie ein Besucher der Seite? Dann geben Sie bitte dem Administrator der Webseite Bescheid. <br /> Sind Sie der Administrator? Dann schauen Sie bitte in die Browser-Konsole (Strg+Umschalt+i) und/oder öffnen Sie die <q>quicktest.html</q>.</p>"
			text += "<p>Oh? Something went wrong. Some files couldn't be loaded. <br /> Are you a visitor of this site? Please inform the admin of the site. <br /> Are you the admin? Please check the browser-console (Ctrl+Shift+i) and/or open <q>quicktest.html</q>.</p>"
			$("#descriptionExplanation").html(text)
		}
		})
	.done(function(data) {
		// console.log('success', data) 
		console.log("Mat-o-Wahl load: "+csvFile);
		fnCallback(data);
		})
	.fail(function(xhr) {
		console.log('Mat-O-Wahl file error - ', xhr);	
		});	
}
