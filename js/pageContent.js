$(document).ready(function(){
  function changeContent(){
    var url = $(this).attr("page");
    var concat = "pages/" + url;

    $("iframe").attr("src", concat);
  }
  function changeTodoContent(){
    var url = $(this).attr("page");
    var concat = "sub_pages/" + url;

    $("iframe").attr("src", concat);
  }
  $("a").on("click", changeContent);
  $(".tab_name").on("click", changeTodoContent);
});
