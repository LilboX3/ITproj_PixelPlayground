<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="navbar.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
    <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
    <title>Pixel Playground</title>
</head>

<body class="background">

<div class="topnav">
      <div class="centered">
      <a class="active" href="#home">Pixel Playground</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      </div>
    </div>

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