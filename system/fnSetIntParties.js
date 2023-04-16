 // Zahl der Parteien dynamisch berechnen, anstatt sie in der definition.js anzugeben
 export function fnSetIntParties(data) {
	let arIntParties = data.split("\n");
	// Falls die fileAnswers (und damit der Array) mit leeren Zeilen endet, diese entfernen
	while (true) {
		if (arIntParties[arIntParties.length - 1] === "" || arIntParties[arIntParties.length - 1] === "\r") {
			arIntParties.pop();
		}
		else break;
	}
	// Globale Variable erstellen, um Problem mit return values in async ajax calls zu umgehen
	// Ergebnis runden, um Fehlertoleranz zu erhöhen
	return Math.round(arIntParties.length / (intQuestions + 6));
}
