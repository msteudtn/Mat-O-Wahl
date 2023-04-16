// general.js

// GENERAL.JS http://www.mat-o-wahl.de
// General functions / Allgemeine Verarbeitungen
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

import { fnReadCsv  } from './readCsv.js';
import { arVotingDouble, getParties, questionWeight } from './globals.js';
import {fnReEvaluate } from './output.js'

var version = "0.6.0.9.20230407"


// Auswertung (Berechnung)
// Gibt ein Array "arResults" zurück für fnEvaluationShort(), fnEvaluationByThesis(), fnEvaluationByParty() und fnReEvaluate();
// Aufruf am Ende aller Fragen in fnShowQuestionNumber() und beim Prüfen auf die "doppelte Wertung" in fnReEvaluate()


// TODO discuss the valuation 
export function fnEvaluation()
{

	// Abstimmungsknöpfe u.a. entfernen 
	$("#sectionDescription").empty().hide();
	$("#sectionShowQuestions").empty().hide();
	$("#sectionVotingButtons").empty().hide();	
	$("#sectionNavigation").empty().hide();
	
	$("#keepStats").hide();

	// Anzahl der Fragen bestimmen, da Positions-Array ein Vielfaches aus Fragen * Parteien enthält.
//	var numberOfQuestions = arQuestionsLong.length;		// 3 Fragen
//	var numberOfPositions = arPartyPositions.length; // 12 = 3 Fragen * 4 Parteien	
	var numberOfPositions = intQuestions * getParties(); // 12 = 3 Fragen * 4 Parteien

	var indexPartyInArray = -1; // Berechnung der Position des Index der aktuellen Partei
	var positionsMatch = 0;	// Zaehler fuer gemeinsame Positionen

	// var arResults = new Array();
	var arResults = []
//	for (i = 0; i <= (arPartyFiles.length-1); i++)
	for (let i = 0; i <= (getParties-1); i++)
	{
		arResults.push(0);	// Array mit leeren Werten füllen		
	}

	// Vergleichen der Positionen (= Fragen x Parteien)
	for (let i = 0; i <= (numberOfPositions-1); i++)
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

	return arResults;

}


// Senden der persoenlichen Ergebnisse an den Server (nach Einwilligung)
// Aufruf aus fnEvaluation()
export function fnSendResults(arResults, arPersonalPositions)
{
	// $.get(statsServer, { mowpersonal: strPersonalPositions, mowparties: strResults } );
	console.info("direkt schicken", statsServer, arPersonalPositions )
	return;
}


// Berechnet Prozentwerte
export function fnPercentage(value,max)
{
	var percent = value * 100 / max;
	percent = Math.round(percent);
	return percent; 
}


// v.0.3 NEU
// ersetzt die Position (-1, 0, 1) mit dem passenden Button
export function fnTransformPositionToButton(position)
{
	var tempShiftedPosition = position + 1; 
	return ["btn-danger","btn-default","btn-success"][tempShiftedPosition];
}

// v.0.3 NEU
// ersetzt die Position (-1, 0, 1) mit dem passenden Icon
export function fnTransformPositionToIcon(position)
{
	var tempShiftedPosition = position + 1; 
	return ["&#x2716;","&#x21B7;","&#x2714;"][tempShiftedPosition];
}

// ersetzt die Partei-Position (-1, 0, 1) mit der passenden Farbe
export function fnTransformPositionToColor(position)
{
	var tempShiftedPosition = position + 1; 
	return ["#d9534f","#c0c0c0","#5cb85c"][tempShiftedPosition];
	
}


// ersetzt die Partei-Position (-1, 0, 1) mit dem passenden Text
export function fnTransformPositionToText(position)
{
	var tempShiftedPosition = position + 1; 
	return ["[-]","[/]","[+]"][tempShiftedPosition];
	
}

// Gibt ein Bild/CSS-Klasse für den Balken in der Auswertung entsprechend der Prozentzahl Uebereinstimmung zurück
export function fnBarImage(percent)
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
export function fnToggleSelfPosition(questionNumber)
{
	console.error("fnToggleSelfPosition ist noch nicht angepasst")
	// alert("fnToggleSelfPosition ist noch nicht angepasst")
	// arPersonalPosition uses -1, 0, +1


	var temporaryShift = 1;
	var numberOfStatesForPersonalPosition = 3;
	var toggleStepSize = 1;
	tempShiftedPosition = arPersonalPositions[questionNumber] + temporaryShift;
	rotatedShiftedPosition = (tempShiftedPosition + toggleStepSize) % numberOfStatesForPersonalPosition;	
	console.log("old", arPersonalPositions[questionNumber])
	arPersonalPositions[questionNumber] = rotatedShiftedPosition -temporaryShift; 
	//arPersonalPositions[i]--; // was soll das sein?
	/*if (arPersonalPositions[i]==-2) 
		{arPersonalPositions[i]=99}
	if (arPersonalPositions[i]==98) 
		{arPersonalPositions[i]=1}
		*/
//	var positionImage = fnTransformPositionToImage(arPersonalPositions[i]);
	var positionButton = fnTransformPositionToButton(arPersonalPositions[questionNumber]);
	var positionIcon = fnTransformPositionToIcon(arPersonalPositions[questionNumber]);
	// var positionColor = fnTransformPositionToColor(arPersonalPositions[i]);
	var positionText  = fnTransformPositionToText(arPersonalPositions[questionNumber]);
	
	// $("#selfPosition"+i).attr("src", "img/"+positionImage);
	$(".selfPosition"+questionNumber).removeClass("btn-danger btn-warning btn-success btn-default").addClass(positionButton);
	$(".selfPosition"+questionNumber).html(positionIcon);
	$(".selfPosition"+questionNumber).attr("alt", positionText);
	$(".selfPosition"+questionNumber).attr("title", positionText);

	fnReEvaluate();
}

// 02/2015 BenKob (doppelte Wertung)
export function fnToggleDouble(questionNumber)
{
	// arVotingDouble[i]=!arVotingDouble[i];
	console.info('calling fnToggleDouble');

	questionWeight[questionNumber] = (questionWeight[questionNumber]+1 ) % 10
	$('#doubleIcon'+questionNumber)[0].innerText = questionWeight[questionNumber]
	fnReEvaluate();
}



// vanilla JavaScript FadeIn / FadeOut
// Modus = display: "none / block" ändern (0 = nein, 1 = ja)
export function fnFadeIn(el, time, modus) {

	// Default FadeIn / FadeOut-Time
	if (!time) {time = 500;}

	// Loading CSS 
	el.style.animation = "myFadeIn "+time+"ms 1"
	el.style.opacity = 1;

	if (modus == 1) {
		el.style.display = ""	
		el.style.visibility = ""
	}
}

// vanilla JavaScript FadeIn / FadeOut
// Modus = visibility show / hidden ändern (0 = nein, 1 = ja)
export function fnFadeOut(el, time, modus) {

	// Default FadeIn / FadeOut-Time
	if (!time) {time = 500;}

	// Loading CSS 
	el.style.animation = "myFadeOut "+time+"ms 1"
	el.style.opacity = 0;

	// hide element from DOM AFTER opacity is set to 0 (setTimeout)
	if (modus == 1) {
		window.setTimeout(function() {
			el.style.display = "none"	
			el.style.visibility = "hidden"			
		}, (time-50));		
	}
}
