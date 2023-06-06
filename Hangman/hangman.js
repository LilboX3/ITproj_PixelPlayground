var words = ["BANANA", "TELEVISION", "VIDEO GAMES", "LEAGUE", "KEYBOARD", "JAZZ", "BOGUS", "PENGUIN", "TAPESTRY", "BULLET", "CLOCK", "XYLOPHONE", "PNEUMONIA"];
var hints = ["a yellow fruit", "what nobody watches anymore", "what people play", "a game that everyone hates", "something you type on", "a style of music", "not genuine",
            "an animal that swims", "a piece of coloured fabric", "gun shoot", "the time", "a funky instrument", "when lungs go ouchie"];
var currWord;
var toFind = 0;
var mistakes = 0;
var wordIndex;
var score = 0;
var username = "";


//must be same length
console.log("words and hints array same length: " + (words.length==hints.length));

$(document).ready(
   setupGame(),
   wordLines()
);

//button pressed to show a hint
function getHint(){
    var txt = $("<p></p>").text(hints[wordIndex]);
    $("#hint").append(txt);
    $("#hint").removeAttr("onclick");
}

//choose a word, get index of word in the array, count how many letters there are to find
function setupGame(){
    let random = Math.floor(Math.random() * words.length);
    console.log("picked the word: "+words[random]);
    currWord = words[random];
    wordIndex = random;
    
    for(let i = 0; i<currWord.length;i++){
        if(currWord[i]==" "){
            continue;
        } else {
            toFind++;
        }
    }
}

//fill the screen with as many lines as there are letters
function wordLines(){
    let length = currWord.length;
    for(let i=0; i<length;i++){
        if(currWord[i]==" "){
            var txt = $("<td></td>").text(" | ");
            $(".displayword table tr").append(txt);
        } else {
            var txt = $("<td></td>").text("_ ");
            txt.attr("id", "line"+i);
            $(".displayword table tr").append(txt);
        }
    }
}

document.getElementById("savehangman").onclick = function(){
    isLoggedIn(document.querySelector("#hangmanname").value);
    document.querySelector("#hangmanbox").style.display = 'none';
}

function isLoggedIn($name) {
    $.ajax({
        url: "./src/check_login.php",
        type: "GET",
        success: function(response) {
            if (response === "true") {
                console.log("User is logged in");
                // User is logged in, continue with the game
            } else {
                console.log("User is not logged in");
                username = $name;
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

//when a letter button is clicked, check if its right or not
function input($letter){
    let found = false;
    let letterCount = 0;
    console.log(toFind);

    for(let i=0;i<currWord.length;i++){
        if(currWord[i]==$letter){
            letterCount++;
            found = true;
            $("#line"+i).text($letter);
            $("#line"+i).css("fontSize", 20);
        }
    }
    $("#"+$letter).prop("disabled", "true");

    if(found==false){
        score = 0;
        mistakes++;
    } else {
        toFind -= letterCount;
    }

    updateImage();
    //game lost
    if(mistakes==11){
        $(".btn-info").prop("disabled", "true");
        $("#hint").hide();
        $("#new").show();
    }

    //all letters found
    if(toFind == 0){
        score += 10;
        $("#hangmanpic").attr("src", "pics/won.png");
        $(".btn-info").prop("disabled", "true");
        $("#hint").hide();
        $("#new").show();


        $.ajax({
            url: "/ITproj_PixelPlayground-master/Backend/db.php",
            type: "POST",
            data: { username: username, score: score, game: "Hangman" },
            success: function(response) {
                console.log("score sent <3");
            },
            error: function(xhr, status, error) {
                console.error("Error sending score :( " + error);
            }
        });
        
    }
}

//draw the hangman
function updateImage(){
    switch(mistakes){
        case 1:
            $("#hangmanpic").attr("src", "pics/hang1.png");
            break;
        case 2:
            $("#hangmanpic").attr("src", "pics/hang2.png");
            break;
        case 3:
            $("#hangmanpic").attr("src", "pics/hang3.png");
            break;
        case 4:
            $("#hangmanpic").attr("src", "pics/hang4.png");
            break;
        case 5:
            $("#hangmanpic").attr("src", "pics/hang5.png");
            break;
        case 6:
            $("#hangmanpic").attr("src", "pics/hang6.png");
            break;
        case 7:
            $("#hangmanpic").attr("src", "pics/hang7.png");
            break;
        case 8:
            $("#hangmanpic").attr("src", "pics/hang8.png");
            break;
        case 9:
            $("#hangmanpic").attr("src", "pics/hang9.png");
            break;
        case 10:
            $("#hangmanpic").attr("src", "pics/hang10.png");
            break;
        case 11:
            $("#hangmanpic").attr("src", "pics/hang11.png");
            break;
        default:
            break;
    }
}
