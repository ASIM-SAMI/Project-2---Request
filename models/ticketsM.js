const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");

const TicketSchema = new Schema({
  subject: String ,
  img:  {
    type: String,
    default: "https://image.freepik.com/free-vector/new-post-neon-signs-style-text_118419-1184.jpg"
  } ,
  description: String,
  category : String ,
  status : {
    type: String,
    default: "0"
  } ,
  user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  useraccept : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
} , {timestamps: true });

var Ticket = mongoose.model("Ticket", TicketSchema);

// export Ticket model
module.exports = Ticket;