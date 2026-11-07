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


	// 1/5. CREATE THE CATEGORIES (if available)
	fnCreateQuestionCategories()


	// 2/5. CREATE THE INDICATOR (progress, buttons)
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


	// 3/5. CREATE THE CARDS ("questions")
	// Get the parent div for all cards.
	const parentToTemplate_items = document.getElementsByClassName("carousel-inner")[0]

	// Add the template to the parent "carousel-inner" to create new cards.
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the card-template
		const questionsCarousel_items_template = document.getElementById("questionsCarousel_items_template");
		const questionsCarousel_items_templateClone = document.importNode(questionsCarousel_items_template.content, true);


		/*------------------------------------------------------------ */

		
		// Write down the short summary of the question (from objQuestions{})
		const questionsCarousel_items_title = questionsCarousel_items_templateClone.getElementById("questionsCarousel_items_title-X")
		questionsCarousel_items_title.innerHTML = (i+1) + "/" + intQuestions +" " + objQuestions["q"+i].short
		questionsCarousel_items_title.id = "questionsCarousel_items_title-"+i


		/*------------------------------------------------------------ */


		// Check, if there's a detailed explanation to the question. If so, we'll insert it into the long question.
		let strQuestionLong = objQuestions["q"+i].long

		if (objQuestions["q"+i].moreInfoStart >= 0) {

			// Get the template for the INFORMATION / explanation button (with POPOVER)
			const questionsCarousel_items_moreInformationInSideLongQuestion_template = document.getElementById("questionsCarousel_items_moreInformationInSideLongQuestion_template");
			const questionsCarousel_items_moreInformationInSideLongQuestion_templateClone = document.importNode(questionsCarousel_items_moreInformationInSideLongQuestion_template.content, true);

			// Get the button inside the template and set it's ID
			let questionsCarousel_items_moreInformationInSideLongQuestion_button = questionsCarousel_items_moreInformationInSideLongQuestion_templateClone.getElementById("questionsCarousel_items_moreInformationInSideLongQuestion-X")
			questionsCarousel_items_moreInformationInSideLongQuestion_button.id = "questionsCarousel_items_moreInformationInSideLongQuestion-"+i

			// Set the icon or text on the button 
			questionsCarousel_items_moreInformationInSideLongQuestion_button.innerHTML = strQuestions_moreInformation_symbol
			// Set the text for the popover
			questionsCarousel_items_moreInformationInSideLongQuestion_button.setAttribute("data-bs-content", objQuestions["q"+i].moreInfoText)

			// Split the long question at the icon / symbol. Then, put the popover-button at this position.
			let strQuestionLong_new =  strQuestionLong.slice(0, objQuestions["q"+i].moreInfoStart)
			strQuestionLong_new += " " + questionsCarousel_items_moreInformationInSideLongQuestion_button.outerHTML
			strQuestionLong_new += " " + strQuestionLong.substring(objQuestions["q"+i].moreInfoStart, objQuestions["q"+i].long.length)

			strQuestionLong = strQuestionLong_new
		}


		/*------------------------------------------------------------ */


		// Write down the detailed question (from objQuestions{})
		const questionsCarousel_items_question = questionsCarousel_items_templateClone.getElementById("questionsCarousel_items_question-X")
		questionsCarousel_items_question.innerHTML = strQuestionLong
		questionsCarousel_items_question.id = "questionsCarousel_items_question-"+i


		/* ----------------------------------------------------------- */


		// VOTING BUTTONS 
		// 1/5 : Set the attributes for the "Extra Agree" button (green, pro, [++], ok) 
		const buttonVotingProExtra = questionsCarousel_items_templateClone.getElementById("votingProExtra-X")
		if (intQuestionButtons == 2) {
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
		if (intQuestionButtons == 2) {
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


	// 4/5. ADD LAST CARD "Continue to results" 

	// Do not get the parent <div> for all cards. -> Because it was already set above. :) 

	// Create a clone of the card-template
	const questionsCarousel_items_showResults_template = document.getElementById("questionsCarousel_items_showResults_template");
	const questionsCarousel_items_showResults_templateClone = document.importNode(questionsCarousel_items_showResults_template.content, true);

	// HEADINGS AND QUESTIONS
	// Set the text in <h1> with the title of the election (from CONFIG.JS)
//	const questionsCarousel_items_mainHeadline = questionsCarousel_items_showResults_templateClone.getElementById("questionsCarousel_items_mainHeadline-X")
//	questionsCarousel_items_mainHeadline.innerHTML = descriptionHeading1
//	questionsCarousel_items_mainHeadline.id = "questionsCarousel_items_mainHeadline-"+i
	
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


	/* ------------------------------------------------------------------- */


	// 5/5. FINISH

	// Append new clone to the parent "carousel-inner"
	parentToTemplate_items.appendChild(questionsCarousel_items_showResults_templateClone);			

	// Activate all the Bootstrap POPOVERs (mainly for the "more information" button).
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

	
} // end: fnCreateQuestions()



/* *************************************************************************** */

// If questions are sorted in categories, we create the boxes.
function fnCreateQuestionCategories() {

	// Get the parent div and the template for all buttons. 
	const parentToTemplate_categories = document.getElementById("questionsCategories")
	const questionsCategories_template = document.getElementById("questionsCategories_template")


	/* ------------------------------------------------------------------- */

	// Create an object of categories 
	let objCategories = {}


	// Use the category name as ID
	for (let i = 0; i <= intQuestions-1; i++ ) {
		const category = objQuestions["q"+i].category

		if (category) {
			objCategories[category] = []
		}
	}

	// Put the question-number into the right category-array
	for (let i = 0; i <= intQuestions-1; i++ ) {
		const category = objQuestions["q"+i].category

		if (category) {
			objCategories[category].push(i)
		}
	}

	/* ------------------------------------------------------------------- */


	const objCategories_length = Object.keys(objCategories).length

	if (objCategories_length <= 1) {
		return false // Exit / quit the function here because there's just one category.
	}

	/* ------------------------------------------------------------------- */


	// Set the Bootstrap class row-cols for automatic adjustment of columns
	// https://getbootstrap.com/docs/5.3/layout/grid/
	let css_row_cols = 3


	// Less than four categories -> take the number of categories as columns (1, 2 or 3)
	if (objCategories_length < 4) {
		css_row_cols = objCategories_length
	}
	// Exactly four categories -> use two columns
	else if (objCategories_length == 4) {
		css_row_cols = 2
	}
	// More  than four categories -> use three columns
	else if (objCategories_length > 4) {
		css_row_cols = 3
	}
	else {
		console.log("Strange. Error XXX *** ###")
	}

	parentToTemplate_categories.classList.remove("row-cols-X")
	parentToTemplate_categories.classList.add("row-cols-"+css_row_cols)


	/* ------------------------------------------------------------------- */


	// Loop through the categories-object and create the boxes
	let key_number = -1

	for (var key in objCategories) {

		const questionsCategories_templateClone = document.importNode(questionsCategories_template.content, true);
		const parentToButton = questionsCategories_templateClone.getElementById("questionsCategories_template_column-X")

		key_number = key_number+1

		// Set the name and ID of the category (<span>)
		let questionsCategories_categoryName = questionsCategories_templateClone.getElementById("questionsCategories_categoryName-X")
		questionsCategories_categoryName.id = "questionsCategories_categoryName-"+key_number
		questionsCategories_categoryName.innerHTML = key


		/*------------------------------------------------------------ */


		for (let i = 0; i <= objCategories[key].length-1; i++ ) {

			// Create a clone of the button from the category-template
			const questionsCategories_button = questionsCategories_templateClone.getElementById("questionsCategories_button-X");
			const questionsCategories_buttonClone = questionsCategories_button.cloneNode(true);

			const question_number = objCategories[key][i]

			questionsCategories_buttonClone.innerHTML = (question_number + 1)
			questionsCategories_buttonClone.id = "questionsCategories_button-"+question_number

			questionsCategories_buttonClone.setAttribute("data-bs-slide-to",question_number)
			questionsCategories_buttonClone.setAttribute("data-bs-target","#questionsCarousel")

			parentToButton.appendChild(questionsCategories_buttonClone)

			// last entry -> Delete button with ID "...-X"
			if (i >= objCategories[key].length-1) {

				questionsCategories_button.remove()

			}

		}

		// Append the clone to the parent "carousel-inner"
		parentToTemplate_categories.appendChild(questionsCategories_templateClone)

	}

} // end: fnCreateQuestionCategories()
