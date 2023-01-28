const express = require("express");
const route = express();
const authController = require("../controller/auth/authController");
const hotelController = require("../controller/hotel/hotelController");
const roomController = require("../controller/room/roomController");
//User
route.post("/register", authController.signUp);
route.post("/getProfile", authController.getUserProfile);
route.post("/login", authController.signIn);
route.get("/resetPassword", authController.resetPassword);

//Hotel
route.post("/createHotel", hotelController.createHotel);
route.get("/getAllHotel", hotelController.getAllHotel);
route.get("/viewHotel", hotelController.getHotel);
route.put("/updateHotel/:id", hotelController.updateHotel);
route.delete("/deleteHotel/:id", hotelController.deleteHotel);

//Room
route.post("/createRoom", roomController.createRoom);
route.get("/getAllRoom", roomController.getAllRoom);
route.get("/viewRoom", roomController.getRoom);
route.put("/updateRoom/:id", roomController.updateRoom);
route.delete("/deleteRoom/:id", roomController.deleteRoom);

module.exports = route;
