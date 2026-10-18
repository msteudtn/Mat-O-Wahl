"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */

// Create the welcome-screen, default texts (mainly descriptions, headings and buttons). 
// Also: check for results in the address-bar
function fnShowWelcomeScreenAndSetLocalTexts() {

	// Set new meta-tags in the head. - This might not have any effect on some systems. :(
	document.title = my_o_mat+ " - " +descriptionHeading1;
	document.querySelector('meta[name=language]').setAttribute("content", language);
	document.querySelector('meta[name=Content-Language]').setAttribute("content", language);
	document.querySelector('meta[name=description]').setAttribute("content",  my_o_mat+ " - " +fnClearHtmlTags(descriptionHeading1)+" "+fnClearHtmlTags(descriptionHeading2)+" ");


	/* ------------------------------------------------------------------- */


	// Set the local texts on the WELCOME SCREEN
	document.getElementById("welcomeScreen_heading1").innerHTML = descriptionHeading1
	document.getElementById("welcomeScreen_heading2").innerHTML = descriptionHeading2

	const welcomeScreen_description = document.getElementById("welcomeScreen_description")
	welcomeScreen_description.innerHTML = descriptionExplanation

	const welcomeScreen_buttonStart = document.getElementById("welcomeScreen_buttonStart")
	welcomeScreen_buttonStart.innerHTML = TEXT_START



	/* ------------------------------------------------------------------- */


	// Set the local texts in the RESULTS OVERVIEW
	document.getElementById("results_overview_heading1").innerHTML = descriptionHeading1;
	document.getElementById("results_overview_heading2").innerHTML = TEXT_RESULTS_HEADING_SHORT_SUMMARY


	/* ------------------------------------------------------------------- */


	// Set the local texts on the default BUTTONS to show  BY QUESTION / FINE-TUNING and BY CANDIDATE
	const resutls_buttonFor_byQuestions = document.getElementById("results_byX_buttonFor_byQuestions")
	resutls_buttonFor_byQuestions.title     = TEXT_RESULTS_BUTTON_QUESTIONS
	resutls_buttonFor_byQuestions.innerHTML = TEXT_RESULTS_BUTTON_QUESTIONS

	const results_buttonFor_tuning = document.getElementById("results_byX_buttonFor_tuning")
	results_buttonFor_tuning.title     = TEXT_RESULTS_BUTTON_TUNING
	results_buttonFor_tuning.innerHTML = TEXT_RESULTS_BUTTON_TUNING

	const results_buttonFor_byCandidates = document.getElementById("results_byX_buttonFor_byCandidates")
	results_buttonFor_byCandidates.title     = TEXT_RESULTS_BUTTON_CANDIDATES
	results_buttonFor_byCandidates.innerHTML = TEXT_RESULTS_BUTTON_CANDIDATES


	/* ------------------------------------------------------------------- */


	// Set the local description in the RESULTS BY QUESTION
	document.getElementById("results_byQuestion_description").innerHTML = TEXT_RESULTS_BY_QUESTION_DESCRIPTION

	// Set the local description in the RESULTS TUNING
	document.getElementById("results_tuning_description").innerHTML = TEXT_RESULTS_TUNING_DESCRIPTION  
	document.getElementById("results_tuning_headerForUser").innerHTML = TEXT_ANSWERED_BY_USER
	document.getElementById("results_tuning_headerForQuestion").innerHTML = TEXT_QUESTION

	// Set the local texts in the RESULTS BY CANDIDATE
	document.getElementById("results_byCandidate_description").innerHTML = TEXT_RESULTS_BY_CANDIDATE_DESCRIPTION


	/* ------------------------------------------------------------------- */


	// Buttons in the FOOTER
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

	const footer_buttons_scrollToTop = document.getElementById("footer_buttonScrollToTop")
	footer_buttons_scrollToTop.innerHTML = TEXT_SCROLL_TO_TOP
	footer_buttons_scrollToTop.setAttribute("aria-label", TEXT_SCROLL_TO_TOP)


	/* ------------------------------------------------------------------- */


	// If there's a parameter "myAnswers" in the URL, we'll use this for the global "arPersonalAnswers[]" and skip the questions.
	const urlParams = new URLSearchParams(window.location.search);
	const myAnswersString = urlParams.get("myAnswers");
	const myMultipliersString = urlParams.get("myMultiplier");

	// Check, if the string from URL exists and is larger than an empty string "[]" of 2 characters
	if (myAnswersString) {
		if (myAnswersString.length > 2) { 

			// Convert the string into an array
			arPersonalAnswers = JSON.parse(myAnswersString);
			arPersonalMultiplier = JSON.parse(myMultipliersString);

			// Change the original description with the text from i18n.
			welcomeScreen_description.innerHTML = TEXT_SHARED_RESULTS

			// Always show the description on start, even if it was set to 0 in DEFINITION.JS
			// This buys us some time to load the CSV-files while the the user is busy reading. 
			descriptionShowOnStart = 1

			// Hide the questions. Otherwise they would toggle to "show" when clicking on "welcomeScreen_buttonStart"
			document.getElementById("questions").style.display = "none"

			// Put two functions on the start-button.
			// 1. Run fnEvaluationAllANswers() to populate all the results-DIVs. 
			// 2. Run fnCheckIfQuestionsAnswered(). Usually this would hide the <div> "questions" and show the <div> "results". 
			//    However, since the "questions" are hidden by default, they would toggle to show first. Luckily we've set it to "display:none", before.
			welcomeScreen_buttonStart.onclick = function() { fnEvaluationAllAnswers(); fnCheckIfQuestionsAnswered("noStatistics") }
		}
	}


	/* ------------------------------------------------------------------- */


	// If the variable "descriptionShowOnStart" is set to 0 in DEFINITION.JS, we skip the welcome screen by "clicking" on the start-button to toggle ("collapse" the relevant <div>s
	if (descriptionShowOnStart == 0) {		
		document.getElementById("welcomeScreen_buttonStart").click()
	} else {
		// nothing to do 
	}


	/* ------------------------------------------------------------------- */


	// Clear the DOM from unused data, especially <!-- comments in HTML -->
	fnClearCommentsFromDom(document.body)

	
} // end: fnShowWelcomeScreenAndSetLocalTexts()

