<?php

  session_start();
  require "connection.php";



if(isset($_GET["loadTodoPhp"])){
  $sql = "SELECT * FROM together_todo";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach($res as $result){
    $class = "";
    switch($result["t_prio"]){
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

    $doneClass = ($result['t_done'] === "0") ? "" : " todo_item_overlay";
    $donePrio = ($result['t_done'] === "0") ? "" : " prio_overlay";
    $hideCheck = ($result['t_done'] === "0") ? "<img src='../../img/todo_img/check.png' alt='check' class='check'/>" : "";
    $name = (strlen($result['t_name']) > 20) ? substr($result['t_name'], 0, 20)."..." : $result['t_name'];

    echo "
        <div class='todo_item_name ".$doneClass."'>
          <div class='prio_color ".$class.$donePrio."'></div>
          <p>".$name."</p>
          <input type='hidden' value='".$result["t_id"]."'/>
          <div class='img_container'>
            ".$hideCheck."
          </div>
        </div>";
  }
}

  if(isset($_POST["insert"])){
    $title = $_POST['todoTitle'];
    $desc = $_POST["todoDesc"];
    $prio = $_POST["todoPrio"];
    $deadline = $_POST["todoDeadline"];

    $sql = "INSERT INTO together_todo (t_name, t_desc, t_deadline, t_prio)
            VALUES (:title, :desc, :t_deadline, :prio);";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":title" => $title,
      ":desc" => $desc,
      ":t_deadline" => $deadline,
      ":prio" => $prio
    ));

  }

  if(isset($_POST["open"])){
    $t_id = $_POST["todoID"];

    $sql = "SELECT * FROM together_todo WHERE t_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":id"=> $t_id
    ));
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($res);
  }

  if(isset($_POST["update"])){
    $t_id = $_POST["todoID"];
    $title = $_POST["todoTitle"];
    $desc = $_POST["todoDesc"];
    $prio = $_POST["todoPrio"];
    $deadline = $_POST["todoDeadline"];

    $sql = "UPDATE together_todo
            SET t_name = :title,
                t_desc = :desc,
                t_prio = :prio,
                t_deadline = :deadline,
                t_done = 0
            WHERE t_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":title" => $title,
      ":desc" => $desc,
      ":prio" => $prio,
      ":deadline" => $deadline,
      ":id" => $t_id
    ));
  }

  if(isset($_POST["check"])){
    $t_id = $_POST["todoID"];

    $sql = "UPDATE together_todo
            SET t_done = 1
            WHERE t_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":id" => $t_id
    ));
  }

  if(isset($_POST["delete"])){
    $t_id = $_POST["todoID"];

    $sql = "DELETE FROM together_todo
            WHERE t_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":id" => $t_id
    ));
  }

?>
