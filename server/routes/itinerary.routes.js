const express = require("express");
const router = express.Router();
const itineraryController = require("../controllers/itinerary.controller");

// route to detect state
router.post("/state", itineraryController.state);

// route to detect nearest hotspot location
router.post("/hotspot", itineraryController.hotspot);

// route to find out distances between selected hotspot and tourist locations
router.post("/distance", itineraryController.distance);

// save itineraries to database
router.post("/save", itineraryController.save);

// fetch a saved itinerary from database
router.post("/fetch", itineraryController.fetch);

module.exports = router;
