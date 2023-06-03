<?php


// Function to check if the user is logged in
function isLoggedIn(){
    return isset($_SESSION['username']);
}
