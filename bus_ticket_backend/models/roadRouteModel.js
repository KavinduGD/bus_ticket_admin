const mongoose = require("mongoose");

const roadRouteSchema = mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  transportManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const RoadRoute = mongoose.model("RoadRoute", roadRouteSchema);

module.exports = RoadRoute;
