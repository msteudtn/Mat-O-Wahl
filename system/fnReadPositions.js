// Einlesen der Parteipositionen und Partei-Informationen (aus fnStart())
import { fnSetIntParties } from './fnSetIntParties.js'
import { fnTransformCsvToArray } from './fnTransformCsvToArray.js'
//import { intParties} from './globals.js'

export function fnReadPositions(csvData) {
	// Einlesen der Parteipositionen und Vergleichen
	// fnSplitLines(csvData,0);
	var intParties = fnSetIntParties(csvData)
	fnTransformCsvToArray(csvData, 0, intParties)
}
