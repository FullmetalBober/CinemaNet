const mongoose = require('mongoose');
const slugify = require('slugify');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie must have a name'],
    unique: true,
  },
  duration: {
    type: String,
    required: [true, 'Movie must have a duration'],
  },
  imageCover: {
    type: String,
    // required: [true, 'Movie must have a cover image'],
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
  }
});

movieSchema.virtual('slug').get(function () {
  return slugify(this.name, { lower: true });
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
