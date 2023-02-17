let jwt = require("jsonwebtoken");
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

//instance methods
schema.methods.generateStaffAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.STAFF_JWT_SECRET, {
    expiresIn: 86400,
  });
  return token;
};

const StaffDB = mongoose.model("StaffDB", schema);
module.exports = StaffDB;
