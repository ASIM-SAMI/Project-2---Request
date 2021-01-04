 console.log("Mamal");
$('.dropdown-toggle').dropdown();



// $("#catProgramming").on("click" , ()=>{
//    const filteredTickets =  $(".ticket").children().filter((node)=> node.classList.includes("Programming"));
//    $("#catProgramming").innerHTML = filteredTickets
// })

$("#catDesign").on("click" , ()=>{
    $("#Design").removeClass("tcontent");
   
    $("#All").addClass("tcontent");
    $("#Translation").addClass("tcontent");
    $("#Programming").addClass("tcontent");
    $("#Marketing").addClass("tcontent");
})

$("#catTranslation").on("click" , ()=>{
    $("#Translation").removeClass("tcontent");
    
    $("#All").addClass("tcontent");
    $("#Design").addClass("tcontent");
    $("#Programming").addClass("tcontent");
    $("#Marketing").addClass("tcontent");
})

$("#catMarketing").on("click" , ()=>{
    console.log("cat market")
    $("#Marketing").removeClass("tcontent");
    
    $("#All").addClass("tcontent");
    $("#Design").addClass("tcontent");
    $("#Programming").addClass("tcontent");
    $("#Translation").addClass("tcontent");
})
