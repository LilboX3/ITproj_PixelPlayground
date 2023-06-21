<?php

require_once '../Backend/db.php';

$gameName = isset($_POST['game']) ? $_POST['game'] : '';

if (!empty($gameName)) {
    $getHighScoresQuery = "SELECT u.username, h.score
                           FROM highscore h
                           INNER JOIN users u ON h.user_id = u.id
                           INNER JOIN game g ON h.game_id = g.id
                           WHERE g.name = '$gameName'
                           ORDER BY h.score DESC
                           LIMIT 5";
    $result = $conn->query($getHighScoresQuery); 
    
    if ($result->num_rows > 0) {
        $highScores = [];
        while($row = $result->fetch_assoc()) {
            $highScores[] = ['username' => $row['username'], 'score' => $row['score']];
        }
        echo json_encode($highScores);
    } else {
        echo "No high scores found for this game.";
    }
} else {
    echo "Game name is required.";
}

$conn->close();
?>
