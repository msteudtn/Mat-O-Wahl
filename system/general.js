// GENERAL.JS http://www.mat-o-wahl.de
// General functions / Allgemeine Verarbeitungen
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

var version = "0.5.1.20201230"

// Globale Variablen
var arQuestionsShort = new Array();	// Kurzform der Fragen: Atomkraft, Flughafenausbau, ...
var arQuestionsLong = new Array();		// Langform der Frage: Soll der Flughafen ausgebaut werden?

var arPartyPositions = new Array();	// Position der Partei als Zahl aus den CSV-Dateien (1/0/-1)
var arPartyOpinions = new Array();		// Begründung der Parteien aus den CSV-Dateien
var arPersonalPositions = new Array();	// eigene Position als Zahl (1/0/-1)
var arVotingDouble = new Array();	// eigene Position als Zahl (2/1/0/-1/-2)

// var arPartyFiles = new Array();		// Liste mit den Dateinamen der Parteipositionen
var arPartyNamesShort = new Array();	// Namen der Parteien - kurz
var arPartyNamesLong = new Array();	// Namen der Parteien - lang
var arPartyDescription = new Array();	// Beschreibung der Datei
var arPartyInternet = new Array();		// Internetseiten der Parteien
var arPartyLogosImg = new Array();		// Logos der Parteien

var arSortParties=new Array();		// Nummern der Listen, nach Punkten sortiert

var activeQuestion=0; //aktuell angezeigte Frage (output.js)


// Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion "fnCallback"
function fnReadCsv(csvFile,fnCallback)
{
// http://michaelsoriano.com/working-with-jquerys-ajax-promises-and-deferred-objects/
 $.ajax({ 
	type: "GET", 
	url: csvFile,
	dataType: "text", 
	contentType: "application/x-www-form-urlencoded",
	error: function(objXML, textStatus, errorThrown) {
		alert("Mat-O-Wahl ERROR - Reading CSV-file \n\nCode - objXML-Status: "+objXML.status+" \n\nCode - textStatus: "+textStatus+" \n\nCode - errorThrown: "+errorThrown+" \n\nName and folder of CSV-file should be: "+csvFile+" \n\nPossible solutions: Check for capital letters. Extension of file? File in the wrong folder? Are you working on a local machine or a server? e.g. XHR-access for Google Chrome via --allow-file-access-from-files (Issue 40787)?"); }
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


// Anzeige der Fragen (aus fnStart())
function fnShowQuestions(csvData)
{
	// Einlesen der Fragen ...
	// fnSplitLines(csvData,1);
	fnTransformCsvToArray(csvData,1)
	
	// ... und Anzeigen
	var questionNumber = -1;
	
	fnShowQuestionNumber(questionNumber);
} 



// Einlesen der Parteipositionen und Partei-Informationen (aus fnStart())
function fnReadPositions(csvData)
{
	// Einlesen der Parteipositionen und Vergleichen
	// fnSplitLines(csvData,0);
	fnTransformCsvToArray(csvData,0)
}


// Auswertung (Berechnung)
// Gibt ein Array "arResults" zurück für fnEvaluationShort() und fnEvaluationLong() und fnReEvaluate();
// Aufruf am Ende aller Fragen in fnShowQuestionNumber() und beim Prüfen auf die "doppelte Wertung" in fnReEvaluate()
function fnEvaluation()
{

	// Abstimmungsknöpfe u.a. entfernen 
	$("#explanation").fadeOut(500).empty();
	$("#progress").fadeOut(500).empty();
	$("#voting").empty();
	$("#jumpToQuestion").empty();
	$("#keepStats").hide();

	// Anzahl der Fragen bestimmen, da Positions-Array ein Vielfaches aus Fragen * Parteien enthält.
//	var numberOfQuestions = arQuestionsLong.length;		// 3 Fragen
//	var numberOfPositions = arPartyPositions.length; // 12 = 3 Fragen * 4 Parteien

	var numberOfQuestions = intQuestions;		// 3 Fragen
	var numberOfPositions = intQuestions * intParties; // 12 = 3 Fragen * 4 Parteien

	var indexPartyInArray = -1; // Berechnung der Position des Index der aktuellen Partei
	var positionsMatch = 0;	// Zaehler fuer gemeinsame Positionen

	var arResults = new Array();
//	for (i = 0; i <= (arPartyFiles.length-1); i++)
	for (i = 0; i <= (intParties-1); i++)
	{
		arResults.push(0);	// Array mit leeren Werten füllen		
	}

	// Vergleichen der Positionen (= Fragen x Parteien)
	for (i = 0; i <= (numberOfPositions-1); i++)
	{
		var modulo = i % numberOfQuestions;	// 0=0,3,6,9 ; 1=1,4,7,10 ; 2=2,5,8,11
		if (modulo == 0)
		{
			indexPartyInArray++;	// neue Partei in der Array-Liste
			positionsMatch = 0;
		}

		// Frage wurde nicht uebersprungen per SKIP (99) oder GEHE ZUR NAECHSTEN FRAGE (-)
		if ( (arPersonalPositions[modulo] < 99) ) 
		{
			var faktor=1; // Faktor ist 1 normal und 2, wenn Frage doppelt gewertet werden soll
			if(arVotingDouble[modulo])
				{faktor=2;}

			// Bei Uebereinstimmung der persönlichen Meinung (1,0,-1) mit Partei-Antwort (1,0-1), den Zaehler (Anzahl Übereinstimmungen) um eins erhoehen	
			if (arPartyPositions[i] == arPersonalPositions[modulo])
			{
				positionsMatch+=faktor;
				arResults[indexPartyInArray] = positionsMatch;

			}
			// Eigene Meinung ist neutral ODER Partei ist neutral -> 0,5 Punkte vergeben
			else if ( (arPersonalPositions[modulo] == 0) || (arPartyPositions[i] == 0) )
			{
				positionsMatch+=0.5*faktor;
				arResults[indexPartyInArray] = positionsMatch;

			} // end: if arPartyPosition-i = arPersonalPosition
		} // end: Frage nicht uebersprungen
	} // end: for numberOfQuestions
	
	// Wenn Nutzer eingewilligt hat ...
	if ( $("#keepStatsCheckbox").prop("checked")==1)
	{
		// Sende Auswertung an Server
		fnSendResults(arResults, arPersonalPositions);
	}
	else
	{
	}

	$("#keepStats").hide().empty();	

//	console.log(arResults)
	return arResults;

}


// Senden der persoenlichen Ergebnisse an den Server (nach Einwilligung)
// Aufruf aus fnEvaluation()
function fnSendResults(arResults, arPersonalPositions)
{
	// Korrektur der Parteiposition (-1,0,1) mit den Informationen aus der doppelten Wertung (-2,-1,0,1,2)
	// Marius Nisslmueller, Bad Honnef, Juni 2020
	arPersonalPositionsForStats = arPersonalPositions.slice(); // Damit arPersonalPositions nicht verändert wird
	for(let i=0; i<arPersonalPositionsForStats.length; i++){
		if(arVotingDouble[i]){
		    arPersonalPositionsForStats[i] *= 2; 
		}
	}


	var strResults = arResults.join(",");
	// var strPersonalPositions = arPersonalPositions.join(",");
	var strPersonalPositions = arPersonalPositionsForStats.join(",");
	
	$.get(statsServer, { mowpersonal: strPersonalPositions, mowparties: strResults } );

	console.log("Mat-O-Wahl. Daten gesendet an Server: "+statsServer+" - mowpersonal: "+strPersonalPositions+" - mowparties: "+strResults+"")
}


// Berechnet Prozentwerte
function fnPercentage(value,max)
{
	var percent = value * 100 / max;
	percent = Math.round(percent);
	return percent; 
}

// v.0.3 NEU
// CSV-Daten in Array einlesen (aus fnShowQuestions() und fnReadPositions())
function fnTransformCsvToArray(csvData,modus)
{
	// benutzt externe jquery-csv-Bibliothek
	arZeilen = $.csv.toArrays(csvData, {separator: ""+separator+""});
	
//	console.log(arZeilen.length+ " Part "+intParties+" quest: "+intQuestions )


	// Number of lines per party for MODULO-Operation on the ANSWERS-file
	// There are five (5) lines with information on the party + "intQuestions" lines + an empty line
	// Example "Obsthausen"/"Fruitville" = 5 + 6 + 1 = 12
	// Example "Springfield" = 5 + 15 + 1 = 21
	var numberOfLines = 6 + intQuestions 

	for(i = 0; i <= arZeilen.length-1; i++)
	{
		// console.log("i: "+i+" m: "+modus+" val0: "+arZeilen[i][0]+" val1: "+arZeilen[i][1] )	
		valueOne = arZeilen[i][0];
		valueTwo = arZeilen[i][1];
		
		// FRAGEN in globales Array schreiben (z.B. aus FRAGEN.CSV)
		if (modus == 1)
		{
			arQuestionsShort.push(valueOne);
			arQuestionsLong.push(valueTwo);
		}
		// ANTWORTEN und Meinungen in globales Array schreiben (z.B. aus PARTEIEN.CSV)
		else
		{
			// v.0.5 NEU
			// ALLE Partei-Informationen in einer CSV-Datei
			modulo = i % numberOfLines;
			if ( (modulo == 0) && (valueTwo != "undefined") )
			{ 
				// Parteinamen - kurz
				arPartyNamesShort.push(valueTwo)
			}
			else if ( (modulo == 1) && (valueTwo != "undefined") )
			{ 
				// Parteinamen - lang
				arPartyNamesLong.push(valueTwo)
			}
			else if ( (modulo == 2) && (valueTwo != "undefined") )
			{ 
				// Beschreibung der Partei (optional)
				arPartyDescription.push(valueTwo)
//				console.log("i: "+i+ " value: "+valueTwo)
			}
			else if ( (modulo == 3) && (valueTwo != "undefined") )
			{ 
				// Webseite der Partei
				arPartyInternet.push(valueTwo)
			}
			else if ( (modulo == 4) && (valueTwo != "undefined") )
			{ 
				// Logo der Partei
				arPartyLogosImg.push(valueTwo)
			}
			else if (valueTwo)
			{
				// Positionen und Erklärungen
				arPartyPositions.push(valueOne); // -1,0,1
				arPartyOpinions.push(valueTwo); // Erklärung zur Zahl
			}
			else 
			{
				// nothing to do. Just empty lines in the CSV-file
			}
		}  // end: if-else modus == 1	
	}  // end: for
}

// v.0.3 NEU
// ersetzt die Position (-1, 0, 1) mit dem passenden Button
function fnTransformPositionToButton(position)
{
	var arButtons = new Array("btn-danger","btn-warning","btn-success")
	var positionButton = "btn-default";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionButton = arButtons[(z+1)];
		}
	}
	return positionButton;
}

// v.0.3 NEU
// ersetzt die Position (-1, 0, 1) mit dem passenden Icon
function fnTransformPositionToIcon(position)
{
	var arIcons = new Array("&#x2716;","&#x25EF;","&#x2714;")
	var positionIcon = "&#x21B7;";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionIcon = arIcons[(z+1)];
		}
	}
	return positionIcon;
}

