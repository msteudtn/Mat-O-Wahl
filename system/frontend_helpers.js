"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

/* *************************************************************************** */

function fnShowWelcomeScreenAndSetLocalTexts() {

	// Set new meta-tags in the head. - This might not have any effect on some systems. :(
	document.title = my_o_mat+ " - " +descriptionHeading1;
	document.querySelector('meta[name=language]').setAttribute("content", language);
	document.querySelector('meta[name=Content-Language]').setAttribute("content", language);
	document.querySelector('meta[name=description]').setAttribute("content",  my_o_mat+ " - " +descriptionHeading1+" "+descriptionHeading2);

	// Set the local texts on buttons and on the welcome screen
	document.getElementById("descriptionHeading1").innerHTML = descriptionHeading1
	document.getElementById("descriptionHeading2").innerHTML = descriptionHeading2
	document.getElementById("descriptionExplanation").innerHTML = descriptionExplanation
	document.getElementById("descriptionButtonStart").innerHTML = TEXT_START

	// Buttons in the Footer
	const footer_buttonImprint = document.getElementById("footer_buttonImprint")
	footer_buttonImprint.innerHTML = TEXT_IMPRINT
	footer_buttonImprint.setAttribute("aria-label", TEXT_IMPRINT)

	const footer_buttonShare = document.getElementById("footer_buttonShare")
	footer_buttonShare.innerHTML = TEXT_SHARE
	footer_buttonShare.setAttribute("aria-label", TEXT_SHARE)

	const footer_buttonShare_clipboard = document.getElementById("footer_buttonShare_clipboard")
	footer_buttonShare_clipboard.innerHTML = TEXT_SHARE_CLIPBOARD
	footer_buttonShare_clipboard.setAttribute("aria-label", TEXT_SHARE_CLIPBOARD)

	const footer_buttonShare_email = document.getElementById("footer_buttonShare_email")
	footer_buttonShare_email.innerHTML = TEXT_SHARE_EMAIL
	footer_buttonShare_email.setAttribute("aria-label", TEXT_SHARE_EMAIL)

	const footer_buttonRestart = document.getElementById("footer_buttonRestart")
	footer_buttonRestart.innerHTML = TEXT_RESTART
	footer_buttonRestart.setAttribute("aria-label", TEXT_RESTART)

	const footer_buttons_scrollToTop = document.getElementById("footer_button_scrollToTop")
	footer_buttons_scrollToTop.innerHTML = TEXT_SCROLL_TO_TOP
	footer_buttons_scrollToTop.setAttribute("aria-label", TEXT_SCROLL_TO_TOP)

	// Set the share-button for email with the current link. The clipboard-button is already set in INDEX.html
	fnShareResults("email")

	
	// <h1> heading over the summary of results (from DEFINITION.JS)
	document.getElementById("results_all_heading1").innerHTML = descriptionHeading1;

	// <h2> heading over the summary of results
	document.getElementById("results_all_heading2").innerHTML = TEXT_RESULTS_HEADING_SHORT_SUMMARY
	

	// Description over the "table" of results by questions
	document.getElementById("results_byQuestion_Description").innerHTML = TEXT_RESULTS_BY_QUESTION_DESCRIPTION

	// Column header for user's answer in: "table" of results by questions
	document.getElementById("results_byQuestion_Header_User").innerHTML = TEXT_ANSWER_BY_USER

	// Column header for question and candidate's answer in "table" of results by questions
	document.getElementById("results_byQuestion_Header_Candidate").innerHTML = TEXT_ANSWER_BY_CANDIDATE

	// Button to show QUESTIONS and the respective answers of the CANDIDATES
	const resultsButtonQuestions = document.getElementById("results_byX_buttonFor_byQuestions")
	resultsButtonQuestions.title = TEXT_RESULTS_BUTTON_QUESTIONS
	
	const resultsButtonQuestionsText = document.getElementById("results_byX_buttonFor_byQuestions_text")
	resultsButtonQuestionsText.innerHTML = "&nbsp;"+TEXT_RESULTS_BUTTON_QUESTIONS

	// Button to show CANDIDATES and their specific ANSWERS
	const resultsButtonCandidates = document.getElementById("results_byX_ButtonFor_ByCandidates")
	resultsButtonCandidates.title = TEXT_RESULTS_BUTTON_CANDIDATES

	const resultsButtonCandidatesText = document.getElementById("results_byX_buttonFor_byCandidates_text")
	resultsButtonCandidatesText.innerHTML = "&nbsp;"+TEXT_RESULTS_BUTTON_CANDIDATES


	// Description over the "table" of candidates and their questions
	document.getElementById("results_byCandidate_Description").innerHTML = TEXT_RESULTS_BY_CANDIDATE_DESCRIPTION

	/* ------------------------------------------------------------------- */

	// If there's a parameter "myAnswers" in the URL, we'll use this for the global "arPersonalAnswers[]" and skip the questions.
	const urlParams = new URLSearchParams(window.location.search);
	const myAnswersString = urlParams.get("myAnswers");
	const myMultipliersString = urlParams.get("myMultiplier");

	// Check, if the string from URL exists and is larger than an empty array "[]" of 2 characters
	if (myAnswersString) {
		if (myAnswersString.length > 2) { 

			// Convert the string into an array
			arPersonalAnswers = JSON.parse(myAnswersString);
			arPersonalMultiplier = JSON.parse(myMultipliersString);

			// Change the original description with the text from i18n.
			document.getElementById("descriptionExplanation").innerHTML = TEXT_SHARED_RESULTS

			// Always show the description on start, even if it was set to 0 in DEFINITION.JS
			// This buys us some time to load the CSV-files while the the user is busy reading.
			descriptionShowOnStart = 1

			// Hide the questions. Otherwise they would toggle to "show" when clicking on "descriptionButtonStart"
			document.getElementById("questions").style.display = "none"

			// Put two functions on the start-button.
			// 1. Run fnEvaluation() at least on the first (0) question to populate all the results-DIVs. 
			// 2. Run fnHideQuestionsAndShowResults(). Usually this would hide the <div> "questions" and show the <div> "results". 
			//    However, since the "questions" are hidden at the beginning, they would toggle to show first. Luckily we've set it to "display:none", before.
//			document.getElementById("descriptionButtonStart").onclick = function() { fnEvaluation(0, arPersonalAnswers[0], arPersonalMultiplier[0]	); fnHideQuestionsAndShowResults("noStatistics") }

			document.getElementById("descriptionButtonStart").onclick = function() { fnEvaluationAllAnswers(); fnHideQuestionsAndShowResults("noStatistics") }
		}
	}

	/* ------------------------------------------------------------------- */

	// If the variable "descriptionShowOnStart" is set to 0 in DEFINITION.JS, we skip the welcome screen by "clicking" on the start-button to toggle ("collapse" the relevant <div>s
	if (descriptionShowOnStart == 0) {		
		document.getElementById("descriptionButtonStart").click()
	} else {
		// nothing to do 
	}


	
} // end: fnShowWelcomeScreenAndSetLocalTexts()

