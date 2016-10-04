<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>Persoonlijk</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../../css/prefixes.css" media="screen" title="no title">
    <link rel="stylesheet" href="css/sub_pages.min.css" media="screen" title="no title">
  </head>

  <body>
    <div class="todo_all_wrapper">
      <div class="todo_items_wrapper">
        <div class="todo_item_name">
          <div class="prio_color"></div>
          <p>hoi</p>
          <div class="img_container">
            <img src="../../img/todo_img/check.png" alt="check" class="check"/>
          </div>
        </div>
      </div>
      <div class="todo_add">
        <p>Nieuw item aanmaken
          <img src="../../img/todo_img/add.png" alt="add" />
        </p>
      </div>
    </div>

    <div class="todo_content_wrapper">
      <form class="todo_content_container" action="" method="post">
          <input type="text" name="title" placeholder="Titel hier...">
          <textarea name="description" placeholder="Vul hier een omschrijving in..."></textarea>
          <div class="choose_prio_wrapper">
            <p>Prioriteit</p>
            <div class="prio prio_normaal active_prio">

            </div>
            <div class="prio prio_hoog">

            </div>
            <div class="prio prio_extreem">

            </div>
          </div>

          <div class="todo_footer">
            <div class="btn_class btn_addUser">
              <input type="button" name="addUser_btn" value="Gebruikers">
            </div>
            <div class="btn_class btn_delete">
              <input type="button" name="addUser_btn" value="Verwijderen">
            </div>
            <div class="btn_class btn_addItem">
              <input type="button" name="addUser_btn" value="Toevoegen">
            </div>
          </div>
      </form>
    </div>

    <!--Vendor scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!--Custom scripts-->
    <script src="../../js/todoMenuControls.js"></script>
  </body>
</html>
