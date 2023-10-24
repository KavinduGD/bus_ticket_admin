const express = require("express");
const {
  getLocalPassengers,
  createLocalPassenger,
  updateLocalPassenger,
  getLocalPassengerById,
  deleteLocalPassenger,
} = require("../controllers/localPassengerController");
const router = express.Router();

//get
router.get("/", getLocalPassengers);
//get
router.get("/:id", getLocalPassengerById);
//post
router.post("/", createLocalPassenger);
//put
router.put("/:id", updateLocalPassenger);
//delete
router.delete("/:id", deleteLocalPassenger);

module.exports = router;
