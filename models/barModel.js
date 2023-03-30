const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  theater: {
    type: mongoose.Schema.ObjectId,
    ref: 'Theater',
    required: [true, 'Bar must belong to a theater'],
  },
  name: {
    type: String,
    required: [true, 'Bar must have a name'],
    unique: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Bar must have a cover image'],
  },
  price: {
    type: Number,
    required: [true, 'Bar must have a price'],
  },
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;
