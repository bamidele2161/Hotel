const mongoose = require("mongoose");

var Schema = mongoose.Schema;

let schema = new mongoose.Schema(
  {
    roomType: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "RoomDB",
    },
    reservationCode: String,
  },
  {
    timestamps: true,
  }
);

const ReservationDB = mongoose.model("ReservationDB", schema);
module.exports = ReservationDB;
