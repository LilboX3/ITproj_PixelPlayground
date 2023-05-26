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
const crazyPaddleSpeed = 35;

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
        crazydrawBall(crazyBallX, crazyBallY, ballColor);
        crazydrawBall(crazyBall2X, crazyBall2Y, "red");
        crazydrawBall(crazyBall3X, crazyBall3Y, "purple");
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
function crazydrawBall(crazyBallX, crazyBallY, ballColor){
    crazyctx.fillStyle = ballColor;
    crazyctx.strokeStyle = ballBorderColor;
    crazyctx.lineWidth = 2;
    crazyctx.beginPath(); //man muss path beginnen, um linie/form zu zeichnen (immer neu beginnen für mehrere)
    crazyctx.arc(crazyBallX, crazyBallY, crazyRadius, 0, 2*Math.PI); //einen Kreis zeichnen an Stelle x und y, 2*pi für Kreis Umfang zeichnen
    crazyctx.stroke(); //Linie zeichnen
    crazyctx.fill(); //ball mit Farbe füllen
}

//checken, ob dieser ball schon tor getroffen hat
var point1 = false;
var point2 = false;
var point3 = false;

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
    if(crazyBall3Y >= crazyHeight - crazyRadius){
        crazyBall3YDirection *= -1; //Richtung "negieren"
    }

    //LINKS Tor!!! player2 bekommt punkt 
    if(crazyBallX <= 0){
        if(!point1){
        crazyPlayer2Score +=1;
        point1 = true;
        crazyBallXDirection = 0;
        crazyBallYDirection = 0;
        }
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(crazyBallX >= crazyWidth){
        if(!point1){
            crazyPlayer1Score +=1;
            point1 = true;
            crazyBallXDirection = 0;
            crazyBallYDirection = 0;
            }
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(crazyBallX <= (crazyPaddle1.x + crazyPaddle1.width +crazyRadius)){
        if(crazyBallY > crazyPaddle1.y && crazyBallY < (crazyPaddle1.y+crazyPaddle1.height)){
            if(!point1){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            crazyBallX = (crazyPaddle1.x + crazyPaddle1.width) + crazyRadius;
            crazyBallXDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
            }
        }

    }

    if(crazyBallX >= (crazyWidth - crazyPaddle2.width - crazyRadius)){
        if(crazyBallY > crazyPaddle2.y && crazyBallY < (crazyPaddle2.y+crazyPaddle2.height)){
            if(!point1){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            crazyBallX = crazyPaddle2.x - crazyRadius;
            crazyBallXDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
            }
        }

    }

    crazyBall2Collision();
    crazyBall3Collision();
    if(point1&&point2&&point3){
        point1 = false;
        point2= false;
        point3 = false;
        crazyupdateScore();
        crazycreateBalls();
        return;
    }   
}

function crazyBall2Collision(){
    if(crazyBall2X <= 0){
        if(!point2){
        crazyPlayer2Score +=1;
        point2 = true;
        crazyBall2XDirection = 0;
        crazyBall2YDirection = 0;
        }
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(crazyBall2X >= crazyWidth){
        if(!point2){
        crazyPlayer1Score +=1;
        point2 = true;
        crazyBall2XDirection = 0;
        crazyBall2YDirection = 0;
        }
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(crazyBall2X <= (crazyPaddle1.x + crazyPaddle1.width +crazyRadius)){
        if(crazyBall2Y > crazyPaddle1.y && crazyBall2Y < (crazyPaddle1.y+crazyPaddle1.height)){
            if(!point2){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            crazyBall2X = (crazyPaddle1.x + crazyPaddle1.width) + crazyRadius;
            crazyBall2XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
            }
        }

    }

    if(crazyBall2X >= (crazyWidth - crazyPaddle2.width - crazyRadius)){
        if(crazyBall2Y > crazyPaddle2.y && crazyBall2Y < (crazyPaddle2.y+crazyPaddle2.height)){
            if(!point2){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            crazyBall2X = crazyPaddle2.x - crazyRadius;
            crazyBall2XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
            }
        }

    }
}

function crazyBall3Collision(){
    if(crazyBall3X <= 0){
        if(!point3){
        crazyPlayer2Score +=1;
        point3 = true;
        crazyBall3XDirection = 0;
        crazyBall3YDirection = 0;
        }
    }

    //RECHTS Tor!!! player1 bekommt punkt
    if(crazyBall3X >= crazyWidth){
        if(!point3){
        crazyPlayer1Score +=1;  
        point3 = true;
        crazyBall3XDirection = 0;
        crazyBall3YDirection = 0;
        }
    }

    //CHECKEN ob paddles Ball treffen  v v v v
    if(crazyBall3X <= (crazyPaddle1.x + crazyPaddle1.width +crazyRadius)){
        if(crazyBall3Y > crazyPaddle1.y && crazyBall3Y < (crazyPaddle1.y+crazyPaddle1.height)){
            if(!point3){
            //UNSTUCK BALL: setz ihn bei breite an paddle1 anfang
            crazyBall3X = (crazyPaddle1.x + crazyPaddle1.width) + crazyRadius;
            crazyBall3XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
            }
        }

    }

    if(crazyBall3X >= (crazyWidth - crazyPaddle2.width - crazyRadius)){
        if(crazyBall3Y > crazyPaddle2.y && crazyBall3Y < (crazyPaddle2.y+crazyPaddle2.height)){
            if(!point3){
            //UNSTUCK BALL: setz ihn auf paddle2 anfang
            crazyBall3X = crazyPaddle2.x - crazyRadius;
            crazyBall3XDirection *= -1; //Richtung "negieren";
            crazyBallSpeed +=1;
            }
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
