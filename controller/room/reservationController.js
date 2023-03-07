const ReservationDB = require("../../model/room/reservationModel");

exports.Reservation = async (req, res) => {
  try {
    let reservation = new ReservationDB({
      isReservation: req.body.isReservation,
      totalPrice: req.body.totalPrice,
      numberOfRooms: req.body.numberOfRooms,
    });

    if (req.body.isReservation === true) {
      let saveReservation = await reservation.save();
      if (saveReservation) {
        return res.status(200).send({ message: "reserved successfully" });
      } else {
        return res.status(404).send({ message: "error occured" });
      }
    } else {
      //make paymet
    }
  } catch (err) {
    res.status(500).send({ message: "Some error occurred" });
  }
};
