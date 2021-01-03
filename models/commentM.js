const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");

const CommentSchema = new Schema({
  description: String,
  status : String ,
  user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});

var Comment = mongoose.model("Comment", CommentSchema);

// export Ticket model
module.exports = Comment;