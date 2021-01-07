console.log("Seeker Profile")
$(".back-to-home").on("click" , ()=>{
    location.href = "main";
 })

 $('#password, #cpassword').on('keyup', function () {
    if ($('#password').val() == $('#cpassword').val()) {
      $('#message').html('Matching').css('color', 'green');
    } else 
      $('#message').html('Not Matching').css('color', 'red');
  });

 $(".material-icons").on("click" ,function insert(){
    $(".img-e").removeClass("content");
  });