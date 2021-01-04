const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tkcketsAcceptedSchema = new Schema({
  idsubject: String ,
  type: mongoose.Schema.Types.ObjectId, ref: 'Ticket',
  status : String ,
  userseeker : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  userfreelancer : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Ticket = mongoose.model("Ticket", TicketSchema);

// export Ticket model
module.exports = Ticket;