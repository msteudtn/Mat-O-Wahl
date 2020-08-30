// RESULTS.JS http://www.mat-o-wahl.de
// Read results from anonymous (example) statistics / VOTE.PHP / Auslesen der (Beispiel) Statistik-Ergebnisse
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

// Datei mit den ERGEBNISSEN. Im Beispiel der VOTE.PHP heißt sie TEST.TXT
var fileResults = "extras/statistics/test.txt";

// GLOBALE VARIABLEN
var arQuestionsShort = new Array();		// Kurzform der Fragen: Atomkraft, Flughafenausbau, ...

var arMowpersonal = new Array(); 		// Persoenliche Abstimmung (dafür/dagegen/...)
var arMowparties = new Array(); 		// Uebereinstimmungen mit den Parteien
var arMowtimestamp = new Array(); 		// Zeitstempel

var arMowpersonalSum = new Array();		// Summe der persoenlichen Abstimmungen
var arMowpersonalSumContra = new Array();		// 
var arMowpersonalSumNeutral = new Array();		// 
var arMowpersonalSumPro = new Array();		// 
var arMowpersonalSumSkip = new Array();		// 

var faktor = 3; // Faktor für Länge der Balkens

function fnResultsStart()
{
	// Datei mit den FRAGEN in Array einlesen
	fnReadCsv("data/"+fileQuestions+"",fnResultsQuestionsToArray);

	// Antworten der Parteien und Partei-Informationen
	fnReadCsv("data/"+fileAnswers,fnReadPositions)

	$("#resultsInformation").empty();
	$("#resultsInformation").append("Benutzte Datei zur Auswertung: ")
	$("#resultsInformation").append("<strong><a href="+fileResults+">"+fileResults+"</a></strong>")
	$("#resultsInformation").append("<br /> Datei-Einstellung kann geändert werden in: system/results.js (Variable: fileResults)")
	$("#resultsInformation").append("<p> Umfangreichere Auswertungen sind mit ihrer Lieblings-Tabellenkalkulation möglich. (Excel, Open-/LibreOffice Calc, ...) Siehe auch die Beispieldatei im Ordner. </p>");

	// Datei mit den ERGEBNISSEN in Array einlesen
	// Im Beispiel der VOTE.PHP heißt sie TEST.TXT
	fnReadCsv(fileResults,fnResultsResultsfileToArray);


	// NAMEN DER PARTEIEN in Array einlesen
//	arPartyNamesShort = fnTransformDefinitionStringToArray(strPartyNamesShort);

	// LOGOS der Parteien in Array einlesen
//	arPartyLogosImg	= fnTransformDefinitionStringToArray(strPartyLogosImg);
}


function fnResultsQuestionsToArray(csvData)
{
    arQuestionsShort = $.csv.toArrays(csvData, {separator: ""+separator+""}); // <- Trennzeichen fuer Fragen wird aus der DEFINITION.JS gelesen und benutzt

//	alert(arQuestionsShort[1][0]);
}

function fnResultsResultsfileToArray(csvData)
{
	// Einlesen der Ergebnis-Datei
    var arResultfile = $.csv.toArrays(csvData, {separator: " "}); // <- im Beispiel (vote.php / test.txt) ist erstes Trennzeichen ein Leerzeichen. Es gibt also 4 Spalten (IP-Adresse, Zeitstempel, mowpersonal und mowparties)

	// Auftrennen der zweiten Spalte (arResultfile[i][1]) und als Array speichern
	for (i = 0; i <= arResultfile.length-1; i++)
	{
		temp = $.csv.toArray(arResultfile[i][1], {separator: ","});
		arMowtimestamp.push(temp)
	}


	// Auftrennen der dritten Spalte (arResultfile[i][2]) und als Array speichern
	for (i = 0; i <= arResultfile.length-1; i++)
	{
		temp = $.csv.toArray(arResultfile[i][2], {separator: ","});
		arMowpersonal.push(temp)
	}

	// Auftrennen der vierten Spalte (arResultfile[i][3]) und als Array speichern
	var strTemp ;
	for (i = 0; i <= arResultfile.length-1; i++)
	{
		temp = $.csv.toArray(arResultfile[i][3], {separator: ","});
		arMowparties.push(temp)
	}

	fnResultsMowpersonal();
	fnResultsMowparties();
	fnResultsTimes();

}

