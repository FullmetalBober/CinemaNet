const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setMovieUserIds = (req, res, next) => {
  if (!req.body.movie) req.body.movie = req.params.movieId;
  req.body.user = req.user.id;
  next();
};

exports.updateMyReview = catchAsync(async (req, res, next) => {
  let doc = await Review.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (doc.user.id !== req.user.id) {
    return next(
      new AppError('You do not have permission to update this review', 403)
    );
  }

  doc = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteMyReview = catchAsync(async (req, res, next) => {
  let doc = await Review.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  if (doc.user.id !== req.user.id) {
    return next(
      new AppError('You do not have permission to delete this review', 403)
    );
  }

  doc = await Review.findByIdDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
