// QUICKTEST.JS http://www.mat-o-wahl.de
// Test of configuration file / DEFINITION.JS / Test der Konfigurationsdatei
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

function fnTestStart()
{
	// FRAGEN in Arrays einlesen
	fnReadCsv("data/"+fileQuestions+"",fnTestReadQuestions)

	// PARTEIEN und ANTWORTEN in Arrays einlesen
	fnReadCsv("data/"+fileAnswers+"",fnTestReadPositions)

/*
	// bis v 0.5 - mehrere Partei-CSV-Dateien
	for (i = 0; i <= intParties-1; i++)
	{
		// Zeitversetzt starten, damit Reihenfolge auch stimmt. 500, 750, 1000, 1250ms, ... später
		// Funktioniert aber nicht 100% wenn eine große Datei dazwischen ist :(
		window.setTimeout("fnReadCsv('data/"+arPartyFiles[i]+"',"+fnTestReadPositions+")",500+i*250);	
	}
*/

	// 1 sec. warten bis alle Dateien eingelesen wurden.
	window.setTimeout("fnTestShowAll()",1000);
}

// 
function fnTestReadQuestions(csvData)
{
	// Zeilenweises Einlesen der Fragen ...
	// fnSplitLines(csvData,1);
	fnTransformCsvToArray(csvData,1);
} 



// Einlesen der Parteipositionen und -informationen
function fnTestReadPositions(csvData)
{
	// Zeilenweises Einlesen der Parteipositionen und Vergleichen
	// fnSplitLines(csvData,0);
	fnTransformCsvToArray(csvData,0);
}


// Anzeige der fehlerhaften Variable
function fnTestAlertVariable(string)
{
	// Auslesen der kommagetrennten Werte und in Array speichern
	var myArray = new Array();
	myArray = fnTransformDefinitionStringToArray(string)

	// Array wieder in String umwandeln
	string = "";
	for (i = 0; i <= myArray.length-1; i++)
	{
		string += (i+1)+". "+myArray[i]+"\n";
	}
	alert(""+string+"");	
}


