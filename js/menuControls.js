$(document).ready(function(){
  $("a").first().addClass("active");
  var pageTitle = $("a").first().text();
  $(".pageTitle").text(pageTitle + " pagina");
  function activeMenu(){
    $("a").removeClass("active").removeAttr("class");
    $(this).addClass("active");
    var pageTitle = $(this).text();
    $(".pageTitle").text(pageTitle + " pagina");
  }

  $("a").on("click", activeMenu);
});
