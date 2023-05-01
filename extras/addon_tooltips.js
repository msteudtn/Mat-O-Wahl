// FUNKTION
// Erzeuge einen wegklickbaren, responsiven Tooltip für den Button "Doppelt gewichten", der die Funktion kurz erklärt.

// 1.) Allgemeine Angaben
// General Settings

// Zeige einen Tooltip an der jeweiligen Stelle an? Ja: Tooltip-Text / Nein: 0
// Beim Button "Doppelt gewichten"
const TOOLTIP_VOTING_DOUBLE =
  "Ist dir eine Frage besonders wichtig? Dann klicke auf &quot;Doppelt gewichten&quot;, <strong>bevor</strong> du deine Antwort auswählst.";
  
// Bei den Buttons, mit denen man seine eigene Position nachträglich ändern (und ggf. doppelt gewichten) kann
const TOOLTIP_RESULTS_SHORT =
  "Klicke auf das Icon, um deine Antwort zu ändern.";

const TOOLTIP_RESULTS_BY_THESIS =
  "Klicke auf die Buttons, um deine Antwort zu ändern bzw. doppelt zu gewichten.";

// Bei der wie vielten Frage soll der Tooltip angezeigt werden
const TOOLTIP_RESULTS_BY_THESIS_QUESTION_NUMBER = 1;

// Style aller aktivierten Tooltips
// Hintergrundfarbe
const TOOLTIP_BACKGROUND_COLOR = "var(--info)";

// Schriftgröße
const TOOLTIP_FONT_SIZE = ".9rem";

// Schriftfarbe
const TOOLTIP_COLOR = "#000000";

// Runder oder eckiger Rahmen?
const TOOLTIP_BORDER_RADIUS = "3px";

// Farbe des Rahmens
const TOOLTIP_BORDER_COLOR = "#000";

// Dicke des Rahmens in PIXELN
const TOOLTIP_BORDER_WIDTH = "1px";

// Bei Bedarf kannst du die CSS-Regeln im Code direkt bearbeiten oder in einem anderen Stylesheet überschreiben

// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig.
// That's it.

/// ////////////////////////////////////////////////////////////////////

// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.

/// ////////////////////////////////////////////////////////////////////

// Stylesheet mit allgemeinen Tooltip-Regeln erstellen und einfügen
window.addEventListener("load", () => {
  const stylesheet = document.createElement("style");
  stylesheet.setAttribute("id", "tooltipCSS");
  stylesheet.textContent = `
  [class^="tooltip"] {
    position: absolute;
    background: ${TOOLTIP_BACKGROUND_COLOR || "var(--secondary-color)"};
    z-index: 3;
    font-size: ${TOOLTIP_FONT_SIZE};
    text-align: left;
    padding: 10px;
    margin-left: 10px;
    color: ${TOOLTIP_COLOR};
    border-radius: ${TOOLTIP_BORDER_RADIUS};
    box-shadow: 2px 2px 5px #0007;
    border-style: solid;
    border-color: ${TOOLTIP_BORDER_COLOR};
    border-width: ${TOOLTIP_BORDER_WIDTH};
  }
  /* Die Zacke, die aus dem Rechteck eine Sprechblase macht, und ihr Rahmen */
  [class^="tooltip"]::after, [class^="tooltip"]::before {
    content: "";
    position: absolute;
    border: 10px solid transparent;
  }

  [class^="closeTooltip"] {
      background-color: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      position: absolute;
      font-size: 1.5rem;
      top: -5px;
      right: 5px;
  }`;
  document.head.appendChild(stylesheet);
});

// Tooltip für Button "Doppelt gewichten" erzeugen
if (TOOLTIP_VOTING_DOUBLE) {
  window.addEventListener("load", () => {
    document
      .querySelector("#descriptionButtonStart")
      .addEventListener("click", () => {
        // Erzeuge den Tooltip und seine Inhalte
        const tooltipVotingDouble = document.createElement("div");
        tooltipVotingDouble.classList.add("tooltipVotingDouble");
        tooltipVotingDouble.innerHTML = `
        <span>${TOOLTIP_VOTING_DOUBLE}</span>
        <button class="closeTooltipVotingDouble">&times;</button>`;
        document
          .querySelector("#votingDouble")
          .parentNode.appendChild(tooltipVotingDouble);

        // Füge einen Event-Listener zum X-Button hinzu
        document
          .querySelector(".closeTooltipVotingDouble")
          .addEventListener("click", () => {
            // Verstecke den Tooltip
            tooltipVotingDouble.classList.add("d-none");
          });

        // Für diesen Tooltip spezifische CSS-Regeln hinzufügen
        document.querySelector("#tooltipCSS").textContent += `
      .tooltipVotingDouble {
          transform: translateX(-30px);
          width: min(400px, 93vw);
          font-weight: 400;
        }

        /* Die Zacke, die aus dem Rechteck eine Sprechblase macht */
        .tooltipVotingDouble::after {
          top: -19px;
          left: 80px;
          border-bottom-color: ${TOOLTIP_BACKGROUND_COLOR}
        }
        /* Der Rahmen der Sprechblase (falls eine Rahmenfarbe und Rahmendicke eingestellt wurden) */
        .tooltipVotingDouble::before {
          top: -${19 + +TOOLTIP_BORDER_WIDTH.replace("px", "")}px;
          left: 80px;
          border-bottom-color: ${TOOLTIP_BORDER_COLOR};
        }
      `;
      });
  });
}

