const express = require("express");
const {
  createNormalBooking,
  updateNormalBooking,
  getAllNormalBookings,
  getNormalBookingById,
  deleteNormalBooking,
} = require("../controllers/normalBookingController");
const router = express.Router();

//get
router.get("/", getAllNormalBookings);
//get
router.get("/:id", getNormalBookingById);
//post
router.post("/", createNormalBooking);
//put
router.put("/:id", updateNormalBooking);
//delete
router.delete("/:id", deleteNormalBooking);

module.exports = router;