/* *************************************************************************** */



// 0. Create all necessary <div>s to show the results.
function fnCreateResults(arCandidatesSortedByPoints, intMaxPoints) {

	// 1. Create the general OVERVIEW of the results.
	// (Short and long name of candidate, progress-bar, percentage, description.)
	fnCreateResults_Overview(arCandidatesSortedByPoints, intMaxPoints)

	// 2. Create the comparison of QUESTIONS and the respective candidate's answers.
	fnCreateResults_QuestionsAndAnswers(arCandidatesSortedByPoints)

	// 3. Show all the CANDIDATE'S answers and the user's answer
	fnCreateResults_CandidatesAndAnswers(arCandidatesSortedByPoints)

	// Clear the DOM from unused data, especially <!-- comments in HTML -->
	fnClearCommentsFromDom(document.body)

} // end: fnCreateResults()



/* *************************************************************************** */

// Change the importance (intMultiplier) of the PRO and CONTRA buttons if DOUBLE has been clicked in the QUESTIONS
function fnChangeButtonDouble(intCurrentQuestion, intMultiplier) {

	const buttonVotingProExtra = document.getElementById("votingProExtra-"+intCurrentQuestion)
	const buttonVotingPro = document.getElementById("votingPro-"+intCurrentQuestion)
	const buttonVotingNeutral = document.getElementById("votingNeutral-"+intCurrentQuestion)
	const buttonVotingContra = document.getElementById("votingContra-"+intCurrentQuestion)
	const buttonVotingContraExtra = document.getElementById("votingContraExtra-"+intCurrentQuestion)
	const buttonVotingDouble = document.getElementById("votingDouble-"+intCurrentQuestion)
	
	let cssClassToAdd = ""
	let cssClassToRemove = ""
	let ariaPressedState = ""

	/* ------------------------------------------------------------------- */

	// Check, if the button has been activated = CSS class "btn-dark" exists -> Activate / Reset to normal counting
	if(buttonVotingDouble.classList.contains('btn-dark')) {
		cssClassToAdd = "btn-outline-dark"
		cssClassToRemove = "btn-dark"
		ariaPressedState = "false"
		intMultiplier = 1
	}
	// Button has not been clicked or was reset -> Activate double counting
	else {
		cssClassToAdd = "btn-dark"
		cssClassToRemove = "btn-outline-dark"
		ariaPressedState = "true"
		intMultiplier = 2
	}

	/* ------------------------------------------------------------------- */

	// Add / remove DARK-class and OUTLINE-class on DOUBLE-button
	buttonVotingDouble.classList.add(cssClassToAdd)
	buttonVotingDouble.classList.remove(cssClassToRemove)
	buttonVotingDouble.setAttribute("aria-pressed", ariaPressedState)

	// Change intMultiplier (from 1 to 3 or from 3 to 1) on PRO-EXTRA-button 
	buttonVotingProExtra.removeAttribute("onclick")
	buttonVotingProExtra.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, 1, ( intMultiplier + 1) ) }
	
	// Change intMultiplier (from 1 to 2 or from 2 to 1) on PRO-button 
	buttonVotingPro.removeAttribute("onclick")
	buttonVotingPro.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, 1, intMultiplier) }

	// Change intMultiplier (from 1 to 2 or from 2 to 1) on NEUTRAL-button 
	buttonVotingNeutral.removeAttribute("onclick")
	buttonVotingNeutral.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, 0, intMultiplier) }
	
	// Change intMultiplier (from 1 to 2 or from 2 to 1) on CONTRA-button 
	buttonVotingContra.removeAttribute("onclick")
	buttonVotingContra.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, -1, intMultiplier) } 

	// Change intMultiplier (from 1 to 2 or from 2 to 1) on CONTRA-EXTRA-button 
	buttonVotingContraExtra.removeAttribute("onclick")
	buttonVotingContraExtra.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, -1, ( intMultiplier + 1) ) } 

} // end: fnChangeButtonDouble()


