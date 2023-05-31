const express = require('express');
const authController = require('./../controllers/authController');
const movieController = require('./../controllers/movieController');

const router = express.Router();

router
  .route('/')
  .get(movieController.regexSearch, movieController.getAllMovies);
router.route('/slug/:slug').get(movieController.getMovieBySlug);
router.route('/:id').get(movieController.getMovie);

router.use(authController.protect);
router.use(authController.restrictTo('moderator', 'admin'));

router.route('/').post(movieController.createMovie);

router
  .route('/:id')
  .patch(movieController.uploadMoviePhoto, movieController.updateMovie)
  .delete(
    movieController.checkToDeleteMovie,
    movieController.deleteMoviePhoto,
    movieController.deleteMovie
  );

module.exports = router;