// Ausgabe
function fnTestShowAll()
{
	
	var counterError = 0;

	$("#testExplanation").empty();
	$("#testQuestions").empty();
	$("#testAnswers").empty();
	$("#testImprint").empty();
	
	$("#testOtherDe").empty();
	$("#testOtherEn").empty();

	// EXISTENZ DER VARIABLEN
	arVariablen = new Array("fileQuestions", 
		"intQuestions",
		"fileAnswers",
		"intParties",
		"intPartyLogosImgWidth", 
		"intPartyLogosImgHeight", 
		"heading1",
		"heading2",
		"explainingText",
		"imprintLink",
		"imprintGeneral",
		"imprintContact",
		"imprintVATid",
		"imprintDisputeResultion",
		"imprintEditors",
		"imprintProgramming",
		"imprintPictures",
		"imprintPrivacyUrl",
		"separator",
		"design",
		"language",
		"statsRecord",
		"statsServer")

	for (i = 0; i <= arVariablen.length-1; i++)
	{
		// Pruefe ob Variable einen definierten Typ hat. Ja=nichts, Nein=Alarm
		if(typeof(window[arVariablen[i]]) != 'undefined')
		{
//			$("#debug").append("<br /> prüfe .." +window[arVariablen[i]]+ " "+typeof(arVariablen[i]))
		}
		else
		{

			counterError++;
			$("#testOtherDe").append("<b>("+counterError+").</b>")
				.append("<b> Achtung! Die Variable mit dem Namen <u>"+arVariablen[i]+"</u> ist in der DEFINITION.JS nicht definiert. </b>")
				.append("<br /> Bitte zuerst prüfen, dann den Test wiederholen.")
				.append("<br /> Sie können leere Werte in folgender Form angeben: <b>var variablenName = \"\";</b> (entspricht: <q>keine Angabe</q>).")
				.append("<br />")
				.css("color","red");
				
			$("#testOtherEn").append("<b>("+counterError+").</b>")
				.append("<b> Warning! Variable with name <u>"+arVariablen[i]+"</u> is undefined in file DEFINITION.JS. </b>")
				.append("<br /> Please check this issue first and restart the test.")
				.append("<br /> You can define empty variables like this: <b>var variableName = \"\";</b> (equals: <q>no value</q>).")
				.append("<br />")
				.css("color","red");
				
			// alert ("Achtung! Die Variable mit dem Namen - "+arVariablen[i]+" - ist in der DEFINITION.JS nicht definiert. \nBitte zuerst prüfen, dann den Test neu starten.")
		}
	}

	// BESCHREIBUNG
	$("#testExplanation").append("<b>1. Überschrift / Heading:</b> "+heading1)
		.append("<br />")
		.append("<br /> <b>2. Überschrift / Heading:</b> "+heading2)
		.append("<br />")
		.append("<br /> <b> Beschreibender Text / Description:</b> "+explainingText);


	// FRAGEN	
	$("#testQuestions").append("Name der <b>Datei</b> mit den Fragen / Name of <b>file</b> with questions: ")
		.append("<a class='btn btn-outline-dark btn-block btn-sm' role='button' href='data/"+fileQuestions+"' target='_blank'>"+fileQuestions+"</a>")
		// .append("<a href='data/"+fileQuestions+"' target='_blank'>"+fileQuestions+"</a>")

	$("#testQuestions").append("<p>Hier sollten <strong>"+intQuestions+" Fragen</strong> stehen.</p>")


	for (i = 0; i <= (arQuestionsShort.length-1); i++)
	{
		$("#testQuestions").append(" "+(i+1)+". <b>"+arQuestionsShort[i]+"</b> - "+arQuestionsLong[i]+ "<br />")		
		var numberOfQuestions = i;
	}

	

	// ANTWORTEN

	$("#testAnswers").append("Name der <b>Datei</b> mit den Antworten und Partei-Informationen / Name of <b>file</b> with questions and party-information: ")
		.append("<a class='btn btn-outline-dark btn-block btn-sm' role='button' href='data/"+fileAnswers+"' target='_blank'>"+fileAnswers+"</a>")

	$("#testAnswers").append("<p>Hier sollten <strong>"+intParties+" Parteien</strong> stehen.</p>")

	for (i = 0; i <= (intParties-1); i++)
	{
		$("#testAnswers")
		.append("<hr>")
		.append("<h3>"+(i+1)+". Name (kurz): "+arPartyNamesShort[i]+ " </h3> ")
		.append("<p> <b>Name (ausführlich):</b> "+arPartyNamesLong[i]+"</p>")
		.append("<p> <b>Beschreibung:</b> "+arPartyDescription[i]+"</p>")
		.append("<p> <b>Webseite: </b><a href='http://"+arPartyInternet[i]+"' target='_blank' title='"+arPartyNamesLong[i]+"'>"+arPartyInternet[i]+"</a> </p>")
		.append("<p> <b>Bild:</b> <img src='"+arPartyLogosImg[i]+"' width='"+intPartyLogosImgWidth+"' height='"+intPartyLogosImgHeight+"' alt='"+arPartyNamesLong[i]+"' title='"+arPartyNamesLong[i]+"' /> </p>")
		.append("<p> <b>Bild-URL:</b> "+arPartyLogosImg[i]+"</p>")

//		.append("<br />")
//		.append("<a class='btn btn-outline-dark btn-block btn-sm' role='button' href='data/"+arPartyFiles[i]+"' target='_blank' >"+arPartyFiles[i]+"</a>")
		// .append("<br /> Positionen und Antworten in Datei namens: <a href='data/"+arPartyFiles[i]+"' target='_blank' >"+arPartyFiles[i]+"</a>")

		
 		var jStart = i * (numberOfQuestions+1); // 0*6=6, 1*6=6, 2*6=12;
 		var jEnd = jStart + numberOfQuestions; // 0+6=6; 6+6=12; 12+6=18
 		var jCounter = 0;

		$("#testAnswers")
		.append("<b>Antworten auf die Fragen</b> <br /> ")
 		
		for (j = jStart; j <= jEnd; j++)
		{
			jCounter++
			// var positionImage = fnTransformPositionToImage(arPartyPositions[j]);
			var positionIcon = fnTransformPositionToIcon(arPartyPositions[j]);
			var positionButton = fnTransformPositionToButton(arPartyPositions[j]);
			/*
			$("#testAnswers").append(" ("+(j+1)+") "+jCounter+". <img src='img/"+positionImage+"' height='10' width='10' alt='"+arPartyOpinions[j]+"' /> ")
				.append(" "+arPartyOpinions[j])
				.append("<br />");
			*/
			
			$("#testAnswers").append(" ("+(j+1)+") "+jCounter+". <button type='button' class='btn "+positionButton+" btn-sm' disabled> "+positionIcon+"</button>")
				.append(" "+arPartyOpinions[j])
				.append("<br />");	
		}
		
		$("#testAnswers").append("<br />");
	}
	
	
	// KONTAKT/IMPRESSUM
	$("#testImprint").append("<b> Allgemeine Angaben gemäß § 5 TMG / General information</b> "+imprintGeneral+ "")
		.append("<br />")
		.append("<br /> <b>Kontaktdaten / Contact details:</b> "+imprintContact+ "")
		.append("<br />")
		.append("<br /> <b>(optional) Umsatzsteuer-ID / (optional) VAT-ID:</b> "+imprintVATid+ "")
		.append("<br />")
		.append("<br /> <b>Verbraucher­streit­beilegung / Online Dispute Resolution:</b> "+imprintDisputeResultion+ "")
		.append("<br />")
		.append("<br /> <b>Redaktion / Editors:</b> "+imprintEditors)
		.append("<br />")
		.append("<br /> <b>Technik / Programming:</b> "+imprintProgramming)
		.append("<br />")
		.append("<br /> <b>Bilder / Pictures:</b> "+imprintPictures)
		.append("<br />")
		.append("<br /> <b>Datenschutz / Privacy:</b> <a href='http://"+imprintPrivacyUrl+"' target='_blank'>"+imprintPrivacyUrl+"</a>");
		

	// BERECHNUNGEN - ab V 0.5 eigentlich nicht mehr nötig

/*
	
	// Zusammenhang zwischen Anzahl der Parteien und Fragen zu Parteipositionen
	if ( (intParties * arQuestionsShort.length) != arPartyPositions.length )
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Das Produkt aus Parteien ("+intParties+") mal Fragen ("+arQuestionsShort.length+") ist ungleich der Gesamtzahl der Parteiantworten ("+arPartyPositions.length+" anstelle von erwarteten "+(intParties * arQuestionsShort.length)+").")
			.append(" M&ouml;glicherweise Ursachen daf&uuml;r k&ouml;nnen z.B. sein: ")
			.append(" <br /> - es wurde eine Frage zu viel/zu wenig angegeben, ")
			.append(" <br /> - eine Partei hat eine Frage nicht beantwortet, ")
			.append(" <br /> - eine Frage wurde nicht eingetragen (Anzahl der Zeilen &uuml;berpr&uuml;fen!), ")
			.append(" <br /> - es gibt nur eine Spalte in der Datei (z.B. nur Position 1,0,-1 aber keine Begründung), ")
			.append(" <br /> - es gibt am Ende einige leere Zeilen, ")
			.append(" <br /> - es wurden unterschiedliche Trennzeichen benutzt (z.B. Komma in Datei A (f&uuml;r Fragen) und Semikolon in Datei B (f&uuml;r Partei)), ")
			.append(" <br /> - eine Datei hat ein falsches Format (z.B. XLS oder ODS statt CSV),")
			.append(" <br /> - eine Datei wurde nicht gefunden (Gro&szlig;-/Kleinschreibung, Dateiendung).")
			.append("<br /> ") 
			.append(" Die Reihenfolge der hier gezeigten Fragen hat sich dadurch vielleicht auch verschoben und stimmt nun nicht.")
			.append("<br /> ");
			
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append("The Product of parties ("+intParties+") multiplied with questions ("+arQuestionsShort.length+") is unequal the total number of party-answers ("+arPartyPositions.length+". Expected value: "+(intParties * arQuestionsShort.length)+").")
			.append(" Possible causes: ")
			.append(" <br /> - There's one question too much/less, ")
			.append(" <br /> - a party did not answer a question, ")
			.append(" <br /> - a missing question (check muber of lines in file!), ")
			.append(" <br /> - there is only one row in the file (e.g. only position 1,0,-1 but no explanation), ")
			.append(" <br /> - there are some empty lines at the end of the file, ")
			.append(" <br /> - different separators in different files (e.g. comma in file A (questions) and semicolon in file B (party)), ")
			.append(" <br /> - wrong file format (e.g. XLS or ODS instead of CSV),")
			.append(" <br /> - file not found (check for capital letters, file extensions).")
			.append("<br /> ") 
			.append(" The order of questions may have changed due to this error(s).")
			.append("<br /> ");			
	}

*/


/*
	// Anzahl der Parteien in Datei	
	if (intParties <= 0)
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Es wurde keine Liste mit Parteipositionen angegeben (intParties). ")
			.append(" <br /> ");
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" No list with party positions defined (intParties). ")
			.append(" <br /> ");
	}

	// Parteinamen, kurz und lang
	if ( (arPartyNamesShort.length <= 0) || (arPartyNamesLong.length <= 0) )
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Es wurde keine Liste mit langen oder kurzen Parteinamen angegeben (strPartyNamesShort, strPartyNamesLong). ")
			.append(" <br /> ");
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" No liste with long and/or short party-names defined (strPartyNamesShort, strPartyNamesLong). ")
			.append(" <br /> ");	}


	// Parteilogos und Webseiten
	if ( (arPartyLogosImg.length <= 0) || (arPartyInternet.length <= 0) )
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Es wurde keine Liste mit Parteilogos oder -webseiten angegeben (strPartyLogosImg, strPartyInternet). ")
			.append(" <br /> ");
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" No liste with party-logos and/or -websites defined (strPartyLogosImg, strPartyInternet). ")
			.append(" <br /> ");
	}

*/
	
	// Werte fuer "Wahlprognose" pruefen
	if (statsRecord == 1)
	{
		if (imprintPrivacyUrl.length <= 0)
		{
			counterError++;
			$("#testOtherDe").append("<b>("+counterError+").</b>")
				.append(" Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt aber es wurde keine Datenschutzerkl&auml;rung angegeben.")
				.append("<br />");
			$("#testOtherEn").append("<b>("+counterError+").</b>")
				.append(" Variable for statistics is on TRUE/1 but privacy statement is missing.")
				.append("<br />");				
			
		}
		if (statsServer.length <= 0)
		{
			counterError++;
			$("#testOtherDe").append("<b>("+counterError+").</b>")
				.append(" Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt aber es wurde keine Skript zum Empfang der Daten angegeben.")
				.append("<br />");
			$("#testOtherEn").append("<b>("+counterError+").</b>")
				.append(" Variable for statistics is on TRUE/1 but skript to receive data is missing.")
				.append("<br />");
			
		}
	}


/*
	// Laenge der Arrays vergleichen
	if (intParties != arPartyNamesShort.length)
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+intParties+"\")'>strPartyFiles</a>-Liste ("+intParties+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyNamesShort+"\")'>strPartyNamesShort</a>-Liste ("+arPartyNamesShort.length+").")
			.append("<br />");	
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" The number of values in <a href='javascript:fnTestAlertVariable(\""+intParties+"\")'>strPartyFiles</a>-list ("+intParties+") is unequal to the number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyNamesShort+"\")'>strPartyNamesShort</a>-list ("+arPartyNamesShort.length+").")
			.append("<br />");	
	}

	if (intParties != arPartyNamesLong.length)
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+intParties+"\")'>strPartyFiles</a>-Liste ("+intParties+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyNamesLong+"\")'>strPartyNamesLong</a>-Liste ("+arPartyNamesLong.length+").")
			.append("<br />");
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" The number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-list ("+intParties+") is unequal to the number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyNamesLong+"\")'>strPartyNamesLong</a>-list ("+arPartyNamesLong.length+").")
			.append("<br />");
	}

	if (intParties != arPartyLogosImg.length)
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+intParties+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyLogosImg+"\")'>strPartyLogosImg</a>-Liste ("+arPartyLogosImg.length+").")
			.append("<br />");
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" The number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+intParties+") is unequal to the number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyLogosImg+"\")'>strPartyLogosImg</a>-list ("+arPartyLogosImg.length+").")
			.append("<br />");			
	} 

	if (intParties != arPartyInternet.length)
	{
		counterError++;
		$("#testOtherDe").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+intParties+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyInternet+"\")'>strPartyInternet</a>-Liste ("+arPartyInternet.length+").")
			.append("<br />");
		$("#testOtherEn").append("<b>("+counterError+").</b>")
			.append(" The number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+intParties+") is unequal to the number of values in <a href='javascript:fnTestAlertVariable(\""+strPartyInternet+"\")'>strPartyInternet</a>-list ("+arPartyInternet.length+").")
			.append("<br />");			
	}

*/

	// Abschlussevaluation	
	if (counterError > 0)
	{
		$("#testOtherDe").append("<br /> Bitte &uuml;berpr&uuml;fen Sie Ihre <a href='data/definition.js' target='_blank'>Einstellungen</a>.")
			.append("<br />")
			.css("color","red");
		$("#testOtherEn").append("<br /> Please check your <a href='data/definition.js' target='_blank'>settings</a>.")
			.append("<br />")
			.css("color","red");			
	}
	else
	{
		$("#testOtherDe").append("Keine Fehler gefunden. :-)")
			.css("color","green");
		$("#testOtherEn").append("No errors found. :-)")
			.css("color","green");			
	}
}