/* *************************************************************************** */

// Change the color of the little indicators (navigation in QUESTIONS) based on the user's answer.
function fnChangeIndicatorColors(intCurrentQuestion) {

	// Color-properties are defined in the BUTTONS*.CSS 
	let cssColor = "";

	// Loop through all answers so far. = up to "intCurrentQuestion"
	// Example: [1, -1, 99, 0] = 3 / 6 questions answered and one skipped -> only color in indicators up the current question
//	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {
	for (let i = 0; i <= intCurrentQuestion; i++ ) {

		let currentIndicator = document.getElementById("questionsCarouselIndicator-"+i)

		// Neutral button -> yellow
		if (arPersonalAnswers[i] == 0) {
			cssColor = "var(--aria-button-yellow)"  }
		// Skip button or skipped by indicators -> grey
//		else if ( (arPersonalAnswers[i] == 99) || (!arPersonalAnswers[i]) || (arPersonalAnswers[i] === undefined) ) {
		else if (arPersonalAnswers[i] == 99) {
			cssColor = "grey" }
		// Pro button -> grey
		else if (arPersonalAnswers[i] > 0) {
			cssColor = "var(--aria-button-green)" }
		// Contra button -> red
		else if (arPersonalAnswers[i] < 0) {
			cssColor = "var(--aria-button-red)" } 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeIndicatorColors(). The user's answer index "+i+" was: '"+arPersonalAnswers[i]+"'. This shouldn't happen.")
		}

		currentIndicator.style.backgroundColor = cssColor
//		console.log(cssColor)
	}

} // end: fnChangeIndicatorColors()


