<?php
include_once 'navbar.php';
?>

    <title>Snake</title>
    <link rel="stylesheet" href="Snake/style.css">
    <link rel="stylesheet" href="Snake/prstartk.ttf">

</head>
<body class="background">
    <div class="container">
        <div class="gameField">
        <h1>SNAKE</h1>
        <div id="game">
            <canvas id="board" width="500" height="500"></canvas>
            <div id="scoreTxt">0</div>
            <!--
                maybe besser ein start game button
                statt dass es automatisch anfängt lol
                <button id="start">Start Game</button>
            -->
            <button class="rst" id="reset">RESET</button>
        </div>
        </div>
    </div>
    

    <script src="Snake/script.js"></script>
</body>
</html>