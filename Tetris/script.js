let canvas;
let ctx;
let gBarrayHeight = 20; // y
let gBarrayWidth = 12; // x
let startX = 4;
let startY = 0;
let score = 0;
let level = 1;
let winOrLose = "Playing";
let tetrisLogo;
let coordinateArray = [...Array(gBarrayHeight)].map(e => Array(gBarrayWidth).fill(0));
let curTetromino = [[1,0], [0,1], [1,1], [2,1]];

let tetrominos = [];
let tetrominoColors = ['rgb(183,29,176)', 'rgb(0,193,235)', 'rgb(28,28,249)', 'rgb(255,201,29)', 'rgb(254,118,14)', 'rgb(68,188,47)', 'rgb(241,11,48'];
let curTetrominoColor;

let gameBoardArray = [...Array(gBarrayHeight)].map(e => Array(gBarrayWidth).fill(0));

let stoppedShapeArray = [...Array(gBarrayHeight)].map(e => Array(gBarrayWidth).fill(0));

const playButton = document.querySelector("#playButton");
const resetButton = document.querySelector("#resetButton");


let DIRECTION = {
    IDLE: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

let direction;

class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

document.addEventListener('DOMContentLoaded', SetupCanvas);

function CreateCoordArray() {
    let i = 0, j = 0;
    for(let y = 9; y <= 446; y += 23) {
        for(let x = 11; x <= 264; x += 23) {
            coordinateArray[i][j] = new Coordinates(x, y);
            i++;
        }
        j++;
        i = 0;
    }
}

function SetupCanvas() {
    updateHighScores();
    canvas = document.getElementById('tetris');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 956;
  
    ctx.scale(2, 2);
  
    // Set the entire canvas to rgb(4, 0, 30)
    ctx.fillStyle = 'rgb(4, 0, 30)'; //rgb(4, 0, 30)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the gameboard rectangle
    /*
    ctx.strokeStyle = 'rgb(243, 255, 81)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 467, 470);
    */
  
    // Setting playing field background
    ctx.fillStyle = 'black';
    ctx.fillRect(8, 8, 280, 462);
  
    //logo
    //ctx.strokeStyle = 'rgb(105, 34, 143)';
    //ctx.strokeRect(300, 8, 161, 54);
    tetrisLogo = new Image(161, 54);
    tetrisLogo.onload = DrawTetrisLogo;
    tetrisLogo.src = "Tetris/pics/tetrislogo.png";

    //mimicking the outset border style previously used in the snake game for the playing field
        ctx.lineWidth = 3;

        // Draw the upper light border
        ctx.strokeStyle = 'rgb(105, 34, 143)';
        ctx.strokeRect(8, 7, 280, 0);

        //draw the lefside light border
        ctx.strokeStyle = 'rgb(105, 34, 143)';
        ctx.strokeRect(8, 5.8, 0, 465.5);

        // Draw the bottom dark border
        ctx.strokeStyle = 'rgb(66, 35, 83)';
        ctx.strokeRect(9.6, 470, 279.8, 0);

        // Draw the right dark border
        ctx.strokeStyle = 'rgb(66, 35, 83)';
        ctx.strokeRect(288, 5.8, 0, 465);

    // score
    ctx.fillStyle = 'black'; // Blue color for the score rectangle
    ctx.fillRect(300, 107, 161, 24);
  
    ctx.strokeStyle = 'rgb(105, 34, 143)'; // Stroke color for the score rectangle
    ctx.strokeRect(300, 107, 161, 24);
  
    ctx.fillStyle = 'white'; // white font color for the score text
    ctx.font = '12px Press Start';
    ctx.fillText("SCORE", 300, 98);
    ctx.fillStyle = 'rgb(243, 255, 81)';
    ctx.fillText(score.toString(), 310, 124.5);
  
    // level
    ctx.fillStyle = 'black'; // Green color for the level rectangle
    ctx.fillRect(300, 171, 161, 24);
  
    ctx.strokeStyle = 'rgb(105, 34, 143)'; // Stroke color for the level rectangle
    ctx.strokeRect(300, 171, 161, 24);
  
    ctx.fillStyle = 'white'; // white font color for the level text
    ctx.fillText("LEVEL", 300, 157);
    ctx.fillStyle = 'rgb(243, 255, 81)';
    ctx.fillText(level.toString(), 310, 188.5);
  
    // Show "GAME OVER" if the player loses
    if (winOrLose === "LOSE") {
        //ctx.fillStyle = '#433998'; // Purple color for the game over background
        //ctx.fillRect(300, 232, 161, 95);
        
        ctx.fillStyle = 'black'; // Black font color for the game over text
        ctx.font = '24px Press Start';
        ctx.fillText("GAME OVER!", 310, 261);
      }
  
    // controls
    ctx.fillStyle = 'rgb(4, 0, 30)'; // Purple color for the controls rectangle
    ctx.fillRect(300, 366, 161, 104);
  
    ctx.strokeStyle = 'rgb(105, 34, 143)'; // Stroke color for the controls rectangle
    ctx.strokeRect(300, 366, 161, 104);
  
    ctx.fillStyle = 'white'; // font color for the controls text
    ctx.font = '10px Press Start';
    ctx.fillText("A:Move Left", 310, 388);
    ctx.fillText("D:Move Right", 310, 413);
    ctx.fillText("S:Move Down", 310, 438);
    ctx.fillText("E:Rotate Right", 310, 463);

    playButton.addEventListener('click', function() {
        console.log("Play button clicked");
        window.setInterval(function() {
            if(winOrLose != "Game Over") {
                MoveTetrominoDown();
            }
        }, 1000);
    });
    
    resetButton.addEventListener('click', function() {
        console.log("Reset button clicked");
        location.reload();
    });

  
    document.addEventListener('keydown', HandleKeyPress);
    CreateTetrominos();
    CreateTetromino();
  
    CreateCoordArray();
    DrawTetromino();
  }
  
function DrawTetrisLogo(){
    ctx.drawImage(tetrisLogo, 300, 8, 161, 54);
}


function DrawTetromino() {
    for(let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 1;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = curTetrominoColor;
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

document.getElementById("savetetris").onclick = function(){
    isLoggedIn(document.querySelector("#tetrisname").value);
    document.querySelector("#tetrisbox").style.display = 'none';
}

function isLoggedIn($user) {
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
                username = $user;
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

function HandleKeyPress(key) {
    if(winOrLose != "Game Over") {
        if(key.keyCode === 65 || key.keycode === 37) {        // A key or left arrow
            direction = DIRECTION.LEFT;
            if(!HittingTheWall() && !CheckForHorizontalCollision()) {
                DeleteTetromino();
                startX--;
                DrawTetromino();
            }
        } else if(key.keyCode === 68 || key.keycode === 39) {     // D key or right arrow
            direction = DIRECTION.RIGHT;
            if(!HittingTheWall() && !CheckForHorizontalCollision()) {
                DeleteTetromino();
                startX++;
                DrawTetromino();
            }
        } else if(key.keyCode === 83 || key.keyCode === 40) {     // S key or down arrow
            MoveTetrominoDown();
        } else if(key.keyCode === 69 || key.keyCode === 17) {     // E key or ctrl
            if(!HittingTheWall() && !CheckForHorizontalCollision()) {       // unfortunately wasn't an easy fix :(
                RotateTetromino();  
            }
        }
    }
    
}

function MoveTetrominoDown() {
    direction = DIRECTION.DOWN;
    if(!CheckForVerticalCollision()) {
        DeleteTetromino();
        startY++;
        DrawTetromino();
    }
}







function DeleteTetromino() {
    for(let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = 'black';
        ctx.fillRect(coorX, coorY, 21, 21);
    }
}

function CreateTetrominos() {
    // T
    tetrominos.push([[1,0], [0,1], [1,1], [2,1]]);
    // I
    tetrominos.push([[0,0], [1,0], [2,0], [3,0]]);
    // J
    tetrominos.push([[0,0], [0,1], [1,1], [2,1]]);
    // Square
    tetrominos.push([[0,0], [1,0], [0,1], [1,1]]);
    // L
    tetrominos.push([[2,0], [0,1], [1,1], [2,1]]);
    // S
    tetrominos.push([[1,0], [2,0], [0,1], [1,1]]);
    // Z
    tetrominos.push([[0,0], [1,0], [1,1], [2,1]]);
}

function CreateTetromino() {
    let randomTetromino = Math.floor(Math.random() * tetrominos.length);
    curTetromino = tetrominos[randomTetromino];
    curTetrominoColor = tetrominoColors[randomTetromino];
}
updateHighScores();
function updateHighScores() {
    $.ajax({
        url: '/ITproj_PixelPlayground-master/src/topfivescores.php',  // adjust this path to the location of your PHP script
        type: 'POST',
        data: { game: 'Tetris' },  // replace 'Hangman' with your game's name
        success: function(data) {
            var highScores = JSON.parse(data);
            var scoresHTML = '';
            for (var i = 0; i < highScores.length; i++) {
                scoresHTML += '<p class="top5score">' + highScores[i].username + '....' + highScores[i].score + '</p>';
            }
            document.getElementById('topfive').innerHTML = scoresHTML;
        }
    });
}

function HittingTheWall() {
    for(let i = 0; i < curTetromino.length; i++) {
        let newX = curTetromino[i][0] + startX;
        if(newX <= 0 && direction === DIRECTION.LEFT) {
            return true;
        } else if(newX >= 11 && direction === DIRECTION.RIGHT) {
            return true;
        }
    }
    return false;
}

function CheckForVerticalCollision() {
    let tetrominoCopy = curTetromino;
    let collision = false;
    for(let i = 0; i < tetrominoCopy.length; i++) {
        let square = tetrominoCopy[i];
        let x = square[0] + startX;
        let y = square[1] + startY;
        if(direction === DIRECTION.DOWN) {
            y++;
        }
        //if(gameBoardArray[x][y+1] === 1) {
            if(typeof stoppedShapeArray[x][y+1] === 'string') {
                DeleteTetromino();
                startY++;
                DrawTetromino();
                collision = true;
                break;
            }
            if(y >= 20) {
                collision = true;
                break;
            }
        }
        if(collision) {
            if(startY <= 2) {               //top of the gameboard can be chosen to be higher
                winOrLose = "Game Over";


                ctx.fillStyle = 'black';
                ctx.fillRect(300, 242, 161, 48);

                ctx.strokeStyle = 'rgb(105, 34, 143)';
                ctx.strokeRect(300, 242, 161, 48);
                
                ctx.font = '14px Press Start';
                ctx.fillStyle = 'white';
                ctx.fillText("GAME OVER!", 310, 273);
            } else {
                for(let i = 0; i < tetrominoCopy.length; i++) {
                    let square = tetrominoCopy[i];
                    let x = square[0] + startX;
                    let y = square[1] + startY;
                    stoppedShapeArray[x][y] = curTetrominoColor;
                }
                CheckForCompletedRows();
                CreateTetromino();
                direction = DIRECTION.IDLE;
                startX = 4;
                startY = 0;
                DrawTetromino();
            }
        }
    }
//}

function CheckForHorizontalCollision() {
    var tetrominoCopy = curTetromino;
    var collision = false;
    for(var i = 0; i < tetrominoCopy.length; i++) {
        var square = tetrominoCopy[i];
        var x = square[0] + startX;
        var y = square[1] + startY;
        if(direction === DIRECTION.LEFT) {
            x--;
        } else if(direction === DIRECTION.RIGHT) {
            x++;
        }
        var stoppedShapeVal = stoppedShapeArray[x][y];
        if(typeof stoppedShapeVal === 'string') {
            collision = true;
            break;
        }
    }
    return collision;
}

function CheckForCompletedRows(){
    let rowsToDelete = 0;
    let startOfDeletion = 0;
    for(let y = 0; y < gBarrayHeight; y++) {
        let completed = true;
        for(let x = 0; x < gBarrayWidth; x++) {
            let square = stoppedShapeArray[x][y];
            if(square === 0 || (typeof square === 'undefined')) {
                completed = false;
                break;
            }
        }
        if(completed) {
            //used to shift down the rows
            if(startOfDeletion === 0) startOfDeletion = y;
            rowsToDelete++;
            for(let i = 0; i < gBarrayWidth; i++) {
                stoppedShapeArray[i][y] = 0;
                gameBoardArray[i][y] = 0;
                let coorX = coordinateArray[i][y].x;
                let coorY = coordinateArray[i][y].y;
                ctx.fillStyle = 'white';                //TODO: insert animation instead
                ctx.fillRect(coorX, coorY, 21, 21);
                ctx.fillStyle = 'black';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
    if(rowsToDelete > 0) {
        updateHighScores();
        score += 10;
        updateHighScores();
        $.ajax({
            url: "/ITproj_PixelPlayground-master/src/highscore.php",
            type: "POST",
            data: { username: username, score: score, game: "Tetris" },
            success: function(response) {
                console.log("score sent <3");
            },
            error: function(xhr, status, error) {
                console.error("Error sending score :( " + error);
            }
        });

        // overwrite the area where the score is stored so that it is blank again for the new score
        ctx.fillStyle = 'black'; // Background color
        ctx.fillRect(305, 109, 152, 18);

        //ctx.fillStyle = '#433998';    //score
        //ctx.fillRect(310, 242, 140, 19);
        ctx.font = '12px Press Start';
        ctx.fillStyle = 'rgb(243, 255, 81)';
        ctx.fillText(score.toString(), 310, 124.5); //put score into score box
        MoveAllRowsDown(rowsToDelete, startOfDeletion);
    }
}

function MoveAllRowsDown(rowsToDelete, startOfDeletion) {
    for(var i=startOfDeletion-1; i>= 0; i--) {
        for(var x = 0; x < gBarrayWidth; x++) {
            var y2 = i + rowsToDelete;
            var square = stoppedShapeArray[x][i];
            var nextSquare = stoppedShapeArray[x][y2];
            if(typeof square === 'string') {
                nextSquare = square;
                gameBoardArray[x][y2] = 1;
                stoppedShapeArray[x][y2] = square;
                let coorX = coordinateArray[x][y2].x;
                let coorY = coordinateArray[x][y2].y;
                ctx.fillStyle = nextSquare;
                ctx.fillRect(coorX, coorY, 21, 21);

                square = 0;
                gameBoardArray[x][i] = 0;
                stoppedShapeArray[x][i] = 0;
                coorX = coordinateArray[x][i].x;
                coorY = coordinateArray[x][i].y;
                ctx.fillStyle = 'black';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
}

function RotateTetromino() {
    let newRotation = new Array();
    let tetrominoCopy = curTetromino;
    let curTetrominoBU;
    for(let i = 0; i < tetrominoCopy.length; i++) {
        curTetrominoBU = [...curTetromino];
        let x = tetrominoCopy[i][0];
        let y = tetrominoCopy[i][1];
        let newX = (GetLastSquareX() - y);
        let newY = x;
        newRotation.push([newX, newY]);
    }
    DeleteTetromino();
    try {
        curTetromino = newRotation;
        DrawTetromino();
    }
    catch(e) {
        if(e instanceof TypeError) { //if you try to draw outside of the gameboard, the TypeError will be caught
            curTetromino = curTetrominoBU;
            DeleteTetromino();
            DrawTetromino();
        }
    }
} 

function GetLastSquareX() {
    let lastX = 0;
    for(let i = 0; i < curTetromino.length; i++) {
        let square = curTetromino[i];
        if(square[0] > lastX) 
            lastX = square[0];
    }
    return lastX;
}
