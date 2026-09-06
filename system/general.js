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
			console.log("Mat-O-Wahl ERROR - Reading CSV-file. \n\nName and folder of CSV-file should be: "+fileQuestions+" \n\nPossible solutions: Check for capital letters? OR check the extension of the file (csv / xls / xlsx)? OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de");
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
			console.log("Mat-O-Wahl ERROR - Reading CSV-file. \n\nName and folder of CSV-file should be: "+fileAnswers+" \n\nPossible solutions: Check for capital letters? OR check the extension of the file (csv / xls / xlsx)? OR is the file in the wrong folder? OR are you working on a local machine :( instead of a server? See documentation on www.mat-o-wahl.de");
		},
		// Convert the array of candidates ("c") into JSON-format 
		complete: function(dataCandidates) {
			// console.log(dataCandidates)
			console.log("Mat-o-Wahl: OK. File "+fileCandidates+" loaded successfully.")
			fnCandidatesArrayToJSON(dataCandidates.data)			
		}
	});

	// Show the welcome screen 
	fnShowDescription()
		
} // end: fireUpTheEngines()

/* --------------------------------------------------------------------------- */

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

/* --------------------------------------------------------------------------- */

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

/* --------------------------------------------------------------------------- */

// Calculate the points and create the results-overview in the background.
// This function is called every-time a voting-button is clicked.
function fnEvaluation(intCurrentQuestion, intCurrentAnswer, intMultiplier) {

	// Save the current answer to the array of the user's answers
	// Example: arPersonalAnswers[2] = -1 turns into [1,-1,-1]
	arPersonalAnswers[intCurrentQuestion] = intCurrentAnswer * intMultiplier;

//	console.log(arPersonalAnswers)

	// Go through all candidates and check, if their answer matches with the user's answer.
	for (let i = 0; i <= intCandidates-1; i++ ) {

		// If the current user's answer matches the candidate's (short) answer, we'll save the point(s) for this SPECIFIC answer
		// Example: ( arPersonalAnswers[23] = -1 ) == (objCandidates["c0"].answers["a23"].short = -1 ) -> match -> one point * intMultiplier
		if (intCurrentAnswer == objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].short) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 1 * intMultiplier
		}

		// The candidate stayed neutral or didn't decide. Their answer was "0"
		// In this case, it doesn't matter, what the user decided. It's always 0.5 points * intMultiplier
		else if ( objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].short == 0 ) {
			objCandidates[ "c"+i ].answers[ "a"+intCurrentQuestion ].points = 0.5 * intMultiplier
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
			let currentPointsinTotal  = objCandidates[ "c"+i ].points
			objCandidates[ "c"+i ].points = currentPointsinTotal + currentPointsOfAnswer 
		}

	} 


	// Fill up the array with candidate-IDs and points - still ordered by number (i). 
	// This array will be sorted by points and used for the order of results.
	let arCandidatesSortedByPoints = []
	for (let i = 0; i <= intCandidates-1; i++ ) {
		arCandidatesSortedByPoints.push( { id: "c"+i, points: objCandidates[ "c"+i ].points } ) 
	}

	// Sort the array of sorted points by points.
	// Before: arCandidatesSortedByPoints[ { id: c0, points: 2 } , { id: c1, points: 5 } ]
	// After:  arCandidatesSortedByPoints[ { id: c1, points: 5 } , { id: c0, points: 2 } ]
	arCandidatesSortedByPoints.sort((a, b) => b.points - a.points);

//	console.log(arCandidatesSortedByPoints)

//	console.log("."+objCandidates.p0.points)
//	console.log(objCandidates.p1.points)
//	console.log(objCandidates.p2.points)
//	console.log(objCandidates.p3.points)

	// Maximum number of points that can be reached.
	// Example: arPersonalAnswers[1,1,1,1,1,1]  -> 6 out of 6 questions answered = max. 6 points
	//          arPersonalAnswers[1,1, ,1,1,1]  -> 5 out of 6 questions answered, one not clicked = max. 5 points
	//          arPersonalAnswers[1,1, ,99,1,1] -> 4 out of 6 questions answered, one not clicked, one skipped (99) = max. 4 points
	//          arPersonalAnswers[1,1, ,2,1,1]  -> 5 out of 6 questions answered + one time "double" button = max. 6 points
	let intMaxPoints = 0

	// Go through all the user's answers 
	for (let i = 0; i <= arPersonalAnswers.length-1; i++ ) {

		// Check if the user answered yes (1), neutral (0) or no (-1)
		if ( (arPersonalAnswers[i] >= -1) && (arPersonalAnswers[i] <= 1) ) {
			intMaxPoints = intMaxPoints + 1
//			console.log("IF 1 (ok) for value: "+arPersonalAnswers[i]+ " at pos. "+i)
		}
		// Check if the user answered double-yes (2) or double-no (-2)
		else if ( (arPersonalAnswers[i] >= -2) && (arPersonalAnswers[i] <= 2) ) {
			intMaxPoints = intMaxPoints + 2
//			console.log("IF 2 (ok) for value: "+arPersonalAnswers[i]+ " at pos. "+i)
		}
		// The question was skipped by SKIP-button (99) or by the Bootstrap-indicators (empty value)
		else {
			intMaxPoints = intMaxPoints + 0
//			console.log("ELSE (skip) for value: "+arPersonalAnswers[i]+ " at pos. "+i)
		}
	}
	
//		console.log("max-pt.: "+ intMaxPoints )

	// Change the color of the little indicators (navigation) based on the user's answer.
	fnChangeIndicatorColors()

	// Change the font-weight to "bold" for the clicked pro/neutral/contra-button
	fnChangeVotingButtonFontWeight()

	fnCreateResults(arCandidatesSortedByPoints, intMaxPoints)

}


