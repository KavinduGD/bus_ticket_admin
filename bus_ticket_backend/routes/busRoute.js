const express = require("express");
const {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
} = require("../controllers/busController");

const router = express.Router();
//get
router.get("/", getAllBuses);
//get
router.get("/:id", getBusById);
//post
router.post("/", createBus);
//put
router.put("/:id", updateBus);
//delete
router.delete("/:id", deleteBus);

module.exports = router;
