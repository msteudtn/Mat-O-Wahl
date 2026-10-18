"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/


// Read both CSV files and call follow-up functions
function fireUpTheEngines() {

	// Read the "fileQuestions" (DEFINITION.JS) into "objQuestions" (global.js) 
	fnReadQuestions()

	// Read the "fileCandidates" (DEFINITION.JS) into "objCandidates" (global.js) 
	fnReadCandidates()

	// Show the welcome screen 
	fnShowWelcomeScreenAndSetLocalTexts()

} // end: fireUpTheEngines()


/* *************************************************************************** */


// Read the "fileQuestions" (DEFINITION.JS) into "objQuestions" (global.js) 
function fnReadQuestions() {

	// Use www.papaparse.com to read questions CSV with the filename and delimiter from DEFINITION.JS 
	Papa.parse(fileQuestions, {
		download: true,
		delimiter: delimiter,
		error: function(results, file) {
			console.log("Mat-O-Wahl ERROR - Reading CSV-file. \n\nName and folder of CSV-file should be: "+fileQuestions+" \n\nPossible solutions: Check for typos and capital letters! OR check the extension of the file (csv / xls / xlsx / odt)! OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de");
		},
		complete: function(dataQuestions) {
			// Convert the array of questions ("q") into JSON-format 
			// console.log(dataQuestions)
			console.log("Mat-o-Wahl: OK. File "+fileQuestions+" loaded successfully.")
			fnQuestionsArrayToJSON(dataQuestions.data)
		}
	});
} // end: fnReadQuestions()


/* *************************************************************************** */


// Read the "fileCandidates" (DEFINITION.JS) into "objCandidates" (global.js) 
function fnReadCandidates() {
	
	// Use www.papaparse.com to read candidates CSV with the filename and delimiter from DEFINITION.JS 
	Papa.parse(fileCandidates, {
		download: true,
		delimiter: delimiter,
		error: function(results, file) {
			console.log("Mat-O-Wahl ERROR - Reading CSV-file. \n\nName and folder of CSV-file should be: "+fileCandidates+" \n\nPossible solutions: Check for typos and capital letters! OR check the extension of the file (csv / xls / xlsx / odt)! OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de");
		},
		// Convert the array of candidates ("c") into JSON-format 
		complete: function(dataCandidates) {
			// console.log(dataCandidates)
			console.log("Mat-o-Wahl: OK. File "+fileCandidates+" loaded successfully.")
			fnCandidatesArrayToJSON(dataCandidates.data) 
		}
	});
	
} // end: fnReadCandidates()


/* *************************************************************************** */


// Convert the array of questions ("q") into JSON-object 
/*
	Example CSV: 
		"Farbe";"Die beste Fruchtfarbe ist gelb."
		"Form";"Die beste Fruchtform ist rund."
		
	turns into array:
		[0][0] = "Farbe" [0][1] = "Die beste Fruchtfarbe ist gelb."
		[1][0] = "Form"  [1][1] = "Die beste Fruchtform ist rund."
		
	to be turned into JSON-format:
		objQuestions["q0"].short = "Farbe" objQuestions.q0.long = "Die beste Fruchtfarbe ist gelb."
		objQuestions.q1.short = "Form"     objQuestions["q1"].long = "Die beste Fruchtform ist rund."
*/
function fnQuestionsArrayToJSON(dataQuestions) {

	for (let i = 0; i <= intQuestions-1; i++ )
	{
		objQuestions[ "q"+i ] = { "short": dataQuestions[i][0] , "long": dataQuestions[i][1] }
	}

	// Create the Bootstrap carousel with questions (frontend_questions.js)
	fnCreateQuestions(objQuestions)

// *** ###

} // end: fnQuestionsArrayToJSON()


/* *************************************************************************** */


