const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cinema must have a name'],
    unique: true,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    city: {
      type: String,
      required: [true, 'Cinema must have a city'],
    },
    address: String,
    description: String,
  },
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
