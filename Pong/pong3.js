document.getElementById('illusionmode').onclick = function() {
    illusionresetGame();
    document.getElementById("ponghead").innerHTML = 'Illusion Pong';
    document.querySelector("#gameMode").style.display = 'none';
    document.querySelector("#illusionContainer").style.display = 'block';
}

const illusionBoard = document.querySelector("#illusionBoard");

//Auf dem Kontext wird "gezeichnet"
const illusionctx = illusionBoard.getContext("2d");
const illusionScore = document.querySelector("#illusionScore");
const illusionReset = document.querySelector("#illusionReset");
const illusionWidth = illusionBoard.width;
const illusionHeight = illusionBoard.height;

/* Farben gleich wie die oberen */


//Größe des balles dann 25 durchmesser
const illusionRadius = 12.5;
//Spieler paddles distanz die sie bewegen
const illusionPaddleSpeed = 35;

let illusionIntervalID;
let illusionBallSpeed = 1; //lowest speed

//Ball beginnt in der Mitte
//BALL 1
let illusionBallX = illusionWidth / 2;
let illusionBallY = illusionHeight / 2;
let illusionBallXDirection = 0;
let illusionBallYDirection = 0;

//BALL 2
let illusionBall2X = illusionWidth / 2;
let illusionBall2Y = illusionHeight / 2;
let illusionBall2XDirection = 0;
let illusionBall2YDirection = 0;

//BALL 3
let illusionBall3X = illusionWidth / 2;
let illusionBall3Y = illusionHeight / 2;
let illusionBall3XDirection = 0;
let illusionBall3YDirection = 0;

let illusionPlayer1Score = 0;
let illusionPlayer2Score = 0;

//1. paddle beginnt top left
let illusionPaddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
//2. paddle beginnt rechts unten
let illusionPaddle2 = {
    width: 25,
    height: 100,
    x: illusionWidth - 25, //da selbst Breite 25, sichtbar 
    y: illusionHeight - 100 //da selbst Höhe 100, sichtbar
};

//wenn eine Taste gedrückt wird: changeDirection aufrufen, um paddles zu bewegen
window.addEventListener("keydown", illusionchangeDirection);
//wenn Reset button geklickt wird, das game von neu starten
illusionReset.addEventListener("click", illusionresetGame);

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

illusiongameStart();

//Ball wird erstellt mit random Richtung, dann Spielablauf aufgerufen
function illusiongameStart(){
    illusioncreateBalls();
    illusionnextTick();
}

//Alle 10 ms wiederholen für flüssigen Spielablauf
function illusionnextTick(){
    illusionIntervalID = setTimeout(()=>{
        illusionclearBoard();
        illusiondrawPaddles();
        illusionmoveBall();
        illusiondrawBall(illusionBallX, illusionBallY, ballColor);
        illusiondrawBall(illusionBall2X, illusionBall2Y, ballColor);
        illusiondrawBall(illusionBall3X, illusionBall3Y, ballColor);
        illusioncheckCollision();
        illusionnextTick();
    }, 10);
}

//redraw the board
function illusionclearBoard(){
    illusionctx.fillStyle = boardBackground;
    illusionctx.fillRect(0, 0, illusionWidth, illusionHeight);
}

function  illusiondrawPaddles(){
    illusionctx.strokeStyle = paddleBorder;

    illusionctx.fillStyle = paddle1Color;
    illusionctx.fillRect(illusionPaddle1.x, illusionPaddle1.y, illusionPaddle1.width, illusionPaddle1.height);//x, y, width, height
    illusionctx.strokeRect(illusionPaddle1.x, illusionPaddle1.y, illusionPaddle1.width, illusionPaddle1.height);

    illusionctx.fillStyle = paddle2Color;
    illusionctx.fillRect(illusionPaddle2.x, illusionPaddle2.y, illusionPaddle2.width, illusionPaddle2.height);//x, y, width, height
    illusionctx.strokeRect(illusionPaddle2.x, illusionPaddle2.y, illusionPaddle2.width, illusionPaddle2.height);
}

