const mongoose = require("mongoose");

const busSchema = mongoose.Schema({
  busID: {
    type: String,
    required: true,
    unique: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  chassisNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busType: {
    type: String,
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
  },
  busDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  busConductor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
