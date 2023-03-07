const ReservationDB = require("../../model/reservation/reservationModel");
const otpGenerator = require("otp-generator");
const error = require("../../middleware/error");
exports.reservation = async (req, res) => {
  try {
    let code = await otpGenerator.generate(10, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    let reservation = new ReservationDB({
      isReservation: req.body.isReservation,
      totalPrice: req.body.totalPrice,
      numberOfRooms: req.body.numberOfRooms,
      reservationCode: code,
    });

    let saveReservation = await reservation.save();
    if (saveReservation) {
      return res.status(200).send({
        data: reservation,
        message: "reserved successfully",
      });
    } else {
      return res.status(404).send({ message: "error occured" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "errror occurred" });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    let findAll = await ReservationDB.find();
    return res.status(200).send({ data: findAll });
  } catch (err) {
    res.status(500).send({ message: err.message || "errror occurred" });
  }
};
