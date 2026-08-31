const Table = require('../models/Table');
const Reservation = require('../models/Reservation');

const getAvailableTables = async (req, res) => {
  const { date, startTime, endTime, partySize } = req.query;
  try {
    const tables = await Table.find({ capacity: { $gte: partySize } });

    const conflictingReservations = await Reservation.find({
      date,
      status: 'confirmed',
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    const bookedTableIds = conflictingReservations.map(r => r.tableId.toString());

    const availableTables = tables.filter(
      table => !bookedTableIds.includes(table._id.toString())
    );

    res.json(availableTables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTable = async (req, res) => {
  const { tableNumber, capacity, location } = req.body;
  try {
    const table = await Table.create({ tableNumber, capacity, location });
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAvailableTables, addTable, getAllTables };