const express = require("express");
const {
  createJourney,
  getAllJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
  updateJourneyByJourneyId,
} = require("../controllers/journeyController");
const router = express.Router();

//get
router.get("/", getAllJourneys);
//get
router.get("/:id", getJourneyById);
//post
router.post("/", createJourney);
//put
router.put("/:id", updateJourney);
//put
router.put("/updateByJourneyId/:jid", updateJourneyByJourneyId);
//delete
router.delete("/:id", deleteJourney);

module.exports = router;
