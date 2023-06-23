var username = document.querySelector("#player1name").innerHTML;
console.log("Current username: ", username);

const gameBoard = document.querySelector("#gameBoard");

//verstecken, bis game Mode ausgewählt wurde
document.querySelector("#gameContainer").style.display = 'none';
document.querySelector("#crazyContainer").style.display = 'none';
document.querySelector("#illusionContainer").style.display = 'none';

document.getElementById('endBtn').onclick = function(){
    document.querySelector("#gameMode").style.display = 'block';
    document.querySelector("#gameContainer").style.display = 'none';
    document.getElementById("ponghead").innerHTML = 'Play Pong';
    console.log("game ended");
}

//Normalmode 
document.getElementById('normalmode').onclick = function() {
    resetGame();
    document.getElementById("ponghead").innerHTML = 'Normal Pong';
    document.querySelector("#gameMode").style.display = 'none';
    document.querySelector("#gameContainer").style.display = 'block';
}

function updateScore(newScore) {
    document.getElementById('score').innerHTML = newScore;
}

function updateHighScores() {
    $.ajax({
        url: '/ITproj_PixelPlayground-master/src/topfivescores.php',  // adjust this path to the location of your PHP script
        type: 'POST',
        data: { game: 'Pong' },  // replace 'Hangman' with your game's name
        success: function(data) {
            var highScores = JSON.parse(data);
            var scoresHTML = '';
            for (var i = 0; i < highScores.length; i++) {
                scoresHTML += '<p class="top5score">' + highScores[i].username + '........' + highScores[i].score + '</p>';
            }
            document.getElementById('topfive').innerHTML = scoresHTML;
        }
    });
}
    //Auf dem Kontext wird "gezeichnet"
    const ctx = gameBoard.getContext("2d");
    const scoreText = document.querySelector("#scoreText");
    const resetBtn = document.querySelector("#resetBtn");
    const gameWidth = gameBoard.width;
    const gameHeight = gameBoard.height;

    /* Farben alle änderbar */
    //Hintergrundfarbe
    const boardBackground = "black";
    //Spieler 1 Farbe
    const paddle1Color = "lightblue";
    //Spieler 2 Farbe
    const paddle2Color = "magenta";
    //spieler outline
    const paddleBorder = "black";
    //Ballfarbe
    const ballColor = "purple";
    //Ball outline farbe
    const ballBorderColor = "black";

    //Größe des balles dann 25 durchmesser
    const ballRadius = 12.5;
    //Spieler paddles distanz die sie bewegen
    const paddleSpeed = 25;

    let intervalID;
    let ballSpeed = 1; //lowest speed
    //Ball beginnt in der Mitte
    let ballX = gameWidth / 2;
    let ballY = gameHeight / 2;
    let ballXDirection = 0;
    let ballYDirection = 0;

    let player1Score = 0;
    let player2Score = 0;

    //1. paddle beginnt top left
    let paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    //2. paddle beginnt rechts unten
    let paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25, //da selbst Breite 25, sichtbar 
        y: gameHeight - 100 //da selbst Höhe 100, sichtbar
    };

    //wenn eine Taste gedrückt wird: changeDirection aufrufen, um paddles zu bewegen
    window.addEventListener("keydown", changeDirection);
    //wenn Reset button geklickt wird, das game von neu starten
    resetBtn.addEventListener("click", resetGame);

    //Game Mode auswählen?

    /* CANVAS:
    ----------------->  max Width
    |               x
    |
    |
    |
    |
    |
    v y
    max Height
    */

    gameStart();

    //Ball wird erstellt mit random Richtung, dann Spielablauf aufgerufen
    function gameStart(){
        updateHighScores();
        createBall();
        nextTick();
    }

    //Alle 10 ms wiederholen für flüssigen Spielablauf
    function nextTick(){
        intervalID = setTimeout(()=>{
            clearBoard();
            drawPaddles();
            moveBall();
            drawBall(ballX, ballY);
            checkCollision();
            nextTick();
        }, 10);
    }

    //redraw the board
    function clearBoard(){
        ctx.fillStyle = boardBackground;
        ctx.fillRect(0, 0, gameWidth, gameHeight);
    }

    function  drawPaddles(){
        ctx.strokeStyle = paddleBorder;

        ctx.fillStyle = paddle1Color;
        ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);//x, y, width, height
        ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

        ctx.fillStyle = paddle2Color;
        ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);//x, y, width, height
        ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    }

    function createBall(){
        ballSpeed = 1;
        //Zufallszahl erstellen, wenn 1 nach rechts, sonst links
        if(Math.round(Math.random())==1){
            ballXDirection = 1; //width +1 bewegt RECHTS
        }
        else {
            ballXDirection = -1; //width -1 bewegt LINKS
        }
        if(Math.round(Math.random())==1){
            ballYDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
        }
        else {
            ballYDirection = Math.random()*-1;
        }
            
        //Ball in die Mitte setzen
        ballX = gameWidth / 2;
        ballY = gameHeight / 2;
        drawBall(ballX, ballY);
    }

    function moveBall(){
        ballX += (ballSpeed * ballXDirection); //um ballSpeed Felder nach links oder rechts bewegen 
        ballY += (ballSpeed * ballYDirection);
    }

    //Den Ball zeichnen: AUSSEHEN BALL BEI VARIABLEN ÄNDERN (ballColor, ballBorderColor)
    function drawBall(ballX, ballY){
        ctx.fillStyle = ballColor;
        ctx.strokeStyle = ballBorderColor;
        ctx.lineWidth = 2;
        ctx.beginPath(); //man muss path beginnen, um linie/form zu zeichnen (immer neu beginnen für mehrere)
        ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI); //einen Kreis zeichnen an Stelle x und y, 2*pi für Kreis Umfang zeichnen
        ctx.stroke(); //Linie zeichnen
        ctx.fill(); //ball mit Farbe füllen
    }

    //Fenster um Namen einzugeben
