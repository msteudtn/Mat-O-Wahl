"use strict" 

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

// GLOBAL VARIABLES

const version = "0.7.xx"

// JSON-data of questions from GENERAL.JS / fnQuestionsArrayToJSON()
let objQuestions = {}

// JSON-data of candidate-information and candidate-answers from GENERAL.JS / fnPartiesArrayToJSON()
let objCandidates = {}

// Number of parties calculated together with "jsonParties"
let intCandidates = 0

// Array of the person's answers to the party-questions 
let arPersonalAnswers = []

// Array of party-IDs and their calculated points.
// This array will be sorted by points and used for the order of results.
// let arPartiesSortedByPoints = []

