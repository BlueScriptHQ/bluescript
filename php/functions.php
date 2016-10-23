<?php

  session_start();
  require "connection.php";

  $sql = "SELECT * FROM personal_todo WHERE u_id = :id ";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array(
    ":id"=> $_SESSION["id"]
  ));
  $res = $stmt->fetchAll(PDO::FETCH_ASSOC);


if(isset($_GET["loadTodoPhp"])){
  foreach($res as $result){
    $class = "";
    switch($result["p_prio"]){
      case 0:
        $class = "prio_normal";
        break;
      case 1:
        $class = "prio_high";
        break;
      case 2:
        $class = "prio_extreme";
        break;
      default:
        $class = "prio_normal";
        break;
    }
    echo "
        <div class='todo_item_name'>
          <div class='prio_color ".$class."'></div>
          <p>".$result["p_name"]."</p>
          <input type='hidden' value='".$result["p_id"]."'/>
          <div class='img_container'>
            <img src='../../img/todo_img/check.png' alt='check' class='check'/>
          </div>
        </div>";
  }
}


?>
