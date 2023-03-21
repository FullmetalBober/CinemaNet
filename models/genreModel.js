const mongoose = require("mongoose");
const slugify = require("slugify");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Genre must have a name"],
      unique: true,
    },
    imageCover: {
      type: String,
      required: [true, "Genre must have a cover image"],
    },
    description: {
      type: String,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

genreSchema.index({ slug: 1 });

genreSchema.virtual('movies', {
  ref: 'Movie',
  foreignField: 'genre',
  localField: '_id'
});

genreSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;