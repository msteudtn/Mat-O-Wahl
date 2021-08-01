// OUTPUT.JS http://www.mat-o-wahl.de
// Output of information / Ausgabe der Informationen
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

function fnStart()
{
	// alte Inhalte loeschen bzw. ausblenden
	
	// 1. Bereich -  Überschriften, Erklärung zur Wahl
	// sectionDescription
	$("#descriptionHeading1").empty().append("<h1>"+descriptionHeading1+"</h1>")
	$("#descriptionHeading2").empty().append("<h2>"+descriptionHeading2+"</h2>");
	$("#descriptionExplanation").empty().append(descriptionExplanation);
	$("#descriptionButtonStart").html(TEXT_START)
	$("#descriptionAddonTop").empty();
	$("#descriptionAddonBottom").empty();
	
	// 2. Bereich - Anzeige der Fragen - am Anfang ausblenden
	$("#sectionShowQuestions").hide()
	$("#showQuestionsHeader").empty();
	$("#showQuestionsQuestion").empty();
	
	// 3. Voting Buttons
	$("#sectionVotingButtons").hide();
	$("#votingPro").html(TEXT_VOTING_PRO)
	$("#votingNeutral").html(TEXT_VOTING_NEUTRAL)
	$("#votingContra").html(TEXT_VOTING_CONTRA)
	$("#votingSkip").html(TEXT_VOTING_SKIP)
	$("#votingDouble").html(TEXT_VOTING_DOUBLE)
	
	// 4. Navigation
	$("#sectionNavigation").hide();
	
	// Bereich - Ergebnisse
	$("#sectionResults").hide()
	$("#resultsHeading").empty();
	$("#resultsShort").empty();
	$("#resultsByThesis").empty();
	$("#resultsByParty").empty();
	$("#resultsAddonTop").empty();
	$("#resultsAddonBottom").empty();

	$("#resultsButtons").hide()
	$("#resultsButtonTheses").html(TEXT_RESULTS_BUTTON_THESES)
	$("#resultsButtonParties").html(TEXT_RESULTS_BUTTON_PARTIES)
	
	// Bereich - Footer
//	$("#keepStatsQuestion").empty();
	$("#statisticsModalLabel").html(TEXT_ALLOW_STATISTIC_TITLE)
	$("#statisticsModalBody").html(TEXT_ALLOW_STATISTIC_TEXT)
	$("#statisticsModalButtonNo").html(TEXT_ALLOW_STATISTIC_NO)
	$("#statisticsModalButtonYes").html(TEXT_ALLOW_STATISTIC_YES)

	//////////////////////////////////////////////////////////////////
	// FOOTER

/*

	// Wenn Datenschutzerklärung vorhanden UND Auswertung gewünscht ...
	$("#keepStats").hide()
	$("#keepStatsQuestion").append(TEXT_ALLOW_STATISTIC);	// WACG: <label> sollte immer befüllt sein 	
	if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
	{		
//		$("#keepStatsCheckbox").attr("checked",true); // Zeile auskommentieren/aktivieren und OptIn erzwingen - bitte mit Bedacht benutzen.
		$("#keepStats").fadeIn(1000);
	}
	else
	{
		$("#keepStatsCheckbox").attr("checked",false);	// Falls jmd. bauernschlau in der INDEX.HTML checked="checked" eingetragen hat -> OptOut
	}
*/

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
	// FRAGEN UND ANTWORTEN in Arrays einlesen und Folgefunktionen aufrufen
	// (a) Fragen 
	fnReadCsv("data/"+fileQuestions,fnShowQuestions)

	// (b) Antworten der Parteien und Partei-Informationen
	fnReadCsv("data/"+fileAnswers,fnReadPositions)

	// arVotingDouble initialisieren
	for (i=0;i<arQuestionsShort.length;i++)
		{arVotingDouble[i]=false;
		arPersonalPositions[i]=99;}
	$("#votingDouble").attr('checked', false);
	
	// Wenn "descriptionShowOnStart = 0" in DEFINITION.JS, dann gleich die Fragen anzeigen
	if (descriptionShowOnStart) {
		// nix
	} else {
		// Das System ist am Anfang noch nicht fertig geladen. Deshalb müssen wir einen Moment warten. :(		
		$("#descriptionHeading1").empty().append("<h1>Loading / Lädt</h1>")
		$("#descriptionHeading2").empty().append("<h2>Please wait a moment / Bitte einen Moment warten</h2>");

		var descriptionExplanationContent = ""
		descriptionExplanationContent += '<div class="progress">'
		descriptionExplanationContent += '	<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width:50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>'
		descriptionExplanationContent += '</div>'
		descriptionExplanationContent += "This message disappears in less than 5 seconds. If not something went wrong. / <br /> Diese Nachricht verschwindet in weniger als 5 Sekunden. Andernfalls ist etwas schief gelaufen."
		
		$("#descriptionExplanation").empty().append(descriptionExplanationContent);
				
		window.setTimeout(fnHideWelcomeMessage, 2500);
	}
	
	 
}

