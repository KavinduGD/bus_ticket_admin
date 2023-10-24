const Journey = require("../models/journeyModel");

//get all journeys
const getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find({});
    res.json(journeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get journey by id
const getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    res.json(journey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create journey
const createJourney = async (req, res) => {
  const { journeyId, bus, schedule, date, bookedSeats, inspector, route } =
    req.body;
  try {
    const journey = new Journey({
      journeyId,
      bus,
      schedule,
      date,
      bookedSeats,
      inspector,
      route,
    });
    const createdJourney = await journey.save();
    res.status(201).json(createdJourney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update journey
const updateJourney = async (req, res) => {
  const { journeyId, bus, schedule, date, bookedSeats, inspector, route } =
    req.body;
  try {
    const journey = await Journey.findById(req.params.id);
    if (journey) {
      journey.journeyId = journeyId;
      journey.bus = bus;
      journey.schedule = schedule;
      journey.date = date;
      journey.bookedSeats = bookedSeats;
      journey.inspector = inspector;
      journey.route = route;
      const updatedJourney = await journey.save();
      res.json(updatedJourney);
    } else {
      res.status(404).json({ message: "Journey Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update journey by journey bu Journey ID
const updateJourneyByJourneyId = async (req, res) => {
  const journeyId = req.params.jid;
  const { bus, bookedSeats, inspector } = req.body;

  try {
    const journey = await Journey.findOne({ journeyId: journeyId });
    if (journey) {
      journey.bus = bus ? bus : journey.bus;
      journey.bookedSeats = bookedSeats ? bookedSeats : journey.bookedSeats;
      journey.inspector = inspector ? inspector : journey.inspector;
      const updatedJourney = await journey.save();
      res.json(updatedJourney);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete journey
const deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (journey) {
      await Journey.findByIdAndRemove(req.params.id);
      res.json({ message: "Journey Removed" });
    } else {
      res.status(404).json({ message: "Journey Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJourney,
  getAllJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
  updateJourneyByJourneyId,
};
