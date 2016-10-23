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
  window.addTodo = function(){

  };

});
