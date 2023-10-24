const mongoose = require("mongoose");
const LocalPassenger = require("../models/localPassengerModel");

//get
const getLocalPassengers = async (req, res) => {
  try {
    const localPassengers = await LocalPassenger.find();
    res.status(200).json(localPassengers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get local passenger by id
const getLocalPassengerById = async (req, res) => {
  const { id } = req.params;

  try {
    const localPassenger = await LocalPassenger.findById(id);
    res.status(200).json(localPassenger);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//create Local passenger
//local passenger is a children of the Passenger
const createLocalPassenger = async (req, res) => {
  const {
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    nic,
  } = req.body;

  const localPassenger = new LocalPassenger({
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    nic,
  });

  try {
    const createdLocalPassenger = await localPassenger.save();
    res.status(201).json(createdLocalPassenger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update local passenger
const updateLocalPassenger = async (req, res) => {
  const { id } = req.params;
  const {
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    nic,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No passenger with id: ${id}`);

  const updatedLocalPassenger = {
    passengerId,
    firstName,
    lastName,
    dob,
    email,
    password,
    contactNumber,
    nic,
    _id: id,
  };

  await LocalPassenger.findByIdAndUpdate(id, updatedLocalPassenger, {
    new: true,
  });

  res.json(updatedLocalPassenger);
};

//delete local passenger
const deleteLocalPassenger = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No passenger with id: ${id}`);

  await LocalPassenger.findByIdAndRemove(id);

  res.json({ message: "passenger deleted successfully." });
};

module.exports = {
  getLocalPassengers,
  createLocalPassenger,
  updateLocalPassenger,
  getLocalPassengerById,
  deleteLocalPassenger,
};
