$(document).ready(function(){
  $(".tab_name").first().addClass("t_active");
  function activeTab(){
    $(".tab_name").removeClass("t_active");
    $(this).addClass("t_active");
  }

  $(".tab_name").on("click", activeTab);
});
