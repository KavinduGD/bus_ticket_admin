const Bus = require("../models/busModel");

//getAllBuses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.send(buses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//getBusById
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    res.send(bus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//createBus
const createBus = async (req, res) => {
  try {
    const bus = new Bus({
      busID: req.body.busID,
      registrationNumber: req.body.registrationNumber,
      chassisNumber: req.body.chassisNumber,
      busType: req.body.busType,
      seatCount: req.body.seatCount,
      busDriver: req.body.busDriver,
      busConductor: req.body.busConductor,
    });
    const createdBus = await bus.save();
    res.status(201).send(createdBus);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
// updateBus
const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
      bus.busID = req.body.busID;
      bus.registrationNumber = req.body.registrationNumber;
      bus.chassisNumber = req.body.chassisNumber;
      bus.busType = req.body.busType;
      bus.seatCount = req.body.seatCount;
      bus.busDriver = req.body.busDriver;
      bus.busConductor = req.body.busConductor;
      const updatedBus = await bus.save();
      res.send(updatedBus);
    }
  } catch (error) {
    res.status(404).send({ message: "Bus Not Found" });
  }
};
//deleteBus
const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
      await Bus.findByIdAndDelete(req.params.id);
      res.send({ message: "Bus Removed" });
    }
  } catch (error) {
    res.status(404).send({ message: "Bus Not Found" });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};