function illusioncreateBalls(){
    illusionBallSpeed = 1;
    //Zufallszahl erstellen, wenn 1 nach rechts, sonst links
    if(Math.round(Math.random())==1){
        illusionBallXDirection = 1; //width +1 bewegt RECHTS
    }
    else {
        illusionBallXDirection = -1; //width -1 bewegt LINKS
    }
    if(Math.round(Math.random())==1){
        illusionBallYDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
    }
    else {
        illusionBallYDirection = Math.random()*-1;
    }

    //Ball 2
    if(Math.round(Math.random())==1){
        illusionBall2XDirection = 1; //width +1 bewegt RECHTS
    }
    else {
        illusionBall2XDirection = -1; //width -1 bewegt LINKS
    }
    if(Math.round(Math.random())==1){
        illusionBall2YDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
    }
    else {
        illusionBall2YDirection = Math.random()*-1;
    }

    //Ball 3
    if(Math.round(Math.random())==1){
        illusionBall3XDirection = 1; //width +1 bewegt RECHTS
    }
    else {
        illusionBall3XDirection = -1; //width -1 bewegt LINKS
    }
    if(Math.round(Math.random())==1){
        illusionBall3YDirection = Math.random()*1; //OBEN:mehr random height directions (zwischen 0 und 1, nicht genau 1)
    }
    else {
        illusionBall3YDirection = Math.random()*-1;
    }
        
    //Ball in die Mitte setzen
    illusionBallX = illusionWidth / 2;
    illusionBallY = illusionHeight / 2;
    
    illusionBall2X = illusionWidth / 2;
    illusionBall2Y = illusionHeight / 2;

    illusionBall3X = illusionWidth / 2;
    illusionBall3Y = illusionHeight / 2;
    illusiondrawBall(illusionBallX, illusionBallY);
    illusiondrawBall(illusionBall2X, illusionBall2Y);
    illusiondrawBall(illusionBall3X, illusionBall3Y);
}

function illusionmoveBall(){
    illusionBallX += (illusionBallSpeed * illusionBallXDirection); //um ballSpeed Felder nach links oder rechts bewegen 
    illusionBallY += (illusionBallSpeed * illusionBallYDirection);

    illusionBall2X += (illusionBallSpeed * illusionBall2XDirection); //um ballSpeed Felder nach links oder rechts bewegen 
    illusionBall2Y += (illusionBallSpeed * illusionBall2YDirection);

    illusionBall3X += (illusionBallSpeed * illusionBall3XDirection); //um ballSpeed Felder nach links oder rechts bewegen 
    illusionBall3Y += (illusionBallSpeed * illusionBall3YDirection);
}

//Den Ball zeichnen: AUSSEHEN BALL BEI VARIABLEN ÄNDERN (ballColor, ballBorderColor)
function illusiondrawBall(illusionBallX, illusionBallY, ballColor){
    illusionctx.fillStyle = ballColor;
    illusionctx.strokeStyle = ballBorderColor;
    illusionctx.lineWidth = 2;
    illusionctx.beginPath(); //man muss path beginnen, um linie/form zu zeichnen (immer neu beginnen für mehrere)
    illusionctx.arc(illusionBallX, illusionBallY, illusionRadius, 0, 2*Math.PI); //einen Kreis zeichnen an Stelle x und y, 2*pi für Kreis Umfang zeichnen
    illusionctx.stroke(); //Linie zeichnen
    illusionctx.fill(); //ball mit Farbe füllen
}

//checken, ob dieser ball schon tor getroffen hat

