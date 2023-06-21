<?php
include_once 'navbar.php';
?>

    <title>Snake</title>
    <link rel="stylesheet" href="Snake/style.css">
    <link rel="stylesheet" href="Snake/prstartk.ttf">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

</head>
<body class="background">
    <div class="container">
    <div id="scoreboard" class="scoreboard">
        <div class="score-label">SCORE:....<span id="score">0</span></div>
    </div>
    <div id="topfive" class="topfive">
         <span id="top5score"></span>
    </div>

    <?php if(!isset($_SESSION['username'])){?>
        <div class="entername" id="snakebox">
                    <div style="font-size:small;">Enter your name to save your score !</div>
                    <input type="text" id="snakename" placeholder="be creative!"> <button id="savesnake">Save</button>
        </div>
    <?php }?>

    <?php 
            if (isset($_SESSION['username'])){ ?>
                    <script>
                        var username = '<?php echo $_SESSION['username']; ?>';
                        console.log("Current username inside .php : ", username);
                    </script>
                    <?php 
                } 
        ?>

        <div class="gameField" id="mode">
            <div style="padding-top:10%; padding-bottom:20%; text-align: center">
            <h1>Choose a game mode:</h1>
            <br><br>
            <button class="ezBtn" id="easy">Easy</button>
            <button class="normBtn" id="normal">Normal</button>
            <button class="hardBtn" id="hard">Hard</button>
            </div>
        </div>

        <div class="gameField" id="gameField" style="display:none">
        <h1>SNAKE</h1>
        <div id="game">
            <canvas id="board" width="500" height="500"></canvas>
            <div id="scoreTxt">0</div>
            <button class="rst" id="reset">RESET</button>
        </div>
        </div>
    </div>
    

    <script src="Snake/script.js"></script>
    
</body>
</html>
