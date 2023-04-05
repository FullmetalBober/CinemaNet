const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  cinema: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cinema',
    required: [true, 'Bar must belong to a cinema'],
  },
  name: {
    type: String,
    required: [true, 'Bar must have a name'],
    unique: true,
  },
  imageCover: {
    type: String,
    default: 'default.jpg'
  },
  price: {
    type: Number,
    required: [true, 'Bar must have a price'],
  },
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;
