const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Create a new user
router.post("/create", userController.create);

// Login a user
router.post("/login", userController.login);

module.exports = router;
