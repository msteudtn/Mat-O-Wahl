"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */


// Create an accordion with questions and all the candidate's answers. -> Example view:
// 
// Accordion header = toggle button: "1/99 Question: Is this a question?"
// Accordion body 1:                 "[++] [+] Candidate 1: We agree"
// ...
// Accordion body n:                 "[++] [-] Candidate n: We disagree"
function fnCreateResults_QuestionsAndAnswers(arCandidatesSortedByPoints) {

	const parentTo_accordionItem   = document.getElementById("results_byQuestion_accordion")
	const template_accordionItem   = document.getElementById("results_byQuestion_accordionItem_template");	
	const template_accordionBody   = document.getElementById("results_byQuestion_accordionBody_template");


	// Go through all questions and add them to the first row (which acts as toggle-button for the accordion)
	// Later, go through all candidates and add them to the accorion-item
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the all templates
		const template_accordionItem_Clone   = document.importNode(template_accordionItem.content, true);

		// Reset any existing rows
		try {
			document.getElementById("results_byQuestion_accordionItem-"+i).remove()
		}
		catch (error) {}


		/* ----------------------------------------------------------- */


		// Set the texts of the question
		// Example: "6/6 Sweetness: Sweet fruits are the best."
		let questionText = (i+1)+"/"+intQuestions+" "+objQuestions["q"+i].short
		template_accordionItem_Clone.getElementById("results_byQuestion_accordionHeader_QuestionShort").innerHTML = questionText
		template_accordionItem_Clone.getElementById("results_byQuestion_accordionHeader_QuestionLong").innerHTML = "&nbsp;"+objQuestions["q"+i].long

		// Get the main elements inside this ACCORDION-ITEM
		const accordionButton =   template_accordionItem_Clone.getElementById("results_byQuestion_accordionButton-X")
		const accordionCollapse = template_accordionItem_Clone.getElementById("results_byQuestion_accordionCollapse-X")
		const accordionBody =     template_accordionItem_Clone.getElementById("results_byQuestion_accordionBody-X")

		accordionButton.setAttribute("data-bs-target", "#results_byQuestion_accordionCollapse-"+i)
		accordionButton.setAttribute("aria-controls", "results_byQuestion_accordionCollapse-"+i)

		// Set new IDs
		accordionButton.id   = "results_byQuestion_accordionButton-"+i
		accordionCollapse.id = "results_byQuestion_accordionCollapse-"+i
		accordionBody.id     = "results_byQuestion_accordionBody-"+i


		/* ----------------------------------------------------------- */

		
		// Set class "show" to the FIRST [0] COLLAPSE and the aria-expanded to the first toggle-button 
		if (i == 0) {
			accordionCollapse.classList.add("show")
			accordionButton.setAttribute("aria-expanded", "true")
		}
		// Set the attributes for the other toggle-buttons
		else {
			accordionButton.classList.add("collapsed")
			accordionButton.setAttribute("aria-expanded", "false")
		}


		/* ----------------------------------------------------------- */


		const user_answer = arPersonalAnswers[i]
		const user_multiplier = arPersonalMultiplier[i]


		/* ----------------------------------------------------------- */


		// Add the candidate's answers to the accordion BODY
		for (let j = 0; j <= arCandidatesSortedByPoints.length-1; j++ )
		{
			
			// Create a clone for the ACCORDION-BODY template
			const template_accordionBody_Clone   = document.importNode(template_accordionBody.content, true);

			const candidateId = arCandidatesSortedByPoints[j].id

			/* --------------------------------------------------- */

			// Create the USER's answer button with fnSetAnswerButtonAttributes()
			let userAnswerAsButton = template_accordionBody_Clone.getElementById("results_byQuestion_button_userAnswer-X-Y")
			userAnswerAsButton = fnSetAnswerButtonAttributes(user_answer, user_multiplier, 0, userAnswerAsButton)

			// Correct the button-title to add the text "Your answer"
			// const userAnswerAsButton_titleWithPrefix = TEXT_ANSWERED_BY_USER+": "+userAnswerAsButton.title
			// userAnswerAsButton.title = userAnswerAsButton_titleWithPrefix
			// userAnswerAsButton.setAttribute("aria-label", userAnswerAsButton_titleWithPrefix)

			// Set ID of user button
			userAnswerAsButton.id = "results_byQuestion_button_userAnswer-"+i+"-"+j 

			/* --------------------------------------------------- */	

			// Create the CANDIDATE's answer button with fnSetAnswerButtonAttributes()
			const candidate_answer_short = objCandidates[candidateId].answers["a"+i].short
			let candidateAnswerAsButton = template_accordionBody_Clone.getElementById("results_byQuestion_button_candidateAnswer-X-Y")
			candidateAnswerAsButton = fnSetAnswerButtonAttributes(candidate_answer_short, 1, 1, candidateAnswerAsButton)

			// Correct the button-title to add the text "Candidate's answer"
			// const candidateAnswerAsButton_titleWithPrefix = TEXT_ANSWERED_BY_CANDIDATE+": "+candidateAnswerAsButton.title
			// candidateAnswerAsButton.title = candidateAnswerAsButton_titleWithPrefix
			// candidateAnswerAsButton.setAttribute("aria-label", candidateAnswerAsButton_titleWithPrefix)

			// Set ID of candidate's button
			candidateAnswerAsButton.id = "results_byQuestion_button_candidateAnswer-"+i+"-"+j 

			/* --------------------------------------------------- */


			// Reset the background color (CSS class) for the user's answer-button IF the user's and candidate's answer are different.
			if (user_answer != candidate_answer_short) {

				userAnswerAsButton.classList.remove("mow-btn-success-dark")
				userAnswerAsButton.classList.remove("btn-success")
				userAnswerAsButton.classList.remove("btn-warning")
				userAnswerAsButton.classList.remove("btn-danger")
				userAnswerAsButton.classList.remove("mow-btn-danger-dark")
				userAnswerAsButton.classList.remove("btn-secondary")
			}


			/* --------------------------------------------------- */

			// Candidate's (short) name and long answer
			const results_byQuestion_accordionBody_candidateName = template_accordionBody_Clone.getElementById("results_byQuestion_accordionBody_candidateName-X-Y")
			results_byQuestion_accordionBody_candidateName.innerHTML = objCandidates[candidateId].short
			results_byQuestion_accordionBody_candidateName.id = "results_byQuestion_accordionBody_candidateName-"+i+"-"+j

			const results_byQuestion_accordionBody_candidateAnswer = template_accordionBody_Clone.getElementById("results_byQuestion_accordionBody_candidateAnswer-X-Y")
			results_byQuestion_accordionBody_candidateAnswer.innerHTML = objCandidates[candidateId].answers["a"+i].long
			results_byQuestion_accordionBody_candidateAnswer.id = "results_byQuestion_accordionBody_candidateAnswer-"+i+"-"+j


			// APPEND new clone to the parent ITEM > BODY = under the question and inside COLLAPSE
			accordionBody.appendChild(template_accordionBody_Clone);				
		}


		// Set the ID
		template_accordionItem_Clone.getElementById("results_byQuestion_accordionItem-X").id = "results_byQuestion_accordionItem-"+i


		// APPEND new ACCORDION-ITEM clone to the parent ACCORDION
		parentTo_accordionItem.appendChild(template_accordionItem_Clone);

	} // end: for-i

} // end: fnCreateResults_QuestionsAndAnswers()

