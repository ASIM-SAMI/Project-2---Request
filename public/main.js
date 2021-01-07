
 $(document).ready(function(){
  $(".star input:radio").attr("checked", false);
  $('.star input').click(function () {
      $(".star label").removeClass('checked');
      $(this).parent().addClass('checked');
  });
  $('input:radio').change(
    function(){
      var userRating = this.value;
  }); 
});
/* Rate Me Form */
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
// $("#catProgramming").on("click" , ()=>{
//    const filteredTickets =  $(".ticket").children().filter((node)=> node.classList.includes("Programming"));
//    $("#catProgramming").innerHTML = filteredTickets
// })

$("#catDesign").on("click", () => {
  $("#Design").removeClass("tcontent");

  $("#All").addClass("tcontent");
  $("#Translation").addClass("tcontent");
  $("#Programming").addClass("tcontent");
  $("#Marketing").addClass("tcontent");
});

$("#catTranslation").on("click", () => {
  $("#Translation").removeClass("tcontent");

  $("#All").addClass("tcontent");
  $("#Design").addClass("tcontent");
  $("#Programming").addClass("tcontent");
  $("#Marketing").addClass("tcontent");
});

$("#catMarketing").on("click", () => {
  console.log("cat market");
  $("#Marketing").removeClass("tcontent");

  $("#All").addClass("tcontent");
  $("#Design").addClass("tcontent");
  $("#Programming").addClass("tcontent");
  $("#Translation").addClass("tcontent");
});

