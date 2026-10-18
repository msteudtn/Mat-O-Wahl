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
	const parentToTemplate_indicators = document.getElementsByClassName("carousel-indicators")[0]

	let indicatorLabel = ""
	
	// Add the template to the parent "carousel-indicators" to create new INDICATORS.
	// Loop over the usual length (not: "intQuestions-1") because, we're adding an extra card "Finished / Show results".
	for (let i = 0; i <= intQuestions; i++ )
	{
		// Create a clone of the indicator-template
		const questionsCarousel_indicators_template = document.getElementById("questionsCarousel_indicators_template");
		const questionsCarousel_indicators_templateClone = document.importNode(questionsCarousel_indicators_template.content, true);

		// Look for all the "buttons" (indicators) in the cloned template. It's only one button, so it's the first one [0]. 
 		const questionsCarousel_indicators_button = questionsCarousel_indicators_templateClone.querySelectorAll("button")[0]
		
		// Change the Bootstrap-attribute "data-bs-slide-to" to the right number 
		questionsCarousel_indicators_button.dataset.bsSlideTo = i
		
		// Set the Bootstrap-class "active" only to the FIRST [0] indicator.
		if (i == 0) {
			questionsCarousel_indicators_button.classList.add('active') 
		}

		// Change the attribute "aria-label" and title to the short/long question from i18n on the LAST indicator
		if (i == intQuestions) {
			indicatorLabel = TEXT_VOTING_FINISHED 
		}
		else {
			indicatorLabel = TEXT_QUESTION+" "+ (i+1) + ": "+objQuestions["q"+i].short+" - "+objQuestions["q"+i].long;
		}
		indicatorLabel = fnClearHtmlTags(indicatorLabel)
		questionsCarousel_indicators_button.setAttribute("aria-label", fnClearHtmlTags(indicatorLabel) )
		questionsCarousel_indicators_button.title = fnClearHtmlTags(indicatorLabel)
		questionsCarousel_indicators_button.id = "questionsCarouselIndicator-"+i

		// Append the new clone to the parent "carousel-indicators"
		parentToTemplate_indicators.appendChild(questionsCarousel_indicators_templateClone);	
	} // end: for


	/* ------------------------------------------------------------------- */	


	// 2. CREATE THE CARDS ("questions")
	// Get the parent div for all cards.
	const parentToTemplate_items = document.getElementsByClassName("carousel-inner")[0]

	// Add the template to the parent "carousel-inner" to create new cards.
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the card-template
		const questionsCarousel_items_template = document.getElementById("questionsCarousel_items_template");
		const questionsCarousel_items_templateClone = document.importNode(questionsCarousel_items_template.content, true);


		// HEADINGS AND QUESTIONS
		// Set the text in <h1> with the title of the election (from DEFINITION.JS)
		const questionsCarousel_items_mainHeadline = questionsCarousel_items_templateClone.getElementById("questionsCarousel_items_mainHeadline-X")
		questionsCarousel_items_mainHeadline.innerHTML = descriptionHeading1
		questionsCarousel_items_mainHeadline.id = "questionsCarousel_items_mainHeadline-"+i
		
		// Write down the short summary of the question (from objQuestions{})
		const questionsCarousel_items_title = questionsCarousel_items_templateClone.getElementById("questionsCarousel_items_title-X")
		questionsCarousel_items_title.innerHTML = (i+1) + "/" + intQuestions +" " + objQuestions["q"+i].short
		questionsCarousel_items_title.id = "questionsCarousel_items_title-"+i

		// Write down the detailed question (from objQuestions{})
		const questionsCarousel_items_question = questionsCarousel_items_templateClone.getElementById("questionsCarousel_items_question-X")
		questionsCarousel_items_question.innerHTML = objQuestions["q"+i].long
		questionsCarousel_items_question.id = "questionsCarousel_items_question-"+i


		/* ----------------------------------------------------------- */


		// VOTING BUTTONS 
		// 1/5 : Set the attributes for the "Extra Agree" button (green, pro, [++], ok) 
		const buttonVotingProExtra = questionsCarousel_items_templateClone.getElementById("votingProExtra-X")
		if (intQuestionButtons == 3) {
			// Hide parent of <button> = <div> ...
			buttonVotingProExtra.parentElement.style.display = "none"
		}
		// ... but set the attributes anyway to avoid error messages from other functions, that access this button
		buttonVotingProExtra.innerHTML = TEXT_VOTING_PRO_EXTRA_SHORT+" "+TEXT_VOTING_PRO_EXTRA_LONG
		buttonVotingProExtra.setAttribute("aria-label", TEXT_VOTING_PRO_EXTRA_LONG)
		buttonVotingProExtra.title = TEXT_VOTING_PRO_EXTRA_LONG
		buttonVotingProExtra.dataset.questionNumber = i
		buttonVotingProExtra.id = "votingProExtra-"+i
		buttonVotingProExtra.onclick = function () { fnEvaluationCurrentAnswer(i, 1, 1.5) } 


		// 2/5 Set the attributes for the "Agree" button (green, pro, [+], ok) 
		const buttonVotingPro = questionsCarousel_items_templateClone.getElementById("votingPro-X")
		buttonVotingPro.innerHTML = TEXT_VOTING_PRO_SHORT+" "+TEXT_VOTING_PRO_LONG
		buttonVotingPro.setAttribute("aria-label", TEXT_VOTING_PRO_LONG)
		buttonVotingPro.title = TEXT_VOTING_PRO_LONG
		buttonVotingPro.dataset.questionNumber = i
		buttonVotingPro.id = "votingPro-"+i
		buttonVotingPro.onclick = function () { fnEvaluationCurrentAnswer(i, 1, 1) } 

		// 3/5 Set the attributes for the "Neutral" button (yellow) 
		const buttonVotingNeutral = questionsCarousel_items_templateClone.getElementById("votingNeutral-X")
		if (intShowButtonNeutral == 0) {
			// Hide parent of <button> = <div> ...
			buttonVotingNeutral.parentElement.style.display = "none"
		}
		// ... but set the attributes anyway to avoid error messages from other functions, that access this button
		buttonVotingNeutral.innerHTML = TEXT_VOTING_NEUTRAL_SHORT+" "+TEXT_VOTING_NEUTRAL_LONG
		buttonVotingNeutral.setAttribute("aria-label", TEXT_VOTING_NEUTRAL_LONG)
		buttonVotingNeutral.title = TEXT_VOTING_NEUTRAL_LONG
		buttonVotingNeutral.dataset.questionNumber = i
		buttonVotingNeutral.id = "votingNeutral-"+i 
		// buttonVotingNeutral.onclick = function () { fnEvaluationCurrentAnswer(i, 0, 1) } 
		buttonVotingNeutral.onclick = function () { fnEvaluationCurrentAnswer(i, 0.5, 1) } 

		// 4/5 Set the attributes for the "Disagree" button (red, contra, [-], no) 
		const buttonVotingContra = questionsCarousel_items_templateClone.getElementById("votingContra-X")
		buttonVotingContra.innerHTML = TEXT_VOTING_CONTRA_SHORT+" "+TEXT_VOTING_CONTRA_LONG
		buttonVotingContra.setAttribute("aria-label", TEXT_VOTING_CONTRA_LONG)
		buttonVotingContra.title = TEXT_VOTING_CONTRA_LONG
		buttonVotingContra.dataset.questionNumber = i
		buttonVotingContra.id = "votingContra-"+i 
		buttonVotingContra.onclick = function () { fnEvaluationCurrentAnswer(i, -1, 1) } 

		// 5/5 Set the attributes for the "Disagree very much" button (red, contra extra, [--], no) 
		const buttonVotingContraExtra = questionsCarousel_items_templateClone.getElementById("votingContraExtra-X")
		if (intQuestionButtons == 3) {
			// Hide parent of <button> = <div> ...
			buttonVotingContraExtra.parentElement.style.display = "none"
		}
		// ... but set the attributes anyway to avoid error messages from other functions, that access this button
		buttonVotingContraExtra.innerHTML = TEXT_VOTING_CONTRA_EXTRA_SHORT+" "+TEXT_VOTING_CONTRA_EXTRA_LONG
		buttonVotingContraExtra.setAttribute("aria-label", TEXT_VOTING_CONTRA_EXTRA_LONG)
		buttonVotingContraExtra.title = TEXT_VOTING_CONTRA_EXTRA_LONG
		buttonVotingContraExtra.dataset.questionNumber = i
		buttonVotingContraExtra.id = "votingContraExtra-"+i 
		buttonVotingContraExtra.onclick = function () { fnEvaluationCurrentAnswer(i, -1, 1.5) 
		} 


		/* ----------------------------------------------------------- */


		// SPECIAL BUTTONS 
		// 1/2 Set the attributes for the "Important" button (transparent, double) (from i18n)
		const buttonVotingDouble = questionsCarousel_items_templateClone.getElementById("votingDouble-X")
		if (intShowButtonDouble == 0) {
			// Hide parent of <button> = <div> ...
			buttonVotingDouble.parentElement.style.display = "none"
		}
		// ... but set the attributes anyway to avoid error messages from other functions, that access this button
		buttonVotingDouble.innerHTML = TEXT_VOTING_DOUBLE_SHORT+" "+TEXT_VOTING_DOUBLE_LONG
		buttonVotingDouble.setAttribute("aria-label", TEXT_VOTING_DOUBLE_LONG)
		buttonVotingDouble.title = TEXT_VOTING_DOUBLE_LONG+" - "+TEXT_VOTING_DOUBLE_HELP
		buttonVotingDouble.dataset.questionNumber = i
		buttonVotingDouble.id = "votingDouble-"+i 
		buttonVotingDouble.onclick = function () { fnChangeButtonDouble(i, 2) } // Attention: Different function-call here. :)
		
		// 2/2 Set the attributes for the "Skip" button (grey) 
		const buttonVotingSkip = questionsCarousel_items_templateClone.getElementById("votingSkip-X")
		if (intShowButtonSkip == 0) {
			// Hide parent of <button> = <div> ...
			buttonVotingSkip.parentElement.style.display = "none"
		}
		// ... but set the attributes anyway to avoid error messages from other functions, that access this button
		buttonVotingSkip.innerHTML = TEXT_VOTING_SKIP_SHORT+" "+TEXT_VOTING_SKIP_LONG
		buttonVotingSkip.setAttribute("aria-label", TEXT_VOTING_SKIP_LONG)
		buttonVotingSkip.title = TEXT_VOTING_SKIP_LONG
		buttonVotingSkip.dataset.questionNumber = i
		buttonVotingSkip.id = "votingSkip-"+i
		buttonVotingSkip.onclick = function () { fnEvaluationCurrentAnswer(i, 0, 0) 
		} 


		/* ----------------------------------------------------------- */
		

		// GENERAL
		// Set the Bootstrap-class "active" only to the first [0] CARD
		if (i == 0) {
			questionsCarousel_items_templateClone.querySelectorAll("div.carousel-item")[0].classList.add('active') 
		}

		// Append new clone to the parent "carousel-inner"
		parentToTemplate_items.appendChild(questionsCarousel_items_templateClone);			
	}


	/* ------------------------------------------------------------------- */


	// 3. ADD LAST CARD "Continue to results" 

	// Do not get the parent <div> for all cards. -> Because it was already set above. :) 

	// Create a clone of the card-template
	const questionsCarousel_items_showResults_template = document.getElementById("questionsCarousel_items_showResults_template");
	const questionsCarousel_items_showResults_templateClone = document.importNode(questionsCarousel_items_showResults_template.content, true);

	// HEADINGS AND QUESTIONS
	// Set the text in <h1> with the title of the election (from DEFINITION.JS)
	const questionsCarousel_items_mainHeadline = questionsCarousel_items_showResults_templateClone.getElementById("questionsCarousel_items_mainHeadline-X")
	questionsCarousel_items_mainHeadline.innerHTML = descriptionHeading1
	questionsCarousel_items_mainHeadline.id = "questionsCarousel_items_mainHeadline-"+i
	
	// Set the short text in <h2> of "questions finished" (from i18n)
	const questionsCarousel_items_title = questionsCarousel_items_showResults_templateClone.getElementById("questionsCarousel_items_title-X")
	questionsCarousel_items_title.innerHTML = TEXT_RESULTS_CARD_SHORT
	questionsCarousel_items_title.id = "questionsCarousel_items_title-"+i

	// Set the short text in <h2>  of "questions finished" (from i18n)
	const questionsCarousel_items_question = questionsCarousel_items_showResults_templateClone.getElementById("questionsCarousel_items_question-X")
	questionsCarousel_items_question.innerHTML = TEXT_RESULTS_CARD_LONG
	questionsCarousel_items_question.id = "questionsCarousel_items_question-"+i
	
	// Set the attributes for the "Show Results" button (blue) 
	const buttonShowResults = questionsCarousel_items_showResults_templateClone.getElementById("buttonShowResults")
	buttonShowResults.innerHTML = TEXT_VOTING_FINISHED
	buttonShowResults.setAttribute("aria-label", TEXT_VOTING_FINISHED)
	buttonShowResults.title = TEXT_VOTING_FINISHED

	// Append new clone to the parent "carousel-inner"
	parentToTemplate_items.appendChild(questionsCarousel_items_showResults_templateClone);			

	
} // end: fnCreateQuestions()



/* *************************************************************************** */

