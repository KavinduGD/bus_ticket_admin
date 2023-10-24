const express = require("express");
const {
  getForeignPassengers,
  createForeignPassenger,
  updateForeignPassenger,
  getForeignPassengerById,
  deleteForeignPassenger,
} = require("../controllers/foreignPassengerController");
const router = express.Router();

//get
router.get("/", getForeignPassengers);
//get
router.get("/:id", getForeignPassengerById);
//post
router.post("/", createForeignPassenger);
//put
router.put("/:id", updateForeignPassenger);
//delete
router.delete("/:id", deleteForeignPassenger);
module.exports = router;
