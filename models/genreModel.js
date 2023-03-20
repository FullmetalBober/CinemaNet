const mongoose = require("mongoose");
const slugify = require("slugify");

const genreSchema = new mongoose.Schema({
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
});
