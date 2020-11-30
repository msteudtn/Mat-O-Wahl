// OUTPUT.JS http://www.mat-o-wahl.de
// Output of information / Ausgabe der Informationen
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

function fnStart()
{

	// alte Inhalte loeschen
	
	// Bereich -  Überschriften, Erklärung zur Wahl
	$("#heading1").empty();	
	$("#heading2").empty();	
	$("#explanation").empty();	
	// $("#headingContentstatsServer").empty(); // ?
	$("#content").empty(); // Fragen
	
	// Bereich - Ergebnisse
	$("#resultsHeading").empty();
	$("#resultsShort").empty();
	$("#resultsLong").empty();
	
	// Bereich - Footer
	$("#keepStatsQuestion").empty();

	// Platzhalter für Addon-DIVs
	$("#descriptionAddonTop").empty();
	$("#descriptionAddonBottom").empty();
	$("#resultsAddonTop").empty();
	$("#resultsAddonBottom").empty();
	
	//////////////////////////////////////////////////////////////////
	// TEXTE
	
	// Anzeige der Überschriften und Begleittexte
	$("#heading1").append("<h1>"+heading1+"</h1>")
	$("#heading2").append("<h2>"+heading2+"</h2>");			
	$("#explanation").append(explainingText);

	//////////////////////////////////////////////////////////////////
	// BUTTONS
	
	$("#votingPro").html(TEXT_VOTING_PRO)
	$("#votingNeutral").html(TEXT_VOTING_NEUTRAL)
	$("#votingContra").html(TEXT_VOTING_CONTRA)
	$("#votingSkip").html(TEXT_VOTING_SKIP)
	$("#votingDouble").html(TEXT_VOTING_DOUBLE)
	
	//////////////////////////////////////////////////////////////////
	// FOOTER

	// Wenn Datenschutzerklärung vorhanden UND Auswertung gewünscht ...
	if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
	{
		/// $("#keepStatsQuestion").append("Siehe <a href='https://"+imprintPrivacyUrl+"' target='_blank'>Datenschutzerkl&auml;rung.</a>");
		$("#keepStatsQuestion").append(TEXT_ALLOW_STATISTIC);		
//		$("#keepStatsCheckbox").attr("checked",true); // Zeile auskommentieren/aktivieren und OptIn erzwingen - bitte mit Bedacht benutzen.
		$("#keepStats").fadeIn(1000);
	}
	else
	{
		$("#keepStatsCheckbox").attr("checked",false);	// Falls jmd. bauernschlau in der INDEX.HTML checked="checked" eingetragen hat -> OptOut
	}

	// Impressum auf Startseite ersetzen
	// Text aus i18n einfügen
	$("#imprint").html(TEXT_IMPRINT);
	// Link aus definition.js einfügen
	$("#imprint").attr("href", imprintLink)
	
	// Neustart / Wiederholung
	var jetzt = new Date();
	var sekunden = jetzt.getTime(); 
	$("#restart").attr("href","index.html?"+sekunden);
	$("#restart").html(TEXT_RESTART);
	
	//////////////////////////////////////////////////////////////////
	// FRAGEN UND ANTWORTEN in Arrays einlesen
	// (a) Fragen 
	fnReadCsv("data/"+fileQuestions,fnShowQuestions)

	// (b) Antworten der Parteien und Partei-Informationen
	fnReadCsv("data/"+fileAnswers,fnReadPositions)

	//arVotingDouble initialisieren
	for (i=0;i<arQuestionsShort.length;i++)
		{arVotingDouble[i]=false;
		arPersonalPositions[i]=99;}
	$("#votingDouble").attr('checked', false); 
}


