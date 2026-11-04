"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/




/* *************************************************************************** */


// Create filter-buttons
function fnCreateFilters(arCandidatesSortedByPoints) {

	// Set the three buttons with filter-options
	const results_overview_filters_settings_filterOr  = document.getElementById("results_overview_filters_settings_filterOr")
	const results_overview_filters_settings_filterAnd = document.getElementById("results_overview_filters_settings_filterAnd")
	const results_overview_filters_settings_reset     = document.getElementById("results_overview_filters_settings_reset")

	results_overview_filters_settings_filterOr.innerHTML = TEXT_FILTER_BUTTON_OR
	results_overview_filters_settings_filterAnd.innerHTML = TEXT_FILTER_BUTTON_AND
	results_overview_filters_settings_reset.innerHTML = TEXT_FILTER_BUTTON_RESET

	document.getElementById("filtersOr").onclick  = function() { fnCalculateLimitedResultsAndFilters( arCandidatesSortedByPoints, 1 ) }
	document.getElementById("filtersAnd").onclick = function() { fnCalculateLimitedResultsAndFilters( arCandidatesSortedByPoints, 1 ) }
	results_overview_filters_settings_reset.onclick     = function() { fnCalculateLimitedResultsAndFilters( arCandidatesSortedByPoints, 1, 1 ) } 

	// Get the parent div and the template for all buttons. 
	const parentToTemplate_filters = document.getElementById("results_overview_filters")
	const results_overview_filters_template = document.getElementById("results_overview_filters_template")


	/* ------------------------------------------------------------------- */

	// Create an array of filter-categories 
	let arFiltersOfAll = []


	// Get all the filter-names from objCandidates{}.filters[]
	for (let i = 0; i <= intCandidates-1; i++ ) {

		const arFiltersOfCandidate = objCandidates["c"+i].filters

		// Simply merge the arrays together instead of looping through.
		arFiltersOfAll = arFiltersOfAll.concat(arFiltersOfCandidate)
	}
	

	// Remove duplicates
	arFiltersOfAll = [...new Set(arFiltersOfAll)];
	const arFilters_length = arFiltersOfAll.length

	if (arFilters_length <= 1) {
		return false // Exit / quit the function here because there's just one filter-category.
	}


	/* ------------------------------------------------------------------- */


	// Set the Bootstrap class row-cols for automatic adjustment of columns
	// https://getbootstrap.com/docs/5.3/layout/grid/
	let css_row_cols = 3

	// Less than four filter-categories -> take the number of filter-categories as columns (1, 2 or 3)
	if (arFilters_length < 4) {
		css_row_cols = objFilters_length
	}
	// Exactly four filter-categories -> use two columns
	else if (arFilters_length == 4) {
		css_row_cols = 2
	}
	// More  than four filter-categories -> use three columns
	else if (arFilters_length > 4) {
		css_row_cols = 3
	}
	else {
		console.log("Strange. Error XXX *** ###")
	}

	parentToTemplate_filters.classList.remove("row-cols-X")
	parentToTemplate_filters.classList.add("row-cols-"+css_row_cols)


	/* ------------------------------------------------------------------- */

	// Reset any existing filter-buttons
	parentToTemplate_filters.innerHTML = ""

	// Loop through the filter-object and create the buttons (labels and input)
	let key_number = -1

	// Loop through all filter-categories and create the buttons
	for (let i = 0; i <= arFiltersOfAll.length-1; i++ ) {

		const results_overview_filters_templateClone = document.importNode(results_overview_filters_template.content, true);

		key_number = key_number+1

		let results_overview_filters_button = results_overview_filters_templateClone.getElementById("results_overview_filters_button-X")

		results_overview_filters_button.innerHTML = arFiltersOfAll[i]
		results_overview_filters_button.id = "results_overview_filters_button-"+i
		results_overview_filters_button.title = TEXT_FILTER_BY+": "+ arFiltersOfAll[i]
		results_overview_filters_button.setAttribute("aria-label", TEXT_FILTER_BY+": "+ arFiltersOfAll[i])
		results_overview_filters_button.onclick = function() { fnCalculateLimitedResultsAndFilters(arCandidatesSortedByPoints, 1 ) }


		/*------------------------------------------------------------ */


		// Append the clone to the parent "carousel-inner"
		parentToTemplate_filters.appendChild(results_overview_filters_templateClone)
	}

} // end: fnCreateFilters()


/* *************************************************************************** */

