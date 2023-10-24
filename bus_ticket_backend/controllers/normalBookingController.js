const NormalBooking = require("../models/normalBookingModel");

//get all normalBookings
const getAllNormalBookings = async (req, res) => {
  try {
    const normalBookings = await NormalBooking.find({});
    res.json(normalBookings);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get normalBooking by id
const getNormalBookingById = async (req, res) => {
  try {
    const normalBooking = await NormalBooking.findById(req.params.id);
    res.json(normalBooking);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//create normalBooking
const createNormalBooking = async (req, res) => {
  try {
    const {
      bookingID,
      journey,
      passenger,
      bookingDate,
      bookingTime,
      seatCount,
      startLocation,
      endLocation,
      fare,
      status = "new",
    } = req.body;

    const normalBooking = new NormalBooking({
      bookingID,
      journey,
      passenger,
      bookingDate,
      bookingTime,
      seatCount,
      startLocation,
      endLocation,
      fare,
      status,
    });

    const createdNormalBooking = await normalBooking.save();

    res.status(201).json(createdNormalBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update normalBooking
const updateNormalBooking = async (req, res) => {
  try {
    const {
      bookingID,
      journey,
      passenger,
      bookingDate,
      bookingTime,
      seatCount,
      startLocation,
      endLocation,
      fare,
      status,
    } = req.body;

    const normalBooking = await NormalBooking.findById(req.params.id);

    if (normalBooking) {
      normalBooking.bookingID = bookingID;
      normalBooking.journey = journey;
      normalBooking.passenger = passenger;
      normalBooking.bookingDate = bookingDate;
      normalBooking.bookingTime = bookingTime;
      normalBooking.seatCount = seatCount;
      normalBooking.startLocation = startLocation;
      normalBooking.endLocation = endLocation;
      normalBooking.fare = fare;
      normalBooking.status = status;

      const updatedNormalBooking = await normalBooking.save();

      res.json(updatedNormalBooking);
    } else {
      res.status(404).json({ message: "NormalBooking Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete normalBooking
const deleteNormalBooking = async (req, res) => {
  try {
    const normalBooking = await NormalBooking.findById(req.params.id);

    if (normalBooking) {
      await NormalBooking.findByIdAndDelete(req.params.id);
      res.json({ message: "NormalBooking Removed" });
    } else {
      res.status(404).json({ message: "NormalBooking Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createNormalBooking,
  getAllNormalBookings,
  getNormalBookingById,
  updateNormalBooking,
  deleteNormalBooking,
};
