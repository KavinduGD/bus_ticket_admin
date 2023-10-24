const mongoose = require("mongoose");

const periodBookingSchema = mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    foreignPassenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForeignPassenger",
    },
    validDates: {
      type: Number,
      required: true,
    },

    journeys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journey",
      },
    ],
  },
  { timestamps: true }
);

const PeriodBooking = mongoose.model("PeriodBooking", periodBookingSchema);

module.exports = PeriodBooking;
