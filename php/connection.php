<?php
error_reporting(0);

$servername = "localhost";
$db = "gerrizo42_bluescript";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
    }
catch(PDOException $e)
    {
    echo "Niet kunnen verbinden met de database. :(";
    }
?>
