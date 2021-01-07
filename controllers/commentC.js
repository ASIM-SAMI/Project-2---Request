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

  

  module.exports = router;
