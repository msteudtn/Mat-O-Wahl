"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

/* *************************************************************************** */

function fnCreateResults_CandidatesAndAnswers(arCandidatesSortedByPoints) {


//	console.log(arCandidatesSortedByPoints)

	const parentTo_accordionItem   = document.getElementById("results_byCandidate_accordion")
	const template_accordionItem   = document.getElementById("results_byCandidate_accordionItem_template");	
	const template_accordionBody   = document.getElementById("results_byCandidate_accordionBody_template");

	// Go through all questions and add them to the first row (toggle-button for accordion)
	// Later, go through all candidates and add them to the accorion-item
	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ )
	{

		// Create a clone of the all templates
		const template_accordionItem_Clone   = document.importNode(template_accordionItem.content, true);

		// Reset any existing rows
		try {
			document.getElementById("results_byCandidate_accordionItem-"+i).remove()
		}
		catch (error) {}

		// Set the names of the candidate
		let candidateId = arCandidatesSortedByPoints[i].id
		template_accordionItem_Clone.getElementById("results_byCandidate_accordionHeader_candidateShort").innerHTML = objCandidates[candidateId].short

		// Get the main elements inside this ACCORDION-ITEM
		const accordionButton =   template_accordionItem_Clone.getElementById("results_byCandidate_accordionButton-X")
		const accordionCollapse = template_accordionItem_Clone.getElementById("results_byCandidate_accordionCollapse-X")
		const accordionBody =     template_accordionItem_Clone.getElementById("results_byCandidate_accordionBody-X")

		accordionButton.setAttribute("data-bs-target", "#results_byCandidate_accordionCollapse-"+i)
		accordionButton.setAttribute("aria-controls", "results_byCandidate_accordionCollapse-"+i)

		// Set new IDs
		accordionButton.id   = "results_byCandidate_accordionButton-"+i
		accordionCollapse.id = "results_byCandidate_accordionCollapse-"+i
		accordionBody.id     = "results_byCandidate_accordionBody-"+i
		
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
		

		// Add the questions and the candidate's answers to the accordion BODY
		for (let j = 0; j <= intQuestions-1; j++ )
		{
			
			// Create a clone for the ACCORDION-BODY template
			const template_accordionBody_Clone   = document.importNode(template_accordionBody.content, true);

			const candidateId = arCandidatesSortedByPoints[i].id


			const user_answer = arPersonalAnswers[j]
			const user_multiplier = arPersonalMultiplier[j]

			let userAnswerAsButton = template_accordionBody_Clone.getElementById("results_byCandidate_button_userAnswer-X-Y")
			userAnswerAsButton = fnSetAnswerButtonAttributes(user_answer, user_multiplier, 0, userAnswerAsButton)

			const userAnswerAsButton_titleWithPrefix = TEXT_ANSWERED_BY_USER+": "+userAnswerAsButton.title
			userAnswerAsButton.title = userAnswerAsButton_titleWithPrefix
			userAnswerAsButton.setAttribute("aria-label", userAnswerAsButton_titleWithPrefix)
			userAnswerAsButton.id = "results_byCandidate_button_userAnswer-"+i+"-"+j 


			const candidate_answer_short = objCandidates[candidateId].answers["a"+j].short
			let candidateAnswerAsButton = template_accordionBody_Clone.getElementById("results_byCandidate_button_candidateAnswer-X-Y")
			candidateAnswerAsButton = fnSetAnswerButtonAttributes(candidate_answer_short, 1, 1, candidateAnswerAsButton)

			const candidateAnswerAsButton_titleWithPrefix = TEXT_ANSWERED_BY_CANDIDATE+": "+candidateAnswerAsButton.title
			candidateAnswerAsButton.title = candidateAnswerAsButton_titleWithPrefix
			candidateAnswerAsButton.setAttribute("aria-label", candidateAnswerAsButton_titleWithPrefix)
			candidateAnswerAsButton.id = "results_byCandidate_button_candidateAnswer-"+i+"-"+j 
			
			// Reset the background color (CSS class) for the user's answer-button IF the user's and candidate's answer are different.
			if (user_answer != candidate_answer_short) {

				userAnswerAsButton.classList.remove("mow-btn-success-dark")
				userAnswerAsButton.classList.remove("btn-success")
				userAnswerAsButton.classList.remove("btn-warning")
				userAnswerAsButton.classList.remove("btn-danger")
				userAnswerAsButton.classList.remove("mow-btn-danger-dark")
				userAnswerAsButton.classList.remove("btn-secondary")
			}

			// Question and candidate's long answer
			let questionText = (j+1)+"/"+intQuestions+" "+objQuestions["q"+j].short
			template_accordionBody_Clone.getElementById("results_byCandidate_accordionBody_questionShort").innerHTML = questionText
			template_accordionBody_Clone.getElementById("results_byCandidate_accordionBody_questionLong").innerHTML = objQuestions["q"+j].long

			template_accordionBody_Clone.getElementById("results_byCandidate_accordionBody_candidateAnswer").innerHTML = objCandidates[candidateId].answers["a"+j].long


			// APPEND new clone to the parent ITEM > BODY = under the question and inside COLLAPSE
			accordionBody.appendChild(template_accordionBody_Clone);				
		}


		template_accordionItem_Clone.getElementById("results_byCandidate_accordionItem-X").id = "results_byCandidate_accordionItem-"+i


		// APPEND new HEADER clone to the parent ACCORDION-ITEM
		// template_accordionItem_Clone.appendChild(template_AccordionHeader_Clone);		
		
		// APPEND new ACCORDION-ITEM clone to the parent ACCORDION
		parentTo_accordionItem.appendChild(template_accordionItem_Clone);

	} // end: for-i

} // end: fnCreateResults_CandidatesAndAnswers()


