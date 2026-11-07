"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


/* *************************************************************************** */


// Check, if the page has been scrolled.  If so ...
// (1.) Show / hide the button "Scroll to top"
// (2.) Show / hide the "small and sticky results" at top.
function fnCheckScrolling() {

	// Show / hide the button "Scroll to top"
	const scrollToTopButton = document.getElementById("footer_buttonScrollToTop");

	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		scrollToTopButton.style.display = "block";
	} else {
		scrollToTopButton.style.display = "none";
	}

	// Show / hide the "small and sticky results" at top.
	const results_overview = document.getElementById("results_overview_byMatches_accordion");
	const results_overview_bottom = results_overview.getBoundingClientRect().bottom
	const results_small =  document.getElementById("results_smallAndSticky")

	if (results_overview_bottom < 0) {
		results_small.style.display = "flex"
	}
	else {
		results_small.style.display = "none"
	}

/*
	// Semi-Center the welcome-screen by setting height on an empty div
	const heightWindow = window.innerHeight
	const heightWelcomeScreen = document.getElementById("welcomeScreen").clientHeight
	const heightFooter = document.getElementsByTagName("footer")[0].clientHeight
	let heightEmptyDiv = 0

	if (heightWelcomeScreen > 0) {
		heightEmptyDiv = Math.round( ( (heightWindow - heightWelcomeScreen - heightFooter) / 2) * 0.5)
	} else {
		heightEmptyDiv = 0
	} 

	document.getElementById("emptyDivToCenterFollowingDivsOnLargeScreens").style.height = heightEmptyDiv+"px"

	console.log("Window: "+heightWindow+" - welcome: "+heightWelcomeScreen+" - footer: "+heightFooter+" -> empty: "+heightEmptyDiv)
*/
}


/* *************************************************************************** */


// When the user clicks on the button, scroll to the top of the document
function fnScrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 


/* *************************************************************************** */


function fnOpenAnswersByCandidateAndScrollToCandidate(arCandidatesSortedByPoints, candidateNumber) {

	// Set the toggle-button to "open"
	const el_buttonFor_byCandidates = document.getElementById("results_byX_buttonFor_byCandidates")
	el_buttonFor_byCandidates.classList.remove("collapsed")
	el_buttonFor_byCandidates.setAttribute("aria-expanded", "true")

	// Set the table "answers by candidate"  to "open"
	const el_results_byCandidate = document.getElementById("results_byCandidate")
	el_results_byCandidate.classList.remove("show")
	el_results_byCandidate.classList.add("show")

	// Reset / Close all elements inside the accordion
	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

		// Reset / close all buttons / headers
		let el_results_byCandidate_accordionButton = document.getElementById("results_byCandidate_accordionButton-"+i)
		el_results_byCandidate_accordionButton.classList.add("collapsed")
		el_results_byCandidate_accordionButton.setAttribute("aria-expanded", "false")

		// Reset overview of answers
		let el_results_byCandidate_accordionCollapse = document.getElementById("results_byCandidate_accordionCollapse-"+i)
		el_results_byCandidate_accordionCollapse.classList.remove("show")
	}

	// Open the button / header for this candidate
	let el_results_byCandidate_accordionButton = document.getElementById("results_byCandidate_accordionButton-"+candidateNumber)
	el_results_byCandidate_accordionButton.classList.remove("collapsed")
	el_results_byCandidate_accordionButton.setAttribute("aria-expanded", "true")

	// Open the overview of answers for this candidate
	let el_results_byCandidate_accordionCollapse = document.getElementById("results_byCandidate_accordionCollapse-"+candidateNumber)
	el_results_byCandidate_accordionCollapse.classList.add("show")

	// Scroll this candidate
	el_results_byCandidate_accordionCollapse.scrollIntoView() 

} // end: fnOpenAnswersByCandidateAndScrollToCandidate()


/* *************************************************************************** */
