const mongoose = require('mongoose');
const slugify = require('slugify');

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Genre must have a name'],
      unique: true,
    },
    imageCover: {
      type: String,
      default: '/images/genre/default.jpg',
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

genreSchema.index({ slug: 1 });

genreSchema.virtual('movies', {
  ref: 'Movie',
  foreignField: 'genres',
  localField: '_id',
});

genreSchema.virtual('moviesCount', {
  ref: 'Movie',
  foreignField: 'genres',
  localField: '_id',
  count: true,
});

genreSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

genreSchema.pre('findOneAndUpdate', function (next) {
  if (!this._update || !this._update.name) return next();
  this._update.slug = slugify(this._update.name, { lower: true });
  next();
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
