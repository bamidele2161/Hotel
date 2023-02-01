const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  roomDescription: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  roomPrice: {
    type: String,
    required: true,
  },
});

// creating model for the schema
const RoomDB = mongoose.model("RoomDB", schema);

//exporting model for the schema
module.exports = RoomDB;
