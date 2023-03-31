const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Showtime must belong to a movie'],
  },
  cinema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cinema',
    required: [true, 'Showtime must belong to a cinema'],
  },
  hall: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hall',
    required: [true, 'Showtime must belong to a hall'],
  },
  date: {
    type: Date,
    required: [true, 'Showtime must have a date'],
  },
  startTime: {
    type: Date,
    required: [true, 'Showtime must have a time'],
  },
  price: {
    standard: {
      type: Number,
      required: [true, 'Showtime must have a price'],
    },
    lux: {
      type: Number,
      required: [true, 'Showtime must have a price'],
    },
  },
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
