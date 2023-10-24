const Schedule = require("../models/scheduleModel");

//get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({});
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//get schedule by id
const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//create schedule
const createSchedule = async (req, res) => {
  const { scheduleId, route, scheduleType, startTime, endTime, day } = req.body;
  const schedule = new Schedule({
    scheduleId,
    route,
    scheduleType,
    startTime,
    endTime,
    day,
  });
  try {
    const createdSchedule = await schedule.save();
    res.status(201).json(createdSchedule);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//update schedule
const updateSchedule = async (req, res) => {
  const { scheduleId, route, scheduleType, startTime, endTime, day } = req.body;
  const schedule = await Schedule.findById(req.params.id);
  if (schedule) {
    schedule.scheduleId = scheduleId;
    schedule.route = route;
    schedule.scheduleType = scheduleType;
    schedule.startTime = startTime;
    schedule.endTime = endTime;
    schedule.day = day;
    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
};
//delete schedule
const deleteSchedule = async (req, res) => {
  const schedule = await Schedule.findById(req.params.id);
  if (schedule) {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Schedule removed" });
  } else {
    res.status(404).json({ message: "Schedule not found" });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
};
