const mongoose = require("mongoose");

const journeySchema = mongoose.Schema({
  journeyId: {
    type: String,
    required: true,
    unique: true,
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoadRoute",
  },
  date: {
    type: Date,
  },

  bookedSeats: {
    type: Number,
  },
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;
