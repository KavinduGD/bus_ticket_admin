const mongoose = require("mongoose");
const Passenger = require("./passengerModel");

const foreignPassengerSchema = new mongoose.Schema({
  passportNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const ForeignPassenger = Passenger.discriminator(
  "ForeignPassenger",
  foreignPassengerSchema
);

module.exports = ForeignPassenger;
