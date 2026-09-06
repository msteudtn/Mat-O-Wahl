"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

	 // let size = Object.keys(objQuestions).length;
	 // console.log(size)


// Show the welcome screen 
function fnShowDescription() {
	
	document.getElementById("descriptionHeading1").innerHTML = descriptionHeading1
	document.getElementById("descriptionHeading2").innerHTML = descriptionHeading2
	document.getElementById("descriptionExplanation").innerHTML = descriptionExplanation
	document.getElementById("descriptionButtonStart").innerHTML = TEXT_START
	
	// If the variable "descriptionShowOnStart" is set to 0 in DEFINITION.JS, we skip the welcome screen by "clicking" on the start-button 
// ### !!! ***	
if (descriptionShowOnStart == 1) {
//	if (descriptionShowOnStart == 1) {
		
		document.getElementById("descriptionButtonStart").click()
		
	} else {
		// nothing to do 
	}

} // end: fnShowDescription()

/* --------------------------------------------------------------------------- */

function fnHideDescriptionOnStart()
{
	document.getElementById("description").style.display = "none";
}

/* --------------------------------------------------------------------------- */

// Create the Bootstrap carousel with questions in <div id="questions">
// https://getbootstrap.com/docs/5.3/components/carousel/
// https://getbootstrap.com/docs/5.3/components/card/
function fnCreateQuestions(objQuestions) {

	// 1. CREATE THE INDICATOR-BUTTONS ("progress")
	// Get the parent div for all buttons. 
	const questionsCarouselIndicatorAllButtons = document.getElementsByClassName("carousel-indicators")

	let indicatorLabel = ""
	
	// Add the template to the parent "carousel-indicators" to create new indicators.
	// Loop over the usual length (not: "intQuestions-1") because, we're adding an extra card "Finished / Show results".
	for (let i = 0; i <= intQuestions; i++ )
	{
		// Create a clone of the indicator-template
		const questionsCarouselIndicatorButtonXYZTemplate = document.getElementById("questionsCarouselIndicatorButtonXYZTemplate");
		const questionsCarouselIndicatorButtonXYZClone = document.importNode(questionsCarouselIndicatorButtonXYZTemplate.content, true);

		// Look for all the "buttons" (indicators) in the cloned template. It's only one button, so the first one [0]. 
 		const questionsCarouselIndicatorButtonXYZ = questionsCarouselIndicatorButtonXYZClone.querySelectorAll("button")[0]
		
		// Change the Bootstrap-attribute "data-bs-slide-to" to the right number 
		questionsCarouselIndicatorButtonXYZ.dataset.bsSlideTo = i
		
		// Set the Bootstrap-class "active" only to the first [0] indicator.
		if (i == 0) {
			questionsCarouselIndicatorButtonXYZ.classList.add('active') 
		}

		// Change the attribute "aria-label" and title to the short/long question from i18n.
		if (i == intQuestions) {
			indicatorLabel = TEXT_VOTING_FINISHED 
		}
		else {
			indicatorLabel = TEXT_QUESTION+" "+ (i+1) + ": "+objQuestions["q"+i].short+" - "+objQuestions["q"+i].long;
		}
		questionsCarouselIndicatorButtonXYZ.setAttribute("aria-label",  indicatorLabel )
		questionsCarouselIndicatorButtonXYZ.title = indicatorLabel
		questionsCarouselIndicatorButtonXYZ.id = "questionsCarouselIndicator-"+i

		// Append the new clone to the parent "carousel-indicators"
		questionsCarouselIndicatorAllButtons[0].appendChild(questionsCarouselIndicatorButtonXYZClone);	
	} // end: for
	
	
	// 2. CREATE THE CARDS ("questions")
	// Get the parent div for all cards.
	const questionsCarouselInner = document.getElementsByClassName("carousel-inner")

	// Add the template to the parent "carousel-inner" to create new cards.
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the card-template
		const questionsCarouselItemsTemplate = document.getElementById("questionsCarouselItemsTemplate");
		const questionsCarouselItemsTemplateClone = document.importNode(questionsCarouselItemsTemplate.content, true);

		// HEADINGS AND QUESTIONS
		// Set the text in <h1> with the title of the election (from DEFINITION.JS)
		questionsCarouselItemsTemplateClone.getElementById("questionsMainHeadline-X").innerHTML = descriptionHeading1
		questionsCarouselItemsTemplateClone.getElementById("questionsMainHeadline-X").id = "questionsMainHeadline-"+i
		
		// Write down the short summary of the question (from objQuestions{})
		questionsCarouselItemsTemplateClone.getElementById("questionsTitle-X").innerHTML = (i+1) + "/" + intQuestions +" " + objQuestions["q"+i].short
		questionsCarouselItemsTemplateClone.getElementById("questionsTitle-X").id = "questionsTitle-"+i

		// Write down the detailed question (from objQuestions{})
		questionsCarouselItemsTemplateClone.getElementById("questionsQuestion-X").innerHTML = objQuestions["q"+i].long
		questionsCarouselItemsTemplateClone.getElementById("questionsQuestion-X").id = "questionsQuestion-"+i


		// VOTING BUTTONS 
		// Set the attributes for the "Agree" button (green, pro, [+], ok) 
		const buttonVotingPro = questionsCarouselItemsTemplateClone.getElementById("votingPro-X")
		buttonVotingPro.innerHTML = TEXT_VOTING_PRO
		buttonVotingPro.setAttribute("aria-label", TEXT_VOTING_PRO)
		buttonVotingPro.dataset.questionNumber = i
		buttonVotingPro.id = "votingPro-"+i
		buttonVotingPro.onclick = function () { fnEvaluation(i, 1, 1) } 

		// Set the attributes for the "Neutral" button (yellow) 
		const buttonVotingNeutral = questionsCarouselItemsTemplateClone.getElementById("votingNeutral-X")
		buttonVotingNeutral.innerHTML = TEXT_VOTING_NEUTRAL
		buttonVotingNeutral.setAttribute("aria-label", TEXT_VOTING_NEUTRAL)
		buttonVotingNeutral.dataset.questionNumber = i
		buttonVotingNeutral.id = "votingNeutral-"+i 
		buttonVotingNeutral.onclick = function () { fnEvaluation(i, 0, 1) } 

		// Set the attributes for the "Disagree" button (red, contra, [-], no) 
		const buttonVotingContra = questionsCarouselItemsTemplateClone.getElementById("votingContra-X")
		buttonVotingContra.innerHTML = TEXT_VOTING_CONTRA
		buttonVotingContra.setAttribute("aria-label", TEXT_VOTING_CONTRA)
		buttonVotingContra.dataset.questionNumber = i
		buttonVotingContra.id = "votingContra-"+i 
		buttonVotingContra.onclick = function () { fnEvaluation(i, -1, 1) } 

		// Set the attributes for the "Important" button (transparent, double) (from i18n)
		const buttonVotingDouble = questionsCarouselItemsTemplateClone.getElementById("votingDouble-X")
		buttonVotingDouble.innerHTML = TEXT_VOTING_DOUBLE
		buttonVotingDouble.setAttribute("aria-label", TEXT_VOTING_DOUBLE)
		buttonVotingDouble.dataset.questionNumber = i
		buttonVotingDouble.id = "votingDouble-"+i 
		buttonVotingDouble.onclick = function () { fnChangeButtonDouble(i, 2) } // Attention: Different function-call here. :)
		
		// Set the attributes for the "Skip" button (grey) 
		const buttonVotingSkip = questionsCarouselItemsTemplateClone.getElementById("votingSkip-X")
		buttonVotingSkip.innerHTML = TEXT_VOTING_SKIP
		buttonVotingSkip.setAttribute("aria-label", TEXT_VOTING_SKIP)
		buttonVotingSkip.dataset.questionNumber = i
		buttonVotingSkip.id = "votingSkip-"+i
		buttonVotingSkip.onclick = function () { fnEvaluation(i, -99, -1) } 

		
		// GENERAL
		// Set the Bootstrap-class "active" only to the first card 
		if (i == 0) {
			questionsCarouselItemsTemplateClone.querySelectorAll("div.carousel-item")[0].classList.add('active') 
		}

		// Append new clone to the parent "carousel-inner"
		questionsCarouselInner[0].appendChild(questionsCarouselItemsTemplateClone);			
	}


	// 3. ADD LAST CARD "Continue to results" 
	// Get the parent div for all cards. -> No, it's not necessary, because it was already set above. :) 
	// const questionsCarouselInner = document.getElementsByClassName("carousel-inner")

	// Create a clone of the card-template
	const questionsCarouselItemShowResultsTemplate = document.getElementById("questionsCarouselItemShowResultsTemplate");
	const questionsCarouselItemShowResultsTemplateClone = document.importNode(questionsCarouselItemShowResultsTemplate.content, true);

	// HEADINGS AND QUESTIONS
	// Set the text in <h1> with the title of the election (from DEFINITION.JS)
	questionsCarouselItemShowResultsTemplateClone.getElementById("questionsMainHeadline-X").innerHTML = descriptionHeading1
	questionsCarouselItemShowResultsTemplateClone.getElementById("questionsMainHeadline-X").id = "questionsMainHeadline-"+i
	
	// Write down the short text of "questions finished" (from i18n)
	questionsCarouselItemShowResultsTemplateClone.getElementById("questionsTitle-X").innerHTML = TEXT_RESULTS_CARD_SHORT
	questionsCarouselItemShowResultsTemplateClone.getElementById("questionsTitle-X").id = "questionsTitle-"+i

	// Write down the detailed text of "questions finished" (from i18n)
	questionsCarouselItemShowResultsTemplateClone.getElementById("questionsQuestion-X").innerHTML = TEXT_RESULTS_CARD_LONG
	questionsCarouselItemShowResultsTemplateClone.getElementById("questionsQuestion-X").id = "questionsQuestion-"+i
	
	// Set the attributes for the "Show Results" button (blue) 
	const buttonShowResults = questionsCarouselItemShowResultsTemplateClone.getElementById("buttonShowResults")
	buttonShowResults.innerHTML = TEXT_VOTING_FINISHED
	buttonShowResults.setAttribute("aria-label", TEXT_VOTING_FINISHED)
	buttonShowResults.onclick = function () { alert("Yay, results") } 

	// Append new clone to the parent "carousel-inner"
	questionsCarouselInner[0].appendChild(questionsCarouselItemShowResultsTemplateClone);			

	
} // end: fnCreateQuestions()

