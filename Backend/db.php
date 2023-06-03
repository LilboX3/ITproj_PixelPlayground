<?php
$servername = "localhost";
$username = "bif2webscriptinguser";
$password = "bif2021";
$dbname = "PixelPlayground";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$username = isset($_POST['username']) ? $_POST['username'] : '';
$score = isset($_POST['score']) ? $_POST['score'] : '';
$gameName = isset($_POST['game']) ? $_POST['game'] : '';

if (!empty($username)) {
    // User is logged in or entered a username
    $userExists = false;
    
    // Check if the username already exists
    $checkUsernameQuery = "SELECT id FROM users WHERE username = '$username'";
    $result = $conn->query($checkUsernameQuery);
    
    if ($result->num_rows > 0) {
        // Username already exists, use the existing user
        $userExists = true;
        $row = $result->fetch_assoc();
        $userId = $row['id'];
    }
    
    if (!$userExists) {
        // Create a new user
        $createUserQuery = "INSERT INTO users (username) VALUES ('$username')";
        if ($conn->query($createUserQuery) === TRUE) {
            $userId = $conn->insert_id;
        } else {
            echo "Error creating new user: " . $conn->error;
            exit();
        }
    }
    
    $sql = "INSERT INTO highscore (game_id, user_id, score) 
            VALUES (
                (SELECT id FROM game WHERE name = '$gameName'),
                '$userId',
                $score
            )";
} 

if ($conn->query($sql) === TRUE) {
    echo "Score saved successfully.";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
