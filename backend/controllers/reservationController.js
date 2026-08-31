const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
  const { tableId, date, startTime, endTime, partySize } = req.body;
  try {
    const conflict = await Reservation.findOne({
      tableId,
      date,
      status: 'confirmed',
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (conflict) {
      return res.status(409).json({ message: 'Table is already booked for this time slot' });
    }

    const reservation = await Reservation.create({
      userId: req.user.id,
      tableId,
      date,
      startTime,
      endTime,
      partySize,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).populate('tableId');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReservation, getMyReservations };