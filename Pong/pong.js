const gameBoard = document.querySelector("#gameBoard");
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
//Spieler paddles größer machen: Wert hier erhöhen
const paddleSpeed = 50;

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

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
drawPaddles(); //TEST

function gameStart(){

}

function nextTick(){

}

function clearBoard(){

}

function  drawPaddles(){
    ctx.strokeStyle = paddleBorder;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);//x, y, width, height
}

function createBall(){

}

function moveBall(){

}

function drawBall(){

}

function checkCollision(){

}

function changeDirection(){

}

function updateScore(){

}

function resetGame(){
    
}