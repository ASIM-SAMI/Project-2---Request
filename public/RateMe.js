/* Rates by Stars */
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