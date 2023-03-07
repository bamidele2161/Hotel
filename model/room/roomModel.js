const mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
  reservation: {
    type: Schema.Types.ObjectId,
    ref: "ReservationDB",
  },
});

// creating model for the schema
const RoomDB = mongoose.model("RoomDB", schema);

//exporting model for the schema
module.exports = RoomDB;
