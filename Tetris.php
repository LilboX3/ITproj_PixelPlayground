<?php
include_once 'navbar.php';
?>

    <title>Tetris</title>
    <link rel="stylesheet" href="Tetris/style.css">
    <link rel="stylesheet" href="Tetris/prstartk.ttf">
</head>
<body class="background">
    <div class="container">
    <?php if(!isset($_SESSION['username'])){?>
    <div class="entername" id="tetrisbox">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" id="tetrisname" placeholder="be creative!"> 
                <button id="savetetris">Save</button>
    </div>
    <?php }?>

        <div class="gameField">
        <div id="logo-container">
            <img src="Tetris/pics/tetrislogo.png" alt="Tetris Logo" />
        </div>
        <canvas id="tetris"></canvas>
        </div>
        

    </div>
            


    <script src="Tetris/script.js"></script>
</body>
</html>