/* *************************************************************************** */



// 0. Create all necessary <div>s to show the results.
function fnCreateResults(arCandidatesSortedByPoints, intMaxPoints) {


	// 0.
	fnCreateResults_smallAndSticky(arCandidatesSortedByPoints, intMaxPoints)

	// 1. (3.0) Create the general OVERVIEW of the results.
	// (Short and long name of candidate, progress-bar, percentage, description.)
	fnCreateResults_Overview(arCandidatesSortedByPoints, intMaxPoints)

	// Default buttons - already there

	// 2. (3.2) Create the comparison of QUESTIONS and the respective candidate's answers.
	fnCreateResults_QuestionsAndAnswers(arCandidatesSortedByPoints)

	// 3. (3.3) Fine tuning
	fnCreateResults_fineTuning()

	// 4. (3.4) Show all the CANDIDATE'S answers and the user's answer
	fnCreateResults_CandidatesAndAnswers(arCandidatesSortedByPoints)

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

	// Add / remove DARK-class and OUTLINE-class on DOUBLE-button [2x]
	buttonVotingDouble.classList.add(cssClassToAdd)
	buttonVotingDouble.classList.remove(cssClassToRemove)
	buttonVotingDouble.setAttribute("aria-pressed", ariaPressedState)

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
	let cssColor = "";

	// Loop through all answers so far. = up to "intCurrentQuestion"
	// Example: [1, -1, 0, 0.5] = 3 / 6 questions answered and one skipped -> only color in indicators up the current question
	for (let i = 0; i <= intCurrentQuestion; i++ ) {

		let currentIndicator = document.getElementById("questionsCarouselIndicator-"+i)

		// Neutral button -> yellow
		if (arPersonalAnswers[i] == 0.5) {
			cssColor = "var(--aria-yellow)"  }
		// Skip button or skipped by indicators -> grey
		else if (arPersonalAnswers[i] == 0) {
			cssColor = "var(--aria-grey)" }
		// Pro button -> grey
		else if (arPersonalAnswers[i] >= 1) {
			cssColor = "var(--aria-green)" }
		// Contra button -> red
		else if (arPersonalAnswers[i] <= -1) {
			cssColor = "var(--aria-red)" } 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeIndicatorColors(). The user's answer index "+i+" was: '"+arPersonalAnswers[i]+"'. This shouldn't happen.")
		}

		currentIndicator.style.backgroundColor = cssColor

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


// TO BE REMOVED ????
// Hides the opposite child-div for the buttons to show "questions and candidate's answers" and "candidates and their answers"
function fnHideDiv00000(divNameToHide, buttonNameToReset) {

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

// TO BE REMOVED
function fnChangeToggleButtonColor000() {

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


	/* ------------------------------------------------------------------- */


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


// Check, if at least one question was answered and guide to the statistics (if active).
function fnCheckIfQuestionsAnswered(comment)
{

	// Default value is false / nothing answered
	let boolQuestionsWereAnswered = false

	// Go through all the personal answers and check if at least one answer was clicked (-1, 0.5 or 1 but not 0)
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ )
	{
		if ( (arPersonalAnswers[i] != 0) )
		{ boolQuestionsWereAnswered = true }
	}


	/* ------------------------------------------------------------------- */


	if (boolQuestionsWereAnswered) {

		// Check, if we need statistics.
		if (comment == "noStatistics") {
			// Nothing. Do NOT show a modal "Allow statistics" and show the results right away.
			// This case happens, when the results were in the address-bar and shared with someone.
		}
		// Check, if the statistics were set in DEFINITION.JS and an imprint exists -> modal popup
		else if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
		{
			fnShowModal("statistics")	
		}
		else {
			// Nothing. The statistics were not activated in DEFINITION.JS
		}


		// Everything alright. The user answered some questions and (did not) allow statistics -> Hide questions and show results.
		const questions_collapse = new bootstrap.Collapse(document.getElementById('questions'))
		questions_collapse.toggle()

		const results_overview_collapse = new bootstrap.Collapse(document.getElementById('results_overview'))
		results_overview_collapse.toggle()

	}
	// The user did NOT answer any question -> modal popup!
	else {
		fnShowModal("noAnswers")
	}
} // end: fnCheckIfQuestionsAnswered()


/* *************************************************************************** */


// Show a modal depending on the topic.
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


	/* ------------------------------------------------------------------- */


	// Set the attributes on the modal
	const mowModal_title = document.getElementById("mowModal_Title")
	mowModal_title.innerHTML = text_modal_title 

	const mowModal_body = document.getElementById("mowModal_Body")
	mowModal_body.innerHTML = text_modal_text

	const mowModal_answerNo_atTop = document.getElementById("mowModal_ButtonClose_Top")
	mowModal_answerNo_atTop.setAttribute("aria-label", text_modal_no )
	mowModal_answerNo_atTop.title = text_modal_no

	const mowModal_answerNo_atBottom = document.getElementById("mowModal_ButtonClose_Bottom")
	mowModal_answerNo_atBottom.innerHTML = text_modal_no 

	const mowModal_answerYes = document.getElementById("mowModal_ButtonOK")
	mowModal_answerYes.innerHTML = text_modal_yes
	mowModal_answerYes.setAttribute("data-bs-dismiss", "modal")


	/* ------------------------------------------------------------------- */


	// Set an onclick-function to the YES-button
	if (topic == "statistics") {
		mowModal_answerYes.onclick = function() { fnSendResultsToServer() }
	}
	else if (topic == "noAnswers") {
	}

	// Show modal popup
	const mowModal = new bootstrap.Modal(document.getElementById('mowModal'))
	mowModal.show()

} // end: fnShowModal()


/* *************************************************************************** */

// Check, if the page has been scrolled.  If so ...
// (1.) Show / hide the button "Scroll to top"
// (2.) Show / hide the "small and sticky results" at top.
function fnCheckScrolling() {

	// Show / hide the button "Scroll to top"
	const scrollToTopButton = document.getElementById("footer_buttonScrollToTop");

	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		scrollToTopButton.style.display = "block";
	} else {
		scrollToTopButton.style.display = "none";
	}

	// Show / hide the "small and sticky results" at top.
	const results_overview = document.getElementById("results_overview_byMatches_accordion");
	const results_overview_bottom = results_overview.getBoundingClientRect().bottom
	const results_small =  document.getElementById("results_smallAndSticky")

	if (results_overview_bottom < 0) {
		results_small.style.display = "flex"
	}
	else {
		results_small.style.display = "none"
	}

} // end: fnCheckScrolling()