// (a) Anzeige von Frage Nummer XY
// (b) Weiterleitung zur Auswertung 
// Aufruf aus fnStart() -> fnShowQuestions(csvData)
function fnShowQuestionNumber(questionNumber)
{
	// Nummer der Frage im Array um eins erhöhen
	questionNumber++;
	
	$("#votingPro").unbind("click");
	$("#votingNeutral").unbind("click");
	$("#votingContra").unbind("click");
	$("#votingSkip").unbind("click");

	// solange Fragen gestellt werden -> Anzeigen (sonst Auswertung)
	if (questionNumber < arQuestionsLong.length) 
	{
		activeQuestion=questionNumber; // globale Variable
		
		// Aufbau der Liste zum Vor/Zurückgehen bei den Fragen
		fnJumpToQuestionNumber(questionNumber);
	
		// bodyTextSize = $("#headingContent").css("font-size");
		// bodyTextSize = parseInt(bodyTextSize)

		// Alten Inhalt des DIVs loeschen
		// $("#headingContent").empty();
		$("#content").fadeOut(500).empty().hide();
		$("#voting").fadeOut(500).hide();
		
		// Neuen Inhalt schreiben
		
		// Bootstrap-Progressbar
		var percent = fnPercentage((questionNumber+1),arQuestionsLong.length);
		$("#progress-bar").width(percent+"%")

		$("#content").append("<strong>"+arQuestionsShort[questionNumber]+" </strong> - ");
		$("#content").append(""+arQuestionsLong[questionNumber]+"");
	
		$("#content").fadeIn(500);
		$("#voting").fadeIn(500);
		
		
		
		// Klick-Funktion auf Bilder/Buttons legen.
	   $("#votingPro").click(function () {
		arPersonalPositions[questionNumber] = 1;
	   	fnShowQuestionNumber(questionNumber);
	   });

	   $("#votingNeutral").click(function () { 
	   	arPersonalPositions[questionNumber] = 0;
	   	fnShowQuestionNumber(questionNumber);
	   });

	   $("#votingContra").click(function () { 
	   	arPersonalPositions[questionNumber] = -1;
	   	fnShowQuestionNumber(questionNumber);
	   });

	   $("#votingSkip").click(function () { 
	   	arPersonalPositions[questionNumber] = 99;
	   	fnShowQuestionNumber(questionNumber);
	   });
	
		// Checkbox für doppelte Bewertung 
	  	$("#votingDouble").attr('checked', arVotingDouble[questionNumber]);
		// und Bild/Button zuruecksetzen
		$("#votingDouble").removeClass( "btn-dark" ).addClass( "btn-outline-dark" );
	}
	
	// Alle Fragen durchgelaufen -> Auswertung
	else
	{
		arResults=fnEvaluation();
		
		//Parteien sortieren
		arSortParties=new Array();
//		for (i = 0; i < arPartyFiles.length; i++)
		for (i = 0; i < intParties; i++)
			{
				arSortParties[i]=i;				
			}
		// Sortieren der Parteien nach Uebereinstimmung
		arSortParties.sort(function(a,b){return arResults[b]-arResults[a];});

		// Übergabe an Tabellen zur Darstellung/Ausgabe
		fnEvaluationShort(arResults);
		fnEvaluationLong(arResults);
	} 
	
}

// 02/2015 BenKob
function fnChangeVotingDouble()
{

	arVotingDouble[activeQuestion]=!(arVotingDouble[activeQuestion]);
	strBtnSrc = $("#votingDouble").hasClass("btn-outline-dark");
	
	if (strBtnSrc)
	// wenn vorher unwichtig -> jetzt doppelt werten
	{
		$("#votingDouble").removeClass( "btn-outline-dark" ).addClass( "btn-dark" );
		$("#jumpToQuestionNr"+(activeQuestion+1)+"").css("font-weight","bold");
	}
	// wenn vorher wichtig -> jetzt wieder auf normal setzen
	else
	{
		$("#votingDouble").removeClass( "btn-dark" ).addClass( "btn-outline-dark" );
		$("#jumpToQuestionNr"+(activeQuestion+1)+"").css("font-weight","normal");
	}

}

