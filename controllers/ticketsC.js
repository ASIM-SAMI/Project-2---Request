const express = require('express');
const router = express.Router()
var User = require("../models/userM");
var Ticket = require("../models/ticketsM");
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

  res.render('show_ticket')

})










module.exports = router;
