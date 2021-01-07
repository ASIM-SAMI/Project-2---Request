const express = require('express');
const router = express.Router()
var Ticket = require("../models/ticketsM");
var Comment = require("../models/commentM");
var FeedBack = require("../models/feedBackM");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");
var User = require("../models/userM");




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

    Comment.find({ticket: id }).populate('user')

    .then((comments) =>{
     
      User.findById(req.session.userId)

      .then((user)=>{
        if(comments ==  undefined){
          res.render('show_ticket', {data: ticket, comments: null , user: user})
  
        }else if(comments !== undefined){
          console.log('aaaaaaa ', comments.length)
          res.render('show_ticket', {data: ticket, comments: comments , user: user})
  
        }

      }).catch(err=> {console.log(err)})

      

    

  }).catch(err=>{console.log(err)})
  }).catch(err=>{console.log(err)})

})

router.put('/ticket-accept/:id' ,(req , res) =>{

  let ticketId  = req.query.tickteId
  let userCommentId = req.params.id;
  let updateTicket = {
      useraccept: userCommentId,
      status: "1"
  }
  Ticket.findByIdAndUpdate( ticketId, updateTicket )
  .then(comment =>{
          res.redirect(`/show_ticket/${ticketId}`)
      })
  .catch(err =>console.log(err))
})



router.put('/ticket-done/:id' ,(req , res) =>{

  let ticketId  = req.query.tickteId
  console.log(ticketId)
  let updateTicket = {
      status: "2"
  }
  Ticket.findByIdAndUpdate( ticketId, updateTicket )
  .then(comment =>{
          res.redirect('/main/')
      })
  .catch(err =>console.log(err))
})

router.post('/new-feedback/:ticketId' ,(req, res) => {
  let idTicket = req.params.ticketId;

  Ticket.findByIdAndUpdate( idTicket, {status: "3"} )
  .then(ticket =>{
    console.log(ticket)
    let newFeedBack = {
      comment: req.body.comment,
      stars: req.body.star,
      ticket: ticket,
    }

    FeedBack.create(newFeedBack)
    .then(newUser =>{
      res.redirect('/main/')
      .catch(err =>console.log(err))
    
      })
 
  }).catch(err =>console.log(err))
  

})

router.get("/rateme" ,(req, res) => {

  res.render('rateme');
  
})

module.exports = router;
