

var seconds = 0;
var timer = document.getElementById('time');
var images = [];
images.length = 16;
var pick = 0;
var tries = 0;
var toCompare;
var clicked = 0;
var correct = 0;
var score = 16;
updateScore(score);
updateHighScores();
document.getElementById('restartMemory').onclick = function() {
    correct = 0;
    score = 16;
    location.reload(); //is simpler als alles zu leeren und wieder aufzubauen ig
    
}

fillArray(images);


function incrementSeconds(cancel) {
    if(correct>=16){
        clearInterval(cancel);
        timer.innerHTML = "Won in: " + seconds + " sek.";
        return;
    }
    seconds += 1;
    timer.innerHTML = "Zeit: " + seconds + " sek.";
}

function timeDisplay(){
    var cancel = setInterval(incrementSeconds, 1000, cancel);
}

function fillArray(){
    for(let i=0;i<images.length;i++){
        if(i>=8){
            images[i]=document.createElement("img")
            images[i].setAttribute("src", "Memory/images/unaufgedeckt.png");
            images[i].setAttribute("class", "img"+(i-8));


        } else{
        images[i]= document.createElement("img")
        images[i].setAttribute("src", "Memory/images/unaufgedeckt.png");
        images[i].setAttribute("class", "img"+i);
    
        }
        images[i].setAttribute("onClick", "showPic(this)");
        images[i].setAttribute("id", "pos"+i);
    }
    shuffleArray();
}

function shuffleArray(){
    for(let i=0;i<images.length;i++){
        let pos = Math.floor(Math.random()*16);
        let temp = images[pos];
        images[pos] = images[i];
        images[i] = temp;
    }
    createHTML();
}

document.getElementById("savememory").onclick = function(){
    isLoggedIn(document.querySelector("#memoryname").value);
    document.querySelector("#memorybox").style.display = 'none';
}

function isLoggedIn($memoryname) {
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
                username = $memoryname;
                    console.log("THEUSERNAME IS:::"+username);
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

function createHTML(){
    const spielbereich = document.querySelector("#spielbereich");

    for(let i=0;i<images.length;i++){
        spielbereich.appendChild(images[i]);
        if((i+1)%4==0){
           spielbereich.appendChild(document.createElement("BR"));
        }
    
    }

}

function found(img){
    document.getElementById(toCompare.id).setAttribute("src", "Memory/images/aufgedeckt.png");
    document.getElementById(img.id).setAttribute("src", "Memory/images/aufgedeckt.png");
    document.getElementById(toCompare.id).removeAttribute("onClick");
    document.getElementById(img.id).removeAttribute("onClick");
    toCompare = null;
    clicked = 0;
    correct = correct + 2;
    if(score>=16){
        $.ajax({
           url: "/ITproj_PixelPlayground-master/src/highscore.php",
            type: "POST",
            data: { username: username, score: score, game: "Memory" },
            success: function(response) {
                console.log("score sent <3");
            },
            error: function(xhr, status, error) {
                console.error("Error sending score :( " + error);
            }
        });
        document.getElementById("memorytitle").innerHTML = "Won in "+tries+" tries!";
        updateHighScores();
    }
}

function hide(img){
    document.getElementById(toCompare.id).setAttribute("src", "Memory/images/unaufgedeckt.png");
        document.getElementById(img.id).setAttribute("src", "Memory/images/unaufgedeckt.png");
        toCompare = null;
        clicked = 0;
}

function comparePics(img){
    if(toCompare.className ==img.className &&toCompare.id!=img.id){
        const myTimeout = setTimeout(found, 2000, img);
        //clearTimeout(myTimeout);
    } else {
        const myTimeout2 = setTimeout(hide, 2000, img);
        score = score - 1 ;
        console.log("score is ", score);
        updateScore(score);
        //clearTimeout(myTimeout2);
    }
    
    
}

function showPic(img){
    if(clicked>=2){
        return;
    }
    clicked++;
    let elClass = img.className;
    let id = img.id;
    let element = document.getElementById(id);
    if(pick<3){
        pick++;
    }
    if(pick>=2){
        pick = 0;
        countTry();
    }

    if(elClass == "img0"){
        element.setAttribute("src","Memory/images/card1.png");
    }
    else if(elClass == "img1"){
        element.setAttribute("src","Memory/images/card2.png");
    }
    else if(elClass == "img2"){
        element.setAttribute("src","Memory/images/card3.png");
    }
    else if(elClass == "img3"){
        element.setAttribute("src","Memory/images/card4.png");
    }
    else if(elClass == "img4"){
        element.setAttribute("src","Memory/images/card5.png");
    }
    else if(elClass == "img5"){
        element.setAttribute("src","Memory/images/card6.png");
    }
    else if(elClass == "img6"){
        element.setAttribute("src","Memory/images/card7.png");
    }
    else if(elClass == "img7"){
        element.setAttribute("src","Memory/images/card8.png");
    }

    if(toCompare==null){
        toCompare = img;
    } else {
        comparePics(img);
    }


}

function countTry(){
    tries++;
    document.getElementById("tries").innerHTML = "Tries: "+tries;
}

function updateScore(newScore) {
    document.getElementById('score').innerHTML = newScore;
}
function updateHighScores() {
    $.ajax({
        url: '/ITproj_PixelPlayground-master/src/topfivescores.php',  // adjust this path to the location of your PHP script
        type: 'POST',
        data: { game: 'Memory' },  // replace 'Hangman' with your game's name
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