// Convert the array of candidates ("c") into JSON-format 
/*
	Example CSV: 
		Partei_kurz:;"APPD"
		Partei_lang:;"Appelpartei Deutschlands"
		...
		-1;"Gelb ist keine schöne Farbe. Rot ist viel besser!"
		1;"Runde Früchte sind am besten!"
		...
		
	turns into array:
		[0][1] = "APPD"
		[1][1] = "Appelpartei Deutschlands"
		...
		[5][0] = "-1"  [5][1] = "Gelb ist keine schöne Farbe. Rot ist viel besser!"
		[6][0] =  "1"  [6][1] = "Runde Früchte sind am besten!"
		...	

	to be turned into JSON-format:
		objCandidates.c0.short = "APPD"
		objCandidates.c0.long = "Appelpartei Deutschlands"
		objCandidates.c0.points = 2.5
		...
		objCandidates.c0.answers.a0.short = -1
		objCandidates.c0.answers.a0.long = "Gelb ist keine schöne Farbe. Rot ist viel besser!"
		objCandidates.c0.answers.a0.points = 0.5
		...
		objCandidates.c0.answers.a1.short = 1
		objCandidates.c0.answers.a1.long = "Runde Früchte sind am besten!"
		objCandidates.c0.answers.a1.points = 2	
*/ 
function fnCandidatesArrayToJSON(dataCandidates) {

	// Calculate the NUMBER OF CANDIDATES based on the length of the CSV-array + the number of questions + a number of fixed lines.
	// There are ten (10) lines with information on the candidate + "intQuestions" lines + an empty line
	// Example: "Obsthausen"/"Fruitville" = 10 lines of candidate information + 6 questions + 1 empty line = 17 lines per candidate
	intCandidates = Math.round(dataCandidates.length / (10 + intQuestions + 1));

	// Number of LINES PER CANDIDATE for MODULO-Operation on the answers-array 
	const numberOfEntriesPerCandidate = 10 + intQuestions + 1

	// Create the indexes (ID) for the object{}, like "objCandidates.c0"
	for (let i = 0; i <= intCandidates -1 ; i++ ) {
		objCandidates[ "c"+i ] = {}
		objCandidates[ "c"+i ].answers = {}
		objCandidates[ "c"+i ].points = 0
	}
	
	// Go through all candidates 
	// Example: "Obsthausen"/"Fruitville" = 17 lines / per candidate x 4 candidates = 68 lines in CSV-file
	for (let i = 0; i <= (numberOfEntriesPerCandidate * intCandidates -1) ; i++ ) {

			// Calculate the index number for the candidate
			// Example: 
			// Line (i) = 3 divided by 17 (numberOfEntriesPerCandidate) = 0,18 -> index 0
			// Line (i) = 67 divided by 17 (numberOfEntriesPerCandidate) = 3,9 -> index 3
			let indexOfCandidate = Math.floor( i / numberOfEntriesPerCandidate )

			let modulo = i % numberOfEntriesPerCandidate;

			if (modulo == 0)
			{ 
				// Short name of candidate 
				objCandidates[ "c"+indexOfCandidate  ].short = dataCandidates[i][1] 
			}
			else if (modulo == 1)
			{ 
				// Long name of candidate 
				objCandidates[ "c"+indexOfCandidate  ].long = dataCandidates[i][1] 
			}
			else if (modulo == 2) 
			{ 
				// Description of candidate
				objCandidates[ "c"+indexOfCandidate  ].desc = dataCandidates[i][1] 
			}
			else if (modulo == 3) 
			{ 
				// Web site 
				objCandidates[ "c"+indexOfCandidate  ].url = dataCandidates[i][1] 
			}
			else if (modulo == 4) 
			{ 
				// Logo / Picture (named "pic" instead of "img" as attribute to avoid confusion with JavaScript-functions)
				objCandidates[ "c"+indexOfCandidate  ].pic = dataCandidates[i][1] 
			}
			else if (modulo == 5) 
			{ 
				// Email address
				objCandidates[ "c"+indexOfCandidate  ].mail = dataCandidates[i][1] 
			}
			else if (modulo == 6) 
			{ 
				// Telephone number
				objCandidates[ "c"+indexOfCandidate  ].tel = dataCandidates[i][1] 
			}
			else if (modulo == 7) 
			{ 
				// Filter 
				objCandidates[ "c"+indexOfCandidate  ].filter = dataCandidates[i][1] 
			}
			else if (modulo == 8) 
			{ 
				// reserved for future use (1)
			}

			else if (modulo == 9) 
			{ 
				// reserved for future use (2)
			}
			else if ( (modulo > 9) && (modulo <= (intQuestions+9) ) )
			{
				// Creates an object{} with positions (-1,0,1) and full answers of the candidates 
				// Example: objCandidates["c0"].answers["a42"].short = -1
				// Answers are numbered based on the "modulo".
				// Example: module = 12 minus 10 fixed lines of candidate's information = index [2] = Question number 3
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-10) ] = {}

				// The candidate's answer for neutral is "0" in the CSV-file. But later, we do calculations with "0.5". The "0" is then used for "question skipped".
				let candidate_answer_short = dataCandidates[i][0] 
				if (candidate_answer_short == 0) { 
					candidate_answer_short = 0.5 }
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-10) ].short = candidate_answer_short

				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-10) ].long = dataCandidates[i][1] 
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-10) ].points = 0
			}
			else 
			{
				// nothing to do. Just empty lines in the CSV-file
			}		
		}
		
	// console.log(objCandidates)

} // end: fnCandidatesArrayToJSON()


