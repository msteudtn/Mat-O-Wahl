// GENERAL.JS von http://www.mat-o-wahl.de
// Allgemeine Verarbeitungen
// Lizenz: GPL 3
// Mathias Steudtner http://www.medienvilla.com

var version = "0.2.4.2.20161021"

// Globale Variablen
var arQuestionsShort = new Array();	// Kurzform der Fragen: Atomkraft, Flughafenausbau, ...
var arQuestionsLong = new Array();		// Langform der Frage: Soll der Flughafen ausgebaut werden?

var arPartyPositions = new Array();	// Position der Partei als Zahl aus den CSV-Dateien (1/0/-1)
var arPartyOpinions = new Array();		// Begründung der Parteien aus den CSV-Dateien
var arPersonalPositions = new Array();	// eigene Position als Zahl (1/0/-1)
var arVotingDouble = new Array();

var arPartyFiles = new Array();		// Liste mit den Dateinamen der Parteipositionen
var arPartyNamesShort = new Array();	// Namen der Parteien - kurz
var arPartyNamesLong = new Array();	// Namen der Parteien - lang
var arPartyLogosImg = new Array();		// Logos der Parteien
var arPartyInternet = new Array();		// Internetseiten der Parteien

var arSortParties=new Array();		//Nummern der Listen, nach Punkten sortiert

var activeQuestion=0; //aktuell angezeigte Frage

arPartyFiles 	= fnTransformDefinitionStringToArray(strPartyFiles);
arPartyNamesShort = fnTransformDefinitionStringToArray(strPartyNamesShort);
arPartyNamesLong= fnTransformDefinitionStringToArray(strPartyNamesLong);
arPartyLogosImg	= fnTransformDefinitionStringToArray(strPartyLogosImg);
arPartyInternet	= fnTransformDefinitionStringToArray(strPartyInternet);


// Anzeige der Fragen
function fnShowQuestions(csvData)
{
	// Zeilenweises Einlesen der Fragen ...
	fnSplitLines(csvData,1);

	// ... und Anzeigen
	var questionNumber = -1;
	
	fnShowQuestionNumber(questionNumber);
} 



// Einlesen der Parteipositionen
function fnReadPositions(csvData)
{
	// Zeilenweises Einlesen der Parteipositionen und Vergleichen
	fnSplitLines(csvData,0);
}


// Auswertung (Berechnung)
function fnEvaluation()
{

	// Abstimmungsknöpfe entfernen 
	$("#voting").empty();
	$("#explanation").fadeOut(500).empty();

	// Anzahl der Fragen bestimmen, da Positions-Array ein Vielfaches aus Fragen * Parteien enthält.
	var numberOfQuestions = arQuestionsLong.length;		// 3 Fragen
	var numberOfPositions = arPartyPositions.length; // 12 = 3 Fragen * 4 Parteien
	var indexPartyInArray = -1; // Berechnung der Position des Index der aktuellen Partei
	var positionsMatch = 0;	// Zaehler fuer gemeinsame Positionen

	var arResults = new Array();
	for (i = 0; i <= (arPartyFiles.length-1); i++)
	{
		arResults.push(0);	// Array mit leeren Werten füllen		
	}

	// Vergleichen der Positionen
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
			var faktor=1; //Faktor ist 1 normal und 2 wenn Frage doppelt gewertet werden soll
			if(arVotingDouble[modulo])
				{faktor=2;}
			// Bei Uebereinstimmung, Zaehler um eins erhoehen		
			if (arPartyPositions[i] == arPersonalPositions[modulo])
			{
				positionsMatch+=faktor;
				arResults[indexPartyInArray] = positionsMatch; 
			}
			// Partei ist neutral -> 0,5 Punkte vergeben
			else if ( (arPartyPositions[i] == 0) )
			{
				positionsMatch+=0.5*faktor;
				arResults[indexPartyInArray] = positionsMatch;			
			} // end: if arPartyPosition-i = arPersonalPosition
		} // end: Frage nicht uebersprungen
	} // end: for numberOfQuestions
	
	// Wenn Nutzer eingewilligt hat ...
	if ( $("#keepStatsCheckbox").attr("checked")==1)
	{
		fnSendResults(arResults, arPersonalPositions);
	}
	else
	{
	}
	$("#keepStats").hide().empty();

	return arResults;

}



