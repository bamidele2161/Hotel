const RoomDB = require("../../model/room/roomModel");
const HotelDB = require("../../model/hotel/hotelModel");

exports.createRoom = async (req, res) => {
  try {
    if (!req.body) return res.status(400).send({ message: "No Content" });

    let checkHotel = await HotelDB.findById({ _id: req.params.hotelId });
    if (!checkHotel)
      return res.status(404).send({ message: "Hotel not found" });

    console.log("hotelId", req.params.hotelId);
    let room = new RoomDB({
      roomDescription: req.body.roomDescription,
      roomType: req.body.roomType,
      roomPrice: req.body.roomPrice,
      hotelID: req.params.hotelId,
    });

    let create = await room.save();
    if (!create) {
      return res.status(404).send({
        message: error.message || "error occurred while adding a room",
      });
    }

    return res
      .status(200)
      .json({ message: "room added successfully", data: create });
  } catch (error) {
    res.status(500).send({ message: "Some error occurred" });
  }
};

exports.getAllRoom = async (req, res) => {
  try {
    let allRooms = await RoomDB.find({}).find({}).populate("hotelID");
    return res.status(200).send({ data: allRooms });
  } catch (err) {
    res.status(500).send({ message: err.message || "errror occurred" });
  }
};

exports.getRoom = async (req, res) => {
  let id = req.params.id;
  let checkForRoom = await RoomDB.findById(id);
  if (!checkForRoom) return res.status(404).send({ message: "Room not found" });
  return res.status(200).send({ data: checkForRoom });
};

exports.updateRoom = async (req, res) => {
  let id = req.params.id;
  let checkForRoom = await RoomDB.findByIdAndUpdate(id, req.body);
  if (!checkForRoom) return res.status(404).send({ message: "Room not found" });
  return res.status(200).send({ message: "Room updated successfully" });
};

exports.deleteRoom = async (req, res) => {
  try {
    let id = req.params.id;
    let checkId = await RoomDB.findByIdAndDelete(id);
    if (checkId) {
      return res.status(200).send({ message: "Room deleted successfully" });
    } else {
      return res.status(404).send({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "errror occurred" });
  }
};
