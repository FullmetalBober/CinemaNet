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
      default: '/images/genre/default.jpg'
    },
    description: {
      type: String,
    }
  },
  {
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

genreSchema.virtual('slug').get(function () {
  return slugify(this.name, { lower: true });
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
