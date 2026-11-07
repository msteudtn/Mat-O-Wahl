"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


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

	// Check, if the button has been activated = CSS class "active" exists (due to data-bs-toggle="button") -> Activate double counting
	if(buttonVotingDouble.classList.contains('active')) {
//		cssClassToAdd = "btn-outline-dark"
//		cssClassToRemove = "btn-dark"
//		ariaPressedState = "false"
		intMultiplier = 2
	}
	// Button has not been clicked or was reset -> Activate / Reset to normal counting
	else {
//		cssClassToAdd = "btn-dark"
//		cssClassToRemove = "btn-outline-dark"
//		ariaPressedState = "true"
		intMultiplier = 1
	}

	/* ------------------------------------------------------------------- */

	// Add / remove DARK-class and OUTLINE-class on DOUBLE-button [2x]
//	buttonVotingDouble.classList.add(cssClassToAdd)
//	buttonVotingDouble.classList.remove(cssClassToRemove)
//	buttonVotingDouble.setAttribute("aria-pressed", ariaPressedState)

	// Change intMultiplier (from 1 to 3 or from 3 to 1) on PRO-EXTRA-button [++]
	buttonVotingProExtra.removeAttribute("onclick")
	buttonVotingProExtra.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, 1, ( intMultiplier + 1) ) }
	
	// Change intMultiplier (from 1 to 2 or from 2 to 1) on PRO-button [+]
	buttonVotingPro.removeAttribute("onclick")
	buttonVotingPro.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, 1, intMultiplier) }

	// Change intMultiplier (from 1 to 2 or from 2 to 1) on NEUTRAL-button [o]
	buttonVotingNeutral.removeAttribute("onclick")
	buttonVotingNeutral.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, 0, intMultiplier) }
	
	// Change intMultiplier (from 1 to 2 or from 2 to 1) on CONTRA-button [-]
	buttonVotingContra.removeAttribute("onclick")
	buttonVotingContra.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, -1, intMultiplier) } 

	// Change intMultiplier (from 1 to 2 or from 2 to 1) on CONTRA-EXTRA-button [--]
	buttonVotingContraExtra.removeAttribute("onclick")
	buttonVotingContraExtra.onclick = function () { fnEvaluationCurrentAnswer(intCurrentQuestion, -1, ( intMultiplier + 1) ) } 

} // end: fnChangeButtonDouble()


/* *************************************************************************** */

// Change the color of the little indicators ("navigation" in QUESTIONS) based on the user's answer.
// We use CSS variables and not the Bootstrap BUTTON classes because they don't work.
function fnChangeIndicatorColors(intCurrentQuestion) {

	// Color-properties are defined in the BUTTONS*.CSS 
	let bgColor_indicator = "";
	let bgColor_button = "";

	// Loop through all answers so far. = up to "intCurrentQuestion"
	// Example: [1, -1, 0, 0.5] = 3 / 6 questions answered and one skipped -> only color in indicators up the current question
	for (let i = 0; i <= intCurrentQuestion; i++ ) {

		let currentIndicator = document.getElementById("questionsCarouselIndicator-"+i)
		let currentCategoryButton = ""
		try {
			currentCategoryButton = document.getElementById("questionsCategories_button-"+i)
		} catch (error) {}

		// Neutral button -> yellow
		if (arPersonalAnswers[i] == 0.5) {
			bgColor_indicator = "var(--aria-yellow)"  
			bgColor_button = "btn-warning"
		}
		// Skip button or skipped by indicators -> grey
		else if (arPersonalAnswers[i] == 0) {
			bgColor_indicator = "var(--aria-grey)" 
			bgColor_button = "btn-secondary"
		}
		// Pro button -> green
		else if (arPersonalAnswers[i] >= 1) {
			bgColor_indicator = "var(--aria-green)" 
			bgColor_button = "btn-success"
		}
		// Contra button -> red
		else if (arPersonalAnswers[i] <= -1) {
			bgColor_indicator = "var(--aria-red)" 
			bgColor_button = "btn-danger"
		} 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeIndicatorColors(). The user's answer index "+i+" was: '"+arPersonalAnswers[i]+"'. This shouldn't happen.")
		}

		currentIndicator.style.backgroundColor = bgColor_indicator

		try {
			currentCategoryButton.classList.remove("btn-warning")
			currentCategoryButton.classList.remove("btn-secondary")
			currentCategoryButton.classList.remove("btn-success")
			currentCategoryButton.classList.remove("btn-danger")
			currentCategoryButton.classList.add(bgColor_button)
		} catch (error) { }

	}

} // end: fnChangeIndicatorColors()


/* *************************************************************************** */


