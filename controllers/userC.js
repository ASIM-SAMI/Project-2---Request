const express = require('express');
const router = express.Router()
var User = require("../models/userM");
var Ticket = require("../models/ticketsM");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");


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
          console.log("session: ",req.session)
          res.redirect("/main");
        
        }
      });


})
//====================================//

//============================================//

router.get('/main' , (req,res) =>{
      Ticket.find().populate('user')
        .then((allTicket)=>{
            res.render('main' , {data: allTicket , idUser: req.session.user})

        }).catch(err=> {console.log(err)})

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
