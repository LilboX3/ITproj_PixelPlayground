<?php
$servername = "localhost";
$username = "bif2webscriptinguser";
$password = "bif2021";
$dbname = "PixelPlayground";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
