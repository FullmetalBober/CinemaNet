const mongoose = require('mongoose');
const slugify = require('slugify');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Movie must have a name'],
    },
    duration: {
      type: Number,
      required: [true, 'Movie must have a duration'],
    },
    price: {
      type: Number,
      required: [true, 'Movie must have a price'],
    },
    imageCover: {
      type: String,
      trim: true,
      default: '/images/movie/default.jpg',
    },
    trailer: {
      type: String,
      trim: true,
    },
    ageRating: {
      type: Number,
      default: 0,
    },
    releaseYear: {
      type: Number,
    },
    originalName: {
      type: String,
      trim: true,
    },
    director: {
      type: String,
      trim: true,
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
      trim: true,
      default: 'English',
    },
    genres: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre',
      },
    ],
    productions: [
      {
        type: String,
        trim: true,
      },
    ],
    studios: [
      {
        type: String,
        trim: true,
      },
    ],
    scenarios: [
      {
        type: String,
        trim: true,
      },
    ],
    starrings: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

movieSchema.index({ slug: 1 });

movieSchema.virtual('showtimesCount', {
  ref: 'Showtime',
  foreignField: 'movie',
  localField: '_id',
  count: true,
});

movieSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

movieSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update || !this._update.name) return next();
  this._update.slug = slugify(this._update.name, { lower: true, strict: true });
  next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
