const express = require('express');
const router = express.Router()
var User = require("../models/userM");
var Ticket = require("../models/ticketsM");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");
const upload = require("express-fileupload")

router.use(upload())
router.use(
    session({
      store: new mongoSessisonStore({ mongooseConnection: mongoose.connection }),
      saveUninitialized: true,
      resave: true,
      secret: "Epslion's super secret",
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    })
);

//================== Log In Http ==================//

//========= Log In Render Page =========//

router.get('/login' , (req,res) =>{
         var err = ""
       res.render('logIn' , {err : err })
    
})
//=====================================//

//========= Log In Form Action =========//
router.post(('/sessions')



,(req, res) => {

    User.authenticate(
        req.body.email,
        req.body.password,
        (err, user) => {
        if (err) {
          console.log("Authentication error: ", err);
          res.render('logIn', { err })
          res.status(500)
         
        } else {
          req.session.userId = user._id;
          req.session.user = user;
          console.log(user)
          console.log("session: ",req.session)
          res.redirect("/main");
        
        }
      });


})
//====================================//

//============================================//

//================Freelancer Profile============

router.get("/profile", (req, res) => {
  console.log("From Login/Signup req.session.userId: ", req.session.userId);
  User.findOne({ _id: req.session.userId })
    .then((currentUser) => {
      res.render("profile", { user: currentUser });
    })
    .catch((err) => console.log("Error: User not found ", err));
});
//================Seeker Profile============


router.get("/EditProfile", (req, res) => {
  //res.sendFile(__dirname +'./Files')
  console.log("From Login/Signup req.session.userId: ", req.session.userId);
  User.findOne({ _id: req.session.userId })
    .then((currentUser) => {
      res.render("EditProfile", { user: currentUser });
    })
    .catch((err) => console.log("Error: User not found ", err));
});
//==============
router.use("/protected-profile", (err, req, res, next) => {
  console.log(err);
  res.redirect("/logIn");
});

///=======================Edit Profile ===============


// update action
router.post("/EditProfile", (req, res) => {
 if(req.files){
   console.log(req.files)
 }
    const id = req.params.id;
    let updateUserProfile = {
        name: req.body.name,
        email: req.body.email,
        img: req.body.img,
        heading: req.body.heading,
        bio: req.body.bio
    };
    console.log("Updated Profile "+updateUserProfile)
    User.findByIdAndUpdate(req.session.userId, updateUserProfile)
        
      .then((user) => {
        res.render("profile", { user });

        
  }).catch((err) => console.log("Error: User not found ", err));

});
//====================== Main 
router.get('/main' , (req,res) =>{
  if(req.query.myorder){
    Ticket.find({user: req.session.userId}).sort({'updatedAt': -1}).populate('user').exec()
    .then((allTicket)=>{
        res.render('main' , {data: allTicket , user: req.session.user , search: true} )

    }).catch(err=> {console.log(err)})
  }else{
      Ticket.find().sort({'updatedAt': -1}).populate('user').exec()

        .then((allTicket)=>{
            res.render('main' , {data: allTicket , user: req.session.user, search: false })

        }).catch(err=> {console.log(err)})
      }
})

///==================filter teiket by category ===========
router.get('/main/:category' , (req,res) =>{

  Ticket.find({category: req.params.category}).populate('user')
    .then((allTicket)=>{
        res.render('main' , {data: allTicket , user: req.session.user , search: false })
    }).catch(err=> {console.log(err)})
}) 



//================Sign out=============
router.get("/logout" ,(req, res) => {
  req.session.userId = null;
  req.session.user= null;
  res.redirect("/logIn");
  
})

function checkSignIn(req, res, next) {
    // if the user is logged in, just go onto the router with the netxt() keyword
    if (req.session.userId) {
      next();
    } else {
      const err = new Error("You are not logged in!");
      next(err);
    }
  
}

//-----------------------------------

router.get('/' , (req,res) =>{

    var id = req.session.userId;
    User.findById(id)
    .then((findUser)=>{


        res.render('index' , {findUser})


        
    }).catch(err =>{ console.log(err)})
    
})

//------------------SIGNUP-----------------

router.get('/signup' , (req,res) =>{

    res.render('signUp')
})

router.post('/users' ,(req, res) => {
    User.createSecure(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.img,
        req.body.type,
        req.body.heading,
        req.body.bio,
        
        (err, newUser) => {

        var id = req.session.userId;
        console.log("newUser: ", newUser);
        console.log("user Id: ",id)

       User.findById(id)
       .then((user)=>{
       res.redirect('/logIn')
   
           
       }).catch(err =>{ console.log(err)})
      });

})

   
module.exports = router;
