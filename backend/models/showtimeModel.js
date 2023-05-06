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

showtimeSchema.index(
  { hall: 1, 'time.start': 1, 'time.end': 1 },
  { unique: true }
);

showtimeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'movie',
    select: 'imageCover price duration slug name',
  });

  next();
});

showtimeSchema.virtual('price').get(function () {
  if (!this.hall.price || !this.movie.price) return;
  return {
    standard:
      Math.round((this.hall.price.standard + this.movie.price) * 100) / 100,
    lux: Math.round((this.hall.price.lux + this.movie.price) * 100) / 100,
  };
});

showtimeSchema.virtual('time.end').get(function () {
  if (!this.time.start || !this.movie.duration) return;
  return new Date(this.time.start.getTime() + this.movie.duration * 60 * 1000);
});

showtimeSchema.virtual('tickets', {
  ref: 'Ticket',
  foreignField: 'showtime',
  localField: '_id',
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
