<!DOCTYPE html>
<?php
include_once 'navbar.php';
?>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<link rel="stylesheet" href="Memory/memory.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
    <title>Play Memory!</title>
</head>
<body>
<div class="container">
  <div class="row">
  <div class="col-1"> 
    
    </div>
  <div class="col-10">

 
 <div id = "spielbereich">
    
  </div>
  <div class="infobox">
    <div id="tries" class="labels">
        Tries: 0
    </div>
 </div>

   <div class="infobox">
    <div class="labels" id="time">
        Time passed:
        <button onClick="timeDisplay()" id="timebutton">Start a timer!</button>
    </div>
   </div>

  </div>

   <div class="col-1"> 
    
  </div>
 </div>


</div>
<script src="Memory/memory.js"></script>
</body>
</html>