<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>Gezamenlijk</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../css/prefixes.css" media="screen" title="no title">
    <link rel="stylesheet" href="css/sub_pages.min.css" media="screen" title="no title">
  </head>

  <body>
    <div class="todo_all_wrapper">
      <div class="todo_items_wrapper">
        <!-- hier worden de todos geladen! :) -->
      </div>
      <div class="todo_add">
        <p>Nieuw item aanmaken
          <img src="../../img/todo_img/add.png" alt="add" />
        </p>
      </div>
    </div>

    <div class="todo_content_wrapper new_item">
      <form class="todo_content_container" action="" method="post">
          <input type="text" name="title" id="todo_add_title" placeholder="Titel hier...">
          <textarea name="description" id="todo_add_desc" placeholder="Vul hier een omschrijving in..."></textarea>
          <div class="choose_prio_wrapper" id="add-prio">
            <p>Prioriteit</p>
            <div class="prio prio_normaal active_prio"></div>
            <div class="prio prio_hoog"></div>
            <div class="prio prio_extreem"></div>
          </div>
          <div id="todo_deadline_wrapper">
            <p>Deadline</p>
            <input type="text" name="deadline_input" id="todo_add_deadline" placeholder="datum...">
          </div>
          <div class="todo_footer">
            <div class="btn_class btn_addItem btn_add">
              <input type="button" name="addItem_btn" value="Toevoegen" class="color_addItem_btn">
            </div>
          </div>
      </form>
    </div>

    <div class="todo_content_wrapper open_item">
      <form class="todo_content_container" id="open-form" action="" method="post">
          <input type="hidden" value="" id="todo_update_id">
          <input type="text" name="title" id="todo_update_title" placeholder="Titel hier...">
          <textarea name="description" id="todo_update_desc" placeholder="Vul hier een omschrijving in..."></textarea>
          <div class="choose_prio_wrapper">
            <p>Prioriteit</p>
            <div class="prio prio_normaal active_prio"></div>
            <div class="prio prio_hoog"></div>
            <div class="prio prio_extreem"></div>
          </div>
          <div id="todo_deadline_wrapper">
            <p>Deadline</p>
            <input type="text" name="deadline_input" placeholder="datum...">
          </div>
          <div id="todo_result"></div>
          <div class="todo_footer">
            <div class="btn_class btn_addItem btn_modify">
              <input type="button" name="modify_btn" value="Opslaan" class="color_addItem_btn">
            </div>
            <div class="btn_class btn_delete">
              <input type="button" name="delete_btn" value="Verwijderen" class="color_delete_btn">
            </div>
          </div>
      </form>
    </div>


    <!--Vendor scripts-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <!--Custom scripts-->
    <script src="../../js/todoControls.js"></script>
    <script src="../../js/ajax_together.js"></script>
  </body>
</html>
