const express = require('express');
const router = express.Router()
var Comment = require("../models/commentM");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");
var User = require("../models/userM");
var Ticket = require("../models/ticketsM");
const jwt = require('jsonwebtoken');
const cors = require('cors');
var User = require("../models/userM");
const app = express();
app.use(cors());

const privateKey = `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`;



app.post('/jwt', function (req, res) {
    // NOTE: Before you proceed with the TOKEN, verify your users' session or access.
    const payload = {
      sub: req.session.userId, // Unique user id string
      name: req.session.user.name, // Full name of user
  
      // Optional custom user root path
      // 'https://claims.tiny.cloud/drive/root': '/johndoe',
  
      exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes expiration
    };
    try {
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
        res.set('content-type', 'application/json');
        res.status(200);
        res.send(JSON.stringify({
          token: token
        }));
      } catch (e) {
        res.status(500);
        res.send(e.message);
      }
    });
    



router.post('/comment/:ticketId' ,(req , res) =>{

    let ticketId = req.params.ticketId;
    let newComment = {
        description: req.body.comment,
        user: req.session.userId,
        ticket: ticketId
    }
    console.log( req.body.comment)
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