///////////////////////////////////////////////////////////////////////////

// Abstimmung zu den Parteien
function fnResultsMowparties()
{

	var arResultsMowpartiesSum = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

	$("#resultsParties").empty();

	for (i = 0; i <= arMowparties.length-1; i++)
	{

		for (j = 0; j <= arPartyNamesShort.length-1; j++)
		{
				// Anzahl der Übereinstimmungen aufsummieren
				temp = 1*arMowparties[i][j] + 1*arResultsMowpartiesSum[j]
				arResultsMowpartiesSum[j] = temp;

		} // end for j-arPartyNamesShort

	} // end for i-questionsShort

	// PARTEI-AUSWERTUNG Nr. 1
	var maxPointsPerParty = arMowparties.length * arQuestionsShort.length;
	$("#resultsParties").append("<p>"+arMowparties.length+" Abstimmungen x "+intQuestions+" Fragen = maximal "+maxPointsPerParty+" Punkte pro Partei.</p>")

	content = "";
	content += "<table>";
//	for (i = 0; i <= arPartyNamesShort.length-1; i++)
	for (i = 0; i <= intParties-1; i++)	
	{
		var percent = fnPercentage(arResultsMowpartiesSum[i],maxPointsPerParty);

		content += "<tr>";
			content += "<td>";
				content += " <img src='"+arPartyLogosImg[i]+"' height='"+(intPartyLogosImgHeight)+"' width='"+(intPartyLogosImgWidth)+"' border='1'> ";
				content += " "+arPartyNamesShort[i]
			content += "</td>";
			content += "<td>";
				content += " "+arResultsMowpartiesSum[i]+"/"+maxPointsPerParty;
				content += " ("+percent+"%) ";
			content += "</td>";
			content += "<td width='40%'>";
				// content += " <img src='img/skip_px.png' height='12' width='"+(percent*faktor)+"' border='1'> ";

				content += "<div class='progress'>"
				content += "	<div class='progress-bar' role='progressbar' style='width:"+percent+"%'>"+percent+"%</div> "
				content += "</div>"				
				
			content += "</td>";
		content += "</tr>";
	}
	content += "</table>";
	$("#resultsParties").append(content)


	// PARTEI-AUSWERTUNG Nr. 2
	var maxPointsTotal = maxPointsPerParty * arPartyLogosImg.length;
	$("#resultsParties").append("<p>"+maxPointsPerParty+" Punkte/Partei x "+intParties+" Parteien = maximal "+maxPointsTotal+" Punkte insgesamt.</p>")

	content = "";
	content += "<table>";
//	for (i = 0; i <= arPartyNamesShort.length-1; i++)
	for (i = 0; i <= intParties-1; i++)	
	{
		var percent = fnPercentage(arResultsMowpartiesSum[i],maxPointsTotal);
		content += "<tr>";
			content += "<td>";
				content += " <img src='"+arPartyLogosImg[i]+"' height='"+(intPartyLogosImgHeight)+"' width='"+(intPartyLogosImgWidth)+"' border='1'> ";
				content += " "+arPartyNamesShort[i]+"";
			content += "</td>";
			content += "<td>";
				content += " "+arResultsMowpartiesSum[i]+"/"+maxPointsTotal+" ";
				content += " ("+percent+"%) ";
			content += "</td>";
			content += "<td width='40%'>";
				// content += " <img src='img/skip_px.png' height='12' width='"+(percent*faktor)+"' border='1'> ";
				
				content += "<div class='progress'>"
				content += "	<div class='progress-bar' role='progressbar' style='width:"+percent+"%'>"+percent+"%</div> "
				content += "</div>"			
				
			content += "</td>";
		content += "</tr>";
	}
	content += "</table>";
	$("#resultsParties").append(content)

} // end function: fnResultsMowparties