/* *************************************************************************** */


// Run through ALL answers and evaluate / create the corresponding <div>s ("results_*")
// This function is called from fnShowWelcomeScreenAndSetLocalTexts() if results are in the address-bar.
function fnEvaluationAllAnswers() {

	for (let i = 0; i <= arPersonalAnswers.length-1; i++) {

		let percent = Math.round( ( (i+1) / intQuestions ) * 100 )

		// The evaluation may block the browser while calculating -> run it in a setTimeout() to show the progress.
		// To do: Change to Web Workers or other strategies!
		setTimeout(function() {
			fnEvaluationCurrentAnswer(i, arPersonalAnswers[i], arPersonalMultiplier[i])
		}, 100);
	}

} // end: fnEvaluationAllAnswers()


/* *************************************************************************** */


// Calculate the points and create the results-overview in the background.
// This function is called every-time a voting-button is clicked.
function fnEvaluationCurrentAnswer(intCurrentQuestion, intCurrentAnswer, intCurrentMultiplier) {

	console.log("Mat-o-Wahl: fnEvaluationCurrentAnswer() Question no. "+intCurrentQuestion+" - answer x multiplier: "+intCurrentAnswer+" x "+intCurrentMultiplier)

//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)

	// Go through ALL questions / answers and correct the skipped (empty) values.
	// This can happen, if someone skipped a question via the "navigation" indicators.
	for (let i = 0; i <= intQuestions-1; i++) {

		if ( (arPersonalAnswers[i] === undefined) || (!arPersonalAnswers) || (arPersonalAnswers[i] == 0) ) {
			arPersonalAnswers[i] = 0
			arPersonalMultiplier[i] = 0
		}
	}

//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)


	// Save the current answer to the global ARRAY of the user's ANSWERS and MULTIPLIERS (double voting)
	// Example: arPersonalAnswers[2] = -1 turns into [1,-1,-1]
	arPersonalAnswers[intCurrentQuestion] = intCurrentAnswer 
	arPersonalMultiplier[intCurrentQuestion] = intCurrentMultiplier;


//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)


	/* ------------------------------------------------------------------- */


	// Go through all CANDIDATES and check, if their answer number X matches with the user's answer number X.
	// If so, add the POINTS to this candidate's answer in "objCandidates.C.answer.A.points"
	for (let i = 0; i <= intCandidates-1; i++ ) {

		// Reset the candidate's points for the current question.
		objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0

		let candidatesAnswer = objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].short


		/* ----------------------------------------------------------- */


		// OK. The USER'S answer matches the CANDIDATE'S (short) answer, we'll save the point(s) for this SPECIFIC answer.
		if (intCurrentAnswer == candidatesAnswer) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 1 * intCurrentMultiplier
		}

		// The USER skipped the question. Their answer was "0". -> No points.
		else if (intCurrentAnswer == "0" ) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0
		}

		// The USER stayed neutral / didn't decide. Their answer was "0.5"
		// In this case, it doesn't matter, what the CANDIDATE decided. It's always 0.5 points * intMultiplier
		else if (intCurrentAnswer == "0.5" ) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0.5 * intCurrentMultiplier
		}

		// The CANDIDATE stayed neutral / didn't decide. Their answer was "0" (in the CSV-file) resp. "0.5" in here.
		// In this case, it doesn't matter, what the USER decided. It's always 0.5 points * intMultiplier
		else if (candidatesAnswer == "0.5" ) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0.5 * intCurrentMultiplier
		}

		// No match, no points for the candidate on this answer
		else {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0
		}
	} // end: for


	/* ------------------------------------------------------------------- */


	// Now, we'll go through all candidates and their "objCandidates.C.answer.A.points" again to sum it up in the higher level of "objCandidates.C.points".
	for (let i = 0; i <= intCandidates-1; i++ ) {

		// Reset all collected points of this candidate in "objCandidates.C.points"
		objCandidates[ "c"+i ].points = 0

		// Go through all the questions (inside the candidates) and sum up these points. 
		for (let j = 0; j <= Object.keys(objQuestions).length-1 ; j++ ) {
			let currentPointsOfAnswer = objCandidates[ "c"+i ].answers[ "a"+j ].points
			let currentPointsInTotal  = objCandidates[ "c"+i ].points
			objCandidates[ "c"+i ].points = currentPointsInTotal + currentPointsOfAnswer 
		}
	} 


	/* ------------------------------------------------------------------- */


	// Fill up the array with candidate-IDs and points - still ordered by NUMBER (i). 
	// This array will be sorted by POINTS and used for the order of results.
	let arCandidatesSortedByPoints = []
	for (let i = 0; i <= intCandidates-1; i++ ) {
		arCandidatesSortedByPoints.push( { id: "c"+i, points: objCandidates[ "c"+i ].points } ) 
	}


	// Sort the array of sorted points by POINTS.
	// Before: arCandidatesSortedByPoints[ { id: c0, points: 2 } , { id: c1, points: 5 } ]
	// After:  arCandidatesSortedByPoints[ { id: c1, points: 5 } , { id: c0, points: 2 } ]
	arCandidatesSortedByPoints.sort((a, b) => b.points - a.points);


	/* ------------------------------------------------------------------- */


	// Maximum number of points that can be reached.
	// Example: arPersonalAnswers      x arPersonalMultiplier
	//	    [1, 1, -1, -1, 1, 0.5] x [1, 1,   1, 1, 1, 1] -> 6 out of 6 questions answered normally = max. 6 points
	//          [1, 1, -1,  0, 1, 0.5] x [1, 1,   1, 0, 1, 1] -> 5 out of 6 questions answered normally, one skipped (0x0) = max. 5 points
	//          [1, 1, -1,  0, 1, 0.5] x [3, 2, 1.5, 0, 1, 1] -> 5 out of 6 questions answered normally, one skipped (0x0), three multipliers (1x3, 1x2, -1x1.5) = max. 8.5 points
	let intMaxPoints = 0

	// Loop through the "multiplier" and add them together
	for (let i = 0; i <= arPersonalMultiplier.length-1; i++ ) {

		intMaxPoints = intMaxPoints + arPersonalMultiplier[i]
	}


	/* ------------------------------------------------------------------- */


	// Create all necessary <div>s to show the results.
	fnCreateResults(arCandidatesSortedByPoints, intMaxPoints)

	// Change the color of the little indicators (navigation) based on the user's answer.
	fnChangeIndicatorColors(intCurrentQuestion)

	// Change the font-weight to "bold" for the clicked pro/neutral/contra-button
	fnChangeVotingButtonAttributes(intCurrentQuestion)

} // end: fnEvaluationCurrentAnswer()


