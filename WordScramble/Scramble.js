const wordElement = document.querySelector(".word");
const hintElement = document.querySelector(".hint span");
const refreshButton = document.querySelector(".refresh-word");
const checkButton = document.querySelector(".check-word");
const input = document.querySelector("#input");
const timeElement = document.querySelector(".time span b");
const scoreElement = document.querySelector(".score span");
const numOfPlays = document.querySelector(".num span");

// initiale variables
let word = "";
let timer = null;
let score = 0;
let num = 3;
let time = 20;
var username = "";
let currentLevel = 0;

function updateScore(newScore) {
    document.getElementById('score').innerHTML = newScore;
}
function updateHighScores() {
    $.ajax({
        url: '/ITproj_PixelPlayground-master/src/topfivescores.php',  // adjust this path to the location of your PHP script
        type: 'POST',
        data: { game: 'Scramble' },  // replace 'Hangman' with your game's name
        success: function(data) {
            var highScores = JSON.parse(data);
            var scoresHTML = '';
            for (var i = 0; i < highScores.length; i++) {
                scoresHTML += '<p class="top5score">' + highScores[i].username + '.........' + highScores[i].score + '</p>';
            }
            document.getElementById('topfive').innerHTML = scoresHTML;
        }
    });
}

// Event-Listener für Level-Schaltflächen
const levelButtons = document.querySelectorAll(".levelbtn");
levelButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        currentLevel = parseInt(e.target.dataset.level);
        refreshGame();
    });
});

// initiale Game
function initGame() {
    // random word
    let randomIndex = Math.floor(Math.random() * levels[currentLevel].words.length);
    let randomObj = levels[currentLevel].words[randomIndex]
    word = randomObj.word.toLowerCase();
    console.log(randomObj);
    // shuffles characters in a string
    let wordArr = word.split("").sort(() => Math.random() - 0.5);
    let scrambleWord = wordArr.join("");

    /*If the characters are not shuffled successfully,
      call the initGame() function again*/
    if (scrambleWord === word) return initGame();

    numOfPlays.innerText = num;
    scoreElement.innerText = score;
    wordElement.innerText = scrambleWord;
    hintElement.innerText = randomObj.hint;
    timeElement.innerText = time;
    input.value = "";
    checkButton.setAttribute("disabled", true);

    timer = setInterval(() => {
        if (time > 0) {
            time--;
            return (timeElement.innerText = time);
        }
        loseGame(`Time Out! ${word.toUpperCase()} is a correct word`);
    }, 1000);
}

initGame();

document.getElementById("savescramble").onclick = function () {
    isLoggedIn(document.querySelector("#scramblename").value);
    document.querySelector("#scramblebox").style.display = 'none';
}

function isLoggedIn($scramblename) {
    $.ajax({
        url: "./src/check_login.php",
        type: "GET",
        success: function (response) {
            if (response === "true") {
                console.log("User is logged in");
                // User is logged in, continue with the game
            } else {
                console.log("User is not logged in");
                //pop up to ask for name if the player isnt logged in
                username = $scramblename;
                if (username == null || username.trim() == "") {
                    console.log("Username is required.");
                    return;
                }
            }
        },
        error: function (xhr, status, error) {
            console.error("Error checking login status: " + error);
        }
    });
}
// Refresh Game
refreshButton.addEventListener("click", () => loseGame());

function refreshGame(msg) {
    if (msg) alert(msg);
    word = "";
    time = 20;
    clearInterval(timer);
    timer = null;
    initGame();
}

// game over
function gameOver() {
    let msg = `Game Over! You get ${score} points, play again!`;
    num = 3;
    score = 0;
    updateScore(score);
    updateHighScores();
    refreshGame(msg);
}

// lose game
function loseGame(msg) {
    // alert(msg);
    num--;
    if (num < 0) {
        return gameOver();
    }
    clearInterval(timer);
    refreshGame();
}

// win game
function winGame(msg) {
    score = + 10;
    updateScore(score);
    updateHighScores();
    $.ajax({
        url: "/ITproj_PixelPlayground-master/src/highscore.php",
        type: "POST",
        data: { username: username, score: score, game: "Scramble" },
        success: function (response) {
            console.log("score sent <3");
        },
        error: function (xhr, status, error) {
            console.error("Error sending score :( " + error);
        }
    });
    refreshGame(msg);
}

// Check input disabled
input.addEventListener("input", (e) => {
    if (!e.target.value.trim()) {
        checkButton.setAttribute("disabled", true);
    } else {
        checkButton.removeAttribute("disabled");
    }
});

// Check the word
checkButton.addEventListener("click", () => {
    let answerText = input.value.toLowerCase().trim();
    if (answerText !== word) {
        return loseGame(`Oops! ${answerText.toUpperCase()} is not a correct word`);
    }

    return winGame(`Congrats! ${answerText.toUpperCase()} is a correct word`);
});
