const mongoose = require("mongoose");
const HotelDB = require("../hotel/hotelModel");

let schema = new mongoose.Schema({
  roomId: String,
  hotelId: {
    type: mongoose.Schema.ObjectId,
    ref: HotelDB
  },

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
