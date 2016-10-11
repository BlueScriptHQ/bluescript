$(document).ready(function(){
  $("form").submit(function(e){
    e.preventDefault();
  });

  $("input[name=login_btn]").on("click", function(){
    $.ajax({
      method: 'POST',
      url: 'php/authentications.php',
      data: 'username='+$("input[name=username]").val()+'&password='+$("input[name=password]").val(),
      success: function(r){
        if(r === "Combinatie correct."){
          location.href = "dashboard.php";
        }
        $("#resultdiv").text(r);
      }
    });
  });

  $("#sub_logout").on("click", function(){
    $.ajax({
      method: 'POST',
      url: 'php/authentications.php',
      data: 'logmeout=true',
      success: function(){
        location.href = "index.php";
      }
    });
  });
});
