const express = require('express');
const authController = require('../controllers/authController');
const cinemaController = require('./../controllers/cinemaController');

const router = express.Router();

router.route('/').get(cinemaController.getAllCinemas);
router.route('/:id').get(cinemaController.getCinema);

router.use(authController.protect);
router.use(authController.restrictTo('moderator', 'admin'));

router.route('/').post(cinemaController.createCinema);

router
  .route('/:id')
  .patch(cinemaController.uploadCinemaPhoto, cinemaController.updateCinema)
  .delete(
    cinemaController.checkToDeleteCinema,
    cinemaController.deleteCinemaPhoto,
    cinemaController.deleteCinema
  );

module.exports = router;
