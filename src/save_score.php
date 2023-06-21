<?php
$servername = "localhost";
$username = "bif2webscriptinguser"; 
$password = "bif2021"; 
$dbname = "PixelPlayground"; 

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Retrieve the score from the AJAX request
$score = $_POST['score'];

// Save the score in the database
$sql = "UPDATE game SET highscore = GREATEST(highscore, $score), playedcount = playedcount + 1 WHERE name = '$gameName'";

if ($conn->query($sql) === TRUE) {
  echo "Score saved successfully.";
} else {
  echo "Error: " . $conn->error;
}

$conn->close();
?>
