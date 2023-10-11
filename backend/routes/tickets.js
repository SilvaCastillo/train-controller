const express = require('express');
const router = express.Router();

const tickets = require("../models/tickets.js");

// Define a route to handle GET requests and POST requests at the root endpoint ('/')
router.get('/', (req, res) => tickets.getTickets(req, res));
router.post('/', (req, res) => tickets.createTicket(req, res));

module.exports = router;
