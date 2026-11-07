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


	// QUESTIONS

	// Set the headline for the questions
	document.getElementById("questions_mainHeadline").innerHTML = descriptionHeading1;

	// Set the show/hide button for the question-categories
	document.getElementById("questionsCategories_toggleButton").innerHTML = TEXT_TOGGLE_BUTTON_CATEGRIES

	// Set the local texts on the default BUTTONS to show  BY QUESTION / FINE-TUNING and BY CANDIDATE
	const resutls_buttonFor_byQuestions = document.getElementById("results_byX_buttonFor_byQuestions")
	resutls_buttonFor_byQuestions.title     = TEXT_RESULTS_BY_QUESTION_BUTTON
	resutls_buttonFor_byQuestions.innerHTML = TEXT_RESULTS_BY_QUESTION_BUTTON

	const results_buttonFor_tuning = document.getElementById("results_byX_buttonFor_tuning")
	results_buttonFor_tuning.title     = TEXT_RESULTS_TUNING_BUTTON
	results_buttonFor_tuning.innerHTML = TEXT_RESULTS_TUNING_BUTTON

	const results_buttonFor_byCandidates = document.getElementById("results_byX_buttonFor_byCandidates")
	results_buttonFor_byCandidates.title     = TEXT_RESULTS_BY_CANDIDATE_BUTTON
	results_buttonFor_byCandidates.innerHTML = TEXT_RESULTS_BY_CANDIDATE_BUTTON


	/* ------------------------------------------------------------------- */

	// Set the show/hide button for the filter-categories
	if (intShowResultsFilter > 0) {
		document.getElementById("results_overview_filters_toggleButton").innerHTML = TEXT_FILTER_BUTTON_TOGGLE
	}
	else {
		// Hide button "Show / hide categories"
		document.getElementById("results_overview_filters_toggleButton").style.display = "none"
		document.getElementById("results_overview_filters_collapse").style.display = "none"
	}

	// Set the local texts in the RESULTS OVERVIEW
	document.getElementById("results_overview_heading1").innerHTML = descriptionHeading1;
	document.getElementById("results_overview_heading2").innerHTML = TEXT_RESULTS_HEADING_SHORT_SUMMARY

	// If we have to limit the results, show the buttons
	if (intLimitResults > 0) {

		document.getElementById("results_limited_buttons_less").innerHTML = TEXT_RESULTS_LIMIT_LESS
		document.getElementById("results_limited_buttons_more").innerHTML = TEXT_RESULTS_LIMIT_MORE

	}
	else {
		// Hide the buttons' parent <div>
		document.getElementById("results_limited_buttons").style.display = "none";
	}


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

			// Always show the description on start, even if it was set to 0 in CONFIG.JS
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


	// If the variable "descriptionShowOnStart" is set to 0 in CONFIG.JS, we skip the welcome screen by "clicking" on the start-button to toggle ("collapse" the relevant <div>s
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

	// ...

	if ( (intShowResultsFilter > 0) || (intLimitResults > 0) ) {
		fnCalculateLimitedResultsAndFilters(arCandidatesSortedByPoints, 1)
	}
	else {}

} // end: fnCreateResults()


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
		{ boolQuestionsWereAnswered = true 
		}
	}


	/* ------------------------------------------------------------------- */


	if (boolQuestionsWereAnswered) {

		// Check, if we need statistics.
		if (comment == "noStatistics") {
			// Nothing. Do NOT show a modal "Allow statistics" and show the results right away.
			// This case happens, when the results were in the address-bar and shared with someone.
		}
		// Check, if the statistics were set in CONFIG.JS and an imprint exists -> modal popup
		else if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
		{
			fnShowModal("statistics")	
		}
		else {
			// Nothing. The statistics were not activated in CONFIG.JS
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
	else if (topic == "noFilterResult") {
		text_modal_title = TEXT_MODAL_ERROR_FILTER_TITLE
		text_modal_text = TEXT_MODAL_ERROR_FILTER_TEXT
		text_modal_yes = TEXT_MODAL_ERROR_FILTER_YES
		text_modal_no = TEXT_MODAL_ERROR_FILTER_NO
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

	// Remove / Reset any existing onclick
	mowModal_answerYes.onclick = null

	// Set an onclick-function to the YES-button
	if (topic == "statistics") {
		mowModal_answerYes.onclick = function() { fnSendResultsToServer() }
	}

	// Show modal popup
	const mowModal = new bootstrap.Modal(document.getElementById('mowModal'))
	mowModal.show()

} // end: fnShowModal()


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

	return progressBar

} // end: fnSetProgressBar()




/* *************************************************************************** */
