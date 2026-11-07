"use strict" 

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

// GLOBAL VARIABLES

const version = "0.7.00.2026mmdd"


/* JSON-data of questions from GENERAL.JS / fnQuestionsArrayToJSON()
	Example CSV: 
		"Farbe";"Die beste Fruchtfarbe ist gelb."
		"Form";"Die beste Fruchtform ist rund."
		
	turns into array:
		[0][0] = "Farbe" [0][1] = "Die beste Fruchtfarbe ist gelb."
		[1][0] = "Form"  [1][1] = "Die beste Fruchtform ist rund."
		
	to be turned into JSON-format:
		objQuestions["q0"].short = "Farbe" objQuestions.q0.long = "Die beste Fruchtfarbe ist gelb."
		objQuestions.q1.short = "Form"     objQuestions["q1"].long = "Die beste Fruchtform ist rund."

		objQuestions.q0.moreInfoText = "Hier ist eine Erklärung ..."
		objQuestions.q0.moreInfoStart = 20

*/

let objQuestions = {}


/* JSON / Object-data of candidate-information and candidate-answers from GENERAL.JS / fnPartiesArrayToJSON()
	Example CSV: 
		Partei_kurz:;"APPD"
		Partei_lang:;"Appelpartei Deutschlands"
		...
		-1;"Gelb ist keine schöne Farbe. Rot ist viel besser!"
		1;"Runde Früchte sind am besten!"
		...
		
	turns into array:
		[0][1] = "APPD"
		[1][1] = "Appelpartei Deutschlands"
		...
		[5][0] = "-1"  [5][1] = "Gelb ist keine schöne Farbe. Rot ist viel besser!"
		[6][0] =  "1"  [6][1] = "Runde Früchte sind am besten!"
		...	

	to be turned into JSON-format:
		objCandidates.c0.short = "APPD"
		objCandidates.c0.long = "Appelpartei Deutschlands"
		objCandidates.c0.points = 2.5
		...
		objCandidates.c0.answers.a0.short = -1
		objCandidates.c0.answers.a0.long = "Gelb ist keine schöne Farbe. Rot ist viel besser!"
		objCandidates.c0.answers.a0.points = 0.5
		...
		objCandidates.c0.answers.a1.short = 1
		objCandidates.c0.answers.a1.long = "Runde Früchte sind am besten!"
		objCandidates.c0.answers.a1.points = 2	
*/ 
let objCandidates = {}


// Number of candidates calculated together with "objCandidates"
let intCandidates = 0


// Array of the person's answers to the candidate's-questions 
// Example: [1, 0, -1, 99] = yes, neutral, no, skip 
let arPersonalAnswers = []


// Array of the person's important (double) answers to the candidate's-questions 
// Example: [1, 1.5, 2, 3, 0] = normal, very much (but not double), double, very much and double, skip
let arPersonalMultiplier = []
