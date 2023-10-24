const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const connectDb = require("./config/db");
const localPassengerRoute = require("./routes/localPassengerRoute");
const foreignPassengerRoute = require("./routes/foreignPassengerRoute");
const employeeRoute = require("./routes/employeeRoute");
const busRoute = require("./routes/busRoute");
const roadRouteRoute = require("./routes/roadRouteRoute");
const scheduleRoute = require("./routes/scheduleRoute");
const journeyRoute = require("./routes/journeyRoute");
const normalBookingRoute = require("./routes/normalBookingRoute");
const periodBookingRoute = require("./routes/periodBookingRoute");

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/local", localPassengerRoute);
app.use("/api/foreign", foreignPassengerRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/bus", busRoute);
app.use("/api/roadRoute", roadRouteRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/journey", journeyRoute);
app.use("/api/normalBooking", normalBookingRoute);
app.use("/api/periodBooking", periodBookingRoute);
//dbconnection
connectDb();
PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
module.exports = app;
