// QUICKTEST.JS von http://www.mat-o-wahl.de
// Test der DEFINITION.JS-Konfigurationsdatei
// Lizenz: GPL 3
// Mathias Steudtner http://www.medienvilla.com

function fnTestStart()
{
	// FRAGEN UND ANTWORTEN in Arrays einlesen
	fnReadCsv("data/"+fileQuestions+"",fnTestReadQuestions)

	for (i = 0; i <= arPartyFiles.length-1; i++)
	{
		// Zeitversetzt starten, damit Reihenfolge auch garantiert stimmt. 500, 750, 1000, 1250ms, ... später
		window.setTimeout("fnReadCsv('data/"+arPartyFiles[i]+"',"+fnTestReadPositions+")",500+i*250);	
	}

	window.setTimeout("fnTestShowAll()",500+i*300);		// warten bis alle Dateien eingelesen wurden.
}

// 
function fnTestReadQuestions(csvData)
{
	// Zeilenweises Einlesen der Fragen ...
	fnSplitLines(csvData,1);
} 



// Einlesen der Parteipositionen
function fnTestReadPositions(csvData)
{
	// Zeilenweises Einlesen der Parteipositionen und Vergleichen
	fnSplitLines(csvData,0);
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
	$("#testOther").empty();

	// EXISTENZ DER VARIABLEN
	arVariablen = new Array("fileQuestions", 
		"strPartyFiles", 
		"strPartyNamesShort", 
		"strPartyNamesLong", 
		"strPartyLogosImg", 
		"intPartyLogosImgWidth", 
		"intPartyLogosImgHeight", 
		"strPartyInternet", 
		"intPartyDefaultShow",
		"heading1",
		"heading2",
		"explainingText",
		"imprintEditorialNames",
		"imprintEditorialEmail",
		"imprintTechnicsNames",
		"imprintTechnicsEmail",
		"imprintPictures",
		"imprintPrivacyUrl",
		"separator",
		"design",
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
			$("#testOther").append("<b>("+counterError+").</b>")
				.append("<b> Achtung! Die Variable mit dem Namen <u>"+arVariablen[i]+"</u> ist in der DEFINITION.JS nicht definiert. </b>")
				.append("<br /> Bitte zuerst prüfen, dann den Test wieder starten.")
				.append("<br /> Sie können leere Werte in folgender Form angeben: <b>var variablenName = \"\";</b> (entspricht: <q>keine Angabe</q>).")
				.append("<br />")
				.css("color","red");

			alert ("Achtung! Die Variable mit dem Namen - "+arVariablen[i]+" - ist in der DEFINITION.JS nicht definiert. \nBitte zuerst prüfen, dann den Test neu starten.")
		}
	}

	// BESCHREIBUNG
	$("#testExplanation").append("<b>1. Überschrift:</b> "+heading1)
		.append("<br />")
		.append("<br /> <b>2. Überschrift:</b> "+heading2)
		.append("<br />")
		.append("<br /> <b> Beschreibender Text:</b> "+explainingText);


	// FRAGEN	
	$("#testQuestions").append("Name der Datei mit den Fragen: ")
		.append("<a href='data/"+fileQuestions+"' target='_blank'>"+fileQuestions+"</a>")
		.append("<br /> <br />");
		
	for (i = 0; i <= (arQuestionsShort.length-1); i++)
	{
		$("#testQuestions").append(" "+(i+1)+". <b>"+arQuestionsShort[i]+"</b> - "+arQuestionsLong[i]+ "<br />")		
		var numberOfQuestions = i;
	}
	

	// ANTWORTEN
	for (i = 0; i <= (arPartyFiles.length-1); i++)
	{
		$("#testAnswers").append("<h3>"+(i+1)+". "+arPartyNamesShort[i]+ " - "+arPartyNamesLong[i]+"</h3>")
		.append("Bild: <img src='data/"+arPartyLogosImg[i]+"' width='50' height='25' alt='"+arPartyNamesLong[i]+"' title='"+arPartyNamesLong[i]+"' />")
		.append(" - URL: <a href='http://"+arPartyInternet[i]+"' target='_blank' title='"+arPartyNamesLong[i]+"'>"+arPartyInternet[i]+"</a>")
		.append("<br /> Positionen und Antworten in Datei namens: <a href='data/"+arPartyFiles[i]+"' target='_blank' >"+arPartyFiles[i]+"</a>")
		.append("<br />");
		
 		var jStart = i * (numberOfQuestions+1); // 0*6=6, 1*6=6, 2*6=12;
 		var jEnd = jStart + numberOfQuestions; // 0+6=6; 6+6=12; 12+6=18
 		var jCounter = 0;
 		
		for (j = jStart; j <= jEnd; j++)
		{
			jCounter++
			var positionImage = fnTransformPositionToImage(arPartyPositions[j]);
			$("#testAnswers").append("<br /> ("+(j+1)+") "+jCounter+". <img src='img/"+positionImage+"' height='10' width='10' alt='"+arPartyOpinions[j]+"' />")
				.append(" "+arPartyOpinions[j]);
		}
		
	}
	
	
	// KONTAKT/IMPRESSUM
	$("#testImprint").append("<b>Redaktion:</b> "+imprintEditorialNames)
		.append("<br />")
		.append("<br /> <b>Redaktionskontakt:</b> <a href='mailto:"+imprintEditorialEmail+"'>"+imprintEditorialEmail+"</a>")
		.append("<br />")
		.append("<br /> <b>Technische Leitung:</b> "+imprintTechnicsNames)
		.append("<br />")
		.append("<br /> <b>Technischer Kontakt:</b> <a href='mailto:"+imprintTechnicsEmail+"'>"+imprintTechnicsEmail+"</a>")
		.append("<br />")
		.append("<br /> <b>Bildrechte:</b> "+imprintPictures)
		.append("<br />")
		.append("<br /> <b>Datenschutzerkl&auml;rung:</b> <a href='http://"+imprintPrivacyUrl+"' target='_blank'>"+imprintPrivacyUrl+"</a>");
		

	
	// Zusammenhang zwischen Anzahl der Parteien und Fragen zu Parteipositionen
	if ( (arPartyFiles.length * arQuestionsShort.length) != arPartyPositions.length )
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Das Produkt aus Parteien ("+arPartyFiles.length+") mal Fragen ("+arQuestionsShort.length+") ist ungleich der Gesamtzahl der Parteiantworten ("+arPartyPositions.length+" anstelle von erwarteten "+(arPartyFiles.length * arQuestionsShort.length)+").")
			.append(" M&ouml;glicherweise Ursachen daf&uuml;r k&ouml;nnen z.B. sein: ")
			.append(" <br /> - es wurde eine Frage zu viel/zu wenig angegeben, ")
			.append(" <br /> - eine Partei hat eine Frage nicht beantwortet, ")
			.append(" <br /> - eine Frage wurde nicht eingetragen (Anzahl der Zeilen &uuml;berpr&uuml;fen!), ")
			.append(" <br /> - es gibt nur eine Spalte in der Datei (z.B. nur Position 1,0,-1 aber keine Begründung), ")
			.append(" <br /> - es wurden unterschiedliche Trennzeichen benutzt (z.B. Komma in Datei A (f&uuml;r Fragen) und Semikolon in Datei B (f&uuml;r Partei)), ")
			.append(" <br /> - eine Datei hat ein falsches Format (z.B. XLS oder ODS statt CSV),")
			.append(" <br /> - eine Datei wurde nicht gefunden (Gro&szlig;-/Kleinschreibung, Dateiendung).")
			.append("<br /> ") 
			.append(" Die Reihenfolge der hier gezeigten Fragen hat sich dadurch vielleicht auch verschoben und stimmt nun nicht.")
			.append("<br /> ");
	}

	// Anzahl der Parteien in Datei	
	if (arPartyFiles.length <= 0)
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Es wurde keine Liste mit Parteipositionen angegeben (strPartyFiles). ")
			.append(" <br /> ");
	}

	// Parteinamen, kurz und lang
	if ( (arPartyNamesShort.length <= 0) || (arPartyNamesLong.length <= 0) )
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Es wurde keine Liste mit langen oder kurzen Parteinamen angegeben (strPartyNamesShort, strPartyNamesLong). ")
			.append(" <br /> ");
	}


	// Parteilogos und Webseiten
	if ( (arPartyLogosImg.length <= 0) || (arPartyInternet.length <= 0) )
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Es wurde keine Liste mit Parteilogos oder -webseiten angegeben (strPartyLogosImg, strPartyInternet). ")
			.append(" <br /> ");
	}

	
	// Werte fuer "Wahlprognose" pruefen
	if (statsRecord == 1)
	{
		if (imprintPrivacyUrl.length <= 0)
		{
			counterError++;
			$("#testOther").append("<b>("+counterError+").</b>")
				.append(" Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt aber es wurde keine Datenschutzerkl&auml;rung angegeben.")
				.append("<br />");
			
		}
		if (statsServer.length <= 0)
		{
			counterError++;
			$("#testOther").append("<b>("+counterError+").</b>")
				.append(" Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt aber es wurde keine Skript zum Empfang der Daten angegeben.")
				.append("<br />");
			
		}
	}

	// Laenge der Arrays vergleichen
	if (arPartyFiles.length != arPartyNamesShort.length)
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+arPartyFiles.length+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyNamesShort+"\")'>strPartyNamesShort</a>-Liste ("+arPartyNamesShort.length+").")
			.append("<br />");	
	}

	if (arPartyFiles.length != arPartyNamesLong.length)
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+arPartyFiles.length+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyNamesLong+"\")'>strPartyNamesLong</a>-Liste ("+arPartyNamesLong.length+").")
			.append("<br />");
	}

	if (arPartyFiles.length != arPartyLogosImg.length)
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+arPartyFiles.length+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyLogosImg+"\")'>strPartyLogosImg</a>-Liste ("+arPartyLogosImg.length+").")
			.append("<br />");
	} 

	if (arPartyFiles.length != arPartyInternet.length)
	{
		counterError++;
		$("#testOther").append("<b>("+counterError+").</b>")
			.append(" Die Anzahl der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyFiles+"\")'>strPartyFiles</a>-Liste ("+arPartyFiles.length+") ist ungleich der Werte in der <a href='javascript:fnTestAlertVariable(\""+strPartyInternet+"\")'>strPartyInternet</a>-Liste ("+arPartyInternet.length+").")
			.append("<br />");
	}

	// Abschlussevaluation	
	if (counterError > 0)
	{
		$("#testOther").append("<br /> Bitte &uuml;berpr&uuml;fen Sie Ihre <a href='data/definition.js' target='_blank'>Einstellungen</a>.")
			.append("<br />")
			.css("color","red");
	}
	else
	{
		$("#testOther").append("Keine Fehler gefunden. :-)")
			.css("color","green");
	}
}
