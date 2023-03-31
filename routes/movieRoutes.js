const express = require('express');
const authController = require('./../controllers/authController');
const movieController = require('./../controllers/movieController');

const router = express.Router();

router.route('/').get(movieController.getAllMovies);
router.route('/:id').get(movieController.getMovie);

router.use(authController.protect);
router.use(authController.restrictTo('admin', 'owner'));

router.route('/').post(movieController.createMovie);

router
  .route('/:id')
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
