<?php
// check_login.php

session_start();

if (isset($_SESSION['username'])) {
    // User is logged in
    echo "true";
} else {
    // User is not logged in
    echo "false";
}
?>
