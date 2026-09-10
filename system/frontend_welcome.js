"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

	 // let size = Object.keys(objQuestions).length;
	 // console.log(size)


// Show the welcome screen with the description
function fnShowWelcomeScreen() {

	// Set the local texts on buttons and on the welcome screen
	document.getElementById("descriptionHeading1").innerHTML = descriptionHeading1
	document.getElementById("descriptionHeading2").innerHTML = descriptionHeading2
	document.getElementById("descriptionExplanation").innerHTML = descriptionExplanation
	document.getElementById("descriptionButtonStart").innerHTML = TEXT_START
	document.getElementById("footerImprint").innerHTML = TEXT_IMPRINT
	document.getElementById("footherRestart").innerHTML = TEXT_RESTART
	
	// If the variable "descriptionShowOnStart" is set to 0 in DEFINITION.JS, we skip the welcome screen by "clicking" on the start-button 
// ### !!! ***	
	if (descriptionShowOnStart == 1) {		
		document.getElementById("descriptionButtonStart").click()		
	} else {
		// nothing to do 
	}

} // end: fnShowWelcomeScreen()




/* *************************************************************************** */


// Hide the description on the start-page and show the questions instead.
// All elements are already in the DOM but only the display-state is changed.
// This function is called by CLICK on the welcome-screen button.
function fnHideMainDescriptionAndShowQuestions()
{
	// turn off description
//	document.getElementById("description").style.display = "none";
	document.getElementById("description").classList.toggle('fadingStop');

	// turn on the questions
//	document.getElementById("questions").style.display = "block";
	document.getElementById("questions").classList.toggle('fadingStop');

	/* ------------------------------------------------------------------- */	

	// <h1> heading over the summary of results (from DEFINITION.JS)
	document.getElementById("resultsHeading1").innerHTML = descriptionHeading1;

	// <h2> heading over the summary of results
	document.getElementById("resultsSummaryHeading").innerHTML = TEXT_RESULTS_HEADING_SHORT_SUMMARY

	// Run the TOGGLE-function to hide the results
//	fnToggleDiv("results", "buttonShowResults", 0)
//	fnToggleDiv("results", "descriptionButtonStart", 0)



	/* ------------------------------------------------------------------- */	

	// Description over the "table" of results by questions
	document.getElementById("resultsByQuestion_Description").innerHTML = TEXT_RESULTS_BY_QUESTION_DESCRIPTION

	// Column header for user's answer in: "table" of results by questions
	document.getElementById("resultsByQuestion_Header_User").innerHTML = TEXT_ANSWER_BY_USER

	// Column header for question and candidate's answer in "table" of results by questions
	document.getElementById("resultsByQuestion_Header_Candidate").innerHTML = TEXT_ANSWER_BY_CANDIDATE

	// While we're at it: Set some labels for later (from i18n)
	// Button to show QUESTIONS and the respective answers of the CANDIDATES
	const resultsButtonQuestions = document.getElementById("resultsButtonQuestions")
	resultsButtonQuestions.innerHTML = TEXT_RESULTS_BUTTON_QUESTIONS
	resultsButtonQuestions.title = TEXT_RESULTS_BUTTON_QUESTIONS

//	resultsButtonQuestions.onclick = function() { fnRemoveToggleClass("resultsByCandidate"); fnToggleDiv("resultsByQuestion", "resultsButtonQuestions", 0) }
	resultsButtonQuestions.onclick = function() { fnToggleDiv("resultsByQuestion", "resultsButtonQuestions", 0, "resultsByCandidate", "resultsButtonCandidates") }


	// Run the TOGGLE-function to hide the questions and candidate's answers
	fnToggleDiv("resultsByQuestion", "resultsButtonQuestions", 0)

	/* ------------------------------------------------------------------- */	

	// Description over the "table" of candidates and their questions
	document.getElementById("resultsByCandidate_Description").innerHTML = TEXT_RESULTS_BY_CANDIDATE_DESCRIPTION

	// Column header in "table" candidates and their answers -> word "question"
	document.getElementById("resultsByCandidate_Header_i18n_Question").innerHTML = TEXT_QUESTION

	// Column header in "table" candidates and their answers -> word "user's answer"
	document.getElementById("resultsByCandidate_Header_i18n_PersonalAnswer").innerHTML = TEXT_ANSWER_BY_USER

	// Column header in "table" candidates and their answers -> word "user's answer"
	document.getElementById("resultsByCandidate_Header_i18n_CandidateAnswer").innerHTML = TEXT_ANSWER_BY_CANDIDATE

	// Button to show CANDIDATES and their specific ANSWERS
	const resultsButtonCandidates = document.getElementById("resultsButtonCandidates")
	resultsButtonCandidates.innerHTML = TEXT_RESULTS_BUTTON_CANDIDATES
	resultsButtonCandidates.title = TEXT_RESULTS_BUTTON_CANDIDATES
//	resultsButtonCandidates.onclick = function() { fnRemoveToggleClass("resultsByQuestion"); fnToggleDiv("resultsByCandidate", "resultsButtonCandidates", 0) }
	resultsButtonCandidates.onclick = function() { fnToggleDiv("resultsByCandidate", "resultsButtonCandidates", 0, "resultsByQuestion", "resultsButtonQuestions") }

	// Run the TOGGLE-function to hide the candidates and their answers
	fnToggleDiv("resultsByCandidate", "resultsButtonCandidates", 0)


} // end: fnHideMainDescriptionAndShowQuestions
