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
	const parentToTemplate = document.getElementById("resultsOverviewCandidates")

	// Clear all existing content
	parentToTemplate.innerHTML = ""

	/* ------------------------------------------------------------------- */

	// Loop through the array of sorted candidates and build the "table"
	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

		// Get the ID of the candidate from the ordered array
		// Example: arCandidatesSortedByPoints[0].id = "c3"
		let idOfCandidate = arCandidatesSortedByPoints[i].id

		// Create a clone of the results-overview-template
		const template = document.getElementById("resultsOverviewCandidatesTemplate");
		const templateClone = document.importNode(template.content, true);

		/* ----------------------------------------------------------- */

		// Add a click-function to the toggle-button to open / close the description (before changing it's ID later)
		const buttonShowCandidateDivDescription = templateClone.getElementById("buttonShowCandidateDivDescription-X")
		buttonShowCandidateDivDescription.onclick = function () { fnToggleDiv("candidateDivDescription-"+i, "buttonShowCandidateDivDescription-"+i, 1) } 

		// Set the attributes of the toggle-button for this candidate
		buttonShowCandidateDivDescription.innerHTML = "[open / close]"	
		buttonShowCandidateDivDescription.id = "buttonShowCandidateDivDescription-"+i
		buttonShowCandidateDivDescription.setAttribute("aria-label", TEXT_RESULTS_TOGGLE_BUTTON)
		buttonShowCandidateDivDescription.title = TEXT_RESULTS_TOGGLE_BUTTON
 
		/* ----------------------------------------------------------- */

		// Set the short name of the candidate (from objCandidates)
		const candidateShort = templateClone.getElementById("candidateShort-X")
		candidateShort.innerHTML = objCandidates[idOfCandidate].short
		candidateShort.id = "candidateShort-"+i

		// Set the long name of the candidate (from objCandidates)
		const candidateLong = templateClone.getElementById("candidateLong-X")
		candidateLong.innerHTML = objCandidates[idOfCandidate].long
		candidateLong.id = "candidateLong-"+i

		// Set the description of the candidate (from objCandidates) - if available
		const candidateDescription = templateClone.getElementById("candidateDescription-X")
		let candidateDescriptionText = objCandidates[idOfCandidate].desc
		if (candidateDescriptionText.length > 1) {
			candidateDescription.innerHTML = candidateDescriptionText }
		else {
			candidateDescription.innerHTML = TEXT_ERROR_NO_DESCRIPTION }
		candidateDescription.id = "candidateDescription-"+i

		// Set the URL (web, site, page) of the candidate (from objCandidates)
		const candidateUrl = templateClone.getElementById("candidateUrl-X")
		candidateUrl.innerHTML = objCandidates[idOfCandidate].url
		candidateUrl.id = "candidateUrl-"+i

		/* ----------------------------------------------------------- */

		// Set the image of the candidate (from objCandidates)
		const candidateImage = templateClone.getElementById("candidateImage-X")
		candidateImage.src = objCandidates[idOfCandidate].pic
		candidateImage.id = "candidateImage-"+i
		candidateImage.title = TEXT_IMAGE+ " : " + objCandidates[idOfCandidate].short
		candidateImage.setAttribute("alt", TEXT_IMAGE+ " : " + objCandidates[idOfCandidate].short)

		// Set the ID of the parent description-DIV to toggle it later by button "buttonShowCandidateDivDescription-X"
		templateClone.getElementById("candidateDivDescription-X").id = "candidateDivDescription-"+i

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

		/* ----------------------------------------------------------- */

		// Run the TOGGLE-function to hide the description-DIV and set open/close-icon on the button
		fnToggleDiv("candidateDivDescription-"+i, "buttonShowCandidateDivDescription-"+i, 1)

	}


} // end: fnCreateResults_Overview()

