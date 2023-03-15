const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    default: 0,
  },
  year: {
    type: Number,
    default: Date.now(),
  },
  originalName: {
    type: String,
  },
  director: {
    type: String,
  },
  rentalPeriodStart: {
    type: Date,
    default: Date.now(),
  },
  rentalPeriodEnd: {
    type: Date,
    default: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  language: {
    type: String,
    default: "Українська",
  },
  genre: {
    type: [String],
  },
  duration: {
    type: Date,
  },
  productionCountry: {
    type: String,
  },
  productionCity: {
    type: String,
  },
  studio: {
    type: String,
  },
  scenario: {
    type: String,
  },
  starring: {
    type: [String],
  },
  description: {
    type: String,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
