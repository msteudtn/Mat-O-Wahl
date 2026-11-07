// DEUTSCHE TEXTE http://www.mat-o-wahl.de

// const TEXT_LANGUAGE = "english" // for future use / for a possible button to change languages

// WELCOME
const TEXT_SHARED_RESULTS = "Someone sent you this link to their results. You can now have a look at it."
const TEXT_START = "Let's go!"

// QUESTIONS - Show / Hide categories
const TEXT_TOGGLE_BUTTON_CATEGRIES = "Hide / show categories"
const TEXT_NO_CATEGORY = "No category"

// QUESTIONS - Buttons [0]-[n]
const TEXT_VOTING_PRO_EXTRA_SHORT = "&#x2714;" 		// Unicode icon: Heavy Check Mark
const TEXT_VOTING_PRO_EXTRA_LONG  = "Agree a lot"

const TEXT_VOTING_PRO_SHORT = "&#x1F5F8;" 		// Unicode icon: Light Check Mark
const TEXT_VOTING_PRO_LONG  = "Agree"

const TEXT_VOTING_NEUTRAL_SHORT = "&#x25EF;" 		// Unicode icon: Large Circle, alternatively: "&#9900;" Medium Small White Circle
const TEXT_VOTING_NEUTRAL_LONG  = "Don't know"

const TEXT_VOTING_CONTRA_SHORT =  "&#x2715;" 		// Unicode icon: Multiplication "X" // alternatively: "&#x1F6C7;"  // prohibited sign
const TEXT_VOTING_CONTRA_LONG  = "Dis&shy;agree" 

const TEXT_VOTING_CONTRA_EXTRA_SHORT = "&#x2716;" 	// Unicode icon: Heavy Multiplication "X" //  alternatively "<b>&#x1F6C7;</b>"  // prohibited sign
const TEXT_VOTING_CONTRA_EXTRA_LONG  = "Dis&shy;agree a lot"

const TEXT_VOTING_SKIP_SHORT = "&#x21B7;"		// Unicode icon: Clockwise Top Semicircle Arrow
const TEXT_VOTING_SKIP_LONG  = "Skip"

const TEXT_VOTING_DOUBLE_SHORT = "x2"
const TEXT_VOTING_DOUBLE_LONG  = "Rate double"
const TEXT_VOTING_DOUBLE_HELP  = "Ist Ihnen eine Frage besonders wichtig? Dann klicken Sie hier, bevor Sie eine Antwort auswählen.";

const TEXT_VOTING_FINISHED = "Show results!"

// QUESTIONS - last card = "Show me the results"
const TEXT_RESULTS_CARD_SHORT = "Finished"
const TEXT_RESULTS_CARD_LONG = "Done! You can now show your results. Answers can be changed later, also."

// RESULTS - FILTERS 
const TEXT_FILTER_BUTTON_TOGGLE = "Show / hide filters"
const TEXT_FILTER_BUTTON_OR = "Filter by A <strong>or</strong> B"
const TEXT_FILTER_BUTTON_AND = "Filter by A <strong>and</strong> B"
const TEXT_FILTER_BUTTON_RESET = "Reset filter"
const TEXT_FILTER_BY = "Filter by"		// used for ARIA label and title

// RESULTS - OVERVIEW (with the progress-bar and percentage)
const TEXT_RESULTS_HEADING_SHORT_SUMMARY = "Result"
const TEXT_RESULTS_ERROR_NO_DESCRIPTION = "No description available."
const TEXT_RESULTS_IMAGE = "Logo or image"
const TEXT_RESULTS_ANSWERS_SHORT = "&#x1F5F8;" 		// Unicode icon: Light Check Mark
const TEXT_RESULTS_ANSWERS_LONG = "Answers"
const TEXT_RESULTS_URL_SHORT = "&#x1F310;&#xFE0E;"	// Unicode icon: Globe with Meridians (text style VS15 / FE0E, not emoji VS16 / FE0F)
const TEXT_RESULTS_URL_LONG = "Website"
const TEXT_RESULTS_MAIL_SHORT = "&#x2709;&#xFE0E;"	// Unicode icon: Envelope (text style VS15 / FE0E, not emoji VS16 / FE0F)
const TEXT_RESULTS_MAIL_LONG = "Email"
const TEXT_RESULTS_TEL_SHORT = "&#x1F4DE;&#xFE0E;"	// Unicode icon: Telephone Receiver (text style VS15 / FE0E, not emoji VS16 / FE0F)
const TEXT_RESULTS_TEL_LONG = "Telephone"