// Change the font-weight to "bold" for the clicked pro/neutral/contra-button in QUESTIONS
// Also: change the state for aria-pressed.
function fnChangeVotingButtonAttributes(intCurrentQuestion) {

	// Loop through all answers so far. = up to "intCurrentQuestion"
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


		/* ----------------------------------------------------------- */


		// Change the BUTTON-TEXT to BOLD and the BUTTON to PRESSED, depending on the answer
		// Skip
		if ( (current_answer == 0) || (current_answer === undefined) ) {
			// nothing
		}
		// Pro Extra and Pro
		else if (current_answer == 1) {

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
		else if (current_answer == 0.5) {
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



// Receive a button-HTMLobject and set texts (title, aria-label) and colors (CSS classes)
// This function is only relevant for the results-pages "by question", "tuning" and "by candidate" because they use "short" buttons.
// The carousel with questions at the beginning is mainly set by INDEX.HTML and "frontend_questions.js" 
function fnSetAnswerButtonAttributes(currentAnswer, currentMultiplier, isCandidate, buttonObject) {

// console.log("setButton "+currentAnswer+" - "+currentMultiplier)

	let button_answer_short = ""
	let button_answer_long = ""
	let button_css_to_add = ""
	let button_css_to_add_extra = ""
	let button_answeredBy = ""


	if (isCandidate) {
		button_answeredBy = TEXT_ANSWERED_BY_CANDIDATE
	}
	else {
		button_answeredBy = TEXT_ANSWERED_BY_USER
	}

	// USER or CANDIDATE answered "-1" (contra / contra extra / [-] / [--])
	if (currentAnswer == -1) {

		button_css_to_add = "btn-danger"

		// Contra Extra: 1 x 1.5 or 1 x 3
		if ( (currentMultiplier == 1.5) || (currentMultiplier == 3) ) {
			button_css_to_add_extra = "mow-btn-danger-dark"
			button_answer_short = TEXT_VOTING_CONTRA_EXTRA_SHORT
			button_answer_long = TEXT_VOTING_CONTRA_EXTRA_LONG

		}
		// Contra: 1 x 1 or 1 x 2
		else if ( (currentMultiplier == 1) || (currentMultiplier == 2) ) {			
			button_answer_short = TEXT_VOTING_CONTRA_SHORT
			button_answer_long = TEXT_VOTING_CONTRA_LONG
		}

	}

	// USER or CANDIDATE answered "1" (pro / pro extra / [+] / [++])
	else if (currentAnswer == 1) {

		button_css_to_add = "btn-success"

		// Pro Extra: 1 x 1.5 or 1 x 3
		if ( (currentMultiplier == 1.5) || (currentMultiplier == 3) ) {
			button_css_to_add_extra = "mow-btn-success-dark"
			button_answer_short = TEXT_VOTING_PRO_EXTRA_SHORT
			button_answer_long = TEXT_VOTING_PRO_EXTRA_LONG
		}
		// Pro: 1 x 1 or 1 x 2
		else if ( (currentMultiplier == 1) || (currentMultiplier == 2) ) {
			button_answer_short = TEXT_VOTING_PRO_SHORT
			button_answer_long = TEXT_VOTING_PRO_LONG
		}

	}

	// USER answered "0.5" (neutral / [o]) - Info: the candidate's answer in the CSV is "0" for neutral but changed to "0.5" for calculations
	else if (currentAnswer == 0.5) {
		button_css_to_add = "btn-warning"
		button_answer_short = TEXT_VOTING_NEUTRAL_SHORT
		button_answer_long = TEXT_VOTING_NEUTRAL_LONG
	}

	// USER skipped the question "0" (skip)
	else if (currentAnswer == 0) {
		button_css_to_add = "btn-secondary"
		button_answer_short = TEXT_VOTING_SKIP_SHORT
		button_answer_long = TEXT_VOTING_SKIP_LONG
	}
	
	else {
		console.log("Strange. We're in the ELSE-part of fnSetAnswerButtonAttributes() / The current answer and multiplier are:  "+currentAnswer+" x "+currentMultiplier+". This shouldn't happen.")
	}


	/* ------------------------------------------------------------------- */


	// Set the title and icon ("button_answer_short") of the specific button including "Your answer" / "Candidate's answer" at the beginning.
	buttonObject.setAttribute("aria-label", button_answeredBy+": "+button_answer_long)
	buttonObject.title = button_answeredBy+": "+button_answer_long
	buttonObject.innerHTML = button_answer_short

	// Set the CSS class(es)
	buttonObject.classList.add(button_css_to_add)

	if (button_css_to_add_extra) {
		buttonObject.classList.add(button_css_to_add_extra)
	}
	
	return buttonObject;

} // end: fnSetAnswerButtonAttributes()



/* *************************************************************************** */
