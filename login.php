<?php
  require "php/connection.php";
  $sql = "SELECT * FROM menu";
  $stmt = $conn -> prepare($sql);
  $stmt -> execute();
  $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>BlueScript Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/prefixes.css" media="screen" charset="utf-8">
    <link rel="stylesheet" href="css/style.min.css" media="screen" charset="utf-8">
    <link rel="stylesheet" href="css/style.scss" media="screen" charset="utf-8">

    <link rel="icon" href="img/icon/icon.ico" type="image/x-icon" />
  </head>

  <body>
    <div id="header_wrapper">
        <div id="header_logo">
          <h1>BlueScript</h1>
        </div>
        <div id="header_pageTitle">
          <h2 class="pageTitle">Inloggen</h2>
        </div>
    </div>

    <div id="inlog_container">
      <h1>Inloggen</h1>
      <div id="data_wrapper">
        <form class="login" action="" method="post">
          <label for="username">Gebruikersnaam</label><input type="text" name="username" placeholder="Je gebruikersnaam...">
          <label for="username" class="second_label">Wachtwoord</label><input type="password" name="password" placeholder="Je wachtwoord...">
          <p id="resultdiv">Vul hierboven alle velden in...</p>
          <input type="button" name="login_btn" value="Inloggen">
        </form>
      </div>
    </div>

    <!--Vendor scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!--Custom scripts-->
  </body>
</html>
