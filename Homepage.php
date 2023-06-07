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
          <div class="numbertext">1 / 7</div>
          <img src="Homepage/imgs/Hangman.png" alt="game 1" style="width:100%;" onclick="window.open('Hangman.php')">
          <div class="text">Play Hangman</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">2 / 7</div>
          <img src="Homepage/imgs/Pong.png" alt="game 2" style="width:100%; " onclick="window.open('Pong.php')">
          <div class="text">Play Pong</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">3 / 7</div>
          <img src="Homepage/imgs/Snake.png" alt="game 3" style="width:100%; " onclick="window.open('Snake.php')">
          <div class="text">Play Snake</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">4 / 7</div>
          <img src="Homepage/imgs/Memory.png" alt="game 4" style="width:100%; " onclick="window.open('memory.php')">
          <div class="text">Play Memory</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">5 / 7</div>
          <img src="Homepage/imgs/Tetris.png" alt="game 5" style="width:100%; " onclick="window.open('Tetris.php')">
          <div class="text">Play Tetris</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">6 / 7</div>
          <img src="Homepage/imgs/Tictactoe.png" alt="game 6" style="width:100%; " onclick="window.open('TicTacToe.php')">
          <div class="text">Play TicTacToe</div>
        </div>

        <div class="mySlides fade2">
          <div class="numbertext">7 / 7</div>
          <img src="Homepage/imgs/Scramble.png" alt="game 7" style="width:100%;" onclick="window.open('WordScramble.php')">
          <div class="text">Play Word Scramble</div>
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
<script src="Homepage/slideshow.js"></script>
</body>
</html>