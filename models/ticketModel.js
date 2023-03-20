const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  showtime: {
    type: mongoose.Schema.ObjectId,
    ref: 'Showtime',
    required: [true, 'Ticket must belong to a showtime'],
  },
  seat: {
    type: Number,
    required: [true, 'Ticket must have a seat'],
  },
  row: {
    type: Number,
    required: [true, 'Ticket must have a row'],
  },
  luxSeat: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Ticket must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
