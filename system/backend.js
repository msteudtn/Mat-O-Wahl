"use strict"

/* @license
Mat-o-Wahl
v0.7.x 
https://github.com/msteudtn/Mat-O-Wahl
License: GPL 3+
*/

//  Object.keys(objQuestions).length-1

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
			console.log("Mat-O-Wahl ERROR - Reading CSV-file. \n\nName and folder of CSV-file should be: "+fileQuestions+" \n\nPossible solutions: Check for typos and capital letters! OR check the extension of the file (csv / xls / xlsx)! OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de");
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
			console.log("Mat-O-Wahl ERROR - Reading CSV-file. \n\nName and folder of CSV-file should be: "+fileAnswers+" \n\nPossible solutions: Check for typos and capital letters! OR check the extension of the file (csv / xls / xlsx)! OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de");
		},
		// Convert the array of candidates ("c") into JSON-format 
		complete: function(dataCandidates) {
			// console.log(dataCandidates)
			console.log("Mat-o-Wahl: OK. File "+fileCandidates+" loaded successfully.")
			fnCandidatesArrayToJSON(dataCandidates.data) 
		}
	});
	
} // end: 	fnReadCandidates()


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

//	var size = Object.keys(objQuestions).length;
//	console.log(objQuestions)

	// Create the Bootstrap carousel with questions
	fnCreateQuestions(objQuestions)
	
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
	[5][0] = "-1"	[5][1] = "Gelb ist keine schöne Farbe. Rot ist viel besser!"
	[6][0] = 1		[6][1] = "Runde Früchte sind am besten!"
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

	// Calculate the number of candidates based on the length of the CSV-array, the number of questions plus a number of fixed lines.
	intCandidates = Math.round(dataCandidates.length / (intQuestions + 6));
	// console.log(intCandidates )

	// Number of lines per candidate for MODULO-Operation on the answers-array 
	// There are five (5) lines with information on the candidate + "intQuestions" lines + an empty line
	// Example "Obsthausen"/"Fruitville" = 5 + 6 + 1 = 12
	const numberOfEntriesPerCandidate = 6 + intQuestions 

	// Create the indexes for the JSON-object, like "objCandidates.p0"
	for (let i = 0; i <= intCandidates -1 ; i++ ) {
		objCandidates[ "c"+i ] = {}
		objCandidates[ "c"+i ].answers = {}
		objCandidates[ "c"+i ].points = 0
	}
	
	// Go through all candidates 
	for (let i = 0; i <= ( (5 + intQuestions + 1) * intCandidates -1) ; i++ ) {

			// Calculate the index number for the candidate
			// Example: 
			// Line (i) = 3 divided by 12 (numberOfEntriesPerCandidate) = 0,25 -> 0
			// Line (i) = 42 divided by 12 (numberOfEntriesPerCandidate) = 3,5 -> 3
			let indexOfCandidate = Math.floor( i / numberOfEntriesPerCandidate )

			let modulo = i % numberOfEntriesPerCandidate;
			// console.log(i+" - "+modulo)

			if (modulo == 0)
			{ 
				// short name of candidate 
				objCandidates[ "c"+indexOfCandidate  ].short = dataCandidates[i][1] 
			}
			else if (modulo == 1)
			{ 
				// long name of candidate 
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
				// Logo (not using "img" as attribute to avoid confusion with JavaScript-functions)
				objCandidates[ "c"+indexOfCandidate  ].pic = dataCandidates[i][1] 
			}
			else if ( (modulo > 4) && (modulo <= (intQuestions+4) ) )
			{
				// Creates a JSON object with positions (-1,0,1) and full answers of the candidates 
				// Example: objCandidates["p0"].answers[a42].short = -1
				// Answers are numbered based on the "modulo".
				// Example: module = 8 minus 5 fixed lines = index [3] = Question number 4
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-5) ] = {}
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-5) ].short = dataCandidates[i][0] 
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-5) ].long = dataCandidates[i][1] 
				objCandidates[ "c"+indexOfCandidate ].answers[ "a"+(modulo-5) ].points = 0
			}
			else 
			{
				// nothing to do. Just empty lines in the CSV-file
			}		
		}
		
	// console.log(objCandidates)

} // end: fnCandidatesArrayToJSON()

/* *************************************************************************** */

function fnEvaluationAllAnswers() {

	for (let i = 0; i <= arPersonalAnswers.length-1; i++) {

		let percent = Math.round( ( (i+1) / intQuestions ) * 100 )
//		fnLoadingProgress(percent)

		// The evaluation may block the browser while calculating -> run it in a setTimeout() to show the progress
		// To do: Change to Web Workers or other strategies!
		setTimeout(function() {
			fnEvaluationCurrentAnswer(i, arPersonalAnswers[i], arPersonalMultiplier[i])
		}, 100);

	}

}

/* *************************************************************************** */

