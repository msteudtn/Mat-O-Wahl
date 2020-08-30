
function fnShowImprint() {

	// Versionsnummer aus GENERAL.JS
	$("#versionNumber").append(version);


	var textNoInformation = "keine Angaben / No information available."

	// Angaben gemäß § 5 TMG
	// General information
	if (!imprintGeneral)
	{
		$("#imprintGeneral").append(textNoInformation);
	}
	else
	{
		$("#imprintGeneral").append(imprintGeneral);
	}


	// Kontakt / Contact details
	if (!imprintContact)
	{
		$("#imprintContact").append(textNoInformation);
	}
	else
	{
		$("#imprintContact").append(imprintContact);
	}

	// Umsatzsteuer-ID / VAT ID
	if (!imprintVATid)
	{
		$("#imprintVATid").append(textNoInformation);
	}
	else
	{
		$("#imprintVATid").append(imprintVATid);
	}

	// Verbraucher­streit­beilegung / Universal­schlichtungs­stelle
	// Online Dispute Resolution
	if (!imprintDisputeResultion)
	{
		$("#imprintDisputeResultion").append(textNoInformation);
	}
	else
	{
		$("#imprintDisputeResultion").append(imprintDisputeResultion);
	}


	// Redaktion / Editors
	if (!imprintEditors)
	{
		$("#imprintEditors").append(textNoInformation);
	}
	else
	{
		$("#imprintEditors").append(imprintEditors);
	}

	// Technik / Programming
	if (!imprintProgramming)
	{
		$("#imprintProgramming").append(textNoInformation);
	}
	else
	{
		$("#imprintProgramming").append(imprintProgramming);
	}

	// Bildquellen / Picture sources
	if (!imprintPictures)
	{
		$("#imprintPictures").append(textNoInformation);
	}
	else
	{
		$("#imprintPictures").append(imprintPictures);
	}

	// Datenschutzerklaerung / Privacy statement
	if (imprintPrivacyUrl.length > 0)
	{
		$("#idImprintPrivacy").append("Datenschutzerkl&auml;rung / Privacy Policy: <a href='http://"+imprintPrivacyUrl+"' target='_blank'>"+imprintPrivacyUrl+"</a>");
	}
	else
	{
		$("#idImprintPrivacy").append("Keine Datenschutzerkl&auml;rung vorhanden / No privacy policy available.");
	}



}