// ersetzt die Partei-Position (-1, 0, 1) mit der passenden Farbe
function fnTransformPositionToColor(position)
{
	// red, yellow, green - "#ff0000","#ffff00","#00ff00"
	// Bootstrap-colors: https://github.com/twbs/bootstrap/blob/master/dist/css/bootstrap.css
	var arColors = new Array("#d9534f","#f0ad4e","#5cb85c")
	var positionColor = "#c0c0c0";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionColor = arColors[(z+1)];
		}
	}
	return positionColor;
	
}


// ersetzt die Partei-Position (-1, 0, 1) mit dem passenden Text
function fnTransformPositionToText(position)
{
	var arText = new Array("[-]","[o]","[+]")
	var positionText = "[/]";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionText = arText[(z+1)];
		}
	}
	return positionText;
	
}

// Gibt ein Bild/CSS-Klasse für den Balken in der Auswertung entsprechend der Prozentzahl Uebereinstimmung zurück
function fnBarImage(percent)
{
	// bis v.0.3 mit PNG-Bildern, danach mit farblicher Bootstrap-Progressbar
	
	if (percent <= 33) { 
		// var barImage = "contra_px.png"; 
		var barImage = "bg-danger"; 
	}
	else if (percent <= 66) { 
		// var barImage = "neutral_px.png"; 
		var barImage = "bg-warning"; 
	}
	else { 
		// var barImage = "pro_px.png"; 
		var barImage = "bg-success"; 
	}
	
	return barImage;
}


// 02/2015 BenKob (doppelte Wertung)
function fnToggleSelfPosition(i)
{
	arPersonalPositions[i]--;
	if (arPersonalPositions[i]==-2) 
		{arPersonalPositions[i]=99}
	if (arPersonalPositions[i]==98) 
		{arPersonalPositions[i]=1}
//	var positionImage = fnTransformPositionToImage(arPersonalPositions[i]);
	var positionButton = fnTransformPositionToButton(arPersonalPositions[i]);
	var positionIcon = fnTransformPositionToIcon(arPersonalPositions[i]);
	// var positionColor = fnTransformPositionToColor(arPersonalPositions[i]);
	var positionText  = fnTransformPositionToText(arPersonalPositions[i]);
	
	// $("#selfPosition"+i).attr("src", "img/"+positionImage);
	$("#selfPosition"+i).removeClass("btn-danger btn-warning btn-success btn-default").addClass(positionButton);
	$("#selfPosition"+i).html(positionIcon);
	$("#selfPosition"+i).attr("alt", positionText);
	$("#selfPosition"+i).attr("title", positionText);
	// $(".positionRow"+i).css("border","1px solid "+positionColor);

//	console.log("toggle funktion i: "+i)

	fnReEvaluate();
}

// 02/2015 BenKob (doppelte Wertung)
function fnToggleDouble(i)
{
	arVotingDouble[i]=!arVotingDouble[i];
	if(arVotingDouble[i])
	{
		// $("#doubleIcon"+i).attr("src","img/double-yes_icon.png");
		$("#doubleIcon"+i).removeClass("btn-outline-dark").addClass("btn-dark");
		$("#doubleIcon"+i).attr("title","'Frage wird doppelt gewertet");
	}
	else
	{
		// $("#doubleIcon"+i).attr("src","img/double-no_icon.png");
		$("#doubleIcon"+i).removeClass("btn-dark").addClass("btn-outline-dark");
		$("#doubleIcon"+i).attr("title","'Frage wird einfach gewertet");
	}
	fnReEvaluate();
}
