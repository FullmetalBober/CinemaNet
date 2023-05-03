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
    default: 'images/movie/movie.jpg',
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
      required: [true, 'Movie must have a rental period start'],
    },
    end: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
      required: [true, 'Movie must have a rental period end'],
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
    },
  ],
  production: [String],
  studio: [String],
  scenario: [String],
  starring: [String],
  description: String,
  price: {
    type: Number,
    required: [true, 'Movie must have a price'],
  },
  slug: String,
});

movieSchema.index({ slug: 1 });

movieSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

movieSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update.name) return next();
  console.log(this._update.name);
  this._update.slug = slugify(this._update.name, { lower: true });
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