///////////////////////////////////////////////////////////////////////////

// Abstimmungen zu den einzelnen Fragen
function fnResultsMowpersonal()
{

//	for (i = 0; i <= arQuestionsShort.length-1; i++)
	for (i = 0; i <= intQuestions-1; i++)
	{

		// Zuruecksetzen der Zaehler
		var counterContra = 0;
		var counterNeutral = 0;
		var counterPro = 0;
		var counterSkip = 0;

		for (j = 0; j <= arMowpersonal.length-1; j++)
		{
			// Info: 
			// arMowpersonal[i][j] = zeilenweises Lesen
			// arMowpersonal[j][i] = spaltenweises Lesen -> benoetigt fuer Summe

			if (arMowpersonal[j][i] == -1)
			{ counterContra++ }
			else if (arMowpersonal[j][i] == 0)
			{ counterNeutral++ }
			else if (arMowpersonal[j][i] == 1)
			{ counterPro++ }
			else
			{ counterSkip++ }

		} // end for intQuestions j

		// Abspeichern der gezaehlten Werte für diese Spalte / Frage

		arMowpersonalSumContra.push(counterContra)
		arMowpersonalSumNeutral.push(counterNeutral)
		arMowpersonalSumPro.push(counterPro)
		arMowpersonalSumSkip.push(counterSkip)

	} // end for arMowpersonal i

	var maxValues = arMowpersonal.length;
	var posQuestion = 0;

	// Array durchlaufen und anzeigen
	$("#resultsQuestions").empty();

	content = "";
	content += "<table>";
//	for (i = 0; i <= arQuestionsShort.length-1; i++)
	for (i = 0; i <= intQuestions-1; i++)
	{
		// immer vier Werte im Array pro Frage

		var percentContra = fnPercentage(arMowpersonalSumContra[i],maxValues);
		var percentNeutral = fnPercentage(arMowpersonalSumNeutral[i],maxValues);
		var percentPro = fnPercentage(arMowpersonalSumPro[i],maxValues);
		var percentSkip = fnPercentage(arMowpersonalSumSkip[i],maxValues);

		content += "<tr>";
			content += "<td colspan='2'>";
				content += "<b> "+(i+1)+". "+arQuestionsShort[i][0]+" </b>- "+arQuestionsShort[i][1]+" ";
			content += "</td>";
		content += "</tr>";

		content += "<tr>";
			content += "<td>";
				content += arMowpersonalSumContra[i]+"/"+maxValues+" [-] ";
			content += "</td>";
			content += "<td>";
				// content += "<img src='img/contra_px.png' height='12' width="+(percentContra * faktor)+" border='1' title="+arMowpersonalSumContra[i]+"/"+maxValues+"> ";
				
				content += "<div class='progress'>"
				content += "	<div class='progress-bar bg-danger' role='progressbar' style='width:"+percentContra+"%'>"+percentContra+"% </div> "
				content += "</div>"	
				
			content += "</td>";
		content += "</tr>";

		content += "<tr>";
			content += "<td>";
				content += arMowpersonalSumNeutral[i]+"/"+maxValues+" [o] ";
			content += "</td>";
			content += "<td>";
				// content += "<img src='img/neutral_px.png' height='12' width="+(percentNeutral * faktor)+" border='1' title="+arMowpersonalSumNeutral[i]+"/"+maxValues+"> ";

				content += "<div class='progress'>"
				content += "	<div class='progress-bar bg-warning' role='progressbar' style='width:"+percentNeutral+"%'>"+percentNeutral+"% </div> "
				content += "</div>"	
				
			content += "</td>";
		content += "</tr>";
		content += "<tr>";
			content += "<td>";
				content += arMowpersonalSumPro[i]+"/"+maxValues+" [+]";
			content += "</td>";
			content += "<td>";
				// content += "<img src='img/pro_px.png' height='12' width="+(percentPro * faktor)+" border='1' title="+arMowpersonalSumPro[i]+"/"+maxValues+"> ";

				content += "<div class='progress'>"
				content += "	<div class='progress-bar bg-success' role='progressbar' style='width:"+percentPro+"%'>"+percentPro+"% </div> "
				content += "</div>"	
				
			content += "</td>";
		content += "</tr>";
		content += "<tr>";
			content += "<td>";
				content += arMowpersonalSumSkip[i]+"/"+maxValues+" [/]";
			content += "</td>";
			content += "<td>";
				// content += " <img src='img/skip_px.png' height='12' width="+(percentSkip * faktor)+" border='1' title="+arMowpersonalSumSkip[i]+"/"+maxValues+"> ";
				
				content += "<div class='progress'>"
				content += "	<div class='progress-bar' role='progressbar' style='width:"+percentSkip+"%'>"+percentSkip+"% </div> "
				content += "</div>"					
				
			content += "</td>";
		content += "</tr>";

	}
	content += "</table>";

	$("#resultsQuestions").append(content);

}