// Springe zu Frage Nummer XY (wird in fnShowQuestionNumber() aufgerufen)
function fnJumpToQuestionNumber(questionNumber)
{
	// alten Inhalt ausblenden und loeschen
	$("#jumpToQuestion").fadeOut(500).empty().hide();


	var maxQuestionsPerLine = 12;  // z.B. 16

	// Wenn mehr als XY Fragen vorhanden, dann erstelle eine zweite/dritte/... Zeile
	if (arQuestionsLong.length >= maxQuestionsPerLine)
	{
		var tableRows = arQuestionsLong.length / maxQuestionsPerLine;	// nicht mehr als 16 Fragen pro Zeile
			 tableRows = Math.ceil(tableRows);	// 17 Fragen / 16 = 1,06 ### 31 Fragen / 16 = 1,9 -> 2 Zeilen
		var questionsPerLine = arQuestionsLong.length / tableRows;		// 23 Fragen / 2 Zeilen = 12 & 11 Fragen/Zeile
			 questionsPerLine = Math.ceil(questionsPerLine);
	}
	else
	{
		questionsPerLine = maxQuestionsPerLine;
	}

	// Tabelle aufbauen	
	var tableContent = "<table width='100%'>";
	for (i = 1; i <= arQuestionsLong.length; i++)
	{
		var modulo = i % questionsPerLine;
		// neue Zeile
		if (modulo == 1) { tableContent += "<tr>"; }
		tableContent += "<td align='center' id='jumpToQuestionNr"+i+"' title='"+arQuestionsShort[(i-1)]+" - "+arQuestionsLong[(i-1)]+"'>"; 
		tableContent += "<a href='javascript:fnShowQuestionNumber("+(i-2)+")' style='display:block;'>"+i+" </a>"; 
		tableContent += "</td>";
		if (modulo == 0) { tableContent += "</tr>"; }
	}
	tableContent += "</table>";
	$("#jumpToQuestion").append(tableContent).fadeIn(500);

	// alte Meinungen farblich hervorheben und aktuelle Frage markieren
	for (i = 1; i <= arQuestionsLong.length; i++)
	{
		// beantwortete Fragen farblich markieren
		var positionColor = fnTransformPositionToColor(arPersonalPositions[(i-1)]);
	   $("#jumpToQuestionNr"+i+"").css("border-color", positionColor);
	   
	   // aktuelle Frage markieren
	   if ((i-1) <= questionNumber)
	   {
//	   	$("#jumpToQuestionNr"+i+"").css("background-color", middleColor);	// alt: graue "Mittelfarbe" als Hintergrund
	   	$("#jumpToQuestionNr"+i+"").css("background-color", positionColor);	// neu (0.2.3.2) Farbe der Auswahl (rot/gruen/...)
	   }

		if (arVotingDouble[(i-1)])
		{
			$("#jumpToQuestionNr"+i+"").css("font-weight","bold");
		}

	}	
	
}

