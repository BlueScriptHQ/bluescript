$(document).ready(function(){

  // laden van todos
  function loadTodo(){
    $.ajax({
      url: "../../php/functions.php",
      data: "loadTodoPhp=true",
      method: "GET",
      success: function(r){
        $(".todo_items_wrapper").html(r);
      }
    });
  } loadTodo();

  // toevoegen van todo
  window.addTodo = function(t, d, p){

    $.ajax({
      url: "../../php/functions.php",
      data: "insert=true&todoTitle=" + t + "&todoDesc=" + d + "&todoPrio=" + p,
      method: "POST",
      success: function(r){
        loadTodo();
      }
    });

  };

  window.openTodo = function(p_id){

    $.ajax({
      url: "../../php/functions.php",
      data: "open=true&todoID=" + p_id,
      method: "POST",
      success: function(r){
        var result = JSON.parse(r);
        result = result[0];

        $("#open-form input[type=hidden]").val(result.p_id);
        $("#open-form input[name=title]").val(result.p_name);
        $("#open-form textarea[name=description]").val(result.p_desc);
        $("#open-form .prio").removeClass("active_prio");
        $("#open-form").find(".prio:eq(" + result.p_prio + ")").addClass("active_prio");

        $(".open_item").show();
        $(".new_item").hide();
      }
    });

  };

  window.updateTodo = function(p_id, t, d, p){

    $.ajax({
      url: "../../php/functions.php",
      data: "update=true&todoID=" + p_id + "&todoTitle=" + t + "&todoDesc=" + d + "&todoPrio=" + p,
      method: "POST",
      success: function(){
        loadTodo();
        $("#todo_result").text("Wijzigingen doorgevoerd.");
      }
    });


  };



});
