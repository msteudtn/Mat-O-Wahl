// FUNKTION
// Erzeuge einen wegklickbaren, responsiven Tooltip für den Button "Doppelt gewichten", der die Funktion kurz erklärt.

// 1.) Allgemeine Angaben
// General Settings

// Text, der im Tooltip angezeigt werden soll
 const TOOLTIP_TEXT = 'Ist dir eine Frage besonders wichtig? Dann klicke auf "Doppelt gewichten", <strong>bevor</strong> du deine Antwort auswählst.';

 // Hintergrundfarbe
 const TOOLTIP_BACKGROUND_COLOR = "#0050a0";

 // Schriftgröße
 const TOOLTIP_FONT_SIZE = "80%";

 // Schriftfarbe
 const TOOLTIP_COLOR = "#fff";

 // Runder oder eckiger Rahmen?
 const TOOLTIP_BORDER_RADIUS = ".3rem";

 // Farbe des Rahmens
 const TOOLTIP_BORDER_COLOR = "#000";

 // Dicke des Rahmens in PIXELN
 const TOOLTIP_BORDER_WIDTH = "1px";

 // Bei Bedarf kannst du die CSS-Regeln ganz unten direkt bearbeiten

 // 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig. 
// That's it.


///////////////////////////////////////////////////////////////////////  


// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.


///////////////////////////////////////////////////////////////////////


window.addEventListener("load", () => {
    // Erzeuge den Tooltip und seine Inhalte
    // Tooltip-Container
    const votingDoubleTooltip = document.createElement("div");
    votingDoubleTooltip.classList.add("votingDoubleTooltip");
    // Tooltip-Text
    const votingDoubleTooltipText = document.createElement("span");
    votingDoubleTooltipText.innerHTML = TOOLTIP_TEXT;
    // X-Button zum Schließen
    const closeTooltip = document.createElement("span");
    closeTooltip.classList.add("closeTooltip");
    closeTooltip.textContent = "×" // &times;

    // Füge alles ineinander ein
    votingDoubleTooltip.append(votingDoubleTooltipText, closeTooltip)

    // Füge das Ganze ins DOM ein
    document.querySelector("#votingDouble").appendChild(votingDoubleTooltip)

    // Unterbinde den Hover-/Active-Effekt des votingDouble-Buttons, damit diese nicht ausgelöst werden, wenn man über den Tooltip hovert
    document.querySelector("#votingDouble").classList.add("noHoverEffect")

    // Füge einen Event-Listener zum X-Button hinzu
    document.querySelector(".closeTooltip").addEventListener("click", (e) => {
        // Verhindere Bubbling, da sonst beim Schließen des Tooltips auch der votingDouble-Button geklickt wird
        e.stopPropagation();
        // Verstecke den Tooltip
        document.querySelector(".votingDoubleTooltip").classList.add("d-none");
        // Gib dem votingDouble-Button seinen Hover-/Active-Effekt wieder, aber nicht sofort, da sonst auf mobilen Geräten der
        // Active-Effekt beim Schließen des Tooltips mit ausgelöst wird
        setTimeout(() => {
            document.querySelector("#votingDouble").classList.remove("noHoverEffect")
        }, 500)
    })

    // Stylesheet erzeugen
    const styles = `
    .votingDoubleTooltip {
        position: absolute;
        transform: translate(-30px, 10px);
        width: min(400px, 93vw);
        background: ${TOOLTIP_BACKGROUND_COLOR};
        z-index: 3;
        font-size: ${TOOLTIP_FONT_SIZE};
        text-align: left;
        padding: 10px;
        color: ${TOOLTIP_COLOR};
        border-radius: ${TOOLTIP_BORDER_RADIUS};
        box-shadow: 2px 2px 5px #0007;
        margin-left: 10px;
        font-weight: 400;
        border-style: solid;
        border-color: ${TOOLTIP_BORDER_COLOR};
        border-width: ${TOOLTIP_BORDER_WIDTH};
      }
      /* Die Zacke, die aus dem Rechteck eine Sprechblase macht */
      .votingDoubleTooltip::after {
        content: "";
        position: absolute;
        top: -19px;
        left: 80px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent  ${TOOLTIP_BACKGROUND_COLOR} transparent;
      }
      /* Der Rahmen der Sprechblase (falls eine Rahmenfarbe und Rahmendicke eingestellt wurden) */
      .votingDoubleTooltip::before {
        content: "";
        position: absolute;
        top: -${19 + +TOOLTIP_BORDER_WIDTH.replace("px","")}px;
        left: 80px;
        border-width: 10px;
        border-style: solid;
        border-color: transparent transparent ${TOOLTIP_BORDER_COLOR};
      }
      
      .closeTooltip {
        position: absolute;
        font-size: 1.5rem;
        top: -5px;
        right: 5px;
      }
      
      .noHoverEffect:hover, .noHoverEffect:active {
        transform: unset;
        background: inherit !important;
        color: inherit !important;
      }
    `
    const styleSheet = document.createElement("style")
    styleSheet.innerText = styles

    // Stylesheet ins DOM einfügen
    document.head.appendChild(styleSheet)
})
