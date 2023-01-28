const RoomDB = require("../../model/room/roomModel");

exports.createRoom = async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No Content" });

  try {
    let hotel = new RoomDB({
      roomDescription: req.body.roomDescription,
      roomType: req.body.roomType,
      roomPrice: req.body.roomPrice,
      // hotelFacilities: {
      //   swimmingPool: req.body.hotelFacilities.swimmingPool,
      //   restaurant: req.body.hotelFacilities.restaurant,
      //   bar: req.body.hotelFacilities.bar,
      //   parkingSpace: req.body.hotelFacilities.parkingSpace,
      // },
    });

    let check = await room.save();
    if (check) {
      return res
        .status(200)
        .send({ data: room, message: "room added successfully" });
    } else {
      return res.status(404).send({
        message: error.message || "error occurred while adding a room",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occurred" });
  }
};

exports.getAllRoom = async (req, res) => {
  try {
    let allRooms = await RoomDB.find();
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
