const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie',
      required: [true, 'Showtime must belong to a movie'],
    },
    hall: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hall',
      required: [true, 'Showtime must belong to a hall'],
    },
    time: {
      start: {
        type: Date,
        required: [true, 'Showtime must have a start time'],
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

showtimeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'movie hall',
    select: 'imageCover price duration',
  });

  next();
});

showtimeSchema.virtual('price').get(function () {
  return {
    standard: this.hall.price.standard + this.movie.price,
    lux: this.hall.price.lux + this.movie.price,
  };
});

showtimeSchema.virtual('time.end').get(function () {
  return new Date(this.time.start.getTime() + this.movie.duration * 60 * 1000);
});

showtimeSchema.index(
  { hall: 1, 'time.start': 1, 'time.end': 1 },
  { unique: true }
);

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
