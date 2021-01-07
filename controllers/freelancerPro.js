

const express = require('express');
const router = express.Router()
var fL = require("../models/freelancerPro");
const session = require("express-session")
const mongoSessisonStore = require("connect-mongo")(session);
const validator = require("express-validator");
const mongoose = require("mongoose");


// ==== Display INFO in the profile ==== //
    router.get('/info', function(req, res) {
        var heading = '';
        var bio = '';
        getHeading(function(data){
            heading = data;
            console.log(heading);
    
            res.render('freelancerPro', {
                title: heading,
            });
        });
    });
    
function getHeading(callback){
    db.test.find({heading: "" }, function(err, objs){
        var heading;
        if (objs.length == 1)
        {
            head = objs[0].heading;
            console.log(head); 
            callback(head);
        }});
     }


module.exports = router;