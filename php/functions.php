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

    $doneClass = ($result['p_done'] === "0") ? "" : " todo_item_overlay";
    $donePrio = ($result['p_done'] === "0") ? "" : " prio_overlay";
    $hideCheck = ($result['p_done'] === "0") ? "<img src='../../img/todo_img/check.png' alt='check' class='check'/>" : "";
    $name = (strlen($result['p_name']) > 20) ? substr($result['p_name'], 0, 20)."..." : $result['p_name'];

    echo "
        <div class='todo_item_name ".$doneClass."'>
          <div class='prio_color ".$class.$donePrio."'></div>
          <p>".$name."</p>
          <input type='hidden' value='".$result["p_id"]."'/>
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
                p_prio = :prio,
                p_done = 0
            WHERE p_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":title" => $title,
      ":desc" => $desc,
      ":prio" => $prio,
      ":id" => $p_id
    ));
  }

  if(isset($_POST["check"])){
    $p_id = $_POST["todoID"];

    $sql = "UPDATE personal_todo
            SET p_done = 1
            WHERE p_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":id" => $p_id
    ));
  }

  if(isset($_POST["delete"])){
    $p_id = $_POST["todoID"];

    $sql = "DELETE FROM personal_todo
            WHERE p_id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(
      ":id" => $p_id
    ));
  }

?>
