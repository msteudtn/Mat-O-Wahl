<?php

/*
  EINSATZZWECK / USE CASE

 * Auslesen der Statistik aus der Datenbank
 * Schreiben der Ergebnisse in eine Textdatei
 * Die Textdatei kann dann von RESULTS.HTML und RESULTS.JS ausgelesen werden

 * Read statistics from database
 * Write results into text-file
 * The text-file can be accessed via RESULTS.HTML and RESULTS.JS.

*/ 

$filename = 'results_db.txt';
$somecontent = "";

echo "<p>Current file path and file: <strong>".$_SERVER['SCRIPT_FILENAME']."</strong></p>";

// https://www.w3schools.com/php/php_mysql_select.asp 

// Include Database Settings
	echo "<p> Loading DB-Settings ... </p>";
	include "../statistics/db_settings.php";

// Establish Connection
	echo "<p>  Establishing Connection ... </p>";
	$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
	echo "<p> Checking Connection ... </p>";
	if ($conn->connect_error) {
	    die("Mat-o-Wahl: Connection failed: " . $conn->connect_error);
	}

	echo "<p> Query SQL ... </p>";
	$sql = "SELECT ip, timestamp, personal, parties FROM `$tablename` ";
	$result = $conn->query($sql);

	$counter = 0;

	if ($result->num_rows > 0) {
	  // output data of each row
	  echo "<p> Reading data for file ".$filename." ... </p>";
	  while($row = $result->fetch_assoc()) {
	  	
	  		$counter++;
	  		$ip          = $row["ip"];
	  		$timestamp   = $row["timestamp"];
	  		$mowpersonal = $row["personal"];
	  		$mowparties  = $row["parties"];
	  		
	    	echo $counter." ip: " .$ip. " - Date: " .$timestamp. " Personal: " .$mowpersonal. " Parties: "  .$mowparties. "<br /> ";
	    
			$somecontent .= "".$ip." ".$timestamp." ".$mowpersonal." ".$mowparties."\n";   
	    
	  }
	} 
	else {
	  echo "<p> Error: 0 results </p>";
	}
	
	echo "<p> Closing Connection. </p>";
	$conn->close();


		// DE: Sichergehen, dass die Datei existiert und beschreibbar ist
		// EN: Let's make sure the file exists and is writable first.
		if (is_writable($filename)) {
		
		    // DE: Wir öffnen $filename im "WRITE" - Modus, so dass die Datei neu geschrieben wird.
			 // EN: In our example we're opening $filename in WRITE mode to write it new.
		    if (!$handle = fopen($filename, "w")) {
		         print "<strong> Cannot open file ($filename) </strong> ";
		         exit;
		    }
		
		   // DE: Schreibe $somecontent in die geöffnete Datei.
			// EN: Write $somecontent to our opened file.
		    if (!fwrite($handle, $somecontent)) {
		        print "<strong> Cannot write to file $filename </strong> ";
		        exit;
		    }
		
		    print "Success! <br /> wrote: ($somecontent) <br />to file ($filename)";
		
		    fclose($handle);
		
		} else {
		    print "<strong> The file $filename is not writable </strong> ";
		}
		
	echo "<p> You can now change the <strong>`var fileResults`</strong> in <strong>/SYSTEM/RESULTS.JS</strong> to <strong>".$filename."</strong> "
	    

?>
