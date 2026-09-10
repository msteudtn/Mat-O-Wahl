"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

/* *************************************************************************** */

// 0. Create all necessary <div>s to show the results.
function fnCreateResults(arCandidatesSortedByPoints, intMaxPoints) {

	// 1. Create the general overview of the results.
	// (Short and long name of candidate, progress-bar, percentage, description.)
	fnCreateResults_Overview(arCandidatesSortedByPoints, intMaxPoints)

	// 2. Create the comparison of questions and the respective candidate's answers.
	fnCreateResults_QuestionsAndAnswers(arCandidatesSortedByPoints)

	// 3. Show all the candidate's answers and the user's answer
	fnCreateResults_CandidatesAndAnswers(arCandidatesSortedByPoints)

	fnClearCommentsFromDom(document.body)

} // end: fnCreateResults()



/* *************************************************************************** */

// Change the importance (intMultiplier) of the PRO and CONTRA buttons if DOUBLE has been clicked in the QUESTIONS
function fnChangeButtonDouble(intCurrentQuestion, intMultiplier) {

	const buttonVotingPro = document.getElementById("votingPro-"+intCurrentQuestion)
	const buttonVotingNeutral = document.getElementById("votingNeutral-"+intCurrentQuestion)
	const buttonVotingContra = document.getElementById("votingContra-"+intCurrentQuestion)
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
	
	// Change intMultiplier (from 1 to 2 or from 2 to 1) on PRO-button 
	buttonVotingPro.removeAttribute("onclick")
	buttonVotingPro.onclick = function () {	fnEvaluation(intCurrentQuestion, 1, intMultiplier) }

	// Change intMultiplier (from 1 to 2 or from 2 to 1) on NEUTRAL-button 
	buttonVotingNeutral.removeAttribute("onclick")
	buttonVotingNeutral.onclick = function () { fnEvaluation(intCurrentQuestion, 0, intMultiplier) }
	
	// Change intMultiplier (from 1 to 2 or from 2 to 1) on CONTRA-button 
	buttonVotingContra.removeAttribute("onclick")
	buttonVotingContra.onclick = function () { fnEvaluation(intCurrentQuestion, -1, intMultiplier) } 

} // end: fnChangeButtonDouble()


/* *************************************************************************** */

