const RoadRoute = require("../models/roadRouteModel");

//get all road routes
const getRoadRoutes = async (req, res) => {
  try {
    const roadRoutes = await RoadRoute.find({});
    res.json(roadRoutes);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//get road route by id
const getRoadRouteById = async (req, res) => {
  try {
    const roadRoute = await RoadRoute.findById(req.params.id);
    res.json(roadRoute);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//create road route
const createRoadRoute = async (req, res) => {
  const { routeId, start, end, transportManager } = req.body;
  const roadRoute = new RoadRoute({
    routeId,
    start,
    end,
    transportManager,
  });
  try {
    const createdRoadRoute = await roadRoute.save();
    res.status(201).json(createdRoadRoute);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//update road route
const updateRoadRoute = async (req, res) => {
  const { routeId, start, end, transportManager } = req.body;
  const roadRoute = await RoadRoute.findById(req.params.id);
  if (roadRoute) {
    roadRoute.routeId = routeId;
    roadRoute.start = start;
    roadRoute.end = end;
    roadRoute.transportManager = transportManager;
    const updatedRoadRoute = await roadRoute.save();
    res.json(updatedRoadRoute);
  } else {
    res.status(404);
    throw new Error("Road route not found");
  }
};

//delete road route
const deleteRoadRoute = async (req, res) => {
  try {
    const roadRoute = await RoadRoute.findById(req.params.id);
    if (roadRoute) {
      await RoadRoute.findByIdAndRemove(req.params.id);
      res.json({ message: "Road route removed" });
    } else {
      res.status(404).json({ message: "Road route not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createRoadRoute,
  getRoadRoutes,
  getRoadRouteById,
  updateRoadRoute,
  deleteRoadRoute,
};
