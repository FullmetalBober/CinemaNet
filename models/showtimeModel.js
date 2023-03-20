const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
    required: [true, "Showtime must belong to a movie"],
  },
  theater: {
    type: mongoose.Schema.ObjectId,
    ref: "Theater",
    required: [true, "Showtime must belong to a theater"],
  },
  hall: {
    type: mongoose.Schema.ObjectId,
    ref: "Hall",
    required: [true, "Showtime must belong to a hall"],
  },
  date: {
    type: Date,
    required: [true, "Showtime must have a date"],
  },
  startTime: {
    type: Date,
    required: [true, "Showtime must have a time"],
  },
  price: {
    standard: {
      type: Number,
      required: [true, "Showtime must have a price"],
    },
    lux: {
      type: Number,
      required: [true, "Showtime must have a price"],
    },
  },
});

const Showtime = mongoose.model("Showtime", showtimeSchema);

module.exports = Showtime;