// ALTERNATIV - Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion - einfacher aber ohne Fehlercode
function ALT2_fnReadCsv(csvFile,fnCallback)
{

 $.get(csvFile, function(data) {  
    fnCallback(data);
 } );
	
}


// Einlesen der CSV-Datei und Weitergabe an Rückgabefunktion
function fnReadCsv(csvFile,fnCallback)
{

 $.ajax({ 
	type: "GET", 
	url: csvFile,
	dataType: "text", 
	contentType: "application/x-www-form-urlencoded",
	async: false,
	success: function(data) {  
		fnCallback(data); },
	error: function(objXML, textStatus, errorThrown) {
		alert("ERROR - Fehler beim Einlesen der CSV-Datei \n\nCode - objXML-Status: "+objXML.status+" \n\nCode - textStatus: "+textStatus+" \n\nCode - errorThrown: "+errorThrown+" \n\nName und Verzeichnis der CSV-Datei sollte sein: "+csvFile+" \n\nLoesungshinweise: Gross- und Kleinschreibung beachtet? Datei-Endung uebersehen? Datei im richtigen Verzeichnis? Lokaler XHR-Zugriff fuer Google Chrome-Browser moeglich mittels --allow-file-access-from-files (Issue 40787)?"); }
	} );

}


// Senden der persoenlichen Ergebnisse an den Server (nach Einwilligung)
function fnSendResults(arResults, arPersonalPositions)
{
	var strResults = arResults.join(",");
	var strPersonalPositions = arPersonalPositions.join(",");
	
	$.get(statsServer, { mowpersonal: strPersonalPositions, mowparties: strResults } );

	alert("Daten gesendet an Server:"+statsServer+" mowpersonal: "+strPersonalPositions+" mowparties: "+strResults+"")
}


// Auslesen der Zeile und speichern der Werte in Arrays
function fnSplitLines(csvData,modus)
{
	// Auftrennen am Zeilenumbruch 
 	var arZeilen = csvData.split("\n");
 
	for(i = 0; i <= arZeilen.length-1; i++)
	{

		var posSeparator = arZeilen[i].indexOf(separator);	// CSV Zeile am ERSTEN Komma/Semikolon auftrennen
		var valueOne = arZeilen[i].substring(0,posSeparator);	// Frage in einem Stichwort
		var valueTwo = arZeilen[i].substring((posSeparator+1),arZeilen[i].length); // Ausformulierte Frage 
		
		valueOne = fnClearQuotes(valueOne);
		valueTwo = fnClearQuotes(valueTwo);
		
		if (posSeparator < 0)
		{
			// Fehler, kein Eintrag auf dieser Zeile oder zu weit gezählt.
		}
		else
		{
			if (modus == 1)
			{
				// Fragen in globales Array schreiben
				arQuestionsShort.push(valueOne);
				arQuestionsLong.push(valueTwo);
			}
			else
			{
				// Antworten und Meinungen in globales Array schreiben
				 	arPartyPositions.push(valueOne);
				 	arPartyOpinions.push(valueTwo);
			}  // end if-else modus == 1
		} // end: if-else posSeparator < 0
	} // end: for
}


