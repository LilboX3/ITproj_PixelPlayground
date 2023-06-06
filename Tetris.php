<?php
include_once 'navbar.php';
?>

    <title>Tetris</title>
    <link rel="stylesheet" href="Tetris/tetris.css">
    <link rel="stylesheet" href="Tetris/prstartk.ttf">
</head>
<body class="background">
    <div class="container">
    <div class="entername" id="tetrisbox">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" id="tetrisname" placeholder="be creative!"> <button id="savetetris">Save</button>
    </div>

        <div class="gameField">
        <div id="logo-container">
            <img src="Tetris/pics/tetrislogo.png" alt="Tetris Logo" />
        </div>
        <canvas id="tetris"></canvas>
         <script src="tetris.js"></script>
        </div>
        

    </div>
            


    <script src="Tetris/script.js"></script>
</body>
</html>