// Calculate the points and create the results-overview in the background.
// This function is called every-time a voting-button is clicked.
function fnEvaluationCurrentAnswer(intCurrentQuestion, intCurrentAnswer, intCurrentMultiplier) {

	console.log("Run fnEvaluationCurrentAnswer() Question no. "+intCurrentQuestion+" - answer: "+intCurrentAnswer+" x "+intCurrentMultiplier)

	// Save the current answer to the global ARRAY of the user's ANSWERS and MULTIPLIER (double voting)
	// Example: arPersonalAnswers[2] = -1 turns into [1,-1,-1]
	arPersonalAnswers[intCurrentQuestion] = intCurrentAnswer 
	arPersonalMultiplier[intCurrentQuestion] = intCurrentMultiplier;

//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)


	// Go through ALL answers and correct the skipped (empty) values. 
	for (let i = 0; i <= intQuestions-1; i++) {
		if ( (arPersonalAnswers[i] === undefined) || (!arPersonalAnswers) ) {
			arPersonalAnswers[i] = 99
		}
	}

	// Go through ALL multipliers and correct the skipped (empty) values. 
	for (let i = 0; i <= intQuestions-1; i++) {
		if (arPersonalAnswers[i] == 99) {
			arPersonalMultiplier[i] = 0
		}
	}


	// Additionally, check the skipped-value for the CURRENT answer, because "intCurrentMultiplier" has been set before and not changed.
	if (arPersonalAnswers[intCurrentQuestion] == 99) {
		intCurrentMultiplier = 0
	}



//	console.log(arPersonalAnswers)
//	console.log(arPersonalMultiplier)


	/* ------------------------------------------------------------------- */

	// Go through all CANDIDATES and check, if their answer number X matches with the user's answer number X.
	// If so, add the POINTS to this candidate's answer in "objCandidates.C.answer.A.points"
	for (let i = 0; i <= intCandidates-1; i++ ) {

		// Reset the candidate's points for this question
		objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0
		let candidatesAnswer = objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].short


		// If the current user's answer matches the candidate's (short) answer, we'll save the point(s) for this SPECIFIC answer
		// Example: ( intCurrentAnswer[23] = -1 ) == (objCandidates["c0"].answers["a23"].short = -1 ) -> match -> one point * intMultiplier
		if (intCurrentAnswer == candidatesAnswer) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 1 * intCurrentMultiplier
		}

		// The USER stayed neutral or didn't decide. Their answer was "0"
		// In this case, it doesn't matter, what the CANDIDATE decided. It's always 0.5 points * intMultiplier
		else if (intCurrentAnswer == "0" ) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0.5 * intCurrentMultiplier
		}

		// The CANDIDATE stayed neutral or didn't decide. Their answer was "0"
		// In this case, it doesn't matter, what the USER decided. It's always 0.5 points * intMultiplier
		else if (candidatesAnswer == "0" ) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0.5 * intCurrentMultiplier
		}

		// No match, no points for the candidate on this answer
		else {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0
		}
	}


	// Now, we'll go through all candidates and their "objCandidates.C.answer.A.points" again to sum it up in the higher level "objCandidates.C.points".
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

//	console.log("c0-points: points: "+objCandidates[ "c0" ].points )
//	console.log("c1-points: points: "+objCandidates[ "c1" ].points )
//	console.log("c2-points: points: "+objCandidates[ "c2" ].points )
//	console.log("c3-points: points: "+objCandidates[ "c3" ].points )

	// Sort the array of sorted points by POINTS.
	// Before: arCandidatesSortedByPoints[ { id: c0, points: 2 } , { id: c1, points: 5 } ]
	// After:  arCandidatesSortedByPoints[ { id: c1, points: 5 } , { id: c0, points: 2 } ]
	arCandidatesSortedByPoints.sort((a, b) => b.points - a.points);

	// console.log(arCandidatesSortedByPoints)

	/* ------------------------------------------------------------------- */

	// Maximum number of points that can be reached.
	// Example: arPersonalAnswers   x arPersonalMultiplier
	//	    [1, 1, -1, -1, 1, 0] x [1, 1, 1, 1, 1, 1]   -> 6 out of 6 questions answered normally = max. 6 points
	//          [1, 1, -1, 99, 1, 0] x [1, 1, 1, 0, 1, 1]   -> 5 out of 6 questions answered normally, one skipped (99x0) = max. 5 points
	//          [1, 1, -1, 99, 1, 0] x [3, 2, 1.5, 0, 1, 1] -> 5 out of 6 questions answered normally, one skipped (99x0), three multipliers (1x3, 1x2, -1x1.5) = max. 8.5 points
	let intMaxPoints = 0

	// Loop through the "multiplier" and add them together
	for (let i = 0; i <= arPersonalMultiplier.length-1; i++ ) {

		intMaxPoints = intMaxPoints + arPersonalMultiplier[i]
		// console.log("intMaxPoints: "+intMaxPoints)
	}

	/* ------------------------------------------------------------------- */	

	// Create all necessary <div>s to show the results.
	fnCreateResults(arCandidatesSortedByPoints, intMaxPoints)

	// Change the color of the little indicators (navigation) based on the user's answer.
	fnChangeIndicatorColors(intCurrentQuestion)

	// Change the font-weight to "bold" for the clicked pro/neutral/contra-button
	fnChangeVotingButtonAttributes(intCurrentQuestion)


	/* ------------------------------------------------------------------- */

	// Update the "Share by mail" button
	fnShareResults("email")

