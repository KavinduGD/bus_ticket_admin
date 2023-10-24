const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  scheduleId: {
    type: String,
    required: true,
    unique: true,
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoadRoute",
  },
  day: {
    type: String,
    required: true,
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  scheduleType: {
    type: String,
    required: true,
    enum: ["startToEnd", "endToStart"],
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
