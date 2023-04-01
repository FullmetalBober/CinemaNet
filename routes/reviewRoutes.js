const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setMovieUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview);

  router
  .route('/my/:id')
  .patch(reviewController.updateMyReview)
  .delete(reviewController.deleteMyReview);

router.use(authController.restrictTo('admin'));

router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
