<?php

  session_start();
  require "connection.php";



if(isset($_GET["loadTodoPhp"])){
  $sql = "SELECT * FROM personal_todo WHERE u_id = :id ";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array(
    ":id"=> $_SESSION["id"]
  ));
  $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

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

  if(isset($_POST["insert"])){
    $title = $_POST["todoTitle"];
    $desc = $_POST["todoDesc"];
    $prio = $_POST["todoPrio"];

    $sql = "INSERT INTO personal_todo (p_name, p_desc, p_prio, u_id)
            VALUES (:title, :desc, :prio, :user_id);";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":title" => $title,
      ":desc" => $desc,
      ":prio" => $prio,
      ":user_id" => $_SESSION["id"]
    ));

  }

  if(isset($_POST["open"])){
    $p_id = $_POST["todoID"];

    $sql = "SELECT * FROM personal_todo WHERE p_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":id"=> $p_id
    ));
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($res);
  }

  if(isset($_POST["update"])){
    $p_id = $_POST["todoID"];
    $title = $_POST["todoTitle"];
    $desc = $_POST["todoDesc"];
    $prio = $_POST["todoPrio"];

    $sql = "UPDATE personal_todo
            SET p_name = :title,
                p_desc = :desc,
                p_prio = :prio
            WHERE p_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":title" => $title,
      ":desc" => $desc,
      ":prio" => $prio,
      ":id" => $p_id
    ));

  }
?>