if (TOOLTIP_RESULTS_SHORT || TOOLTIP_RESULTS_BY_THESIS) {
  // eslint-disable-next-line no-inner-declarations
  function fnTooltipsInResults() {
    if (TOOLTIP_RESULTS_SHORT) {
      let isTooltipResultsShortAlreadyShowing = false;
      // Wenn in der resultsShortTable ein Button "Antworten anzeigen" geklickt wird: prüfe, ob das das erste Mal war.
      // Wenn ja, Tooltip erstellen und hinter dem ersten selfPosition-Button einfügen
      document
        .querySelector("#resultsShortTable")
        .querySelectorAll(".nonexpanded")
        .forEach((button) => {
          button.addEventListener("click", (e) => {
            if (!isTooltipResultsShortAlreadyShowing) {
              isTooltipResultsShortAlreadyShowing = true;
              // Partei-Nummer aus Event herausfiltern
              const partyNumForTooltip = e.target.id
                .replace("resultsByPartyAnswers", "")
                .replace("collapse", "");
              const tooltipResultsShort = document.createElement("div");
              tooltipResultsShort.classList.add("tooltipResultsShort");
              tooltipResultsShort.innerHTML = `<span>${TOOLTIP_RESULTS_SHORT}</span>
                                  <button class="closeTooltipResultsShort">&times;</button>`;
              document
                .querySelector(
                  `#resultsByPartyAnswersToQuestion${partyNumForTooltip}`
                )
                .querySelector("#selfPositionContainer0")
                .appendChild(tooltipResultsShort);

              document
                .querySelector(".closeTooltipResultsShort")
                .addEventListener("click", () => {
                  document
                    .querySelector(".tooltipResultsShort")
                    .classList.add("d-none");
                });
            } // Ende: isTooltipResultsShortAlreadyShowing
          }); // Ende: (e)
        }); // Ende: foreach button
        
      // Für diesen Tooltip spezifische CSS-Regeln hinzufügen
      document.querySelector("#tooltipCSS").textContent += `
       .tooltipResultsShort {
         transform: translate(180px, -50px);
         width: 100px;
       }

       .tooltipResultsShort::after {
         top: 15px;
         left: -19px;
         border-right-color: ${TOOLTIP_BACKGROUND_COLOR};
       }
       
       .tooltipResultsShort::before {
         top: 15px;
         left: -${19 + +TOOLTIP_BORDER_WIDTH.replace("px", "")}px;;
         border-right-color: ${TOOLTIP_BORDER_COLOR};
       }
       

       
       @media only screen and (min-width: 768px) {
         .tooltipResultsShort {
           width: 350px;
           transform: translate(-120px, 0);
         }
       
         .tooltipResultsShort::after {
           top: -19px;
           left: 150px;
           border-color: transparent transparent #6eb8bb transparent;
         }
       
         .tooltipResultsShort::before {
           top: -${19 + +TOOLTIP_BORDER_WIDTH.replace("px", "")}px;
           left: 150px;
           border-color: transparent transparent #000 transparent;
         }
       }`; // Ende: tooltipCSS
    } // Ende: if TOOLTIP_RESULTS_SHORT
    
    if (TOOLTIP_RESULTS_BY_THESIS) {
      const tooltipResultsByThesis = document.createElement("div");
      tooltipResultsByThesis.classList.add("tooltipResultsByThesis");
      tooltipResultsByThesis.innerHTML = `
      <span>${TOOLTIP_RESULTS_BY_THESIS}</span>
      <button class="closeTooltipResultsByThesis">&times;</button>
      `;
      document
        .querySelector(`#resultsByThesisQuestion${TOOLTIP_RESULTS_BY_THESIS_QUESTION_NUMBER - 1}`)
        .previousElementSibling.appendChild(tooltipResultsByThesis);
      document
        .querySelector(".closeTooltipResultsByThesis")
        .addEventListener("click", () => {
          // Verstecke den Tooltip
          document
            .querySelector(".tooltipResultsByThesis")
            .classList.add("d-none");
        });
      // Für diesen Tooltip spezifische CSS-Regeln hinzufügen
      document.querySelector("#tooltipCSS").textContent += `
      .tooltipResultsByThesis {
          transform: translate(-30px, 10px);
          width: min(400px, 93vw);
        }
        .tooltipResultsByThesis::after {
          top: -19px;
          left: 30px;
          border-bottom-color: ${TOOLTIP_BACKGROUND_COLOR};
        }
        .tooltipResultsByThesis::before {
          top: -${19 + +TOOLTIP_BORDER_WIDTH.replace("px", "")}px;
          left: 30px;
          border-bottom-color: ${TOOLTIP_BORDER_COLOR};
        }
      `;
    }
  }

  const resultsObserver = new MutationObserver(fnTooltipsInResults);

  window.addEventListener("load", () => {
    resultsObserver.observe(document.querySelector("#resultsHeading"), {
      childList: true,
    });
  });
}
