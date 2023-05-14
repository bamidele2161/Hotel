const mongoose = require("mongoose");

//getting the schema constructor
var Schema = mongoose.Schema;

let schema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  hotelDescription: {
    type: String,
    required: true,
  },
  hotelAddress: {
    type: String,
    required: true,
  },
  hotelFacilities: {
    swimmingPool: {
      type: Boolean,
    },
    restaurant: {
      type: Boolean,
    },
    bar: {
      type: Boolean,
    },
    parkingSpace: {
      type: Boolean,
    },
  },
});

const HotelDB = mongoose.model("HotelDB", schema);
module.exports = HotelDB;
