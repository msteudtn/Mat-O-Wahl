// FUNKTION
// Erzeuge über der Ergebnistabelle einen Button, der einen Permalink kopiert, mit man zurück zu der persönlichen Ergebnisseite gelangt

// 1.) Allgemeine Angaben
// Text im Button
const PERMALINK_BUTTON_TEXT = "Ergebnis speichern";

const PERMALINK_BUTTON_BACKGROUND_COLOR = "var(--secondary-color)";

const PERMALINK_BUTTON_TEXT_COLOR = "var(--secondary-text-color, #ffffff)";

// Erklärtext, der für ein paar Sekunden angezeigt wird, wenn man auf den Button klickt
const PERMALINK_DESCRIPTION_TEXT =
  "Es wurde ein Permalink generiert und in deine Zwischenablage kopiert. Speichere diesen Link und rufe ihn später auf, um wieder zu dieser persönlichen Ergebnisseite zu gelangen - oder leite ihn weiter, um dein Ranking mit anderen zu teilen.";

const PERMALINK_DESCRIPTION_BORDER_COLOR = "var(--success)";

const PERMALINK_DESCRIPTION_BORDER_RADIUS = "var(--border-radius)";

// Wie viele Sekunden soll der Erklärtext angezeigt werden, bevor er wieder verschwindet?
const PERMALINK_DESCRIPTION_DURATION = 8;

const LOADING_MODAL_TEXT = "Deine Ergebnisseite lädt...";

// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_permalink_to_personal_results.js"]

// 3.) Fertig.
// That's it.

/// ////////////////////////////////////////////////////////////////////

// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.

/// ////////////////////////////////////////////////////////////////////

window.addEventListener("load", () => {
  // Suche in der URL nach Parameter und führe ggf. Funktion aus
  fnProcessPermalink();

  const observerResults = new MutationObserver(fnGeneratePermalink);
  observerResults.observe(document.querySelector("#resultsHeading"), {
    childList: true,
  });

  // Ist eine inner function, damit sie Zugriff auf die Variable observerResults hat (zum Disconnecten)
  function fnGeneratePermalink() {
    // Ohne .disconnect() wird die Mutation aus irgendeinem Grund doppelt getriggert -> 2 Buttons
    observerResults.disconnect();

    const permalinkContainer = document.createElement("div");
    permalinkContainer.setAttribute("id", "permalink-container");
    permalinkContainer.innerHTML = `<button class="btn btn-secondary" id="permalink-button">${PERMALINK_BUTTON_TEXT}</button>
        <p id="permalink-description"\
        style="max-height: 0; border-color: transparent">\
        ${PERMALINK_DESCRIPTION_TEXT}</p>`;
    const permalinkDescription = permalinkContainer.querySelector(
      "#permalink-description"
    );
    permalinkContainer
      .querySelector("#permalink-button")
      .addEventListener("click", () => {
        let permalinkUrl = window.location.origin + window.location.pathname;
        // Add parameter with personal positions
        permalinkUrl += "?personalpositions=" + arPersonalPositions.join(",");
        // Add parameter with voting double values, encode to numbers to avoid confusing strings like "false,false,false..." in the URL
        permalinkUrl +=
          "&votingdouble=" +
          arVotingDouble.map((element) => +element).join(",");
        navigator.clipboard.writeText(permalinkUrl);
        permalinkDescription.style.maxHeight =
          permalinkDescription.scrollHeight + 20 + "px";
        permalinkDescription.classList.add("permalink-description-visible");
        setTimeout(() => {
          permalinkDescription.style.maxHeight = 0;
          permalinkDescription.classList.remove(
            "permalink-description-visible"
          );
        }, PERMALINK_DESCRIPTION_DURATION * 1000);
      });
    document
      .querySelector("#resultsShort")
      .insertBefore(
        permalinkContainer,
        document.querySelector("#resultsShortTable")
      );
  }

  addCssForPermalinkElements();
});

function fnProcessPermalink() {
  const urlParams = new URLSearchParams(window.location.search);
  const personalPositionsFromUrl = urlParams.get("personalpositions");
  const votingDoubleFromUrl = urlParams.get("votingdouble");
  if (personalPositionsFromUrl) {
    // Ladebildschirm anzeigen
    document.querySelector(".container").classList.add("d-none");
    const loadingModalContainer = document.createElement("div");
    loadingModalContainer.innerHTML = `
    <div class="modal" id="loadingModal" tabindex="-1" aria-labelledby="loadingModalLabel" aria-modal="true" style="padding-right: 10px; display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body" id="loadingModalBody">${LOADING_MODAL_TEXT}</div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(loadingModalContainer);

    arPersonalPositions = personalPositionsFromUrl.split(",");
    // Decode numbers to boolean values
    arVotingDouble = votingDoubleFromUrl
      .split(",")
      .map((element) => !!+element);

    // Entferne das Statistik-Modal - an anderer Stelle eine Fehlermeldung in Kauf nehmend
    // const statsRecord lässt sich nicht zu "false" reassignen, daher das Modal einfach ganz entfernen
    let statisticsModal = document.querySelector("#statisticsModal");
    if (statisticsModal)
      statisticsModal.parentNode.removeChild(statisticsModal);

    // Entferne den Startbildschirm, falls vorhanden. Ansonsten würde er nicht verschwinden
    const sectionDescription = document.querySelector("#sectionDescription");
    if (sectionDescription)
      sectionDescription.parentNode.removeChild(sectionDescription);

    // Direkt zur Auswertung springen. Ohne Timeout würde es beim Reload z. T. zu Fehlern kommen
    setTimeout(() => {
      document.querySelector(".container").classList.remove("d-none");
      loadingModalContainer.classList.add("d-none");
      fnShowQuestionNumber(intQuestions);
    }, 2500);
  }
}

function addCssForPermalinkElements() {
  const stylesheet = document.createElement("style");
  stylesheet.setAttribute("id", "permalinkCSS");
  stylesheet.textContent += `
    #permalink-container {
        display: flex;
        flex-direction: column;
        align-items: end;
      } 
    
    #permalink-button {
        background-color: ${PERMALINK_BUTTON_BACKGROUND_COLOR};
      }
      #permalink-description {
        transition: max-height .3s, border-color .3s;
        border: 2px solid;
        margin: 10px;
        width: max(60%, 300px);
        border-radius: ${PERMALINK_DESCRIPTION_BORDER_RADIUS};
        overflow: hidden;
      }

      .permalink-description-visible {
        padding: 10px 15px;
        border-color: ${PERMALINK_DESCRIPTION_BORDER_COLOR} !important;
      }
      
      `;
  document.head.appendChild(stylesheet);
}