// Ausblenden der Willkommensmeldung (#sectionDescription)
// und direkt in die Fragen gehen
// neu ab v.0.6
// Aufruf aus fnStart() wenn "descriptionShowOnStart = 0" ODER beim Klick auf Start-Button
function fnHideWelcomeMessage() { 
	$('#sectionDescription').hide().empty();
	fnShowQuestionNumber(-1);	
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

		// Fragen ausblenden und neue Frage einblenden - nur zur besseren Visualisierung
		$("#sectionShowQuestions").fadeOut(300).hide();		
			$("#showQuestionsHeader").empty().append("<h2>"+arQuestionsShort[questionNumber]+"</h2>");
			$("#showQuestionsQuestion").empty().append(arQuestionsLong[questionNumber]);			
		$("#sectionShowQuestions").fadeIn(300);

		
		// Buttons ausblenden, damit Nutzer nicht zufällig drauf klickt
		$("#sectionVotingButtons").fadeOut(300).hide();
		$("#sectionVotingButtons").fadeIn(300);

		// Navigation (Nummer der Frage) ein-/ausblenden		
		$("#sectionNavigation").fadeOut(300).hide();
			// Bootstrap-Progressbar
			var percent = fnPercentage((questionNumber+1),arQuestionsLong.length);
			$("#progress-bar").width(percent+"%")
			$("#progress-bar").attr("aria-valuenow",percent)
		
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

		$("#sectionNavigation").fadeIn(300);

	
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
		fnEvaluationShort(arResults);	// Kurzüberblick mit Progress-bar
		fnEvaluationByThesis(arResults);	// Thesen + Partei-Antworten
		fnEvaluationByParty(arResults) 	// Liste der Parteien mit ihren Antworten (ab v.0.6)


		// Buttons einblenden für detaillierte Ergebnisse
		$("#resultsButtons").fadeIn(500);
		
		
		// Abfrage zur Statistik einblenden (v.0.6.)
		if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
		{		
			$('#statisticsModal').modal('show')
			
			// Klick-Funktion mit den Ergebnissen zum Senden auf "Ja" legen
			document.getElementById("statisticsModalButtonYes").addEventListener("click", function() {
				fnSendResults(arResults, arPersonalPositions)
				$('#statisticsModal').modal('toggle') 
  			});
			

		}
			
		
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
	$("#navigationJumpToQuestion").fadeOut(500).empty().hide();

	// Durchlauf des Arrays bis zur ausgewählten Frage und Setzen der 99, falls NaN
	for (i =0; i<questionNumber; i++) {
		if (isNaN(arPersonalPositions[i])) {
			arPersonalPositions[i] = 99;
		}
	}

	var maxQuestionsPerLine = 12;  // z.B. 16

	// Wenn mehr als XY Fragen vorhanden, dann erstelle eine zweite/dritte/... Zeile
	if (intQuestions >= maxQuestionsPerLine)
	{

		var tableRows = arQuestionsLong.length / maxQuestionsPerLine;		/* z.B. nicht mehr als 16 Fragen pro Zeile */
			 tableRows = Math.ceil(tableRows);				/* 17 Fragen / 16 = 1,06 ### 31 Fragen / 16 = 1,9 -> 2 Zeilen */
		var questionsPerLine = arQuestionsLong.length / tableRows;		/* 23 Fragen / 2 Zeilen = 12 & 11 Fragen/Zeile */
			 questionsPerLine = Math.ceil(questionsPerLine);

	}
	else
	{
		questionsPerLine = maxQuestionsPerLine;
	}

	// Tabelle aufbauen	
	var tableContent = "<table width='100%' class='table table-bordered table-striped table-hover' aria-role='presentation'>";
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
	$("#navigationJumpToQuestion").append(tableContent).fadeIn(500);

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
	// $("#heading2").empty().hide();	
	// $("#content").empty().hide();
	$("#sectionShowQuestions").empty().hide();
	// $("#explanation").empty().hide();	
	
	// Anzeige der Ergebnisse
	$("#resultsHeading").append("<h1>"+TEXT_RESULTS_HEADING+"</h1>").fadeIn(500);

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

	var tableContent = ""
	tableContent += "<div class='row' id='resultsShortTable' role='table'>"
		tableContent += "<div class='col'>"
//		tableContent = "<table id='resultsShortTable' class='table table-bordered table-striped table-hover' aria-role='presentation'>"

		for (i = 0; i <= (intParties-1); i++)
		{
			var partyNum=arSortParties[i];
			var percent = fnPercentage(arResults[partyNum],maxPoints)

			tableContent += "<div class='row border rounded mow-row-striped' id='resultsShortParty"+partyNum+"' role='row'>"
			// tableContent += "<tr id='resultsShortParty"+partyNum+"'>"

				// Parteinamen: lang, kurz, Webseite, Beschreibung
				tableContent += "<div class='col col-10 col-md-7' role='cell'>"
				// tableContent += "<td style='width:60%;'>"

//					tableContent += "<img src='"+arPartyLogosImg[partyNum]+"' class='rounded img-fluid float-right' alt='Logo "+arPartyNamesLong[partyNum]+"' style='margin-left: 10px; width:"+intPartyLogosImgWidth+"; height:"+intPartyLogosImgHeight+";' />"

					tableContent += "<strong>"
					tableContent += arPartyNamesLong[partyNum];
					tableContent += "</strong>" 

					tableContent += " (&#8663; <a href='"+arPartyInternet[partyNum]+"' target='_blank' alt='Link: "+arPartyNamesLong[partyNum]+"' title='Link: "+arPartyNamesLong[partyNum]+"'>";		
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

				tableContent += "</div>"
				// tableContent += "</td>"

				// Partei-Logo (automatisch angepasst)
				tableContent += "<div class='col col-2 col-md-1' role='cell'>"
				// tableContent += "<td>"
					tableContent += "<img src='"+arPartyLogosImg[partyNum]+"' class='rounded img-fluid' alt='Logo "+arPartyNamesLong[partyNum]+"' />"
				// tableContent += "</td>"
				tableContent += "</div>"				

				// Prozentwertung
				tableContent += "<div class='col col-12 col-md-4' role='cell'>"
				// tableContent += "<td style='width:40%;'>"
					tableContent += "<div class='progress'>"
					tableContent += "	<div class='progress-bar' role='progressbar' id='partyBar"+partyNum+"' style='width:"+percent+"%;' aria-valuenow='"+percent+"' aria-valuemin='0' aria-valuemax='100'>JUST_A_PLACEHOLDER_TEXT - SEE FUNCTION fnReEvaluate()</div> "
					tableContent += "</div>"
				tableContent += "</div>"
				// tableContent += "</td>"

			tableContent += "</div>" // end: row (for-i)
			// tableContent += "</tr>" 
		
		} // end for

		// Anzeigen der detaillierten Tabelle
		tableContent += "</div>"; // end: col (resultsShortTable)
	tableContent += "</div>"; // end: row (resultsShortTable)
//	tableContent += "</table>"; // end: row (resultsShortTable)


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

	// $("#results").fadeIn(500);
	$("#sectionResults").fadeIn(500);
	
}


