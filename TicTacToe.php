<?php
include_once 'navbar.php';
?>

    <link rel="stylesheet" href="TicTacToe/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="TicTacToe/prstartk.ttf">
    <title>Tic-Tac-Toe</title>
</head>

<body class="background">
    <main>
        <div class="container gameField">
        <section>
            <h1>Tic Tac Toe</h1>
        </section>
        <section class="display">
            Player <span class="display-player playerX">X</span>'s turn
        </section>
        <section class="containerField">
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
        </section>
        <section class="display announcer hide scoreTxt"></section>
        <section class="controls">
            <button id="reset">Reset</button>
        </section>
        </div>
    </main>
    <script src="TicTacToe/TicTacToe.js"></script>
</body>
