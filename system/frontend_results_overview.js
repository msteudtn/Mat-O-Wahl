"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


// 1. Create the general overview of the results.
function fnCreateResults_Overview(arCandidatesSortedByPoints, intMaxPoints) {

	// Get the parent div for all candidates (overview)
	const parentToTemplate = document.getElementById("results_overview")

	// Clear all existing content
	parentToTemplate.innerHTML = ""

	/* ------------------------------------------------------------------- */

	// Loop through the array of sorted candidates and build the "table"
	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

		// Get the ID of the candidate from the ordered array
		// Example: arCandidatesSortedByPoints[0].id = "c3"
		let idOfCandidate = arCandidatesSortedByPoints[i].id

		// Create a clone of the results-overview-template
		const template = document.getElementById("results_overview_byMatches_template");
		const templateClone = document.importNode(template.content, true);

		/* ----------------------------------------------------------- */

		// Get the TOGGLE-button to open / close the DESCRIPTION (before changing it's ID later)
		// The button has a Bootstrap "collapse" function in it.
		const results_overview_byMatches_button_ShowCandidateDescription = templateClone.getElementById("results_overview_byMatches_button_ShowCandidateDescription-X")

		// Set the attributes of the toggle-button for this candidate
		results_overview_byMatches_button_ShowCandidateDescription.id = "results_overview_byMatches_button_ShowCandidateDescription-"+i
		results_overview_byMatches_button_ShowCandidateDescription.setAttribute("data-bs-target", "#results_overview_byMatches_divCandidateDescription-"+i)
		results_overview_byMatches_button_ShowCandidateDescription.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
		results_overview_byMatches_button_ShowCandidateDescription.title = TEXT_RESULTS_TOGGLE_BUTTON
		results_overview_byMatches_button_ShowCandidateDescription.setAttribute("aria-controls", "results_overview_byMatches_divCandidateDescription-"+i)
		results_overview_byMatches_button_ShowCandidateDescription.title = TEXT_RESULTS_TOGGLE_BUTTON
 
		/* ----------------------------------------------------------- */

		// Set the short NAME of the candidate (from objCandidates)
		const candidateShort = templateClone.getElementById("results_overview_byMatches_candidateShortName-X")
		candidateShort.innerHTML = "&nbsp;"+objCandidates[idOfCandidate].short
		candidateShort.id = "results_overview_byMatches_candidateShortName-"+i

		// Set the long NAME of the candidate (from objCandidates)
		// If there's none, we set the display to "none" to hide the element (mainly relevant for screen-readers)
		const candidateLong = templateClone.getElementById("candidateLong-X")
		const candidateLongText = objCandidates[idOfCandidate].long
		if (candidateLongText.length > 1) {
			candidateLong.innerHTML = candidateLongText }
		else {
			candidateLong.style.display = "none" }
		candidateLong.id = "candidateLong-"+i

		// Set the DESCRIPTION of the candidate (from objCandidates) - if available
		// If there's none, we show an error message
		const candidateDescription = templateClone.getElementById("candidateDescription-X")
		let candidateDescriptionText = objCandidates[idOfCandidate].desc
		if (candidateDescriptionText.length > 1) {
			candidateDescription.innerHTML = candidateDescriptionText }
		else {
			candidateDescription.innerHTML = TEXT_ERROR_NO_DESCRIPTION }
		candidateDescription.id = "candidateDescription-"+i

		// Set the URL (web, site, page) of the candidate (from objCandidates)
		// If there's none, we set the display to "none" to hide the element (mainly relevant for screen-readers)
		const candidateUrl = templateClone.getElementById("candidateUrl-X")
		const candidateUrlText = objCandidates[idOfCandidate].url 
		if (candidateUrlText.length > 1) {
			candidateUrl.innerHTML = candidateUrlText }
		else {
			candidateUrl.style.display = "none" }
		candidateUrl.id = "candidateUrl-"+i

		/* ----------------------------------------------------------- */

		// Set the IMAGE of the candidate (from objCandidates)
		// If there's none, we set the display to "none" to hide the element (mainly relevant for screen-readers)
		const candidateImage = templateClone.getElementById("candidateImage-X")
		const candidateImageText = objCandidates[idOfCandidate].pic 
		if (candidateImageText.length > 1) {
			candidateImage.src = candidateImageText }
		else {
			candidateImage.style.display = "none" }
		candidateImage.id = "candidateImage-"+i
		candidateImage.title = TEXT_IMAGE+ " : " + objCandidates[idOfCandidate].short
		candidateImage.setAttribute("alt", TEXT_IMAGE+ " : " + objCandidates[idOfCandidate].short)

		// Set the ID of the parent description-DIV to toggle it later by button "results_overview_byMatches_button_ShowCandidateDescription-X"
		templateClone.getElementById("results_overview_byMatches_divCandidateDescription-X").id = "results_overview_byMatches_divCandidateDescription-"+i

		/* ----------------------------------------------------------- */

		// Calculate the percentage for the progress-bar 
		// Example: objCandidates["p3"].points = 3 divided by max. 7 points = 0.428 = 43%
		let intPercentage = 0
		if (intMaxPoints > 0) {
			intPercentage = Math.round ( ( objCandidates[idOfCandidate].points / intMaxPoints ) * 100 )
		}
		// All questions have been skipped -> Avoid a "NaN"-percentage!
		else {
			intPercentage = 0
		}


		// Set the color (CSS class) for the progress-bar
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
		const candidateProgressBar = templateClone.getElementById("candidateProgressBar-X")
		candidateProgressBar.style.width = intPercentage+"%"
		candidateProgressBar.classList.add(progressBarColor) 
		candidateProgressBar.setAttribute("aria-valuenow", intPercentage)
		candidateProgressBar.title = intPercentage+"% ("+objCandidates[idOfCandidate].points+ "/" +intMaxPoints+ ")"
		candidateProgressBar.id = "candidateProgressBar-"+i

		// Write down the percentage (and points) behind the progress bar 
		const candidatePercentage = templateClone.getElementById("candidatePercentage-X")
//		candidatePercentage.innerHTML = intPercentage+"%"
		candidatePercentage.innerHTML =  intPercentage+"% ("+objCandidates[idOfCandidate].points+ "/" +intMaxPoints+ ")"
		candidatePercentage.id = "candidatePercentage-"+i

		/* ----------------------------------------------------------- */

		// Append the new clone to the parent "resultsOverviewCandidates"
		parentToTemplate.appendChild(templateClone);
	}


} // end: fnCreateResults_Overview()