// entfernt die Anführungszeichen am Anfang und Ende aus den CSV-Daten, falls vorhanden (MS Excel & OO Calc fügen diese ein)
function fnClearQuotes(string)
{
	var strLength = string.length;
	// wenn letztes Zeichen Anführungszeichen ist ...
	if (string.charAt((strLength-1)) == '"')
	{
		string = string.substr(0,(strLength-1));
	}
	
	// wenn erstes Zeichen Anführungszeichen ist ...
	if (string.charAt(0) == '"') // nur Mozilla
	{
		string = string.substr(1,(strLength-1));
	}
	
	string = string.replace(/""/g, '"');	// doppelte Anfuehrungszeichen ersetzen (ergibt Anfuerungszeichen im Text)

	return string;
}



// Berechnet Prozentwerte
function fnPercentage(value,max)
{
	var percent = value * 100 / max;
	percent = Math.round(percent);
	return percent; 
}


// wandelt den String aus der DEFINITION.JS in ein ARRAY um - einfacher fuer den Benutzer
function fnTransformDefinitionStringToArray(strName)
{
	var arName = new Array();
	var arName = strName.split(",")
	for (i = 0; i <= arName.length-1; i++)
	{ 
		arName[i] = jQuery.trim(arName[i]); 
	} 
	return arName;
}


// ersetzt die Position (-1, 0, 1) mit dem passenden Bild
function fnTransformPositionToImage(position)
{
	var arImages = new Array("contra_icon.png","neutral_icon.png","pro_icon.png")
	var positionImage = "skip_icon.png";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionImage = arImages[(z+1)];
		}
	}
	return positionImage;	
}

