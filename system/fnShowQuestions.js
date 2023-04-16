
// import { arQuestionsShort } from './globals.js'
import {fnTransformCsvToArray} from './fnTransformCsvToArray.js'
import { arQuestionsShort, arQuestionsLong } from './globals.js';

// Anzeige der Fragen (aus fnStart())
export function fnShowQuestions(csvData) {
    // Einlesen der Fragen ...
    // fnSplitLines(csvData,1);
    fnTransformCsvToArray(csvData, 1)

    // ... und Anzeigen
    let questionNumber = -1;

    // v.0.6 - deaktiviert, da nun am Anfang ein Willkommensbildschirm erscheint.
    // neu: fnHideWelcomeMessage()
    // fnShowQuestionNumber(questionNumber);
}


