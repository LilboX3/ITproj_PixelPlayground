<?php
$servername = "localhost"; // Or enter your server name here
$username = "bif2webscriptinguser"; // Enter your MySQL username here
$password = "bif2021"; // Enter your MySQL password here
$dbname = "PixelPlayground"; // Enter your database name here

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$table = "highscore";

$columns = array("Username", "HighScore", "Game");

$query = "SELECT " . implode(",", $columns) . " FROM " . $table;

$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

while ($row = mysqli_fetch_assoc($result)) {
    echo "Username: " . $row["Username"] . ", HighScore: " . $row["HighScore"] . ", Game: " . $row["Game"] . "<br>";
}

mysqli_close($conn);