/* *************************************************************************** */

// Change the font-weight to "bold" for the clicked pro/neutral/contra-button in QUESTIONS
// Also change the state for aria-pressed
function fnChangeVotingButtonAttributes(intCurrentQuestion) {

	// Loop through all answers so far. = up to "intCurrentQuestion"
//	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {
	for (let i = 0; i <= intCurrentQuestion; i++ ) {

		let current_answer = arPersonalAnswers[i]
		let current_multiplier = arPersonalMultiplier[i]

		let currentButtonProExtra = document.getElementById("votingProExtra-"+i)
		let currentButtonPro = document.getElementById("votingPro-"+i)
		let currentButtonNeutral = document.getElementById("votingNeutral-"+i)
		let currentButtonContra = document.getElementById("votingContra-"+i)
		let currentButtonContraExtra = document.getElementById("votingContraExtra-"+i)

		// Reset the font-weight and aria-pressed on ALL main buttons
		currentButtonProExtra.style.fontWeight = "normal"
		currentButtonProExtra.setAttribute("aria-pressed", "false")

		currentButtonPro.style.fontWeight = "normal"
		currentButtonPro.setAttribute("aria-pressed", "false")

		currentButtonNeutral.style.fontWeight = "normal"
		currentButtonNeutral.setAttribute("aria-pressed", "false")

		currentButtonContra.style.fontWeight = "normal"
		currentButtonContra.setAttribute("aria-pressed", "false")

		currentButtonContraExtra.style.fontWeight = "normal"
		currentButtonContraExtra.setAttribute("aria-pressed", "false")


		// Change the BUTTON-TEXT to BOLD and the BUTTON to PRESSED, depending on the answer
		// Skip
		if ( (current_answer == 99) || (current_answer === undefined) ) {
			// nothing
		}
		// Pro Extra and Pro
		else if (current_answer > 0) {

			// Pro Extra: 1 x 1.5 or 1 x 3
			if ( (current_multiplier == 1.5) || (current_multiplier == 3) ) {
				currentButtonProExtra.style.fontWeight = "bold"
				currentButtonProExtra.setAttribute("aria-pressed", "true")
			}
			// Pro: 1 x 1 or 1 x 2
			else if ( (current_multiplier == 1) || (current_multiplier == 2) ) {
				currentButtonPro.style.fontWeight = "bold"
				currentButtonPro.setAttribute("aria-pressed", "true")
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnChangeVotingButtonAttributes() / section: set PRO button. The current index, answer and multiplier are "+i+":  "+current_answer+" x "+current_multiplier+". This shouldn't happen.")
			}
		}
		// Neutral (The multiplier doesn't matter here.)
		else if (current_answer == 0) {
			currentButtonNeutral.style.fontWeight = "bold"
			currentButtonNeutral.setAttribute("aria-pressed", "true")
		}
		// Contra Extra and Contra
		else if (current_answer == -1) {

			// Contra Extra: -1 x 1.5 or -1 x 3
			if ( (current_multiplier == 1.5) || (current_multiplier == 3) ) {
				currentButtonContraExtra.style.fontWeight = "bold"
				currentButtonContraExtra.setAttribute("aria-pressed", "true")
			}
			// Contra: -1 x 1 or -1 x 2
			else if ( (current_multiplier == 1) || (current_multiplier == 2) ) {
				currentButtonContra.style.fontWeight = "bold"
				currentButtonContra.setAttribute("aria-pressed", "true")
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnChangeVotingButtonAttributes() / section: set CONTRA button. The current index, answer and multiplier are "+i+":  "+current_answer+" x "+current_multiplier+". This shouldn't happen.")
			}
		} 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeVotingButtonAttributes(). The current index, answer and multiplier are "+i+":  "+current_answer+" x "+current_multiplier+". This shouldn't happen.")
		}
	}
} // end: fnChangeVotingButtonAttributes()


