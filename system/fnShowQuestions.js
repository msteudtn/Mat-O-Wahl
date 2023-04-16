
// import { arQuestionsShort } from './globals.js'
import {fnTransformCsvToArray} from './fnTransformCsvToArray.js'

// Anzeige der Fragen (aus fnStart())
export function fnShowQuestions(csvData) {
    // Einlesen der Fragen ...
    // fnSplitLines(csvData,1);
    fnTransformCsvToArray(csvData, 1)

    // ... und Anzeigen
    let questionNumber = -1;
}
