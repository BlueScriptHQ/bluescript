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
    $p_id = $(this).find("input[type='hidden']").val();

    $(".new_item").hide();
    $(".open_item").show();
  }

  function newItem(){
    $(".open_item").hide();
    $(".new_item").show();
  }

  function addTodoControl(){
    /*
    var
    var
    var */
    //bezig met ids op de addItem todo form, dan kan ik de values uniek uitlezen
  }

  $(".check").on("click", checkControl);
  $(".prio").on("click", choosePrio);
  $(".todo_add").on("click", newItem);
  $(".todo_items_wrapper").on("click", ".todo_item_name", openItem);
  $(".color_addItem_btn[name=addItem_btn]").on("click", addTodoControl);
});
