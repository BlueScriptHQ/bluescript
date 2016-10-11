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
    alert();
  }

  $(".check").on("click", checkControl);
  $(".prio").on("click", choosePrio);
  $(".todo_item_name").on("click", openItem);
});
