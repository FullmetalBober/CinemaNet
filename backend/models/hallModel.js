const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
            min: [1, 'Row must be greater than 0'],
            unique: true,
          },
          seats: {
            type: Number,
            required: [true, 'Seats must have a number'],
            min: [1, 'Seats must be greater than 0'],
          },
        },
      ],
      lux: {
        type: Number,
        required: [true, 'Hall must have a number of lux seats'],
        validate: {
          validator: function (val) {
            return val % 2 === 0;
          },
          message: 'Lux seats must be an even number',
        },
      },
    },
    price: {
      standard: {
        type: Number,
        required: [true, 'Hall standard seat must have a price'],
        min: [0, 'Hall standard seat price must be greater than 0'],
      },
      lux: {
        type: Number,
        required: [true, 'Hall lux seat must have a price'],
        min: [0, 'Hall lux seat price must be greater than 0'],
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

hallSchema.index({ name: 1, cinema: 1 }, { unique: true });

hallSchema.virtual('showtimesCount', {
  ref: 'Showtime',
  localField: '_id',
  foreignField: 'hall',
  count: true,
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;
