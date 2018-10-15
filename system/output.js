// OUTPUT.JS von http://www.mat-o-wahl.de
// Ausgabe der Daten
// Lizenz: GPL 3
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
	$("#headingResults").empty();
	$("#resultsShort").empty();
	$("#resultsLong").empty();
	
	// Bereich - Footer
	$("#keepStatsQuestion").empty();
	
	//////////////////////////////////////////////////////////////////
	// TEXTE
	
	// Anzeige der Überschriften und Begleittexte
	$("#heading1").append("<h1>"+heading1+"</h1>")
	$("#heading2").append("<h2>"+heading2+"</h2>");			
	$("#explanation").append(explainingText);

	//////////////////////////////////////////////////////////////////
	// BUTTONS
	
	$("#votingPro").html("[&#x2714;] "+TEXT_VOTING_PRO)
	$("#votingNeutral").html("[&#x25EF;] "+TEXT_VOTING_NEUTRAL)
	$("#votingContra").html("[&#x2716;] "+TEXT_VOTING_CONTRA)
	$("#votingSkip").html("[&#x21B7;] "+TEXT_VOTING_SKIP)
	$("#votingDouble").html("[x2] "+TEXT_VOTING_DOUBLE)
	
	//////////////////////////////////////////////////////////////////
	// FOOTER

	// Wenn Datenschutzerklärung vorhanden UND Auswertung gewünscht ...
	if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
	{
		/// $("#keepStatsQuestion").append("Siehe <a href='http://"+imprintPrivacyUrl+"' target='_blank'>Datenschutzerkl&auml;rung.</a>");
		$("#keepStatsQuestion").append(TEXT_ALLOW_STATISTIC);		
//		$("#keepStatsCheckbox").attr("checked",true); // Zeile auskommentieren/aktivieren und OptIn erzwingen - bitte mit Bedacht benutzen.
		$("#keepStats").fadeIn(1000);
	}
	else
	{
		$("#keepStatsCheckbox").attr("checked",false);	// Falls jmd. bauernschlau in der INDEX.HTML checked="checked" eingetragen hat -> OptOut
	}

	// Impressum
	$("#imprint").html("[§] "+TEXT_IMPRINT);
	
	// Neustart / Wiederholung
	var jetzt = new Date();
	var sekunden = jetzt.getTime(); 
	$("#restart").attr("href","index.html?"+sekunden);
	$("#restart").html("[&#x21BB;] "+TEXT_RESTART);
	
	//////////////////////////////////////////////////////////////////
	// FRAGEN UND ANTWORTEN in Arrays einlesen
	// (a) Fragen 
	fnReadCsv("data/"+fileQuestions,fnShowQuestions)

	// (b) Antworten der Parteien 
	for (i = 0; i <= arPartyFiles.length-1; i++)
	{
		// Zeitversetzt starten, damit Reihenfolge auch garantiert stimmt. 500, 750, 1000, 1250ms, ... später
		window.setTimeout("fnReadCsv('data/"+arPartyFiles[i]+"',"+fnReadPositions+")",500+i*250);	
	}

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
		/*
		// v 0.3 - DEPRECATED - kein Kreisdiagramm mehr, sondern Bootstrap-Progressbar
		$("#headingContent").append("<p>")
			.append("<canvas id='pieChart' width='"+bodyTextSize+"' height='"+bodyTextSize+"'></canvas> ")
			.append("Frage "+(questionNumber+1)+"/"+arQuestionsLong.length)
			.append(" - "+arQuestionsShort[questionNumber])
			.append("</p>");
		*/
		
		// Bootstrap-Progressbar
		var percent = fnPercentage((questionNumber+1),arQuestionsLong.length);
		$("#progress-bar").width(percent+"%")

		$("#content").append("<strong>"+arQuestionsShort[questionNumber]+" </strong> - ");
		$("#content").append(""+arQuestionsLong[questionNumber]+"");

		// var percent = fnPercentage((questionNumber+1),arQuestionsLong.length);
		// fnCalculatePieChart(Math.floor(bodyTextSize/2),percent,"pieChart");
		
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
		// $("#imageVotingDouble").attr("src","img/double-no_icon.png");
		$("#votingDouble").removeClass( "btn-dark" ).addClass( "btn-outline-dark" );
	}
	
	// Alle Fragen durchgelaufen -> Auswertung
	else
	{
		arResults=fnEvaluation();
		
		//Parteien sortieren
		arSortParties=new Array();
		for (i = 0; i < arPartyFiles.length; i++)
			{
				arSortParties[i]=i;				
			}
		// Sortieren der Parteien nach Uebereinstimmung
		arSortParties.sort(function(a,b){return arResults[b]-arResults[a];});

		// Übergabe an Tabellen zur Darstellung/Ausgabe
		fnEvaluationShort(arResults);
		fnEvaluationLong(arResults);

//		$("#debug").append("<br /> i:"+i+" "+arSortParties+" <br />"+arResults)
	} 
	
}

