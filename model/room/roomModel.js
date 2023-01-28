const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  roomId: String,
  hotelId: String,
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

const RoomDB = mongoose.model("RoomDB", schema);
module.exports = RoomDB;
