document.getElementById('illusionmode').onclick = function() {
    crazyresetGame();
    document.querySelector("#gameMode").style.display = 'none';
    document.querySelector("#crazyContainer").style.display = 'block';
    console.log("balls");
}