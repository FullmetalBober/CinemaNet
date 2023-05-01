const mongoose = require('mongoose');
const slugify = require('slugify');
// const moment = require('moment');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'Movie must have a duration'],
  },
  imageCover: {
    type: String,
    default: 'default.jpg',
  },
  trailer: {
    type: String,
  },
  ageRating: {
    type: Number,
    default: 0,
  },
  releaseYear: {
    type: Number,
    // default: Date.now(),
  },
  originalName: {
    type: String,
  },
  director: {
    type: String,
  },
  rentalPeriod: {
    start: {
      type: Date,
      default: Date.now(),
    },
    end: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  },
  language: {
    type: String,
    default: 'English',
  },
  genres: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Genre',
      required: [true, 'Movie must have a genre'],
    },
  ],
  production: [String],
  studio: [String],
  scenario: [String],
  starring: [String],
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Movie must have a price'],
  },
});

movieSchema.virtual('slug').get(function () {
  return slugify(this.name, { lower: true });
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
