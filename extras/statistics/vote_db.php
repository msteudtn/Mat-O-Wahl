<?php

// COMMIT: Marius Nisslmueller, Bad Honnef, Juni 2020

// Send Data to Database
// Database Settings
$servername = "localhost";
$username = "x";
$password = "x";
$dbname = "x";

// Establish Connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize User Input
$mowPersonalValues = mysqli_real_escape_string($conn, $_GET["mowpersonal"]);
$mowPartiesValues = mysqli_real_escape_string($conn, $_GET["mowparties"]);

// Prepare and execute SQL Statement to prevent SQL Injection
$sql = "INSERT INTO Results (ip, timest, personal, parties) VALUES (?,?,?,?)";
if($query = $conn->prepare($sql)){
    $query->bind_param('ssss',$ip, time(), $mowPersonalValues, $mowPartiesValues);
    if ($query->execute() === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }
} else {
    $error = $conn->errno . ' ' . $conn->error;
    echo $error;
}
  
$conn->close();

?>