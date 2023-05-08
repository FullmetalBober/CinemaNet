const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Cinema must have a name'],
      unique: true,
    },
    imageCover: {
      type: String,
      default: '/images/cinema/default.jpg',
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cinemaSchema.index({ name: 1, 'location.city': 1 }, { unique: true });

cinemaSchema.virtual('halls', {
  ref: 'Hall',
  foreignField: 'cinema',
  localField: '_id',
});

cinemaSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'halls',
    select: '_id -cinema',
  });

  next();
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
