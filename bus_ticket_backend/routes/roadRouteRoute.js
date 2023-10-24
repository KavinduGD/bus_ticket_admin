const express = require("express");
const {
  createRoadRoute,
  deleteRoadRoute,
  updateRoadRoute,
  getRoadRouteById,
  getRoadRoutes,
} = require("../controllers/roadRoteController");
const router = express.Router();

//get
router.get("/", getRoadRoutes);
//get
router.get("/:id", getRoadRouteById);
//post
router.post("/", createRoadRoute);
//put
router.put("/:id", updateRoadRoute);
//delete
router.delete("/:id", deleteRoadRoute);

module.exports = router;
