"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */

// Create a "table" to change the user's answer again.
function fnCreateResults_fineTuning() {

//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)

	const parentTotemplateOfTuning = document.getElementById("results_tuning_table");
	const template_tuning = document.getElementById("results_tuning_table_template");


	/* ------------------------------------------------------------------- */


	// Array of possible answers and multiplier to create a new button-call
	// Example: current answer = [2] : 1x1 -> new answer = [3] : 0.5x1
	let array_answerShort_int_forSequence            = [  1, 1, 0.5, -1,  -1, 0]
	let array_multiplierShort_int_forSequence_normal = [1.5, 1,   1,  1, 1.5, 0]
	let array_multiplierShort_int_forSequence_double = [  3, 2,   2,  2,   3, 0]

	// If some buttons were disabled in DEFINITION.JS -> delete the values from the array[] but keep the length / size.
	if (intQuestionButtons == 3) {
		array_answerShort_int_forSequence[0] = null
		array_multiplierShort_int_forSequence_normal[0] = null
		array_multiplierShort_int_forSequence_double[0] = null
		
		array_answerShort_int_forSequence[4] = null
		array_multiplierShort_int_forSequence_normal[4] = null
		array_multiplierShort_int_forSequence_double[4] = null
	}
	if (intShowButtonNeutral == 0) {
		array_answerShort_int_forSequence[2] = null
		array_multiplierShort_int_forSequence_normal[2] = null
		array_multiplierShort_int_forSequence_double[2] = null
	}
	if (intShowButtonSkip == 0) {
		array_answerShort_int_forSequence[5] = null
		array_multiplierShort_int_forSequence_normal[5] = null
		array_multiplierShort_int_forSequence_double[5] = null
	}


	/* ------------------------------------------------------------------- */

	
	// Loop through the array of default short answers for the sequence
	// and find all values that are not "null".
	// Then save the index-number to loop through it later.
	// Example: 
	// - All buttons active:     [1,    1, 0.5, -1,    -1, 0] -> valid: [0, 1, 2, 3, 4, 5]
	// - Extra buttons disabled: [null, 1, 0.5, -1,  null, 0] -> valid: [   1, 2, 3,    5] 
	let array_validIndexes_forSequence = []

	for (let i = 0; i <= array_answerShort_int_forSequence.length-1; i++ )
	{
		if (array_answerShort_int_forSequence[i] != null ) {
			array_validIndexes_forSequence.push(i)
		}
	}


	/* ------------------------------------------------------------------- */

/*
	// Create arrays with the default button-values in this order: 
	// [++][x2], [+][x2], [++], [+], 
	// [oo][x2], [o][x2], [oo], [o],  
	// [--][x2], [-][x2], [--], [-], 
	// [skip] 
	let array_answerShort_int_forButtonStyling = [    1,  1,  1,  1,
							0.5,0.5,0.5,0.5,
							 -1, -1, -1, -1,
							0]
	
	let array_multiplierShort_int_forButtonStyling = [3, 2, 1.5, 1,
								3, 2, 1.5, 1,
								3, 2, 1.5, 1,
								0]

	
	let array_answerShort_text_forButtonStyling =  [TEXT_VOTING_PRO_EXTRA_SHORT, TEXT_VOTING_PRO_SHORT, TEXT_VOTING_PRO_EXTRA_SHORT, TEXT_VOTING_PRO_SHORT, 
					TEXT_VOTING_NEUTRAL_SHORT, TEXT_VOTING_NEUTRAL_SHORT, TEXT_VOTING_NEUTRAL_SHORT, TEXT_VOTING_NEUTRAL_SHORT,
					TEXT_VOTING_CONTRA_EXTRA_SHORT, TEXT_VOTING_CONTRA_SHORT, TEXT_VOTING_CONTRA_EXTRA_SHORT, TEXT_VOTING_CONTRA_SHORT, 					
					TEXT_VOTING_SKIP_SHORT]

	let array_answerLong_text_forButtonStyling = [TEXT_VOTING_PRO_EXTRA_LONG, TEXT_VOTING_PRO_LONG, TEXT_VOTING_PRO_EXTRA_LONG, TEXT_VOTING_PRO_LONG, 
					TEXT_VOTING_NEUTRAL_LONG, TEXT_VOTING_NEUTRAL_LONG, TEXT_VOTING_NEUTRAL_LONG, TEXT_VOTING_NEUTRAL_LONG, 
					TEXT_VOTING_CONTRA_EXTRA_LONG, TEXT_VOTING_CONTRA_LONG, TEXT_VOTING_CONTRA_EXTRA_LONG, TEXT_VOTING_CONTRA_LONG, 
					TEXT_VOTING_SKIP_LONG]

	let array_cssToAdd_forButtonStyling = ["btn-success", "btn-success", "btn-success", "btn-success", 
				"btn-warning", "btn-warning", "btn-warning", "btn-warning", 
				"btn-danger", "btn-danger", "btn-danger", "btn-danger", 
				"btn-secondary"]

	let array_cssToAdd_extra_forButtonStyling = ["mow-btn-success-dark", "", "mow-btn-success-dark", "", 
					"", "", "", "",
					"mow-btn-danger-dark", "", "mow-btn-danger-dark", "", 
					""]

*/

	/* ------------------------------------------------------------------- */


	// Go through all questions and add them to the row
	for (let i = 0; i <= intQuestions-1; i++ )
	{
		// Create a clone the template
		const template_tuning_Clone = document.importNode(template_tuning.content, true);

		// Reset any existing rows
		try {
			document.getElementById("results_tuning_table_row-"+i).remove()
		}
		catch (error) {}


		/* ----------------------------------------------------------- */


		let current_answer = arPersonalAnswers[i]
		let current_multiplier = arPersonalMultiplier[i]
		let new_multiplier = -999
		
		let buttonPersonalAnswer_answerShort_text = ""
		let buttonPersonalAnswer_answerLong_text = ""

		let buttonPersonalAnswer_cssToAdd = ""
		let buttonPersonalAnswer_cssToAdd_extra = ""

		let buttonMultiplier_cssToAdd = ""
		let buttonMultiplier_ariaPressed = "false"


		/* ----------------------------------------------------------- */


		// 1. FIRST cell -> (double / important) button styling 

		// Define attributes for the current DOUBLE BUTTON 
		const buttonPersonalMultiplier = template_tuning_Clone.getElementById("results_tuning_table_button_personalMultiplier-X")

		// If the DOUBLE-button has been disabled in DEFINITION.JS -> Hide <button> but keep parent <div> visible (unlike in the "questions"-cards where the parent is hidden, as well)
		if (intShowButtonDouble == 0) {
			buttonPersonalMultiplier.style.display = "none"
		}

		// Style the button with the personal MULTIPLIER
		// Multiplier-button was set to [x2] double -> set to normal
		if ( (current_multiplier == 3) || (current_multiplier == 2) ) {
			buttonMultiplier_cssToAdd = "btn-dark"
			buttonMultiplier_ariaPressed = "true"
			new_multiplier = current_multiplier / 2
		}
		// Multiplier-button was set to normal -> set to [x2] double
		else {
			buttonMultiplier_cssToAdd = "btn-outline-dark"
			buttonMultiplier_ariaPressed = "false"
			new_multiplier = current_multiplier * 2
		}


		/* ----------------------------------------------------------- */


		// Set the attributes for the [x2] DOUBLE-button
		buttonPersonalMultiplier.classList.add(buttonMultiplier_cssToAdd);
		buttonPersonalMultiplier.setAttribute("aria-pressed", buttonMultiplier_ariaPressed)

		let buttonMultiplier_title = TEXT_VOTING_DOUBLE_LONG
		buttonPersonalMultiplier.setAttribute("aria-label", buttonMultiplier_title)
		buttonPersonalMultiplier.title = buttonMultiplier_title
		buttonPersonalMultiplier.innerHTML = TEXT_VOTING_DOUBLE_SHORT

		// Clicking the DOUBLE-button does NOT change the personal answer = "oldAnswer"
		buttonPersonalMultiplier.onclick = function () { fnEvaluationCurrentAnswer(i, current_answer, new_multiplier) } 
		buttonPersonalMultiplier.id = "results_tuning_table_button_personalMultiplier-"+i


		/* ----------------------------------------------------------- */


		// 2a SECOND cell -> (personal answer) button STYLING 

		// Define attributes for the current PERSONAL-ANSWER BUTTON 
		let buttonPersonalAnswer = template_tuning_Clone.getElementById("results_tuning_table_button_PersonalAnswer-X")

/*
		// Style the button with the personal ANSWER
		for (let j = 0; j <= array_answerShort_int_forButtonStyling.length-1 ; j++ ) {
			
			if ( (array_answerShort_int_forButtonStyling[j] == current_answer) && (array_multiplierShort_int_forButtonStyling[j] == current_multiplier) ) {

				// Define the icon, title-text and CSS 
//				buttonPersonalAnswer_answerShort_text = array_answerShort_text_forButtonStyling[j]
//				buttonPersonalAnswer_answerLong_text  = array_answerLong_text_forButtonStyling[j]
//				buttonPersonalAnswer_cssToAdd         = array_cssToAdd_forButtonStyling[j]
//				buttonPersonalAnswer_cssToAdd_extra   = array_cssToAdd_extra_forButtonStyling[j]
			}
			else {
				// console.log("Kein Treffer i/j " +i+ "/" +j+ " answ x multi "+current_answer+" x "+current_multiplier+ ".")
			}
			
		} // end: for-j
*/

		/* ----------------------------------------------------------- */


		// 2b. SECOND cell -> (personal answer) button ONCLICK-VALUES
		let buttonPersonal_newAnswerShort = -999
		let buttonPersonal_newMultiplier  = -999
		let buttonPersonal_isMultplierDouble = false
		let oldIndex = -999
		let newIndex = -999


		// Find the old index number in the default arrays -> to calculate the new index (from array_validIndexes_forSequence[])
		for (let j = 0; j <= array_answerShort_int_forSequence.length-1 ; j++ ) {

			// Check, if there's a valid entry in the default array (not null)
			if (array_answerShort_int_forSequence[j] != null) {

				// The current answer matches the value in the default array
				if (array_answerShort_int_forSequence[j] == current_answer) { 
				
					// Multiplier is a normal multiplier (1 or 1.5)
					if ( (array_multiplierShort_int_forSequence_normal[j] == current_multiplier) ) {
						oldIndex = j
						buttonPersonal_isMultplierDouble = false
					}

					// Multiplier is a double multiplier (2 or 3)
					else if ( (array_multiplierShort_int_forSequence_double[j] == current_multiplier) ) {
						oldIndex = j
						buttonPersonal_isMultplierDouble = true
					}

					// Nothing found -> Might be one of the first loops or an error. -> Fall back to default answer 1x1.
					else {
						buttonPersonal_newAnswerShort = 1
						buttonPersonal_newMultiplier = 1
					}
					
				} // end: if current_answer
			} // end: if [j] != null
		} // end: for-j


		/* ----------------------------------------------------------- */


		// Create the new index numbers for the ONCLICK-function
		for (let j = 0; j <= array_validIndexes_forSequence.length-1 ; j++ ) {

			if (oldIndex == array_validIndexes_forSequence[ j ] ) {

				newIndex = array_validIndexes_forSequence[ j+1 ]

				// We reached the end of the array -> go back to [0].
				if ( (!newIndex) || (newIndex == "undefined") ) {
					newIndex = array_validIndexes_forSequence[0]
				}
			}
		} // end: for j


		/* ----------------------------------------------------------- */


		// Find the next valid numbers for ANSWERS and MULTIPLIERS in the default arrays based on the newIndex.
		buttonPersonal_newAnswerShort = array_answerShort_int_forSequence[newIndex]

		if (buttonPersonal_isMultplierDouble) {
			buttonPersonal_newMultiplier = array_multiplierShort_int_forSequence_double[newIndex]
		} else {
			buttonPersonal_newMultiplier = array_multiplierShort_int_forSequence_normal[newIndex]
		}


		/* ----------------------------------------------------------- */


		buttonPersonalAnswer = fnSetAnswerButtonAttributes(current_answer, current_multiplier, 0, buttonPersonalAnswer)

		// After setting all the variables (above), finally change the style and contents of the PERSONAL ANSWER-button
		// buttonPersonalAnswer.innerHTML = buttonPersonalAnswer_answerShort_text

		// buttonPersonalAnswer.classList.add(buttonPersonalAnswer_cssToAdd);

	//	if (buttonPersonalAnswer_cssToAdd_extra) {
	//		buttonPersonalAnswer.classList.add(buttonPersonalAnswer_cssToAdd_extra); }

		// Set the long text for ARIA and ID, like: "Your reply 1/6: I agree?" on the PERSONAL ANSWER-button
//		let buttonPersonal_title = TEXT_ANSWERED_BY_USER+ " "+(i+1)+"/"+intQuestions+": "+buttonPersonalAnswer_answerLong_text
//		buttonPersonal_title = fnClearHtmlTags(buttonPersonal_title)
//		buttonPersonalAnswer.setAttribute("aria-label", buttonPersonal_title)
//		buttonPersonalAnswer.title = buttonPersonal_title

		// Add an updated click-event and change the ID of the the PERSONAL ANSWER-button
		// Clicking the PERSONAL ANSWER-button DOES change the personal answer = "newAnswer"

		buttonPersonalAnswer.onclick = function () { fnEvaluationCurrentAnswer(i, buttonPersonal_newAnswerShort, buttonPersonal_newMultiplier) } 
		buttonPersonalAnswer.id = "results_byQuestion_Button_PersonalAnswer-"+i

		/* ----------------------------------------------------------- */		
		
		/* ----------------------------------------------------------- */

		// 1d. THIRD cell -> long and short question-text

		// Set the texts of the question
		// Example: "6/6 Sweetness: Sweet fruits are the best."
		let questionText = (i+1)+"/"+intQuestions+" "+objQuestions["q"+i].short
		template_tuning_Clone.getElementById("results_tuning_table_questionsShort").innerHTML = "&nbsp;"+questionText
		template_tuning_Clone.getElementById("results_tuning_table_questionsLong").innerHTML = objQuestions["q"+i].long

		/* ----------------------------------------------------------- */

		// Set the ID for this row(group)
		template_tuning_Clone.getElementById("results_tuning_table_row-X").id = "results_tuning_table_row-"+i

		/* ----------------------------------------------------------- */

		// APPEND new clone to the parent 
		parentTotemplateOfTuning.appendChild(template_tuning_Clone);

		/* ----------------------------------------------------------- */

	}

} // end: fnCreateResults_QuestionsAndAnswers()