// ersetzt die Position (-1, 0, 1) mit der passenden Farbe
function fnTransformPositionToColor(position)
{
	var arColors = new Array("#ff0000","#ffff00","#00ff00")
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


// ersetzt die Position (-1, 0, 1) mit dem passenden Text
function fnTransformPositionToText(position)
{
	var arText = new Array("Stimme dagegen","Egal/Wei&szlig; nicht","Stimme daf&uuml;r")
	var positionText = "&Uuml;bersprungen";
	for (z = -1; z <= 1; z++)
	{
	 	if (z == position)
		{
			positionText = arText[(z+1)];
		}
	}
	return positionText;
	
}


// Gibt ein Bild für den Balken in der Auswertung entsprechend der Prozentzahl Uebereinstimmung zurück
function fnBarImage(percent)
{
	if (percent <= 33)
	{ var barImage = "contra_px.png"; }
	else if (percent <= 66)
	{ var barImage = "neutral_px.png"; }
	else
	{ var barImage = "pro_px.png"; }
	
	return barImage;
}


// Berechnet die "mittlere" Farbe aus Text und Hintergrund für die Tabellenzeilen in der Auswertung -> 0.2.4.1 DEPRECATED -> built in CSS ODD
function DEPRECATED_fnCreateMiddleColor()
{
	var bodyTextcolor = $("body").css("color");
	var bodyBackcolor = $("body").css("background-color");
	
	if (bodyTextcolor.charAt(0) == "#")
	{	bodyTextcolor = fnTransformHexToDec(bodyTextcolor.substr(1,6)); }
	if (bodyBackcolor.charAt(0) == "#")
	{	bodyBackcolor = fnTransformHexToDec(bodyBackcolor.substr(1,6)); }

	var arBodyTextcolorRgb = bodyTextcolor.split(",");
	var arBodyBackcolorRgb = bodyBackcolor.split(",");

	var bodyTextcolorR = arBodyTextcolorRgb[0].substr(4,3);	// 255
	var bodyTextcolorG = arBodyTextcolorRgb[1].substr(0,4);	// 0
	var bodyTextcolorB = arBodyTextcolorRgb[2].substr(0,(arBodyTextcolorRgb[2].length-1));

	var bodyBackcolorR = arBodyBackcolorRgb[0].substr(4,3);	// 0
	var bodyBackcolorG = arBodyBackcolorRgb[1].substr(0,4);	// 255
	var bodyBackcolorB = arBodyBackcolorRgb[2].substr(0,(arBodyBackcolorRgb[2].length-1));

	var bodyBackcolorR = parseInt(bodyBackcolorR);
	var bodyBackcolorG = parseInt(bodyBackcolorG);
	var bodyBackcolorB = parseInt(bodyBackcolorB);
	
	var bodyTextcolorR = parseInt(bodyTextcolorR);
	var bodyTextcolorG = parseInt(bodyTextcolorG);
	var bodyTextcolorB = parseInt(bodyTextcolorB);

	var middleR = Math.round( (bodyBackcolorR + bodyTextcolorR) / 2);	// (255 + 0)/2 = 128
	var middleG = Math.round( (bodyBackcolorG + bodyTextcolorG) / 2);	// (0 + 255)/2 = 128
	var middleB = Math.round( (bodyBackcolorB + bodyTextcolorB) / 2);
	
	var middleR = Math.round( ( bodyBackcolorR + (middleR - bodyBackcolorR)/2) ); // 0 + (128 - 0)/2 = 0 + 128/2 = 0 + 64 = 64 
	var middleG = Math.round( ( bodyBackcolorG + (middleG - bodyBackcolorG)/2) ); // 255 + (128 - 255)/2 = 255 + -128/2 = 255 - 64 = 192
	var middleB = Math.round( ( bodyBackcolorB + (middleB - bodyBackcolorB)/2) );
	
	var middleColor = "rgb("+middleR+","+middleG+","+middleB+")";
	return middleColor;
}


// wandelt HEX in DEC um -> 0.2.4.1 DEPRECATED -> built in CSS ODD
function DEPRECATED_fnTransformHexToDec(color)
{
	var colorR = color.substr(0,2);
	var colorG = color.substr(2,2);
	var colorB = color.substr(4,2);
	
	var colorR = parseInt(colorR.toUpperCase(),16)
	var colorG = parseInt(colorG.toUpperCase(),16)
	var colorB = parseInt(colorB.toUpperCase(),16)
	
	var colorRGB = "rgb("+colorR+","+colorG+","+colorB+")";
	return colorRGB;
}


// Bei Klick auf "Details anzeigen/verbergen", pruefe ob Partei angezeigt werden soll fuer Vergleich 
function fnStartToggleTableRow(questionLength)
{
//	for (x = 0; x <= (arPartyFiles.length-1); x++) // Ver 0.2.3.2
	for (x = 0; x <= (arSortParties.length-1); x++) // 
	{		
//		fnToggleTablerow(x,questionLength); // Ver 0.2.3.2
		fnToggleTablerow(arSortParties[x],questionLength); // 
	}
}

// neu BenKob
function fnToggleSelfPosition(i)
{
	arPersonalPositions[i]--;
	if (arPersonalPositions[i]==-2) 
		{arPersonalPositions[i]=99}
	if (arPersonalPositions[i]==98) 
		{arPersonalPositions[i]=1}
	var positionImage = fnTransformPositionToImage(arPersonalPositions[i]);
	var positionColor = fnTransformPositionToColor(arPersonalPositions[i]);
	var positionText  = fnTransformPositionToText(arPersonalPositions[i]);
	$("#selfPosition"+i).attr("src", "img/"+positionImage);
	$("#selfPosition"+i).attr("alt", positionText);
	$("#selfPosition"+i).attr("title", positionText);
	$(".positionRow"+i).css("border","1px solid "+positionColor);
	fnReEvaluate();
}

// neu BenKob
function fnToggleDouble(i)
{
	arVotingDouble[i]=!arVotingDouble[i];
	if(arVotingDouble[i])
	{
		$("#doubleIcon"+i).attr("src","img/double-yes_icon.png");
		$("#doubleIcon"+i).attr("title","'Frage wird doppelt gewertet");
	}
	else
	{
		$("#doubleIcon"+i).attr("src","img/double-no_icon.png");
		$("#doubleIcon"+i).attr("title","'Frage wird einfach gewertet");
	}
	fnReEvaluate();
}

// Einblenden/Ausblenden der Spalte mit den Parteipositionen
function fnToggleTablerow(partyId, questionLength)
{

	// Pruefwert fuer checked (1) / unchecked in der Tabelle von #resultsShort
	var value = $("#party"+partyId+"").attr("checked");
	
	var multiplier = arPartyFiles.length + 2; // beginne ab Spalte 3

	// Partei ist angeklickt fuer detaillierte Auswertung
	if (value == true)
	{

		$("#resultsLong").fadeIn();		// sicherstellen, dass die Tabelle auch angezeigt wird. 
		
		// Spalte einblenden
		$("#partyNameCell"+partyId).fadeIn(500);
		
		for (z = 0; z <= questionLength-1; z++)
		{	
			var cellId = partyId + 2 + (z * multiplier);	// naechste Zelle in Spalte XY
			var time = 500+i*100;
			$("#partyPositionCell"+cellId).fadeIn(time);
	
//		$("#debug").append("<br /> A val:"+value+" partyId:"+partyId+" cellId: "+cellId)
		}
	}
	// Partei ist nicht angeklickt fuer detaillierte Auswertung ...
	else
	{
		// ... und Long-Tabelle wird bereits angezeigt
		if( $('#resultsLong').is(':visible'))
		{

			// Spalte langsam ausblenden
			$("#partyNameCell"+partyId).fadeOut(500);
			
			for (z = 0; z <= questionLength-1; z++)
			{	
				var cellId = partyId + 2 + (z * multiplier);	// naechste Zelle in Spalte XY
				var time = 500+i*100;
				$("#partyPositionCell"+cellId).fadeOut(time);			
//				$("#debug").append("<br /> B val:"+value+" partyId:"+partyId+" cellId: "+cellId)
			}
		}
		// ... aber Long-Tabelle ist ausgeblendet
		else if( $('#resultsLong').is(':hidden'))
		{

//		$("#debug").append("<br /> C val:"+value+" partyId:"+partyId)

			// Spalte einfach so ausblenden - bei fadeOut muss das Element sichtbar sein			
		   $("#partyNameCell"+partyId).hide();
			for (z = 0; z <= questionLength-1; z++)
			{	
				var cellId = partyId + 2 + (z * multiplier);	// naechste Zelle in Spalte XY
				var time = 500+i*100;
				$("#partyPositionCell"+cellId).hide();			
			}
		}

	}
	
}


// 
function fnCalculatePieChart(radius,prozent,divName)
{
	var faktor = (25 - prozent) / 50 * -1;
	fnDrawPieChart(radius,faktor,divName);
}

// zeichnet einen Kreis, Halbkreis, Viertelkreis usw.
function fnDrawPieChart(radius,faktor,divName)
{
	//var canvas = document.getElementById(divName);
	var canvas = document.getElementById("pieChart");
	if (canvas.getContext)
	{
		canvas = canvas.getContext('2d');

		// Rahmen um Kreis zeichnen
		bodyTextcolor = $("body").css("color");
		canvas.strokeStyle = bodyTextcolor;
		canvas.lineWidth = 1.0;
		canvas.beginPath();
		canvas.moveTo(radius, radius);	// Startposition festlegen (= Mittelpkt)
    	canvas.arc(radius, radius, radius, Math.PI*-0.5, Math.PI*2, false);
		canvas.stroke();    	
    	canvas.closePath();		

		// Kreis zeichnen
		canvas.fillStyle = bodyTextcolor;
		canvas.beginPath();	   
    	canvas.moveTo(radius, radius);	// Startposition festlegen (= Mittelpkt)
    	// http://canvas.quaese.de/index.php?nav=6,35&doc_id=24
    	// arc(x, y, radius, startAngle, endAngle, anticlockwise)
   	canvas.arc(radius, radius, radius, Math.PI*-0.5, Math.PI*faktor, false);
    	canvas.closePath();
    	canvas.fill();
	}
}
