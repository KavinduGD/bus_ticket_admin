const mongoose = require("mongoose");

const normalBookingSchema = mongoose.Schema(
  {
    bookingID: {
      type: String,
      required: true,
      unique: true,
    },
    journey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journey",
    },
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    seatCount: {
      type: Number,
      required: true,
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "valid", "invalid"],
    },
  },
  { timestamps: true }
);

const NormalBooking = mongoose.model("Booking", normalBookingSchema);

module.exports = NormalBooking;
