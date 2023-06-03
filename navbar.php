<?php
session_start();
//include_once 'includes/functions.inc.php';
//include_once 'Backend/db.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="navbar.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />

</head>

<body class="background">
    <header>

        <div class="topnav">
            <div class="centered">
            <div>
                <img src="pics/PixelPlayground_Logo.png" id="logo">
            </div>
            <div>              
                <a class="active" href="Homepage.php">Pixel Playground</a>
                <a href="login.php">Login</a>
                <a href="signup.php">Sign Up</a>
                <a href="Hangman.php">Hangman</a>
                <a href="Snake.php">Snake</a>
                <a href="Pong.php">Pong</a>
                <a href="TicTacToe.php">Tic Tac Toe</a>
                <a href="Tetris.php">Tetris</a>
                <a href="WordScramble.php">Scramble</a>
                <a href="memory.php">Memory</a>


            </div>
        </div>


        <div class="collapse navbar-collapse" id="navmenu">
            <ul class="navbar-nav ms-auto">
                <?php
                if (isset($_SESSION["username"])) //checkt falls jemand in der Session eingeloggt ist
                {
                    ?>
                    <!-- falls ein user eingelogt ist hat dieser zugang auf zimmerreservierung, profilseite und die option sich auszuloggen -->
                    <?php echo $_SESSION["username"]; ?>
                    </a></li>
                    <li class='nav-item'><a href='logout.php' class='nav-link link-info link-dark:hover'>Logout</a></li>
                    <?php
                } else {
                    ?>
                    <li class='nav-item'><a href='signup.php' class='nav-link link-info link-dark:hover'>Signup</a></li>
                    <li class='nav-item'><a href='login.php' class='nav-link link-info link-dark:hover'>Login</a></li>
                    <?php
                }
                ?>
            </ul>
        </div>
    </header>