// Change the color of the little indicators (navigation in QUESTIONS) based on the user's answer.
function fnChangeIndicatorColors() {

	// Color-properties are defined in the BUTTONS.CSS (***###!!!)
	let cssColor = "";

	// Loop through all answers so far.
	// Example: [1, -1,  , 0] = 3 / 6 questions answered and one skipped
//	for (let key in objPersonalAnswers) {
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {

		// Slice off the first character "a" of the key-name. We need it to find the right indicator-button.
		// Example: key = "a3" -> intIdNumber = 3 -> indicator-button-ID = "questionsCarouselIndicator-3"
//		let intIdNumber = key.slice(1)
//		let currentIndicator = document.getElementById("questionsCarouselIndicator-"+intIdNumber)
		let currentIndicator = document.getElementById("questionsCarouselIndicator-"+i)

		// Neutral button -> yellow
//		if (objPersonalAnswers[key].answer == 0) {
		if (arPersonalAnswers[i] == 0) {
			cssColor = "var(--aria-button-yellow)"  }
		// Skip button or skipped by indicators -> grey
//		else if (objPersonalAnswers[key].answer == 99) {
		else if ( (arPersonalAnswers[i] == 99) || (!arPersonalAnswers[i]) || (arPersonalAnswers[i] === undefined) ) {
			cssColor = "grey" }
		// Pro button -> grey
//		else if (objPersonalAnswers[key].answer > 0) {
		else if (arPersonalAnswers[i] > 0) {
			cssColor = "var(--aria-button-green)" }
		// Contra button -> red
//		else if (objPersonalAnswers[key].answer < 0) {
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
function fnChangeVotingButtonAttributes() {

	// Loop through all answers so far.
//	for (let key in objPersonalAnswers) {
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {

		// Slice off the first character "a" of the key-name. We need it to find the right button.
		// Example: key = "a3" -> intIdNumber = 3 -> indicator-button-ID = "votingPro-3"
//		let intIdNumber = key.slice(1)

//		let currentButtonPro = document.getElementById("votingPro-"+intIdNumber)
//		let currentButtonNeutral = document.getElementById("votingNeutral-"+intIdNumber)
//		let currentButtonContra = document.getElementById("votingContra-"+intIdNumber)

		let currentButtonPro = document.getElementById("votingPro-"+i)
		let currentButtonNeutral = document.getElementById("votingNeutral-"+i)
		let currentButtonContra = document.getElementById("votingContra-"+i)

		// Reset the font-weight and aria-pressed on ALL main buttons
		currentButtonPro.style.fontWeight = "normal"
		currentButtonPro.setAttribute("aria-pressed", "false")

		currentButtonNeutral.style.fontWeight = "normal"
		currentButtonNeutral.setAttribute("aria-pressed", "false")

		currentButtonContra.style.fontWeight = "normal"
		currentButtonContra.setAttribute("aria-pressed", "false")

		// Change it to bold and pressed, depending on the answer
		// Neutral
//		if (objPersonalAnswers[key].answer == 0) {
		if (arPersonalAnswers[i] == 0) {
			currentButtonNeutral.style.fontWeight = "bold"
			currentButtonNeutral.setAttribute("aria-pressed", "true")
		}
		// Skip
		else if ( (arPersonalAnswers[i] == 99) || (!arPersonalAnswers) || (arPersonalAnswers[i] === undefined) ) {
//		else if (objPersonalAnswers[key].answer == 99) {
			// nothing
		}
		// Pro
		else if (arPersonalAnswers[i] > 0) {
//		else if (objPersonalAnswers[key].answer > 0) {
			currentButtonPro.style.fontWeight = "bold"
			currentButtonPro.setAttribute("aria-pressed", "true")
		}
		// Contra
		else if (arPersonalAnswers[i] < 0) {
//		else if (objPersonalAnswers[key].answer < 0) {
			currentButtonContra.style.fontWeight = "bold"
			currentButtonContra.setAttribute("aria-pressed", "true")
		} 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeVotingButtonAttributes(). The user's answer index "+i+" was: '"+arPersonalAnswers[i]+"'. This shouldn't happen.")
		}
	}
} // end: fnChangeVotingButtonAttributes()

/* *************************************************************************** */

function fnRemoveToggleClass(divNameToRemove) {

	let divToRemove = document.getElementById(divNameToRemove)
	divToRemove.classList.remove('fadingStop');

} // end: fnRemoveFadingClass()


/* *************************************************************************** */

// Toggle the CSS class to "fadingStop" (needs a class "fading" to work)
// This function is mainly used with the buttons "▽" and "△", but also to show/hide the welcome-screen, questions or detailed results
function fnToggleDiv(divNameToToggle, buttonNameToToggle, boolChangeButtonIcon, divNameToRemove, buttonNameToReset) {

	if (divNameToRemove) {
		let divToRemove = document.getElementById(divNameToRemove)
		divToRemove.classList.add('fadingStop');
	}


	if (buttonNameToReset) {
		let buttonToReset = document.getElementById(buttonNameToReset)
		buttonToReset.setAttribute("aria-pressed", "false")
		buttonToReset.classList.remove("btn-dark")
		buttonToReset.classList.add("btn-outline-dark")
	}

	let divToToggle = document.getElementById(divNameToToggle)
	let buttonToToggle = document.getElementById(buttonNameToToggle)

//	console.log("toggle DIV: "+divNameToToggle+" with button: "+buttonNameToToggle )

	divToToggle.classList.toggle('fadingStop');

	// We change the button icon between "▽" and "△" (1).
	// Otherwise (0) it's likely a button like "Let's go to the questions" or "Show results after all the questions"


	// DIV is set to hide, so, we change the button to "open <div>" (&bigtriangledown;)
	if (divToToggle.classList.contains('fadingStop')) {
		buttonToToggle.setAttribute("aria-pressed", "false")
		buttonToToggle.classList.remove("btn-dark")
		buttonToToggle.classList.add("btn-outline-dark")

		if (boolChangeButtonIcon >= 1) {
	 		buttonToToggle.innerHTML = "&bigtriangledown;" }
	}
	// DIV is set to show, so, we change the button to "close <div>" (&bigtriangleup;)
	else {
		buttonToToggle.setAttribute("aria-pressed", "true")
		buttonToToggle.classList.add("btn-dark")
		buttonToToggle.classList.remove("btn-outline-dark")

		if (boolChangeButtonIcon >= 1) {
	 		buttonToToggle.innerHTML = "&bigtriangleup;" }
	}




} // end: fnToggleDiv()

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
	else {
		console.log("Strange. We're in the ELSE-part of fnShowModal(). The topic of the modal-popup was: "+topic+". This shouldn't happen.")
	}

	// Set the attributes on the modal
	const mowModal_Title = document.getElementById("mowModal_Title")
	mowModal_Title.innerHTML = text_modal_title 

	const mowModal_Body = document.getElementById("mowModal_Body")
	mowModal_Body.innerHTML = text_modal_text

	const mowModal_No_Top = document.getElementById("mowModal_ButtonClose_Top")
	mowModal_No_Top.setAttribute("aria-label", text_modal_no)

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


}