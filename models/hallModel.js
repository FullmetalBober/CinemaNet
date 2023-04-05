const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hall must have a name'],
  },
  cinema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cinema',
    required: [true, 'Hall must belong to a cinema'],
  },
  seats: {
    standard: [
      {
        row: {
          type: Number,
          required: [true, 'Row must have a number'],
        },
        seats: {
          type: Number,
          required: [true, 'Seats must have a number'],
        },
      },
    ],
    lux: Number,
  },
});

hallSchema.index({ name: 1, cinema: 1 }, { unique: true });

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
