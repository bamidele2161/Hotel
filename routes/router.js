const express = require("express");
const route = express();
const authController = require("../controller/auth/authController");
const hotelController = require("../controller/hotel/hotelController");
const roomController = require("../controller/room/roomController");
const validateToken = require("../middleware/authMiddleware");
//User
route.post("/register", authController.signUp);
route.post("/getProfile", authController.getUserProfile);
route.post("/login", authController.signIn);
route.get("/resetPassword", authController.resetPassword);

//Hotel
route.post("/createHotel", validateToken, hotelController.createHotel);
route.get("/getAllHotel", hotelController.getAllHotel);
route.get("/viewHotel/:id", hotelController.getHotel);
route.put("/updateHotel/:id", validateToken, hotelController.updateHotel);
route.delete("/deleteHotel/:id", validateToken, hotelController.deleteHotel);

//Room
route.post("/createRoom/:hotelId", validateToken, roomController.createRoom);
route.get("/getAllRoom", roomController.getAllRoom);
route.get("/viewRoom/:id", roomController.getRoom);
route.put("/updateRoom/:id", validateToken, roomController.updateRoom);
route.delete("/deleteRoom/:id", validateToken, roomController.deleteRoom);

module.exports = route;
