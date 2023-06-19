<?php
include_once 'navbar.php';
?>

    <title>Tetris</title>
    <link rel="stylesheet" href="Tetris/style.css">
    <link rel="stylesheet" href="Tetris/prstartk.ttf">
</head>
<body class="background">
    <div class="container ">
        <div class="row">
            <div class="col-md-12 d-flex justify-content-center align-items-center">
            <?php if(!isset($_SESSION['username'])){?>
            <div class="entername" id="tetrisbox">
                        <div style="font-size:small;">Enter your name to save your score !</div>
                        <input type="text" id="tetrisname" placeholder="be creative!"> 
                        <button id="savetetris">Save</button>
            </div>
        </div>
        <?php }?>
        </div>

            <div class="gameField d-flex justify-content-center align-items-center">
                <!--<div id="logo-container">
                <img src="Tetris/pics/tetrislogo.png" alt="Tetris Logo" />
                </div>-->
                <div class="mt-5 mb-5">
                <canvas id="tetris"></canvas>
                </div>
            </div><
    </div>
            


    <script src="Tetris/script.js"></script>
</body>
</html>