// Anzeige der Ergebnisse - zusammengefasst (Prozentwerte) - nur Parteien
// Array arResults kommt von fnEvaluation
function fnEvaluationShort(arResults)
{
	// Alten Inhalt des DIVs loeschen
	$("#heading2").empty().hide();	
	$("#content").empty().hide();
	$("#explanation").empty().hide();	
	
	// Anzeige der Ergebnisse
//	$("#heading2").append("<h2>"+TEXT_RESULTS_MATCHES_GENERAL+"</h2>").fadeIn(500);
	$("#resultsHeading").append("<h2>"+TEXT_RESULTS_MATCHES_GENERAL+"</h2>").fadeIn(500);

	var numberOfQuestions=arQuestionsShort.length;
	//Anzahl der Maximalpunkte ermitteln
		var maxPoints = 0;
	for (i=0;i<arQuestionsShort.length;i++)
	{
		if (arPersonalPositions[i]<99)
		{
			maxPoints++;
			if(arVotingDouble[i])
				{maxPoints++;}
		}
	}
	if (maxPoints==0)
		{maxPoints=1;}
	var tableContent = "<table id='resultsShortTable' width='100%'>"
	
	for (i = 0; i <= (intParties-1); i++)
	{
		var partyNum=arSortParties[i];
		var percent = fnPercentage(arResults[partyNum],maxPoints)


		// Bilder in eigener Spalte -> deaktiviert seit V 0.5 
		// -> Bilder nun rechtsbündig neben Parteinamen
/*	
		tableContent += "<tr>"

		tableContent += "<td width='20%'>"
			tableContent += "<img src='data/"+arPartyLogosImg[partyNum]+"' width='"+intPartyLogosImgWidth+"' height='"+intPartyLogosImgHeight+"' alt='"+arPartyNamesLong[partyNum]+"' title='"+arPartyNamesLong[partyNum]+"' /> "
		tableContent += "</td>"
*/
		
		tableContent += "<td width='60%' id='resultsShortParty"+partyNum+"'>"


			tableContent += "<img src='"+arPartyLogosImg[partyNum]+"' width='"+intPartyLogosImgWidth+"' height='"+intPartyLogosImgHeight+"' class='rounded float-right' alt='"+arPartyNamesLong[partyNum]+"' style='margin-left: 10px;' />"

			tableContent += "<span style='font-weight: 600;'>"
			tableContent += arPartyNamesLong[partyNum];
			tableContent += "</span>" 

			tableContent += " (&#8663; <a href='"+arPartyInternet[partyNum]+"' target='_blank' title='"+arPartyNamesLong[partyNum]+"'>";		
			tableContent += arPartyNamesShort[partyNum];
			tableContent += "</a>)";

			// Beschreibung der Partei - falls in der CSV vorhanden.
			// Nur die ersten 32 Zeichen anzeigen. 
			// Danach abschneiden und automatisch ein/ausblenden (Funktionsaufbau weiter unten)
			// Wenn keine Beschreibung gewünscht, dann "0" eintragen.
			intPartyDescriptionPreview = 32
			if ( (arPartyDescription[partyNum]) && (intPartyDescriptionPreview > 0) )
			{
				tableContent += "<p style='cursor: pointer;'> &bull; "
				tableContent += arPartyDescription[partyNum].substr(0,intPartyDescriptionPreview)
				tableContent += "<span id='resultsShortPartyDescriptionDots"+partyNum+"'>...</span>"
				tableContent += "<span id='resultsShortPartyDescription"+partyNum+"'>"
				tableContent += arPartyDescription[partyNum].substr(intPartyDescriptionPreview,1024)
				tableContent += "</span> </p>"
			}

		tableContent += "</td>"

		
		// Punktwertung in eigener Spalte -> deaktiviert seit V 0.5 
		// -> Punkte nun direkt im Fortschrittsbalken zusammen mit Prozenten
/*
		tableContent += "<td width='10%' style='text-align:center;'>"
			tableContent += "<span id='partyPoints"+partyNum+"'>"+arResults[partyNum]+"/"+maxPoints+"</span>"
		tableContent += "</td>"
*/

		// Prozentwertung
		tableContent += "<td width='40%'>"
			tableContent += "<div class='progress'>"
//			tableContent += "	<div class='progress-bar' role='progressbar' id='partyBar"+partyNum+"' style='width:"+percent+"%'> "+percent+"% ("+arResults[partyNum]+"/"+maxPoints+") </div> "
			tableContent += "	<div class='progress-bar' role='progressbar' id='partyBar"+partyNum+"' style='width:"+percent+"%'>JUST_A_PLACEHOLDER_TEXT - SEE FUNCTION fnReEvaluate()</div> "

			tableContent += "</div>"
		tableContent += "</td>"

		tableContent += "</tr>";
	
	} // end for

	// $("#resultsShort").append("<p id='resultsShortToggle'>&nbsp; <b style='font-size:150%'>&#10551;</b> <a>Details</a> f&uuml;r oben ausgew&auml;hlte Parteien <a>ein-/ausblenden</a>.</p>");

	// Anzeigen der detaillierten Tabelle
	tableContent += "</table>";


	// Daten in Browser schreiben
	$("#resultsShort").append(tableContent).fadeIn(750); 

	// Funktion zur Berechnung der "Doppelten Wertung" aufrufen 
	// -> enthält Aufruf für farbliche Progressbar (muss hier ja nicht extra wiederholt werden)
	fnReEvaluate()
	

	// Click-Funktion auf PARTEINAME-Zeile legen zum Anzeigen des BESCHREIBUNG-SPAN (direkt darunter)
	// "[In a FOR-loop] you can use the let keyword, which makes the i variable local to the loop instead of global"
	// 	https://stackoverflow.com/questions/4091765/assign-click-handlers-in-for-loop
	for (let i = 0; i <= (intParties-1); i++)
	{
		// Klickfunktion - bei Überschrift
		$("#resultsShortParty"+i).click(function () { 
				$("#resultsShortPartyDescription"+i).toggle(500);
				$("#resultsShortPartyDescriptionDots"+i).toggle(500);
			});	
		// Klickfunktion - bei Beschreibung
		/*
		$("#resultsShortPartyDescription"+i).click(function () { 
				$("#resultsShortPartyDescription"+i).toggle(500);
			});
		*/
		// am Anfang ausblenden
		$("#resultsShortPartyDescription"+i).fadeOut(500);
		$("#resultsShortPartyDescriptionDots"+i).fadeIn(500);
	}

}