/* *************************************************************************** */


// When the user clicks on the button, scroll to the top of the document
function fnScrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 


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

	// USER answered "0.5" (neutral / [o]) - the candidate's answer in the CSV is "0" for neutral
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


// Receive a progressbar-HTMLobject and set the attributes (percentage, width, text, CSS-class for color, ...)
// This function is used for the "results_overview_byMatches" and "results_smallAndSticky"
function fnSetProgressBarAttributes(progressBarObject, idOfCandidate, intMaxPoints, counter) {


	// Calculate the percentage for the progress-bar 
	// Example: objCandidates["p3"].points = 3 divided by max. 7 points = 0.428 = 43%
	let intPercentage = 0
	if (intMaxPoints > 0) {
		intPercentage = Math.round ( ( objCandidates[idOfCandidate].points / intMaxPoints ) * 100 )
	}
	// All questions have been skipped -> Avoid a "NaN"-percentage!
	else {
		intPercentage = 0
	}


	/* ------------------------------------------------------------------- */


	// Set the color (Bootstrap CSS class) for the progress-bar (red -> yellow -> green)
	let progressBarColor = ""

	if (intPercentage <= 33) { 
		progressBarColor = "bg-danger"; 
	}
	else if (intPercentage <= 66) { 
		progressBarColor = "bg-warning"; 
	}
	else { 
		progressBarColor= "bg-success"; 
	}


	/* ------------------------------------------------------------------- */


	/// Set the width and color of the progress-bar
	const progressBar = progressBarObject
	progressBar.style.width = intPercentage+"%"
//		progressBar.innerHTML = intPercentage+"% "
	progressBar.classList.add(progressBarColor) 
	progressBar.setAttribute("aria-valuenow", intPercentage)
	progressBar.title = intPercentage+"% ("+objCandidates[idOfCandidate].points+ "/" +intMaxPoints+ ")"
	const strProgressBarId = progressBar.id
	progressBar.id = strProgressBarId.slice(0,-1)+counter

//	return progressBarObject
	return progressBar

} // end: fnSetProgressBar()

