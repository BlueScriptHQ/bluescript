$(document).ready(function(){
  function checkControl(){
    $(this).parent().parent().addClass("todo_item_overlay");
    $(this).parent().parent().find(".prio_color").addClass("prio_overlay");
    $(this).hide();
  }

  $(".check").on("click", checkControl);
});
