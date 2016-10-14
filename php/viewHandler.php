<?php

  try {
     $user = "gerrizo42_admin";
     $pass = "gsijberen17";
     $conn = new PDO('mysql:host=localhost;dbname=gerrizo42_bluescript', $user, $pass);
   } catch (PDOException $e) {
     echo "Er is een probleem met de verbinding, probeer het later opnieuw.";
     die();
  }

  if(isset($_GET["fileName"])){

    $stmt = $conn->prepare("SELECT count(*) AS totaal FROM pages WHERE pages_name = :filename");
    $stmt->execute(array(":filename" => $_GET["fileName"]));
    $ftch = $stmt->fetch();
    $count = $ftch["totaal"];

    if($count == "0"){
      $stmt = $conn->prepare("INSERT INTO pages (pages_name, pages_count)
      VALUES (:name, :count)");
      $stmt->execute(array(":name" => $_GET["fileName"], ":count" => 1));
    } else {
      $stmt = $conn->prepare("UPDATE pages SET pages_count = pages_count + 1 WHERE pages_name = :fileName");
      $stmt->execute(array(":fileName" => $_GET["fileName"]));
    }
    return false;
  }
?>