//
function fnCalculateLimitedResultsAndFilters(arCandidatesSortedByPoints, iterationForLimit, resetButtons) {

//	console.log("fnCalculateLimitedResultsAndFilters")

	// Find all filter-buttons and update the "onclick"
	const results_overview_filters = document.getElementById("results_overview_filters")

	const results_overview_filters_buttons_all = results_overview_filters.getElementsByTagName("button")

	// Loop through *all* buttons with filter-categories and ...
	for (let i = 0; i <= results_overview_filters_buttons_all.length-1; i++ ) {

		// ... remove all onclick-functions and set an updated one.
		let results_overview_filters_button = document.getElementById("results_overview_filters_button-"+i)
		results_overview_filters_button.removeAttribute("onclick")
		results_overview_filters_button.onclick = function() { fnCalculateLimitedResultsAndFilters( arCandidatesSortedByPoints, iterationForLimit ) }

		// While we're at the buttons anyway, reset them on demand.
		if (resetButtons) {
			results_overview_filters_button.classList.remove("active")
		}
	}

	/* ------------------------------------------------------------------- */

	// Find all filter-buttons with CSS class "active" (set by Bootstrap "data-bs-toggle=button") and save the innerHTML-value = filter-category
	const results_overview_filters_buttons_active = results_overview_filters.getElementsByClassName("active")
	let arFiltersSelected = []

	// Loop through all *active* buttons with filter-categories and ...
	for (let i = 0; i <= results_overview_filters_buttons_active.length-1; i++ ) {

		// ... save the text into an array = name of the filter-category
		arFiltersSelected.push(results_overview_filters_buttons_active[i].innerHTML)

	} // end: for-i

	/* ------------------------------------------------------------------- */


	let idOfCandidate = ""
	let arFiltersOfCandidate = []
	let arCandidatesWithMatchingFilter = []

	for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {

		idOfCandidate = arCandidatesSortedByPoints[i].id
		arFiltersOfCandidate = objCandidates[idOfCandidate].filters

		// Loop through the selected filters and save the index of the sorted results (0-n) / not the candidate's ID.
		for (let j = 0; j <= arFiltersSelected.length-1; j++ ) {

			let currentFilter = arFiltersSelected[j]

			if (arFiltersOfCandidate.includes(currentFilter) ) {
				arCandidatesWithMatchingFilter.push(i)
			} // end: if
		} // end: for-j
	} // end: for-i

// console.log(arCandidatesWithMatchingFilter)

	/* ------------------------------------------------------------------- */


	if (arFiltersSelected.length >= 1) {

		// Get the state of filter to combine (and / or)
		let filterAndOr = ""

		if(document.getElementById('filtersAnd').checked) {
			filterAndOr = "and"
		} else if(document.getElementById('filtersOr').checked) {
			filterAndOr = "or"
		}
		else {
			filterAndOr = "neitherAndNorOr"
		}

// console.log(filterAndOr+ " - and: "+document.getElementById('filtersAnd').checked+" or: "+document.getElementById('filtersOr').checked)

		// show only results that have all selected filters
		if ( (filterAndOr == "and") && (arFiltersSelected.length > 1) ) {

			// Find duplicates -> This function works fine but it finds ALL duplicates = 2x or more
			// We need to find the right number of duplicates, like 3 or 4 matches.
			// const duplicates = arCandidatesWithMatchingFilter.filter((item, index) => arCandidatesWithMatchingFilter.indexOf(item) !== index);
			// arCandidatesWithMatchingFilter = [...new Set(duplicates)]

			// Find the number of duplicates and compare it to the number of filter-categories by putting then in an object
			// Example: arCandidatesWithMatchingFilter[3,3,3,5,2,2] -> arFiltersSelected.length = 3 -> remaining ID = "5"
			// https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements

			const objCounts = {};
			let arFiltersSelected_correctAndCount = []

			for (const intNumber of arCandidatesWithMatchingFilter) {
				objCounts[intNumber] = objCounts[intNumber] ? objCounts[intNumber] + 1 : 1;
			}
//console.log(objCounts)

			// Loop through the object of counts and find the correct number(s)
			for (const [key, value] of Object.entries(objCounts)) {

// console.log(value+" / "+ arFiltersSelected.length )

				if (value >= arFiltersSelected.length) {
					arFiltersSelected_correctAndCount.push(key)
				}

			}

			// Overwrite the array with the remaining results
			arCandidatesWithMatchingFilter = arFiltersSelected_correctAndCount


		}
		else if ( (filterAndOr == "or") || (arFiltersSelected.length <= 1) ) {
			// Remove duplicates
			arCandidatesWithMatchingFilter = [...new Set(arCandidatesWithMatchingFilter)];
		}
		else {
			console.log("Strange. We're in the ELSE-part of arCandidatesWithMatchingFilter() / section: filter by AND/OR. The found filter-setting is: "+filterAndOr)
		}
	}
	// No filter selected or reset -> fill the array with default values from 0 to n.
	else {

		for (let i = 0; i <= arCandidatesSortedByPoints.length-1; i++ ) {
			arCandidatesWithMatchingFilter.push(i)
		}
	}

	// The buttons "show more" and "show less results" need a maximum number, to determine, if they're shown or not.
	let intMaxFilteredResults = arCandidatesWithMatchingFilter.length


//console.log("Length "+arFiltersSelected.length)
//console.log(arCandidatesWithMatchingFilter)

	/* ------------------------------------------------------------------- */

	// Check intLimitResults from "CONFIG.JS", if we have to limit the number of results.
	// If so, we reduce the array to the first X results
	if (intLimitResults > 0) {
		let lastCandidate = iterationForLimit * intLimitResults
		arCandidatesWithMatchingFilter = arCandidatesWithMatchingFilter.slice(0,lastCandidate)
	}
	else {
	}

// console.log(arCandidatesWithMatchingFilter)

	// Call the function to show / hide the result lines
	fnShowOrHideLimitedResultsAndFilters(arCandidatesSortedByPoints, arCandidatesWithMatchingFilter, iterationForLimit, intMaxFilteredResults)

	// Show an error, if no results were found
	if (arCandidatesWithMatchingFilter <= 0) {
		fnShowModal("noFilterResult")
	}


} // end: fnCalculateLimitedResultsAndFilters()


