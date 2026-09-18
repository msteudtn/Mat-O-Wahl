"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */


function fnCreateResults_QuestionsAndAnswers(arCandidatesSortedByPoints) {


//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)


	const parentToTemplateOfQuestions = document.getElementById("results_byQuestion_table")
	const templateOfQuestions = document.getElementById("results_byQuestion_rowForQuestions_template");
	const templateOfCandidates = document.getElementById("results_byQuestion_rowForCandidates_template");


	// Add the template to the parent "results_byQuestion" to create new QUESTION-rows.
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone of the row-template
		const templateOfQuestions_Clone = document.importNode(templateOfQuestions.content, true);

		// Reset any existing row
		try {
			document.getElementById("results_byQuestion_RowForQuestions_Rowgroup-"+i).remove()
		}
		catch (error) {}

		// Reset any existing row
		try {
			document.getElementById("results_byQuestion_divForCandidates-"+i).remove()
		}
		catch (error) {}

		/* ----------------------------------------------------------- */

		// 1. QUESTION row -> first cell -> first button (double / important)

		// Define attributes for the current DOUBLE BUTTON 
		const buttonPersonalMultiplier = templateOfQuestions_Clone.getElementById("results_byQuestion_button_personalMultiplier-X")

		// If the DOUBLE-button has been disabled in DEFINITION.JS -> Hide <button> but keep parent <div> visible (unlike in the "questions"-cards where the parent is hidden, as well)
		if (intShowButtonDouble == 0) {
			buttonPersonalMultiplier.style.display = "none"
		}

		// ... but define the attributes for the DOUBLE-button anyway to avoid error messages from other functions, which access this button
		let button_double_new_multiplier = 999
		let button_double_old_answer = 999 
		let button_double_css_to_remove = ""
		let button_double_css_to_add = ""
		let button_double_aria_pressed = ""


		// Question was skipped (0) -> set / keep multiplier at zero (0)
		if (arPersonalMultiplier[i] == 0) {
			button_double_css_to_remove = "btn-dark"
			button_double_css_to_add = "btn-outline-dark"
			button_double_old_answer = 99
			button_double_aria_pressed = "false"
			button_double_new_multiplier = 0
		}
		// Question was rated normal (1) -> set new multiplier to double (2) = double it
		else if (arPersonalMultiplier[i] == 1) {
			button_double_css_to_remove = "btn-dark"
			button_double_css_to_add = "btn-outline-dark"
			button_double_old_answer = arPersonalAnswers[i]
			button_double_aria_pressed = "false"
			button_double_new_multiplier = 2 
		}
		// Question was rated extra normal (1.5) -> set new multiplier to extra double (3) = double it
		else if (arPersonalMultiplier[i] == 1.5) {
			button_double_css_to_remove = "btn-dark"
			button_double_css_to_add = "btn-outline-dark"
			button_double_old_answer = arPersonalAnswers[i]
			button_double_aria_pressed = "false"
			button_double_new_multiplier = 3 
		}
		// Question was rated double (2) -> set new multiplier to normal (1) = half it
		else if (arPersonalMultiplier[i] == 2) {
			button_double_css_to_remove = "btn-outline-dark"
			button_double_css_to_add = "btn-dark"
			button_double_old_answer = arPersonalAnswers[i]
			button_double_aria_pressed = "true"
			button_double_new_multiplier = 1 
		}
		// Question was rated extra double (3) -> set new multiplier to normal (1.5) = half it
		else if (arPersonalMultiplier[i] == 3) {
			button_double_css_to_remove = "btn-outline-dark"
			button_double_css_to_add = "btn-dark"
			button_double_old_answer = arPersonalAnswers[i]
			button_double_aria_pressed = "true"
			button_double_new_multiplier = 1.5
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
		buttonPersonalMultiplier.onclick = function () { fnEvaluationCurrentAnswer(i, button_double_old_answer, button_double_new_multiplier) } 
		buttonPersonalMultiplier.id = "results_byQuestion_button_personalMultiplier-"+i

		/* ----------------------------------------------------------- */

		// 2. QUESTION row -> second cell -> second button (personal answer)

		// Define attributes for the current PERSONAL-ANSWER BUTTON 
		const buttonPersonalAnswer = templateOfQuestions_Clone.getElementById("results_byQuestion_Button_PersonalAnswer-X")

		let button_personal_new_answer = 999
		let button_personal_current_multiplier = arPersonalMultiplier[i]
		let button_personal_new_multiplier = 999
		let button_personal_text_answer_short = ""
		let button_personal_text_answer_long  = ""
		let button_personal_css_to_add = ""
		let button_personal_css_to_add_extra = ""

// console.log("i: "+i+" multi: "+button_personal_current_multiplier)

		// Question was skipped before and multiplier is still at 0 
		// If three buttons are set in DEFINITION.JS -> set the multiplier to 1 = no "extra pro" / "extra contra" 
		if ( (!button_personal_current_multiplier) && (intQuestionButtons == 3) ) {
			button_personal_current_multiplier = 1
		}
		// If five buttons are set in DEFINITION.JS -> set the multiplier to 1.5 = with "extra pro" / "extra contra"
		else if ( (!button_personal_current_multiplier) && (intQuestionButtons == 5) ) {
			button_personal_current_multiplier = 1.5
		}

		// CHANGE the buttons from Contra Extra (-1x1.5) -> Contra (-1x1) -> Neutral (0) -> Pro (1x1) -> Pro Extra (1x1.5) -> Skip (99) -> repeat
		// Contra Extra and Contra
		if (arPersonalAnswers[i] == -1) {
			// Change button from current -1 x 1.5 or -1 x 3 (extra contra) to -1 x 1 or -1 x 2 (contra)
			if ( (button_personal_current_multiplier == 1.5) || (button_personal_current_multiplier == 3) ) {
				button_personal_text_answer_short = TEXT_VOTING_CONTRA_EXTRA_SHORT
				button_personal_text_answer_long  = TEXT_VOTING_CONTRA_EXTRA_LONG
				button_personal_css_to_add = "btn-danger"
				button_personal_css_to_add_extra = "mow-btn-danger-dark"
				button_personal_new_answer = -1
				button_personal_current_multiplier = Math.ceil( button_personal_current_multiplier - (button_personal_current_multiplier * 0.5) )
			}
			// Change button from current -1 x 1 / -1 x 2 (contra) to 0 x 1 or 0 x 2 (neutral)
			else if ( (button_personal_current_multiplier == 1) || (button_personal_current_multiplier == 2) ) {
				button_personal_text_answer_short = TEXT_VOTING_CONTRA_SHORT
				button_personal_text_answer_long  = TEXT_VOTING_CONTRA_LONG
				button_personal_css_to_add = "btn-danger"
				button_personal_css_to_add_extra = ""

				// Check, if the NEUTRAL button is allowed (1) in DEFINITION.JS. If not -> skip "neutral" (0) and set new PRO (1)
				if (intShowButtonNeutral == 1) {
					button_personal_new_answer = 0 
				}
				else {
					button_personal_new_answer = 1 
				}
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnCreateResults_QuestionsAndAnswers() / section: voting buttons / part: change CONTRA button. The old / new multiplier on index "+i+" are "+arPersonalMultiplier[i]+" and "+button_personal_current_multiplier+". This shouldn't happen.")
			}
		}
		// Change button from current 0 (neutral) to 1 (pro)
		else if (arPersonalAnswers[i] == 0) {
			button_personal_text_answer_short = TEXT_VOTING_NEUTRAL_SHORT
			button_personal_text_answer_long  = TEXT_VOTING_NEUTRAL_LONG
			button_personal_css_to_add = "btn-warning"
			button_personal_css_to_add_extra = ""
			button_personal_new_answer = 1 
		}
		// Pro Extra and Pro
		else if (arPersonalAnswers[i] == 1) {

			// Change button from current 1 x 1 or 1 x 2 (pro) to 1 x 1.5 or 1 x 3 (extra pro)
			if ( (button_personal_current_multiplier == 1) || (button_personal_current_multiplier == 2) ) {
				button_personal_text_answer_short = TEXT_VOTING_PRO_SHORT
				button_personal_text_answer_long  = TEXT_VOTING_PRO_LONG
				button_personal_css_to_add = "btn-success"
				button_personal_css_to_add_extra = ""

				// Check, if the PRO EXTRA button is allowed (5) in DEFINITION.JS. If so -> Set new "pro extra" (1x1.5)
				if (intQuestionButtons == 5) {
					button_personal_new_answer = 1
					button_personal_current_multiplier = button_personal_current_multiplier + (button_personal_current_multiplier * 0.5)
				}
				// The PRO EXTRA button is not allowed (3) -> Go to SKIP (99)
				else {
					// But wait! Check, if the SKIP button is allowed (1) in DEFINITION.JS. If not -> skip "skip" and set new CONTRA (-1 x 1 and -1 x 1.5)
					if (intShowButtonSkip == 1) {
						button_personal_new_answer = 99 
					}
					else {
						button_personal_new_answer = -1
					}
				}

			}
			// Change button from current 1 x 1.5 or 1 x 3 (extra pro) to 99 x 1 (skip)
			else if ( (button_personal_current_multiplier == 1.5) || (button_personal_current_multiplier == 3) ) {
				button_personal_text_answer_short = TEXT_VOTING_PRO_EXTRA_SHORT
				button_personal_text_answer_long  = TEXT_VOTING_PRO_EXTRA_LONG
				button_personal_css_to_add = "btn-success"
				button_personal_css_to_add_extra = "mow-btn-success-dark"

				// Check, if the SKIP button is allowed (1) in DEFINITION.JS. If not -> skip "skip" and set new CONTRA (-1 x 1 and -1 x 1.5)
				if (intShowButtonSkip == 1) {
					button_personal_new_answer = 99 
				}
				else {
					button_personal_new_answer = -1
				}

//				button_personal_new_multiplier = 1
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnCreateResults_QuestionsAndAnswers() / section: voting buttons / part: change PRO button. The old / new multiplier on index "+i+" are "+arPersonalMultiplier[i]+" and "+button_personal_current_multiplier+". This shouldn't happen.")
			}

		}
		// Change button from current 99 (skip) to -1 (contra)
		else if ( (arPersonalAnswers[i] == 99) || (arPersonalAnswers[i] === undefined) ) {
			button_personal_text_answer_short = TEXT_VOTING_SKIP_SHORT
			button_personal_text_answer_long  = TEXT_VOTING_SKIP_LONG
			button_personal_css_to_add = "btn-secondary"
			button_personal_css_to_add_extra = ""
			button_personal_new_answer = -1
		}
		else {
			console.log("Strange. We're in the ELSE-part of fnCreateResults_QuestionsAndAnswers() / section: voting buttons. The current index, answer and multiplier are "+i+": "+button_personal_new_answer+" x "+button_personal_current_multiplier+". This shouldn't happen.")
		}


		/* ----------------------------------------------------------- */

//  console.log("Set answer "+i+" from "+arPersonalAnswers[i]+"x"+arPersonalMultiplier[i]+" to "+button_personal_new_answer+"x"+button_personal_current_multiplier)

		// After setting all the variables (above), finally change the style and contents of the PERSONAL ANSWER-button
		buttonPersonalAnswer.innerHTML = button_personal_text_answer_short

		buttonPersonalAnswer.classList.remove("btn-success");
		buttonPersonalAnswer.classList.remove("mow-btn-success-dark");
		buttonPersonalAnswer.classList.remove("btn-warning");
		buttonPersonalAnswer.classList.remove("btn-danger");
		buttonPersonalAnswer.classList.remove("mow-btn-danger-dark");
		buttonPersonalAnswer.classList.remove("btn-secondary");

		buttonPersonalAnswer.classList.add(button_personal_css_to_add);

		if (button_personal_css_to_add_extra) {
			buttonPersonalAnswer.classList.add(button_personal_css_to_add_extra); }

		// Set the long text for ARIA and ID, like: "Your reply 1/6: I agree?" on the PERSONAL ANSWER-button
		let button_personal_answer_title = TEXT_ANSWER_BY_USER+ " "+(i+1)+"/"+intQuestions+": "+button_personal_text_answer_long
		button_personal_answer_title = fnClearHtmlTags(button_personal_answer_title)
		buttonPersonalAnswer.setAttribute("aria-label", button_personal_answer_title)
		buttonPersonalAnswer.title = button_personal_answer_title

		// Add an updated click-event and change the ID of the the PERSONAL ANSWER-button
		// Clicking the PERSONAL ANSWER-button DOES change the personal answer = "newAnswer"
		buttonPersonalAnswer.onclick = function () { fnEvaluationCurrentAnswer(i, button_personal_new_answer, button_personal_current_multiplier) } 
		buttonPersonalAnswer.id = "results_byQuestion_Button_PersonalAnswer-"+i

// console.log("new call for fnEvaluation: index answer / multiplier: "+button_personal_new_answer+"x"+button_personal_current_multiplier)

		/* ----------------------------------------------------------- */

		// 3. QUESTION row -> third cell -> toggle-button (Bootstrap "collapse") to open / close ALL candidate's answers.

		// Define attributes for the current TOGGLE BUTTON 
		const buttonShowCandidateAnswers = templateOfQuestions_Clone.getElementById("results_byQuestion_button_showCandidateAnswers-X")

		// Set the attributes of the toggle-button for this candidate
		buttonShowCandidateAnswers.id = "results_byQuestion_button_showCandidateAnswers-"+i
		buttonShowCandidateAnswers.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
		buttonShowCandidateAnswers.title = TEXT_RESULTS_TOGGLE_BUTTON
		buttonShowCandidateAnswers.setAttribute("aria-controls", "results_byQuestion_divForCandidates-"+i)
		buttonShowCandidateAnswers.setAttribute("data-bs-target", "#results_byQuestion_divForCandidates-"+i)

		/* ----------------------------------------------------------- */

		// 4. QUESTION row -> third cell -> long and short question-text

		// Set the texts of the question
		// Example: "6/6 Sweetness: Sweet fruits are the best."
		let questionText = (i+1)+"/"+intQuestions+" "+objQuestions["q"+i].short
		templateOfQuestions_Clone.getElementById("results_byQuestion_RowForQuestions_TextShort").innerHTML = "&nbsp;"+questionText
		templateOfQuestions_Clone.getElementById("results_byQuestion_RowForQuestions_TextLong").innerHTML = objQuestions["q"+i].long

		/* ----------------------------------------------------------- */

		// Set the ID for the parent-div for the candidate's answers
		templateOfQuestions_Clone.getElementById("results_byQuestion_divForCandidates-X").id = "results_byQuestion_divForCandidates-"+i


		// Set the ID for this row(group)
		templateOfQuestions_Clone.getElementById("results_byQuestion_RowForQuestions_Rowgroup-X").id = "results_byQuestion_RowForQuestions_Rowgroup-"+i


		/* ----------------------------------------------------------- */

		// APPEND new clone to the parent "results_byQuestion_table"
		parentToTemplateOfQuestions.appendChild(templateOfQuestions_Clone);


		/* ----------------------------------------------------------- */


		// 5. CANDIDATE rows 
		const parentToTemplateOfCandidates = document.getElementById("results_byQuestion_divForCandidates-"+i)


		// Add the template to the parent "results_byQuestion" to create new QUESTION-rows.
		for (let j = 0; j <= arCandidatesSortedByPoints.length-1; j++ )
		{

			let candidateId = arCandidatesSortedByPoints[j].id

			// Create a clone of the row-template
			const templateOfCandidates_Clone = document.importNode(templateOfCandidates.content, true);

			/* --------------------------------------------------- */

			// 5a. CANDIDATE row -> first cell -> nothing

			// 5b. CANDIDATE row -> second cell -> candidate-button (candidate's answer)

			// Define attributes for the current CANDIDATE'S-ANSWER BUTTON 
			const button_candidate_answer = templateOfCandidates_Clone.getElementById("results_byQuestion_button_showSpecificCandidateAnswer-X")

			let candidate_answer = objCandidates[candidateId].answers["a"+i].short

			let button_candidate_text_answer_short = ""
			let button_candidate_text_answer_long = ""
			let button_candidate_css_btn_to_add = ""

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
			button_candidate_answer_title = fnClearHtmlTags(button_candidate_answer_title)
			button_candidate_answer.setAttribute("aria-label", button_candidate_answer_title)

			// Change the ID of the CANDIDATE'S ANSWER-button. No click-event on this button. 
			button_candidate_answer.id = "results_byQuestion_button_showSpecificCandidateAnswer-"+i

			/* ----------------------------------------------------------- */


			// 5c. CANDIDATE row -> third cell -> candidate's name (short) and long answer
			templateOfCandidates_Clone.getElementById("results_byQuestion_rowForCandidates_text_short").innerHTML = objCandidates[candidateId].short
			templateOfCandidates_Clone.getElementById("results_byQuestion_rowForCandidates_text_long").innerHTML = objCandidates[candidateId].answers["a"+i].long


			// APPEND new clone to the parent "results_byQuestion_table" = under the question or the existing candidate's answers
			parentToTemplateOfCandidates.appendChild(templateOfCandidates_Clone);

		} // end: for-j

	} // end: for-i

} // end: fnCreateResults_QuestionsAndAnswers()

