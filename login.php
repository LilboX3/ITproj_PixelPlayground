<?php
session_start();

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
                    header('Location: index.php');
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

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>

<body>
    <h1>Login</h1>
    <form action="login.php" method="post">
        <label for="username">Benutzername:</label>
        <input type="text" name="username" id="username" required>
        <br>
        <label for="password">Passwort:</label>
        <input type="password" name="password" id="password" required>
        <br>
        <input type="submit" name="submit" value="Login">
    </form>
    <?php
    if (!empty($error)) {
        echo '<p>' . $error . '</p>';
    }
    ?>
    <p>Noch kein Konto? <a href="signup.php">Registrieren</a></p>
    <p><a href="index.php">Home</a></p>

</body>

</html>