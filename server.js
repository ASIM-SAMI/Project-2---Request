const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const expressLayouts = require('express-ejs-layouts');
var app = express();
const methodOverride = require("method-override");
const port = process.env.PORT || 3000 ;

// var User = require("./models/userM");
// var Ticket = require("./models/ticketsM");
// var Comment = require("./models/commentM");

// Create express app object

// Connect to database 
mongoose.connect(
  process.env.MONGO_CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(`MongoDb connected to ${process.env.MONGO_CONNECTION_URL}`)
);

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// app.use(expressLayouts) 
  
  // controllers
app.use(require('./controllers/userC'))
app.use(require('./controllers/ticketsC'))
app.use(require('./controllers/commentC'))


// listen on port 4000
app.listen(port, function () {
    console.log(`Server is running ${port}`);
  });