const express = require('express');
const router = express.Router()
var Comment = require("../models/commentM");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");
var User = require("../models/userM");
var Ticket = require("../models/ticketsM");





router.post('/comment/:ticketId' ,(req , res) =>{

    let ticketId = req.params.ticketId;
    let newComment = {
        description: req.body.comment,
        user: req.session.userId,
        ticket: ticketId
    }
    Comment.create( newComment )
    .then(comment =>{
            res.redirect(`/show_ticket/${ticketId}`)
        })
    .catch(err =>console.log(err))
  })

  router.put('/accept/:id' ,(req , res) =>{

    let ticketId  = req.query.tickteId
    let userCommentId = req.params.id;
    console.log(ticketId)
    let updateTicket = {
        useraccept: userCommentId,
        status: "1"
    }
    Ticket.findByIdAndUpdate( ticketId, updateTicket )
    .then(comment =>{
            res.redirect('/main/')
        })
    .catch(err =>console.log(err))
  })


  module.exports = router;
