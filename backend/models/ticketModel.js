const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    showtime: {
      type: mongoose.Schema.ObjectId,
      ref: 'Showtime',
      required: [true, 'Ticket must belong to a showtime'],
    },
    seat: [
      {
        col: {
          type: Number,
          required: [true, 'Ticket must have a column'],
        },
        row: {
          type: Number,
          required: [true, 'Ticket must have a row'],
        },
        luxSeat: {
          type: Boolean,
          default: false,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Ticket must belong to a user'],
    },
  },
  { timestamps: true }
);

ticketSchema.index(
  { showtime: 1, 'seat.col': 1, 'seat.row': 1 },
  { unique: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
