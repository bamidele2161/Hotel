const HotelDB = require("../../model/hotel/hotelModel");

exports.createHotel = async (req, res) => {
  if (!req.body) return res.status(400).send({ message: "No Content" });

  try {
    let hotel = new HotelDB({
      hotelName: req.body.hotelName,
      hotelDescription: req.body.hotelDescription,
      hotelAddress: req.body.hotelAddress,
      hotelFacilities: {
        swimmingPool: req.body.hotelFacilities.swimmingPool,
        restaurant: req.body.hotelFacilities.restaurant,
        bar: req.body.hotelFacilities.bar,
        parkingSpace: req.body.hotelFacilities.parkingSpace,
      },
    });

    let check = await hotel.save();
    if (check) {
      return res
        .status(200)
        .send({ data: hotel, message: "hotel added successfully" });
    } else {
      return res.status(404).send({
        message: "error occurred while adding a hotel",
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Some error occurred" });
  }
};

exports.getAllHotel = async (req, res) => {
  try {
    let allHotel = await HotelDB.find({});
    return res.status(200).send({ data: allHotel });
  } catch (err) {
    res.status(500).send({ message: err.message || "errror occurred" });
  }
};

exports.getHotel = async (req, res) => {
  let id = req.params.id;
  let checkForHotel = await HotelDB.findById(id);
  if (!checkForHotel)
    return res.status(404).send({ message: "Hotel not found" });
  return res.status(200).send({ data: checkForHotel });
};

exports.updateHotel = async (req, res) => {
  let id = req.params.id;
  let checkForHotel = await HotelDB.findByIdAndUpdate(id, req.body);
  if (!checkForHotel)
    return res.status(404).send({ message: "Hotel not found" });
  return res.status(200).send({ message: "Hotel updated successfully" });
};

exports.deleteHotel = async (req, res) => {
  try {
    let id = req.params.id;
    let checkId = await HotelDB.findByIdAndDelete(id);
    if (checkId) {
      return res.status(200).send({ message: "Hotel deleted successfully" });
    } else {
      return res.status(404).send({ message: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "errror occurred" });
  }
};