// RESULTS - BUTTONS to show more / less results based on the LIMIT
const TEXT_RESULTS_LIMIT_LESS = "Show less results"
const TEXT_RESULTS_LIMIT_MORE = "Show more results"

// RESULTS - BUTTONS and DESCRIPTIONS for more detailed results-pages
const TEXT_RESULTS_BY_QUESTION_BUTTON = "Show all questions and the candidates' answers"
const TEXT_RESULTS_BY_QUESTION_DESCRIPTION = "This overview is sorted by <strong>questions and answers by the candidates</strong>. Your own answer is in the first column next to the candidate's answer."
const TEXT_RESULTS_TUNING_BUTTON = "Tuning - Adjust your answers"
const TEXT_RESULTS_TUNING_DESCRIPTION = "You can <strong>change your own answers</strong> again. New results will be calculated automatically."
const TEXT_RESULTS_BY_CANDIDATE_BUTTON = "Show all candidates and their answers"
const TEXT_RESULTS_BY_CANDIDATE_DESCRIPTION = "This overview is sorted by <strong>candidates and their answers</strong>. Your own answer is in the first column next to the candidate's answer."

// The following words may be used as ALT-Text or headers on the RESULTS-pages
const TEXT_QUESTION = "Question"
const TEXT_ANSWERED_BY_USER = "Your answer"
const TEXT_ANSWERED_BY_CANDIDATE = "Candidate's answer"


// Footer
const TEXT_IMPRINT = "<b>§</b> Legal notice"
const TEXT_SHARE = "&#x1F875; Share"
const TEXT_SHARE_CLIPBOARD = "&#x1F875; to clipboard"
const TEXT_SHARE_EMAIL = "&#x1F875; by mail"
const TEXT_SHARE_EMAIL_SUBJECT = "I've tried the Mat-o-Wahl survey. Go ahead and try it also!"
const TEXT_SHARE_EMAIL_BODY = "Hi, %0DI've tried the Mat-o-Wahl survey. Here, you can try it also: %0D"
const TEXT_RESTART = "<b>&#x2B6E;</b> Restart survey" // &#x21BB;
const TEXT_SCROLL_TO_TOP = "&#x1F871; Go to top"


// MODAL - STATISTICS and ERROR "nothing answered"
const TEXT_MODAL_STATISTIC_TITLE = "Before we show the results ..."
const TEXT_MODAL_STATISTIC_TEXT = "Do you agree in sending your <strong>anonymous</strong> statistical results. This would help us (the people running this site), improving the questions in the future. Here, you can find our <a href='"+imprintPrivacyUrl+"' target='_blank'>privacy statement</a>."
const TEXT_MODAL_STATISTIC_YES = "Yes, sure!"
const TEXT_MODAL_STATISTIC_NO = "No, thanks."

const TEXT_MODAL_NOTHING_ANSWERED_TITLE = "Something went wrong!"
const TEXT_MODAL_NOTHING_ANSWERED_TEXT = "There was no question answered. Please answer some questions first to get to the results."
const TEXT_MODAL_NOTHING_ANSWERED_YES = "Will do!"
const TEXT_MODAL_NOTHING_ANSWERED_NO = "Close"

const TEXT_MODAL_CLIPBOARD_TITLE = "Done." 
const TEXT_MODAL_CLIPBOARD_TEXT = "The address with your results has been copied into the clipboard."
const TEXT_MODAL_CLIPBOARD_YES = "OK"
const TEXT_MODAL_CLIPBOARD_NO = "Close"

const TEXT_MODAL_ERROR_FILTER_TITLE = "Oh no!" 
const TEXT_MODAL_ERROR_FILTER_TEXT = "We couldn't find any matches. Please adjust your filter. <br /> e.g. Choose less categories or use OR instead of AND."
const TEXT_MODAL_ERROR_FILTER_YES = "OK"
const TEXT_MODAL_ERROR_FILTER_NO = "Close"
