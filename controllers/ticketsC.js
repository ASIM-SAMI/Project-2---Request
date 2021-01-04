const express = require('express');
const router = express.Router()
var Ticket = require("../models/ticketsM");
var Comment = require("../models/commentM");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");




//========= New Ticket Page =========//

router.get('/new_ticket' , (req,res) =>{

  res.render('new_ticket')

})

router.post('/new_ticket_tk' ,(req, res) => {
    let newTicket = {
        subject: req.body.subject,
        img: req.body.img,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userId
        
    }
    Ticket.create(newTicket)
    .then(newUser =>{

        res.redirect('/main')
    }).catch(err =>console.log(err))
    

})
//=====================================//


//========= Show Ticket Page =========//

router.get('/show_ticket/:id' , (req,res) =>{
  let id = req.params.id;

  Ticket.findById(id).populate('user')
  
  .then((ticket)=>{

    Comment.find({ticket: id })

    .then((comments) =>
      res.render('show_ticket', {data: ticket, comments , user: req.session.user})
    )

  }).catch(err=>{console.log(err)})

})










module.exports = router;