// Anzeige der Ergebnisse - detailliert, Fragen und Antworten
// Array arResults kommt von fnEvaluation
function fnEvaluationLong(arResults)
{
	// $("#resultsLong").hide();

	var tableContent = "";

	tableContent += "<h2>"+TEXT_RESULTS_MATCHES_DETAILS+"</h2>";	

	tableContent += " <p>"+TEXT_RESULTS_MATCHES_DETAILS_INFO+"</p>";

	
	tableContent += "<table width='100%' id='resultsLongTable'>";
		
	// Kopfzeile der Tabelle
		
	// v.0.3 NEU: nur noch zwei Spalten
	tableContent += "<tr>";
	tableContent += " <th> </th>"; 
	tableContent += " <th> </th>"; 
	tableContent += " <th>"+TEXT_RESULTS_MATCHES_DETAILS_TABLE+"</th>";
	tableContent += "</tr>";

	// Inhalt
	// var cellId = -1;	// cellId ist für das Ausblenden der Spalten wichtig.
	for (i = 0; i <= (arQuestionsLong.length-1); i++)
	{
		var positionButton = fnTransformPositionToButton(arPersonalPositions[i]);
		var positionIcon = fnTransformPositionToIcon(arPersonalPositions[i]);
		var positionText  = fnTransformPositionToText(arPersonalPositions[i]);
		
		tableContent += "<tr>";
		
			// 1. Spalte: eigene Meinung + doppelte Wertung
			tableContent += "<td style='text-align:center'>";
				tableContent += "<button type='button' id='selfPosition"+i+"' "+
					" class='btn "+positionButton+" btn-sm' "+ 
					" onclick='fnToggleSelfPosition("+i+")' "+ 
					" alt='"+positionText+"' title='"+positionText+"'>"+
					" "+positionIcon+"</button>";

			tableContent += "</td>";	
			tableContent += "<td style='text-align:center'>";	
				
				if (arVotingDouble[i])
				{
					tableContent += "<button type='button' class='btn btn-dark btn-sm' "+
						" id='doubleIcon"+i+"' "+
						" onclick='fnToggleDouble("+i+")' title='Frage wird doppelt gewertet'>x2</button>";						
				}
				else			
				{
				tableContent += "<button type='button' class='btn btn-outline-dark btn-sm' "+
						" id='doubleIcon"+i+"' "+
						" onclick='fnToggleDouble("+i+")' title='Frage wird einfach gewertet'>x2</button>";

				}
				
			tableContent += "</td>";

			// 2. Spalte: Frage (kurz und lang)
			tableContent += "<td id='resultsLongQuestion"+i+"' style='cursor: pointer;'>";
				tableContent += "<div style='display:inline-; float:left'>"
				tableContent += "<strong>"+arQuestionsShort[i]+"</strong>: ";
				tableContent += arQuestionsLong[i];
				tableContent += "</div>"
				tableContent += "<div style='display:inline; float:right'>&#x2335;</div>";
			tableContent += "</td>";	
			
			// var multiplier = arPartyFiles.length + 2; 

		tableContent += "</tr> ";

		// v.0.3 Parteiantworten gleich unter der Frage anzeigen
		tableContent += "<tr id='resultsLongAnswersToQuestion"+i+"'> ";
		tableContent += " <td> </td> ";
		tableContent += " <td> </td> ";		
		tableContent += " <td>";

		// darunterliegende Zeile - Parteipositionen anzeigen
			for (j = 0; j <= (intParties-1); j++)
			{
				var partyNum=arSortParties[j];
				// cellId++; /// VER 0.2.3.2
				// var cellId = partyNum + 2 + (i * multiplier);
				var partyPositionsRow = partyNum * arQuestionsLong.length + i;
				// var positionImage = fnTransformPositionToImage(arPartyPositions[partyPositionsRow]);
				var positionButton = fnTransformPositionToButton(arPartyPositions[partyPositionsRow]);
				var positionIcon = fnTransformPositionToIcon(arPartyPositions[partyPositionsRow]);
				
                var positionText = fnTransformPositionToText(arPartyPositions[partyPositionsRow]);

				// Inhalt der Zelle
				tableContent += "<p>"
				tableContent += "<button type='button' class='btn "+positionButton+" btn-sm' disabled "+
						" alt='"+arPartyOpinions[partyPositionsRow]+"'>"+
						" "+positionIcon+"</button>";							
							
				tableContent += "<strong>" + arPartyNamesShort[partyNum] + "</strong>: " + positionText + ( arPartyOpinions[partyPositionsRow] === "" ? "" : ": " + arPartyOpinions[partyPositionsRow] ) + " ";
				tableContent += "</p>";
			}
		tableContent += "</td> </tr> ";
		
	} // end if
		
	tableContent += "</table>";
	
	// Daten in Browser schreiben
	$("#resultsLong").append(tableContent);
	
	
	// Click-Funktion auf FRAGE-(und ANTWORT)-Zeile legen zum Anzeigen der ANTWORT-Zeile (direkt darunter)
	// "[In a FOR-loop] you can use the let keyword, which makes the i variable local to the loop instead of global"
	// 	https://stackoverflow.com/questions/4091765/assign-click-handlers-in-for-loop
//	for (let i = 0; i <= (arQuestionsLong.length-1); i++)
	for (let i = 0; i <= (intQuestions-1); i++)
	{
		// Klickfunktion - bei Überschrift
		$("#resultsLongQuestion"+i).click(function () { 
				$("#resultsLongAnswersToQuestion"+i).toggle(500);
			});	
		// Klickfunktion - bei Beschreibung
		$("#resultsLongAnswersToQuestion"+i).click(function () { 
				$("#resultsLongAnswersToQuestion"+i).toggle(500);
			});
		// am Anfang ausblenden
		$("#resultsLongAnswersToQuestion"+i).fadeOut(500);
	}	
	
} // end function