/* *************************************************************************** */


// ... 
function fnShowOrHideLimitedResultsAndFilters(arCandidatesSortedByPoints, arCandidatesWithMatchingFilter, iterationForLimit, intMaxFilteredResults) {


	const results_limited_buttons_less = document.getElementById("results_limited_buttons_less")
	const results_limited_buttons_more = document.getElementById("results_limited_buttons_more")


	// Reached the last candidate -> Hide the "Show more" button!
	let lastCandidate = iterationForLimit * intLimitResults - 1

	if (lastCandidate >= intMaxFilteredResults-1 ) {
		results_limited_buttons_more.style.display = "none";
	}
	else {
		results_limited_buttons_more.style.display = "block";
	}

// console.log("iteration: "+iterationForLimit+" * limit (def.js): "+intLimitResults+" = last: "+lastCandidate+" / no. filter: "+intMaxFilteredResults+" ")


	// First round -> Hide the "Show less" button!
	if ( ( (iterationForLimit-1) <= 0) || (intMaxFilteredResults < iterationForLimit) ) {
		results_limited_buttons_less.style.display = "none";
	}
	else {
		results_limited_buttons_less.style.display = "block";
	}

	// Put the CALCULATE-function on the buttons "Show less" / "Show more"
	results_limited_buttons_less.onclick = function() { fnCalculateLimitedResultsAndFilters( arCandidatesSortedByPoints, iterationForLimit-1 ) }
	results_limited_buttons_more.onclick = function() { fnCalculateLimitedResultsAndFilters( arCandidatesSortedByPoints, iterationForLimit+1 ) }


	/* ------------------------------------------------------------------- */


	let indexNumberInResults = -1

	for (let i = 0; i <= intCandidates-1; i++ ) {

		const results_overview_byMatches_accordionItem = document.getElementById("results_overview_byMatches_accordionItem-"+i)
		const results_byCandidate_accordionItem = document.getElementById("results_byCandidate_accordionItem-"+i)

		// Reset / Hide all candidate's results (in "by matches" / overview and "by candidate")
		results_overview_byMatches_accordionItem.style.display = "none"
		results_byCandidate_accordionItem.style.display = "none"

		// Loop through all *filtered* results and show / turn on their candidate's results (in "by matches" / overview and "by candidate")
		for (let j = 0; j <= arCandidatesWithMatchingFilter.length-1; j++ ) {

			indexNumberInResults = arCandidatesWithMatchingFilter[j]

			if (indexNumberInResults == i) {
				results_overview_byMatches_accordionItem.style.display = "block"
				results_byCandidate_accordionItem.style.display = "block"
			}
		}



		for (let j = 0; j <= intQuestions-1; j++ ) {

			const results_byQuestion_accordionBody_candidateRow = document.getElementById("results_byQuestion_accordionBody_candidateRow-"+j+"-"+i)

			// Reset / Hide all candidate's results (in "by question")
			results_byQuestion_accordionBody_candidateRow.style.display = "none"

			// Loop through all *filtered* results and show / turn on their candidate's results (in "by question")
			for (let k = 0; k <= arCandidatesWithMatchingFilter.length-1; k++ ) {

				indexNumberInResults = arCandidatesWithMatchingFilter[k]

				if (indexNumberInResults == i) {
					results_byQuestion_accordionBody_candidateRow.style.display = "flex"
				}
			}

		}


	}



} // end: fnShowOrHideLimitedResultsAndFilters()