// console.log("End fnEvaluationCurrentAnswer() Question no. "+intCurrentQuestion+" - answer: "+intCurrentAnswer+" x "+intCurrentMultiplier)

} // end: fnEvaluationCurrentAnswer()

/* *************************************************************************** */

// Clear HTML tags from ARIA-LABEL and TITLE
// Tags shall only be used in innerHTML-texts.
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

		// If Node.COMMENT_NODE (8) or Node.TEXT_NODE (3) is just white spaces
		if ( (child.nodeType === 8) || (child.nodeType === 3 && !/\S/.test(child.nodeValue) ) ) {
		// if ( (child.nodeType === 8) ) {
			node.removeChild(child);
			n --;
		}
		// Node.ELEMENT_NODE (1)
		else if(child.nodeType === 1) {
			fnClearCommentsFromDom(child);

		}
	}

} // end: fnClearCommentsFromDom()

/* *************************************************************************** */

function fnShareResults(sharing) {

	// Get the current URL including all parameters
	// Then split at the question mark, like "http://localhost/index.html?myAnswers=[1,0,-1]&myMultiplier=[1,1,2]"
	let arCurrentUrl = window.location.href .split("?")
	// Get only the first element, which is the URL without the parameters
	let currentUrl = arCurrentUrl[0]

	// Create a sharing-link with different escape-characters (& / %26)
	let linkToUrl_clipboard = currentUrl+"?myAnswers=["+arPersonalAnswers+"]&myMultiplier=["+arPersonalMultiplier+"]"
	let linkToUrl_email     = currentUrl+"?myAnswers=["+arPersonalAnswers+"]%26myMultiplier=["+arPersonalMultiplier+"]"
	let emailText = "mailto:?subject="+TEXT_SHARE_EMAIL_SUBJECT+"&body="+TEXT_SHARE_EMAIL_BODY+" %0D "+linkToUrl_email+"%0D"

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
			console.log("Mat-o-Wahl: Error. The browser can't write to the clipboard. Are we on an insecure page (http:// instead of https:// or http://localhost/) or are you using an old browser?")
		}
	}
	else if (sharing == "email") {
		// Called from fnEvaluationCurrentAnswer() -> Update button every-time with new link.
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

	let arMowPersonalToSend = []
	let arMowCandidatesToSend = []

	for (let i = 0; i <= intQuestions-1; i++) {
		arMowPersonalToSend[i] = arPersonalAnswers[i] * arPersonalMultiplier[i]
	}


	for (let i = 0; i <= intCandidates-1; i++) {
		arMowCandidatesToSend[i] = objCandidates["c"+i].points
	}

	let mowpersonal = arMowPersonalToSend.toString()
	let mowcandidates = arMowCandidatesToSend.toString()

	// v.0.7 - deprecated variable "mowparties" -> only here for older systems -> use "mowcandidates" instead
	const mowURLSearchParams = new URLSearchParams({ "mowpersonal": mowpersonal, 
			"mowpersonalanswers": arPersonalAnswers, 
			"mowpersonalmultiplier": arPersonalMultiplier, 
			"mowparties": mowcandidates, 
			"mowcandidates": mowcandidates })

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

	// GET results (and the results right after "?") -> This dirty hack is working on my test-system :(
	const response2 = await fetch(statsServer+"?"+mowURLSearchParams, {
		method: "GET",
		headers: {
			 "Content-Type": "application/x-www-form-urlencoded",
		}
	})
	.then(result => console.log(result)); // process result
	

	console.log("Mat-O-Wahl. Sent statistics to server: "+statsServer+" - \n mowpersonal (answers x multiplier): "+mowpersonal+" \n mowpersonalanswers: "+arPersonalAnswers+" \n mowpersonalmultiplier: "+arPersonalMultiplier+" \n mowcandidates (new) / mowparties (old): "+mowcandidates+"")
	// console.log( new URLSearchParams({ "mowpersonal": mowpersonal, "mowpersonalanswers": arPersonalAnswers, "mowpersonalmultiplier": arPersonalMultiplier, "mowparties": mowcandidates, "mowcandidates": mowcandidates }) )
} // end: fnSendResultsToServer()


