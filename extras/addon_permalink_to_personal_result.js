// FUNKTION
// Erzeuge über der Ergebnistabelle einen Button, der einen Permalink kopiert, mit man zurück zu der persönlichen Ergebnisseite gelangt


// 1.) Allgemeine Angaben
// Text im Button
const PERMALINK_BUTTON_TEXT = "Ergebnis speichern"

// Erklärtext, der für ein paar Sekunden angezeigt wird, wenn man auf den Button klickt
const PERMALINK_DESCRIPTION_TEXT ="Es wurde ein Permalink generiert und in deine Zwischenablage kopiert. Speichere diesen Link und rufe ihn später auf, um wieder zu dieser persönlichen Ergebnisseite zu gelangen."

// Wie viele Sekunden soll der Erklärtext angezeigt werden, bevor er wieder verschwindet?
const PERMALINK_DESCRIPTION_DURATION = 8;

// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig.
// That's it.

/// ////////////////////////////////////////////////////////////////////

// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.

/// ////////////////////////////////////////////////////////////////////

function fnProcessPermalink(personalPositionsFromUrl, votingDoubleFromUrl) {
    arPersonalPositions = personalPositionsFromUrl.split(",")
    arVotingDouble = votingDoubleFromUrl.split(",")

    // Entferne das Statistik-Modal - an anderer Stelle eine Fehlermeldung in Kauf nehmend
    // const statsRecord lässt sich nicht zu "false" reassignen, daher das Modal einfach ganz entfernen
    let statisticsModal = document.querySelector("#statisticsModal")
    if (statisticsModal) statisticsModal.parentNode.removeChild(statisticsModal)

    // Entferne den Startbildschirm, falls vorhanden. Ansonsten würde er nicht verschwinden
    const sectionDescription = document.querySelector("#sectionDescription")
    if(sectionDescription) sectionDescription.parentNode.removeChild(sectionDescription)

    // Ohne Timeout würde es beim Reload z. T. zu Fehlern kommen
   setTimeout(() => {
        fnShowQuestionNumber(intQuestions)
    }, 500)
}



window.addEventListener("load", () => {
    // Suche in der URL nach Parameter und führe ggf. Funktion aus
    const urlParams = new URLSearchParams(window.location.search)
    const personalPositionsFromUrl = urlParams.get('personalpositions')
    if (personalPositionsFromUrl) {
        const votingDoubleFromUrl = urlParams.get('votingdouble')   
        fnProcessPermalink(personalPositionsFromUrl, votingDoubleFromUrl)
    }

    const observerResults = new MutationObserver(fnGeneratePermalink);
    observerResults.observe(document.querySelector("#resultsHeading"), {childList: true,});

    // Ist eine inner function, damit sie Zugriff auf die Variable observerResults hat (zum Disconnecten)
    function fnGeneratePermalink() {
        // Ohne .disconnect() wird die Mutation doppelt getriggert -> 2 Buttons
        observerResults.disconnect()

        const permalinkContainer = document.createElement("div");
        permalinkContainer.setAttribute("id","permalink-container");
        permalinkContainer.style.textAlign = "right"
        permalinkContainer.innerHTML = `<button class="btn btn-secondary" id="permalink-button">${PERMALINK_BUTTON_TEXT}</button>
        <p id="permalink-description" class="d-none"\
        style="text-align: left; border: 2px solid var(--success, green);padding: 5px 15px;margin: 10px;border-radius: var(--border-radius, 0);">\
        ${PERMALINK_DESCRIPTION_TEXT}</p>`
        const permalinkDescription = permalinkContainer.querySelector("#permalink-description")
        permalinkContainer.querySelector("#permalink-button").addEventListener("click", () => {
            const permalinkUrl = window.location.origin + window.location.pathname + "?personalpositions=" + arPersonalPositions.join(",")  + "&votingdouble=" + arVotingDouble.join(",")
            navigator.clipboard.writeText(permalinkUrl)
            permalinkDescription.classList.remove("d-none")
            setTimeout(() => {
                permalinkDescription.classList.add("d-none")
            }, PERMALINK_DESCRIPTION_DURATION * 1000)
        }) 
        document.querySelector("#resultsShort").insertBefore(permalinkContainer, document.querySelector("#resultsShortTable"))
    }
})
