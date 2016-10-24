$(document).ready(function(){

  // laden van todos
  function loadTodo(){
    $.ajax({
      url: "../../php/functions_together.php",
      data: "loadTodoPhp=true",
      method: "GET",
      success: function(r){
        $(".todo_items_wrapper").html(r);
      }
    });
  } loadTodo();

  // toevoegen van todo
  window.addTodo = function(t, d, p, dl){

    $.ajax({
      url: "../../php/functions_together.php",
      data: "insert=true&todoTitle=" + t + "&todoDesc=" + d + "&todoDeadline=" + dl + "&todoPrio=" + p,
      method: "POST",
      success: function(r){
        loadTodo();
      }
    });

  };

  window.openTodo = function(t_id){

    $.ajax({
      url: "../../php/functions_together.php",
      data: "open=true&todoID=" + t_id,
      method: "POST",
      success: function(r){
        var result = JSON.parse(r);
        result = result[0];

        $("#open-form input[type=hidden]").val(result.t_id);
        $("#open-form input[name=title]").val(result.t_name);
        $("#open-form textarea[name=description]").val(result.t_desc);
        $("#open-form .prio").removeClass("active_prio");
        $("#open-form").find(".prio:eq(" + result.t_prio + ")").addClass("active_prio");
        $("#open-form input[name=deadline_input]").val(result.t_deadline);
        $(".open_item").show();
        $(".new_item").hide();
      }
    });

  };

  window.updateTodo = function(t_id, t, d, p, dl){
    $.ajax({
      url: "../../php/functions_together.php",
      data: "update=true&todoID=" + t_id + "&todoTitle=" + t + "&todoDesc=" + d + "&todoPrio=" + p + "&todoDeadline=" + dl,
      method: "POST",
      success: function(){
        loadTodo();
        $("#todo_result").text("Wijzigingen doorgevoerd.");
      }
    });


  };

  window.checkTodo = function(t_id){
    $.ajax({
      url: "../../php/functions_together.php",
      data: "check=true&todoID=" + t_id,
      method: "POST",
      success: function(){
        loadTodo();
      }
    });
  };

  window.deleteTodo = function(t_id){
    $.ajax({
      url: "../../php/functions_together.php",
      data: "delete=true&todoID=" + t_id,
      method: "POST",
      success: function(){
        loadTodo();
        newItem();
      }
    });
  };


});
