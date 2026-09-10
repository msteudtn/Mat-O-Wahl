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

	// Show the welcome screen 
	fnShowWelcomeScreen()
		
} // end: fireUpTheEngines()

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
//	console.log(objQuestions )

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


// Calculate the points and create the results-overview in the background.
// This function is called every-time a voting-button is clicked.
function fnEvaluation(intCurrentQuestion, intCurrentAnswer, intCurrentMultiplier) {

	// console.log("Running fnEvaluation() Question no. "+intCurrentQuestion+" - answer: "+intCurrentAnswer+" x "+intCurrentMultiplier)

	// Save the current answer to the array of the user's answers and multiplier (double voting)
	// Example: arPersonalAnswers[2] = -1 turns into [1,-1,-1]
	arPersonalAnswers[intCurrentQuestion] = intCurrentAnswer 
	arPersonalMultiplier[intCurrentQuestion] = intCurrentMultiplier;

	// Correct the multiplier, if the answer was skipped (99)
	// This can happen, when changing the answers on the RESULTS-table -> fnEvaluation(23, 99, 2)
	if ( (intCurrentAnswer == 99) ) {
		intCurrentMultiplier = 0
	}


	/* ------------------------------------------------------------------- */

	// Go through all candidates and check, if their answer number X matches with the user's answer number X.
	for (let i = 0; i <= intCandidates-1; i++ ) {

		// Reset points for this question
		objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0
		let candidatesAnswer = objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].short


		// If the current user's answer matches the candidate's (short) answer, we'll save the point(s) for this SPECIFIC answer
		// Example: ( intCurrentAnswer = -1 ) == (objCandidates["c0"].answers["a23"].short = -1 ) -> match -> one point * intMultiplier
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

/*
	console.log("a0 "+objCandidates[ "c3" ].answers[ "a0"].points)
	console.log("a1 "+objCandidates[ "c3" ].answers[ "a1"].points)
	console.log("a2 "+objCandidates[ "c3" ].answers[ "a2"].points)
	console.log("a3 "+objCandidates[ "c3" ].answers[ "a3"].points)
	console.log("a4 "+objCandidates[ "c3" ].answers[ "a4"].points)
	console.log("a5 "+objCandidates[ "c3" ].answers[ "a5"].points)
*/
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

//	console.log("PT "+objCandidates[ "c3" ].points)

	/* ------------------------------------------------------------------- */

	// Fill up the array with candidate-IDs and points - still ordered by NUMBER (i). 
	// This array will be sorted by POINTS and used for the order of results.
	let arCandidatesSortedByPoints = []
	for (let i = 0; i <= intCandidates-1; i++ ) {
		arCandidatesSortedByPoints.push( { id: "c"+i, points: objCandidates[ "c"+i ].points } ) 
	}

	// Sort the array of sorted points by points.
	// Before: arCandidatesSortedByPoints[ { id: c0, points: 2 } , { id: c1, points: 5 } ]
	// After:  arCandidatesSortedByPoints[ { id: c1, points: 5 } , { id: c0, points: 2 } ]
	arCandidatesSortedByPoints.sort((a, b) => b.points - a.points);

	/* ------------------------------------------------------------------- */

	// Maximum number of points that can be reached.
	// Example: {a0:1, 1, 1, 1, 1, a5:1} -> 6 out of 6 questions answered normally (1) = max. 6 points
	//          {a0:1, 1,  , 1, 1, a5:1} -> 5 out of 6 questions answered normally (1), one not clicked = max. 5 points
	//          {a0:1, 1,  , 0, 1, a5:1} -> 4 out of 6 questions answered normally (1), one not clicked, one skipped (0) = max. 4 points
	//          {a0:1, 1,  , 2, 1, a5:1} -> 5 out of 6 questions answered normally + one time "double" button (2) = max. 6 points
	let intMaxPoints = 0

	// Loop through the "multiplier"-keys and add them together
//	for (let key in objPersonalAnswers) {
//		intMaxPoints = intMaxPoints + objPersonalAnswers[key].multiplier
//	}

	for (let i = 0; i <= arPersonalMultiplier.length-1; i++ ) {

		// Question was skipped -> no value on this index [i]
		if ( (arPersonalAnswers[i] == 99) || (!arPersonalMultiplier[i]) ) { }	
		else {
			intMaxPoints = intMaxPoints + arPersonalMultiplier[i]
		}
// 		console.log("intMaxPoints: "+intMaxPoints)
	}

	/* ------------------------------------------------------------------- */	

	// Change the color of the little indicators (navigation) based on the user's answer.
	fnChangeIndicatorColors()

	// Change the font-weight to "bold" for the clicked pro/neutral/contra-button
	fnChangeVotingButtonAttributes()

	/* ------------------------------------------------------------------- */

	// Create all necessary <div>s to show the results.
	fnCreateResults(arCandidatesSortedByPoints, intMaxPoints)

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
			node.removeChild(child);
			n --;
		}
		// Node.ELEMENT_NODE (1)
		else if(child.nodeType === 1) {
			fnClearCommentsFromDom(child);

		}
	}

}

/* *************************************************************************** */

// Send the personal results to a server - if the user agreed on it. 
function fnSendResultsToServer()
{

	let arMowPersonal = []
	let arMowCandidates = []

	for (let i = 0; i <= intQuestions-1; i++) {
		if (arPersonalAnswers[i] === undefined) {
			arMowPersonal[i] = 99
		}
		else {
			arMowPersonal[i] = arPersonalAnswers[i] * arPersonalMultiplier[i]
		}
	}

	for (let i = 0; i <= intCandidates-1; i++) {
		arMowCandidates[i] = objCandidates["c"+i].points
	}

	let mowpersonal = arMowPersonal.toString()
	let mowcandidates = arMowCandidates.toString()
	// v.0.7 - deprecated variable "mowparties" - only here for older systems -> use "mowcandidates" instead
	let mowparties = mowcandidates

	// to do !!! ### *** -> fetch() ???
//	$.get(statsServer, { mowpersonal: strPersonalPositions, mowparties: strResults } );

	console.log("Mat-O-Wahl. Sent statistics to server: "+statsServer+" - mowpersonal: "+mowpersonal+" - mowcandidates (new) / mowparties (old): "+mowcandidates+"")
}


