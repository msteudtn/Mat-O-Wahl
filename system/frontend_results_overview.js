"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */


// Create the general overview of the results.
function fnCreateResults_Overview(arCandidatesSortedByPoints, intMaxPoints) {

	// Get the parent div for all candidates (overview)
	const parentToTemplate = document.getElementById("results_overview_byMatches_accordion")
	

	// Clear all existing content
	parentToTemplate.innerHTML = ""


	/* ------------------------------------------------------------------- */


	// Loop through the array of sorted candidates and build the "table" for the overview (by matches)
	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

		// Get the ID of the candidate from the ordered array
		// Example: arCandidatesSortedByPoints[0].id = "c3"
		let idOfCandidate = arCandidatesSortedByPoints[i].id

		// Create a clone of the results-overview-template
		const template = document.getElementById("results_overview_byMatches_template");
		const templateClone = document.importNode(template.content, true);


		/* ----------------------------------------------------------- */

		
		// Set the IDs to open / close the DESCRIPTION with Bootstrap's ACCORDION
		const accordionButton = templateClone.getElementById("results_overview_byMatches_accordionButton-X")
		accordionButton.setAttribute("data-bs-target", "#results_overview_byMatches_accordionCollapse-"+i)
		accordionButton.setAttribute("aria-controls", "results_overview_byMatches_accordionCollapse-"+i)
		accordionButton.id = "results_overview_byMatches_accordionButton-"+i


		const accordianCollapse = templateClone.getElementById("results_overview_byMatches_accordionCollapse-X");
		accordianCollapse.id = "results_overview_byMatches_accordionCollapse-"+i
		// Set class "show" to the FIRST [0] COLLAPSE and the aria-expanded to the toggle-button 
		if (i == 0) {
			accordianCollapse.classList.add("show")
			accordionButton.setAttribute("aria-expanded", "true")
		}
		// Set the attributes for the other toggle-buttons
		else {
			accordionButton.classList.add("collapsed")
			accordionButton.setAttribute("aria-expanded", "false")
		}
 

		/* ----------------------------------------------------------- */


		// Set the short NAME of the candidate (from objCandidates)
		const candidateShort = templateClone.getElementById("candidateShort-X")
		candidateShort.innerHTML = "&nbsp;"+objCandidates[idOfCandidate].short
		candidateShort.id = "candidateShort-"+i

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
			candidateDescription.innerHTML = TEXT_RESULTS_ERROR_NO_DESCRIPTION }
		candidateDescription.id = "candidateDescription-"+i

		// Set the URL (web, site, page) of the candidate (from objCandidates)
		// If there's none, we set the display to "none" to hide the element (mainly relevant for screen-readers)
		const candidateUrl = templateClone.getElementById("candidateUrl-X")
		const candidateUrlText = objCandidates[idOfCandidate].url 
		if (candidateUrlText.length > 1) {
			candidateUrl.href = candidateUrlText 
			candidateUrl.setAttribute("aria-label",TEXT_RESULTS_URL)
			candidateUrl.title = TEXT_RESULTS_URL
			candidateUrl.innerHTML = "&#x1F310;&#xFE0E; "+TEXT_RESULTS_URL; // Unicode icon: Globe with Meridians (text style VS15 / FE0E, not emoji VS16 / FE0F)
		}
		else {
			candidateUrl.style.display = "none" 
		}
		candidateUrl.id = "candidateUrl-"+i

		// Set the EMAIL of the candidate (from objCandidates)
		// If there's none, we set the display to "none" to hide the element (mainly relevant for screen-readers)
		const candidateMail = templateClone.getElementById("candidateMail-X")
		const candidateMailText = objCandidates[idOfCandidate].mail 
		if (candidateMailText.length > 1) {
			candidateMail.href = "mailto:"+candidateMailText 
			candidateMail.setAttribute("aria-label",TEXT_RESULTS_MAIL)
			candidateMail.title = TEXT_RESULTS_MAIL
			candidateMail.innerHTML = "&#x2709;&#xFE0E; "+TEXT_RESULTS_MAIL; // Unicode icon: Envelope (text style VS15 / FE0E, not emoji VS16 / FE0F)
		}
		else {
			candidateMail.style.display = "none" 
		}
		candidateMail.id = "candidateMail-"+i

		// Set the TELEPHONE NUMBER of the candidate (from objCandidates)
		// If there's none, we set the display to "none" to hide the element (mainly relevant for screen-readers)
		const candidateTel = templateClone.getElementById("candidateTel-X")
		let candidateTelText = objCandidates[idOfCandidate].tel
		// remove everything but the numbers and the plus (prefix for international dialing code)
		candidateTelText = candidateTelText.replace(/[^0-9+]/g, '')
		if (candidateTelText.length > 1) {
			candidateTel.href = "tel:"+candidateTelText 
			candidateTel.setAttribute("aria-label",TEXT_RESULTS_TEL)
			candidateTel.title = TEXT_RESULTS_TEL
			candidateTel.innerHTML = "&#x1F4DE;&#xFE0E; "+TEXT_RESULTS_TEL; // Unicode icon: Telephone Receiver (text style VS15 / FE0E, not emoji VS16 / FE0F)
		}
		else {
			candidateTel.style.display = "none" 
		}
		candidateTel.id = "candidateTel-"+i


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
		candidateImage.title = TEXT_RESULTS_IMAGE+ " : " + objCandidates[idOfCandidate].short
		candidateImage.setAttribute("alt", TEXT_RESULTS_IMAGE+ " : " + objCandidates[idOfCandidate].short)


		/* ----------------------------------------------------------- */


		// Set the style of the PROGRESS-BAR
		let candidateProgressBar = templateClone.getElementById("candidateProgressBar-X")
		candidateProgressBar = fnSetProgressBarAttributes(candidateProgressBar, idOfCandidate, intMaxPoints, i);

		// The percentage has already been calculated in fnSetProgressBarAttributes().
		// It is now saved in the "width" attribute.
		// We're not going to calculate it independently, because fnSetProgressBarAttributes() is also used for the "results_smallAndSticky" results. 
		// There's no extra label for the percentage in "results_smallAndSticky". So we're using this dirty alternative here.
		let intPercentage = 0
		intPercentage = candidateProgressBar.style.width

		// Write down the percentage (and points) behind the progress bar 
		const candidatePercentage = templateClone.getElementById("candidatePercentage-X")
