<?php
include_once 'navbar.php';
// database connection file
require_once 'Backend/db.php';
$error = '';

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if (!empty($username) && !empty($password) && !empty($confirm_password)) {
        if ($password === $confirm_password) {
            $query = "SELECT * FROM $table WHERE username = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, 's', $username);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_num_rows($result) == 0) {
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $query = "INSERT INTO $table (username, password) VALUES (?, ?)";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, 'ss', $username, $hashed_password);
                mysqli_stmt_execute($stmt);

                if (mysqli_stmt_affected_rows($stmt) == 1) {
                    header('Location: login.php');
                    exit();
                } else {
                    $error = 'Registrierung fehlgeschlagen';
                }
            } else {
                $error = 'Benutzername bereits vorhanden';
            }
        } else {
            $error = 'Passwörter stimmen nicht überein';
        }
    } else {
        $error = 'Bitte füllen Sie alle Felder aus';
    }
}
?>

    <link href="style.css" rel="stylesheet">
    <title>Registrierung</title>
</head>

<body>
    
    <div class="col-8" id="signup-container">
        <h1>Registrierung👾</h1>
        <form action="signup.php" method="post">
            <div class="col-md-6">
                <label for="username">Benutzername:</label>
                <input type="text" placeholder="Username...🎮🕹️" name="username" id="username" required>
            </div>
                <br>
            <div class="col-md-6">
                <label for="password">Passwort:</label>
                <input type="password" placeholder="password...🤫" name="password" id="password" required>
            </div>
                <br>
            <div class="col-md-6">
                <label for="confirm_password">Passwort bestätigen:</label>
                <input type="password" placeholder="password...🤫" name="confirm_password" id="confirm_password" required>
            </div>
                <br>
            <div class="col-md-6">
                <button type="submit" name="submit" class="btn btn-info">Registrieren!</button>
            </div>
            <br>
            <div >
                <p>Haben Sie bereits ein Konto?🤔 <a href="login.php">Login!😏</a></p>
            </div>


        </form>
    </div>
    <?php
    if (!empty($error)) {
        echo '<p>' . $error . '</p>';
    }
    ?>
</body>

</html>