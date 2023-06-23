<?php
include_once 'navbar.php';
?>

    <title>Tetris</title>
    <link rel="stylesheet" href="Tetris/style.css">
    <link rel="stylesheet" href="Tetris/prstartk.ttf">
</head>
<body class="background">
    <div class="parent-flex-container">
        
        <div id="scoreboard" class="scoreboard">
            <div class="score-label">SCORE:....<span id="score">0</span></div>
        </div>
        <div id="topfive" class="topfive">
            <span id="top5score"></span>
        </div>    

        <div class="container ">
            <div class="row">
                <?php 
                    if (isset($_SESSION['username'])){ ?>
                        <script>
                            var username = '<?php echo $_SESSION['username']; ?>';
                            console.log("Current username inisde .php: ", username);
                        </script>
                        <?php 
                    } 
                ?>
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
                    <div class="row">
                        <div class="col-12 mt-5 mb-2 d-flex justify-content-center align-items-center">
                            <canvas canvas id="tetris"></canvas>
                        </div>
                        <div class="col-6 d-flex justify-content-center align-items-center">
                            <button id="playButton" class="playBtn">Start Game</button>
                        </div>
                        <div class="col-6 d-flex justify-content-center align-items-center">
                            <button id="resetButton" class="playBtn">Reset Game</button>
                        </div>
                    </div><
                </div>    
        </div>
    </div>        


    <script src="Tetris/script.js"></script>
</body>
</html>
