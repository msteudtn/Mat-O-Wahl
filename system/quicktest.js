"use strict" 

// QUICKTEST.JS http://www.mat-o-wahl.de
// Test of configuration file / CONFIG.JS / Test der Konfigurationsdatei
// License: GPL 3
// Mathias Steudtner http://www.medienvilla.com

function fnTestStart()
{
		
	// Read the "fileQuestions" (CONFIG.JS) into "objQuestions" (global.js) 
	fnReadQuestions()

	// Read the "fileCandidates" (CONFIG.JS) into "objCandidates" (global.js) 
	fnReadCandidates()

	// 1 sec. warten bis alle Dateien eingelesen wurden.
	window.setTimeout("fnTestShowAll()",1000);
}

function fnCreateQuestions() {
	// The real fnCreateQuestions() is located in FRONTEND_HELPERS.JS and called from BACKEND.JS (after fnReadQuestions() -> fnQuestionsArrayToJSON() )
	// We don't want to build up the question-cards here.
	// To avoid any error-messages, we add an empty function. ;) 
}


// Ausgabe - Output
function fnTestShowAll()
{

	// Check for http(s):// or file://
	const quicktest_protocol_de = document.getElementById("quicktest_protocol_de")
	const quicktest_protocol_en = document.getElementById("quicktest_protocol_en")

	let currentProtocol = window.location.protocol;
	currentProtocol = currentProtocol.substr(0,4)
	
//	let fileQuestions_protocol  = fileQuestions.substr(0,4)
//	let fileCandidates_protocol = fileCandidates.substr(0,4)
	
	if (currentProtocol != "http") {
//	if ( (fileQuestions_protocol != "http") || (fileCandidates_protocol != "http") ) {
		quicktest_protocol_de.innerHTML = "<b class='bg-danger'>&#x1F872; WARNUNG &#x1F870;</b>. Mindestens eine CSV-Datei scheint nicht online zu sein. (http(s)://) Der Browser verhindert, dass Dateien von der lokalen Festplatte (file://) gelesen werden. Lösungsvorschläge finden Sie in der Online-Dokumentation unter <a href='https://www.mat-o-wahl.de/dokumentation.html#technikHttp' target='_blank'>Testen der Einstellungen</a>."
		quicktest_protocol_en.innerHTML = "<b class='bg-danger'>&#x1F872; WARNING &#x1F870;</b> At least one CSV-file doesn't seem to be online. (http(s)://) The browser blocks loading local files. (file://) You can find possible solutions in the online-help at <a href='https://www.mat-o-wahl.de/dokumentation.html#technikHttp' target='_blank'>Testen der Einstellungen</a> (German). "
	}
	else {
		quicktest_protocol_de.innerHTML = "<b class='bg-success'>OK.</b> Die Dateien werden von http(s):// geladen und nicht lokal (file://)."
		quicktest_protocol_en.innerHTML = "<b class='bg-success'>OK.</b> Files are beeing loaded from http(s):// and not from a local source (file://)."
	}

	/* ------------------------------------------------------------------- */

	// Check, if the variables from CONFIG.JS are valid. 
	const quicktest_config_de = document.getElementById("quicktest_config_de")
	quicktest_config_de.innerHTML = "Lade alle Variablen aus CONFIG.JS in die Datei. Wenn das Skript hier <b>abbricht</b>, fehlt vermutlich etwas. Bitte prüfen Sie die Browser-Konsole. <br /> z.B. <code>XYZ is not defined</code>"
	
	const quicktest_config_en = document.getElementById("quicktest_config_en")
	quicktest_config_en.innerHTML = "Loading all variables from CONFIG.JS into the file. If the script <b>stops</b> here, there's probably something missing. Please check the browser console. <br /> e.g. <code>XYZ is not defined</code>"

	// Loading all variables into the script and hope for the best.
	let arVariablesFromDefinitionJs = new Array(delimiter,

		descriptionShowOnStart,
 		my_o_mat,
		descriptionHeading1,
		descriptionHeading2,
		descriptionExplanation,

		fileQuestions, 
		intQuestions,
		intQuestions_categories_rowInCSV,
		strQuestions_moreInformation_symbol,
		intQuestions_moreInformation_rowInCSV,

		intQuestionButtons,
		intShowButtonNeutral,
		intShowButtonDouble,
		intShowButtonSkip,

		fileCandidates,

		intLimitResults,
		intShowResultsFilter,

		language,
		design,

		imprintLink,
		imprintGeneral,
		imprintContact,
		imprintVATid,
		imprintEditors,
		imprintProgramming,
		imprintPictures,
		imprintPrivacyUrl,

		addons,
		
		statsRecord,
		statsServer)
		

	quicktest_config_de.innerHTML = "<b class='bg-success'>OK.</b> Alle Variablen aus der CONFIG.JS wurden erfolgreich geladen."	
	quicktest_config_en.innerHTML = "<b class='bg-success'>OK.</b> All variables from CONFIG.JS have been loaded successfully."


	/* ------------------------------------------------------------------- */

	
	// QUESTIONS to the CANDIDATES

	const quicktest_questions = document.getElementById("quicktest_questions")

	quicktest_questions.innerHTML = "Name der <b>Datei</b> mit den Fragen / Name of <b>file</b> with questions: "
	quicktest_questions.insertAdjacentHTML("beforeend", " <p> <a href='"+fileQuestions+"' target='_blank'>"+fileQuestions+"</a> </p> ")
	quicktest_questions.insertAdjacentHTML("beforeend", " <p> Es sollten <b class='bg-warning'>&#x1F872; "+intQuestions+" &#x1F870; Fragen</b> angezeigt werden. </p> ")
	quicktest_questions.insertAdjacentHTML("beforeend", " <p> There should be <b class='bg-warning'>&#x1F872; "+intQuestions+" &#x1F870; questions</b> in the list. </p> ")

	quicktest_questions.insertAdjacentHTML("beforeend", " <hr />")

	for (let i = 0; i <= (intQuestions-1); i++)
	{
		quicktest_questions.insertAdjacentHTML("beforeend", " "+(i+1)+". <b>"+objQuestions["q"+i].short+"</b> - "+objQuestions["q"+i].long+ " <br />")
	}


	/* ------------------------------------------------------------------- */

	
	// QUESTION-BUTTONS

	let quicktest_questions_buttons_text =  ""
	let quicktest_questions_buttons_onOrOff_text = ""
	const quicktest_questions_buttons = document.getElementById("quicktest_questions_buttons")

	const parentToButtons = document.getElementById("quicktest_questions_buttons");
	const quicktest_questions_buttons_template   = document.getElementById("quicktest_questions_buttons_template");
	const quicktest_questions_buttons_templateClone   = document.importNode(quicktest_questions_buttons_template.content, true);

	let quicktest_voting_proExtra = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_proExtra")
	let quicktest_voting_pro = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_pro")
	let quicktest_voting_neutral = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_neutral")
	let quicktest_voting_contra = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_contra")
	let quicktest_voting_contraExtra = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_contraExtra")
	let quicktest_voting_double = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_double")
	let quicktest_voting_skip = quicktest_questions_buttons_templateClone.getElementById("quicktest_voting_skip")

	quicktest_voting_proExtra = fnSetAnswerButtonAttributes(1, 1.5, 0, quicktest_voting_proExtra) 
	quicktest_voting_pro = fnSetAnswerButtonAttributes(1, 1, 0, quicktest_voting_pro) 
	quicktest_voting_neutral = fnSetAnswerButtonAttributes(0.5, 1, 0, quicktest_voting_neutral) 
	quicktest_voting_contra = fnSetAnswerButtonAttributes(-1, 1, 0, quicktest_voting_contra) 
	quicktest_voting_contraExtra = fnSetAnswerButtonAttributes(-1, 1, 0, quicktest_voting_contraExtra) 
	quicktest_voting_double.innerHTML = TEXT_VOTING_DOUBLE_SHORT
	quicktest_voting_skip = fnSetAnswerButtonAttributes(0, 0, 0, quicktest_voting_skip) 


	if (intQuestionButtons == 2) {
		quicktest_voting_proExtra.style.display = "none"
		quicktest_voting_contraExtra.style.display = "none"
	}
	quicktest_questions_buttons_text +=  "<p> Auswahl-Buttons / Voting-buttons <b class='bg-warning'>&#x1F872; "+intQuestionButtons+" / 4 &#x1F870;</b> aktiv / active. </p>"

	if (intShowButtonNeutral == 0) {
		quicktest_voting_neutral.style.display = "none"
		quicktest_questions_buttons_onOrOff_text = "aus / off"
	} else {
		quicktest_questions_buttons_onOrOff_text = "an / on"
	}
	quicktest_questions_buttons_text +=  "<p> Neutral-Button ist / Neutral-button is: <b class='bg-warning'>&#x1F872; "+quicktest_questions_buttons_onOrOff_text +" &#x1F870;</b>  </p>"

	if (intShowButtonDouble == 0) {
		quicktest_voting_double.style.display = "none"
		quicktest_questions_buttons_onOrOff_text = "aus / off"
	} else {
		quicktest_questions_buttons_onOrOff_text = "an / on"
	}
	quicktest_questions_buttons_text +=  "<p> Doppelt-Button ist / Double-button is: <b class='bg-warning'>&#x1F872; "+quicktest_questions_buttons_onOrOff_text +" &#x1F870;</b>  </p>"

	if (intShowButtonSkip == 0) {
		quicktest_voting_skip.style.display = "none"
		quicktest_questions_buttons_onOrOff_text = "aus / off"
	} else {
		quicktest_questions_buttons_onOrOff_text = "an / on"
	}
	quicktest_questions_buttons_text +=  "<p> Überspringen-Button ist / Skip-button is: <b class='bg-warning'>&#x1F872; "+quicktest_questions_buttons_onOrOff_text +" &#x1F870;</b>  </p>"


	quicktest_questions_buttons.innerHTML = quicktest_questions_buttons_text 

	parentToButtons.appendChild(quicktest_questions_buttons_templateClone);

	/* ------------------------------------------------------------------- */


	// ANSWERS of CANDIDATES and their information

	const quicktest_candidates = document.getElementById("quicktest_candidates")

	quicktest_candidates.innerHTML = "Name der <b>Datei</b> mit den Kandidaten und ihren Antworten / Name of <b>file</b> with candidates and their answers: "
	quicktest_candidates.insertAdjacentHTML("beforeend", " <p> <a href='"+fileCandidates+"' target='_blank'>"+fileCandidates+"</a> </p> ")
	quicktest_candidates.insertAdjacentHTML("beforeend", " <p> Es sollten <b class='bg-warning'>&#x1F872; "+intCandidates+" &#x1F870; Kandidaten</b> angezeigt werden. </p> ")
	quicktest_candidates.insertAdjacentHTML("beforeend", " <p> There should be <b class='bg-warning'>&#x1F872; "+intCandidates+" &#x1F870; candidates</b> in the list. </p> ")

	quicktest_candidates.insertAdjacentHTML("beforeend", " <hr />")

	for (let i = 0; i <= (intCandidates-1); i++)
	{
		quicktest_candidates.insertAdjacentHTML("beforeend", " <h2> "+(i+1)+". Name: <b>"+objCandidates["c"+i].short+"</b> - "+objCandidates["c"+i].long+ " </h2>")
		quicktest_candidates.insertAdjacentHTML("beforeend", " <p> Beschreibung / Description: "+objCandidates["c"+i].desc+" </p>")
		quicktest_candidates.insertAdjacentHTML("beforeend", " <p> URL: <a href='"+objCandidates["c"+i].url+"' target='_blank'>"+objCandidates["c"+i].url+"</a> </p>")
		quicktest_candidates.insertAdjacentHTML("beforeend", " <p> Bild / Picture: <br /> <img src='"+objCandidates["c"+i].pic+"' style='width:20%' /> </p>")
		quicktest_candidates.insertAdjacentHTML("beforeend", " <p> Email: "+objCandidates["c"+i].mail+" </p>")
		quicktest_candidates.insertAdjacentHTML("beforeend", " <p> Tel: "+objCandidates["c"+i].tel+" </p>")
		quicktest_candidates.insertAdjacentHTML("beforeend", " <p> Filter: "+objCandidates["c"+i].filters+" </p>")

		for (let j = 0; j <= (intQuestions-1); j++)
		{
			let shortAnswer = objCandidates["c"+i].answers["a"+j].short
			let longAnswer = objCandidates["c"+i].answers["a"+j].long
			quicktest_candidates.insertAdjacentHTML("beforeend", "<p> ")
			quicktest_candidates.insertAdjacentHTML("beforeend", " "+(i+1)+".<b>"+(j+1)+".</b> ")

			let buttonAnswer = ""

			if (shortAnswer == -1) {
				buttonAnswer = "btn-danger" } 
			else if (shortAnswer == 0.5) {
				buttonAnswer = "btn-warning" }
			else if (shortAnswer == 1) {
				buttonAnswer = "btn-success" }

			quicktest_candidates.insertAdjacentHTML("beforeend", " &nbsp; <button class='btn border-dark rounded "+buttonAnswer+"'> "+shortAnswer+"  </button>")

			quicktest_candidates.insertAdjacentHTML("beforeend", " "+longAnswer+" ")

			if (!longAnswer) {
				quicktest_candidates.insertAdjacentHTML("beforeend", " <p> <b class='bg-danger'>&#x1F872; FEHLER &#x1F870;</b> Die Antwort des Kandidaten fehlt. Es kann sein, dass das Feld absichtlich leer ist oder dass einige Einträge in der CSV-Datei davor fehlen.</p> ")
				quicktest_candidates.insertAdjacentHTML("beforeend", " <p> <b class='bg-danger'>&#x1F872; ERROR &#x1F870;</b> The candidate's answer is missing. Maybe it's empty on purpose or we are missing some values in the CSV file.</p> ")
			}

			quicktest_candidates.insertAdjacentHTML("beforeend", "</p> ")
		}

		quicktest_candidates.insertAdjacentHTML("beforeend", " <hr />")

	}


	/* ------------------------------------------------------------------- */


	const quicktest_statistics = document.getElementById("quicktest_statistics")
	quicktest_statistics.innerHTML = ""
	
	// Werte fuer "Wahlprognose" pruefen - Check statistics
	if (statsRecord == 0) {
		quicktest_statistics.insertAdjacentHTML("beforeend", " <p> ")
		quicktest_statistics.insertAdjacentHTML("beforeend", "<b class='bg-success'>OK</b>. Es wird keine Statistik am Ende abgefragt. / ")
		quicktest_statistics.insertAdjacentHTML("beforeend", "<b class='bg-success'>OK</b>. There's no demand to send out the statistics.")
		quicktest_statistics.insertAdjacentHTML("beforeend", " </p> ")

	}
	else if (statsRecord == 1)
	{
		if (imprintPrivacyUrl.length <= 0)
		{
			quicktest_statistics.insertAdjacentHTML("beforeend", " <p> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <code>statsRecord + imprintPrivacyUrl</code> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <b class='bg-danger'>&#x1F872; FEHLER &#x1F870;</b>. Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt aber es wurde <b>keine Datenschutzerkl&auml;rung</b> angegeben. / ")
			quicktest_statistics.insertAdjacentHTML("beforeend", " <b class='bg-danger'>&#x1F872; ERROR &#x1F870;</b> Variable for statistics is on TRUE/1 but <b>privacy statement is missing</b>.")
			quicktest_statistics.insertAdjacentHTML("beforeend", " </p> ")
		}
		else {
			quicktest_statistics.insertAdjacentHTML("beforeend", " <p> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <code>statsRecord + imprintPrivacyUrl</code> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", "<b class='bg-success'>OK</b>. Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt und es wurde <b>eine Datenschutzerkl&auml;rung</b> angegeben. / ")
			quicktest_statistics.insertAdjacentHTML("beforeend", "<b class='bg-success'>OK</b>. Variable for statistics is on TRUE/1 and <b>privacy statement is set</b>. ")
			quicktest_statistics.insertAdjacentHTML("beforeend", " </p> ")
		}

		if (statsServer.length <= 0)
		{
			quicktest_statistics.insertAdjacentHTML("beforeend", " <p> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <code>statsRecord + statsServer</code> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <b class='bg-danger'>&#x1F872; FEHLER &#x1F870;</b> Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt aber es wurde <b>keine Adresse zum Empfang der Daten</b> angegeben. ")
			quicktest_statistics.insertAdjacentHTML("beforeend", " <b class='bg-danger'>&#x1F872; ERROR &#x1F870;</b> Variable for statistics is on TRUE/1 but an <b>address to receive data</b> is missing.")
			quicktest_statistics.insertAdjacentHTML("beforeend", " </p> ")
		}
		else {
			quicktest_statistics.insertAdjacentHTML("beforeend", " <p> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <code>statsRecord + statsServer</code> ")

			quicktest_statistics.insertAdjacentHTML("beforeend", " <b class='bg-success'>OK</b>. Die Variable f&uuml;r die Statistik ist auf TRUE/1 gesetzt und es wurde <b>eine Adresse zum Empfang der Daten</b> angegeben. ")
			quicktest_statistics.insertAdjacentHTML("beforeend", " <b class='bg-success'>OK</b>. Variable for statistics is on TRUE/1 and an <b>address to receive data</b> is set.")
			quicktest_statistics.insertAdjacentHTML("beforeend", " </p> ")
		}
	}


	/* ------------------------------------------------------------------- */


	// All calculations successful -> Clear default error / warning / welcome message 
	document.getElementById("quicktest_noscript_de").innerHTML = ""
	document.getElementById("quicktest_noscript_en").innerHTML = ""
	document.getElementById("quicktest_welcome").innerHTML = "<p> <br /> <b class='bg-success'>OK</b>. Alle Berechnungen beendet. / <b class='bg-success'>OK</b>. All calculations finished. </p>"


}
