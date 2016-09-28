<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>To Do Applicatie</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/pages.min.css" media="screen" title="no title">
  </head>

  <body>
    <div id="todo_wrapper">
      <div id="tab_container">
        <div class="tab_name t_active" page="todo_personal.php">
          Persoonlijke lijst
        </div>
        <div class="tab_name" page="todo_together.php">
          Gezamenlijke lijst
        </div>
      </div>
      <iframe id="todo_content" src="sub_pages/todo_personal.php"></iframe>
    </div>

    <!--Vendor scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!--Custom scripts-->
    <script src="../js/todoTabControls.js"></script>
    <script src="../js/pageContent.js"></script>
  </body>
</html>