/* *************************************************************************** */


// Clear HTML tags from ARIA-LABEL and TITLE
// The tags shall only be used in innerHTML-texts.
// Example: "Our candidate disagrees <strong>strongly</strong>."
function fnClearHtmlTags(text) {

	const text_cleaned = text.replace(/<[^>]*>/g, '');
	return text_cleaned
}


/* *************************************************************************** */


// Clear the DOM from unused data, especially <!-- comments in HTML -->
// Source: https://www.sitepoint.com/removing-useless-nodes-from-the-dom/
function fnClearCommentsFromDom(node) {

	for(let n = 0; n < node.childNodes.length; n ++)
	{
		var child = node.childNodes[n];

		// Check, if node is a COMMENT_NODE (8) or a TEXT_NODE (3) with just white spaces
		if ( (child.nodeType === 8) || (child.nodeType === 3 && !/\S/.test(child.nodeValue) ) ) {
			node.removeChild(child);
			n --;
		}
		// Node.ELEMENT_NODE (1)
		else if(child.nodeType === 1) {
			fnClearCommentsFromDom(child);

		} // end: if-else
	} // end: for

} // end: fnClearCommentsFromDom()


/* *************************************************************************** */


// Create the contents (link with results) for the "Share by ..." buttons
function fnShareResults(sharing) {

	// Get the current URL including all parameters
	// Then split at the question mark, like "http://localhost/index.html?myAnswers=[1,0.5,-1]&myMultiplier=[1,1,2]"
	let arCurrentUrl = window.location.href.split("?")

	// Get only the first element, which is the URL without the parameters
	let currentUrl = arCurrentUrl[0]

	// Create a sharing-link with different escape-characters (& vs. %26)
	let linkToUrl_clipboard = currentUrl+"?myAnswers=["+arPersonalAnswers+"]&myMultiplier=["+arPersonalMultiplier+"]"
	let linkToUrl_email     = currentUrl+"?myAnswers=["+arPersonalAnswers+"]%26myMultiplier=["+arPersonalMultiplier+"]"
	let emailText = "mailto:?subject="+TEXT_SHARE_EMAIL_SUBJECT+"&body="+TEXT_SHARE_EMAIL_BODY+" %0D "+linkToUrl_email+"%0D"


	/* ------------------------------------------------------------------- */


	// Copy to clipboard -> called directly from the button in INDEX.HTML -> Update with new link on demand.
	if (sharing == "clipboard") {

		// Check, if the clipboard-function is available AND on https:// or localhost
		if (navigator.clipboard && window.isSecureContext) {

			navigator.clipboard.writeText(linkToUrl_clipboard).then( 
					() => {
						// Success
						fnShowModal("clipboard")
						console.log("Copied link to clipboard: "+linkToUrl_clipboard)
					},
					() => {
						// Error
					},
			);
		}
		// The browser doesn't support clipboard or we're in an insecure context - message in the console!
		else {
			console.log("Mat-o-Wahl: Error. The browser can't write to the clipboard. Are we on an insecure page (like 'http://' instead of 'https://' or 'http://localhost/') or are you using an old browser?")
		}
	}


	/* ------------------------------------------------------------------- */


	// Copy to email -> called directly from the button in INDEX.HTML -> Update with new link on demand.
	else if (sharing == "email") {

		document.getElementById("footer_buttonShare_email").href = emailText
	}
	else {
		console.log("Strange. We're in the ELSE-part of fnShareResults(). The way of sharing was: "+sharing+". This shouldn't happen.")
	}

} // end: fnShareResults()