/* *************************************************************************** */

// Hides the opposite child-div for the buttons to show "questions and candidate's answers" and "candidates and their answers"
function fnHideDiv(divNameToHide, buttonNameToReset) {

	let divToHide = document.getElementById(divNameToHide)
	let buttonToReset = document.getElementById(buttonNameToReset)

	// Remove Bootstrap-class "show" from collapse
	divToHide.classList.remove("show")


	buttonToReset.setAttribute("aria-expanded", "false")

//	let divToShow = document.getElementById(divNameToShow)

//	const divToHide_Collapse = new bootstrap.Collapse(divToHide)
//	divToHide_Collapse.hide()

//	const divToShow_Collapse = new bootstrap.Collapse(divToShow)
//	divToShow_Collapse.show()

}

/* *************************************************************************** */

function fnChangeToggleButtonColor() {


	// Reset all existing icons
	let closedToggleButtons = document.querySelectorAll("button[aria-expanded='false']")
	for (let i = 0; i <= closedToggleButtons.length-1; i++ )
	{
		let currentToggleButton = closedToggleButtons[i];
		currentToggleButton.classList.add("btn-outline-dark")
		currentToggleButton.classList.remove("btn-dark")
		// Replace the triangle UP with triangle DOWN - both as HTML entity and as character, in case the browser already rendered the symbol.
		currentToggleButton.innerHTML = currentToggleButton.innerHTML.replace("/&triangleup;/g", "/&triangledown;/g")
		currentToggleButton.innerHTML = currentToggleButton.innerHTML.replace("△", "▽")

	}

	let openToggleButtons = document.querySelectorAll("button[aria-expanded='true']")

	// Go through ALL buttons with aria-expanded='true'. This are the toggle buttons.
	// We could have given the button-ID to this function but querySelectorAll() is also fine. ;)
	for (let i = 0; i <= openToggleButtons.length-1; i++ )
	{
		let currentToggleButton = openToggleButtons[i];
		currentToggleButton.classList.add("btn-dark")
		currentToggleButton.classList.remove("btn-outline-dark")
		// Replace the triangle DOWN with triangle UP - both as HTML entity and as character, in case the browser already rendered the symbol.
		currentToggleButton.innerHTML = currentToggleButton.innerHTML.replace("/&triangledown;/g", "/&triangleup;/g")
		currentToggleButton.innerHTML = currentToggleButton.innerHTML.replace("▽", "△")
	}

} // end: fnChangeToggleButtonColor()

/* *************************************************************************** */


function fnHideQuestionsAndShowResults(comment)
{

	let boolQuestionsWereAnswered = false

	// Go through all the personal answers and check if at least one answer was clicked (-1, 0 or 1 not 99)
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ )
	{
		if ( (arPersonalAnswers[i] >= -1) && (arPersonalAnswers[i] < 99) )
		{ boolQuestionsWereAnswered = true }
	}


	if (boolQuestionsWereAnswered) {

		if (comment == "noStatistics") {
			// Nothing. Do not show a modal "Allow statistics" and show results.
		}
		// Check if the statistics were set in DEFINITION.JS and an imprint exists -> modal popup
		else if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
		{
			fnShowModal("statistics")	
		}
		else {
			// Nothing. The statistics were not aktivated in DEFINITION.JS
		}

		// everything alright. The user answered some questions and (did not) allowed statistics -> Hide questions and show results
		const questions_Collapse = new bootstrap.Collapse(document.getElementById('questions'))
		questions_Collapse.toggle()
		const results_all_Collapse = new bootstrap.Collapse(document.getElementById('results_all'))
		results_all_Collapse.toggle()


	}
	// The user did NOT answer any question -> modal popup!
	else {
		fnShowModal("noAnswers")
	}
} // end: fnHideQuestionsAndShowResults()


