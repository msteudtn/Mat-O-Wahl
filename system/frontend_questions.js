"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


// Create the Bootstrap carousel with questions in <div id="questions">
// https://getbootstrap.com/docs/5.3/components/carousel/
// https://getbootstrap.com/docs/5.3/components/card/
function fnCreateQuestions(objQuestions) {

	// 1. CREATE THE INDICATOR (progress, buttons)
	// Get the parent div for all buttons. 
	const questionsCarouselIndicatorAllButtons = document.getElementsByClassName("carousel-indicators")

	let indicatorLabel = ""
	
	// Add the template to the parent "carousel-indicators" to create new indicators.
	// Loop over the usual length (not: "intQuestions-1") because, we're adding an extra card "Finished / Show results".
	for (let i = 0; i <= intQuestions; i++ )
	{
		// Create a clone of the indicator-template
		const questionsCarouselIndicatorTemplate = document.getElementById("questionsCarouselIndicatorTemplate");
		const questionsCarouselIndicatorTemplateClone = document.importNode(questionsCarouselIndicatorTemplate.content, true);
	
		// Replace all <!--- comments --> inside the HTML
//		questionsCarouselIndicatorTemplateClone.innerHTML.replace(/<\!--.*?-->/g, "");

		// Look for all the "buttons" (indicators) in the cloned template. It's only one button, so it's the first one [0]. 
 		const questionsCarouselIndicatorButton = questionsCarouselIndicatorTemplateClone.querySelectorAll("button")[0]
		
		// Change the Bootstrap-attribute "data-bs-slide-to" to the right number 
		questionsCarouselIndicatorButton.dataset.bsSlideTo = i
		
		// Set the Bootstrap-class "active" only to the first [0] indicator.
		if (i == 0) {
			questionsCarouselIndicatorButton.classList.add('active') 
		}

		// Change the attribute "aria-label" and title to the short/long question from i18n.
		if (i == intQuestions) {
			indicatorLabel = TEXT_VOTING_FINISHED 
		}
		else {
			indicatorLabel = TEXT_QUESTION+" "+ (i+1) + ": "+objQuestions["q"+i].short+" - "+objQuestions["q"+i].long;
		}
		questionsCarouselIndicatorButton.setAttribute("aria-label",  indicatorLabel )
		questionsCarouselIndicatorButton.title = indicatorLabel
		questionsCarouselIndicatorButton.id = "questionsCarouselIndicator-"+i

		// Append the new clone to the parent "carousel-indicators"
		questionsCarouselIndicatorAllButtons[0].appendChild(questionsCarouselIndicatorTemplateClone);	
	} // end: for


	/* ------------------------------------------------------------------- */	


	// 2. CREATE THE CARDS ("questions")
	// Get the parent div for all cards.
	const questionsCarouselInner = document.getElementsByClassName("carousel-inner")

	// Add the template to the parent "carousel-inner" to create new cards.
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the card-template
		const questionsCarouselItemsTemplate = document.getElementById("questionsCarouselItemsTemplate");
		const questionsCarouselItemsTemplateClone = document.importNode(questionsCarouselItemsTemplate.content, true);

		// Replace all <!--- comments --> inside the HTML
//		questionsCarouselItemsTemplateClone.replace(/<\!--.*?-->/g, "");

		// HEADINGS AND QUESTIONS
		// Set the text in <h1> with the title of the election (from DEFINITION.JS)
		const questionsMainHeadline = questionsCarouselItemsTemplateClone.getElementById("questionsMainHeadline-X")
		questionsMainHeadline.innerHTML = descriptionHeading1
		questionsMainHeadline.id = "questionsMainHeadline-"+i
		
		// Write down the short summary of the question (from objQuestions{})
		const questionsTitle = questionsCarouselItemsTemplateClone.getElementById("questionsTitle-X")
		questionsTitle.innerHTML = (i+1) + "/" + intQuestions +" " + objQuestions["q"+i].short
		questionsTitle.id = "questionsTitle-"+i

		// Write down the detailed question (from objQuestions{})
		const questionsQuestion = questionsCarouselItemsTemplateClone.getElementById("questionsQuestion-X")
		questionsQuestion.innerHTML = objQuestions["q"+i].long
		questionsQuestion.id = "questionsQuestion-"+i


		// VOTING BUTTONS 
		// Set the attributes for the "Agree" button (green, pro, [+], ok) 
		const buttonVotingPro = questionsCarouselItemsTemplateClone.getElementById("votingPro-X")
		buttonVotingPro.innerHTML = TEXT_VOTING_PRO_SHORT+" "+TEXT_VOTING_PRO_LONG
		buttonVotingPro.setAttribute("aria-label", TEXT_VOTING_PRO_LONG)
		buttonVotingPro.dataset.questionNumber = i
		buttonVotingPro.id = "votingPro-"+i
		buttonVotingPro.onclick = function () { fnEvaluation(i, 1, 1) } 

		// Set the attributes for the "Neutral" button (yellow) 
		const buttonVotingNeutral = questionsCarouselItemsTemplateClone.getElementById("votingNeutral-X")
		buttonVotingNeutral.innerHTML = TEXT_VOTING_NEUTRAL_SHORT+" "+TEXT_VOTING_NEUTRAL_LONG
		buttonVotingNeutral.setAttribute("aria-label", TEXT_VOTING_NEUTRAL_LONG)
		buttonVotingNeutral.dataset.questionNumber = i
		buttonVotingNeutral.id = "votingNeutral-"+i 
		buttonVotingNeutral.onclick = function () { fnEvaluation(i, 0, 1) } 

		// Set the attributes for the "Disagree" button (red, contra, [-], no) 
		const buttonVotingContra = questionsCarouselItemsTemplateClone.getElementById("votingContra-X")
		buttonVotingContra.innerHTML = TEXT_VOTING_CONTRA_SHORT+" "+TEXT_VOTING_CONTRA_LONG
		buttonVotingContra.setAttribute("aria-label", TEXT_VOTING_CONTRA_LONG)
		buttonVotingContra.dataset.questionNumber = i
		buttonVotingContra.id = "votingContra-"+i 
		buttonVotingContra.onclick = function () { fnEvaluation(i, -1, 1) } 

		// Set the attributes for the "Important" button (transparent, double) (from i18n)
		const buttonVotingDouble = questionsCarouselItemsTemplateClone.getElementById("votingDouble-X")
		buttonVotingDouble.innerHTML = TEXT_VOTING_DOUBLE_SHORT+" "+TEXT_VOTING_DOUBLE_LONG
		buttonVotingDouble.setAttribute("aria-label", TEXT_VOTING_DOUBLE_LONG)
		buttonVotingDouble.dataset.questionNumber = i
		buttonVotingDouble.id = "votingDouble-"+i 
		buttonVotingDouble.onclick = function () { fnChangeButtonDouble(i, 2) } // Attention: Different function-call here. :)
		
		// Set the attributes for the "Skip" button (grey) 
		const buttonVotingSkip = questionsCarouselItemsTemplateClone.getElementById("votingSkip-X")
		buttonVotingSkip.innerHTML = TEXT_VOTING_SKIP_SHORT+" "+TEXT_VOTING_SKIP_LONG
		buttonVotingSkip.setAttribute("aria-label", TEXT_VOTING_SKIP_LONG)
		buttonVotingSkip.dataset.questionNumber = i
		buttonVotingSkip.id = "votingSkip-"+i
		buttonVotingSkip.onclick = function () { fnEvaluation(i, 99, 0) } 

		
		// GENERAL
		// Set the Bootstrap-class "active" only to the first CARD
		if (i == 0) {
			questionsCarouselItemsTemplateClone.querySelectorAll("div.carousel-item")[0].classList.add('active') 
		}

		// Append new clone to the parent "carousel-inner"
		questionsCarouselInner[0].appendChild(questionsCarouselItemsTemplateClone);			
	}


	/* ------------------------------------------------------------------- */


	// 3. ADD LAST CARD "Continue to results" 
	// Get the parent div for all cards. -> No, it's not necessary, because it was already set above. :) 
	// const questionsCarouselInner = document.getElementsByClassName("carousel-inner")

	// Create a clone of the card-template
	const questionsCarouselItemShowResultsTemplate = document.getElementById("questionsCarouselItemShowResultsTemplate");
	const questionsCarouselItemShowResultsTemplateClone = document.importNode(questionsCarouselItemShowResultsTemplate.content, true);

	// HEADINGS AND QUESTIONS
	// Set the text in <h1> with the title of the election (from DEFINITION.JS)
	const questionsMainHeadline = questionsCarouselItemShowResultsTemplateClone.getElementById("questionsMainHeadline-X")
	questionsMainHeadline.innerHTML = descriptionHeading1
	questionsMainHeadline.id = "questionsMainHeadline-"+i
	
	// Write down the short text of "questions finished" (from i18n)
	const questionsTitle = questionsCarouselItemShowResultsTemplateClone.getElementById("questionsTitle-X")
	questionsTitle.innerHTML = TEXT_RESULTS_CARD_SHORT
	questionsTitle.id = "questionsTitle-"+i

	// Write down the detailed text of "questions finished" (from i18n)
	const questionsQuestion = questionsCarouselItemShowResultsTemplateClone.getElementById("questionsQuestion-X")
	questionsQuestion.innerHTML = TEXT_RESULTS_CARD_LONG
	questionsQuestion.id = "questionsQuestion-"+i
	
	// Set the attributes for the "Show Results" button (blue) 
	const buttonShowResults = questionsCarouselItemShowResultsTemplateClone.getElementById("buttonShowResults")
	buttonShowResults.innerHTML = TEXT_VOTING_FINISHED
	buttonShowResults.setAttribute("aria-label", TEXT_VOTING_FINISHED)
	buttonShowResults.title = TEXT_VOTING_FINISHED
