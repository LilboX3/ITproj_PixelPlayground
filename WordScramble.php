<?php
include_once 'navbar.php';
?>

    <link rel="stylesheet" href="WordScramble/scramble.css">
    <link rel="stylesheet" href="WordScramble/prstartk.ttf">
    <title>Word Scramble Game</title>
</head>

<body class="background">
    <div class="container">
    <div class="entername" id="scramblebox">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" id="scramblename" placeholder="be creative!"> <button id="savescramble">Save</button>
        </div>

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

            <input type="text" class="placeHolder" placeholder="Enter a valid word">

            <div class="btn">
                <button class="refresh-word">Refresh Word</button>
                <button class="check-word">Check Word</button>
            </div>
        </div>
    </div>
    <script src="WordScramble/data.js"></script>
    <script src="WordScramble/Scramble.js"></script>
</body>

</html>