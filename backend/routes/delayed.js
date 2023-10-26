const express = require('express');
const router = express.Router();

const delayed = require("../models/delayed.js");

// Define a route to handle GET requests at the root endpoint ('/')
router.get('/', () => delayed.getDelayedTrains());

module.exports = router;
