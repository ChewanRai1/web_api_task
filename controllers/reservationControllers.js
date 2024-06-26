const Reservation = require("../models/reservationModels");

async function addReservation(req, res) {
  const { userId, eventDate, numberOfGuests } = req.body;

  // converting eventDate in string to date object
  const date = new Date(eventDate);

  if (!userId || !eventDate || !numberOfGuests) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (date < new Date()) {
    return res.status(400).json({ message: "Event date should be in future" });
  }

  if (numberOfGuests <0){
    return res.status(400).json({ message: "number of guest should be in positive" })
  }
  try {
    const reservation = new Reservation({ userId, eventDate, numberOfGuests });
    await reservation.save();
    return res
    .status(201)
    .json({ message: "Reservation added successfully", reservation, sucess: true });
  } catch (e) {
    return res.status(500).json({ message: e.message, success: false });
  }
}

module.exports = { addReservation };
