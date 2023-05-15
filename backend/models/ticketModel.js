const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    showtime: {
      type: mongoose.Schema.ObjectId,
      ref: 'Showtime',
      required: [true, 'Ticket must belong to a showtime'],
    },
    seats: {
      type: [
        {
          col: {
            type: Number,
            required: [true, 'Ticket must have a column'],
          },
          row: {
            type: Number,
            required: [true, 'Ticket must have a row'],
          },
          // luxSeat: {
          //   type: Boolean,
          //   default: false,
          // },
        },
      ],
      required: [true, 'Ticket must have a seat'],
      validate: [val => val.length > 0, 'At least one seat must be selected'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Ticket must belong to a user'],
    },
    barOrders: [
      {
        bar: {
          type: mongoose.Schema.ObjectId,
          ref: 'Bar',
          required: [true, 'Order must have a bar'],
        },
        count: {
          type: Number,
          required: [true, 'Order must have a count'],
        },
      },
    ],
    booking: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

ticketSchema.index(
  { showtime: 1, 'seats.col': 1, 'seats.row': 1 },
  { unique: true }
);

ticketSchema.index({ booking: 1 }, { expireAfterSeconds: 60 * 32 });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
