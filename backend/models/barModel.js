const mongoose = require('mongoose');

const barSchema = new mongoose.Schema(
  {
    cinema: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cinema',
      required: [true, 'Bar must belong to a cinema'],
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Bar must have a name'],
    },
    imageCover: {
      type: String,
      trim: true,
      default: '/images/bar/default.png',
    },
    price: {
      type: Number,
      required: [true, 'Bar must have a price'],
    },
  },
  {
    timestamps: true,
  }
);

barSchema.index({ name: 1, cinema: 1 }, { unique: true });

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;
