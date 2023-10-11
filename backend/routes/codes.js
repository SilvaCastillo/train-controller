const express = require('express');
const router = express.Router();

const codes = require("../models/codes.js");

// Define a route to handle GET requests at the root endpoint ('/')
router.get('/', (req, res) => codes.getCodes(req, res));

module.exports = router;
