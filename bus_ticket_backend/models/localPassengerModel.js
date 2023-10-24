const mongoose = require("mongoose");
const Passenger = require("./passengerModel");

const localPassengerSchema = new mongoose.Schema({
  nic: {
    type: String,
    required: true,
    unique: true,
  },
});

const LocalPassenger = Passenger.discriminator(
  "LocalPassenger",
  localPassengerSchema
);

module.exports = LocalPassenger;