///////////////////////////////////////////////////////////////////////////

// Abstimmungen nach Zeiten (Tagen)
function fnResultsTimes()
{
	$("#resultsTimes").empty();

	arDatum = [];
	for (i = 0; i <= arMowtimestamp.length-1; i++)
	{

		var objDate = new Date(arMowtimestamp[i]*1000);
//		var year = objDate.getFullYear();
//		var month = objDate.getMonth()+1;
//		var date = objDate.getDate();

		// 2009-09-30T14:54:33.654Z -> substr(0, 10) -> 2009-09-30
		// Auftrennen nach Stunden -> substr(0, 13) -> 2009-09-30T14
		// nur Stunden pruefen -> substr(11, 2) -> 14
		var strDate = objDate.toISOString().substr(0, 10); 

//		arDatum.push(year+"-"+month+"-"+date);
		arDatum.push(strDate);

	}

    var arDatumSortiert = new Array();
	var arCounter = new Array();
	var counter = 1;

	// Arrays sortieren und pruefen    
    arDatum.sort();
    for ( i = 0; i <= arDatum.length-1; i++ ) 
	{
		// String stimmt mit nächstem Eintrag überein
        if ( arDatum[i] == arDatum[(i+1)])
		{
			counter++;
        } 
		// Datum stimmt nicht überein -> Daten speichern
		else 
		{
			arDatumSortiert.push(arDatum[i]);
			arCounter.push(counter);
			counter = 1;
        }

    }

	// Ergebnisse anzeigen

	maxAnswers = arMowparties.length
	var content = ""
	content += "<table>";
    for ( i = 0; i <= arCounter.length-1; i++ ) 
	{
		var percent = fnPercentage(arCounter[i],maxAnswers);

		content += "<tr>";
			content += "<td>";
				content += " "+arDatumSortiert[i];
			content += "</td>";
			content += "<td>";
				content += " "+arCounter[i]+"x ("+percent+"%) ";
			content += "</td>";
			content += "<td width='40%'>";
				// content += " <img src='img/skip_px.png' height='12' width='"+(arCounter[i])+"' border='1'> ";
				
				content += "<div class='progress'>"
				content += "	<div class='progress-bar' role='progressbar' style='width:"+(arCounter[i])+"%'>"+(arCounter[i])+"% </div> "
				content += "</div>";
			content += "</td>";
		content += "</tr>";
	}
	content += "</table>";

	$("#resultsTimes").append(content)

    
//    return [a, arCounter];
// var result = foo(arr);
// document.write('[' + result[0] + ']<br>[' + result[1] + ']') 


}




