<?php
include_once 'navbar.php';
?>
    <link rel="stylesheet" href="Hangman/hangman.css">
    <link rel="stylesheet" href="Hangman/prstartk.ttf">
    <title>Hangman</title>
    
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
        <div class="row">
            

            <div class="col-2"></div>

            <div class="col-8">
            <h1 style="margin-bottom:2%;">HANGMAN GAME</h1>

            <?php if(!isset($_SESSION['username'])){?>
            <div class="entername" id="hangmanbox" style="text-align: center;">
                <div style="font-size:small;">Enter your name to save your score !</div>
                <input type="text" id="hangmanname" placeholder="be creative!"> <button id="savehangman">Save</button>
            </div>
            <?php
            }?>

            <img id="hangmanpic" class="responsive" src="pics/white.png" alt="hangman">
            <div class="displayword">
                <table>
                    <tr>

                    </tr>
                </table>
            </div>

            <table>

                <tr>
                    <td><button class="btn btn-info" id="A" onclick="input('A')">A</button></td>
                    <td><button class="btn btn-info" id="B" onclick="input('B')">B</button></td>
                    <td><button class="btn btn-info" id="C" onclick="input('C')">C</button></td>
                    <td><button class="btn btn-info" id="D" onclick="input('D')">D</button></td>
                    <td><button class="btn btn-info" id="E" onclick="input('E')">E</button></td>
                    <td><button class="btn btn-info" id="F" onclick="input('F')">F</button></td>
                    <td><button class="btn btn-info" id="G" onclick="input('G')">G</button></td>
                    <td><button class="btn btn-info" id="H" onclick="input('H')">H</button></td>
                    <td><button class="btn btn-info" id="I" onclick="input('I')">I </button></td>
                </tr>

                <tr>
                    <td><button class="btn btn-info" id="J" onclick="input('J')">J</button></td>
                    <td><button class="btn btn-info" id="K" onclick="input('K')">K</button></td>
                    <td><button class="btn btn-info" id="L" onclick="input('L')">L</button></td>
                    <td><button class="btn btn-info" id="M" onclick="input('M')">M</button></td>
                    <td><button class="btn btn-info" id="N" onclick="input('N')">N</button></td>
                    <td><button class="btn btn-info" id="O" onclick="input('O')">O</button></td>
                    <td><button class="btn btn-info" id="P" onclick="input('P')">P</button></td>
                    <td><button class="btn btn-info" id="Q" onclick="input('Q')">Q</button></td>
                    <td><button class="btn btn-info" id="R" onclick="input('R')">R</button></td>
                </tr>  

                <tr>
                    <td><button class="btn btn-info" id="S" onclick="input('S')">S</button></td>
                    <td><button class="btn btn-info" id="T" onclick="input('T')">T</button></td>
                    <td><button class="btn btn-info" id="U" onclick="input('U')">U</button></td>
                    <td><button class="btn btn-info" id="V" onclick="input('V')">V</button></td>
                    <td><button class="btn btn-info" id="W" onclick="input('W')">W</button></td>
                    <td><button class="btn btn-info" id="X" onclick="input('X')">X</button></td>
                    <td><button class="btn btn-info" id="Y" onclick="input('Y')">Y</button></td>
                    <td><button class="btn btn-info" id="Z" onclick="input('Z')">Z</button></td>
                </tr>
            </table>

            <button class="btn btn-danger" id="hint" onclick="getHint()">Click for a hint!</button>
            <button class="btn btn-dark" id="new" onclick="resetGame()" style="display:none; border-radius: 0%;">Play again</button>
            </div>

            <div class="col-2"></div> 
        </div>
    </div>
</div>
<script src="Hangman/hangman.js"></script>
<script>
    function resetGame() {
        $("#hangmanpic").attr("src", "pics/white.png");
        $(".displayword table tr").empty();
        $(".btn-info").prop("disabled", false);
        $("#hint").show();
        $("#new").hide();
        mistakes = 0;
        toFind = 0;
        setupGame();
        wordLines();
    }
</script>
</body>
</html>