/* --------------------------------------------------------------------------- */

// Change the importance (intMultiplier) of the PRO and CONTRA buttons if DOUBLE has been clicked
function fnChangeButtonDouble(intCurrentQuestion, intMultiplier) {

	const buttonVotingPro = document.getElementById("votingPro-"+intCurrentQuestion)
	const buttonVotingNeutral = document.getElementById("votingNeutral-"+intCurrentQuestion)
	const buttonVotingContra = document.getElementById("votingContra-"+intCurrentQuestion)
	const buttonVotingDouble = document.getElementById("votingDouble-"+intCurrentQuestion)
	
	let cssClassToAdd = ""
	let cssClassToRemove = ""
	let ariaPressedState = ""

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

	// Add / remove DARK-class and OUTLINE-class on DOUBLE-button
	buttonVotingDouble.classList.add(cssClassToAdd)
	buttonVotingDouble.classList.remove(cssClassToRemove)
	buttonVotingDouble.setAttribute("aria-pressed", ariaPressedState)
	
	// Change intMultiplier from (1 to 2) on PRO-button 
	buttonVotingPro.removeAttribute("onclick")
	buttonVotingPro.onclick = function () {	fnEvaluation(intCurrentQuestion, 1, intMultiplier) }

	// Change intMultiplier from (1 to 2) on NEUTRAL-button 
	buttonVotingNeutral.removeAttribute("onclick")
	buttonVotingNeutral.onclick = function () { fnEvaluation(intCurrentQuestion, 0, intMultiplier) }
	
	// Change intMultiplier from (1 to 2) on CONTRA-button 
	buttonVotingContra.removeAttribute("onclick")
	buttonVotingContra.onclick = function () { fnEvaluation(intCurrentQuestion, -1, intMultiplier) } 

} // end: fnChangeButtonDouble()


