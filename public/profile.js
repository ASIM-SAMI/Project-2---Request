/* Clicks on Buttons */

console.log("profill");
$("#1").on("click", function(){
    $("#info").removeClass("content");
    $("#feedBack").addClass("content");
    $("#lastSub").addClass("content");
});

$("#2").on("click",function(){
   $("#feedBack").removeClass("content");
   $("#info").addClass("content");
   $("#lastSub").addClass("content");
}); 

$("#3").on("click",function(){
$("#lastSub").removeClass("content");
$("#info").addClass("content");
   $("#feedBack").addClass("content");
});
