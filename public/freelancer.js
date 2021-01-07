

/* Clicks on Buttons */
$(document).ready(function() {
    $("#1").click(function() {
        $("#info").show();
        $("#feedBack").hide();
    });
    $("#2").click(function(){
        $("#feedBack").show();
        $("#txt-center").show()
        $("#info").hide();
        $("#lastSub").hide();
  });
  $("#3").click(function(){
    $("#lastSub").show();
    $("#info").hide();
    $("#feedBack").hide();
  });
});