/* *************************************************************************** */

function fnShowModal(topic) {

	let text_modal_title = ""
	let text_modal_text = ""
	let text_modal_yes = ""
	let text_modal_no = ""

	if (topic == "statistics") {
		text_modal_title = TEXT_MODAL_STATISTIC_TITLE
		text_modal_text = TEXT_MODAL_STATISTIC_TEXT
		text_modal_yes = TEXT_MODAL_STATISTIC_YES
		text_modal_no = TEXT_MODAL_STATISTIC_NO

	}
	else if (topic == "noAnswers") {
		text_modal_title = TEXT_MODAL_NOTHING_ANSWERED_TITLE
		text_modal_text = TEXT_MODAL_NOTHING_ANSWERED_TEXT
		text_modal_yes = TEXT_MODAL_NOTHING_ANSWERED_YES
		text_modal_no = TEXT_MODAL_NOTHING_ANSWERED_NO
	}
	else if (topic == "clipboard") {
		text_modal_title = TEXT_MODAL_CLIPBOARD_TITLE
		text_modal_text = TEXT_MODAL_CLIPBOARD_TEXT
		text_modal_yes = TEXT_MODAL_CLIPBOARD_YES
		text_modal_no = TEXT_MODAL_CLIPBOARD_NO
	}
	else {
		console.log("Strange. We're in the ELSE-part of fnShowModal(). The topic of the modal-popup was: "+topic+". This shouldn't happen.")
	}

	// Set the attributes on the modal
	const mowModal_Title = document.getElementById("mowModal_Title")
	mowModal_Title.innerHTML = text_modal_title 

	const mowModal_Body = document.getElementById("mowModal_Body")
	mowModal_Body.innerHTML = text_modal_text

	const mowModal_No_Top = document.getElementById("mowModal_ButtonClose_Top")
	mowModal_No_Top.setAttribute("aria-label", text_modal_no )
	mowModal_No_Top.title = text_modal_no

	const mowModal_No_Bottom = document.getElementById("mowModal_ButtonClose_Bottom")
	mowModal_No_Bottom.innerHTML = text_modal_no 

	const mowModal_Yes = document.getElementById("mowModal_ButtonOK")
	mowModal_Yes.innerHTML = text_modal_yes
	mowModal_Yes.setAttribute("data-bs-dismiss", "modal")

	if (topic == "statistics") {
		mowModal_Yes.onclick = function() { fnSendResultsToServer() }
	}
	else if (topic == "noAnswers") {
	}

	// Show modal popup
	const mowModal = new bootstrap.Modal(document.getElementById('mowModal'))
	mowModal.show()


} // end: fnShowModal()

/* *************************************************************************** */




function fnCheckScrolling() {

	const scrollToTopButton = document.getElementById("footer_button_scrollToTop");

	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
	scrollToTopButton.style.display = "block";
	} else {
	scrollToTopButton.style.display = "none";
	}


}

/* *************************************************************************** */

// When the user clicks on the button, scroll to the top of the document
function fnScrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

/* *************************************************************************** */


// not used.
function fnLoadingProgress(percent) {
	const loadingProgressBarWrapper = document.getElementById("loadingProgressBarWrapper")
	const loadingProgressBar = document.getElementById("loadingProgressBar")

		setTimeout(function() {
			loadingProgressBar.innerHTML = percent
		}, 100);
	
	
}

/* *************************************************************************** */
