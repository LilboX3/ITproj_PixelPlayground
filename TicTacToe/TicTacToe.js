
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const announcer = document.querySelector(".announcer");
    const disableAIButton = document.querySelector("#disableAI");
    const enableKIButton = document.querySelector("#enableKI");


    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;
    let scoreX = 0;
    let scoreO = 0;
    var username = "";
    var username2 = "";
    let powerUpEnabled = false;
    let isAIInactive = false;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes("")) announce(TIE);
    }


    function isLoggedIn($toename) {
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
                    username = $toename;
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



    function secondPlayer($toename2) {
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
                    username2 = $toename2;
                    if (username2 == null || username2.trim() == "") {
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

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                scoreO += 10;
                $.ajax({
                    url: "/ITproj_PixelPlayground-master/src/highscore.php",
                    type: "POST",
                    data: { username: username, score: scoreO, game: "Tic_Tac_Toe" },
                    success: function (response) {
                        console.log("score sent <3");
                    },
                    error: function (xhr, status, error) {
                        console.error("Error sending score :( " + error);
                    }
                });
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                scoreX += 10;
                $.ajax({
                    url: "/ITproj_PixelPlayground-master/src/highscore.php",
                    type: "POST",
                    data: { username: username2, score: scoreX, game: "Tic_Tac_Toe" },
                    success: function (response) {
                        console.log("score sent <3");
                    },
                    error: function (xhr, status, error) {
                        console.error("Error sending score :( " + error);
                    }
                });
                break;
            case TIE:
                announcer.innerText = "Tie";
        }
        announcer.classList.remove("hide");
    };

    const isValidAction = (tile) => {
        return tile.innerText !== "X" && tile.innerText !== "O";
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    // In der Funktion changePlayer()
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
        // KI aktivieren, wenn Spieler "O" ist und die KI nicht deaktiviert ist
        if (currentPlayer === "O" && isGameActive && !isAIInactive) {
            computerMove();
        }
    };

    // Hinzufügen des Event Listeners für den Button, der die KI deaktiviert
    disableAIButton.addEventListener("click", () => {
        isAIInactive = true;
    });

    const animateTile = (tile) => {
        tile.style.animation = "fadeInAnimation 0.3s";
        setTimeout(() => {
            tile.style.animation = "";
        }, 300);
    };


    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            if (powerUpEnabled) {
                tile.innerText = currentPlayer === "X" ? "O" : "X";
                powerUpEnabled = false;
            } else {
                tile.innerText = currentPlayer;
            }
            tile.classList.add(`player${currentPlayer}`);
            animateTile(tile);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    //KI
    const computerMove = () => {
        if (!isGameActive) return;

        const availableMoves = board.reduce(
            (acc, curr, idx) => (curr === "" ? [...acc, idx] : acc),
            []
        );

        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            const tile = tiles[randomMove];
            userAction(tile, randomMove);
        }
    };


    const resetBoard = (enableKI = false) => {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        announcer.classList.add("hide");

        if (currentPlayer === "O") {
            changePlayer();
        }

        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
            tile.classList.add("clear-animation"); // Füge die CSS-Klasse hinzu
        });

        // Füge einen Timeout hinzu, um die Felder wieder anzuzeigen
        setTimeout(() => {
            tiles.forEach((tile) => {
                tile.classList.remove("clear-animation");
            });
        }, 500);

        //KI
        if (enableKI) {
            computerMove();
        }
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
    });

    resetButton.addEventListener("click", resetBoard);

    const enablePowerUp = () => {
        powerUpEnabled = true;
    };

    function flipBoard(direction) {
        const newBoard = ["", "", "", "", "", "", "", "", ""];
        if (direction === "horizontal") {
            for (let i = 0; i < 9; i++) {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const newRow = row;
                const newCol = 2 - col;
                newBoard[newRow * 3 + newCol] = board[row * 3 + col];
            }
        } else if (direction === "vertical") {
            for (let i = 0; i < 9; i++) {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const newRow = 2 - row;
                const newCol = col;
                newBoard[newRow * 3 + newCol] = board[row * 3 + col];
            }
        }
        board = newBoard;
        tiles.forEach((tile, index) => {
            tile.innerText = board[index];
            tile.classList.remove("playerX", "playerO");
            if (board[index]) {
                tile.classList.add(`player${board[index]}`);
            }
        });


    }

    // Fügen Sie diesen Event-Listener am Ende des Skripts hinzu
    document.querySelector("#changeSymbolPowerUp").addEventListener("click", enablePowerUp);
    document.querySelector("#flipHorizontal").addEventListener("click", () => flipBoard("horizontal"));
    document.querySelector("#flipVertical").addEventListener("click", () => flipBoard("vertical"));
    //KI
    document.querySelector("#enableKI").addEventListener("click", () => {
        isAIInactive = false;
        resetBoard(true);
    });


/*user eingeloggt, name für 2. spieler*/
function savePlayer2(){
    username2 = document.querySelector("#tictactoename2nd").value;
    document.querySelector("#tictactoebox2").style.display = 'none';
}

function savePlayers(){
    username = document.querySelector("#tictactoename").value ;
    username2 = document.querySelector("#tictactoename2").value;
    document.querySelector("#tictactoebox").style.display = 'none';
}






