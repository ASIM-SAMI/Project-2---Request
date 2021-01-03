const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");

const TicketSchema = new Schema({
  subject: String ,
  img: String,
  description: String,
  category : String ,
  status : String ,
  comment : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}] ,
  user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

var Ticket = mongoose.model("Ticket", TicketSchema);

// export Ticket model
module.exports = Ticket;