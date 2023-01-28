const mongoose = require("mongoose");

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

const UserDB = mongoose.model("UserDB", schema);
module.exports = UserDB;
