const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hall must have a name'],
  },
  theater: {
    type: mongoose.Schema.ObjectId,
    ref: 'Theater',
    required: [true, 'Hall must belong to a theater'],
  },
  seats: {
    standard: [
      {
        row: Number,
        seats: Number,
      },
    ],
    lux: Number,
  },
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