/* *************************************************************************** */


// Send the personal results to a server - if the user agreed on it. 
async function fnSendResultsToServer()
{

	let arCandidatesPoints = []

	for(let i = 0; i <= intCandidates-1; i++) {

		arCandidatesPoints.push(objCandidates[ "c"+i ].points)
	}

	const mowURLSearchParams = new URLSearchParams({ 
			"mowpersonalanswers": arPersonalAnswers, 
			"mowpersonalmultiplier": arPersonalMultiplier,
			"mowcandidatespoints": arCandidatesPoints })


	/* ------------------------------------------------------------------- */


	// POST results -> This is somehow not working on my test-system :(
	/*
	const response = await fetch(statsServer, {
		method: "POST",
		headers: {
			 "Content-Type": "application/x-www-form-urlencoded",
		},
		body: mowURLSearchParams,
	})
	.then(result => console.log(result)); // process result
	*/


	/* ------------------------------------------------------------------- */


	// GET results (ignores the "body" by default) -> This is somehow not working on my test-system :(
	/*
	const response2 = await fetch(statsServer+"?${mowURLSearchParams}", {
		method: "GET",
		headers: {
			 "Content-Type": "application/x-www-form-urlencoded",
		}
	})
	.then(result => console.log(result)); // process result
	*/


	/* ------------------------------------------------------------------- */


	// GET results (and the results right after "?") -> This dirty hack is working on my test-system :(
	const response2 = await fetch(statsServer+"?"+mowURLSearchParams, {
		method: "GET",
		headers: {
			 "Content-Type": "application/x-www-form-urlencoded",
		}
	})
	.then(result => console.log(result)); // process result


	/* ------------------------------------------------------------------- */


	console.log("Mat-O-Wahl. Sent statistics to server: "+statsServer+" - \n mowpersonalanswers: "+arPersonalAnswers+" \n mowpersonalmultiplier: "+arPersonalMultiplier+" \n mowcandidatespoints: "+arCandidatesPoints+" ")

} // end: fnSendResultsToServer()