// 02/2015 BenKob
// Aktualisierung der Ergebnisse in der oberen Ergebnistabelle (short)
// Aufruf heraus in:
// (a) fnEvaluationShort() nach dem Aufbau der oberen Tabelle 
// (b) in den Buttons in der detaillierten Auswertung (fnToggleSelfPosition() und fnToggleDouble())
function fnReEvaluate()
{
	//Ergebniss neu auswerten und Anzeige aktualisieren
	arResults=fnEvaluation();

	//Anzahl der Maximalpunkte ermitteln
	var maxPoints = 0;

//	for (i=0;i<arQuestionsShort.length;i++)
	for (i=0; i<intQuestions; i++)

	{
		if (arPersonalPositions[i]<99)
		{
			maxPoints++;
			if(arVotingDouble[i])
				{maxPoints++;}
		}
	}
	if(maxPoints==0)
		{maxPoints=1};
//	for (i = 0; i <= (arPartyFiles.length-1); i++)
	for (i = 0; i <= (intParties-1); i++)
	{
		var percent = fnPercentage(arResults[i],maxPoints)
		
		// bis v.0.3 mit PNG-Bildern, danach mit farblicher Bootstrap-Progressbar
		var barImage = fnBarImage(percent);
				
		// neu ab v.0.3 - Bootstrap-Progressbar
		$("#partyBar"+i).width(percent+"%")
		$("#partyBar"+i).text(percent+"% (" + arResults[i]+" / "+maxPoints+ ")");
		$("#partyBar"+i).removeClass("bg-success bg-warning bg-danger").addClass(barImage);

		$("#partyPoints"+i).html(arResults[i]+"/"+maxPoints);

	}

}