/* --------------------------------------------------------------------------- */

// Change the color of the little indicators (navigation) based on the user's answer.
function fnChangeIndicatorColors() {

	// Color-properties are defined in the BUTTONS.CSS (***###!!!)
	let cssColor = "";

	// Loop through all answers so far.
	// Example: [1, -1,  , 0] = 3 / 6 questions answered and one skipped
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {

		let currentIndicator = document.getElementById("questionsCarouselIndicator-"+i)

		// neutral button -> yellow
		if (arPersonalAnswers[i] == 0) {
			cssColor = "var(--aria-button-yellow)"  }
		// skip button or skipped by indicators -> grey
		else if ( (arPersonalAnswers[i] == 99) || (!arPersonalAnswers[i]) ) {
			cssColor = "grey" }
		// pro button -> grey
		else if (arPersonalAnswers[i] > 0) {
			cssColor = "var(--aria-button-green)" }
		// contra button -> red
		else if (arPersonalAnswers[i] < 0) {
			cssColor = "var(--aria-button-red)" } 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeIndicatorColors(). This shouldn't happen.")
		}

		currentIndicator.style.backgroundColor = cssColor
//		console.log(cssColor)
	}

} // end: fnChangeIndicatorColors()

/* --------------------------------------------------------------------------- */

// Change the font-weight to "bold" for the clicked pro/neutral/contra-button
function fnChangeVotingButtonFontWeight() {

	// Loop through all answers so far.
	// Example: [1, -1,  , 0] = 3 / 6 questions answered and one skipped
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {

		let currentButtonPro = document.getElementById("votingPro-"+i)
		let currentButtonNeutral = document.getElementById("votingNeutral-"+i)
		let currentButtonContra = document.getElementById("votingContra-"+i)

		// Reset the font-weight on all buttons
		currentButtonPro.style.fontWeight = "normal"
		currentButtonNeutral.style.fontWeight = "normal"
		currentButtonContra.style.fontWeight = "normal"

		// Change it to bold, depending on the answer
		// Neutral
		if (arPersonalAnswers[i] == 0) {
			currentButtonNeutral.style.fontWeight = "bold"
		}
		// skip
		else if ( (arPersonalAnswers[i] == 99) || (!arPersonalAnswers[i]) ) {
			// nothing
		}
		// pro
		else if (arPersonalAnswers[i] > 0) {
			currentButtonPro.style.fontWeight = "bold"
		}
		// contra
		else if (arPersonalAnswers[i] < 0) {
			currentButtonContra.style.fontWeight = "bold"
		} 
		else {
			console.log("Strange. We're in the ELSE-part of fnChangeVotingButtonFontWeight(). This shouldn't happen.")
		}
	}
} // end: fnChangeVotingButtonFontWeight()

