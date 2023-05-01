const mongoose = require('mongoose');
const Movie = require('./movieModel');

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
      end: {
        type: Date,
        required: [true, 'Showtime must have an end time'],
      },
    },
    // price: {
    //   standard: {
    //     type: Number,
    //     required: [true, 'Showtime must have a price'],
    //   },
    //   lux: {
    //     type: Number,
    //   },
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

showtimeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'movie hall',
    select: 'imageCover price',
  });

  next();
});

showtimeSchema.virtual('price').get(function () {
  return {
    standard: this.hall.price.standard + this.movie.price,
    lux: this.hall.price.lux + this.movie.price,
  };
});

showtimeSchema.index(
  { hall: 1, 'time.start': 1, 'time.end': 1 },
  { unique: true }
);

// showtimeSchema.pre('save', async function (next) {
//   if (this.isModified('password') || !this.isNew) return next();

//   const movie = await Movie.findById(this.movie);
//   this.time.end = new Date(this.time.start);
//   this.time.end.setMinutes(this.time.end.getMinutes() + movie.duration);
//   next();
// });

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
