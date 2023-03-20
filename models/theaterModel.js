const mongoose = require('mongoose');
const slugify = require('slugify');

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Theater must have a name'],
    unique: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    city: String,
    address: String,
    description: String,
  },
  slug: String,
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
