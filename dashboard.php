<?php
  session_start();
  require "php/connection.php";
  $sql = "SELECT * FROM menu";
  $stmt = $conn -> prepare($sql);
  $stmt -> execute();
  $res = $stmt -> fetchAll(PDO::FETCH_ASSOC);

  if(!isset($_SESSION["username"])){
    header("Location: index.php");
  }
?>

<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>To Do Applicatie</title>
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
          <h2 class="pageTitle"></h2>
        </div>
    </div>
    <div id="sub_header_wrapper">
      <div id="sub_welcome">
        Welkom, <?php if(isset($_SESSION["username"])){echo$_SESSION["username"];}?>
      </div>
      <div id="sub_logout">
        <p>Uitloggen</p> <img src="img/sub_header/logout.png" alt="logout" />
      </div>
    </div>

    <div id="menu">
      <ul>

      <?php
      for($i=0; $i < count($res); $i++){
        echo"
          <li><a href='#' page=".$res[$i]['m_href'].">".$res[$i]['m_name']."</a></li>
        ";
        }
      ?>
      </ul>
    </div>

    <iframe id="content" src="pages/todo.php"></iframe>

    <!--Vendor scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!--Custom scripts-->
    <script src="js/menuControls.js"></script>
    <script src="js/pageContent.js"></script>
    <script src="js/authenticationsAjax.js"></script>

  </body>
</html>
