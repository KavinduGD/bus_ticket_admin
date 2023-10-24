const mongoose = require("mongoose");
const ForeignPassenger = require("../models/foreignPassengerModel");

//get
const getForeignPassengers = async (req, res) => {
  try {
    const foreignPassengers = await ForeignPassenger.find();
    res.status(200).json(foreignPassengers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get foreign passenger by id
const getForeignPassengerById = async (req, res) => {
  const { id } = req.params;

  try {
    const foreignPassenger = await ForeignPassenger.findById(id);
    res.status(200).json(foreignPassenger);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create foreign passenger
//foreign passenger is a children of the Passenger
const createForeignPassenger = async (req, res) => {
  const {
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    passportNo,
  } = req.body;

  const foreignPassenger = new ForeignPassenger({
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    passportNo,
  });

  try {
    const createdForeignPassenger = await foreignPassenger.save();
    res.status(201).json(createdForeignPassenger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update foreign passenger
const updateForeignPassenger = async (req, res) => {
  const { id } = req.params;
  const {
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    passportNo,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No foreign passenger with id: ${id}`);

  const updatedForeignPassenger = {
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    passportNo,
    _id: id,
  };

  await ForeignPassenger.findByIdAndUpdate(id, updatedForeignPassenger, {
    new: false,
  });

  res.json(updatedForeignPassenger);
};

//delete foreign passenger
const deleteForeignPassenger = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No foreign passenger with id: ${id}`);

  await ForeignPassenger.findByIdAndRemove(id);

  res.json({ message: "Foreign passenger deleted successfully." });
};

module.exports = {
  getForeignPassengers,
  createForeignPassenger,
  updateForeignPassenger,
  getForeignPassengerById,
  deleteForeignPassenger,
};
