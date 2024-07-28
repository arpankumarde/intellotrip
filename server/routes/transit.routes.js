const express = require("express");
const router = express.Router();
const transitController = require("../controllers/transit.controller");

router.post("/trains", transitController.trains);

module.exports = router;
