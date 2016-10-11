<?php
session_start();
require "connection.php";

if(isset($_POST["username"])){
  $username = htmlentities(trim($_POST["username"]));
  $password = htmlentities(trim($_POST["password"]));

  $sql = "SELECT u_password, u_username FROM users WHERE u_username = :username ";

  $stmt = $conn->prepare($sql);
  $stmt -> execute(array(
    ':username'=> $username
  ));
  $res = $stmt->fetch();
  $db_password = $res["u_password"];

  if($stmt->rowCount() > 0){
    if(password_verify($password, $db_password)){
      $_SESSION["username"]= ucfirst($res['u_username']);
      echo "Combinatie correct.";
    }
    else{
      echo "Gebruikersnaam en/of wachtwoord niet bekend.";
    }
  }
  else {
    echo "Gebruikersnaam en/of wachtwoord niet bekend.";
  }
}

  if(isset($_POST["logmeout"])){
    session_destroy();
  }

?>