//		candidatePercentage.innerHTML = intPercentage
		candidatePercentage.innerHTML =  intPercentage+" ("+objCandidates[idOfCandidate].points+ "/" +intMaxPoints+ ")"
		candidatePercentage.id = "candidatePercentage-"+i


		/* ----------------------------------------------------------- */


		// Append the new clone to the parent "resultsOverviewCandidates"
		parentToTemplate.appendChild(templateClone);
	}

} // end: fnCreateResults_Overview()


/* *************************************************************************** */


// Create the overview of the results, that appear on scrolling
function fnCreateResults_smallAndSticky(arCandidatesSortedByPoints, intMaxPoints) {

	const parentTotemplateOfSmallResults = document.getElementById("results_smallAndSticky")
	const template_smallResults = document.getElementById("results_smallAndSticky_template");	

	// Only show the first three [index: 2] candidates ...
	let lastCandidate = 2
	// ... but if we have only two candidates (from "intCandidates") to compare, loop only to index:1
	if (intCandidates <= 2) {
		lastCandidate = 1 }

	// Loop through the first three candidates.
	for (let i = 0; i <= lastCandidate; i++ ) {

		let idOfCandidate = arCandidatesSortedByPoints[i].id

		// Create a clone the template
		const template_smallResults_Clone = document.importNode(template_smallResults.content, true);

		// Reset any existing row
		try {
			document.getElementById("results_smallAndSticky-candidate-"+i).remove()
		}
		catch (error) {}

		// Set the name of the candidates
		const columnText = template_smallResults_Clone.getElementById("results_smallAndSticky-candidateText-X")
		columnText.innerHTML = (i+1)+ ".&nbsp;" +objCandidates[idOfCandidate].short
		columnText.id = "results_smallAndSticky-candidateText-"+i

		let columnProgressBar = template_smallResults_Clone.getElementById("results_smallAndSticky-progressBar-X")
		columnProgressBar = fnSetProgressBarAttributes(columnProgressBar, idOfCandidate, intMaxPoints, i);

		// Set the ID for this col
		const column = template_smallResults_Clone.getElementById("results_smallAndSticky-candidate-X")
		column.id = "results_smallAndSticky-candidate-"+i

		// APPEND new clone to the parent 
		parentTotemplateOfSmallResults.appendChild(template_smallResults_Clone);

	}

} // end: fnCreateResults_smallAndSticky()





