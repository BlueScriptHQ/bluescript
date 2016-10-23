$(document).ready(function(){

  function checkControl(){
    $(this).parent().parent().addClass("todo_item_overlay");
    $(this).parent().parent().find(".prio_color").addClass("prio_overlay");
    $(this).hide();
  }

  function choosePrio(){
    var prioColor = $(this).css("background-color");
    $(".prio").removeClass("active_prio");
    $(this).addClass("active_prio");
  }

  function openItem(){
    var p_id = $(this).find("input[type='hidden']").val();

    openTodo(p_id);
  }

  function newItem(){
    $(".open_item").hide();
    $(".new_item").show();
  }

  function addTodoControl(){
    var title = $("#todo_add_title").val();
    var desc = $("#todo_add_desc").val();
    var prio = 0;

    $("#add-prio").find(".prio").each(function(){
      if($(this).hasClass("active_prio")){
        var classList = $(this).attr('class').split(/\s+/);
        var theClass = classList[1];

        switch(theClass){
          case "prio_normaal":
             prio = 0;
             break;
          case "prio_hoog":
             prio = 1;
             break;
          case "prio_extreem":
             prio = 2;
             break;
          default:
             prio = 0;
             break;
        }
      }
    });

    addTodo(title, desc, prio);
  }

  function updateTodoControl(){
    var p_id = $("#todo_update_id").val();
    var title = $("#todo_update_title").val();
    var desc = $("#todo_update_desc").val();
    var prio = 0;

    $("#open-form").find(".prio").each(function(){
      if($(this).hasClass("active_prio")){
        var classList = $(this).attr('class').split(/\s+/);
        var theClass = classList[1];

        switch(theClass){
          case "prio_normaal":
             prio = 0;
             break;
          case "prio_hoog":
             prio = 1;
             break;
          case "prio_extreem":
             prio = 2;
             break;
          default:
             prio = 0;
             break;
        }
      }

    });

    updateTodo(p_id, title, desc, prio);

  }

  $(".check").on("click", checkControl);
  $(".prio").on("click", choosePrio);
  $(".todo_add").on("click", newItem);
  $(".todo_items_wrapper").on("click", ".todo_item_name", openItem);
  $(".color_addItem_btn[name=addItem_btn]").on("click", addTodoControl);
  $("input[name=modify_btn]").on("click", updateTodoControl);
});