// neu BenKob
function fnChangeVotingDouble()
{

	arVotingDouble[activeQuestion]=!(arVotingDouble[activeQuestion]);
	// strImgSrc = $("#imageVotingDouble").attr("src"); // vor Version 0.3: mit Bildern, statt Buttons
	strBtnSrc = $("#votingDouble").hasClass("btn-outline-dark");
	
	// if (strImgSrc == "img/double-no_icon.png") // vor Version 0.3: mit Bildern, statt Buttons
	if (strBtnSrc)
	// wenn vorher unwichtig -> jetzt doppelt werten
	{
		// $("#imageVotingDouble").attr("src","img/double-yes_icon.png");
		$("#votingDouble").removeClass( "btn-outline-dark" ).addClass( "btn-dark" );
		$("#jumpToQuestionNr"+(activeQuestion+1)+"").css("font-weight","bold");
	}
	// wenn vorher wichtig -> jetzt wieder auf normal setzen
	else
	{
		// $("#imageVotingDouble").attr("src","img/double-no_icon.png");
		$("#votingDouble").removeClass( "btn-dark" ).addClass( "btn-outline-dark" );
		$("#jumpToQuestionNr"+(activeQuestion+1)+"").css("font-weight","normal");
	}

}

// Springe zu Frage Nummer XY (wird in fnShowQuestionNumber() aufgerufen)
function fnJumpToQuestionNumber(questionNumber)
{
	// alten Inhalt ausblenden und loeschen
	$("#jumpToQuestion").fadeOut(500).empty().hide();

	// "Mittelfarbe" aus Hintergrund und Text bestimmen.
	// var middleColor = fnCreateMiddleColor(); // -> 0.2.4.1 DEPRECATED -> built in CSS ODD

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
		tableContent += "<td align='center' id='jumpToQuestionNr"+i+"' title='"+arQuestionsShort[(i-1)]+"'>"; 
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

// Anzeige der Ergebnisse - zusammengefasst (Prozentwerte)
// Array arResults kommt von fnEvaluation
function fnEvaluationShort(arResults)
{
	// Alten Inhalt des DIVs loeschen
	$("#heading2").empty().hide();	
	$("#content").empty().hide();
	
	// Anzeige der Ergebnisse
	$("#heading2").append("<h2>"+TEXT_RESULTS_MATCHES_GENERAL+"</h2>").fadeIn(500);

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
	var tableContent = "<table width='100%'>"	
	
	for (i = 0; i <= (arPartyFiles.length-1); i++)
	{
		var partyNum=arSortParties[i];
		var percent = fnPercentage(arResults[partyNum],maxPoints)

//		var barImage = fnBarImage(percent);
		
		tableContent += "<tr>"

//			v.0.3 DEPRECATED - ab nun gleich alle Parteien anzeigen und keine Auswahl mehr zulassen
/*
		tableContent += "<td>"
//			tableContent += "<input type='checkbox' id='party"+partyNum+"' name='party"+partyNum+"' value='"+partyNum+"' /> "
			tableContent += "<input type='checkbox' name='party"+partyNum+"' id='party"+partyNum+"' onclick='fnStartToggleTableRow("+numberOfQuestions+")' value='0' /> "
		tableContent += "</td>"
*/

		tableContent += "<td width='20%'>"
			tableContent += "<img src='data/"+arPartyLogosImg[partyNum]+"' width='"+intPartyLogosImgWidth+"' height='"+intPartyLogosImgHeight+"' alt='"+arPartyNamesLong[partyNum]+"' title='"+arPartyNamesLong[partyNum]+"' /> "
		tableContent += "</td>"
		
		tableContent += "<td width='30%'>"
			tableContent += "<a href='http://"+arPartyInternet[partyNum]+"' target='_blank' title='"+arPartyNamesLong[partyNum]+"'>";		
			tableContent += arPartyNamesShort[partyNum];
			tableContent += "</a>";
		tableContent += "</td>"
		
		tableContent += "<td width='10%'>"
			tableContent += "<span id='partyPoints"+partyNum+"'>"+arResults[partyNum]+"/"+maxPoints+"</span>"
		tableContent += "</td>"
/*
		tableContent += "<td width='105'>"
			tableContent += " <img id='partyBar"+partyNum+"' src='img/"+barImage+"' height='12' width='"+percent+"' alt='"+percent+"%' title='"+percent+"%' border='1' />"
		tableContent += "</td>"
*/
		tableContent += "<td width='40%'>"
			tableContent += "<div class='progress'>"
			tableContent += "	<div class='progress-bar' role='progressbar' id='partyBar"+partyNum+"' style='width:"+percent+"%'>"+percent+"%</div> "
			tableContent += "</div>"
		tableContent += "</td>"

		tableContent += "</tr>";
	
	} // end for

	// $("#resultsShort").append("<p id='resultsShortToggle'>&nbsp; <b style='font-size:150%'>&#10551;</b> <a>Details</a> f&uuml;r oben ausgew&auml;hlte Parteien <a>ein-/ausblenden</a>.</p>");

	// Anzeigen der detaillierten Tabelle
	tableContent += "</table>";

	/*
	tableContent += "<button type='button' class='btn btn-secondary btn-lg btn-block' id='resultsShortToggle'>"
	tableContent += "Detaillierte Auswertung ein-/ausblenden.";
	tableContent += "</button>"
	*/

	// Daten in Browser schreiben
	$("#resultsShort").append(tableContent).fadeIn(750); 

	// Funktion zur Berechnung der "Doppelten Wertung" aufrufen 
	// -> enthält Aufruf für farbliche Progressbar (muss hier ja nicht extra wiederholt werden)
	fnReEvaluate()
	
	// Anzeigen der detaillierten Ergebnisse
	/*
	$("#resultsShortToggle").click(function () { 
		// fnStartToggleTableRow(numberOfQuestions);
		$("#resultsLong").toggle(500);
	});
	*/
}


// Anzeige der Ergebnisse - detailliert
// Array arResults kommt von fnEvaluation
function fnEvaluationLong(arResults)
{
	// $("#resultsLong").hide();

	var tableContent = "";

	tableContent += "<h2>"+TEXT_RESULTS_MATCHES_DETAILS+"</h2>";	

	tableContent += " <p>"+TEXT_RESULTS_MATCHES_DETAILS_INFO+"</p>";

	
	tableContent += "<table width='100%'>";
		
	// Kopfzeile der Tabelle
	
	// v.0.3. DEPRECATED
	/*
	tableContent += "<tr>";
	for (i = -2; i <= (arPartyFiles.length-1); i++)
	{
		if (i == -2)
		{ var picName = ""; }	// erste Zelle
		else if (i == -1)
		{ var picName = "Sie"; }	// zweite Zelle
		else
		{
			var partyNum=arSortParties[i];
			var picName = "<img src='data/"+arPartyLogosImg[partyNum]+"' width='"+intPartyLogosImgWidth+"' height='"+intPartyLogosImgHeight+"' alt='"+arPartyNamesLong[partyNum]+"' title='"+arPartyNamesLong[partyNum]+"' /> ";
		}
		
		tableContent += "<th id='partyNameCell"+partyNum+"'>";
			tableContent += picName; 
		tableContent += "</th>";
	}
	tableContent += "</tr>";
	*/
	
	// v.0.3 NEU: nur noch zwei Spalten
	tableContent += "<tr>";
	tableContent += " <th> </th>"; 
	tableContent += " <th>"+TEXT_RESULTS_MATCHES_DETAILS_TABLE+"</th>";
	tableContent += "</tr>";

	// Inhalt
	// var cellId = -1;	// cellId ist für das Ausblenden der Spalten wichtig.
	for (i = 0; i <= (arQuestionsLong.length-1); i++)
	{
		var positionImage = fnTransformPositionToImage(arPersonalPositions[i]);
		var positionColor = fnTransformPositionToColor(arPersonalPositions[i]);	// eigene Meinung - wird unten auch wieder genutzt als Rahmen für Parteipositionsbild
		var positionText  = fnTransformPositionToText(arPersonalPositions[i]);
		
		// zu überarbeiten! -> Änderung von 0.2.3.2 auf 0.2.4
		// Brauche ich die noch, da die cellId sowieso berechnet wird?
		// cellId++;	// erste Spalte - Beschreibung
		// cellId++;	// zweite Spalte - eignene Meinung 1/0/-1

		tableContent += "<tr>";
		
			// 1. Spalte: eigene Meinung + doppelte Wertung
			tableContent += "<td align='center'><nobr>";
				tableContent += "<img src='img/"+positionImage+
						"' height='20' width='20' id='selfPosition"+i+
						"' class='positionRow"+i+
						"' onclick='fnToggleSelfPosition("+i+")' alt='"+positionText+
						"' title='"+positionText+"' style='cursor:pointer;' /> ";
				if (arVotingDouble[i])
				{
				tableContent += "<img src='img/double-yes_icon.png"+
						"' height='20' width='20' id='doubleIcon"+i+
						"' onclick='fnToggleDouble("+i+")' style='cursor:pointer;' title='Frage wird doppelt gewertet' />";
				}
				else			
				{
				tableContent += "<img src='img/double-no_icon.png"+
						"' height='20' width='20' id='doubleIcon"+i+
						"' onclick='fnToggleDouble("+i+")' style='cursor:pointer;' title='Frage wird einfach gewertet' />";
				}
				
			tableContent += "</nobr></td>";

			// 2. Spalte: Frage (kurz und lang)
			tableContent += "<td id='resultsLongQuestion"+i+"'>";
				tableContent += "<strong>"+arQuestionsShort[i]+"</strong>: ";
				tableContent += arQuestionsLong[i];
			tableContent += "</td>";			
			
			// var multiplier = arPartyFiles.length + 2; 

			// v.0.3 DEPRECATED		
			/*
			// 3. bis n. Spalte - Parteipositionen anzeigen
			for (j = 0; j <= (arPartyFiles.length-1); j++)
			{
				var partyNum=arSortParties[j];
				// cellId++; /// VER 0.2.3.2
				var cellId = partyNum + 2 + (i * multiplier);
				var partyPositionsRow = partyNum * arQuestionsLong.length + i;
				var positionImage = fnTransformPositionToImage(arPartyPositions[partyPositionsRow]);
                                var positionText = fnTransformPositionToText(arPartyPositions[partyPositionsRow]);

				// Inhalt der Zelle
				tableContent += "<td title='" + arPartyNamesShort[partyNum] + ": " + positionText + ( arPartyOpinions[partyPositionsRow] === "" ? "" : ": " + arPartyOpinions[partyPositionsRow] ) + "' align='center' id='partyPositionCell" + cellId + "'>";

// VER 0.2.1 			tableContent += "<td title='"+arPartyNamesShort[j]+": "+arPartyOpinions[partyPositionsRow]+"' align='center' id='partyPositionCell"+cellId+"'>";
					tableContent += "<img class='positionRow"+i+
							"' src='img/"+positionImage+
							"' height='20' width='20' alt='"+arPartyOpinions[partyPositionsRow]+
							"' style='border:1px solid "+positionColor+"' />";
				tableContent += " </td>";
			}
			*/

		tableContent += "</tr> ";

		// v.0.3 Parteiantworten gleich unter der Frage anzeigen
		tableContent += "<tr id='resultsLongAnswersToQuestion"+i+"'> ";
		tableContent += " <td> </td> ";
		tableContent += " <td>";
		// darunterliegende Zeile - Parteipositionen anzeigen
			for (j = 0; j <= (arPartyFiles.length-1); j++)
			{
				var partyNum=arSortParties[j];
				// cellId++; /// VER 0.2.3.2
				// var cellId = partyNum + 2 + (i * multiplier);
				var partyPositionsRow = partyNum * arQuestionsLong.length + i;
				var positionImage = fnTransformPositionToImage(arPartyPositions[partyPositionsRow]);
                                var positionText = fnTransformPositionToText(arPartyPositions[partyPositionsRow]);

				// Inhalt der Zelle
				tableContent += "<p>"
				tableContent += "<img class='positionRow"+i+
							"' src='img/"+positionImage+
							"' height='20' width='20' alt='"+arPartyOpinions[partyPositionsRow]+
							"' style='border:1px solid "+positionColor+"' /> ";
				tableContent += "<strong>" + arPartyNamesShort[partyNum] + "</strong>: " + positionText + ( arPartyOpinions[partyPositionsRow] === "" ? "" : ": " + arPartyOpinions[partyPositionsRow] ) + " ";
				tableContent += "</p>";
			}
		tableContent += "</td> </tr> ";

	/*
		tableContent += "<tr> ";
				tableContent += "<td style='font-size:80%;'>";
					tableContent += "<strong>Hinweis:</strong> Eigene Position und Wertung noch mal ändern? Einfach in der Spalte das Symbol anklicken! ";
				tableContent += "</td>";
				tableContent += "<td style='font-size:150%; font-weight:bold;'>";
					tableContent += " &#10550; &#10550; ";
				tableContent += "</td>";
		tableContent += "</tr> ";
	*/

		
	} // end if
		
	tableContent += "</table>";
	
	// Daten in Browser schreiben
	$("#resultsLong").append(tableContent);
	
	
	// Click-Funktion auf FRAGE-(und ANTWORT)-Zeile legen zum Anzeigen der ANTWORT-Zeile (direkt darunter)
	// "[In a FOR-loop] you can use the let keyword, which makes the i variable local to the loop instead of global"
	// 	https://stackoverflow.com/questions/4091765/assign-click-handlers-in-for-loop
	for (let i = 0; i <= (arQuestionsLong.length-1); i++)
	{
		$("#resultsLongQuestion"+i).click(function () { 
				$("#resultsLongAnswersToQuestion"+i).toggle(500);
			});	

		$("#resultsLongAnswersToQuestion"+i).click(function () { 
				$("#resultsLongAnswersToQuestion"+i).toggle(500);
			});	
		
		$("#resultsLongAnswersToQuestion"+i).fadeOut(500);
	}

	

	
	// 0.2.4.1 DEPRECATED -> built in CSS ODD
	// var middleColor = fnCreateMiddleColor()
	// $("tr:odd").css("background-color", middleColor);


	// 0.3. DEPRECATED -> raus. Es werden nun sofort alle Parteien angezeigt
	/*
	// Markieren der ersten XY Parteien in der SHORT-Tabelle und Verstecken der übrigen Spalten in der LONG-Tabelle
	if (intPartyDefaultShow <= 0)
	{ intPartyDefaultShow = arPartyFiles.length; }
	 
	// erste XY Parteien markieren
	for (i = 0; i <= (intPartyDefaultShow - 1); i++)
	{
		$("#party"+arSortParties[i]+"").attr("checked",true);		
	}
	
	// restliche Parteien nicht markieren - eigentlich sinnlos :-/
	for (i = intPartyDefaultShow; i <= (arPartyFiles.length - 1); i++)
	{
		$("#party"+arSortParties[i]+"").attr("checked",false);
	}
	*/
	
	
} // end function


// neu BenKob
function fnReEvaluate()
{
	//Ergebniss neu auswerten und Anzeige aktualisieren
	arResults=fnEvaluation();
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
	if(maxPoints==0)
		{maxPoints=1};
	for (i = 0; i <= (arPartyFiles.length-1); i++)
	{
		var percent = fnPercentage(arResults[i],maxPoints)
		
		// bis v.0.3 mit PNG-Bildern, danach mit farblicher Bootstrap-Progressbar
		var barImage = fnBarImage(percent);
		
		// v.0.3 DEPRECATED - ersetzt durch Bootstrap-Progressbar
		/*	
		$("#partyBar"+i).attr("src","img/"+barImage);
		$("#partyBar"+i).attr("width",percent);
		$("#partyBar"+i).attr("alt",percent+"%");
		$("#partyBar"+i).attr("title",percent+"%");
		*/
		
		// neu ab v.0.3 - Bootstrap-Progressbar
		$("#partyBar"+i).width(percent+"%")
		$("#partyBar"+i).text(percent+"%");
		$("#partyBar"+i).removeClass("bg-success bg-warning bg-danger").addClass(barImage);

		$("#partyPoints"+i).html(arResults[i]+"/"+maxPoints);

	}

}
