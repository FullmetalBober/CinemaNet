const express = require('express');
const authController = require('./../controllers/authController');
const movieController = require('./../controllers/movieController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:movieId/reviews', reviewRouter);

router.route('/').get(movieController.getAllMovies);
router.route('/:id').get(movieController.getMovie);

router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(movieController.createMovie);

router
  .route('/:id')
  .patch(movieController.uploadMoviePhoto, movieController.updateMovie)
  .delete(movieController.deleteMoviePhoto, movieController.deleteMovie);

module.exports = router;
