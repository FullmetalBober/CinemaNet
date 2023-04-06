const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review must have a review'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Review must have a rating'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
    immutable: true,
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Review must belong to a movie'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

reviewModel.index({ movie: 1, user: 1 }, { unique: true });

reviewModel.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo _id',
  });
  next();
});

const Review = mongoose.model('Review', reviewModel);

module.exports = Review;
