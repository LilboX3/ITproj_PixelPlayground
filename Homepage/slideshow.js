let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n, true);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n, f) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

  if(f!=true){
    setTimeout(function(){
      console.log("Changing slide");
      showSlides(slideIndex = slideIndex+1)
    }, 5000);
  }
}

var bool = false;

/*music player*/
  var btn = document.getElementById("playbutton");
  var audio = new Audio("Music/music1.mp3");
  btn.onclick = function() {
    console.log("---->BOOL IS:"+bool);
    if(!bool){

    console.log("PLAYING NOW");
    audio.play();
    btn.classList.add("paused");

    } else {

    console.log("PAUSING NOW!!!!!");
    audio.pause();
    btn.classList.remove("paused");

    }
    bool = !bool;
  }

  var restart = document.getElementById('restart');
  restart.onclick = function (){
    audio.currentTime = 0;
  }
