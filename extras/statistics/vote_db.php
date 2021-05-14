<?php

// COMMIT: Marius Nisslmueller, Bad Honnef, Juni 2020
// Anpassungen: Mathias Steudtner, Mai 2021

// Database Settings (Default for XAMPP :) )
// $dbname has to be created once in your MySQL or MariaDB 
// (and can be something else than "matowahl") 
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "matowahl";

// Establish Connection
	$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
	if ($conn->connect_error) {
	    die("Mat-o-Wahl: Connection failed: " . $conn->connect_error);
	}

// DE: IP-Adresse des Besuchers
// EN: Ip address of visitor
	if (getenv("HTTP_X_FORWARDED_FOR")) { 
		$ip=getenv("HTTP_X_FORWARDED_FOR"); }
	else {
		$ip=getenv("REMOTE_ADDR"); }

	$ip = explode (',', $ip);
	$ip = $ip[0];
	
// Human readable Timestamp: e.g. "2021-12-31 23:59:59" 
	$timestamp = date("Y-m-d H:i:s");


// Sanitize User Input
	$mowPersonalValues = mysqli_real_escape_string($conn, $_GET["mowpersonal"]);
	$mowPartiesValues = mysqli_real_escape_string($conn, $_GET["mowparties"]);

// Prepare and execute SQL Statement to prevent SQL Injection
	$sql = "INSERT INTO Results (ip, timestamp, personal, parties) VALUES ('$ip', '$timestamp', '$mowPersonalValues', '$mowPartiesValues')";


// Send data
	if ($conn->query($sql) === TRUE) {
	  echo "Mat-o-Wahl: New record created successfully";
	} else {
	  echo "Mat-o-Wahl: Error: " . $sql . "<br>" . $conn->error;
	}

// Close connection
	$conn->close();

?>
