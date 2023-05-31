<?php
include_once 'navbar.php';
?>
    
    <title>Pixel Playground</title>
</head>

<body class="background">

<div class="container">
  
    <div class="row">

        <div class="col-2"></div>
    <!-- Slideshow container -->

        <div class="col-8">
        <div class="slideshow-container">

        <!-- Full-width images with number and caption text -->
        <div class="mySlides fade2">
          <div class="numbertext">1 / 3</div>
          <img src="pics/pacman.png" alt="game 1" style="width:100%;height:400px;">
          <div class="text">Play Pac Man</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">2 / 3</div>
          <img src="pics/pong.png" alt="game 2" style="width:100%;height:400px;">
          <div class="text">Play Pong</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">3 / 3</div>
          <img src="pics/snake.png" alt="game 3" style="width:100%;height:400px;">
          <div class="text">Play Snake</div>
        </div>

        <!-- Next and previous buttons -->
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        <br>

        <!-- The dots/circles -->
        <div style="text-align:center">
        <span class="dot" onclick="currentSlide(1)"></span>
        <span class="dot" onclick="currentSlide(2)"></span>
        <span class="dot" onclick="currentSlide(3)"></span>
        </div>
        </div>

        <div class="col-2"></div>
  </div>
  
</div>
<script src="slideshow.js"></script>
</body>
</html>