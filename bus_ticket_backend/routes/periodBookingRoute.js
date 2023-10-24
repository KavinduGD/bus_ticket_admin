const express = require("express");
const {
  getPeriodBookings,
  getPeriodBookingById,
  createPeriodBooking,
  updatePeriodBooking,
  deletePeriodBooking,
} = require("../controllers/periodBookingController");
const router = express.Router();

//get
router.get("/", getPeriodBookings);
//get
router.get("/:id", getPeriodBookingById);
//post
router.post("/", createPeriodBooking);
//put
router.put("/:id", updatePeriodBooking);
//delete
router.delete("/:id", deletePeriodBooking);

module.exports = router;
