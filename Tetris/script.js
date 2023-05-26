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
let tetrominoColors = ['purple', 'cyan', 'blue', 'yellow', 'orange', 'green', 'red']; //pink maybe
let curTetrominoColor;

let gameBoardArray = [...Array(gBarrayHeight)].map(e => Array(gBarrayWidth).fill(0));

let stoppedShapeArray = [...Array(gBarrayHeight)].map(e => Array(gBarrayWidth).fill(0));

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
    canvas = document.getElementById('tetris');
    ctx = canvas.getContext('2d');
    canvas.width = 936;
    canvas.height = 956;

    ctx.scale(2, 2);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'black';
    ctx.strokeRect(8, 8, 280, 462);

    //tetris logo
    tetrisLogo = new Image(391, 128);  //161, 54
    tetrisLogo.onload = DrawTetrisLogo;
    tetrisLogo.src = "pics/tetrislogo.png";

    //sccore
    ctx.fillStyle = 'black';
    ctx.font = '21px'; //Arial
    ctx.fillText("SCORE", 300, 98);

    //score rectangle
    ctx.strokeRect(300, 107, 161, 24);

    ctx.fillText(score.toString(), 310, 127);
    
    //level
    ctx.fillText("LEVEL", 300, 157);

    //level rectangle
    ctx.strokeRect(300, 171, 161, 24);
    ctx.fillText(level.toString(), 310, 190);

    //win or lose
    ctx.fillText("WIN/LOSE", 300, 221);
    ctx.fillText(winOrLose, 310, 261);
    ctx.strokeRect(300, 232, 161, 95);

    //controls
    ctx.fillText("CONTROLS", 300, 354);
    ctx.strokeRect(300, 366, 161, 104);
    ctx.font = '19px Arial';
    ctx.fillText("A : Move Left", 310, 388);
    ctx.fillText("D : Move Right", 310, 413);
    ctx.fillText("S : Move Down", 310, 438);
    ctx.fillText("E : Rotate Right", 310, 463);

    document.addEventListener('keydown', HandleKeyPress);
    CreateTetrominos();
    CreateTetromino();

    CreateCoordArray();
    DrawTetromino();
}

function DrawTetrisLogo() {
    ctx.drawImage(tetrisLogo, 300, 8, 391, 128); //300, 8, 161, 54
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

function HandleKeyPress(key) {
    if(winOrLose != "Game Over") {
        if(key.keyCode === 65) {        // A key
            direction = DIRECTION.LEFT;
            if(!HittingTheWall() && !CheckForHorizontalCollision()) {
                DeleteTetromino();
                startX--;
                DrawTetromino();
            }
        } else if(key.keyCode === 68) {     // D key
            direction = DIRECTION.RIGHT;
            if(!HittingTheWall() && !CheckForHorizontalCollision()) {
                DeleteTetromino();
                startX++;
                DrawTetromino();
            }
        } else if(key.keyCode === 83) {     // S key
            MoveTetrominoDown();
        } else if(key.keyCode === 69) {     // E key
            RotateTetromino();
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

window.setInterval(function() {
    if(winOrLose != "Game Over") {
        MoveTetrominoDown();
    }
}, 1000);

function DeleteTetromino() {
    for(let i = 0; i < curTetromino.length; i++) {
        let x = curTetromino[i][0] + startX;
        let y = curTetromino[i][1] + startY;
        gameBoardArray[x][y] = 0;
        let coorX = coordinateArray[x][y].x;
        let coorY = coordinateArray[x][y].y;
        ctx.fillStyle = 'white';
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
                ctx.fillStyle = 'white';
                ctx.fillRect(310, 242, 140, 50);
                ctx.fillStyle = 'black';
                ctx.fillText(winOrLose, 310, 261);
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
                ctx.fillStyle = 'white';
                ctx.fillRect(coorX, coorY, 21, 21);
            }
        }
    }
    if(rowsToDelete > 0) {
        score += 10;
        ctx.fillStyle = 'white';    //score
        ctx.fillRect(310, 242, 140, 19);
        ctx.fillStyle = 'black';
        ctx.fillText(score.toString(), 310, 127); //261
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
                ctx.fillStyle = 'white';
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