function illusioncheckCollision(){
    //+radius, da y koordinate in zentrum des kreis ist
    if(illusionBallY <= 0 + illusionRadius){
        illusionBallYDirection *= -1; //Richtung "negieren"
    }
    if(illusionBallY >= illusionHeight - illusionRadius){
        illusionBallYDirection *= -1; //Richtung "negieren"
    }

    if(illusionBall2Y <= 0 + illusionRadius){
        illusionBall2YDirection *= -1; //Richtung "negieren"
    }
    if(illusionBall2Y >= illusionHeight - illusionRadius){
        illusionBall2YDirection *= -1; //Richtung "negieren"
    }

    if(illusionBall3Y <= 0 + illusionRadius){
        illusionBall3YDirection *= -1; //Richtung "negieren"
    }
    if(illusionBall3Y >= illusionHeight - illusionRadius){
        illusionBall3YDirection *= -1; //Richtung "negieren"
    }

    function isLoggedIn() {
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
                    username = prompt("Please choose a name to be remembered by King! :");
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

    function secondPlayer() {
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
                    username2 = prompt("Please choose a name for the 2nd to be remembered by! :");
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

    //LINKS Tor!!! player2 bekommt punkt 
    if(illusionBallX <= 0){
        illusionPlayer2Score +=1;
        $.ajax({
            url: "/ITproj_PixelPlayground-master/Backend/db.php",
            type: "POST",
            data: { username: username2, score: illusionPlayer2Score, game: "Illusion Pong" },
            success: function(response) {
                console.log("score sent <3");
            },
            error: function(xhr, status, error) {
                console.error("Error sending score :( " + error);
            }
        });
        illusionBallXDirection = 0;
        illusionBallYDirection = 0;
        illusionupdateScore();
        illusioncreateBalls();
        return;
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(illusionBallX >= illusionWidth){
            illusionPlayer1Score +=1;
            $.ajax({
                url: "/ITproj_PixelPlayground-master/Backend/db.php",
                type: "POST",
                data: { username: username, score: illusionPlayer1Score, game: "Illusion Pong" },
                success: function(response) {
                    console.log("score sent <3");
                },
                error: function(xhr, status, error) {
                    console.error("Error sending score :( " + error);
                }
            });
            illusionBallXDirection = 0;
            illusionBallYDirection = 0;
            illusionupdateScore();
            illusioncreateBalls();
            return;
        
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(illusionBallX <= (illusionPaddle1.x + illusionPaddle1.width +illusionRadius)){
        if(illusionBallY > illusionPaddle1.y && illusionBallY < (illusionPaddle1.y+illusionPaddle1.height)){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            illusionBallX = (illusionPaddle1.x + illusionPaddle1.width) + illusionRadius;
            illusionBallXDirection *= -1; //Richtung "negieren";
            illusionBallSpeed +=1;
        }

    }

    if(illusionBallX >= (illusionWidth - illusionPaddle2.width - illusionRadius)){
        if(illusionBallY > illusionPaddle2.y && illusionBallY < (illusionPaddle2.y+illusionPaddle2.height)){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            illusionBallX = illusionPaddle2.x - illusionRadius;
            illusionBallXDirection *= -1; //Richtung "negieren";
            illusionBallSpeed +=1;
        }
    }

    illusionBall2Collision();
    illusionBall3Collision();
}

function illusionBall2Collision(){
    if(illusionBall2X <= 0){
        illusionBall2XDirection *= -1; //Richtung "negieren"
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(illusionBall2X >= illusionWidth){
        illusionBall2XDirection *= -1; //Richtung "negieren"
    }
}

function illusionBall3Collision(){
    if(illusionBall3X <= 0){
        illusionBall3XDirection *= -1; //Richtung "negieren"
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(illusionBall3X >= illusionWidth){
        illusionBall3XDirection *= -1; //Richtung "negieren"
    }
    
}

//Die beiden Paddles bewegen
function illusionchangeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed); //P1: w = 87, a = 65, s = 83, d = 68 ---- P2: up = 38, left = 37, right = 39, down = 40
    const paddle1Up = 87;
    const paddle1Down = 83;

    const paddle2Up = 73;
    const paddle2Down = 75;
    
    //je nach gepressten key dieses paddle oben/unten bewegen (man kann nur 1 gedrückt halten :/)
    switch(keyPressed){
        case(paddle1Up):
            if(illusionPaddle1.y > 0){
                illusionPaddle1.y -= illusionPaddleSpeed; //y height geht nach unten, deswegen -= um nach oben zu gehn
            }
            break;

        case(paddle1Down):
            if(illusionPaddle1.y < illusionHeight-illusionPaddle1.height){
                illusionPaddle1.y += illusionPaddleSpeed;
            }
            break;

        case(paddle2Up):
            if(illusionPaddle2.y > 0){
                illusionPaddle2.y -= illusionPaddleSpeed;
            }
            break;

        case(paddle2Down):
            if(illusionPaddle2.y < illusionHeight-illusionPaddle2.height){
                illusionPaddle2.y += illusionPaddleSpeed;
            }
            break;
    }
}

function illusionupdateScore(){
    illusionScore.innerHTML = illusionPlayer1Score + " : " + illusionPlayer2Score;
}

//spiel neustarten
function illusionresetGame(){
    illusionPlayer1Score = 0;
    illusionPlayer2Score = 0;
    illusionupdateScore();

    //RESET PADDLES
    illusionPaddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    illusionPaddle2 = {
        width: 25,
        height: 100,
        x: illusionWidth - 25, //da selbst Breite 25, sichtbar 
        y: illusionHeight - 100 //da selbst Höhe 100, sichtbar
    };

    //RESET BALL
    illusionBallSpeed = 1;
    illusionBallX = 0;
    illusionBallY = 0;
    illusionBallXDirection = 0;
    illusionBallYDirection = 0;

    illusionBall2X = 0;
    illusionBall2Y = 0;
    illusionBall2XDirection = 0;
    illusionBall2YDirection = 0;

    illusionBall3X = 0;
    illusionBall3Y = 0;
    illusionBall3XDirection = 0;
    illusionBall3YDirection = 0;
    illusionupdateScore();

    //Intervall clearen wenn so machen: gameStart() nochmal aufrufen
    clearInterval(illusionIntervalID);
    illusiongameStart();
    
}


document.getElementById('illusionEnd').onclick = function(){
    document.querySelector("#gameMode").style.display = 'block';
    document.querySelector("#illusionContainer").style.display = 'none';
    illusionresetGame();
    document.getElementById("ponghead").innerHTML = 'Play Pong';
    console.log("game ended");
}
