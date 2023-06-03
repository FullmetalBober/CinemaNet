const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Cinema must have a name'],
    },
    imageCover: {
      type: String,
      trim: true,
      default: '/images/cinema/default.jpg',
    },
    location: {
      coordinates: [Number],
      city: {
        type: String,
        trim: true,
        required: [true, 'Cinema must have a city'],
      },
      address: {
        type: String,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
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
