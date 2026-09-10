"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

/* *************************************************************************** */


function fnCreateResults_CandidatesAndAnswers(arCandidatesSortedByPoints) {

	const parentToTemplateOfCandidates =  document.getElementById("resultsByCandidate_Table")
	const templateOfCandidates = document.getElementById("resultsByCandidate_RowForCandidate_Template");
	const templateOfQuestionAndAnswer  = document.getElementById("resultsByCandidate_RowForQuestionAndAnswer_Template");

	// Add the template to the parent "resultsByQuestion" to create new CANDIDATE-rows.
	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ )
	{

		// Get the ID of the candidates to use it later on "objCandidates[ID]", like "c3, c0, ..."
		let candidateId = arCandidatesSortedByPoints[i].id 

		// Create a clone of the CANDIDATE-row-template
		const templateOfCandidates_Clone = document.importNode(templateOfCandidates.content, true);

		// Reset any existing row for CANDIDATES
		try {
			document.getElementById("resultsByCandidate_RowForCandidates_Rowgroup-"+i).remove()
		}
		catch (error) {}

		// Reset any existing row for ANSWERS
		try {
			document.getElementById("resultsByCandidate_DivForQuestionAndAnswers-"+i).remove()
		}
		catch (error) {}





		// 1.a CANDIDATE row -> first cell -> Toggle-button to open close all questions and answers

		// Define attributes for the current TOGGLE BUTTON 
		const button_ShowQuestionAndCandidateAnswer = templateOfCandidates_Clone.getElementById("resultsByCandidate_Button_ShowCandidateAnswers-X")

		// Add a click-function to the toggle-button to open / close the candidate's answers (before changing it's ID later)
		button_ShowQuestionAndCandidateAnswer.onclick = function () { fnToggleDiv("resultsByCandidate_DivForQuestionAndAnswers-"+i, "resultsByCandidate_Button_ShowCandidateAnswers-"+i, 1) } 

		// Set the attributes of the toggle-button for this candidate' answers to the questions
		button_ShowQuestionAndCandidateAnswer.innerHTML = "[open / close]"	
		button_ShowQuestionAndCandidateAnswer.id = "resultsByCandidate_Button_ShowCandidateAnswers-"+i
		button_ShowQuestionAndCandidateAnswer.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
		button_ShowQuestionAndCandidateAnswer.title = TEXT_RESULTS_TOGGLE_BUTTON


		// 1.b CANDIDATE row -> second cell -> Candidate's name
		let candidateNameShort = templateOfCandidates_Clone.getElementById("resultsByCandidate_Text_CandidateName-X")
		candidateNameShort.innerHTML = objCandidates[candidateId].short
		candidateNameShort.id = "resultsByCandidate_Text_CandidateName-"+i

		// Set the ID for this row(group) - so it can be removed on refresh
		templateOfCandidates_Clone.getElementById("resultsByCandidate_RowForCandidate_Rowgroup-X").id = "resultsByCandidate_RowForCandidates_Rowgroup-"+i

		// Set the ID for the parent of QUESTIONS and ANSWERS - so it can be removed on refresh
		templateOfCandidates_Clone.getElementById("resultsByCandidate_DivForQuestionAndAnswers-X").id = "resultsByCandidate_DivForQuestionAndAnswers-"+i


		// APPEND new clone to the parent "resultsByCandidate_Table" 
		parentToTemplateOfCandidates.appendChild(templateOfCandidates_Clone);

		// Run TOGGLE-function
		fnToggleDiv("resultsByCandidate_DivForQuestionAndAnswers-"+i, "resultsByCandidate_Button_ShowCandidateAnswers-"+i, 1)




		const parentToTemplateOfQuestionAndAnswer = document.getElementById("resultsByCandidate_DivForQuestionAndAnswers-"+i)

		// 2. QUESTION and ANSWER -> top row 
		for (let j = 0; j <= arPersonalAnswers.length-1; j++ ) {

			// Create a clone of the row-template
			const templateOfQuestionAndAnswer_Clone = document.importNode(templateOfQuestionAndAnswer.content, true);

			// 2.a QUESTION and ANSWER -> top row -> first cell -> (Disabled) button with PERSONAL answer

			let personalAnswerButton = templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_UserAnswerShort-X-Y")
			let personalAnswerNumber = arPersonalAnswers[j]

			let personalAnswerButton_css_to_add = "" 
			let personalAnswerButton_icon_to_add = ""
			let personalAnswerButton_title = ""

			if (personalAnswerNumber == -1) {
				personalAnswerButton_css_to_add = "btn-danger"
				personalAnswerButton_icon_to_add = TEXT_VOTING_CONTRA_SHORT
				personalAnswerButton_title  = TEXT_VOTING_CONTRA_LONG
			}
			else if (personalAnswerNumber == 0) {
				personalAnswerButton_css_to_add = "btn-warning"
				personalAnswerButton_icon_to_add = TEXT_VOTING_NEUTRAL_SHORT
				personalAnswerButton_title  = TEXT_VOTING_NEUTRAL_LONG
			}
			else if (personalAnswerNumber == 1) {
				personalAnswerButton_css_to_add = "btn-success"
				personalAnswerButton_icon_to_add = TEXT_VOTING_PRO_SHORT
				personalAnswerButton_title  = TEXT_VOTING_PRO_LONG
			}

			else if ( (personalAnswerNumber == 99) || (!personalAnswerNumber) )  {
				personalAnswerButton_css_to_add = "btn-secondary"
				personalAnswerButton_icon_to_add = TEXT_VOTING_SKIP_SHORT
				personalAnswerButton_title  = TEXT_VOTING_SKIP_LONG
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnCreateResults_CandidatesAndAnswers() / section: personal answer. The personal answer index "+j+" was: '"+intQuestions[j]+"'. This shouldn't happen.")
			}

			// If the candidate's answer and the user's answer are different, overwrite the colorful CSS with a transparent one.
			if (objCandidates[candidateId].answers["a"+j].short != personalAnswerNumber) { 
				personalAnswerButton_css_to_add = "btn-outline-dark"
			}

			personalAnswerButton.innerHTML = personalAnswerButton_icon_to_add
			personalAnswerButton.classList.add(personalAnswerButton_css_to_add)

			let personalAnswerButton_ButtonTitle = TEXT_ANSWER_BY_USER+ ": "+personalAnswerButton_title
			personalAnswerButton.setAttribute("aria-label", personalAnswerButton_ButtonTitle)
			personalAnswerButton.title = personalAnswerButton_ButtonTitle
			personalAnswerButton.id = "resultsByCandidate_RowForQuestionAndAnswer_UserAnswerShort-"+i+"-"+j

			// 2.b QUESTION and ANSWER -> top row -> second cell -> toggle-button to open/close the question-row

			// Define attributes for the current TOGGLE BUTTON 
			const button_ShowCandidateAnswer = templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_Button_ShowCandidateAnswers-X-Y")

			// Add a click-function to the toggle-button to open / close the candidate's answers (before changing it's ID later)
			button_ShowCandidateAnswer.onclick = function () { fnToggleDiv("resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswer-"+i+"-"+j, "resultsByCandidate_RowForQuestionAndAnswer_Button_ShowCandidateAnswers-"+i+"-"+j, 1) } 

			// Set the attributes of the toggle-button for this candidate' answers to the questions
			button_ShowCandidateAnswer.innerHTML = "[open / close]"	
			button_ShowCandidateAnswer.id = "resultsByCandidate_RowForQuestionAndAnswer_Button_ShowCandidateAnswers-"+i+"-"+j
			button_ShowCandidateAnswer.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
			button_ShowCandidateAnswer.title = TEXT_RESULTS_TOGGLE_BUTTON




			// 2.c QUESTION and ANSWER -> top row -> second cell -> Full question as text
			let questionsText = templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_Question-X-Y")

			questionsText.innerHTML = (j+1)+ "/" +intQuestions+ " <strong>" +objQuestions["q"+j].short+ "</strong>: " +objQuestions["q"+j].long 
			questionsText.id = "resultsByCandidate_RowForQuestionAndAnswer_Question-"+i+"-"+j


			// 2.3. QUESTION and ANSWER -> second row -> first cell -> (Disabled) button with CANDIDATE's answer
			let candidateAnswerButton = templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswerShort-X-Y")
			let candidateAnswerNumber = objCandidates[candidateId].answers["a"+j].short

			let candidateAnswerButton_css_to_add = "" 
			let candidateAnswerButton_icon_to_add = ""
			let candidateAnswerButton_title = ""


			if (candidateAnswerNumber == -1) {
				candidateAnswerButton_css_to_add = "btn-danger"
				candidateAnswerButton_icon_to_add = TEXT_VOTING_CONTRA_SHORT
				candidateAnswerButton_title  = TEXT_VOTING_CONTRA_LONG
			}
			else if (candidateAnswerNumber == 0) {
				candidateAnswerButton_css_to_add = "btn-warning"
				candidateAnswerButton_icon_to_add = TEXT_VOTING_NEUTRAL_SHORT
				candidateAnswerButton_title  = TEXT_VOTING_NEUTRAL_LONG
			}
			else if (candidateAnswerNumber == 1) {
				candidateAnswerButton_css_to_add = "btn-success"
				candidateAnswerButton_icon_to_add = TEXT_VOTING_PRO_SHORT
				candidateAnswerButton_title  = TEXT_VOTING_PRO_LONG
			}
			else {
				console.log("Strange. We're in the ELSE-part of fnCreateResults_CandidatesAndAnswers() / section: candidate's answers. The candidate's answer index "+candidateId+".answers.a"+j+" was: '"+objCandidates[candidateId].answers["a"+j].short+"'. This shouldn't happen.")
			}


			candidateAnswerButton.innerHTML = candidateAnswerButton_icon_to_add
			candidateAnswerButton.classList.add(candidateAnswerButton_css_to_add)

			let candidateAnswerButton_ButtonTitle = TEXT_ANSWER_BY_CANDIDATE+ ": "+candidateAnswerButton_title
			candidateAnswerButton.setAttribute("aria-label", candidateAnswerButton_ButtonTitle)
			candidateAnswerButton.title = candidateAnswerButton_ButtonTitle
			candidateAnswerButton.id = "resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswerShort-"+i+"-"+j

			// 2.4. QUESTION and ANSWER -> second row -> second cell -> Text with the candidate's full answer
			let candidateAnswerLongText = templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswerLong-X-Y")

			candidateAnswerLongText.innerHTML = objCandidates[candidateId].answers["a"+j].long  
			candidateAnswerLongText.id = "resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswerLong-"+i+"-"+j

			// 3. Set ID
			// templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_Rowgroup-X-Y").id = "resultsByCandidate_RowForQuestionAndAnswer_Rowgroup-"+i+"-"+j

			templateOfQuestionAndAnswer_Clone.getElementById("resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswer-X-Y").id = "resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswer-"+i+"-"+j


			// APPEND new clone to the parent "resultsByCandidate_Table" 
			parentToTemplateOfQuestionAndAnswer.appendChild(templateOfQuestionAndAnswer_Clone);

			// Run Toggle
			fnToggleDiv("resultsByCandidate_RowForQuestionAndAnswer_CandidateAnswer-"+i+"-"+j, "resultsByCandidate_RowForQuestionAndAnswer_Button_ShowCandidateAnswers-"+i+"-"+j, 1) 

		} // end: for j


	} // end: for i

} // end: fnCreateResults_CandidatesAndAnswers()

