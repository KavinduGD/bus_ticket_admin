const express = require("express");
const {
  createSchedule,
  deleteSchedule,
  updateSchedule,
  getAllSchedules,
  getScheduleById,
} = require("../controllers/scheduleController");
const router = express.Router();

//get
router.get("/", getAllSchedules);
//get
router.get("/:id", getScheduleById);
//post
router.post("/", createSchedule);
//put
router.put("/:id", updateSchedule);
//delete
router.delete("/:id", deleteSchedule);

module.exports = router;
