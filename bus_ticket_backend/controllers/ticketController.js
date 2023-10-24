const Ticket = require("../models/ticketModel");

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
const getTickets = async (req, res) => {
  res.send("Hello World");
};

module.exports = { getTickets };
