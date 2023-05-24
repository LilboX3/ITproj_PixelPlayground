const gameBoard = document.querySelector("#gameBoard");
//verstecken, bis game Mode ausgewählt wurde
document.querySelector("#gameContainer").style.display = 'none';
document.querySelector("#crazyContainer").style.display = 'none';


//Normalmode 
document.getElementById('normalmode').onclick = function() {
    resetGame();
    document.querySelector("#gameMode").style.display = 'none';
    document.querySelector("#gameContainer").style.display = 'block';
}

    //Auf dem Kontext wird "gezeichnet"
    const ctx = gameBoard.getContext("2d");
    const scoreText = document.querySelector("#scoreText");
    const resetBtn = document.querySelector("#resetBtn");
    const gameWidth = gameBoard.width;
    const gameHeight = gameBoard.height;

    /* Farben alle änderbar */
    //Hintergrundfarbe
    const boardBackground = "forestgreen";
    //Spieler 1 Farbe
    const paddle1Color = "lightblue";
    //Spieler 2 Farbe
    const paddle2Color = "red";
    //spieler outline
    const paddleBorder = "black";
    //Ballfarbe
    const ballColor = "yellow";
    //Ball outline farbe
    const ballBorderColor = "black";

    //Größe des balles dann 25 durchmesser
    const ballRadius = 12.5;
    //Spieler paddles distanz die sie bewegen
    const paddleSpeed = 15;

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
            updateScore();
            createBall(); //neuen Ball erstellen
            return;
        }

        //RECHTS Tor!!! player1 bekommt punkt
        if(ballX >= gameWidth){
            player1Score +=1;
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

        const paddle2Up = 38;
        const paddle2Down = 40;
        
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
    document.getElementById('endBtn').onclick = function(){
        document.querySelector("#gameMode").style.display = 'block';
        document.querySelector("#gameContainer").style.display = 'none';
        console.log("game ended");
    }

//-------------------------------NORMAL MODE END -----------------------------

//Crazy game mode:
document.getElementById('crazymode').onclick = function() {
    crazyresetGame();
    document.querySelector("#gameMode").style.display = 'none';
    document.querySelector("#crazyContainer").style.display = 'block';
    console.log("balls");
}

const crazyBoard = document.querySelector("#crazyBoard");

//Auf dem Kontext wird "gezeichnet"
const crazyctx = crazyBoard.getContext("2d");
const crazyScore = document.querySelector("#crazyScore");
const crazyReset = document.querySelector("#crazyReset");
const crazyWidth = crazyBoard.width;
const crazyHeight = crazyBoard.height;

/* Farben gleich wie die oberen */


//Größe des balles dann 25 durchmesser
const crazyRadius = 12.5;
//Spieler paddles distanz die sie bewegen
const crazyPaddleSpeed = 15;

let crazyIntervalID;
let crazyBallSpeed = 1; //lowest speed

//Ball beginnt in der Mitte
//BALL 1
let crazyBallX = crazyWidth / 2;
let crazyBallY = crazyHeight / 2;
let crazyBallXDirection = 0;
let crazyBallYDirection = 0;

//BALL 2
let crazyBall2X = crazyWidth / 2;
let crazyBall2Y = crazyHeight / 2;
let crazyBall2XDirection = 0;
let crazyBall2YDirection = 0;

//BALL 3
let crazyBall3X = crazyWidth / 2;
let crazyBall3Y = crazyHeight / 2;
let crazyBall3XDirection = 0;
let crazyBall3YDirection = 0;

let crazyPlayer1Score = 0;
let crazyPlayer2Score = 0;

//1. paddle beginnt top left
let crazyPaddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
//2. paddle beginnt rechts unten
let crazyPaddle2 = {
    width: 25,
    height: 100,
    x: crazyWidth - 25, //da selbst Breite 25, sichtbar 
    y: crazyHeight - 100 //da selbst Höhe 100, sichtbar
};

//wenn eine Taste gedrückt wird: changeDirection aufrufen, um paddles zu bewegen
window.addEventListener("keydown", crazychangeDirection);
//wenn Reset button geklickt wird, das game von neu starten
crazyReset.addEventListener("click", crazyresetGame);

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

crazygameStart();

//Ball wird erstellt mit random Richtung, dann Spielablauf aufgerufen
function crazygameStart(){
    crazycreateBalls();
    crazynextTick();
}

//Alle 10 ms wiederholen für flüssigen Spielablauf
function crazynextTick(){
    crazyIntervalID = setTimeout(()=>{
        crazyclearBoard();
        crazydrawPaddles();
        crazymoveBall();
        crazydrawBall(crazyBallX, crazyBallY);
        crazydrawBall(crazyBall2X, crazyBall2Y);
        crazydrawBall(crazyBall3X, crazyBall3Y);
        crazycheckCollision();
        crazynextTick();
    }, 10);
}

//redraw the board
function crazyclearBoard(){
    crazyctx.fillStyle = boardBackground;
    crazyctx.fillRect(0, 0, crazyWidth, crazyHeight);
}

function  crazydrawPaddles(){
    crazyctx.strokeStyle = paddleBorder;

    crazyctx.fillStyle = paddle1Color;
    crazyctx.fillRect(crazyPaddle1.x, crazyPaddle1.y, crazyPaddle1.width, crazyPaddle1.height);//x, y, width, height
    crazyctx.strokeRect(crazyPaddle1.x, crazyPaddle1.y, crazyPaddle1.width, crazyPaddle1.height);

    crazyctx.fillStyle = paddle2Color;
    crazyctx.fillRect(crazyPaddle2.x, crazyPaddle2.y, crazyPaddle2.width, crazyPaddle2.height);//x, y, width, height
    crazyctx.strokeRect(crazyPaddle2.x, crazyPaddle2.y, crazyPaddle2.width, crazyPaddle2.height);
}

function crazycreateBalls(){
    crazyBallSpeed = 1;
    //Zufallszahl erstellen, wenn 1 nach rechts, sonst links
    if(Math.round(Math.random())==1){
        crazyBallXDirection = 1; //width +1 bewegt RECHTS
    }
    else {
        crazyBallXDirection = -1; //width -1 bewegt LINKS
    }
    if(Math.round(Math.random())==1){
        crazyBallYDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
    }
    else {
        crazyBallYDirection = Math.random()*-1;
    }

    //Ball 2
    if(Math.round(Math.random())==1){
        crazyBall2XDirection = 1; //width +1 bewegt RECHTS
    }
    else {
        crazyBall2XDirection = -1; //width -1 bewegt LINKS
    }
    if(Math.round(Math.random())==1){
        crazyBall2YDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
    }
    else {
        crazyBall2YDirection = Math.random()*-1;
    }

    //Ball 3
    if(Math.round(Math.random())==1){
        crazyBall3XDirection = 1; //width +1 bewegt RECHTS
    }
    else {
        crazyBall3XDirection = -1; //width -1 bewegt LINKS
    }
    if(Math.round(Math.random())==1){
        crazyBall3YDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
    }
    else {
        crazyBall3YDirection = Math.random()*-1;
    }
        
    //Ball in die Mitte setzen
    crazyBallX = crazyWidth / 2;
    crazyBallY = crazyHeight / 2;
    
    crazyBall2X = crazyWidth / 2;
    crazyBall2Y = crazyHeight / 2;

    crazyBall3X = crazyWidth / 2;
    crazyBall3Y = crazyHeight / 2;
    crazydrawBall(crazyBallX, crazyBallY);
    crazydrawBall(crazyBall2X, crazyBall2Y);
    crazydrawBall(crazyBall3X, crazyBall3Y);
}

function crazymoveBall(){
    crazyBallX += (crazyBallSpeed * crazyBallXDirection); //um ballSpeed Felder nach links oder rechts bewegen 
    crazyBallY += (crazyBallSpeed * crazyBallYDirection);

    crazyBall2X += (crazyBallSpeed * crazyBall2XDirection); //um ballSpeed Felder nach links oder rechts bewegen 
    crazyBall2Y += (crazyBallSpeed * crazyBall2YDirection);

    crazyBall3X += (crazyBallSpeed * crazyBall3XDirection); //um ballSpeed Felder nach links oder rechts bewegen 
    crazyBall3Y += (crazyBallSpeed * crazyBall3YDirection);
}

//Den Ball zeichnen: AUSSEHEN BALL BEI VARIABLEN ÄNDERN (ballColor, ballBorderColor)
function crazydrawBall(crazyBallX, crazyBallY){
    crazyctx.fillStyle = ballColor;
    crazyctx.strokeStyle = ballBorderColor;
    crazyctx.lineWidth = 2;
    crazyctx.beginPath(); //man muss path beginnen, um linie/form zu zeichnen (immer neu beginnen für mehrere)
    crazyctx.arc(crazyBallX, crazyBallY, crazyRadius, 0, 2*Math.PI); //einen Kreis zeichnen an Stelle x und y, 2*pi für Kreis Umfang zeichnen
    crazyctx.stroke(); //Linie zeichnen
    crazyctx.fill(); //ball mit Farbe füllen
}


function crazycheckCollision(){
    //+radius, da y koordinate in zentrum des kreis ist
    if(crazyBallY <= 0 + crazyRadius){
        crazyBallYDirection *= -1; //Richtung "negieren"
    }
    if(crazyBallY >= crazyHeight - crazyRadius){
        crazyBallYDirection *= -1; //Richtung "negieren"
    }

    if(crazyBall2Y <= 0 + crazyRadius){
        crazyBall2YDirection *= -1; //Richtung "negieren"
    }
    if(crazyBall2Y >= crazyHeight - crazyRadius){
        crazyBall2YDirection *= -1; //Richtung "negieren"
    }

    if(crazyBall3Y <= 0 + crazyRadius){
        crazyBall3YDirection *= -1; //Richtung "negieren"
    }
    if(crazyBallY >= crazyHeight - crazyRadius){
        crazyBall3YDirection *= -1; //Richtung "negieren"
    }

    //LINKS Tor!!! player2 bekommt punkt 
    if(crazyBallX <= 0){
        crazyPlayer2Score +=1;
        crazyupdateScore();
        crazycreateBalls(); //neuen Ball erstellen
        return;
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(crazyBallX >= crazyWidth){
        crazyPlayer1Score +=1;
        crazyupdateScore();
        crazycreateBalls();
        return;
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(crazyBallX <= (crazyPaddle1.x + crazyPaddle1.width +crazyRadius)){
        if(crazyBallY > crazyPaddle1.y && crazyBallY < (crazyPaddle1.y+crazyPaddle1.height)){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            crazyBallX = (crazyPaddle1.x + crazyPaddle1.width) + crazyRadius;
            crazyBallXDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
        }

    }

    if(crazyBallX >= (crazyWidth - crazyPaddle2.width - crazyRadius)){
        if(crazyBallY > crazyPaddle2.y && crazyBallY < (crazyPaddle2.y+crazyPaddle2.height)){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            crazyBallX = crazyPaddle2.x - crazyRadius;
            crazyBallXDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
        }

    }

    crazyBall2Collision();
    crazyBall3Collision();
}

function crazyBall2Collision(){
    if(crazyBall2X <= 0){
        crazyPlayer2Score +=1;
        return;
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(crazyBall2X >= crazyWidth){
        crazyPlayer1Score +=1;
        return;
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(crazyBall2X <= (crazyPaddle1.x + crazyPaddle1.width +crazyRadius)){
        if(crazyBall2Y > crazyPaddle1.y && crazyBall2Y < (crazyPaddle1.y+crazyPaddle1.height)){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            crazyBall2X = (crazyPaddle1.x + crazyPaddle1.width) + crazyRadius;
            crazyBall2XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
        }

    }

    if(crazyBall2X >= (crazyWidth - crazyPaddle2.width - crazyRadius)){
        if(crazyBall2Y > crazyPaddle2.y && crazyBall2Y < (crazyPaddle2.y+crazyPaddle2.height)){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            crazyBall2X = crazyPaddle2.x - crazyRadius;
            crazyBall2XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
        }

    }
}

function crazyBall3Collision(){
    if(crazyBall2X <= 0){
        crazyPlayer2Score +=1;
        return;
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(crazyBall2X >= crazyWidth){
        crazyPlayer1Score +=1;
        return;
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(crazyBall3X <= (crazyPaddle1.x + crazyPaddle1.width +crazyRadius)){
        if(crazyBall3Y > crazyPaddle1.y && crazyBall3Y < (crazyPaddle1.y+crazyPaddle1.height)){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            crazyBall3X = (crazyPaddle1.x + crazyPaddle1.width) + crazyRadius;
            crazyBall3XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
        }

    }

    if(crazyBall3X >= (crazyWidth - crazyPaddle2.width - crazyRadius)){
        if(crazyBall3Y > crazyPaddle2.y && crazyBall3Y < (crazyPaddle2.y+crazyPaddle2.height)){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            crazyBall3X = crazyPaddle2.x - crazyRadius;
            crazyBall3XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
        }

    }
    
}

//Die beiden Paddles bewegen
function crazychangeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed); //P1: w = 87, a = 65, s = 83, d = 68 ---- P2: up = 38, left = 37, right = 39, down = 40
    const paddle1Up = 87;
    const paddle1Down = 83;

    const paddle2Up = 38;
    const paddle2Down = 40;
    
    //je nach gepressten key dieses paddle oben/unten bewegen (man kann nur 1 gedrückt halten :/)
    switch(keyPressed){
        case(paddle1Up):
            if(crazyPaddle1.y > 0){
                crazyPaddle1.y -= crazyPaddleSpeed; //y height geht nach unten, deswegen -= um nach oben zu gehn
            }
            break;

        case(paddle1Down):
            if(crazyPaddle1.y < crazyHeight-crazyPaddle1.height){
                crazyPaddle1.y += crazyPaddleSpeed;
            }
            break;

        case(paddle2Up):
            if(crazyPaddle2.y > 0){
                crazyPaddle2.y -= crazyPaddleSpeed;
            }
            break;

        case(paddle2Down):
            if(crazyPaddle2.y < crazyHeight-crazyPaddle2.height){
                crazyPaddle2.y += crazyPaddleSpeed;
            }
            break;
    }
}

function crazyupdateScore(){
    crazyScore.innerHTML = crazyPlayer1Score + " : " + crazyPlayer2Score;
}

//spiel neustarten
function crazyresetGame(){
    crazyPlayer1Score = 0;
    crazyPlayer2Score = 0;
    crazyupdateScore();

    //RESET PADDLES
    crazyPaddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    crazyPaddle2 = {
        width: 25,
        height: 100,
        x: crazyWidth - 25, //da selbst Breite 25, sichtbar 
        y: crazyHeight - 100 //da selbst Höhe 100, sichtbar
    };

    //RESET BALL
    crazyBallSpeed = 1;
    crazyBallX = 0;
    crazyBallY = 0;
    crazyBallXDirection = 0;
    crazyBallYDirection = 0;

    crazyBall2X = 0;
    crazyBall2Y = 0;
    crazyBall2XDirection = 0;
    crazyBall2YDirection = 0;

    crazyBall3X = 0;
    crazyBall3Y = 0;
    crazyBall3XDirection = 0;
    crazyBall3YDirection = 0;
    crazyupdateScore();

    //Intervall clearen wenn so machen: gameStart() nochmal aufrufen
    clearInterval(crazyIntervalID);
    crazygameStart();
    
}


document.getElementById('crazyEnd').onclick = function(){
    document.querySelector("#gameMode").style.display = 'block';
    document.querySelector("#crazyContainer").style.display = 'none';
    console.log("game ended");
}
//-------------------------------CRAZY MODE END---------------------------------
