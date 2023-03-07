const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    isReservation: {
      type: Boolean,
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
  },
  {
    timestamps: true,
  }
);

const ReservationDB = mongoose.model("ReservationDB", schema);
module.exports = ReservationDB;
