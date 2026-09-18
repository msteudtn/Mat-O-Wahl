"use strict"

function fnShowImprint() {

	document.title = my_o_mat+ " - " +TEXT_IMPRINT;

	// Version number from GLOBALS.JS
	document.getElementById("versionNumber").innerHTML = version;

	const textNoInformation = "keine Angaben / No information available."

	// Texts from DEFINITION.JS

	// Angaben gemäß § 5 TMG
	// General information
	if (!imprintGeneral)
	{
		document.getElementById("imprintGeneral").innerHTML = textNoInformation;
	}
	else
	{
		document.getElementById("imprintGeneral").innerHTML = imprintGeneral;
	}


	// Kontakt / Contact details
	if (!imprintContact)
	{
		document.getElementById("imprintContact").innerHTML = textNoInformation;
	}
	else
	{
		document.getElementById("imprintContact").innerHTML = imprintContact;
	}

	// Umsatzsteuer-ID / VAT ID
	if (!imprintVATid)
	{
		document.getElementById("imprintVATid").innerHTML = textNoInformation;
	}
	else
	{
		document.getElementById("imprintVATid").innerHTML = imprintVATid;
	}

	// Redaktion / Editors
	if (!imprintEditors)
	{
		document.getElementById("imprintEditors").innerHTML = textNoInformation;
	}
	else
	{
		document.getElementById("imprintEditors").innerHTML = imprintEditors;
	}

	// Technik / Programming
	if (!imprintProgramming)
	{
		document.getElementById("imprintProgramming").innerHTML = textNoInformation;
	}
	else
	{
		document.getElementById("imprintProgramming").innerHTML = imprintProgramming;
	}

	// Bildquellen / Picture sources
	if (!imprintPictures)
	{
		document.getElementById("imprintPictures").innerHTML = textNoInformation;
	}
	else
	{
		document.getElementById("imprintPictures").innerHTML = imprintPictures;
	}

	// Datenschutzerklaerung / Privacy statement
	if (imprintPrivacyUrl.length > 0)
	{
		document.getElementById("idImprintPrivacy").innerHTML = "Datenschutzerkl&auml;rung / Privacy Policy: <a href='http://"+imprintPrivacyUrl+"' target='_blank'>"+imprintPrivacyUrl+"</a>";
	}
	else
	{
		document.getElementById("idImprintPrivacy").innerHTML = "Keine Datenschutzerkl&auml;rung vorhanden / No privacy policy available.";
	}
}