// Anzeige der Ergebnisse - detailliert, Fragen und Antworten der Parteien
// Array arResults kommt von fnEvaluation
function fnEvaluationByThesis(arResults)
{
	// $("#resultsByThesis").hide();

	var tableContent = "";

	tableContent += " <p>"+TEXT_RESULTS_INFO_THESES+"</p>";
	/*
	tableContent += "<table width='100%' id='resultsByThesisTable' class='table table-bordered table-striped table-hover'>";
	tableContent += "<caption>"+TEXT_RESULTS_INFO_THESES+"</caption>";

			tableContent += "<thead>";
				tableContent += "<tr>";
					tableContent += "<td class=''>";
					tableContent += "</td>";

					tableContent += "<th class='align-text-top'>";
					tableContent += TEXT_ANSWER_USER+" &amp; "+TEXT_POSITION_PARTY
					tableContent += "</th>";

					tableContent += "<th class='align-text-top'>";	
					tableContent += TEXT_QUESTION+" &amp; "+TEXT_ANSWER_PARTY
					tableContent += "</th>";

				
				tableContent += "</tr>";			
			tableContent += "</thead>";
	*/
	tableContent += "<div class='row' id='resultsByThesisTable' role='table'>"
		tableContent += "<div class='col'>"


			tableContent += "<div class='row border ' role='row'>"; // row header
				tableContent += "<div class='col col-2' role='columnheader'>";
				tableContent += "<strong>";
				tableContent += TEXT_ANSWER_USER+" &amp; "+TEXT_POSITION_PARTY
				tableContent += "</strong>";
				tableContent += "</div>";

				tableContent += "<div class='col col-10' role='columnheader'>";
				tableContent += "<strong>";					
				tableContent += TEXT_QUESTION+" &amp; "+TEXT_ANSWER_PARTY
				tableContent += "</strong>";
				tableContent += "</div>";				
			tableContent += "</div>"; // row header						

				
			// Inhalt
			// var cellId = -1;	// cellId ist für das Ausblenden der Spalten wichtig.
			for (i = 0; i <= (intQuestions-1); i++)
			{
				var positionButton = fnTransformPositionToButton(arPersonalPositions[i]);
				var positionIcon = fnTransformPositionToIcon(arPersonalPositions[i]);
				var positionText  = fnTransformPositionToText(arPersonalPositions[i]);
				
				// tableContent += "<tbody>";
				// tableContent += "<tr>";
				tableContent += "<div class='row border' role='row'>";
				
					// 1. Spalte: doppelte Wertung
					// tableContent += "<th class='text-center'>";
					tableContent += "<div class='col col-2' role='cell'>";

						tableContent += "<button type='button' id='' "+
						// tableContent += "<button type='button' "+
							" class='btn "+positionButton+" btn-sm selfPosition"+i+" ' "+ 
							" onclick='fnToggleSelfPosition("+i+")' "+ 
							" alt='"+TEXT_ANSWER_USER+" : "+positionText+"' title='"+TEXT_ANSWER_USER+" : "+positionText+"'>"+
							" "+positionIcon+"</button>";


						if (arVotingDouble[i])
						{
							tableContent += "<button type='button' class='btn btn-dark btn-sm' "+
								" id='doubleIcon"+i+"' "+
								" onclick='fnToggleDouble("+i+")' title='"+TEXT_ANSWER_DOUBLE+"'>x2</button>";						
						}
						else			
						{
						tableContent += "<button type='button' class='btn btn-outline-dark btn-sm' "+
								" id='doubleIcon"+i+"' "+
								" onclick='fnToggleDouble("+i+")' title='"+TEXT_ANSWER_NORMAL+"'>x2</button>";
		
						}		
					// tableContent += "</th>";
//					tableContent += "</div>";


					// 2. Spalte: eigene Meinung
						// tableContent += "<th scope='col' class='text-center'>";
//						tableContent += "<div class='col-1'>";
					// tableContent += "</th>";

					tableContent += "</div>";

	
					// 3. Spalte: Frage (kurz und lang)
//					tableContent += "<th id='resultsByThesisQuestion"+i+"' style='cursor: pointer;' scope='col'>";
//					tableContent += "<th id='resultsByThesisQuestion"+i+"' style='' scope='col'>";
					tableContent += "<div class='col col-10' id='resultsByThesisQuestion"+i+"' role='cell'>";
						tableContent += "<div style='display:inline-; float:left'>"
						tableContent += "<strong>"+arQuestionsShort[i]+"</strong>: ";
						tableContent += arQuestionsLong[i];
						tableContent += "</div>"
						// Einklappen / Aufklappen ("Collapside")
						
//						tableContent += "<div style='display:inline; float:right' id='resultsByThesisQuestion"+i+"collapse' class='resultsByThesisQuestionCollapsePlus'> </div>";
//						tableContent += "<button style='display:inline; float:right;' id='resultsByThesisQuestion"+i+"collapse' class='resultsByThesisQuestionCollapsePlus btn btn-sm btn-outline-secondary' type='button'>+</button>";
						tableContent += "<button style='display:inline; float:right;' id='resultsByThesisQuestion"+i+"collapse' class='nonexpanded btn btn-sm btn-outline-secondary' type='button'>&#x2795;</button>";
						
					// tableContent += "</th>";
					tableContent += "</div>";
					 
//				tableContent += "</tr>"; // (Fragen)
				tableContent += "</div>"; // row (Fragen)
//				tableContent += "</tbody>";
		
		
				// darunterliegende Zeile - Parteipositionen anzeigen		
				// tableContent += "<tbody id='resultsByThesisAnswersToQuestion"+i+"'>";

		
				tableContent += "<div class='row border rounded' id='resultsByThesisAnswersToQuestion"+i+"'> ";
					tableContent += "<div class='col'>"
//					tableContent += " <div class='col-2'> </div> ";
//					tableContent += " <div class='col-10'>";
							
						// darunterliegende Zeile - Parteipositionen anzeigen
						for (j = 0; j <= (intParties-1); j++)
						{
							var partyNum=arSortParties[j];
							var partyPositionsRow = partyNum * intQuestions + i;
							var positionButton = fnTransformPositionToButton(arPartyPositions[partyPositionsRow]);
							var positionIcon = fnTransformPositionToIcon(arPartyPositions[partyPositionsRow]);
			            var positionText = fnTransformPositionToText(arPartyPositions[partyPositionsRow]);
			            
			
							// Inhalt der Zelle
							tableContent += " <div class='row mow-row-striped' role='row'> ";
//								tableContent += " <div class='col-1'> </div> ";
								tableContent += " <div class='col col-2' role='cell'> ";
								//tableContent += "<p>"
									tableContent += "<button type='button' class='btn "+positionButton+" btn-sm' disabled "+
											" alt='"+TEXT_ANSWER_PARTY+" : "+positionText+"' title='"+TEXT_ANSWER_PARTY+" : "+positionText+"'>"+
											" "+positionIcon+"</button>";
								tableContent += "</div>";							
								
								tableContent += " <div class='col col-10' role='cell'> ";
									tableContent += "<strong>" + arPartyNamesShort[partyNum] + "</strong>: " + ( arPartyOpinions[partyPositionsRow] === "" ? "" : "" + arPartyOpinions[partyPositionsRow] ) + " ";
								//tableContent += "</p>";
								tableContent += "</div>";
							tableContent += "</div>"; // row 
						}
					tableContent += "</div> "; // col (Partei-Antworten)
				tableContent += "</div> "; // row (Partei-Antworten)
				
			} // end if
	
		tableContent += "</div>"; // col
	tableContent += "</div>"; // row
	
	// Daten in Browser schreiben
	$("#resultsByThesis").append(tableContent);


	// und am Anfang ausblenden
	$("#resultsByThesis").hide();
	
	
	// Click-Funktion auf FRAGE-(und ANTWORT)-Zeile legen zum Anzeigen der ANTWORT-Zeile (direkt darunter)
	// "[In a FOR-loop] you can use the let keyword, which makes the i variable local to the loop instead of global"
	// 	https://stackoverflow.com/questions/4091765/assign-click-handlers-in-for-loop
	for (let i = 0; i <= (intQuestions-1); i++)
	{
		/*		
		// Klickfunktion - bei Überschriftenzeile
		$("#resultsByThesisQuestion"+i).click(function () {
				$("#resultsByThesisAnswersToQuestion"+i+"").toggle(500);

				// Wechsel des PLUS und MINUS-Symbols beim Klick (siehe auch DEFAULT.CSS)
				// *** ToDo: Button mit Inhalt füllen für ARIA, kein CSS ***
				// $("#resultsByThesisQuestion"+i+" .resultsByThesisQuestionCollapsePlus").toggleClass("resultsByThesisQuestionCollapseMinus")				
				
			});
		*/
		
		$("#resultsByThesisQuestion"+i+" .nonexpanded").click(function() {
		var $this = $(this);
		$("#resultsByThesisAnswersToQuestion"+i+"").toggle(500)
		
			$this.toggleClass("expanded");
		
			if ($this.hasClass("expanded")) {
				$this.html("&#x2796;"); // MINUS
			} else {
				$this.html("&#x2795;"); // PLUS
			}
		});

		// am Anfang die Antworten ausblenden
//		$("#resultsByThesisAnswersToQuestion"+i).fadeOut(500);	// irgendwie verrutschen die Zeilen bei fadeOut() -> deshalb die css()-Lösung 
		$("#resultsByThesisAnswersToQuestion"+i+"").css("display","none")
	}

} // end function



