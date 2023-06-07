const board = document.querySelector("#board");
const ctx = board.getContext("2d");
const scoreTxt = document.querySelector("#scoreTxt");
const reset = document.querySelector("#reset");
const gameWidth = board.width;
const gameHeight = board.height;
const boardBg = "black";
const snakeColor = "lightgreen";
const snakeBorder = "lightgreen";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
var username = "";
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);



function gameStart(){
    running = true;
    scoreTxt.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100)
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBg;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        
        $.ajax({
            url: "/ITproj_PixelPlayground-master/Backend/db.php",
            type: "POST",
            data: { username: username, score: score, game: "Snake" },
            success: function(response) {
                console.log("score sent <3");
            },
            error: function(xhr, status, error) {
                console.error("Error sending score :( " + error);
            }
        });
        scoreTxt.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

document.getElementById("savesnake").onclick = function(){
    isLoggedIn(document.querySelector("#snakename").value);
    document.querySelector("#snakebox").style.display = 'none';
    gameStart();
}

function isLoggedIn($snakename) {
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
                username = $snakename;
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
function changeDirection(event){
    const goUp = (yVelocity == -unitSize);
    const goDown = (yVelocity == unitSize);
    const goRight = (xVelocity == unitSize);
    const goLeft = (xVelocity == -unitSize);
    const keyP = event.keyCode;

    switch(true){
        //LEFT
        case((keyP == 37 || keyP == 65) && !goRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        //UP
        case((keyP == 38 || keyP == 87) && !goDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        //RIGHT
        case((keyP == 39 || keyP == 68) && !goLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        //DOWN
        case((keyP == 40 || keyP == 83) && !goUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        
    }
};

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0): running = false; break;
        case(snake[0].x >= gameWidth): running = false; break;
        case(snake[0].y < 0): running = false; break;
        case(snake[0].y >= gameHeight): running = false; break;
    }
    for(let i = 1; i < snake.length; ++i){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};

function displayGameOver(){
    ctx.font = "45px Press Start";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
    running = false;
};

function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};