/* --------------------------------------------------------------------------- */

function fnCreateResults(arCandidatesSortedByPoints, intMaxPoints) {

	console.log("building results")

	// Set the name of the election (from DEFINITION.JS) as heading again
	document.getElementById("resultsHeading1").innerHTML = descriptionHeading1;

	fnCreateResultsOverview(arCandidatesSortedByPoints, intMaxPoints)

	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

	}

} // end: fnCreateResults()

/* --------------------------------------------------------------------------- */

function fnCreateResultsOverview(arCandidatesSortedByPoints, intMaxPoints) {


	// Set the text in <h2> (from i18n)
	document.getElementById("resultsSummaryHeading").innerHTML = TEXT_RESULTS_HEADING_SHORT_SUMMARY


	// Get the parent div for all candidates (overview)
	const resultsOverviewCandidates = document.getElementById("resultsOverviewCandidates")

	// Clear all existing content
	resultsOverviewCandidates.innerHTML = ""
	

	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

		// Get the ID of the candidate from the ordered array
		// Example: arCandidatesSortedByPoints[0].id = "c3"
		let idOfCandidate = arCandidatesSortedByPoints[i].id

		// Create a clone of the results-overview-template
		const resultsOverviewCandidatesTemplate = document.getElementById("resultsOverviewCandidatesTemplate");
		const resultsOverviewCandidatesTemplateClone = document.importNode(resultsOverviewCandidatesTemplate.content, true);

		// Add a click-function to the toggle-button (before changing it's ID)
		resultsOverviewCandidatesTemplateClone.getElementById("buttonShowCandidateDivDescription-X").onclick = function () { fnToggleDiv("candidateDivDescription-"+i, "buttonShowCandidateDivDescription-"+i) } 

		// Set the toggle-button for this candidate
		const buttonShowCandidateDivDescription = resultsOverviewCandidatesTemplateClone.getElementById("buttonShowCandidateDivDescription-X")
		buttonShowCandidateDivDescription.innerHTML = "open / close"
		buttonShowCandidateDivDescription.id = "buttonShowCandidateDivDescription-"+i
		buttonShowCandidateDivDescription.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
		buttonShowCandidateDivDescription.title = TEXT_RESULTS_TOGGLE_BUTTON
 
		// Set the short name of the candidate (from objCandidates)
		resultsOverviewCandidatesTemplateClone.getElementById("candidateShort-X").innerHTML = objCandidates[idOfCandidate].short
		resultsOverviewCandidatesTemplateClone.getElementById("candidateShort-X").id = "candidateShort-"+i

		// Set the long name of the candidate (from objCandidates)
		resultsOverviewCandidatesTemplateClone.getElementById("candidateLong-X").innerHTML = objCandidates[idOfCandidate].long
		resultsOverviewCandidatesTemplateClone.getElementById("candidateLong-X").id = "candidateLong-"+i

		// Set the description of the candidate (from objCandidates)
		resultsOverviewCandidatesTemplateClone.getElementById("candidateDescription-X").innerHTML = objCandidates[idOfCandidate].desc
		resultsOverviewCandidatesTemplateClone.getElementById("candidateDescription-X").id = "candidateDescription-"+i

		// Set the URL (web, site, page) of the candidate (from objCandidates)
		resultsOverviewCandidatesTemplateClone.getElementById("candidateUrl-X").innerHTML = objCandidates[idOfCandidate].url
		resultsOverviewCandidatesTemplateClone.getElementById("candidateUrl-X").id = "candidateUrl-"+i

		// Set the image of the candidate (from objCandidates)
		const candidateImage = resultsOverviewCandidatesTemplateClone.getElementById("candidateImage-X")
		candidateImage.src = objCandidates[idOfCandidate].pic
//		candidateImage.style.width = intPartyLogosImgWidth
//		candidateImage.style.height = intPartyLogosImgHeight
		candidateImage.id = "candidateImage-"+i
		candidateImage.title = TEXT_IMAGE+ " : " + objCandidates[idOfCandidate].short
		candidateImage.setAttribute("alt", TEXT_IMAGE+ " : " + objCandidates[idOfCandidate].short)

		// Set the ID of the parent description-DIV to toggle it later by button "buttonShowCandidateDivDescription-X"
		resultsOverviewCandidatesTemplateClone.getElementById("candidateDivDescription-X").id = "candidateDivDescription-"+i

		// Calculate the percentage for the progress-bar 
		let intPercentage = Math.round ( ( objCandidates[idOfCandidate].points / intMaxPoints ) * 100 )

		// Set the color for the progress-bar
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

		/// Set the width and color of the progress-bar
		resultsOverviewCandidatesTemplateClone.getElementById("candidateProgressBar-X").style.width = intPercentage+"%"
		resultsOverviewCandidatesTemplateClone.getElementById("candidateProgressBar-X").classList.add(progressBarColor) 
		resultsOverviewCandidatesTemplateClone.getElementById("candidateProgressBar-X").setAttribute("aria-valuenow", intPercentage)
		resultsOverviewCandidatesTemplateClone.getElementById("candidateProgressBar-X").title = intPercentage+"% ("+objCandidates[idOfCandidate].points+ "/" +intMaxPoints+ ")"
		resultsOverviewCandidatesTemplateClone.getElementById("candidateProgressBar-X").id = "candidateProgressBar-"+i

		// Write down the percentage and points behind the progress bar 
		resultsOverviewCandidatesTemplateClone.getElementById("candidatePercentage-X").innerHTML = intPercentage+"%"
		resultsOverviewCandidatesTemplateClone.getElementById("candidatePercentage-X").id = "candidatePercentage-"+i


		// Append the new clone to the parent "resultsOverviewCandidates"
		resultsOverviewCandidates.appendChild(resultsOverviewCandidatesTemplateClone);


		// SIZE
//		let divWidth = document.getElementById("candidateDivDescription-"+i).offsetWidth 

//		document.getElementById("candidateImage-"+i).style.maxWidth = ( divWidth / 2 )+"px"

		// Run the TOGGLE-function to hide the description-DIV and set open/close-icon on the button
		fnToggleDiv("candidateDivDescription-"+i, "buttonShowCandidateDivDescription-"+i)

	}


} // end: fnCreateResultsOverview()


/* --------------------------------------------------------------------------- */

function fnToggleDiv(divNameToToggle, buttonNameToToggle) {

	let divToToggle = document.getElementById(divNameToToggle)
	let buttonToToggle = document.getElementById(buttonNameToToggle)

	divToToggle.classList.toggle('displayNone');

	// DIV is set to hide, so, we change the button to "open" (&bigtriangledown;)
	if (divToToggle.classList.contains('displayNone')) {
		buttonToToggle.innerHTML = "&bigtriangledown;"
		buttonToToggle.setAttribute("aria-pressed", "false")
	}
	// DIV is set to show, so, we change the button to "open" (&bigtriangleup;)
	else {
		buttonToToggle.innerHTML = "&bigtriangleup;"
		buttonToToggle.setAttribute("aria-pressed", "true")
	}

} // end: fnCreateResults()

