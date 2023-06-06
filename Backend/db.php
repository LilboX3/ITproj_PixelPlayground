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
    
    // Check if the username already exists
    $checkUsernameQuery = "SELECT id FROM users WHERE username = '$username'";
    $result = $conn->query($checkUsernameQuery);
    
    if ($result->num_rows > 0) {
        // Username already exists, use the existing user
        $row = $result->fetch_assoc();
        $userId = $row['id'];
    } else {
        // Create a new user
        $createUserQuery = "INSERT INTO users (username) VALUES ('$username')";
        if ($conn->query($createUserQuery) === TRUE) {
            $userId = $conn->insert_id;
        } else {
            echo "Error creating new user: " . $conn->error;
            exit();
        }
    }
    
    // Check if the user already has a score for the given game
    $checkScoreQuery = "SELECT score FROM highscore WHERE user_id = '$userId' AND game_id = (SELECT id FROM game WHERE name = '$gameName')";
    $result = $conn->query($checkScoreQuery);
    
    if ($result->num_rows > 0) {
        // User has a previous score for the game
        $row = $result->fetch_assoc();
        $previousScore = $row['score'];
        
        if ($score <= $previousScore) { 
            // New score is not higher, do not save it
            echo "Score not saved. User already has a higher score for this game.";
            exit();
        } else {
            // New score is higher, update the existing score
            $updateScoreQuery = "UPDATE highscore SET score = '$score' WHERE user_id = '$userId' AND game_id = (SELECT id FROM game WHERE name = '$gameName')";
            if ($conn->query($updateScoreQuery) === FALSE) {
                echo "Error updating score: " . $conn->error;
                exit();
            }
        }
    } else {
        // User does not have a previous score for the game, insert a new score
        $insertScoreQuery = "INSERT INTO highscore (game_id, user_id, score) 
                             VALUES ((SELECT id FROM game WHERE name = '$gameName'), '$userId', '$score')";
        if ($conn->query($insertScoreQuery) === FALSE) {
            echo "Error inserting score: " . $conn->error;
            exit();
        }
    }

    echo "Score saved successfully.";
} else {
    echo "Username is required.";
}

$conn->close();
?>
