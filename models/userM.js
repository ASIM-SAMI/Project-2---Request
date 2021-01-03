const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordDigest: {
    type: String,
    required: true,
  },
  img:String,
  type : {
    type: String,
    required: true,
  },
  tickets : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

});

UserSchema.statics.createSecure = (name, email , password,img , type,callback) => {
  console.log("I received this: ", name, email , password,img , type);
  // hash password user enters at sign up
  bcrypt.genSalt((err, salt) => {
    // changes every time
    console.log("bcrypt salt:", salt);
    bcrypt.hash(password, salt, (err, passwordHash) => {
      console.log("password:", password);
      console.log("passwordHash:", passwordHash);
      console.log("Name:", name);
      console.log("email:", email);
      console.log("type: ", type);
      User.create({ name: name, email : email,passwordDigest: passwordHash, img : img  , type: type}, callback);
    });
  });
};


UserSchema.statics.authenticate = (
  email,
  password,
  callback) => {
  User.findOne({ email })
    .then((foundUser) => {
      console.log("Authenticate email, password", email, password);
      if (!foundUser) {
        callback("Incorrect Account", null);
      } else if (foundUser.checkPassword(password)) {
        callback(null, foundUser);
      } else {
        callback("Wrong password", null);
      }
      console.log("Authenticate foundUser: ", foundUser);
    })
    .catch((err) => console.log(err));
};

// compare password user enters with hashed password (`passwordDigest`)
UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  console.log("Bcrypt: ", password, this.passwordDigest);
  return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model("User", UserSchema);

// export user model
module.exports = User;