document.getElementById("savepong").onclick = function(){
    isLoggedIn(document.querySelector("#pongname").value);
    secondPlayer(document.querySelector("#pongname2").value);
    document.getElementById("pongplayer1").innerHTML = document.querySelector("#pongname").value;
    document.getElementById("pongplayer2").innerHTML = document.querySelector("#pongname2").value;
    document.querySelector("#pongbox").style.display = 'none';
}

//eingeloggt, aber namen vom 2 spieler eingegeben
function saveSecond(){
    username2=document.querySelector("#pongname2nd").value;
    document.getElementById("pongplayer2").innerHTML = document.querySelector("#pongname2nd").value;
    document.querySelector("#pongbox2").style.display = 'none';
}

    function isLoggedIn($pongname1) {
        $.ajax({
            url: "./src/check_login.php",
            type: "GET",
            success: function(response) {
                if (response === "true") {
                    console.log("User is logged in");
                    // User is logged in, continue with the game
                } else {
                    console.log("User is not logged in");
                        //pop up to ask for name if the player isnt logged in
                    username = $pongname1;
                    if (username == null || username.trim() == "") {
                        console.log("Username is required.");
                        return;
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error("Error checking login status: " + error);
            }
        });
    }

    function secondPlayer($pongname2) {
        $.ajax({
            url: "./src/check_login.php",
            type: "GET",
            success: function(response) {
                if (response === "true") {
                    console.log("User is logged in");
                    // User is logged in, continue with the game
                } else {
                    console.log("User is not logged in");
                        //pop up to ask for name if the player isnt logged in
                    username2 = $pongname2;
                    if (username2 == null || username2.trim() == "") {
                        console.log("Username is required.");
                        return;
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error("Error checking login status: " + error);
            }
        });
    }

    function checkCollision(){
        //+radius, da y koordinate in zentrum des kreis ist
        if(ballY <= 0 + ballRadius){
            ballYDirection *= -1; //Richtung "negieren"
        }
        if(ballY >= gameHeight - ballRadius){
            ballYDirection *= -1; //Richtung "negieren"
        }

        //LINKS Tor!!! player2 bekommt punkt 
        if(ballX <= 0){
            player2Score +=1;
            updateHighScores();
            $.ajax({
                url: "/ITproj_PixelPlayground-master/src/highscore.php",
                type: "POST",
                async: false,
                data: { username: username2, score: player2Score, game: "Pong" },
                success: function(response) {
                    console.log("score sent <3");
                },
                error: function(xhr, status, error) {
                    console.error("Error sending score :( " + error);
                }
            });
            updateScore();
            createBall(); //neuen Ball erstellen
            return;
        }

        //RECHTS Tor!!! player1 bekommt punkt
        if(ballX >= gameWidth){
            player1Score +=1;
            updateHighScores();
            $.ajax({
                url: "/ITproj_PixelPlayground-master/src/highscore.php",
                type: "POST",
                async: false,
                data: { username: username, score: player1Score, game: "Pong" },
                success: function(response) {
                    console.log("score sent <3");
                },
                error: function(xhr, status, error) {
                    console.error("Error sending score :( " + error);
                }
            });
            updateScore();
            createBall();
            return;
        }

        //CHECKEN ob paddles Ball treffen  v v v v
        if(ballX <= (paddle1.x + paddle1.width +ballRadius)){
            if(ballY > paddle1.y && ballY < (paddle1.y+paddle1.height)){
                //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
                ballX = (paddle1.x + paddle1.width) + ballRadius;
                ballXDirection *= -1; //Richtung "negieren";
                ballSpeed +=1;
            }

        }

        if(ballX >= (gameWidth - paddle2.width - ballRadius)){
            if(ballY > paddle2.y && ballY < (paddle2.y+paddle2.height)){
                //UNSTUCK BALL: setz ihn auf paddle2 anfang
                ballX = paddle2.x - ballRadius;
                ballXDirection *= -1; //Richtung "negieren";
                ballSpeed +=1;
            }

        }
        
    }

    //Die beiden Paddles bewegen
    function changeDirection(event){
        const keyPressed = event.keyCode;
        console.log(keyPressed); //P1: w = 87, a = 65, s = 83, d = 68 ---- P2: up = 38, left = 37, right = 39, down = 40
        const paddle1Up = 87;
        const paddle1Down = 83;

        const paddle2Up = 73;
        const paddle2Down = 75;
        
        //je nach gepressten key dieses paddle oben/unten bewegen (man kann nur 1 gedrückt halten :/)
        switch(keyPressed){
            case(paddle1Up):
                if(paddle1.y > 0){
                    paddle1.y -= paddleSpeed; //y height geht nach unten, deswegen -= um nach oben zu gehn
                }
                break;

            case(paddle1Down):
                if(paddle1.y < gameHeight-paddle1.height){
                paddle1.y += paddleSpeed;
                }
                break;

            case(paddle2Up):
                if(paddle2.y > 0){
                    paddle2.y -= paddleSpeed;
                }
                break;

            case(paddle2Down):
                if(paddle2.y < gameHeight-paddle2.height){
                    paddle2.y += paddleSpeed;
                }
                break;
        }
    }

    function updateScore(){
        scoreText.innerHTML = player1Score + " : " + player2Score;
    }

    //spiel neustarten
    function resetGame(){
        player1Score = 0;
        player2Score = 0;
        updateScore();

        //RESET PADDLES
        paddle1 = {
            width: 25,
            height: 100,
            x: 0,
            y: 0
        };
        paddle2 = {
            width: 25,
            height: 100,
            x: gameWidth - 25, //da selbst Breite 25, sichtbar 
            y: gameHeight - 100 //da selbst Höhe 100, sichtbar
        };

        //RESET BALL
        ballSpeed = 1;
        ballX = 0;
        ballY = 0;
        ballXDirection = 0;
        ballYDirection = 0;
        updateScore();

        //Intervall clearen wenn so machen: gameStart() nochmal aufrufen
        clearInterval(intervalID);
        gameStart();
        
    }
   

//-------------------------------NORMAL MODE END -----------------------------