// Anzeige der Ergebnisse - detailliert, Sortiert nach Parteien inkl. deren Antworten
// Array arResults kommt von fnEvaluation
function fnEvaluationByParty(arResults)
{
	
	var tableContent = "";

	tableContent += " <p>"+TEXT_RESULTS_INFO_PARTIES+"</p>";
	
	/*
	tableContent += "<table width='100%' id='resultsByPartyTable' class='table table-bordered table-striped table-hover'>";
	tableContent += "<caption>"+TEXT_RESULTS_BUTTON_PARTIES+"</caption>";

			tableContent += "<thead>";
				tableContent += "<tr>";
					tableContent += "<th class='align-text-top'>";
					tableContent += TEXT_QUESTION;
					tableContent += "</th>";

					tableContent += "<th class='align-text-top'>";
					tableContent += TEXT_ANSWER_USER;
					tableContent += "</th>";

					tableContent += "<th class='align-text-top'>";
					tableContent += TEXT_POSITION_PARTY;
					tableContent += "</th>";


					tableContent += "<th class='align-text-top'>";	
					tableContent += TEXT_ANSWER_PARTY;
					tableContent += "</th>";

				
				tableContent += "</tr>";			
			tableContent += "</thead>"; 
		*/

	tableContent += "<div class='row' id='resultsByPartyTable' role='table'>"
		tableContent += "<div class='col'>"


			tableContent += "<div class='row border ' role='row'>"; // row header
				tableContent += "<div class='col col-10 order-2 col-md-5 order-md-1' role='columnheader'>";
				tableContent += "<strong>";
				tableContent += TEXT_QUESTION
				tableContent += "</strong>";
				tableContent += "</div>";

				tableContent += "<div class='col col-2 order-1 col-md-1 order-md-2' role='columnheader'>";
				tableContent += "<strong>";
				tableContent += TEXT_ANSWER_USER
				tableContent += "</strong>";
				tableContent += "</div>";

				tableContent += "<div class='col col-2 order-3 col-md-1 order-md-3' role='columnheader'>";
				tableContent += "<strong>";
				tableContent += TEXT_POSITION_PARTY
				tableContent += "</strong>";
				tableContent += "</div>";


				tableContent += "<div class='col col-10 order-4 col-md-5 order-md-4' role='columnheader'>";
				tableContent += "<strong>";					
				tableContent += TEXT_ANSWER_PARTY
				tableContent += "</strong>";
				tableContent += "</div>";				
			tableContent += "</div>"; // row header	

	for (i = 0; i <= (intParties-1); i++)
	{

		var partyNum=arSortParties[i];	// partyNum = sortierte Position im Endergebnis, z.B. "Neutrale Partei = 4. Partei in CSV" aber erste im Ergebnis = Nullter Wert im Array[0] = 4
		/*
		tableContent += " <tbody class='' id='resultsByPartyHeading"+i+"'>"
		tableContent += " <tr>"
		tableContent += "  <td colspan='2'>"
		tableContent += "  &nbsp; </td>"
		tableContent += "  <th colspan='2' scope='col' >"
		*/
		
//		tableContent += "<div class='row' id='resultsByPartyRow"+i+"' role='row'>";	// Hilfszeile für Textfilter
//			tableContent += "<div class='col'>";
		
		tableContent += "<span id='resultsByPartyHeading"+i+"' >";	// Hilfs-SPAN für Textfilter
		tableContent += "<div class='row border'  role='row'>";
				tableContent += "<div class='col col-2' role='cell'>";

				tableContent += "<img src='"+arPartyLogosImg[partyNum]+"' class='img-fluid rounded float-left' alt='Logo "+arPartyNamesLong[partyNum]+"' style='margin: 10px;' />"			
	
	//			tableContent += "<img src='"+arPartyLogosImg[partyNum]+"' width='"+intPartyLogosImgWidth+"' height='"+intPartyLogosImgHeight+"' class='rounded float-right' alt='"+arPartyNamesLong[partyNum]+"' style='margin-left: 10px;' />"
	//			tableContent += "<img src='"+arPartyLogosImg[partyNum]+"' class='rounded float-right' alt='Logo "+arPartyNamesLong[partyNum]+"' style='margin-left: 10px;' />"
	
				tableContent += "</div>";
				tableContent += "<div class='col col-10' role='cell'>";					
	//			tableContent += "<span style='font-weight: 600;'>"
				tableContent += "<strong>" 
				tableContent += arPartyNamesLong[partyNum];
				tableContent += "</strong>" 
	//			tableContent += "</span>" 
	
				tableContent += " (&#8663; <a href='"+arPartyInternet[partyNum]+"' target='_blank' title='"+arPartyNamesLong[partyNum]+"'>";		
				tableContent += arPartyNamesShort[partyNum];
				tableContent += "</a>)";
	
				// Beschreibung der Partei - falls in der CSV vorhanden.
				tableContent += "<p>"+arPartyDescription[partyNum]+"</p>"
	
				tableContent += "<button style='display:inline; float:right;' id='resultsByPartyAnswers"+i+"collapse' class='nonexpanded btn btn-sm btn-outline-secondary' type='button'>&#x2795;</button>";

		/*
		tableContent += "  </th>"
		tableContent += " </tr>"
		tableContent += " </tbody>"
		*/
				tableContent += "</div>"; // end: col-12 - Überschrift Partei 
			tableContent += "</div>"; // end: row - Überschrift Partei
		tableContent += "</span>"; // end: SPAN - Überschrift Partei


					
		jStart = partyNum * intQuestions // z.B. Citronen Partei = 3. Partei im Array[2] = 2 * 5 Fragen = 10
		jEnd = jStart + intQuestions -1	// 10 + 5 Fragen -1 = 14

//		tableContent += "<tbody id='resultsByPartyAnswersToQuestion"+i+"'>";
		tableContent += "<span id='resultsByPartyAnswersToQuestion"+i+"'> ";	// Hilfs-SPAN für Textfilter
		tableContent += "<div class='row border rounded'> ";
			tableContent += "<div class='col'>"
					

		// Anzeige der Partei-Antworten
		for (j = jStart; j <= jEnd; j++)
		{

			// Zelle - Frage
			modulo = j % intQuestions // z.B. arPartyPositions[11] % 5 Fragen = 1 -> arQuestionsShort[1] = 2. Frage		
			// tableContent += " <tr>"
			// tableContent += "  <td class='align-text-top'>"
			tableContent += " <div class='row mow-row-striped' role='row'> ";
				tableContent += " <div class='col col-10 order-2 col-md-5 order-md-1' role='cell'> ";
				tableContent += " "+(modulo+1)+". <strong>"+arQuestionsShort[modulo]+"</strong> - "+arQuestionsLong[modulo]+ " "
			// tableContent += "  </td>"
				tableContent += "  </div>" // end col-5 Frage


			// Zelle - Icon für eigene eigene Meinung
			var positionButton = fnTransformPositionToButton(arPersonalPositions[modulo]);
			var positionIcon = fnTransformPositionToIcon(arPersonalPositions[modulo]);
			var positionText  = fnTransformPositionToText(arPersonalPositions[modulo]);

			// tableContent += "<td style='text-align:center; width:10%;'>";
			tableContent += " <div class='col col-2 order-1 col-md-1 order-md-2' role='cell'> ";
			
				// tableContent += "<button type='button' "+
				tableContent += "<button type='button' id='' "+
											" class='btn "+positionButton+" btn-sm selfPosition"+modulo+" '  "+ 
											" onclick='fnToggleSelfPosition("+modulo+")' "+ 
											" alt='"+TEXT_ANSWER_USER+" : "+positionText+"' title='"+TEXT_ANSWER_USER+" : "+positionText+"'>"+
											" "+positionIcon+"</button>";
						
			// tableContent += "</td>";
			tableContent += " </div> ";


			// Zelle - Icons für Postion der Parteien
			var positionIcon = fnTransformPositionToIcon(arPartyPositions[j]);
			var positionButton = fnTransformPositionToButton(arPartyPositions[j]);
			var positionText  = fnTransformPositionToText(arPartyPositions[j]);

			// tableContent += "  <td style='text-align:center; width:10%;'>"
			tableContent += " <div class='col col-2 order-3 col-md-1 order-md-3' role='cell'> ";
				tableContent += "<button type='button' class='btn "+positionButton+" btn-sm' disabled "+
												" alt='"+TEXT_ANSWER_PARTY+" : "+positionText+"' title='"+TEXT_ANSWER_PARTY+" : "+positionText+"'>"+
												" "+positionIcon+"</button>";
			tableContent += "<span style='display:none;'>"+arPartyNamesShort[partyNum]+"</span>"	// Einfügen (Verstecken) des Parteinamens für Textfilter-Addon (siehe /EXTRAS)
			// tableContent += "  </td>"
			tableContent += " </div> ";
			
			// Zelle - Antwort der Partei
			tableContent += " <div class='col col-10 order-4 col-md-5 order-md-4' role='cell' headers='resultsByPartyHeading"+i+"' tabindex='0'> ";
			// tableContent += "  <td class='align-text-top' headers='resultsByPartyHeading"+i+"' tabindex='0'>"
			tableContent += " "+arPartyOpinions[j]
			// tableContent += "  </td>"
			tableContent += " </div> ";

			// tableContent += " </tr>"
			tableContent += " </div> "; // end: row Anzeige der Partei-Antworten

		} // end: for-j
		// tableContent += "</tbody>";
		tableContent += " </div> "; // end col 
	tableContent += " </div> "; // end row resultsByPartyAnswersToQuestion
	tableContent += " </span> "; // end span resultsByPartyAnswersToQuestion

//		tableContent += " </div> "; // end col 
//	tableContent += " </div> "; // end row resultsByPartyRow

		
	} // end: for-i (intParties)
	
	// tableContent += "</table>";
		tableContent += " </div> "; // end col 
	tableContent += " </div> "; // end row resultsByPartyTable

	
	// Daten in Browser schreiben
	$("#resultsByParty").append(tableContent);

	// und am Anfang Tabelle ausblenden
	$("#resultsByParty").hide();

	for (let i = 0; i <= (intParties-1); i++)
	{

		$("#resultsByPartyHeading"+i+" .nonexpanded").click(function() {
		var $this = $(this);
		$("#resultsByPartyAnswersToQuestion"+i+"").toggle(500)
		
			$this.toggleClass("expanded");
		
			if ($this.hasClass("expanded")) {
				$this.html("&#x2796;"); // MINUS
			} else {
				$this.html("&#x2795;"); // PLUS
			}
		});
	
	// am Anfang die Antworten ausblenden
//		$("#resultsByPartyAnswersToQuestion"+i).fadeOut(500);	// irgendwie verrutschen die Zeilen bei fadeOut() -> deshalb die css()-Lösung 
	$("#resultsByPartyAnswersToQuestion"+i+"").css("display","none")

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

