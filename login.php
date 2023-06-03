<?php
include_once 'navbar.php';


// database connection file
require_once 'Backend/db.php';


$error = '';

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (!empty($username) && !empty($password)) {
        $query = "SELECT * FROM users WHERE username = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, 's', $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $num_rows = mysqli_num_rows($result);
        if ($num_rows >= 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                if (password_verify($password, $row['password'])) {
                    $_SESSION['username'] = $row['username'];
                    $_SESSION['user_id'] = $row['id']; // Add user ID to the session
                    header('Location: Homepage.php');
                    exit();
                } else {
                    var_dump(password_verify($password, $row['password']));
                }
            }
            $error = 'Falsches Passwort';
        } else {
            $error = 'Benutzername nicht gefunden';
        }
    }
}
?>

    <link href="style.css" rel="stylesheet">
    <title>Login</title>
</head>

<body>
    <div class="container" id="login-container">
        <div class="signup-form-form">
            <h1 class="pt-3 mb-3">Login👾</h1>
            <form action="login.php" method="post">

                <div class="col-md-6">
                    <label for="username">Benutzername:</label>
                    <input type="text" placeholder="Username...🎮🕹️" name="username" id="username" required>                
                </div>
                <div class="col-md-6">
                    <br>
                    <label for="password">Passwort:</label>
                    <input type="password" placeholder="secret code...shh" name="password" id="password" required>
                </div>
                
                <div class="col-12 pb-3">
                    <br>
                    <button type="submit" name="submit" class="btn btn-info">Login!</button>
                </div>
                <!-- konto erstellen -->
                <div>
                    <p>Noch kein Konto?!😱 <a href="signup.php"><br>Registrieren!</a></p>
                </div>
            </form>
    
        </div>
        <?php
        if (!empty($error)) {
            echo '<p>' . $error . '</p>';
        }
        ?>
        
    </div>
</body>

</html>
