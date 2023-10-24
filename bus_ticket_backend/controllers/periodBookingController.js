const PeriodBooking = require("../models/periodBookingModel");
const mongoose = require("mongoose");

//get all period booking
const getPeriodBookings = async (req, res) => {
  try {
    const periodBookings = await PeriodBooking.find();
    res.status(200).json(periodBookings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get period booking by id
const getPeriodBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const periodBooking = await PeriodBooking.findById(id);
    res.status(200).json(periodBooking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create period booking
const createPeriodBooking = async (req, res) => {
  const { bookingId, foreignPassenger, validDates, journeys } = req.body;

  const periodBooking = new PeriodBooking({
    bookingId,
    foreignPassenger,
    validDates,
    journeys,
  });

  try {
    const createdPeriodBooking = await periodBooking.save();
    res.status(201).json(createdPeriodBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update period booking
const updatePeriodBooking = async (req, res) => {
  const { id } = req.params;
  const { bookingId, foreignPassenger, validDates, journeys } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No period booking with id: ${id}`);

  const updatedPeriodBooking = {
    bookingId,
    foreignPassenger,
    validDates,
    journeys,
    _id: id,
  };

  await PeriodBooking.findByIdAndUpdate(id, updatedPeriodBooking, {
    new: true,
  });

  res.json(updatedPeriodBooking);
};

//delete period booking  add try catch too
const deletePeriodBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No period booking with id: ${id}`);

    await PeriodBooking.findByIdAndRemove(id);

    res.json({ message: "Period booking deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPeriodBookings,
  createPeriodBooking,
  updatePeriodBooking,
  deletePeriodBooking,
  getPeriodBookingById,
};
