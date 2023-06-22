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
        <div class="parent-flex-container">
            <div id="topfive" class="topfive">
                <span id="top5score"></span>
            </div>    
            <div class="container gameField">
                <?php 
                    if (isset($_SESSION['username'])){ ?>
                        <script>
                            var username1 = '<?php echo $_SESSION['username']; ?>';
                            console.log("Current username inisde .php: ", username1);
                        </script>
                        <?php 
                    } 
                ?>
                <?php if(!isset($_SESSION['username'])){?>
                    <script>
                        var username1 = "";
                    </script>
                <div class="entername" id="tictactoebox">
                    <div style="font-size:small;">Enter your name to save your score !</div>
                    <input type="text" style="margin-bottom:1%;" id="tictactoename" placeholder="Player X">
                    <input type="text" id="tictactoename2" placeholder="Player O">
                    <button id="savetictactoe" onclick="savePlayers()">Save</button>
                </div>
                <?php } else {?>
                    <div class="entername" id="tictactoebox2" >
                        <div style="font-size:small;">Enter 2nd player name to save your score !</div>
                        <input type="text" id="tictactoename2nd" placeholder="player two"> 
                        <button id="savetictactoe2" onclick="savePlayer2()"> Save </button>
                    </div>
                    <?php }?>

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
                    <button id="changeSymbolPowerUp">Symbol ändern</button>
                    <button id="flipHorizontal">Flip Horizontal</button>
                    <button id="flipVertical">Flip Vertical</button>
                    <button id="enableKI">KI-aktif</button>
                    <button id="disableAI">KI deaktivieren</button>
                </section>
            </div>
        </div>        
    </main>
    <script src="TicTacToe/TicTacToe.js"></script>
</body>

</html>
