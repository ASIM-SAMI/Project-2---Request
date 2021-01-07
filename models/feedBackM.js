const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedBackSchema = new Schema({
  comment: {
    type: String,
  },
  stars: {
    type: String,
  },
  ticket: {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
});

var Feedback = mongoose.model("Feedback", feedBackSchema);

// export Ticket model
module.exports = Feedback;