$(document).ready(function(){

  function checkControl(){
    var p_id = $(this).parent().parent().find("input[type='hidden']").val();
    checkTodo(p_id);
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

  window.newItem = function(){
    $('.todo_content_container').trigger("reset");
    $(".open_item").hide();
    $(".new_item").show();
  };

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

    if($("#todo_add_deadline").length){
      var deadline = $("#todo_add_deadline").val();
      addTodo(title, desc, prio, deadline);
    } else {
      addTodo(title, desc, prio);
    }

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
    if($("#open-form input[name=deadline_input]").length){
      var deadline = $("#open-form input[name=deadline_input]").val();
      updateTodo(p_id, title, desc, prio, deadline);
    } else {
      updateTodo(p_id, title, desc, prio);
    }
  }

  function deleteTodoControl(){
    var p_id = $(this).parent().parent().parent().find("input[type='hidden']").val();
    deleteTodo(p_id);
  }

  $(".todo_items_wrapper").on("click", ".check", checkControl);
  $(".prio").on("click", choosePrio);
  $(".todo_add").on("click", newItem);
  $(".todo_items_wrapper").on("click", ".todo_item_name", openItem);
  $(".color_addItem_btn[name=addItem_btn]").on("click", addTodoControl);
  $("input[name=modify_btn]").on("click", updateTodoControl);
  $("input[name=delete_btn]").on("click", deleteTodoControl);
});
