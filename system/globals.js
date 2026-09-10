"use strict" 

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

// GLOBAL VARIABLES

const version = "0.7.xx"

/* JSON-data of questions from GENERAL.JS / fnQuestionsArrayToJSON()
   Example: 
	objQuestions["q0"].short = "Farbe" 
	objQuestions.q0.long = "Die beste Fruchtfarbe ist gelb."
*/
let objQuestions = {}

/* JSON-data of candidate-information and candidate-answers from GENERAL.JS / fnPartiesArrayToJSON()
   Example:
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
// Example: [1, 0, 99, , -1] = yes, neutral, skip, empty, no
let arPersonalAnswers = []

// Array of the person's double answers to the candidate's-questions 
// Example: [1, 1, 0, , 2] = normal, normal, skip, skip, double
let arPersonalMultiplier = []

// JSON-data of the person's answers to the candidate's-questions 
// let objPersonalAnswers = {}


// Array of party-IDs and their calculated points.
// This array will be sorted by points and used for the order of results.
// let arPartiesSortedByPoints = []

