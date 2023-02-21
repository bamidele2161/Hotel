const express = require("express");
const route = express();
const authController = require("../controller/auth/authController");
const staffController = require("../controller/auth/staffController");
const hotelController = require("../controller/hotel/hotelController");
const roomController = require("../controller/room/roomController");
const validateToken = require("../middleware/authMiddleware");
const localVariables = require("../middleware/localVariables");
let staffMiddleAuth = validateToken("staff");
let userMiddleAuth = validateToken("user");
//User
route.post("/register", authController.signUp);
route.post("/getProfile", authController.getUserProfile);
route.post("/login", authController.signIn);
route.put("/updateUser", staffMiddleAuth, authController.updateUser);
route.post("/generateOTP", localVariables, authController.generateOtp);
route.post("/verifyOTP", authController.verifyOTP);
route.post("/resetPassword", authController.resetPassword);

//staff
route.post("/registerStaff", staffController.registerStaff);
route.post("/loginStaff", staffController.staffSignIn);

//Hotel
route.post("/createHotel", staffMiddleAuth, hotelController.createHotel);
route.get("/getAllHotel", userMiddleAuth, hotelController.getAllHotel);
route.get("/viewHotel/:id", hotelController.getHotel);
route.put("/updateHotel/:id", staffMiddleAuth, hotelController.updateHotel);
route.delete("/deleteHotel/:id", staffMiddleAuth, hotelController.deleteHotel);

//Room
route.post("/createRoom/:hotelId", staffMiddleAuth, roomController.createRoom);
route.get("/getAllRoom", roomController.getAllRoom);
route.get("/viewRoom/:id", roomController.getRoom);
route.put("/updateRoom/:id", staffMiddleAuth, roomController.updateRoom);
route.delete("/deleteRoom/:id", staffMiddleAuth, roomController.deleteRoom);

module.exports = route;
