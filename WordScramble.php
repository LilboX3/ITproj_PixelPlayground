<?php
include_once 'navbar.php';
?>

<link rel="stylesheet" href="WordScramble/scramble.css">
<link rel="stylesheet" href="WordScramble/prstartk.ttf">
<title>Word Scramble Game</title>
</head>

<body class="background">
    <div class="parent-flex-container">

        <div id="scoreboard" class="scoreboard">
            <div class="score-label">SCORE:....<span id="score">0</span></div>
        </div>
        <div id="topfive" class="topfive">
            <span id="top5score"></span>
        </div>  
        
        <div class="container">
        <?php 
                if (isset($_SESSION['username'])){ ?>
                    <script>
                        var username = '<?php echo $_SESSION['username']; ?>';
                        console.log("Current username inside .php : ", username);
                    </script>
                    <?php 
                } 
        ?>
        <?php if(!isset($_SESSION['username'])){?>
            <div class="entername" id="scramblebox">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" id="scramblename" placeholder="be creative!"> <button id="savescramble">Save</button>
            </div>
            <?php }?>

            <header>
                <h2>Word Scramble Game</h2>
                <h5 class="num">Number of plays: <span></span></h5>
                <h5 class="score">Score: <span></span></h5>
            </header>

            <div class="content">
                <div class="word"></div>

                <div class="detail">
                    <p class="hint">Hint: <span></span></p>
                    <p class="time">Time Left: <span><b></b>s</span></p>
                </div>

                <input type="text" class="placeHolder" id="input" placeholder="Enter a valid word">

                <div class="btn">
                    <button class="refresh-word">Refresh Word</button>
                    <button class="check-word">Check Word</button>
                    <button class="levelbtn" data-level="0">Level 1</button>
                    <button class="levelbtn" data-level="1">Level 2</button>
                    <button class="levelbtn" data-level="2">Level 3</button>
                </div>
            </div>
        </div>
    </div>
    <script src="WordScramble/data.js"></script>
    <script src="WordScramble/Scramble.js"></script>
</body>

</html>
