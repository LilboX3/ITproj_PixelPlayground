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
	<div class="parent-flex-container">
	      <div id="scoreboard" class="scoreboard">
	          <div class="score-label">SCORE:....<span id="score">0</span></div>
	      </div>
	      <div id="topfive" class="topfive">
	          <span id="top5score"></span>
	      </div>
	
		<div class="container">
		  <div class="row">
		  <div class="col-1"> 
		    
		    </div>
		  <div class="col-10">
		<?php 
			if(isset($_SESSION['username'])){ ?>
				<script>
					var username = '<?php echo $_SESSION['username']; ?>';
					console.log("Current username inside .php : ", username);
				</script>
				<?php 
			} 
		?>
	  	<?php 
			if(!isset($_SESSION['username'])){?>
	  			<div class="entername" id="memorybox">
					<div style="font-size:small;">Enter your name to save your score !</div>
						<input type="text" id="memoryname" placeholder="be creative!"> <button id="savememory">Save</button>
					</div>
				<?php 
			}
		?>
		 
		 <div id = "spielbereich">
		    <h1 id="memorytitle">MEMORY</h1>
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
		
		   <div class="infobox">
		    <div id="restartMemory" class="labels">
			<button>Restart</button>
		    </div>
		    </div>
		
		  </div>
		
		   <div class="col-1"> 
		    
		  </div>
		 </div>
		
		
		</div>
	</div>	
<script src="Memory/memory.js"></script>
</body>
</html>