//	buttonShowResults.onclick = function() { alert("Yay, results") } 
	buttonShowResults.onclick = function() { fnHideQuestionsAndShowResults() }  

	// Append new clone to the parent "carousel-inner"
	questionsCarouselInner[0].appendChild(questionsCarouselItemShowResultsTemplateClone);			

	
} // end: fnCreateQuestions()



/* *************************************************************************** */


function fnHideQuestionsAndShowResults()
{

	let boolQuestionsWereAnswered = false

	// Go through all the personal answers and check if at least one answer was clicked (-2, -1, 0, 1 or 2 but not 99)
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ )
	{
		if ( (arPersonalAnswers[i] >= -2) && (arPersonalAnswers[i] < 99) )
		{ boolQuestionsWereAnswered = true }
	}


	if (boolQuestionsWereAnswered) {

		// Check if the statistics were set in DEFINITION.JS and an imprint exists -> modal popup
		if ((imprintPrivacyUrl.length > 0) && (statsRecord) )
		{
			fnShowModal("statistics")	
		}

		// everything alright. The user answered some questions
		fnToggleDiv("results", "buttonShowResults", 0) 
		fnToggleDiv("questions", "buttonShowResults", 0) 

	}
	// The user did NOT answer any question -> modal popup!
	else {
		fnShowModal("noAnswers")
	}
}

/* *************************************************************************** */

