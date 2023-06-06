<?php
include_once 'navbar.php';
?>

    <title>Tetris</title>
    <link rel="stylesheet" href="Tetris/tetris.css">
    <link rel="stylesheet" href="Tetris/prstartk.ttf">
</head>
<body class="background">
    <div class="container">
    <div class="entername" id="hangmanbox">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" id="hangmanname" placeholder="be creative!"> <button id="savehangman">Save</button>
    </div>

        <div class="gameField">
            <h1>Tetris</h1>
            <canvas id="tetris"></canvas>
        </div>
        

    </div>
            


    <script src="Tetris/script.js"></script>
</body>
</html>
