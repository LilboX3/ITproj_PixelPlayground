<?php
include_once 'navbar.php';
?>
    <title>Play Pong!</title>
    
</head>
<body class="background">

<div class="container">
    <div class="row">
        <div class="col-2"></div>

        <div class="col-8" style="text-align:center;">
        <h1 id="ponghead" class="textstyle" >Play Pong</h1>
        <div class="player1 textstyle" id="pongplayer1">
            player1 Name
        </div>
        <div class="player2 textstyle" id="pongplayer2">
            player2 Name
        </div>
        <div class="entername" id="pongbox">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" style="margin-bottom:1%;"id="pongname" placeholder="olayer one"> 
                <input type="text" id="pongname2" placeholder="player two"> 
                <button id="savepong">Save</button>
            </div>
            <div id="gameMode">
                <button id="normalmode">Play Normal game mode - for beginners</button> <br> <br>
                <button id="crazymode">Play Crazy game mode - multiple balls</button> <br> <br>
                <button id="illusionmode">Play Illusion mode - only 1 ball is real</button>
                
            </div>

            <div id="gameContainer">
                <canvas id="gameBoard" width="500" height="500"></canvas>
                <div id="scoreText" style="color:white;">0 : 0</div>
                <button id="resetBtn">Reset</button>
                <button id="endBtn"> End Game</button>
            </div>

            <div id="crazyContainer">
                <canvas id="crazyBoard" width="500" height="500"></canvas>
                <div id="crazyScore" style="color:white;">0 : 0</div>
                <button id="crazyReset">Reset</button>
                <button id="crazyEnd"> End Game</button>
            </div>

            <div id="illusionContainer">
                <canvas id="illusionBoard" width="500" height="500"></canvas>
                <div id="illusionScore" style="color:white;">0 : 0</div>
                <button id="illusionReset">Reset</button>
                <button id="illusionEnd"> End Game</button>
            </div>
        </div>

    <div class="col-2"></div>
    </div>
</div>

    <!---<div id="illusionContainer">
        <canvas id="illusionBoard" width="500" height="500"></canvas>
    </div> !--->
</body>
<script src="Pong/pong.js"></script>
<script src="Pong/pong2.js"></script>
<script src="Pong/pong3.js"></script>
</html>