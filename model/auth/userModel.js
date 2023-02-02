const mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

let schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 255,
  },
  phone: {
    type: String,
    required: true,
  },
});

//instance methods
schema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
};
const UserDB = mongoose.model("UserDB", schema);
module.exports = UserDB;
