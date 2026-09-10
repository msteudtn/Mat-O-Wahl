"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */


function fnCreateResults_QuestionsAndAnswers(arCandidatesSortedByPoints) {

	const parentToTemplateOfQuestions =  document.getElementById("resultsByQuestion_Table")
	const templateOfQuestions = document.getElementById("resultsByQuestion_RowForQuestions_Template");
	const templateOfCandidates = document.getElementById("resultsByQuestion_RowForCandidates_Template");


	// Add the template to the parent "resultsByQuestion" to create new QUESTION-rows.
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the row-template
		const templateOfQuestions_Clone = document.importNode(templateOfQuestions.content, true);

		// Reset any existing row
		try {
			document.getElementById("resultsByQuestion_RowForQuestions_Rowgroup-"+i).remove()
		}
		catch (error) {}

		// Reset any existing row
		try {
			document.getElementById("resultsByQuestion_DivForCandidates-"+i).remove()
		}
		catch (error) {}

		/* ----------------------------------------------------------- */

		// 1. QUESTION row -> first cell -> first button (double / important)

		// Define attributes for the current DOUBLE BUTTON 
		const buttonPersonalMultiplier = templateOfQuestions_Clone.getElementById("resultsByQuestion_Button_PersonalMultiplier-X")

		let button_double_new_multiplier = 999
		let button_double_old_answer = 999 
		let button_double_css_to_remove = ""
		let button_double_css_to_add = ""
		let button_double_aria_pressed = ""

		// Question was skipped (0) -> set / keep multiplier at zero (0)
		if ( (arPersonalMultiplier[i] == 0) || (!arPersonalMultiplier[i]) ) {
			button_double_css_to_remove = "btn-dark"
			button_double_css_to_add = "btn-outline-dark"
			button_double_old_answer = 99
			button_double_aria_pressed = "false"
			button_double_new_multiplier = 0
		}
		// Question was rated normal (1) -> set new multiplier to double (2)
		else if (arPersonalMultiplier[i] == 1) {
			button_double_css_to_remove = "btn-dark"
			button_double_css_to_add = "btn-outline-dark"
			button_double_old_answer = arPersonalAnswers[i]
			button_double_aria_pressed = "false"
			button_double_new_multiplier = 2 
		}
		// Question was rated double (2) -> set new multiplier to normal (1)
		else if (arPersonalMultiplier[i] == 2) {
			button_double_css_to_remove = "btn-outline-dark"
			button_double_css_to_add = "btn-dark"
			button_double_old_answer = arPersonalAnswers[i]
			button_double_aria_pressed = "true"
			button_double_new_multiplier = 1 
		}
		else {
			console.log("Strange. We're in the ELSE-part of fnCreateResults_QuestionsAndAnswers() / section: double buttons. The user's multiplier index "+i+" was: '"+arPersonalMultiplier[i]+"'. This shouldn't happen.")
		}

		/* ----------------------------------------------------------- */
		
		// Set the attributes for the DOUBLE-button
		buttonPersonalMultiplier.classList.remove(button_double_css_to_remove);
		buttonPersonalMultiplier.classList.add(button_double_css_to_add);
		buttonPersonalMultiplier.setAttribute("aria-pressed", button_double_aria_pressed)

		let button_double_title = TEXT_VOTING_DOUBLE_LONG
		buttonPersonalMultiplier.setAttribute("aria-label", button_double_title)
		buttonPersonalMultiplier.title = button_double_title


		// Clicking the DOUBLE-button does NOT change the personal answer = "oldAnswer"
		buttonPersonalMultiplier.onclick = function () { fnEvaluation(i, button_double_old_answer, button_double_new_multiplier) } 

		/* ----------------------------------------------------------- */

		// 2. QUESTION row -> second cell -> second button (personal answer)

		// Define attributes for the current PERSONAL-ANSWER BUTTON 
		const buttonPersonalAnswer = templateOfQuestions_Clone.getElementById("resultsByQuestion_Button_PersonalAnswer-X")

		let button_personal_new_answer = 999
		let button_personal_current_multiplier = arPersonalMultiplier[i]
		let button_personal_text_answer_short = ""
		let button_personal_text_answer_long  = ""
		let button_personal_css_to_remove = ""
		let button_personal_css_to_add = ""


		// Question was skipped before and multiplier is still at 0 -> set to 1
		if (!button_personal_current_multiplier) {
			button_personal_current_multiplier = 1
		}

		// Change button from -1 (contra) to 0 (neutral)
		if (arPersonalAnswers[i] == -1) {
			button_personal_text_answer_short = TEXT_VOTING_CONTRA_SHORT
			button_personal_text_answer_long  = TEXT_VOTING_CONTRA_LONG
			button_personal_css_to_remove = "btn-secondary"
			button_personal_css_to_add = "btn-danger"
			button_personal_new_answer = 0 
		}
		// Change button from 0 (neutral) to 1 (pro)
		else if (arPersonalAnswers[i] == 0) {
			button_personal_text_answer_short = TEXT_VOTING_NEUTRAL_SHORT
			button_personal_text_answer_long  = TEXT_VOTING_NEUTRAL_LONG
			button_personal_css_to_remove = "btn-danger"
			button_personal_css_to_add = "btn-warning"
			button_personal_new_answer = 1 
		}
		// Change button from 1 (pro) to 99 (skip)
		else if (arPersonalAnswers[i] == 1) {
			button_personal_text_answer_short = TEXT_VOTING_PRO_SHORT
			button_personal_text_answer_long  = TEXT_VOTING_PRO_LONG
			button_personal_css_to_remove = "btn-warning"
			button_personal_css_to_add = "btn-success"
			button_personal_new_answer = 99 
		}
		// Change button from 99 (skip) to -1 (contra)
		else if ( (arPersonalAnswers[i] == 99) || (arPersonalAnswers[i] === undefined) ) {
			button_personal_text_answer_short = TEXT_VOTING_SKIP_SHORT
			button_personal_text_answer_long  = TEXT_VOTING_SKIP_LONG
			button_personal_css_to_remove = "btn-success"
			button_personal_css_to_add = "btn-secondary"
			button_personal_new_answer = -1 
		}
		else {
			console.log("Strange. We're in the ELSE-part of fnCreateResults_QuestionsAndAnswers() / section: voting buttons. The user's answer index "+i+" was: '"+arPersonalAnswers[i]+"'. This shouldn't happen.")
		}


		/* ----------------------------------------------------------- */

		// Change the style and contents of the PERSONAL ANSWER-button
		buttonPersonalAnswer.innerHTML = button_personal_text_answer_short
		buttonPersonalAnswer.classList.remove(button_personal_css_to_remove);
		buttonPersonalAnswer.classList.add(button_personal_css_to_add);

		// Set the long text for ARIA and ID, like: "Question 1/6: Do you agree on topic X?" on the PERSONAL ANSWER-button
		let button_personal_answer_title = TEXT_ANSWER_BY_USER+ " "+(i+1)+"/"+intQuestions+": "+button_personal_text_answer_long
		buttonPersonalAnswer.setAttribute("aria-label", button_personal_answer_title)
		buttonPersonalAnswer.title = button_personal_answer_title

		// Add an updated click-event and change the ID of the the PERSONAL ANSWER-button
		// Clicking the PERSONAL ANSWER-button DOES change the personal answer = "newAnswer"
		buttonPersonalAnswer.onclick = function () { fnEvaluation(i, button_personal_new_answer, button_personal_current_multiplier) } 
		buttonPersonalAnswer.id = "resultsByQuestion_Button_PersonalAnswer-"+i

		/* ----------------------------------------------------------- */

		// 3. QUESTION row -> third cell -> toggle-button

		// Define attributes for the current TOGGLE BUTTON 
		const buttonShowCandidateAnswers = templateOfQuestions_Clone.getElementById("resultsByQuestion_Button_ShowCandidateAnswers-X")

		// Add a click-function to the toggle-button to open / close the candidate's answers (before changing it's ID later)
		buttonShowCandidateAnswers.onclick = function () { fnToggleDiv("resultsByQuestion_DivForCandidates-"+i, "resultsByQuestion_Button_ShowCandidateAnswers-"+i, 1) } 

		// Set the attributes of the toggle-button for this candidate
		buttonShowCandidateAnswers.innerHTML = "[open / close]"	
		buttonShowCandidateAnswers.id = "resultsByQuestion_Button_ShowCandidateAnswers-"+i
		buttonShowCandidateAnswers.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
		buttonShowCandidateAnswers.title = TEXT_RESULTS_TOGGLE_BUTTON

		/* ----------------------------------------------------------- */

		// 4. QUESTION row -> third cell -> long and short question-text

		// Set the texts of the question
		let questionText = (i+1)+"/"+intQuestions+" "+objQuestions["q"+i].short
		templateOfQuestions_Clone.getElementById("resultsByQuestion_RowForQuestions_TextShort").innerHTML = questionText
		templateOfQuestions_Clone.getElementById("resultsByQuestion_RowForQuestions_TextLong").innerHTML = objQuestions["q"+i].long

		/* ----------------------------------------------------------- */

		// Set the ID for the parent-div for the candidate's answers
		templateOfQuestions_Clone.getElementById("resultsByQuestion_DivForCandidates-X").id = "resultsByQuestion_DivForCandidates-"+i


		// Set the ID for this row(group)
		templateOfQuestions_Clone.getElementById("resultsByQuestion_RowForQuestions_Rowgroup-X").id = "resultsByQuestion_RowForQuestions_Rowgroup-"+i


		/* ----------------------------------------------------------- */

		// APPEND new clone to the parent "resultsByQuestion_Table"
		parentToTemplateOfQuestions.appendChild(templateOfQuestions_Clone);


		/* ----------------------------------------------------------- */

		// 5. CANDIDATE rows -> second cell -> long and short ...

		const parentToTemplateOfCandidates = document.getElementById("resultsByQuestion_DivForCandidates-"+i)


		// Add the template to the parent "resultsByQuestion" to create new QUESTION-rows.
//		for (let j = 0; j <= intCandidates-1; j++ )
		for (let j = 0; j <= arCandidatesSortedByPoints.length-1; j++ )
		{

			let candidateId = arCandidatesSortedByPoints[j].id

			// Create a clone of the row-template
			const templateOfCandidates_Clone = document.importNode(templateOfCandidates.content, true);

			/* --------------------------------------------------- */

			// 6. CANDIDATE row -> first cell -> nothing

			// 7. CANDIDATE row -> second cell -> second button (personal answer)

			// Define attributes for the current CANDIDATE'S-ANSWER BUTTON 
			const button_candidate_answer = templateOfCandidates_Clone.getElementById("resultsByQuestion_Button_CandidateAnswer-X")
//			console.log("i: "+i+" j: "+j+" button: " +button_candidate_answer)

//			let candidate_answer = objCandidates["c"+j].answers["a"+i].short
			let candidate_answer = objCandidates[candidateId].answers["a"+i].short

			let button_candidate_text_answer_short = ""
			let button_candidate_text_answer_long = ""
			let button_candidate_css_btn_to_add = ""

//			let name_of_candidate_text_short = objCandidates["c"+j].short
//			let answer_of_candidate_text_long = objCandidates["c"+j].answers["a"+i].long

			let name_of_candidate_text_short = objCandidates[candidateId].short
			let answer_of_candidate_text_long = objCandidates[candidateId].answers["a"+i].long

			// Candidate answered "-1" (contra)
			if (candidate_answer == -1) {
				button_candidate_css_btn_to_add = "btn-danger"
				button_candidate_text_answer_short = TEXT_VOTING_CONTRA_SHORT
				button_candidate_text_answer_long = TEXT_VOTING_CONTRA_LONG
			}
			// Candidate answered "0" (neutral)
			else if (candidate_answer == 0) {
				button_candidate_css_btn_to_add = "btn-warning"
				button_candidate_text_answer_short = TEXT_VOTING_NEUTRAL_SHORT
				button_candidate_text_answer_long = TEXT_VOTING_NEUTRAL_LONG
			}
			// Change button from 1 (pro) to 99 (skip)
			else if (candidate_answer == 1) {
				button_candidate_css_btn_to_add = "btn-success"
				button_candidate_text_answer_short = TEXT_VOTING_PRO_SHORT
				button_candidate_text_answer_long = TEXT_VOTING_PRO_LONG
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnCreateResults_QuestionsAndAnswers() / section: candidate's buttons. The candidate's answer index c"+j+".answers.a"+i+" was: '"+objCandidates[candidateId].answers["a"+i].short+"'. This shouldn't happen.")
			}


			/* ----------------------------------------------------------- */

			// Change the style and contents of the CANDIDATE'S ANSWER-button
			button_candidate_answer.innerHTML = button_candidate_text_answer_short
			button_candidate_answer.classList.add(button_candidate_css_btn_to_add)

			// Set the long text for ARIA and ID, like: "Candidate's answer: Disagree" on the CANDIDATE'S ANSWER-button
			let button_candidate_answer_title = TEXT_ANSWER_BY_CANDIDATE+ ": "+button_candidate_text_answer_long
			button_candidate_answer.setAttribute("aria-label", button_candidate_answer_title)
			button_candidate_answer.title = button_candidate_answer_title

			// Change the ID of the CANDIDATE'S ANSWER-button. No click-event on this button. 
			button_candidate_answer.id = "resultsByQuestion_Button_CandidateAnswer-"+i

			/* ----------------------------------------------------------- */

//			templateOfCandidates_Clone.getElementById("resultsByQuestion_RowForCandidates_TextShort").innerHTML = objCandidates["c"+j].short
//			templateOfCandidates_Clone.getElementById("resultsByQuestion_RowForCandidates_TextLong").innerHTML = objCandidates["c"+j].answers["a"+i].long

			templateOfCandidates_Clone.getElementById("resultsByQuestion_RowForCandidates_TextShort").innerHTML = objCandidates[candidateId].short
			templateOfCandidates_Clone.getElementById("resultsByQuestion_RowForCandidates_TextLong").innerHTML = objCandidates[candidateId].answers["a"+i].long


//			templateOfCandidates_Clone.getElementById("resultsByQuestion_RowForCandidates_Rowgroup-X").id = "resultsByQuestion_RowForCandidates_Rowgroup-"+i+"-"+j

			// APPEND new clone to the parent "resultsByQuestion_Table" = under the question or the existing candidate's answers
			parentToTemplateOfCandidates.appendChild(templateOfCandidates_Clone);

		} // end: for-j

		// Run the TOGGLE-function to hide the candidate's answers-DIV and set open/close-icon on the button
		fnToggleDiv("resultsByQuestion_DivForCandidates-"+i, "resultsByQuestion_Button_ShowCandidateAnswers-"+i, 1)

	} // end: for-i


} // end: fnCreateResults_QuestionsAndAnswers()

