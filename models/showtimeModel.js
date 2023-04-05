const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Showtime must belong to a movie'],
  },
  hall: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hall',
    required: [true, 'Showtime must belong to a hall'],
  },
  time: {
    start: {
      type: Date,
      required: [true, 'Showtime must have a start time'],
    },
    end: {
      type: Date,
      required: [true, 'Showtime must have an end time'],
    },
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

showtimeSchema.index(
  { hall: 1, 'time.start': 1, 'time.end': 1 },
  { unique: true }
);

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
